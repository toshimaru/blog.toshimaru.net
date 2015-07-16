---
layout: post
title: RailsアプリケーションをLAN内に公開する
published: true
description: 普通に`rails server`した場合、デフォルトでlocalhost:3000でリッスンするので、LAN内の外部のクライアントからLocal IPではアクセスすることができません。これを解決するためにはどうしたらよいでしょうか。
tags: rails network
---

普通に`rails server`した場合、デフォルトでlocalhost:3000でリッスンするので、LAN内の外部のクライアントからLocal IPではアクセスすることができません。(Railsのバージョンは4.2.3です)

    $ rails server
    => Booting WEBrick
    => Rails 4.2.3 application starting in development on http://localhost:3000
    => Run `rails server -h` for more startup options
    => Ctrl-C to shutdown server

これをLAN内に公開したい場合はどうするか。下記のように`binding`オプションを付けてやります。

    $ rails server --binding=0.0.0.0
    => Booting WEBrick
    => Rails 4.2.3 application starting in development on http://0.0.0.0:3000
    => Run `rails server -h` for more startup options
    => Ctrl-C to shutdown server

これで同じLAN内にいるクライアントからローカルIP（e.g. `192.168.1.10:3000` ）でRailsへとアクセス可能になります。

### 参考
* [osx yosemite - Rails application not visible to local network - Stack Overflow](http://stackoverflow.com/questions/29132719/rails-application-not-visible-to-local-network)
