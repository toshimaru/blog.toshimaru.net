---
layout: post
title: Gemfile.lock 内の特定バージョンgemをインストールする bgem コマンド作った
image: "/images/posts/bgem.png"
description: "Gemfile.lockに記述された特定バージョンのgemを簡単にインストールできる bgem コマンドを作った。 toshimaru/bundled_gems: Install gem specified in Gemfile.lock without bundle install."
tags: ruby gem oss
---

`Gemfile.lock`に記述された特定バージョンのgemを簡単にインストールできる bgem コマンドを作った。

（gem名としては [rubygems/rubygems](https://github.com/rubygems/rubygems) にインスパイアされて `bundled_gems` とした）

[toshimaru/bundled_gems: Install gem specified in Gemfile.lock without bundle install.](https://github.com/toshimaru/bundled_gems)

## モチベーション

もともとは、GitHub Actionに [cache機能](https://docs.github.com/en/actions/guides/caching-dependencies-to-speed-up-workflows)が来る前に作ったもの。

GitHub Action でCIしていた場合、cache機能がないと毎回 `bundle install`走らせる必要があり、巨大プロジェクトだとそこがCIにおけるコストになっていた。

また CI で rubocop だけを走らせている、みたいな場合、全てのライブラリのインストールは必要なく、rubocopと一部のライブラリさえあれば十分で、それ以外のライブラリのインストールはいわば無駄なインストールとなっている。

「だったら必要なライブラリだけインストールしてCI走らせりゃいいじゃん」というのが今回のgemの着想。

## 使い方

### インストール

```console
$ gem install bundled_gems
```

これで `bgem` コマンドが利用可能になる。

### Gemfile.lock 内のgemのインストール

```
$ bgem install gem_name
```

こうすることで `Gemfile.lock`内に記載されている `gem_name` のバージョンを読み取ってそれをインストールしてくれる（内部的には `gem install gem_name:version` を走らせている）。


例としては、`bgem install rubocop`とした場合、`Gemfile.lock`に記載されているバージョンの `rubocop` をインストールする。

## 課題

- installするgemの子となる依存gemのバージョンまでは解決してくれない点
  - このへん実装しようと思っていたら、先にGitHub公式の [actions/cache](https://github.com/actions/cache)が来てしまった次第。。。

## Special Thanks

`Gemfile.lock` のパースに関しては、[@ledsun](https://github.com/ledsun) さんにサンプルをいただきました[^1]。ありがとうございました。

[^1]: [ledsun/orgen](https://github.com/ledsun/orgen)
