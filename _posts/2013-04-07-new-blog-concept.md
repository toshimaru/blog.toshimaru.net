---
layout: post
title: Jekyllならここまでできる！ブログをJekyllに移行しました
published: true
description: "ブログをposterouからjekyllに移行しました。jekyllに移行するにあたっていろいろ考えたことを残しておきます。"
tags: jekyll
last_modified_at: 2021-03-02
---

[ブログをposterouからjekyllに移行](/posterous-to-jekyll/)しました。

jekyll にブログを移行するにあたっていろいろ考えたことを残しておきます。

## 前提

移行にあたり前提条件をまず洗い出しました。自分の場合こんな感じでした。

* 無料であること
* 移行ツールがあること
* 独自ドメインが使用できること
* デザイン変更に自由度があり、カスタマイズできること
* 信頼できるサーバーであること(ざっくり言い換えると大手有名サービスであること）

優先度が下がるが、下記のような要望も満たしているとなおよい。

* JSが自由に使えたら嬉しい
* CMSが直感的で使いやすいこと
* 広告とかウザいのは出ないこと

## 類似サービスの検討

今回の場合、使用していたブログサービスの閉鎖に伴いブログ移行を与儀なくされたかたちなので、まずは類似ブログサービスを検討しました。検討したのはこんな感じです。

* [squarespace](https://www.squarespace.com/)
* [tumblr](https://www.tumblr.com/)
* [wordpress](https://wordpress.com/)
* [Hatena Blog](https://hatenablog.com/)

公式でも薦められているsquarespaceを使いたいと思ったが、有料。そしてお金を払うとしても個人的にsquarespaceの価格設定が少し高く感じた。

無料でやるならtumblr一択、って感じかもしれないが、tumblrは5年以上前に触って手に馴染まず使わなかったサービスで、やっぱり今使ってみてもなんとなく見た目とかCMSが馴染まなかったので乗り気はしない。

## ドメインはどうするか？

ブログは自ドメイン(`blog.toshimaru.net`)で運用していました。移行に伴って、ドメインに結びついたリンクがリンク切れを起こしてしまうのをなるだけ避けたい。

となるとURLが柔軟にコントロールできる必要があります。しかし上記に挙げたサービスのどれもがそのような機能は提供していませんでした。

## Jekyll、君に決めた！

ということで、いろいろと柔軟にやるためにもハッカーの間で人気の高いJekyllという静的サイトジェネレータを使ってみることにしました（[ちなみにGithub PagesでもJekyllは公式サポートされてます](https://docs.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll)）。

調べてみると自分の前提条件がほとんどクリアできることがわかった。

* 無料
* [移行ツール](https://github.com/mojombo/jekyll/wiki/blog-migrations#posterous)がある
* 独自ドメインが使用できる(CNAME)
* デザインはもちろん自由にカスタマイズ可能
* GitHub提供サーバーなのでたぶん安定性も大丈夫だろう
* JSもバリバリ使える
* URLも301リダイレクトになるが保てるようだ (_config.ymlにて設定)

他にもこんないいことが。

* Markdownで記事が書ける
* Rubyの勉強になる

## コメント欄は設置するか？

SNSのプラットフォームが十分に成熟している昨今ですから、そもそもコメント欄を設置すること自体がなんとなく時代遅れになってきているのでは？と感じるのですが、Jekyllを使われている皆さんは[Disqus](http://disqus.com/)を使ってコメント欄を設置されているようなので、それに倣ってDisqusでコメントフォームを設置。

なんか昔はDisqusのデザインとかがうるさくて好きになれなかったのですが、今はサイトに馴染むように大人しめに設置できるようになったので、安心して設置できました。

## Jekyllブログ構築にあたり参考にしたJekyllサイト

* [webtech-walker.com](http://webtech-walker.com/) - [(ソース)](https://github.com/hokaccha/webtech-walker)
* [fingaholic.github.io](http://fingaholic.github.io/) - [(ソース)](https://github.com/FiNGAHOLiC/fingaholic.github.com)

とくにhokacchaさんのjekyll運用の仕方は大変参考になりました！

## まとめ

あなたがハッカーならば Jekyll + Github Pages は真っ先に検討すべきブログサービスです。

現在別のブログサービスを使って書かれている方も、現在ブログを書いていない方も、ハッカーならばJekyllを初めてみてはいかがでしょうか？
