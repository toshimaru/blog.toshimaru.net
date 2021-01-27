---
layout: post
title: Dependabot で go modules の自動アップデートをする（go mod tidy付き）
description: "Dependabot が GitHub の公式機能の一部として利用可能になりました。ただ go modules のアップデートに関しては、アップデート時に go mod tidy を実行してくれないという問題がありました。代替として、Renovateという go mod tidy してくれるアップデーターを使っていました。しかし、この度 Dependabot が go mod tidy も実行してくれるようになっていました。"
tags: go
---

Dependabot が GitHub の公式機能の一部として利用可能になりました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">blogged. | DependabotをGitHub公式Dependabotに移行させた - Hack Your Design! <a href="https://t.co/6Mb0XDSaSC">https://t.co/6Mb0XDSaSC</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1273437750499270659?ref_src=twsrc%5Etfw">June 18, 2020</a></blockquote>

ただ go modules のアップデートに関しては、アップデート時に `go mod tidy` を実行してくれないという問題がありました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">renovate ならオプションでやってくれるみたいなのでGoプロジェクトはこっちに乗り換えるかー<a href="https://t.co/qVbkb5UXlA">https://t.co/qVbkb5UXlA</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1219800597982932992?ref_src=twsrc%5Etfw">January 22, 2020</a></blockquote>

代替として、[Renovate](https://github.com/renovatebot/renovate)という `go mod tidy` してくれるアップデーターを使っていました。

しかし、この度 Dependabot が `go mod tidy` も実行してくれるようになっていました。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Dependabot: `go mod tidy` and `vendor` support <a href="https://t.co/x9Wwj0yuMG">https://t.co/x9Wwj0yuMG</a></p>&mdash; GitHub Changelog (@GHchangelog) <a href="https://twitter.com/GHchangelog/status/1318223496569290752?ref_src=twsrc%5Etfw">October 19, 2020</a></blockquote>

## Dependabot Go Modules設定

`.github/dependabot.yml` ファイルを作って、下記のように記述すればOK。

```yml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "gomod"
    directory: "/" # Location of package manifests
    schedule:
      interval: "weekly"
```

下記のPRの通り、きちんと `go mod tidy` をやってくれています。

[github.com/toshimaru/nyan/pull/104](https://github.com/toshimaru/nyan/pull/104)

## 参考

- [Dependabot: `go mod tidy` and `vendor` support - GitHub Changelog](https://github.blog/changelog/2020-10-19-dependabot-go-mod-tidy-and-vendor-support/)
- [Modules · golang/go Wiki](https://github.com/golang/go/wiki/Modules)
