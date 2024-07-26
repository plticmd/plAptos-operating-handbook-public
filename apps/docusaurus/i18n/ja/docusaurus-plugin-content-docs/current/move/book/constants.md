# 定数

定数は`module`または`script`内の共有の静的な値へ名前を付ける方法です。

定数はコンパイル時に既知である必要があります。定数の値はコンパイルされたモジュールまたはスクリプトへ保存されます。定数が使用されるたび、その値の新しいコピーが作成されます。

## 宣言

定数宣言は`const`キーワードで始まり、その後名前、型、値が続きます。それらはスクリプトまたはモジュールのどちらでも存在出来ます。

```text
const <name>: <type> = <expression>;
```

例えば

```move
script {

    const MY_ERROR_CODE: u64 = 0;

    fun main(input: u64) {
        assert!(input > 0, MY_ERROR_CODE);
    }

}

address 0x42 {
module example {

    const MY_ADDRESS: address = @0x42;

    public fun permissioned(s: &signer) {
        assert!(std::signer::address_of(s) == MY_ADDRESS, 0);
    }

}
}
```

## 命名

定数は`A`から`Z`までの大文字で始まる必要があります。最初の文字の後、定数名にはアンダースコア`_`、`a`から`z`の文字、`A`から`Z`の文字、または`0`から`9`までの数字を含める事が出来ます。

```move
const FLAG: bool = false;
const MY_ERROR_CODE: u64 = 0;
const ADDRESS_42: address = @0x42;
```

定数では`a`から`z`の文字を使用できますが[一般的なスタイルガイドライン](./coding-conventions.md)では`A`から`Z`の大文字のみを使用し、各単語の間へアンダースコア`_`を入れます。
 
`A`から`Z`で始まるこの命名制限は、将来の言語機能のための余地を残すため設置されています。この制限は後で削除される可能性も、削除されない可能性も有ります。 

## 可視性

`public`定数は現在サポートされていません。`const`値は宣言モジュール内でのみ使用出来ます。

## 有効な式

現在、定数はプリミティブ型`bool`、`u8`、`u16`、`u32`、`u64`、`u128`、`u256`、`address`、
`vector<u8>`に制限されています。

他の`vector`値 (「文字列」スタイルのリテラル以外)の将来的なサポートは後日提供される予定です。 

### 値

一般的に、`const`にはその型の単純な値またはリテラルが割り当てられます。例えば

```move
const MY_BOOL: bool = false;
const MY_ADDRESS: address = @0x70DD;
const BYTES: vector<u8> = b"hello world";
const HEX_BYTES: vector<u8> = x"DEADBEEF";
```

### 複雑な式

リテラルに加えて、コンパイラがコンパイル時に値への式を減らす事が出来る限り、定数にはより複雑な式を含める事が出来ます。

現在等価演算、全てのブール演算、全てのビット単位の演算、全ての算術演算を使用出来ます。

```move
const RULE: bool = true && false;
const CAP: u64 = 10 * 100 + 1;
const SHIFTY: u8 = {
  (1 << 1) * (1 << 2) * (1 << 3) * (1 << 4)
};
const HALF_MAX: u128 = 340282366920938463463374607431768211455 / 2;
const REM: u256 = 57896044618658097711785492504343953926634992332820282019728792003956564819968 % 654321;
const EQUAL: bool = 1 == 1;
```

操作の結果ランタイムの例外が発生した場合、コンパイラは定数の値を生成できないというエラーを返します。

```move
const DIV_BY_ZERO: u64 = 1 / 0; // エラー!
const SHIFT_BY_A_LOT: u64 = 1 << 100; // エラー!
const NEGATIVE_U64: u64 = 0 - 1; // エラー!
```

注意: 現時点では、定数は他の定数を参照出来ません。この機能は他の式のサポートとともに、将来追加される予定です。
 