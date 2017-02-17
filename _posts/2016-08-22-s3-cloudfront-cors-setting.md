---
layout: post
title: AWS S3 + CloudFront のCORS設定手順
image: /images/posts/cors/cache-distribution.png
description: Font Awesomeのようなフォントファイルを外部ホスト（例えばS3など）から読み込もうとする場合、Access-Control-Allow-OriginのヘッダでAllowされていないOriginからのリクエストの場合いわゆるフォントの豆腐現象が起きる。これはCORS(Cross-Origin Resource Sharing) の設定が正しくなされていないためだ。今回はAWSのS3+CloudFrontの構成でフォントファイルを配信したいので、S3およびCloudFrontのCORS設定手順および確認方法について説明する。
tags: aws s3
---

（画像は[AWS-CloudDesignPattern](http://aws.clouddesignpattern.org/index.php/CDP:Cache_Distribution%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)から引用）

## フォントファイルの豆腐化問題

[Font Awesome](http://fontawesome.io/)のようなフォントファイルを外部ホスト（例えばS3など）から読み込もうとする場合、`Access-Control-Allow-Origin`のヘッダでAllowされていないOriginからのリクエストの場合、いわゆるフォントの豆腐現象が起きます。これは[CORS(Cross-Origin Resource Sharing)](https://developer.mozilla.org/ja/docs/Web/HTTP/HTTP_access_control)
の設定が正しくなされていないためです。今回はAWSのS3+CloudFrontの構成でフォントファイルを配信したいので、S3およびCloudFrontのCORS設定手順および確認方法について説明します。

## S3の設定

CORSの設定はS3のバケットのプロパティ設定から行えます。

![s3 bucket property](/images/posts/cors/s3.png)

XMLをサンプルとして下記のように設定できます。

### CORS Configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>http://sample.jp</AllowedOrigin>
        <AllowedOrigin>https://sample.jp</AllowedOrigin>
        <AllowedMethod>HEAD</AllowedMethod>
        <AllowedMethod>GET</AllowedMethod>
        <MaxAgeSeconds>3600</MaxAgeSeconds>
        <ExposeHeader>ETag</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

`AllowedOrigin`で許可したいOriginのURLを設定、`AllowedMethod`で許可したいHTTPリクエストメソッドを指定します。それぞれ複数並べることで複数の値を設定することが可能となっています。

### 確認手順

正しく設定されているかを確認するために下記のように`curl`コマンドを使って検証してみましょう。

```
$ curl -X GET -I -H "Origin: http://sample.jp" https://s3-ap-northeast-1.amazonaws.com/bucket/path
HTTP/1.1 200 OK
x-amz-id-2: xxx
x-amz-request-id: xxx
Date: xxx
Access-Control-Allow-Origin: http://sample.jp
Access-Control-Allow-Methods: GET
Access-Control-Expose-Headers: ETag
Access-Control-Max-Age: 3600
Access-Control-Allow-Credentials: true
Vary: Origin, Access-Control-Request-Headers, Access-Control-Request-Method
Last-Modified: xxx
ETag: "xxx"
Accept-Ranges: bytes
Content-Type: application/json
Content-Length: 14356
Server: AmazonS3
```

`Access-Control-Allow-Origin: http://sample.jp` のレスポンスがヘッダが返ってきており、正しく AllowOrigin されていることが確認できました。

## CloudFront

実運用の際はS3から配信ではなく、CloudFrontと組み合わせて利用するケースが多いかと思います。

[Amazon S3 での CloudFront  の設定](http://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/MigrateS3ToCloudFront.html)が済んでいることを前提として進めていいきます。

### CloudFrontの CORS 設定

CORSの設定のためには、対象クラウドフロント設定から Behaviors を選択しデフォルトパスパターンの設定を変更する必要があります。OriginヘッダーがS3まで通る必要があるので`Origin`ヘッダーを Whitelist Headers に加えてやります。

![](/images/posts/cors/cloudfront.png)

### 確認手順

S3と同じく、`curl`で確認してみます。

```
$ curl -X GET -I -H "Origin: http://sample.jp"  https://xxx.cloudfront.net/bucket/path
HTTP/1.1 200 OK
Content-Type: binary/octet-stream
Content-Length: 123
Connection: keep-alive
Date: xxx
Access-Control-Allow-Origin: http://sample.jp
Access-Control-Allow-Methods: GET
Access-Control-Expose-Headers: ETag
Access-Control-Max-Age: 3600
Access-Control-Allow-Credentials: true
Last-Modified: xxx
ETag: "xxx"
Accept-Ranges: bytes
Server: AmazonS3
Vary: Origin
Age: 9
X-Cache: Hit from cloudfront
Via: 1.1 xxxx.cloudfront.net (CloudFront)
X-Amz-Cf-Id: xxx
```

S3と同じく`Access-Control-Allow-Origin`ヘッダが設定されていることを確認できました。めでたしめでたし。

### 設定にあたっての注意事項

* 不正な設定状態のままリクエストをすると、設定を変えたのにもかかわらず、CloudFrontにその不正な状態が残ったままになることがあるっぽい
  * その場合は [Invalidation](http://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)を行い、キャッシュをCloudFrontから消してみると解決するかも
  * Invalidation や設定変更反映はけっこう時間かかるので注意（試行錯誤のスピード落ちるのでもっと速くしてほしいところ...）
* ~~現時点ではCloudFrontは HTTP/2 未対応~~
  * ~~2017年くらいには対応してきそうな予感がある（あくまで個人的予想）~~
  * :new: 2016年９月にCloudFrontがHTTP/2に対応しました [New – HTTP/2 Support for Amazon CloudFront \| AWS Blog](https://aws.amazon.com/blogs/aws/new-http2-support-for-cloudfront/)
* ブラウザからアクセスされるOriginヘッダは**末尾スラッシュ無し**である点に注意

## 参考

- [Cross-Origin Resource Sharing (CORS) - Amazon Simple Storage Service](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/cors.html)
- [リクエストヘッダーに基づいてオブジェクトをキャッシュするように CloudFront を設定する - Amazon CloudFront](http://docs.aws.amazon.com/ja_jp/AmazonCloudFront/latest/DeveloperGuide/header-caching.html#header-caching-web-cors)
