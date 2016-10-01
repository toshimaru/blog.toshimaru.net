---
layout: post
title: jQueryのモダンなAjaxの書き方 〜jQuery.Deferredを用いたAjax〜
published: true
description: jQeuryにおけるモダンなAjaxの書き方を目指して、ステップ・バイ・ステップでコード付きで解説していきます。
tags: jquery javascript
---

本エントリは[軽めのjQuery Advent Calendar 2012](http://www.adventar.org/calendars/29)の14日目の記事として書きます。

軽めといいながら少し重めになってしまった感がありますが、初めてのAdvent Calendar参加ということでご勘弁を。。。

**※ Twitter API仕様変更によりTwitter APIを使ったコードは動かなくなっていることにご注意。**{:.red}

## jQuery 1.4以前の書き方

まずは、少し古めのコード、昔のjQueryの本とかでよく見る書き方。

```js
$.ajax({
    url: "ajax.html",
    success: function(data) {
       alert('success!!');
    },
    error: function(data) {
       alert('error!!!');
    }
});
```

## jQuery 1.5以上の書き方

1.5以降だと、`$.ajax()` は[jqXHRオブジェクト](http://api.jquery.com/jQuery.ajax/#jqXHR)を返すようになります。それを利用した書き方はこう。

```js
$.ajax({
    url: "ajax.html",
}).success(function(data){
    alert('success!!');
}).error(function(data){
    alert('error!!!');
});
```

成功時の処理と失敗時の処理が`ajax()`と並列に書くことができ、コード全体の見通しがぐっとよくなりましたね。

## jQuery 1.8以上の書き方

[公式リファレンス](http://api.jquery.com/jQuery.ajax/)いわく、

> Deprecation Notice: The jqXHR.success(), jqXHR.error(), and jqXHR.complete() callbacks will be deprecated in jQuery 1.8\. To prepare your code for their eventual removal, use jqXHR.done(), jqXHR.fail(), and jqXHR.always() instead.

つまり要約するとjQuery1.8から

* `success()` は `done()` に、
* `error()` は `fail()` に、
* `complete()` は `always()`を

代わりに使ってね、ってことです。ということで、`success()`,`error()`は使わない。

```js
$.ajax({
    url: "ajax.html",
}).done(function(data){
    alert('success!!');
}).fail(function(data){
    alert('error!!!');
});
```

あるいは`then()`を用いてこう書いてもいいでしょう。

```js
$.ajax({
    url: "ajax.html",
}).then(
    function(data){ alert('success!!'); },
    function(data){ alert('error!!');   }
);
```

`then()`の一個目の関数が成功時、二個目の関数が失敗時となります。

## 【発展編1】Deferredを用いた書き方

上述した例の中でさりげなくDeferredな書き方を使っていましたが、発展編ということでこのDeferredな書き方をさらに突き詰めてみましょう。

### deferredとは何か？

> jQuery.Deferred() introduces several enhancements to the way callbacks are managed and invoked. In particular, jQuery.Deferred() provides flexible ways to provide multiple callbacks, and these callbacks can be invoked regardless of whether the original callback dispatch has already occurred. jQuery Deferred is based on the CommonJS Promises/A design.
>
> jQuery.Deferred() はコールバック関数の管理、実行に改善をもたらします。具体的には、jQuery.Deferred()は複数のコールバックの実行を柔軟に行うことができ、これらのコールバック関数は、オリジナルのコールバックのディスパッチが発生しているかどうかにかかわらず実行されます。

要はコールバック関数の実行を延期(deferred)させて、`.then()` `.fail()` `.always()`なんかを使って柔軟にコールバックを管理、実行できるってことです（雑）。

詳しくは下記を読むとよいでしょう。

* [Creating Responsive Applications Using jQuery Deferred and Promises](http://msdn.microsoft.com/en-us/magazine/gg723713.aspx)
* [@tokkonoPapa](https://twitter.com/tokkonopapa)さんによる上記事の翻訳はこちら → [jQueryのDeferredとPromiseで応答性の良いアプリをー基本編](http://tokkono.cute.coocan.jp/blog/slow/index.php/programming/jquery-deferred-for-responsive-applications-basic/)

論より実践。deferredをうまく使ったAjaxコードを見てみましょう。

[jsfiddleでの実例はこちら](http://jsfiddle.net/toshimaru/yP58L/1/light/)

```js
var Twitter = {
    search: function(query) {
        var defer = $.Deferred();
        $.ajax({
            url: "http://search.twitter.com/search.json",
            data: {
                q: query,
                rpp: 50
            },
            dataType: 'jsonp',
            success: defer.resolve,
            error: defer.reject
        });
        return defer.promise();
    }
};

$('#button').on('click', function() {
    Twitter.search('jquery deferred').done(function(data) {
        console.log(data);
        $(data.results).each(function(k,v){
           $('#tweets').append(v.text + '<br/>');
        });
    });
});
```

見てわかるとおり、Deferredを使うことでtwitterの検索を行うAjax部分と結果取得時のイベント処理部分が分離できます。

これによりネストが深くならずに済み、コードの可読性が上がります。また、イベント処理部分のほうは `Twitter.search('query hoge').done(function(){//code...})` と書くだけですから、ajax部分を気にすることなく結果取得後のイベント処理に意識を集中して書くことができます。素晴らしいですネ。

## 【発展編2】$.when() を用いた書き方

`$.when()`を用いると複数のdeferredオブジェクトをまとめて管理できます。

[jsfiddleでの実例はこちら](http://jsfiddle.net/toshimaru/nNMae/)

```js
// "Twitter" のコードは同上
// var Twitter = { ... }

$('#button').on('click', function() {
    $.when(Twitter.search('jquery deferred'), Twitter.search('jquery when'))
    .then(function(data1, data2){
        console.log(data1);
        console.log(data2);
    });
});
```

when内のDeferredオブジェクト全ての処理が完了すると、その後の処理が発火します。複数のAJAX結果をまとめて処理したいってときに使えます。

---

いかがだったでしょうか？ Deferredオブジェクトを使うことでより楽しいAjaxライフが送れそうですね。ワクワクしますね。

本日紹介したコードは[gist](https://gist.github.com/4269484)にも上げております。

### 参考

* [jQueryのDeferredオブジェクトについて調べてみた](http://d.hatena.ne.jp/aoe-tk/20110515/1305471586)
* [jQueryのDeferredとPromiseで応答性の良いアプリをー実践編](http://tokkono.cute.coocan.jp/blog/slow/index.php/programming/how-happy-with-jquery-deferred-for-your-applications/)
