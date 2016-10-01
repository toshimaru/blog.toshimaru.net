---
layout: post
title: "Roppongi.rbで「Rails高速化戦略」を発表しました"
image: "/images/posts/roppongirb/title.png"
description: "自分がオーガナイザーを務めた Roppongi.rb #1で「Rails高速化戦略」という題で発表してきました。スライドは下記になります。発表内容をこちらのブログでも文章形式でざっとまとめてみたいと思います。"
tags: rails ruby presentation web
---

自分がオーガナイザーを務めた [Roppongi.rb #1](http://roppongirb.connpass.com/event/33502/)で「Rails高速化戦略」という題で発表してきました。スライドは下記になります。

<script async class="speakerdeck-embed" data-id="37881a2ec2214ef39d85820f3327bbc2" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

発表内容をこちらのブログでも文章形式でざっとまとめてみたいと思います。

## Rails (Ruby) 遅いよね

RailsないしRubyはプログラミング言語の中では速くはない言語であることは言うまでもないと思う[^1]。 実際に「Rails/Ruby遅いよねって今まで思ったことある方どれくらいいますか？」と会場でも聞いてみたところ、予想では半数以上手を挙げてくれると思ったのだけど、実際は30人中3~4人くらい。あまりにも意外な結果だったので自分なりに理由を分析してみると２つあるかなと思う。

### パフォーマンスを求められないから

例えば社内の数人が使うような管理画面の場合。この場合、パフォーマンスよりも機能性（ちゃんと検索・閲覧できるかとかCRUD操作ができるかとか）などが優先されると思う。数人だけが使うのでアクセススパイクもないし、パフォーマンスが問題にもなりにくい。

### Railsをフレームワークとして使っていないから

すごくパフォーマンスを求められるWebアプリの場合、それが事前にわかっているならまずは言語選択レベルでRailsを選択しないかもしれない。今ならGoとかElixirとかScalaとか代替言語もあるのでそちらを選択した場合はRailsは使わないことになるのでRailsの遅さで困ることもない。

## それでもやっぱりRailsだ...!

それでもやっぱりRuby好きのRubyっ子であれば、Rubyは使いたい... ということで、Railsの高速化をする上での戦略を紹介。

## Ruby Version Up

まずはRubyバージョンアップ。Rubyバージョンの歴史はこんな感じになっている。

* 2013.2: Ruby 2.0
* 2013.12: Ruby 2.1
* 2014.12: Ruby 2.2
* 2015.12: Ruby 2.3
* 20xx: Ruby 3.0

去年matzの口からRuby3のコンセプトが発表された。その驚くべき内容が **Ruby 3 x 3** 。

![ruby 3 x 3](/images/posts/roppongirb/ruby3x3.png)

via. [Ruby3 challenges - RubyKaigi 2015 Keynote - YouTube](https://www.youtube.com/watch?v=E9bO1uqs4Oc)

## とあるRailsアプリの場合

会社で取り組んでいるプロダクトのRubyのバージョンは基本的に最新バージョンを使うようにしているものの、中にはレガシーな環境もある。下記はあるプロダクトでRuby2.0 から Ruby2.1に上げた例。結果としては、Ruby 2.0 => 2.1 Ruby Version Up だけで レスポンス速度が約2倍向上した。

![](/images/posts/roppongirb/ruby2_0-to-2_1.png)

このようにRubyバージョンアップによりアプリケーションコード変更ゼロでも[^2]、速度改善が期待できる。古いRubyお使いの方は今すぐRubyのバージョンアップ！

## What about Rails?

じゃあRailsはどうだろうか。下記は[amatsuda](https://github.com/amatsuda)さんのmatzのRuby 3x3 を受けての発表。

![](/images/posts/roppongirb/rails3x.png)

[3x Rails // Speaker Deck](https://speakerdeck.com/a_matsuda/3x-rails)

`?`が付いていることで分かる通り3倍速くなるという発表というより、まだまだRailsは速くするために工夫の余地があるよ、というような発表。

下記は同じ[amatsuda](https://github.com/amatsuda)さんが発表された[Rails Upgrade Casual Talks](http://togetter.com/li/955629)での資料です。

![](/images/posts/roppongirb/rails-verup1.png)

via. [Rails Upgrade Casual Talks // Speaker Deck](https://speakerdeck.com/a_matsuda/rails-upgrade-casual-talks)

たしかに色んな機能が追加されている中、Railsが劇的に速くなることは考えにくい。解決策は...?

![](/images/posts/roppongirb/rails-verup2.png)

**歯を食いしばってRails/Rubyをバージョンアップ** :innocent:

Rails 遅くなってもRuby は速くなっているので、どちらも最新版をしっかり追っかけていけば、遅くなることなくRailsの機能拡張も追っかけていけるのでOK.

## ボトルネックを潰す

Railsアプリをどうボトルネックを発見し潰していくか？

### 推測するな、計測せよ　

ボトルネックは計測して数値で示すもの。ボトルネックを発見するためのサービス・ツールをいくつか紹介。

* [New Relic](https://newrelic.com/): 無料で使えて導入もラクでよい
* [rack-mini-profiler](https://github.com/MiniProfiler/rack-mini-profiler): 開発環境導入する。クエリやpartialレンダー時間を表示。
* [rack-lineprof](https://github.com/kainosnoema/rack-lineprof): Rubyのコードを行単位で計測したい場合に有効

ツールを使った結果ボトルネックになりやすい箇所というとRDBまわり。それを解決するgem・機能を紹介。

## ActiveRecord Optimization

### :mag_right: 問題発見型

* [bullet](https://github.com/flyerhzm/bullet): Kill `N+1` issue!
* [activerecord-cause](https://github.com/joker1007/activerecord-cause): Logs where ActiveRecord actually loads record

### :key: DBスキーマ最適化型

* [flag\_shih\_tzu](https://github.com/pboling/flag_shih_tzu): Bit fields for ActiveRecord
* [counter-cache](http://guides.rubyonrails.org/association_basics.html#counter-cache): cacheing count query result
  * [counter_culture](https://github.com/magnusvk/counter_culture): Better counter-cache

### :zap: クエリ効率化型

* [activerecord-precount](https://github.com/k0kubun/activerecord-precount): Yet another counter_cache alternative.
* [activerecord-import](https://github.com/zdennis/activerecord-import): bulk inserting data

## クエリを意識してActiveRecord使いこなそう

ActiveRecordもといORマッパの良さってDBを意識しなくて済むところ。でも高速化を行う上でクエリは避けられない壁。DBを意識せずコードを書いている最近のワカモノはもっとクエリを意識しよう！ ~~老害っぽい発言だ~~

## パーシャルレンダリングを減らす

### N+1 partial rendering

データN個分`render`処理が走ってしまうのを、個人的に **N+1 rendering** と呼んでいる。データの数N+親のビュー1回で `N+1`. 例えばこんなコード。

```erb
<!-- views/items/index -->
<% @items.each do |item| %>
  <%= render item %>
<% end %>
```

```erb
<!-- views/items/_item -->
<tr>
  <td><%= item.name %></td>
  <td><%= link_to 'Show', item %></td>
  <td><%= link_to 'Edit', edit_item_path(item) %></td>
  <td><%= link_to 'Destroy', item, method: :delete %></td>
</tr>
```

この場合のログはこうなる。

```
Processing by ItemsController#index as HTML
  Rendering items/index.html.erb within layouts/application
  Item Load (0.3ms)  SELECT "items".* FROM "items"
  Rendered items/_item.html.erb (0.5ms)
  Rendered items/_item.html.erb (0.3ms)
  ...snip...
  Rendered items/_item.html.erb (0.5ms)
  Rendered items/_item.html.erb (0.3ms)
  Rendered items/index.html.erb within layouts/application (57.7ms)
Completed 200 OK in 80ms (Views: 77.1ms | ActiveRecord: 0.3ms)
```

Viewで80msくらいかかっている。

### Collection rendering

上記の場合、Collectionレンダーの機能を使えばもっと効率的にrenderできる。

```erb
<!-- views/items/index -->
<%= render @items %>
```

```erb
<!-- views/items/_item -->
<tr>
  <td><%= item.name %></td>
  <td><%= link_to 'Show', item %></td>
  <td><%= link_to 'Edit', edit_item_path(item) %></td>
  <td><%= link_to 'Destroy', item, method: :delete %></td>
</tr>
```

この場合のログはこうなる。

```
Processing by ItemsController#index as HTML
  Rendering items/index.html.erb within layouts/application
  Item Load (0.4ms)  SELECT "items".* FROM "items"
  Rendered collection of items/_item.html.erb [29 times] (6.9ms)
  Rendered items/index.html.erb within layouts/application (10.3ms)
Completed 200 OK in 29ms (Views: 26.4ms | ActiveRecord: 0.4ms)
```

ビューで25msくらい。だいたい上記の例と比べると1/3くらいになっている。

## Rails caching

RailsのCacheの仕組みとして[公式ガイド](http://guides.rubyonrails.org/caching_with_rails.html)で3つ紹介されているのだが、ご存知だろうか。

1. **Fragment Cache**: View fragment caching.
2. **Action Cache**: Controller's action caching (removed in Rails4).
3. **Page Cache**: Static page caching (removed in Rails4).

### 1. Fragment Cache

![](/images/posts/roppongirb/cache-fragment.png)

* グローバルナビ・サイドバーなどの多く呼ばれる共通コンテンツに有効
* 重い処理が走るビューの一部分であればあるほど高速化が期待できる
* Advanced Usage: **Russian Doll Caching**

### 2. Action Cache

![](/images/posts/roppongirb/action-cache.png)

* Rails4で削除されてgem化: [actionpack-action_caching](https://github.com/rails/actionpack-action_caching)
* Viewの手前のControllerのAction自体の処理が重い場合に有効
* `cache_path` でキャッシュキーをカスタマイズ可能
  * モデルのupdated_at を組み込んだり、PC/スマフォでキャッシュビュー出し分け可能

### 3. Page Cache
* Rails4で削除されてgem化: [actionpack-page_caching](https://github.com/rails/actionpack-page_caching)
* キャッシュ対象となるControllerのActionの生成するHTMLをまるっと静的ファイルに吐き出す
* その静的ファイルをNGINXなどのWeb Server/Reverse Proxyでハンドリング

## Railsのキャッシュ戦略
1. Railsデフォルトの FragmentCache を使ってビューのレンダリングを高速化
2. それでもダメな場合や Controller 自体の処理が重い場合なら、ActionCache/PageCache を検討

### :warning: 注意
* キャッシュしても根っこの問題は消えない
* キャッシュのライフサイクル管理
* 用法用量を守って正しくお使いください

キャッシュしても根っこの問題はバイパスされるだけでそれ自体が解決されるわけではないので、本質的にはその根っこの問題を潰すほうがキャッシュより優先すべき。キャッシュによって**臭いものには蓋**をしていないか。キャッシュによって大きなボトルネックが隠蔽されていないか。本質的な問題を潰した上でなお高速化したい場合にキャッシュを利用するのが筋の良いキャッシュ戦略だと思う。

またキャッシュを行うことでそのライフサイクル管理も必要になってくることはアタマに入れておきたい。どういう場合にキャッシュがexpireすべきなのか(あるいはexpireすべきでないのか)、updateすべきなのか、削除すべきなのか。この辺もきちんと考えた上でキャッシュに取り組みたい。

## 静的ファイル配信

### NGINX

プロダクション運用においては実際Railsが静的ファイルまでサーブすることはなくて、下記のようにNGINXに静的ファイルをサーブさせることが多い。

![](/images/posts/roppongirb/nginx.png)

### CDN

さらに言うと、Railsの吐く assets:precompile の成果物は、CDNに乗せちゃって配信を最適化してやるともっとよい。

![](/images/posts/roppongirb/nginx-cdn.png)

## レイテンシに負けないプロトコル = HTTP/2

バンド幅大きくなってもページロード時間は大きく変わらない。**光の速度はこれ以上速くならない**。じゃあどうするか。解決策がHTTP/2.

![](/images/posts/roppongirb/http2-latency.png)

![](/images/posts/roppongirb/http2.png)

via. [ウェブを速くするためにDeNAがやっていること - HTTP/2と、さらにその先](http://www.slideshare.net/kazuho/dena-http2)

下記のBEFORE/AFTERは画像の配信をHTTPからHTTP/2に変更した場合のリクエストをキャプチャしたもの。

### Before HTTP/2

HTTP/2前の状態。リクエストが順番に走っていることが見て取れる。

![](/images/posts/roppongirb/before-http2.png)

### After HTTP/2

HTTP/2後の状態。リクエストが見事に多重化されている。

![](/images/posts/roppongirb/after-http2.png)

[こちらのページ](https://www.httpvshttps.com/)ではHTTPSの画像ロードの速度の速さを体感できる。

![](/images/posts/roppongirb/HTTP_vs_HTTPS.png)

## ユーザーの体感速度 = サーバーサイドレスポンス + クライアントサイド・スピード

仮にサーバーレスポンスタイムを`1ms`にしたとしても、十分に速くなったとはいえない。なぜなら最終的にユーザーが感じるであろうウェブページの体感速度はサーバーサイドのレスポンス速度とクライアントサイドでのページロードのスピードを足し合わせたものだから。サーバーが0msでレスポンス返しても10秒間クライアントサイドの画面が真っ白だったら、ユーザーにとってはそれは10秒待たされてるのと一緒。

### Rails HelloWorld App の場合

Rails5をほぼ素の状態でHello Worldという文字列を出力するアプリをHerokuにデプロイして[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)で計測してみた。

結果は80点以下... :weary:

![](/images/posts/roppongirb/render-block-js.png)

`Should Fix`として報告されているのは、headタグ内にあるJS読み込みが Render Blocking してますよ、という内容のもの。Webの高速化はサーバーサイドだけで済むようなラクなもんじゃない。

## AMP :zap:

AMPはWeb高速化のベストプラクティスを詰め込んだ仕様/制限のこと。詳しくは下記が参考になる。

* [Why AMP is fast — Medium](https://medium.com/@cramforce/why-amp-is-fast-7d2ff1f48597#.tcozirlt5)
* [ep22 AMP \| mozaic.fm](https://mozaic.fm/episodes/22/amp.html)

またAMPに対応するとページが速くなる他にもおいしいことがあって、GoogleがAMPページをキャッシュしてコンテンツ配信を肩代わりしてくれるのだ。いうなればAMPのためのGoogle無料CDN。これでオーガニック検索のトラフィックはだいぶラクになるかも？

僕も自分の[英語Tipsブログ](http://blog.toshima.ru/)をAMP化してみたが非常に高速にページが表示できている。(完全にAMP化はできていないのだけど) まだAMP試していない人は、AMPすげーはやいのでぜひその速さを体感してみてほしい。そしてWebの高速化にまっすぐ向き合ってもらいたいと思う。

## その他の参考資料
* [High Performance Rails (long edition) // Speaker Deck](https://speakerdeck.com/mirakui/high-performance-rails-long-edition)
* [Railsパフォーマンス基本のキ // Speaker Deck](https://speakerdeck.com/joker1007/railspahuomansuji-ben-falseki)
* [デザイナーやディレクターも知っておきたい、ページ表示速度の高速化の基本 – Rriver](http://parashuto.com/rriver/development/page-speed-optimization)

## Roppongi.rb イベントについて
- [#roppongirb hashtag on Twitter](https://twitter.com/hashtag/roppongirb?f=tweets&vertical=default)
- イベント発表資料: [Roppongi.rb 資料一覧 - connpass](http://roppongirb.connpass.com/event/33502/presentation/)
- [Roppongi.rb #1 発表の密度が濃くて楽しかったYO! - 酒と泪とRubyとRailsと](http://morizyun.github.io/blog/roppongi-rb-ruby-rails/)

[^1]: [Round 12 results - TechEmpower Framework Benchmarks](https://www.techempower.com/benchmarks/)
[^2]: ただしRubyバージョン差異による非互換性を解消するための変更は必要だけどね。
