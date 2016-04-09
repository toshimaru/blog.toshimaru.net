---
title: docker-compose で Rails 環境を構築する
published: true
image: /images/posts/docker/compose.png
description: docker-machine, docker-compose を使ってローカルにdocker Rails環境を構築してみます。
tags: docker docker-compose docker-machine
---

`docker-machine`,` docker-compose` を使ってローカルにdocker Rails環境を構築してみます。

## 前提

- docker-machine
- docker-compose

バージョンは下記の通り。

    $ docker-machine -v
    docker-machine version 0.6.0, build e27fb87

    $ docker-compose -v
    docker-compose version 1.6.2, build unknown

## docker-machine 準備

`docker-machine create`でdefaultのmachineを作成します。

    $ docker-machine create --driver virtualbox default
    Running pre-create checks...
    (...snip...)
    (default) Creating VirtualBox VM...
    (default) Creating SSH key...
    (default) Starting the VM...
    (default) Check network to re-create if needed...
    (default) Found a new host-only adapter: "vboxnet0"
    (default) Waiting for an IP...
    Waiting for machine to be running, this may take a few minutes...
    Detecting operating system of created instance...
    Waiting for SSH to be available...
    Detecting the provisioner...
    Provisioning with boot2docker...
    Copying certs to the local machine directory...
    Copying certs to the remote machine...
    Setting Docker configuration on the remote daemon...
    Checking connection to Docker...
    Docker is up and running!
    To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: docker-machine env default

`docker-machine ls` で状態を確認。

    $ docker-machine ls
    NAME      ACTIVE   DRIVER       STATE     URL                         SWARM   DOCKER    ERRORS
    default   -        virtualbox   Running   tcp://192.168.99.100:2376           v1.10.3

STATE: Runningになってますね。

### 環境変数設定

docker-machine の環境変数をセットします。

    $ eval "$(docker-machine env default)"

## Rails設定

### Dockerfile

このように`Dockerfile`を作成します。

    $ cat Dockerfile
    FROM ruby:2.3.0
    RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
    RUN mkdir /myapp
    WORKDIR /myapp
    ADD Gemfile /myapp/Gemfile
    ADD Gemfile.lock /myapp/Gemfile.lock
    RUN bundle install
    ADD . /myapp

`Dockerfile`に書いてある内容はだいたいこんな感じ。

- `FROM`: Docker hub のrubyイメージ、2.3.0タグをベースイメージとする
- `WORKDIR`: `mkdir /myapp`してそこをワーキングディレクトリと宣言
- `Gemfile`, `Gemfile.lock`を追加
- `WORKDIR`にて`bundle install`する

### docker-compose.yml

`docker-compose.yml`を用意します。`docker-compose.yml`はこんな感じです。

{% highlight yaml %}
version: '2'
services:
  db:
    image: mysql
    environment:
      MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
  web:
    build: .
    command: bundle exec rails s -p 3000 -b '0.0.0.0'
    volumes:
      - .:/myapp
    ports:
      - "3000:3000"
    depends_on:
      - db
{% endhighlight  %}

`web`, `db` の２つのサービスを用意します。今回は`db`はmysqlでいきます。

### Gemfile, Gemfile.lock

`Gemfile`はこんな感じ。rails 4.2.6 でいきましょう。

{% highlight ruby %}
source 'https://rubygems.org'
gem 'rails', '4.2.6'
{% endhighlight  %}

`Gemfile.lock`は空っぽで :ok: .

    $ touch Gemfile.lock

### rails new

これで準備完了。次に`docker-compose`を通して`rails new`します。

    $ docker-compose run web rails new . --force --database=mysql --skip-bundle

これでwebコンテナが起動して`rails new`され、カレントディレクトリにその成果物が生成されています。

Gemfileの`therubyracer` gemのコメントを外して`docker-compose build`します。

{% highlight ruby %}
gem 'therubyracer', platforms: :ruby
{% endhighlight  %}

    $ docker-compose build
    db uses an image, skipping
    Building web
    Step 1 : FROM ruby:2.3.0
     ---> 268e5f4c6264
    Step 2 : RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
     ---> Using cache
     ---> b5f055055282
    Step 3 : RUN mkdir /myapp
     ---> Using cache
     ---> ef58bac5859f
    Step 4 : WORKDIR /myapp
     ---> Using cache
     ---> d712516a5383
    Step 5 : ADD Gemfile /myapp/Gemfile
     ---> Using cache
     ---> 45897d961453
    Step 6 : ADD Gemfile.lock /myapp/Gemfile.lock
     ---> Using cache
     ---> 1e9aadcd1985
    Step 7 : RUN bundle install
     ---> Running in db6cade21717
    Fetching gem metadata from https://rubygems.org/...........
    Fetching version metadata from https://rubygems.org/...
    Fetching dependency metadata from https://rubygems.org/..
    Resolving dependencies...
    Installing rake 11.1.2
    ...snip...
    Removing intermediate container b18b021bc248
    Step 8 : ADD . /myapp
     ---> e259ae327e06
    Removing intermediate container 568e85cfeee6
    Successfully built e259ae327e06

## データベース設定

デフォルトだとデータベースの向き先が`localhost`になっていますので、これを`db`コンテナに向けてやる必要があります。

下記の通り、`config/database.yml`内のhostに`db`を指定しましょう。

```
# config/database.yml
default: &default
  adapter: mysql2
  encoding: utf8
  pool: 5
  username: root
  password:
  host: db

development:
  <<: *default
  database: myapp_development
```

データベースの設定が完了したらデータベースを作成します。

    $ docker-compose run web rake db:create

## docker-compose up

`docker-compose up`してrails server立ち上げる。

    $ docker-compose up
    Recreating rails1_db_1
    Recreating rails1_web_1
    Attaching to rails1_db_1, rails1_web_1
    db_1  | 2016-04-09T16:48:34.775827Z 0 [Note] mysqld (mysqld 5.7.11) starting as process 1 ...
    ...snip...
    db_1  | Version: '5.7.11'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server (GPL)
    web_1 | [2016-04-09 16:48:38] INFO  WEBrick 1.3.1
    web_1 | [2016-04-09 16:48:38] INFO  ruby 2.3.0 (2015-12-25) [x86_64-linux]
    web_1 | [2016-04-09 16:48:38] INFO  WEBrick::HTTPServer#start: pid=1 port=3000

これでrails serverが準備できました。`192.168.99.100:3000`でページが見れます。

ちなみにdocker-machineのIPアドレスは下記のように取得可能です。これにて完了！！

    $ docker-machine ip default
    192.168.99.100

## 参考
- [Quickstart: Compose and Rails](https://docs.docker.com/compose/rails/)
