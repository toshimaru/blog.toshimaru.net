---
layout: post
title: brew upgrade mysql 後にpidエラー
published: true
description: brew upgrade mysqlしたらmysqlが起動しなくなった。mysql.server startができない。
tags: mac mysql
---

`brew upgrade mysql`したらmysqlが起動しなくなった。`mysql.server start`ができない。

    $ mysql.server start
    Starting MySQL
    . ERROR! The server quit without updating PID file (/usr/local/var/mysql/Toshimac.local.pid).

ググるといろいろ出てきて30分くらい調査した結果、結局下記コマンド一発で起動できた。

    $ sudo mysql.server start
    Password:
    Starting MySQL
    . SUCCESS!

ただの権限周りの問題だったようです。
