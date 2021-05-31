---
layout: post
title: rails new するときによく使うオプション
description: rails new するときによく使うオプション。turbolinksをOFFって、データベースをmysqlに変更して、testをRSpec使うためにskipする。
tags: rails
last_modified_at: 2021-05-30
---

`rails new` するときによく使うオプション。

| オプション | 意味 |
| ---- | --- |
| `-d` / `--database=mysql` | データベースの指定。 mysql とか postgresql などを指定する |
| `--skip-turbolinks` | turbolinks を無効化して`rails new`する |
| `--skip-test-unit` | testを作成しない。RSpecに変更したいときに使うと良い。Rails4 で有効なオプション。  |
| `--skip-test` | testを作成しない。RSpecに変更したいときに使うと良い。 |
| `--skip-webpack-install` | webpackをinstallしない。 |

turbolinks(+webpack)をOFFって、データベースをmysqlに変更して、testをRSpec使うためにskipする。これらをまとめると下記のようになる。

## Rails6

```console
$ rails new --database=mysql --skip-webpack-install --skip-turbolinks --skip-test
```

## Rails5

```console
$ rails new --database=mysql --skip-turbolinks --skip-test
```

## Rails4

```console
$ rails new --database=mysql --skip-turbolinks --skip-test-unit
```

Rails 4 の場合は `--skip-test` の代わりに `--skip-test-unit` を使う。
{: .warning}

## その他のオプション

`rails new` のときに使えるオプションに関しては下記コマンドで見るべし。

```console
$ rails new -h
```
