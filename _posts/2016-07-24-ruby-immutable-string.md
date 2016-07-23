---
layout: post
title: Ruby2.3 で導入された frozen_string_literal オプションを試す
description:
tags: ruby
---

## Immutable String in Ruby3

Ruby3 では文字列がデフォルトで immutable になるという大きな変更が予定されている。

> Ruby 3.0 では文字列リテラルをデフォルトで immutable （破壊的変更不可） にする、という方針が『決定』しました

via. [[Ruby] Ruby 3.0 の特大の非互換について - まめめも](http://d.hatena.ne.jp/ku-ma-me/20151004/p1)

この変更の背景としては上リンクに書いてある通り、Rubyの最適化のために文字列のいたるところ`.freeze`を付けてプルリクエストを投げる輩が大挙してきたことだ。

## Immutable String in Ruby2.3+

Ruby2.3 で既にこの Immutable String を有効にする機能が入っている。良い。やり方はRubyファイルの行頭に下記のように書けばよい。

```rb
# frozen_string_literal: true
```

## frozen_string_literal の機能を試す

下記の２ファイルを用意して実行する。

### string_with_frozen_option.rb

```rb
# frozen_string_literal: true
5.times { puts "a".object_id }
```

### 結果

全て同じ object_id が返ってくる。

```
$ ruby string_with_frozen_option.rb
70212460463280
70212460463280
70212460463280
70212460463280
70212460463280
```

### string_without_frozen_option.rb

```rb
5.times { puts "a".object_id }
```

### 結果

全て違う object_id が返ってくる。

```
ruby string_without_frozen_option.rb
70277165754460
70277165754200
70277165754080
70277165754000
70277165753940
```

## frozen_string_literal はファイル毎に設定される

たとえば`frozen_string_literal`の設定が入ったものと入っていないファイルが実行された場合はどうなるだろうか。Railsで試してみる。


```rb
class ApplicationController < ActionController::Base
  before_action :not_frozen
  def not_frozen
    5.times { logger.debug("a".object_id) }
  end
end
```

```rb
# frozen_string_literal: true
class WelcomeController < ApplicationController
  def index
    5.times { logger.debug("a".object_id) }
  end
end
```

これで`WelcomeController#index`が実行された場合、ログは下記のようになる。

```
70346238891860
70346238891080
70346238890280
70346238889340
70346238888420

70346229343820
70346229343820
70346229343820
70346229343820
70346229343820
```

つまり、`WelcomeController`だけ文字列が frozen されていることがわかる。

## まとめ

Ruby3 に先駆けて、Ruby2.3 以上が前提の実行環境では積極的に`frozen_string_literal: true`の設定をしていくべき。

## 参考
[Immutable strings in Ruby 2.3](https://wyeworks.com/blog/2015/12/1/immutable-strings-in-ruby-2-dot-3)
