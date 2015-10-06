---
layout: post
title: Macbookでファン・照明・電源に問題が生じたときはSMCリセット
published: true
image: /images/posts/macbook.png
description: ファンが周り続けたときにSMCリセットしたら解決したよ、という話。
tags: mac
---

ファンが周り続けたときにSMCリセットしたら解決したよ、という話。

## 発生した問題
* 熱持ってるわけでもないし、CPU食いつぶされているわけでもないのに、**ファンがフル回転**
* **バッテリーの残り容量が出なくなる**

そんなときはSMCリセット。

## SMCリセットとは

SMCとはSystem Management Controllerの略。System Management Controllerとはシステム管理コントローラのこと。

SMCはMacの電源関係を処理するコンピュータチップのことで、システム起動、スリープ、バッテリーなど、電源関係のハードウエアをコントロールします。

## SMCリセット手順

公式の下記ドキュメントが最も参考になります。

[Mac の SMC (システム管理コントローラ) をリセットする - Apple サポート](https://support.apple.com/ja-jp/HT201295)

具体的にはMacbook Airで以下の手順となります。

1. コンピュータをシステム終了します。
1. MagSafe 電源アダプタまたは USB-C 電源アダプタをコンセントに接続し、コンピュータに接続します。
1. 内蔵キーボードで、「(左の) shift + control + option」キーを押しながら、電源ボタンを押します。
1. 3 つのキー全部と電源ボタンを同時に放します。
1. 電源ボタンを押してコンピュータを起動します。

## 参考
* [MacのSMCを初期化してスリープやバッテリーのトラブルなどに対処する方法 / Inforati](http://inforati.jp/apple/mac-tips-techniques/hardware-hints/how-to-reset-the-system-management-controller-of-mac.html)
* [MacBookAirのファンが止まらない⇒解決しました！ \| フリーランスの話のタネ](http://digitalnetcreate.com/blog/mac/mbafan/)
