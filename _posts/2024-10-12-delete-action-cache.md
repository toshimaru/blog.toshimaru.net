---
layout: post
title: 不要なGitHub Actionsのキャッシュを削除するdelete-action-cacheを作った
image: https://raw.githubusercontent.com/toshimaru/delete-action-cache/refs/heads/main/img/delete-cache-action.png
description: 不要なGitHub Actionsのキャッシュを簡単に削除できるtoshimaru/delete-action-cacheというActionを作った。もしGitHub Actionsのキャッシュ容量制限にお困りの方はお試しあれ。
tags: github-actions
---

## TL;DR

不要なGitHub Actionsのキャッシュを簡単に削除できる[toshimaru/delete-action-cache](https://github.com/toshimaru/delete-action-cache)というActionを作った。

## GitHub Actions Cacheの容量制限

GitHub Actionsのキャッシュの保持容量は**10GBまで**という制限がある。

> GitHubは、7日間以上アクセスされていないキャッシュエントリを削除します。 保存できるキャッシュの数に制限はありませんが、リポジトリ内のすべてのキャッシュの合計サイズは制限されています (最大 10 GB)。

ref. [依存関係をキャッシュしてワークフローのスピードを上げる - GitHub Docs](https://docs.github.com/ja/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)

キャッシュが超過している・超過しそうだと下記のような警告が表示される。

> Least recently used caches will be automatically evicted to limit the total cache storage to 10 GB. [Learn more about cache usage.](https://docs.github.com/actions/using-workflows/caching-dependencies-to-speed-up-workflows#usage-limits-and-eviction-policy)

![cache超過の警告](/images/posts/delete-action-cache/cache-exceeded.png)

### キャッシュ容量制限で困るケース

比較的小さいプロジェクトであれば、この制限に引っかかることは少ないだろう。

しかし下記のようなケースで、この10GBという制限が足かせになることがある。

- 巨大な Monorepo を運用している
- [docker/build-push-action](https://github.com/docker/build-push-action)などを使って大きいdockerイメージをレイヤーキャッシュしている

10GBを超えると古いキャッシュから削除されていくため、**キャッシュスラッシングが発生してビルドが遅くなったり、場合によってはビルドが壊れる**こともある。

最近だとこちらの記事が話題になっていた：[やんないほうがいいかも、GitHub Actions の setup-xxx での依存キャッシュ保存 - 誰かの役に立てばいいブログ](https://ymmt.hatenablog.com/entry/2024/10/02/222243)

## 不要なキャッシュを削除するActionを作った

そういった問題を解決するため、**不要なGitHub Actionsのキャッシュを簡単に削除できるActionを作った**。

[toshimaru/delete-action-cache: Delete GitHub Actions Cache with ease.](https://github.com/toshimaru/delete-action-cache)

具体的には下記のようなことが簡単にできるようになる。

- Pull Request のマージ後、トピックブランチに紐づくキャッシュを削除
- `workflow_dispatch` イベントをトリガーに、特定ブランチのキャッシュを削除
- `schedule`イベントをトリガーに、特定ブランチのキャッシュを削除

## 工夫したところ

今回のActionを作るにあたり、下記のような工夫をした。

### 自動リリース

[r7kamura/bump-request](https://github.com/r7kamura/bump-request)を使い、`workflow_dispatch`からPRマージでリリースできるように自動化を行った。

リリース自動化に関してはbump-requestの作者が解説記事を上げているので、そちらを参照するとよい。

- [リリースの自動化](https://r7kamura.com/articles/2022-12-24-release-automation)
- [パッケージリリースの自動化](https://r7kamura.com/articles/2021-11-14-crate-auto-release)

### メジャーバージョンリリースの自動化

GitHub Actions には `v1.1`, `v1.2`, `v1.3`... のようなリリースを `v1` とメジャーバージョンに丸めて扱う慣習がある。

このへんのリリースは [actions/checkout](https://github.com/actions/checkout) でやっている半自動アプローチを採用した。手動で`workflow_dispatch`からリリース対象バージョンとタグを指定してリリースする方法である。

詳しくは下記の`.github/workflows/update-main-version.yml`ワークフローの内容を参照するとよい。

[checkout/.github/workflows/update-main-version.yml at main · actions/checkout](https://github.com/actions/checkout/blob/eef61447b9ff4aafe5dcd4e0bbf5d482be7e7871/.github/workflows/update-main-version.yml)

## おわり

もしGitHub Actionsのキャッシュ容量制限にお困りの方はお試しください。

## 余談

このActionを作るにあたり、`gh cache list`コマンドにオプションが欲しくなったので、付けておいた。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">`gh cache list` コマンドに ref オプションも足したぞい！ » Release GitHub CLI 2.45.0 · cli/cli <a href="https://t.co/4mtappf4UP">https://t.co/4mtappf4UP</a> <a href="https://t.co/lcJJw0AvjF">https://t.co/lcJJw0AvjF</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1764823978743673179?ref_src=twsrc%5Etfw">March 5, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 参考文献

- [GitHub Actions の Cache 管理(2023 年 1 月の場合)](https://zenn.dev/hankei6km/articles/manage-cache-in-github-actions-2023-01)
