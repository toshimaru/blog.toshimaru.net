---
layout: post
title: Rubyのinjectを使いこなす
published: true
description: Rubyのイテレータメソッドinjectの使い方を紹介してみようと思います。
tags: ruby
toc: true
---

Rubyのイテレータメソッド`inject`の使い方を紹介してみようと思います。

## injectの基本的な使い方

Rubyのinjectはこんなふうに使えます。

{% highlight ruby %}
enum.inject {|memo, item| block }
enum.inject(init) {|memo, item| block }
{% endhighlight %}

<http://ref.xaio.jp/ruby/classes/enumerable/inject>

## Sum（合計）を出す

これだけではわかりにくいと思うので合計を出す処理を書いてみましょう。

まずは`inject`を使わないパターン。

{% highlight ruby %}
sum = 0
(1..10).each {|i| sum += i }
puts sum # => 55
{% endhighlight %}

これを`inject`で書き直すとこう。

{% highlight ruby %}
(1..10).inject {|sum, i| sum += i }
# => 55
{% endhighlight %}

この場合、sumの初期値は0ですがそれを明示的にかくならこう。

{% highlight ruby %}
(1..10).inject(0) {|sum, i| sum += i }
# => 55
{% endhighlight %}

さらにinjectにはシンボルで演算子をわたしてうまいようにやってくれる。

{% highlight ruby %}
(1..10).inject(:+)
# => 55
{% endhighlight %}

これが一番シンプルでエレガント。

## 応用編1: 配列内の要素数をハッシュに

Hash.new(0)で初期化してinject.

{% highlight ruby %}
[:great, :good, :bad, :good, :good, :bad, :awesome, :great].inject(Hash.new(0)) {|hash, key| hash[key] += 1; hash}
# => {:great=>2, :good=>3, :bad=>2, :awesome=>1}
{% endhighlight %}

## 応用編2: フィボナッチ数列

inject を利用したフィボナッチ数列ロジック。

{% highlight ruby %}
(0..10).inject([1, 1]) {|fib, i| fib << fib[i] + fib[i+1] }
# => [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
{% endhighlight %}

## 番外編: each_with_index

`each_with_index`でも`inject`は使える。

{% highlight ruby %}
(1..10).each_with_index.inject do |result, (element, index)|
  # 
end
{% endhighlight %}

### 参考
* [ruby の inject をわかりやすく説明してみる](http://kenkiti.hatenadiary.jp/entry/20090114/ruby_inject)
* [inject (Enumerable)](http://ref.xaio.jp/ruby/classes/enumerable/inject)
