---
layout: post
title: 銀座Rails#21で「Fat Modelの倒し方」を発表しました
image: "/images/posts/ginzarails-21/og.jpg"
description: "銀座Rails#21で「Fat Modelの倒し方」と題して発表してきた。　肥大化したRailsアプリケーション（Fat Rails Application）において最も辛いレイヤーはどこでしょうか？"
tags: presentation rails activerecord
hideimage: true
---

[銀座Rails#21](https://ginza-rails.connpass.com/event/173610/)で「Fat Modelの倒し方」と題して発表してきました。

## 発表スライド

<script async class="speakerdeck-embed" data-id="fa367404507c4311aa3eeb087fc45a6e" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

## 目次

- toc
{:toc}

## Fat Rails Stage

肥大化したRailsアプリケーション（Fat Rails Application）において最も辛いレイヤーはどこでしょうか？

1. Fat View
1. Fat Controller
1. Fat Model

僕はFat Modelだと考えています。

下記は「RailsがどのようにFatになっていくか」段階を示した表です。

| Fat Stage | Rails習熟度 | Fat Layer |
| --- | --- | --- |
| 1 | 低 | Fat View |
| 2 | 中 | Fat Controller |
| 3 | 高 | Fat Model[^1] |

まずはFatステージ1。Railsというものを全然知らない超初心者が陥るステージです。ビューに何でもかんでもロジックを書いちゃう。その結果がFat Viewです。

次にFatステージ2。ある程度Railsに慣れてきた開発者が陥るステージです。Modelへのロジック分離がうまくできず、Controllerにロジックが集中する。その結果はFat Controllerです。

最後がFatステージ3。Railsを習熟したエンジニアであればModelにロジックを寄せていくのが定石です。その結果出来上がるのはFat Modelです。

このように **どんなにRailsに習熟してようと最終的にぶつかる壁がFat Model** です。

## Fat Model対処のための３つのアプローチ

Fat Modelを倒すためのアプローチとして、僕は下記の3つに分けて整理すれば良いのではと考えました。

1. Rails Way
2. Sub-Rails Way
3. Non-Rails Way

## Rails Modelの限界

なぜRailsアプリケーションのModel層は限界を迎えてしまうのでしょうか？

Railsの原始的な状態は、1つのModelに1つのControllerが結びついています。すなわち、`User`モデルがあれば`UsersController`があり、Controllerのそれぞれのアクションに`User`モデルが紐づくという形です。

しかし下図[^a]はそれが破綻した状態です。どうなっているかというと、複数のControllerからいろんなかたちで１つのモデルが触られる、そういう状態です。

![inline](/images/posts/ginzarails-21/controllers-model.jpg)

続いてのスライドです[^b]。

![inline](https://speakerd.s3.amazonaws.com/presentations/ce30c3cf9433471283e24855f6bdd2b4/slide_42.jpg?12161035)

ここのキーワードとしては **ユースケース**。いろんなユースケースを1つのModelで表現しなければならないという状況が辛いと言えます。

## Rails Modelはなぜ辛くなるのか？

- 1つのModelが複数の異なるユースケースに密結合して実装されるとき
  - → ある条件やcontextに紐付いたValidation/Callback処理
- 1つのフォームで複数のサブリソースが更新されるとき（フォームとModelが1対1で紐付かないとき）
  - → 1つのModelを起点とした複数Modelを跨ぐトランザクション処理

上述の限界は、Rails ModelとDBのテーブルが一対一で紐づくRailsの世界観に起因する限界と言えます。

## 目指すべきゴール

ではどうRailsの限界を乗り越えていけばいいでしょうか？

下記は横軸がコードベースのサイズ、縦軸がペイン（痛みの度合い）を描いたグラフです[^c]。

![inline](/images/posts/ginzarails-21/growth.png)

赤線はバニラRailsです。コードベースのサイズとともにペインが増大しています。

緑線はストラクチャードRails。コードベースが増大してもペインが増大しません。

僕の発表の言うところでは、赤線（バニラRails）がRails Way、緑線（ストラクチャードRails）がSub-Rails・Non-Rails Wayにあたります。

![inline](/images/posts/ginzarails-21/growth2.png)

ということで我々の基本的なゴールとしてはこの緑線、すなわち、 **コードベースが大きくなってもペインが増大しないRailsコードベース** を目指しましょう、ということになります。

## Rails Way

小学生の絵みたいで恐縮なんですが、Rails Wayを絵にするとこんなイメージです。

![fit](/images/posts/ginzarails-21/rails-way.png)

つまり **Railsのレールに沿った開発アプローチ** です。

### Concerns

まずはConcerns。Model/Controllerの共通の関心事（Concern）をmoduleに切り出す手法です（代表例: DHH's `Recording` Class[^6]）。

![inline](/images/posts/ginzarails-21/concerns.png)

注意すべきは、ConcernのRails公式ガイドはありません。強いて言うなら下記の記事でDHHがConcernを紹介しています。

[Put chubby models on a diet with concerns](https://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns)

Modelの持っている能力（ability = `-able` suffix）に着目してConcern moduleに切り出していくのが、Rails Wayっぽさがあると言えます。

```rb
# app/models/concerns/concernable.rb
module Concernable
  extend ActiveSupport::Concern

  ...(your concern code)...
end
```

### STI

RailsにおいてテーブルとModelは原則的に1対1で結びつきます。しかし、STIを使えば1つのテーブルで複数Model紐付けることができます。

下図は`players`という単一テーブルに複数のクラスが結びついている図です[^5]。

![inline](/images/posts/ginzarails-21/sti.png)

Railsのコード例です。 `companies` テーブルに紐づく `Firm`, `Client`モデルの例だと下記の通りです。

```rb
# app/models/company.rb
class Company < ApplicationRecord
end

# app/models/firm.rb
class Firm < Company
end

# app/models/client.rb
class Client < Company
end
```

### Polymorphic Association

1つのポリモーフィック関連付け定義で複数のテーブルを従属させることができるのがポリモーフィック関連です。

![inline](/images/posts/ginzarails-21/polymorphic.png)

上図の場合、通常のRails DB設計であれば `pictures`テーブルが`employee_id`, `product_id`を持っているべきですが、`imagable_id`という1つカラムで複数のテーブルを従属させることができています。

これをRailsのコードであらわすと下記の通りです。

```rb
# app/models/picture.rb
class Picture < ApplicationRecord
  belongs_to :imageable, polymorphic: true
end

# app/models/employee.rb
class Employee < ApplicationRecord
  has_many :pictures, as: :imageable
end

# app/models/product.rb
class Product < ApplicationRecord
  has_many :pictures, as: :imageable
end
```

ただし注意点があります。ポリモーフィック関連は『SQLアンチパターン』6章でアンチパターンとして紹介されており、使用する際は気をつける必要があります。

詳しくは『SQLアンチパターン』を読んでいただければと思います。

### accepts_nested_attributes_for

ネストされたアトリビュートで関連リソースの作成・更新・削除を行うのが`accepts_nested_attributes_for`です。

```rb
class Member < ActiveRecord::Base
  has_many :posts
  accepts_nested_attributes_for :posts
end

params = { member: {
  name: 'joe', posts_attributes: [
    { title: 'Kari, the awesome Ruby documentation browser!' },
    { title: 'The egalitarian assumption of the modern citizen' },
  ]
}}
member = Member.create(params[:member])
```

ただしこの`accepts_nested_attributes_for`はDHH自らが「消したい」と発言しており[^7]、積極的に使うのはやや躊躇われるかもしれません。

![inline](/images/posts/ginzarails-21/dhh.png)

### その他細かめのテクニック

- **Serialize Attribute**
  - json型カラムへのメタデータ保存に便利
  - ⚠️『SQLアンチパターン』5章 EAV
- **Value Object** (`compose_of`)
  - 複数カラムをValueオブジェクトとして展開するときに便利
- **Validation Class**/**Callback Class**
  - クラスとして分離可能 → 分離することで複数モデルで再利用可能に

### 「Rails Way」まとめ

全体としては、Rails WayだけではFat Modelを倒す手段として手数が少なく物足りないと感じます。

アプリケーションサイズがFatになっている時点でそのRailsアプリケーションは中規模以上のサイズが見込まれますから、正直Rails WayだけでFat Modelを倒すのは無理だと思います。

❌ Concerns, Validation ClassなどFat ModelをDRYに記述する手段にはなるが、構造的にダイエットする手段にはなっていません。あくまでそれらは局所的なダイエットに留まっています。

❌ STI, PolymorphicなどはDB設計と密結合したソリューションで、完全なコードレベルの解決にはなっていません。また、アンチパターンとして紹介されているように、それ自体が技術負債になりえる構造的問題を孕んでいます。

## Sub-Rails Way

Sub-Rails Wayはレールを補強・拡張しつつレールに乗るスタイルです。

![fit](/images/posts/ginzarails-21/sub-rails-way.png)

レールを何を使って補強・拡張するのでしょうか？それは下記２つになります。

1. gem
2. SaaS

### View Model

ModelにおけるView関連ロジックを **View Model** として切り出す手法です。

Development of Further PoEAAで[Presentation Model](https://martinfowler.com/eaaDev/PresentationModel.html)という概念で紹介されているパターンにあたると考えています。ModelをDecoratorパターンっぽく拡張しているのでDecoratorとも呼ばれることが多いです[^8]。

このView Modelの良いところとしては、Fat Model の対処として機能するだけでなく、Fat View の対処としても機能する点です。

💎 gemの実装としては下記のようなものがあります。

- [draper](https://github.com/drapergem/draper)
- [active_decorator](https://github.com/amatsuda/active_decorator)

🔧 draperの場合、コードは下記のようになります（ArticleモデルのDecoratorクラス）。

```rb
# app/decorators/article_decorator.rb
class ArticleDecorator < Draper::Decorator
  delegate_all

  def publication_status
    if published?
      "Published at #{published_at}"
    else
      "Unpublished"
    end
  end

  def published_at
    object.published_at.strftime("%A, %B %e")
  end
end
```

### 権限管理・認可

管理画面実装において逃げられない実装は認証とあわせて、権限管理・認可ではないでしょうか？

ResourceのCRUDでユーザーのアクセス制御するのが「Railsらしい」権限管理と考えています。

💎 gemの実装としては下記のようなものです。

- [pundit](https://github.com/varvet/pundit)
- [banken](https://github.com/kyuden/banken)
- [cancancan](https://github.com/CanCanCommunity/cancancan)

🔧 punditの場合、コードは下記の通りです（Postモデルの認可クラス）。

```rb
# app/policies/post_policy.rb
class PostPolicy
  attr_reader :user, :post

  def initialize(user, post)
    @user = user
    @post = post
  end

  def update?
    user.admin? or not post.published?
  end
end
```

### Interactor

InteractorはClean Architecture由来する概念です。

下記の図は見たことある方も多くいらっしゃるかもしれません。赤い部分がClean Architectureにおけるユースケース層になります。このユースケース層に Interactor が表現されています。

![inline](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

ユースケース層というアプローチはとても良いと思っています。なぜなら先程「1つのModelが複数の異なるユースケースに密結合して実装されるとき―」と言いましたが、そのユースケースをまさにInteractorとして表現できるからです。

個人的にClean ArchitectureとRailsは相性が良いと思っていて、このようにMVC+InteractorでClean Architectureのそれぞれの層と一致させることができるからです。

![inline](/images/posts/ginzarails-21/Clean_Coder_Blog.png)

💎 gemとしては下記があります。

- [interactor-rails](https://github.com/collectiveidea/interactor-rails)
- (not Rails) [hanami](https://github.com/hanami)'s [Interactor](https://github.com/hanami/utils/blob/master/lib/hanami/interactor.rb)

hanamiはRailsではありませんが、Clean Architectureに強く影響を受けたRuby製Webフレームワークです。hanamiには Interactor の仕組みが標準で実装されています。

🔧 interactor-railsの場合のコードは下記の通りです（ユーザーを認証するクラス）。

```rb
# app/interactors/authenticate_user.rb
class AuthenticateUser
  include Interactor

  def call
    if user = User.authenticate(context.email, context.password)
      context.user = user
      context.token = user.secret_token
    else
      context.fail!(message: "authenticate_user.failure")
    end
  end
end

# Inside your controller,
result = AuthenticateUser.call(session_params)  
```

### 特定の課題の解決

特定の課題を解決するgemとしては例えば下記のようなものがあります。

- **論理削除**
  - 💎 gem: [discard](https://github.com/jhawthorn/discard), [paranoia](https://github.com/rubysherpas/paranoia), [acts\_as\_paranoid](https://github.com/ActsAsParanoid/acts_as_paranoid)
  - ⚠️ [SQLアンチパターン 幻の第26章「とりあえず削除フラグ」](https://www.slideshare.net/t_wada/ronsakucasual)
- **要素のソート・並び替え**
  - 💎 gem: [acts\_as\_list](https://github.com/brendon/acts_as_list), [ranked-model](https://github.com/mixonic/ranked-model)
- **State Machine**
  - 💎 gem: [aasm](https://github.com/aasm/aasm), [stateful_enum](https://github.com/amatsuda/stateful_enum)
- **Tagging**
  - 💎 gem: [acts-as-taggable-on](https://github.com/mbleigh/acts-as-taggable-on)
- **HashをActiveRecordっぽく操作**
  - 💎 gem: [active_hash](https://github.com/zilkey/active_hash)

解決したい課題に応じて導入していくのが良いと思います。

### 「それRailsでできるよ」[^10]

逆にgemを使わずともRails標準で解決できるよって課題も多く存在します。例えば下記のような例です。

- :gem: [enumerize](https://github.com/brainspec/enumerize) (Emumerized Attributes)
  - Rails 4.1: ActiveRecord enum
  - 参考. [ActiveRecord::Enum](https://api.rubyonrails.org/v5.2.3/classes/ActiveRecord/Enum.html)
- :gem: [switch_point](https://github.com/eagletmt/switch_point) (Database R/W Split)
  - Rails 6: Multi-DB
  - 参考: [Active Record で複数のデータベース利用 - Railsガイド](https://railsguides.jp/active_record_multiple_databases.html)
- :gem: [activerecord-import](https://github.com/zdennis/activerecord-import) (Bulk Import)
  - Rails 6: `insert_all`, `upsert_all`
- :gem: [carrierwave](https://github.com/carrierwaveuploader/carrierwave), [shrine](https://github.com/shrinerb/shrine) (File Uploader)
  - Rails 5.2: Active Storage
  - 参考: [Active Storage の概要 - Railsガイド](https://railsguides.jp/active_storage_overview.html)
- :gem: [friendly_id](https://github.com/norman/friendly_id)
  - ActiveRecord: `to_param`
  - 参考: [ActiveRecord::Integration](https://api.rubyonrails.org/classes/ActiveRecord/Integration.html#method-i-to_param)
- :gem: [counter_culture](https://github.com/magnusvk/counter_culture)
  - ActiveRecord: `counter_cache`
  - 参考: [Active Record の関連付け](https://railsguides.jp/association_basics.html#belongs-to%E3%81%AE%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3-counter-cache)
- ID/Password認証
  - ActiveModel: `has_secure_password`
  - 参考: [ActiveModel::SecurePassword::ClassMethods](https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html)
- :gem: [config](https://github.com/rubyconfig/config) (YAML Config Management)
  - Rails Custom configuration:
  - `Rails::Application.config_for`
  - `config.x`
  - 参考: [Rails アプリケーションを設定する - Railsガイド](https://railsguides.jp/configuring.html#%E3%82%AB%E3%82%B9%E3%82%BF%E3%83%A0%E8%A8%AD%E5%AE%9A)

### 「それRubyでできるよ」[^10]

gemを使わずともRubyでもできるよってケースもあります。

- :gem: [pry](https://github.com/pry/pry)
  - Ruby 2.4: `binding.irb`
  - Ruby 2.7: REPL Syntax Highlighting

### SaaSに切り出す

処理をSaaSに切り出す、という意味では下記の例があります。

- [Auth0](https://auth0.com/jp/)
  - ユーザー認証ロジックをAuth0に移譲
  - 認証にともなうMFA、パスワードリセット、セキュリティ対策などの面倒な実装をAuth0が肩代わり
- [Sentry](https://sentry.io/welcome/)
  - エラー通知をSentryに移譲
  - サービスにエラーをぽんぽん投げ込めばいい感じにエラーをアグリゲーション・可視化・各種通知してくれる
- [NewRelic](https://newrelic.co.jp/)/[Datadog](https://www.datadoghq.com/ja/)
  - APM (Application Performance Monitoring)を NewRelic/Datadog APMでやる
  - 自前で Elasticsearch + Kibana 環境を構築してもいいが、構築コスト・運用コストともに高くつく

### 「Sub-Rails Way」まとめ

gem を使うことでFat Model対処法のバリエーションがぐっと広がります。独自実装でModelを太らせることをせず、使えるgemは積極的に利用していくとよいでしょう。

一方、gemを使わずともRails標準で解決できることも実は多くあるので見極めた上でgem導入しましょう。

また、選択肢はさほど多くないものの、最近はさまざまな便利SaaSが出ているので SaaSを使うのもFat Model対抗手段の１つとして検討してもよいでしょう。

## Non-Rails Way

Non-Railsはレールに乗らない別のレール、独自路線のことです。

![fit](/images/posts/ginzarails-21/non-rails-way.png)

つまり自らレールを作っていくスタイルです。

### Form Model

Form Modelとは、`include ActiveModel`したRubyクラスのことです。

巷ではForm Objectと呼ばれることが多いですが、＜Formに特化したActiveModel＞という意味で、あえてForm Modelと本発表では呼んでいます。

フォームとForm Modelは一対一で紐付きます。こうすることで **特定の＜Formのユースケース＞に対応したModel** が作成可能になります。

💎 gemの実装としては下記のようなものがあります。

- [reform](https://github.com/trailblazer/reform)
- [dry-rb](https://github.com/dry-rb/)シリーズ（旧・[virtus](https://github.com/solnic/virtus)）

Form Modelの使い所としては下記のように整理できると思います。

| 紐づく<br>テーブル数 | Form Modelのユースケース |
| --- | --- |
| 0 | 問い合わせフォームなどテーブルを作るまでもないフォームで利用 |
| 1 | - |
| 2以上 | `accepts_nested_attributes_for`の代わりとして、複雑なフォームの組み立て時に利用 |

テーブルとフォームが1対1で紐づく場合はRails Wayで解決させるのが素直な実装

その他の特定のユースケースに特化したForm Model実装としては、下記のようなものが考えられます。

- SearchForm: 条件に基づく検索に特化したフォーム
- DownloadForm: CSVなどのダウンロードに特化したフォーム

### PORO

POROとはPlain Old Ruby Objectの略です。元ネタはPoEAAのPOJO (Plain Old Java Object)です。

POROは、ActiveRecordの機能に依存しない純粋なRuby実装です。なので`include ActiveModel`しているRubyクラスは個人的にはPOROとは呼んでいません。

純粋なRuby実装なのである意味、 **Ruby Way** とも言うことができます。

POROの主な用途としてはModelの補助輪的な役割だと考えています。

例えば下記の例ではクラスメソッド`create!`呼び出し時に引数を受け取って`create!`インスタンスメソッド内でトランザクションを張って複数モデルの更新を行っています。

```rb
class PostWithNotifications
  def self.create!(creator:, body:)
    new(creator: creator, body: body).create!
  end

  def initialize(creator:, body:)
    @creator = creator
    @body = body
  end

  def create!
    ActiveRecord::Base.transaction do
      create_post!
      create_notifications!
    end    
  end
end
```

このRubyクラスの場合、＜`Post`作成とともに`Notification`も作成する＞という複数モデル更新のユースケースをPOROに閉じ込めたということができるでしょう。

### Service Class

続いてはサービスクラスです。

サービスクラスに関してはもしかしたら賛否両論あるかもしれません。サービスという概念がデカすぎる故に、人によって使い方・解釈が異なり、サービスクラスにまつわる巷のすれ違いを起こしている印象があります。

サービスクラスに関してはまずはサービスの定義問題があると思っています。つまり「あなたの言うServiceってなんですか？」という問題です。

一口にサービスといっても様々な文脈のサービスがあります。

| Architecture | Service Name |
| --- | --- |
| **PoEAA** | Service Layer |
| **DDD** | Service Class |
| **Onion Architecture** | Application Service, Domain Service |
| ? | 上記のどれでもない"Service"<br>上記を組み合わせた"Service" |

「どういう文脈のサービスか？」を明確にした上で議論しないとサービスクラスの定義・概念がボンヤリしてしまう印象です。なのでサービスクラスを導入する際は、サービスクラスの定義・使い方を明確にした上でチームに導入していくのが良いと思います。

個人的な見解にはなりますが、＜特定のユースケースの解決＞という意味においてはInteractorのほうが（少なくともRailsにおいては）筋が良いと考えています。

また、個人的に下手にサービスという巨大で強い概念を持ち込むより、POROという概念で雑にまとめたほうが好みだったりします。

### 1 Table Multiple Models

一つのテーブルに複数Modelを紐付けるアプローチです。

Rails WayだとSTIでのみこれは実現可能ですが、STIを使わずにがんばってアプリケーションコードで複数モデルを表現しちゃいましょうというやり方です。

コードにすると、例えば下記のようなコードになります。

```rb
class User < ApplicationRecord
end

class User::AsSignUp < User
  validates :password, ...
  after_create :send_welcome_email

  private

  def send_welcome_email
    ...
  end
end
```

この例では＜`User`のサインアップ＞というユースケースにのみ特化したActiveRecordのModelを作成しています。

ただこの実装に関しては、1 Table 1 ModelというRailsのパラダイム（規約）を壊すことになってしまうので、いささか危険思想という印象があります。

ただ僕自身実際にプロダクションに導入して運用した経験はないので、もし実運用における成功例お持ちの方がいれば教えていただけると幸いです。

### 「Non-Rails Way」まとめ

4つの Non-Railsを紹介しました。

1. Form Model
2. PORO
3. Service Class
4. 1 Table Multiple Models

これらをうまく導入できればFat Modelを倒す強力な武器となるのは間違いないでしょう。

どれをどう導入するかに関しては正解はないと思うのでチームにあった手法を選択すると良いと考えています。

といっても「どれを導入すればいいかわからん...」ってなると思うので個人的なおすすめアプローチを紹介すると、モデルを太らせてしまうような複雑なフォームに関してはForm Modelで表現するのがわかりやすいと思います。

何らかのユースケースに特化したクラスを作りたいのであれば、Sub-Railsのセクションで紹介したInteractorを使うのが個人的にはオススメです。

上記で足りないユースケースが出てきた場合、POROと総称してModelの補助輪となるようなRubyクラスを用意してあげると良いかと思います。

## 全体のまとめ

Fat Modelを倒すための3つのアプローチを紹介しました。

1. **Rails Way**: Railsの規約に沿った開発アプローチ
2. **Sub-Rails Way**: Railsの規約をgemで補強・拡張するアプローチ
3. **Non-Rails Way**: Railsの規約から外れる独自実装アプローチ

まずは、 **Rails Way** + **Sub-Rails Way** でFat Modelをダイエットできないか考えましょう。小規模なRailsアプリケーションであれば Rails Way + Sub-Rails Way で十分戦えると思います。

Rails Way + Sub-Rails Way だけで立ち行かなくなった場合に、必要に応じて適切な **Non-Rails Way** を取り入れていきましょう。

**Non-Rails Way** はチーム毎に最適解があると思っています。チームで合意できる独自路線を選択・導入すればよいのではないでしょうか。

## 参考資料

- 書籍
  - [エンタープライズアプリケーションアーキテクチャパターン](https://amzn.to/2TO3ZTe)
  - [Clean Architecture　達人に学ぶソフトウェアの構造と設計](https://amzn.to/2XfXKJT)
  - [エリック・エヴァンスのドメイン駆動設計](https://amzn.to/3exaz8y)
  - [Growing Rails Applications in Practice](https://leanpub.com/growing-rails) by Henning Koch and Thomas Eisenbarth
- アーキテクチャにまつわる資料
  - [Martin Fowler: Development of Further Patterns of Enterprise Application Architecture](https://martinfowler.com/eaaDev/)
  - [Clean Coder Blog: The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
  - [The Onion Architecture : part 1 \| Programming with Palermo](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
  - [Architecture: Interactors \| Hanami Guides](https://guides.hanamirb.org/architecture/interactors/)
  - [中規模Web開発のためのMVC分割とレイヤアーキテクチャ - Qiita](https://qiita.com/yuku_t/items/961194a5443b618a4cac)
- Rails公式ドキュメント
  - [Active Record Associations — Ruby on Rails Guides](https://guides.rubyonrails.org/association_basics.html)
  - [Active Model Basics — Ruby on Rails Guides](https://guides.rubyonrails.org/active_model_basics.html)
  - [accepts\_nested\_attributes\_for](https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html)
  - [ActiveRecord::Inheritance](https://api.rubyonrails.org/classes/ActiveRecord/Inheritance.html)
  - [ActiveSupport::Concern](https://api.rubyonrails.org/v6.0.2.1/classes/ActiveSupport/Concern.html)
- Form Model (Form Object)について
  - [Railsで複数モデルを扱うフォームをすっきり書く（Formオブジェクト） - LiBz Tech Blog](https://tech.libinc.co.jp/entry/2019/04/05/113000)
  - [accepts_nested_attributes_forを使わず、複数の子レコードを保存する \| Money Forward Engineers' Blog](https://moneyforward.com/engineers_blog/2018/12/15/formobject/)
  - [Model と画面上の form が1対1で一致しない場合、どのように実装するのが綺麗なのか？ - clean-rails.org](https://discourse.clean-rails.org/t/model-form-1-1/14)
- Service Class (Service Object) について
  - [Railsで重要なパターンpart 1: Service Object（翻訳）｜TechRacho（テックラッチョ）〜エンジニアの「？」を「！」に〜｜BPS株式会社](https://techracho.bpsinc.jp/hachi8833/2017_10_16/46482)
  - [てめえらのRailsはオブジェクト指向じゃねえ！まずはCallbackクラス、Validatorクラスを活用しろ！ - Qiita](https://qiita.com/joker1007/items/2a03500017766bdb0234)
  - [Why Service Objects are an Anti-Pattern — INTERSECT](https://intersect.whitefusion.io/the-art-of-code/why-service-objects-are-an-anti-pattern)
  - [Service Objectがアンチパターンである理由とよりよい代替手段（翻訳）｜TechRacho（テックラッチョ）〜エンジニアの「？」を「！」に〜｜BPS株式会社](https://techracho.bpsinc.jp/hachi8833/2018_04_16/55130)
- [Concerns about Concerns - Speaker Deck](https://speakerdeck.com/willnet/concerns-about-concerns)
- [Decorator と Presenter を使い分けて、 Rails を ViewModel ですっきりさせよう - KitchHike Tech Blog](https://tech.kitchhike.com/entry/2018/02/28/221159)
- [ActiveRecordのモデルが1つだとつらい - Qiita](https://qiita.com/hanachin_/items/ba1dd93905567d88145c)

[^1]: [Buckblog: Skinny Controller, Fat Model](http://weblog.jamisbuck.org/2006/10/18/skinny-controller-fat-model)
[^5]: PoEAA: [Single Table Inheritance](https://www.martinfowler.com/eaaCatalog/singleTableInheritance.html)
[^6]: <https://twitter.com/dhh/status/964244090224128001>
[^7]: <https://github.com/rails/rails/pull/26976#discussion_r87855694>
[^8]: 参考: [『Rubyによるデザインパターン』](https://amzn.to/3cekmi3) 第11章 オブジェクトを改良する：Decorator
[^10]: Ruby/Rails公式の提供する機能はgemより貧弱だったりするのであしからず
[^a]: [ApplicationModel のある風景 - Speaker Deck](https://speakerdeck.com/hshimoyama/rails-with-applicationmodel)
[^b]: [Ruby on Railsの正体と向き合い方 - Speaker Deck](https://speakerdeck.com/yasaichi/what-is-ruby-on-rails-and-how-to-deal-with-it)
[^c]: [Growing Rails Applications in Practice](https://leanpub.com/growing-rails)
