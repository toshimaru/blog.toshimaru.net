---
layout: post
title: ChromeのDevToolでlocalStrageのデータをイジイジする
published: true
image: /images/posts/localstrage/todo.png
description: ChromeのDevToolでローカルストレージのデータをイジったことなかったけど、簡単にできたのでメモ。
tags: chrome
---

ChromeのDevToolでローカルストレージのデータをイジったことなかったけど、簡単にできたのでメモ。

例えばTODOデータをローカルストレージに保存している[TodoMVC](http://todomvc.com/architecture-examples/backbone/)で上記のようにデータを作ってみる。

こんな感じで閲覧できる。

![chrome-localstrage](/images/posts/localstrage/ls.png)

ローカルストレージのデータを`TODO1`を`TODO123`に変更してみる。

![chrome-localstrage](/images/posts/localstrage/ls2.png)

ページをリロードしてみる。ローカルストレージからデータの初期化が行われるので、`TODO123`になっていることが確認できます。

![chrome-localstrage](/images/posts/localstrage/ls3.png)
