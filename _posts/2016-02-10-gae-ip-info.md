---
title: 接続元のグローバルIP出すやつ作った
published: true
last_modified_at: 2019-05-19
image: /images/posts/ip.png
description: 確認くんとかいちいち検索してページにいったりするのがダルかったので、自分のわかりやすいURLでGoogle App Engine上にPHPで接続元グローバルIP出すやつ作った。
tags: google-app-engine php
---

[確認くん](http://www.ugtop.com/spill.shtml)とかいちいち検索してページにいったりするのがダルかったので、自分のわかりやすいURLでGoogle App Engine上にPHPで接続元グローバルIP出すやつ作った。

[Your IP address info](https://ip.toshima.ru/)

## 裏機能

コマンドラインで簡単に抽出できるように`curl`で叩いたらIPだけ出力するような裏機能付けた。

```console
$ curl -L ip.toshima.ru
xxx.xxx.x.x
```

## Google App Engine という選択

Google App Engine、一昔前はとっつきにくかったけど今は管理画面も使いやすくなってドキュメントも丁寧になってきたしデプロイ周りのCLIツールも整ってきているので良い感じである。

Herokuが有料になった今、個人サービスでなにかさっと作りたいときはGAEは良さそう。
