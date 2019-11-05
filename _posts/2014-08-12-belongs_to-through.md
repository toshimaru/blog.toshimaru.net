---
layout: post
title: ActiveRecordでhas_many, throughとは逆の関連を定義する
description: "とあるRailsアプリケーションでこんなテーブル構成があったとします。ユーザー（User）は複数の記事（Post）をもっていて、その記事は複数のコメント（Comment）を持っている、という状態です。上記のようなモデル定義においてユーザーモデルから直接コメントモデルへの関連を定義するにはどうしたらよいでしょうか？ 答えはhas_many+throughを使うことです。has_many, throughの逆の関連はどう定義したらよいのでしょうか？"
tags: activerecord rails
image: "/images/posts/has-many-through/og.png"
last_modified_at: 2019-11-04
toc: true
---

## TL;DR

`has_many`+`through`の逆の関連の定義には:

- `belongs_to`+`through`は使えない
- `delegate` or `has_one`+`through` が使える
- `has_one`+`through` の方が効率もよく、 `includes` も使えてオススメ

## テーブル構成

とあるRailsアプリケーションでこんなテーブル構成があったとします。

![User Post Comment](/images/posts/has-many-through/user-post-comment.png)

### Railsモデル構成

ユーザー（`User`）は複数の記事（`Post`）をもっていて、その記事は複数のコメント（`Comment`）を持っている、という状態です。

```rb
class User < ApplicationRecord
  has_many :posts
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
end

class Comment < ApplicationRecord
  belongs_to :post
end
```

## has_many, through の定義

上記のようなモデル定義においてユーザーモデルから直接コメントモデルへの関連を定義するにはどうしたらよいでしょうか？

答えは`has_many`+`through`を使うことです。

```rb
class User < ApplicationRecord
  has_many :posts
  has_many :comments, through: :posts
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
end

class Comment < ApplicationRecord
  belongs_to :post
end
```

下記一行が変更点となります。

```rb
has_many :comments, through: :posts
```

この変更により、特定のユーザーがどんなコメントを持っているかを下記のように一発で引くことができるようになりました。

```rb
user = User.find(1)
# User Load (0.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
user.comments
# Comment Load (0.5ms)  SELECT  `comments`.* FROM `comments` INNER JOIN `posts` ON `comments`.`post_id` = `posts`.`id` WHERE `posts`.`user_id` = 1 LIMIT 11
```

ではここで疑問。逆にコメントモデルから`Post`モデルを省いてユーザーを引くことはできないのでしょうか？ つまり **`has_many`, `through`の逆の関連はどう定義したらよいのでしょうか？**

### belongs_to, through は使えない？

`has_many`, `through`が使えるんだから `belongs_to`, `through` も使えると思うでしょう？　しかし実際に動かしてみると下記のエラーが発生してしまします。

```rb
class Comment < ApplicationRecord
  belongs_to :post
  belongs_to :user, through: :post
end
# => ArgumentError (Unknown key: :through. Valid keys are: :class_name, ...
```

残念ながら`belongs_to`には`through`というオプションは無いようです。

`has_many`, `through`の逆の関連を定義するには２つの方法があります。

## 1. delegate を使う方法

１つ目の方法は`delegate`を使うことです。具体的にはコメントモデルを下記のように変更します。

```rb
class User < ApplicationRecord
  has_many :posts
  has_many :comments, through: :posts
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
end

class Comment < ApplicationRecord
  belongs_to :post
  delegate :user, to: :post
end
```

下記のようにユーザーを引くことができるようになりました。

```rb
> Comment.first.user
#  Comment Load (0.3ms)  SELECT  `comments`.* FROM `comments` ORDER BY `comments`.`id` ASC LIMIT 1
#  Post Load (0.4ms)  SELECT  `posts`.* FROM `posts` WHERE `posts`.`id` = 1 LIMIT 1
#  User Load (0.3ms)  SELECT  `users`.* FROM `users` WHERE `users`.`id` = 1 LIMIT 1
=> #<User id: 1, name: "TEST", created_at: "2019-09-20 15:36:46", updated_at: "2019-09-20 16:34:31">
```

ご覧のように Comment → Post → User と順にロードされていることがわかります。

## 2. has_one, through を使う方法

２つ目の方法は`has_one`, `through`を使うことです。コメントモデルを下記のように変更します。

```rb
class User < ApplicationRecord
  has_many :posts
  has_many :comments, through: :posts
end

class Post < ApplicationRecord
  belongs_to :user
  has_many :comments
end

class Comment < ApplicationRecord
  belongs_to :post
  has_one :user, through: :post
end
```

こちらも同様に下記のようにユーザーを引くことができるようになりました。

```rb
> Comment.first.user
#  Comment Load (0.3ms)  SELECT  `comments`.* FROM `comments` ORDER BY `comments`.`id` ASC LIMIT 1
#  User Load (0.4ms)  SELECT  `users`.* FROM `users` INNER JOIN `posts` ON `users`.`id` = `posts`.`user_id` WHERE `posts`.`id` = 1 LIMIT 1
=> #<User id: 1, name: "TEST", created_at: "2019-09-20 15:36:46", updated_at: "2019-09-20 16:34:31">
```

こちらの方法の定義だと、SQLおよびモデルのLoadが`delegate`方式よりも一回分少なく済むので、より低コストでコメントからユーザーを引くことができます。

### includes も使うことができる

`has_one` で定義していると `includes` も使うことができます。

```rb
> Comment.includes(:user).find(1)
#  Comment Load (2.9ms)  SELECT  `comments`.* FROM `comments` WHERE `comments`.`id` = 1 LIMIT 1
#  Post Load (0.5ms)  SELECT `posts`.* FROM `posts` WHERE `posts`.`id` = 1
#  User Load (0.4ms)  SELECT `users`.* FROM `users` WHERE `users`.`id` = 1
=> #<Comment id: 1, ...
```

`eager_load`や`joins`も同様に使うことができます。

```rb
> Comment.joins(:user).find(1)
#  Comment Load (1.0ms)  SELECT  `comments`.* FROM `comments` INNER JOIN `posts` ON `posts`.`id` = `comments`.`post_id` INNER JOIN `users` ON `users`.`id` = `posts`.`user_id` WHERE `comments`.`id` = 1 LIMIT 1
=> #<Comment id: 1 ...
> Comment.eager_load(:user).find(1)
#  SQL (2.4ms)  SELECT  `comments`.`id` AS t0_r0, `comments`.`post_id` AS t0_r1, `comments`.`content` AS t0_r2, `comments`.`created_at` AS t0_r3, `comments`.`updated_at` AS t0_r4, `ube sers`.`id` AS t1_r0, `users`.`name` AS t1_r1, `users`.`created_at` AS t1_r2, `users`.`updated_at` AS t1_r3 FROM `comments` LEFT OUTER JOIN `posts` ON `posts`.`id` = `comments`.`post_id` LEFT OUTER JOIN `users` ON `users`.`id` = `posts`.`user_id` WHERE `comments`.`id` = 1 LIMIT 1
=> #<Comment id: 1 ...
```

## どちらの方法が良いか？

|  | `delegate` | `has_one`+`through` |
| - | - | - |
| `Comment` → `User` 参照のための総クエリ回数 | 3回 | 2回 |
| `includes` `joins` などが使えるか？  | ☓ 使用不可  | ○ 使用可 |
| 定義の意味 | `comment` から<br>`user` への関連を<br>`post` に移譲  | `comment` は<br>`post`を通して<br>`user`への関連を１つ持つ |

ということで `delegate` よりは  `has_one`+`through` を使うのがオススメです。

## 参考

- [belongs_to through associations](http://stackoverflow.com/questions/4021322/belongs-to-through-associations)
- [delegate (Module) - APIdock](https://apidock.com/rails/Module/delegate)
- [ActiveRecord::Associations::ClassMethods \| RailsDoc](https://railsdoc.github.io/classes/ActiveRecord/Associations/ClassMethods.html#method-i-has_one)
