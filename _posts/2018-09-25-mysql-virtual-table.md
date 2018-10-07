---
layout: post
title: MySQLで連番の仮想表を作る
image: "/images/posts/virtual-table-og.jpg"
description: MySQLで実テーブルを参照せずに連番のデータを生成したい。 前提環境 MySQL 5.7 方法 下記のようなSQLでやりたいことが実現できます。 
tags: mysql
toc: true
---

## やりたいこと

MySQLで実テーブルを参照せずに連番のデータを生成したい。

## 前提環境

- MySQL 5.7

## 方法

下記のようなSQLでやりたいことが実現できます。

```sql
SELECT @seq_no := 1 AS seq_no
UNION
SELECT @seq_no := @seq_no + 1 AS seq_no
FROM information_schema.COLUMNS
LIMIT 10;
```

ポイントとしては下記の通り。

- 全体の構成としては、2つの`SELECT`文を`UNION`を使って結合しているというもの
- `@seq_no`という変数を用意
- １つ目の`SELECT`文で変数を初期化する
- ２つ目の`SELECT`文で初期化した変数のインクリメントの処理を行う
    - その際にデータ件数を確保するために、MySQLで最初に用意されている`information_schema.COLUMNS`を参照する（中身のデータは実際には使わない）
    - `LIMIT`で取得したいデータ件数を指定する

このSQLで得られる結果は下記の通り。

| seq_no |
| --- |
| 1 |
| 2 |
| 3 |
| 4 |
| 5 |
| 6 |
| 7 |
| 8 |
| 9 |
| 10 |

これで1から10までの連番のデータをSQLだけで得ることができました。

## 応用編

上記で紹介したテクニックを使えばいろいろなことがSQLで実現できます。

### 0からデクリメント

まずはインクリメントの逆、デクリメント。

```sql
SELECT @seq_no := 0 AS seq_no
UNION
SELECT @seq_no := @seq_no - 1 AS seq_no
FROM information_schema.COLUMNS
LIMIT 5;
```

**結果**

| seq_no |
| --- |
| 0 |
| -1 |
| -2 |
| -3 |
| -4 |

### 値を倍加させる

値を倍々にしていってみます。

```sql
SELECT @seq_no := 1 AS seq_no
UNION
SELECT @seq_no := @seq_no * 2 AS seq_no
FROM information_schema.COLLATIONS
LIMIT 10;
```

- `information_schema.COLUMNS` を使うと`seq_no`値が大きくなりすぎてしまい`DOUBLE value is out of range`というエラーが発生するので`information_schema.COLLATIONS`を使用


**結果**

| seq_no |
| --- |
| 1 |
| 2 |
| 4 |
| 8 |
| 16 |
| 32 |
| 64 |
| 128 |
| 256 |
| 512 |

### 直近30日間の日付をリストアップ

直近30日間の日付をリストアップしてみる。

```sql
SELECT CURDATE() - INTERVAL seq_no DAY AS date
FROM (SELECT @seq_no := 0 AS seq_no
      UNION
      SELECT @seq_no := @seq_no + 1 AS seq_no FROM information_schema.COLUMNS
      LIMIT 30) tmp;
```

**結果**

| date |
| --- |
| 2018-09-24 | 
| 2018-09-23 | 
| 2018-09-22 |
| 2018-09-21 |
| （...省略...） | 
| 2018-08-27 | 
 
- 執筆時点の今日の日付は`2018-09-25`
- `CURDATE()`から`seq_no`日分を引き算して日付を出力

## 注意点

- `information_schema.COLUMNS`を使った場合、`LIMIT`で指定できる値は`information_schema.COLUMNS`のMAX値までという成約がある
- MySQL7から導入された[WITH syntax](https://dev.mysql.com/doc/refman/8.0/en/with.html)でCTEすればもっとシンプルにクエリが書けそう
