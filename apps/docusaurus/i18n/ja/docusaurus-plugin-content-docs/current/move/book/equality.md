# 等価

Moveは`==`と`!=`の2つの等価演算をサポートします。

## 演算

| 構文 | 演算 | Description                                                                 |
| ------ | --------- | --------------------------------------------------------------------------- |
| `==`   | 等しい     | 2つのオペランドが同じ値を持つ場合は`true`を返し、そうでない場合は`false`を返します。 |
| `!=`   | 等しくない | ２つのオペランドが違う値を持つ場合は`true`を返し、そうでない場合は`false`を返します。 |

### 型

等号（`==`）と不等号（`!=`）の両演算は、両方のオペランドが同じ型の場合にのみ機能します。

```move
0 == 0; // `true`
1u128 == 2u128; // `false`
b"hello" != x"00"; // `true`
```

等価性と非等価性は、ユーザー定義型でも機能します。

```move
address 0x42 {
module example {
    struct S has copy, drop { f: u64, s: vector<u8> }

    fun always_true(): bool {
        let s = S { f: 0, s: b"" };
        // かっこは必要有りませんが、この例では分かり易くするため追加しています。
        (copy s) == s
    }

    fun always_false(): bool {
        let s = S { f: 0, s: b"" };
        //　かっこは必要有りませんが、この例では分かり易くするため追加しています。
        (copy s) != s
    }
}
}
```

オペランドの型が異なる場合、型チェックエラーが発生します。

```move
1u8 == 1u128; // エラー!
//     ^^^^^ 'u8'型の引数が必要です
b"" != 0; // エラー!
//     ^ 'vector<u8>'型の引数が必要です
```

### 参照の型 

[参照](./references.md)を比較する場合、参照の型 (不変または可変)は関係ありません。即ち、不変`&`参照と同じ基礎の型の可変`&mut`参照を比較できます。

```move
let i = &0;
let m = &mut 1;

i == m; // `false`
m == i; // `false`
m == m; // `true`
i == i; // `true`
```

上記は必要な場合、各可変参照に明示的な凍結を適用する事と同等です。

```move
let i = &0;
let m = &mut 1;

i == freeze(m); // `false`
freeze(m) == i; // `false`
m == m; // `true`
i == i; // `true`
```

しかし、基礎となる型は同じ型でなければなりません。

```move
let i = &0;
let s = &b"";

i == s; // ERROR!
//   ^ '&u64'型の引数が必要です。
```

## 制限事項

`==`と`!=`は両方とも、比較する時値を消費します。その結果として、型システムはその型が[`drop`](./abilities.md)を持つ必要が有る事を強制します。[`drop`機能](./abilities.md)無しでそれを呼び出し、所有権は関数の終了までに転送される必要が有り、その様な値は宣言しているモジュール内でのみ明示的に破棄出来ます。これらが等価`==`または非等価`!=`のいずれかで直接使用されると、値が破棄され[`drop`機能](./abilities.md)の安全性の保証が破られます。

```move
address 0x42 {
module example {
    struct Coin has store { value: u64 }
    fun invalid(c1: Coin, c2: Coin) {
        c1 == c2 // エラー!
//      ^^    ^^ これらのリソースは破棄されるでしょう。
    }
}
}
```

しかし、プログラマーは値を直接比較するのではなく、_常時_　最初に値を借りる事が出来、参照型には[`drop`機能](./abilities.md)が有ります。例えば、

```move
address 0x42 {
module example {
    struct Coin as store { value: u64 }
    fun swap_if_equal(c1: Coin, c2: Coin): (Coin, Coin) {
        let are_equal = &c1 == &c2; // 有効
        if (are_equal) (c2, c1) else (c1, c2)
    }
}
}
```

## 余分なコピーを回避する

プログラマーは[`drop`](./abilities.md)である任意の値を比較 _出来ます_ が、コストのかかるコピーを避けるため、参照によって比較する事がよく有ります。

```move
let v1: vector<u8> = function_that_returns_vector();
let v2: vector<u8> = function_that_returns_vector();
assert!(copy v1 == copy v2, 42);
//     ^^^^       ^^^^
use_two_vectors(v1, v2);

let s1: Foo = function_that_returns_large_struct();
let s2: Foo = function_that_returns_large_struct();
assert!(copy s1 == copy s2, 42);
//     ^^^^       ^^^^
use_two_foos(s1, s2);
```

このコードは(`Foo`が[`drop`](./abilities.md)を持っていると仮定して)完全に受け入れられますが、効率的ではありません。強調表示されたコピーは削除して借用で置き換えることができます。

```move
let v1: vector<u8> = function_that_returns_vector();
let v2: vector<u8> = function_that_returns_vector();
assert!(&v1 == &v2, 42);
//     ^      ^
use_two_vectors(v1, v2);

let s1: Foo = function_that_returns_large_struct();
let s2: Foo = function_that_returns_large_struct();
assert!(&s1 == &s2, 42);
//     ^      ^
use_two_foos(s1, s2);
```

`==`自体の効率は同じままですが、`copy`が削除されるため、プログラムは効率が良くなります。