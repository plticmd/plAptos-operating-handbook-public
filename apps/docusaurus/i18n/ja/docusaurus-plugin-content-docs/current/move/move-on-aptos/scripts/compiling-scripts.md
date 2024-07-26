---
title: "Compiling Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# どうしたらMove Scriptsをコンパイル出来るのか?

Moveスクリプトは、AptosCLI内の既存のAptos Moveコンパイラを使用してコンパイル出来ます。
<!-- 単純にスクリプトファイルを作成してパッケージ内で以下を使ってコンパイルします。 -->
MoveコントラクトでAptos CLIをインストールして使用する方法の詳細は「Moveコントラクトの操作」ページを参照して下さい。

Aptos CLIをインストールしたら、スクリプトパッケージ内で以下のコマンドを実行してスクリプトをコンパイル出来ます。

```shell
aptos move compile
```

Move内の関数と同じ名前でコンパイルされたバイトコードァイルが`build/`下へ作成されるでしょう。

例えばこの`transfer_half`パッケージ内のスクリプトは`build/transfer_half/bytecode_scripts/transfer_half.mv`へコンパイルされます。

```move
script {
  use std::signer;
  use aptos_framework::coin;
  use aptos_framework::aptos_account;

  fun transfer_half<Coin>(caller: &signer, receiver_address: address) {
    // 発信者の残高を取得する
    let caller_address: address = signer::address_of(caller);
    let balance: u64 = coin::balance<Coin>(caller_address);

    // 半分を受sん者へ送信する
    let half = balance / 2;
    aptos_account::transfer_coins<Coin>(caller, receiver_address, half);
  }
}
```

以下のコマンドで、ただひとつのスクリプトを含むパッケージ用の便利な関数があります。

```shell
aptos move compile-script
```

以下のような出力を提供し、スクリプトの正確な場所と便宜上のハッシュを返します。

```shell
Compiling, may take a little while to download git dependencies...
UPDATING GIT DEPENDENCY https://github.com/aptos-labs/aptos-core.git
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING transfer_half
{
  "Result": {
    "script_location": "/opt/git/developer-docs/apps/docusaurus/static/move-examples/scripts/transfer_half/script.mv",
    "script_hash": "9b57ffa952da2a35438e2cf7e941ef2120bb6c2e4674d4fcefb51d5e8431a148"
  }
}
```
