---
layout: post
title: 標準出力、標準エラー出力のリダイレクト方法まとめ
image: "/images/posts/stdout.png"
description: 標準出力、標準エラー出力のリダイレクトの方法を実際のコマンド実行結果とあわせてまとめてみます。
tags: shell bash
toc: true
---

標準出力、標準エラー出力のリダイレクトの方法を実際のコマンド実行結果とあわせてまとめてみます。

## 標準入力, 標準出力, 標準エラー出力とは？

| 種類 | 説明 | ファイルディスクリプタ | 省略形 |
| - | - | - | - |
| **標準入力** | デフォルトの入力データストリーム。<br>例えばコマンドのパイプラインなど。ターミナル上ではユーザーのキーボード入力のこと。| 0 |  `stdin` |
| **標準出力** |デフォルトの出力データストリーム。<br>ターミナル上ではユーザーの画面に表示される。|  1 | `stdout`  |
| **標準エラー出力** | デフォルトのエラーに関連する出力データストリーム。<br>ターミナル上ではユーザーの画面に表示される。 | 2 |  `stderr` |

（出典: [What is a File Descriptor? - Stdin, stdout, and stderr](https://www.computerhope.com/jargon/f/file-descriptor.htm) より翻訳）

それぞれのファイルディスクリプタは下記のように `/dev/stderr`, `/dev/stdin`, `/dev/stdout` からも確認することができます

```console
$ ls -l /dev/std{in,out,err}
lr-xr-xr-x  1 root  wheel  0 Sep 12 08:46 /dev/stderr -> fd/2
lr-xr-xr-x  1 root  wheel  0 Sep 12 08:46 /dev/stdin -> fd/0
lr-xr-xr-x  1 root  wheel  0 Sep 12 08:46 /dev/stdout -> fd/1
```

## 標準出力, 標準エラー出力するシェルスクリプト

今回使用するベースとなるシェルスクリプトは下記になります。

```console
$ cat stdout-stderr.sh
#!/bin/sh
echo "stdout"
echo "stderr" >&2
```

- stdout という文字列を標準出力
- stderr という文字列を標準エラー出力

このようなコードとなっております。

### Rubyバージョン

ちなみに今回のシェルスクリプトをRubyで表現すると下記のようになります。

```rb
#!/usr/bin/env ruby
puts "stdout"
warn "stderr"
```

## リダイレクト無し実行時

まずは何もリダイレクトの設定をしないで実行してみます。

```console
$ ./stdout-stderr.sh
stdout
stderr
```

- 標準出力、エラー出力ともに画面に表示される

## 標準出力リダイレクト有り実行時

次はリダイレクトを設定して実行してみましょう。

```console
$ ./stdout-stderr.sh > stdout.txt
stderr

$ cat stdout.txt
stdout
```

- リダイレクト無し実行時と比較して、画面に表示される結果から stdout が出力されなくなった
- 画面に表示されなくなった代わりに、リダイレクト先の `stdout.txt` に stdout が出力されている

また上コマンドでは省略されていますが、リダイレクトのデフォルトは標準出力のファイルディスクリプタ「1」なので、`>` の部分は `1>` と書くこともできます。

```console
$ ./stdout-stderr.sh > stdout.txt
# 下記のようにも書くことできる
$ ./stdout-stderr.sh 1> stdout.txt
```

## エラー出力リダイレクト有り実行時

次はエラー出力だけリダイレクトするようにしてみましょう。

```console
$ ./stdout-stderr.sh 2> stderr.txt
stdout

$ cat stderr.txt
stderr
```

- リダイレクト無し実行時と比較して、画面に表示される結果から stderr が出力されなくなった
- 画面に表示されなくなった代わりに、リダイレクト先の `stderr.txt` に stderr が出力されている

## エラー出力を標準出力としてリダイレクト実行時

続いてエラー出力を標準出力としてまとめて出力するようにリダイレクトしてみます。

```console
$ ./stdout-stderr.sh &> stdout-stderr.txt

$ cat stdout-stderr.txt
stdout
stderr
```

- リダイレクト実行時の画面表示は何もされない
- リダイレクト先のファイル `stdout-stderr.txt` には stdout と stderr ともに出力されている

```console
$ ./stdout-stderr.sh &> stdout-stderr.txt
# 下記のようにも書くことできる
$ ./stdout-stderr.sh >& stdout-stderr.txt
$ ./stdout-stderr.sh > stdout-stderr.txt 2>&1
$ ./stdout-stderr.sh 1> stdout-stderr.txt 2>&1
```

## 標準出力＆エラー出力を別々にリダイレクト実行時

標準出力と標準エラー出力をそれぞれ別にリダイレクトするようにしてみます。

```console
$ ./stdout-stderr.sh 1> stdout.txt 2> stderr.txt

$ cat stdout.txt
stdout

$ cat stderr.txt
stderr
```

- 標準出力である stdout は `stdout.txt` に出力される
- 標準エラー出力である stderr は `stderr.txt` に出力される

## 出力をリダイレクトで捨てる

`/dev/null`にリダイレクトすれば出力内容を捨てることができます。

```console
$ ./stdout-stderr.sh &> /dev/null
```

## 参考

- [bash: 標準出力、標準エラー出力をファイル、画面それぞれに出力する方法 - Qiita](https://qiita.com/laikuaut/items/e1cc312ffc7ec2c872fc)
- [What is a File Descriptor?](https://www.computerhope.com/jargon/f/file-descriptor.htm)
