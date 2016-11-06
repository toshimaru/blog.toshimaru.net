---
layout: post
title: "Roppongi.rb #2で「Infrastructure as (Ruby) Code の現状確認」を発表しました"
description: 第二回Roppongi.rbを「Infrastructure x Ruby」というテーマで開催した。 僕はその中で「Infrastructure as (Ruby) Code の現状確認」という内容で発表したので、その内容をブログにもまとめておく。
tags: ruby aws presentation
---

第二回Roppongi.rbを[「Infrastructure x Ruby」というテーマで開催](http://roppongirb.connpass.com/event/42633/)した。

僕はその中で「Infrastructure as (Ruby) Code の現状確認」という内容で発表したので、その内容をブログにもまとめておく（前回発表分は[こちら](/roppongirb-speeding-up-rails/)）。

<script async class="speakerdeck-embed" data-id="786983b0a1f94d1ca1250aa48ce94ed0" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

## 目的

発表の目的としてはInfrastructure as Code の認識を参加者であわせること。

## Infrastructure as Codeの意義

1. インフラ構築手順を秘伝のタレ化させない
1. 手順をコードに落としてインフラへの変更をトラッキングする
1. 手順を不変（immutable）にする

### 秘伝のタレ

* まるで秘伝のタレのように継ぎ足し継ぎ足し変更が入り代々受け継がれてきたサーバー
* メンテナンスされているかどうかまるでわからない「サーバー構築手順書.xls」
* インフラ担当者のアタマにしか入っていない隠し味 ＼(^o^)／

### コード化するということ

- コード化される
- ➜ Gitでトラック可能になる
- ➜ Githubでプルリク可能になる
- ➜ Githubでレビュー可能になる
- ➜ :blush:

:point_right: Github Workflow

## Immutable Infrastructure

Immutable Infrastructure については、[rebuild.fmでnaoyaさんやmizzyさんがmiyagawaさんと話して](http://rebuild.fm/25/)いたり、[naoyaさんが発表していたり](https://speakerdeck.com/naoya/immutable-infrastructure-number-jawsdays)したあたりで日本でも浸透した言葉だったと記憶している。

出自はというと、Chad Fowlerが書いた下記の記事。

[Trash Your Servers and Burn Your Code: Immutable Infrastructure and Disposable Components](http://chadfowler.com/2013/06/23/immutable-deployments.html)

### Immutable Infrastructure Keywords

Immutable Infrastructure の本質は下記のキーワードで表せると思う。

- Immutable （不変）
- Disposable（使い捨て）
- Reproducible （再現可能）
- Idempotence（冪等性）

Immutable Infrastructureが登場した背景にはAWS, GCPを始めとするIaaSの登場が大きいと思っている。どういうことかというと、IaaSでボタン１つでサーバーを上げて必要なくなったら捨てるダイナミックなサーバー、つまり **Disposable** なサーバーが誕生したということ。

そして、オートスケーリングの恩恵を享受するためにはサーバー・プロビジョニング自動化作業が必要。いつ何時でも既存のサーバーと同じ状態のサーバーが立ち上がる必要があります[^1]。
つまり、構築手順を **Immutable** にし、**Reproducible** なサーバー環境にする(= Idempotenceを担保する)ことが必要です。

## 構成管理ツールの歴史

メジャーなプロビジョニングツール(構成管理ツール)の歴史を追ってみる。

- 2005年 [Puppet](https://docs.puppet.com/puppet/)
- 2009年 [Chef](https://www.chef.io/chef/)
- 2012年 [Ansible](https://www.ansible.com)
- 2014年 [Terraform](https://www.terraform.io), [Itamae](https://github.com/itamae-kitchen/itamae)

## 実装言語別分類

実装言語別に分類してみる。

| Ruby実装 | Go実装 | Python実装 |  
| --- | --- | --- |  
| Puppet<br>Chef<br>Itamae<br>Serverkit | Terraform | Ansible |  

## 表現別分類

インフラストラクチャをどうコードで表現しているかの表現体形で分類してみる。

| RubyによるDSL | HCLによるDSL | YAML |
| --- | --- | --- |  
| Puppet<br>Chef<br>Itamae | Terraform | Ansible<br>Serverkit |  

### Why YAML?

- XML/JSONより記述がラク
- 特徴: よみやすい、かきやすい、わかりやすい
- 一般的に使われている記述フォーマットなので、学習コストが低い！

### Why HCL?

[HCL](https://github.com/hashicorp/hcl) とは HashiCorp configuration language の略。HCLの[READMEではHLCについてこう説明](https://github.com/hashicorp/hcl#why)されている。

- ❌ JSONダメ < コメントかけない。しんどい。
- ❌ YAMLもダメ < 初心者には記法むずかしい！
- ❌ Rubyとかもダメ < 自由度高すぎぃ！複雑すぎぃ！
- ◯ HCL  < よろしい、ならば独自言語だ。

### Why Ruby?

- DSLの書きやすさ
- 宣言的な記述
- 自由度が高い

## Infrastructure as Code の概念整理

Infrastructure as Code の概念を整理してみたい。[mizzyさんのブログでは](http://mizzy.org/blog/2013/10/29/1/)、プロビジョニングのレイヤーを下記のように分けるような考え方が紹介されていた。

![provisioning layers](/images/posts/roppongirb2/provisioning-tools.png)

## シンプルなプロビジョニング・レイヤーの考え方

オーケストレーションなどというと抽象的なのとInfrastructure as Codeのスコープが広くなってしまうと思うので、シンプルにこんな風に考えてみるのはどうだろうか。

![infra-as-code-layers](/images/posts/roppongirb2/infra-as-code-layers.png )

上記の考え方で先の構成管理ツールを分類するとこんな感じだ。

![provisioning categorize](/images/posts/roppongirb2/provisioning-categorize.png)

しかしこれで本当に全てはコード化されるか、というとそうではない。サーバーのプロビジョニングでコード化されるのはAWSサービス群のほんの一部、EC2のみだ。

![AWS services](/images/posts/roppongirb2/aws-services.png)

## Infrastructure as Code のカバー範囲

IaaSは仮想サーバ以外にもさまざまなサービスを提供している。AWSの例でいうと、ELB, RDS, VPC, S3, CloudFront, IAM, SecurityGroup などなど。

それらに対するオペレーションをAWS Management ConsoleなどのGUIでやるべきだろうか？

### GUI Configuration is hard...

さきほどのImmutable Infrastructureの文脈でいうと、GUIによる操作はImmutableではない。なぜならGUIは変わるかもしれないし、GUI操作は明確な言語化できないほどにファジーだからだ。では重要な設定をそのGUI任せにしていいのだろうか。

じゃあAPIを叩けばいいじゃない。というところで、**Configuration as Code** という考え方でInfrastructure as Codeの概念を敷衍できるのではないかと考えた。

![Configuration as Code*](/images/posts/roppongirb2/configuratino-as-code.png)

こう考えるとがIaaSの各種サービス群もコード化の対象として捉えることができる。

## 全てがコードになる例

### Route53 Configuration

Route53のコード化例。

```rb
hosted_zone "example.com." do
  rrset "example.com.", "A" do
    ttl 300
    resource_records(
      "127.0.0.1",
      "127.0.0.2"
    )
  end
end
```

```go
resource "aws_route53_record" "www" {
 zone_id = "${aws_route53_zone.primary.zone_id}"
 name = "www.example.com"
 type = "A"
 ttl = "300"
 records = ["${aws_eip.lb.public_ip}"]
}
```

### Datadog Alert Configuration

Datadogアラート設定のコード化例。

```rb
monitor "Check load avg", :type=>"metric alert" do
  query "avg(last_5m):avg:ddstat.load_avg.1m{host:i-XXXXXXXX} > 1"
  message "@winebarrel@example.net"
  options do
    locked false
    new_host_delay 300
    notify_no_data true
    no_data_timeframe 2
    notify_audit true
    silenced({})
  end
end
```

### Github Member Management

Githubのメンバー管理のコード化例。

```go
resource "github_membership" "membership_for_some_user" {
    username = "SomeUser"
    role = "member"
}

resource "github_repository" "example" {
  name        = "example"
  description = "My awesome codebase"

  private = true
}

resource "github_repository_collaborator" "a_repo_collaborator" {
    repository = "our-cool-repo"
    username = "SomeUser"
    permission = "admin"
}
```

## 全てがプルリクになる

![Pull Request](/images/posts/roppongirb2/pull-request.png)

こんなふうにプルリクになっているとレビューも可能。

## コード化するメリット

* レビューによるチェック体制により、より安全なConfigurationオペレーションを実現
* CIサービスと連携させてテスト・CDの自動化も可能となる

## まとめ

* コード化することによりGithubワークフロー（プルリク→レビュー→マージ）に乗ることができてハッピー :smile:
* Infrastructure as Code = (Server Configuration + Service Configuration) as Code

## 感想

* Keynoteでスライド作ったけどレイアウトとかテーマの設定が自由にできて、Decksetよりはデザイン凝ろうと思うと便利。

## 参考

* [Itamae - Infra as Code 現状確認会](https://speakerdeck.com/ryotarai/itamae-infra-as-code-xian-zhuang-que-ren-hui)
* [Rebuild: 25: Immutable Infrastructure](http://rebuild.fm/25/)
* [Infrastructure as Code // Speaker Deck](https://speakerdeck.com/naoya/infrastructure-as-code)
* [Infrastructure as Code 再考](http://mizzy.org/blog/2016/04/22/1/)
* [Trash Your Servers and Burn Your Code: Immutable Infrastructure and Disposable Components](http://chadfowler.com/2013/06/23/immutable-deployments.html)
* [InfrastructureAsCode](http://martinfowler.com/bliki/InfrastructureAsCode.html)

[^1]: 特定のサーバーにデータに依存してしまわないように、データ的にはステートレスなサーバー構成が前提となる
