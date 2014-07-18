---
layout: post
title: RSpec2からRSpec3にバージョン上げたらテストがFailしまくった話
published: true
description: 遊びで作ってるRailsアプリケーションのRSpecのバージョンを２から３に上げたら、２では全部通ってたテストが３にした途端テストが100個くらいFailした。一体何が起こっているかわからなかったのでRSpec3の挙動の違いを調べてみることにした。
tags: ruby rspec
---

遊びで作ってるRailsアプリケーションのRSpecのバージョンを２から３に上げたら、２では全部通ってたテストが３にした途端テストが100個くらいFailした。一体何が起こっているかわからなかったのでRSpec3の挙動の違いを調べてみることにした。

`rspec-rails`を`bundle install`したあと`rspec:install`する。

    $ rails g rspec:install
    create  .rspec
    create  spec
    create  spec/spec_helper.rb
    create  spec/rails_helper.rb

今までなかった`rails_helper.rb`ってのが作られている。`scaffold`で生成されるspecディレクトリの構成はこう。

    spec
    ├── controllers
    │   └── users_controller_spec.rb
    ├── helpers
    │   └── users_helper_spec.rb
    ├── models
    │   └── user_spec.rb
    ├── rails_helper.rb
    ├── requests
    │   └── users_spec.rb
    ├── routing
    │   └── users_routing_spec.rb
    ├── spec_helper.rb
    └── views
        └── users
            ├── edit.html.erb_spec.rb
            ├── index.html.erb_spec.rb
            ├── new.html.erb_spec.rb
            └── show.html.erb_spec.rb

試しに`spec/controllers/users_controller_spec.rb`を開いてみると冒頭がこんな感じになっていました。

    require 'rails_helper'

[RSpec 3 時代の設定ファイル rails_helper.rb について](http://willnet.in/126)

> というわけで、これまで require 'spec_helper' としていた箇所の大部分は require 'rails_helper' に置換してあげる必要がありそうですね。パーフェクト Ruby on Rails のテストの章は require 'spec_helper' となっているので、RSpec 3 のリリース版を利用する場合は適宜読み替えをお願いします。

`spec_helper`を`rails_helper`に変えて、それらの２ファイルの設定をRSpec3用に見直せば全てのテストが問題なく通るようになりました、とさ。

RSpec3よりruby1.8,ruby1.9をサポートしなくなったり新しいマッチャーが増えたりしてるので変更点を下記より再度確認してみるとよいと思います。

[Notable Changes in RSpec 3](http://myronmars.to/n/dev-blog/2014/05/notable-changes-in-rspec-3)
