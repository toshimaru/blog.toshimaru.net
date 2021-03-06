---
layout: post
title: Hatena Engineer Seminar に行ってきた
description: Hatena Engineer Seminarにいって来ました。下記にその際のメモを掲載しておきます。
published: true
tags: tech
---

[Hatena Engineer Seminar](http://developer.hatenastaff.com/entry/2012/09/11/141559)にいって来ました。下記にその際のメモを掲載しておきます。

## CTO talk

* Shinji tanaka / hatena CEO
     * githubやってるよ
* history
     * 2001/7 京都にて創業
     * 2004/2 Tokyo
     * 2008/3 Kyoto
     * hatena blog 一万人
* はてなサービス
     * ABテストを行い継続的に機能開発
     * 何十週連続リリース
* 開発環境
     * Github Enterprise
     * エンジニア集中できる環境用意
     * 教育（インターン）
     * 人数60人くらい
* なにを作る？
     * ディレクター　エンジニア　デザイナ　で１チームで回す
* 京都
* 職種
     * スマフォエンジニア
     * アプリエンジニア
     * インフラエンジニア
     * Blogディレクター
     * デザイナ

## アプリケーション

* @yanbe
* ソーシャルブックマーク研究
     * はてぶ担当
     * 研究開発的なこと担当
* 社内IRC
     * polycom
     * 社内用グループウェア
     * タスク管理：Trello (昔はpost it)
     * github enterprise : コードレビュー
* データ - Solrの利用
     * like句を全文検索に置き換え
     * 遅くなりがちな処理を事前にやっておく
     * タグページ /search/tag?q=xxx
* パフォーマンス
     * レスポンスタイムをログに残す
     * １秒以内に返せたページの割合を監視する
* 特定機能が使用されたときをGoogle Analytics のイベントとして記録
* 機械学習を利用したスパム判定システム
     * 昔は固定ルールベース
     * 今はAdaBoostアルゴリズムによる学習ベース
          * 過去の事例をベースに判定
          * 誤判定時は教え込んで、学習アルゴリズムに組み込み
     * B!KUMAガールズ
          * 特定の層に訴求するルックアンドフィール
          * 機械学習とルールベースでは後者のほうがよかった
          * 社内リリース、ヒアリング後、公開
* 開発チームの裁量の大きさ
* これからもネットサービス中心の会社

## インフラ

* SHOICHIMASUHARA
* DevOpsエンジニア
* パフォーマンス　ワーキング　グループ
     * アプリエンジニア、インフラエンジニア合同の定例会をチームごとに行う
* はてなの構成はシンプル
     * ☆Nginx くるものによってリクエストを振り分け
     * ロードバランサ
     * Webサーバ
     * mysql
     * solr
     * redis
     * 2007年にサーバを仮想化
          * 物理作業が不要
          * セットアップの自動化
          * 2000ホストぐらいを自社のサーバ管理ソフトで管理
* SSD,FusionioDrive: １台あたりのパフォーマンスをかなりあげている
* ミドルウェア
     * apache solr
          * 全文検索システム
          * mysql->solrに置き換えることで爆速に
     * mogileFS
          * 分散ファイルシステム
          * ファイルがたくさんぶっ込める
     * fluentd + mongoDB
          * 導入は意外に最近
          * あらゆるログの解析、蓄積
     * サービスの一部ではAWSを使っている
          * 柔軟性重視するサービスで採用

下記は懇親会にて[id:stanaka](http://d.hatena.ne.jp/stanaka/)さんと少し話した内容。

- アプリサーバ500台くらい、Webサーバ300台くらい。
- LBの上にnginxがいるのはクローラがけっこうサイト深く掘るので、人に影響出ないようにそれを別サーバに振り分ける。
- github enterprise で社内コードレビューがやりやすくなった。(push,commitなどはコマンドベース)
- コーディング規約は社内でそこまでガチガチには決めていないそう。
- 去年くらいにはてぶのUIを一新してからAjaxを使ったRIAな実装が増えたけど、まだJSのテストとか実装標準的なところは確立できてないそうな。

以下、感想。

- github enterprise、ちょっとお高い印象あるけど導入したいね！
- 全文検索で solr はかなりいい選択っぽい。
- 新東京オフィス移転に伴いエンジニアをちょっと募集しているみたいだよ！興味がある人はうけてみるとよいよ！
