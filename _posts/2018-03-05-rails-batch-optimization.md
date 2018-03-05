---
layout: post
title: Rails/ActiveRecord バッチ処理の最適化
description: "さて今回最適化するコードは下記です。処理内容としては 全ユーザーの中から2017年以降の登録ユーザーへ100ポイントを付与する というものです。いかにも販促活動の一環としてありそうな話です。あなたはこのコードをぱっと見てどこが悪いかすぐにわかりますか？ 中級者以上のRailsエンジニアであれば「そんなコードは絶対書かないよ！」と思うかもしれませんが、「RailsでWebプログラミングを初めてまだ一ヶ月です！」みたいな初級エンジニアであれば上記のように書いても全然おかしくはないコードだと思います。"
tags: rails activerecord
toc: true
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Railsのバッチ処理最適化の記事書いたら需要あるかな</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/936796457931128832?ref_src=twsrc%5Etfw">December 2, 2017</a></blockquote>

ということで今日はRailsバッチ処理の最適化について書いてみたいと思います。

## 検証環境

コードの検証に使った環境は下記の通りです。

- macOS High Sierra (2.3 GHz Intel Core i5 / メモリ8G)
- Ruby 2.5
- Rails 5.1

## 前提条件

最適化の前提条件としては下記の通りです。

- バッチはrakeタスクとして実行する
- 今回、最適化対象とするのはUserモデルのバッチ処理
  - 今回使用するUserモデルは[devise](https://github.com/plataformatec/devise/)で作られるUserモデル(`rails generate devise:install`)を基本として、そのスキーマ定義にint型のpointカラムをつけたもの
  - pointカラムは登録ユーザーが自由につかえるポイントの意
- Userデータとして事前に50万件のユーザーデータを投入しておく
- [こちらのコード](https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby)を参考に処理の **実行時間** と **メモリ使用量** を計測する
- `execute`などによる直接SQL実行はせずにDBの操作を行う
- シンプルにするために、登録日 = `User.created_at`とする
- データベースのトランザクション処理は考慮しない

## オリジナルコード

さて今回最適化するコードは下記です。処理内容としては **全ユーザーの中から2017年以降の登録ユーザーへ100ポイントを付与する** というものです。いかにも販促活動の一環としてありそうな話です（`2017年以降`のところの条件は別になんでも良かったのですが、処理対象をある程度多くするために今回はそのように設定しました）。

```rb
# Task: batch:original
User.all.each do |user|
  if user.created_at >= "2017-01-01"
    user.point += 100
    user.save
  end
end
```

**あなたはこのコードをぱっと見てどこが悪いかすぐにわかりますか？**（言うまでもなくこのコードは問題アリアリのコードです!!）

中級者以上のRailsエンジニアであれば「そんなコードは絶対書かないよ！」と思うかもしれませんが、「RailsでWebプログラミングを初めてまだ一ヶ月です！」みたいな初級エンジニアであれば上記のように書いても全然おかしくはないコードだと思います。

### ベンチマーク

まずはこの問題のあるコードがどれだけ時間がかかっているかを計測してみましょう。

※ 前提条件で書いたとおり[こちらのコード](https://dalibornasevic.com/posts/68-processing-large-csv-files-with-ruby)を参考に時間とメモリ使用量を計測します。また結果は数回実施した上で大きく外れていない平均的なスコア結果を掲載します。

```console
$ rake batch:original
Time: 339.42 secs
Memory: 2219.72 MB
```

実行時間は340秒、メモリ使用量は2200MB程でした。今回の最適化のゴールは **この処理時間できるだけ速くして、あわせてメモリ使用量も抑えることです。**

では早速このコードを最適化していきましょう。

## 最適化1: 簡単な最適化

まずは簡単な最適化から始めましょう。日付の比較は`String`を使うよりも`Date`クラスを使ったほうが速そうです。また、ループの中で何度も同じ値が使われるのも良くないので定数に切り出しちゃいましょう。結果、下記のコードのようになりました。

```rb
# Task: batch:improvement1
POINT_DATE = Date.new(2017)

User.all.each do |user|
  if user.created_at >= POINT_DATE
    user.point += 100
    user.save
  end
end
```

### ベンチマーク

さて計測結果です。

```console
$ rake batch:improvement1
Time: 320.0 secs
Memory: 2244.71 MB
```

メモリ使用量は変わらず、実行時間は10数秒程度速くなったくらいでしょうか。小さな最適化レベルでまだまだ全然速くなったとは言えません。

## 最適化2: where & each を使う

次はもう少し本格的な最適化を入れていきましょう。

まずは`User.all.each`で全件ユーザーを取得している点が真っ先に気になるところです。これは **全件取得せず2017年以降の登録ユーザーをあらかじめフィルターしていからループさせる** ほうが良さそうです。

```rb
# Task: batch:improvement2
User.where("created_at >= ?", POINT_DATE).each do |user|
  user.point += 100
  user.save
end
```

あらかじめ処理対象ユーザーだけをフィルターできているので、ループ内の`if`も消すことができました。

### ベンチマーク

```console
$ rake batch:improvement2
Time: 294.35 secs
Memory: 1623.5 MB
```

実行時間が前の結果より20秒程改善、メモリ消費もユーザーを全件取得する必要がなくなった分、500MB程空きました。良い感じですね。

## 最適化3: find_each を使う

ちょっと待って下さい、大量データを一度にロードしなくてもいいように、ActiveRecordが[find_each](http://api.rubyonrails.org/classes/ActiveRecord/Batches.html#method-i-find_each)という便利メソッドを用意してくれてるのでした。これを使わない手はないでしょう。

```rb
# Task: batch:improvement3
User.where("created_at >= ?", POINT_DATE).find_each do |user|
  user.point += 100
  user.save
end
```

これで少しつづユーザーをロードして処理してくれるようになり、メモリに優しいコードになったと思います。

### ベンチマーク

```
$ rake batch:improvement3
Time: 290.88 secs
Memory: 31.41 MB
```

実行時間が前の結果と変わらないこそすれ、**メモリ使用量は前の結果の50分の一となりました。** 大きな改善と言っていいでしょう。

## 最適化4: in_batches & update_all を使う

ここで一件一件`update`が走る点が気になってきました。そこはActiveRecordの[update_all](http://api.rubyonrails.org/classes/ActiveRecord/Relation.html#method-i-update_all)を使ってまとめて更新するようにしてあげれば解決できそうです。

また`update_all`は`ActiveRecord::Relation`のメソッドですが、`ActiveRecord::Relation`を先の`find_each`のように返してくれる便利メソッドが[in_batches](http://api.rubyonrails.org/classes/ActiveRecord/Batches.html#method-i-in_batches)です。この`in_batches`と`update_all`を組み合わせて処理してあげれば効率良く更新できそうな気がします。

```rb
# Task: batch:improvement4
User.where("created_at >= ?", POINT_DATE).in_batches do |users|
  users.update_all("point = point + 100")
end
```

### ベンチマーク

```console
$ rake batch:improvement4
Time: 2.46 secs
Memory: 7.26 MB
```

**実行時間が100倍速くなりました。** またメモリの使用量も前の結果よりさらに抑えられています。

## 最適化5: where & update_all

勘の良い方なら既にお気づきですね。ハイ、先のコードは`in_batches`すら不要です。単純にupdate対象を`where`でフィルターした上で`update_all`すれば良さそうです。出来上がったコードがこちら。

```rb
# Task: batch:improvement5
User.where("created_at >= ?", POINT_DATE).update_all("point = point + 100")
```

一行のシンプルなコードに仕上がりました。

### ベンチマーク

```
$ rake batch:improvement5
Time: 0.78 secs
Memory: 0.82 MB
```

**実行時間は前の結果より3倍早くなり、メモリ使用量もさらに10分の一まで抑えられました。**

これを今回の最適化コードの最終形としたいと思います。

---

_追記ここから_

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">これcreated_atにインデックスがあろうがなかろうが全舐めして1秒弱で終わるレコード数ならいいのだけど、そうだとしてもsaveをupdate_allにした時点でcallbackが起きなくなって元と等価ではなくなるから仕事で真似するときは詳しい人にちゃんとレビューしてもらってから投入したほうがよさそう。</p>&mdash; Ryuta Kamizono (@kamipo) <a href="https://twitter.com/kamipo/status/970574529452900352?ref_src=twsrc%5Etfw">March 5, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

kamipoさんからご指摘頂いたとおり、`update_all`は通常のActiveRecordの更新とは異なりcallback, validationをスキップする仕様となっております。よってオリジナルコードとは等価な処理では無くなっているので、実際の現場においては`save`から`update_all`に変更する際は「本当にcallback, validationスキップしても大丈夫なんだっけ？」ということをしっかり考えてから実施するようにしてください。

> it does not trigger Active Record callbacks or validations

http://api.rubyonrails.org/classes/ActiveRecord/Relation.html#method-i-update_all

今回のコード例ではモデルのcallback, validationをスキップしても問題ないコードとして話を進めています。

加えて、今回データベースの最適化は最適化の範囲外としたので`created_at`カラムのindexは貼りませんでした。実際の現場においてはRubyのコードレベルの最適化に加えてデータベースの最適化も考えてINDEXを貼ることも検討したほうがいいでしょう。

_追記ここまで_

---

## 最終結果

オリジナルコードと最適化済みの最終コードを比較すると下記の通りの改善が確認できました。

| | 実行時間 | メモリ消費 |
| - | - | - |
| オリジナルコード | 339.42 secs |  2219.72 MB |
| 最適化コード | 0.78 secs | 0.82 MB |
| 改善結果 | :rocket: **435倍高速化** | :recycle: **約2700分の一まで省メモリ化** |

## 「ActiveRecordデータ処理アンチパターン」で発表します

上述したようなオリジナルコードは極端な例ではありますが、ActiveRecordでデータを扱うときはきちんと遅くならないように意識してバッチ処理を書かないと極端に遅くなってしまうケースがあります。

そんなActiveRecordデータ処理で陥りがちな罠をパターン化し今月のRails Develper Meetupにて発表する予定です。ご興味あれば是非。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">3月25日に「ActiveRecordアンチパターン」的な内容で発表しますー | Rails Developers Meetup 2018: Day 2｜IT勉強会ならTECH PLAY［テックプレイ］ <a href="https://t.co/QJgdMF92Sr">https://t.co/QJgdMF92Sr</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/960340809005506561?ref_src=twsrc%5Etfw">February 5, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 参考リンク

- [ActiveRecord::Relation](http://api.rubyonrails.org/classes/ActiveRecord/Relation.html)
- [ActiveRecord::Batches](http://api.rubyonrails.org/classes/ActiveRecord/Batches.html)
