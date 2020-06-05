---
layout: post
title: 銀座Rails#21で「Fat Modelの倒し方」を発表した 〜質問・感想編〜
image: "/images/posts/ginzarails-21/og2.jpg"
description: "本記事は『銀座Rails#21で「Fat Modelの倒し方」を発表しました』の後編になります。当日あった質問、発表してみての感想などを書きたいと思います。当日の質問： ファイルの置き場について trailblazer について"
tags: presentation rails
---

本記事は『[銀座Rails#21で「Fat Modelの倒し方」を発表しました](/how-to-deal-with-fat-model/)』の後編になります。

当日あった質問、発表してみての感想などを書きたいと思います。

- toc
{:toc}

## 当日の質問

### ファイルの置き場について

質問の文脈としては「POROファイルの置き場ってどこ？」という内容でした。

発表中でPOROは「Modelの補助輪」という表現をしましたが、役割としてはModelにあたるので置き場所も`app/models`配下で問題ないと考えます。

特別な置き場を作りたくなってしまうかもしれませんが、Railsの提供するMVCのレールを逸脱しない範囲で独自路線を作っていくのが個人的には良いアプローチかなと考えています。POROをモデルの延長線上にあるものと考えれば、`app/models`にPOROが配置されているのは不自然ではないかと思います。

もちろん `app/models` の内部でドメイン毎にnamespace（module）を持たせファイルを構造化していくのはアリだと思います。例えば下記の例です。

```
app/models
├── application_record.rb
├── domain1
│   └── plain_object.rb
├── domain2
│   └── plain_object.rb
├── domain3
│   └── plain_object.rb
|
...
```

`app/models`にフラットにファイルを置いていくと、テーブル数増加・コード肥大化とともにものすごい数になってしまいます。意味のある単位でディレクトリ（module）を切っておくのは今すぐできる手軽な構造化という意味で、早いうちに導入しておくと良いと思います。

### trailblazer について

「[trailblazer](https://github.com/trailblazer/trailblazer) についてどう思う？」という話がありました。今回の発表にあたりtrailblazerはノーマークだったので、当日は「ちゃんと調べて触ったわけではないので、正直わかりません」という回答をしました。

trailblazer自体は、2015年頃に[Ruby Rogues Podcast](https://devchat.tv/ruby-rogues/206-rr-trailblazer-with-nick-sutterer/)で聞いて知っていて、当時は「へ〜、興味深いコンセプトのフレームワークだけど、Not for meかな〜」「RailsのMVC構造とは違って小難しそうなフレームワークだな〜」などと思っていました。

今回の発表を通して改めて trailblazer を評価してみると、**Railsの巨大化にともなって発生するペインポイントを回避するためによく考えられたアーキテクチャだ** と思いました。

trailblazer は「高度に抽象化（high-level abstractions）されたRubyフレームワーク」だと謳っています。「何と比べて高度か？」というと、明らかに「Rails（MVCアーキテクチャ）と比べて高度だ」と考えることができます。具体的にはMVCアーキテクチャと比べて、大規模化しても破綻しにくいアーキテクチャになっているかと思います。

![trailblazer](/images/posts/ginzarails-21/trailblazer.png)

一方でtrailblazerアーキテクチャの中には「Railsでもgemとか使えば表現できるよね？」っていう部分もあるのは事実だと思います。trailblazerのアドバンテージとしては **gem拡張なし** で **標準で** 実現できる点と言えます。素の状態で破綻しにくいアーキテクチャが提供されています。

Hanamiにも共通して言えることなのですが、trailblazerを採用するときのディスアドバンテージはこんな感じでしょうか。

- gem拡張に乏しい
  - やりたいことをやれるgemが転がっているか？
- ハマったときのトラブルシュートの難しさ
  - ドキュメントは十分にあるか？
  - コミュニティは成熟しているか？
- バグを踏んだときの問題解決の難しさ
  - アクティブなメンテナはどれだけいるか？
  - バグを報告したらすぐ反応して直してくれるか？
  - Pull Request を upstream にカジュアルに投げることができそうか？

上述したデメリットを考えると、Hanamiないしtrailblazerがどれだけ優秀なアーキテクチャであっても採用は慎重にならざるを得ないと言えます。

Ruby on Railsの優位性はRuby Webフレームワークの圧倒的デファクトになっていることです。gemエコシステムやコミュニティ、ドキュメント、ブログ記事がしっかり整っているのは圧倒的アドバンテージと言えるのではないでしょうか。

## 初リモート登壇してみて

### セットアップ

今回の発表が初の[Zoom](https://zoom.us/)によるリモート登壇でした。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">初リモート登壇セットアップ <a href="https://twitter.com/hashtag/ginzarails?src=hash&amp;ref_src=twsrc%5Etfw">#ginzarails</a> <a href="https://t.co/Ays780ImG9">pic.twitter.com/Ays780ImG9</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1261229167036653570?ref_src=twsrc%5Etfw">May 15, 2020</a></blockquote>

macOS + iPad の2画面を[Sidecar](https://support.apple.com/ja-jp/HT210380)を使って実現した形となります。通常登壇だとスピーカーノートを手元のマシンに映して、プレゼン資料をプロジェクタに映して...とするところですが、リモート登壇だとプロジェクタにあたる部分が無いのでサブディスプレイは必須だなと感じました。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&amp;bc1=000000&amp;IS2=1&amp;bg1=FFFFFF&amp;fc1=000000&amp;lc1=0000FF&amp;t=toshimaru-22&amp;language=ja_JP&amp;o=9&amp;p=8&amp;l=as4&amp;m=amazon&amp;f=ifr&amp;ref=as_ss_li_til&amp;asins=B07PRX2Q11&amp;linkId=496cfb91e959b3c29be79559c0666db9"></iframe>

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&amp;bc1=000000&amp;IS2=1&amp;bg1=FFFFFF&amp;fc1=000000&amp;lc1=0000FF&amp;t=toshimaru-22&amp;language=ja_JP&amp;o=9&amp;p=8&amp;l=as4&amp;m=amazon&amp;f=ifr&amp;ref=as_ss_li_til&amp;asins=B07H27J698&amp;linkId=aa0e907ba05d2a0e01a21b30e73d5b86"></iframe>

リモート発表ということもありネットワークが一番の心配事だったのですが、Google WiFiルーター ⇔ macOS とのネットワーク優先度をMAXにして、5GHz帯を掴むようにして発表に臨むことで、特に問題は発生しませんでした。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=toshimaru-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B084ZCV6M5&linkId=dd1f57286c1fe56f3d3bc5db74ef399e"></iframe>

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=toshimaru-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01MAW2294&linkId=bdc1818106278e95163b1f29f12bfdd9"></iframe>

また発声がキレイに通るように、ノイズキャンセリングApp・[Krisp](https://krisp.ai/)を導入していました（[こちら](https://ref.krisp.ai/u/ud778344eb)から登録すると一ヶ月無料で使えます）。リモート時代には必須。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">リモート戦国時代を生き抜くために Krisp を年間購読した</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1252784955878305792?ref_src=twsrc%5Etfw">April 22, 2020</a></blockquote>

プレゼンツールはおなじみの[Deckset](https://www.deckset.com/)。マークダウンでまとめられるのはGood、一方でデザインを凝ろうとするとパワポやキーノートより逆に大変なのでそのへんは課題感あります。

### 感想

正直な気持ちをいうと、「発表するならジェスチャーが使えて、オーディエンスの顔・反応が見れて、緊張感を持って臨めるリアル登壇が良いかなー」って考えだったのですが、コロナが長期化しそうな状況を鑑みて今回のリモート登壇にチャレンジしてみることにしました。

実際にやってみて良かったこととしては、お家環境で椅子に座ってノンビリ発表できるのでそこまで疲れないという点でした。あとZoomはリモート登壇にはとても便利なツール（良い背景画像が無かったので今回はバーチャル背景を使わなかったのが若干後悔）。

逆に難しいなと思ったのはやっぱりオーディエンスの反応が見えない点。ここは運営側で[Comment Screen](http://commentscreen.com/)環境を用意してもらえたことで、発表中のオーディエンスへの質問や反応はある程度見ることができました。またこれは登壇者側・参加者側どちらでもそうなのですが、リアル現場での懇親会のように発表後にカジュアルに話せないのはちょっと残念だなーと思う点です。

総じてリモート登壇を初めての体験できてよかったと思います。

あと今回いただいた30分という尺はある程度まとまった量の発表をゆっくり進行するには丁度良い尺でした。それ以上の長さになると発表者側もオーディエンス側もダレそうだなぁという印象。

## Special Thanks

本発表はもともと銀座Rails#18で発表予定だったものです。改めての発表機会をいただき、銀座Rails運営の皆様ありがとうございました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">イベントキャンセルによってお蔵入りした発表資料。普通に喋ったら20分超えの大作だっただけに残念。。。コロナが落ち着くまでは蔵出しせずに寝かせておくかな...😷 <a href="https://t.co/Qzu2YNQyve">pic.twitter.com/Qzu2YNQyve</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1229425295930716160?ref_src=twsrc%5Etfw">February 17, 2020</a></blockquote>

Rails Model の限界を考えるにあたり、[yasaichiさん](https://twitter.com/_yasaichi)、[hshiroyamaさん](https://github.com/hshimoyama)の発表を参考にさせていただきました。ありがとうございました。

<script async class="speakerdeck-embed" data-id="b5579c5fa5fa4e479ec81fda3b231eb2" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

<script async class="speakerdeck-embed" data-id="ce30c3cf9433471283e24855f6bdd2b4" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">1年前に「Ruby on Railsの正体と向き合い方」というテーマで登壇したときに、時間の関係で言及できなかった「コードレベルの向き合い方」の詳細が綺麗に整理された上でまとまっていて、いたく感動してしまった。おすすめ / Fat Modelの倒し方 / how to deal with fat model <a href="https://t.co/0vMubQfiLb">https://t.co/0vMubQfiLb</a></p>&mdash; (やさいち|yasaichi) (@_yasaichi) <a href="https://twitter.com/_yasaichi/status/1264889633332060160?ref_src=twsrc%5Etfw">May 25, 2020</a></blockquote>
