---
layout: post
title: VS Code Extensionの公開手順
image: "/images/posts/vsts/og.png"
description: 先日VSCode Extensionを公開しました。公開するにあたっての手順をメモがてら残したいと思います。 まずVSCode Extensionを公開するためには、Visual Studio Team Servicesアカウントが必要になります。
tags: vscode
toc: true
---

先日VSCode Extensionを公開しました。公開するにあたっての手順をメモがてら残したいと思います。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">Blogged. | はじめてのVS Code Extension、Hybrid Next Plusテーマを公開しました - Hack Your Design! <a href="https://t.co/2cg3jwnT5q">https://t.co/2cg3jwnT5q</a></p>&mdash; toshimaru (@toshimaru_e) <a href="https://twitter.com/toshimaru_e/status/1024512092341030912?ref_src=twsrc%5Etfw">August 1, 2018</a></blockquote>

## Visual Studio Team Servicesアカウントの作成

まずVSCode Extensionを公開するためには、[Visual Studio Team Services](https://visualstudio.microsoft.com/team-services/)アカウントが必要になります。

![](/images/posts/vsts/sign-in.png)

「MSのメールアカウントを作らなければならないんか！？」と一瞬思っちゃいましたが、手持ちのGmailなどでも登録できるのでご安心を。

## プロジェクト作成

自分の好きな名前でプロジェクトを作成します。

![](/images/posts/vsts/create-pj.png)

## アクセストークンの取得

作成したプロジェクトページ( `https://{youraccount}.visualstudio.com` )でアクセストークンを取得します。 右上メニューのセキュリティからアクセストークンの追加を行ってください。

![](/images/posts/vsts/security.png)

![](/images/posts/vsts/accesstoken.png)

下記の内容でアクセストークンを作成します。

- Description: **vsce**
- Expire: **1 year**
- Scope: **All**

**※ScopeをAllに設定しないとこのあとの手順がうまくいかないので注意！**

![](/images/posts/vsts/get-token.png)

## vsceのダウンロード

VSCode Extensionの公開に際しては`vsce`コマンドを使用します。npmでダウンロードしてください。

```
$ npm install -g vsce
```

## Publisher作成

[Marketplace publisher management page](https://marketplace.visualstudio.com/manage) で必要な項目を記入した上でCreate Publisherを行います。

## vsceログイン

下記のコマンドでvsceログインします。手順のなかでアクセストークンを聞かれるので上手順で入手したトークンを入力します。

```
vsce login (publisher name)
```

## 公開！

これで公開準備が整ったので、VSCode Extensionのルートで下記のコマンドを打ってExtensionを公開します。

```
vsce publish
``` 

## 参考資料

- [Publishing Visual Studio Code Extensions](https://code.visualstudio.com/docs/extensions/publish-extension)
- [Create a VSTS organization with a Microsoft account or a work account \| Microsoft Docs](https://docs.microsoft.com/en-us/vsts/organizations/accounts/create-organization-msa-or-work-student?view=vsts)
