---
layout: post
title: Railsフロントエンド技術の今とこれから
image: "/images/posts/roppongirb3/roppongirb-3.jpg"
description:
tags: rails frontend
---

Yarnサポートの入ったRails5.1が2017年４月にリリースされました。

[Ruby on Rails 5.1 Release Notes — Ruby on Rails Guides](http://edgeguides.rubyonrails.org/5_1_release_notes.html)

yarnサポート以外にもjQueryをdefault dependencyから外したり、Optionalでwebpackサポートが入ったりしており、Railsのフロントエンド技術は大きな転換点を迎えようとしています。本エントリではRailsのフロントエンド技術の今を振返り今後どうなっていくかをまとめたいと思います。

## DisられてきたRailsフロントエンド :no_good:

Railsのフロントエンド技術スタックはフロントエンドエンジニアにとってDisられるものでした。具体的には下記の技術要素です。

- jQuery
- CoffeeScript
- Assets Pipeline (sprockets)
- gemのエコシステムに乗ったJSライブラリ(jquery-railsなど)

jQueryはもう時代遅れとされてますし、時代はES6、AltJS使うにしても今はTypeScriptが有力候補でしょうか。gemのエコシステムにのってAsset Pipelineで各環境にシップされるJS,CSSも嫌われます。JSにはnpmというエコシステムがあるからです。

## Railsのフロントエンド刷新の歩み :walking:

しかし2016年春頃からRailsの作者・DHHの上げたIssueを皮切りに、フロントエンド技術刷新の歩みが始まります。その歴史・経緯を追ってみましょう。

### 2016年5月
- Rails v5.1 で jQueryを依存性としてDropするIssueをDHHが上げる
  - [Drop jQuery as a dependency · Issue #25208 · rails/rails](https://github.com/rails/rails/issues/25208)

### 2016年10月
- Rails npm supportを開始するPRが上げられる
  - [Add Yarn support in new apps using --yarn option by Liceth · Pull Request #26836 · rails/rails](https://github.com/rails/rails/pull/26836)
- sprockets 側でNPMをsupportするPRが上げられる
  - [NPM support: Add support for resolving main from npm's package.json by guilleiguaran · Pull Request #405 · rails/sprockets](https://github.com/rails/sprockets/pull/405)

### 2016年11月
- 同PRにてnpmではなくyarnを採用することを決める
  - <https://github.com/rails/rails/pull/26836#issuecomment-257426850>
- jquery-rails をrailsから外すPRが上げられる
  - [Drop jQuery as a dependency by guilleiguaran · Pull Request #27113 · rails/rails](https://github.com/rails/rails/pull/27113)

### 2016年12月
- DHH自らwebpacker gemを作成開始、v0.1としてgemを公開
  - [FIRST!1! · rails/webpacker@f4cc31d](https://github.com/rails/webpacker/commit/f4cc31d)

### 2017年2月
- Rails 5.1.beta1 リリース
  - [Rails 5.1.0.beta1: Loving JavaScript, System Tests, Encrypted Secrets, and more \| Riding Rails](http://weblog.rubyonrails.org/2017/2/23/Rails-5-1-beta1/)
- webpacker 1.0 がリリースされる
  - <https://rubygems.org/gems/webpacker/versions/1.0>
- rails-ujs が actionview の１機能としてRails本体に取り込まれる
  - <https://github.com/rails/rails/commit/41c33bd4b2ec3f4a482e6030b6fda15091d81e4a>

### 2017年4月
- :tada: Rails 5.1 リリース
  - [Rails 5.1: Loving JavaScript, System Tests, Encrypted Secrets, and more \| Riding Rails](http://weblog.rubyonrails.org/2017/4/27/Rails-5-1-final/)

2016年5月のDHHの問題提起からわずか（?）一年足らずでここまで進化したのは純粋にすごいなーと思いました。

## Railsのフロントエンド実装の選択肢

1. Rails 4.x の標準機能
  - Sprockets + jQuery
  - CoffeeScript, SASS, jQuery
  - 今まで通りの古き良きassets管理
  - 知見も多く転がっており、枯れているのでハマりにくい
2. Sprockets 4
  - ES6 support https://github.com/rails/sprockets/blob/master/UPGRADING.md#es6-support
  - Sprockets4の開発は停滞気味 https://github.com/rails/sprockets/blob/master/CHANGELOG.md
3. browserify-rails
  - sprockets のコールバックとして動作
  - つまりsprocketsに依存
4. webpack-rails
  - https://github.com/mipearson/webpack-rails
  - Sprockets 非依存
  - webpacker利用のための薄い実装
    - 初期のwebpackerに似てる印象
5. webpacker
  - https://github.com/rails/webpacker
  - 絶賛開発中
  - 最初は webpack-rails の方向だと思ったが(webpack+railsのシームレスな統合のための薄い実装)、現在ゴテゴテ…
    - たぶんフロントエンドガチ勢からみたらクソの山っぽい
    - カジュアルな利用だったら良い
    - 薄い実装も登場している https://github.com/shakacode/webpacker_lite
6. react_on_rails
  - SSR
  - 参考 http://r7kamura.hatenablog.com/entry/2016/10/10/173610
  - https://github.com/sstephenson/execjs 依存
  - webpacker integration アリ
  - [shakacode/webpacker_lite: Slimmed down version of Webpacker with only the asset helpers optimized for React on Rails](https://github.com/shakacode/webpacker_lite) な実装も生まれていた
7. react-rails
  - SSR
  - integration の選択肢として Rails Assets Pipline or webpacker が選べる

## どうすべきか

TODO  フローチャートで提示

- 全然Asset Pipelineでもいいんだよ
- SPAがビジネス要件としてクリティカルでないかぎり無理して導入することはない
  - 技術そのものが目的な場合はこの限りではない

## Reactへの大潮流

今までJSライブラリのデファクトと言ったら、jQueryだったがこれがフロントエンド実装の複雑化にともない徐々にReactに置き換わりつつある（少なくとも僕の観測範囲内では）。

jQueryの複雑なDOM操作は限界があるしいつかは破綻する。そうなることが見えているなら新規プロダクトに関しては積極的にReactを採用していくべきだろう。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">反省会というからReact導入が一般的に浸透し導入後一巡したってことだろうなぁ<br>Twitterトレンド入り！ 「<a href="https://twitter.com/hashtag/React%E5%8F%8D%E7%9C%81%E4%BC%9A?src=hash">#React反省会</a>」登壇資料一挙公開！ | Wantedly Engineer Blog <a href="https://t.co/PbG49aclqa">https://t.co/PbG49aclqa</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/862817538022883328">May 11, 2017</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

今後もっとReact事例は増えていく。そうなったときにRailsでのデファクトが決まっている（レールが敷いてある）と開発者側としては非常にラク。

とはいえ、複雑でないアプリケーションに対しReactをオーバーキルなのでごく一部分の小さなイベント制御JSコードであればjQueryで十分な場面も多くあると思う。

## Turbolinks

~~黙ってDisableすべし~~

![](/images/posts/roppongirb3/turbolinks.png)

リッチなレンダリングUXを提供するためのRailsチーム(DHH)の苦肉の策がTurbolinksという理解でいるのだが、上述したようなフロントエンド開発がリッチにできるようになっているのでそっちを採用していくなら、turbolinksはますます不要になった。

とはいえJS書きたくないでござる！というJS書きたくない侍のための選択肢としてはアリ。

## 今後起こりうること

Rails <--橋--> NPM(yarn)

このブリッジができた。

- rails-underscore, rails-backbone みたいな Sprockets に載せる JS Asset は今後廃れていくだろう
- rubyエンジニアのJS界隈進出が増えるかも…?
- turbolinks も廃れていきそう

## Railsフロントエンドの未来予想図

- Sprockets4のながれ
- SPAの要求とともにyarn化

## フロントエンドというマイクロサービス

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">このツラミわかるなぁ | ReactSPAをRailsに戻している話 // Speaker Deck <a href="https://t.co/G3Ln3NbmCQ">https://t.co/G3Ln3NbmCQ</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/857758278830350337">April 28, 2017</a></blockquote>

もはやフロントエンドはrailsエンジニア1人が片手間で手に負えるレベルではなくなってきました。チームの技術スタックが

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" data-lang="en"><p lang="ja" dir="ltr">紹介されているこっちのスライドもよくわかるなぁ。「フロントエンドは一個のマイクロサービス(ただのViewじゃない)」「マイクロサービス作っているのだから辛いの当然」 <a href="https://t.co/YqkrIYSXxf">https://t.co/YqkrIYSXxf</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/857790990496616448">April 28, 2017</a></blockquote>

[フロントエンドが嫌い](http://anond.hatelabo.jp/20170501085956)

## 告知

そんなわけで随分と長い前置きでしたが、次回のRoppongi.rb#3のテーマは”Rails x Frontend”で開催します。既に参加枠（抽選）は埋まっており参加登録いただいた方を全員ご案内できないのが恐縮ですが、もしよければ登録して遊びにきてください。

## 参考リンク

- [Rails5.1に向けてフロントエンド周りで起こっている革命まとめ - Qiita](http://qiita.com/itkrt2y/items/7e999836f460fb9c005d)
- [Rails5.1から導入されるwebpacker.gemは本当にRailsのフロントエンド開発に福音をもたらすのか? - Qiita](http://qiita.com/yuroyoro/items/a29e39989f4469ef5e41)
