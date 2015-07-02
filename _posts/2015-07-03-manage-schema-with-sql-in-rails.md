---
layout: post
title: SQLファイルでRailsのスキーマ情報管理
published: true
description: Railsではdb:migrateすると、デフォルトでdb/schema.rbを生成しますが、SQLでスキーマ情報を管理することも可能です。下記のようにactive_record.schema_formatを:sqlと設定します。
tags: rails rake
---

Railsでは`db:migrate`すると、デフォルトで`db/schema.rb`を生成しますが、SQLでスキーマ情報を管理することも可能です。下記のように`active_record.schema_format`を`:sql`と設定します（デフォルト値は`:ruby`）。

{% highlight ruby %}
# config/application.rb
module Rails4TwitterClone
  class Application < Rails::Application
    config.active_record.schema_format = :sql
  end
end
{% endhighlight %}

これで`db/migrate`するとschema.rbではなく、`db/structure.sql`というSQLファイルを吐きます。

## structure.sqlをロードする

下記のコマンドでSQLをデータベースへロードできます。

    rake db:structure:load

## SQLファイルだけ欲しい場合

sqlダンプファイルのみ欲しい場合は下記のコマンドでstructure.sqlを生成できます。

    rake db:structure:dump

### 参考
* [schema.rbじゃなくてstructure.sqlでスキーマ情報を管理しよう - tech-kazuhisa's blog](http://tech-kazuhisa.hatenablog.com/entry/20130902/1378126825)
* [Active Record Migrations — Ruby on Rails Guides](http://edgeguides.rubyonrails.org/active_record_migrations.html#types-of-schema-dumps)
