---
layout: post
title: Backbone.jsをそろそろ学習したい人のための学習リソース集（2013年版）
published: true
image: /images/posts/backbone/backbone.png
description: Backbone.jsを週末を使って学習しました。メモがてらそのときに使った学習リソースをまとめてみたいと思います。
tags: javascript
---

Backbone.jsを週末を使って学習しました。メモがてらそのときに使った学習リソースをまとめてみたいと思います。

公式サイト
----
まずは公式サイト。ただ公式サイトを眺めただけじゃようわからないので、ざっと眺めるだけでOKだと思います。

[Backbone.js](http://underscorejs.org/)

動画でBackboneを触ってみる
----

ドットインストールのBackbone入門。手を動かしてもいいですし、流し見でもいいでしょう。

[Backbone.js入門（ドットインストール）](http://dotinstall.com/lessons/basic_backbonejs)

![dotinstall](/images/posts/backbone/dotinstall.png)

英語、かつ有料になりますがプログラミング学習サイト、Code Schoolのコンテンツも非常にいいです。

[Anatomy of Backbone.js（Code School）](http://www.codeschool.com/courses/anatomy-of-backbonejs)

![codeschool](/images/posts/backbone/codeschool.png)

文章でBackboneを理解する
----

英語になりますがオライリーのBackbone本がWEBで公開されているので読めます。（日本語訳版は現時点で出版されていないようです）

[Developing Backbone.js Applications](http://addyosmani.github.io/backbone-fundamentals/)

![book](/images/posts/backbone/book.png)

日本語だとこちらの本がよいと思います。

<a href="http://www.amazon.co.jp/gp/product/4899773501/ref=as_li_tf_il?ie=UTF8&camp=247&creative=1211&creativeASIN=4899773501&linkCode=as2&tag=toshimaru-22"><img border="0" src="http://ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4899773501&Format=_SL160_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=toshimaru-22" ></a><img src="http://ir-jp.amazon-adsystem.com/e/ir?t=toshimaru-22&l=as2&o=9&a=4899773501" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />

スライドでBackboneの良さを理解する
---

[Client-side MVC with Backbone.js](http://www.slideshare.net/iloveigloo/clientside-mvc-with-backbonejs)

<iframe src="http://www.slideshare.net/slideshow/embed_code/12146222" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="http://www.slideshare.net/iloveigloo/clientside-mvc-with-backbonejs" title="Client-side MVC with Backbone.js " target="_blank">Client-side MVC with Backbone.js </a> </strong> from <strong><a href="http://www.slideshare.net/iloveigloo" target="_blank">iloveigloo</a></strong> </div>

[いまさら聞けない！？Backbone.js 超入門](http://www.slideshare.net/kadoppe/backbonejs-22635630)

<iframe src="http://www.slideshare.net/slideshow/embed_code/22635630" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC;border-width:1px 1px 0;margin-bottom:5px" allowfullscreen webkitallowfullscreen mozallowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="http://www.slideshare.net/kadoppe/backbonejs-22635630" title="いまさら聞けない！？Backbone.js 超入門" target="_blank">いまさら聞けない！？Backbone.js 超入門</a> </strong> from <strong><a href="http://www.slideshare.net/kadoppe" target="_blank">Kohei Kadowaki</a></strong> </div>

実際に動くサンプルを見る
---
「いいから動くサンプルだ！」という方には、いろんなJSフレームワークでTODOアプリを作るプロジェクト、[TodoMVC](http://todomvc.com/)のリソースが役立つでしょう。Backbone.jsのプロジェクトはこちら。

[Backbone.js(TodoMVC)](http://todomvc.com/architecture-examples/backbone/)

![todomvc](/images/posts/backbone/todomvc.png)

※Backbone以外にも学習、比較したいJSフレームワークがあるならここで眺めてみるとよいでしょう。 

Backboneの講演を聞いて理解を深める
---
Backboneの作者の講演です。

<iframe width="560" height="315" src="//www.youtube.com/embed/4udR30JYenA" frameborder="0" allowfullscreen></iframe>

Backboneを学習してみて
----
railsなどに代表されるサーバサイドのMVCとBackboneでいうところのMVCは似て非なるもの。前者を前提として学習を進めていくと痛い目をみるかもしれません。

BackboneにもModel, View, Collectionという名前があって一瞬勘違いしそうになりますが、CollectionはModelの集積。本がModelだとしたら本棚がCollection。なのでrailsでいうところのModelはBackboneではModel/Collectionが担っていて、View,ControllerはBackboneではViewが担う。

上記を踏まえた上で、それぞれのオブジェクトがどういう役割を担っていて、疎結合に保たれているのかを意識して学習すると良い気がしました。

またBackboneというと自由度の高さが逆に足枷になる場合があって、なかなか「ベスト・プラクティス」なるものが見つけにくいのも悩ましいところです。これはいろいろなサンプルを見るなりして窺い知るくらいしかできないと思っています。

参考
----
* [Backbone.js入門 – 初学者の為のロードマップ](http://mawatari.jp/archives/roadmap-for-backbonejs-beginners)
* [Backbone.jsを利用したクライアントサイドMVCの導入についてそろそろ書いておくか](http://d.hatena.ne.jp/kazuk_i/20110407/1302130947) 【筆者注】やや情報が古いので注意！
