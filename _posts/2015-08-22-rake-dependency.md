---
layout: post
title: 他のrakeタスクに依存するrakeタスクの実行
published: true
description: 他のrakeタスクに依存性のあるrakeタスクの実行の仕方について紹介します。
tags: rake
---

## rakeタスクの前に別のrakeタスクを実行

ある特定のRakeタスクを実行する前に別のタスクを実行したい場合、このようにタスクを書きます。

```ruby
task(:x) { puts "x" }
task(:y) { puts "y" }
task(:z) { puts "z" }

desc "dependency rake task"
task foo: [:x, :y, :z] do
  puts "foo task"
end
```

結果はこんな感じ。

```
$ rake foo
x
y
z
foo task
```

タスク`x`, `y`, `z` が実行された後にタスク`foo`が実行されます。

### 別の方法

また下記のように`foo`タスクのみ先に定期して、別のtaskとして依存を定義することも可能です。

```rb
task(:x) { puts "x" }
task(:y) { puts "y" }
task(:z) { puts "z" }

desc "dependency rake task"
task(:foo) do
  puts "foo task"
end

task foo: [:x, :y, :z]
```

```
$ rake foo
x
y
z
foo task
```

## rakeタスクの後に別のrakeタスクを実行

ある特定のRakeタスクを実行する後に別のタスクを実行したい場合、`enhance`を使ってこのようにタスクを書けます。さっきの書いたタスクをenhanceしてみましょう。

```ruby
task(:x) { puts "x" }
task(:y) { puts "y" }
task(:z) { puts "z" }

desc "dependency rake task"
task foo: [:x, :y, :z] do
  puts "foo task"
end

Rake::Task["foo"].enhance do
  puts "foo enhancing task"
end
```

結果はこんな感じ。

```
$ rake foo
x
y
z
foo task
foo enhancing task
```

`enhance`の中にかいた処理はしっかり`foo`タスクのあとに実行されていますね。

## 参考

* [Modifying Rake Tasks - Dan Manges's Blog](http://www.dan-manges.com/blog/modifying-rake-tasks)
* [ruby/rake](https://github.com/ruby/rake)
* [Rake で before task をフックする - northaven](http://yamayo.github.io/blog/2014/06/06/rake-before-task-hook/)
