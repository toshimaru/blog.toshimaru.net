---
layout: post
title: Amazon OpsWorksでRailsアプリを簡単Chefプロビジョニング
published: true
image: /images/posts/opsworks/eyecatch.png
description: Rails4.2.0のアプリケーションをChefでプロビジョニングできるOpsWorksにデプロイしてみます。
tags: opsworks rails
---

本記事は[Chef Advent Calendar 2014](http://qiita.com/advent-calendar/2014/chef)の21日目の記事です。

OpsWorksとは？
----
公式サイトの説明は下記です。

> AWS OpsWorks は、すべての種類およびサイズのアプリケーションを容易にデプロイおよび運用できるクラウドアプリケーション管理サービスです。パッケージのインストール、ソフトウェア設定およびストレージなどのリソースを含む、各コンポーネントのアプリケーションのアーキテクチャおよび仕様を定義できます。
>
> [AWS OpsWorks](http://aws.amazon.com/jp/opsworks/)

ポイントは下記です。

* Chefでサーバーをプロビジョニング・デプロイできる
* スタック＞レイヤー＞Appという概念でシステムを構成
* インスタンスをタイムベースorロードベースでスケールアウトできる
* OpsWorksで使われているレシピは[githubで公開](https://github.com/aws/opsworks-cookbooks)されている
* 自らのCustom Chefレシピを追加することも可能

料金
----
OpsWorksの使用自体にかかる料金は**＜0円＞**です。OpsWorks上で使用したAWSリソースの料金（ロードバランサ、EC2インスタンス、RDS等）のみがかかってきます。

RailsをOpsWorksにデプロイしてみよう
---
OpsWorksはとくにRailsアプリケーションとの相性が良く、今回はRails4.2.0のアプリケーションをOpsWorksにデプロイしてみようと思います。

今回デプロイするRailsアプリケーションのコードは下記になります。

<https://github.com/toshimaru/opsworks-rails>

デプロイ手順
---

### スタックの追加

まずはAWS ConsoleからOpsWorksにいきAdd Stackしましょう。RegionとかVPCとかIAMとかは適宜設定してね。

![](/images/posts/opsworks/add_stack.png)

こんなのがStackのトップ画面。

![](/images/posts/opsworks/top.png)

### レイヤーの定義

![](/images/posts/opsworks/layer.png)

Layer TypeはRails App、Ruby versionは2.1、nginx+unicornを選択する

![](/images/posts/opsworks/add_layer.png)

追加されました。

![](/images/posts/opsworks/layer_done.png)

### レシピ

RecipesでOpsWorksにどんなレシピが設定されているかがわかります。レシピ名がGithubへのリンクになっており、どんなレシピが書かれているかを確認できます。

![](/images/posts/opsworks/recipes.png)

今回はこのままでOK.

### インスタンスの追加

では次にAppインスタンスを追加。t1microインスタンスで。

![](/images/posts/opsworks/add_instance.png)

AddInstanceするとステータスがStoppedなのでstartで起動します。

![](/images/posts/opsworks/instance_stopped.png)

10分くらいでセットアップが完了します。Statusがonlineでグリーンになれば準備OK.

![](/images/posts/opsworks/instance_online.png)

### Appの設定

次にデプロイするAppの設定を追加していきます。

![](/images/posts/opsworks/apps.png)

こんな感じでAppを設定。

* Type: RoR
* DataSource: 今回は特にないのでNoneで
* Applicationソース: Githubから持ってきたいのでGithubのレポジトリURLを指定

![](/images/posts/opsworks/add_apps.png)

`SECRET_KEY_BASE`(Rails4.2の`secrets.yml`で必要になる)もあわせてセットしましょう。

![](/images/posts/opsworks/add_envvar.png)

DeploymentsでDeploy Appしてみよう。

![](/images/posts/opsworks/deploy_app.png)

Appは先ほど設定したApp、CommandはDeployを指定してDeploy App!（マイグレーションが必要であればここでMigration ON）

![](/images/posts/opsworks/deploy_app2.png)

SuccessすればOK.

![](/images/posts/opsworks/deploy_app3.png)

## 幾つかのハマりポイント

### Gemfile

下記のGemが必要になるのでコメントアウトされていることを確認すること。

    gem 'therubyracer', platforms: :ruby
    gem 'unicorn'

### database.yml

RDSを設定していれば自動的に設定されるのですが、今回の場合設定していないので別途手で`database.yml`を作りました。

    [root@rails-app1 current]# cat config/database.yml
    default: &default
      adapter: sqlite3
      pool: 5
      timeout: 5000

    production:
      <<: *default
      database: db/production.sqlite3

### CSSが適応されていない問題

「アレ、なんかCSSが効いていないっぽい！？」

![](/images/posts/opsworks/before_css.png)

これは`asset:precompile`が走っていないため。

> rake asset:precompile というタスクを実行する必要がありますが、OpsWorksのRailsアプリケーションのデフォルトのデプロイ処理ではこのタスクを実行してくれません。
>
> [OpsWorksでRailsをデプロイする際にasset:precompileを実施する方法](http://interu.hatenablog.com/entry/2013/08/01/214258)

下記を`deploy/before_migrate.rb`に設定する。

{% highlight ruby %}
Chef::Log.info("Running deploy/before_migrate.rb")
env = node[:deploy][:rails_opsworks][:rails_env]
current_release = release_path

execute "rake assets:precompile" do
  cwd current_release
  command "bundle exec rake assets:precompile"
  environment "RAILS_ENV" => env
end
{% endhighlight %}

これでデプロイ。

![](/images/posts/opsworks/after_css.png)

OK.

### デプロイされるディレクトリ

`/srv/www/rails_opsworks/current`に最新の状態がデプロイされます。

### ログディレクトリ

`/var/lib/aws/opsworks/chef` Chefのログ、OpsWorksの設定JSONが格納されています。
