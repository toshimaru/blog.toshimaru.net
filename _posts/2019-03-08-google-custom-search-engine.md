---
layout: post
title: Google Custom Searchのサイト設置方法
image: "/images/posts/cse/og.png"
description: サイトにGoogle Custom Searchを設定・設定しましたのでその手順をメモします。 Google Custom Search（カスタム検索エンジン）とは？ Google Custom Search（カスタム検索エンジン）はGoogleの検索アルゴリズムでサイト内検索の結果を表示してくれるサービスです。カスタム検索 と銘打っている通り、検索設定や検索結果のデザイン・レイアウトをカスタマイズすることが可能です。
tags: seo
toc: true
---

サイトにGoogle Custom Searchを設定・設定しましたのでその手順をメモします。

## Google Custom Search（カスタム検索エンジン）とは？

Google Custom Search（カスタム検索エンジン）はGoogleの検索アルゴリズムでサイト内検索の結果を表示してくれるサービスです。**カスタム検索** と銘打っている通り、検索設定や検索結果のデザイン・レイアウトをカスタマイズすることが可能です。

## Google Custom Searchのタグを取得手順

Google Custom Searchのタグの取得手順を説明していきます。

### 検索エンジンを追加

まずは検索エンジンを追加します。

![](/images/posts/cse/top1.png)

追加すると下記のような基本設定メニューと右側には検索フォームのプレビューが現れます。必要に応じて設定してください。基本的にはそのままでも大丈夫でしょう。

![](/images/posts/cse/2.png)

ちなみにAdsenseとアカウントを接続していれば収益化も可能なようです。今回はOffにしています。

![](/images/posts/cse/adsense.png)

### デザイン設定

左のメニューからデザインメニューを開けば、検索結果のレイアウトを選択することができます。今回は全幅を選択しました。

![](/images/posts/cse/design.png)

デフォルトでGoogleがいくつかのテーマを用意してくれています。特にこだわりなければデフォルトでいいでしょう。

![](/images/posts/cse/theme.png)

### デザインカスタマイズ

デザインの詳細なカスタムも可能です。下記のメニューからカラーコードを設定することが可能です。今回はブログの背景色（`F3F3F3`）と合わせます。本項目はサイトのテイストに合わせて変更してください。

![](/images/posts/cse/custom.png)

検索結果も本ブログの背景色（`F3F3F3`）に合わせておきます。

![](/images/posts/cse/custom2.png)

### コードを取得

「**保存してコードを取得**」すればコードが取得できます。

![](/images/posts/cse/code.png)

## コードをサイトに設置

さぁこれでコードが準備できました。では次にこのコードをサイトに貼ります。今回は`search.html`に下記のようにコードを貼ることにしました。検索表示したいエリアにコードをそのまま貼り付けただけです。

```html
<div id="search">
<script>
  (function () {
    var cx = '011796726412992573594:-wfuo7spt_k';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>
</div>
```

## 検索フォーム

検索フォームは下記のように作成することができます。

```html
<form id="search-form" action="/search" method="get">
    <input type="search" class="search-txt" name="q" placeholder="Search"/>
</form>
```

- `action`には上手順で作成したコードの貼ってあるページ先に設定してください。
- methodには`get`を設定してください
- 検索クエリは`q`で機能します

この検索フォームを使って下記のような検索結果が表示させることができれば成功です。

![](/images/posts/cse/result.png)

## 現在のウィンドウで検索結果を開く

そのままだと別ウィンドウで検索結果が開いてしまいます。同一ウィンドウで開くようにするためにはコード内のタグを下記のように変更すれば同一ウィンドウで開くことができるようになります。`linktarget="_self` の属性が追加されているのが変更点です。

```html
<gcse:search linktarget="_self"></gcse:search>
```

## 参考ドキュメント

- [Custom Search Element Control API  \|  Custom Search  \|  Google Developers](https://developers.google.com/custom-search/docs/element)
