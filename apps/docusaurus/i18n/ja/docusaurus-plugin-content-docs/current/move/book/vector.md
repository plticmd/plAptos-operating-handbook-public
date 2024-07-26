# Vector

`vector<T>`は、Moveが提供する唯一のプリミティブコレクション型です。`vector<T>`は、値を「末尾」からプッシュ/ポップすることで拡大または縮小できる`T`の同質コレクションです。

`vector<T>`は任意の`T`型でインスタンス化出来ます。例えば`vector<u64>`、`vector<address>`、`vector<0x42::MyModule::MyResource>`、`vector<vector<u8>>`は全て有効なベクトル型です。

## リテラル

### 一般的な`ベクター`リテラル

`vector`リテラルを使用して、任意の型のベクターを作成出来ます。

| 構文               | 型                                                                          | 説明                                |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `vector[]`            |  `T`が単一である`vector[]: vector<T>`, 非参照型             | 空のベクター                            |
| `vector[e1, ..., en]` |  `e_i: T` s.t. `0 < i <= n`であり`n > 0`である`vector[e1, ..., en]: vector<T>` | (長さ`n`の)`n`要素を持つベクター  |

この場合、`vector`の型は要素の型またはベクターの使用法から推測されます。 型を推測できない場合、または単にわかりやすくするため、型を明示的に指定出来ます。

```move
vector<T>[]: vector<T>
vector<T>[e1, ..., en]: vector<T>
```

#### ベクターリテラルの例

```move
script {
  fun example() {
    (vector[]: vector<bool>);
    (vector[0u8, 1u8, 2u8]: vector<u8>);
    (vector<u128>[]: vector<u128>);
    (vector<address>[@0x42, @0x100]: vector<address>);
  }
}
```

### `vector<u8>`リテラル

Moveでのベクターの一般的な使用事例は`vector<u8>`で表される「バイト配列」を表す事です。これらの値は、公開鍵やハッシュ結果等の暗号化目的でよく使用されます。これらの値は非常に一般的なので、個々の`u8`値が数値形式で指定される`vector[]`を使用するのとは対照的に、値をより読みやすくするための特定の構文が提供されています。

現在サポートされている`vector<u8>`リテラルの種類は、 _バイト文字列_ と _16進文字列_ の2種類です。

#### バイト文字列

バイト文字列は、`b`で始まる引用符で囲まれた文字列リテラルです (例:`b"Hello!\n"`)

これらはエスケープシーケンスを許可する ASCIIエンコードされた文字列です。現在サポートされているエスケープシーケンスは:

| エスケープシーケンス | 説明                                    |
| --------------- | ---------------------------------------------- |
| `\n`            | 改行                         |
| `\r`            | キャリッジリターン                                |
| `\t`            | タブ                                            |
| `\\`            | バックスラッシュ                                      |
| `\0`            | ヌル                                           |
| `\"`            | 引用                                          |
| `\xHH`          | 16進エスケープ、16進バイトシーケンス`HH`を挿入します  |

#### 16進文字列

16進文字列は`x`で始まる引用符で囲まれた文字列リテラルです (x例:`x"48656C6C6F210A"`)

`00`から`FF`までの各バイトペアは、16進数でエンコードされた`u8`値として解釈されます。従って、各バイトペアは、結果の`vector<u8>`内のひとつのエントリに対応します。

#### 文字列リテラルの例

```move
script {
fun byte_and_hex_strings() {
    assert!(b"" == x"", 0);
    assert!(b"Hello!\n" == x"48656C6C6F210A", 1);
    assert!(b"\x48\x65\x6C\x6C\x6F\x21\x0A" == x"48656C6C6F210A", 2);
    assert!(
        b"\"Hello\tworld!\"\n \r \\Null=\0" ==
            x"2248656C6C6F09776F726C6421220A200D205C4E756C6C3D00",
        3
    );
}
}
```

## 演算

以下に示すように、`vector`はMove標準ライブラリの`std::vector`モジュールを介していくつかの演算を提供します。時間の経過で操作が追加される可能性が有ります。`vector`の最新のドキュメントは、[こちら](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/move-stdlib/doc/vector.md#0x1_vector)で見つかります。

| 関数                                                                           | 説明                                                                                                                                                     | 中止？                                   |
| ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `vector::empty<T>(): vector<T>`                                                    | `T`型の値を保存出来る空のベクターを作成します。                                                                                                        | 一度も無い                                      |
| `vector::is_empty<T>(): bool`                                                      | ベクトル`v`に要素がない場合は`true`を返し、そうでない場合は`false`を返します                                                                                | 一度もない                                      |
| `vector::singleton<T>(t: T): vector<T>`                                            | `t`を含むサイズ1のベクトルを作成する                                                                                                                        | 一度もない                                      |
| `vector::length<T>(v: &vector<T>): u64`                                            | ベクター`v`の長さを返す                                                                                                                             | 一度もない                                      |
| `vector::push_back<T>(v: &mut vector<T>, t: T)`                                    | `v`の末尾へ`t`を追加                                                                                                                                       | 一度もない                                      |
| `vector::pop_back<T>(v: &mut vector<T>): T`                                        | `v`の最後の要素を削除して返す                                                                                                                       | `v`が空の場合                             |
| `vector::borrow<T>(v: &vector<T>, i: u64): &T`                                     | インデックス`i`で`T`への不変参照を返す                                                                                                        | 境界内で`i`がない場合                    |
| `vector::borrow_mut<T>(v: &mut vector<T>, i: u64): &mut T`                         |  インデックス`i`で`T`への可変参照を返す                                                                                                             | 境界内で`i`がない場合                   |
| `vector::destroy_empty<T>(v: vector<T>)`                                           | `v`を消去                                                                                                                                                      | `v`が空でない場合                      |
| `vector::append<T>(v1: &mut vector<T>, v2: vector<T>)`                             |  `v1`の末尾へ`v2`の要素を追加します                                                                                                                   | 一度もない                                      |
| `vector::reverse_append<T>(lhs: &mut vector<T>, other: vector<T>)`                 |   `other`ベクターの全ての要素を`lhs`ベクター内へ逆順でプッシュする(`other`で起きた時の逆順)                                 | 一度もない                                      |
| `vector::contains<T>(v: &vector<T>, e: &T): bool`                                  | `e`がベクトル`v`内にある場合はtrueを返します。そうでない場合はfalseを返します。                                                                                           | 一度もない                                      |
| `vector::swap<T>(v: &mut vector<T>, i: u64, j: u64)`                               |   ベクトル`v`のi`i`番めと`j`番めのインデックスの要素を交換します。                                                                                        |  `i`またはが`j`範囲外の場合          |
| `vector::reverse<T>(v: &mut vector<T>)`                                            |  ベクトル`v`内の要素の順序を逆にする                                                                                               | 一度もない                                      |
| `vector::reverse_slice<T>(v: &mut vector<T>, l: u64, r: u64)`                      | ベクター`v`内の要素`[l, r)`の順序を逆で配置する                                                                                    | 一度もない                                      |
| `vector::index_of<T>(v: &vector<T>, e: &T): (bool, u64)`                           | `e`がインデックス`i`のベクター`v`にある場合は`(true, i)`を返します。そうでない場合は`(false, 0)`を返します。                                                                | 一度もない                                      |
| `vector::insert<T>(v: &mut vector<T>, i: u64, e: T)`                               |     `O(length - i)`時間を使用して、`0 <= i <= length`位置へ新しい要素`e`を挿入します。                                                                        | `i`が範囲外の場合             |
| `vector::remove<T>(v: &mut vector<T>, i: u64): T`                                  | ベクター`v`の`i`番目の要素を削除し、後続の要素を全てシフトします。これは O(n) で、ベクター内の要素の順序は保持されます。                 | `i`が範囲外の場合                    |
| `vector::swap_remove<T>(v: &mut vector<T>, i: u64): T`                             | ベクター`v`の`i`番目の要素を最後の要素と交換し、要素をポップします。これは O(1) ですが、ベクター内の要素の順序は保持されません     | `i`が範囲外の場合 
| `vector::trim<T>(v: &mut vector<T>, new_len: u64): u64`                            | ベクター`v`を小さいサイズの`new_len`へトリミングし、削除された要素を順に返します。                                                                 | `new_len`は`v`の長さより大きい  |
| `vector::trim_reverse<T>(v: &mut vector<T>, new_len: u64): u64`                    | ベクター`v`を小さいサイズの`new_len`へトリミングし、削除された要素を逆順で返します。                                                    | `new_len`は`v`の長さより大きい  |
| `vector::rotate<T>(v: &mut vector<T>, rot: u64): u64`                              | `rotate(&mut [1, 2, 3, 4, 5], 2) -> [3, 4, 5, 1, 2]`を指定すると、分割ポイント(この例では3)を返します。                                              | 一度もない                                      |
| `vector::rotate_slice<T>(v: &mut vector<T>, left: u64, rot: u64, right: u64): u64` | rotate a slice `[left, right)` with `left <= rot <= right` in place, returns the split point     `left <= rot <= right`の位置でスライス`[left, right)`を回転し、分割点を返します。                                                               | 一度もない                                      |

## 例

```move
script {
    use std::vector;

    let v = vector::empty<u64>();
    vector::push_back(&mut v, 5);
    vector::push_back(&mut v, 6);

    assert!(*vector::borrow(&v, 0) == 5, 42);
    assert!(*vector::borrow(&v, 1) == 6, 42);
    assert!(vector::pop_back(&mut v) == 6, 42);
    assert!(vector::pop_back(&mut v) == 5, 42);
}
```

## ベクターの破壊とコピー

`vector<T>`の一部の動作は、要素型の機能`T`に依存します。例えば`drop`を持たない要素を含むベクトルは、上記例の`v`のような暗黙的破棄が出来ません。`vector::destroy_empty`で明白に破棄する必要が有ります。

注意:`vec`が要素を含んでいない場合を除き`vector::destroy_empty`は実行時に中止します。

```move
fun destroy_any_vector<T>(vec: vector<T>) {
    vector::destroy_empty(vec) // この行を削除するとコンパイラエラーが発生します
}
```

ただし、`drop`の要素を含むベクターを削除してもエラーは発生しません。

```move
script {
    fun destroy_droppable_vector<T: drop>(vec: vector<T>) {
        // 有効!
        // ベクターを破棄するために何もする必要は有りません
    }
}
```

ベクターは要素型が`copy`を持たない限りコピーできません。言い換えると、`T`が `copy`を持つ場合のみ、`vector<T>`は`copy`を持ちます。

詳細は[型機能](./abilities.md)と[ジェネリクス](./generics.md)のセクションを御覧下さい。

## 所有権

[上記](#destroying-and-copying-vectors)のように、要素がコピー出来る場合のみ`vector`要素はコピー出来ます。

