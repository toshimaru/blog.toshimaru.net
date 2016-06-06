---
layout: post
title: Ruby の inject を使いこなす
published: true
description: Rubyのイテレータメソッド・injectの使い方を紹介してみようと思います。
tags: ruby
toc: true
---

Rubyのイテレータメソッド`inject`の使い方を紹介してみようと思います。

## injectの基本的な使い方

Rubyの`inject`はこんなふうに使えます。

```rb
enum.inject {|memo, item| block }
enum.inject(init) {|memo, item| block }
```

## Sum（合計）を出す

これだけではわかりにくいと思うので合計を出す処理を書いてみましょう。

まずは`inject`を使わないパターン。

```rb
sum = 0
(1..10).each {|i| sum += i }
puts sum # => 55
```

これを`inject`で書き直すとこう。

```rb
(1..10).inject {|sum, i| sum += i }
# => 55
```

この場合、sumの初期値は0ですがそれを明示的にかくならこう。

```rb
(1..10).inject(0) {|sum, i| sum += i }
# => 55
```

さらにinjectにはシンボルで演算子をわたしてうまいようにやってくれる。

```rb
(1..10).inject(:+)
# => 55
```

これが一番シンプルでエレガント。

## 応用編1: 配列内の要素数をハッシュに

`Hash.new(0)`で初期化して`inject`.

```rb
[:great, :good, :bad, :good, :good, :bad, :awesome, :great].inject(Hash.new(0)) {|hash, key| hash[key] += 1; hash}
# => {:great=>2, :good=>3, :bad=>2, :awesome=>1}
```

### each_with_object を使う

上記の例だと`hash[key] += 1; hash`とやや冗長な書き方となっていますが、`each_with_object`使うともう少しシンプルに書けます。

```rb
[:great, :good, :bad, :good, :good, :bad, :awesome, :great].each_with_object(Hash.new(0)) {|key, hash| hash[key] += 1}
# => {:great=>2, :good=>3, :bad=>2, :awesome=>1}
```

## 応用編2: フィボナッチ数列

`inject` を利用したフィボナッチ数列ロジック。

```rb
(0..10).inject([1, 1]) {|fib, i| fib << fib[i] + fib[i+1] }
# => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
```

## 番外編: each_with_index

`each_with_index`でも`inject`は使える。

```rb
(1..10).each_with_index.inject do |result, (element, index)|
  # ...
end
```

## 参考
* [ruby の inject をわかりやすく説明してみる](http://kenkiti.hatenadiary.jp/entry/20090114/ruby_inject)
* [inject (Enumerable)](http://ref.xaio.jp/ruby/classes/enumerable/inject)
* [injectとeach_with_objectって何が違うのさ？ - Qiita](http://qiita.com/Kta-M/items/c9781e09d96601687767)
