# 糞コード対処するための アプローチ

## スクラップ & ビルドアプローチ

一度ぶっ壊して0から作り直す。

犠牲的アーキテクチャ(Sacrificial Architecture)や式年遷宮アーキテクチャと言われたりする。

### 参考
* http://blog.oimou.com/shen-gong-shi-nian-qian-gong-toikenie-sheng-de-akitekutiyaaf27a09a/

## マイクロサービス化 アプローチ

糞の一部を糞じゃなくす。糞を切り取って浄化するアプローチ。結果的に糞の量が減るが、依然として糞は残り続ける。

### 参考
* http://martinfowler.com/articles/microservices.html 合わせて読みたい: monolith first

## 段階的リファクタリング

独立性の強い新機能に関しては糞じゃないコードでかく。徐々に糞を新コードベースへと移行していく。

自分がやったパターンだと古いコードベースはnamespace Legacy で分離しちゃって最終的にそのLegacyコードが消えていくように調整していく。既存の機能と共存しながら糞を浄化していくアプローチ。

## 目には目を、糞には糞をアプローチ

糞の上に糞を塗りたくるアプローチ。糞コードならば、糞コード書いても問題ないよね、という考え。

問題点はさらに巨大な糞が出来上がること。後任が死ぬこと。

## 野糞アプローチ

糞によって糞を作り上げ糞のごとく捨てていくアプローチ。ソシャゲ業界ではよく使われると聞く。スピード優先、質なんて関係ねぇ。