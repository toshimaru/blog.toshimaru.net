---
layout: post
title: ActiveRecordのコールバックの順番・コールバック内のロールバック処理
published: true
image: https://cloud.githubusercontent.com/assets/803398/6426418/93196ff6-bf9c-11e4-8c17-22313b481b8d.png
description: ActiveRecordのコールバックが実行される順番、およびそれらのタイミングでのロールバックするためのやり方をまとめてみました。
tags: rails
---

ActiveRecordのコールバックが実行される順番、およびそれらのタイミングでのロールバックするためのやり方をまとめてみました。

## Callback Timing

まずは順番について。このようなオーダーです。

* (-) save
* (-) valid
* (1) before_validation
* (-) validate
* (2) after_validation
* (3) before_save
* (4) before_create
* (-) create
* (5) after_create
* (6) after_save
* (7) after_commit

## 試してみる

それぞれのコールバックをコードで試してみる。こんなコールバックを設定したUserモデルを作る。

{% highlight ruby %}
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called" }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_save -> { puts "after_save is called" }
  after_commit -> { puts "after_commit is called" }
end
{% endhighlight %}

###  新規レコード作成時

こいつをsaveしてみる。

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

コールバックのタイミングとクエリの走るタイミングが可視化された。

###  レコード更新時

updateの場合はこんな感じ。

     > user.update(name: "hoge")
        (0.1ms)  begin transaction
     before_validation is called
     after_validation is called
     before_save is called
       SQL (0.4ms)  UPDATE "users" SET "name" = ?, "updated_at" = ? WHERE "users"."id" = ?  [["name", "hoge"], ["updated_at", "2015-02-28 15:58:37.577661"], ["id", 6]]
     after_save is called
        (0.8ms)  commit transaction
     after_commit is called
      => true

更新なので `before_create` `after_create` は呼ばれない。

## save,updateはトランザクション内で実行される

[ドキュメント](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)にはこう書いてある

> The entire callback chain of a save, save!, or destroy call runs within a transaction. That includes after_* hooks. If everything goes fine a COMMIT is executed once the chain has been completed.

`save`, `save!`, `destroy`のコールバック群はトランザクション内で処理されますよ、と。

## 特定のコールバックのタイミングで処理をロールバックさせたい

ではそれらのコールバックでのタイミングでトランザクションをロールバックすることも可能。どうやれば良いのか調べてみた。

### before_* のタイミングでロールバック

`before_*`のタイミングで false を返すと処理はロールバックされる。

{% highlight ruby %}
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called"; false }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_save -> { puts "after_save is called" }
  after_commit -> { puts "after_commit is called" }
end
{% endhighlight %}

    > User.new.save
    (0.1ms)  begin transaction
    before_validation is called
    after_validation is called
    before_save is called
    (0.1ms)  rollback transaction
    => false

しかし`after_*`で false を返しても処理はロールバックされないようだ。

### after_* のタイミングでロールバック

after_* のタイミングでロールバックしたい場合は、明示的にRollbackをraiseしてやれば :ok:

{% highlight ruby %}
class User < ActiveRecord::Base
  before_validation -> { puts "before_validation is called" }
  after_validation -> { puts "after_validation is called" }
  before_save -> { puts "before_save is called" }
  before_create -> { puts "before_create is called" }
  after_create -> { puts "after_create is called" }
  after_save -> { puts "after_save is called"; raise ActiveRecord::Rollback }
  after_commit -> { puts "after_commit is called" }
end
{% endhighlight %}

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

update も同様にこれでRollbackできます。

### 参考
* [ActiveRecord::Callbacks](http://api.rubyonrails.org/classes/ActiveRecord/Callbacks.html)
* [» Railsのコールバックまとめ TECHSCORE BLOG](http://www.techscore.com/blog/2012/12/25/rails%E3%81%AE%E3%82%B3%E3%83%BC%E3%83%AB%E3%83%90%E3%83%83%E3%82%AF%E3%81%BE%E3%81%A8%E3%82%81/)
