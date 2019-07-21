---
layout: post
title: Google App Engineを第一世代から第二世代に乗り換えた
image: "/images/posts/gae/first-vs-second.png"
description: "Google App Engineを第一世代から第二世代に乗り換えました。GoとPHPの環境をGoogle App Engine上にもっているのですが、それぞれGoは1.9から1.11、PHPは5.5から7.2へのアップデートとなります。第一世代から第二世代の比較　第一世代と第二世代は何が違うのか？ 公式ドキュメントを参照します。ポイントとしては下記になるでしょうか。 サポート言語のバージョンアップ gVisorベースなコンテナサンドボックス環境 /tmpへのRead/Writeアクセス 外部ネットワーク通信が自由に可能に どんな拡張・ライブラリも利用可能に"
tags: google-app-engine
hideimage: true
toc: true
---

Google App Engineを第一世代から第二世代に乗り換えました。GoとPHPの環境をGoogle App Engine上にもっているのですが、それぞれGoは1.9から1.11、PHPは5.5から7.2へのアップデートとなります。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Google App Engine で動かしているGoの環境を1.9から1.11に上げた。わりとすんなりいけた</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1128368940919529472?ref_src=twsrc%5Etfw">May 14, 2019</a></blockquote>
<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="ja" dir="ltr">勢いでPHP on Google App Engine もphp 5.5からphp 7.2に上げといた</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1129004376566030336?ref_src=twsrc%5Etfw">May 16, 2019</a></blockquote>

## 第一世代から第二世代の比較

**第一世代と第二世代は何が違うのか？** [公式ドキュメント](https://cloud.google.com/appengine/docs/standard/runtimes)を参照します。

![first vs second](/images/posts/gae/first-vs-second.png)

ポイントとしては下記になるでしょうか。

- サポート言語のバージョンアップ
- [gVisor](https://github.com/google/gvisor)ベースなコンテナサンドボックス環境
- `/tmp`へのRead/Writeアクセス
- 外部ネットワーク通信が自由に可能に
- どんな拡張・ライブラリも利用可能に

## どのように移行したらよいの？

下記のようにアプリケーションの移行のための公式ドキュメントが用意されているのでそれを参照しながら進めるのがよいでしょう。

- [Migrating your App Engine app from Go 1.9 to Go 1.11](https://cloud.google.com/appengine/docs/standard/go111/go-differences)
- [Migrating Your App from PHP 5.5 to PHP 7.2](https://cloud.google.com/appengine/docs/standard/php7/php-differences)

## 注意点

### app.yaml の変更

`app.yaml`で定義した`api_version`や`login`が使えなくなるなど`app.yaml`を書き換える必要があります。この変更は先に引用した公式の移行ドキュメント通りにすすめていけば問題ないです。

公式がGitHub上でサンプルコードを提供しているのでそれを見るのが手っ取り早いかもしれません。

- [PHPのGitHubサンプル](https://github.com/GoogleCloudPlatform/php-docs-samples/tree/master/appengine/php72)
- [GoのGitHubサンプル](https://github.com/GoogleCloudPlatform/golang-samples/tree/master/appengine/go11x)

### 第一世代と第二世代の間の過渡期世代がある

![first vs second](/images/posts/gae/gae-1st-2nd.png)

> - サンドボックスの制限あり かつ App Engine API 対応 の 純粋な 1st gen ランタイム
> - サンドボックスの制限なし かつ App Engine API 対応 の 過渡期のランタイム
> - サンドボックスの制限なし かつ App Engine API 非対応 の 純粋な 2nd gen ランタイム
>
> の3つに分けることができます。そして 過渡期のランタイム が古い定義では区別せずに 2nd gen と呼ばれていたのに対し、新しい定義では区別せずに 1st gen と呼ばれています。

ref. [GAE Go 1.11 ランタイムが公式には 2nd gen ではなくなった件について - Qiita](https://qiita.com/apstndb/items/314e461aed518a4ad26f#%E8%80%83%E5%AF%9F)

上引用の通り、**第二世代にはApp Engine API対応の過渡期の世代とApp Engine API非対応の完璧な第二世代があります**。

ここで言うとJava 8、Go 1.11が過渡期の世代にあたるようです。Go 1.12やPHP 7.2のバージョンの世代は完璧な第二世代にあたるので、App Engine APIは利用不可となります。

### PHP7.2は dev_appserver.py が使えない

> dev_appserver.py is not supported with the PHP 7.2 runtime. To test your application and run it locally, you must download and install PHP 7.2 and set up a web server.

ref. [Migrating Your App from PHP 5.5 to PHP 7.2  \|  App Engine standard environment for PHP 7.2 docs  \|  Google Cloud](https://cloud.google.com/appengine/docs/standard/php7/php-differences#running_your_application_locally)

PHP7.2を利用する場合 `dev_appserver.py` は使えなくなるようなので、PHPのビルトインウェブサーバーを使えとのことです。下記のコマンドでPHPが動作するWebサーバーを起動させましょう。

```
$ php -S localhost:8080
```

参考: [超簡単コマンドでローカルにHTTPサーバーを起動する方法](/simple-command-web-server/)

## App Engine APIの移行先

App Engine APIが使えなくなった後、どのようなサービスに移行したらいいのでしょうか？ 下記のようにまとめることができるでしょう。

> - Users -> Identity-Aware Proxy?
> - Memcache -> Cloud Memorystore for Redis
> - Datastore -> Cloud Datastore
> - Search -> ...?
> - Mail -> SendGrid?
> - TaskQueue -> Cloud Tasks
> - Cron -> Cloud Scheduler
> - Image -> ...?

ref. [App Engine Standard Go 1.9 migration to Go 1.11 · gcpug/nouhau](https://github.com/gcpug/nouhau/blob/0bf7d48d3638f6e3969358ebbcb0ecf5d900f0e2/app-engine/note/gaego19-migration-gaego111/README.md)

個人的には `login:required`, `login:admin` の[廃止](https://github.com/gcpug/nouhau/blob/0bf7d48d3638f6e3969358ebbcb0ecf5d900f0e2/app-engine/note/gaego19-migration-gaego111/README.md#loginrequired--loginadmin-%E3%81%AE%E5%BB%83%E6%AD%A2)が一番辛くて、移行も大変だなぁと思うところであります。

## 参考

- [GAE Go 1.11 ランタイムが公式には 2nd gen ではなくなった件について - Qiita](https://qiita.com/apstndb/items/314e461aed518a4ad26f)
- [Google App Engine PHP 7.2 がリリース！これまでの違いと利用手順 - koni blog](https://koni.hateblo.jp/entry/2018/12/11/100000)
- [App Engine Standard Go 1.9 migration to Go 1.11に最低限必要なこと](https://github.com/gcpug/nouhau/blob/master/app-engine/note/gaego19-migration-gaego111/README.md)
