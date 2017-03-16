---
title: Ruby on Rails を Google App Engine 上で動かしてみる
published: true
image: /images/posts/ruby-gae/ruby.png
description: Ruby on RailsをGoogle App Engine 上で動かしてみました。手順はGoogle公式ドキュメントの「How to run Hello World - Ruby — Google Cloud Platform」を参考に進めていきます。
tags: google_app_engine rails docker
---

[［速報］Google App EngineがRubyとNode.jsのサポートを発表。GCP Next 2016 － Publickey](http://www.publickey1.jp/blog/16/google_app_enginerubynodejsgcp_next_2016.html)

ということでRuby on RailsをGoogle App Engine 上で動かしてみました。手順は公式ドキュメント・ [How to run Hello World - Ruby — Google Cloud Platform](https://cloud.google.com/ruby/getting-started/hello-world) を参考に進めていきます。

## 前提

* gcloud コマンドが使えること（[Google Cloud SDK](https://cloud.google.com/sdk/)に含まれています）
* Google Cloud Platformにログイン済みであり、今回のデプロイ先となるプロジェクトが作成済みであること

## 手順

### プロジェクトセットアップ

[GoogleCloudPlatform/getting-started-ruby](https://github.com/GoogleCloudPlatform/getting-started-ruby) のHello World Appを今回は動かしますのでまずはプロジェクトをクローンします。

    $ git clone https://github.com/GoogleCloudPlatform/getting-started-ruby.git
    $ cd 1-hello-world

まずは通常のRuby on Railsアプリと同じく`bundle install`してRailsサーバーを立てましょう。

    $ bundle install
    $ rails server

これで`localhost:3000`でデプロイされるHello World Appが見れました。

### gcloud セットアップ

gcloud を使って行きますがいくつか事前の設定が必要あります。

    # 初期化
    $ gcloud init

    # Googleログインする
    $ gcloud auth login

    # 今回作成したプロジェクトIDをセット
    $ gcloud config set project {your-project-id}

これでapp deployコマンドが動作しました。

    $ gcloud preview app deploy

デプロイされたあとは AppEngine Console のバージョンの一覧に出てきます。

![deploy-version](/images/posts/ruby-gae/deploy-version.png)

### デプロイ時のログ

    Beginning deployment...
    If this is your first deployment, this may take a while...done.

    Using Ruby 2.2.4 as requested in the .ruby-version file
    Verifying that Managed VMs are enabled and ready.
    Building and pushing image for module [default]
    Started cloud build [789f0d61-dc0a-4994-8292-02a5ff9f65de].
    To see logs in the Cloud Console: https://console.developers.google.com/logs?project=your-project-id&service=cloudbuild.googleapis.com&key1=789f0d61-dc0a-4994-8292-02a5ff9f65de&logName=projects/your-project-id/logs/cloudbuild
    --------------------------------- REMOTE BUILD OUTPUT ----------------------------------
    starting build "789f0d61-dc0a-4994-8292-02a5ff9f65de"

    FETCHSOURCE
    Fetching storage object: gs://staging.your-project-id.appspot.com/your-project-id.default.20160326t100408#1458954328349000
    Copying gs://staging.your-project-id.appspot.com/your-project-id.default.20160326t100408#1458954328349000...
    Downloading file:///tmp/source-archive.tgz:                      13.32 KiB/13.32 KiB
    FETCHBUILDER
    Using default tag: latest
    latest: Pulling from cloud-builders/dockerizer
    bf61d14f65db: Pulling fs layer
    3ea15286bc1a: Pulling fs layer
    515285067dbf: Pulling fs layer
    5e89b839ecfa: Pulling fs layer
    e63e5abf57a3: Pulling fs layer
    ec858f8c1767: Pulling fs layer
    51d0afdd2ff8: Pulling fs layer
    415319aa0c90: Pulling fs layer
    51d0afdd2ff8: Verifying Checksum
    51d0afdd2ff8: Download complete
    415319aa0c90: Verifying Checksum
    415319aa0c90: Download complete
    5e89b839ecfa: Verifying Checksum
    5e89b839ecfa: Download complete
    3ea15286bc1a: Verifying Checksum
    3ea15286bc1a: Download complete
    515285067dbf: Verifying Checksum
    515285067dbf: Download complete
    e63e5abf57a3: Verifying Checksum
    e63e5abf57a3: Download complete
    ec858f8c1767: Verifying Checksum
    ec858f8c1767: Download complete
    bf61d14f65db: Verifying Checksum
    bf61d14f65db: Download complete
    bf61d14f65db: Pull complete
    3ea15286bc1a: Pull complete
    515285067dbf: Pull complete
    5e89b839ecfa: Pull complete
    e63e5abf57a3: Pull complete
    ec858f8c1767: Pull complete
    51d0afdd2ff8: Pull complete
    415319aa0c90: Pull complete
    Digest: sha256:b80a8cc7ed504307717c7530e795b0c2dea1ff99957806e0785ae831309084ae
    Status: Downloaded newer image for gcr.io/cloud-builders/dockerizer:latest
    BUILD
    Client:
     Version:      1.9.1
     API version:  1.21
     Go version:   go1.4.3
     Git commit:   a34a1d5
     Built:        Fri Nov 20 17:56:04 UTC 2015
     OS/Arch:      linux/amd64

    Server:
     Version:      1.9.1
     API version:  1.21
     Go version:   go1.4.2
     Git commit:   a34a1d5
     Built:        Fri Nov 20 13:12:04 UTC 2015
     OS/Arch:      linux/amd64
    Sending build context to Docker daemon 90.62 kB
    Step 1 : FROM gcr.io/google_appengine/ruby
     ---> 3e6d0d6d0575
    Step 2 : RUN cd /rbenv/plugins/ruby-build &&     git pull &&     rbenv install -s 2.2.4 &&     rbenv global 2.2.4 &&     gem install -q --no-rdoc --no-ri bundler --version 1.11.2 &&     gem install -q --no-rdoc --no-ri foreman --version 0.78.0
     ---> Running in 451faee44d37
    Already up-to-date.
    Successfully installed bundler-1.11.2
    1 gem installed
    Successfully installed foreman-0.78.0
    1 gem installed
     ---> 5da2526068cb
    Removing intermediate container 451faee44d37
    Step 3 : ENV RBENV_VERSION 2.2.4
     ---> Running in 1e6f8d74782b
     ---> 416110028d7d
    Removing intermediate container 1e6f8d74782b
    Step 4 : COPY Gemfile Gemfile.lock /app/
     ---> 0ab134d54690
    Removing intermediate container 7337fb40c45b
    Step 5 : RUN bundle install && rbenv rehash
     ---> Running in 0c258ea5a1be
    Don't run Bundler as root. Bundler can ask for sudo if it is needed, and
    installing your bundle as root will break this application for all non-root
    users on this machine.
    Fetching gem metadata from https://rubygems.org/...........
    Fetching version metadata from https://rubygems.org/...
    Fetching dependency metadata from https://rubygems.org/..
    Using rake 10.4.2
    Installing i18n 0.7.0
    Installing json 1.8.3 with native extensions
    Installing minitest 5.7.0
    Installing thread_safe 0.3.5
    Installing builder 3.2.2
    Installing erubis 2.7.0
    Installing mini_portile 0.6.2
    Installing rack 1.6.4
    Installing mime-types 2.6.1
    Installing arel 6.0.0
    Installing cliver 0.3.2
    Installing diff-lcs 1.2.5
    Installing multi_json 1.11.2
    Installing websocket-extensions 0.1.2
    Using bundler 1.11.2
    Using thor 0.19.1
    Installing rspec-support 3.3.0
    Installing tzinfo 1.2.2
    Installing nokogiri 1.6.6.2 with native extensions
    Installing rack-test 0.6.3
    Installing sprockets 3.2.0
    Installing mail 2.6.3
    Installing websocket-driver 0.6.3 with native extensions
    Installing rspec-core 3.3.1
    Installing rspec-expectations 3.3.0
    Installing rspec-mocks 3.3.1
    Installing activesupport 4.2.2
    Installing tzinfo-data 1.2015.6
    Installing loofah 2.0.2
    Installing xpath 2.0.0
    Installing rails-deprecated_sanitizer 1.0.3
    Installing globalid 0.3.5
    Installing activemodel 4.2.2
    Installing rails-html-sanitizer 1.0.2
    Installing capybara 2.4.4
    Installing rails-dom-testing 1.0.6
    Installing activejob 4.2.2
    Installing activerecord 4.2.2
    Installing poltergeist 1.8.1
    Installing actionview 4.2.2
    Installing actionpack 4.2.2
    Installing actionmailer 4.2.2
    Installing railties 4.2.2
    Installing sprockets-rails 2.3.2
    Installing rspec-rails 3.3.2
    Installing rails 4.2.2
    Bundle complete! 6 Gemfile dependencies, 47 gems now installed.
    Use `bundle show [gemname]` to see where a bundled gem is installed.
     ---> 9fde5c5bec0c
    Removing intermediate container 0c258ea5a1be
    Step 6 : COPY . /app/
     ---> 05eb1e2b6b90
    Removing intermediate container e885ebd8251c
    Step 7 : ENTRYPOINT bundle exec rackup -p 8080 -E production config.ru
     ---> Running in 1b616e80361d
     ---> 0695731649da
    Removing intermediate container 1b616e80361d
    Successfully built 0695731649da
    PUSH
    The push refers to a repository [appengine.gcr.io/gcloud/your-project-id.default.20160326t100408] (len: 1)
    Sending image list
    Pushing repository appengine.gcr.io/gcloud/your-project-id.default.20160326t100408 (1 tags)
    Image 3bc7cdb36864 already pushed, skipping
    Image 4bfc20f0ed66 already pushed, skipping
    Image ff52712bb308 already pushed, skipping
    Image 5880acd9ad50 already pushed, skipping
    Image 096d9403d234 already pushed, skipping
    Image 956eb41cd003 already pushed, skipping
    Image 01eaa1a367c4 already pushed, skipping
    Image 943d779f0853 already pushed, skipping
    Image 3cc9009b6572 already pushed, skipping
    Image b19c39f03dbb already pushed, skipping
    Image ca6428f24e68 already pushed, skipping
    Image 7b90390ae965 already pushed, skipping
    Image cb10a2abbe53 already pushed, skipping
    Image 31bee42bdd8a already pushed, skipping
    Image a04427afe410 already pushed, skipping
    Image 8f70e181ae11 already pushed, skipping
    Image 72b1839f75eb already pushed, skipping
    Image 0ea63ea23bf2 already pushed, skipping
    Image 86100fe6deed already pushed, skipping
    Image 45ab69b78373 already pushed, skipping
    Image 32066980c48e already pushed, skipping
    Image fc85fe8bcbac already pushed, skipping
    Image 76b185852e95 already pushed, skipping
    Image eec69d4fcd9a already pushed, skipping
    Image 17402d207077 already pushed, skipping
    Image 27bea8c63202 already pushed, skipping
    Image 3e6d0d6d0575 already pushed, skipping
    5da2526068cb: Pushing
    5da2526068cb: Image successfully pushed
    416110028d7d: Pushing
    416110028d7d: Image successfully pushed
    0ab134d54690: Pushing
    0ab134d54690: Image successfully pushed
    9fde5c5bec0c: Pushing
    9fde5c5bec0c: Image successfully pushed
    05eb1e2b6b90: Pushing
    05eb1e2b6b90: Image successfully pushed
    0695731649da: Pushing
    0695731649da: Image successfully pushed
    Pushing tag for rev [0695731649da] on {https://appengine.gcr.io/v1/repositories/gcloud/your-project-id.default.20160326t100408/tags/latest}
    DONE
    ----------------------------------------------------------------------------------------

    Updating module [default]...done.
    Deployed module [default] to [https://your-project-id.appspot.com]

## app.yml

今回使われている`app.yml`はこんな感じでした。

```yaml
# [START runtime]
runtime: ruby
vm: true
entrypoint: bundle exec rackup -p 8080 -E production config.ru
# [END runtime]

# [START resources]
resources:
  cpu: .5
  memory_gb: 1.3
  disk_size_gb: 10
# [END resources]

# [START scaling]
automatic_scaling:
  min_num_instances: 1
  max_num_instances: 5
  cool_down_period_sec: 60
  cpu_utilization:
    target_utilization: 0.5
# [END scaling]
```

`runtime`の設定がrubyプロジェクトに共通の設定で`resources`, `scaling`は環境に合わせて適宜チューニングしてください。デフォルトの状態としてはミニマルな設定になっているようです。

## 参考

* [GoogleCloudPlatform/ruby-docker: Docker images for Ruby](https://github.com/GoogleCloudPlatform/ruby-docker)
* [ruby-docker/Dockerfile at master · GoogleCloudPlatform/ruby-docker](https://github.com/GoogleCloudPlatform/ruby-docker/blob/master/appengine/Dockerfile)
