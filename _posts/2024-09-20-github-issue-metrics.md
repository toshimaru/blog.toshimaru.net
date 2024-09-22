---
layout: post
title: GitHub公式の issue-metrics Action で開発生産性を振り返る
image: "/images/posts/github-issue-metrics/og.png"
description: GitHub公式が出している issue-metrics Actionをご紹介。
tags: github github-actions
last_modified_at: 2024-09-21
---

GitHub公式が出している [issue-metrics](https://github.com/github/issue-metrics) Actionをご紹介。

## 開発生産性を計測するにはGitHub Insightは貧弱すぎる

GitHubのデータで開発生産性を計測したい。いわゆる[Four Keys メトリクス](https://cloud.google.com/blog/ja/products/gcp/using-the-four-keys-to-measure-your-devops-performance)を計測したい。

しかし、開発生産性を計測するにはGithub Insightの機能はあまりにも貧弱だ。

そんな折にGithubから開発メトリクスを計測する公式Actionが出ていたので試してみた。

[github/issue-metrics: Gather metrics on issues/prs/discussions such as time to first response, count of issues opened, closed, etc.](https://github.com/github/issue-metrics)

## 説明

リポジトリ名にIssueと付いているので、Issueに関するメトリクスを計測するものかと勘違いしてしまいそうになるが、Pull Requestに関するメトリクスも計測することができる。

具体的には下記の項目を出すことができる。

- **Time to first response**: PRが最初にレビューされるまでの時間
- **Time to close**: PRがマージ/クローズされるまでの時間
- **Number of items closed**: どれだけPRをマージ/クローズできたか
- **PR一覧**

## 使い方

公式のREADMEに掲載されたUsageの設定だと前月データ決め打ちになっているので、Year-Month を指定して`workflow_dispatch`イベントで実行できるように改修したものが下記：

`repo:your-org/repo-name` の部分は計測したいリポジトリ名に置き換えること。
{: .warning}

```yaml
# .github/workflows/monthly-metrics.yml
name: Monthly Pull Request metrics

on:
  workflow_dispatch:
    inputs:
      year:
        description: "Enter the year (e.g. 2023) for which you want to collect metrics"
        required: true
        type: number
      month:
        description: "Enter the month (1-12) for which you want to collect metrics"
        required: true
        type: number

permissions:
  issues: write
  pull-requests: read

jobs:
  build:
    name: pull request metrics
    runs-on: ubuntu-latest

    steps:
      - name: Get dates for specified year and month
        shell: bash
        run: |
          # Get the specified year and month from the inputs
          year=${{ github.event.inputs.year }}
          month=${{ github.event.inputs.month }}

          # Calculate the first day of the specified month and year
          first_day=$(date -d "$year-$month-01" +%Y-%m-%d)

          # Calculate the last day of the specified month and year
          last_day=$(date -d "$first_day +1 month -1 day" +%Y-%m-%d)

          # Set an environment variable with the date range
          echo "$first_day..$last_day"
          echo "selected_month=$first_day..$last_day" >> "$GITHUB_ENV"
      - name: Run issue-metrics tool
        uses: github/issue-metrics@v3
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SEARCH_QUERY: "repo:your-org/repo-name is:pr created:${{ env.selected_month }}"
      - name: Create issue
        uses: peter-evans/create-issue-from-file@v5
        with:
          title: "Monthly pull request metrics report (${{ env.selected_month }})"
          token: ${{ secrets.GITHUB_TOKEN }}
          content-filepath: ./issue_metrics.md
```

## 実行イメージ

下記のようにActionsページからポチポチで対象年＆月を指定して実行でする。

![Trigger Action by workflow_dispatch](/images/posts/github-issue-metrics/workflow-dispatch.png)

## サンプル

作られたメトリクス結果のサンプルは下記：

[Monthly pull request metrics report (2024-08-01..2024-08-31) · Issue #2333 · toshimaru/RailsTwitterClone](https://github.com/toshimaru/RailsTwitterClone/issues/2333)

## 最後に

Github Pull Request の簡易的なメトリクスを振り返るのに issue-metrics は便利。

一方で、GitHub公式の機能として Four Keys っぽいものをリアルタイムで確認できるような機能が欲しいぞ。GitHub殿、よろしく頼む。
