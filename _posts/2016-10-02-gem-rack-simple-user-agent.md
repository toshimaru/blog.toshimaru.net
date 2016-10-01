---
layout: post
title: Railsでデバイス判定するrack-simple_user_agentというgemを作った
description: rack-simple_user_agent というgemを作った。 同じコンセプトのgemとしては、k0kubunさんのrack-user_agentがある。ではなぜ新たに別のgemを作ったのかというと、rack-user_agentは内部で判定ロジックとしてwootheeを使っているのだが、wootheeだとやりたいことに対してややヘビーな感じがしたのと、wootheeの判定ロジックでは僕がやりたい判定が完全には出来なかったからだ。
tags: gem
---

[rack-simple_user_agent](https://github.com/toshimaru/rack-simple_user_agent)というgemを作った。

## なぜ作ったか

同じコンセプトのgemとしては、[k0kubun](https://github.com/k0kubun)さんの[rack-user_agent](https://github.com/k0kubun/rack-user_agent)がある。詳細については下記のブログエントリに詳しい。

[Railsでデバイスの判定をするのに便利なgemを作った - k0kubun's blog](http://k0kubun.hatenablog.com/entry/2014/11/21/041949)

ではなぜ新たに別のgemを作ったのかというと、rack-user_agentは内部で判定ロジックとして[woothee](https://github.com/woothee/woothee)を使っているのだが、wootheeだとやりたいことに対してややヘビーな感じがしたのと、wootheeの判定ロジックでは僕がやりたい判定が完全には出来なかったからだ。

### tablet 判定したい

昨今のWebアプリケーションにおいてViewを分けたいとなったときは大体 smartphone, tablet, pc の３つのビューに分けたいのではないだろうか。もしくはsmartphone, pc の２つのビューに分け、tabletはどちらか１つのビューに属するという形にするのではないか。

wootheeの場合、残念ながらcategoryとしてtabletは用意されていない。実際にwootheeを使ってiPadを判定した場合、カテゴリはsmartphoneと判定されてしまう。

```rb
Woothee.parse "Mozilla/5.0 (iPad; CPU OS 9_0_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A404 Safari/601.1"
=> {:name=>"Safari", :category=>:smartphone, :os=>"iPad", :os_version=>"9.0.1", :version=>"9.0", :vendor=>"Apple"}
```

この判定だとsmartphoneとtabletのビューを分けたいといったときにやや不便だ。またtabletビューをpcビューと一緒にする場合にも困ってしまう。

### 無条件にbot判定されたくない

また無条件にcrawlerと判定されてしまうのも困ってしまうケースがある。例えば[Mobile-Friendly Test](https://www.google.com/webmasters/tools/mobile-friendly/)でサイトチェックをした場合にsmartphone用の画面が結果として表示されてほしいわけだけど、rack-user_agentを用いた場合、同クローラーが`crawler`と判定されてしまい、正しくsmartphoneビューが表示されなくなってしまう。

```rb
Woothee.parse "​Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
=> {:name=>"Googlebot", :category=>:crawler, :os=>"UNKNOWN", :os_version=>"UNKNOWN", :version=>"UNKNOWN", :vendor=>"UNKNOWN"}
```

## rack-simple_user_agentというソリューション

これらを解決することが冒頭のgemを作ったモチベーションになっている。ロジックとしては、単純にrequest UA stingに特定のデバイス特有の文字列が含まれているかどうかをチェック・判定するだけのバカ判定機だ。なのでこのgemは **stupidly simple UA detector** と称することにした。

## rack-simple_user_agentで可能な判定

- `request.from_smartphone?`
  - iPhone, Android, Windows Phone の判定
- `request.from_tablet?`
  - iPad, Android Tablet の判定
- `request.from_smartdevice?`
  - 上記のsmartphone, tabletを含む判定
- `from_googlebot?`
  - googlebot かどうかの判定

2016年にもなってさすがにフィーチャーフォンはもうケアしない。だが現代において普通に使われているデバイスであれば対応したいと考えているので、判定漏れているよとかこの判定も追加してよみたいなのがあれば、Pull request is welcome.

## まとめ

[rack-simple_user_agent](https://github.com/toshimaru/rack-simple_user_agent)はtabletの判定をロジック内に含ませることができ、便利。あとシンプルな文字列の判定だけなのでデバイスの判定ロジックにおいて大きなパフォーマンス劣化もしない。
