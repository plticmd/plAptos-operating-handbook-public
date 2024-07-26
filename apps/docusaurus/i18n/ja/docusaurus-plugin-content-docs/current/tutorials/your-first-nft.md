---
title: "Your First NFT"
slug: "your-first-nft"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# NFT入門

このチュートリアルでは、Aptos ブロックチェーン上で代替不可能な資産を作成および転送する方法について解説します。代替不可能なデジタル資産に対する Aptos のノーコード実装は、[aptos_token.move](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/aptos_token.move)Moveモジュールにあります。

## ステップ 1 : SDK を選ぶ

以下のリストからお好みの SDK をインストールします。

- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 

---

## ステップ 2 : サンプルを実行する

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

`aptos-ts-sdk`リポジトリのクローンを作成します。

```bash
git clone https://github.com/aptos-labs/aptos-ts-sdk.git
cd aptos-ts-sdk
pnpm install
pnpm build
```

Typescript ESM examplesディレクトリに移動します。

```bash
cd examples/typescript-esm
```

依存関係をインストールします。

```bash
pnpm install
```

Typescriptの[`simple_digital_asset`](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript-esm/simple_digital_asset.ts)サンプルを実行します。

```bash
pnpm run simple_digital_asset
```

  </TabItem>
  <TabItem value="python" label="Python">

`aptos-core`リポジトリのクローンを作成します。

```bash
git clone https://github.com/aptos-labs/aptos-core.git
```

Python SDK ディレクトリに移動します。

```bash
cd aptos-core/ecosystem/python/sdk
```

依存関係をインストールします。

```bash
curl -sSL https://install.python-poetry.org | python3
poetry install
```

Pythonの[`simple_aptos_token`](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/simple_aptos_token.py)サンプルを実行します。

```bash
poetry run python -m examples.simple_aptos_token
```

  </TabItem>
</Tabs>

---

## ステップ 3 : 出力を理解する

<Tabs groupId="sdk-output">
  <TabItem value="typescript" label="Typescript">

`simple_digital_asset`サンプルの実行後に次の出力が表示されますが、一部の値は異なります。

```yaml
=== Addresses ===

Alice's address is: 0x770dbeb6101056eac5a19de9a73ad72fac512e0de909e7bcb13a9d9241d1d162

=== Create the collection ===

Alice's collection: {
    "collection_id": "0x23ece6c35415f5c5a720dc4de2820cabece0a6f1768095db479f657ad2c05753",
    "collection_name": "Example Collection",
    "creator_address": "0x770dbeb6101056eac5a19de9a73ad72fac512e0de909e7bcb13a9d9241d1d162",
    "current_supply": 0,
    "description": "Example description.",
    "last_transaction_timestamp": "2023-11-29T21:26:03.204874",
    "last_transaction_version": 8001101,
    "max_supply": 18446744073709552000,
    "mutable_description": true,
    "mutable_uri": true,
    "table_handle_v1": null,
    "token_standard": "v2",
    "total_minted_v2": 0,
    "uri": "aptos.dev"
}

=== Alice Mints the digital asset ===

Alice's digital assets balance: 1
Alice's digital asset: {
    "token_standard": "v2",
    "token_properties_mutated_v1": null,
    "token_data_id": "0x9f4460e29a66b4e41cef1671767dc8a5e8c52a2291e36f84b8596e0d1205fd8c",
    "table_type_v1": null,
    "storage_id": "0x9f4460e29a66b4e41cef1671767dc8a5e8c52a2291e36f84b8596e0d1205fd8c",
    "property_version_v1": 0,
    "owner_address": "0x770dbeb6101056eac5a19de9a73ad72fac512e0de909e7bcb13a9d9241d1d162",
    "last_transaction_version": 8001117,
    "last_transaction_timestamp": "2023-11-29T21:26:04.521624",
    "is_soulbound_v2": false,
    "is_fungible_v2": false,
    "amount": 1,
    "current_token_data": {
        "collection_id": "0x23ece6c35415f5c5a720dc4de2820cabece0a6f1768095db479f657ad2c05753",
        "description": "Example asset description.",
        "is_fungible_v2": false,
        "largest_property_version_v1": null,
        "last_transaction_timestamp": "2023-11-29T21:26:04.521624",
        "last_transaction_version": 8001117,
        "maximum": null,
        "supply": 0,
        "token_data_id": "0x9f4460e29a66b4e41cef1671767dc8a5e8c52a2291e36f84b8596e0d1205fd8c",
        "token_name": "Example Asset",
        "token_properties": {},
        "token_standard": "v2",
        "token_uri": "aptos.dev/asset",
        "current_collection": {
            "collection_id": "0x23ece6c35415f5c5a720dc4de2820cabece0a6f1768095db479f657ad2c05753",
            "collection_name": "Example Collection",
            "creator_address": "0x770dbeb6101056eac5a19de9a73ad72fac512e0de909e7bcb13a9d9241d1d162",
            "current_supply": 1,
            "description": "Example description.",
            "last_transaction_timestamp": "2023-11-29T21:26:04.521624",
            "last_transaction_version": 8001117,
            "max_supply": 18446744073709552000,
            "mutable_description": true,
            "mutable_uri": true,
            "table_handle_v1": null,
            "token_standard": "v2",
            "total_minted_v2": 1,
            "uri": "aptos.dev"
        }
    }
}

=== Transfer the digital asset to Bob ===

Alice's digital assets balance: 0
Bob's digital assets balance: 1
```

このサンプルでは、次のことを実演します。

<Details>
* Aptos クライアントを初期化。
* アリスとボブの 2 つのアカウントを作成。
* 資金投入し、アリスとボブのアカウントを作成。
* アリスのアカウントを使用してコレクションとトークンを作成。
* アリスがボブへトークンを送金します。
</Details>

  </TabItem>
  <TabItem value="python" label="Python">

`simple_aptos_token`サンプルの実行後に次の出力が表示されますが、一部の値は異なります。

```yaml
=== Addresses ===
Alice: 0x391f8b07439768674023fb87ae5740e90fb8508600486d8ee9cc411b4365fe89
Bob: 0xfbca055c91d12989dc6a2c1a5e41ae7ba69a35454b04c69f03094bbccd5210b4

=== Initial Coin Balances ===
Alice: 100000000
Bob: 100000000

=== Creating Collection and Token ===

Collection data: {
    "address": "0x38f5310a8f6f3baef9a54daea8a356d807438d3cfe1880df563fb116731b671c",
    "creator": "0x391f8b07439768674023fb87ae5740e90fb8508600486d8ee9cc411b4365fe89",
    "name": "Alice's",
    "description": "Alice's simple collection",
    "uri": "https://aptos.dev"
}

Token owner: Alice
Token data: {
    "address": "0x57710a3887eaa7062f96967ebf966a83818017b8f3a8a613a09894d8465e7624",
    "owner": "0x391f8b07439768674023fb87ae5740e90fb8508600486d8ee9cc411b4365fe89",
    "collection": "0x38f5310a8f6f3baef9a54daea8a356d807438d3cfe1880df563fb116731b671c",
    "description": "Alice's simple token",
    "name": "Alice's first token",
    "uri": "https://aptos.dev/img/nyan.jpeg",
    "index": "1"
}

=== Transferring the token to Bob ===
Token owner: Bob

=== Transferring the token back to Alice ===
Token owner: Alice
```

このサンプルでは、次のことを実演します。

<Details>
* REST クライアントとフォーセット クライアントを初期化。
* アリスとボブの 2 つのアカウントを作成。
* 資金投入し、アリスとボブのアカウントを作成。
* アリスのアカウントを使用してコレクションとトークンを作成。
* アリスがボブにトークンを送金します。
* ボブがアリスにトークン送り返します。
</Details>

  </TabItem>
</Tabs>

---

## ステップ 4 : SDK 詳細

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

:::tip コード全体を見る
完全なコードは[`simple_digital_asset`](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript-esm/simple_digital_asset.ts)で確認出来ます。参照の上、以下の手順に従ってコードを完成させてください。
:::
</TabItem>
<TabItem value="python" label="Python">

:::tip コード全体を見る
完全なコードは[`simple_aptos_token`](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/simple_aptos_token.py)で確認出来ます。参照の上、以下の手順に従ってコードを完成させてください。
:::
</TabItem>
</Tabs>

---

### ステップ 4.1 : クライアントを初期化する

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

最初のステップではこの`simple_digital_asset`サンプルでAptos クライアントを初期化します。

```ts
const APTOS_NETWORK: Network =
  NetworkToNetworkName[process.env.APTOS_NETWORK] || Network.DEVNET;
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);
```

:::tip
デフォルトでは、Aptos クライアントは Aptos devnet サービスを指します。ただし`network`入力引数を使用して構成できます。
:::

  </TabItem>
  <TabItem value="python" label="Python">

最初のステップで、API クライアントとフォーセット クライアントの両方を初期化します。

- API クライアントは REST API と対話します。
- フォーセット クライアントは、アカウントの作成と資金投入のために devnet Faucet サービスと対話します。

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_1a
```

API クライアントを使用すると、コレクションやトークンの作成、送金、請求などの一般的なトークン操作に使用する`TokenClient`を作成できます。

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_1b
```

[`common.py`](https://github.com/aptos-labs/aptos-core/tree/main/ecosystem/python/sdk/examples/common.py)は、これらの値を次のように初期化します。

```python
:!: static/sdks/python/examples/common.py section_1
```

:::tip

デフォルトでは、両方のサービスの URL は Aptos devnet サービスを指します。ただし、次の環境変数を使用して構成できます。

- `APTOS_NODE_URL`
- `APTOS_FAUCET_URL`
  :::
  </TabItem>
  </Tabs>

---

### ステップ 4.2 : ローカルアカウントを作る

このステップでは、ローカルで 2 つのアカウントを作成します。[Accounts](../concepts/accounts.md)はパブリック アドレスと、アカウントの所有権を認証するために使用される公開鍵/秘密鍵ペアで構成されます。このステップでは、アカウントを生成し、そのキーペアとアドレスを変数に保存する方法を実演します。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

```ts
const alice = Account.generate();
const bob = Account.generate();
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_2
```

  </TabItem>
</Tabs>

:::info
注）これはローカルの鍵ペアのみを生成します。キーペアとパブリック アドレスを生成した後も、オンチェーンにアカウントは存在しません。
:::

---

### ステップ 4.3 : ブロックチェーンアカウントを作る

オンチェーンでアカウントをインスタンス化するには、何らかの方法で分かりやすく作成する必要があります。devnet ネットワーク上では、 Faucet API を使用して無料のテスト用のコインをリクエストできます。この例では、フォーセットを利用して資金を調達し、誤ってアリスとボブのアカウントを作成します。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

```ts
await aptos.fundAccount({
  accountAddress: alice.accountAddress,
  amount: 100_000_000,
});
await aptos.faucet.fundAccount({
  accountAddress: bob.accountAddress,
  amount: 100_000_000,
});
```

  </TabItem>
  <TabItem value="python" label="Python">

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_3
```

  </TabItem>
</Tabs>

---

### ステップ 4.4 : コレクションを作る

ここから、代替不可能なデジタル資産を作成するプロセスが始まります。まず、アセットをグループ化するコレクションを作成する必要があります。コレクションには、0、1、または多数の別個の代替可能アセットまたは代替不可能なアセットを含めることができます。コレクションは単なるコンテナであり、作成者がアセットをグループ化することのみを目的としています。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

アプリケーションは`createCollectionTransaction`を呼び出して、チェーンへ`signAndSubmitTransaction`します。

```ts
const createCollectionTransaction = await aptos.createCollectionTransaction({
  creator: alice,
  description: collectionDescription,
  name: collectionName,
  uri: collectionURI,
});

const committedTxn = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction: createCollectionTransaction,
});
```

これは`createCollectionTransaction`の関数シグネチャです。シミュレートまたはチェーンに送信できる `SingleSignerTransaction`を返します。

```ts
export async function createCollectionTransaction(
  args: {
    creator: Account;
    description: string;
    name: string;
    uri: string;
    options?: InputGenerateTransactionOptions;
  } & CreateCollectionOptions,
): Promise<SingleSignerTransaction>;
```

  </TabItem>
  <TabItem value="python" label="Python">

アプリケーションは`create_collection`を呼び出します:

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_4
```

これは`create_collection`の関数シグネチャです。トランザクションハッシュを返します。

```python
:!: static/sdks/python/aptos_sdk/aptos_token_client.py create_collection
```

  </TabItem>
</Tabs>

---

### ステップ 4.5 : トークンを作る

トークンを作成するには、作成者は関連するコレクションを指定する必要があります。トークンはコレクションに関連付けられている必要があり、そのコレクションにはミントできるトークンが含まれている必要があります。トークンには多くの属性が関連付けられていますが、ヘルパー API が静的コンテンツを作成する場合、必要最小限の属性のみを公開します。 amount required to create static content.

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

アプリケーションは`mintTokenTransaction`を呼び出します:

```ts
const mintTokenTransaction = await aptos.mintTokenTransaction({
  creator: alice,
  collection: collectionName,
  description: tokenDescription,
  name: tokenName,
  uri: tokenURI,
});

const committedTxn = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction: mintTokenTransaction,
});
```

これは`mintTokenTransaction`の関数シグネチャです。シミュレートもしくは、チェーンへ提出ができる`SingleSignerTransaction`を返します。

```ts
async mintTokenTransaction(args: {
    creator: Account;
    collection: string;
    description: string;
    name: string;
    uri: string;
    options?: InputGenerateTransactionOptions;
  }): Promise<SingleSignerTransaction>
```

  </TabItem>
  <TabItem value="python" label="Python">

アプリケーションは`mint_token`を呼び出します:

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_5
```

これは`mint_token`の関数シグネチャです。トランザクション ハッシュを返します。

```python
:!: static/sdks/python/aptos_sdk/aptos_token_client.py mint_token
```

  </TabItem>
</Tabs>

---

### ステップ 4.6: トークンとコレクションのメタデータを読み取る

コレクション資産とトークン資産は両方とも、一意のアドレスを持つオンチェーンの[Objects](../standards/aptos-object)です。それらのメタデータはオブジェクト アドレスに保存されます。SDK は、このデータのクエリに関する便利なラッパーを提供します。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

コレクションのメタデータを読み取るには:

```ts
const alicesCollection = await aptos.getCollectionData({
  creatorAddress: alice.accountAddress,
  collectionName,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});
console.log(`Alice's collection: ${JSON.stringify(alicesCollection, null, 4)}`);
```

所有しているトークンのメタデータを読み取るには:

```ts
const alicesDigitalAsset = await aptos.getOwnedTokens({
  ownerAddress: alice.accountAddress,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});

console.log(
  `Alice's digital asset: ${JSON.stringify(alicesDigitalAsset[0], null, 4)}`,
);
```

  </TabItem>
  <TabItem value="python" label="Python">

コレクションのメタデータを読み取るには:

```python
:!: static/sdks/python/examples/simple_aptos_token.py section_6
```

トークンのメタデータを読み取るには:

```python
:!: static/sdks/python/examples/simple_aptos_token.py get_token_data
```

  </TabItem>
</Tabs>

---

### ステップ 4.7 : オブジェクトのオーナーを読み取る

`aptos_token.move`コントラクトから作成された各オブジェクトは個別の資産です。ユーザーが所有する資産は、ユーザーのアカウントとは別に保管されます。ユーザーがオブジェクトを所有しているかどうかを確認するには、オブジェクトの所有者を確認します。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

```ts
const alicesDigitalAsset = await aptos.getOwnedTokens({
  ownerAddress: alice.accountAddress,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});

console.log(
  `Alice's digital asset: ${JSON.stringify(alicesDigitalAsset[0], null, 4)}`,
);
```

```ts title="クエリを作成してデータを取得する。"
export async function getOwnedTokens(args: {
  aptosConfig: AptosConfig;
  ownerAddress: AccountAddressInput;
  options?: PaginationArgs & OrderByArg<GetTokenActivityResponse[0]>;
}): Promise<GetOwnedTokensResponse> {
  const { aptosConfig, ownerAddress, options } = args;

  const whereCondition: CurrentTokenOwnershipsV2BoolExp = {
    owner_address: { _eq: AccountAddress.from(ownerAddress).toStringLong() },
    amount: { _gt: 0 },
  };

  const graphqlQuery = {
    query: GetCurrentTokenOwnership,
    variables: {
      where_condition: whereCondition,
      offset: options?.offset,
      limit: options?.limit,
      order_by: options?.orderBy,
    },
  };

  const data = await queryIndexer<GetCurrentTokenOwnershipQuery>({
    aptosConfig,
    query: graphqlQuery,
    originMethod: "getOwnedTokens",
  });

  return data.current_token_ownerships_v2;
}
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="オブジェクトのリソースを取得し、所有者の解析をします。"
:!: static/sdks/python/examples/simple_aptos_token.py section_7
```

```python title="所有者の辞書はどう定義されているか"
:!: static/sdks/python/examples/simple_aptos_token.py owners
```

  </TabItem>
</Tabs>

---

### ステップ 4.8 : オブジェクトを送信、返信する

`aptos_token.move`コントラクトから作成された各オブジェクトは個別の資産です。ユーザーが所有する資産は、ユーザーのアカウントとは別に保管されます。ユーザーがオブジェクトを所有しているかどうかを確認するには、オブジェクトの所有者を確認します。

<Tabs groupId="sdk-examples">
  <TabItem value="typescript" label="Typescript">

```ts
const alicesDigitalAsset = await aptos.getOwnedTokens({
  ownerAddress: alice.accountAddress,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});

console.log(
  `Alice's digital asset: ${JSON.stringify(alicesDigitalAsset[0], null, 4)}`,
);
```

```ts title="アリスからボブへトークンを送金します"
const transferTransaction = await aptos.transferDigitalAsset({
  sender: alice,
  digitalAssetAddress: alicesDigitalAsset[0].token_data_id,
  recipient: bob.accountAddress,
});
const committedTxn = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction: transferTransaction,
});
const pendingTxn = await aptos.waitForTransaction({
  transactionHash: committedTxn.hash,
});
```

```ts title="各ユーザーのクエリされたトークン量を出力します"
const alicesDigitalAssetsAfter = await aptos.getOwnedTokens({
  ownerAddress: alice.accountAddress,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});
console.log(
  `Alices's digital assets balance: ${alicesDigitalAssetsAfter.length}`,
);

const bobDigitalAssetsAfter = await aptos.getOwnedTokens({
  ownerAddress: bob.accountAddress,
  minimumLedgerVersion: BigInt(pendingTxn.version),
});
console.log(`Bob's digital assets balance: ${bobDigitalAssetsAfter.length}`);
```

  </TabItem>
  <TabItem value="python" label="Python">

```python title="ボブへトークンを送金する"
:!: static/sdks/python/examples/simple_aptos_token.py section_8
```

```python title="transfer_token関数を定義する方法"
:!: static/sdks/python/aptos_sdk/aptos_token_client.py transfer_token
```

```python title="所有者を読み取る"
:!: static/sdks/python/examples/simple_aptos_token.py section_9
```

```python title="アリスへトークンを送り返す"
:!: static/sdks/python/examples/simple_aptos_token.py section_10
```

```python title="もう一度、所有者を読み取る"
:!: static/sdks/python/examples/simple_aptos_token.py section_11
```

  </TabItem>
</Tabs>

---

## サポート資料

- [アカウントの基本](../concepts/accounts.md)
- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 
- [REST API仕様](https://aptos.dev/nodes/aptos-api-spec#/)
