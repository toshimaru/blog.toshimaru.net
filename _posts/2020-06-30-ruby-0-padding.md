---
layout: post
title: Rubyで数値の0埋め
image: "/images/posts/ruby/zero-padding.png"
description: "Rubyで数値の0埋めするときの書き方をよく忘れるのでメモ。"
tags: ruby
toc: true
---

Rubyで数値の0埋めするときの書き方をよく忘れるのでメモ。

## TL;DR

結論としては下記のように書くとよい。

```rb
format("number: %09<number>d", number: 1) #=> "number: 000000001"
```

## Rubyで数値の0埋め

Rubyで数値の0埋めしようと思うとこんな感じのコードになる。

```rb
sprintf("number: %09d", 1) #=> "number: 000000001"
```

[sprintf フォーマット](https://docs.ruby-lang.org/ja/latest/doc/print_format.html)はC由来の関数だ。`%09d`の意味としては`%d`が数値、`09`は9桁の0埋めという意味になる。

また、[String#%](https://docs.ruby-lang.org/ja/latest/class/String.html#I_--25)を使う方法もある。`sprintf`と同じ挙動をする。

```rb
"number: %09d" % 1 #=> "number: 000000001"
```

こちらのほうがより簡潔な表記だ。

## RuboCopのオススメ書き方

上述の書き方でも問題ないのだが、rubocop（デフォルト設定）に通すと下記の通り怒られる。

### Favor format over sprintf

```
C: Style/FormatString: Favor format over sprintf.
```

`sprintf`ではなく`format`を使え、と。また `String#%` を使った書き方も下記の指摘がくる。

### Favor format over String#%

```
C: Style/FormatString: Favor format over String#%.
```

ちなみに`format`は`sprintf`のエイリアス関数。

```c
rb_define_global_function("sprintf", f_sprintf, -1);
rb_define_global_function("format", f_sprintf, -1);
```

ref. [ruby/object.c at 946e5cc668f66a4a0b79461047d3fcba8b71eef0 · ruby/ruby](https://github.com/ruby/ruby/blob/946e5cc668f66a4a0b79461047d3fcba8b71eef0/object.c#L4630-L4631)

rubocopの指摘に従って下記のように修正してみる。

```rb
format("number: %09d", 1) #=> "number: 000000001"
```

### Prefer annotated tokens

これでもrubocopに下記のように怒られる。

```
C: Style/FormatStringToken: Prefer annotated tokens (like %<foo>s) over unannotated tokens (like %s).
```

`<foo>`のようなannotated tokenを使って名前を与えてやれ、とのことらしい。

## 結論

rubocopの指摘を乗り越えて、最終的には下記で完成です。

```rb
format("number: %09<number>d", number: 1) #=> "number: 000000001"
```
