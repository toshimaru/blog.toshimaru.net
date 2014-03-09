---
layout: post
title: Chromebookを使ってみた WEBだけ使えればいい人にはオススメ
published: true
image: /images/posts/chromebook/chromebook2.jpg
description:
tags: chrome
---

[ついに激安PCのChromeBookが日本上陸！東芝が来月にも発売へ](http://blog.livedoor.jp/itsoku/archives/37545648.html)

Chromebookが日本にも来るようですね。カナダにて一足先にChromebookを一週間ほど触ってみたので、その感想を書いてみようと思います。

##スペック

購入したのはSamsungのChromebook. ３万円くらいでした。安い。

![chromebook pic 1](/images/posts/chromebook/chromebook1.jpg)

特徴はざっくりこんな感じ。

* 11.6 インチディスプレイ
* 約1キログラム
* 2GB メモリ
* 16GB SSD
* Samsung Exynos 5 Dual Processor

via. [Samsung Chromebook](https://www.google.com/intl/ms/chrome/devices/samsung-chromebook.html#specs)

重さも軽くノートのように持ち運べるので携帯性は優れてて良いかと。SSD容量が少ないのは「ファイルはローカルじゃなくWEBに置いてね」というChromeOSの思想から気にしちゃいけないところ。動作に関してはタブ何十枚も一度に開いたり動画を閲覧してたりするとモッサリするかなって感じだった。

何より驚いたのは起動の早さでした。本当に10秒くらいで起動するんですよ、これが。見てて気持ちよかった。

##Chrome OSの思想

ChromeOSは全ての作業がブラウザ/WEBで実行可能になりつつある昨今、生まれるべくして生まれたOSだと思う。僕らが日々パソコンの前に座って行う作業はウェブ上で可能な作業へとシフトしていっている。メールチェックはOutlookからGmailへと、ドキュメント作成はWord/ExcelからGoogleDocsへと、各種データはローカル保存からEvernote,DropBoxなどのクラウドストレージへと移行している。プログラミングですら[Cloud9 IDE](https://c9.io/)などのサービスでウェブ上で可能になっている。

ChromeOSには従来のようなデスクトップやファイルといった発想はない。

> Googleアカウントを利用してログインする。Google Chrome OSのユーザインタフェースは、基本的にGoogle Chromeだけが全面に出ている形で、デスクトップやファイルブラウザなどは無く、すべてのアプリケーションはウェブアプリケーションという形でGoogle Chromeにインストールされ、実行される。インストールしたアプリはGoogle Chromeにショートカットを作成してアクセスすることが出来る。
>
> [Google Chrome OS - Wikipedia](http://ja.wikipedia.org/wiki/Google_Chrome_OS)

起動するとこんな画面。一見他OSのデスクトップのようにファイルが置けたりするんじゃないの？って思うかもしれないけどそんなことはない。

![chromebook pic 2](/images/posts/chromebook/chromebook2.jpg)

基本的にアプリケーションはChrome上で動作するアプリケーションのみなので、下部にズラって並んでるのはChromeアプリのショートカットアイコン。クリックするとChromeが開きWEBアプリが起動する感じ。

##開発者マシンとして利用可能？

自分は開発者なので開発者マシンとして利用可能かも試してみた。

結論から言うと現時点では難しいという印象。

### Developer Mode

Chromebookには[Developerモード](http://www.chromium.org/chromium-os/chromiumos-design-docs/developer-mode)というのがあって、これをONにすることでシェル操作が可能になったりする。例えば自分のSamsung Chromebookであれば[この手順](http://www.chromium.org/chromium-os/developer-information-for-chrome-os-devices/samsung-arm-chromebook#TOC-Developer-Mode)でDeveloperモードがONにできた。

### Chrome上で動作する代替アプリケーション

Chrome上で動作する開発者用のアプリケーションとしてはこんなのが紹介されてる。

* [Secure Shell](https://chrome.google.com/webstore/detail/secure-shell/pnhechapfaindjhompbnflcldabbghjo) - ターミナル、SSHクライアント
* [Chrome Remote Desktop](https://chrome.google.com/webstore/detail/chrome-remote-desktop/gbchcmhmhahfdphkhkmpfmihenigjmpp) - リモートデスクトップ
* [Text](https://chrome.google.com/webstore/detail/text/mmfbcljfglbokpmkimbfghdkjmjhdgbg) - テキストエディタ
* [Beagle Term](https://chrome.google.com/webstore/detail/beagle-term/gkdofhllgfohlddimiiildbgoggdpoea) - ターミナルエミュレータ
* [Cloud9](https://chrome.google.com/webstore/detail/cloud9/nbdmccoknlfggadpfkmcpnamfnbkmkcp) - オンラインIDE
* [Runnable](http://runnable.com/) - クラウドベースIDE

via. [Developing apps on your Chromebook](http://www.chromium.org/chromium-os/developing-apps-on-your-chromium-os-device)

どれも悪くはないけど痒いところには手が届かない感じ。

###その他

他にも[Setting Up a Local Development Environment in Chrome OS](http://jeremyckahn.github.io/blog/2013/02/09/setting-up-a-local-development-environment-in-chrome-os/)や[How to Install Linux on a Chromebook and Unlock Its Full Potential](http://lifehacker.com/how-to-install-linux-on-a-chromebook-and-unlock-its-ful-509039343)なんかを参考に[crouton](https://github.com/dnschneid/crouton)を使ってみたりしたけど、まだまだ発展途中という印象だった。

###Tips

[100 Tips for Your Google Chromebook](http://www.chromestory.com/google-chromebook/)

## まとめ

パソコンの普段の使い方が「Gmailでメールチェック」「YouTube/ニコ動などで動画視聴」「Twitter/Facebook閲覧」などWEBに閉じている方であれば、Chromebookはオススメできます。WindowsやMacよりも低価格ですし、悪い買い物ではないと思います。

ただ仕事での利用、ソフトウェア開発などの利用シーンにおいてはオススメできません。「Chrome縛り」でイケると思ってchromebook試用してみたが、僕は思ったより辛かった。
