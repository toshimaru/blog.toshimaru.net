---
layout: post
title: RuboCopチームにgemの名前を譲った話
image: "/images/posts/rubocop-rail.png"
description: かねてより僕が開発していたubocop-railsというgemをRuboCop公式チームの要望により譲った。 僕がこのgemを作った経緯とかは下記の記事の通り。名前を譲ることになったきっかけは下記のIssue。 Extract Rails Cops in a separate より正確にいうとこのIssueの前にRubyKaigi 2018の懇親会でRuboCop作者から僕へ間接的に打診があり、上記のIssueに至る。
tags: rails rubocop oss
---

かねてより僕が開発していた[rubocop-rails](https://github.com/toshimaru/rubocop-rails)というgemをRuboCop公式チームの要望により譲った。

僕がこのgemを作った経緯とかは下記の記事の通り。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">つくったやつ | Railsと同じRuboCopの設定が利用できるrubocop-rails gemを作った - Hack Your Design! <a href="https://t.co/szG0eLPetS">https://t.co/szG0eLPetS</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/958123075572195331?ref_src=twsrc%5Etfw">January 29, 2018</a></blockquote>

## きっかけ

名前を譲ることになったきっかけは下記のIssue。

[Extract Rails Cops in a separate · Issue #5976 · rubocop-hq/rubocop](https://github.com/rubocop-hq/rubocop/issues/5976)

より正確にいうとこのIssueの前に[RubyKaigi 2018](https://rubykaigi.org/2018/)の懇親会でRuboCop作者から僕へ間接的に打診があり、上記のIssueに至る。

RuboCopチームの要望を要約すると「RuboCop公式にRailsの拡張を作りたい。gem名はrubocop-railsとしたい。名前を頂戴！」と感じ。僕の想いとしては「RuboCop公式チームとして使いたい名前ということであればどうぞどうぞ。わかりやすい名前を付けることはRubyコミュニティ全体の利益にもなるだろうしね！」という感じ。

## 譲るにあたりやったこと

下記のようなIssueを作成して進めていった。

[[IMPORTANT ANNOUNCEMENT] Transfer rubocop-rails gem to RuboCop Team · Issue #31 · toshimaru/rubocop-rails](https://github.com/toshimaru/rubocop-rails/issues/31)

- `rubocop-rails` に代わる新しいgemを作成: [rubocop-rails_config](https://github.com/toshimaru/rubocop-rails_config)
- `rubocop-rails` の新しいversionを切って、post_install_messageでRenameの旨を周知
- `rubocop-rails_config` のほうに簡単にUpdateできるようなUpdate Generator Taskを用意
- `rubocop-rails` というgemに新しいOwnerを付与
- `rubocop-rails` のRename前の古いバージョンをrubygemsから削除

一番最後の **古いバージョンをrubygemsから削除** はIssueでもやり取りしている通り、既存のビルドを壊すことになるので正直苦渋の決断であった。だけれどもRuboCopがdevelopment依存のgemであること、全く違うgemになったら既存のgemユーザーを驚かせてしまうこと、これらを総合的に考えた結果、古いバージョンを消してでもgemのRename周知を優先させようと思い至った。これに関しては正直正解はないと思う。

## RuboCopコミッターのkoicさんが発表してくださいました

本件に関してはRuboCopコミッターの[@koic](https://twitter.com/koic)さんも先日の[Rails Developers Meetup 2018 Day 3 Extreme](https://techplay.jp/event/679666)にて発表して頂いたようです。:innocent:

<script async class="speakerdeck-embed" data-slide="57" data-id="612849c52252464d8a63fc97f90c6091" data-ratio="1.33333333333333" src="//speakerdeck.com/assets/embed.js"></script>

発表エントリ: [Rails Developers Meetup 2018 Day 3 Extreme に登壇した - koicの日記](http://koic.hatenablog.com/entry/railsdm-2018-day3-extreme)

エピソードのご紹介ありがとうございました。:pray:

## 参考資料

なお、gemを消す方法に関しては下記を参考にさせてもらった。

[公開した gem を削除する方法 - ヽ( ・∀・)ノくまくまー - s21g](http://blog.s21g.com/articles/1755)
