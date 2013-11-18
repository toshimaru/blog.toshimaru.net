---
layout: post
title: Rakeタスクにエイリアスを付ける
published: true
description: RubyのRakeタスクにエイリアス付けたいときってありません？ 僕はあります。rake createなんていうタスクがあったとしたら、何らかの手癖のせいでrake newとか打っちゃうことがあるんですよ。そういうときはalias_taskなんていう関数を作ってやって、タスク名に別のエイリアス名を割り当ててやればOK。
tags: ruby
---

RubyのRakeタスクにエイリアス付けたいときってありません？

僕はあります。`rake create`なんていうタスクがあったとしたら、何らかの手癖のせいで`rake new`とか打っちゃうことがあるんですよ。

そういうときは`alias_task`なんていう関数を作ってやって、タスク名に別のエイリアス名を割り当ててやればOK。具体的にはこんな感じです。

    def alias_task(tasks)
        tasks.each do |new_name, old_name|
            task new_name, [*Rake.application[old_name].arg_names] => [old_name]
        end
    end

    alias_task [
        [:new, :create],
        [:dc,  :db_create]
    ]

ここでは

- `create`タスクに`new`というエイリアス名を
- `db_create`タスクに`dc`というエイリアス名を

割り当てています。

###参考
* [The alias of task name in rake](http://stackoverflow.com/questions/7656541/the-alias-of-task-name-in-rake)
