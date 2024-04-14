---
layout: post
title: Rails on Docker 環境での SystemSpec 環境構築
image: "/images/posts/systemspec/og.jpg"
description: "Rails on Docker な環境上に SystemSpec(System Test + RSpec) を導入しました。 環境 今回SystemSpecを導入したのは下記のような環境です。私のSystemSpec、遅すぎ…？ 実は SystemSpec を導入しようと試みたのは今回で二回目です。一回目は SystemTest が Rails の機能の一つとしてリリースされて間もない頃に試したのですが、テスト全体にかかる時間が劇的に遅くなったため、導入を断念したという経緯があります。しかしこれは結果からいうと設定が悪かったのでした。"
toc: true
tags: rspec rails docker
---

Rails on Docker な環境上に SystemSpec(System Test + RSpec) を導入しました。

## 環境

今回SystemSpecを導入したのは下記のような環境です。

* プロジェクト: [RailsTwitterClone](https://github.com/toshimaru/RailsTwitterClone/)
* docker-compose
* Ruby 2.6
* chromium-driver
* gem
  * rails (5.2)
  * rspec-rails
  * selenium-webdriver
  * capybara

## 対応Pull Request

[Re-try System Spec by toshimaru · Pull Request #506 · toshimaru/RailsTwitterClone](https://github.com/toshimaru/RailsTwitterClone/pull/506/files)

## 私のSystemSpec、遅すぎ...？

実は SystemSpec を導入しようと試みたのは今回で二回目です。一回目は SystemTest が Rails の機能の一つとしてリリースされて間もない頃に試したのですが、テスト全体にかかる時間が劇的に遅くなったため、導入を断念したという経緯があります。

当時のPull Requestがこちら: [Try System Spec by toshimaru · Pull Request #216 · toshimaru/RailsTwitterClone](https://github.com/toshimaru/RailsTwitterClone/pull/216)

> Before
> 
> ```
> Finished in 15.74 seconds (files took 7.65 seconds to load)
> 152 examples, 0 failures
> ```
> 
> After
> 
> ```
> Finished in 58.46 seconds (files took 7.64 seconds to load)
> 152 examples, 3 failures
> ```

しかしこれは結果からいうと設定が悪かったのでした。下記のように system テストを Headless Chrome で走るように設定していましたが、これだとすべての System テストが Headless Chrome モードで起動してしまい、結果的に遅くなります。

```rb
RSpec.configure do |config|
  ...
  config.before(:each, type: :system) do
    driven_by :selenium_chrome_headless
  end
end
```

下記のようにJSを起動させる必要のない System テストは従来通りの`rack_test`、`js: true`なテストは`selenium_chrome_headless`に設定してやればテスト全体が高速に実行可能になりました。

```rb
RSpec.configure do |config|
  ...
  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, type: :system, js: true) do
    driven_by :selenium_chrome_headless
  end
end
```

## Dockerfile

今回利用した `Dockerfile` は Ruby 2.6 のベースイメージに `chromium-driver` をインストールしたコンテナとなります。

```dockerfile
FROM ruby:2.6

RUN apt-get update -qq && apt-get install -y nodejs chromium-driver 
```

### Chrome failed to start: exited abnormally

しかし、上述の環境において`rspec`を実行すると下記のようなエラーが発生します。

```
Failure/Error: Unable to infer file and line number from backtrace

  Selenium::WebDriver::Error::UnknownError:
      unknown error: Chrome failed to start: exited abnormally
      (unknown error: DevToolsActivePort file doesn't exist)
      (The process started from chrome location /usr/bin/chromium is no longer running, so ChromeDriver is assuming that Chrome has crashed.)
```

このエラーは Chrome が`sandbox`モードで起動していることに起因します。下記のような`no-sandbox`オプション付きの Headless Chrome を Capybara に driver として登録してやることで回避します。

```rb
Capybara.register_driver :headless_chrome do |app|
  browser_options = ::Selenium::WebDriver::Chrome::Options.new.tap do |opts|
    opts.args << "--headless"
    opts.args << "--disable-gpu"
    opts.args << "--no-sandbox"
  end
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: browser_options)
end
```

こうして登録した`headless_chrome`をSystemTestに対して適応させてやればOKです。

```rb
RSpec.configure do |config|
  ...
  config.before(:each, type: :system, js: true) do
    driven_by :headless_chrome
  end
end
```

これできちんとDocker上でSystemSpecが通るようになりました。

```console
$ docker-compose run web rspec

Randomized with seed 30150
............................................................................................................Capybara starting Puma...
* Version 4.1.1 , codename: Fourth and One
* Min threads: 0, max threads: 4
* Listening on tcp://127.0.0.1:38789
...............................................

Finished in 19.87 seconds (files took 8.8 seconds to load)
155 examples, 0 failures
```

## 公式ではno-sandboxをデフォルトにはしてくれない？

余談ですが、Capybara本体で登録されている`selenium_chrome_headless`に`no-sandbox`オプションを付与する変更をPRしてみましたが、下記の通りRejectされてしまいました。

[Add `no-sandbox` option for selenium_chrome_headless by toshimaru · Pull Request #2241 · teamcapybara/capybara](https://github.com/teamcapybara/capybara/pull/2241)

### Securityを担保するためのsandbox

sandboxはセキュリティを高めるための環境なので基本的には **デフォルトで no-sandbox にするべきではない** という判断のようです。

> Sandbox leverages the OS-provided security to allow code execution that cannot make persistent changes to the computer or access information that is confidential. 

via. [Sandbox](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md)

## 参考

- [Rails + Selenium + DockerでSystemSpecの環境構築 - Qiita](https://qiita.com/ngron/items/f61b8635b4d67f666d75)
- [Google Chrome サンドボックスで実現するセキュリティ、Windowsの機能に依存 \| マイナビニュース](https://news.mynavi.jp/article/20081009-a027/)
