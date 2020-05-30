---
layout: post
title: Roppongi.rb#8で「Make Rails Documents SEO(Search Engine Optimized)」を発表しました
image: "/images/posts/roppongirb8/og.png"
description: "Roppongi.rb #8にて「Make Rails Documents SEO(Search Engine Optimized)」と題して発表してきた。発表スライドは下記になる。発表では僕が過去に行ったいくつかのRails公式ドキュメントのSEO対応の紹介とともに、現在進めているプロジェクトであるrailsdoc.github.ioを紹介した。"
tags: presentation seo rails
last_modified_at: 2019-02-27
hideimage: true
---

[Roppongi.rb #8](https://roppongirb.connpass.com/event/118218/)にて「Make Rails Documents SEO(Search Engine Optimized)」と題して発表してきた。

## 発表スライド

<script async class="speakerdeck-embed" data-id="2238d7f3d662436b943b125a7b10fec1" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

## railsdoc.github.io

発表では僕が過去に行ったいくつかのRails公式ドキュメントのSEO対応の紹介とともに、現在進めているプロジェクトである[railsdoc.github.io](https://railsdoc.github.io/)を紹介した。

GitHub: [railsdoc/railsdoc.github.io: Rails API Documentation.](https://github.com/railsdoc/railsdoc.github.io)

## railsdoc.github.ioのゴール

- [api.rubyonrails.org](https://api.rubyonrails.org/)をSEO強くする
- [api.rubyonrails.org](https://api.rubyonrails.org/)を使いやすくする

下記はついでにできると良いなーと考えていること。

- フロントの技術を少しだけモダンに
  - [bootstrap](https://getbootstrap.com/)を使ってデザイン構成しやすくする
- GitHubといい感じの連携
- AMP対応もできると良さそう

## railsdoc.github.ioの今後

発表内で紹介したが今後については下記のように考えている。

- コードベース整備中 & 未実装箇所の実装
- folk版sdocじゃない独自のドキュメント生成gemを作りたい

## 紹介したPR/Issue

- [Introduce jekyll-seo-tag by toshimaru · Pull Request #88 · rails/weblog](https://github.com/rails/weblog/pull/88)
- [Add Jekyll SEO tag and Jekyll sitemap by benbalter · Pull Request #73 · rails/homepage](https://github.com/rails/homepage/pull/73)
- [Make Ruby on Rails Guides SNS-friendly by toshimaru · Pull Request #34860 · rails/rails](https://github.com/rails/rails/pull/34860)
- [No Rails 5 in apidock.com/rails · Issue #27633 · rails/rails](https://github.com/rails/rails/issues/27633)

## 紹介したRails公式ドキュメント

1. [rubyonrails.org](rubyonrails.org)
2. [weblog.rubyonrails.org](weblog.rubyonrails.org)
3. [guides.rubyonrails.org](guides.rubyonrails.org)
4. [api.rubyonrails.org](api.rubyonrails.org)

## その他

- 発表には[Deckset 2](https://www.deckset.com/)を使った（ずっとDeckset1使ってたけど2にUpdateした）
- 何かあればイシューに書いてほしい [github.com/railsdoc/railsdoc.github.io/issues](https://github.com/railsdoc/railsdoc.github.io/issues)
