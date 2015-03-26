---
layout: post
title: jQueryイベントデリゲーションを利用して遅延取得されるDOMにイベントをアタッチする
published: true
description: jQueryイベントデリゲーションをコードとともにおさらい。デリゲーションしないパターン。何が問題なのか。 まずは「default item」をクリックする。「clicked!」になったね。「Add List」する。もう一度クリック。「clicked!」になってほしい。あれ、何も起こらないね？
tags: jquery
---

jQueryイベントデリゲーションをコードとともにおさらい。

## No Event Delegation

デリゲーションしないパターン。何が問題なのか。

まずは「default item」をクリックする。「clicked!」になったね。「Add List」する。そいつをもう一度クリック。「clicked!」になってほしい。あれ、何も起こらないね？

<p data-height="268" data-theme-id="0" data-slug-hash="MYLYxq" data-default-tab="result" data-user="toshimaru" class='codepen'>See the Pen <a href='http://codepen.io/toshimaru/pen/MYLYxq/'>No `.on` selector </a> by toshi (<a href='http://codepen.io/toshimaru'>@toshimaru</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

なぜならjQueryのセレクタ`$("#list li")`では、初期のDOMにしかイベントがアタッチされないから。後から追加されるDOMに対してはイベントアタッチはされない。

## Use Event Delegation

イベントデリゲーションするバターン。こちらではどうでしょう？

まずは「default item」をクリックする。「clicked!」になったね。「Add List」する。そいつをもう一度クリック。「clicked!」になった。Add Listで追加されたDOMに対してもしっかりイベントが補足されるようになっている。

<p data-height="259" data-theme-id="0" data-slug-hash="dPaPEY" data-default-tab="result" data-user="toshimaru" class='codepen'>See the Pen <a href='http://codepen.io/toshimaru/pen/dPaPEY/'>Use `.on` selector</a> by toshi (<a href='http://codepen.io/toshimaru'>@toshimaru</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

`$("#list").on`の第二引数としてセレクタ（`li`）を渡すことで、しっかり`$("#list")`のリスト要素全てにイベントがデリゲートされていますね。 :on:

### 参考
* [Understanding Event Delegation \| jQuery Learning Center](https://learn.jquery.com/events/event-delegation/)
* [.on() \| jQuery API Documentation](https://api.jquery.com/on/)
