---
layout: post
title: 【Rails】has_many, throughの逆の関連はdelegate, toかhas_one, through
published: true
description: RailsでこんなModel構成があったとします。ユーザーは複数の記事をもっていて、その記事は複数のタグを持っている、という状態です。特定のUserがどんなTagを持っているかを調べるにはthroughを使うと簡単に実装できます。Userモデルにthroughを追加しましょう。
tags: rails activerecord
---

## TL;DR

結論は`belongs_to`,`through`でなく、`delegate`, `to` もしくは `has_one`, `through`。

## has_many, through

RailsでこんなModel構成があったとします。ユーザーは複数の記事をもっていて、その記事は複数のタグを持っている、という状態です。

```rb
class User < ActiveRecord::Base
  has_many :posts
end

class Post < ActiveRecord::Base
  has_many :tags
  belongs_to :user
end

class Tag < ActiveRecord::Base
  belongs_to :post
end
```

特定のUserがどんなTagを持っているかを調べるには`through`を使うと簡単に実装できます。`User`モデルに`through`を追加しましょう。

```rb
class User < ActiveRecord::Base
  has_many :posts
  has_many :tags, through: :posts
end

class Post < ActiveRecord::Base
  has_many :tags
  belongs_to :user
end

class Tag < ActiveRecord::Base
  belongs_to :post
end
```

こうすることで、`@user.tags`でユーザーが所有するタグを取得できます。

ではここで疑問。逆に`Tag`から`Post`を省いて`User`を導きだすことはできないのでしょうか？

## 1. delegate を使う

結論からいうと`delegate`を利用することで省けます。具体的には`Tag`モデルをこうします。

```rb
class User < ActiveRecord::Base
  has_many :posts
  has_many :tags, through: :posts
end

class Post < ActiveRecord::Base
  has_many :tags
  belongs_to :user
end

class Tag < ActiveRecord::Base
  belongs_to :post
  delegate :user, to: :post
end
```

これで`@tag.user`なんて風に当該tagを所有するuserにアクセスできます。

## 2. has_one, through を使う

このように`has_one`, `through`も使えます。

```rb
class User < ActiveRecord::Base
  has_many :posts
  has_many :tags, through: :posts
end

class Post < ActiveRecord::Base
  has_many :tags
  belongs_to :user
end

class Tag < ActiveRecord::Base
  belongs_to :post
  has_one :user, through: :post
end
```

### 参考
* [belongs_to through associations](http://stackoverflow.com/questions/4021322/belongs-to-through-associations)
