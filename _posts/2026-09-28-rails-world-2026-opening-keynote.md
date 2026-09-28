---
layout: post
title: DHH が Rails を捨てた日
description: Rails の生みの親である DHH が Rails World 2026のキーノートで語った内容が、いろいろと思うところがあったので"ペン"を取る。
tags: rails
image: "/images/posts/railw-world-2026.png"
hideimage: true
---

Rails の生みの親である DHH が Rails World 2026のキーノートで語った内容が、いろいろと思うところがあったので"ペン"を取る。

<iframe style="width: 100%; max-width: 720px; aspect-ratio: 16 / 9; border: 0;" src="https://www.youtube.com/embed/vDjW_dRyKXY?si=Iz-LKSU9eje8TphK" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

トークの核心部分のサマリとしてはこうだ。

> - 2025年11月、[Opus 4.5 リリース](https://www.anthropic.com/news/claude-opus-4-5)は、AI開発時代の転換点だった。
> - AIを使うか使わないかで、生産性に100〜1000倍の差が出る。
> - お前ら、ペンを置け。手でコードを書く時代は終わった。
> - 今の俺にとって、最高のプログラミング言語はもはや Ruby ではない。英語（=自然言語）だ。
> - 実際 HEY の次期バージョンでは、コードを一行も書かず、フロントエンドをネイティブ化、バックエンドのRust化を実現したぜ。
> - 俺はプロのエンジニアは辞めたんやで。今はプロのビルダー（Maker）や。
> - 変化を受け入れろ。悲観するな。未来は明るいぞ。

内容についてはなんてことはない、AI驚き屋たちが日々Xで騒いでいる内容と一緒だ。なんら新規性のない話。

ではなぜここまで燃えているのか？ それは、第一にDHHのアジテーターとしての能力の高さ故であろう。クソ煽り散らかしている。第二にこのトークが行われた舞台が Rails World のオープニング・キーノートであったためだ。

信じられるだろうか。年一回開催の Rails コミュニティの祭典のオープニングで Rails の話がほとんど出てこない。一時間のキーノートのうち、Ruby/Rails の言及があったのは正味2、3分程度だろうか。昨年の[Rails World 2025 のキーノート](https://www.youtube.com/watch?v=gcwzWzC7gUA)はそんなことはなかった。AIテクノロジーは僅か一年間で彼をすっかり変えてしまった。

## Rails is NOT dead

この様子を受けて "Rails is dead" と言いたくなる気持ちもわかるが、それは性急というものだろう。同イベントで行われた [Matz との対談](https://www.youtube.com/watch?v=IEOqgPfGLQ8)では、DHHは以下のように発言している。

> 「俺は今でも新しいアプリケーションはRailsで書き始める。人気が爆発したときに、それをRustでも何でも別の言語に書き換えればいいのさ。」（筆者訳）

話題になったキーノートでもAIの礼賛はあるものの、Ruby/Rails を直接的に貶めるような発言は全くない。Ruby は死んでいないし、Rails も死んでいない。

## DHH は Rails に興味を失っている？

それでは何故、"Rails is Dead"のような言説が生まれてくるのか？ それはDHHが Ruby on Rails にもはや興味を失っているように見えるからだろう。

ここに、興味深い事実がある。以下は [Rails リポジトリ](https://github.com/rails/rails/)におけるDHHの最終コミットだ。

```console
$ git log -1 --stat --author="David Heinemeier Hansson"
commit 2533c938acb97c2b44e6600fc0d35962e7ba9c7d
Author: David Heinemeier Hansson <david@hey.com>
Date:   Sun Dec 28 08:34:49 2025 -0800

    Add `ActionDispatch::Request#bearer_token` to extract the bearer token from the Authorization header (#56474)

 actionpack/CHANGELOG.md                        |  5 +++++
 actionpack/lib/action_dispatch/http/request.rb |  5 +++++
 actionpack/test/dispatch/request_test.rb       | 32 ++++++++++++++++++++++++++++++++
 3 files changed, 42 insertions(+)
```

2025年12月28日。興味深いのは、このタイミングがDHHが"AIエージェントの大転換点"と称した Opus 4.5 のリリース時期と符合していることだ。少なくとも2026年になってから、 DHH は一度も Rails に直接コミットしていない。正直、僕には DHHが Rails に興味を失ったように見える。DHH は Ruby on Rails 開発のレールを降りた。

## AI 時代、 Ruby on Rails の優位性は？

僕自身も Opus 4.5 のリリースタイミングが、真のAIコーディングエージェント時代の幕開けだと思っている。それまでのAIは、おもちゃでしかなかった。よくミスるし、嘘をつく。ちょっと難しい作業をやらせると、プロンプトで正しくガイドしないと直ぐに道を外す。だったら自分で書いたほうが早い――それが Opus 4.5 登場以前の僕のAIの印象だった。

Opus 4.5 がリリースされて話題になったとき、DB変更を含むそこそこ難しそうな中サイズのタスクを任せてみた。planが出てくる、90点の計画だ。問題ない。実装を任せてみる。自分でやると最低一週間はかかりそうな実装が、Opusは15分で終わらせた。仕上がった Pull Request はコード変更、テスト追加、DB変更をきちんと含んでいた。70点の実装だ。合格点ではある。

今よりもう少し未来のAIコーディングエージェントを想像してみよう。仮にまったく手でコードを書かず、目でコードを読まない時代になったとして、人間の尺度によって選定されたプログラミング言語は意味があるだろうか？ もし関係ないのだとしたら、処理速度が速く、メモリフットプリントが少さく、堅牢性の高い静的型付けの言語が選定されるのではないか？ そこに Ruby on Rails の優位性はあるだろうか？

DHHはAI時代のプログラミング言語として Rust を推している。しかし Rust という言語選定に深い意味はないだろう。最も高速で省メモリで動く言語が Rust だっただけだ。現に DHH は Rust を止めて、アセンブリ言語まで手を出しはじめている。

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I ported the Omarchy screensaver engine (ttfx) from Rust to x86-64 assembler, and it&#39;s up to 17x faster!! One-shot translation by Opus 5.5. We keep drilling until the agentic drill bit hits bedrock! <a href="https://t.co/SFJXcquMip">https://t.co/SFJXcquMip</a> <a href="https://t.co/ZpsAJS7vvl">pic.twitter.com/ZpsAJS7vvl</a></p>&mdash; DHH (@dhh) <a href="https://x.com/dhh/status/2103595410921279635?ref_src=twsrc%5Etfw">September 25, 2026</a></blockquote> <script async src="https://platform.x.com/widgets.js" charset="utf-8"></script>

（ちなみに僕自身は AI 時代の言語として、堅牢性がありつつ高速で可読性もある Go が現時点の良い落とし所だとは思っている）

## アンラーニングし、AI時代に適応していく

正直、残念じゃないといえば嘘になる。日々 Ruby on Rails のコードを書いて飯を食っている一介のエンジニアとしては、「After AIの世界で、今年はどんな花火をDHHが打ち上げてくれるのだろう」とワクワク楽しみに待っていた。しかし花火はついぞ打ち上がらなかった。とても悲しいことだ。

一方で、DHHは我々に裏のメッセージを突き付けたと僕は思っている。それは、「変化を受け止めろ。アンラーニングせよ。」というメッセージだ。

- DHH は Programmer から Maker にジョブチェンジした。
- DHH は Ruby でプログラミングすることを止め、英語でプログラミングをするようになった。
- DHH は macOS を捨て Omarchy に乗り換えた。
- HEY のフロントエンドは Web アプリから、Native アプリに書き換えられた。
- HEY のバックエンドは Ruby on Rails から、 Rust に書き換えられた。
- プログラマの生産性は10倍の差から、100倍以上の差になった。

「お前らは、どう変わるんだ？」DHHにそう問いかけられているような気がしてならない。

## 例えばレビューを止めてみる

残念ながら僕は明日から突然 Rust を使うようなハードコアな職場には生きていない。しかし、AI時代に古くなった開発のプラクティスは、早晩変える必要があるだろう。

例えば、僕の今働いている会社の開発チームでは、一部の Pull Reqeust のコードレビューを止める活動を始めた。その話は今年のYAPCのトークに採択していただいたので、DHHよりは幾分スケールの小さい話ではあるが、アンラーニングの具体例として話せたらいいなと思っている。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">2026/11/29 13:25〜 ＠ Track C です。 <a href="https://t.co/bfU5jozteZ">https://t.co/bfU5jozteZ</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://x.com/toshimaru_e/status/2104610647229276557?ref_src=twsrc%5Etfw">September 28, 2026</a></blockquote>

## DHH、日本襲来

そして今年の Kaigi on Rails には、DHH が来る。今回のRails Worldの内容を踏まえると、正直 Rails どストレートな内容は期待できないであろう。しかし、タイトルから察するいに彼が見据える未来については十分に語られるであろう。僕も参加予定なので、現地で見届けようと思う。

<blockquote class="twitter-tweet" data-cards="hidden"><p lang="en" dir="ltr">DHH&#39;s keynote is titled &quot;Where the tracks go next&quot;. <a href="https://t.co/yDv40mfVt3">https://t.co/yDv40mfVt3</a> <a href="https://x.com/hashtag/kaigionrails?src=hash&amp;ref_src=twsrc%5Etfw">#kaigionrails</a></p>&mdash; Kaigi on Rails (@kaigionrails) <a href="https://x.com/kaigionrails/status/2103098323708354902?ref_src=twsrc%5Etfw">September 24, 2026</a></blockquote>
