---
layout: post
title: pry-byebug を使ってRailsアプリをステップ実行する
published: true
description: Railsのデバッグに使えるpry-byebugの紹介です。
tags: rails
---

Railsアプリケーションのデバッグはどのように行っていますか？　愚直にプリントデバッグ？　でも複雑なロジック内だと「このロジックのこの処理のここでピンポイントで止めたい！」という場合もありますよね。

そんなときに便利なのがpry-byebug. Githubのリンクは下記。

<https://github.com/deivid-rodriguez/pry-byebug>

pry-byebugを使えばピンポイントで処理を止めてステップ実行が可能になります。

## Requirement

* Ruby2以上

pry-byebugで使われている[Byebug](https://github.com/deivid-rodriguez/byebug)はRuby2前提のデバッガーなので2以上が必要になってきます。

## 導入

下記をGemfileに追加して`bundle install`.

    gem 'pry-byebug', group: :development

## ユースケース

例えばこんなコントローラーのロジックがあったとする。

{% highlight ruby %}
class PostsController < ApplicationController
  # ...
  def create
    @post = Post.new(post_params)
    result = @post.complicated_logic
    #
    # ... long logic ...
    #
  end
end
{% endhighlight %}

resultの中身を見たい場合はこうすればよい。

{% highlight ruby %}
class PostsController < ApplicationController
  # ...
  def create
    @post = Post.new(post_params)
    result = @post.complicated_logic
    byebug
    #
    # ... long logic ...
    #
  end
end
{% endhighlight %}

すると`byebug`を通る処理をした際に、下記のように表示されます。

    [26, 35] in /Users/toshi/playground/pry-bybug/app/controllers/posts_controller.rb
       26:   def create
       27:     @post = Post.new(post_params)
       28:     result = @post.complicated_logic
       29:     byebug
       30:     # ... long logic ...
    => 31:     respond_to do |format|
    (byebug)

この状態で下記のように変数をみたりできます。

    (byebug) result
    true
    (byebug) post_params
    {"title"=>"hoge", "category"=>"doi", "content"=>"sdfsdf"}

## その他のコマンド

ステップ実行に使えるコマンドは下記４つ。

1. `step`
2. `next`
3. `finish`
4. `continue`

次の行を実行したければ`step`、Pryセッションから抜けたい場合は`continue`を打てばよい。

### コマンドエイリアス

それぞれのコマンドをいちいち打つのがダルいので、プロジェクトルートに`.pryrc`を置きに下記のように書くとエイリアスを設定できるようだ。

{% highlight ruby %}
if defined?(PryByebug)
  Pry.commands.alias_command 'c', 'continue'
  Pry.commands.alias_command 's', 'step'
  Pry.commands.alias_command 'n', 'next'
  Pry.commands.alias_command 'f', 'finish'
end
{% endhighlight %}

本エントリで紹介したpry-byebugなどのデバッグgemを駆使してRailsアプリのデバッグをもっと効率的にしましょう！

Happy Debugging Life!
