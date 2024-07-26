# 構造とリソース

_構造体_ は、型指定されたフィールドを含むユーザー定義のデータ構造です。構造体は、他の構造体を含む任意の非参照型を格納できます。

構造体の値がコピーも削除もできない場合、その値をリソースと呼ぶ事がよく有ります。この場合、リソース値の所有権は関数の終了時までに譲渡される必要があります。この特性により、リソースは特にグローバルストレージスキーマの定義や重要な値(トークン等)の表現のため提供されます。

デフォルトでは、構造体は直接的かつ一時的です。つまり、構造体はコピーできず、削除できず、グローバル ストレージに保存できません。つまり、全ての値の所有権は転送される必要があり(直接的)、値はプログラムの実行終了までに処理される必要があります(一時的)。構造体に、値のコピーや削除、グローバルストレージへの保存、またはグローバルストレージスキーマの定義する[機能](./abilities.md)を与える事で、この動作を緩和できます。

## 構造体の定義

構造体はモジュール内で定義する必要があります。

```move
address 0x2 {
module m {
    struct Foo { x: u64, y: bool }
    struct Bar {}
    struct Baz { foo: Foo, }
    //                   ^ 注意: 末尾のカンマは問題ありません
}
}
```

構造体は再帰的ではないため、以下の定義は無効です。

```move
struct Foo { x: Foo }
//              ^ エラー! FooはFooを含む事が出来ません
```

前述のように、デフォルトでは、構造体の宣言は直接的かつ一時的です。そのため、値を特定の操作 (コピー、ドロップ、グローバルストレージへの保存、ストレージスキーマとしての使用)で使用するには、構造体に`has <ability>`の注釈を付けて[機能](./abilities.md)を付与します。

```move
address 0x2 {
module m {
    struct Foo has copy, drop { x: u64, y: bool }
}
}
```

詳細は、[構造体の注釈](./abilities.md#annotating-structs)セクションを御覧下さい。

### ネーミング

構造体は`A`から`Z`までの大文字で始まる必要があります。構造体名には、最初の文字の後にアンダースコア`_`、`a`から`z`までの_文字、`A`から`Z`までの文字、`0`から`9`までの数字を含める事が出来ます。

```move
struct Foo {}
struct BAR {}
struct B_a_z_4_2 {}
```

`A`から`Z`で始まるこの命名制限は、将来の言語機能のための余地を残すため設けられています。この制限は後で削除される可能性も、削除されない可能性もあります。

## 構造体の使用

### 構造体の作成

構造体型の値は、構造体名の後に各フィールドの値を示す事で作成(または「パック」)出来ます。

```move
address 0x2 {
module m {
    struct Foo has drop { x: u64, y: bool }
    struct Baz has drop { foo: Foo }

    fun example() {
        let foo = Foo { x: 0, y: false };
        let baz = Baz { foo };
    }
}
}
```

構造体フィールドをフィールドと同じ名前のローカル変数で初期化する場合は、以下の省略形を使用出来ます。

```move
let baz = Baz { foo: foo };
// は以下と同等です
let baz = Baz { foo };
```

これは「フィールド名の語呂合わせ」と呼ばれる事も有ります。

### パターンマッチングを介した構造体の破壊

構造体の値は、パターンを結束もしくは割り当てる事で破棄出来ます。

```move
address 0x2 {
module m {
    struct Foo { x: u64, y: bool }
    struct Bar { foo: Foo }
    struct Baz {}

    fun example_destroy_foo() {
        let foo = Foo { x: 3, y: false };
        let Foo { x, y: foo_y } = foo;
        //        ^ `x: x`の省略形

        // ２つの新しい結束
        //   x: u64 = 3
        //   foo_y: bool = false
    }

    fun example_destroy_foo_wildcard() {
        let foo = Foo { x: 3, y: false };
        let Foo { x, y: _ } = foo;

        // yがワイルドカードへ結束されているため新しい結束はひとつのみです
        //   x: u64 = 3
    }

    fun example_destroy_foo_assignment() {
        let x: u64;
        let y: bool;
        Foo { x, y } = Foo { x: 3, y: false };

        // 既存の変数を変更する x & y
        //   x = 3, y = false
    }

    fun example_foo_ref() {
        let foo = Foo { x: 3, y: false };
        let Foo { x, y } = &foo;

        // ２つの新しい結束
        //   x: &u64
        //   y: &bool
    }

    fun example_foo_ref_mut() {
        let foo = Foo { x: 3, y: false };
        let Foo { x, y } = &mut foo;

        // ２つの新しい結束
        //   x: &mut u64
        //   y: &mut bool
    }

    fun example_destroy_bar() {
        let bar = Bar { foo: Foo { x: 3, y: false } };
        let Bar { foo: Foo { x, y } } = bar;
        //             ^ 入れ子のパターン

        // ２つの新しい結束
        //   x: u64 = 3
        //   y: bool = false
    }

    fun example_destroy_baz() {
        let baz = Baz {};
        let Baz {} = baz;
    }
}
}
```

### 構造体とフィールドの借用

`&`と`&mut`演算子は、構造体またはフィールドへの参照を作成するため使用出来ます。これらの例は、演算の種類を示すためのオプションの型注釈(例:`: &Foo`)を含んでいます。

```move
let foo = Foo { x: 3, y: true };
let foo_ref: &Foo = &foo;
let y: bool = foo_ref.y;          // 構造体への参照を介してフィールドを読み取る
let x_ref: &u64 = &foo.x;

let x_ref_mut: &mut u64 = &mut foo.x;
*x_ref_mut = 42;            // 可変参照を介してフィールドを変更する
```

入れ子の構造体の内部フィールドを借用する事が可能です。

```move
let foo = Foo { x: 3, y: true };
let bar = Bar { foo };

let x_ref = &bar.foo.x;
```

構造体への参照を介してフィールドを借用する事も出来ます。

```move
let foo = Foo { x: 3, y: true };
let foo_ref = &foo;
let x_ref = &foo_ref.x;
// これは let x_ref = &foo.x と同じ効果が有ります
```

### 読み書きフィールド

フィールドの値を読み取ってコピーする必要がある場合は、借用したフィールドを逆参照できます。

```move
let foo = Foo { x: 3, y: true };
let bar = Bar { foo: copy foo };
let x: u64 = *&foo.x;
let y: bool = *&foo.y;
let foo2: Foo = *&bar.foo;
```

フィールドが暗黙的にコピー可能な場合、ドット演算子を使用して、借用無しで構造体のフィールドを読み取る事が出来ます。(`copy`機能を持つスカラー値のみが暗黙的にコピー可能です。)

```move
let foo = Foo { x: 3, y: true };
let x = foo.x;  // x == 3
let y = foo.y;  // y == true
```

ドット演算子を連鎖してネストされたフィールドへアクセス出来ます。

```move
let baz = Baz { foo: Foo { x: 3, y: true } };
let x = baz.foo.x; // x = 3;
```

ただしこれは、ベクターや他の構造体等の非プリミティブ型を含むフィールドには許可されません。

```move
let foo = Foo { x: 3, y: true };
let bar = Bar { foo };
let foo2: Foo = *&bar.foo;
let foo3: Foo = bar.foo; // エラー! *& で明示的なコピーを追加する必要が有ります
```

この設計決定の背景の理由は、ベクターまたは別の構造体のコピーが高価な操作である可能性です。プログラマーがこのコピーを認識し、明確な`*&`構文で他の人へ認識させる事が重要です。

更に、フィールドから読み取る場合、フィールドがプリミティブ型であるか他の構造体であるかに関係なく、ドット構文を使用してフィールドを変更出来ます。

```move
let foo = Foo { x: 3, y: true };
foo.x = 42;     // foo = Foo { x: 42, y: true }
foo.y = !foo.y; // foo = Foo { x: 42, y: false }
let bar = Bar { foo };            // bar = Bar { foo: Foo { x: 42, y: false } }
bar.foo.x = 52;                   // bar = Bar { foo: Foo { x: 52, y: false } }
bar.foo = Foo { x: 62, y: true }; // bar = Bar { foo: Foo { x: 62, y: true } }
```

ドット構文は、構造体への参照を介しても機能します。

```move
let foo = Foo { x: 3, y: true };
let foo_ref = &mut foo;
foo_ref.x = foo_ref.x + 1;
```

## 特権構造体の操作

構造体型`T`の殆どの構造体操作は、`T`を宣言するモジュール内でのみ実行出来ます。

- 構造体型は、構造体を定義するモジュール内でのみ作成 (「パック」)、破棄(「アンパック」)出来ます。
- 構造体のフィールドは、構造体を定義するモジュール内のみアクセスできます。

以下のルールへ従い、モジュール外で構造体を変更する場合は、構造体へパブリックAPIを提供する必要があります。この章の最後でこの例をいくつか記載しています。

ただし、構造体 _型_ は常に別のモジュールまたはスクリプトから参照できます。

```move
// m.move
address 0x2 {
module m {
    struct Foo has drop { x: u64 }

    public fun new_foo(): Foo {
        Foo { x: 42 }
    }
}
}
```

```move
// n.move
address 0x2 {
module n {
    use 0x2::m;

    struct Wrapper has drop {
        foo: m::Foo
    }

    fun f1(foo: m::Foo) {
        let x = foo.x;
        //      ^ エラー! ここでは`foo`のフィールドへアクセス出来ません
    }

    fun f2() {
        let foo_wrapper = Wrapper { foo: m::new_foo() };
    }
}
}
```

注意: 構造体には可視性修飾子(例:`public`もしくは`private`)が有りません。


## 所有権

上記[構造体の定義](#defining-structs)で前述したように、構造体はデフォルトでは直接的かつ一時的です。つまり、構造体はコピーまたは削除出来ません。この特性は、お金等の現実世界のリソースをモデル化する際役立ちます。お金が流通中、重複したり紛失したりしないため。

```move
address 0x2 {
module m {
    struct Foo { x: u64 }

    public fun copying_resource() {
        let foo = Foo { x: 100 };
        let foo_copy = copy foo; // エラー! 'copy'する場合は'copy'機能が必要です
        let foo_ref = &foo;
        let another_copy = *foo_ref // エラー! 逆参照には'copy'機能が必要です
    }

    public fun destroying_resource1() {
        let foo = Foo { x: 100 };

        // エラー! 関数が返された時、fooにはまだ値が含まれています
        // この破壊には'drop'機能が必要です
    }

    public fun destroying_resource2(f: &mut Foo) {
        *f = Foo { x: 100 } // エラー!
                            // 書き込みで古い価値を破棄する場合'drop'機能が必要です
    }
}
}
```

2つ目の例 (`fun destroying_resource1`) を修正するには、リソースを手動で「解凍」する必要があります。

```move
address 0x2 {
module m {
    struct Foo { x: u64 }

    public fun destroying_resource1_fixed() {
        let foo = Foo { x: 100 };
        let Foo { x: _ } = foo;
    }
}
}
```

リソースを分解出来るのは、それが定義されているモジュール内だけである事を思い出して下さい。これを、例えばお金の保存等、システム内の特定の不変条件を強制する事へ活用出来ます。

一方、構造体が何かの価値を表していない場合は、`copy`と`drop`機能を追加して他のプログラミング言語からもっと馴染みのある構造体の値を取得出来ます。

```move
address 0x2 {
module m {
    struct Foo has copy, drop { x: u64 }

    public fun run() {
        let foo = Foo { x: 100 };
        let foo_copy = copy foo;
        // ^ このコードはfooをコピーしますが、`let x = foo`もしくは
        // `let x = move foo` は両方とも move foo です

        let x = foo.x;            // x = 100
        let x_copy = foo_copy.x;  // x = 100

        // foo と foo_copy は両方とも、関数が返される時暗黙的に破棄されます 
    }
}
}
```

## グローバルストレージにリソースを保存する

`key`機能を持つ構造体のみ、[永続的なグローバルストレージ](./global-storage-operators.md)へ直接保存出来ます。これらの`key`構造体内に格納される全ての値は`store`機能を持っている必要が有ります。詳細は[機能](./abilities)と[グローバルストレージ](./global-storage-operators.md)の章を御覧下さい。

## 例

構造体を使用して価値のあるデータ(`Coin`の場合)またはより古典的なデータ(`Point`及び`Circle`の場合)を表す方法の短い例を２つ示します。
 
### 例 1: コイン

<!-- TODO link to access control for mint -->

```move
module 0x2::m {
    // コインがコピーされる事はこの「お金」を複製する事なので望ましくありません。
    // そのため、構造体へ'copy'機能を与えません。
    // 同様に、プログラマーがコインを破棄することを望まないため、構造体へ'drop'機能を与えません。
    // ただし、モジュールのユーザーがこのコインを永続的なグローバルストレージへ保存出来る事を望むため、構造体へ'store'機能を付えます。
    // この構造体はグローバルストレージ内の他のリソース内でのみ存在するので構造体へ'key'機能を与えません。
    struct Coin has store {
        value: u64,
    }

    public fun mint(value: u64): Coin {
        // このモジュールを利用する人が無限にコインをミントするのを防ぐため、何らかの形のアクセス制御でこの関数をゲートする必要が有ります。
        Coin { value }
    }

    public fun withdraw(coin: &mut Coin, amount: u64): Coin {
        assert!(coin.balance >= amount, 1000);
        coin.value = coin.value - amount;
        Coin { value: amount }
    }

    public fun deposit(coin: &mut Coin, other: Coin) {
        let Coin { value } = other;
        coin.value = coin.value + value;
    }

    public fun split(coin: Coin, amount: u64): (Coin, Coin) {
        let other = withdraw(&mut coin, amount);
        (coin, other)
    }

    public fun merge(coin1: Coin, coin2: Coin): Coin {
        deposit(&mut coin1, coin2);
        coin1
    }

    public fun destroy_zero(coin: Coin) {
        let Coin { value } = coin;
        assert!(value == 0, 1001);
    }
}
```

### 例 2: 幾何学

```move
module 0x2::point {
    struct Point has copy, drop, store {
        x: u64,
        y: u64,
    }

    public fun new(x: u64, y: u64): Point {
        Point {
            x, y
        }
    }

    public fun x(p: &Point): u64 {
        p.x
    }

    public fun y(p: &Point): u64 {
        p.y
    }

    fun abs_sub(a: u64, b: u64): u64 {
        if (a < b) {
            b - a
        }
        else {
            a - b
        }
    }

    public fun dist_squared(p1: &Point, p2: &Point): u64 {
        let dx = abs_sub(p1.x, p2.x);
        let dy = abs_sub(p1.y, p2.y);
        dx*dx + dy*dy
    }
}
```

```move
module 0x2::circle {
    use 0x2::point::{Self, Point};

    struct Circle has copy, drop, store {
        center: Point,
        radius: u64,
    }

    public fun new(center: Point, radius: u64): Circle {
        Circle { center, radius }
    }

    public fun overlaps(c1: &Circle, c2: &Circle): bool {
        let dist_squared_value = point::dist_squared(&c1.center, &c2.center);
        let r1 = c1.radius;
        let r2 = c2.radius;
        dist_squared_value <= r1*r1 + 2*r1*r2 + r2*r2
    }
}
```
