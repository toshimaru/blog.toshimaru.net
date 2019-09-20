---
layout: post
title: Rails でトランザクション分離レベルを設定する方法
published: true
description: 突然ですが問題です。MySQLのデフォルトのトランザクション分離レベルは何でしょうか？　続いての問題です。Railsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょうか？ 実は Rails 3.x と Rails 4 と Rails 5 以降ではトランザクション分離レベルの設定方法はそれぞれ異なっています。
tags: rails activerecord mysql
toc: true
modified_date: 2019-09-21
---

**追記** 

- 2019-09-21: Rails5, Rails6向けに記事の内容をアップデートしました

## MySQLのトランザクション分離レベル

突然ですが問題です。MySQLのデフォルトのトランザクション分離レベルは何でしょうか？

> **REPEATABLE READ**
>
> This is the default isolation level for InnoDB.

via. [MySQL :: MySQL 8.0 Reference Manual :: 15.7.2.1 Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html#isolevel_repeatable-read)

ハイ、答えは「**REPEATABLE READ**」ですネ。

## Railsでトランザクション分離レベルを設定

続いての問題です。Railsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょうか？ 実は Rails 3.x と Rails 4 と Rails 5 以降ではトランザクション分離レベルの設定方法はそれぞれ異なっています。

### Rails 3.x

Rails 3の時代では `execute` で直接トランザクション分離レベルを設定する必要がありました。

```rb
ActiveRecord::Base.connection.execute('SET TRANSACTION ISOLATION LEVEL READ COMMITTED')
ActiveRecord::Base.transaction do
  # ...
end
```

### Rails 4.x

Rails 4からは`transaction`のオプションとしてトランザクション分離レベルを設定可能になりました。

```rb
ActiveRecord::Base.transaction(isolation: :read_committed) do
  # ...
end
```

### Rails 5 以降

Rails 5からは `ActiveRecord::Base` の代わりに `ApplicationRecord` が使うことができます。

> ApplicationRecord is a new superclass for all app models

via. [Ruby on Rails 5.0 Release Notes — Ruby on Rails Guides](https://edgeguides.rubyonrails.org/5_0_release_notes.html)

```rb
ApplicationRecord.transaction(isolation: :read_committed) do 
  User.find(1).update! name: "TEST"
end
```

上記のコードを pry で実行した際に流れるクエリは下記の通りです。

```
   (3.1ms)  SET TRANSACTION ISOLATION LEVEL READ COMMITTED
   (0.4ms)  BEGIN
  User Load (1.5ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
  User Update (1.1ms)  UPDATE `users` SET `name` = 'TEST', `updated_at` = '2019-09-20 15:54:16' WHERE `users`.`id` = 1
   (2.9ms)  COMMIT
=> true
```

## 有効なトランザクション分離レベル

設定可能な有効な`isolation`レベルは何でしょうか？　答えは下記４つになります。

> Valid isolation levels are:
>
> * `:read_uncommitted`
> * `:read_committed`
> * `:repeatable_read`
> * `:serializable`

via. [Rails 4 - Transaction isolation level](http://blog.railsupgrade.com/2012/09/rails-4-transaction-isolation-level.html)

## 分離レベルとダーティリード、ファジーリード、ファントムリードの関係

分離レベルとダーティリード、ファジーリード、ファントムリードそれぞれの関係性は以下の通り。

|     | ダーティリード | ファジーリード | ファントムリード |
| --- | --- | --- | --- |
| **READ UNCOMMITTED** | 💀発生する  | 💀発生する | 💀発生する |
| **READ COMMITTED**   | 発生しない | 💀発生する | 💀発生する |
| **REPEATABLE READ**  | 発生しない | 発生しない | 💀発生する |
| **SERIALIZABLE**     | 発生しない | 発生しない | 発生しない |

via. [トランザクション分離レベルについて極力分かりやすく解説してみた[SQL]](http://gyouza-daisuki.hatenablog.com/entry/2013/11/19/150838)

## 最後に

適切なトランザクション分離レベルで適切なトランザクション処理をしましょう！

## 参考

* [Rails & MySQL: トランザクション分離レベルをグローバルに設定する](http://d.hatena.ne.jp/tkrd/20131121/1385044179)
* [Rails 4 - Transaction isolation level](http://blog.railsupgrade.com/2012/09/rails-4-transaction-isolation-level.html)
* [トランザクション分離レベルについて極力分かりやすく解説してみた[SQL]](http://gyouza-daisuki.hatenablog.com/entry/2013/11/19/150838)
