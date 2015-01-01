---
layout: post
title: underscore.jsのテンプレートのデフォルトデリミタを変更する
published: true
description: erb内でunderscore.jsのテンプレートを使おうとするとerbのデリミタと競合してしまってエラーになってしまう。そういう時は下記のようにunderscoreテンプレートのデリミタを変更してやればよい。
tags: javascript underscore
---

Railsのerb内でunderscore.jsのテンプレートを使おうとするとerbのデリミタとunderscoreのデリミタが競合してしまってエラーになってしまう。そういう時は下記のようにunderscoreテンプレートのデリミタを変更してやればよい。

    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g,
      escape: /\{\{-(.+?)\}\}/g
    };

これで`{{ "{{ hoge " }}}}`という[mustache](http://mustache.github.io/)ライクなデリミタに変更できる。

参考
---
* [Underscore.js のテンプレートを ERB の中で使う](http://null.ly/post/20000241563/underscore-js-erb)
