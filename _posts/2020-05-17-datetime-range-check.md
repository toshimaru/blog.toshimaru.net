---
layout: post
title: "[Ruby]日時が特定日時の範囲内にあるかのチェック"
image: "/images/posts/ruby-range.png"
description: "特定日付が範囲内にあるかの判定を行うには ActiveSupport::TimeWithZone#between? が使える。ただ上記の書き方の場合、始端もしくは終端が nil の場合にエラーが出てしまう。"
tags: ruby rails
last_modified_at: 2024-11-23
---

## TimeWithZone#between? で範囲内判定

特定日付が範囲内にあるかの判定を行うには [ActiveSupport::TimeWithZone#between?](https://railsdoc.github.io/classes/ActiveSupport/TimeWithZone.html#method-i-between-3F) が使える。

```rb
# 日時.between?(始端, 終端)
Time.now.between?(Date.yesterday, Date.tomorrow)
```

実際に範囲内チェックを行うとこんな感じ。

```rb
> Time.now.between?(Date.yesterday, Date.tomorrow)
=> true

> Time.now.between?(1.week.ago, Date.yesterday)
=> false

> Time.now.between?(Date.tomorrow, 1.week.since)
=> false
```

ただ上記の書き方の場合、始端もしくは終端が `nil` の場合にエラーが出てしまう。

```rb
Date.today.between?(Date.yesterday, nil)
ArgumentError: comparison of Date with nil failed
from (pry):9:in `between?`
```

## Range#cover? で範囲内判定

上述の問題が回避するには、Rubyの [Range#cover?](https://docs.ruby-lang.org/ja/latest/method/Range/i/cover=3f.html) が使える。

```rb
# (始端..終端).cover? 日時
> (Date.yesterday..Date.tomorrow).cover? Time.now
=> true
```

### 始端/終端が nil の場合

```rb
# 始端がnil
> (nil..Date.tomorrow).cover? Time.now
=> true

# 終端がnil
> (Date.yesterday..nil).cover? Time.now
=> true
```

下記の通り範囲内から外れた場合は `false` が帰ってくる。

```rb
> (nil..Date.yesterday).cover? Time.now
=> false
> (Date.tomorrow..nil).cover? Time.now
=> false
```

## include? との違い

> [Range#include?](https://docs.ruby-lang.org/ja/latest/method/Range/i/include=3f.html) と異なり `<=>` メソッドによる演算により範囲内かどうかを判定します。 [Range#include?](https://docs.ruby-lang.org/ja/latest/method/Range/i/include=3f.html) は原則として離散値を扱い、 Range#cover? は連続値を扱います。

ref. [Range#cover? (Ruby 3.3 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/method/Range/i/cover=3f.html)

と書いてあるとおり、下記のような挙動の違いがある。

```rb
require 'date'
(Date.today - 365 .. Date.today + 365).include?(Date.today)    #=> true
(Date.today - 365 .. Date.today + 365).include?(DateTime.now)  #=> false
(Date.today - 365 .. Date.today + 365).cover?(Date.today)      #=> true
(Date.today - 365 .. Date.today + 365).cover?(DateTime.now)    #=> true
```

## おまけ：between? のオリジナル定義

`between?`メソッドはオリジナル定義を辿ると [module Comparable](https://docs.ruby-lang.org/ja/latest/class/Comparable.html#I_BETWEEN--3F) に存在します。

> 比較演算子 `<=>` をもとに self が min と max の範囲内(min, max を含みます)にあるかを判断します。

```rb
# Not Rails Project
> Time.now.class.included_modules
=> [Comparable, PP::ObjectMixin, Kernel]
```

```rb
# Rails Project
rails8(dev)> Time.zone.class.included_modules
=>
[Comparable,
 ActiveSupport::Dependencies::RequireDependency,
 PP::ObjectMixin,
 ActiveSupport::ToJsonWithActiveSupportEncoder,
 ActiveSupport::Tryable,
 JSON::Ext::Generator::GeneratorMethods::Object,
 Kernel]
```

(Special thanks: [@knu さん](https://x.com/knu/status/1262343958824271873))
