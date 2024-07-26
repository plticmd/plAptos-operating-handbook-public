# Abort(中止)とAssert

[`return`](./functions.md)と`abort`は実行を終了する2つの制御フロー構造です。ひとつは現在の関数用、もうひとつはトランザクション全体用です。

詳細は[`return`はリンク先のセクションを御覧下さい](./functions.md)。

## `abort`(中止)

`abort`はひとつの引数:`u64`型の**中止コード**を取る式です。例:

```move
abort 42
```
この`abort`式は、現在の関数の実行を中止し、現在のトランザクションがグローバル状態へ加えた全ての変更を元へ戻します。`abort`を「キャッチ」したり、その他の方法で処理するメカニズムはありません。

幸いMoveではトランザクションは全てかゼロかです。
つまりグローバルストレージへの変更は、トランザクションが成功した場合のみ一斉に行われます。このトランザクションによる変更のコミットメントにより、中止後に変更を取り消す心配はありません。このアプローチは柔軟性に欠けますが、非常にシンプルで予測可能です。

[`return`](./functions.md)と同様、`abort`は何らかの条件を満たせない時、制御フローを終了するのに役立ちます。 

この例では、関数はベクターから2つの項目をポップしますが、ベクターに2つの項目がない場合は早期中止します。

```move
use std::vector;
fun pop_twice<T>(v: &mut vector<T>): (T, T) {
    if (vector::length(v) < 2) abort 42;

    (vector::pop_back(v), vector::pop_back(v))
}
```

これは制御フロー構造の奥深くでさらに役立ちます。例えば、この関数はベクター内の全ての数値が指定した`bound`より小さいかチェックします。そうでない場合は中止します。

```move
use std::vector;
fun check_vec(v: &vector<u64>, bound: u64) {
    let i = 0;
    let n = vector::length(v);
    while (i < n) {
        let cur = *vector::borrow(v, i);
        if (cur > bound) abort 42;
        i = i + 1;
    }
}
```

### `assert`

`assert`は、Moveコンパイラが提供する組み込みのマクロのような操作です。これは`bool`型のコンディションと`u64`型のコードの2つの引数を取ります。

```move
assert!(condition: bool, code: u64)
```
操作はマクロなので`!`で呼び出す必要があります。これは`assert`の引数が「式による呼び出し」である事を伝えるためです。言い換えると`assert`は通常の関数ではなく、バイトコードレベルには存在しません。これはコンパイラー内で以下へ置き換えられます。

```move
if (condition) () else abort code
```

`assert`はただ`abort`自身で`中止`するよりも一般的に使われます。上記の`abort`例は`assert`を使って書き直す事が出来ます。
 
```move
use std::vector;
fun pop_twice<T>(v: &mut vector<T>): (T, T) {
    assert!(vector::length(v) >= 2, 42); // 現在'assert'を使っています。

    (vector::pop_back(v), vector::pop_back(v))
}
```

そして

```move
use std::vector;
fun check_vec(v: &vector<u64>, bound: u64) {
    let i = 0;
    let n = vector::length(v);
    while (i < n) {
        let cur = *vector::borrow(v, i);
        assert!(cur <= bound, 42); // 現在'assert'を使っています。
        i = i + 1;
    }
}
```

注意: 演算は`if-else`へ置き換えられるため`code`の引数が必ずしも評価されるわけではありません。例:

```move
assert!(true, 1 / 0)
```
算術エラーにはなりませんが、これは以下の式と同等です。

```move
if (true) () else (1 / 0)
```

従って、算術式は評価されません。

### Move VMのコードを中止する

`abort`を使用する場合、VMがどの様に`u64`コードを使用するのか理解する事が重要です。

通常、実行が成功すると、Move VMはグローバルストレージへ加えられた変更 (追加された/削除されたリソース、既存のリソースの更新等)の「変更セット」を生成します。

`abort`へ達した場合、VMはかわりにエラーを表示します。そのエラーには、以下の2つの情報が含まれます。

- 中止を生成したモジュール（アドレスと名前）
- 中止コード。

例えば

```move
address 0x2 {
module example {
    public fun aborts() {
        abort 42
    }
}
}

script {
    fun always_aborts() {
        0x2::example::aborts()
    }
}
```

上記の`always_aborts`スクリプトのようなトランザクションが`0x2::example::aborts`を呼び出すと、VMは`0x2::example`モジュールと`42`コードを示すエラーを生成します。

これは、モジュール内で複数の中止をグループ化する場合便利です。

この例では、モジュールには複数の関数で使用される2つの別々のエラーコードが有ります。
 
```move
address 0x42 {
module example {

    use std::vector;

    const EMPTY_VECTOR: u64 = 0;
    const INDEX_OUT_OF_BOUNDS: u64 = 1;

    // iをjへ移動、jをkへ移動、kをiへ移動
    public fun rotate_three<T>(v: &mut vector<T>, i: u64, j: u64, k: u64) {
        let n = vector::length(v);
        assert!(n > 0, EMPTY_VECTOR);
        assert!(i < n, INDEX_OUT_OF_BOUNDS);
        assert!(j < n, INDEX_OUT_OF_BOUNDS);
        assert!(k < n, INDEX_OUT_OF_BOUNDS);

        vector::swap(v, i, k);
        vector::swap(v, j, k);
    }

    public fun remove_twice<T>(v: &mut vector<T>, i: u64, j: u64): (T, T) {
        let n = vector::length(v);
        assert!(n > 0, EMPTY_VECTOR);
        assert!(i < n, INDEX_OUT_OF_BOUNDS);
        assert!(j < n, INDEX_OUT_OF_BOUNDS);
        assert!(i > j, INDEX_OUT_OF_BOUNDS);

        (vector::remove<T>(v, i), vector::remove<T>(v, j))
    }
}
}
```

## `abort`の型

`abort i`式には任意の型を指定できます。これは、両方の構造が通常の制御フローから外れるため、その型の値を評価する必要がないためです。

以下は役に立ちませんが、型チェックには使えます。

```move
let y: address = abort 0;
```

この動作は、全ての分岐ではなく一部の分岐で値を生成する分岐命令がある場合役立ちます。例えば:

```move
let b =
    if (x == 0) false
    else if (x == 1) true
    else abort 42;
//       ^^^^^^^^ `abort42`の型は`bool`
```
