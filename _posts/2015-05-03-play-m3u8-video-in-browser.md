---
layout: post
title: video.js で m3u8 形式の動画ファイルをブラウザで再生する
published: true
image: /images/posts/videojs.png
description: video.jsを使ってm3u8形式の動画ファイルをSafari以外のブラウザでも再生する方法を紹介します。
tags: video javascript
---

[video.js](https://github.com/videojs/video.js)を使ってm3u8形式の動画ファイルをSafari以外のブラウザでも再生する方法を紹介します。デモページは下のボタンから。

[Demo](http://toshimaru.net/demo/videojs-m3u8/){:.btn .btn-primary}

## 動作環境

下記環境で（現時点の最新版での）動作を確認しています。

* Chrome
* Safari
* Opera
* Safari

**※要Flash**

## 使うJSライブラリ
1. [videojs/video.js](https://github.com/videojs/video.js)
  * 基本素材。動画ファイルを様々なブラウザで再生できるようにする。
2. [videojs/videojs-contrib-media-sources](https://github.com/videojs/videojs-contrib-media-sources)
  * videoタグに動画ソースを流し込めるようにするvideo.jsプラグイン。
  * W3Cのドラフト仕様[Media Source Extensions](https://w3c.github.io/media-source/)が元のよう。
3. [videojs/videojs-contrib-hls](https://github.com/videojs/videojs-contrib-hls)
  * HLS(`m3u8`)形式の動画ファイルを再生可能にするvideo.jsプラグイン。
  * HLSに対応していないブラウザでもFlash技術を通すことで再生可能にしているよう。

## Usage

全体HTMLファイルはこんな感じ。

{% highlight html %}
<!DOCTYPE html>
<html>
  <head>
    <title>Video.js m3u8</title>
    <link href="css/video-js.css" rel="stylesheet">
    <script src="//cdnjs.cloudflare.com/ajax/libs/video.js/4.12.5/video.js"></script>
    <script src="js/videojs-media-sources.js"></script>
    <script src="js/videojs.hls.min.js"></script>
  </head>
  <body>

    <h1>Video.js m3u8 demo page</h1>
    <video id="test" class="video-js vjs-default-skin" height="300" width="600" controls>
      <source src="//solutions.brightcove.com/jwhisenant/hls/apple/bipbop/bipbopall.m3u8" type="application/x-mpegURL" />
    </video>

    <script>
      var player = videojs('test');
      player.play();
    </script>

  </body>
</html>
{% endhighlight %}

### CSS/JS読み込み

video.js, videojs-media-sources.js, videojs.hls.js 以外にもCSSを読み込まないとエラーが出て再生できなかったのでCSSも読み込むこと。

{% highlight html %}
<link href="css/video-js.css" rel="stylesheet">
<script src="//cdnjs.cloudflare.com/ajax/libs/video.js/4.12.5/video.js"></script>
<script src="js/videojs-media-sources.js"></script>
<script src="js/videojs.hls.min.js"></script>
{% endhighlight %}

### videoタグ

適当なクラスを持った`<video>`をタグに`height`, `width`を定義してやって、中に`type="application/x-mpegURL"`と`src`を持った`<source>`タグを入れてやる。

{% highlight html %}
<video id="test" class="video-js vjs-default-skin" height="300" width="600" controls>
  <source src="//solutions.brightcove.com/jwhisenant/hls/apple/bipbop/bipbopall.m3u8" type="application/x-mpegURL" />
</video>
{% endhighlight %}

### JavaScript

`videojs()`内にvideoタグのIDでplayerを生成してplay。

{% highlight js %}
var player = videojs('test');
player.play();
{% endhighlight %}

## 最後に

クロスオリジンな動画リソースを読み込むときは CORS(Cross-Origin Resource Sharing) の設定を適切にしてやる必要があることに注意！

---

## 追記

本記事を参考に書かれた下記の記事も参考になるかもしれません。

[Video.js を使って HLS形式の動画をストリーミング再生する - akiyoko blog](http://akiyoko.hatenablog.jp/entry/2015/08/11/015852)
