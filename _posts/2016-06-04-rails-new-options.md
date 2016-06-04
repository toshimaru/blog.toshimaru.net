---
layout: post
title: rails new するときによく使うオプション
description: rails new するときによく使うオプション。turbolinksをOFFって、データベースをmysqlに変更して、testをRSpec使うためにskipする。
tags: rails
---

`rails new` するときによく使うオプション。

| オプション | 意味 |
| ---- | --- |
| `-d` / `--database=mysql` | データベースの指定。 mysql とか postgresql などを指定する |
| `--skip-turbolinks` | turbolinks を無効化して`rails new`する |
| `--skip-test-unit` | testを作成しない。RSpecに変更したいときに使うと良い。Rails4 で有効なオプション。  |
| `--skip-test` | 同上。 **Rails5 で有効なオプション**。 |

turbolinksをOFFって、データベースをmysqlに変更して、testをRSpec使うためにskipする。これらをまとめると下記のようになる。

## Rails4

    $ rails new --database=mysql --skip-turbolinks --skip-test-unit

## Rails5 以降

    $ rails new --database=mysql --skip-turbolinks --skip-test

## その他のオプション

    $ rails new -h

で見るべし。
