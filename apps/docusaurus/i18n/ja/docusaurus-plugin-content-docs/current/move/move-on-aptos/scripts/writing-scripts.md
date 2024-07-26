---
title: "Writing Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# Moveスクリプトはどの様に記述するのか?

MoveスクリプトはMoveコントラクトと並行して記述出来ますが、別のMoveパッケージを使用する事を強くお勧めします。これでスクリプトから取得されるバイトコード ファイルを簡単に特定出来ます。

## パッケージレイアウト

パッケージは、コードモジュールと同様Move.tomlとソースディレクトリが必要です。

例えば、以下のようなディレクトリレイアウトがあるとします。

```
my_project/
├── Move.toml
└── sources/
    └── my_script.move

```

## スクリプト構文

スクリプトは、Aptoのモジュールと全く同じように記述出来ます。インポートを使ってMove.tomlファイル内のあらゆる依存関係、エントリー関数を含む全ての公開関数をコントラクトから呼び出す事が出来ます。
<!--Imports can be used for any dependencies in the Move.toml file, and all public functions, including entry functions, can be called from the contract. -->
いくつかの制限があります。

- コントラクトには関数がひとつだけ存在する必要があります。その名前へコンパイルされます。
- 入力引数は、[`u8`、`u16`、`u32`、`u64`、`u256`、`address`、`bool`、`signer`、`&signer`、`vector<u8>`] のいずれかひとつのみとなります。他の型のベクトルや構造体のサポートは有りません。

例を御覧下さい。

```move
script {
  use std::signer;
  use aptos_framework::coin;
  use aptos_framework::aptos_account;

  fun transfer_half<Coin>(caller: &signer, receiver_address: address) {
    // 発信者の残高を取得する
    let caller_address: address = signer::address_of(caller);
    let balance: u64 = coin::balance<Coin>(caller_address);

    // 受信者へ半分送信する
    let half = balance / 2;
    aptos_account::transfer_coins<Coin>(caller, receiver_address, half);
  }
}
```

より具体的な詳細は[Moveブックオンスクリプト](/move/book/modules-and-scripts.md)を御覧下さい。
