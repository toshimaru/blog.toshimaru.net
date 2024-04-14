---
layout: post
title: docomo雑談対話APIでリプライ返すhubotプラグイン作った
description: 五番煎じくらいになりますが、docomo雑談対話APIを使ってリプライを返すhubotプラグインを作りました。
tags: hubot npm oss
---

五番煎じくらいになりますが、docomo雑談対話APIを使ってリプライを返すhubotプラグインを作りました。

[toshimaru/hubot-docomochatter](https://github.com/toshimaru/hubot-docomochatter)

* [toshimaru/docomochatter](https://github.com/toshimaru/docomochatter)というシンプルなAPIクライアントをまず作り、それを利用するかたちでプラグインを作った
* 既に定義された`hubot ping`などのコマンドに対しては返答しないようにし、マッチするコマンドが他にない場合にプラグインが反応するようにした。 このへんのやり方についてはこちらを参照した: [Hubotで「どのコマンドにも一致しない」ときの処理 - Qiita](http://qiita.com/hiconyan/items/baf6ac56129a26d8ac0c)
* ルーム毎（SlackでいうところのChannel）にcontextを保存するようにした
* `DOCOMO_API_KEY`という環境変数使ってAPIアクセスする

### 参考

* [雑談対話 \| docomo Developer support \| NTTドコモ](https://dev.smt.docomo.ne.jp/?p=docs.api.page&api_name=dialogue&p_name=api_reference)
