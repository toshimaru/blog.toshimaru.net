---
layout: post
title: 複数のGoroutineをWaitGroupで制御する
image: "/images/posts/goroutine-waitgroup.png"
description: "この記事はGo7 Advent Calendar 2019５日目の記事です。やりたいこととしては、下記のように直列で動作し実行時間の長いGoのプログラムを、並行処理に変えて処理を効率化させます。"
tags: go
toc: true
---

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

## まとめ

複数の Goroutine を取り扱う場合、`sync.WaitGroup` を使って制御（`Add`, `Done`, `Wait`）すると良い。
