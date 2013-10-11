---
layout: post
title: 美しき git log --graph のエイリアス
image: /images/posts/gitlog.jpg
description: git log --graph を美しく表示するためのエイリアスを紹介します
published: true
tags:
- git
---
`git log --graph --pretty=oneline` でもいいんだけど、情報として物足りない。

エイリアスの設定によりこんな感じに美しくすることが可能です。

<img src="/images/2012/08/gitlog.png">

`.gitconfig`のエイリアスは下記のように設定します。

    [alias]
      lg = log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset' --abbrev-commit --date=relative
      lga = log --graph --all --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset' --abbrev-commit --date=relative

`lg`が通常表示、`lga`が、allオプション付きになります。

### 参考

* [pimping out git log](http://www.jukie.net/bart/blog/pimping-out-git-log)
