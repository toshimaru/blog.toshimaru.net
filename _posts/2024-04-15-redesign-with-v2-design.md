---
layout: post
title: ブログをリニューアルしました
image: "/images/posts/renewal-2024.png"
description: お久しぶりの更新です。ブログをリニューアルしました。
tags: design
---

お久しぶりの更新です。ブログをリニューアルしました。

## お久しぶりです。

久しぶりのブログ更新です。

ブログのデザインをリニューアルしたいなーと思い立ち、リニューアルを推進するために自分自身にブログのデザインを刷新するまではブログを更新しないぞ、という制約をかけてました。

その過程で [TTIL](https://til.toshimaru.net/) なんていう雑メモ置き場的なサブ・ブログを初めてしまい、本家のこちらの更新をサボっておりました。

が、一念発起してブログをリニューアルしました。

## 技術スタック

ブログの技術スタック...という程大きな技術スタックの変化はないのですが、今回のリニューアルで使った技術を紹介します。

（🆕 が付いているのが今回のリニューアルでの新たな取り組み）

* Blog Engine: [Jekyll](https://jekyllrb.com/)
* Hosting: [GitHub Pages](https://pages.github.com/)
  * 開発中のホスティング: [Cloudflare Pages](https://pages.cloudflare.com/) (🆕)
* CSS: [Tailwind CSS](https://tailwindcss.com/) (🆕)
  * Base Theme: [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) (🆕)
  * 本文のスタイル: [tailwindlabs/tailwindcss-typography](https://github.com/tailwindlabs/tailwindcss-typography) (🆕)

[tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog)が好みのシンプルでスッキリとしたデザインに仕上がっていたので、それをベースに Jekyll に合わせて改変を加えでデザインを仕上げた。

最初はお手製の[toshimaru/jekyll-theme-classless-simple](https://github.com/toshimaru/jekyll-theme-classless-simple)を使ってデザイン組んでいたけど、今後のカスタマイズ性を考えて Tailwind CSS で組む方向に方針転換した。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">個人ブログのレイアウトを TailwindCSS で組んでみるなどしてみた。個人ブログくらいの規模なら別に使わなくてもいい気はしたけど、 TailwindCSSのエコシステムに乗っかっていることで得られるであろう今後のメンテナンスのしやすさはかなり良さそうという実感を得た。</p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1769237011154747452?ref_src=twsrc%5Etfw">March 17, 2024</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

HostingはGitHub Pagesと基本は変わっていないが、開発中のPrivateなホスティング（ログインしたら開発中のブログv2が閲覧できる）は Cloudflare Pages を使った。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Private Repo で GitHub Pages が使えなかったのでCloudflare Pages でサイト構築した » GitHub Pages は（GitHub 無料プランにおいて）プライベートリポジトリでは運用できない <a href="https://t.co/4vjiqkGffl">https://t.co/4vjiqkGffl</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1652841524881936385?ref_src=twsrc%5Etfw">May 1, 2023</a></blockquote>

他にも検討したこととして、ブログエンジンを Jekyll から卒業して Next.js、Hugo、Astro あたりに乗り換えることを検討したが、コアライブラリのアップデート追従でエターナる未来が見えたので、一番慣れている Ruby 製の Jekyll で落ち着いた（加齢とともに新たな技術的チャレンジが腰が重くなる今日この頃）。

## 変更点・工夫ポイント

* Google Analytics タグを GA4 タグにアップデート
  * やっと重い腰を上げて GA4 にアップデートした...けど、GA4めっちゃわかりにくくない？😱
  * [\[GA4\] Google タグ マネージャーで Google アナリティクス 4 を設定する - タグ マネージャー ヘルプ](https://support.google.com/tagmanager/answer/9442095?hl=ja)
  * [Google Tag Assistant](https://tagassistant.google.com/) も活用した
  * FYI: GAのChrome拡張（[Page Analytics (by Google)](https://chromewebstore.google.com/detail/page-analytics-by-google/fnbdnhhicmebfgdgglcdacdapkcihcoh)）はもう Deprecated らしい
* ダークモードに対応
  * JavaScirpt を使ってワンボタンで切り替えられるように
  * 最初は切り替えをさせずにブラウザのテーマをベースにスイッチするようにしようかと思ったけど、気分によってライトモード・ダークモードが切り替えられたほうが嬉しいので切り替え可能にした
* ブログタイトルを変えた
  * ゼロ年代の慣習としてブログタイトルをオシャレなもにする、というものがあるがもはや今となってはそれは死んだ文化になっているので簡素なものにした
  * (before)Hack Your Design 👉 (after)toshimaru/blog
* Jekyll を Ruby 3.3 でビルドするように変更
* Tailwind CSS導入に伴い、リポジトリに`package.json`を導入
* ソースコードは旧デザインと同じリポジトリを使って公開
  * [toshimaru/blog.toshimaru.net](https://github.com/toshimaru/blog.toshimaru.net)
  * 積年のコミットログで重くなっていたので、これを機に過去のデザインは別リポジトリにアーカイブし、新デザインでゼロからコミットログを積むことにした

## 今後対応したいこと

下記あたりは今後のアップデートで対応したいと思っています。

* [ ] 記事シェアボタン設置
  * [x] X(ex-Twitter)
  * [ ] Hatebu
* [ ] AboutページをGitHubのプロフィールを使いまわしているのでブログ用に作成したい
* [ ] フッターのアップデート
* [ ] コメントフォーム設置 ([giscus](https://giscus.app/)使いたい)
* [ ] 検索ページが味気ないのでアップデートしたい
* [ ] タグページを追加
* [ ] SVGロゴの刷新
  * [x] favicon用のSVGを作成
* [ ] ダークモードスイッチャーをオシャレに
* [ ] Google Adsense を再導入
* [ ] OG画像をいい感じに生成するやつ
* [x] HTML/CSSの最適化

## ブログ更新していくぞ

リニューアルもしたことだし、わりと長めの文章や技術記事とかはこちらを更新していこうと思います。💪

日々の学びを綴るサブブログもよろしくです 👉 [TTIL](https://til.toshimaru.net/)

## 参考資料

- Google Analytics 4
  - [Googleアナリティクス4とは？アップデート情報を完全解説！](https://digitalidentity.co.jp/blog/analytics/google-analytics/ga4.html)
  - [\[GTM\] 新しいGA4のタグ設定の仕方 \| アユダンテ株式会社](https://ayudante.jp/column/2023-10-19/17-00/)
- Tailwind情報
  - [Installation - Tailwind CSS](https://tailwindcss.com/docs/installation)
  - [Tailwind Play](https://play.tailwindcss.com/)
  - Tailwind CSS 導入時のメモ: [2024-03-29 TailwindCSS 入門 \| TTIL](https://til.toshimaru.net/2024-03-29)
