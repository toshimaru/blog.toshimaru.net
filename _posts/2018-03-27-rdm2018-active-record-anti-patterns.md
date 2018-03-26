---
layout: post
title: railsdm2018で「ActiveRecordデータ処理アンチパターン」を発表しました
image: /images/posts/railsdm/rdm2018.png
description: "Rails Developers Meetup 2018で「ActiveRecordデータ処理アンチパターン」というタイトルで発表してきました。紹介したアンチパターン 発表内で紹介したアンチパターンがこちらです。 All Each Pattern N+1 Update Queries Pattern Ruby Aggregation Pattern N+1 Queries Pattern Unnecessary Query Pattern Unnecessary Mode Initialization Pattern 紹介できなかったアンチパターン 何かしらアンチパターン化できそうだけど、時間の都合上しなかったアンチパターンがこちらです。発表しなかったので命名は適当です。"
tags: presentation activerecord rails
---

[Rails Developers Meetup 2018](https://railsdm.github.io/2018/)で「ActiveRecordデータ処理アンチパターン」というタイトルで発表してきました。

## 発表資料

<script async class="speakerdeck-embed" data-id="2bb9d7ceea4b4987bf4c8618a53a1e68" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

## 事前に公開したエントリ

発表資料に出てくる最初の事例はこちらがベースの事例となっています。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">今月末のRails Developer Meetupに先駆けてRailsの遅いバッチ処理を400倍速くする話を書きました  | Rails/ActiveRecord バッチ処理の最適化 - Hack Your Design! <a href="https://t.co/i7JZnZcuLc">https://t.co/i7JZnZcuLc</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/970546164725501952?ref_src=twsrc%5Etfw">March 5, 2018</a></blockquote>

## 紹介したアンチパターン

発表内で紹介したアンチパターンがこちらです。

1. All Each Pattern
1. N+1 Update Queries Pattern
1. Ruby Aggregation Pattern
1. N+1 Queries Pattern
1. Unnecessary Query Pattern
1. Unnecessary Mode Initialization Pattern

## 紹介できなかったアンチパターン

何かしらアンチパターン化できそうだけど、時間の都合上しなかったアンチパターンがこちらです。発表しなかったので命名は適当です。

### なんでもincludesパターン

`joins`で良いのになんでも`includes`で解決しようとしちゃうパターン。このへんは下記の解説に詳しいです。

[ActiveRecordのjoinsとpreloadとincludesとeager_loadの違い - Qiita](https://qiita.com/k0kubun/items/80c5a5494f53bb88dc58)

### Too many find_or_create_by パターン

`find_or_create_by`は、オブジェクトが存在する場合は取得、なければ作成って挙動をするやつです。これをループ内で使いまくるパターン。

そんなときはSQLのUPSERTの機能を使うのが得策。具体的にはMySQLであれば`INSERT...ON DUPLICATE KEY UPDATE`です。

残念なことにこれはActiveRecordの標準機能では提供されていないので[activerecord-import](https://github.com/zdennis/activerecord-import)などのgemを使って解決する必要があります。

### has_many関連のcount方法いろいろあるよ問題

ちゃんとパターン化できていませんが、この問題もなかなか難しい問題です。どのメソッド使ったらよいかはケースバイケースで変わってくるので詳しくは下記を参照されたし。

[ActiveRecord の has_many関連、件数を調べるメソッドはどれを使えばいい？ - Qiita](https://qiita.com/nay3/items/1cda39fb58569d832203)

## Q & A

### アンチパターンの出典は？

全部オレです（笑

一応元ネタというかインスパイアを受けた本としては発表内でも紹介している『SQLアンチパターン』です。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=toshimaru-22&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4873115892&linkId=6903fbe4f4a55cf4f47b4036bf2f350a"></iframe>

こちらの本が原著は英語で書かれており、それに倣うかたちで英語でアンチパターンを命名しました。まぁ平たく言うとカッコつけて英語にしました以上の理由はありません :smile:

### （事例１）User.created_atにINDEX貼らないの？

下記二点の理由により貼りませんでした。

1. 前提事項としてDBの最適化はしないと述べた
2. User.created_atにINDEXを貼ってもINDEX効かない

User.created_atにINDEX(`index_users_on_created_at`)を貼ったあとの実行計画がこちらになります。

```
mysql> EXPLAIN UPDATE `users` SET point = point + 100 WHERE (created_at >= '2017-01-01') \G
*************************** 1. row ***************************
           id: 1
  select_type: UPDATE
        table: users
   partitions: NULL
         type: index
possible_keys: index_users_on_created_at
          key: PRIMARY
      key_len: 8
          ref: NULL
         rows: 99574
     filtered: 100.00
        Extra: Using where
1 row in set (0.00 sec)
```

INDEX貼ってても対象範囲が大きいとINDEX効かなくなるんです。そして今回のケースはそれに当たります。（この挙動、実は僕も全然知りませんでした...）

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">mysqlで検索の対象範囲が大きくなりすぎるとindexが効かなくなるの知らなかった | [MYSQL] datetimeカラムのインデックスの使われ方をテストしてみた │ revdev <a href="https://t.co/2JK7VD7Ttv">https://t.co/2JK7VD7Ttv</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/974924182369722368?ref_src=twsrc%5Etfw">March 17, 2018</a></blockquote>

テストとして条件の範囲を小さくした実行計画がこちらになります。

```
mysql> EXPLAIN UPDATE `users` SET point = point + 100 WHERE (created_at >= '2018-01-01') \G
*************************** 1. row ***************************
           id: 1
  select_type: UPDATE
        table: users
   partitions: NULL
         type: range
possible_keys: index_users_on_created_at
          key: index_users_on_created_at
      key_len: 5
          ref: const
         rows: 5903
     filtered: 100.00
        Extra: Using where
1 row in set (0.00 sec)
```

きちんとこちらではINDEXが効いてます。

### （事例２）改善１のコードのモデルってロードされている？

会場であった質問です。こちらはRails consoleで実際のコードを動かしてあげれば一目瞭然です。

```
> Post.group(:user_id).select("user_id, SUM(like_count) AS like_count").order("like_count DESC") .limit(100)
  Post Load (976.6ms)  SELECT  user_id, SUM(like_count) AS like_count FROM `posts` GROUP BY `posts`.`user_id` ORDER BY like_count DESC LIMIT 11
=> #<ActiveRecord::Relation [#<Post id: nil, user_id: 2632, like_count: 832>, #<Post id: nil, user_id: 51965, like_count: 800>, #<Post id: nil, user_id: 25068, like_count: 783>, ...]>

> Post.group(:user_id).order("SUM(like_count) DESC") .limit(3000).pluck(:user_id)
   (668.3ms)  SELECT  `posts`.`user_id` FROM `posts` GROUP BY `posts`.`user_id` ORDER BY SUM(like_count) DESC LIMIT 3000
=> [2632, 51965, 25068, 8515, 84933, 67763, 89631, 69494, 78805, 17541, 53344, 7618, 92652, 13704, 94308, 96778, ...
```

## 発表を終えて

30minsと長めの発表は[AWS Summitぶり](/aws-summit-tokyo-2015/)だったので時間配分にやや不安があったけど、当日は発表を巻くこともなく余裕をもって25分くらいで発表を終えられたのでよかった。

