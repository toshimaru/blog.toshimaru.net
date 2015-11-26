---
layout: post
title: Ruby Gem Configuration Pattern
published: true
description: railsのgemでよくみかける初期設定ファイル、config/initializers/foo.rb。このような初期設定のインターフェースをgem内に作る場合、いったいどうしたら良いでしょうか。
tags: ruby gem rails
---

railsのgemでよくみかける初期設定ファイル、`config/initializers/foo.rb`。このような初期設定のインターフェースをgem内に作る場合、いったいどうしたら良いでしょうか。

## めざす完成形はコレ！

完成系として、下記を想定してみます。

{% highlight ruby %}
# config/initializers/konfig.rb
Konfig.configure do |config|
  config.my_value = 'my configuration value'
end
{% endhighlight %}

## configureメソッドを用意

まずは`module`と`configure`というクラスメソッドを用意します。

{% highlight ruby %}
module Konfig
  class << self
    def configure
    end
  end
end
{% endhighlight %}

## Configurationクラス

次に実際の設定値が入る`Configuration`クラスを用意します。

{% highlight ruby %}
class Configuration
  attr_accessor :my_value

  def initialize
    @my_value = 'default value'
  end
end
{% endhighlight %}

## 完成形

次にこれを組み合わせてみましょう。

{% highlight ruby %}
module Konfig
  class << self
    def configure
      yield(configuration)
    end

    def configuration
      @configuration ||= Configuration.new
    end
  end

  class Configuration
    attr_accessor :my_value

    def initialize
      @my_value = 'default value'
    end
  end
end
{% endhighlight %}

これでインスタンス化された`Configuration`クラスが出てきます。

    > Konfig.configure {|config| p config}
    #<Konfig::Configuration:0x007ff5dfba4a50 @my_value="default value">

{% highlight ruby %}
Konfig.configure do |config|
  config.my_value = "abc"
end
# => "abc"

Konfig.configuration
# => #<Konfig::Configuration:0x007fa9730aace8 @my_value="abc">
{% endhighlight %}

`configure`で`Configuration`インスタンス作っててブロック内の`config`変数で`Configuration`インスタンスに設定注入していくようなイメージですね。

### 参考
* [MyGem.configure Block](https://robots.thoughtbot.com/mygem-configure-block)
* [クラスインスタンス変数にアクセサを利用しアクセスする - ひたすら事務](http://jimsei.hatenablog.com/entry/20120721/1342855783)
* [Rubyのクラスインスタンス変数をアクセサで定義する](http://o.inchiki.jp/obbr/168)
