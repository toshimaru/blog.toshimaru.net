---
layout: post
title: GitHub Actionsファーストインプレッション 〜v1との違い、導入方法、価格、良い点・悪い点〜
image: "/images/posts/github-actions/og.png"
description: "GitHub Actions v2(beta)が手元に降ってきたので試してみた記事です。 ※まだBeta版なので本エントリに書いてある記述は古くなるなる可能性があります。最新情報は適宜公式ドキュメントを参照してください。 TL;DR GitHub Actions v2、間違いなく顧客が求めていたもの 複雑なワークフロー組むにはちょっとまだバギーなので利用は控えとくのがよさげ（シンプルなものなら検討可） GitHub Actions v1, GitHub Actions v2がある まず注意点なのですが、GitHub ActionsにはGitHub社内的にGitHub Actions v1と呼ばれているものとGitHub Actions v2と呼ばれているものの２種類あります。それぞれ違いを下記に列挙します。"
tags: github ci
last_modified_at: 2020-05-31
---

[GitHub Actions v2(beta)](https://github.com/features/actions)が手元に降ってきたので試してみた記事です。

{% include warning.html title="" text="※まだBeta版なので本エントリに書いてある記述は古くなるなる可能性があります。最新情報は適宜公式ドキュメントを参照してください。" %}

公式ドキュメント: [Automating your workflow with GitHub Actions - GitHub Help](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)

## TL;DR

- GitHub Actions v2、間違いなく顧客が求めていたもの
- 複雑なワークフロー組むにはちょっとまだバギーなので利用は控えとくのがよさげ（シンプルなものなら検討可）

## 実際に対応してみたPull Request

- [CI with GitHub Actions by toshimaru · Pull Request #33 · toshimaru/nyan](https://github.com/toshimaru/nyan/pull/33)
- [GitHub Actions by toshimaru · Pull Request #75 · toshimaru/dotfiles](https://github.com/toshimaru/dotfiles/pull/75)

## GitHub Actions v1, GitHub Actions v2がある

まず注意点なのですが、GitHub ActionsにはGitHub社内的にGitHub Actions v1と呼ばれているものとGitHub Actions v2と呼ばれているものの２種類あります[^1]。

{% include info.html title="追記" text="GitHub Actions v1がDeprecatedになったため、現在はv1の多くのコンテンツがv2の内容で置き換わってます。" %}

それぞれ違いを下記に列挙します。

|    | GitHub Actions v1 | GitHub Actions v2 |
| -- | -- | -- |
| 特徴 | 汎用的なワークフロー型の<br>自動化ソリューション | CI機能を備えた<br>自動化ソリューション |
| 記述言語 | HCL | YAML(JS拡張可) |
| 公開ステータス | ~~2019年9月一杯でdeprecatedになる~~<br>Deprecated | public beta<br>（順次ロールアウト中） |
| ドキュメントURL | ~~[developer.github.com](https://developer.github.com/actions/)~~<br>※現在アクセス不可 | [help.github.com](https://help.github.com/en/actions/automating-your-workflow-with-github-actions) |
| サポートOS | Linux | Linux/Mac/Windows |
| 環境設定 | `Dockerfile`を自ら記述 | 用意されたOSを選択して利用 |
| バックエンドインフラ | ?（おそらくGitHub Cloud?） | Azure PipelinesのFork |
| マーケットプレイス | [GitHub Marketplace](https://github.com/marketplace?type=actions) | [GitHub Marketplace](https://github.com/marketplace?type=actions)<br>※v1と同一URL |

２つあるので、「GitHub Actions」というキーワードでGoogle検索したときに古いv1の情報が出てくることもあるので注意してください。v1前提なのかv2前提なのかで全く内容が異なってきます。

またv1が手元で使えるからといってv2が自動的に使えるわけではありません。それぞれ別物なのでv1が使えてたとしても、v2が利用可能対象ユーザーとして降ってくるまでは使えません。

## 導入方法

設定方法は簡単。GitHub Action v2が使える対象になっていれば、下記のように表示されますので **Enable Repository** してください。

![Enable Repository](/images/posts/github-actions/enable.png)

有効化されると、下記画面が出てくるのでGUIでポチポチワークフローを設定するもよし。

![Enable Repository 2](/images/posts/github-actions/get-started.png)

`.github/workflows`以下に直接YAMLを置くもよし。動くYAMLサンプルは下記の公式 starter-workflows レポジトリを覗いてみるとよいかと思います。

Accelerating new GitHub Actions workflows:
<https://github.com/actions/starter-workflows/tree/master/ci>

## 価格

気になる価格はどうでしょう。

![pricing](/images/posts/github-actions/price.png)

Public Repoは **完全無料**。並列数も **20並列** まで使える模様。

TravisCI, CircleCIと比較されることが多いかと思いますが、どちらのCIサービスも同じように無料で使えるものの並列数に制限があったり、CIジョブのキューイング・実行が遅かったりするので、今回のGitHub Actionsは完全にTravisCI, CircleCIを殺しにきたと言えるでしょう。

## 良い点

- 主要OSであるLinux/Mac/Windowsは[すべて対応](https://help.github.com/en/articles/virtual-environments-for-github-actions#supported-virtual-environments)
- イベントをhookしてからジョブが走り出すまでが早い
- GitHubサービス内で完結する
  - いろんなページを行ったり来たりしなくてよい
- 並列数がしっかり確保されている
- `GITHUB_TOKEN`が自動的に発行される
  - 外部CIサービスの場合、新たにTokenを払い出す必要があったので手間だった
- GitHubとカジュアルに連携できるということで使い方の可能性は無限大...!!!
  - lintしてPRにコメント
  - /x/path に変更あったら xxx のジョブ起動
  - PR/Issueへの自動ラベリング
  - Tagプッシュされたらリリース
  - 何らかの条件でIssueの作成/クローズ
  - GitHubのコメントでチャットボット的な感覚でワークフロー呼び出し
  - などなど
    - [Marketplace](https://github.com/marketplace?type=actions)や[awesome-actions](https://github.com/sdras/awesome-actions)で良さげなものを探し見ると良さそう

## 悪い点

- ~~キャッシュ機構がない~~
  - _（追記）_ きました: [Caching dependencies to speed up workflows - GitHub Help](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/caching-dependencies-to-speed-up-workflows)
- Slack通知が公式では用意されていない
- `[ci skip]` 機能がない
- ドキュメントが少ない
- ~~CI Status Badgeがない~~
  - _（追記）_ CI Status Badgeに関して [公式ドキュメント](https://help.github.com/en/articles/configuring-a-workflow#adding-a-workflow-status-badge-to-your-repository) に来ました
- ~~Betaなのでまだいろいろとバギー~~
  - ~~例: 公式の提供するAction（setup-go,setup-ruby）が一部うまく動いていなかったりする~~
  - _（追記）_ だいぶ安定してきた感はあります
- ~~サポート問い合わせてもなかなか返信がこない（おそらくGitHubの中のサポート体制がまだ整っていない）~~
  - _（追記）_ もうGitHubの中のサポート体制は整ったと思われるので、比較的返事も早く返ってくるようになった模様
- eventの粒度がちょっと荒め？
  - 例えば `create` イベントには Branch or Tag のcreateイベントが含まれるけど、ほしいのはtagのみの`tag_create`イベントなんだよなぁみたいなとき
  - 意図しないイベントを拾ったりする（branch deleteでイベントトリガーされるとか）

しかし今回のGitHub Actions as CI神機能をみんな使わないわけないので、上記の足りない点は近い将来（正式公開前くらいには）、大体直ると考えています。なので僕はGitHub Action as CIとしての機能強化はわりと楽観的にのんびり待っている感じです。

## 結論

- GitHub Actions v2、間違いなく顧客が求めていたものと言えます。オープンソースは基本はGitHub ActionsでCIを動かすことになっていくでしょう
- 上述した悪い点が飲み込めて、沼る覚悟がある方はGitHub Actions v2が利用可能になった時点で導入を前向きに検討しても良いかもしれません。ただCircleCIなどで行っているような複雑なワークフローの移行は、まだ知見も少ない状況なのでなかなか大変な作業だと思います
- 今後どんどん便利になって、いろんなバリエーションのActionもサポートされていくと思われるので、ガンガン使ってより良いCIライフにしましょう

[^1]: GitHubのサポートの方がそのようにGitHub Actionsを呼び分けていました。
