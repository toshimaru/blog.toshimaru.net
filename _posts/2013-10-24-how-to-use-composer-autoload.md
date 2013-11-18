---
layout: post
title: Composerで始める PHPのライブラリ管理
published: true
description: PHPもComposerの登場によりライブラリのインストール、依存性管理が格段に楽になりました。既にPHPのライブラリ管理のスタンダードになっていますが、改めてComposerの導入手順について紹介してみたいと思います。
tags: php
---

PHPも[Composer](http://getcomposer.org/)の登場によりライブラリのインストール、依存性管理が格段に楽になりました。既にPHPのライブラリ管理のスタンダードになっていますが、改めてComposerの導入手順について紹介してみたいと思います。

##Composerのインストール

PHPのバージョンは5.3以降が必要です。PHP5.2以前はさっさと捨てるべし！

    $ curl -s https://getcomposer.org/installer | php

さてこれで`composer.phar`が手に入りました。`composer`コマンドを使えるようにするためにパスの通った場所に`composer.phar`を移動しましょう。

    $ sudo mv composer.phar /usr/local/bin/composer

`composer`コマンド準備完了です。

    $ composer
       ______
      / ____/___  ____ ___  ____  ____  ________  _____
     / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
    / /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
    \____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                        /_/
    Composer version b482ebe0ca18321d9322bd913af73c1c55adebf1 2013-09-23 09:55:49

##依存関係の記述

composerはプロジェクトルートの`composer.json`ファイルにライブラリを記述することで依存関係の管理を行います。（composer.jsonはnpmにおけるpackage.jsonみたいなものです）早速ファイルを作ってライブラリを記述してみましょう。

    $ touch composer.json

`composer.json`ファイルに下記のように記述します。ここではPHPUnitをインストールしてみます。

    {
        "require": {
            "phpunit/phpunit": "3.7.*"
        }
    }

##ライブラリのインストール

`composer.json`ファイルを記述し終えたら、composerコマンドでライブラリのインストールを行います。

    $ composer install
    Loading composer repositories with package information
    Installing dependencies (including require-dev)
      - Installing symfony/yaml (v2.3.6)
        Loading from cache

      - ..............

      - Installing phpunit/phpunit (3.7.28)
        Loading from cache

    phpunit/phpunit suggests installing phpunit/php-invoker (>=1.1.0,<1.2.0)
    Writing lock file
    Generating autoload files

うまいこといきました。ライブラリは`vendor`ディレクトリ下に格納されます。この時同時にバージョン情報が書かれた`composer.lock`ファイルも生成します。

##ライブラリのアップデート

ライブラリのアップデートに関しては下記のコマンドでOK.

    $ composer update

##まとめ

モダンなPHPパッケージ管理であればComposer一択でしょう。PEARとの使い分けに関しては[PHP Right Way](http://ja.phptherightway.com/#依存関係の管理)にはこのように書いてあります。

> * Composer を使うのは、ひとつのプロジェクトにおける依存関係を管理するとき。
> * PEAR を使うのは、システム全体の PHP 環境の依存関係を管理するとき。

大抵の場合、後者のようにシステム全体で依存性管理をしなきゃならん理由はないと思うのでComposerで依存管理を行いましょう！
