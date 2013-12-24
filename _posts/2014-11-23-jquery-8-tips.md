---
layout: post
title: jQuery使いが知っておくべき8つのjQueryテクニック
published: true
description: jQuery Advent Calendar 2013の23日目の記事となります。今回はjQuery使いとして覚えておきたいテクニックを個人的に8つピックアップしてみました。
tags: jquery
---

[jQuery Advent Calendar 2013](http://www.adventar.org/calendars/135)の23日目の記事となります。今回はjQuery使いとして覚えておきたいテクニックを個人的に8つピックアップしてみました。

日本との時差の関係で更新が24日になっているでしょうが気にせずいきましょう。

##1. jQuery 2.x vs 1.x

jQueryには最新版の2.x系と1.x系があります。さてどのようにバージョンを選べばいいでしょう？ 2.x系からの大きな変更点としてはIE6/7/8のサポート廃止です。大して1.x系はそれらのブラウザをサポートしています。

よってまとめるとIE6/7/8をサポートしているのであれば1.x系を使用、サポートしないのであれば2.x系を使用で良いです。2.x系のほうがサイズも小さく、速度も早いので旧ブラウザを切れるのであれば2.x系を推奨です。

##2.　イベントハンドリングには`on()`を使うべし

もはや常識ですかね。jQuery1.7以前だと`bind()`,`live()`,`delegate()`やらいろいろあったのが1.7で`on`でまとめられました。

ではここで質問。`click()`などではなく、`on()`を使うことで何が嬉しいのでしょうか？　１つ目は複数のイベントを登録できるということです。下記では`click`と`mouseenter`の２つのイベントを１つの処理にアタッチしてます。

<iframe width="100%" height="100" src="http://jsfiddle.net/toshimaru/YDur2/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

２つ目、オブジェクトを引数に取ることができ、複数イベントをアタッチできます。

<iframe width="100%" height="130" src="http://jsfiddle.net/toshimaru/cANuP/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

３つ目、第二引数にアタッチ先のセレクターを指定することができます。これでなにが嬉しいかというとAJAXなどで遅延して取得してくるような要素に対しても事前にイベントを設定することができます。

<iframe width="100%" height="100" src="http://jsfiddle.net/toshimaru/hSZLY/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

いわずもがなですが`off()`でイベントをデタッチできることも`on()`の良い所です。

## 3. AJAXには`done()`、`fail()`を使うべし

[去年のjQuery Advent Calendar](http://blog.toshimaru.net/jquery-ajaxdeferredajax/)で書いた通りです。

    $.ajax({
        url: "ajax.html",
        success: function(data) {
           alert('success!!');
        },
        error: function(data) {
           alert('error!!!');
        }
    });

上記の書き方よりも、

    $.ajax({
        url: "ajax.html",
    }).done(function(data){
        alert('success!!');
    }).fail(function(data){
        alert('error!!!');
    });

こっちのほうがPromiseなモダン形式です。

##4. `ajax()`だけじゃなくショートカットメソッドも活用すべし

`ajax()`がオプションで色々出来過ぎちゃってついつい`ajax()`を使いがちですが、jQueryには[AJAXショートカットメソッド](http://api.jquery.com/category/ajax/shorthand-methods/)があるんです！　例えばデータをPOSTするAJAX。下記に`ajax()`と`post()`の二通り書き方を載せましたが、`post()`のほうがシンプルでよさ気ですね。

<iframe width="100%" height="300" src="http://jsfiddle.net/toshimaru/BkNfr/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 5. `find()`を使って絞り込むべし

これもわりと有名ですかね。下記のセレクタは、

    $('.foo #bar')

`find()`を使ったほうが良いとされています。

    $('.foo').find('#bar')

## 6. カスタムイベントを定義する

下記のコードでは`show.price`というカスタムイベントを定義しています。クリック時に`show.price`イベントを`trigger()`しています。

<iframe width="100%" height="200" src="http://jsfiddle.net/toshimaru/JHYhR/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## 7. 属性を指定してDOMエレメントを生成できる

こんな感じでAタグが生成できます。

    $('<a>', {href: 'http://google.com/', title: 'google'}).text('google')
    [<a href=​"http:​/​/​google.com/​" title=​"google">​google​</a>​ ]

$.mapと組み合わせるとなかなかよいかもしれません。

    var links = $.map(['google.com', 'yahoo.com'], function(link) {
        var list = $('<li>');
        $('<a></a>', {href: link}).text('LINK').appendTo(list);
        return list;
    });

    $('<ul>').html(links)
    => [<ul>​
            <li>​
            <a href=​"google.com">​LINK​</a>​
            </li>​
            <li>​
            <a href=​"yahoo.com">​LINK​</a>​
            </li>​
        </ul>​ ]


## 8. form送信時は`serialize()`を使って値をまとめて取得すべし

`serialize()`を使うことでform内のinputの値をまとめて取得できます。

<iframe width="100%" height="130" src="http://jsfiddle.net/toshimaru/3GG3c/3/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


###参考

* [jQuery 2.0 Released](http://blog.jquery.com/2013/04/18/jquery-2-0-released/)
