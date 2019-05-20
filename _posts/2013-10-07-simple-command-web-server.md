---
layout: post
title: 超簡単コマンドでローカルにHTTPサーバーを起動する方法
description: ローカル上にWEBサーバーを起動できる超簡単なワンラインコマンドを紹介します
modified_date: 2019-05-20
tags: php python
---

スタティックなサイトをサクッとローカルで確認したいときのTipsです。

## PHPを使う

[PHPのビルトインウェブサーバー](http://php.net/manual/ja/features.commandline.webserver.php)を使うのが最も簡単な方法だと思います。

```console
$ php -S localhost:8888
```

## Pytnonを使う

pythonを使うならこんな感じ。

```console
$ python -m SimpleHTTPServer
```

これでポート8000でWebサーバが起動。ポート指定したければこう。

```console
$ python -m SimpleHTTPServer 8888
```

## 参考

- [ワンライナーWebサーバを集めてみた - Qiita](https://qiita.com/sudahiroshi/items/e74d61d939f18779970d)
