---
layout: post
title: reviewdogを使ってGitHub Actions上でRuboCop自動レビューを動かす
image: "/images/posts/rubocop-actions/rubocop-actions.jpg"
description: "過去にreviewdogを使ってCircleCI上でrubocop自動レビューを動かす記事を書きました。 本記事はそれのGitHub Actionsバージョンになります。　GitHub Actions上でreviewdogを使ってRuboCop自動レビューを動かすための設定を紹介します。"
tags: rubocop ci review github-actions
toc: true
last_modified_at: 2020-06-08
---

過去に[reviewdogを使ってCircleCI上でrubocop自動レビューを動かす記事](/reviewdog-rubocop/)を書きました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Blogged. | reviewdogを使ってCI上でRuboCop自動レビューを動かす - Hack Your Design! <a href="https://t.co/8vdNUEIisX">https://t.co/8vdNUEIisX</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1064661783594491904?ref_src=twsrc%5Etfw">November 19, 2018</a></blockquote>

本記事はそれの[GitHub Actions](https://github.com/features/actions)バージョンになります。

## なぜGitHub Actionなのか？

以前に書いた記事のようにCircleCIでも問題はないものの、GitHub ActionsはデフォルトでPull Requestにコメント可能な `GITHUB_TOKEN` を吐くことが可能で、そのへんのtoken周りの煩雑な設定が不要という点でCircleCIよりアドバンテージがあると言えます。

[Authenticating with the GITHUB_TOKEN - GitHub Help](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)

GitHubが公式機能として出していることもあり、GitHubとのIntegrationはGitHub Actionsのほうが優れている印象があります。

## 基本のrubocop設定

GitHub Actionsで動かす基本となるrubocop設定は下記の通りです。

※ 実際はbundlerのキャッシュの設定などが必要ですが今回は設定していません

```yml
# .github/workflows/rubocop.yml
name: RuboCop
on: [pull_request]
jobs:
  rubocop:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.6
    - run: |
        gem install bundler
        bundle install
    - name: Run rubocop
      run: bundle exec rubocop
```

上述の設定をベースにreviewdogを使った自動レビューの設定を追加していきます。


## reviewdogによる自動レビューを追加

追加するのは下記の2ステップです。

1. Setup reviewdog: reviewdog のバイナリをインストール
2. Run rubocop with reviewdog: rubocop の指摘を reviewdog に渡してPRコメントを付けさせる

yamlファイルとしては下記になります。

```yml
# .github/workflows/rubocop.yml
name: RuboCop
on: [pull_request]
jobs:
  rubocop:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.6
    - run: |
        gem install bundler
        bundle install
    - name: Setup reviewdog
      run: |
        mkdir -p $HOME/bin && curl -sfL https://raw.githubusercontent.com/reviewdog/reviewdog/master/install.sh | sh -s -- -b $HOME/bin
        echo ::add-path::$HOME/bin
    - name: Run rubocop with reviewdog
      env:
        REVIEWDOG_GITHUB_API_TOKEN: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
      run: bundle exec rubocop | reviewdog -reporter=github-pr-review -f=rubocop
```

## レビューコメント

設定がうまくいっていれば、下記のように `github-actions` からの自動レビューコメントが付きます。

![comment by github-actions](/images/posts/rubocop-actions/rubocop-by-github-actions.png)

## 実際に動かしてみたPull Request

実際にこの構成で設定してみたPRは下記になります。

[rubocop x reviewdog x GitHub Actions by toshimaru · Pull Request #16 · toshimaru/Test](https://github.com/toshimaru/Test/pull/16)

## 余談

本記事ではミニマルな設定を紹介しましたが、実行高速化のために実際は下記の設定もあわせてしたほうが良いでしょう。

- bundler cache の設定
- rubocop cache の設定（`~/.cache/rubocop_cache`）
- `--parallel` オプションの追加
