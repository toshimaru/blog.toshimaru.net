---
layout: post
title: JSON Schemaについて発表した
published: true
description: 「JSON Schemaでバックエンドエンジニアとフロントエンドエンジニアがコラボする」と題してエムスリー x Gunosy Beer bashで発表してきました。
tags: jsonschema tech
---

「JSON Schemaでバックエンドエンジニアとフロントエンドエンジニアがコラボする」と題して[エムスリー x Gunosy Beer bash](http://gunosy-beer.connpass.com/event/22825/)で発表してきました。

当日ハッシュタグ: [#gunosybeer hashtag on Twitter](https://twitter.com/hashtag/gunosybeer?src=hash)

## 発表資料:point_down:

<script async class="speakerdeck-embed" data-id="ddf8953b3746496a848dd7e4038ece4e" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

# 2 Types of JSON Schema

[JSON Schema and Hyper-Schema](http://json-schema.org/)

- JSON Schema
- JSON Hyper-Schema

![](/images/posts/jsonschema/json-schema.png)

## JSON Schema
- JSONの **データフォーマット** を記述する
- 人間にも機械にもわかりやすいドキュメント
- フォームでサブミットするデータのバリデーションに使える
- 自動テストにも使える

## JSON Hyper-Schema
- **Web APIの仕様** を記述する
- APIで期待するデータをJSON Schemaの形式で記述
- 日本ではこっちの方がポピュラー？

観測範囲内だと日本のコミュニティでJSON Schemaといったときにこちらを指すことが多い気がする。

## コラボレーション図

JSON Schemaでコラボレーションした事例を紹介するよ。

    +------------------+
    |                  |
    |  Client-side JS  |
    |     (React)      |
    |                  |
    +---+--------+-----+
        |        ^
        |        |            +---------------+
        |  JSON  |  <-------- |  JSON Schema  |
        |        |            +---------------+
        v        |
    +---+--------+-----+
    |                  |
    | Server-side API  |
    |     (Rails)      |
    |                  |
    +------------------+

## JSON Schema for us
* For Humans
  * Clear specification
* For Apps
  * useful for Validation
  * useful for Test
  * etc.

## Repositories
* :point_down: Rails API Repo :point_down:
* :point_right: **JSON Schema Repo** :point_left:
* :point_up_2: Frontend Repo :point_up_2:

バックエンドAPIのレポジトリ、フロントエンドのJSレポジトリ、共通で使うJSON Schemaのためのレポジトリ、これら３つを用意した。

## Workflow

1. 必要なAPIとそこに含まれるべきデータを洗い出し
2. 1をJSON Schemaに落としこむ
3. プルリク！

1は仕様・ワイヤーをもとにマークダウンでもスプレッドシートでも荒くアウトプット出す。

バックエンドエンジニアとフロントエンドエンジニアが共通認識を深めながらJSON Schemaレポジトリを育てていく。

![](/images/posts/jsonschema/schema-pr.png)

## GET /users/{id}

{% highlight yaml %}
# user.schema.yml
$schema: http://json-schema.org/draft-04/schema#
title: User
description: An User
type: object
properties:
  id:
    type: integer
  email:
    type: string
    format: email
  name:
    type: string
    minLength: 1
    maxLength: 32
required:
  - id
  - email
  - name
{% endhighlight %}

`PUT /users/{id}`とかもスキーマ使いまわせる。

## JSON Schema Validation

{% highlight ruby %}
require 'json-schema'

schema = {
  "type" => "object",
  "required" => ["a"],
  "properties" => {
    "a" => {"type" => "integer"}
  }
}
data = {
  "a" => 5
}

JSON::Validator.validate(schema, data)
{% endhighlight %}

## RSpec JSON Schema Matcher

{% highlight ruby %}
describe "Fetching the current user" do
  context "with valid auth token" do
    it "returns the current user" do
      user = create(:user)
      auth_header = { "Auth-Token" => user.auth_token }

      get v1_current_user_url, {}, auth_header

      expect(response.status).to eq 200
      expect(response).to match_response_schema("user")
    end
  end
end
{% endhighlight %}

参考: [Validating JSON Schemas with an RSpec Matcher](https://robots.thoughtbot.com/validating-json-schemas-with-an-rspec-matcher)

## Ruby JSON Schema Library
* [ruby-json-schema/json-schema](https://github.com/ruby-json-schema/json-schema)
* [brandur/json_schema](https://github.com/brandur/json_schema)

ダッシュとアンダースコア！ わかりにくい！！

## json-schema vs json_schema
* depending on `json-schema`:
  * [airbrake/airbrake](https://github.com/airbrake/airbrake)
  * [square/fdoc](https://github.com/square/fdoc)

## json-schema vs json_schema
* depending on `json_schema`:
  * [interagent/committee](https://github.com/interagent/committee)
  * [interagent/prmd](https://github.com/interagent/prmd)
  * [increments/qiita-rb](https://github.com/increments/qiita-rb)
  * [r7kamura/rack-json_schema](https://github.com/r7kamura/rack-json_schema)
  * [r7kamura/jdoc](https://github.com/r7kamura/jdoc)

## JavaScript JSON Schema Library

弊社フロンエンドエンジニアのオススメ2つ。

* [mafintosh/is-my-json-valid](https://github.com/mafintosh/is-my-json-valid)
* [epoberezkin/ajv](https://github.com/epoberezkin/ajv)

## JSON書くのツラい問題
- 「閉じカッコがー!!」
- 「カンマがー!!!!」
- 「コメントがー!!!!!!」
- 「クオテーションがー!!!!!!」

**黙ってYAMLで書こう。** こっちのが可読性もよいしミスも少ないし書きやすいです。

## JSON Schemaの今とこれから
* [json-schema/json-schema](https://github.com/json-schema/json-schema)

![](/images/posts/jsonschema/ima.png)

* [JSON Schema v5 Proposals](https://github.com/json-schema/json-schema/wiki/v5-Proposals)が出されている段階
* [Issue](https://github.com/json-schema/json-schema/issues)や[Google Groups](https://groups.google.com/forum/#!forum/json-schema)を追うとよさげ
* v5への具体的なロードマップは引かれていない模様

![](/images/posts/jsonschema/korekara.png)

## JSON Schemaコラボでよかったこと
* バックエンドエンジニアとフロントエンドエンジニアの仕様の共通認識
* JSON Schemaを先に定義しておくことでバックエンドエンジニアとフロントエンドエンジニアが疎に開発できる
* JSON Schemaでバグの混入を防ぐ

----

## 所感
時間にシビアなLT形式だったので発表途中でぶった切られた。もう少し簡潔にすべきだったかもしれない。
