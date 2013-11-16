---
layout: post
title: Jekyllでgit pushをフックしてGithubPageへ自動デプロイするようにした
published: true
description: 本ブログはJekyllを使って構築しているのですがgit pushしたときにTravis-CIと連携してTravis上でビルドしてGithub Pageへとデプロイするように変更してみました。
tags: git github jekyll
---

本ブログはJekyllを使って構築しているのですが`git push`したときにTravis-CIと連携してTravis上でビルドしてGithub Pageへとデプロイするように変更してみました。作業にあたっては下記ブログを参考にさせていただきました。

[OctopressとTravis CIを連携させてBlog生成を自動にする](http://pchw.github.io/blog/2013/06/27/octopress-travis/)

上手順において２点、注意点があります。

- `brew install travis`でtravisコマンドはインストールできなくなっているっぽいので`gem install travis`で対応すること。
- 上記では公開鍵暗号方式を使っているが、[OAuth access tokens](https://help.github.com/articles/creating-an-access-token-for-command-line-use)を使ったほうが手間がかからなくて楽です。

ということで公開鍵暗号方式ではなくOAuth Tokenを使うようにします。その場合は下記が参考になります。

[Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する](http://tricknotes.hateblo.jp/entry/2013/06/17/020229)

デプロイまでの流れとしてはこんな感じです。

1. githubにエントリをpushする
2. pushをフックしてTravisCI起動（事前にService HooksでTravisと連携するように設定してある）
3. Travis上でスタティックサイトをビルド
4. TravisからgithubへとToken通してpushする

結果的に作成した`.travis.yml`,`Rakefile`はこんな感じです。

- [.travis.yml](https://github.com/toshimaru/blog.toshimaru.net/blob/master/.travis.yml)
- [Rakefile](https://github.com/toshimaru/blog.toshimaru.net/blob/master/Rakefile)

このように設定しておけばGithub上だったり[prose.io](http://prose.io/)みたいなサービス使ってWEB上でも記事を投稿できてグッドですね。（実際はローカル上のエディタでの編集が慣れているのでWEB編集画面は使わないけど...）
