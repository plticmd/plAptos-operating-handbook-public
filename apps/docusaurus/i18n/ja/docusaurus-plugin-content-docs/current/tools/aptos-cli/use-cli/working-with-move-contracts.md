---
title: "Working With Move Contracts"
---

# Moveコントラクトの操作

Aptos CLIは主に、Moveコントラクトのコンパイル、テスト、形式検証に使用されます。まだ Aptos CLIをインストールしていない場合は、以下でインストール出来ます。
 [Install the Aptos CLI](../install-cli/index.md).

ここからセクションへジャンプできます:

1. [Moveのコンパイル](#1-compiling-move)
2. [Moveコントラクトのユニットテスト](#2-unit-testing-move-contracts)
3. [テスト範囲のレポートの作成](#3-generating-test-coverage-reports)
4. [Moveこのトラクトの公開](#4-publishing-move-contracts)
5. [公開されたコントラクトの実行](#5-running-published-contracts)
6. [(オプション)Moveスクリプトの形式検証](#6-optional-formally-verifying-move-scripts)

CLIを使用してMoveコントラクトをオンチェーンで連鎖させる方法は["CLI引数"チュートリアル](./move-tutorials/arguments-in-json-tutorial.md)を御覧下さい。

:::tip
このドキュメントは全体的に、コマンドを状況で変更しなくてはならない部分が有ります。それらの変数は`<この様な>`三角括弧で囲まれます。
:::

## 1. Moveのコンパイル

以下のコマンドを実行してMoveパッケージをコンパイル出来ます。

```bash
aptos move compile --package-dir <your-package-directory>
```

:::tip
パッケージ ディレクトリは、`Move.toml`ファイルが含まれるフォルダーです。
:::

`Move.toml`ファイル内の設定を基準として、コンパイルコマンドへ追加情報を渡す必要がある場合が有ります。

例えば[hello_blockchainサンプルのMoveコントラクト](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain)を見ると、`Move.toml`ファイル内で`hello_blockchain`という名前の変数が指定されています。

```
[addresses]
hello_blockchain = "_"
```

これをコンパイルするには、`--named-addresses`パラメータを使用して`hello_blockchain`の値を渡す必要があります。

```bash
aptos move compile --package-dir aptos-move/move-examples/hello_blockchain/ --named-addresses hello_blockchain=superuser
```

Moveコントラクトをコンパイルする際のオプションパラメータの詳細については、`aptos move compile --help`を実行して下さい。

## 2. Moveコントラクトのユニットテスト

AptosCLIを使用すると、以下のコマンドの実行でローカルでユニットテストをコンパイル、実行する事も出来ます。

```bash
aptos move test --package-dir <your-package-directory>
```

このコマンドはコンパイルとテストの実行の両方を行うため、コンパイル時に使用するのと同じオプションパラメータが全て必要となります。

`aptos move test --help`を実行すると、moveコントラクトをテストするためのオプションパラメータの詳細を学習出来ます。

### デバッグ情報の出力

テストを書く時、デバッグ情報やスタックトレースを出力すると便利です。`aptos move test`を使う時、`debug::print`と`debug::print_stack_trace`を使用して情報を出力する事でこれを実現出来ます。

[DebugDemo.move](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos/debug-move-example/sources/DebugDemo.move)での使用方法の例を御覧下さい。

[DebugDemo.move](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos/debug-move-example/sources/DebugDemo.move)パッケージのテストの出力を確認するなら、

1. `[aptos-core](https://github.com/aptos-labs/aptos-core)`をクローンします。
2. `cd crates/aptos/debug-move-example`を実行して[debug-move-example](https://github.com/aptos-labs/aptos-core/tree/main/crates/aptos/debug-move-example)へ移動します。
3. `aptos move test`を実行します。

以下も御覧下さい。

```
Running Move unit tests
[debug] 0000000000000000000000000000000000000000000000000000000000000001
Call Stack:
    [0] 0000000000000000000000000000000000000000000000000000000000000001::Message::sender_can_set_message

        Code:
            [4] CallGeneric(0)
            [5] MoveLoc(0)
            [6] LdConst(0)
          > [7] Call(1)
            [8] Ret

        Locals:
            [0] -
            [1] 0000000000000000000000000000000000000000000000000000000000000001

Operand Stack:
```

このMove チュートリアルに従ってください(手順 2 では単体テストに焦点を当てています)。

Moveを使用して単体テストを記述する方法の詳細は[Moveチュートリアル](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/move-tutorial)を御覧下さい。(ステップ2で単体テストへ焦点を当てています)。

## 3. テスト範囲レポートの作成

Aptos CLIを使用するとMoveモジュールのテスト分析と改善が出来ます。この機能を使用するには、

テストのコード範囲を確認するには、Moveパッケージのディレクトリから以下のコマンドを実行します。

```bash
aptos move test --coverage
```

特定のパッケージへ範囲を絞り込みたい場合は、`--filter`オプションを使用します。更に特定のMoveモジュールへ絞り込む場合は`--module`パラメータを使用します。

より詳細で高度な範囲情報(コンパイルされたバイトコード内のテスト範囲など)は`aptos move coverage`を実行出来ます。このコマンドを使用すると、どのような範囲情報を知りたいのか具体的な詳細情報の入力をCLIが指示します。
 
 `aptos move test --help`及び`aptos move coverage --help`を実行すると、テストする範囲のオプションパラメータの詳細を学習出来ます。

## 4. Moveコントラクトの公開

Moveコントラクトを公開する場合、以下を実行する必要があります。

```bash
aptos move publish --package-dir <your-package-directory>
```

注意。メインネットワークで公開する場合、オプション パラメーターに渡す`--named-addresses`の様な資格情報は、テスト資格情報ではなく、ネットワーク上のアカウントを反映する必要が有ります。

パッケージはCLIのデフォルトプロファイルへ公開されます。
これを無視して、`--profile`コマンドを使用してどのアカウントで公開するか特定出来ます。特定のアカウントの新しいプロファイルを生成するには、`aptos init --profile <name_of_profile>`を使用してプロンプトへ従います。

Moveモジュールを公開する際、1つのパッケージに複数のモジュールが含まれている場合、そのパッケージの全モジュールが同じアカウントを使用する必要がある事にも注意して下さい。
異なるアカウントを使用すると、トランザクションレベルで公開が失敗します。
 
[Gas Profiler](../../../move/move-on-aptos/gas-profiling.md)を使用すると、Moveコントラクトの公開に関連するガス料金を見積もる事が出来ます。

:::caution
デフォルトでは、Moveコントラクトはソースコードを公開します。ソースコードでの公開を回避するには、`--included-artifacts none`引数を使用して公開します。

Aptosブロックチェーンは設計上本質的にオープンであるため、ソースアクセスがなくても、公開された MoveバイトコードからMoveソースを再生成できる事に注意してください。
:::

## 5. 公開されたコントラクトの実行

Moveパッケージを公開したので、CLIから直接実行できます。

まず、以下を組み合わせて`function-id`を構築する必要が有ります。

```jsx
<the-address-you-published-to>::<module_name>::<function_name>
```

次に、`--args`パラメータを使用して引数を渡す事ができます。

例えば、[hello_blockchainサンプルパッケージ](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain)を
`b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb`アドレスのアカウントへ公開した場合、以下のコマンドでその`set_message`関数を実行出来ます。

```bash
aptos move run --function-id 0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb::message::set_message --args string:hello!
```

結果は:

```json
{
  "Result": {
    "changes": [
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "authentication_key": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
          "self_address": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
          "sequence_number": "3"
        },
        "event": "write_resource",
        "resource": "0x1::account::Account"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "coin": {
            "value": "9777"
          },
          "deposit_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "1"
              }
            }
          },
          "withdraw_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "2"
              }
            }
          }
        },
        "event": "write_resource",
        "resource": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "counter": "4"
        },
        "event": "write_resource",
        "resource": "0x1::guid::Generator"
      },
      {
        "address": "b9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
        "data": {
          "message": "hello!",
          "message_change_events": {
            "counter": "0",
            "guid": {
              "id": {
                "addr": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb",
                "creation_num": "3"
              }
            }
          }
        },
        "event": "write_resource",
        "resource": "0xb9bd2cfa58ca29bce1d7add25fce5c62220604cd0236fe3f90d9de91ed9fb8cb::Message::MessageHolder"
      }
    ],
    "gas_used": 41,
    "success": true,
    "version": 3488,
    "vm_status": "Executed successfully"
  }
}
```

## 6. (オプション)Moveスクリプトの形式検証

ユニットテストを超えてコードが期待どおり動作する事を保証したい場合は[Move Prover](../../../move/prover/index.md)を使用してMoveコントラクトコードを形式検証できます。

Move Proverは[これらの手順](../install-cli/install-move-prover.md)でインストール出来ます。

Move Proverをインストールしたら、以下を実行してAptos CLIから使用出来ます。
 
```bash
aptos move prove --package-dir <your-package-directory>
```

コードを形式検証する方法の学習は、ここにある詳細な Move チュートリアルに従ってください(手順 7 と 8 では、Move Proverの使用方法とサンプル コードでの形式の特定方法を解説します)。
コードを形式検証する方法の学習は[ここ](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/move-tutorial)の詳細な Move チュートリアルに従って下さい。(手順 7と8では、Move Proverの使用方法とサンプルコードでの形式の特定方法を解説します)。

