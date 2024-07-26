---
title: "Your First Fungible Asset"
slug: "your-first-fungible-asset"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 代替可能資産入門

このチュートリアルでは[FACoin](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/fungible_asset/fa_coin)という名前の自作の代替資産 (FA) をコンパイル、デプロイ、ミントする方法を紹介します。チュートリアルに進む前に、FA を理解していることを確認してください。まだの場合は、最初に読むことを強くお勧めします。

- [代替資産](../standards/fungible-asset.md)

## ステップ 1 : SDK を選ぶ

以下のリストからお好みの SDK をインストールします。

- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 
- [Rust SDK](../sdks/rust-sdk/index.md) 

---

## ステップ 2 : CLIをインストールする

[Aptos CLI 用のプリコンパイルされたバイナリをインストールします](../tools/aptos-cli/install-cli/index.md).

---

## ステップ 3 : サンプルを実行する

<Tabs groupId="examples">
  <TabItem value="typescript" label="Typescript">

`aptos-ts-sdk`リポジトリのクローンを作成します。

```bash
git clone https://github.com/aptos-labs/aptos-ts-sdk.git
cd aptos-ts-sdk
pnpm install
pnpm build
```

TypeScript SDK ディレクトリに移動します。

```bash
cd examples/typescript
```

依存関係をインストールします。

```bash
pnpm install
```

TypeScript の[`your_fungible_asset`](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/your_fungible_asset.ts)サンプルを実行します。

```bash
pnpm run your_fungible_asset
```

  </TabItem>
</Tabs>

---

アプリケーションが完了し、次のように出力されます。

```bash
===Publishing FAcoin package===

Transaction hash: 0x90fbe811171dde1ffad9157314ce0c4f6070fd5c1095a0e18a0b5634d10d7f48
metadata address: 0x77503715cb75fcc276b4e7236210fb0bcac7b510f6428233b65468b1cd3d708b
All the balances in this example refer to balance in primary fungible stores of each account.
Alice's initial FACoin balance: 0.
Bob's initial FACoin balance: 0.
Charlie's initial balance: 0.
Alice mints Charlie 100 coins.
Charlie's updated FACoin primary fungible store balance: 100.
Alice freezes Bob's account.
Alice as the admin forcefully transfers the newly minted coins of Charlie to Bob ignoring that Bob's account is frozen.
Bob's updated FACoin balance: 100.
Alice unfreezes Bob's account.
Alice burns 50 coins from Bob.
Bob's updated FACoin balance: 50.
Bob transfers 10 coins to Alice as the owner.
Alice's updated FACoin balance: 10.
Bob's updated FACoin balance: 40.
```

---

## ステップ 4 : FACoin の詳細

### ステップ 4.1 : FACoinパッケージの構築と公開

事実上、Move コントラクトは Move モジュールのセットであり、パッケージとして知られています。新しいパッケージをデプロイまたはアップグレードする時は、`--save-metadata`でコンパイラを呼び出してパッケージを公開する必要があります。FACoin の場合、次の出力ファイルが重要です。

- `build/Examples/package-metadata.bcs`: パッケージに関連付けられたメタデータが含まれます。
- `build/Examples/bytecode_modules/fa_coin.mv`:`fa_coin.move`モジュールのバイトコードが含まれます。

これらはサンプルによって読み取られ、Aptos ブロックチェーンに公開されます :

<Tabs groupId="examples">
  <TabItem value="typescript" label="Typescript">

TypeScript の例では、`aptos move build-publish-payload`コマンドを使用してモジュールをコンパイルおよびビルドします。このコマンドは、`package-metadata.bcs`と`moon_coin.mv`モジュールのバイトコードを含む`build`フォルダーを構築します。このコマンドはまた、パブリケーション トランザクション ペイロードを構築し、それを JSON 出力ファイルに保存します。後でこのファイルを読み取って`metadataBytes`と`byteCode`を取得し、以下の手順でチェーンへコントラクトを公開することができます。

パッケージをコンパイル。

```ts
export function compilePackage(
  packageDir: string,
  outputFile: string,
  namedAddresses: Array<{ name: string; address: AccountAddress }>,
) {
  const addressArg = namedAddresses
    .map(({ name, address }) => `${name}=${address}`)
    .join(" ");
  // Assume-yes automatically overwrites the previous compiled version, only do this if you are sure you want to overwrite the previous version.
  const compileCommand = `aptos move build-publish-payload --json-output-file ${outputFile} --package-dir ${packageDir} --named-addresses ${addressArg} --assume-yes`;
  execSync(compileCommand);
}

compilePackage("move/facoin", "move/facoin/facoin.json", [
  { name: "FACoin", address: alice.accountAddress },
]);
```

パッケージをチェーンに公開します。

```ts
export function getPackageBytesToPublish(filePath: string) {
  // current working directory - the root folder of this repo
  const cwd = process.cwd();
  // target directory - current working directory + filePath (filePath json file is generated with the previous, compilePackage, CLI command)
  const modulePath = path.join(cwd, filePath);

  const jsonData = JSON.parse(fs.readFileSync(modulePath, "utf8"));

  const metadataBytes = jsonData.args[0].value;
  const byteCode = jsonData.args[1].value;

  return { metadataBytes, byteCode };
}

const { metadataBytes, byteCode } = getPackageBytesToPublish(
  "move/facoin/facoin.json",
);

// Publish FACoin package to chain
const transaction = await aptos.publishPackageTransaction({
  account: alice.accountAddress,
  metadataBytes,
  moduleBytecode: byteCode,
});

const pendingTransaction = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});

await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });
```

  </TabItem>
</Tabs>

---

### ステップ 4.2 : FACoinモジュールを理解する

FACoin モジュールには`init_module`という関数が含まれています。名前付きメタデータ オブジェクトを作成し、「FACoin」と呼ばれる FA のタイプを定義し、一連のプロパティを持っています。この`init_module`関数は、モジュールが公開されるときに呼び出されます。この場合、FACoin はアカウントの所有者が所有する`FACoin`メタデータ オブジェクトを初期化します。モジュールコードによれば、所有者は「FACoin」の管理者となり、代替資産フレームワークの下で「FACoin」を管理する権利が与えられます。

:::tip 管理された代替資産フレームワーク
[`Managed Fungible Asset`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/move-examples/fungible_asset/managed_fungible_asset/sources/managed_fungible_asset.move)は、ユーザーが直接管理するFA向けの本格的なFA管理フレームワークです。

これは、さまざまな`refs`とプライマリーおよびセカンダリーの両方の代替ストアと関連する便利なラッパーを提供します。
この例は、プライマリ ストアのみを扱う簡略化されたバージョンです。
:::

---

### ステップ 4.3 : FACoinのプリミティブの管理を理解する

FACoin の作成者には、いくつかの管理プリミティブがあります。

- **Minting**: - 新しいコインを作成すること。
- **Burning**: コインを削除します。
- **Freezing/Unfreezing**: アカウント所有者が FACoin の主要な代替可能ストアから引き出したり、入金したりすることを無効化または有効化します。
- **Withdraw**: - 凍結されているかどうかに関係なく、アカウントのプライマリストアから FACoin を出金します。
- **Deposit**: 凍結されているかどうかに関係なく、アカウントのプライマリストアへFACoinを入金します。
- **Transfer**: 凍結されているかどうかに関係なく、ある口座から出金して別の口座へ入金します。

:::tip
FACoinを作成するエンティティは、凍結されているかどうかに関係なく、ミント、バーニング、凍結/凍結解除、および代替ストア間の強制転送の機能を獲得します。したがって管理モジュールの`Withdraw`, `Deposit`, and `Transfer`は、凍結ステータスによって制限される代替資産フレームワークで説明されているものとは異なるセマンティクスを持っています。
:::

---

#### ステップ 4.3.1 :「FACoin」メタデータオブジェクトの初期化

モジュールを Aptos ブロックチェーンに公開した後、そのコイン タイプを公開したエンティティは、この FA に関する情報を記述するメタデータ オブジェクトを初期化する必要があります。

```rust title="fa_coin.move snippet"
:!: static/move-examples/fungible_asset/fa_coin/sources/FACoin.move initialize
```

これにより、この FA タイプが名前付きオブジェクトを使用する前に初期化されていないことが保証されます。注意: 最初の行では、静的シードを使用して名前付きオブジェクトを作成していますが、メタデータ オブジェクトが作成されている場合は中断されます。続いて、`primary_fungible_store::create_primary_store_enabled_fungible_asset`を呼び出し、新しく作成されたオブジェクト内に FA メタデータ リソースを作成します。ほとんどの場合、この関数を呼び出してメタデータ オブジェクトを初期化します。この呼び出しの後、管理 API に必要なすべての`Refs`を生成し、カスタマイズされたラッパー リソースに保存します。

:::tip
FACoinは`init_module(&signer)`を介してパッケージを公開すると、すべての初期化を自動的に実行します。
:::

コインモジュールとは異なり、FA はユーザーが利用する際、登録する必要はありません。必要であればプライマリストアが自動的に作成されます。

---

#### ステップ 4.3.3 : コインの管理

コインをミントするには、初期化中に生成された`MintRef`が必要です。関数`mint`(以下を参照) は作成者と量(amount)を受け取り、その量の FA を含む`FungibleAsset`構造体を返します。FA トラックが供給される場合は更新されます。

```rust title="fa_coin.move snippet"
:!: static/move-examples/fungible_asset/fa_coin/sources/FACoin.move mint
```

`FACoin`は作成者に必要な`MintRef`にアクセスする入力関数`fa_coin::mint`を提供することで、これを容易にします。
同様にこのモジュールは`burn`、`set_frozen_flag`、`transfer`、`Withdraw`、`Deposit`関数を提供し、同じパターンで異なる参照を使って FACoin を管理します。

---

#### ステップ 4.3.4 : FA送金のAPI

Aptos は、同じ名前で異なるモジュールの FAフローをサポートする、いくつかの API を提供します。

- `fungible_asset::{transfer/withdraw/deposit}`: FA を、凍結されていない異なる代替ストア オブジェクト間で移動します。
- `fungible_asset::{transfer/withdraw/deposit}_with_ref`: 凍結ステータスに関係なく`TransferRef`と関連する異なる代替ストア オブジェクト間で FA を移動します。
- `primary_fungible_store::{transfer/withdraw/deposit}`: 凍結されていない異なるアカウントのプライマリ ストア間で FA を移動します。

:::tip 重要
単一の送金イベントではなく、2つ別々の出金イベント、入金イベントがあります。
:::

## サポート資料

- [Aptos CLI](../tools/aptos-cli/use-cli/use-aptos-cli.md)
- [Fungible Asset](../standards/fungible-asset.md)
- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 
- [Rust SDK](../sdks/rust-sdk/index.md) 
- [REST API specification](https://aptos.dev/nodes/aptos-api-spec#/)
