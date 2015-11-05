---
layout: post
title: rubyの破壊的メソッドと非破壊的メソッドのパフォーマンス比較
published: true
description: Rubyの破壊的メソッドと非破壊的メソッドってどっちが速いのだろう？ 直感的には破壊的メソッドのほうが速そうだけど実際は…ということで調べてみた。 (Rubyのバージョンは2.2です)
tags: ruby
---

Rubyの破壊的メソッドと非破壊的メソッドってどっちが速いのだろう？ 直感的には破壊的メソッドのほうが速そうだけど実際は...ということで調べてみた。

Rubyのバージョンは2.2です。

{% highlight ruby %}
require 'benchmark'
n = 100_000

Benchmark.bm do |x|
  x.report("非破壊的") { n.times { {a: 1, b: 2, c: 3}.merge(d: 4) } }
  x.report("破壊的") { n.times { {a: 1, b: 2, c: 3}.merge!(d: 4)  } }
end
{% endhighlight %}

    user     system      total        real
    非破壊的  0.330000   0.010000   0.340000 (  0.337557)
    破壊的  0.170000   0.000000   0.170000 (  0.177394)

破壊的のほうが速い。

> 破壊的メソッド (「!」が付くメソッド) はそうでないのに比べ概して高速。 しかし最近は非破壊的メソッドも高速化されてきているので以前ほど 違わなくなってきているのは確かだ。 たとえば gsub と gsub! だと作業自体は gsub のほうが高速だったりする。 計測してみると非破壊的メソッドが遅いことが多いのは、 無駄なオブジェクトが増えて GC が起きているからである。

via. [LoveRubyNet Wiki: OptimizingRubyProgram](http://i.loveruby.net/w/OptimizingRubyProgram.html)

なるほど。`gsub`でも検証してみよう。

{% highlight ruby %}
Benchmark.bm do |x|
  x.report("非破壊的") { n.times { "hello,\nworld\n".gsub(/(\r\n|\r|\n)/, "<br />") } }
  x.report("破壊的") { n.times { "hello,\nworld\n".gsub!(/(\r\n|\r|\n)/, "<br />") } }
end
{% endhighlight %}

    user     system      total        real
    非破壊的  0.410000   0.010000   0.420000 (  0.420611)
    破壊的  0.420000   0.000000   0.420000 (  0.418214)

こちらは結果はほとんど変わらなかった。

## まとめ

多くの場合、破壊的メソッドのほうが速い。
