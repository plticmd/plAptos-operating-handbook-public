# signer(署名者)

`signer`は組み込みのMoveリソース型です。`signer`は、所有者が特定の`address`に代わって動作出来ようにする[機能](https://en.wikipedia.org/wiki/Object-capability_model)です 。ネイティブ実装は以下のように考える事が出来ます。

```move
module 0x1::signer {
  struct signer has drop { a: address }
}
```

`signer`は、Move外部のコードによって認証されたユーザー(暗号署名やパスワードの確認など)を表すという点でUnix [UID](https://en.wikipedia.org/wiki/User_identifier)と似ています。

## `address`と比較する

Moveプログラムは、アドレスリテラルを使用して、特別な許可無しに任意の`address`値を作成出来ます。

```move
script {
  fun example() {
    let a1 = @0x1;
    let a2 = @0x2;
    // ... 他の全ての可能なアドレスも同様
  }
}
```

ただし、`signer`値はリテラルや命令では作成出来ず、MoveVMのみによって作成出来るため、特別です。
VMは`signer`型のパラメータを使用してスクリプトを実行する前に`signer`値を自動的に作成し、スクリプトへ渡します。
 
```move
script {
    use std::signer;
    fun main(s: signer) {
        assert!(signer::address_of(&s) == @0x42, 0);
    }
}
```

このスクリプトは、`0x42`以外のアドレスから送信された場合、`0`コードで中止されます。

Moveスクリプトは、`signer`sが他の任意の引数の接頭辞である限り、任意の数の`signer`sを持つ事が出来ます。言い換えると、全ての`signer`引数が最初に来る必要が有ります。

```move
script {
    use std::signer;
    fun main(s1: signer, s2: signer, x: u64, y: u8) {
        // ...
    }
}
```

これは、複数の当事者の権限で原始的に動作する _複数署名スクリプト_ を実装する場合便利です。例えば、上記スクリプトの拡張では、`s1`と`s2`の間でアトミック(原始的)通貨スワップを実行出来ます。

## `signer`演算子

`std::signer`標準ライブラリモジュールは`signer`値に対する２つのユーティリティー関数を提供します。

| 関数                                    |            説明                                         |
| ------------------------------------------- | -------------------------------------------------------------- |
| `signer::address_of(&signer): address`      | この`&signer`でラップした`address`を返す                |
| `signer::borrow_address(&signer): &address` | この`&signer`でラップした`address`への参照を返す |

更に、`move_to<T>(&signer, T)`[グローバルストレージオペレータ](./global-storage-operators.md)は、`signer.address`のアカウントでリソース`T`を公開するための`&signer`引数が必要です。これにより、認証されたユーザーだけが、自分の`address`でリソースを公開する事を選択可能となります。

## 所有権

単純なスカラー値とは異なり、`signer`値はコピー可能ではありません。即ち、明示的な[`コピー`](./variables.md#move-and-copy)命令を介しても、[逆参照 `*`](./references.md#reading-and-writing-through-references)を介しても、どの操作からもコピーする事は出来ません。

 