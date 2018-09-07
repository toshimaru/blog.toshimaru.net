---
layout: post
title: 初めてのモブプログラミング体験
description: "モブプログラミングを初めてやってみたのでその感想。進め方 Driver一人 + Navigator数人 Driver: コードを書く人 Navigator: コードの方針を示す人、相談のる人、横から口出しする人 画面共有方法 プロジェクターに投影する Slack使って画面共有する
マシンは個々人の所有マシン回す形とした"
image: "/images/posts/mobprogramming.jpg"
tags: programming
---

モブプログラミングを初めてやってみたのでその感想。

## 進め方

- Driver一人 + Navigator数人
    - Driver: コードを書く人
    - Navigator: コードの方針を示す人、相談のる人、横から口出しする人
- 画面共有方法
    1. プロジェクターに投影する
    2. Slack使って画面共有する
- マシンは個々人の所有マシン回す形とした

## 感想

- Slackでモブプロ専用チャンネル作ってそこで画面共有しながら進めるのが良かった
    - リモートの場合、でかいディスプレイが準備できない場合は、このやり方が良さそう
    - 画面共有されている側もペン使って相手画面に干渉できるのがよかった
        - 「ここのコードがおかしい」ってときの **ここ** が図示できる
- ああでもないこうでもないと言いながらやるワイワイ感はなんだかんだ楽しさがある
    - 一人で開発していると得られない **みんなでやっている感**
    - 少なくとも孤独感とは対極にある開発手法
- 時間にして2時間くらいで休憩を挟んだほうが良さそう
    - 交代要員で区切るなら「n人Driverが回ったら交代」みたいにするのも良さそう
    - 参加者は集中力を使うのでやりすぎ注意
        - ペアプロより人が多い分、そこまで疲れないと思いきや衆人環視の中作業を進めるのでなんだかんだ疲れる
- レビューが不要という開放感
    - ジュニアレベルの上げるPRはなんだかんだPR完成→レビュー→レビュー修正という打ち返しが複数回発生する
        - レビュワーもレビュイーも疲弊してしまう
    - その場で指摘して直せる
    - 実装方針のコンセンサスをとってからコードを書き始めるのであとから大幅な方針転換は発生しない
- Driverはきちんと自分が何を考え、何をしようとしているかをNavigatorに示すこと大事
    - 無言の時間をなるべく少なくする
    - NavigatorはDriverが間違った方向に行かないようにガイドする
- 技術検証・フィジビリ調査もみんなでやると情報共有になるし文殊の知恵理論で新たな実装アイディアも出てくるのが良い
    - Driverが実装、Navigatorがドキュメント読んで使い方をガイドって進め方もなかなか良かった
- 個々のマシンを回す形式はお互いの環境の違いを意識する必要がなくて楽だけど、この形式だとDriverスイッチコストが高すぎて気軽にDriver交代ができないので一長一短はありそう

## 参考書籍

現時点でペアプロ・モブプロについて一番よくまとまった本・特集だと思うので興味がある人は読んでみると良い。

<a href="https://www.amazon.co.jp/WEB-DB-PRESS-Vol-102-PRESS%E7%B7%A8%E9%9B%86%E9%83%A8/dp/4774194336/ref=as_li_ss_il?s=books&ie=UTF8&qid=1535914182&sr=1-1&keywords=web+db+%E3%83%A2%E3%83%96%E3%83%97%E3%83%AD&linkCode=li3&tag=toshimaru-22&linkId=247314e74b8dcb05c86ed16fc943a08a&language=ja_JP" target="_blank"><img border="0" src="//ws-fe.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=4774194336&Format=_SL250_&ID=AsinImage&MarketPlace=JP&ServiceVersion=20070822&WS=1&tag=toshimaru-22&language=ja_JP" ></a><img src="https://ir-jp.amazon-adsystem.com/e/ir?t=toshimaru-22&language=ja_JP&l=li3&o=9&a=4774194336" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
