---
layout: post
title: reviewdogを使ってCI上でRuboCop自動レビューを動かす
image: "/images/posts/rubocop_x_reviewdog.jpg"
description: "rubocopの自動レビューをreviewdogを使ってやってみたのでその知見です。 Auto-RuboCop on CircleCI powered by reviewdog 僕の作っているプロジェクトでrubocop自動レビューをCircleCI上で設定してみました。そのプルリクエストを見てもらうのが一番早いと思いますので、下記リンクより差分を確認してください。基本的には公式READMEのCircleCIセットアップ手順通りですが、まずは下記のようにreviewdogのバイナリをcurl経由で落とします。reviewdogにコメントさせるためにはコメントできる権限を持ったGitHub Tokenが必要になります。下記手順でGitHub Tokenを取得してください。"
tags: review rubocop github circleci ci
last_modified_at: 2020-06-08
---

[rubocop](https://github.com/rubocop-hq/rubocop)の自動レビューを[reviewdog](https://github.com/haya14busa/reviewdog)を使ってやってみたのでその知見です。

- toc
{:toc}

## 追記

本記事の GitHub Actions 版を書きました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">blogged. | reviewdogを使ってGitHub Actions上でRuboCop自動レビューを動かす - Hack Your Design! <a href="https://t.co/4u11iBjm6G">https://t.co/4u11iBjm6G</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1267121968307814401?ref_src=twsrc%5Etfw">May 31, 2020</a></blockquote>

## Auto-RuboCop on CircleCI powered by reviewdog

僕の作っているプロジェクトでrubocop自動レビューをCircleCI上で設定してみました。そのプルリクエストを見てもらうのが一番早いと思いますので、下記リンクより差分を確認してください。

<https://github.com/toshimaru/RailsTwitterClone/pull/254>

### 1. `config.yml`の設定

基本的には[公式READMEのCircleCIセットアップ手順](https://github.com/haya14busa/reviewdog#circle-ci)通りですが、まずは下記のようにreviewdogのバイナリを`curl`経由で落とします。

```yml
# 環境変数でダウンロードするreviewdogのバージョンを指定
environment:
  REVIEWDOG_VERSION: "0.9.11"

# reviewdogをcurlでダウンロード
- run:
    name: Install reviewdog
    command: |
      curl -fSL https://github.com/haya14busa/reviewdog/releases/download/$REVIEWDOG_VERSION/reviewdog_linux_amd64 -o reviewdog && chmod +x ./reviewdog
```

### 2.コメントできるTokenを取得 & 設定

reviewdogにコメントさせるためにはコメントできる権限を持ったGitHub Tokenが必要になります。下記手順でGitHub Tokenを取得してください。

- [アクセストークンの取得ページ](https://github.com/settings/tokens)にいく
- 下記の権限を設定してTokenを発行
  - Privateレポジトリの設定: `repo`をチェック
  - Publicレポジトリの設定: `public_repo`をチェック

これでTokenが発行できましたので、次にそのTokenの設定です。

- CircleCIの環境変数の設定画面を開く
- 下記の環境変数を設定
  - `REVIEWDOG_GITHUB_API_TOKEN`の値に前手順で取得したTokenを設定

これにてreviewdogにコメントできる権限が付与されました。

### 3. rubucopの結果をreviewdogで通知

あとはいつも通りのrubocopのコマンドをパイプしてreviewdogに渡してあげればOK。その際のオプションは `-f=rubocop`（rubocopフォーマット指定）, `-reporter=github-pr-review`（GitHub PRレビューコメント形式の指定） の２つを指定します。

```yml
- run: bundle exec rubocop | ./reviewdog -f=rubocop -reporter=github-pr-review
```

## 完成yamlイメージ

`.circleci/config.yml`の完成イメージは下記です（完全なyamlファイル[当該Pull Request](https://github.com/toshimaru/RailsTwitterClone/pull/254/files)より確認してください）。なおCircleCIはversion2.1を使用していることに注意してください（現時点の最新バージョン）。

```yaml
version: 2.1
executors:
  default:
    working_directory: ~/app
    docker:
      - image: circleci/ruby:2.5-node-browsers
        environment:
          RAILS_ENV: test
          REVIEWDOG_VERSION: 0.9.11
jobs:
  rubocop:
    executor:
      name: default
    steps:
      - checkout
      - bundle_install
      - run:
          name: Install reviewdog
          command: |
            curl -fSL https://github.com/haya14busa/reviewdog/releases/download/$REVIEWDOG_VERSION/reviewdog_linux_amd64 -o reviewdog && chmod +x ./reviewdog
      - run: bundle exec rubocop | ./reviewdog -f=rubocop -reporter=github-pr-review

workflows:
  test:
    jobs:
      - ...省略...
```

## なぜreviewdogなのか

ruboop自動レビューのための既にあるツールとしては、[Saddler](https://github.com/packsaddle/ruby-saddler)や[pronto](https://github.com/prontolabs/pronto)などがありますが、なぜそれらを使わずにreviewdogを採用したのかというと下記の理由からです。

- Goのシングルバイナリポン置き（curlワンコマンド）でSetupがめちゃくちゃ楽
- Language Agnostic （Ruby以外もGo, PHP, Pythonなど他言語で使える）
- Go実装でパフォーマンスが良い
- Activeにメンテされている
- READMEドキュメントが充実している
- 日本人が作っている！（おまけ理由

## 最後に

本記事ではRubyプロジェクトのrubocop checkをreviewdogを使ってCircleCI上で動かす例を紹介しました。

公式READMEにはTravisCI上での動かし方であったり、GitHubの新機能・GitHub Checks形式での動かし方も記載されておりますので、興味があるかたは公式READMEをご参照ください。

## 参考資料

- [haya14busa/reviewdog](https://github.com/haya14busa/reviewdog)
- [reviewdog を飼ってコードレビューや開発を改善しませんか - haya14busa](http://haya14busa.com/reviewdog/)
- [reviewdogを使ってtextlintの結果をPull Requestに書き込む方法 - Qiita](https://qiita.com/azu/items/c563da0b5455a1b1dca2)
