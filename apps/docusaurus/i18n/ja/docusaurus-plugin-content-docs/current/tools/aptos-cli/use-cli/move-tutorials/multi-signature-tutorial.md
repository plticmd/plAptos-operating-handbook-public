---
title: "Multisig Governance Tutorial"
---

import CodeBlock from '@theme/CodeBlock';

# マルチシグガバナンスチュートリアル

## 背景

このセクションは[JSONの引数チュートリアル](./arguments-in-json-tutorial.md)へ基づいて構築しています。まだチュートリアルを完了していない場合は、まずそのチュートリアルを完了してください。

このチュートリアルでも同様に[`CliArgs`サンプルパッケージ](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args)を参照します。

:::tip
フォローしたい場合はまず[JSONの引数](./arguments-in-json-tutorial.md)のチュートリアル手順を完了してください。
:::

この例では、AceとBeeは2-of-2の「マルチシグv2」アカウント([`multisig_account.move`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/multisig_account.move)ごとの1つのオンチェーンマルチシグアカウント)からガバナンス操作を実行します。

## アカウト作成
Ace のアカウントは[JSONの引数](./arguments-in-json-tutorial.md)のチュートリアル中に作成されたため、まずはBeeのバニティアドレスアカウントのマイニングから始めます。

```bash title=Command
aptos key generate \
    --vanity-prefix 0xbee \
    --output-file bee.key
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "PublicKey Path": "bee.key.pub",
    "PrivateKey Path": "bee.key",
    "Account Address:": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc"
  }
}
```

</details>

:::tip
正確なアカウントアドレスは各実行で変化するはずですが、バニティプレフィックスは変化しないはずです。
:::

Beeのアドレスをシェル変数に保存して、後でインラインで呼び出せるようにします。

```bash
# Your exact address should vary
bee_addr=0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc
```

フォーセットを使用してBeeのアカウントへ資金を入金します。

```bash title=Command
aptos account fund-with-faucet --account $bee_addr
```

<details>
<summary>出力</summary>

```bash
{
  "Result": "Added 100000000 Octas to account beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc"
}
```

</details>

これでAceはマルチシグアカウントを作成出来ます。

```bash title=Command
aptos multisig create \
    --additional-owners $bee_addr \
    --num-signatures-required 2 \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "multisig_address": "57478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c5",
    "transaction_hash": "0x849cc756de2d3b57210f5d32ae4b5e7d1f80e5d376233885944b6f3cc2124a05",
    "gas_used": 1524,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 5,
    "success": true,
    "timestamp_us": 1685078644186194,
    "version": 528428043,
    "vm_status": "Executed successfully"
  }
}
```

</details>

マルチシグアドレスをシェル変数へ保存します。

```bash
# アドレスが異なるはずです。
multisig_addr=0x57478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c5
```

## マルチシグを検査する

組み合わせた[`multisig_account.move`view関数](https://github.com/aptos-labs/aptos-core/blob/9fa0102c3e474d99ea35a0a85c6893604be41611/aptos-move/framework/aptos-framework/sources/multisig_account.move#L237)を使用してマルチシグを検査します。

```bash title="必要な署名の数"
aptos move view \
    --function-id 0x1::multisig_account::num_signatures_required \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "2"
  ]
}
```

</details>

```bash title="所有者"
    --function-id 0x1::multisig_account::owners \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    [
      "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
      "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46"
    ]
  ]
}
```

</details>

```bash title="最後に解決されたシーケンスNo."
aptos move view \
    --function-id 0x1::multisig_account::last_resolved_sequence_number \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "0"
  ]
}
```

</details>

```bash title="次のシーケンスNo."
aptos move view \
    --function-id 0x1::multisig_account::next_sequence_number \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "1"
  ]
}
```

</details>

## トランザクション公開のEnqueue

キューに登録される最初のマルチシグトランザクションは、
[`CliArgs`サンプルパッケージ](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/cli_args)の公開のためのトランザクションとなります。まず、公開ペイロードエントリ関数JSONファイルを生成します。

```bash title="コマンド"
aptos move build-publish-payload \
    --named-addresses test_account=$multisig_addr \
    --json-output-file publication.json \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": "Publication payload entry function JSON file saved to publication.json"
}
```

</details>

ここで、Aceへマルチシグアカウントからパッケージの公開を提案させ、ペイロードハッシュのみをオンチェーンへ保存します。

```bash title="Command"
aptos multisig create-transaction \
    --multisig-address $multisig_addr \
    --json-file publication.json \
    --store-hash-only \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x70c75903f8e1b1c0069f1e84ef9583ad8000f24124b33a746c88d2b031f7fe2c",
    "gas_used": 510,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 6,
    "success": true,
    "timestamp_us": 1685078836492390,
    "version": 528429447,
    "vm_status": "Executed successfully"
  }
}
```

</details>

注意：トランザクションが解決されていないため、最後に解決されたシーケンス番号はまだ0のままです。

```bash title="最後に解決されたシーケンスNo."
aptos move view \
    --function-id 0x1::multisig_account::last_resolved_sequence_number \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "0"
  ]
}
```

</details>

ただし、トランザクションがキューに登録されたため、次のシーケンスNo.が増加しています。

```bash title="次のシーケンスNo."
aptos move view \
    --function-id 0x1::multisig_account::next_sequence_number \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "2"
  ]
}
```

</details>

これで、オンチェーンでキューへ入れられたマルチシグトランザクションを検査できます。

```bash title="トランザクションを取得"
aptos move view \
    --function-id 0x1::multisig_account::get_transaction \
    --args \
        address:"$multisig_addr" \
        String:1
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    {
      "creation_time_secs": "1685078836",
      "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
      "payload": {
        "vec": []
      },
      "payload_hash": {
        "vec": [
          "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"
        ]
      },
      "votes": {
        "data": [
          {
            "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
            "value": true
          }
        ]
      }
    }
  ]
}
```

</details>

注意：上記の結果から、ペイロードはオンチェーンに保存されず、Aceは提案の提出時に暗黙的にトランザクションを承認(投票`true`)しました。

## ガバナンスパラメータトランザクションのEnqueue

ここで、Beeへガバナンスパラメータセッタートランザクションをエンキューさせ、トランザクションペイロード全体をオンチェーンへ保存します。

```bash title="コマンド"
aptos multisig create-transaction \
    --multisig-address $multisig_addr \
    --function-id $multisig_addr::cli_args::set_vals \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "bool:[false, true, false, false]" \
        'address:[["0xace", "0xbee"], ["0xcad"], []]' \
    --private-key-file bee.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0xd0a348072d5bfc5a2e5d444f92f0ecc10b978dad720b174303bc6d91342f27ec",
    "gas_used": 511,
    "gas_unit_price": 100,
    "sender": "beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
    "sequence_number": 0,
    "success": true,
    "timestamp_us": 1685078954841650,
    "version": 528430315,
    "vm_status": "Executed successfully"
  }
}
```

</details>

注意：次のシーケンスNo.が再び増加しています。

```bash title="次のシーケンスNo."
aptos move view \
    --function-id 0x1::multisig_account::next_sequence_number \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    "3"
  ]
}
```

</details>

現在、公開トランザクションとパラメータトランザクションの両方が保留中です。

```bash title="G保留中のトランザクションを取得する"
aptos move view \
    --function-id 0x1::multisig_account::get_pending_transactions \
    --args \
        address:"$multisig_addr"
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    [
      {
        "creation_time_secs": "1685078836",
        "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
        "payload": {
          "vec": []
        },
        "payload_hash": {
          "vec": [
            "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"
          ]
        },
        "votes": {
          "data": [
            {
              "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
              "value": true
            }
          ]
        }
      },
      {
        "creation_time_secs": "1685078954",
        "creator": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
        "payload": {
          "vec": [
            "0x0057478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c508636c695f61726773087365745f76616c7302070000000000000000000000000000000000000000000000000000000000000001076163636f756e74074163636f756e740007000000000000000000000000000000000000000000000000000000000000000108636861696e5f696407436861696e49640003017b0504000100006403020000000000000000000000000000000000000000000000000000000000000ace0000000000000000000000000000000000000000000000000000000000000bee010000000000000000000000000000000000000000000000000000000000000cad00"
          ]
        },
        "payload_hash": {
          "vec": []
        },
        "votes": {
          "data": [
            {
              "key": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
              "value": true
            }
          ]
        }
      }
    ]
  ]
}
```

</details>

## 公開トランザクションの実行

公開トランザクションへ投票したのはAceのみであるため (提案時、暗黙的に承認されたため)トランザクションはまだ実行出来ません。

```bash title="実行可能"
aptos move view \
    --function-id 0x1::multisig_account::can_be_executed \
    --args \
        address:"$multisig_addr" \
        String:1
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    false
  ]
}
```

</details>

ただし、Beeは投票する前、オンチェーンへ保存されているペイロードハッシュがパブリケーションエントリ関数のJSONファイルと一致する事を確認します。

```bash title="トランザクション提案の検証"
aptos multisig verify-proposal \
    --multisig-address $multisig_addr \
    --json-file publication.json \
    --sequence-number 1
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "Status": "Transaction match",
    "Multisig transaction": {
      "creation_time_secs": "1685078836",
      "creator": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
      "payload": {
        "vec": []
      },
      "payload_hash": {
        "vec": [
          "0x62b91159c1428c1ef488c7290771de458464bd665691d9653d195bc28e0d2080"
        ]
      },
      "votes": {
        "data": [
          {
            "key": "0xacef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
            "value": true
          }
        ]
      }
    }
  }
}
```

</details>

Beeは、オンチェーンペイロードハッシュがローカルでコンパイルされたパッケージ公開JSONファイルに対してチェックアウトしたので、はいと投票します。

```bash title="トランザクションを承認する"
aptos multisig approve \
    --multisig-address $multisig_addr \
    --sequence-number 1 \
    --private-key-file bee.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0xa5fb49f1077de6aa6d976e6bcc05e4c50c6cd061f1c87e8f1ea74e7a04a06bd1",
    "gas_used": 6,
    "gas_unit_price": 100,
    "sender": "beec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
    "sequence_number": 1,
    "success": true,
    "timestamp_us": 1685079892130861,
    "version": 528437204,
    "vm_status": "Executed successfully"
  }
}
```

</details>

これでトランザクションを実行出来ます。

```bash title="実行可能"
aptos move view \
    --function-id 0x1::multisig_account::can_be_executed \
    --args \
        address:"$multisig_addr" \
        String:1
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    true
  ]
}
```

</details>

これで、AceまたはBeeのどちらもハッシュのみがチェーンへ保存されているため、完全なトランザクションペイロードを渡して、マルチシグアカウントから公開トランザクションを呼び出す事が出来ます。

```bash title="公開"
aptos multisig execute-with-payload \
    --multisig-address $multisig_addr \
    --json-file publication.json \
    --private-key-file bee.key \
    --max-gas 10000 \
    --assume-yes
```

:::tip
 [#8304](https://github.com/aptos-labs/aptos-core/issues/8304)解決が保留中であるため、
トランザクションシミュレーター (ガスコストの見積りで使用) はマルチシグ トランザクションでは壊れているため、最大ガス量を手動で指定する必要が有ります。
:::

<details>
<summary>出力</summary>

[#8304](https://github.com/aptos-labs/aptos-core/issues/8304)の解決が保留中であるため、
ペイロードハッシュのみがオンチェーンに保存されている場合、マルチシグパブリケーショントランザクションの実行が成功した場合のCLI出力ではAPIエラーが発生します。
が、トランザクションはエクスプローラーを使用して手動で検証出来ます。

</details>

## ガバナンスパラメータトランザクションの実行

ガバナンスパラメータトランザクションへ投票したのは Beeのみであるため(提案時、暗黙的に承認されたため)、トランザクションはまだ実行できません。

```bash title="実行可能"
aptos move view \
    --function-id 0x1::multisig_account::can_be_executed \
    --args \
        address:"$multisig_addr" \
        String:2
```

<details>
<summary>出力</summary>

```bash
{
  "Result": [
    false
  ]
}
```

</details>

Aceは投票する前、オンチェーンへ保存されているペイロードが使いたい引数と一致する事を確認します。

```bash title="トランザクション提案の検証"
aptos multisig verify-proposal \
    --multisig-address $multisig_addr \
    --function-id $multisig_addr::cli_args::set_vals \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:123 \
        "bool:[false, true, false, false]" \
        'address:[["0xace", "0xbee"], ["0xcad"], []]' \
    --sequence-number 2
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "Status": "Transaction match",
    "Multisig transaction": {
      "creation_time_secs": "1685078954",
      "creator": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
      "payload": {
        "vec": [
          "0x0057478da34604655c68b1dcb89e4f4a9124b6c0ecc1c59a0931d58cc4e60ac5c508636c695f61726773087365745f76616c7302070000000000000000000000000000000000000000000000000000000000000001076163636f756e74074163636f756e740007000000000000000000000000000000000000000000000000000000000000000108636861696e5f696407436861696e49640003017b0504000100006403020000000000000000000000000000000000000000000000000000000000000ace0000000000000000000000000000000000000000000000000000000000000bee010000000000000000000000000000000000000000000000000000000000000cad00"
        ]
      },
      "payload_hash": {
        "vec": []
      },
      "votes": {
        "data": [
          {
            "key": "0xbeec980219d246581cef5166dc6ba5fb1e090c7a7786a5176d111a9029b16ddc",
            "value": true
          }
        ]
      }
    }
  }
}
```

</details>

注意：引数を1つでも変更すると検証が失敗します。

```bash title="u8の修正でトランザクション検証が失敗しました"
aptos multisig verify-proposal \
    --multisig-address $multisig_addr \
    --function-id $multisig_addr::cli_args::set_vals \
    --type-args \
        0x1::account::Account \
        0x1::chain_id::ChainId \
    --args \
        u8:200 \
        "bool:[false, true, false, false]" \
        'address:[["0xace", "0xbee"], ["0xcad"], []]' \
    --sequence-number 2
```

<details>
<summary>出力</summary>

```bash
{
  "Error": "Unexpected error: Transaction mismatch: The transaction you provided has a payload hash of 0xe494b0072d6f940317344967cf0e818c80082375833708c773b0275f3ad07e51, but the on-chain transaction proposal you specified has a payload hash of 0x070ed7c3f812f25f585461305d507b96a4e756f784e01c8c59901871267a1580. For more info, see https://aptos.dev/move/move-on-aptos/cli#multisig-governance"
}
```

</details>

Aceはトランザクションを承認します

```bash title="トランザクションを承認する"
aptos multisig approve \
    --multisig-address $multisig_addr \
    --sequence-number 2 \
    --private-key-file ace.key \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0x233427d95832234fa13dddad5e0b225d40168b4c2c6b84f5255eecc3e68401bf",
    "gas_used": 6,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 7,
    "success": true,
    "timestamp_us": 1685080266378400,
    "version": 528439883,
    "vm_status": "Executed successfully"
  }
}
```

</details>

ペイロードはオンチェーンへ保存されているため、保留中のトランザクションを実行する必要は有りません。

```bash title="実行"
aptos multisig execute \
    --multisig-address $multisig_addr \
    --private-key-file ace.key \
    --max-gas 10000 \
    --assume-yes
```

<details>
<summary>出力</summary>

```bash
{
  "Result": {
    "transaction_hash": "0xbc99f929708a1058b223aa880d04607a78ebe503367ec4dab23af4a3bdb541b2",
    "gas_used": 505,
    "gas_unit_price": 100,
    "sender": "acef1b9b7d4ab208b99fed60746d18dcd74865edb7eb3c3f1428233988e4ba46",
    "sequence_number": 8,
    "success": true,
    "timestamp_us": 1685080344045461,
    "version": 528440423,
    "vm_status": "Executed successfully"

```

</details>