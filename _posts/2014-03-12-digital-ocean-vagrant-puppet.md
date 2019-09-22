---
layout: post
title: 1円クラウド・DigitalOceanのインスタンスをVagrantで上げて、puppetでプロビジョニングする
published: true
image: "/images/posts/vagrant/vagrant.png"
description: 流行りの1円クラウド、DigitalOcean上にVagrantでインスタンス(DigitalOcean的にはDroplet)を立ててみて、それが感動的にラクだったので書き残しておく。
tags: digitalocean vagrant
---

流行りの1円クラウド、[DigitalOcean](https://m.do.co/c/a79091850c6e)上にVagrantでインスタンス(DigitalOcean的にはDroplet)を立ててみて、それが感動的にラクだったので書き残しておく。

## Install vagrant command

Mac使っているのであれば[homebrew-cask](https://github.com/phinze/homebrew-cask)を使うのが便利。

```console
$ brew cask install vagrant
```

バージョンは1.5.1

```console
$ vagrant -v
Vagrant 1.5.1
```

## Install vagrant-digitalocean plugin

そのままではDigitalOceanは使えないので、次にvagrantのDigitalOceanプラグインをインストール。

```console
$ vagrant plugin install vagrant-digitalocean
```

## Vagrantfile Configuration

まずはVagrantfileを用意。

```console
$ mkdir vagrant-digitalocean-test
$ cd vagrant-digitalocean-test
$ touch Vagrantfile
```

次に`Vagrantfile`に書く設定。

```rb
Vagrant.configure('2') do |config|
  config.vm.provider :digital_ocean do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_rsa'
    override.vm.box = 'digital_ocean'
    override.vm.box_url = "https://github.com/smdahlen/vagrant-digitalocean/raw/master/box/digital_ocean.box"

    provider.client_id = '{your_client_id}'
    provider.api_key = '{your_api_key}'

    provider.image                = 'CentOS 6.4 x64'
    provider.region               = 'San Francisco 1'
    provider.size                 = '512MB'
  end
end
```

`provider.client_id`, `provider.api_key`の値はアカウント作成後、下記URLより生成できる。

<https://cloud.digitalocean.com/api_access>

今回はCentOS6.4、場所はサンフランシスコ、サイズは512で作ってみる。

## インスタンス作成！

あとはこのコマンドのみ。

```console
$ vagrant up --provider digital_ocean
```

これで一分くらい待つと立ち上がりました。動いてます。

```console
$ vagrant status
Current machine states:

default                   active (digital_ocean)

active
```

あとは`vagrant ssh`するなり`vagrant destroy`（インスタンス破棄\[重要！\]）するなり。

## プロビジョニング

これだけでは最小パッケージで必要なパッケージが入ってなく片手落ち。そうだ、puppetでプロビジョニングしてみよう。`Vagrantfile`をこうしてみる。

```rb
Vagrant.configure('2') do |config|
  config.vm.provision "shell", inline: "rpm -Uvh http://ftp-srv2.kddilabs.jp/Linux/distributions/fedora/epel/6/x86_64/epel-release-6-8.noarch.rpm --force"
  config.vm.provision "shell", inline: "yum -y install puppet"

  config.vm.provider :digital_ocean do |provider, override|
    override.ssh.private_key_path = '~/.ssh/id_rsa'
    override.vm.box = 'digital_ocean'
    override.vm.box_url = "https://github.com/smdahlen/vagrant-digitalocean/raw/master/box/digital_ocean.box"

    provider.client_id = '{client_id}'
    provider.api_key = '{api_key}'

    provider.image                = 'CentOS 6.4 x64'
    provider.region               = 'San Francisco 1'
    provider.size                 = '512MB'
  end

  config.vm.provision "puppet" do |puppet|
    puppet.options                = "--verbose"
  end
end
```

最初にpuppetをインストールコマンドを追加。そして

## puppet manifest

puppetのmanifestファイルを定義します。

```console
$ mkdir manifests
$ touch manifests/default.pp
```

`manifests/default.pp`はこう。vimとgitのパッケージを追加。必要に応じて追加したりする。

```rb
package {
  [
    'vim-enhanced',
    'git',
  ]:
  ensure => installed
}
```

## Let's provision!

```console
$ vagrant provision
```

これでpuppet経由で、vimやらgitが入る。良い。

## 本当に１円？

はい。１円です。

検証環境として使ったあとに、Dropletをちゃんと破棄していればこうなります。

![bill](/images/posts/vagrant/bill.png)

現時点で`1USD` = `102JPY`くらいなので`0.01USD`=約１円ですね。

## GitHub Repository

Githubに今回のサンプルの最終形を置いておく。

<https://github.com/toshimaru/vagrant-digitalocean-puppet>

### 参考

* [Simple Cloud Computing, Built for Developers \| DigitalOcean](https://m.do.co/c/a79091850c6e)
* [VagrantとSSDなVPS(Digital Ocean)で1時間1円の使い捨て高速サーバ環境を構築する](http://blog.glidenote.com/blog/2013/12/05/digital-ocean-with-vagrant/)

{% include digitalocean.html %}
