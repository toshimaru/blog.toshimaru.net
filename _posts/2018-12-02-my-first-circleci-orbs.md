---
layout: post
title: はじめてのCircleCI Orbsを公開した
image: "/images/posts/circleci-orb.png"
description: "はじめてのCircleCI Orbsを公開した。そのメモ。2018年11月に正式公開されたCircleCI Orbs。本日Orbsをリリースしました。OrbsはWorkflow以来のメジャーアップデートです。OrbsはCircleCIの設定をパッケージ化する仕組みで、誰でも自分のOrbsを公開できます。これはCI/CDサービスとしては初の試みで、今後はユーザーやパートナーを巻き込んでCircleCIのエコシステムを構築することができます。要はいろんなレポジトリで使っている共通のCircleCIの設定を共通化できる仕組みのこと。僕もいろんなRuby on Railsプロジェクトでよく使うコマンド、bundle installをCircleCI Orbsを使って共通化してみることにしてみました。
"
toc: true
tags: circleci
---

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">I published my first CircleCI Orb! » CircleCI Orb Registry - toshimaru/bundle-install <a href="https://t.co/Ikd11JmEFd">https://t.co/Ikd11JmEFd</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1068431295804465152?ref_src=twsrc%5Etfw">November 30, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

はじめてのCircleCI Orbsを公開した。そのメモ。

## CircleCI Orbsとは

2018年11月に正式公開されたCircleCI Orbs。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">本日Orbsをリリースしました🥳OrbsはWorkflow以来のメジャーアップデートです。OrbsはCircleCIの設定をパッケージ化する仕組みで、誰でも自分のOrbsを公開できます。これはCI/CDサービスとしては初の試みで、今後はユーザーやパートナーを巻き込んでCircleCIのエコシステムを構築することができます。</p>&mdash; CircleCI Japan (@CircleCIJapan) <a href="https://twitter.com/CircleCIJapan/status/1060285769124696064?ref_src=twsrc%5Etfw">November 7, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

要はいろんなレポジトリで使っている共通のCircleCIの設定を共通化できる仕組みのこと。

## 作ってみた

僕もいろんなRuby on Railsプロジェクトでよく使うコマンド、`bundle install`をCircleCI Orbsを使って共通化してみることにしてみました。

- 結果できたのがこちら: [CircleCI Orb Registry - toshimaru/bundle-install](https://circleci.com/orbs/registry/orb/toshimaru/bundle-install)
- GitHubソースコードはこちら: [toshimaru/bundle-install](https://github.com/toshimaru/bundle-install)

## 作り方

### Install circleci command

まずはcircleciコマンドを入手。

```
brew install circleci
```

### namespace 作成

namespaceを取得します。

```
$ circleci namespace create toshimaru github toshimaru
```

### Orb 作成

namespace以下のorb名を作成します。

```
$ circleci orb create toshimaru/bundle-install
Orb toshimaru/bundle-install created.
Please note that any versions you publish of this orb are world-readable.

You can now register versions of toshimaru/bundle-install using circleci orb publish.
```

### Publish CircleCI Orb

作成した`orb.yml`を公開します。

```
$ circleci orb publish src/orb.yml toshimaru/bundle-install@0.0.1
Orb toshimaru/bundle-install@0.0.1 was published.
Please note that this is an open orb and is world-readable.
```

## 作成したOrbを使う

次に作成したOrbを使う側、呼び出す側の設定です。

```yml
orbs:
  toshimaru: toshimaru/bundle-install@0.1.0

jobs:
  build:
    docker:
      - image: circleci/ruby
    steps:
      - checkout
      - toshimaru/bundle-install
      # - bundle exec rspec
```

実際に下記のPRでOrbの変更例が見れますのでご参照ください。

[Introduce CircleCI Orbs by toshimaru · Pull Request #264](https://github.com/toshimaru/RailsTwitterClone/pull/264/files)

## 参考にした記事

- 全体的にこちらの手順を参考にさせていただきました。 [CircleCI Orbs 入門 | tsub's blog](https://blog.tsub.me/post/introducing-to-circleci-orbs/)
- ファイルの構成などこちらを参考にさせていただきました。https://github.com/sue445/circleci-ruby-orbs
