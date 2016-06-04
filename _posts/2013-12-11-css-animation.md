---
layout: post
title: CSS3アニメーションを使ってサイトをリッチに
published: true
image: /images/posts/css-animate/block.png
description: CSS Property Advent Calendar 2013の11日目の記事としてCSSアニメーションのプロパティを紹介をします。 なぜCSS3アニメーションなのか？ さて本ブログでもタイトルやアイキャッチ画像のイメージの表示にちょっとしたCSS3アニメーションを採用しています。ほんのちょっとのCSSの記述なんですがサイトがイイ感じにリッチに見えてとても気に入ってます。
tags: css
---

<style type="text/css">
@-webkit-keyframes anim {
    0%   { opacity: 0; }
    100% { opacity: 1; }
}
@keyframes anim　{
    0%   { opacity: 0; }
    100% { opacity: 1; }
}
.post-image  {
  -ms-animation: anim 2s infinite;
  -webkit-animation: anim 2s infinite;
  animation: anim 2s infinite;
}
</style>

[CSS Property Advent Calendar 2013](http://www.adventar.org/calendars/57)の11日目の記事としてCSSアニメーションのプロパティを紹介をします。

## なぜCSSアニメーションなのか？

さて本ブログでもタイトルやアイキャッチ画像のイメージの表示にちょっとしたCSS3アニメーションを採用しています。ほんのちょっとのCSSの記述なんですがサイトがイイ感じにリッチに見えてとても気に入ってます。

jQueryなんかでも[.animate()](http://api.jquery.com/animate/)を使えばアニメーションができますね。ではなぜCSS3アニメーションなのか？　そこからエントリを始めてみたいと思います。

### パフォーマンス的観点 CSS vs jQuery

DEV.OPERAにて[CSS3 vs jQueryアニメーションの比較](http://dev.opera.com/articles/view/css3-vs-jquery-animations/)が行われています。ここではjQueryとCSS3によるアニメーションどちらが優れているかがレポートされており、最終的な勝者はCSS3だとして記事を結んでいます。本比較において使われている[CSS3のアニメーションサンプル](http://devfiles.myopera.com/articles/10262/CSS3-300-boxes.html)と[jQueryのアニメーションサンプル](http://devfiles.myopera.com/articles/10262/jQuery-300-boxes.html)を私のChrome(Canary)上でも比較してみました。

肉眼でもCSSアニメーションのほうが綺麗に見える気がします。DevTools上でも実際、Rendering、Paintイベントをフィルターしてみたところ、実際jQueryのほうがイベントの粒度が荒いことが見て取れます。

####  1. CSSによるアニメーション
![比較１](/images/posts/css-animate/1.png)

![比較A](/images/posts/css-animate/A.png)

イベントが安定して滑らかに流れています。メモリ効率も良い感じ。

####  2. jQueryによるアニメーション
一方、jQueryはどうでしょうか。

![比較２](/images/posts/css-animate/2.png)

![比較B](/images/posts/css-animate/B.png)

イベントの流れの傾斜がCSSより緩やかで、たまに上画像のようにもたつくことがあります。メモリ効率も山状に上がってよろしくない感じです。

上記の結果からCSSアニメーションを使って良いシーンであれば、**パフォーマンス的にCSSはjQueryよりも優れている** と言えます。

### ブラウザ対応は？

CSS3プロパティだとブラウザ対応が心配なところ。[サポート状況はこんな感じ](http://caniuse.com/#search=keyframes)です。

![対応状況](/images/posts/css-animate/browser.png)

IEは10以降、それ以外のメインブラウザの最新版は対応済みですね。ベンダープレフィックスも`-webkit-`さえつければ大丈夫そうです。IE9以前を気にするかもしれませんが、[グレースフル・デグラデーション](http://www.adobe.com/jp/devnet/dreamweaver/articles/html5pack_css3_part6.html)の考え方で＜装飾＞という意味においてはCSSアニメーションプロパティはどんどん使っていい機能かと思います。

## CSSアニメーションの書き方

ではCSSアニメーションはどう書くか？　キーワードは`@keyframes`と`animation`の２つです。

    @keyframes <アニメーションの名前> {
        0% { /* 定義 */ }
        50% { /* 定義 */ }
        100% { /* 定義 */ }
    }

こんな感じで0%から100%にかけて特定のタイミングでのアニメーションスタイル定義を書いていきます。次にそのアニメーション名を使った`animation`をクラス内に加えます。

    .<class名> {
        animation: <アニメーションの名前> <秒数>s ;
    }

あとはこのクラス名をDOM内のアニメーションしたい要素に加えればOKです。

では具体例。実際に本記事タイトル下でフェードインさせている画像のCSSを見てみましょう。

    @-webkit-keyframes anim {
        0%   { opacity: 0; }
        100% { opacity: 1; }
    }
    @keyframes anim　{
        0%   { opacity: 0; }
        100% { opacity: 1; }
    }
    .post-image  {
      -ms-animation: anim 2s infinite;
      -webkit-animation: anim 2s infinite;
      animation: anim 2s infinite;
    }

透過度0から透明度1へのアニメーション（`anim`）を2秒（`2s`）毎にループ（`infinite`）させてます。このアニメーションは`post-image`クラスに適応されます。実際に使用の際は`-webkit-`プレフィックス付きの定義も必要なことに注意してください。

## どこからアニメーションの着想を得るか

といっても「アニメーションのCSSスタイル定義するの面倒くさい」とか「自分のやりたい動きをどう書けばいいかわからない」という人も多いかと思います。そんな人は[Animate.css](https://daneden.me/animate/)のページを見てみるとよいかと思います。

これらのアニメーションは全てCSSにて動いているのですが、使い回しの効きそうなCSSで表現できる典型的なアニメーションは大体網羅されていると思うので、ここからアニメーションスタイルをパクってくると良いかと思います（CSSのサイズを気にしないという方は`animate.css`をそのままサイトに持ってきてもいいですね）。

CSSコードは下記のコードから引っ張ってきてください。

[animate.css/animate.css at master](https://github.com/daneden/animate.css/blob/master/animate.css)

### 最後に

皆さんもCSSアニメーションをサイトのちょっとしたところに取り入れてサイトをリッチにみせてみてはいかがでしょうか。

ただ１つ注意したいのが、基本的に人の目は動いているものに行きやすく、過度なアニメーションの使用、または派手すぎるアニメーションの動きはユーザー体験を著しく下げるので「使いすぎ注意」ということを忘れずに。

### 参考
* [@keyframes - CSS / MDN](https://developer.mozilla.org/ja/docs/Web/CSS/@keyframes)
* [daneden/animate.css - GitHub](https://github.com/daneden/animate.css)
