---
layout: post
title: 複数のGoroutineをWaitGroupで制御する
image: "/images/posts/goroutine-waitgroup.png"
description: "この記事はGo7 Advent Calendar 2019５日目の記事です。やりたいこととしては、下記のように直列で動作し実行時間の長いGoのプログラムを、並行処理に変えて処理を効率化させます。"
tags: go
toc: true
last_modified_at: 2019-12-07
---

{% include info.html title="追記" text="errgroup について追記しました。" %}

この記事は[Go7 Advent Calendar 2019](https://qiita.com/advent-calendar/2019/go7)５日目の記事です。

## やりたいこと

下記のように直列で動作し実行時間の長いGoのプログラムを、並行処理に変えて処理を効率化させます。

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 100; i++ {
		time.Sleep(2 * time.Second) // 長い処理
		fmt.Println("End:", i)
	}
}
```

上述のプログラムを実行した場合、実行時間は約3分30秒となります。

```console
$ go run original.go
End: 0
End: 1
End: 2
...(snip)...
End: 97
End: 98
End: 99
```

これを並行に行うことで劇的な改善を目指します。

## Goroutine を使う

Goの並行処理といえば Goroutine。こいつを使うには処理を関数化して `go` というキーワードを付けるだけです。

下記のように変更します。

```go
// original2.go
package main

import (
	"fmt"
	"time"
)

func main() {
	for i := 0; i < 100; i++ {
		go func(i int) {
			time.Sleep(2 * time.Second) // 長い処理
			fmt.Println("End:", i)
		}(i)
	}
}
```

実行してみましょう。

```console
$ go run original2.go
```

しかし、何も出力されません！　どうしてでしょうか？

## Goroutine + Channel を使う

考えてみるとそれはそうで、Goroutine と呼ばれる軽量スレッドに処理を切り分けたものの、その処理の実行中にプログラム自体が終了してしまったからです。Goroutine の処理が完了するまで何らかの仕組みで「待つ」必要があります。

ここで使えるのが Channel です。Channel はデータの送受信ができる[パイプ](https://ja.wikipedia.org/wiki/%E3%83%91%E3%82%A4%E3%83%97_(%E3%82%B3%E3%83%B3%E3%83%94%E3%83%A5%E3%83%BC%E3%82%BF))のようなもので、主に Goroutine とのデータのやり取りで使われます。

Channel を使って Goroutine からのデータを受信するようにコードを書き換えてみましょう。

```go
// channel.go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan int)

	for i := 0; i < 100; i++ {
		go func(i int) {
			time.Sleep(2 * time.Second) // 長い処理
			ch <- i
		}(i)
	}

	for i := 0; i < 100; i++ {
		fmt.Println("End:", <-ch)
	}
}
```

- `int` 型の Channel を `make` する
- ループ内の Goroutine の中で↑で作成した Channel に値、`i` を送信
- 2回目のループ内で Channel の値を受信して、Printする

実行すると下記の通り、Goroutine から受信される値の順番はバラバラで出力されました。

```
$ go run channel.go
End: 95
End: 98
End: 5
...snip...
End: 55
End: 30
End: 99
```

実行時間も2.6秒程で完了しました。最初の3分30秒という実行時間に比べて劇的な改善と言えるでしょう。

## Goroutine + WaitGroup を使う

しかし Channel を使うよりももっと良い書き方があるんです！ それが `sync.WaitGroup` です。

 `sync.WaitGroup` は複数の Goroutine の実行を待ってくれます。今回のプログラムの場合、下記のように書くことができます。

```go
// waitgroup.go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup

	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func(i int) {
			time.Sleep(2 * time.Second) // 長い処理
			fmt.Println("End:", i)
			wg.Done()
		}(i)
	}

	wg.Wait()
}
```

- `sync.WaitGroup` を宣言
- ループ内の Goroutine の処理の手前で `Add(1)` してグループをインクリメントする
- Goroutine 内の最後で `Done()` して Goroutine の処理が終わったことを `WaitGroup` に教えてあげる
- ループ終了後に、`Wait()` して `sync.WaitGroup` の `Done` を待つ

実行すると下記の出力を得ることができます。

```console
$ go run waitgroup.go
End: 86
End: 5
End: 16
...(snip)...
End: 66
End: 85
End: 70
```

実行時間は2.2秒程で完了しました。Channel を使った場合よりも速く処理が完了したのは、Channel を使ったデータの送受信のオーバーヘッドを削れたことが大きいと考えられます。

## Goroutine + errgroup を使う

Goroutine の処理内でエラーが発生する可能性があってそれをハンドリングしたい場合はどうすればよいでしょうか？

そこで使えるのが[errgroup](https://godoc.org/golang.org/x/sync/errgroup)です。

下記のコードサンプル内では `i` が90以上の場合にエラーが発生するとしています。

```go
// errgroup.go
package main

import (
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {
	var eg errgroup.Group
	for i := 0; i < 100; i++ {
		i := i
		eg.Go(func() error {
			time.Sleep(2 * time.Second) // 長い処理
			if i > 90 {
				fmt.Println("Error:", i)
				return fmt.Errorf("Error occurred: %d", i)
			}
			fmt.Println("End:", i)
			return nil
		})
	}
	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
}
```

- `golang.org/x/sync/errgroup` をimportして、 `errgroup.Group` を宣言
- `eg.Go()` 内で Goroutine の処理を定義
- `eg.Wait()` して `eg.Go()` で実行した Goroutine を待つ
- `eg.Go()` の処理でエラーがあれば、一番最初のエラーを `eg.Wait()` は返す

実行すると下記の出力を得ることができます。

```console
$ go run errgroup.go
End: 86
End: 3
End: 1
End: 2
End: 11
Error: 96
End: 0
...(snip)...
Error: 93
End: 53
End: 84
End: 88
End: 74
2019/12/07 15:24:15 Error occurred: 96
exit status 1
```

全ての Goroutine を実行して最初に出会ったエラー、 `Error: 96` が `Error occurred: 96` として最後に出力されていることがわかります。

##  Goroutine + errgroup + context を使う

もう少しエラーの場合に踏み込んでみましょう。エラーが発生したときに Goroutine をキャンセルする場合はどうしたらよいでしょうか？

これは`errgroup`に加えて、[context](https://golang.org/pkg/context/)を組み合わせて使えば実現できます。

```go
// errgroup_cancel.go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {
	eg, ctx := errgroup.WithContext(context.Background())

	for i := 0; i < 100; i++ {
		i := i
		eg.Go(func() error {
			time.Sleep(2 * time.Second) // 長い処理

			select {
			case <-ctx.Done():
				fmt.Println("Canceled:", i)
				return nil
			default:
				if i > 90 {
					fmt.Println("Error:", i)
					return fmt.Errorf("Error: %d", i)
				}
				fmt.Println("End:", i)
				return nil
			}
		})
	}
	if err := eg.Wait(); err != nil {
		log.Fatal(err)
	}
}
```

- `errgroup.WithContext()` を使って、`errgroup` と `context` を生成
- `eg.Go()` 内でキャンセルされたときの処理を `case <-ctx.Done():` 内に記述
- non-nil error が返されると context はキャンセルされ、後続の Goroutine がキャンセルされる

これを実行すると下記のような出力となります。

```console
$ go run errgroup_cancel.go
End: 5
End: 6
End: 23
Error: 98
End: 7
End: 8
Cenceled: 2
Cenceled: 9
...(snip)...
Cenceled: 92
Cenceled: 53
2019/12/07 15:43:48 Error: 98
exit status 1
```

`Error: 98` が発生し、後続の Goroutine がキャンセルされていることがわかります。

## まとめ

- 複数の Goroutine を取り扱う場合、`sync.WaitGroup` を使って制御（`Add`, `Done`, `Wait`）すると良い
- 複数の Goroutine をエラーハンドリングとともに取り扱う場合、 `errgroup` を使って制御（`Go`, `Wait`, `WithContext`）すると良い

## 参考情報

- [errgroup - GoDoc](https://godoc.org/golang.org/x/sync/errgroup)
- [context - The Go Programming Language](https://golang.org/pkg/context/)
- [sync.ErrGroupで複数のgoroutineを制御する \| SOTA](https://deeeet.com/writing/2016/10/12/errgroup/)
- [[Golang] errgroup使用例 - xonoのブログ](http://dono.hatenablog.com/entry/2018/01/04/111204)
