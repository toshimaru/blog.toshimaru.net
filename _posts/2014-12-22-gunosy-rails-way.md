---
layout: post
title: GunosyでのRails開発フロー
published: true
description: 本エントリでは僕がGunosyでかかわっているRailsプロジェクトにおいてどのように開発を進めていっているのかを紹介したいと思います この記事はGunosy Advent Calendar 2014の22日目の記事です。
tags: rails opsworks
---

この記事は[Gunosy Advent Calendar 2014](http://qiita.com/advent-calendar/2014/gunosy)の22日目の記事です。

こんにちは、Gunosyの[@toshimaru](https://twitter.com/toshimaru_e)です。Gunosyでは主にRuby on Railsアプリを担当しています。

はじめに
-------
Gunosyでは昨年度よりAPIの実装を[Rails実装からGo実装へと変えた](https://speakerdeck.com/ymatsuwitter/300mo-ren-wogodeba-itahua)ことでAPIのパフォーマンスの大幅な改善が行われました。そんなわけで「GunosyってRails捨ててGoを使ってるんじゃないの？」とお思いの方もいらっしゃるかもしれませんがそんなことはありません。大規模アクセスのない管理画面などではRuby on RailsはまだまだGunosyで現役バリバリです[^2]。高速にWEBアプリを作る必要のあるシーンにおいてはGoはRailsにはまだ敵いません。あのGoカンパニーとして名高いHashCorpでさえも[Railsは手放せない](http://blog.gopheracademy.com/advent-2014/atlas/)ようですしね。

本エントリでは僕がGunosyでかかわっているRailsプロジェクトにおいてどのように開発を進めていっているのかを紹介したいと思います[^1]。

ブランチの運用
-----
基本は[Git flow](http://danielkummer.github.io/git-flow-cheatsheet/index.ja_JP.html)に則って開発を進めています。ただGit flowにおけるリリースブランチの運用はフローの簡易化のため、またスモールチーム（２〜３人）での開発ということもあり省いています。これによりdevelop→master間のフローがラクになりスピーディな開発が可能になります。

![](/images/posts/gunosy/deploy.png)

**（↑）developからfeatureブランチが切られ、developにマージ・確認した後にmasterへ**

デプロイ
-------
デプロイフローは下記のようになっています。

![](/images/posts/gunosy/workflow.png)

1. ローカルで開発
1. コードをGithubにプッシュ
1. CircleCIでテスト & テスト結果を通知
1. CircleCIからAmazon OpsWorksにデプロイ命令（Chefのデプロイレシピを実行させる）
1. OpsWorksからデプロイ完了通知

※Amazon OpsWorksについては昨日のChefAdventCalendarにまとめさせていただきましたのでよかったらどうぞ。

[Amazon OpsWorksでRailsアプリを簡単Chefプロビジョニング](/opsworks-rails/)

上記のブランチ運用と照らし合わせるとこうなります。

|---|---|
|`develop`ブランチ変更時 | CircleCIテスト後に、（テストパスすれば）OpsWorksのステージング環境に`develop` ブランチをデプロイ |
|`master`ブランチ変更時 |  CircleCIテスト後に、OpsWorksのプロダクション環境に`master`ブランチをデプロイ |

アプリケーションレポジトリの責任範囲がCircleCIでテストを実行してOpsWorksにデプロイリクエストを投げるまでで、その後のデプロイは別レポジトリとして管理されているChefのレシピの責任範囲として役割が分けられています。デプロイ環境が一通り揃ってしまえば、アプリケーション開発者はほとんどデプロイに関するアレコレを考える必要がなく本来の開発に集中できます。

Railsのバージョン
----
入社以来、Gunosyでは２つのRailsプロジェクトにかかわってきましたが（どちらも入社後にゼロから開始したプロジェクトです）両プロジェクトともにバージョン4.1.8です。まだ現時点で最新のバージョン4.2.0には上げてませんが今後も最新のRailsに追従していく所存です。

テスト
-------
Railsのテストに関してはRSpec, FactoryGirl, Capybaraあたりを使っています。

|---|---|
| RSpec | モデル、コントローラー周りのテスト |
| Capybara | ビューを含むEnd-to-Endテスト[^3] |

カバレッジ率に関しては90%前後を保っています。カバレッジは[simplecov](https://github.com/colszowka/simplecov)を使用し、結果作成されるカバレッジ率はCircleCIの[artifacts](https://circleci.com/docs/build-artifacts)の機能を使いカバレッジ率と共に公開しています。

![](/images/posts/gunosy/coverage.png)

**（↑）artifactsで公開されたカバレッジ率**

ただ「テストカバレッジを上げること」が目的化してしまっては本末転倒なので（いわゆる「テスト書きすぎ問題」）、「どこまでテストを書くか」は今後も考えていきたいテーマではあります。

複数DB
------
Railsの悩みとして１つ大きいのは複数DBの扱いではないでしょうか？ Gunosyでももちろん複数DBを使い分ける必要があり、そのときはCookpadさん, DeNAさんで実績のある[swith_point](https://github.com/eagletmt/switch_point) gemを使用しています。

この2社のDB事情に関しては下記に詳しいです。

* [クックパッドにおける最近のActiveRecord運用事情](http://techlife.cookpad.com/entry/2014/08/28/194147)
* [Mobage を支える Ruby の技術 ~ 複数DB編 ~](http://www.slideshare.net/sonots/mobage-ruby-db)

上記に紹介されているように下記のように簡単に複数DBをswitchでき素敵です。


{% highlight ruby %}
# Configuration
SwitchPoint.configure do |config|
  config.define_switch_point :blog,
    readonly: :"#{Rails.env}_blog_slave",
    writable: :"#{Rails.env}_blog_master"
end

# Model
class Article < ActiveRecord::Base
  use_switch_point :blog
end
{% endhighlight %}

※ Railsの機能として複数データベースがサポートされる話もあるようなのでそこも期待ですね。[参考](http://mozaic.fm/post/104575088493/12-rails)

権限管理
-------
管理画面の権限管理に関しては[authority](https://github.com/nathanl/authority)を使用しています。権限は大まかにそれぞれの機能においてそれを参照できる権限（READ）・更新できる権限（CREATE/UPDATE/DELETE）というような権限分けを行っています。例えば＜ユーザーを閲覧可能＞という権限、＜ユーザーを更新可能＞な権限、これらを組み合わせて管理ユーザーの権限を定義します。

なお、初期の権限設定は`seeds.rb`で権限をまくようにしています。

バッチ
-------
cronの管理に関しては[whenever](https://github.com/javan/whenever)を使用しています。こちらはOpsWorkのデプロイ実行時にChefのwheneverレシビが定義してあり、そこでcronがデプロイ時に更新されるようになっています。

非同期ジョブ
-------
重い処理に関してはSidekiqを使いRails側ではSidekiqにキューイングするまでにして、その後の処理はSidekiqで行うようにしてます。例えばGunosyの場合何が重い処理にあたるかというと「全ユーザーにプッシュ通知を送るぞ！」みたいなケース。そのような時間のかかる処理に関してはSidekiqで処理を行っています[^4]。

その他・今後の課題
-------
* 僕が携わったプロジェクトはどちらもRails4系だが、歴史が積み重なったRails3系プロジェクトもあるので今後どうアップデートしていくか。
* Hubotは遊びで飼ってるけどChatOpsといえるほど真面目に運用していない。もっとうまく使えば幸せになれるかも？

最後に
--------
Ruby/Rails業務経験歴半年足らずのヒヨッコではありますが、僕がかかわった範囲内でのGunosyでのRailsの開発の方法を紹介してみました。もし「うちはこんなRailsの開発してるよ！」とか「これ使うともっと便利になるよ！」とか教えていただけたら嬉しいです。

ではでは。

[^1]: とはいえ会社全てのRailsプロダクトが今回紹介するようなやり方で統一されているわけではありません。あくまでも自分がかかわっている範囲での開発の進め方です。
[^2]: ちなみにDjangoも使われています。
[^3]: デフォルトのrack_testドライバーを使っていますが、[poltergaistが良さ気なので](http://qiita.com/take/items/779747e0981355e569ad)今後使っていきたいと思っています。
[^4]: 正確には別途配信ワーカーがいるのですがここでは割愛
