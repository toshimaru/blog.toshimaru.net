---
layout: post
title: "JavaScriptのXHRの送り方いろいろ: XMLHttpRequest, fetch, async/await"
description: JavaSciriptのXHR(XMLHttpRequest)の送り方は１つだけではありません。モダンなXHRに向けてそれぞれのHTTPリクエストの送り方を比較・検討してみます。jQuery, superagent, axiosなどのAJAX系ライブラリは使用しないこととする。 検証に使うブラウザは最新版のChrome (現在はVersion56.0) 今回リクエストを送る先は仮想的に下記のURLとする。
tags: javascript ajax
toc: true
---

JavaSciriptのXHR(XMLHttpRequest)の送り方は１つだけではありません。モダンなXHRに向けてそれぞれのHTTPリクエストの送り方を比較・検討してみます。

## 前提

- [jQuery](https://jquery.com/), [superagent](https://github.com/visionmedia/superagent), [axios](https://github.com/mzabriskie/axios)などのAJAX系ライブラリは使用しないこととする。
- 検証に使うブラウザは最新版のChrome (現在はVersion56.0)
- 今回リクエストを送る先は仮想的に下記のURLとする

```js
var url = "https://your.domain.net/"
```

## 1. XMLHttpRequest

さぁ,まずは古き良き[XMLHttpRequest](https://developer.mozilla.org/ja/docs/Web/API/XMLHttpRequest)。ローレベルなAPIでAJAX処理が書きにくいのですが、歴史がある分多くのブラウザで動作します。

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = function() {
  console.log(xhr.status);
};
xhr.onerror = function() {
  console.log("error!");
};
xhr.send();
```

Chrome Dev Toolのコンソールで動かしてみましょう。

![](/images/posts/xhr/1.png)

### モダンな書き方にしてみよう！

このまま次のXHRに進んでも良いですがせっかくなので上記のコードをもう少しモダンにしてみます。

今回は下記の２つの書き方を導入します。

- [const](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/const) = 定数
- [Arrow function](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/Arrow_functions) = アロー関数

上記の2つで1のXMLHttpRequestのコードを書き直すとこのようになります。

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.onload = () => {
  console.log(xhr.status);
};
xhr.onerror = () => {
  console.log("error!");
};
xhr.send();
```

`var`は`const`に、`function`は`=>`へと変更しています。わかりやすくなってスッキリしましたね。

この書き方でも動くかChrome Dev Toolのコンソールで動かしてみましょう。

![](/images/posts/xhr/2.png)

:ok: でした。

## 2. fetch API

次は`fetch` APIを使ってXHRしてみましょう。ちなみにfetch APIはChrome Version 42よりサポートされています。

```js
fetch(url).then((response) => {
  console.log(response.status);
}).catch(() => {
  console.log("error caught!");
});
```

コードとしてはurlを`fetch`して`then`, `catch`をチェインさせてそれぞれの処理内容を書いていくというものになります。

Chrome Dev Toolコンソールで動かした結果。

![](/images/posts/xhr/3.png)

`fetch`は[Promise](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Promise)を返す点がポイントですね。

## 3. fetch + async/await

最後のXHRは[async/await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/async_function)になります。Chrome55からのサポートなので最近追加された機能ということになります。

さきほどの`fetch`のコードをasync/awaitの機能を使って書き換えてみましょう。

```js
(async() => {
  try {
    const response = await fetch(url);
    console.log(response.status);
  } catch (e) {
    console.log("error!")
  }
})();
```

ポイントとしては `async`を使ってまず無名関数を作ります。これでその関数内に`await`を使う準備ができました。[await](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await)はPromiseが返されるのを待機するので、先程のPromiseを返す`fetch`関数の手前に`await`を宣言します。これで`fetch`関数は`then`でコールバックをチェインする必要がなくなり、`response`変数にダイレクトに結果が代入されます。エラー処理に関してはtryで処理内容を囲み、catchでエラーを補足します。

コンソールで動かしてみた結果は下記の通り。

![](/images/posts/xhr/4.png)

## 結論

結論としては現時点では3つめのfetch+async/awaitな書き方が最もモダンな書き方となります。

3の書き方でなにが嬉しいかというと:

- 非同期処理でありがちなコールバック地獄からの解放
- 同期的なコードで書けるので書きやすい・読みやすい
- [try~catch節](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/try...catch)を用いているのでエラー処理の見通しが良い

このあたりでしょうか。

まだasync/awaitシンタックスはECMAScript 2017のDraftな仕様というステータスであり現時点でIEはサポートしていない書き方です。なので多くの人が触る環境下のコードベースにおける導入は厳しいですが、これらが使える利用環境を限定できるのであれば積極的に使っていきたい書き方ですね。

<iframe width="560" height="315" src="https://www.youtube.com/embed/OC7tgJP1D4s" frameborder="0" allowfullscreen></iframe>

## （おまけ）babelで使う場合

babel で async/await のシンタックス使いたい場合は`babel-plugin-syntax-async-functions`を使うことになります。

[Syntax async functions · Babel](https://babeljs.io/docs/plugins/syntax-async-functions/)

## 参考

- [That's so fetch! - JakeArchibald.com](https://jakearchibald.com/2015/thats-so-fetch/)
- [XMLHttpRequest - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
