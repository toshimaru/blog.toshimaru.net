---
layout: post
title: Gitのrevertの-m(mainline)オプションについて
published: true
description: git revertのmainlineオプションについて考えてみました
tags: git
---

`git revert`しているとこんなエラーに出くわしました。

    $ g revert xxxxx
    error: Commit xxxxx is a merge but no -m option was given.
    fatal: revert failed

「コミットxxxxxはマージだけど、`-m`が指定されていないよ！」ってことなんですがどういうことでしょう？

普通に考えてみると当然のことで、マージコミットですから`revert`といったときにどのブランチ状態に戻るかを指定しなければrevertできないよということです。つまり下記のようなヒストリーがあったときに、

    *   1459267 - Merge pull request #4 from branch3
    |\
    | * 344fd52 - (branch3) Add sentence
    | * 2b30235 - add file
    * | dbc65f4 - add revert commit2
    * | f0b0a91 - add revert commit 1

`<1459267>`のマージをrevertした場合に、`<344fd52>`か`<dbc65f4>`かどっちに戻すかがわかんないっちゅうことです。

このmainlineは1から始まり「1がマージされた側のブランチ」「2がマージする側のブランチ」になるようなので多くの場合、前者に戻したいと思うので1を指定しとけばよいということになります。結果としては下記のコマンド。

    $ g revert -m 1 1459267

以上でした。

###参考

* [gitのmerge-commitをrevertする](http://d.hatena.ne.jp/koba04/20121122/1353512656)
