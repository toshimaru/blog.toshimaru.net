---
layout: post
title: HashキーのStringアクセスとSymbolアクセスのパフォーマンス比較
published: true
description: HashキーのStringアクセスとSymbolアクセスはどっちが早いのか？ ということで比較してみます。比較として使用したRubyのバージョンは下記です。 Ruby 2.1.6 Ruby 2.2.2
tags: ruby
---

HashキーのStringアクセスとSymbolアクセスはどっちが早いのか？ ということで比較してみます。コードは[こちら](http://www.sitepoint.com/unraveling-string-key-performance-ruby-2-2/)を参照しています。

## 前提条件

比較として使用したRubyのバージョンは下記です。

* Ruby 2.1.6
* Ruby 2.2.2

### ベンチマーク・コード

{% highlight ruby %}
require 'benchmark/ips'

STRING_HASH = { "foo" => "bar" }
SYMBOL_HASH = { :foo => "bar"  }

Benchmark.ips do |x|
  x.report("string") { STRING_HASH["foo"] }
  x.report("symbol") { SYMBOL_HASH[:foo]  }
end
{% endhighlight %}

## Ruby 2.1

    Calculating -------------------------------------
                  string    70.713k i/100ms
                  symbol    93.805k i/100ms
    -------------------------------------------------
                  string      3.356M (± 7.6%) i/s -     16.688M
                  symbol      6.363M (± 8.3%) i/s -     31.612M

シンボルを使った方がハッシュのアクセスは2倍ほど速い。

## Ruby 2.2

    Calculating -------------------------------------
                  string    77.873k i/100ms
                  symbol    78.367k i/100ms
    -------------------------------------------------
                  string      5.604M (± 7.8%) i/s -     27.879M
                  symbol      6.463M (± 8.2%) i/s -     32.130M

シンボルを使った方がハッシュのアクセスは速いが、Stringでのハッシュのアクセス速度はシンボルのそれと大きく変わらない値となっている。

## 結論
シンボルを使ったキーの方がHashのアクセスは速い。2.1だとそれが顕著。しかし2.2以降はそう変わらない速度になってきている。

----

### 【おまけ】JSONの場合

JSONをパースした場合。下記のコードで`symbolize_names`した場合とそうでない場合を比較。

{% highlight ruby %}
require 'json'
require 'benchmark/ips'

SAMPLE_JSON = '{"a": 1, "b": 2, "c": 3}'

Benchmark.ips do |x|
  x.report("string") { hash = JSON.parse(SAMPLE_JSON); hash["c"] }
  x.report("symbol") { hash = JSON.parse(SAMPLE_JSON, symbolize_names: true); hash[:c] }
end
{% endhighlight %}

### Ruby 2.1

    Calculating -------------------------------------
              string    11.910k i/100ms
              symbol    11.072k i/100ms
    -------------------------------------------------
              string    148.480k (± 4.5%) i/s -    750.330k
              symbol    141.624k (± 5.3%) i/s -    708.608k

### Ruby 2.2

    Calculating -------------------------------------
                  string    11.980k i/100ms
                  symbol    11.129k i/100ms
    -------------------------------------------------
                  string    150.421k (± 6.5%) i/s -    754.740k
                  symbol    137.871k (± 9.1%) i/s -    689.998k

`symbolize_names`せずに純粋なStringのほうが若干速いという結果が得られた。

### 参考
* [Unraveling String Key Performance in Ruby 2.2](http://www.sitepoint.com/unraveling-string-key-performance-ruby-2-2/)
