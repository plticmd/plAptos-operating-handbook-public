---
title: "Your First Coin"
slug: "your-first-coin"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# コイン入門

このチュートリアルでは、[MoonCoin](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/moon_coin)という名前の自作のコインをコンパイル、デプロイ、ミントする方法を紹介します。

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
cd examples/typescript/
```

依存関係をインストールします。

```bash
pnpm install
```

TypeScript の[`your_coin`](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/examples/typescript/your_coin.ts)サンプルを実行します。

```bash
pnpm run your_coin
```

アプリケーションが完了し、次のように出力されます。

```ts
Bob's initial MoonCoin balance: 0.
Alice mints herself 100 MoonCoin.
Alice transfers 100 MoonCoin to Bob.
Bob's updated MoonCoin balance: 100.
```

  </TabItem>
  <TabItem value="python" label="Python">

`aptos-core`リポジトリのクローンを作成します。

```bash
git clone https://github.com/aptos-labs/aptos-core
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

Python の[`your_coin`](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/your_coin.py)サンプルを実行します。

```bash
poetry run python -m examples.your_coin ~/aptos-core/aptos-move/move-examples/moon_coin
```

### ステップ 3.1 : パッケージを構築する

サンプルの実行は次の出力で一時停止します。

```bash
=== Addresses ===
Alice: 0x5e603a89cf690d7134cf2f24fdb16ba90c4f5686333721c12e835fb6c76bc7ba
Bob: 0xc8421fa4a99153f955e50f1de2a6acff2f3fd0bb33aa17ba1f5b32b699f6c825

Update the package with Alice's address, compile, and press enter.
```

別のターミナルを開き、MoonCoin パッケージのディレクトリに移動します。

```bash
cd ~/aptos-core/aptos-move/move-examples/moon_coin
```

CLI を使用してパッケージを構築します。

```bash
aptos move compile --named-addresses MoonCoin=0x5e603a89cf690d7134cf2f24fdb16ba90c4f5686333721c12e835fb6c76bc7ba --save-metadata
```

`--named-addresses`は、パッケージをコンパイルしてアリスのアカウントに保存するために変換する必要があるアドレス マッピングのリストです。上記へ出力されたアリスのアドレスへ`MoonCoin`がどの様に設定されているか注目してください。`--save-metadata`も、パッケージを公開するために必要です。

---

### ステップ 3.2 : サンプルの完了

前のプロンプトに戻り、パッケージを公開する準備ができたので Enter キーを押します。

アプリケーションが完了し、次のように出力されます。

The application will complete, printing:

```bash

Publishing MoonCoin package.

Bob registers the newly created coin so he can receive it from Alice.
Bob's initial MoonCoin balance: 0.
Alice mints Bob some of the new coin.
Bob's updated MoonCoin balance: 100.
```

  </TabItem>
</Tabs>

---

## ステップ 4 : MoonCoin の詳細

### ステップ 4.1 : MoonCoinパッケージの構築と公開

事実上、Move コントラクトは Move モジュールのセットであり、パッケージとして知られています。新しいパッケージをデプロイまたはアップグレードする時は、`--save-metadata`でコンパイラを呼び出してパッケージを公開する必要があります。MoonCoin の場合、次の出力ファイルが重要です。

- `build/Examples/package-metadata.bcs`: パッケージに関連付けられたメタデータが含まれます。
- `build/Examples/bytecode_modules/moon_coin.mv`: `moon_coin.move`モジュールのバイトコードが含まれます。

これらはサンプルによって読み取られ、Aptos ブロックチェーンに公開されます。

<Tabs groupId="examples">
  <TabItem value="typescript" label="Typescript">

TypeScript の例では、`aptos move build-publish-payload`コマンドを使用してモジュールをコンパイルおよびビルドします。このコマンドは、`package-metadata.bcs`と`moon_coin.mv`モジュールのバイトコードを含む`build`フォルダーを構築します。このコマンドはまた、パブリケーション トランザクション ペイロードを構築し、それを JSON 出力ファイルに保存します。後でこのファイルを読み取って
`metadataBytes`と`byteCode`を取得し、以下の手順でチェーンへコントラクトを公開することができます。

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

compilePackage("move/moonCoin", "move/moonCoin/moonCoin.json", [
  { name: "MoonCoin", address: alice.accountAddress },
]);
```

パッケージをチェーンに公開。

```ts
export function getPackageBytesToPublish(filePath: string) {
  // current working directory - the root folder of this repo
  const cwd = process.cwd();
  // target directory - current working directory + filePath (filePath JSON file is generated with the previous, compilePackage, CLI command)
  const modulePath = path.join(cwd, filePath);

  const jsonData = JSON.parse(fs.readFileSync(modulePath, "utf8"));

  const metadataBytes = jsonData.args[0].value;
  const byteCode = jsonData.args[1].value;

  return { metadataBytes, byteCode };
}

const { metadataBytes, byteCode } = getPackageBytesToPublish(
  "move/moonCoin/moonCoin.json",
);

// Publish MoonCoin package to chain
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
  <TabItem value="python" label="Python">

```python
:!: static/sdks/python/examples/your_coin.py publish
```

  </TabItem>
  <TabItem value="rust" label="Rust">

    Coming soon.

  </TabItem>
</Tabs>

---

### ステップ 4.2 : MoonCoinモジュールとは

MoonCoinモジュールは、`MoonCoin`構造体、もしくはコインタイプの個別のタイプを定義します。さらに、 `init_module`という関数が含まれています。この`init_module`関数は、モジュールが公開されるときに呼び出されます。この場合、MoonCoin は`MoonCoin`コイン タイプを `ManagedCoin`として初期化し、これはアカウントの所有者によって維持されます。
:::tip マネージドコインフレームワーク
[`ManagedCoin`](https://github.com/aptos-labs/aptos-core/blob/f81ccb01f00227f9c0f36856fead4879f185a9f6/aptos-move/framework/aptos-framework/sources/managed_coin.move#L1)はユーザーがコインを直接管理するためのシンプルなコイン管理フレームワークです。`mint`及び`burn`の便利なラッパーを提供します。
:::

```rust
:!: static/move-examples/moon_coin/sources/MoonCoin.move moon
```

---

### ステップ 4.3:コインを理解する

コインにはいくつかのプリミティブがあります。

- **Minting**: 新しいコインを作成すること。
- **Burning**: コインを削除します。
- **Freezing**: アカウントがコインを`CoinStore`へ保存できないようにします。
- **Registering**: コインを保管するための`CoinStore`リソースをアカウントに作成します。
- **Transferring**: `CoinStore`へのコインの入金と引き出し。

:::tip

新しいコインを作成するエンティティは、ミンティング、バーン、凍結の機能を獲得します。
:::

---

#### ステップ 4.3.1 : コインの初期化

コイン タイプが Aptos ブロックチェーンに公開されると、そのコインタイプを公開したエンティティは初期化できます。

```rust showLineNumbers
public fun initialize<CoinType>(
    account: &signer,
    name: string::String,
    symbol: string::String,
    decimals: u8,
    monitor_supply: bool,
): (BurnCapability<CoinType>, FreezeCapability<CoinType>, MintCapability<CoinType>) {
    let account_addr = signer::address_of(account);

    assert!(
        coin_address<CoinType>() == account_addr,
        error::invalid_argument(ECOIN_INFO_ADDRESS_MISMATCH),
    );

    assert!(
        !exists<CoinInfo<CoinType>>(account_addr),
        error::already_exists(ECOIN_INFO_ALREADY_PUBLISHED),
    );

    let coin_info = CoinInfo<CoinType> {
        name,
        symbol,
        decimals,
        supply: if (monitor_supply) { option::some(optional_aggregator::new(MAX_U128, false)) } else { option::none() },
    };
    move_to(account, coin_info);

    (BurnCapability<CoinType>{ }, FreezeCapability<CoinType>{ }, MintCapability<CoinType>{ })
}
```

これにより、このコイン タイプが以前に初期化されていないことが保証されます。注意：10 行目と 15 行目をチェックして、呼び出し元が行った`initialize`が、このモジュールを実際に公開したものと同じであること、およびそのアカウントに`CoinInfo`が何も保存されていないことを確認します。これらの両方の条件がチェックされると、 `CoinInfo`が保存され、呼び出し元はバーン、凍結、ミントの機能を取得します。

:::tip
MoonCoinはパッケージの公開とほぼ同時にこの`initialize`関数を自動的に呼び出します。
:::

---

#### ステップ 4.3.2 : コイン登録する

コインを使用するには、エンティティは`CoinStore`をアカウントへ登録する必要があります。

```rust
public entry fun registerCoinType(account: &signer) {
```

MoonCoin は、エントリー関数ラッパー `managed_coin::register`を提供する`ManagedCoin`を使用します。登録用のスクリプトの例を次に示します。

```rust
:!: static/move-examples/moon_coin/scripts/register.move moon
```

---

#### ステップ 4.3.3 : コインをミントする

コインのミントには、初期化中に生成されたミント機能が必要です。関数mint`mint`(以下を参照) はその機能と金額を受け取り、コインの金額を含む`Coin<T>`構造体を返します。コイントラックが供給されると更新されます。

```rust
public fun mint<CoinType>(
    amount: u64,
    _cap: &MintCapability<CoinType>,
): Coin<CoinType> acquires CoinInfo {
    if (amount == 0) {
        return zero<CoinType>()
    };

    let maybe_supply = &mut borrow_global_mut<CoinInfo<CoinType>>(coin_address<CoinType>()).supply;
    if (option::is_some(maybe_supply)) {
        let supply = option::borrow_mut(maybe_supply);
        optional_aggregator::add(supply, (amount as u128));
    };

    Coin<CoinType> { value: amount }
}
```

`ManagedCoin`は`managed_coin::mint`入力機能を提供することでミントを簡単にします。

---

#### ステップ 4.3.4 : コインを送金する

Aptos は、コイン送金をサポートするためのいくつかの構成要素を提供します。

- `coin::deposit<CoinType>`: すでに`coin::register<CoinType>`が呼び出されたアカウントへ、コインを入金することをあらゆるエンティティに許可します。
- `coin::withdraw<CoinType>`: あらゆるエンティティが彼らのアカウントからコイン金額を引き出せるようにします。
- `aptos_account::transfer_coins<CoinType>`: 特定の CoinType のコインを受信者に送金します。

:::tip 重要
単一の送金イベントではなく、出金イベント・入金イベント＝２つ別々のイベントがあります。
:::

## サポート資料

- [Aptos CLI](../tools/aptos-cli/use-cli/use-aptos-cli.md)
- [TypeScript SDK](../sdks/ts-sdk/index.md)
- [Python SDK](../sdks/python-sdk/index.md) 
- [Rust SDK](../sdks/rust-sdk/index.md) 
- [REST API specification](https://aptos.dev/nodes/aptos-api-spec#/)
