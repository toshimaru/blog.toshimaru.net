---
layout: post
title: packerを使ってDigital Ocean上にイメージを作成する
published: true
image: /images/posts/packer/packer.png
description: packerを使ってDigital Ocean上にイメージを作成してみたのでそのときのメモ。 Packerとは？ VagrantがVMの構築とかAWS/Digitgal Oceanでのインスタンス作成とかを抽象化して、プログラマブルにすることが可能なツールだとしたら、Packerはそれをさらに抽象化して、1つの設定ファイル(JSON)からAWS, Digital Ocean, VirtualBox向けのイメージを作成できるツール。
tags: digitalocean packer
---
＜前回のあらすじ＞  
[1円クラウド・DigitalOceanのインスタンスをVagrantで上げて、puppetでプロビジョニングする](/digital-ocean-vagrant-puppet/)

[packer](http://www.packer.io/)を使ってDigital Ocean上にイメージを作成してみたのでそのときのメモ。

## Packerとは？

[Vagrant](http://www.vagrantup.com/)がVMの構築とかAWS/Digitgal Oceanでのインスタンス作成とかを抽象化して、プログラマブルにすることが可能なツールだとしたら、Packerはそれをさらに抽象化して、1つの設定ファイル(JSON)からAWS, Digital Ocean, VirtualBox向けのイメージを作成できるツール。

## Digital Oceanにイメージ作成する

今回はDigital Oceanにイメージを作成した。まずはpakcer用のディレクトリを用意。

    $ mkdir packer-test
    $ cd packer-test

次にpackerの設定ファイルを用意。ファイル名は何でもよいっぽい。

    $ touch Packer.json

このように書く。

    {
      "builders": [
        {
          "type": "digitalocean",
          "client_id": "your_client_id",
          "api_key": "your_api_key",
          "image_id": 1505447,
          "region_id": 3,
          "size_id": 66
        }
      ],

      "provisioners": [
        {
          "type": "shell",
          "script": "setup.sh"
        }
      ]
    }

`builder`でタイプをチョイス。今回は`digitalocean`を選択。`client_id`, `api_key`を設定。`image_id`,`region_id`,`size_id`のint値については[こちらのDigitalOcean API](https://developers.digitalocean.com/)を見るとよいっぽい。

プロビジョニングのタイプは今回はシンプルにshellを設定。適当に`setup.sh`を作る。

    $ echo "echo 'hello world'" > setup.sh

## Packer!

packerビルドしてみる。

    $ packer build Packer.json
    digitalocean output will be in this color.

    ==> digitalocean: Creating temporary ssh key for droplet...
    ==> digitalocean: Creating droplet...
    ==> digitalocean: Waiting for droplet to become active...
    ==> digitalocean: Waiting for SSH to become available...
    ==> digitalocean: Connected to SSH!
    ==> digitalocean: Provisioning with shell script: setup.sh
        digitalocean: hello world!
        digitalocean:
    ==> digitalocean: Gracefully shutting down droplet...
    ==> digitalocean: Creating snapshot: packer-1395033724
    ==> digitalocean: Waiting for snapshot to complete...
    ==> digitalocean: Destroying droplet...
    ==> digitalocean: Deleting temporary ssh key...
    Build 'digitalocean' finished.

    ==> Builds finished. The artifacts of successful builds are:
    --> digitalocean: A snapshot was created: 'packer-1395033724' in region 'San Francisco 1'

## 結果

Before,Afterで見てみる。

Before:

![before](/images/posts/packer/do-before.png)

After:

![after](/images/posts/packer/do-after.png)

イメージのスナップショット（`packer-1395033724`）が作成されてますね。

## 最後に

packerはあくまでもイメージを作成するツールであり、イメージを管理するツールではないようです。

> Packer only builds images. It does not attempt to manage them in any way.

See. <http://www.packer.io/intro/getting-started/build-image.html>

また、`builders`の設定を変更することで、[Amazon EC2](http://www.packer.io/docs/builders/amazon.html)や[Google Compute Engine](http://www.packer.io/docs/builders/googlecompute.html)とかにもイメージ作成できるようですね。

### Github Repo

今回使ったものをGithubにおいておきます。

<https://github.com/toshimaru/packer-digitalocean-sample>

### 参考

* [Rebuild: 25: Immutable Infrastructure (Naoya Ito, Gosuke Miyashita)](http://rebuild.fm/25/)
