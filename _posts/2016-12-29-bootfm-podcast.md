---
layout: post
title: "boot.fm Podcast に出演しました"
description: "ちょっと前だが今月boot.fmというTech系Podcastに出演した。最近流行りのTechポッドキャストに出演しました。分報、フロントエンド技術とどう付き合うか、コードレビュー、mrubyあたりを話してます | Vol.4: Code review as a prior investment そのフォローアップや話しきれなかったことなど書いてみます。"
tags: podcast tech
---

ちょっと前だが今月[boot.fm](https://bootfm.github.io/)というTech系Podcastに出演した。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">最近流行りのTechポッドキャストに出演しました。分報、フロントエンド技術とどう付き合うか、コードレビュー、mrubyあたりを話してます | Vol.4: Code review as a prior investment <a href="https://t.co/FjRE8HQa4E">https://t.co/FjRE8HQa4E</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/809544891696939009">December 15, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

そのフォローアップや話しきれなかったことなど書いてみます。

## Slack分報・タスク管理について

分報の元ネタ: [Slackで簡単に「日報」ならぬ「分報」をチームで実現する3ステップ〜Problemが10分で解決するチャットを作ろう \| Craftsman Software Inc.](http://c16e.com/1511101558/)

### 僕が思う分報の良い点

- 日報より情報発信の敷居がずっと低い
  - 多分一番分かりやすい喩えは **社内Twitter**
- カジュアルなコミュニケーションができる
  - ハマっていることとかさらっと書いたら誰かが助け舟を出してくれたり
  - ゆるーい雑談とかも
- リアルタイムなコミュニケーションができる
  - Podcast内で紹介した[/todo](https://toshi.slack.com/apps/A0HBTUUPK--todo)みたいなSlackインテグレーションアプリと組み合わせることによって、リアルタイムにタスクのWIP/DONEを関係者に共有できる

基本的に僕は日報を書いていきたいと思っているのだけど、日報真面目に書いているとけっこう時間がかかってしまう。最初は乗り気しなかったけどとりあえずやってみるかと始めた分報だが、日報ハードル高すぎ問題を感じていた僕には丁度良くハマった。

情報発信の対象となる受け手も限られていて、些細なこともカジュアルに書きやすいし読み手を過剰に意識することも少ない。

### 僕が思う分報の悪い点

- Slackチャンネル多くなる
  - 1チャンネル/user なので人数分チャンネルできる
  - JOINしすぎると間違いなくノイズになるのでMuteなり加入チャンネル選ぶなりで凌ぐ
- 知性のない発言が多くなる（かもしれない）
  - そういうのも含めて社内Twitterでありカジュアルなコミュニケーションなんだからまぁ良い点ともいえる

### その他Slackで便利そうなやつ

- [便利な Slack Integration App](https://toshi.slack.com/apps/category/At0G5YTKU2-analytics) 使ってKPIとか流してみる
- [masuidrive/miyamoto](https://github.com/masuidrive/miyamoto) でSlack勤怠管理してみるとか
- [HUBOT](https://hubot.github.com/)みたいなChatbotを棲ませて自動化実現したり便利機能を提供したりとか

便利な Slack Integration App もどんどん増えているのでそういうのはどんどん導入していくと良いと思う。

Chatbot系はアイディア勝負。便利な使い方あればどんどん紹介してほしいと思う。

## フロントエンド vs バックエンド

僕が最近React書いてて感じている「Railsやりつつフロントエンドのキャッチアップはしきれないし〜自分の書いているコードに自信を持ていないし〜けっこう妥協しちゃってるんですよ〜」という悩み相談みたいな感じになってしまったかもしれない。

お二人ともPodcast内で話したが、結論としては至極まっとうで、プロトタイピングやそもそもJavaScriptヘビーにSPAを作る必要がないのであれば無理してJS書くことないし、Railsのレールに乗っかってけばいいじゃんという感じ。

SPAにすることがプロダクトの価値として高くなるのであればReactなりAngularなり導入に踏み切ればいいじゃん、という感じ。ただそうなってくるとどうしてもRailsのレールから外れて開発を進めていく必要があり、レールを外れる勇気と覚悟が必要でウッ...となる。

とここまで書いてアレですが、Podcast収録した時点ではリリースされていなかった[rails/webpacker](https://github.com/rails/webpacker)が現在出てきており、とうとうRailsにもyarn、webpackへの世界へのレールが開かれようとしております。そしてwebpackerの仕組みに乗っかってReactがinstallできるような仕組みも用意されつつある。

そういう流れが整備されていけば多少僕が今抱えている不安感も和らぐだろうと思いました。

## コードレビューについて

けっこう自分が今コードレビューに時間をかけているので、コードレビュー質的・時間的にどれくらいやるもんなんって話。

コスト、というとコストかけたくないでござる！みたいなことを暗に思っているのではと思われてしまうかもしれないが、そうではない。基本的にレビューにはコストをかけるべきだし、短期的には時間がかかろうともそれは中長期的にチームの生産性向上につながると思ってる。つまりコードレビューに時間をかけるということはチームへの投資であるということ。

そのコードレビューをどう効率的に回していくかという話もできればよかったけどそれはまた別の機会に。まぁ基本的に丁寧なコードレビューをしようと思うとやっぱり時間はかかる。

## mruby

mrubyワンチャンある？って話。得られた知見はこうだ。

- Rubyのシンタックスはmrubyでもだいぶ動く
- mrubygem エコシステムはまだまだ未成熟
- Cを書く覚悟が必要（mrubygemないときにCを書く場面がある）
- 信頼できない mrubygem だとたまに環境がぶっ壊れることある
- デバッグは(現在のところ)printデバッグ
- パフォーマンスが求められる場面だとmrubyよりはgolangが良い

## 参考リンク

- [boot.fm](https://bootfm.github.io/)
- [Roppongi.rb #2 "Infrastructure x Ruby" - connpass](https://roppongirb.connpass.com/event/42633/)
- [リモートワークは敢えて取り入れない。Gunosyデータ分析部「情報共有」の仕組みとは \| SELECK](https://seleck.cc/822)
- [k0kubun/mitamae: Configuration management tool embedding mruby, which is alternative implementation of Itamae](https://github.com/k0kubun/mitamae)
- [Rubyを評価するCLIツールはCRubyとmrubyのどちらで実装するべきか - Qiita](http://qiita.com/k0kubun/items/3995d3b730b63ef67c56)
