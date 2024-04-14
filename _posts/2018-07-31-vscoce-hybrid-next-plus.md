---
layout: post
title: はじめてのVS Code Extension、Hybrid Next Plusテーマを公開しました
image: "/images/posts/vscode/hybrid.png"
description: "はじめてのVS code Extensionとしてybrid Next Plusというテーマを公開してみた。 きっかけ もともとVSCodeのデフォルトのテーマがいまいち好きになれなかった Vimでhybrid、Atomでhybrid nextというテーマを気に入っていたのでそのテーマをVSCodeでも使おうと思った 公開されているvscode-hybrid-nextを使おうと思ったが、少々気に食わない設定があった 同レポジトリにPRしようかと思ったがテーマのあて方がtmTheme形式だったため小回りが効かない感じになってた 自分でテーマを作った hybrid-next-plus"
tags: vscode oss
---

はじめてのVS code Extensionとしてybrid Next Plusというテーマを公開してみた。

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">初めてのVSCode ExtensionとしてThemeを作ってみた（Beta Version）| Hybrid Next Plus - Visual Studio Marketplace <a href="https://t.co/d8xWeLHQ51">https://t.co/d8xWeLHQ51</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1021918426426531840?ref_src=twsrc%5Etfw">July 25, 2018</a></blockquote>

## きっかけ

- もともとVSCodeのデフォルトのテーマがいまいち好きになれなかった
- Vimで[hybrid](https://github.com/w0ng/vim-hybrid)、Atomで[hybrid next](https://github.com/kaicataldo/hybrid-next-syntax)というテーマを気に入っていたのでそのテーマをVSCodeでも使おうと思った
- 公開されている[vscode-hybrid-next](https://github.com/wyze/vscode-hybrid-next/)を使おうと思ったが、少々気に食わない設定があった
- 同レポジトリにPRしようかと思ったがテーマのあて方が[tmTheme](https://www.sublimetext.com/docs/3/color_schemes_tmtheme.html)形式だったため小回りが効かない感じになってた
- 自分でテーマを作った [hybrid-next-plus](https://github.com/toshimaru/hybrid-next-plus)

## 参考テーマ

背景やサイドバーの設定は、[Atom One Dark](https://atom.io/themes/one-dark-ui)を参考にした。

![atom one dark](https://i.github-camo.com/af4a063b48fb691fb25e664ca8e0680a31f6f1e4/68747470733a2f2f636c6f75642e67697468756275736572636f6e74656e742e636f6d2f6173736574732f3337383032332f32363234363831382f30383235356237362d336364362d313165372d396636642d3661653365313661383961392e706e67)

:point_up: **【図】Atom One Dark(公式READMEより引用)**

シンタックスハイライトのカラーは、[hybrid](https://github.com/w0ng/vim-hybrid)、[hybrid next](https://github.com/kaicataldo/hybrid-next-syntax), [vscode-hybrid-next](https://github.com/wyze/vscode-hybrid-next/)を参考にしつつ一番しっくりくる色のあて方を選択した。

![hybrid next](https://raw.githubusercontent.com/kaicataldo/hybrid-next-syntax/master/screenshots/hybrid-next-screenshot-1.png)

:point_up: **【図】Atom Hybrid Next(公式READMEより引用)**

## 最後に

一応Markdown, Ruby, JSONファイルあたりはいい感じにSyntaxハイライトあたっていることを確認していますが、他の拡張子で不完全なところがあるかもなので何かありましたらPR/Issue報告お願いします 🙏

手前味噌にはなるけどなかなかいいテーマに仕上がっていると思いますのでよかったら使ってみてください。

## 追記

[VS Code Extensionの公開手順](/how-to-publish-vscode-extension/)を書きました。
