---
layout: post
title: Syntax HighlightされるcatコマンドをGoで作った
image: "https://user-images.githubusercontent.com/803398/63024853-00b18b80-bee3-11e9-853a-eea7e790a575.png"
description: "Goの習作としてSyntax Highlight可能な`cat`コマンドを作った。モチベーション 全く同じコンセプトのツールとしてccatがあるのだが、デフォルトのハイライト色が黒背景のターミナルだと見づらいという問題があった。 更に強力なcatコマンドとしてRust製のbatがあるのだが、これをccatとともに併用していて配色がとても美しい感じに仕上がっていたので「よし、じゃあGoで配色がいい感じのやつ作ってみるか」と思い立って作成開始したやつ。 ちなみにccatとの実装の違いでいうと、ccatはsynatax highlightにsourcegraph/syntaxhighlightを使っていて、今回作ったnyanはalecthomas/chromaを使っている。"
tags: go oss
---

Goの習作としてSyntax Highlight可能な`cat`コマンドを作った。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">夏休みの工作で作ったやつ。Go 製の Syntax Highlight な cat コマンド. | toshimaru/nyan: Colored `cat` command. <a href="https://t.co/lu1CL4YdDi">https://t.co/lu1CL4YdDi</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1161656766100230144?ref_src=twsrc%5Etfw">August 14, 2019</a></blockquote>

## モチベーション

全く同じコンセプトのツールとして[ccat](https://github.com/jingweno/ccat)があるのだが、デフォルトのハイライト色が黒背景のターミナルだと見づらいという問題があった。

更に強力な`cat`コマンドとしてRust製の[bat](https://github.com/sharkdp/bat)があるのだが、これを`ccat`とともに併用していて配色がとても美しい感じに仕上がっていたので「よし、じゃあGoで配色がいい感じのやつ作ってみるか」と思い立って作成開始したやつ。

ちなみに`ccat`との実装の違いでいうと、`ccat`はsynatax highlightに[sourcegraph/syntaxhighlight](https://github.com/sourcegraph/syntaxhighlight)を使っていて、今回作った`nyan`は[alecthomas/chroma](https://github.com/alecthomas/chroma)を使っている。

## 使ったGoライブラリ・サービスなど

### Goライブラリ

- パッケージ管理: [go modules](https://blog.golang.org/using-go-modules)
- CLIライブラリ: [cobra](https://github.com/spf13/cobra)
- Syntax Highlightライブラリ: [chroma](https://github.com/alecthomas/chroma)
- リリース管理: [goreleaser](https://github.com/goreleaser/goreleaser)
  - homebrew tapへのリリースも自動でやってくれている: [homebrew-nyan](https://github.com/toshimaru/homebrew-nyan)
- テストライブラリ: [testify](https://github.com/stretchr/testify)/assert

### サービス

- CI: [TravisCI](https://travis-ci.com)
- Code Coverage: [Code Climate](https://codeclimate.com)

## 今後の展望

- 今回CIはTravisで動かしたけど先日リリースされた[GitHub Actons(v2)](https://github.blog/2019-08-08-github-actions-now-supports-ci-cd/)が使えるようになったら乗り換えたい
- 行番号表示などの機能拡張も今後やっていきたい

## Goでツール書いてみた感想

- パッケージ管理の機能が言語としてサポートされたのは嬉しい（Go 1.11〜）
- プログラムのコンパイル、実行、テストなどすべてが早いので開発体験がとても良い
- 普段はRubyを使うことが多いが、書き味の良さではGoはRubyに負けるかもだけど、堅牢で高速なアプリケーションを書くにはGoが良い
- Goミュニティは日本でもとても活発だし、ライブラリのエコシステムも整っているのが素晴らしい
