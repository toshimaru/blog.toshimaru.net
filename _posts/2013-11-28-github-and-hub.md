---
layout: post
title: Github+hubコマンドで快適なGithubライフを営む
published: true
description: githubで開発を進めている場合、hubコマンドの利用が素敵な感じです。
tags: git github
---

`github`で開発を進めている場合、[hubコマンド](https://github.com/github/hub)の利用が素敵な感じです。

##インストール

Macを使っていると`brew`使って`hub`コマンドが一発で入ります。

    $ brew install hub

##gitのエイリアスをhubコマンドで拡張

ただこのままだとhubコマンドはgitコマンドと分離しており少し不便なので、gitコマンドをhubコマンドで置き換えてやりましょう。もちろん既存のgitコマンドに悪影響を与えるようなことはありません。やり方は下記の１行を`.zshrc`なり`.bashrc`に追記すればOK.

    eval "$(hub alias -s)"

##githubからのcloneが楽に

hubコマンドの導入によりGithubからのcloneが楽になります。下記のように`{user}/{repo}`でcloneできます。

    $ git clone toshimaru/dotfiles

##githubページを開く

自分の場合、GithubにpushしたあとにGithubのGUI上でDiffであったり諸々の状態を確認したいことがよくあります。`hub`コマンドであれば一発でいけます。

    $ git browse

規定のブラウザで当該Githubページが開きます。

##その他

他にもpull-requestをコマンドから簡単に送れるようになったり嬉しいことがたくさんあります。詳しくは[公式hubページ](http://hub.github.com/)を見てください。
