---
layout: post
title: CircleCIのベースイメージを次世代イメージ cimg に移行する
image: "/images/posts/cimg.png"
description: "2020年にCircleCIの次世代イメージ・cimg が登場しました。個人のRuby on Railsプロジェクトで、従来のcircleci/rubyから次世代イメージであるところのcimg/rubyに移行してみたので紹介します。"
tags: circleci ci
toc: true
---

2020年にCircleCIの次世代イメージ・cimg が登場しました[^1]。

個人のRuby on Railsプロジェクトで、従来のcircleci/rubyから次世代イメージであるところの[cimg/rubyに移行](https://github.com/toshimaru/RailsTwitterClone/pull/920)してみたので紹介します。

## ベースイメージの変更

`circleci/ruby` から `cimg/ruby` へ変更します。

```diff
 executors:
   default:
     working_directory: ~/app
     docker:
+      - image: circleci/ruby:2.7-node-browsers
-      - image: cimg/ruby:2.7-browsers
```

## CircleCI 公式 Orb の利用

今回の変更とあわせて、下記２つのCircleCI公式Orbも導入しました。

- [CircleCI Developer Hub - circleci/ruby](https://circleci.com/developer/orbs/orb/circleci/ruby)
- [CircleCI Developer Hub - circleci/browser-tools](https://circleci.com/developer/orbs/orb/circleci/browser-tools)

```yaml
orbs:
  ruby: circleci/ruby@1.1.2
  browser-tools: circleci/browser-tools@1.1.3
```

## RSpec の実行

上述のOrbを有効活用することで

1. bundle Install
2. chromedriverインストール
3. rspecの実行

のstepを下記のようにシンプルに記述することが可能になります。

```yaml
rspec:
  executor: default
  steps:
    - checkout
    - ruby/install-deps
    - browser-tools/install-chrome
    - browser-tools/install-chromedriver
    - run: bin/rails db:schema:load --trace
    - ruby/rspec-test
```

## rubocop の実行

rubocop の実行も同様に `circleci/ruby` Orbに組み込まれており、簡単に実行できます。

```yaml
rubocop:
  executor: default
  steps:
    - checkout
    - ruby/install-deps
    - ruby/rubocop-check
```


## 最終形

実際に `circleci/ruby` から `cimg/ruby` へと移行した Pull Request の全体像としては下記のようになります。

[Migrate CircleCI image from circleci/ruby to cimg/ruby by toshimaru · Pull Request](https://github.com/toshimaru/RailsTwitterClone/pull/920)

## 参考リンク

- 紹介したCircleCI Orbs
  - [CircleCI Developer Hub - circleci/ruby](https://circleci.com/developer/orbs/orb/circleci/ruby)
  - [CircleCI Developer Hub - circleci/browser-tools](https://circleci.com/developer/orbs/orb/circleci/browser-tools)
- [cimg/ruby - CircleCI](https://circleci.com/developer/images/image/cimg/ruby)
- [circleci-demo-ruby-rails/config.yml at master · CircleCI-Public/circleci-demo-ruby-rails](https://github.com/CircleCI-Public/circleci-demo-ruby-rails/blob/master/.circleci/config.yml)

[^1]: [次世代コンビニエンス イメージをリリース: より小さく、速く、確定的](https://circleci.com/ja/blog/announcing-our-next-generation-convenience-images-smaller-faster-more-deterministic/)
