---
layout: post
title: Kaigi on Railsで「FactoryBot the Right Way」を発表しました
image: "/images/posts/kaigi-on-rails.png"
description: "Kaigi on Railsで「FactoryBot the Right Way」というタイトルで発表しました。動画もYouTubeにアーカイブとして上がっておりますので、音声付きで聴きたい方はこちらをどうぞ。"
tags: presentation rspec rails
last_modified_at: 2020-10-08
---

[Kaigi on Rails](https://kaigionrails.org/)で「FactoryBot the Right Way」というタイトルで発表しました[^1]。

## スライド

<script async class="speakerdeck-embed" data-id="8084985a97ce4b6685d8528388da9779" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## アーカイブ動画

動画もYouTubeにアーカイブとして上がっておりますので、音声付きで聴きたい方はこちらをどうぞ。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">先行して <a href="https://twitter.com/toshimaru_e?ref_src=twsrc%5Etfw">@toshimaru_e</a> さんの動画をアップしました！他のセッションも順次公開していきますのでお楽しみに！ <a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a><a href="https://t.co/duhoF1Xu1S">https://t.co/duhoF1Xu1S</a> <a href="https://t.co/y3PRYVRlO8">https://t.co/y3PRYVRlO8</a></p>&mdash; Kaigi on Rails (@kaigionrails) <a href="https://twitter.com/kaigionrails/status/1312397413592653824?ref_src=twsrc%5Etfw">October 3, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 感想

今回は初のビデオ録画登壇でした。

今までのリモート登壇（[アラサーエンジニアの生存戦略](/career-strategy-for-around-thirty-engineer/)、[Fat Modelの倒し方](/how-to-deal-with-fat-model/)）は基本Zoomを使ったLIVE登壇だったので、今回初めて録画登壇を経験できて良かったと思います。

録画のセットアップとしては下記を利用しました。

- プレゼンテーションツール: Keynote
- スライド録画+音声録音: Keynoteのレコーディング機能 (with Krisp)
  - 参考: [MacのKeynoteでオーディオを録音する - Apple サポート](https://support.apple.com/ja-jp/guide/keynote/tan8a5df9cc5/mac)
- Backup用音声録音: QuickTime Player
  - 参考: [MacのQuickTime Playerでオーディオを録音する - Apple サポート](https://support.apple.com/ja-jp/guide/quicktime-player/qtpf25d6f827/mac)
- スピーカー側の動画撮影: iPad

> Kaigi on Railsのコアコンセプトは 「初学者から上級者までが楽しめるWeb系の技術カンファレンス」 です。

ということでしたが、今回の発表の内容的には初学者もそこそこ楽しめる内容になっていのではないでしょうか。参考になったのなら幸いです[^2]。

<blockquote class="twitter-tweet" data-conversation="none"><p lang="ja" dir="ltr"><a href="https://twitter.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a> 発表資料チラ見せ。FactoryBotをより上手に使いこなしたい初級者〜中級者レベルの方にはそこそこ有益な情報になっていると思いますので是非😊 <a href="https://t.co/dQDOzP3BpX">pic.twitter.com/dQDOzP3BpX</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1311079864070369280?ref_src=twsrc%5Etfw">September 29, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## おわり

Kaigi on Railsをオンラインで開催してくださったチーフオーガナイザーの [@okuramasafumi](https://twitter.com/okuramasafumi) をはじめ、運営スタッフの皆さま、ありがとうございました。

## 参考リンク

- 公式ドキュメント
  - [GETTING_STARTED.md](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md)
  - [Project Naming History](https://github.com/thoughtbot/factory_bot/blob/master/NAME.md)
- ベンチマークソースコード
  - [toshimaru/factory-bot-the-right-way](https://github.com/toshimaru/factory-bot-the-right-way)
- [13. ペアプロやテストの疑問とか、ソフトウェアエンジニアの育成とか \| fukabori.fm](https://fukabori.fm/episode/13)
- [Rails アンチパターン - 錆びついたファクトリー (factory_girl) - アジャイルSEの憂鬱](https://sinsoku.hatenablog.com/entry/2017/04/09/214728)
- [Rubyist Magazine: Kaigi on Rails 特集号](https://magazine.rubyist.net/articles/kaigi_on_rails/index.html)

[^1]: たぶん文法的には「FactoryBot **in** the right way」ってのが正しい気がするけど、こちらがゴロが良かったということでそれはご愛嬌で。。。
[^2]: RailsDM2018で発表したこちらの内容もあわせて参考にしていただけると :pray: [railsdm2018で「ActiveRecordデータ処理アンチパターン」を発表しました](/rdm2018-active-record-anti-patterns/)
