---
layout: post
title: PHPって言うほど悪い言語じゃない
published: true
image: /images/posts/phplogo.png
description: PHPってよく「PHP(笑)」って後ろに笑マークが付いたり、Disられたりすることが多い。でも僕には「笑」を付けるほどPHPは悪い言語だとは思えない。PHPを笑うな。
tags: php
---

**※ただしPHP5.3以降に限る。**

PHPってよく「PHP(笑)」って後ろに笑マークが付いたり、Disられたりすることが多い。でも僕には「笑」を付けるほどPHPは悪い言語だとは思えないんだよね。

## PHPの良いところ

PHPの良さはなんといってもとっつきやすさだと思う。何も知らない初学者が「WEBページ作りたいよ！WEBプログラミングしたいよ！」といったときにPHPは第一の選択肢となると思う。なんせPHPは「ぴーえっちぴー：はいぱーてきすとぷろせっさー」なんだからな！　HyperText作るための言語、それこそPHPの本質たるところなのです。

逆にその手軽さがイケてないコードを量産していてるとも言えて、結果的にそうやって生まれたイケてないコードのいくつかを見て「PHPダメ」って判断してしまいがちだけど、それは早急だと思う[^phpway]。

またPHPの[公式リファレンスは他のどの言語よりも情報が充実していると思う](http://blog.clock-up.jp/entry/2013/09/01/141859)。簡潔な良いコード例がたくさん載ってるし、PHPのバージョン情報も明記されている。PHPは日本語情報もたくさんあるので困ったときに日本語で検索して情報も出やすい。

## PHPの悪いところ

とはいえ、PHPは関数が直感に反していていたり、引数が覚えにくかったり、まぁイケてないところは[たくさんある](http://www.rubyist.net/~matz/20080126.html#p04)。それは認めよう。

ただ近年のPHP動向とか知ってる？　けっこう凄いんだぜ？

## 近年のPHPの進化

[Composer](http://getcomposer.org/)で外部ライブラリのインストール、依存関係管理できる。フレームワークもMVCな[Symfony](https://github.com/symfony/symfony),[CakePHP](https://github.com/cakephp/cakephp),[FuelPHP](https://github.com/fuel/fuel)から、SinatraライクのMicroフレームワークな[Slim](https://github.com/codeguy/Slim),[Silex](https://github.com/fabpot/Silex)だってある。CakePHPなんかは日本で人気が高く日本語情報がネットに沢山あってググりやすい。[Laravel](https://github.com/laravel/laravel)なんかは今グングン成長している注目株のMVCフレームワークだ。[PHPUnit](https://github.com/sebastianbergmann/phpunit)でテストも書ける。PHPUnitの書き方がイケてない？　ならモダンな[atoum](https://github.com/atoum/atoum)もある。PHPは遅い？　[The fastest
PHP Framework, Phalcon](http://phalconphp.com/en/)という選択肢も今ならある。

## PHPのコードは汚い？

正直5.2以前はけっこう汚いコードが多いと思う。PHP4の書き方の名残があるコードなんて最低だ。ただ5.3以降は綺麗に書けるようになってきてる。

PHP5.3以降からは名前空間がサポートされて、これとComposerのAutoloadの機能を使えば`require`地獄から解放される。他にも5.3では無名関数がサポートされた。

PHP5.4からは新しいショートArrayシンタックスが追加されてかつてのArray地獄からは解放されそうだし、Traitの導入によりRubyのMix-inみたいなことも可能になった。

PHP5.5ではジェネレータの機能により`yield`キーワードが使えるようになったり、`finally`節も追加される（この辺は今更感ありまくりだけど）。

シンタックスとか言語特性上限界がありますけど（PHPは言語特性上、クソコードが書きやすい）、Rubyでもきっとクソなコード書く人はクソなコードを書くだろうし、Ruby on Railsでもレールの乗り方を無視してクソみたいなコードを書く奴もいるだろう。クソコードはPHPに限った話じゃないぜ、たぶん。

## PHPがWEBを作ってる！

Googleが無縁であるはずのPHPをGoogle App Engineの言語の一つとして採用したのはなぜか？　[PHPがWEBの75％を作っている、とGoogleが判断した](http://agilecatcloud.com/2013/07/04/google-app-engine-%E3%81%8C-php-%E3%82%92%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%99%E3%82%8B%EF%BC%9A-%E3%81%AA%E3%81%9C%E3%81%AA%E3%82%89-75-%E3%81%AE-web-%E3%82%92%E3%82%AB%E3%83%90%E3%83%BC/)からだ。

世界で一番使われているCMSはなにか？　WordPressだ。PHPで作られている[^wp]。

世界最大のSNS、Facebookで使われている言語はなにか？　PHPだ。さらに彼らは[HipHopというPHPから C++への変換するソフトを作るというかなり頭のイカれたことをやっていたり、Hackという型付のPHP方言を使用していたり](http://2013.8-p.info/japanese/09-28-languages.html)するらしい。Facebook、お前のPHP愛が怖い[^fbd]。

## PHPを笑うな

「PHP（笑）」って言っている人がどれだけ上記のような状況を知った上で笑っているのだろうか。僕は上記の状況を鑑みるにもうPHPに「笑」なんて付けることはできない。むしろ軽率に付けててゴメン、とおもった。

正直自分も今まで、PHPの後ろに「笑」が付いていた。技術ブログ界隈でPHPがよくDisられたりするのを見聞きしてたから僕も知らず知らずのうちにPHPをネタにしてたんだ。でも冷静に考えるとその当時、PHPの良さなんて何も知らなかったのだ。

## なんか見たことある光景？

この光景、デジャヴじゃね？とも思った。

JavaScriptだって[AJAX技術の台頭で持て囃される以前は言語として見放されていた](http://bl.ocks.org/anonymous/raw/6281225/#9)。それがAJAX以降どうだ。どんどん便利なライブラリが誕生し、JSを使ったリッチなUIの提供は当たり前となった。そしてNodeの登場以降は全世界の優秀なエンジニアたちがそのテクノロジーの可能性にこぞって注目した。[AltJS](http://altjs.org/)の勢いも強まっている。

PHPはさすがにJSまでの再評価までいかなくとも、少なくともWEB言語の第一位の座に居座り続けてもいいのではないかと思う（そして今後のPHPの進化にも期待したい）。

## 最後に

「PHP（笑）」の時代は終わりを告げた。ぼくはPHPは悪い言語だとは思わないし、お世辞にもすごく良い言語とも言うことはできない。ただ侮れない言語であると思うのです。

PHPはPerlほど真面目じゃないし、Pythonほどスマートじゃないし、Rubyほど垢抜けてないし、JavaScriptほど流行に敏感じゃないけど、そんなPHPが、僕は嫌いじゃない。

<blockquote class="twitter-tweet"><p><a href="http://t.co/oYy20r6aYU">http://t.co/oYy20r6aYU</a> 「ぼくの経験上、一番PHPをバカにし、言語の重要性をうそぶく連中は、大体自分たちが提唱する言語でもロクな仕事ができないことが多い」。これはわからないけれど、自分の経験から語ると、優秀なエンジニアだなと思う人ほどPHPを評価している感じ</p>&mdash; 紀平 拓男（Takuo Kihira） (@tkihira) <a href="https://twitter.com/tkihira/statuses/384552044247257088">September 30, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>



[^phpway]: 「そんなこといってもぉ、どんなコード書いたらイケてるとかわかんないしぃ」というスイーツなそこのあなた。[PHP The Right Way.](http://www.phptherightway.com/)を今すぐ嫁。「技術書高ぃしぃ〜、重ぃしぃ〜、いゃ〜」とか「英語とか読めないしぃ〜」とかつべこべ言う前に無料だし[日本語版](http://ja.phptherightway.com/)もあるので黙って全部読むべし。
[^fbd]: [今後はD言語](http://japan.internet.com/webtech/20131018/5.html)なのか？
[^wp]: と、ここでホンネを言うと、WordPressの作りはかなり[アレ](http://mask-legacy.tumblr.com/post/62315583278/in-wordpress-phpcon2013-wctokyo)なので個人的にはさっさと世代交代してほしいのだわ
