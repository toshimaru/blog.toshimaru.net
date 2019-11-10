---
layout: post
title: "ActiveRecordでhas_oneを持ったモデルをスキップして関連を定義する方法"
image: "/images/posts/belongs-to-foreign-key-and-primary-key/og.png"
description: "Railsモデルは下記のような状態です。 ユーザー（User）は複数の記事（Post）データをもっている ユーザー（User）は１つのプロフィール（Profile）データをもっている　やりたいこととしてはこのモデル構成の中心にいる User の関連をスキップして Post と Profile を直接関連付けてやることです。つまり User has_one Profile, User has_many Posts の関係を、Profile has_many Posts の関係にしちゃおう、ということです。"
tags: activerecord rails
toc: true
---

## テーブル構成

とあるRailsアプリケーションでこんなテーブル構成があったとします。

![table relation](/images/posts/belongs-to-foreign-key-and-primary-key/users-posts.png)

## Railsモデル定義

Railsモデルは下記のような状態です。

- ユーザー（`User`）は複数の記事（`Post`）データをもっている
- ユーザー（`User`）は１つのプロフィール（`Profile`）データをもっている

```rb
class User < ApplicationRecord
  has_many :posts
  has_one :profile
end

class Post < ApplicationRecord
  belongs_to :user
end

class Profile < ApplicationRecord
  belongs_to :user
end
```

## has_oneをもったモデルをスキップする

やりたいこととしてはこのモデル構成の中心にいる `User` の関連をスキップして `Post` と `Profile` を直接関連付けてやることです。つまり **User has_one Profile**, **User has_many Posts** の関係を、**Profile has_many Posts** の関係にしちゃおう、ということです。

テーブル定義で表現すると下図の赤線の部分が今回やりたい関連の定義です。

![model relation 2](/images/posts/belongs-to-foreign-key-and-primary-key/users-posts2.png)

### モデル定義

上記のやりたいことはアソシエーションの定義において、`foreign_key`, `primary_key` などのオプションを駆使して実現可能です。

下記がそのアソシエーション定義の完成形となります。

```rb
class User < ApplicationRecord
  has_many :posts
  has_one :profile
end

class Post < ApplicationRecord
  belongs_to :user
  belongs_to :profile, foreign_key: :user_id, primary_key: :user_id
end

class Profile < ApplicationRecord
  belongs_to :user
  has_many :posts, foreign_key: :user_id
end
```

この定義により `Post` → `Profile`, `Profile` → `Post` の双方向の関連付けが定義することができました。

```rb
> Post.first.profile
#  Post Load (1.2ms)  SELECT  `posts`.* FROM `posts` ORDER BY `posts`.`id` ASC LIMIT 1
#  Profile Load (3.9ms)  SELECT  `profiles`.* FROM `profiles` WHERE `profiles`.`user_id` = 1 LIMIT 1
=> #<Profile id: 1, user_id: 1, ...">
> Profile.first.posts
#  Profile Load (0.8ms)  SELECT  `profiles`.* FROM `profiles` ORDER BY `profiles`.`id` ASC LIMIT 1
#  Post Load (0.4ms)  SELECT  `posts`.* FROM `posts` WHERE `posts`.`user_id` = 1 LIMIT 11
=> #<ActiveRecord::Associations::CollectionProxy [#<Post id: 1, user_id: 1, ...">, #<Post id: 2, user_id: 1, ...]>
```

上結果の通り、`User Load`を通すことなくお互いを呼び出すことができていることが確認できました。

## inverse_of を設定する

上記のコードでやりたいことが実現できましたが、まだ１つだけ問題があります。それは `foreign_key` オプションを使っているために、双方向の関連付けが不完全に設定されていることです。

> Active Recordでは標準的な名前同士の関連付けのほとんどをサポートしていて、自動的に認識できます。ただし、Active Recordでスコープや次のオプションを使った場合、双方向の関連付けは自動的に認識されません。
>
> - `:through`
> - `:foreign_key`

via. [Active Record の関連付け - Rails ガイド](https://railsguides.jp/association_basics.html#%E5%8F%8C%E6%96%B9%E5%90%91%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91)

実際に試してみましょう。すると下記の通り、同じidを持ったインスタンスにもかかわらず違うオブジェクトとして生成されていることがわかります。

```rb
> profile1 = Profile.first
=> #<Profile id: 1, user_id: 1, ...">
> profile2 = profile1.posts.first.profile
=> #<Profile id: 1, user_id: 1, ...">
> profile1.equal? profile2
=> false
```

### モデル定義（inverse_of version）

これを解決するために `inverse_of` を設定します。上述のコードを下記のように変更します。

```rb
class User < ApplicationRecord
  has_many :posts
  has_one :profile
end

class Post < ApplicationRecord
  belongs_to :user
  belongs_to :profile, foreign_key: :user_id, primary_key: :user_id, inverse_of: :posts
end

class Profile < ApplicationRecord
  belongs_to :user
  has_many :posts, foreign_key: :user_id, inverse_of: :profile
end
```

これで下記コードは同じオブジェクトとなり、`true`を返すようになります。

```rb
> profile1 = Profile.first
> profile2 = profile1.posts.first.profile
> profile1.equal? profile2
=> true
```

## 過去に書いた関連記事

* [ActiveRecordでhas_many, throughとは逆の関連を定義する](/belongs_to-through/)

## 参考

* [ActiveRecord::Associations::ClassMethods - belongs_to \| RailsDoc(β)](https://railsdoc.github.io/classes/ActiveRecord/Associations/ClassMethods.html#method-i-belongs_to)
* [ActiveRecord::Associations::ClassMethods - has_many \| RailsDoc(β)](https://railsdoc.github.io/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_many)
