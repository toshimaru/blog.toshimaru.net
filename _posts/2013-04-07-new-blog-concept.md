---
layout: post
title: ブログをjekyllで移行するにあたって考えるべきこと　Jekyllならここまでできる！
published: true
description: 昨日、ブログをposterouからjekyllに移行しました。jekyllに移行するにあたっていろいろ考えたことを残しておきます。
tags: jekyll
---

昨日、[ブログをposterouからjekyllに移行](http://blog.toshimaru.net/posterous-to-jekyll/)しました。jekyllに移行するにあたっていろいろ考えたことを残しておきます。

前提
----
移行にあたりまず、前提を洗い出しました。自分の場合、こんな感じでした。

* 無料であること
* 移行元記事の移行ツールがあること
* 独自ドメインが使用できること
* デザインがある程度自由度のあるかたちでカスタマイズできること。
* 信頼できるサーバであること。(ざっくり言い換えると大手有名サービスであること）

ちょっと優先度が下がる前提は下記のような感じ。

* JSが自由に使えたら嬉しい
* CMSなどが直感的でかっこいいこと
* 広告とかウザいのはやめていただきたい 

類似サービスの検討
------
今回の場合、ブログサービスの閉鎖に伴い、ブログ移行を与儀なくされたのでまずは類似ブログサービスを検討しました。 検討したのはこんな感じ。

* [squarespace](http://www.squarespace.com/)
* [tumblr](http://www.tumblr.com/)
* [wordpress](http://wordpress.com/)
* [Hatena Blog](http://hatenablog.com/)

正直公式でも薦められているsquarespaceをとても使いたいと思ったが、有料。そして自分的にsquarespaceの価格設定が少し高く感じた。

無料でやるならtumblr一択、って感じでしょうが、tumblrは5年以上前に触って手に馴染まず使わなかったサービスで、やっぱり今使ってみてもなんとなく見た目とかCMSが馴染まなかったので乗り気はしない。

ドメインはどうするか？
------
ブログは自ドメイン(blog.toshimaru.net)で運用していました。移行に伴って、ドメインに結びついたリンクがリンク切れを起こしてしまうのをなるだけ避けたい。となるとURLが柔軟にコントロールが効く必要がありますが、上記に挙げたサービスのどれもがそのような機能は提供していませんでした。

Jekyll、君に決めた！
------
ということで、いろいろと柔軟にやるためにもハッカーの間で人気の高いJekyllという静的サイトジェネレータを使ってみることにしました（[Github Pagesでもサポートされてます](https://help.github.com/articles/using-jekyll-with-pages)）。

調べてみると自分の前提条件がほとんどクリアできることがわかった。

* Github Pages使って無料
* [移行ツール](https://github.com/mojombo/jekyll/wiki/blog-migrations#posterous)があった
* 独自ドメインが使用できる(CNAME)
* デザインはもちろん自由
* Githubサーバなのでたぶん大丈夫だろう
* JSもバリバリ使える
* urlも301リダイレクトだが保てるようだ (_config.ymlにて設定)

他にもこんないいことが。

* markdownで記事かける
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
あなたがハッカーならばJekyll(+Github)はまっさきに検討すべきブログサービスです。現在別のブログサービスを使って書かれている方も、現在ブログを書いていない方も、ハッカーならばJekyllを初めてみてはいかが？
