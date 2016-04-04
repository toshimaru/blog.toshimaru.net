---
title: terraformでDigitalOceanに簡単ドロップレット作成
published: true
image: /images/posts/terraform.png
description: Terraformを使って1円クラウド、DigitalOceanにドロップレットをさくっと立ててみます。Vagrantに似たツールではありますが、Vagrantよりシンプルでかつ軽量に動作します。
tags: digitalocean terraform
---

[Terraform](https://www.terraform.io/)を使って1円クラウド、[DigitalOcean](https://m.do.co/c/a79091850c6e)にドロップレットをさくっと立ててみます。Vagrantに似たツールではありますが、Vagrantよりシンプルでかつ軽量に動作します。

## 環境

    $ terraform version
    Terraform v0.6.14

上記のバージョンの terraform を使っていきます。

## tfファイル作成

terraformファイル、例えば`test.tf`ファイルを下記のように作成します（`.tf`という拡張子でファイル名はなんでもよいようです）。

    # Configure the DigitalOcean Provider
    provider "digitalocean" {
      token = "your_digitalocean_token"
    }

    # Create a web server
    resource "digitalocean_droplet" "web" {
      image = "ubuntu-14-04-x64"
      name = "web-1"
      region = "sfo1"
      size = "512mb"
      ssh_keys = [123456]
    }

`token`にはDigitalOceanのあなた自身のトークンをセットしてください。

ちなみに上記にある `ssh_keys` の id は下記のようにAPI経由で取得できます（jqを使ってます）。

    $ curl "https://api.digitalocean.com/v2/account/keys" -H "Authorization: Bearer your_token" | jq ".ssh_keys[0].id"

## terraform 実行プラン表示

`terraform plan`で実行プランを表示できます。これで何が作成されるかを確認しましょう。

    $ terraform plan
    Refreshing Terraform state prior to plan...


    The Terraform execution plan has been generated and is shown below.
    Resources are shown in alphabetical order for quick scanning. Green resources
    will be created (or destroyed and then created if an existing resource
    exists), yellow resources are being changed in-place, and red resources
    will be destroyed.

    Note: You didn't specify an "-out" parameter to save this plan, so when
    "apply" is called, Terraform can't guarantee this is what will execute.

    + digitalocean_droplet.web
        image:                "" => "ubuntu-14-04-x64"
        ipv4_address:         "" => "<computed>"
        ipv4_address_private: "" => "<computed>"
        ipv6_address:         "" => "<computed>"
        ipv6_address_private: "" => "<computed>"
        locked:               "" => "<computed>"
        name:                 "" => "web-1"
        region:               "" => "sfo1"
        size:                 "" => "512mb"
        ssh_keys.#:           "" => "1"
        ssh_keys.0:           "" => "123456"
        status:               "" => "<computed>"


    Plan: 1 to add, 0 to change, 0 to destroy.

## プラン実行

確認後は`terraform apply`で実際に作成を行えます。

    $ terraform apply
    digitalocean_droplet.web: Creating...
    image:                "" => "ubuntu-14-04-x64"
    ipv4_address:         "" => "<computed>"
    ipv4_address_private: "" => "<computed>"
    ipv6_address:         "" => "<computed>"
    ipv6_address_private: "" => "<computed>"
    locked:               "" => "<computed>"
    name:                 "" => "web-1"
    region:               "" => "sfo1"
    size:                 "" => "512mb"
    ssh_keys.#:           "" => "1"
    ssh_keys.0:           "" => "123456"
    status:               "" => "<computed>"
    digitalocean_droplet.web: Creation complete

    Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

    The state of your infrastructure has been saved to the path
    below. This state is required to modify and destroy your
    infrastructure, so keep it safe. To inspect the complete state
    use the `terraform show` command.

    State path: terraform.tfstate

## 作成物の情報表示

`terraform show` で作成物の情報を表示できます。

    $ terraform show
    digitalocean_droplet.web:
      id = 12808253
      image = ubuntu-14-04-x64
      ipv4_address = 1.2.3.4
      locked = false
      name = web-1
      region = sfo1
      size = 512mb
      ssh_keys.# = 1
      ssh_keys.0 = 123456
      status = active

確かにできあがってます。

{% include digitalocean.html %}
