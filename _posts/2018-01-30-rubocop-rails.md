---
layout: post
title: Railsと同じRuboCopの設定が利用できるrubocop-rails gemを作った
image: "/images/posts/rubocop-rail.png"
description: Railsとほとんど同じRuboCopの設定が利用できるrubocop-railsというgemを作りましたので紹介します。 Rubyの静的コード解析の定番といえばRuboCopですよね。ですがRuboCopの設定ファイルrubocop.ymlの設定作業って結構大変じゃないですか？
tags: rails rubocop
modified_date: 2018-02-05
---

Railsとほとんど同じRuboCopの設定が利用できる[rubocop-rails](https://github.com/toshimaru/rubocop-rails)というgemを作りましたので紹介します。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Railsのrubocopと同じ設定を簡単に適用できるgemを作ったよ<br>toshimaru/rubocop-rails: Code style checking for Ruby on Rails project <a href="https://t.co/DnTRKtJc9j">https://t.co/DnTRKtJc9j</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/819931180304715776?ref_src=twsrc%5Etfw">January 13, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## モチベーション

Rubyの静的コード解析の定番といえば[RuboCop](https://github.com/bbatsov/rubocop)ですよね。ですがRuboCopの設定ファイル`rubocop.yml`の設定作業って結構大変じゃないですか？

RuboCopはデフォルトだと結構うるさすぎることが多いのでプロジェクト・チームに応じて何かしら設定はカスタマイズすると思います。しかし１つ１つ設定項目毎にチームのコンセンサスを取るのは非常にダルい。チームの一人が持ち込んだ＜俺の考える最強のRuboCop設定＞に従うという手もありますが「誰がお前の作った設定に従うか！」という気持ちも無くはない。

「何かしらRuboCop設定のレールが欲しいよね〜〜〜 :railway_car:」というところで閃き:bulb:、「だったら公式railsチームの用意した`rubocop.yml`を使えばいいじゃない」ということで冒頭のRailsとほぼ同じ設定を持った[rubocop-rails](https://github.com/toshimaru/rubocop-rails) gemを作りました。

## 使い方

使い方はrubocop-railsをinstallした後に、下記の設定を記述した`rubocop.yml`を用意する。

```yml
inherit_gem:
  rubocop-rails:
    - config/rails.yml
```

オーバーライドしたい設定、追加したい設定があれば、適宜同じ`rubocop.yml`内に設定を追加していく。

## 実際使ってみてどうか

実際使ってみるとうるさすぎず、しかしコードスタイルとしてきっちり統一させたいところは統一されており、使い心地はなかなか悪くないです。

また副次効果として、Railsにコントリビュートするときに普段からこのgemの設定に慣れておくと、Rails公式rubocop設定違反にならないコードを書けて便利。 :innocent:

## こんなRuboCop設定もあるよ

他の＜いい感じ＞に設定されたRuboCop設定も紹介してみます。これらの設定はきちんとチーム・会社でディスカッションされた上で作られたものだと思いますので信頼できるものかと思います。

- GitHubの場合: [github/rubocop-github](https://github.com/github/rubocop-github)
- SideCIでお馴染みのActcatの場合: [sideci/meowcop](https://github.com/sideci/meowcop)
