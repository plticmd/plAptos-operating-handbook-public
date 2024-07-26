---
title: "Arguments in JSON Tutorial"
---

import CodeBlock from '@theme/CodeBlock';

# JSONチュートリアルの引数

## パッケージ情報

 このセクションは以下のマニフェストを含む[`CliArgs`サンプルパッケージ](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args)を参照します。


import move_toml from '!!raw-loader!/static/move-examples/cli_args/Move.toml';

<CodeBlock language="toml" title="Move.toml">{move_toml}</CodeBlock>

ここで、パッケージは名前付きアドレス`test_account`の下へデプロイされます

:::tip
以下のコマンドで作業ディレクトリを[`aptos-move/move-examples/cli_args`](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args)へ移動します。

```bash
cd <aptos-core-parent-directory>/aptos-core/aptos-move/move-examples/cli_args
```

:::

## パッケージのデプロイ

パッケージをデプロイするAceのバニティアドレスをマイニングして開始します。

```bash title=Command
aptos key generate \
    --vanity-prefix 0xace \
    --output-file ace.key
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "Account Address:": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "PublicKey Path": "ace.key.pub",
    "PrivateKey Path": "ace.key"
  }
}
```

</details>

:::tip
正確なアカウントアドレスは実行ごとに異なりますが、バニティプレフィックスは変更しないでください。
:::

Aceのアドレスをシェル変数へ保存して、後でインラインで呼び出せる様にします。

```bash
# Your exact address should vary
ace_addr=0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46
```

フォーセット（devネットまたはテストネット）を利用しAceのアカウントへ資金を入金します。

```bash title=Command
aptos account fund-with-faucet --account $ace_addr
```

<details>
<summary>出力</summary>

```bash
{
  "Result": "Added 100000000 Octas to account acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46"
}
```

</details>

Aceのアカウントでパッケージを公開します。

```bash title=Command
aptos move publish \
    --named-addresses test_account=$ace_addr \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x1d7b074dd95724c5459a1c30fe4cb3875e7b0478cc90c87c8e3f21381625bec1",
    "gas_used": 1294,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1685077849297587,
    "version": 528422121,
    "vm_status": "Executed successfully"
  }
}
```

</details>

## エントリー関数

パッケージ内の唯一のモジュール`cli_args.move`は、様々なデータ型のフィールドを持つ単純な`Holder`リソースを定義します。

```rust title="cli_args.moveのホルダー"
:!: static/move-examples/cli_args/sources/cli_args.move resource
```

複数のネストされたベクターを持つ公開エントリ関数を使用して、フィールドを設定できます。

```rust title="cli_args.moveのセッター関数"
:!: static/move-examples/cli_args/sources/cli_args.move setter
```

パッケージが公開された後`set_vals()`を呼び出すため、`aptos move run`を使用出来ます。

:::tip
コマンドラインからベクター(ネストされたベクトルを含む) を引数として渡すには、引用符でエスケープされたJSON構文を使用します。
:::

```bash title="ネストされたベクトル引数を持つ関数をCLIから実行する"
aptos move run \
    --function-id $ace_addr::cli_args::set_vals \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "hex:0x1234" \
        "string:hello, world\! ♥" \
        "bool:[false, true, false, false]" \
        'address:[["0xace", "0xbee"], ["0xcad"], []]' \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x5e141dc6c28e86fa9f5594de93d07a014264ebadfb99be6db922a929eb1da24f",
    "gas_used": 504,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 1,
    "success": true,
    "timestamp_us": 1685077888820037,
    "version": 528422422,
    "vm_status": "Executed successfully"
  }
}
```

</details>

関数ID、型引数、引数は、JSONファイルで指定しても良いです。

import entry_json_file from '!!raw-loader!/static/move-examples/cli_args/entry_function_arguments.json';

<CodeBlock language="json" title="entry_function_arguments.json">{entry_json_file}</CodeBlock>

ここでの`aptos move run`の呼び出しは以下の様な感じです。

```bash title="Running function with JSON input file"
aptos move run \
    --json-file entry_function_arguments.json \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x60a32315bb48bf6d31629332f6b1a3471dd0cb016fdee8d0bb7dcd0be9833e60",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 2,
    "success": true,
    "timestamp_us": 1685077961499641,
    "version": 528422965,
    "vm_status": "Executed successfully"
  }
}
```

</details>

:::tip
この例を自分で実行しようとしている場合は、 `entry_function_arguments.json`の`<test_account>`をAceの実際のアドレスへ置き換える事を忘れないで下さい。
:::

## View関数

`Holder`の値が設定されると、`reveal()`view関数を使用して最初の3つのフィールドをチェックし、型引数を最後の2つのフィールドと比較できます。

```rust title="View関数"
:!: static/move-examples/cli_args/sources/cli_args.move view
```

このビュー関数は、CLIまたはJSONファイルから特定された引数を使用して呼び出すことができます。

```bash title="CLI経由の引数"
aptos move view \
    --function-id $ace_addr::cli_args::reveal \
    --type-args \
        0x1::account::Account \
        0x1::account::Account \
    --args address:$ace_addr
```

```bash title="JSONファイル経由の引数"
aptos move view --json-file view_function_arguments.json
```

:::tip
この例を自分で実行しようとしている場合は、`view_function_arguments.json`の`<test_account>`をAceの実際のアドレスに置き換える事を忘れないで下さい(2回)。
:::

import view_json_file from '!!raw-loader!/static/move-examples//cli_args/view_function_arguments.json';

<CodeBlock language="json" title="view_function_arguments.json">{view_json_file}</CodeBlock>

```bash title="出力"
{
  "Result": [
    {
      "address_vec_vec": [
        [
          "0xace",
          "0xbee"
        ],
        [
          "0xcad"
        ],
        []
      ],
      "bool_vec": [
        false,
        true,
        false,
        false
      ],
      "bytes": "0x1234",
      "type_info_1_match": true,
      "type_info_2_match": false,
      "u8_solo": 123,
      "utf8_string": "hello, world! ♥"
    }
  ]
}
```

## スクリプト関数

パッケージにはsetter関数のラッパーであるスクリプト、`set_vals.move`も含まれています。

```rust title="スクリプト"
:!: static/move-examples/cli_args/scripts/set_vals.move script
```

まずパッケージをコンパイルします(これによりスクリプトがコンパイルされます)。

```bash title="コンパイル"
aptos move compile --named-addresses test_account=$ace_addr
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46::cli_args"
  ]
}
```

</details>

次は`aptos move run-script`を実行します。

```bash title="CLI経由の引数"
aptos move run-script \
    --compiled-script-path build/CliArgs/bytecode_scripts/set_vals.mv \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "hex:0x1234" \
        "string:hello, world\! ♥" \
        "u8:[122, 123, 124, 125]" \
        address:"0xace" \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x1d644eba8187843cc43919469112339bc2c435a49a733ac813b7bc6c79770152",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 3,
    "success": true,
    "timestamp_us": 1685078415935612,
    "version": 528426413,
    "vm_status": "Executed successfully"
  }
}
```

</details>

```bash title="JSONファイル経由の引数"
aptos move run-script \
    --compiled-script-path build/CliArgs/bytecode_scripts/set_vals.mv \
    --json-file script_function_arguments.json \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x840e2d6a5ab80d5a570effb3665f775f1755e0fd8d76e52bfa7241aaade883d7",
    "gas_used": 3,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 4,
    "success": true,
    "timestamp_us": 1685078516832128,
    "version": 528427132,
    "vm_status": "Executed successfully"
  }
}
```

</details>

import script_json_file from '!!raw-loader!/static/move-examples/cli_args/script_function_arguments.json';

<CodeBlock language="json" title="script_function_arguments.json">{script_json_file}</CodeBlock>

このようなスクリプト関数の呼び出しは両方とも、以下の`reveal()`ビュー関数を出力します。

```bash title="View関数呼び出し"
aptos move view \
    --function-id $ace_addr::cli_args::reveal \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args address:$ace_addr
```

```json title="View関数の出力"
{
  "Result": [
    {
      "address_vec_vec": [["0xace"]],
      "bool_vec": [false, false, true, true],
      "bytes": "0x1234",
      "type_info_1_match": true,
      "type_info_2_match": true,
      "u8_solo": 123,
      "utf8_string": "hello, world! ♥"
    }
  ]
}
```

:::note
この記事の執筆時点では、`aptos`CLIは`u8`型のベクターのスクリプト関数引数のみをサポートしており、ベクターの深さは1までです。従って`vector<address>`と`vector<vector<u8>>`は無効なスクリプト関数引数型です。
:::