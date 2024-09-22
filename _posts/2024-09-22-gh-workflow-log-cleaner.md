---
layout: post
title: GitHub CLI 拡張機能 gh-workflow-log-cleaner を作成した
image: "https://repository-images.githubusercontent.com/845294987/45f6dc68-5845-4ea2-b17c-1cdb4c011090"
description: "GitHub Actions のワークフローの実行ログを削除するGitHub CLI 拡張機能、gh-workflow-log-cleaner を作成したのでご紹介。toshimaru/gh-workflow-log-cleaner: Clean outdated workflow logs."
tags: github-actions
---

GitHub Actions のワークフローの実行ログを削除するGitHub CLI 拡張機能、[gh-workflow-log-cleaner](https://github.com/toshimaru/gh-workflow-log-cleaner?tab=readme-ov-file) を作成したのでご紹介。

[toshimaru/gh-workflow-log-cleaner: Clean outdated workflow logs.](https://github.com/toshimaru/gh-workflow-log-cleaner?tab=readme-ov-file)

## モチベーション

古いGitHub Actionsのワークフロー実行ログは残り続ける。現役バリバリで利用しているワークフローならいいが、既に使用していないワークフローの場合、このログがノイズになることがある。

GUIでポチポチ実行ログを削除することは可能だが、まとめて削除する方法は提供されていない。代わりに公式ドキュメントでは、[Bashプログラムで削除する方法が紹介されている](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/monitoring-workflows/using-workflow-run-logs#deleting-logs-programmatically)が、やや面倒でカジュアルには実行しにくい。

ということで、GitHub CLI 拡張機能化しカジュアルに実行できるようにしてみた。

## 拡張機能の作成方法

GitHub CLI の拡張機能は、大きく下記の２つの方法がある。

- Bash 方式
- Go Precompile方式

ref. [Creating GitHub CLI extensions - GitHub Docs](https://docs.github.com/en/github-cli/github-cli/creating-github-cli-extensions)

今回はBash方式で作成した。下記のコマンドで拡張機能をイニシャルセットアップできる。

```console
$ gh extension create EXTENSION-NAME
```

## 工夫した点

- Bashのテストを書くために [bats-core/bats-core](https://github.com/bats-core/bats-core) を使用した
  - see also. [2024-08-30 BATS(Bash Automated Testing System)でBashのテスト \| TTIL](https://til.toshimaru.net/2024-08-30)
- optionをパースするのを少し頑張った(`--limit`オプション)
- [GitHub cli](https://github.com/cli/cli)と同じような出力になるように一部を bold に echo するなどした

## 注意点

- 拡張機能のリポジトリ名は `gh-` で始まる必要がある
- 拡張機能を`gh extension search`で検索機能にするためには、[gh-extension](https://github.com/topics/gh-extension)というトピックを設定する必要がある
