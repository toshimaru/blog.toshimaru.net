---
layout: post
title: Railsのfind_eachの挙動について調べた
published: true
description: find_eachとは、バッチ処理などにおいてActiveRecordで効率的に大量データを処理したいときに使うメソッド。大量データ全部まるっと取ってきて処理しちゃあアカンよねってことで徐々に処理をしていくときに使う。
tags: rails activerecord
toc: true
---

Railsの[find_each](http://apidock.com/rails/ActiveRecord/Batches/ClassMethods/find_each)がどんな挙動をするか気になったので調べてみた。

## find_each とは

バッチ処理などにおいてActiveRecordで効率的に大量データを処理したいときに使うメソッド。大量データまるっと全部取ってきてメモリ展開して処理しちゃあアカンよねってことで、データを徐々に展開して処理したいときに使う。

> Railsには find_each というメソッドが用意されています。通常の each メソッドを使用すると、全データをまとめてメモリに展開してから処理を開始します。そのため、十分にメモリに載るデータ量であれば何も問題ないですが、数百万、数千万というデータ量になってくるとメモリに載りきらずに溢れてしまって大変なことになります。
>
> * find: 全データをメモリに展開してから処理
> * find_each: 少しずつデータをメモリに展開しつつ処理
>
> そういうときには find_each メソッドを使いましょう。

[Railsで大量のデータをまとめて更新するならfind_each使うよね - (ﾟ∀ﾟ)o彡 sasata299's blog](http://blog.livedoor.jp/sasata299/archives/51882704.html)

## 素の find_each

まずはUserテーブルに1万件くらいデータを作って素直に`find_each`してみる。

    > User.find_each{|a|}
      User Load (2.7ms)  SELECT  `users`.* FROM `users`  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (2.6ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 1001)  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (4.7ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 2001)  ORDER BY `users`.`id` ASC LIMIT 1000
      ...

デフォルトでは`ORDER BY id`で全件取得して1000件ずつ分割(`limit 1000`)して処理していくようなかたち。

## order付き find_each

では`order`を付けて`find_each`したらどうなるのだろう？

    > User.order(created_at: :desc).find_each{|a|}
    Scoped order and limit are ignored, it's forced to be batch order and batch size
      User Load (3.8ms)  SELECT  `users`.* FROM `users`  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (3.0ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 1001)  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (2.3ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 2001)  ORDER BY `users`.`id` ASC LIMIT 1000
      ...

`Scoped order and limit are ignored`ということで`order`と`limit`は無視されるようです。

## limit付き find_each

じゃあ`limit`も試してみよう。

    > User.limit(2000).find_each{|a|}
    Scoped order and limit are ignored, it's forced to be batch order and batch size
      User Load (3.0ms)  SELECT  `users`.* FROM `users`  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (3.5ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 11003)  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (3.4ms)  SELECT  `users`.* FROM `users` WHERE (`users`.`id` > 12003)  ORDER BY `users`.`id` ASC LIMIT 1000
      ...

やっぱりワーニングメッセージが出て無視された。

## where付き find_each

`where`を使って処理対象に条件を付けることもできます。

    > User.where(notes: "1").find_each{|a|}
      User Load (4.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1'  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (4.8ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 11955)  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (4.9ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 13954)  ORDER BY `users`.`id` ASC LIMIT 1000
      User Load (4.7ms)  SELECT  `users`.* FROM `users` WHERE `users`.`notes` = '1' AND (`users`.`id` > 18067)  ORDER BY `users`.`id` ASC LIMIT 1000
      ...

しっかり全てのクエリに`users`.`notes` = '1'という条件が付いていますね。

ところで、この\`users\`.\`id\` > 11955 の`11955`というidはどこから出てきたんだろう？

```rb
while records.any?
  records_size = records.size
  primary_key_offset = records.last.id
  raise "Primary key not included in the custom select clause" unless primary_key_offset

  yield records

  break if records_size < batch_size

  records = relation.where(table[primary_key].gt(primary_key_offset)).to_a
end
```

ポイントとなっているコード箇所を抜き出すとここ。

```rb
primary_key_offset = records.last.id
relation.where(table[primary_key].gt(primary_key_offset))
```

最初に取得した1000件のうちの`last.id`を取得してそれより大きいidを条件として次の1000件を取得する、というようになっているようです。

## まとめ

* find_eachはデフォルトで1000件ずつ処理する
* find_eachにおいてorderとlimitは無視される
* where付きの場合は1000件取得してその中のlast.idを使ってさらに次の1000件を取得してループを回していく

## 参考
* [ActiveRecord::Batches](http://api.rubyonrails.org/classes/ActiveRecord/Batches.html)
