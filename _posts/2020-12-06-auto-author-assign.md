---
layout: post
title: PR作者を自動でアサインするGitHub Actions, auto-author-assign を作った
image: "/images/posts/auto-author-assign/auto-author-assign.jpg"
description: "本記事はGitHub Actions Advent Calendar 2020６日目の記事です。 今日は作ったGitHub Actions、auto-author-assignの紹介をしたいと思います。Pull Request（以下、PRと表記）を作成をしたとき、多くの場合そのPRの担当者（Assignee）はそのPR作者自身になるかと思います。 その「PR担当者をPR作者にアサインする」アクションを自動化した、というのが今回作成したGitHub Actionsになります。"
tags: github-actions ci
---

本記事は[GitHub Actions Advent Calendar 2020](https://qiita.com/advent-calendar/2020/github-actions)６日目の記事です。

今日は作ったGitHub Actions、[auto-author-assign](https://github.com/toshimaru/auto-author-assign)の紹介をしたいと思います。

## 作ったきっかけ

Pull Request（以下、PRと表記）を作成をしたとき、多くの場合そのPRの担当者（`Assignee`）はそのPR作者自身になるかと思います。

その「PR担当者をPR作者にアサインする」アクションを自動化した、というのが今回作成したGitHub Actionsになります。

## 何が嬉しいか？

たくさんの人がPRを出しまくる、そんな大規模プロジェクトだとPR一覧を開いたときに

- 「誰がPRの担当者なのか？」がアイコンで一目でわかるようになる
- （`Author` に加えて）`Assignee` によるフィルターができるようになる

あたりが嬉しさになります。

![PR list](/images/posts/auto-author-assign/pull-request-list.png)

## 設定

リポジトリに `.github/workflows/auto-author-assign.yml` みたいなファイルを用意して下記のように設定すればOK。

```yml
name: 'Auto Author Assign'

on:
  pull_request_target:
    types: [opened, reopened]

jobs:
  assign-author:
    runs-on: ubuntu-latest
    steps:
      - uses: toshimaru/auto-author-assign@v1.2.0
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

### on: pull_request ではアサイン失敗することがある


最初、 `on: pull_request` でイベント発火させていたのですが、これだとfolkしたレポジトリからのPRで下記エラーが出てアサインが失敗します。

```
Error: Resource not accessible by integration
```

なぜなら folk したレポジトリからは `secrets.GITHUB_TOKEN` にアクセスできないためです。


> This event is similar to pull_request, except that it runs in the context of the base repository of the pull request (snip) This means that you can more safely make your secrets available to the workflows triggered by the pull request

via. [Events that trigger workflows - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows#pull_request_target)

ということで、 `on: pull_request_target` 使ってActionを起動させる必要があります。

## 余談

本Actionは[GitHub Actions Hackathon](https://dev.to/devteam/announcing-the-github-actions-hackathon-on-dev-3ljn)にも提出しました[^1]。

[^1]: [Assign pull request author automatically with GitHub Actions - DEV Community 👩‍💻👨‍💻](https://dev.to/toshimaru/assign-pull-request-author-automatically-with-github-actions-2i9o)
