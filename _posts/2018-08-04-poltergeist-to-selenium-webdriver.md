---
layout: post
title: "Rails E2Eテストで poltergeist から Headless Chrome へと乗り換える"
description: "RailsのCapybaraを使ったE2Eテスト(feature spec)をこの度、poltergeistからHeadless Chromeに乗り換えてみたのでそのときのメモ。 今回対応したPull Requestしてはこちら。 https://github.com/toshimaru/RailsTwitterClone/pull/211 思ったよりも差分はコンパクトにまとまった。まずはpoltergeist gemの代わりに、selenium-webdriverをインストール。次にCapybara.javascript_driverを:poltergeistから:selenium_chrome_headlessに変更。"
image: "/images/posts/chromedriver.jpg"
tags: rails rspec chrome
toc: true
modified_date: 2019-09-17
---

RailsのCapybaraを使ったE2Eテスト(feature spec)をこの度、[poltergeist](https://github.com/teampoltergeist/poltergeist)から[Headless Chrome](https://chromium.googlesource.com/chromium/src/+/master/headless/README.md)に乗り換えてみたのでそのときのメモ。

## 対応 Pull Request

今回対応したPull Requestはこちら。

[Use headless Chrome instead of PhantomJS(poltergeist) by toshimaru · Pull Request #211 · toshimaru/RailsTwitterClone · GitHub](https://github.com/toshimaru/RailsTwitterClone/pull/211)

思ったよりも差分はコンパクトにまとまりました。

## Install selenium-webdriver

まずは`poltergeist` gemの代わりに、`selenium-webdriver`をインストール。

```diff
-  gem "poltergeist"
+  gem "selenium-webdriver"
```

## Change Capybara.javascript_driver

次に`Capybara.javascript_driver`を`:poltergeist`から`:selenium_chrome_headless`に変更します。

```diff
- require "capybara/poltergeist"
- Capybara.javascript_driver = :poltergeist
+ require "selenium-webdriver"
+ Capybara.javascript_driver = :selenium_chrome_headless
```

ちなみに`:selenium_chrome_headless`の設定は下記の変更の中でcapybara内に取り込まれています。

```rb
Capybara.register_driver :selenium_chrome_headless do |app|
  browser_options = ::Selenium::WebDriver::Chrome::Options.new
  browser_options.args << '--headless'
  browser_options.args << '--disable-gpu'
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end
```

via. [add default selenium chrome driver registrations · teamcapybara/capybara@0275eab · GitHub](https://github.com/teamcapybara/capybara/commit/0275eab42c610cd1ccde7947b051d0b00857b9ce)

## Install chromedriver

### On MacOS

`chromedriver` が必要になってくるが、Macの場合はbrewで入れちゃうのが一番ラクです。

```console
$ brew cask install chromedriver
Updating Homebrew...
==> Auto-updated Homebrew!
Updated 1 tap (homebrew/cask).
No changes to formulae.

==> Satisfying dependencies
==> Downloading https://chromedriver.storage.googleapis.com/2.41/chromedriver_mac64.zip
######################################################################## 100.0%
==> Verifying checksum for Cask chromedriver
==> Installing Cask chromedriver
==> Extracting nested container chromedriver
==> Linking Binary 'chromedriver' to '/usr/local/bin/chromedriver'.
🍺  chromedriver was successfully installed!
``` 

**注意事項**

- `brew install chromedriver`ではinstallできないので注意（`brew cask`経由にすること）
- `chromedriver-helper` gem が入っているとうまく動かない場合があるので注意

### On CircleCI

CircleCI上では、`ruby:x.x-node-browsers`のCircleCI公式Ruby Dokcer Imageを使っていればきちんと動作しました。

```yaml
  docker:
    - image: circleci/ruby:2.5-node-browsers
```

上記の設定の場合、Ruby2.5のnode-browsersバージョンをベースイメージとして使用しています。

### On TravisCI

これが今回の対応で一番ハマった設定でした。いろいろ試しましたが下記のエラーがなかなか解決できませんでした。

```
Failures:

  1) Authentication authorization screenshot
     Failure/Error: before { visit signin_path }

     Selenium::WebDriver::Error::WebDriverError:
        Unable to find Mozilla geckodriver. Please download the server from https://github.com/mozilla/geckodriver/releases and place it somewhere on your PATH. More info at https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver.
     # ./spec/features/authentication_pages_spec.rb:9:in `block (3 levels) in <top (required)>'
```

~~本当は`sudo: false`の設定で動かしたかったのですがそれだと上手くいかなかったので`sudo`で起動させて`chromium-chromedriver`をテスト前にInstallしてパスを通すという方法でテストを通しました。~~

```yaml
sudo: required
language: ruby
before_install:
  - sudo apt-get install -y chromium-chromedriver
  - ln -s /usr/lib/chromium-browser/chromedriver ~/bin/chromedriver
```

~~(もう少しスマートなやり方をご存知の方は教えていただけると嬉しいです🙏)~~

**追記（2019年9月17日）**

`sudo` 無しでも下記のような設定でいけました。

```yml
dist: bionic
addons:
  chrome: stable
  apt:
    packages:
      - chromium-chromedriver
```

参考Pull Request: [No sudo on TravisCI by toshimaru · Pull Request #524 · toshimaru/RailsTwitterClone](https://github.com/toshimaru/RailsTwitterClone/pull/524/files)

## 参考リンク

- [PhantomJS + Poltergeist を Selenium + Headless Chrome で置き換える (1) Rails + Capybara による feature spec 編 - valid,invalid](https://ohbarye.hatenablog.jp/entry/2018/03/10/232300)
- [RSpec の feature spec でヘッドレス Chrome を使う - Speee DEVELOPER BLOG](https://tech.speee.jp/entry/2017/06/15/135636)
- [[Rails]雑にSystem TestでHeadless Chromeを使う \| 日々雑記](http://y-yagi.tumblr.com/post/166831012790/rails%E9%9B%91%E3%81%ABsystem-test%E3%81%A7headless-chrome%E3%82%92%E4%BD%BF%E3%81%86)
