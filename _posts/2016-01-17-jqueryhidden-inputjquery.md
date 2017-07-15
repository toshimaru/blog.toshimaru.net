---
layout: post
title: jQueryでHTMLタグ要素をcreateElement使わずに生成する
published: true
description: とある<form>があってその中にjQueryで動的にinput hiddenタグ要素を生成&追加して送信したい。要素を生成しようと思ったときにぱっと思いつくのは、document.createElementだが、jQueryを使うと簡潔にかける。
tags: javascript jquery
---

## やりたいこと

とある`<form>`があってその中にjQueryで動的にinput hiddenタグ要素を生成&追加して送信したい。

## 方法

要素を生成しようと思ったときにぱっと思いつくのは、`document.createElement`だが、jQueryを使うと下記のように簡潔にかける。

```html
<form id="targetId">
  ...
</form>
```

```js
$('<input>').attr({
  type: 'hidden',
  id: 'input_id',
  value: 12345
}).appendTo('#targetId');
```

また下記のように`attr`を使わずに書くことができる（コメントで教えていただきました taku hhara さん、ありがとうございます）。

```js
$("<input>", {
  type: 'hidden',
  id: 'input_id',
  value: 12345
}).appendTo('#targetId');
```

## テキストの入ったdivを生成

上述のテクニックを使った下記のようなテキストの入った`div`要素も生成できます。

```js
$('<div>', { id:'hoge', class:'fuga', text:'piyo' });
```

このコードは下記コードと同じ結果を得られます。

```js
$('<div id="hoge"><span class="fuga">piyo</span></div>');
```

(コードは[jQueryの$()が多機能すぎる件について。5種類も仕事があるよ。](http://ginpen.com/2012/12/01/jquery-core-func/)より引用)

## 参考

- [Jquery - Create hidden form element on the fly](http://stackoverflow.com/questions/2408043/jquery-create-hidden-form-element-on-the-fly)
- [jQuery document.createElement equivalent?](http://stackoverflow.com/questions/268490/jquery-document-createelement-equivalent)
