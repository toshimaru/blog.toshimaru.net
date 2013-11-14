---
layout: post
title: WindowsコマンドでAmazon S3上にバックアップする
published: true
description: Windows PCを処分するにあたり、音楽、写真、動画などのデータ郡をamazon S3に置き管理することにしました。S3のGUIツールはコレといった定番がないようで（あったら教えてください）、挙動にもやや不安が残る感じでした。よって今回はDragon Diskコマンドラインツールを使ってローカルとS3をsync、同期することにしました。
tags: aws
---

Windows PCを処分するにあたり、音楽、写真、動画などのデータ郡をamazon S3に置き管理することにしました。S3のGUIツールはコレといった定番がないようで（あったら教えてください）、挙動にもやや不安が残る感じでした。よって今回はコマンドラインツールを使ってローカルとS3をsync、同期することにしました。

使ったツールは[Dragon Disk](http://www.dragondisk.com/)。トップにパッケージの写真があってやや有料の匂いがするが、無料なのでご安心を。

手順
---

1. [ダウンロードページ](http://www.dragondisk.com/download-amazon-s3-client-google-cloud-storage-client.html)からコマンドラインツールをダウンロード
2. 展開してその中に`dgsync.bat`ファイルを作成し、下記のようなバッチファイルを作成してください。
<script src="https://gist.github.com/toshimaru/5415149.js"></script>
* `DGTOOLS_ACCESS_KEY`、`DGTOOLS_SECRET_KEY`を適宜編集。
* ファイルの削除も同期をとりたい場合は`--dont-delete`オプションを外してください。
* S3上のフォルダはあらかじめ作成しておく。
3. ２で作成したバッチを実行する。

以上です。amazon S3を使って安全、安価にデータを保管しましょう！

【追記】そんなに「安価」って程ではない。(´・ω・｀)

参考
---
[Amazon S3のクライアント「DragonDisk」に付属の「dgsync」が便利な件](http://www.tdn.co.jp/techblog/201206/52/)
