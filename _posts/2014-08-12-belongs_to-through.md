---
layout: post
title: Railsでhas_many, throughではなくdelegate, throughを利用する
published: true
description: RailsでこんなModel構成があったとします。ユーザーは複数の記事をもっていて、その記事は複数のタグを持っている、という状態です。特定のUserがどんなTagを持っているかを調べるにはthroughを使うと簡単に実装できます。Userモデルにthroughを追加しましょう。
tags: rails
---

## TL;DR

結論はdelegate,throughでなく、delegate,to。

## has_many, through

RailsでこんなModel構成があったとします。ユーザーは複数の記事をもっていて、その記事は複数のタグを持っている、という状態です。

{% highlight ruby %}
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
{% endhighlight %}

特定のUserがどんなTagを持っているかを調べるには`through`を使うと簡単に実装できます。`User`モデルに`through`を追加しましょう。

{% highlight ruby %}
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
{% endhighlight %}

こうすることで、`@user.tags`でユーザーが所有するタグを取得できます。

ではここで疑問。逆に`Tag`から`Post`を省いて`User`を導きだすことはできないのでしょうか？

## delegate を使う

結論からいうと`delegate`を利用することで省けます。具体的には`Tag`モデルをこうします。

{% highlight ruby %}
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
{% endhighlight %}

これで`@tag.user`なんて風に当該tagを所有するuserにアクセスできます。

### 参考
* [belongs_to through associations](http://stackoverflow.com/questions/4021322/belongs-to-through-associations)