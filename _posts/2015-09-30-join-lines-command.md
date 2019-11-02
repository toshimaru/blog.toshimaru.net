---
layout: post
title: コマンドラインで複数行を1行に連結する
published: true
description: やりたかったことは、コマンドラインで複数行の標準入力を受け取ってそれを１行にカンマ区切りにして出力すること。
last_modified_at: 2019-11-02
tags: shell api
---

やりたかったこととしては、コマンドラインで複数行の標準入力を受け取ってそれを１行にカンマ区切りにして出力すること。

```console
$ cat text
aaaa
bbbb
cccc
```

```console
$ cat text | tr '\n' ','
aaaa,bbbb,cccc,%
```

こんな感じで `tr` を使って改行コードを置換してやればカンマ区切りで1行に連結できる。

## JSONをパースして連結する

もともとやりたかったのはこんな感じのこと。

```console
$ echo '{ "employees":[{"firstName":"John", "lastName":"Doe"}, {"firstName":"Anna", "lastName":"Smith"}, {"firstName":"Peter","lastName":"Jones"} ] }' | jq '.employees[] .firstName' | tr '\n' ',' | awk '{ print "result = [" $1 "]" }'
result = ["John","Anna","Peter",]
```

curlでJSONをHTTP GETしてそれを `jq` でパースして出たリストをカンマ区切りで出力する、みたいなやつ。

## 参考

* [linux - How to join multiple lines of file names into one with custom delimiter? - Stack Overflow](http://stackoverflow.com/questions/2764051/how-to-join-multiple-lines-of-file-names-into-one-with-custom-delimiter)
* [tr \| 標準入力の内容を置換、削除する - Tbpgr Blog](http://tbpgr.hatenablog.com/entry/20120309/1331314857)
