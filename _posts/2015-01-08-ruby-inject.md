---
layout: post
title: Ruby の inject メソッドを使いこなす
published: true
description: Rubyのイテレータメソッド・injectの使い方を紹介します。合計の出し方、配列内の要素数をハッシュにしたり、each_with_objectの使い方など。
tags: ruby
toc: true
---

Rubyのイテレータメソッド`inject`の使い方を紹介してみようと思います。

## injectの基本的な使い方

Rubyの`inject`はこんなふうに使えます。

```rb
enum.inject { |memo, item| block }
enum.inject(init) { |memo, item| block }
```

## Sum（合計）を出す

これだけではわかりにくいと思うので合計を出す処理を書いてみましょう。

### injectを使わないパターン

まずは`inject`を使わないパターン。

```rb
sum = 0
(1..10).each {|i| sum += i }
puts sum # => 55
```

### injectを使うパターン

これを`inject`で書き直すとこう。

```rb
(1..10).inject(0) {|sum, i| sum + i }
# => 55
```

この場合、sumの初期値をinjectの引数の`0`で初期化しています。ただinjectのデフォルト引数設定はゼロなので下記のように 省略することができます。

```rb
(1..10).inject {|sum, i| sum + i }
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

## 応用編3: ループを止める

途中でループを止めて処理を終えたい場合、`break`を使えば可能。

```rb
(1..5).inject([]) do |ary, number|
  break ary if number == 4
  ary << number
end
# => [1, 2, 3]
```

## 番外編: each_with_index

`each_with_index`でも`inject`は使える。

```rb
(1..10).each_with_index.inject(0) { |sum, (value, index)| sum + value }
# => 55

(1..10).each_with_index.inject(0) { |sum, (value, index)| sum + value + index}
# => 100
```

## 参考

* [ruby の inject をわかりやすく説明してみる](http://kenkiti.hatenadiary.jp/entry/20090114/ruby_inject)
* [inject (Enumerable)](http://ref.xaio.jp/ruby/classes/enumerable/inject)
* [injectとeach_with_objectって何が違うのさ？ - Qiita](http://qiita.com/Kta-M/items/c9781e09d96601687767)
* [Enumerable#each_with_indexが便利すぎる - 永遠に未完成](http://thinca.hatenablog.com/entry/20090410/1239374983)
* [Rubyで Enumerable#reduce / inject で処理を中断して結果を返す - Qiita](https://qiita.com/minoritea/items/daf8ee91f2de1725b9b0)
