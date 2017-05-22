---
layout: post
title: Railsフロントエンド技術の今とこれから
image: "/images/posts/roppongirb3/roppongirb-3.jpg"
description:
tags: rails frontend roppongirb
---

待望されたYarnサポートの入ったRails5.1が2017年4月にリリースされました。

[Ruby on Rails 5.1 Release Notes — Ruby on Rails Guides](http://edgeguides.rubyonrails.org/5_1_release_notes.html)

他にもjQueryがデフォルトdependencyから外されたり、Optionalでwebpackサポートが入ったりしており、Railsのフロントエンドは大きな転換点を迎えたと言ってよいでしょう。本エントリではRailsのフロントエンド技術の今を振り返り、今後どうなっていくかをまとめてみたいと思います。

## DisられてきたRailsフロントエンド :no_good:

Railsのフロントエンド技術スタックは、フロントエンドを専業とするエンジニアにDisられるものでした。具体的には下記の技術要素です。

- jQuery
- CoffeeScript
- Assets Pipeline (sprockets)
- gemのエコシステムに乗ったJSライブラリ(jquery-railsなど)

複雑化するWebアプリケーションにおいてjQueryはもう時代遅れとされてますし、CoffeeScriptよりも時代はES6、AltJS使うにしても今はTypeScriptが有力候補でしょうか。gemのエコシステムに乗っかっているJSライブラリがAsset Pipelineを通して各環境にシップされるていることも嫌われます。なぜならJSにはnpmというエコシステムがあるからです。

## Railsのフロントエンド刷新の歩み :walking:

しかし2016年春頃[^1]からRailsの作者・DHHの上げたIssueを皮切りに、フロントエンド技術刷新の歩みが始まります。その歴史・経緯を追ってみましょう。

### 2016年5月
- Rails v5.1 で jQueryを依存性としてDropしようというIssueをDHHが上げる
  - [Drop jQuery as a dependency · Issue #25208 · rails/rails](https://github.com/rails/rails/issues/25208)

### 2016年10月
- npm supportを追加するPRが上げられる
  - [Add Yarn support in new apps using --yarn option by Liceth · Pull Request #26836 · rails/rails](https://github.com/rails/rails/pull/26836)
- sprockets 側でNPMをsupportするPRが上げられる
  - [NPM support: Add support for resolving main from npm's package.json by guilleiguaran · Pull Request #405 · rails/sprockets](https://github.com/rails/sprockets/pull/405)

### 2016年11月
- npm support PRにてnpmではなくyarnを採用することが決められる
  - <https://github.com/rails/rails/pull/26836#issuecomment-257426850>
- jquery-rails をRailsから外すPRが上げられる
  - [Drop jQuery as a dependency by guilleiguaran · Pull Request #27113 · rails/rails](https://github.com/rails/rails/pull/27113)

### 2016年12月
- DHH自らwebpacker gemを作成開始、v0.1としてgemを公開
  - [FIRST!1! · rails/webpacker@f4cc31d](https://github.com/rails/webpacker/commit/f4cc31d)
- 同gemをRailsに取り込む
  - [Basic --webpack delegation to new webpacker gem by dhh · Pull Request #27288 · rails/rails](https://github.com/rails/rails/pull/27288)

### 2017年2月
- Rails 5.1.beta1 リリース
  - [Rails 5.1.0.beta1: Loving JavaScript, System Tests, Encrypted Secrets, and more \| Riding Rails](http://weblog.rubyonrails.org/2017/2/23/Rails-5-1-beta1/)
- webpacker 1.0 がリリースされる
  - <https://rubygems.org/gems/webpacker/versions/1.0>
- jQueryに依存しないujsである rails-ujs が actionview の1機能としてRails本体に取り込まれる
  - <https://github.com/rails/rails/commit/41c33bd4b2ec3f4a482e6030b6fda15091d81e4a>

### 2017年4月
- :tada: Rails 5.1 リリース
  - [Rails 5.1: Loving JavaScript, System Tests, Encrypted Secrets, and more \| Riding Rails](http://weblog.rubyonrails.org/2017/4/27/Rails-5-1-final/)

以上が現在に至るRailsフロントエンド進化の軌跡となります。2016年5月のDHHの問題提起からわずか(?)一年足らずでここまで進化したのは純粋にすごいなーと思いました。

## Railsのフロントエンド実装の選択肢

Rails5.1のフロントエンド刷新以降、**今Railsにはどんなフロントエンド実装の選択肢があるのか**、ざっと見てみます。

### 1. [Asset Pipeline](https://railsguides.jp/asset_pipeline.html)
- Sprockets + CoffeeScript, SASS, jQuery
- 今まで通りの古き良きassets管理
- 知見も多く転がっており、枯れているのでハマりにくい

### 2. [Sprockets 4](https://github.com/rails/sprockets)
- ES6 support <https://github.com/rails/sprockets/blob/master/UPGRADING.md#es6-support>
- Sprockets4の開発自体は停滞気味 <https://github.com/rails/sprockets/blob/master/CHANGELOG.md>

### 3. [browserify-rails](https://github.com/browserify-rails/browserify-rails)
- sprockets のコールバックとして動作
  - つまりsprocketsに依存している
- 導入のための参考記事: [モダンJavaScript開発環境 on Rails - クックパッド開発者ブログ](http://techlife.cookpad.com/entry/2015/12/14/130041)

### 5. [webpacker](https://github.com/rails/webpacker)
- 絶賛開発中
  - 活発に変更が入っているので導入に際しては現時点ではREADMEを参考にするのが良さそう
  - まだ小慣れていない印象
- 最初はwebpack+railsのシームレスな統合のための薄い実装だと思ったが、現在ゴテゴテな実装…
  - react, angular, elm, vue などの初期インストールタスクが１つのレポジトリに全部のっている
    - [plugable にしようぜ](https://github.com/rails/webpacker/issues/20#issuecomment-266347480)という話はあるができていない
  - 初回インストール時の生成ファイル・パッケージ構成はたぶんフロントエンドガチ勢からみたらクソの山っぽい: <https://github.com/rails/webpacker/blob/5003a5de0222c1f5b0f3c2b887064039e06f7eae/lib/install/template.rb#L25-L30>
  - レールにのったwebpack利用という意味のカジュアルな利用だったら良いかもしれない

### 4. [webpack-rails](https://github.com/mipearson/webpack-rails)
- Sprockets 非依存
- webpack利用のための薄い実装
  - 初期のwebpackerに似てる印象

### 6. [react_on_rails](https://github.com/shakacode/react_on_rails)
- SSRサポート
- [execjs](https://github.com/sstephenson/execjs) 依存
- webpacker integration アリ
  - webpackerの薄い実装も登場 [shakacode/webpacker_lite](https://github.com/shakacode/webpacker_lite)
- 参考記事: [Ruby on Rails on React on SSR on SPA - ✘╹◡╹✘](http://r7kamura.hatenablog.com/entry/2016/10/10/173610)

### 7. [react-rails](https://github.com/reactjs/react-rails)
- SSRサポート
- [execjs](https://github.com/sstephenson/execjs) 依存
- integration の選択肢として Rails Assets Pipline もしくは webpacker が選べる

### 8. 独自に導入
- 独自にJSアプリケーションをRailsに統合させる構成を考えRails上にのっける
- 例: [webpackを使った Rails上でのReact開発 - クックパッド開発者ブログ](http://techlife.cookpad.com/entry/2016/07/27/101015)

## どうすべきか

上記に紹介したように様々な実装があるわけですが、我々はどれをどのように選択すべきでしょうか。僕なりにまとめてみました。

![chart](/images/posts/roppongirb3/flowchart.png)

まず最初にあるのが、Railsが嫌い/宗教的にあわない/フロントエンドをレールにのらせたくないのであれば無理してRailsを使うことはないと思っています。Railsをやめる、あるいはRailsはWebAPIに徹して独立したフロントエンドの世界観を築くのもアリだと思ってます。

また現状のAsset管理に満足していて、かつビジネス上の要件としてリッチなJS実装が求められないのであれば無理してモダンなフロントエンド機構を構築する必要はありません。無理してwebpackだのbrowserifyだの導入せずに、古き良きAsset Pipelineでいいのです（技術そのものが目的な場合はこの限りではない）。

## 今後どうなるか

Railsコミュニティの流れとして、**今後どうなっていくか** も考えてみたいと思います。

### 1. gemからnpmへ

![bridge](/images/posts/roppongirb3/rails-npm.png)

RailsからNPM(yarn)のブリッジがRailsのコア機能の１つとして提供されたことはとても意義深いことだと思っています。その結果起こりうることとしては以下でしょうか。

- jquery-rails, underscore-rails のような Asset Pipeline に載せるタイプのgemは廃れていく(npm管理に移っていく)
- Railsエンジニアがnpmライブラリを今後どんどん活用することによって、RailsエンジニアのJS界隈進出が増えるかも…?
  - railsコミュニティにとってもnpmコミュニティにとっても良い事

### 2. Reactへの大潮流

今までJSライブラリのデファクトと言ったらjQueryでしたが、フロントエンド実装の複雑化にともないReactを採用する企業が増えその状況が変わってきました（少なくとも僕の観測範囲内では）。jQueryを使っての複雑なDOM操作のコードは破綻しがちですし限界があります。その結果のReact採用なのでしょう。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">反省会というからReact導入が一般的に浸透し導入後一巡したってことだろうなぁ<br>Twitterトレンド入り！ 「<a href="https://twitter.com/hashtag/React%E5%8F%8D%E7%9C%81%E4%BC%9A?src=hash">#React反省会</a>」登壇資料一挙公開！ | Wantedly Engineer Blog <a href="https://t.co/PbG49aclqa">https://t.co/PbG49aclqa</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/862817538022883328">May 11, 2017</a></blockquote>

上記のようにReactが導入されやすい環境が整ってきている昨今、今後ますますRails+Reactの採用事例は増えていくと思われます[^2]。

### 3. Turbolinks がますます下火に

~~黙って無効化すべし~~ 無効化されることの多いturbolinks機能ですがますます下火になっていくと思われます。

![](/images/posts/roppongirb3/turbolinks.png)

リッチなレンダリングUXを提供するためのRailsチーム(DHH)の苦肉の策がTurbolinksという理解でいますが、上述したようにフロントエンド開発の機構が整ってきている今、わざわざturbolinksを使う必要性もなくなってきました。

とはいえ、絶対にJS書きたくないでござる！というJS書きたくないマンなRailsエンジニアの選択肢の１つとしてはアリだと思います。

## フロントエンドというマイクロサービスがもたらす複雑性

と、ここまでRailsとフロントエンドの話をしてきましたが、一方で安易なフロントエンド技術の導入は負債を生み出す危険性もあることも付しておきます。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">このツラミわかるなぁ | ReactSPAをRailsに戻している話 // Speaker Deck <a href="https://t.co/G3Ln3NbmCQ">https://t.co/G3Ln3NbmCQ</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/857758278830350337">April 28, 2017</a></blockquote>

このケースのように複雑なフロントエンド実装が逆に負債となり足かせとなる場合もあります。[全くメンテされないクソJSコードの塊を作る](http://anond.hatelabo.jp/20170501085956)ような状況は避けなければなりません。

高度に専業化したフロントエンド技術はもはやいちサーバーサイドエンジニアが片手間に開発・メンテナンスできるレベルのものでもなくなってきています。うまく作ったとしてもその後のアップデートに追従していくのは至難の業でしょう。

<blockquote class="twitter-tweet" data-conversation="none" data-cards="hidden" data-lang="en"><p lang="ja" dir="ltr">紹介されているこっちのスライドもよくわかるなぁ。「フロントエンドは一個のマイクロサービス(ただのViewじゃない)」「マイクロサービス作っているのだから辛いの当然」 <a href="https://t.co/YqkrIYSXxf">https://t.co/YqkrIYSXxf</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/857790990496616448">April 28, 2017</a></blockquote>

このようにフロントエンドを１つのマイクロサービスと捉える見方もあります。マイクロサービスであるからこそ、モノリシックサービスよりもアーキテクチャ・実装が複雑になりがちです。高度なフロントエンド技術導入の際はチームとしてその複雑性を受け入れる覚悟が必要でしょう。

## イベント告知

そんなわけで随分と長い前置きでしたが、次回のRoppongi.rb#3のテーマは”Rails x Frontend”で開催します。

[Roppongi.rb #3 "Rails x Frontend-Tech"](https://roppongirb.connpass.com/event/56456/)

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Roppongi.rb #3 &quot;Rails x Frontend-Tech&quot; 〜これからのRails Frontendの話をしよう〜 を公開しました！ <a href="https://t.co/hOjXX7J8dC">https://t.co/hOjXX7J8dC</a> <a href="https://twitter.com/hashtag/roppongirb?src=hash">#roppongirb</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/861725918552707072">May 8, 2017</a></blockquote>

既に参加枠（抽選）は埋まっており参加登録いただいた方を全員ご案内できないのが恐縮ですが、もしよければ登録して遊びにきてください。

## 参考リンク

- [Rails5.1に向けてフロントエンド周りで起こっている革命まとめ - Qiita](http://qiita.com/itkrt2y/items/7e999836f460fb9c005d)
- [Rails5.1から導入されるwebpacker.gemは本当にRailsのフロントエンド開発に福音をもたらすのか? - Qiita](http://qiita.com/yuroyoro/items/a29e39989f4469ef5e41)

[^1]: ちょうど[RailsConf 2016](http://railsconf.com/2016)の後くらいのタイミングでしょうか。
[^2]: 一方で、複雑でないアプリケーションに対しReactを導入するのはオーバーキルなのでごく一部分の小さなイベント制御JSコードであればjQueryで十分な場面も未だ多くあると思います。
