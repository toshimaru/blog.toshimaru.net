---
layout: post
title: ActiveRecordのコールバックの順序・コールバック内のロールバック処理について
published: true
description: ActiveRecordのコールバックが実行される順序、およびそれらのタイミングでのロールバックするためのやり方をまとめてみました。
tags: rails activerecord
---

ActiveRecordのコールバックが実行される順序、およびそれらのタイミングでのロールバックするためのやり方をまとめてみました。

## Callback タイミング

まずは順序について。下記のようになっています。

1. `before_validation`
1. `after_validation`
1. `before_save`
1. `before_create` or `before_update`
1. `after_create` or `after_update`
1. `after_save`
1. `after_commit`

## 実際にコードで試してみる

それぞれのコールバックをコードで試してみる。こんなコールバックを設定したUserモデルを作る。

```rb
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called" }
  before_update -> { puts "before_update is called" }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_update -> { puts "after_update is called" }
  after_save -> { puts "after_save is called" }
  after_commit -> { puts "after_commit is called" }
end
```

### 新規レコード作成時

このモデルをnewしてsaveしてみる。

```
> User.new.save
   (0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
before_create is called
  SQL (0.6ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2015-02-28 15:53:53.000058"], ["updated_at", "2015-02-28 15:53:53.000058"]]
after_create is called
after_save is called
   (485.3ms)  commit transaction
after_commit is called
 => true
```

新規作成なので、更新時のコールバックである`before_update`, `after_update`は呼ばれない。

トランザクションが開始され`before_create`後にクエリが走る。その後、`after_save`のコールバックが呼ばれトランザクションがコミットされる。

### レコード更新時

同モデルのupdateの場合はこんな感じ。

```
> user.update(name: "toshi")
  (0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
before_update is called
 SQL (0.3ms)  UPDATE "users" SET "name" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "toshi"], ["updated_at", "2016-01-21 08:04:19.290079"], ["id", 1]]
after_update is called
after_save is called
   (2.5ms)  commit transaction
after_commit is called
=> true
```

更新なので `before_create` `after_create` は呼ばれない。その代わりに`before_update`, `after_update`が実行される。

## save/update はトランザクション内で実行される

[ドキュメント](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)にはこう書いてある。

> The entire callback chain of a save, save!, or destroy call runs within a transaction. That includes after_* hooks. If everything goes fine a COMMIT is executed once the chain has been completed.

つまり、`save`, `save!`, `destroy`のコールバック群はトランザクション内で処理され、全てのコールバックが問題なく通ればコミットされますよ、と。

## 特定のコールバックのタイミングで処理をロールバックさせたい

それらのコールバックでの任意のタイミングでトランザクションをロールバックすることも可能。どうやれば良いのか調べてみた。

### before_* のタイミングでロールバックする場合

`before_*`のタイミングで false を返すと処理はロールバックされる。

```rb
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called"; false }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_save -> { puts "after_save is called" }
  after_commit -> { puts "after_commit is called" }
end
```

```
> User.new.save
(0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
(0.1ms)  rollback transaction
=> false
```

しかし`after_*`で false を返しても処理はロールバックされないようだ。

### after_* のタイミングでロールバックする場合

after_* のタイミングでロールバックしたい場合は、明示的にRollbackをraiseしてやれば :ok:

```rb
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called" }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_save -> { puts "after_save is called"; raise ActiveRecord::Rollback }
  after_commit -> { puts "after_commit is called" }
end
```

```
> User.new.save
   (0.1ms)  begin transaction
before_validation is called
after_validation is called
before_save is called
before_create is called
  SQL (0.4ms)  INSERT INTO "users" ("created_at", "updated_at") VALUES (?, ?)  [["created_at", "2015-02-28 16:49:35.344885"], ["updated_at", "2015-02-28 16:49:35.344885"]]
after_create is called
after_save is called
   (2.4ms)  rollback transaction
 => nil
```

update も同様にこの方法でロールバックできます。

## 参考

* [ActiveRecord::Callbacks](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)
* [» Railsのコールバックまとめ TECHSCORE BLOG](http://www.techscore.com/blog/2012/12/25/rails%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E3%81%BE%E3%81%A8%E3%82%81/)
