---
layout: post
title: Jekyllならここまでできる！ ブログをjekyllで移行するにあたって考えるべきこと
published: true
description: 昨日、ブログをposterouからjekyllに移行しました。jekyllに移行するにあたっていろいろ考えたことを残しておきます。
tags: jekyll
---

昨日、[ブログをposterouからjekyllに移行](http://blog.toshimaru.net/posterous-to-jekyll/)しました。jekyllに移行するにあたっていろいろ考えたことを残しておきます。

前提
----
移行にあたり前提をまず洗い出しました。自分の場合こんな感じでした。

* 無料であること
* 移行ツールがあること
* 独自ドメインが使用できること
* デザイン変更に自由度があり、カスタマイズできること
* 信頼できるサーバであること(ざっくり言い換えると大手有名サービスであること）

優先度が下がるが、下記のような要望も満たしているとなおよい。

* JSが自由に使えたら嬉しい
* CMSが直感的でかっこいいこと
* 広告とかウザいのは要らない

類似サービスの検討
------
今回の場合、使用していたブログサービスの閉鎖に伴いブログ移行を与儀なくされたかたちなので、まずは類似ブログサービスを検討しました。検討したのはこんな感じです。

* [squarespace](http://www.squarespace.com/)
* [tumblr](http://www.tumblr.com/)
* [wordpress](http://wordpress.com/)
* [Hatena Blog](http://hatenablog.com/)

公式でも薦められているsquarespaceを使いたいと思ったが、有料。そしてお金を払うとしても個人的にsquarespaceの価格設定が少し高く感じた。

無料でやるならtumblr一択、って感じでしょうが、tumblrは5年以上前に触って手に馴染まず使わなかったサービスで、やっぱり今使ってみてもなんとなく見た目とかCMSが馴染まなかったので乗り気はしない。

ドメインはどうするか？
------
ブログは自ドメイン(blog.toshimaru.net)で運用していました。移行に伴って、ドメインに結びついたリンクがリンク切れを起こしてしまうのをなるだけ避けたい。となるとURLが柔軟にコントロールできる必要があります。しかし上記に挙げたサービスのどれもがそのような機能は提供していませんでした。

Jekyll、君に決めた！
------
ということで、いろいろと柔軟にやるためにもハッカーの間で人気の高いJekyllという静的サイトジェネレータを使ってみることにしました（[ちなみにGithub Pagesでもサポートされてます](https://help.github.com/articles/using-jekyll-with-pages)）。

調べてみると自分の前提条件がほとんどクリアできることがわかった。

* 無料
* [移行ツール](https://github.com/mojombo/jekyll/wiki/blog-migrations#posterous)がある
* 独自ドメインが使用できる(CNAME)
* デザインはもちろん自由にカスタム可能
* Githubサーバなのでたぶん大丈夫だろう
* JSもバリバリ使える
* URLも301リダイレクトだが保てるようだ (_config.ymlにて設定)

他にもこんないいことが。

* Markdownで記事かける
* Rubyの勉強になる！

コメント欄は設置するか？
------
SNSのプラットフォームが十分に成熟している昨今ですから、そもそもコメント欄を設置すること自体がなんとなく時代遅れになってきているのでは？と感じるのですが、Jekyllを使われている皆さんは[DISQUS](http://disqus.com/)を使ってコメント欄を設置されているようなのでそれに倣って設置。

なんか昔はDISQUSのデザインとかがうるさくて好きになれなかったのですが、今はサイトに馴染むように大人しめに設置できるようになったので、安心して設置できました。

Jekyllブログ構築にあたり参考にしたJekyllサイト
------
* [webtech-walker.com](http://webtech-walker.com/) - [(ソース)](https://github.com/hokaccha/webtech-walker)
* [fingaholic.github.io](http://fingaholic.github.io/) - [(ソース)](https://github.com/FiNGAHOLiC/fingaholic.github.com)

とくにhokacchaさんのjekyll運用の仕方は大変参考になりました！

総評
------
あなたがハッカーならばJekyll(+Github)はまっさきに検討すべきブログサービスです。現在別のブログサービスを使って書かれている方も、現在ブログを書いていない方も、ハッカーならばJekyllを初めてみてはいかがでしょうか？
