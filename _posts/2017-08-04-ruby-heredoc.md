---
layout: post
title: Rubyのヒアドキュメントの書き方いろいろ
description: "Rubyの覚えてそうで覚えられないヒアドキュメントの書き方をまとめてみたいと思います。 <<識別子 これがRubyのヒアドキュメントの基本型となります。識別子であるEOSの始点の<<EOSから次に出てくるEOSまでの囲まれている部分が文字列となります。"
tags: ruby
toc: true
last_modified_at: 2020-08-08
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
```

**出力結果：**

```
    Hello,

    World!
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
```

**出力結果：**

```
    Hello,

    World!
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
```

**出力結果：**

```
Hello,

World!
```

これでHelloという文字列の手前にあるネストの空白も消してくれました。

---

## Tips① GitHub Syntax Highlight

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

## Tips② 引数内のヒアドキュメントの書き方

下記のクエリの実行もヒアドキュメントを使って見やすく書き直すこともできます。


```rb
Post.find_by_sql("SELECT p.title, c.author FROM posts p, comments c WHERE p.id = c.post_id")
```

(引用元: [ActiveRecord::Querying \| RailsDoc](https://railsdoc.github.io/classes/ActiveRecord/Querying.html#method-i-find_by_sql))


```rb
Post.find_by_sql(<<~SQL)
  SELECT p.title, c.author
  FROM posts p, comments c
  WHERE p.id = c.post_id
SQL
```

ポイントとしては引数に置いたヒアドキュメントの識別子を丸括弧で一度閉じることができるという点です。

## 参考

- [リテラル (Ruby 2.7.0 リファレンスマニュアル)](https://docs.ruby-lang.org/ja/latest/doc/spec=2fliteral.html#here)
- [Ruby: ヒアドキュメントの引数やメソッド呼び出しは「開始行」に置こう｜TechRacho（テックラッチョ）〜エンジニアの「？」を「！」に〜｜BPS株式会社](https://techracho.bpsinc.jp/hachi8833/2019_05_30/74930)
