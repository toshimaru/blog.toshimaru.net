---
layout: post
title: カバレッジ率計測サービスをCoverallsからCodeClimateに乗り換えてみた話
published: true
image: https://cloud.githubusercontent.com/assets/803398/6655997/d4f38dc4-cb5b-11e4-8663-86fad6baf1f3.png
description: 趣味で立ち上げているプロジェクトをこの度、CoverallsからCodeClimateに乗り換えてみたので、その知見の共有。自分がRails(ruby)プロジェクトをGithubに公開するとき、必ず使うSaaS群があって、例えばCIサービスであったりカバレッジ率の計測であったりコードの品質の計測であったりする。
tags: rspec ci
---

[趣味で立ち上げているプロジェクト](https://github.com/toshimaru/Rails-4-Twitter-Clone)をこの度、CoverallsからCodeClimateに乗り換えてみたので、その知見の共有。

## どんなSasSを使うか

自分がRails(ruby)プロジェクト(not private)をGithubに公開するとき、必ず使うSaaS群があって、例えばCIサービスであったりカバレッジ率の計測であったりコードの品質の計測であったりする。それをまとめると下記のようになる。

| サービス | 用途 |
| -------- | ------ |
| [Travis CI](https://travis-ci.org/repositories)  | CI回す |
| [Coveralls](https://coveralls.io/) | カバレッジ率を計測 |
| [Code Climate](https://codeclimate.com/) | コード品質を計測 |
| [Gemnasium](https://gemnasium.com/dashboard) | Gemのバージョンチェック |

**※ Publicなレポジトリであれば全て無料で使えます**

![badges](https://cloud.githubusercontent.com/assets/803398/6694382/558b6f5c-cd1d-11e4-96ff-1e67d5905e83.png)

**【図】SaaSの利用により表示できるようになるバッジ群**

## Coveralls → CodeClimate

今回その内の１つであるCoverallsをCodeClimateに移行してみたのですが、そのきっかけとしてはCircleCIでCodeClimateとのインテグレーションが推奨されていたから。

[Travis CI: Using Code Climate with Travis CI](http://docs.travis-ci.com/user/code-climate/)

コード品質とカバレッジ率は分散するよりも１つのサービスに集約されて閲覧できたほうが都合がよいしTravis CIのすすめるCodeClimateに統合してみることとした。

## 手順

### Set Code Climate token

CodeClimateのSettingsからテスト実行時のTokenがゲットできるのでそれを`.travis.yml`にセット。

{% highlight yaml %}
addons:
  code_climate:
    repo_token: adf08323...
{% endhighlight %}

### Intall CodeClimate reporter

codeclimate-test-reporter を`Gemfile`のtest groupに追加する。

{% highlight ruby %}
gem "codeclimate-test-reporter", require: false
{% endhighlight %}

CodeClimateのセットアップインストラクション通りに書くとこう。`spec/rails_helper.rb`に書きます。

{% highlight ruby %}
require "codeclimate-test-reporter"
CodeClimate::TestReporter.start
{% endhighlight %}

### Simplecovと同居させる

私の環境の場合、既にSimplecovが入っておりましたので、simplecovとインテグレーションさせる場合はちょっと異なるセットアップが必要になります。

{% highlight ruby %}
require 'simplecov'
require "codeclimate-test-reporter"
SimpleCov.formatter = SimpleCov::Formatter::MultiFormatter[
  SimpleCov::Formatter::HTMLFormatter,
  CodeClimate::TestReporter::Formatter
]
SimpleCov.start "rails"
{% endhighlight %}

このようにSimpleCovのformatterに`CodeClimate::TestReporter::Formatter`を入れてやれば :ok:

![codeclimate](https://cloud.githubusercontent.com/assets/803398/6694285/ad01584c-cd1c-11e4-9f29-1589821188da.png)

これでCode Climate上で品質・カバレッジ率が閲覧できるようになりました。

### 参考
[Using Code Climate's new test reporter together with Coveralls and SimpleCov's HTML Formatter](https://coderwall.com/p/vwhuqq/using-code-climate-s-new-test-reporter-together-with-coveralls-and-simplecov-s-html-formatter)
