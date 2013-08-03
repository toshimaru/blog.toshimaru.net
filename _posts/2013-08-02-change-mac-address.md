---
layout: post
title: MACアドレスを変更するコマンド
published: true
description: MACアドレスを変更するコマンドが思ったより簡単に実行できたのでご紹介。(MAC OS X 10.8)
tags: mac network
---

MACアドレスを変更するコマンドが思ったより簡単に実行できたのでご紹介。(MAC OS X 10.8)

    sudo ifconfig en0 ether XX:XX:XX:XX:XX:XX

MACアドレスを適当に生成したければこちらをどうぞ。

    openssl rand -hex 6 | sed 's/\(..\)/\1:/g; s/.$//'

参考
-----
* [How do I change my MAC address?](http://whatismyipaddress.com/change-mac)
