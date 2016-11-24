---
layout: post
title: Ruby2.3 で導入された frozen_string_literal オプションで Immutable String を実現する
description: Immutable String in Ruby3 / Ruby3 では文字列がデフォルトで immutable になるという大きな変更が予定されている。この変更の背景としては上リンクに書いてある通り、Rubyの最適化のために文字列のいたるところ.freezeを付けてプルリクエストを投げる輩が大挙してきたことだ。Ruby2.3 で既にこの Immutable String を有効にする機能が入っている。やり方はRubyファイルの行頭に下記のように書けばよい。
tags: ruby
---

## Immutable String in Ruby3

Ruby3 では文字列がデフォルトで immutable になるという大きな変更が予定されている。

> Ruby 3.0 では文字列リテラルをデフォルトで immutable （破壊的変更不可） にする、という方針が『決定』しました

via. [[Ruby] Ruby 3.0 の特大の非互換について - まめめも](http://d.hatena.ne.jp/ku-ma-me/20151004/p1)

この変更の背景としては上リンクに書いてある通り、Rubyの最適化のために文字列のいたるところに`.freeze`を付けてプルリクエストを投げる輩が大挙してきたことだ。

## Immutable String in Ruby2.3+

Ruby2.3 では既にこの Immutable String を有効にする機能が入っている。やり方はRubyファイルの行頭に次のようにマジックコメントを書けばよい。

```rb
# frozen_string_literal: true
```

## frozen_string_literal の機能を試す

実際に試してみよう。`frozen_string_literal`の設定が入っているRubyコードと入っていないRubyコードの２つを用意して実行してみる。

### frozen_string_literal入りのコード

`string_with_frozen_option.rb`

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

### frozen_string_literal無しのコード

`string_without_frozen_option.rb`

```rb
5.times { puts "a".object_id }
```

### 結果

全て違う object_id が返ってくる。

```
$ ruby string_without_frozen_option.rb
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
...
70346229343820
70346229343820
70346229343820
70346229343820
70346229343820
```

つまり`WelcomeController`で定義された文字列だけが frozen されていることがわかる。

## mutableなStringを定義するにはどうしたらよい？

一度 `frozen_string_literal: true` のコードを入れると全ての文字列が`.freeze`されるので、下記のようなコードは`RuntimeError`となる。

```
# frozen_string_literal: true
str = "a"
str << "bc"
puts str
# => test.rb:3:in `<main>': can't modify frozen String (RuntimeError)
```

この場合の対処法としてはfreezeを解除したい文字列に対して、`.dup`を付けてやれば解決する。

```
# frozen_string_literal: true
str = "a".dup
str << "bc"
puts str
# => abc
```

## まとめ

Ruby3 の Immutable String に先駆けて、Ruby2.3 以上が前提の実行環境では積極的に`frozen_string_literal: true`の設定をしていくべき。

## 参考

- [Immutable strings in Ruby 2.3](https://wyeworks.com/blog/2015/12/1/immutable-strings-in-ruby-2-dot-3)
- [Feature #8976: file-scope freeze_string directive - Ruby trunk - Ruby Issue Tracking System](https://bugs.ruby-lang.org/issues/8976)
