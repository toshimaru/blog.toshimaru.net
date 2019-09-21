---
layout: post
title: Rails でトランザクション分離レベルを設定する方法
published: true
description: 突然ですが問題です。MySQLのデフォルトのトランザクション分離レベルは何でしょうか？　続いての問題です。Railsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょうか？ 実は Rails 3 と Rails 4 と Rails 5 以降ではトランザクション分離レベルの設定方法はそれぞれ異なっています。
tags: rails activerecord mysql
toc: true
last_modified_at: 2019-09-21
---

**追記** 

- 2019-09-21: Rails5, Rails6 向けに記事の内容をアップデートしました

## MySQLのトランザクション分離レベル

突然ですが問題です。MySQLのデフォルトのトランザクション分離レベルは何でしょうか？

> **REPEATABLE READ**
>
> This is the default isolation level for InnoDB.

via. [MySQL :: MySQL 8.0 Reference Manual :: 15.7.2.1 Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html#isolevel_repeatable-read)

ハイ、答えは「**REPEATABLE READ**」ですネ。

## Railsでトランザクション分離レベルを設定

続いての問題です。Railsにおいてトランザクション分離レベルを設定するにはどうしたらよいでしょうか？ 実は Rails 3 と Rails 4 と Rails 5 以降ではトランザクション分離レベルの設定方法はそれぞれ異なっています。

### Rails 3

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
  user = User.lock.find(1)
  user.update! name: "TEST"
end
```

上記のコードを pry で実行した際に流れるクエリは下記の通りです。

```
   (0.5ms)  SET TRANSACTION ISOLATION LEVEL READ COMMITTED
   (0.3ms)  BEGIN
  User Load (0.9ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1 FOR UPDATE
  User Update (0.4ms)  UPDATE `users` SET `name` = 'TEST', `updated_at` = '2019-09-20 16:34:31' WHERE `users`.`id` = 1
   (1.5ms)  COMMIT
=> true
```

## 有効なトランザクション分離レベル

Railsで設定可能かつ有効な`isolation`レベルは何でしょうか？　答えは下記４つになります。

> Valid isolation levels are:
>
> - `:read_uncommitted`
> - `:read_committed`
> - `:repeatable_read`
> - `:serializable`

via. [ActiveRecord::ConnectionAdapters::DatabaseStatements \| RailsDoc](https://railsdoc.github.io/classes/ActiveRecord/ConnectionAdapters/DatabaseStatements.html#method-i-transaction-label-Transaction+isolation)

## 分離レベルとダーティリード、ファジーリード、ファントムリードの関係

分離レベルとダーティリード、ファジーリード、ファントムリードそれぞれの関係性は以下の通り。

| トランザクション分離レベル | ダーティリード | ファジーリード | ファントムリード |
| --- | --- | --- | --- |
| **READ UNCOMMITTED** | 💀発生する  | 💀発生する | 💀発生する |
| **READ COMMITTED**   | 発生しない | 💀発生する | 💀発生する |
| **REPEATABLE READ**  | 発生しない | 発生しない | 💀発生する |
| **SERIALIZABLE**     | 発生しない | 発生しない | 発生しない |

via. [[RDBMS][SQL]トランザクション分離レベルについて極力分かりやすく解説 - Qiita](https://qiita.com/PruneMazui/items/4135fcf7621869726b4b)

## 最後に

適切なトランザクション分離レベルで適切なトランザクション処理をしましょう！

## 参考

* [Rails & MySQL: トランザクション分離レベルをグローバルに設定する](https://tkrd.hatenadiary.org/entry/20131121/1385044179)
* [ActiveRecord::ConnectionAdapters::DatabaseStatements \| RailsDoc](https://railsdoc.github.io/classes/ActiveRecord/ConnectionAdapters/DatabaseStatements.html#method-i-transaction-label-Transaction+isolation)
* [[RDBMS][SQL]トランザクション分離レベルについて極力分かりやすく解説 - Qiita](https://qiita.com/PruneMazui/items/4135fcf7621869726b4b)
