---
title: "TypeScript Index"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ThemedImage from '@theme/ThemedImage';

# Aptos TypeScript SDK

<!---
TODO remove soon - after 12/18/2023
-->

:::note
このドキュメントは、新しい TypeScript SDK[@aptos-labs/ts-sdk](https://github.com/aptos-labs/aptos-ts-sdk)用です。レガシー SDK(別名`aptos`)のドキュメントは[こちら](../legacy-ts-sdk/index.md)

**新しいTypeScript SDK**への移行は[移行ガイド](./migration-guide.md)確認して下さい。
:::

## 概要

Aptos TypeScript SDKは、[aptos-ts-sdk GitHub](https://github.com/aptos-labs/aptos-ts-sdk)リポジトリでソース コードが完全にサポートされています。Aptos TypeScript SDK は、TypeScript を使用して Aptos ブロックチェーンと対話する便利な方法を提供します。統合プロセスを簡素化し、開発者の生産性を向上させるための一連のユーティリティ関数、クラス、および型を提供します。

- **開発者エクスペリエンス** 厳密に型指定された API とインターフェイス、オートコンプリート、包括的なドキュメント。
- **安定性** テスト一式は、Aptosフルノードおよびインデクサーに備えてローカルネットワークで実行されます。
- **トランザクション ビルダー** 直感的で簡素化されたトランザクションビルダーフロー
- **シリアル化/逆シリアル化のサポート** 完全にネストされたシリアル化/逆シリアル化のサポートと、Moveタイプを簡単にシリアル化および逆シリアル化するための Moveサブクラス

## インストール

<Tabs groupId="install-sdk">
  <TabItem value="pnpm" label="pnpm">

```bash
 pnpm i @aptos-labs/ts-sdk
```

  </TabItem>
  <TabItem value="npm" label="npm">

```bash
 npm i @aptos-labs/ts-sdk
```

  </TabItem>
  <TabItem value="yarn" label="yarn">

```bash
 yarn add @aptos-labs/ts-sdk
```

  </TabItem>
    <TabItem value="bun" label="bun">

```bash
 bun i @aptos-labs/ts-sdk
```

  </TabItem>
</Tabs>

## クイックスタート

### アプトスのセットアップ

```ts
const aptos = new Aptos(); // デフォルトはdevnet

// カスタム構成の場合
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);
```

### チェーンからデータを取得する

```ts
const ledgerInfo = await aptos.getLedgerInfo();
const modules = await aptos.getAccountModules({ accountAddress: "0x123" });
const tokens = await aptos.getAccountOwnedTokens({ accountAddress: "0x123" });
```

### APTコイン送金トランザクション

```ts
const transaction = await aptos.transferCoinTransaction({
  sender: alice,
  recipient: bob.accountAddress,
  amount: 100,
});
const pendingTransaction = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});
```

### トランザクションを構築して提出する

```ts
// 新しいアカウントキーペアを一つ生成する。
const alice: Account = Account.generate();

// チェーン上にアカウントを作成する。
await aptos.fundAccount({
  accountAddress: alice.accountAddress,
  amount: 100000000,
});

// アリスからボブへAPTコインを送金するトランザクションを送信する。
const bobAddress = "0xb0b";

const transaction = await aptos.transaction.build.simple({
  sender: alice.accountAddress,
  data: {
    function: "0x1::aptos_account::transfer_coins",
    typeArguments: ["0x1::aptos_coin::AptosCoin"],
    functionArguments: [bobAddress, 100],
  },
});

// 署名と送信を別々に使う。
const senderAuthenticator = aptos.transaction.sign({
  signer: alice,
  transaction,
});
const pendingTransaction = await aptos.transaction.submit.simple({
  transaction,
  senderAuthenticator,
});

// signAndSubmitを組み合わせて使う
const pendingTransaction = await aptos.signAndSubmitTransaction({
  signer: alice,
  transaction,
});
```
