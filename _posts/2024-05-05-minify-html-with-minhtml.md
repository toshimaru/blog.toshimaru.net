---
layout: post
title: minhtmlを使ってHTMLをminifyする
image: "/images/posts/minhtml/og.png"
hideimage: true
description: このブログの静的HTMLはJekyllによって生成されている。Jekyllで生成されているHTMLをminifyしてHTMLサイズを小さくしたい。minifyするには、wilsonzlin/minify-htmlを使うのが良かった。
tags: html
---

## TL;DR

静的なサイトのHTMLをminifyするには、[wilsonzlin/minify-html](https://github.com/wilsonzlin/minify-html/)を使うのが良かった。

## やりたいこと

このブログの静的HTMLはJekyllによって生成されている。Jekyllで生成されているHTMLをminifyしてHTMLサイズを小さくしたい。

## 最初に考えたこと

最初はjekyllのプラグインでminifyできないかを考えたが、下記の理由につき断念。

- 良さそうなプラグインがないこと
- Jekyll内のロジックの複雑性が増すこと
- 静的データの生成時間が増すこと

## minify-html を使う

結局のところSSGは静的サイトを吐き出しているだけなので、吐き出した結果のHTMLを後処理としてminifyできればOK。

ということでそういう用途であれば[wilsonzlin/minify-html](https://github.com/wilsonzlin/minify-html/)が良さそうなことがわかった。

決め手となったポイントは下記。

- Rust実装で高速
- CLIツールとして利用可能

## minify-html を GitHub Actions に組み込む

GitHub Actionsを使ってこのサイトはデプロイしているので、デプロイのビルドステップにて `minhtml`をかますようにすればOK.

具体的には、`jekyll build`した後に`minhtml`のリリースバイナリを取得し、静的データが格納されているディレクトリ（`_site`）に対してminify処理を施す。

GitHub Actionsのビルドステップは下記のようになる。

```yaml
  - name: Jekyll Build
    run: bundle exec jekyll build
    env:
      JEKYLL_ENV: production
  - name: minify HTML
    run: |
      wget -O minhtml -q https://github.com/wilsonzlin/minify-html/releases/download/v0.15.0/minhtml-0.15.0-x86_64-unknown-linux-gnu &&
        chmod +x minhtml &&
        ./minhtml --do-not-minify-doctype --keep-spaces-between-attributes --ensure-spec-compliant-unquoted-attribute-values _site/**/*.html _site/*.html
  - name: Upload artifact
    uses: actions/upload-pages-artifact@v3
```

そのままだと、[The W3C Markup Validation Service](https://validator.w3.org/)で検証すると不正なHTMLが出力されるので、下記のオプションをつける必要があった。

- `--do-not-minify-doctype`
- `--keep-spaces-between-attributes`
- `--ensure-spec-compliant-unquoted-attribute-values`

## まとめ

SSG（静的サイト生成）で生成したHTMLをminifyするには、[wilsonzlin/minify-html](https://github.com/wilsonzlin/minify-html/)が便利だった。
