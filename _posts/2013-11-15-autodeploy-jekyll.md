---
layout: post
title: Jekyllでgit pushをフックしてGithub Pagesへ自動デプロイするようにした
description: 本ブログはJekyllを使って構築しているのですがgit pushしたときにTravis-CIと連携してTravis上でビルドしてGithub Pageへとデプロイするように変更してみました。
tags: github jekyll
last_modified_at: 2020-06-22
image: "/images/posts/github-pages/og.png"
toc: true
---

本ブログはJekyllを使って構築しているのですが`git push`したときに[TravisCI](https://travis-ci.org/)と連携してTravis上でビルドして[Github Page](https://pages.github.com/)へとデプロイするように変更してみました。作業にあたっては下記ブログを参考にさせていただきました。

[OctopressとTravis CIを連携させてBlog生成を自動にする](http://pchw.github.io/blog/2013/06/27/octopress-travis/)

上手順において２点、注意点があります。

- `brew install travis`でtravisコマンドはインストールできなくなっているっぽいので`gem install travis`で対応すること。
- 上記では公開鍵暗号方式を使っているが、[OAuth Access Tokens](https://help.github.com/articles/creating-an-access-token-for-command-line-use)を使ったほうが手間がかからなくて楽です。

ということで公開鍵暗号方式ではなくOAuth Tokenを使うようにします。その場合は下記が参考になります。

[Middleman で作った web サイトを Travis + GitHub pages でお手軽に運用する](http://tricknotes.hateblo.jp/entry/2013/06/17/020229)

## デプロイまでの流れ

デプロイまでの流れとしてはこんな感じです。

1. githubにエントリをpushする
2. pushをフックしてTravisCI起動（事前にService HooksでTravisと連携するように設定してある）
3. Travis上でスタティックサイトをビルド
4. TravisからgithubへとToken通してpushする

結果的に作成した`.travis.yml`,`Rakefile`はこんな感じです。

## .travis.yml

```rb
sudo: false
language: ruby
cache: bundler
rvm:
  - 2.6.3

before_install:
  - gem install bundler
before_script:
  - rake setup
script:
  - bundle exec jekyll build
after_success:
  - ./deploy.bash

env:
  global:
    - secure: "Gfz3Y4s2..."
    - GIT_COMMITTER_NAME="Toshimaru via TravisCI"
    - GIT_COMMITTER_EMAIL="me@toshimaru.net"
    - GIT_AUTHOR_NAME="Toshimaru via TravisCI"
    - GIT_AUTHOR_EMAIL="me@toshimaru.net"
```

## Rakefile

```rb
REPOSITORY =
  if ENV['GH_TOKEN']
    'https://$GH_TOKEN@github.com/toshimaru/blog.toshimaru.net.git'
  else
    'git@github.com:toshimaru/blog.toshimaru.net.git'
  end

define_method(:build_jekyll_pages) { sh 'bundle exec jekyll build' }
define_method(:cleanup_deploy_dir) { sh 'rm -rf _deploy/*' }
define_method(:put_pages_into_deploy_dir) { sh 'cp -R _site/* _deploy' }

desc 'Clone blog repository to _deploy directory and checkout gh-pages branch'
task :setup do
  sh 'rm -rf  _deploy'
  sh "git clone #{REPOSITORY} _deploy"
  cd('_deploy') { sh 'git checkout gh-pages' }
end

desc 'deploy static pages to gh-pages automatically via Travis-CI'
task :autodeploy do
  build_jekyll_pages
  cleanup_deploy_dir
  put_pages_into_deploy_dir
  cd '_deploy' do
    sh 'git add -A'
    sh 'git commit -m "Update via Travis"'
    sh "git push --quiet #{REPOSITORY} gh-pages 2> /dev/null"
  end
end
```

このように設定しておけばGitHub上のエディタだったり[prose.io](https://prose.io/)みたいなサービス使ってWEB上でも記事を投稿できてグッドですね（実際はローカル上のエディタでの編集が慣れているのでWEB編集画面は使わないけど...）。
