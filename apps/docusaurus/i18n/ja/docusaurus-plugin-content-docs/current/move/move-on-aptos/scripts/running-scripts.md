---
title: "Running Move Scripts"
---

import CodeBlock from '@theme/CodeBlock';

# どうしたらMove Scriptsを実行出来るのか?

Moveスクリプトは、Aptos Typescript SDK、Aptosウォレットアダプター、Aptos CLI でサポートされています。

## Typescript SDKでスクリプトを実行する

TypeScript SDKでスクリプトを使用する場合、エントリ関数名ではなく`bytecode`をトランザクションへ直接追加します。


```ts
import { readFileSync } from "fs";
import { Aptos, Account, AccountAddress } from "@aptos-labs/ts-sdk";

// クライアントを設定し、署名するアカウントを設定する。
const aptos = new Aptos();
const account = Account.generate();

// スクリプトのバイトコードをロードする。
const buffer = readFileSync("./transfer_half.mv", "buffer");
const bytecode = new Uint8Array.from(buffer);

// スクリプトのバイトコードでトランザクションを構築する
const transaction = await aptos.transaction.build.simple({
  sender: account.accountAddress,
  data: {
    bytecode,
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: ["0x1"],
  },
});

// 送信してトランザクションが完了するまで待つ
const pendingTxn = await aptos.signAndSubmitTransaction({
  signer: account,
  transaction,
});
await aptos.waitForTransaction({ transactionHash: pendingTxn.hash });
```

## Aptosウォレットアダプターでスクリプトを実行する

:::warning
全てのウォレットがスクリプトをサポートしているわけではありませんが、ウォレットがスクリプトをサポートしている場合は以下のような提供が出来ます。
:::

TypeScript SDKと同様、同じ入力はウォレットアダプターのトランザクションタイプとして受け入れられます。ただ単純にバイトコードを16進数`string`もしくは`uint8array`としてロードします。


```ts
import { useWallet } from "@aptos-labs/wallet-adapter-react";

//...

// バイトコードをuint8配列もしくは16進数でエンコードされた文字列としてロードする
const BYTECODE_IN_HEX = "0xa11ceb0b...78979";

export default function App() {
  const { signAndSubmitTransaction } = useWallet();

  function submitScript() {
    signAndSubmitTransaction({
      data: {
        bytecode: BYTECODE_IN_HEX,
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: ["0x1"],
      },
    });
  }

  // ...
}
```

## CLI でスクリプトを実行するR

以下のコマンドを使用しCLIでスクリプトを実行出来ます。

```shell
aptos move run-script
```

これを実行するには、事前にコンパイルされたスクリプトを使用する方法と、コンパイル手順同様その場でスクリプトをコンパイルする方法の2つの方法があります。

すでにコンパイルされたスクリプトがある場合は、`--compiled-script-path`で実行出来ます。以下の例参照。

```shell
aptos move run-script --compiled-script-path /opt/git/developer-docs/apps/docusaurus/static/move-examples/scripts/transfer_half/script.mv
```

同様に、コンパイルされていない場合は、ただ
`--script-path`を使います。

```shell
aptos move run-script --script-path ./sources/transfer_half.move
```
