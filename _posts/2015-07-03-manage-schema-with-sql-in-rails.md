---
layout: post
title: SQLファイルでRailsのスキーマ情報管理
published: true
description: Railsではdb:migrateすると、デフォルトでdb/schema.rbを生成しますが、SQLでスキーマ情報を管理することも可能です。下記のようにconfig/application.rb内でactive_record.schema_formatを:sqlと設定することで可能になります（デフォルト値は:ruby）。
tags: rails activerecord
---

Railsでは`db:migrate`すると、デフォルトで`db/schema.rb`を生成しますが、SQLでスキーマ情報を管理することも可能です。下記のように`config/application.rb`内で`active_record.schema_format`を`:sql`と設定することで可能になります（デフォルト値は`:ruby`）。

{% highlight ruby %}
# config/application.rb
module Rails4TwitterClone
  class Application < Rails::Application
    config.active_record.schema_format = :sql
  end
end
{% endhighlight %}

これで`db/migrate`するとデフォルトのschema.rbではなく、`db/structure.sql`というSQLファイルを吐きます。

## structure.sqlをロードする

生成されたstructure.sqlファイルは、下記のコマンドでデータベースへロードできます。

    rake db:structure:load

## SQLファイルだけ欲しい場合

sqlダンプファイルのみが欲しい場合は、`config.active_record.schema_format`の設定を変えずとも下記コマンドでstructure.sqlを生成することができます。

    rake db:structure:dump

### 参考
* [schema.rbじゃなくてstructure.sqlでスキーマ情報を管理しよう - tech-kazuhisa's blog](http://tech-kazuhisa.hatenablog.com/entry/20130902/1378126825)
* [Active Record Migrations — Ruby on Rails Guides](http://edgeguides.rubyonrails.org/active_record_migrations.html#types-of-schema-dumps)
