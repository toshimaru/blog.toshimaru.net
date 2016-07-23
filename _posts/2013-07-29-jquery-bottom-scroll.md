---
layout: post
title: jQueryでページ最下部のスクロール時のイベントをキャッチする
published: true
description: ユースケースとしては、twitterのタイムライン表示ページのように最下部までスクロールしたら、そのイベントをキャッチして次ページのツイートを表示させたい！みたいなとき。jQueryでページ最下部のスクロール時のイベントをキャッチする。
tags: jquery
---

ユースケースとしては、Twitterのタイムライン表示ページのように最下部までスクロールしたら、そのイベントをキャッチして次ページのツイートをAutoloadして表示させたい！みたいなとき。

```js
$(window).on("scroll", function() {
  var scrollHeight = $(document).height();
  var scrollPosition = $(window).height() + $(window).scrollTop();
  if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
    // when scroll to bottom of the page
  }
});
```

上コードでは、ウインドウのスクロール時にスクロール位置が今どれだけなのかを差分を見て計算してる。それが0以下になったら次ページを表示させるようなコードを書けばよい。

上記の例では「最下部」をイベントの発火ポイントにしたけど、「下記○○％に入ったら」とかでもよさそう。

参考
---
- [ページの下までスクロールしたときに何らかの処理を実行する例](http://www.softel.co.jp/blogs/jquery/archives/742)
