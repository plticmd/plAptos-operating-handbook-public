---
title: "Your First Move Module"
slug: "first-move-module"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Moveモジュール入門  

このチュートリアルでは、どの様にコンパイル、テスト、公開し、Aptosブロックチェーン上でMove モジュールと交信するのか詳しく解説します。手順を要約すると、

1. Aptos CLI 用のプリコンパイルされたバイナリをインストールします。
2. Aptosブロックチェーン上にアカウントを作成し、資金を投入します。
3. Moveモジュールをコンパイルしてテストします。
4. AptosブロックチェーンにMoveモジュールを公開します。
5. Move モジュールと対話します。

## ステップ 1: CLIをインストールする。

[Aptos CLI用のプリコンパイルされたバイナリをインストールする](../tools/aptos-cli/install-cli/index.md).

---

## ステップ 2: アカウントを作成し資金を投入する。

CLI バイナリをインストールした後、Aptos ブロックチェーン上にアカウントを作成し、資金を投入します。

新しいターミナルを起動し、次のコマンドを実行して新しいローカル アカウントを初期化します。

```bash
aptos init
```

ネットワークの選択を求める出力が表示されます。

```text
Choose network from [devnet, testnet, mainnet, local, custom | defaults to devnet]
```

**Return**を押してデフォルトのdevnetネットワークを受け入れるか、選択したネットワークを指定します。

```text
No network given, using devnet...
```

~~デフォルトを受け入れて新しいキーを作成するか、既存のキーを入力し、秘密カギを確認してプロンプトへ応答します。~~

秘密鍵に関して応答します。デフォルトでは新しく鍵が作られますが、既存の鍵を入力しても良いです。

```text
Enter your private key as a hex literal (0x...) [Current: None | No input: Generate new key (or keep one if present)]
```

新規作成を選択した場合、次のように表示されます。

```text
No key given, generating key...
Account a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a doesn't exist, creating it and funding it with 100000000 Octas
Account a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a funded successfully

---
Aptos CLI is now set up for account a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a as profile default!  Run `aptos --help` for more information about commands
{
  "Result": "Success"
}
```

上記のアカウント アドレス`a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a`は新しいアカウントであり、 profile`default`としてエイリアスが付けられています。このアカウント アドレスはランダムに生成される物で、お客様の物とは異なります。今後このドキュメントでは`default`または`0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a`のいずれかを同じ意味で使用します。必要に応じて自分のアドレスに置き換えてください。

次のコマンドを実行して、このアカウントに資金を投入します。

```bash
aptos account fund-with-faucet --account default
```

次のような出力が表示されます。

```text
{
  "Result": "Added 100000000 Octas to account a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a"
}
```

---

## ステップ 3: コンパイルしてモジュールをテストする

Move モジュールのサンプルが[aptos-core/aptos-move/move-examples](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples)ディレクトリに用意されており、使用できます。ターミナルを開き、以下の通り
[`hello_blockchain`](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain)ディレクトリへ移動します。

```bash
cd aptos-core/aptos-move/move-examples/hello_blockchain
```

以下のコマンドを実行して`hello_blockchain`モジュールをコンパイルします。

```bash
aptos move compile --named-addresses hello_blockchain=default
```

次のような出力が表示されます。

```text
{
  "Result": [
    "a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message"
  ]
}
```

`compile`コマンドには上記の`--named-addresses` を含める必要があります。[`Move.toml`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/move-examples/hello_blockchain/Move.toml)ファイルではこれが未定義のままになっているため必要。(下記を参照)

モジュールをテストするには、次のコマンドを実行します。

```bash
aptos move test --named-addresses hello_blockchain=default
```

そして、次のような出力を受け取ります。

```text
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING Examples
Running Move unit tests
[ PASS    ] 0x1a42874787568af30c785622899a27dacce066d671fa487e7fb958d6d0c85077::message::sender_can_set_message
[ PASS    ] 0x1a42874787568af30c785622899a27dacce066d671fa487e7fb958d6d0c85077::message_tests::sender_can_set_message
Test result: OK. Total tests: 2; passed: 2; failed: 0
{
  "Result": "Success"
}
```

前のステップで作成したアカウント用のモジュールを準備するには、`default`プロファイル エイリアスを使用して、名前付きアドレス`hello_blockchain`がアカウント アドレスに設定されるように指定します。
 

```toml
[addresses]
hello_blockchain = "_"
```

---

## ステップ 4: Moveモジュールを公開する

コードをコンパイルしテストした後、次のコマンドを使用して、このチュートリアル用に作成したアカウントにモジュールを公開できます。

```bash
aptos move publish --named-addresses hello_blockchain=default
```

次のような出力が表示されます。

```bash
package size 1631 bytes
{
  "Result": {
    "transaction_hash": "0x45d682997beab297a9a39237c588d31da1cd2c950c5ab498e37984e367b0fc25",
    "gas_used": 13,
    "gas_unit_price": 1,
    "pending": null,
    "sender": "a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a",
    "sequence_number": 8,
    "success": true,
    "timestamp_us": 1661320216343795,
    "version": 3977,
    "vm_status": "Executed successfully"
  }
}
```

この時点で、モジュールは Aptos ブロックチェーンのアカウントに保存されます。

---

## ステップ 5: Moveモジュールと対話する

Move モジュールは、エントリー関数として知られるアクセス ポイントを公開します。これらのエントリ関数はトランザクション経由で呼び出すことができます。Aptos CLI を使用すると、これらのエントリ機能にシームレスにアクセスできます。Move モジュールのサンプル`hello_blockchain`は`string`を取り込む`set_message`エントリー関数を公開します。これは CLI 経由で呼び出すことができます。

```bash
aptos move run \
  --function-id 'default::message::set_message' \
  --args 'string:hello, blockchain'
```

成功すると、CLI は次の内容を出力します。

```json
{
  "Result": {
    "transaction_hash": "0x1fe06f61c49777086497b199f3d4acbee9ea58976d37fdc06d1ea48a511a9e82",
    "gas_used": 1,
    "gas_unit_price": 1,
    "pending": null,
    "sender": "a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a",
    "sequence_number": 1,
    "success": true,
    "timestamp_us": 1661320878825763,
    "version": 5936,
    "vm_status": "Executed successfully"
  }
}
```

この`set_message`関数は`hello_blockchain`の `MessageHolder`リソースを変更します。個々のリソースはグローバル ストレージに保存されるデータ構造です。リソースは、下記の REST API をクエリすることで読み取ることができます。

```bash

https://api.devnet.aptoslabs.com/v1/accounts/a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a/resource/0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message::MessageHolder
```

最初の実行後、以下が含まれるはずです。

```json
{
  "type": "0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message::MessageHolder",
  "data": {
    "message": "hello, blockchain",
    "message_change_events": {
      "counter": "0",
      "guid": {
        "id": {
          "addr": "0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a",
          "creation_num": "3"
        }
      }
    }
  }
}
```

`message`フィールドに`hello, blockchain`が含まれていることに注意してください。

最初の呼び出しの後`set_message`の呼び出しが成功するたび、`message_change_events`が更新されます。特定のアカウントの`message_change_events`には、REST API 経由でアクセスできます。

```bash
https://api.devnet.aptoslabs.com/v1/accounts/0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a/events/0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message::MessageHolder/message_change_events
```

ここで、メッセージを`hello, blockchain, again`に設定するための呼び出しをすると、イベント ストリームには次の内容が含まれています。

```json
[
  {
    "version": "8556",
    "key": "0x0300000000000000a345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a",
    "sequence_number": "0",
    "type": "0xa345dbfb0c94416589721360f207dcc92ecfe4f06d8ddc1c286f569d59721e5a::message::MessageChangeEvent",
    "data": {
      "from_message": "hello, blockchain",
      "to_message": "hello, blockchain, again"
    }
  }
]
```

:::tip
この例とまったく同じ関数を呼び出すことで、他のアカウントが、公開されたモジュールを再利用できます。読者の演習としてこの関数は残されています。
:::

## サポート資料

- [アカウントの基本](../concepts/accounts.md)
- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 
- [Rust SDK](../sdks/rust-sdk/index.md) 
- [REST API仕様](https://aptos.dev/nodes/aptos-api-spec#/)
