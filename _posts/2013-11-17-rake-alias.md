---
layout: post
title: Rakeタスクにエイリアスを付ける
published: true
description: RubyのRakeタスクにエイリアス付けたいときってありません？ 僕はあります。rake createなんていうタスクがあったとしたら、何らかの手癖のせいでrake newとか打っちゃうことがあるんですよ。そういうときはalias_taskなんていう関数を作ってやって、タスク名に別のエイリアス名を割り当ててやればOK。
tags: ruby rake
---

RubyのRakeタスクにエイリアス付けたいときってありませんか？

僕はあります。`rake create`なんていうタスクがあったとしたら、手癖で`rake new`とか打っちゃうことがあるんですよ。そういうときは`alias_task`なんていう関数を作ってやって、タスク名に別のエイリアス名を割り当ててやればOK。具体的にはこんな感じです。

```ruby
def alias_task(tasks)
  tasks.each do |new_name, old_name|
    task new_name, [*Rake.application[old_name].arg_names] => [old_name]
  end
end

alias_task [
  [:new, :create],
  [:dc,  :db_create]
]
```

このコードでは

- `create`タスクに`new`というエイリアス名
- `db_create`タスクに`dc`というエイリアス名

をそれぞれ割り当てています。

## 参考

* [The alias of task name in rake](http://stackoverflow.com/questions/7656541/the-alias-of-task-name-in-rake)
