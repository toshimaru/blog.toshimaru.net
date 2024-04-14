---
layout: post
title: underscore.js のテンプレートのデフォルトデリミタを変更する
description: erb内でunderscore.jsのテンプレートを使おうとするとerbのデリミタと競合してしまってエラーになってしまう。そういう時は下記のようにunderscoreテンプレートのデリミタをtemplateSettingsを使って変更してやればよい。
tags: javascript
---

Railsのerb内でunderscore.jsのテンプレートを使おうとするとerbのデリミタとunderscoreのデリミタが競合してしまってエラーになってしまう。そういう時は下記のようにunderscoreテンプレートのデリミタを`templateSettings`を使って変更してやればよい。

```js
_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g,
  escape: /\{\{-(.+?)\}\}/g
};
```

これで `{{ "{{ hoge " }}}}` という[mustache](http://mustache.github.io/)ライクなデリミタに変更できる。

参考
---

* [Underscore.js のテンプレートを ERB の中で使う](http://null.ly/post/20000241563/underscore-js-erb)
