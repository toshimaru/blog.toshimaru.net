---
layout: post
title: DependabotをGitHub公式Dependabotに移行させた
image: "/images/posts/github-dependabot/og.png"
description: "2019年、DependabotがGitHubに買収されたことはご存知の通り。 そのDependabotの機能が公式機能として取り込まれたということので早速移行してみた。 Keep all your packages up to date with Dependabot - The GitHub Blog"
tags: github ci
last_modified_at: 2020-06-28
---

[2019年、DependabotがGitHubに買収された](https://dependabot.com/blog/hello-github/)ことはご存知の通り。

そのDependabotの機能が公式機能として取り込まれたということので早速移行してみた。

[Keep all your packages up to date with Dependabot - The GitHub Blog](https://github.blog/2020-06-01-keep-all-your-packages-up-to-date-with-dependabot/)

## Dependabot管理画面から簡単移行

既存のDependabot管理画面から `Create config file`をクリック。

![config](/images/posts/github-dependabot/create-config.png)

## `.github/dependabot.yml` 作成

するとdependabot-preview氏がPull Requestを自動的に作ってくれる。

![pull request](/images/posts/github-dependabot/pr.png)

via. [Create Dependabot config file by dependabot-preview · Pull Request #15 · toshimaru/auto-author-assign](https://github.com/toshimaru/auto-author-assign/pull/15)

yamlの内容は下記の通り。

```yml
version: 2
updates:
- package-ecosystem: npm
  directory: "/"
  schedule:
    interval: weekly
    time: '21:00'
  open-pull-requests-limit: 10
  reviewers:
  - toshimaru
```

既存の設定をベースに自動的に内容を作成してくれた雰囲気。

## 移行完了

PRをマージし、無事に移行が完了するとDependabot管理画面は下記のような表示となる。

![done](/images/posts/github-dependabot/finish.png)

下記の通りユーザー名は `dependabot-preview` `dependabot` へと変更されている。

![log](/images/posts/github-dependabot/commit-log.png)

新しいdependabotが作るPRはgithubの公式ロゴが入っている。

![log](/images/posts/github-dependabot/new-pr.png)

----

余談だが[同年に買収されたPull Panda](https://github.blog/2019-06-17-github-acquires-pull-panda/)のリマインダー機能もGitHubの公式機能に取り込まれている。

[Managing scheduled reminders for your team - GitHub Help](https://help.github.com/en/github/setting-up-and-managing-organizations-and-teams/managing-scheduled-reminders-for-your-team)

良い機能がこのように＜買収→公式機能＞となっていくのは良い流れですね。
