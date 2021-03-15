---
layout: post
title: Dockerマルチステージビルドの並列実行
image: "/images/posts/docker/desktop1.png"
description: "本記事では、マルチステージビルド構成のDockerfileのビルドの並列実行について紹介したいと思います。"
hideimage: true
tags: docker
toc: true
---

本記事では、マルチステージビルド構成の`Dockerfile`のビルドの並列実行について紹介したいと思います。

## 前提

- Docker Desktop v3.2.1
  - Docker v20.10
  - Docker Compose v1.28

![](/images/posts/docker/desktop1.png)

## Dockerfile

今回テストで使うマルチステージビルドのサンプルとなる`Dockerfile`は下記です。

```dockerfile
FROM alpine as test1
RUN sleep 10.1 # sleep from test1

FROM alpine as test2
RUN sleep 10.2 # sleep from test2

FROM alpine as test3
RUN sleep 10.3 # sleep from test3


FROM alpine
RUN echo "build start"
RUN sleep 10.0 # sleep from main

COPY --from=test1 /tmp /tmp
COPY --from=test2 /tmp /tmp
COPY --from=test3 /tmp /tmp

RUN echo "build finished"
```

## 直列実行 vs 並列実行

実際に上述の `Dockerfile` のビルドを並列実行しない場合（直列実行）と並列実行する場合の結果を比較してみます。

### 並列実行しない場合

並列実行をOFFにして実行するには `DOCKER_BUILDKIT=0` の環境変数をセットして `docker build`を行います。

```console
$ DOCKER_BUILDKIT=0 docker build --no-cache .
Sending build context to Docker daemon  331.1MB
Step 1/13 : FROM alpine as test1
 ---> b7b28af77ffe
Step 2/13 : RUN sleep 10.1 # sleep from test1
 ---> Using cache
 ---> 11b4518313de
Step 3/13 : FROM alpine as test2
 ---> b7b28af77ffe
Step 4/13 : RUN sleep 10.2 # sleep from test2
 ---> Using cache
 ---> c61101646517
Step 5/13 : FROM alpine as test3
 ---> b7b28af77ffe
Step 6/13 : RUN sleep 10.3 # sleep from test3
 ---> Using cache
 ---> 1aa97a170923
Step 7/13 : FROM alpine
 ---> b7b28af77ffe
Step 8/13 : RUN echo "build start"
 ---> Using cache
 ---> 8b2b09749321
Step 9/13 : RUN sleep 10.0 # sleep from main
 ---> Using cache
 ---> bc3f772d3fb1
Step 10/13 : COPY --from=test1 /tmp /tmp
 ---> Using cache
 ---> 0f861020f1c0
Step 11/13 : COPY --from=test2 /tmp /tmp
 ---> Using cache
 ---> eea3d212c0b7
Step 12/13 : COPY --from=test3 /tmp /tmp
 ---> Using cache
 ---> 9beba31a0ff6
Step 13/13 : RUN echo "build finished"
 ---> Using cache
 ---> 0986bef3d18f
Successfully built 0986bef3d18f
```

`sleep 10` × 4 が直列に実行されるため、ビルドに **最低でも40秒** かかっていました。

### 並列実行する場合

では次に並列実行してみましょう。

並列実行するには `DOCKER_BUILDKIT=1` をセットするか、私の環境の場合 `DOCKER_BUILDKIT` の環境変数のセットしなくてもデフォルトで並列実行されるようになっていました。

```console
$ docker build --no-cache .
[+] Building 13.9s (14/14) FINISHED
 => [internal] load build definition from Dockerfile                                            0.1s
 => => transferring dockerfile: 37B                                                             0.0s
 => [internal] load .dockerignore                                                               0.1s
 => => transferring context: 2B                                                                 0.0s
 => [internal] load metadata for docker.io/library/alpine:latest                                0.0s
 => CACHED [test3 1/2] FROM docker.io/library/alpine                                            0.0s
 => [test2 2/2] RUN sleep 10.2 # sleep from test2                                              12.4s
 => [stage-3 2/7] RUN echo "build start"                                                        2.3s
 => [test3 2/2] RUN sleep 10.3 # sleep from test3                                              12.5s
 => [test1 2/2] RUN sleep 10.1 # sleep from test1                                              12.3s
 => [stage-3 3/7] RUN sleep 10.0 # sleep from main                                             10.6s
 => [stage-3 4/7] COPY --from=test1 /tmp /tmp                                                   0.1s
 => [stage-3 5/7] COPY --from=test2 /tmp /tmp                                                   0.1s
 => [stage-3 6/7] COPY --from=test3 /tmp /tmp                                                   0.1s
 => [stage-3 7/7] RUN echo "build finished"                                                     0.4s
 => exporting to image                                                                          0.2s
 => => exporting layers                                                                         0.2s
 => => writing image sha256:2dfb39f0fbed99a19fee51b23db685a0878eed7291bce08e88c3226e8fea271d    0.0s
```

`sleep 10` × 4 が並列に実行されるため、全体として10秒程度でビルドが終了しています。

## 比較結果

|  | ビルド時間 |
| -- | -- |
| 並列実行しない場合 | **50秒** |
| 並列実行する場合 | **15秒** |

今回サンプルとなった `Dockerfile` の場合、**3倍の高速化** に成功しました。

## 参考

- [DockerイメージのビルドをBuildKitで並列実行し高速化する - 🤖](https://kotaroooo0-dev.hatenablog.com/entry/2020/06/10/225333)
- [マルチステージビルドの利用 \| Docker ドキュメント](https://matsuand.github.io/docs.docker.jp.onthefly/develop/develop-images/multistage-build/)
