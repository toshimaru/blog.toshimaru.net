---
layout: post
title: 超簡単なコマンドでローカルにHTTPサーバーを起動
published: true
description: ローカル上にWEBサーバーを起動できる超簡単なワンラインコマンドを紹介します
tags: php python
---

個人的には[PHPのビルトインウェブサーバー](http://php.net/manual/ja/features.commandline.webserver.php)の`PHP -S`コマンドが使いたいけど、php5.4以降じゃないと使えないのが難点。Macだとデフォルトで入ってるPHPバージョンは5.3なのでこのコマンドは使えない。ということでpythonの力をお借りして簡単にHTTPサーバが起動できる。


    $ python -m SimpleHTTPServer

これでポート8000でWebサーバが起動。ポート指定したければこう。

    $ python -m SimpleHTTPServer 8888

スタティックなサイトをサクッと確認したいときに使えます。以上、簡単なTIPSでした。

## 追記

今はMacでデフォルトで入っているPHPのバージョンが5.4なので下記のPHPコマンドでOKですね。

    $ php -S localhost:8888
