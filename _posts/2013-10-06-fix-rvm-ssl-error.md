---
layout: post
title: 【RVM】gen install時に出るSSL_connectエラー解決法
published: true
description: RVMでgen installした時に出るSSL_connectエラー解決法
tags: ruby
---

RVMを使って`gem install`をするとこんなエラーが出た

    $ gem install rails
    ERROR:  Could not find a valid gem 'rails' (>= 0), here is why:
      　　　　Unable to download data from https://rubygems.org/ - SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://s3.amazonaws.com/production.s3.rubygems.org/latest_specs.4.8.gz)

SSL証明書が古いためらしく下記コマンドで証明書をアップデートする。

    $ rvm osx-ssl-certs update all

これで解決！

### 参考
* [OpenSSL Errors and Rails – Certificate Verify Failed](http://railsapps.github.io/openssl-certificate-verify-failed.html)
