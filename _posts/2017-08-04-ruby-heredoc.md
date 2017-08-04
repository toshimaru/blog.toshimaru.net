---
layout: post
title: Rubyのヒアドキュメントの書き方いろいろ
description: Rubyの覚えてそうで覚えられないヒアドキュメントの書き方をまとめてみたいと思います。 <<識別子 これがRubyのヒアドキュメントの基本型となります。識別子であるEOSの始点の<<EOSから次に出てくるEOSまでの囲まれている部分が文字列となります。
tags: ruby
toc: true
---

Rubyの覚えてそうで覚えられないヒアドキュメントの書き方をまとめてみたいと思います。

## \<\<識別子

これがRubyのヒアドキュメントの基本型となります。識別子である`EOS`の始点の`<<EOS`から次に出てくる`EOS`までの囲まれている部分が文字列となります。

```rb
def hello
  puts <<EOS
    Hello,

    World!
EOS
end

hello
#    Hello,
#
#    World!
```

上記のコードのコメントアウトされている箇所が定義した`hello`メソッドの出力結果となります。

## \<\<-識別子

上記のコードは終端の`EOS`の位置が気に食わないですか？　たしかにdef~endの中で一段ネストさせたいですね。`-`（ダッシュ）を識別子の手前に置けば、こんな書き方が可能です。

```rb
def hello
  puts <<-EOS
    Hello,

    World!
  EOS
end

hello
#    Hello,
#
#    World!
```

これで終端の`EOS`がメソッドの内部でネストされて可読性が上がりましたね。

## \<\<~識別子

でもちょっと待って下さい。本当にほしい文字列は先頭に空白のない文字列だったんです。でも安心してください、Ruby2.3以降は`~`（チルダ）を識別子の手前に置いてこう書けるんです。

```rb
def hello
  puts <<~EOS
    Hello,

    World!
  EOS
end

hello
#Hello,
#
#World!
```

これでHelloという文字列の手前にあるネストの空白も消してくれました。

## 豆知識. GitHub Syntax Highlight

下記のようにGitHub上にてヒアドキュメントの識別子にsyntaxの指定をすると、GitHub syntax highlightが効くようになります。

```rb
def a
  doc = <<-RUBY
    def hello
      puts "Hello World!"
    end
  RUBY
end
```

![heredoc](/images/posts/heredoc_rb.png)

## 参考

- [リテラル (Ruby 2.4.0) ヒアドキュメント (行指向文字列リテラル)](https://docs.ruby-lang.org/ja/latest/doc/spec=2fliteral.html#here)
- [Ruby のヒアドキュメントすごい - Qiita](http://qiita.com/Linda_pp/items/32fddbbe117cf03fef0f)
