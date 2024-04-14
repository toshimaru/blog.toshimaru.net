---
layout: post
title: RubyのJSONパーサーのパース速度比較
published: true
description: 標準のJSONパーサーとは別にいくつかのJSONパーサー実装がRuby gemにはある。それらを比較としてベンチマークとってみた。
tags: json ruby
---

標準のJSONパーサーとは別に[いくつかのJSONパーサー](https://www.ruby-toolbox.com/categories/JSON_Parsers)実装がRuby gemにはある。それらを比較としてベンチマークとってみた。

## 前提
- Ruby 2.2.2 を使います
- [benchmark-ips](https://github.com/evanphx/benchmark-ips)でベンチとる
- パースするJSONは30KB程度のサイズ
- 比較対象は下記3つ
  - [Module: JSON](http://ruby-doc.org/stdlib-2.2.0/libdoc/json/rdoc/JSON.html)
  - [yajl](https://github.com/brianmario/yajl-ruby)
  - [oj](https://github.com/ohler55/oj)

## Ruby code

書いてみた。

{% highlight ruby %}
require 'uri'
require 'net/http'
require 'json'
require 'yajl'
require 'oj'
require 'benchmark/ips'

uri = URI "http://complex/json/url.json"
response = Net::HTTP.get uri

Benchmark.ips do |x|
  x.report("JSON.parse") { JSON.parse(response) }
  x.report("Yajl") { Yajl::Parser.new.parse(response) }
  x.report("Oj") { Oj.load(response) }
  x.compare!
end
{% endhighlight %}

## Result

    Calculating -------------------------------------
              JSON.parse    99.000  i/100ms
                    Yajl   108.000  i/100ms
                      Oj   173.000  i/100ms
    -------------------------------------------------
              JSON.parse      1.123k (± 8.4%) i/s -      5.643k
                    Yajl      1.105k (± 2.8%) i/s -      5.616k
                      Oj      1.838k (± 3.2%) i/s -      9.342k

    Comparison:
                      Oj:     1838.3 i/s
              JSON.parse:     1123.1 i/s - 1.64x slower
                    Yajl:     1105.2 i/s - 1.66x slower

OjがJSON.parseやYajlより1.5倍〜1.8倍ほど高速という結果が得られた。

## まとめ

Oj使ってこ。

## 追記

こんなPRを見つけた。 [Use 'oj' for performance improvement when oj is installed by repeatedly · Pull Request #748 · fluent/fluentd](https://github.com/fluent/fluentd/pull/748)
