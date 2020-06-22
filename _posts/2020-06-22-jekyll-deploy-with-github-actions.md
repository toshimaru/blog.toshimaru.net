---
layout: post
title: JekyllのGitHub PagesへのデプロイをGitHub Actionsを自動化する
image: "/images/posts/"
description: "Jekyll製英語ブログのGitHub PagesへのデプロイをGitHub Actionsで自動化したのでそのメモ。"
tags: jekyll github ci
image: "/images/posts/github-pages/action-gh-pages.png"
---

Jekyll製[英語ブログ](https://blog.toshima.ru/)のGitHub PagesへのデプロイをGitHub Actionsで自動化したのでそのメモ。

## 今までのデプロイ方式

今までどうページソースをGitHub Pagesに自動デプロイしていたかでいうと、[Jekyllでgit pushをフックしてGithub Pagesへ自動デプロイ](/autodeploy-jekyll/)するようにしていた。

この方法でも全く問題ないがセットアップがやや面倒。なので英語ブログは手動デプロイ状態のまま放置していた。今はGitHub Actionsを使ったデプロイ方式がナウそうだ、とのことで重い腰を上げてその方式をトライ。

## 新しいデプロイ方式

対応したPull Request: [Deploy Automation with GitHub Actions · toshimaru/blog.toshima.ru](https://github.com/toshimaru/blog.toshima.ru/pull/160)

やっていることとしては至ってシンプル。

- masterブランチで変更があった場合にActionをトリガー
- `bundle install`
- `jekyll build`
- 生成した静的コンテンツのデータを[peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)を使って`gh-pages`ブランチにデプロイ

## GitHub Actions Configuration

実際のyamlファイルの設定は下記の通り。

```yml
on:
  push:
    branches:
      - master
jobs:
  gh-pages-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Ruby
      uses: actions/setup-ruby@v1
      with:
        ruby-version: 2.7
    - name: bundle install
      run: |
        bundle config set path 'vendor/bundle'
        bundle install
    - name: Jekyll Build
      run: bundle exec jekyll build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        personal_token: {% raw %}${{ secrets.GITHUB_TOKEN }}{% endraw %}
        publish_dir: ./_site
```

## 従来と比べて良い点

`gh-pages`ブランチにpushするにあたって`secrets.GITHUB_TOKEN` でトークンをセットするだけ。
