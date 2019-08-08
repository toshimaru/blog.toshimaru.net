---
layout: post
title: Jekyllマークダウンはデフォルトではなくkramdownを使おう
description: jekyllにおいて日本語リストがうまくhtmlに変換してくれないなーって調べてたら、どうやらデフォルトのmarkdownレンダラーではダメらしい。kramdownを使うとよい。
tags: jekyll
---

[jekyll](https://github.com/jekyll/jekyll) において日本語リストがうまくHTMLに変換してくれないなーって調べてたら、どうやらデフォルトのmarkdownレンダラーではダメらしい。

> Jekyll がデフォルトの markdown レンダラーとして採用している maruku は、どうも Unicode の扱いが怪しいらしい。日本語を使っているとフォーマットが崩れることがある。オプションとして選択可能な kramdown に入れ替えることをおすすめする。 _config.yml に次の1行を足すだけでいい。
>
> [GitHub Pagesを使うにあたって](http://radiumsoftware.tumblr.com/post/10543406778)

`_config.yml` に下記を追記。

```yml
markdown: kramdown
```

これで日本語リスト変換もうまくいきました。
