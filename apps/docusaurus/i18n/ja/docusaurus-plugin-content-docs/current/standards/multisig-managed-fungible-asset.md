---
title: "Manage Fungible Assets with Aptos Multisig Account"
---

# Aptosフレームワークマルチシグアカウントで代替可能資産を管理

このチュートリアルはAptosフレームワークのマルチシグアカウントと代替可能資産標準を組み合わせて代替可能資産管理のセキュリティマージンを拡張する実用的な使用例を紹介します。チュートリアルに進む前に、モジュールの公開とAptosフレームワークのマルチシグアカウントを理解していることを確認してください。理解していない場合は、まず以下のチュートリアルを試す事を強くお勧めします。

- [最初のMoveモジュール](../tutorials/first-move-module.md)

## ステップ 1: SDKを選ぶ

このチュートリアルは[TypeScript SDK](../sdks/legacy-ts-sdk/index.md)用で作成されました。

他の開発者も[Python SDK](../sdks/python-sdk/index.md)、[Rust SDK](../sdks/rust-sdk/index.md)、[Unity SDK](../sdks/unity-sdk/index.md)のサポートを追加する様お願いします。

## ステップ 2: モジュールを発行する

すべての管理操作(ミント、転送、バーン、凍結/凍結解除) を備えたAptosフレームワークマルチシグアカウントが制御する代替可能資産を作成する場合、代替可能資産標準を基準として良く設計されたスマートコントラクトが必須です。Aptosチームは`aptos-core`リポジトリでサンプルコードを提供しています。

`aptos-core`リポジトリをクローンします。

```bash
git clone git@github.com:aptos-labs/aptos-core.git ~/aptos-core
```

`managed_fungible_asset`ディレクトリへ移動しCLIを使ってこのパッケージを`default`アカウントへ公開します。 

```bash
cd ~/aptos-core/aptos-move/move-examples/fungible_asset/managed_fungible_asset
aptos move publish --named-addresses example_addr=default
```

`multisig_managed_coin`ディレクトりへ移動し、CLIを使ってこのパッケージを`default`アカウントへ公開します。 

```bash
cd ~/aptos-core/aptos-move/move-examples/fungible_asset/multisig_managed_coin
aptos move publish --named-addresses example_addr=default
```

このチュートリアルでは、`multisig_managed_coin`は同じアドレスで、`managed_fungible_asset`で定義された関数を呼び出す必要が有ります。従って、両方のモジュールを公開する必要が有ります。 

:::tip
モジュールを公開する前にフォーセットを使用してアカウントへ資金を投入する事を忘れないで下さい。
:::

## ステップ 3: サンプルの開始

```bash
cd ~/aptos-core/ecosystem/typescript/sdk/examples/typescript
```

`multisig_managed_coin`サンプルを実行します。

```bash
MODULE_ADDR=${DEFAULT_ACCOUNT_ADDRESS} pnpm run multisig_managed_coin
```

:::tip
この例はAptos devnetを使用します。Aptos devnetは歴史的に毎週木曜日にリセットされて来ました。サンプルを実行する時は、devnetが稼働している事を確認して下さい。フォーセットでローカルテストネットを実行しているなら、かわりに以下のコマンドを実行出来ます。

```bash
APTOS_NODE_URL=http://0.0.0.0:8080 APTOS_FAUCET_URL=http://0.0.0.0:8081 MODULE_ADDR=${DEFAULT_ACCOUNT_ADDRESS}  pnpm run multisig_managed_coin
```

:::

サンプルスクリプトはエラー無しで正常に実行されるはずです。次に、Aptosエクスプローラーのコンソールへ出力された`owner1`と`owner2`アドレスを検索する事でサンプルスクリプトが何を行なったのか見る事が出来ます。

そのスクリプトへ従い、何が行われたのか理解しましょう。

### 単一署名者アカウントの生成

まず、Aptosフレームワークマルチシグアカウントを共同所有する３つの単一署名者アカウントowner1、owner2、owner3を生成します。

```typescript title="3つの単一署名者を生成する"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_1
```

### 管理された代替可能資産でフレームワークマルチシグアカウントを生成する  

owner1が`multisig_managed_coin.move`で定義される`initialize()`関数を呼び出しましょう。この関数はまずowner1が所有するAptosフレームワークマルチシグアカウントを作成し、owner2とowner3の両方を所有者として追加します。引数リストで示されたカスタマイズ設定で"ミームコイン"と呼ばれる代替可能資産も作成し、マルチシグアカウントを代替可能資産の管理者にします。各提案の実行は少なくとも2つの承認が必要です。

```typescript title="マルチシグアカウントをクエリして、初期化関数を呼び出します。"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_2
```

### ミント

次に、所有者2と所有者3にそれぞれ1000ミームコインと2000ミームコインをミントします。提案されたトランザクションは、owner2 によって送信され、owner3 から追加の承認を得ます。

```typescript title="オーナー2へ1000、オーナー3へ2000をミント"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_3
```

### 凍結

ミント後、この例では所有者１がアカウントを凍結する方法を示します。提案されたトランザクションは所有者2が再度送信し、所有者3が承認します。 

```typescript title="所有者1を凍結します"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_4
```

:::tip
凍結解除は、ただ`set_primary_stores_frozen_status`関数の最後の引数を`false`へ置き換える事と同じです。
:::

### 強制送信

owner1が凍結されると、通常の送金では引き出せず、そのアカウントへの入金が出来ません。が、"ミームコイン"の管理者としてマルチシグアカウントはそれを行う能力が有ります。次に所有者2は所有者3から所有者1へ1000ミームコインを強制的に転送するトランザクションを提案しました。今回は所有者1が承認します。

```typescript title="所有者３から所有者1へ強制的に1000ミームコインを送信します"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_5
```

### バーン

最終的に、3人の所有者の全員が1000ミームコインを所有しています。これらのコインを全部バーンしましょう。所有者2が提案を行い、所有者1がそれを承認します。

```typescript title="３人の所有者の全員のアカウントから1000ミームコインをバーン"
:!: static/sdks/typescript/examples/typescript/multisig_managed_coin.ts section_6
```

## 結論

このチュートリアルでは、Aptosフレームワークマルチシグアカウントを使用して代替資産を管理するE2Eの流れを示します。同様に、自身のモジュールを作成出来、強力なSDKを活用して必要な管理スキームを作成出来ます。