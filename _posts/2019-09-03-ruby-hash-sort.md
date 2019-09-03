---
layout: post
title: RubyでHashのKey/Valueをソートする
description: "RubyでHashのKey/Valueをソートするにはどうしたらよいでしょうか。 ベースとなるHashデータ 今回ソートの対象となるベースとなるHashデータは下記のとおりです。 > h = { c: -10, z: 10, b: -5, y: 5, a: -1, x: 1 } => {:c=>-10, :z=>10, :b=>-5, :y=>5, :a=>-1, :x=>1}"
tags: ruby
toc: true
---

RubyでHashのKey/Valueをソートするにはどうしたらよいでしょうか。

## ベースとなるHashデータ

今回ソートの対象となるベースとなるHashデータは下記のとおりです。

```rb
> h = { c: -10, z: 10, b: -5, y: 5, a: -1, x: 1 }
=> {:c=>-10, :z=>10, :b=>-5, :y=>5, :a=>-1, :x=>1}
```

## HashのKeyをソート

### HashのKeyを昇順にソート

HashのKeyのソートであれば素直に `sort` を呼べばいけます。

```rb
> h.sort
=> [[:a, -1], [:b, -5], [:c, -10], [:x, 1], [:y, 5], [:z, 10]]
```

ただこのままだとArrayのかたちなので、再びHashに戻すために`to_h`を付けてHashに戻してやりましょう。

```rb
> h.sort.to_h
=> {:a=>-1, :b=>-5, :c=>-10, :x=>1, :y=>5, :z=>10}
```

### HashのKeyを降順にソート

では次に降順にソートです。`reverse`でいけます。

```rb
> h.sort.reverse
=> [[:z, 10], [:y, 5], [:x, 1], [:c, -10], [:b, -5], [:a, -1]]

> h.sort.reverse.to_h
=> {:z=>10, :y=>5, :x=>1, :c=>-10, :b=>-5, :a=>-1}
```

## HashのValueをソート

### HashのValueを昇順にソート

次にHashのValueはどうでしょうか？ `sort_by` を使えばいけます。

```rb
> h.sort_by { |_, v| v }
=> [[:c, -10], [:b, -5], [:a, -1], [:x, 1], [:y, 5], [:z, 10]]

> h.sort_by { |_, v| v }.to_h
=> {:c=>-10, :b=>-5, :a=>-1, :x=>1, :y=>5, :z=>10}
```

### HashのValueを降順にソート

降順は`reverse`を使ってこうです。

```rb
> h.sort_by { |_, v| v }.reverse.to_h
=> {:z=>10, :y=>5, :x=>1, :a=>-1, :b=>-5, :c=>-10}
```

ただ今回のHashデータのようにValueがIntegerの場合は、下記のほうがスマートです。

```rb
> h.sort_by { |_, v| -v }.to_h
=> {:z=>10, :y=>5, :x=>1, :a=>-1, :b=>-5, :c=>-10}
```
