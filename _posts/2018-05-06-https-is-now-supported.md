---
layout: post
title: 本ブログが完全HTTPS化されました
image: "/images/posts/https/https.png"
description: 本ブログが完全HTTPS化されましたのでお知らせ致します。 といっても別に何をやったというわけではなく、朝起きたら突然GitHub PagesがHTTPSをサポートしてくれてました。 今まで本ブログに蓄積されたはてなブックマーク人気エントリ（5user以上）の現時点でのスナップショットを取っておいたので下記に一覧として公開いたします。
modified_date: 2019-08-08
tags: https security
---

本ブログが完全HTTPS化されましたのでお知らせ致します。

## GitHub Pages HTTPS Support

といっても別に何をやったというわけではなく、朝起きたら突然GitHub PagesがHTTPSをサポートしてくれてました。

<blockquote class="twitter-tweet" data-cards="hidden" data-lang="ja"><p lang="en" dir="ltr">Today, custom domains on GitHub Pages are gaining support for HTTPS via <a href="https://twitter.com/letsencrypt?ref_src=twsrc%5Etfw">@letsencrypt</a>. It&#39;s another step towards making the web more secure for everyone. <a href="https://t.co/MbB7Jjd3EE">https://t.co/MbB7Jjd3EE</a></p>&mdash; GitHub (@github) <a href="https://twitter.com/github/status/991366832421523456?ref_src=twsrc%5Etfw">May 1, 2018</a></blockquote>

HTTPSで配信するために特段こちら側で何か設定が必要というわけではなく、GitHubがよしなに全て設定してくれているので本当に朝起きたら`http`を`https`に変えてアクセスするただけで大丈夫でした。

ちなみに僕は数年くらい前から「Github Pagesカスタムドメインでhttps対応してほしい！」とGitHubサポートチームに訴え続けておりましたが、この度はやっと対応してくれたということでありがたい気持ちでいっぱいです。（これでやっと同僚エンジニアから「ブログがセキュアじゃないですね！」と煽られることもなくなる...）

![github config](/images/posts/https/https-github.png)

**:point_up:GitHubのhttps設定画面**

![let's encrypt certification](/images/posts/https/lets-encrypt.png)

**:point_up:HTTPS対応に際してはLet's Encryptの証明書が使われています**

## はてぶURL変わっちゃうよ問題

~~はてなブックマークではhttpとhttpsをURLとして区別するので、今回のhttps化に伴い今までのはてなブックマーク数がリセットされることになります。ちょっと勿体無い気もしますが致し方ないですね。~~

**追記**

現在はhttpのページとhttpsのブックマークページは統合されております。

> 同一ページでURLが複数存在する（例：httpとhttpsの混在、異なるパラメーターを複数持ったページなど）場合にブックマーク数やコメント一覧ページがそれぞれに分散していた仕様を、同一ページへのブックマークとして統合されるよう変更いたします。

via. [URLが複数存在する同一ページでコメント一覧ページが分散する仕様を、統合されるよう変更します - はてなブックマーク開発ブログ](https://bookmark.hatenastaff.com/entry/2019/02/13/105009)

せっかくなので今まで本ブログに蓄積されたはてブ人気エントリ（5user以上）の現時点でのスナップショットを取っておいたので下記に一覧として公開いたします。

---

### 人気エントリ(5ブクマ以上)一覧

1. [UIの進化を止めるうんこユーザーに我々はどう立ち向かうべ...](http://blog.toshimaru.net/cool-ui/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/cool-ui/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/cool-ui/)
2. [Railsフロントエンド技術の今とこれから](http://blog.toshimaru.net/rails-frontend/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-frontend/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-frontend/)
3. [jQuery モダンAjaxな書き方を目指して　〜deferredを使ったAJAX〜...](http://blog.toshimaru.net/jquery-ajaxdeferredajax) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jquery-ajaxdeferredajax)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jquery-ajaxdeferredajax)
4. [jQuery モダンAjaxな書き方を目指して　〜deferredを使ったAJAX〜...](http://blog.toshimaru.net/jquery-ajaxdeferredajax/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jquery-ajaxdeferredajax/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jquery-ajaxdeferredajax/)
5. [jQuery使いが知っておくべき8つのjQueryテクニック ](http://blog.toshimaru.net/jquery-8-tips/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jquery-8-tips/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jquery-8-tips/)
6. [Rails/ActiveRecord バッチ処理の最適化](http://blog.toshimaru.net/rails-batch-optimization/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-batch-optimization/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-batch-optimization/)
7. [RailsのHTTPステータスのシンボル表現まとめ](http://blog.toshimaru.net/rails-http-status-symbols/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-http-status-symbols/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-http-status-symbols/)
8. [美しき git log --graph のエイリアス](http://blog.toshimaru.net/git-log-graph/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/git-log-graph/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/git-log-graph/)
9. [GunosyでのRails開発フロー](http://blog.toshimaru.net/gunosy-rails-way/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/gunosy-rails-way/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/gunosy-rails-way/)
10. [認定スクラムマスター研修に行ってきました](http://blog.toshimaru.net/scrum-training/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/scrum-training/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/scrum-training/)
11. [Roppongi.rbで「Rails高速化戦略」を発表しました ](http://blog.toshimaru.net/roppongirb-speeding-up-rails/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/roppongirb-speeding-up-rails/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/roppongirb-speeding-up-rails/)
12. [【Rails】has_many, throughの逆の関連はdelegate, toかhas_one, through](http://blog.toshimaru.net/belongs_to-through/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/belongs_to-through/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/belongs_to-through/)
13. [PHP5.4のtrait機能を理解する](http://blog.toshimaru.net/php-trait/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/php-trait/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/php-trait/)
14. [github に git pushした変更の取り消し](http://blog.toshimaru.net/git-pushgithub/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/git-pushgithub/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/git-pushgithub/)
15. [pry-byebug を使ってRailsアプリをステップ実行する ](http://blog.toshimaru.net/rails-pry-byebug/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-pry-byebug/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-pry-byebug/)
16. [jQueryでページ最下部のスクロール時のイベントをキャッチ...](http://blog.toshimaru.net/jquery-bottom-scroll/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jquery-bottom-scroll/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jquery-bottom-scroll/)
17. [僕が単身海外（バンクーバー）に来て仕事を見つけるまで...](http://blog.toshimaru.net/how-to-find-job-in-Vancouver/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/how-to-find-job-in-Vancouver/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/how-to-find-job-in-Vancouver/)
18. [video.js で m3u8 形式の動画ファイルをブラウザで再生する ](http://blog.toshimaru.net/play-m3u8-video-in-browser/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/play-m3u8-video-in-browser/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/play-m3u8-video-in-browser/)
19. [Railsのfind_eachの挙動を調べた](http://blog.toshimaru.net/rails-find_each/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-find_each/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-find_each/)
20. [就活日記(6) KAIZEN platform Inc.](http://blog.toshimaru.net/job-hunting-6/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/job-hunting-6/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/job-hunting-6/)
21. [AWS S3 + CloudFront のCORS設定手順](http://blog.toshimaru.net/s3-cloudfront-cors-setting/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/s3-cloudfront-cors-setting/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/s3-cloudfront-cors-setting/)
22. [DeferredはjQueryにおける最も重要なクライアントサイドツール...](http://blog.toshimaru.net/jquerydeferred-is-most-important-client/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jquerydeferred-is-most-important-client/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jquerydeferred-is-most-important-client/)
23. [「フロントエンドデベロッパー面接時の質問事項」日本語...](http://blog.toshimaru.net/Front-end-Developer-Interview-Questions-Japanese/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/Front-end-Developer-Interview-Questions-Japanese/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/Front-end-Developer-Interview-Questions-Japanese/)
24. [ダメエンジニアの8つの特徴](http://blog.toshimaru.net/8/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/8/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/8/)
25. [docker-compose で Rails 環境を構築する](http://blog.toshimaru.net/docker-compose-rails/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/docker-compose-rails/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/docker-compose-rails/)
26. [CSS3アニメーションを使ってサイトをリッチに ](http://blog.toshimaru.net/css-animation/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/css-animation/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/css-animation/)
27. [Amazon OpsWorksでRailsアプリを簡単Chefプロビジョニング ](http://blog.toshimaru.net/opsworks-rails/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/opsworks-rails/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/opsworks-rails/)
28. [ActiveRecordのコールバックの順番・コールバック内のロール...](http://blog.toshimaru.net/active-record-callbacks/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/active-record-callbacks/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/active-record-callbacks/)
29. [Rubyの%の記法まとめ](http://blog.toshimaru.net/ruby-percent-notation/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-percent-notation/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-percent-notation/)
30. [Rubyで独自例外を定義するときはStandardErrorを継承する ](http://blog.toshimaru.net/ruby-standard-error/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-standard-error/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-standard-error/)
31. [技術者としてスポンジであり続けること　あるいは老害回...](http://blog.toshimaru.net/like-a-sponge-as-an-engineer/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/like-a-sponge-as-an-engineer/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/like-a-sponge-as-an-engineer/)
32. [プロセス毎のメモリ使用量を調べるコマンド](http://blog.toshimaru.net/linux/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/linux/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/linux/)
33. [JSON Schemaについて発表した](http://blog.toshimaru.net/json-schema-collaboration/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/json-schema-collaboration/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/json-schema-collaboration/)
34. [PHPって言うほど悪い言語じゃない](http://blog.toshimaru.net/php-is-not-bad-language/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/php-is-not-bad-language/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/php-is-not-bad-language/)
35. [就活日記(完) 就職](http://blog.toshimaru.net/job-hunting-fin/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/job-hunting-fin/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/job-hunting-fin/)
36. [railsdm2018で「ActiveRecordデータ処理アンチパターン」を発表し...](http://blog.toshimaru.net/rdm2018-active-record-anti-patterns/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rdm2018-active-record-anti-patterns/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rdm2018-active-record-anti-patterns/)
37. [「UIの進化を止めるうんこユーザーに我々はどう立ち向かう...](http://blog.toshimaru.net/cool-ui-after/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/cool-ui-after/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/cool-ui-after/)
38. [[PHP]URL safe な base64 encode メソッド](http://blog.toshimaru.net/phpurl-safe-base64-encode/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/phpurl-safe-base64-encode/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/phpurl-safe-base64-encode/)
39. [Hack Your Design! - Home](http://blog.toshimaru.net/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/)
40. [Ruby2.3 で導入された frozen_string_literal オプションで Immutable St...](http://blog.toshimaru.net/ruby-immutable-string/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-immutable-string/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-immutable-string/)
41. [Rails4 でトランザクション分離レベルを設定する ](http://blog.toshimaru.net/rails-4-transaction-isolation/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-4-transaction-isolation/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-4-transaction-isolation/)
42. [【jQuery】hidden inputタグをjQueryで追加](http://blog.toshimaru.net/jqueryhidden-inputjquery/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/jqueryhidden-inputjquery/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/jqueryhidden-inputjquery/)
43. [SQLファイルでRailsのスキーマ情報管理](http://blog.toshimaru.net/manage-schema-with-sql-in-rails/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/manage-schema-with-sql-in-rails/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/manage-schema-with-sql-in-rails/)
44. [細かすぎて伝わりにくいChrome Developerツールを使いこなそう...](http://blog.toshimaru.net/chrome-dev-tool/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/chrome-dev-tool/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/chrome-dev-tool/)
45. [Git のコミットメッセージの書き方](http://blog.toshimaru.net/git-29764/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/git-29764/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/git-29764/)
46. [就活日記(0) エントリー](http://blog.toshimaru.net/job-hunting-0/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/job-hunting-0/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/job-hunting-0/)
47. [RailsアプリケーションをLAN内に公開する](http://blog.toshimaru.net/publish-rails-app-in-lan/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/publish-rails-app-in-lan/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/publish-rails-app-in-lan/)
48. [Gitのrevertの-m(mainline)オプションについて](http://blog.toshimaru.net/git-revert-mainline/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/git-revert-mainline/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/git-revert-mainline/)
49. [Vimから３日で乗り換えた、次世代モテエディタ「Sublime Text 2...](http://blog.toshimaru.net/vimsublime-text-2) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/vimsublime-text-2)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/vimsublime-text-2)
50. [メールアドレスにはRFC的に使用可能な文字(!#$%&'*+-/=?^_`{\|}~)...](http://blog.toshimaru.net/rfc/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rfc/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rfc/)
51. [Composerで始める PHPのライブラリ管理](http://blog.toshimaru.net/how-to-use-composer-autoload/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/how-to-use-composer-autoload/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/how-to-use-composer-autoload/)
52. [RSpecが通ったり落ちたりしたときに](http://blog.toshimaru.net/rspec-occasional-fail/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rspec-occasional-fail/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rspec-occasional-fail/)
53. [Vimから３日で乗り換えた、次世代モテエディタ「Sublime Text 2...](http://blog.toshimaru.net/vimsublime-text-2/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/vimsublime-text-2/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/vimsublime-text-2/)
54. [就活日記(3) Quipper](http://blog.toshimaru.net/job-hunting-3/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/job-hunting-3/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/job-hunting-3/)
55. [YAPC::Asia 2015で心に残ったトーク&スライド #yapcasia ](http://blog.toshimaru.net/yapc-2015/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/yapc-2015/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/yapc-2015/)
56. [[Mac][git]error: There was a problem with the editor 'vi'.](http://blog.toshimaru.net/macgiterror-there-was-a-problem-with-the-edit/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/macgiterror-there-was-a-problem-with-the-edit/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/macgiterror-there-was-a-problem-with-the-edit/)
57. [カバレッジ率計測サービスをCoverallsからCodeClimateに乗り換え...](http://blog.toshimaru.net/coverage-with-codeclimate/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/coverage-with-codeclimate/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/coverage-with-codeclimate/)
58. [Rubyのinjectを使いこなす](http://blog.toshimaru.net/ruby-inject/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-inject/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-inject/)
59. [WindowsコマンドでAmazon S3上にバックアップする ](http://blog.toshimaru.net/windows-s3-sync/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/windows-s3-sync/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/windows-s3-sync/)
60. [1円クラウド、DigitalOceanのインスタンスをVagrant upして、puppet...](http://blog.toshimaru.net/digital-ocean-vagrant-puppet/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/digital-ocean-vagrant-puppet/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/digital-ocean-vagrant-puppet/)
61. [Ruby vs Golang でパフォーマンス比較してみた](http://blog.toshimaru.net/ruby-vs-go/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-vs-go/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-vs-go/)
62. [ひどいコードを書いてもよいとき](http://blog.toshimaru.net/why-you-should-write-shitty-code/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/why-you-should-write-shitty-code/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/why-you-should-write-shitty-code/)
63. [Backbone.jsをそろそろ学習したい人のための学習リソース集（...](http://blog.toshimaru.net/backbone-learn/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/backbone-learn/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/backbone-learn/)
64. [github に git pushした変更の取り消し](http://blog.toshimaru.net/git-pushgithub) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/git-pushgithub)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/git-pushgithub)
65. [Ruby on Rails を Google App Engine 上で動かしてみる](http://blog.toshimaru.net/ruby-on-google-app-engine/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/ruby-on-google-app-engine/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/ruby-on-google-app-engine/)
66. [rails new するときによく使うオプション](http://blog.toshimaru.net/rails-new-options/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/rails-new-options/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/rails-new-options/)
67. [就活日記(2) freee](http://blog.toshimaru.net/job-hunting-2/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/job-hunting-2/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/job-hunting-2/)
68. [PHPのプロパティをStrictに定義する](http://blog.toshimaru.net/php-force-property/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/php-force-property/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/php-force-property/)
69. [JavaScriptのXHRの送り方いろいろ: XMLHttpRequest, fetch, async/await ](http://blog.toshimaru.net/new-xhr-fetch-asyncawait/) [![](https://b.hatena.ne.jp/entry/image/http://blog.toshimaru.net/new-xhr-fetch-asyncawait/)](https://b.hatena.ne.jp/entry/blog.toshimaru.net/new-xhr-fetch-asyncawait/)

## 最後に

今後とも本ブログにて、有用な情報をぼちぼち発信していけたら良いな〜と思っておりますので引き続きよろしくお願いします。
