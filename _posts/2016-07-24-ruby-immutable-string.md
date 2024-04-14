---
layout: post
title: Ruby2.3で導入されたfrozen_string_literalマジックコメントでImmutable Stringを実現する
description: Ruby3 では文字列がデフォルトで immutable になるという大きな変更が予定されている。この変更の背景としては上リンクに書いてある通り、Rubyの最適化のために文字列のいたるところ.freezeを付けてプルリクエストを投げる輩が大挙してきたことだ。Ruby2.3 で既にこの Immutable String を有効にする機能が入っている。やり方はRubyファイルの行頭に下記のように書けばよい。
last_modified_at: 2022-05-19
image: /images/posts/frozenstring.jpg
tags: ruby
toc: true
---

## Immutable String in Ruby3

~~Ruby3 では文字列がデフォルトで immutable になるという大きな変更が予定されている~~（**追記あり**）。

> Ruby 3.0 では文字列リテラルをデフォルトで immutable （破壊的変更不可） にする、という方針が『決定』しました

via. [[Ruby] Ruby 3.0 の特大の非互換について - まめめも](https://mametter.hatenablog.com/entry/20151004/p1)

この変更の背景としては引用リンクに書いてある通り、Rubyの最適化のために文字列のいたるところに`.freeze`を付けてプルリクエストを投げる輩が大挙してきたことだ。

### 追記（2019-08-07）

{% include warning.html title="" text="「Ruby3 では文字列がデフォルトで immutable になる」と書いたが、「Ruby3 では文字列をデフォルトで immutable にはしない」という決定がMatzによってなされた。" %}

> So I officially abandon making frozen-string-literals default (for Ruby3).

via. [Feature #11473: Immutable String literal in Ruby 3 - Ruby master - Ruby Issue Tracking System](https://bugs.ruby-lang.org/issues/11473)

したがって、**Ruby3以降も文字列を immutable にしたければ、引き続き`frozen_string_literal: true`のマジックコメントが必要**となる。

---

## Immutable String in Ruby2.3+

実は Ruby2.3 で既にこの Immutable String を有効にする機能が入っている。やり方はRubyファイルの行頭に次のように`frozen_string_literal: true` とマジックコメントを書けばよい。

```rb
# frozen_string_literal: true

frozen_string = "This string is frozen!"
```

## frozen_string_literal の機能を試す

実際に試してみよう。`frozen_string_literal`の設定が入っているRubyコードと入っていないRubyコードの２つを用意して実行してみる。

### frozen_string_literal入りのコード

`string_with_frozen_option.rb`

```rb
# frozen_string_literal: true
5.times { puts "a".object_id }
```

実行すると全て同じ `object_id` が返ってくる。

```console
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

実行すると全て違う `object_id` が返ってくる。

```console
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

つまり`frozen_string_literal`が書かれた`WelcomeController`上で定義された文字列だけが`freeze`されていることがわかる。

## mutableなStringを定義するにはどうしたらよい？

一度 `frozen_string_literal: true` のコードを入れると全ての文字列が`.freeze`されるので、下記のようなコードは`RuntimeError`となる。

```rb
# frozen_string_literal: true
str = "a"
str << "bc"
puts str
# => test.rb:3:in `<main>': can't modify frozen String (RuntimeError)
```

### 方法1: String#dup

この場合の対処法としてはfreezeを解除したい文字列に対して、`.dup`を付けてやれば解決する。

```rb
# frozen_string_literal: true
str = "a".dup
str << "bc"
puts str
# => abc
```

### 方法2: String#+@

あるいは、`String#+@`を使って下記のようにも書ける。

```rb
# frozen_string_literal: true
str = +"a"
str << "bc"
puts str
# => abc
```

こちらのほうが`dup`するよりも[パフォーマンスが優れている](https://gist.github.com/k0kubun/e3da77cae2c132badd386c96f2de5768)ので、こちらの書き方のほうがベターである。

## まとめ

Ruby3 の Immutable String に先駆けて、Ruby2.3 以上が前提の実行環境では、積極的に`frozen_string_literal: true`のマジックコメント設定をしていくべき。

## 参考

- [Immutable strings in Ruby 2.3](https://wyeworks.com/blog/2015/12/1/immutable-strings-in-ruby-2-dot-3)
- [Feature #8976: file-scope freeze_string directive - Ruby trunk - Ruby Issue Tracking System](https://bugs.ruby-lang.org/issues/8976)
- [Perfect Frozen String Literal - Qiita](https://qiita.com/k0kubun/items/1c3e605645ba5ff683a1)
