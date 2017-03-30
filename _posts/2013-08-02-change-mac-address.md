---
layout: post
title: MacOSでMACアドレスを変更するコマンド
published: true
description: MACアドレスを変更するコマンドが思ったより簡単に実行できたのでご紹介。(MAC OS X 10.8)
tags: mac network
---

## MACアドレスの変更コマンド

MACアドレスを変更するコマンドが思ったより簡単に実行できたのでご紹介。(環境はMac OS X 10.8)

```bash
sudo ifconfig en0 ether XX:XX:XX:XX:XX:XX
```

`XX:XX:XX:XX:XX:XX` の部分に変更したいMACアドレスを入れて実行してください。

## ランダムなMACアドレスを生成

MACアドレスを適当に生成したければこちらをどうぞ。

```bash
openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//'
```

このコマンドで下記のようなランダムなMACアドレスを生成してくれます。

```
f8:e4:03:88:9d:37
83:c8:ab:8b:39:4d
0b:ad:21:f1:03:9c
...
```


参考
-----
* [How do I change my MAC address?](http://whatismyipaddress.com/change-mac)
