---
layout: post
title: reviewdogを使ってGitHub Actions上でRuboCop自動レビューを動かす
image: "/images/posts/rubocop-actions/rubocop-actions.jpg"
description: 
tags: github ci review
toc: true
---

過去に[reviewdogを使ってCircleCI上でrubocop自動レビューを動かす記事](/reviewdog-rubocop/)を書きました。

本記事はそれの[GitHub Actions](https://github.com/features/actions)バージョンになります。

## なぜGitHub Actionなのか？

以前に書いた記事のようにCircleCIでも問題はないものの、GitHub ActionsはデフォルトでPull Requestにコメント可能な `GITHUB_TOKEN` を吐くことが可能で、そのへんのtoken周りの煩雑な設定が不要という点でCircleCIよりアドバンテージがあると言えます。

[Authenticating with the GITHUB_TOKEN - GitHub Help](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)

GitHubが公式機能として出していることもあり、GitHubとのIntegrationはGitHub Actionsの

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
        REVIEWDOG_GITHUB_API_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      run: bundle exec rubocop | reviewdog -reporter=github-pr-review -f=rubocop
```

## レビューコメント

設定がうまくいっていれば、下記のように `github-actions` からの自動レビューコメントが付きます。

![](/images/posts/rubocop-actions/rubocop-by-github-actions.png)

## 実際に動かしてみたPull Request

実際にこの構成で設定してみたPRは下記になります。

[rubocop x reviewdog x GitHub Actions by toshimaru · Pull Request #16 · toshimaru/Test](https://github.com/toshimaru/Test/pull/16) 
