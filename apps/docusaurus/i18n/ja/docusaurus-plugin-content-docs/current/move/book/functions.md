# 関数

Moveの関数構文は、モジュール関数とスクリプト関数間で共有されます。モジュール内の関数は再利用可能ですが、スクリプト関数はトランザクションを呼び出すための1回だけ使用されます。

## 宣言

関数は、`fun`キーワード、関数名、型パラメータ、パラメータ、戻り値の型、注釈の取得、最後に関数本体、の順序で宣言されます。

```text
fun <identifier><[type_parameters: constraint],*>([identifier: type],*): <return_type> <acquires [identifier],*> <function_body>
```

例えば

```move
fun foo<T1, T2>(x: u64, y: T1, z: T2): (T2, T1, u64) { (z, y, x) }
```

### 可視性

デフォルトでは、モジュール関数は同じモジュール内でのみ呼び出す事が出来ます。これらの内部関数 (プライベート関数と呼ばれることもあります) は、他のモジュールやスクリプトから呼び出す事は出来ません。

```move
address 0x42 {
module m {
    fun foo(): u64 { 0 }
    fun calls_foo(): u64 { foo() } // 有効
}

module other {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'の内部です
    }
}
}

script {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // ERROR!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'の内部です
    }
}
```

他のモジュールまたはスクリプトからのアクセスを許可するには、関数を`public`か`public(friend)で`宣言する必要があります。


#### `public`の可視性

`public`関数は _任意の_ モジュールまたはスクリプトで定義された _任意の_ 関数から呼び出す事が出来ます。以下の例で示すように、`public`関数は以下により呼び出す事が出来ます。

- 同じモジュールで定義された他の関数
- 別のモジュールで定義された関数、または
- スクリプトで定義された関数

また、パブリック関数が受け取る事が出来る引数の型や戻り値の型も制限はありません。

```move
address 0x42 {
module m {
    public fun foo(): u64 { 0 }
    fun calls_foo(): u64 { foo() } // 有効
}

module other {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効
    }
}
}

script {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効
    }
}
```

#### `public(friend)`の可視性

`public(friend)`可視性修飾子は、関数を使用できる場所をより細かく制御するための、より制限された`public`修飾子の形式です。`public(friend)`関数は以下により呼び出す事が出来ます。

- 同じモジュールで定義された他の関数、または
- **フレンドリスト**で明示的に指定されているモジュールで定義された関数(フレンドリストの指定方法は、[Friends](./friends.md)を御覧下さい)。

注意: スクリプトをモジュールのフレンドとして宣言する事は出来ないため、スクリプトで定義された関数は`public(friend)`関数を呼び出す事が出来ません。

```move
address 0x42 {
module m {
    friend 0x42::n;  // フレンド宣言
    public(friend) fun foo(): u64 { 0 }
    fun calls_foo(): u64 { foo() } // 有効
}

module n {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効
    }
}

module other {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'モジュールの'friend'からのみ呼び出せます。
    }
}
}

script {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'モジュールの'friend'からのみ呼び出せます。
    }
}
```

### `entry`修飾子

`entry`修飾子はモジュール関数をスクリプトのように安全かつ直接呼び出せる様設計されています。これにより、モジュール作成者は実行を開始するための呼び出せる関数を指定出来ます。モジュール作成者は、`entry`関数ではない関数は、既に実行中のMoveプログラムから呼び出される事を認識します。

本質的に`entry`関数はモジュールの「メイン」関数であり、Moveプログラムの実行開始場所を指定します。

注意: `entry`関数は他のMove関数から引き続き呼び出す事が _出来_ ます。
そのため、これらはMoveプログラムの開始として機能しますが、その場合で限定されません。
 
例えば、

```move
address 0x42 {
module m {
    public entry fun foo(): {  }
    fun calls_foo(): u64 { foo() } // 有効!
}

module n {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効!
    }
}

module other {
    public entry fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効!
    }
}
}

script {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // 有効!
    }
}
```

内部関数も`entry`!としてマーク出来ます。これにより、関数が実行の開始時のみ呼び出される事が保証されます (モジュール内の他の場所で呼び出さないと仮定すると)

```move
address 0x42 {
module m {
    entry fun foo(): u64 { 0 } // 有効! entry関数はパブリックである必要は有りません 
}

module n {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'の内部です
    }
}

module other {
    public entry fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'の内部です
    }
}
}

script {
    fun calls_m_foo(): u64 {
        0x42::m::foo() // エラー!
//      ^^^^^^^^^^^^ 'foo'は'0x42::m'の内部です
    }
}
```

エントリ関数は、プリミティブ型、文字列、およびベクター引数を取る事が出来ますが、構造体(例:Option)を取る事は出来ません。戻り値を持つ事も出来ません。

### 名前

関数名は`a`～`z`の文字または`A`～`Z`の文字で始める事が出来ます。関数名の最初の文字の後には、アンダースコア`_`、`a`～`z`の文字、`A`～`Z`の文字、または`0`～`9`の数字を含める事が出来ます。

```move
// all valid
fun FOO() {}
fun bar_42() {}
fun bAZ19() {}

// invalid
fun _bAZ19() {} // 関数名は'_'で始める事は出来ません
```

### 型パラメーター

名前の後、関数は型パラメータを持つ事が出来ます

```move
fun id<T>(x: T): T { x }
fun example<T1: copy, T2>(x: T1, y: T2): (T1, T1, T2) { (copy x, x, y) }
```

詳細は[Move全般](./generics.md)を御覧下さい。

### パラメーター

関数のパラメータは、ローカル変数名と続く型注釈で宣言されます。

```move
fun add(x: u64, y: u64): u64 { x + y }
```

これは`x`の型が`u64`であると読み取られます。

関数はパラメータが全く必要ありません。

```move
fun useless() { }
```

これは、新しいデータ構造や空のデータ構造を作成する関数ではとても一般的です。

```move
address 0x42 {
module example {
  struct Counter { count: u64 }

  fun new_counter(): Counter {
      Counter { count: 0 }
  }

}
}
```

### Acquiresy(取得?)

関数が`move_from`、`borrow_global`、`borrow_global_mut`を使用してリソースへアクセスする場合、関数はその`acquires`はリソースである事を示す必要があります。これは、Moveの型システムによって使用され、グローバルストレージへの参照が安全である事、特にグローバルストレージへのダングリング参照が無い事が確認されます。

```move
address 0x42 {
module example {

    struct Balance has key { value: u64 }

    public fun add_balance(s: &signer, value: u64) {
        move_to(s, Balance { value })
    }

    public fun extract_balance(addr: address): u64 acquires Balance {
        let Balance { value } = move_from(addr); // 取得が必要
        value
    }
}
}
```

`acquires`注釈はモジュール内の推移的な呼び出しにも追加する必要があります。別のモジュールからこれらの関数を呼び出す場合、1つのモジュールは別のモジュールで宣言されたリソースへアクセスできないため、これらの取得の注釈を付ける必要はありません。したがって、参照の安全性を確保するための注釈は必要ありません。
 
```move
address 0x42 {
module example {

    struct Balance has key { value: u64 }

    public fun add_balance(s: &signer, value: u64) {
        move_to(s, Balance { value })
    }

    public fun extract_balance(addr: address): u64 acquires Balance {
        let Balance { value } = move_from(addr); // 取得が必要
        value
    }

    public fun extract_and_add(sender: address, receiver: &signer) acquires Balance {
        let value = extract_balance(sender); // ここで取得が必要
        add_balance(receiver, value)
    }
}
}

address 0x42 {
module other {
    fun extract_balance(addr: address): u64 {
        0x42::example::extract_balance(addr) // 取得は必要有りません
    }
}
}
```

関数は必要なだけリソースを`取得`出来ます。

```move
address 0x42 {
module example {
    use std::vector;

    struct Balance has key { value: u64 }
    struct Box<T> has key { items: vector<T> }

    public fun store_two<Item1: store, Item2: store>(
        addr: address,
        item1: Item1,
        item2: Item2,
    ) acquires Balance, Box {
        let balance = borrow_global_mut<Balance>(addr); // 取得hが必要
        balance.value = balance.value - 2;
        let box1 = borrow_global_mut<Box<Item1>>(addr); // 取得hが必要
        vector::push_back(&mut box1.items, item1);
        let box2 = borrow_global_mut<Box<Item2>>(addr); // 取得hが必要
        vector::push_back(&mut box2.items, item2);
    }
}
}
```

### 戻り値の型

パラメータの後、関数は戻り値の型を指定します。

```move
fun zero(): u64 { 0 }
```

ここで`: u64`は関数の戻り値の型が`u64`である事を示します。

:::tip
関数は入力参照から派生した場合、不変`&`または可変`&mut`[参照](./references.md)を返す事が出来ます。これは、[インライン関数](#inline-functions)でない限り、関数は[グローバルストレージへ参照を返す事が出来ない](./references.md#references-cannot-be-stored)事を意味します。覚えておいて下さい。
:::

タプルを使用すると、関数は複数の値を返す事が出来ます。

```move
fun one_two_three(): (u64, u64, u64) { (0, 1, 2) }
```

戻り値の型が指定されていない場合、関数の戻り値の型は暗黙的にunit`()`となります。これらの関数は同等です。

```move
fun just_unit(): () { () }
fun just_unit() { () }
fun just_unit() { }
```

script関数の戻り値の型はunit`()`である必要があります()。

```move
script {
    fun do_nothing() {
    }
}
```

[タプルのセクション](./tuples.md)で述べたように、これらのタプルの「値」は仮想的な物であり、実行時には存在しません。従って、unit`()`を返す関数の場合、実行中は何の値も返しません。

### 関数本体

関数の本体は式ブロックです。関数の戻り値はシーケンスの最後の値です。

```move
fun example(): u64 {
    let x = 0;
    x = x + 1;
    x // 'x'を返します
}
```

[リターンの詳細は以下のセクション](#returning-values)を御覧下さい。

式ブロックの詳細は[Move変数](./variables.md)を御覧下さい。

### ネイティブ関数

一部の関数では指定された本体が無く、その代わりVMが提供した本体が有ります。これらの関数は`native`でマークされています。

プログラマーは、VMソースコードの変更無しで新しいネイティブ関数を追加出来ません。さらに、`native`関数は標準ライブラリコードまたは特定のMove環境が必要とする機能で使用される事を意図しています。
 
目にする殆どの`native`関数は、`vector`のような標準ライブラリコード内に有ります。

```move
module std::vector {
    native public fun empty<Element>(): vector<Element>;
    ...
}
```

## 呼び出し

関数を呼び出すとき、名前はエイリアスまたは完全修飾名のどちらかで指定出来ます。

```move
address 0x42 {
module example {
    public fun zero(): u64 { 0 }
}
}

script {
    use 0x42::example::{Self, zero};
    fun call_zero() {
        // 上記`use`を使用すると、これらの呼び出しは全て同等となります
        0x42::example::zero();
        example::zero();
        zero();
    }
}
```

関数を呼び出す時は、パラメータごとに引数を指定する必要があります。

```move
address 0x42 {
module example {
    public fun takes_none(): u64 { 0 }
    public fun takes_one(x: u64): u64 { x }
    public fun takes_two(x: u64, y: u64): u64 { x + y }
    public fun takes_three(x: u64, y: u64, z: u64): u64 { x + y + z }
}
}

script {
    use 0x42::example;
    fun call_all() {
        example::takes_none();
        example::takes_one(0);
        example::takes_two(0, 1);
        example::takes_three(0, 1, 2);
    }
}
```

型引数は指定する事も推測する事も出来ます。両方の呼び出しは同等です。

```move
address 0x42 {
module example {
    public fun id<T>(x: T): T { x }
}
}

script {
    use 0x42::example;
    fun call_all() {
        example::id(0);
        example::id<u64>(0);
    }
}
```

詳細は[Move generics](./generics.md)を御覧下さい。

## 値を返す

関数の結果、即ち「戻り値」は関数本体の最終的な値です。例えば、

```move
fun add(x: u64, y: u64): u64 {
    x + y
}
```

[上で述べたように](#function-body)関数の本体は[式ブロック](./variables.md)です。 
式ブロックは様々ななステートメントのシーケンスにする事が出来、ブロック内の最後の式はそのブロックの値となります。

```move
fun double_and_add(x: u64, y: u64): u64 {
    let double_x = x * 2;
    let double_y = y * 2;
    double_x + double_y
}
```

ここでの戻り値は`double_x + double_y`。

### `return`式

関数は、その本体が評価した値を暗黙的に返しますが、明示的な`return`式を使用する事も出来ます。
 
```move
fun f1(): u64 { return 0 }
fun f2(): u64 { 0 }
```

これら2つの関数は同等です。この少し複雑な例では、関数は2つのu64値を減算しますが、2番目の値が大き過ぎる場合は早期に`0`を返します。

```move
fun safe_sub(x: u64, y: u64): u64 {
    if (y > x) return 0;
    x - y
}
```

注意: この関数の本体は`if (y > x) 0 else x - y`と書く事も出来ます。

しかし、`return`が真価を発揮するのは、他の制御フロー構造の奥深くから抜け出す時です。この例では、関数はベクターを介して反復処理し、与えられた値のインデックスを見つけます。

```move
use std::vector;
use std::option::{Self, Option};
fun index_of<T>(v: &vector<T>, target: &T): Option<u64> {
    let i = 0;
    let n = vector::length(v);
    while (i < n) {
        if (vector::borrow(v, i) == target) return option::some(i);
        i = i + 1
    };

    option::none()
}
```

引数なしで`return`を使用すると`return ()`の省略形となります。即ち、以下の2つの関数は同等です。

```move
fun foo() { return }
fun foo() { return () }
```

## インライン関数

インライン関数は、コンパイル時に呼び出し元の場所でその本体が展開される関数です。従って、インライン関数は個別の関数としてMoveバイトコードへ表示されません。インライン関数への全ての呼び出しはコンパイラによって展開されます。特定の状態では、迅速な実行とガスの節約へ繋がる可能性が有ります。ただしユーザーは、インライン関数によりバイトコードのサイズが大きくなる可能性があるため注意が必要です。過度のインライン化で、様々なサイズ制限が発生する可能性が有ります。

以下で示す通り、関数宣言へ`inline`キーワードを追加する事でインライン関数を定義出来ます。

```move
inline fun percent(x: u64, y: u64):u64 { x * 100 / y }
```

このインライン関数を`percent(2, 200)`として呼び出すとコンパイラは、ユーザーが`2 * 100 / 200`と書いたかのように、この呼び出しをインライン関数の本体と置き換えます。

### 関数パラメーターとラムダ式

インライン関数は_関数パラメーター_ をサポートしており、ラムダ式(即ち、匿名関数)を引数として受け入れます。この機能により、いくつかの一般的なプログラミングパターンの簡潔な記述が出来ます。インライン関数と同様、ラムダ式も呼び出しサイトで展開されます。

ラムダ式には、パラメータ名のリスト（`||`で囲まれている）とそれに続く本体が含まれます。簡単な例としては`|x| x + 1`、`|x, y| x + y`、`|| 1`、`|| { 1 }`等があります。ラムダの本体では、ラムダが定義されているスコープ内で使用可能な変数を参照出来ます。これはキャプチャリングとも呼ばれます。このような変数は、ラムダ式によって読み取りや書き込みが出来ます（変更可能な場合）。

関数パラメータの型は`|<list of parameter types>| <return type>`と記述されます。例えば、関数パラメータの型が`|u64, u64| bool`の場合、2つの`u64`パラメータを受け取り、`bool` 値を返す任意のラムダ式を引数として提供出来ます。

以下は、これらの概念の多くを実際に動作している様子を示す例です(この例は`std::vector`モジュールから抜粋した物です)。

```move
/// 関数を要素の上へ折り畳
/// 例えば「fold(vector[1,2,3], 0, f)」は  「f(f(f(0, 1), 2), 3)」と同じです。
public inline fun fold<Accumulator, Element>(
    v: vector<Element>,
    init: Accumulator,
    f: |Accumulator,Element|Accumulator
): Accumulator {
  let accu = init;
  // 注: 「for_each」はインライン関数ですがここでは表示されていません。
  for_each(v, |elem| accu = f(accu, elem));
  accu
}
```

省略されたパブリックインライン関数`for_each`の型シグネチャは`fun for_each<Element>(v: vector<Element>, f: |Element|)`です。

2番目のパラメーター`f`は、関数パラメータであり、`Element`を消費して何も返さない任意のラムダ式を受け入れます。コード例では、この関数パラメータへの引数としてラムダ式`|elem| accu = f(accu, elem)`を使用しています。注: このラムダ式は、外部スコープから`accu`変数をキャプチャします。

### 現在の制限

将来的にはこれらの制限の一部を緩和する予定ですが、今のところは

- 関数パラメータを持つ事が出来るのはインライン関数のみです。
- インライン関数の関数パラメータにへ引数として渡す事が出来るのは、明示的なラムダ式のみです。
- インライン関数とラムダ式は:
 - `return`式もしくは自由`break`、`continue`式(ループ外で発生する)を含める事は出来ません。
 - ラムダ式を返す事は出来ません。
- インライン関数のみを含む循環再帰は許可されません。
- ラムダ式のパラメータには型注釈を付けないで下さい(例:`|x: u64| x + 1`は許可されていません)。その型は推測されます。

### 追加の考慮事項

- パブリックインライン関数ではモジュール-プライベート定数/メソッドを使用しないで下さい。この様なインライン関数がそのモジュールの外部で呼び出されると、呼び出しサイトでのインプレース展開によってプライベート定数/メソッドの無効なアクセスが発生します。

- 別の場所で呼び出される大きな関数をインラインとしてマークしないで下さい。また、インライン関数が他の多くのインライン関数を推移的に呼び出す事も避けて下さい。それらは、過剰なインライン化が発生し、バイトコードのサイズが増加する可能性があります。
- インライン関数は、グローバルストレージへ参照を返す(非インライン関数では出来ない)のに役立ちます。

### インライン関数と参照

[上記の「ヒント」](#return-type)で 簡単に述べたように、`inline`関数は通常の関数よりも自由に参照を使用出来ます。例えば、

実際の引数が非`inline`関数を呼び出す事は安全ではないエイリアス化(複数の`&`パラメーターは同じオブジェクトを参照し、
その内の少なくともひとつは`&mut`。)とはなりませんが、関数がインライン化された後、参照用法の競合が残っていない限り`inline`関数の呼び出しは必ずしも制限されません。

```move
inline fun add(dest: &mut u64, a: &u64, b: &u64) {
    *dest = *a + *b;
}

fun user(...) {
    ...
    x = 3;
    add(&mut x, &x, &x);  // legal only because of inlining
    ...
}
```

非インライン関数から返される参照型の値は、関数に渡される参照パラメータから派生して関数へ渡す必要が有りますが、インライン関数の場合は、参照される値がインライン化後の関数スコープ内にある限り、その必要はありません。

参照の安全性と「借用チェック」の厳密な内容は複合的であり、他の場所で文書化されています。

上級のMoveユーザーは、全`inline`関数呼び出しが展開された後でのみ「借用チェック」が行われる事を理解する事で、新たな表現力を見つけます。

ただし、この権限は新たな責任が伴います。重要な`inline`関数のドキュメントは、呼び出しサイトでの参照パラメータと結果から根本的な制限を解説する必要が有るでしょう。

## ドット(レシーバー)関数呼び出しスタイル

_言語バージョン2.0以降_

関数宣言の最初のパラメータとしてよく知られた名前`self`を使用する事で、この関数を`.`構文(レシーバースタイル構文とも呼ばれます)で呼び出す事が出来ます。例:

```move
module 0x42::example {
    struct S {}

    fun foo(self: &S, x: u64) { /* ... */ }

    //...

    fun example() {
        let s = S {};
        s.foo(1);
    }
}
```

`s.foo(1)`の呼び出しは`foo(&s, 1)`の糖衣構文です。コンパイラが自動的に参照演算子を挿入します、注意して下さい。2つ目の古い表記法は`foo`で引き続き使用出来るため、既存のコードを壊す事無く新しい呼び出しスタイルを段階的に導入出来ます。

`self`引数の型は構造体、または構造体への不変または可変の参照とする事が出来ます。構造体は、関数と同じモジュールで宣言する必要が有ります。

注意: レシーバー関数を導入するモジュールを`使う`必要は有りません。`s.foo(1)`の様な呼び出しでは、コンパイラーが`s`型の引数を基準としてそれらの関数を自動的に見つけます。参照演算子の自動挿入と組み合わせる事で、この構文を使用するコードを大幅に簡潔にする事が出来ます。
 