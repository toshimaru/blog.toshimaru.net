---
layout: post
title: Rails4 でトランザクション分離レベルを設定する
published: true
description: Railsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょう？ 実はRails3.xとRails4ではトランザクション分離レベルの設定方法は異なっています。
tags: rails mysql
toc: true
---

MySQLのトランザクション分離レベル
---

MySQLのデフォルトのトランザクション分離レベルは何か？

> **REPEATABLE READ**
>
> This is the default isolation level for InnoDB.

via. [13.3.6 SET TRANSACTION Syntax](http://dev.mysql.com/doc/refman/5.0/en/set-transaction.html)

ハイ、答えは「REPEATABLE READ」ですネ.

Rails4でトランザクション分離レベルを設定
---

では次にRailsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょう？ 実はRails3.xとRails4ではトランザクション分離レベルの設定方法は異なっています。

[Rails & MySQL: トランザクション分離レベルをグローバルに設定する](http://d.hatena.ne.jp/tkrd/20131121/1385044179)

*（引用ここから）*

Rails 3.x 時代までは、

{% highlight ruby %}
ActiveRecord::Base.connection.
  execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')
ActiveRecord::Base.transaction do
  # ...
end
{% endhighlight %}

のように書かなければなりませんでしたが、Rails 4 でトランザクションごとに分離レベルを指定できるようになりました：

{% highlight ruby %}
ActiveRecord::Base.transaction(isolation: :read_committed) do
  # ...
end
{% endhighlight %}

*（引用ここまで）*

有効なトランザクション分離レベル
---

設定可能で有効な`isolation:`レベルは何でしょう？　下記４つになります。

> Valid isolation levels are:
>
> * `:read_uncommitted`
> * `:read_committed`
> * `:repeatable_read`
> * `:serializable`

via. [Rails 4 - Transaction isolation level](http://blog.railsupgrade.com/2012/09/rails-4-transaction-isolation-level.html)

分離レベルとダーティリード、ファジーリード、ファントムリードの関係
---

分離レベルとダーティリード、ファジーリード、ファントムリードそれぞれの関係性は以下。

| | ダーティリード | ファジーリード | ファントムリード |
| - | - | - | - |
| **READ UNCOMMITTED** | 発生する  | 発生する | 発生する |
| **READ COMMITTED**   | 発生しない | 発生する | 発生する |
| **REPEATABLE READ**  | 発生しない | 発生しない | 発生する |
| **SERIALIZABLE**     | 発生しない | 発生しない | 発生しない |

via. [トランザクション分離レベルについて極力分かりやすく解説してみた[SQL]](http://gyouza-daisuki.hatenablog.com/entry/2013/11/19/150838)

適切なトランザクション分離レベルで適切なトランザクション処理をしましょう！

### 参考

* [Rails & MySQL: トランザクション分離レベルをグローバルに設定する](http://d.hatena.ne.jp/tkrd/20131121/1385044179)
* [Rails 4 - Transaction isolation level](http://blog.railsupgrade.com/2012/09/rails-4-transaction-isolation-level.html)
* [トランザクション分離レベルについて極力分かりやすく解説してみた[SQL]](http://gyouza-daisuki.hatenablog.com/entry/2013/11/19/150838)
