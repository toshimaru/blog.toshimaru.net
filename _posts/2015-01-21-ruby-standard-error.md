---
layout: post
title: Rubyで独自例外を定義するときはStandardErrorを継承する
published: true
description: Rubyで独自例外を定義するときは`Exception`ではなく、`StandardError` を継承するしきたりとなっています。理由をコードでみてみます。
tags: ruby rails
---

タイトルの通り、Rubyで独自例外を定義するときは`Exception`ではなく、`StandardError` を継承するしきたりとなっています。

{% highlight ruby %}
# `Exception`ではなく
class MyError1 < Exception; end
# `StandardError`.
class MyError2 < StandardError; end
{% endhighlight %}

理由をコードでみてみます。

## Exception を継承した場合

{% highlight ruby %}
class MyError1 < Exception; end

begin
  raise MyError1
rescue => e
  puts "Exception handled! #{e}"
end

# => MyError1: MyError1
{% endhighlight %}

MyError1 が`rescue`節でハンドリングされてませんね。こうしてみるとどうでしょう。

{% highlight ruby %}
class MyError1 < Exception; end

begin
  raise MyError1
rescue Exception => e
  puts "Exception handled! #{e}"
end

# => Exception handled! MyError1
{% endhighlight %}

次は`rescue`節に入りました。

## StandardError を継承した場合

{% highlight ruby %}
class MyError2 < StandardError; end

begin
  raise MyError2
rescue => e
  puts "Exception handled! #{e}"
end

# => Exception handled! MyError2
{% endhighlight %}

こちらは問題なく`rescue`節でハンドルされました。

## なぜ？

> rescue は第1引数で指定した例外クラスの下の階層にある例外だけを補足するけど、引数を省略すると StandardErrorクラスを指定したものとみなすからだ。

via. [Rubyで自前の例外クラスを作るときExceptionではなくStandardErrorを継承する理由](http://d.hatena.ne.jp/yarb/20121005/p1)


下記がビルトインのExceptionのサブクラスたちです。`rescue`のデフォルトが`StandardError`、`raise`のデフォルトが`RuntimeError`となっています。

> * NoMemoryError
> * ScriptError
>   * LoadError
>   * NotImplementedError
>   * SyntaxError
> * SecurityError
> * SignalException
>   * Interrupt
> * StandardError -- default for `rescue`
>   * ArgumentError
>     * UncaughtThrowError
>   * EncodingError
>   * FiberError
>   * IOError
>     * EOFError
>   * IndexError
>     * KeyError
>       * StopIteration
>   * LocalJumpError
>   * NameError
>     * NoMethodError
>   * RangeError
>     * FloatDomainError
>   * RegexpError
>   * RuntimeError -- default for `raise`
>   * SystemCallError
>     * Errno::*
>   * ThreadError
>   * TypeError
>   * ZeroDivisionError
> * SystemExit
> * SystemStackError
> * fatal – impossible to rescue

via [Exception](http://ruby-doc.org/core-2.2.0/Exception.html)

よって`rescue`のデフォルトで拾える`StandardError`を使って独自例外を定義しましょう。

{% highlight ruby %}
class MyError2 < StandardError; end
{% endhighlight %}

### 参考
* [Rubyで自前の例外クラスを作るときExceptionではなくStandardErrorを継承する理由](http://d.hatena.ne.jp/yarb/20121005/p1)
