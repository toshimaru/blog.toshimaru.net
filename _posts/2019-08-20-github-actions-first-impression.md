---
layout: post
title: GitHub Actions(v2) を使ってみた ~v1との違い、導入方法、価格、良い点・悪い点~
image: "/images/posts/github-actions/og.png"
description: "GitHub Actions v2(beta)が手元に降ってきたので試してみた記事です。 ※まだBeta版なので本エントリに書いてある記述は古くなるなる可能性があります。最新情報は適宜公式ドキュメントを参照してください。 TL;DR GitHub Actions v2、間違いなく顧客が求めていたもの 複雑なワークフロー組むにはちょっとまだバギーなので利用は控えとくのがよさげ（シンプルなものなら検討可） GitHub Actions v1, GitHub Actions v2がある まず注意点なのですが、GitHub ActionsにはGitHub社内的にGitHub Actions v1と呼ばれているものとGitHub Actions v2と呼ばれているものの２種類あります。それぞれ違いを下記に列挙します。"
tags: github ci
---

GitHub Actions v2(beta)が手元に降ってきたので試してみた記事です。

**※まだBeta版なので本エントリに書いてある記述は古くなるなる可能性があります。最新情報は適宜公式ドキュメントを参照してください。**

## TL;DR

- GitHub Actions v2、間違いなく顧客が求めていたもの
- 複雑なワークフロー組むにはちょっとまだバギーなので利用は控えとくのがよさげ（シンプルなものなら検討可）

## GitHub Actions v1, GitHub Actions v2がある

まず注意点なのですが、GitHub ActionsにはGitHub社内的にGitHub Actions v1と呼ばれているものとGitHub Actions v2と呼ばれているものの２種類あります[^1]。

それぞれ違いを下記に列挙します。

|    | GitHub Actions v1 | GitHub Actions v2 |
| -- | -- | -- |
| 特徴 | 汎用的なワークフロー型の自動化ソリューション | CI機能を備えた自動化ソリューション |
| 記述言語 | HCL | YAML(JS拡張可) |
| 公開ステータス | 2019年9月一杯でdeprecatedになる | public beta（順次ロールアウト中） |
| ドキュメントURL | https://developer.github.com/actions/ | https://help.github.com |
| サポートOS | Linux | Linux/Mac/Windows |
| 環境構築 | `Dockerfile`を自ら記述 | 用意されたOSを利用 |
| バックエンド | ? | Azure PipelinesのFork |

２つあるので、GitHub ActionsでGoogle検索したときに古いv1の情報が出てくることもあるので注意してください。v1前提なのかv2前提なのかで全く異なってきます。

またv1が手元で使えるからといってv2が自動的に使えるわけではありません。それぞれ別物なのでv1が使えてたとしても、v2が降ってくるまでは使えません。

## 導入方法

設定方法は簡単。GitHub Action v2が使える対象になっていれば、下記のように表示されますので **Enable Repository** してください。

![](/images/posts/github-actions/enable.png)

有効化されると、下記画面が出てくるのでGUIでポチポチワークフローを設定するもよし。

![](/images/posts/github-actions/get-started.png)
![](../getti)

`.github/workflows`以下に直接YAMLを置くもよし。動くYAMLサンプルは下記の公式 starter-workflows レポジトリを覗いてみるとよいかと思います。

https://github.com/actions/starter-workflows/tree/master/ci

## 価格

![](/images/posts/github-actions/price.png)

Public Repoは完全無料。並列数も20並列まで使える模様。

TravisCI, CircleCIと比較されることが多いかと思いますが、どちらも同じように無料で使えますが並列数に制限があったり、CIジョブのキューイングが遅かったりするので、今回のGitHub Actionsは完全にTravisCI, CircleCIを殺しにきたと言えるでしょう。

## 良い点

- 主要OSであるLinux/Mac/Windowsは[すべて対応](https://help.github.com/en/articles/virtual-environments-for-github-actions#supported-virtual-environments)
- イベントをhookしてからジョブが走りだすまでが早い
- GitHubサービス内で完結する
- 並列数がしっかり確保されている
- `GITHUB_TOKEN`が自動的に発行される（外部CIサービスの場合新たに払い出す必要があった）
- GitHubとカジュアルに連携できるということで使い方は無限大...!
  - lintしてPRにコメント
  - /x/path に変更あったら xxx のジョブ起動
  - PR/Issueへの自動ラベリング
  - Tagプッシュされたらリリース
  - 何らかの条件でIssueの作成/クローズ
  - etc.

## 悪い点

- キャッシュ機構がない
- `[ci skip]` 機能がない
- Betaなのでいろいろバギー
  - 例: 公式の提供するAction（setup-go,setup-ruby）が一部うまく動いていなかったりする
- ドキュメントが少ない
- サポート問い合わせてもなかなか返信がこない（おそらくGitHubの中のサポート体制がまだ整っていない）
- eventの粒度がちょっと荒め？
  - 例えば `create` イベントにはBranch or tagのcreateイベントが含まれるけど、ほしいのはtagのみの`tag_create`なんだよなぁみたいなとき
  - 意図しないイベントを拾ったりする（branch deleteでイベントトリガーされるとか）

しかし今回のGitHub Actions as CI神機能をみんな使わないわけないので、上記の足りない点は近い将来（正式公開前くらいには）、大体直ると考えています。なので僕はGitHub Action as CIとしての機能強化はわりと楽観的にのんびり待っている感じです。

## 結論

- GitHub Actions v2、間違いなく顧客が求めていたものと言えます。オープンソースは基本はGitHub ActionsでCIを動かすことになっていくでしょう。
- 上述した悪い点が飲み込めて、沼る覚悟がある方はGitHub Actions v2が利用可能になった時点で導入を前向きに検討しても良いかもしれません

## 実際に対応してみたPull Request

- [CI with GitHub Actions by toshimaru · Pull Request #33 · toshimaru/nyan](https://github.com/toshimaru/nyan/pull/33)
- [GitHub Actions by toshimaru · Pull Request #75 · toshimaru/dotfiles](https://github.com/toshimaru/dotfiles/pull/75)

[^1]: GitHubのサポートの方がそのようにGitHub Actionsを呼び分けていました。
