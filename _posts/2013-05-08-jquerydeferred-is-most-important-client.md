---
layout: post
title: 【翻訳】DeferredはjQueryにおける最も重要なクライアントサイドツール
published: true
description: jQuery モダンAjaxな書き方を目指して　〜deferredを使ったAJAX〜が結構読んでもらっているみたいなので、今回はdeferred第二弾として、jQuery.Deferred is the most important client-side tool you haveの翻訳をしました。
tags: jquery 翻訳
---

[jQuery モダンAjaxな書き方を目指して　〜deferredを使ったAJAX〜](http://blog.toshimaru.net/jquery-ajaxdeferredajax/)が結構読んでもらっているみたいなので、今回はdeferred第二弾として、[jQuery.Deferred is the most important client-side tool you have](http://eng.wealthfront.com/2012/12/jquerydeferred-is-most-important-client.html)の翻訳をしました。

-----

jQueryのdeferredの導入は、近年のjQueryの歴史における最もパワフルな拡張だ。jQuery自体はとくに新しい概念ではないが、deferredの導入は多くのクライアントサイド開発者にとってメリットがある。非同期プロセスにおいてdeferredパターンはシンプルでありながらも、パワフルなツールだ。皆さんご承知の通り、クライアントサイドの開発においてそういった非同期を使う状況は数多く存在する。

ここでは、deferredおよびjQueryによって提供されるAPIについて概観する。読者が理解できるよう多くの例を掲載した。あなたはこの記事を読み終わる頃にはdeferredとは何か、いつ使うべきものかが知ることができよう。

概要
-------

"Deferred"パターンとは、完了するかもしれない、あるいは完了しないかもしれない処理単位のプロキシのように振る舞うオブジェクトを表す。このパターンはどんな非同期処理にでも適応することができる。少し例をあげると、Ajaxリクエスト、アニメーション、Webワーカーだ。ユーザの行動さえも「遅延処理(delayed computation)」の対象とみなすことができるのである。

Deferredの最もシンプルな使い方は、処理が終わったときあるいは失敗したときに何が起こるかを明示できるようにすることだ。jQueryの実装だと、deferedがうまく解決(resolve)したとき、あるいはエラーで拒否(reject)されたとき、あるいはいくつかの進行中の処理から解決状態だと通知(notify)されたとき（後述）に走るであろうコールバック関数の登録が可能となる。

おそらく既に読者はこのDefrredパターンを使っている。なぜならjQuery Ajax関数はdeferredインターフェースを実装したオブジェクトを返すからだ。それはAjaxリクエストが成功したときにresolveされ、HTTPリクエストが失敗したときにrejectされる。

理解すべき１つの重要なこと
-------
deferredは非同期処理における「いつ」を抽象化する。deferredは無制限に繰り返すことができる。この挙動のポイントは、もしdeferredが既にresolveならば、直ちに登録されているコールバックを実行することだ。処理単位(たとえばAjaxリクエスト)が終わっているかどうかは気にする必要がない。単純にコールバックをdeferredにバインドし、それが既にresolveであれば実行し、あるいはそれが未来にresolve状態になったときに実行する。

jQueryでdeferredを使ってみる
-------

### 解決(resolution) & 拒否(rejection)
jQuery deferred関数の中核は、deferredの解決(resolve)/拒否(reject)を処理することだ。`$.Deferred().`でdeferredオブジェクトを作成できる。deferredオブジェクトの`done()`、`fail()`はそれぞれオブジェクトのresolveされたとき、rejectされたときに実行される関数を登録できる。

deferredをresolve/rejectすることは実際、`resolve()`,`reject()`を使うことで実現できる。`jQuery.ajax()`メソッドは内部的には、リクエストが正常に完了したときにdeferredの`resolve()`をコールし、リクエストが失敗したとき（例えばhttpステータスコードの404）に`reject()`をコールする。

### deferredへ通知する: notify()とprogress()
jQuery1.7からresolve/rejectに加えて、`progress`が導入された。、`progress()`により、deferred内で`notify()`がコールされたときに実行されるコールバック関数を登録することができ、resolved状態に対する「進捗(progress)」を表現できるようになった。`notify()`で事前にコールバックを登録しておくことで例えば、ロードに時間がかかるリソースを持つdeferredオブジェクトの定期的に更新されるプログレスバーを描画できる。deferredはロード中に通知(notify)され、ロード完了時に解決(resolve)される。

### promise()を返す
deferred利用時のほとんどの場合、deferredの利用者にresolve/rejectを決めてほしくはないだろう。あなた自身でそれを管理したいはずだ。そのような場合には、`promise()`を返すのがよい。

jQuery用語的にいうと、promiseは「read-only deferred」だ。promiseはコールバック登録、deferred状態への問い合わせを可能にするが、状態の変更は不可だ(たとえばresolve/reject状態の変更)。 `jQuery.ajax()`メソッドはpromise()を返す。なぜならAJAXリクエストが成功したか失敗したかを決定するのは、その内部のコードで完結する話だからだ。

### 非同期イベントの同期化：when()

`$.when()`は１つ以上のdeferredを受け入れ可能で、それら全てのdeferredオブジェクトが正常に完了(resove)したときにのみresolve状態となる新たなdeferredを作り出す。つまり`when()`により、非同期イベントを一つに統合することが可能になるのだ。

下記の例を考えてみよう。

>ある1つのUI表現に対して、2つの分割されたAJAXリクエストのデータが必要であり、UIのレンダリングには、それら２つのリクエストのデータが必須である。

`when()`がないと、レンダリング前にどちらのリクエストも終わっていることを保証するために、コールバックをネストすることを強要されてしまう。さらに悪いことに、２つのAJAXリクエストが失敗時のエラーハンドリングコードが下記URLに示す通り２つに分散されてしまう。

<iframe width="100%" height="300" src="http://jsfiddle.net/mattbaker/2s4Mg/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

この代替案として、`when()`が使用可能なのだ。2つのAJAXリクエストによって分割されてしまったdeferredオブジェクトを1つに統合できる。`when()`はこれら2つの両リクエストが完了したときにのみresolveとなる。成功時のコールバックとしてUI要素のレンダリング処理を登録することができる。さらに、失敗時の処理は1つの箇所にまとめることができる（下記URL参照）。

<iframe width="100%" height="300" src="http://jsfiddle.net/mattbaker/wJ4bm/1/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 人間もまた非同期だ

Webサイトやアプリーケーション上の数多くのモノは非同期である。これにはあなた自身さえも含まれている。考えてみよう、あなたのサイトはユーザにプロフィールを作成するように依頼する。プロフィールを十分にユーザに埋めさせるよう、あなたはどれくらい入力が完了しているかプログレスバーを表示させる。それらの入力が完了するとプログレスバーを変更させ、全て入力し終えたときには「ありがとうございます」というメッセージを表示させる。

この状況では、プロフィールの遅延入力完了という点でdeferredが使われている。プロフィールを作成、「計算」している本質は実際のところ、人間である。このケースは「非同期である」と見做せる状況とはいえないかもしれないが、まさにdeferredが使える有効な状況である。

ユーザーアクション（これは解決への進捗率を示している）によるdeferredを通知するために、`notify()`が使える。そして`resolve()`がプロフィール入力完了によるdeferredを通知するのに使える。プログレスバーを更新するには`progress()`を使ってコールバックをバインドし、ありがとうメッセージを表示するコールバックをバインドするのには`done()`を使う。

下記に例を示そう。

<iframe width="100%" height="300" src="http://jsfiddle.net/TTUrQ/10/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### 最後に（訳者より）

原文にはdeferredの面白い使い方、`pipe()`も紹介されています。是非こちらも参照してみてください。

[jQuery.Deferred is the most important client-side tool you have](http://eng.wealthfront.com/2012/12/jquerydeferred-is-most-important-client.html)
