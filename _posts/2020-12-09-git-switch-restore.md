---
layout: post
title: git switch養成ギプス
description: "git 2.23 にて git switch, git restore というコマンドが導入されたことはみなさん既にご存知のことかと思います。一方、まだgit switchに移行しきれていないという人も多くいるのではないかと思います。実際、私の周囲でも今もgit checkoutを使っている人をちらほら見るので、git switchに移行していくためのコツを書いてみます。"
image: "/images/posts/git-switch.png"
tags: git
---

本記事は[Git Advent Calendar 2020](https://qiita.com/advent-calendar/2020/git) 9日目の記事です。

git 2.23 にて `git switch`, `git restore` というコマンドが導入されたことはみなさん既にご存知のことかと思います。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">One of our favorite open source projects has a big update... Git 2.23 is here!<br><br>Read all about the latest release and new features ✨<a href="https://t.co/fpQICF8Onc">https://t.co/fpQICF8Onc</a></p>&mdash; GitHub (@github) <a href="https://twitter.com/github/status/1162474366380269568?ref_src=twsrc%5Etfw">August 16, 2019</a></blockquote>

雑に要約すると「`git checkout`に機能もたせすぎてわかりにくくなっちゃったから、`git switch`, `git restore`でわかりやすくしたよ！」ってことだと思います。

一方、まだ`git switch`に移行しきれていないという人も多くいるのではないかと思います。実際、私の周囲でも今も`git checkout`を使っている人をちらほら見るので、`git switch`に移行していくためのコツを書いてみます。

## 結論

**`switch` のaliasを設定しろ、そして`checkout`のaliasを捨てろ**

## git checkout only時代

`checkout`というコマンドは長ったらしいのでaliasを設定して運用していたのではないでしょうか。

僕の場合、下記のようにaliasを設定しました。

```
# ~/.gitconfig
[alias]
  co = checkout
```

ただこれだと `git checkout`をそのまま便利に使い続けてしまうので、思い切ってこいつを削除してしまうと良いかと思います。

もしくは下記のようにメッセージ出すとかでもOK。

```
# ~/.gitconfig
[alias]
  co = !echo "Use git switch/restore instead!"
```

## git switch時代

`git switch` を使いやすくするために下記のようなaliasを設定します。

```
# ~/.gitconfig
[alias]
  sw = switch
  swc = switch -c
```

こうすることでcheckoutコマンドが下記のように生まれ変わります。

### main branch へ切り替え

```console
$ git checkout main
```

```console
# sw = switch
$ git sw main
```

### main branch から hoge branch 作成

```console
git checkout -b hoge main
```

```console
# sw = switch -c
g swc hoge main
```

## 余談

`git restore`に対する良いaliasは今のところ見つかっていません。`git reset`とalias的に名前空間かぶつかるのでまだ良い命名できていないんですよね。
