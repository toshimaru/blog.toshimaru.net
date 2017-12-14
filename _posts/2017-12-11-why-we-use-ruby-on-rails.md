---
layout: post
title: railsdmで「「Railsでまだ消耗しているの？」─僕らがRailsで戦い続ける理由─」を話してきました
image: /images/posts/railsdm/rdm2017.png
description: Rails Developers Meetup 2017でLT枠をいただき、「「Railsでまだ消耗しているの？」─僕らがRailsで戦い続ける理由（ワケ）─」と題して発表してきました。ざっくり発表内容をこちらにもまとめてみたいと思います。ざっくり発表内容をこちらにもまとめてみたいと思います。　※公開用に一部スライドを編集してあります
tags: rails presentation
---

[Rails Developers Meetup 2017](https://techplay.jp/event/631431)でLT枠をいただき、「「Railsでまだ消耗しているの？」─僕らがRailsで戦い続ける理由（ワケ）─」と題して発表してきました。ざっくり発表内容をこちらにもまとめてみたいと思います。

<script async class="speakerdeck-embed" data-id="68db83f9e02946f08a45817d8fb25b09" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

※公開用に一部スライドを編集してあります:wink:

## テーマ設定について

Web開発においてGoやPython、PHP、Node.js、Scala、Elixirなど様々な選択肢がある中で「なぜ今、Ruby/Railsを使うのか？」というテーマを個人的に掘り下げてみたかったのでこの機会に発表してみることにしてみました。

## Railsの2つの哲学

1. **DRY** (Don't Repeat Yourself): 同じことを繰り返さない
2. **CoC** (Convention over Configuration): 設定より規約

Railsの哲学は上記の２つがありますが、個人的にはDRYよりもCoCがずっと重要だと思ってます。なぜならDRYはプログラミング行為において普遍的な考え方である一方、CoCはRailsが定めたRails独自の規約だからです。

## Ruby on Railsの本質

Ruby on Railsの本質は、**センスの良い規約（=Rail）によって設定および設計の手間を最小限にした** ことだと考えます。

この規約により我々は設定にまつわるコードを数百行書いたりとかする必要もなくなりましたし、設計工程で生じがちな＜俺の考える最強のアプリケーション設計バトル＞や＜俺の考える最強のデータベース設計選手権＞を緩和しコミュニケーションコストを大幅にカットすることができました（とはいえその規約に規定されていない部分の設計はどうするんだという問題は残りますが...）。

この規約によって我々はRuby on Railsで **圧倒的コード量の少なさと生産性の高さを実現** できました。

## Rails批判:「〇〇の方が速いよ」

パフォーマンス要件がマストでないときにRailsを使いましょう。パフォーマンス要件がマストのケースにおいては（e.g. 広告サーバー）そもそもRubyという言語選択はするべきでないです。

「速い」の定義をどこにおくかも重要なポイントです。この速さを「処理系の速さ」としたらRubyはGoなどには負けますが、「開発の速さ」とした場合はどうでしょうか？　我々にとって価値のある速さはどちらでしょうか？　例えばスタートアップなどにおいて1日でも1時間でも早くPDCAサイクルを回したい場合にRailsのほうが最適ではないでしょうか。

またエンドユーザーにとっての速さは必ずしも処理系の速さとは一致しない点も気をつけてください。かの超絶高速なサイト[dev.to](https://dev.to/)はRails製であるという事実を忘れないでください。

### dev.toはRails製であるという事実

この事実から言えることは **サービス特性と要素技術を正しく理解・把握した上で最適なアーキテクチャを選択する** ことが重要ということです。

例えば[dev.to](https://dev.to/) の場合、キャッシュしやすいというサービス特性を利用して、Railsで生成されるコンテンツを爆速CDNであるFastlyに載せて配信させました。これにより結果的に最高の爆速UXを提供できているのです。

つまり速さという点において問題になるレイヤーはアプリケーションサーバーのレイヤーだけではないということです。

## Ruby/Railsが遅いという前に

「Ruby/Railsが遅い!」という前に下記はしっかり確認していただきたいものです。

- 自分のアプリケーション設計やテーブル設計の失敗の責任を、言語やフレームワークに押し付けてはいないか
- するべき最適化をする前に遅いと斬り捨ててはいないか

僕の経験上、Railsで"ちゃんと"作ることができれば、爆速ではないかもしれませんがまぁまぁ速いくらいのサイトは実現可能だと思います。

## 高速化の努力

とはいえ高速化の努力はあって、Ruby3に向けてのRuby高速化（いわゆる[Ruby3x3](http://gihyo.jp/news/report/01/rubykaigi2017/0003)）や、[bootsnap](https://github.com/Shopify/bootsnap)のようなRailsの起動高速などの努力があります。

## 2018年、Ruby on Railsという選択

小〜中規模のWebアプリケーション（言い換えるとマイクロサービス化を考えなくても済むような規模）であればRailsで十分戦えると考えています。

なので2018年もRuby on Railsは有効なWebアプリケーションフレームワークの選択肢であり続けでしょう。少なくとも、Ruby on Railsを超えるようなベターオルタナティブが出現しない限りはそうでしょう。

## 発表を終えて

本発表を聞いた人には「じゃあ一生Ruby/Railsを使い続けるのか？」と思われるかもしれませんが、今後Railsくらいの生産性を発揮できてRailsより速いフレームワークが出現するのであれば全然乗り換える準備はあります。

ただドキュメント・ライブラリ・運用実績などの周辺環境も含めてRuby/Rails並みに整うのは相当厳しいように思われますので、あと３年位はRailsの寿命は続くのかなという印象です。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">誰か日本でRubyKaigiじゃなくてRailsKaigiをオーガナイズしてくれる人はいないものか（チラッ<br>めちゃくちゃ人集まることは絶対間違いないと思うのだけど。。。</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/841439645011394564?ref_src=twsrc%5Etfw">March 14, 2017</a></blockquote>
<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">以前書いたこれ、現場の知見の共有という意味では <a href="https://twitter.com/hashtag/railsdm?src=hash&amp;ref_src=twsrc%5Etfw">#railsdm</a> がやっていってくれてる感ある <a href="https://t.co/XLGDEEKooR">https://t.co/XLGDEEKooR</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/940369828451303424?ref_src=twsrc%5Etfw">December 11, 2017</a></blockquote>

## 参考

- その他の発表スライドなどはこちら [Rails Developers Meetup 2017](https://railsdm.github.io/2017/)
- 当日のTweetまとめ [Rails Developers Meetup 2017 #railsdm - Togetter](https://togetter.com/li/1179895)
