# 用途と別名(エイリアス)

`use`構文を使用して他のモジュールのメンバーへのエイリアスを作成出来ます。`use`を使用してモジュール全体または特定の式ブロックスコープのエイリアスを作成出来ます。

## Syntax

`use`にはいくつかの異なる構文ケースが有ります。最も単純なものから始めると、他のモジュールへのエイリアスを作成する以下の物が有ります。

```move
use <address>::<module name>;
use <address>::<module name> as <module alias name>;
```

例えば

```move
use std::vector;
use std::vector as V;
```

`use std::vector;`は`std::vector`のエイリアス`vector`を導入します。つまり、モジュール名`std::vector`を使用したい場所であればどこでも（この`use`がスコープ内にあると仮定します）代わりに`vector`を使用できます。`use std::vector;`は`use std::vector as vector;`と同等です。
   
同様に`use std::vector as V;`は`std::vector`のかわり`V`を使用出来るようにします。

```move
use std::vector;
use std::vector as V;

fun new_vecs(): (vector<u8>, vector<u8>, vector<u8>) {
    let v1 = std::vector::empty();
    let v2 = vector::empty();
    let v3 = V::empty();
    (v1, v2, v3)
}
```

特定のモジュール メンバー (関数、構造体、定数等) をインポートする場合は、以下の構文を使用出来ます。

```move
use <address>::<module name>::<module member>;
use <address>::<module name>::<module member> as <member alias>;
```

例えば

```move
use std::vector::empty;
use std::vector::empty as empty_vec;
```

これにより、`std::vector::empty`関数を完全修飾無しで使用出来ます。その代わり、それぞれ`empty`と`empty_vec`を使用する事も出来ます。繰り返しますが、`use std::vector::empty;`は`use std::vector::empty as empty;`と同等です。

```move
use std::vector::empty;
use std::vector::empty as empty_vec;

fun new_vecs(): (vector<u8>, vector<u8>, vector<u8>) {
    let v1 = std::vector::empty();
    let v2 = empty();
    let v3 = empty_vec();
    (v1, v2, v3)
}
```

1回で複数のモジュールメンバーエイリアスを追加したい場合は、以下の構文で可能です。

```move
use <address>::<module name>::{<module member>, <module member> as <member alias> ... };
```

例えば

```move
use std::vector::{push_back, length as len, pop_back};

fun swap_last_two<T>(v: &mut vector<T>) {
    assert!(len(v) >= 2, 42);
    let last = pop_back(v);
    let second_to_last = pop_back(v);
    push_back(v, last);
    push_back(v, second_to_last)
}
```

モジュールメンバーに加えて、モジュール自体にエイリアスを追加する必要がある場合は、`Self`を使用して1回の`use`で実行出来ます。`Self`は、モジュールを参照するある種のメンバーです。

```move
use std::vector::{Self, empty};
```

以下は全て同等です。

```move
use std::vector;
use std::vector as vector;
use std::vector::Self;
use std::vector::Self as vector;
use std::vector::{Self};
use std::vector::{Self as vector};
```

必要に応じて、任意のアイテムへ多くのエイリアスを設定できます。

```move
use std::vector::{
    Self,
    Self as V,
    length,
    length as len,
};

fun pop_twice<T>(v: &mut vector<T>): (T, T) {
    // 上記`use`で利用できる全てのオプション
    assert!(vector::length(v) > 1, 42);
    assert!(V::length(v) > 1, 42);
    assert!(length(v) > 1, 42);
    assert!(len(v) > 1, 42);

    (vector::pop_back(v), vector::pop_back(v))
}
```

## `module`内部

`module` 内部では宣言の順序に関係なく、module全ての`use`宣言が使用可能です。

```move
address 0x42 {
module example {
    use std::vector;

    fun example(): vector<u8> {
        let v = empty();
        vector::push_back(&mut v, 0);
        vector::push_back(&mut v, 10);
        v
    }

    use std::vector::empty;
}
}
```

モジュール内で`use`によって宣言されたエイリアスはモジュールで利用出来ます。

さらに、導入されたエイリアスは他のモジュールメンバーと競合する事は出来ません。 詳細は[一意性](#uniqueness)を御覧下さい。

## 式の内部

任意の式ブロックの先頭へ`use`宣言を追加出来ます。

```move
address 0x42 {
module example {

    fun example(): vector<u8> {
        use std::vector::{empty, push_back};

        let v = empty();
        push_back(&mut v, 0);
        push_back(&mut v, 10);
        v
    }
}
}
```

`let`と同様、式ブロック内で `use`が導したエイリアスは、そのブロックの最後で削除されます。


```move
address 0x42 {
module example {

    fun example(): vector<u8> {
        let result = {
            use std::vector::{empty, push_back};
            let v = empty();
            push_back(&mut v, 0);
            push_back(&mut v, 10);
            v
        };
        result
    }

}
}
```

ブロック終了後にエイリアスを使用しようと試みるとエラーが発生します。


```move
fun example(): vector<u8> {
    let result = {
        use std::vector::{empty, push_back};
        let v = empty();
        push_back(&mut v, 0);
        push_back(&mut v, 10);
        v
    };
    let v2 = empty(); // エラー!
//           ^^^^^ 非バインド関数'empty'
    result
}
```

`use`はブロックの最初の項目でなければなりません。`use`が式または`let`の後に来ると、解析エラーが発生します。
 
```move
{
    let x = 0;
    use std::vector; // ERROR!
    let v = vector::empty();
}
```

## 命名規則

エイリアスは他のモジュールメンバーと同じルールへ従う必要が有ります。即ち、構造体や定数へのエイリアスは`A`から`Z`で始まる必要が有ります。

```move
address 0x42 {
module data {
    struct S {}
    const FLAG: bool = false;
    fun foo() {}
}
module example {
    use 0x42::data::{
        S as s, // エラー!
        FLAG as fLAG, // エラー!
        foo as FOO,  // 有効
        foo as bar, // 有効
    };
}
}
```

## 一意性

特定のスコープ内では、`use`宣言で導入される全てのエイリアスは一意である必要があります。

モジュールの場合、これは`use`で導入されたエイリアスが重複出来ない事を意味します。

```move
address 0x42 {
module example {

    use std::vector::{empty as foo, length as foo}; // エラー!
    //                                        ^^^ 重複した'foo'

    use std::vector::empty as bar;

    use std::vector::length as bar; // エラー!
    //                         ^^^ 重複した'bar'

}
}
```

そして、モジュールの他のメンバーと重複する事は出来ません。

```move
address 0x42 {
module data {
    struct S {}
}
module example {
    use 0x42::data::S;

    struct S { value: u64 } // エラー!
    //     ^ 上記のエイリアス'S'と競合します
}
}
```

式ブロック内では、それらはお互い重複する事は出来ませんが、 外部スコープから他のエイリアスまたは名前を[復唱](#shadowing)シャドウする事が出来ます。

## 復唱(シャドーイング)

式ブロック内の`use`エイリアスは、外部スコープからの名前(モジュールメンバーまたはエイリアス)を復唱出来ます。ローカルの復唱と同様、シャドウは式ブロックの最後で終了します。


```move
address 0x42 {
module example {

    struct WrappedVector { vec: vector<u64> }

    fun empty(): WrappedVector {
        WrappedVector { vec: std::vector::empty() }
    }

    fun example1(): (WrappedVector, WrappedVector) {
        let vec = {
            use std::vector::{empty, push_back};
            // 'empty'は std::vector::empty を参照します

            let v = empty();
            push_back(&mut v, 0);
            push_back(&mut v, 1);
            push_back(&mut v, 10);
            v
        };
        // 'empty' は　Self::empty　を参照します

        (empty(), WrappedVector { vec })
    }

    fun example2(): (WrappedVector, WrappedVector) {
        use std::vector::{empty, push_back};
        let w: WrappedVector = {
            use 0x42::example::empty;
            empty()
        };
        push_back(&mut w.vec, 0);
        push_back(&mut w.vec, 1);
        push_back(&mut w.vec, 10);

        let vec = empty();
        push_back(&mut vec, 0);
        push_back(&mut vec, 1);
        push_back(&mut vec, 10);

        (w, WrappedVector { vec })
    }
}
}
```

## 未使用のuseまたはエイリアス

未使用の`use`はエラーが発生します

```move
address 0x42 {
module example {
    use std::vector::{empty, push_back}; // エラー!
    //                       ^^^^^^^^^ 未使用のエイリアス'push_back'

    fun example(): vector<u8> {
        empty()
    }
}
}
```
