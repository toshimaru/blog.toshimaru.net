---
layout: post
title: 細かすぎて伝わりにくいChrome Developerツールを使いこなそう！
published: true
image: /images/posts/chromedev/chrome-dev.png
description: Frontrend Advent Calendar 2013、20日目の記事でございます。フロントエンド関連の記事として細かすぎて伝わりにくいであろうChrome Developerツールの使い方を紹介してみたいと思います。
tags: chrome
---

[Frontrend Advent Calendar 2013](http://www.adventar.org/calendars/62)、20日目の記事でございます。フロントエンド関連の記事として細かすぎて伝わりにくいであろうChrome Developerツールの使い方を紹介してみたいと思います。

（※写真は公式ページから引用）

## `console.log`以外にも便利なconsoleメソッドがある

`console.log()`とかは常識でしょうが、それ以外にも実はconsole系メソッドが多くあります。下記のような感じ。

* `console.error()`: コンソールにエラー出力
* `console.warn()`: コンソールに警告出力
* `console.assert()`: アサーション。第一引数がfalseだった場合に第二引数の文字列を出力。
* `console.time()` & `console.timeEnd()`: タイマー機能。前者でタイマースタート、後者でタイマーストップ。引数の文字列でタイマーIDを識別している。

例えば下記のコード例では`console.time`を使って`getElementById`とjQueryのセレクターのパフォーマンスの違いを計測しています。結果はChromeConsoleを開いてResultを押してどうぞご自身の目で確認してみてください。

<iframe width="100%" height="300" src="http://jsfiddle.net/toshimaru/tr8Vg/5/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

ちなみに私の環境上での結果。

![assert](/images/posts/chromedev/result.png)

### `console.assert`

簡易的な`true`/`false`テストであれば`console.assert()`が使えます。例えばこんなコード。

    function returnTrue() { return false; }
    console.assert(returnTrue(), 'Trueをreturnすべきだよ！')

こんな感じで表示されます。

![assert](/images/posts/chromedev/assert.png)

## CSSマッピングでChromeからCSS変更を直接反映！

CSSマッピングの機能を使うことでChrome上のCSS変更を直接反映することができます。簡単な手順はこうです。

* ChromeDevツールの歯車アイコンで開くメニューからWorkspaceを追加
* マッピングしたいファイルを選択し、右クリックして `Map to File System Resource...`をクリックする。

![css mapping](/images/posts/chromedev/css-map.png)

(Image from [Web屋ならチェックしておきたい！作業効率が激変するChrome DevToolsの便利な使い方まとめ](http://liginc.co.jp/web/tool/browser/38012))

これで準備OK！ Chrome上で直接ヴィジュアルを確認しながらいい具合に変更を加えてれば、ローカル上のファイルも変更されます。

## ソースマッピングにSASSを使う！

CSSよりもやっぱり時代はLESS,SASSなどのCSSプリプロセッサーですよねー。ということで実はCSSマッピングにSASSも使えるんです。ただし下記の点に注意してください。

* **Sass 3.3以上**が必要
* **Chrome Canary**を使う
* **chrome://flags** にアクセスしてデベロッパーツールを有効にする

↓Enable Developer Tools experimentsをONにする↓

![css mapping](/images/posts/chromedev/dev-flag.png)

詳しい手順は[こちら（Chrome CanaryでSCSS(Sass)のデバックを試してみました。）](http://dev.classmethod.jp/etc/scss-source-maps-debug/)で確認してみてください。良きCSSライフを！

## AndroidをChromeでリモートデバック可能

下記動画でPaul Irish氏がリモートデバッギングを簡単に解説してくれてます。この動画でどんなことができるか簡単に把握することができます。

<iframe width="560" height="315" src="//www.youtube.com/embed/Q7rEFEMpwe4" frameborder="0" allowfullscreen></iframe>

実機をChromeDevツールでデバッグできるのはとても喜ばしいことです。注意点は下記。

* [Chrome Beta](https://play.google.com/store/apps/details?id=com.chrome.beta)がAndroidに必要
* USBでAndroidと接続が必要
* アンドロイド上でDeveloperオプションを有効にする必要があります。ONにするためには設定からBuild Numberをゴニョゴニョする必要があります

詳しい解説は[こちら（Remote Debugging Chrome on Android）](https://developers.google.com/chrome-developer-tools/docs/remote-debugging)を参照。

## FPSを確認してヌルヌル動作を目指そう！

たとえば下記のかなりリッチなパララックスウェブサイト。ちょっと見てみてください。

[Money wins Elections](http://letsfreecongress.org/)

パララックス効果はサイトをリッチに見せることができる最近良く使われるテクニックではありますが、一方ローエンドPCでの動作も気にしたいところです。上サイトをTimelineからレコーディングしてみます。

![timeline](/images/posts/chromedev/chrome-timeline.png)

上のグレイ線が30FPSのライン、下の線が60FPSのラインです。途中のぶわーって広がるエフェクトのところで30FPSまで落ちているのが確認できます。体感的にも少しガクついている感じです。ローエンドPCだともっとガクつくことでしょう。

（※本機能の使い方もPaul Irish氏が[Fluent 2013](http://www.youtube.com/watch?v=bqfoYaKCYUI)の講演で紹介しています。）

## おわりに

ここで紹介した以外にもまだまだ便利な使い方がChromeDeveloperツールにはあります。自分もまだ全然把握できていません。もし「この機能が便利！」ってのがありましたら是非とも教えてくださいまし〜。

### 参考
* [Wait, DevTools could do THAT?](http://www.igvita.com/slides/2012/devtools-tips-and-tricks/)
* [【Javascript】consoleオブジェクトが持つlog以外の便利メソッド18（前編）](http://blog.asial.co.jp/1036)
* [Using the Console](https://developers.google.com/chrome-developer-tools/docs/console)
* [Web屋ならチェックしておきたい！作業効率が激変するChrome DevToolsの便利な使い方まとめ](http://liginc.co.jp/web/tool/browser/38012)
* [Working with CSS Preprocessors](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors#toc-requirements)
* [【Source Maps】Chrome CanaryでSCSS(Sass)のデバックを試してみました。](http://dev.classmethod.jp/etc/scss-source-maps-debug/)
