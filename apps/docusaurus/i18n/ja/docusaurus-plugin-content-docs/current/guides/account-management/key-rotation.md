---
title: "認証キーのローテーション"
id: "key-rotation"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Aptos Moveアカウントには、公開アドレス、認証キー、公開鍵、秘密鍵があります。公開アドレスは永久であり、常にアカウントの初期認証キーと一致します。

Aptosアカウントモデルは独自の機能を促進し、アカウントの秘密鍵をローテーションします。カウントのアドレスは _初期_ 認証キーであるため、アカウントに署名する機能は、公開アドレスを変更せずに別の秘密鍵へ転送できます。

このガイドでは、様々なAptos SDKを少し使用してアカウントの認証キーをローテーションする方法の例を示します。

SDKのインストールリンクは以下の例でカバーしています。

- [Aptos CLI](../../tools/aptos-cli)
- [Typescript SDK](/sdks/ts-sdk/index.md)
- [Python SDK](../../sdks/python-sdk/index.md)

:::warning
以下の例の一部では秘密鍵を使用しています。秘密鍵は誰とも共有しないでください。
:::

## アカウントの認証キーをローテーションする方法

<Tabs groupId="examples">
  <TabItem value="CLI" label="CLI">

以下を実行して、2つのテストプロファイルを初期化します。秘密鍵の入力を求められた場合は、どちらの場合も入力を空白のままにしておきます。

```shell title="devnetで2つのテストプロファイルを初期化する"
aptos init --profile test_profile_1 --network devnet --assume-yes
aptos init --profile test_profile_2 --network devnet --assume-yes
```

```shell title="test_profile_1の認証キーを test_profile_2の認証キーへローテーションします。"
aptos account rotate-key --profile test_profile_1 --new-private-key <TEST_PROFILE_2_PRIVATE_KEY>
```

:::info プロファイルの秘密鍵はどこで確認できますか?
構成が`Global`と`<local_directory>/.aptos/config.yaml`に設定されていて、それが`Workspace`へ設定されている場合、Aptos CLIプロファイルの公開鍵、秘密鍵、認証キーは、`~/.aptos/config.yaml`へ保存されます。

構成設定を確認するには、`aptos config show-global-config`を実行します。
:::

```yesを確認して新しいプロファイルを作成し、リソースアカウントに引き続き署名できる様にします。"
 
 ガス単価100オクタで[52000 - 78000]オクタの範囲でトランザクションを送信しますか？[はい/いいえ] >
はい
...

新しいキーのプロファイルを作成しますか？[はい/いいえ] >
はい
...

プロファイルの名前を入力します
test_profile_1_rotated

プロファイル test_profile_1_rotated が保存されました.
```

これで、他のアカウントと同じ様にプロファイルを使用出来ます。

`config.yaml`ファイルでは、 `test_profile_1_rotated`は元の公開アドレスを保持しますが、`test_profile_2`と一致する新しい公開鍵と秘密鍵を持ちます。

認証キーは`config.yaml`ファイルには表示されませんが、以下のコマンドで変更を確認できます。 

```shell title="認証キーがビュー関数と同様となった事を確認します。"
# View the authentication key of `test_profile_1_rotated`
aptos move view --function-id 0x1::account::get_authentication_key --args address:test_profile_1_rotated

# View the authentication key of `test_profile_2`, it should equal the above.
aptos move view --function-id 0x1::account::get_authentication_key --args address:test_profile_2
```

```bash title="前の2つのコマンドの出力例"
{
  "Result": [
    "0x458fba533b84717c91897cab05047c1dd7ac2ea73e75c77281781f5b7fec180c"
  ]
}
{
  "Result": [
    "0x458fba533b84717c91897cab05047c1dd7ac2ea73e75c77281781f5b7fec180c"
  ]
}
```

  </TabItem>

  <TabItem value="typescript" label="Typescript">

This program creates two accounts on devnet, Alice and Bob, funds them, then rotates the Alice's authentication key to that of Bob's.

View the full example for this code [here](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/typescript/sdk/examples/typescript-esm/rotate_key.ts).

The function to rotate is very simple:

```typescript title="Typescript SDK rotate authentication key function"
:!: static/sdks/typescript/examples/typescript-esm/rotate_key.ts rotate_key
```

Commands to run the example script:

```shell title="Navigate to the typescript SDK directory, install dependencies and run rotate_key.ts"
cd ~/aptos-core/ecosystem/typescript/sdk/examples/typescript-esm
pnpm install && pnpm rotate_key
```

```shell title="rotate_key.ts output"
Account            Address             Auth Key             Private Key          Public Key
------------------------------------------------------------------------------------------------
Alice              0x213d...031013    '0x213d...031013'    '0x00a4...b2887b'    '0x859e...08d2a9'
Bob                0x1c06...ac3bb3     0x1c06...ac3bb3      0xf2be...9486aa      0xbbc1...abb808

...rotating...

Alice              0x213d...031013    '0x1c06...ac3bb3'    '0xf2be...9486aa'    '0xbbc1...abb808'
Bob                0x1c06...ac3bb3     0x1c06...ac3bb3      0xf2be...9486aa      0xbbc1...abb808
```

  </TabItem>
  <TabItem value="python" label="Python">

This program creates two accounts on devnet, Alice and Bob, funds them, then rotates the Alice's authentication key to that of Bob's.

View the full example for this code [here](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/rotate_key.py).

Here's the relevant code that rotates Alice's keys to Bob's:

```python title="Python SDK rotate authentication key function"
:!: static/sdks/python/examples/rotate_key.py rotate_key
```

Commands to run the example script:

```shell title="Navigate to the python SDK directory, install dependencies and run rotate_key.ts"
cd aptos-core/ecosystem/python/sdk
poetry install && poetry run python -m examples.rotate-key
```

```shell title="rotate_key.py output"
Account            Address             Auth Key             Private Key          Public Key
------------------------------------------------------------------------------------------------
Alice              0x213d...031013    '0x213d...031013'    '0x00a4...b2887b'    '0x859e...08d2a9'
Bob                0x1c06...ac3bb3     0x1c06...ac3bb3      0xf2be...9486aa      0xbbc1...abb808

...rotating...

Alice              0x213d...031013    '0x1c06...ac3bb3'    '0xf2be...9486aa'    '0xbbc1...abb808'
Bob                0x1c06...ac3bb3     0x1c06...ac3bb3      0xf2be...9486aa      0xbbc1...abb808
```

  </TabItem>
</Tabs>
