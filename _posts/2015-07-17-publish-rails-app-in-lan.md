---
layout: post
title: RailsアプリケーションをLAN内に公開する
published: true
description: 普通に`rails server`した場合、デフォルトでlocalhost:3000でリッスンするので、LAN(Local Area Network)内の外部のクライアントからLocal IPではアクセスすることができません。これを解決するためにはどうしたらよいでしょうか。
tags: rails network
---

普通に`rails server`した場合、デフォルトでlocalhost:3000でリッスンするので、LAN(Local Area Network)内の外部のクライアントからローカルIPではアクセスすることができません。

    $ rails server
    => Booting WEBrick
    => Rails 4.2.3 application starting in development on http://localhost:3000
    => Run `rails server -h` for more startup options
    => Ctrl-C to shutdown server

これをLAN内に公開したい場合はどうするか。下記のように`binding`のオプションを付けてその値として`0.0.0.0`を指定します。

    $ rails server --binding=0.0.0.0
    => Booting WEBrick
    => Rails 4.2.3 application starting in development on http://0.0.0.0:3000
    => Run `rails server -h` for more startup options
    => Ctrl-C to shutdown server

このコマンドを使うことで同じLAN内にいるクライアントからRailsが起動しているマシンのローカルIPをポート番号とともに（例: `192.168.1.xx:3000`）を叩けば、アプリケーションへとアクセス可能になります。

## なぜ0.0.0.0？

`rails server`コマンドはデフォルトで**ループバックアドレス**、つまりlocalhost(`127.0.0.1`)にバインドされます。ループバックアドレスは自分自身を指し示すアドレスなのでなので外部からのアクセスは弾かれます。

> 常に「自分自身」を指すIPアドレスは、当然ですが、他のコンピュータとの通信などには使えません。
>
> [ローカルループバックアドレス \| IPラーニング](http://www.arearesearch.co.jp/learn/ip/09.html)

よってデフォルトの`rails server`起動コマンドではでは外部からのアクセスは遮断されます。

一方、`0.0.0.0`はどうかというと、`0.0.0.0`のアドレスには複数の意味があり文脈によって意味が異なっています。今回の場合、ループバックアドレス含む全てのIPアドレスという意味です。ときに`0.0.0.0`のアドレスは**ワイルドカードアドレス**と言われることもあります。

> システムにおけるすべてのインタフェースのすべてのIPアドレス
>
> [IPv4アドレス「0.0.0.0」の意味は? \| マイナビニュース](http://news.mynavi.jp/news/2016/10/25/414/)

本記事で紹介した`rails server`のコマンドは`binding`オプションによって`0.0.0.0`に明示的にバインドすることにより、外部からのアクセスも許可しています。

## 参考

* [osx yosemite - Rails application not visible to local network - Stack Overflow](http://stackoverflow.com/questions/29132719/rails-application-not-visible-to-local-network)
* [What Does The IP Address 0.0.0.0 Really Mean? What Are Its Different Uses?](https://fossbytes.com/ip-address-0-0-0-0-meaning-default-route-uses/)
