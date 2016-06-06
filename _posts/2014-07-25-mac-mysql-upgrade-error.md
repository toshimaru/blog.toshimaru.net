---
layout: post
title: brew upgrade mysql 後にpidエラー
published: true
description: brew upgrade mysqlしたらmysql.server startができない。
tags: mac mysql
---

`brew upgrade mysql`したらmysqlが起動しなくなり、`mysql.server start` ができない。

```bash
$ mysql.server start
Starting MySQL
. ERROR! The server quit without updating PID file (/usr/local/var/mysql/Toshimac.local.pid).
```

ググるといろいろ出てきて30分くらい調査した結果、結局下記コマンド一発で起動できた。

```bash
$ sudo mysql.server start
Password:
Starting MySQL
. SUCCESS!
```

ただの権限周りの問題だったようです...。
