---
layout: post
title: RSpecが通ったり落ちたりしたときに
published: true
description: RSpecがたまに落ちたり通ったりする。そんなときはRSpecのテスト実行順序によりテストがFailしている可能性が高い。つまりあるテストがあるテストの実行後じゃないと通らない、みたいな状況に陥っている可能性があり、これは順番に依存したテストなのでよろしくない状態である。
tags: rspec
---

RSpecがたまに落ちたり通ったりする。そんなときはRSpecのテスト実行順序によりテストがFailしている可能性が高い。つまりあるテストがあるテストの実行後じゃないと通らない、みたいな状況に陥っている可能性があり、これは順番に依存したテストなのでよろしくない状態である。

### バージョン情報
* rails (4.1.5)
* rspec (3.1.0)

RSpecを順番に依存させないために`spec_helper.rb`でこんな設定がされている。

{% highlight ruby %}
# Run specs in random order to surface order dependencies. If you find an
# order dependency and want to debug it, you can fix the order by providing
# the seed, which is printed after each run.
#     --seed 1234
config.order = "random"
{% endhighlight %}

この設定によりテスト実行の順序がランダムになり、順序に依存しないテストの記述が可能となる。シード値はテストの最後に得られる。

    Randomized with seed 724


Failしたテストのこのシード値を設定してテストを走らせればFailしたテストの順番を再現できる。

    $ bundle exec rspec --seed 724 --fail-fast

`--seed`でシード値を指定、`--fail-fast`を設定してFailしたときにテストを即時終了させるようにする。

こうすればFailするテストを再現できて、どのテストが順番に依存して落ちているのかがわかります。

### 参考
[ランダムに落ちるspecの修正で便利だったRSpecの2つの設定](http://ikm.hatenablog.jp/entry/2013/03/26/003838)
