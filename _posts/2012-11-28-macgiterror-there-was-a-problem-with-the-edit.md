---
layout: post
title: 【git】error There was a problem with the editor 'vi'.
published: true
description: MacのVimにてコミットメッセージを書いて"wq"するとこんなエラーが出た。error There was a problem with the editor 'vi'.
tags: git
---

##Problem

MacのVimにてコミットメッセージを書いて`wq`するとこんなエラーが出た。

    $ git commit
    error: There was a problem with the editor 'vi'.
    Please supply the message using either -m or -F option.

##Solution

明示的に使用するエディタをvimの絶対パスを設定してあげればOK.

    $ git config --global core.editor /usr/bin/vim

##追記（2013/11/15）

[git today](git today — Quickly see what you've done today)というエイリアスが素敵だと思ったのでこちらを今後採用したいと思います。`git today`のエイリアスは下記のように登録してください。

    git config --global alias.today "log --since=midnight --author='$(git config user.name)' --oneline"

###参考

<p><a href="http://tooky.co.uk/2010/04/08/there-was-a-problem-with-the-editor-vi-git-on-mac-os-x.html"> Fixing "There was a problem with the editor 'vi'" for Git on Mac OS X Snow Leopard</a></p>
