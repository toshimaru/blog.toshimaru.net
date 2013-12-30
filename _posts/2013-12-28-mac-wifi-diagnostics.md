---
layout: post
title: MacでWi-Fiのシグナル強度を調べる
published: true
description: カフェなんかでWi-Fi使っていると、Wi-FiがつながりにくくなってWi-Fiシグナル強度が弱いのかなーとか思って、シグナル強度調べるアプリを探していたところ、Mac標準搭載のアプリで発見。
tags: mac
---

カフェなんかでWi-Fi使っていると、Wi-FiがつながりにくくなってWi-Fiシグナル強度が弱いのかなーとか思って、シグナル強度調べるアプリを探していたところ、Mac標準搭載のアプリで発見。

アプリ名は「Wireless Diagnostics」。場所は自分の環境(Mountain Lion)で`/System/Library/CoreServices`にありました。

## 手順

* Wireless Diagnostics を開く。（コマンド: `open /System/Library/CoreServices/Wireless\ Diagnostics.app`）
* Utilitiesを開く(`⌘2`)
* `Wi-Fi Scan`のタブを選択して`Scan Now`をクリック。

![mac wi-fi scan](/images/posts/wifi-scan.png)

本画像のRSSI(Received signal strength indication)がシグナルの強度となります。値が高い方が「シグナルが強い」という意味になります。

詳しい説明を引用しておきます。

> シグナルの数値は、MacとWi-Fiアクセスポイントまたはルータ間のシグナルの強度を示します。数値が大きいほどシグナルは良好です> 。数値はマイナス表示なので、「-60」の方が「-80」よりも良好ということになります。
>
> ノイズの数値は、シグナルの障害となるワイヤレスノイズの大きさを示しています。この場合、数値は低いほうが良好です。ノイズも> マイナス表示なので、ノイズレベル「-94」の方が「-90」よりもノイズが少なくて良好なネットワーク状態である、ということを示し> ています。
>
> シグナルとノイズの数値を比較し、シグナル対ノイズの比率（SNR）を導き出しましょう。信号レベルが「-60」でノイズレベルが「-91」の場合、数値の差は「31」になります。SNRが高ければ高いほど、Wi-Fiのパフォーマンスが良好であることを示します。SNRが25以上であれば、Wi-Fiのパフォーマンスは良好といえるでしょう。
>
> ([Wi-Fiの電波が弱い？ Macには診断ツールを標準搭載しております](http://www.lifehacker.jp/2012/08/120807os_x_wifi.html))

Wi-Fiのパフォーマンスを調整したいときに是非つかいたいツールですね。

### 参考

* [Wi-Fi Scanner Tool is Native in Mac OS X, Here’s How to Use it](http://osxdaily.com/2012/07/31/wi-fi-scanner-mac-os-x-mountain-lion/)
