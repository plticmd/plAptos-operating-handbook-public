---
title: "Application Integration Guide"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ブロックチェーンとの統合

あなたが顧客へのブロックチェーンサービス提供者で、プラットフォームにAptosブロックチェーンを追加したい場合は、このガイドが役立ちます。このシステムインテグレーターガイドは、プラットフォームにAptosブロックチェーンを統合する際必要な全ての手順を解説します。

## 概要

このドキュメントでは、以下のタスクでAptosと統合する方法を解説します。

1. テスト用の環境を準備します。
2. ブロックチェーン上にアカウントを作成します。
3. 例えばスワップを実行するために、アカウントIDとブロックチェーン上の別のエンティティを交換します。
4. トランザクションを作成します。
5. ガスの見積もりを取得し、トランザクションが正しいかどうか検証します。
6. トランザクションをブロックチェーンに送信します。
7. トランザクションの結果を待ちます。
8. 与えられたアカウントと特定のアカウントとの取引履歴や、やり取りをクエリします(引出しや入金等)。

## 始める

開始するには、ネットワークを選択し、ツールのセットを選ぶ必要があります。開発の加速に役立つSDKもいくつかあります。

### ネットワークを選択する

Aptosブロックチェーンと統合するためのネットワークが4つあり、充分サポートされています。

1. [ローカルネット](http://127.0.0.1:8080) -- 外部ネットワークを使用せず、既知のバージョンのコードベースに対しローカル開発を行うためのスタンドアロンツールです。
2. [Devネット](https://api.devnet.aptoslabs.com/v1/spec#/) -- コミュニティの共有リソース。データは毎週リセットされ、aptosコアメインブランチから毎週更新されます。
3. [テストネット](https://api.testnet.aptoslabs.com/v1/spec#/) -- コミュニティの共有リソース。データは保存され、ネットワーク構成はメインネットを模倣します。
4. [メインネット](https://api.mainnet.aptoslabs.com/v1/spec#/) -- 実際の資産を含むプロダクションネットワーク。

各環境の詳細については[Aptosブロックチェーンネットワーク](../nodes/networks.md)を御覧下さい。 

### ローカルテストネットを実行する

ローカルネットを実行するには2つの選択肢があります。

- [Aptos CLIをインストール](../tools/aptos-cli/install-cli/index.md)し、2)[ローカル開発ネットワーク](./local-development-network.md)を実行します。このパスはAptosブロックチェーンでの開発、Moveコントラクトのデバッグ、およびノー​​ド操作のテストに役立ちます。これにより、単一ノードネットワーク、ノードREST API、インデクサーAPI、フォーセットを含むローカル開発環境の機能が完備されています。

- [Aptosコアソースコード](../nodes/localnet/run-a-localnet.md#using-the-aptos-core-source-code)のいずれかを使用して、直接[ローカルネットを実行](../nodes/localnet/run-a-localnet.md)します。これらのパスは、Aptosコアのコードベースまたはフレームワークへの変更をテストする場合、またはAptosブロックチェーンのトップにサービスを構築する場合、それぞれ役立ちます。

これらの方法のいずれでも、`http://127.0.0.1:8080` で[REST APIサービス](../apis/fullnode-rest-api.md)を公開します。`http://127.0.0.1:8000` でオプション1のローカルネットを実行してフォーセットAPIサービスを公開します。または、`http://127.0.0.1:8081`でオプション2のAptos CLIをインストールします。アプリケーションはサービス用の場所を出力します。

### プロダクションネットワークアクセス

<Tabs groupId="networks">
  <TabItem value="devnet" label="Devネット">
    <ul>
      <li>REST API: <a href="https://api.devnet.aptoslabs.com/v1">https://api.devnet.aptoslabs.com/v1</a></li>
      <li>REST APIスペック: <a href="https://api.devnet.aptoslabs.com/v1/spec#/">https://api.devnet.aptoslabs.com/v1/spec#/</a></li>
      <li>インデクサーAPI: <a href="https://api.devnet.aptoslabs.com/v1/graphql">https://api.devnet.aptoslabs.com/v1/graphql</a></li>
      <li>フォーセットAPI: <a href="https://faucet.devnet.aptoslabs.com">https://faucet.devnet.aptoslabs.com</a></li>
      <li><a href="https://cloud.hasura.io/public/graphiql?endpoint=https://api.devnet.aptoslabs.com/v1/graphql">インデクサーGraphQL</a></li>
    </ul>
  </TabItem>
  <TabItem value="testnet" label="テストネット">
    <ul>
      <li>REST API: <a href="https://api.testnet.aptoslabs.com/v1">https://api.testnet.aptoslabs.com/v1</a></li>
      <li>REST APIスペック: <a href="https://api.testnet.aptoslabs.com/v1/spec#/">https://api.testnet.aptoslabs.com/v1/spec#/</a></li>
      <li>インデクサーAPI: <a href="https://api.testnet.aptoslabs.com/v1/graphql">https://api.testnet.aptoslabs.com/v1/graphql</a></li>
      <li>フォーセットAPI: <a href="https://faucet.testnet.aptoslabs.com">https://faucet.testnet.aptoslabs.com</a></li>
      <li><a href="https://cloud.hasura.io/public/graphiql?endpoint=https://api.testnet.aptoslabs.com/v1/graphql">インデクサーGraphQL</a></li>
    </ul>
  </TabItem>
  <TabItem value="mainnet" label="メインネット">
    <ul>
      <li>REST API: <a href="https://api.mainnet.aptoslabs.com/v1">https://api.mainnet.aptoslabs.com/v1</a></li>
      <li>REST APIスペック: <a href="https://api.mainnet.aptoslabs.com/v1/spec#/">https://api.mainnet.aptoslabs.com/v1/spec#/</a></li>
      <li>インデクサーAPI: <a href="https://api.mainnet.aptoslabs.com/v1/graphql">https://api.mainnet.aptoslabs.com/v1/graphql</a></li>
      <li>フォーセット:該当無し</li>
      <li><a href="https://cloud.hasura.io/public/graphiql?endpoint=https://api.mainnet.aptoslabs.com/v1/graphql">インデクサーGraphQL</a></li>
    </ul>
  </TabItem>
</Tabs>

### SDKとツール

Aptosは現在3つのSDKを提供しています。

1. [Typescript](../sdks/ts-sdk/index.md)
2. [Python](../sdks/python-sdk/index.md)
3. [Rust](../sdks/rust-sdk/index.md)

殆どの開発者はCLIからの恩恵を受ける事が出来ます。[Using the CLIの使用](../tools/aptos-cli/use-cli/use-aptos-cli.md)では、CLIを使用してアカウントの作成、コインの転送、Moveモジュールの公開等を行う方法を示します。

## Aptosのアカウント

[account](../concepts/accounts.md)トランザクションを送信出来るAptosブロックチェーン上のエンティティを表します。各アカウントは特定の32バイトのアカウントアドレスによって識別され、  [Moveモジュールと資源](../concepts/resources.md)のコンテナーとなります。Aptosでは、アカウントが絡むブロックチェーン操作は、オンチェーンでアカウントを先に作成してから行います。Aptosフレームワークは、[`aptos_account::transfer`](https://github.com/aptos-labs/aptos-core/blob/88c9aab3982c246f8aa75eb2caf8c8ab1dcab491/aptos-move/framework/aptos-framework/sources/aptos_account.move#L18)を介してAptosコインを転送する時、暗黙的にアカウントが作成されます。もしくは[`aptos_account::create_account`](https://github.com/aptos-labs/aptos-core/blob/88c9aab3982c246f8aa75eb2caf8c8ab1dcab491/aptos-move/framework/aptos-framework/sources/aptos_account.move#L13)を介してアカウント作成します。

作成中の[Aptosアカウント](https://github.com/aptos-labs/aptos-core/blob/88c9aab3982c246f8aa75eb2caf8c8ab1dcab491/aptos-move/framework/aptos-framework/sources/account.move#L23)は以下を含みます。

- [Aptosコインを含む資源](https://github.com/aptos-labs/aptos-core/blob/60751b5ed44984178c7163933da3d1b18ad80388/aptos-move/framework/aptos-framework/sources/coin.move#L50)と、その資源からのコインの入出金。
- 現在の公開鍵と秘密鍵に関連付けられた認証キー。
- 厳密に増加する[シーケンス番号](../concepts/accounts.md#account-sequence-number)。リプレイ攻撃を防ぐため、アカウントの次に来るトランザクションのシーケンス番号を表します。
- 厳密に増加する数値。次に来る個別のGUID作成番号を表します。
- アカウントに追加された新タイプのコイン全部の[イベントハンドル](../concepts/events.md)。
- アカウントの全キーローテーションのイベントハンドル。

[アカウント](../concepts/accounts.md)について詳しく読み[CLIを設定](../tools/aptos-cli/use-cli/use-aptos-cli.md#initialize-local-configuration-and-create-an-account)して下さい。

## トランザクション

Aptos[トランザクション](../concepts/txns-states.md)は[バイナリ公式シリアライゼーション(BCS)](https://github.com/diem/bcs)でエンコードされます。トランザクションは送信者のアカウントアドレス、送信者からの認証、Aptosブロックチェーンで実行したい操作、送信者がトランザクションの実行で支払うガス量等の情報を含みます。

詳細は[トランザクションと状態](../concepts/txns-states.md)。

### トランザクションの生成

Aptosは、トランザクション構築方法を２つサポートしています。

- Aptosクライアントライブラリを使用してネイティブBCSトランザクションを生成します。
- JSONエンコードされたオブジェクトを構築し、REST APIと対話してネイティブトランザクションを生成します。

好ましいアプローチは、直接ネイティブBCSトランザクションを生成する事です。REST APIを介してそれらを生成すると、フルノードがトランザクションを正しく生成する事を信頼をせず、迅速な開発が可能です。

#### BCSでエンコードされたトランザクション

BCSでエンコードされたトランザクションは`/transactions`エンドポイントに送信できますが、HTTPヘッダーで`Content-Type: application/x.aptos.signed_transaction+bcs`を指定する必要があります。これにより、トランザクション送信結果が返されます。成功した場合トランザクションハッシュは`hash`[フィールド](https://github.com/aptos-labs/aptos-core/blob/9b85d41ed8ef4a61a9cd64f9de511654fcc02024/ecosystem/python/sdk/aptos_sdk/client.py#L138)へ含まれます。

#### JSONでエンコードされたトランザクション

JSONでエンコードされたトランザクションは、以下の手順に従い[REST API](https://api.devnet.aptoslabs.com/v1/spec#/)経由で生成出来ます。

1. まず[Python SDK](https://github.com/aptos-labs/aptos-core/blob/b0fe7ea6687e9c180ebdbac8d8eb984d11d7e4d4/ecosystem/python/sdk/aptos_sdk/client.py#L128)で示す通り、`/transactions/encode_submission`エンドポイントの適切なJSONペイロードを構築します。
2. 上記の出力には`message`を含むオブジェクトが含まれています。この`message`はローカルで送信者の秘密鍵を使用して署名する必要があります。
3. 元のJSONペイロードを署名情報で拡張し`/transactions`[エンドポイント](https://github.com/aptos-labs/aptos-core/blob/b0fe7ea6687e9c180ebdbac8d8eb984d11d7e4d4/ecosystem/python/sdk/aptos_sdk/client.py#L142)にポストします。これにより、トランザクション送信結果が返されます。成功した場合、`hash`[field](https://github.com/aptos-labs/aptos-core/blob/b0fe7ea6687e9c180ebdbac8d8eb984d11d7e4d4/ecosystem/python/sdk/aptos_sdk/client.py#L145)はトランザクションハッシュを含みます。

JSONエンコードされたトランザクションにより、迅速な開発が可能となり、トランザクション引数からネイティブ型へのシームレスなABI変換がサポートされます。殆どのシステムインテグレーターは、独自の技術スタック内でトランザクションを生成する事を好みます。 [TypeScript SDK](https://github.com/aptos-labs/aptos-core/blob/9b85d41ed8ef4a61a9cd64f9de511654fcc02024/ecosystem/typescript/sdk/src/aptos_client.ts#L259)と[Python SDK](https://github.com/aptos-labs/aptos-core/blob/b0fe7ea6687e9c180ebdbac8d8eb984d11d7e4d4/ecosystem/python/sdk/aptos_sdk/client.py#L100)は両方とも、BCSトランザクションの生成をサポートしています。

### トランザクションのタイプ

特定のトランザクション内では、実行のターゲットは以下2つのタイプのどちらかです。

- エントリーポイント(以前はスクリプト関数と呼ばれていました)
- スクリプト(ペイロード)

[Python](https://github.com/aptos-labs/aptos-core/blob/3973311dac6bb9348bfc81cf983c2a1be11f1b48/ecosystem/python/sdk/aptos_sdk/client.py#L256)と[TypeScript](https://github.com/aptos-labs/aptos-core/blob/3973311dac6bb9348bfc81cf983c2a1be11f1b48/ecosystem/typescript/sdk/src/aptos_client.test.ts#L93)はどちらも、エントリーポイントをターゲットとするトランザクションの生成をサポートしています。このガイドでは、`aptos_account::transfer`や`aptos_account::create_account`の様なエントリーポイントの多くについて解説します。

Aptosブロックチェーン上の殆どの基本操作は、エントリーポイント呼び出しを介して利用出来るべきです。連続してエントリポイントを呼び出す複数のトランザクションを送信する事も出来ますが、その様な操作は単一のトランザクションからアトミックに呼び出す事が出来ます。スクリプトペイロードトランザクションは、どのモジュール内で定義されたどのパブリック(エントリ)関数も呼び出す事が出来ます。[Moveスクリプト](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/scripts/two_by_two_transfer)の例では複数のエージェントトランザクションを使用して2つの口座から資金を引き出し、他の2つの口座に入金します。
[Pythonの例](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/transfer_two_by_two.py)では、スクリプトをコンパイルして生成されたバイトコードを使用します。現在、TypeScriptでのスクリプトペイロードのサポートは限定的です。

### トランザクションの状態

トランザクションの送信中に返されたハッシュを使用してAPI[`/transactions/by_hash/{hash}`](https://api.devnet.aptoslabs.com/v1/spec#/operations/get_transaction_by_hash)をクエリする事でトランザクションステータスを取得します。

トランザクションを送信するための合理的な戦略は、トランザクションの有効期間を30～60秒に制限し、成功するまで定期的にAPIをpollingする事です。(またはその時間が経過してから数秒が経過するまでpollingする事です)。オンチェーンにコミットメントがない場合、トランザクションは破棄された可能性があります。
  
### トランザクションのテストまたはトランザクションの事前実行

トランザクションの評価とガス見積りを容易にするため、Aptosは
シミュレーションAPIをサポートしています。このAPIはトランザクションで有効な署名を必要としませんし、含めるべきでは有りません。

シミュレーションAPIは同期APIであり、トランザクションを実行し、ガス使用量を含む出力を返します。シミュレーションAPIには[`/transactions/simulate`](https://api.devnet.aptoslabs.com/v1/spec#/operations/simulate_transaction)へトランザクションを送信する事でアクセスできます。

[Typescript SDK](https://github.com/aptos-labs/aptos-ts-sdk/blob/main/src/api/transactionSubmission/simulate.ts)と[Python SDK](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/simulate_transfer_coin.py)はどちらもシミュレーションAPIをサポートしています。注意）使用される出力とガス使用量はアカウントの状態に応じて変更される可能性があります。ガスの見積もりについては、最大ガス量をこのAPIの見積り量より大きくする事をお勧めします。

## 現在および過去の状態の表示

Aptosブロックチェーンへの殆どの統合は、ブロックチェーンの現在および過去の状態の全体的かつ包括的な概要から恩恵を受けます。 
Aptosはトランザクション履歴、状態、イベント、トランザクション実行の結果全てを提供します。

- トランザクション履歴は実行ステータス、出力を指定し、関連イベントに関連付けます。各トランザクションには、固有のバージョン番号が関連付けられていて、ブロックチェーン台帳の履歴におけるグローバルな連続順序を記録しています。 
- 状態は特定のバージョンまでの全トランザクション出力を表します。言い換えると、状態バージョンはそのトランザクションバージョンを含む全トランザクションの累積です。
- トランザクションが実行されると、イベントが発行される場合があります。[Events](../concepts/events.md)は、オンチェーンデータの変更に関するヒントです。

ノード上のストレージサービスは、ノードからデータを消去する2つの形式のプルーニングを採用しています。

- 状態(state)
- イベント、トランザクション、その他全て

これらのいずれかを無効にすることはできますが、状態バージョンの保存は特に持続可能ではありません。

イベントとトランザクションのプルーニングは [`enable_ledger_pruner`](https://github.com/aptos-labs/aptos-core/blob/cf0bc2e4031a843cdc0c04e70b3f7cd92666afcf/config/src/config/storage_config.rs#L141)を`false`に設定することで無効にできます。これはメインネットのデフォルトの動作です。 近い将来、Aptosはノードから直接クエリする必要性を軽減するインデクサーを提供します。

REST APIでは、以下の方法でトランザクションとイベントをクエリ出来ます。

- [アカウントのトランザクション](https://api.devnet.aptoslabs.com/v1/spec#/operations/get_account_transactions)
- [バージョンごとのトランザクション](https://api.devnet.aptoslabs.com/v1/spec#/operations/get_transaction_by_version)
- [イベントハンドルごとのイベント](https://api.devnet.aptoslabs.com/v1/spec#/operations/get_events_by_event_handle)

## 代替資産の交換と追跡

Aptosには標準の[代替資産](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/fungible_asset.move)が有ります。この標準では、別のメタデータオブジェクトを使用し、様々なタイプの代替資産(FA)を表現できます。

ユーザーのFAは、そのユーザーが所有する`FungibleStore`に保存されます。 FAのタイプごとに、全てのアカウントにそのFAのプライマリストアが1つ有り、オプションの複数のセカンダリストアが有ります。プライマリストアとセカンダリストアの違いは、プライマリストアのアドレスはユーザーアカウントとメタデータオブジェクトのアドレスに基づいて決定されることです。

### ユーザー間での代替資産の転送

APTを含むFAは[`primary_fungible_store::transfer`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/primary_fungible_store.move#L142)機能を介してユーザーのプライマリストア間で転送できます。 
どの`FungibleStore`の[`fungible_asset::transfer`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/fungible_asset.move#L347)も`FungibleStore`オブジェクト アドレスを使用して呼び出され(invoked)ます。

### 現在のコイン残高

`FungibleStore`のAPT FAの現在の残高は、アカウントリソースURL: `https://{rest_api_server}/accounts/{fungible_store_object_address}/resource/0x1::fungible_asset::FungibleStore`で確認できます。 残高は`balance`として保存されます。リソースには、FAタイプの`metadata`オブジェクトと`frozen`ステータスも含まれます。プライマリ代替ストアのアドレスは`sha3(32-byte account address | 32-byte metadata object address | 0xFC)`の様に計算できます。

```
{
    type:"0x1::fungible_asset::FungibleStore"
    data:{
        balance:"233910778869"
        frozen:false
        metadata:{
            inner:"0xedc2704f2cef417a06d1756a04a16a9fa6faaed13af469be9cdfcac5a21a8e2e"
        }
    }
}
```

## コインの交換と追跡

Aptosには標準の[Coin type](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/coin.move)が有ります。タイプパラメータまたは`Coin<T>`のジェネリックを表す個別の構造体を使用する事で、様々なタイプのコインをこのタイプで表す事が出来ます。

コインは、アカウント内の`CoinStore<T>`リソースの下に保管されます。アカウント作成時に各ユーザーは、
`CoinStore<0x1::aptos_coin::AptosCoin>`リソースもしくは略して`CoinStore<AptosCoin>`リソースを持ちます。このリソースにはAptosコイン`Coin<AptosCoin>`があります。

### ユーザー間でのコインの送金

APTを含むコインは、全コイン用の[`aptos_account::transfer_coins`](https://github.com/aptos-labs/aptos-core/blob/d1610e1bb5214689a37a9cab59cf9254e8eb2be1/aptos-move/framework/aptos-framework/sources/aptos_account.move#L92)機能、およびアプトスコイン用の [`aptos_account::transfer`](https://github.com/aptos-labs/aptos-core/blob/88c9aab3982c246f8aa75eb2caf8c8ab1dcab491/aptos-move/framework/aptos-framework/sources/aptos_account.move#L18)機能を介してユーザー間で送金出来ます。


:::caution
重要です、注意して下さい。
アカウントが`CoinStore<T>`を指定された`T`へ登録していない場合、そのアカウントへのタイプ`T`の転送は失敗します。
:::

### 現在のコイン残高

`T`がAptosコインである`Coin<T>`の現在の残高は、アカウントリソースのURL:`https://{rest_api_server}/accounts/{address}/resource/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`で確認できます。残高は`coin::amount`へ保管されます。このリソースには、入金イベントと出金イベントの合計数、及び`deposit_events`内の`counter`値と`withdraw_events`がそれぞれ含まれています。

```
{
  "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
  "data": {
    "coin": {
      "value": "3927"
    },
    "deposit_events": {
      "counter": "1",
      "guid": {
        "id": {
          "addr": "0xcb2f940705c44ba110cd3b4f6540c96f2634938bd5f2aabd6946abf12ed88457",
          "creation_num": "2"
        }
      }
    },
    "withdraw_events": {
      "counter": "1",
      "guid": {
        "id": {
          "addr": "0xcb2f940705c44ba110cd3b4f6540c96f2634938bd5f2aabd6946abf12ed88457",
          "creation_num": "3"
        }
      }
    }
  }
}
```

### トランザクションのクエリ

Aptosは、各トランザクションを別個のバージョンとしてブロックチェーンにコミットします。これは、コミットされたトランザクションをバージョン番号で共有するのに便利です。これを行うには、次の様にクエリします: `https://{rest_server_api}/transactions/by_version/{version}`

アカウントが送信したトランザクションは、`sequence_number` がトランザクションのシーケンス番号と一致するURL:`https://{rest_server_api}/account/{address}/transactions?start={sequence_number}&limit=1`を介してクエリする事も出来ます。

転送トランザクションは以下の様に表示されます。

```
{
  "version": "13629679",
  "gas_used": "4",
  "success": true,
  "vm_status": "Executed successfully",
  "changes": [
    {
      "address": "0xb258b91eee04111039320a85b0c24a2dd433909e14a6b5c32ee722e0fdecfddc",
      "data": {
        "type": "0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>",
        "data": {
          "coin": {
            "value": "1000"
          },
          "deposit_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
                "creation_num": "2",
              }
            }
          },
          ...
        }
      },
      "type": "write_resource"
    },
    ...
  ],
  "sender": "0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
  "sequence_number": "0",
  "max_gas_amount": "2000",
  "gas_unit_price": "1",
  "expiration_timestamp_secs": "1660616127",
  "payload": {
    "function": "0x1::aptos_account::transfer",
    "arguments": [
      "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
      "1000"
    ],
    "type": "entry_function_payload"
  },
  "events": [
    {
      "key": "0x0300000000000000810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
      "guid": {
        "id": {
          "addr": "0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
          "creation_num": "3"
          }
        }
      },
      "sequence_number": "0",
      "type": "0x1::coin::WithdrawEvent",
      "data": {
        "amount": "1000"
      }
    },
    {
      "key": "0x02000000000000005098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
      guid": {
        "id": {
          "addr": "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
          "creation_num": "2"
          }
        }
      },
      "sequence_number": "0",
      "type": "0x1::coin::DepositEvent",
      "data": {
        "amount": "1000"
      }
    }
  ],
  "timestamp": "1660615531147935",
  "type": "user_transaction"
}

```

トランザクション情報の内訳は、

- `version`は、このトランザクションのグローバルな一意の識別子を表し、ブロックチェーンへコミットされた全トランザクションにおける位置を順序付けます。
- `sender`は、トランザクションを送信したエンティティのアカウント アドレスです。
- `gas_usedト`は、トランザクションの実行で支払われる単位です。
- `success`と`vm_status`は、トランザクションが正常に実行されたかどうか、及びトランザクションが正常に実行されなかった場合の原因を表します。
- `changes`は、トランザクションの実行中に変更された状態リソースの最終の値が含まれます。
- `events`はトランザクションの実行中に発行された全てのイベントが含まれます
- `timestamp`は、トランザクション実行のほぼリアルタイムのタイムスタンプです。

`success`がfalseの場合、`vm_status`はトランザクションの失敗を引き起こしたエラーコードまたはメッセージが含まれます。`success`がfalse の場合、`changes`はアカウントからのガス料差引きとシーケンス番号の増加に限定されます。`events`も起こらないので。

`events`の各イベントは、`key`によって区別されます。`key`は`changes`の`guid`から派生されます。具体的には、`key`は40バイトの16進文字列で、最初の8バイト(または16文字)は`changes`イベントの`guid`の`creation_num`のリトルエンディアン表現で、残りの文字はアカウントアドレスです。

イベントは発行する物を決定しないため、イベントのソースを特定するには`changes`のパスを追跡することが不可欠です。特に、コインの種類に応じて各`CoinStore<T>`には、`WithdrawEvent`と`DepositEvent`の両方が有ります。トランザクションでどのコインタイプが使用されているかを調べるため、インデクサーは`changes`イベントの`guid::creation_num`と`events`内のイベントの`key`へのアドレスを組み合わせて比較できます。

上の例を使用すると、`events[1].guid`は`changes[0].data.data.deposit_events.guid`と同等です。即ち`{"addr": "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e", "creation_num": "2"}`です。

:::tip
`key`フィールドは削除され`guid`が使用されます。
:::

### イベントのクエリ

Aptosはコインの全ての引き出しと入金に対して、正確で簡潔なイベントを提供します。これを関連するトランザクションと連携して使用すると、時間の経過に伴うアカウント残高の変化、それがいつ起こったのか、何が原因で起こったのかをユーザーに提示できます。ある程度の追加の解析を行うと、トランザクションタイプや関係する他の当事者などのメタデータも共有できます。

ハンドルURLによるイベントのクエリ: `https://{rest_api_server}/accounts/{address}/events/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>/withdraw_events`
:`https://{rest_api_server}/accounts/{address}/events/0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>/withdraw_events`

```
[
  {
    "version":"13629679",
    "key": "0x0300000000000000cb2f940705c44ba110cd3b4f6540c96f2634938bd5f2aabd6946abf12ed88457",
    "guid": {
      "id": {
        "addr": "0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
        "creation_num": "3"
        }
      }
    },
    "sequence_number": "0",
    "type": "0x1::coin::WithdrawEvent",
    "data": {
      "amount": "1000"
    }
  }
]
```

Gather more information from the transaction that generated the event by querying `https://{rest_server_api}/transactions/by_version/{version}` where `{version}` is the same value as the `{version}` in the event query.

イベントクエリ内の`{version}`と同じ`{version}`値の`https://{rest_server_api}/transactions/by_version/{version}`をクエリして、イベントを生成したトランザクションから詳細情報を収集します。

:::tip
コインの完全な動きを追跡する場合、通常はイベントで充分です。 `0x1::aptos_coin::AptosCoin`。ですが、Aptosではガスを表すため、指定されたアカウントから送信されるトランザクションごとに`gas_used`を考慮する必要があります。 不必要なオーバーヘッドを削減するため、トランザクションによるガス料金の抽出ではイベントは発行されません。アカウントの全てのトランザクションは、このAPIから取得出来ます: `https://{rest_server_api}/accounts/{address}/transactions`
:::


### コイン残高変更の追跡

前のセクションのトランザクションを考えてみましょう。ただし、今回は任意のコイン`0x1337::my_coin::MyCoin`といくつかのガスパラメーターが変更されています。

```
{
  "version": "13629679",
  "gas_used": "20",
  "success": true,
  "vm_status": "Executed successfully",
  "changes": [
    {
      "address": "0xb258b91eee04111039320a85b0c24a2dd433909e14a6b5c32ee722e0fdecfddc",
      "data": {
        "type": "0x1::coin::CoinStore<0x1337::my_coin::MyCoin>",
        "data": {
          "coin": {
            "value": "1000"
          },
          "deposit_events": {
            "counter": "1",
            "guid": {
              "id": {
                "addr": "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
                "creation_num": "2",
              }
            }
          },
          ...
        }
      },
      "type": "write_resource"
    },
    ...
  ],
  "sender": "0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
  "sequence_number": "0",
  "max_gas_amount": "2000",
  "gas_unit_price": "110",
  "expiration_timestamp_secs": "1660616127",
  "payload": {
    "function": "0x1::aptos_account::transfer_coins",
    "type_arguments": [
      "0x1337::my_coin::MyCoin"
    ],
    "arguments": [
      "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
      "1000"
    ],
    "type": "entry_function_payload"
  },
  "events": [
    {
      "key": "0x0300000000000000810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
      "guid": {
        "id": {
          "addr": "0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b",
          "creation_num": "3"
          }
        }
      },
      "sequence_number": "0",
      "type": "0x1::coin::WithdrawEvent",
      "data": {
        "amount": "1000"
      }
    },
    {
      "key": "0x02000000000000005098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
      guid": {
        "id": {
          "addr": "0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e",
          "creation_num": "2"
          }
        }
      },
      "sequence_number": "0",
      "type": "0x1::coin::DepositEvent",
      "data": {
        "amount": "1000"
      }
    }
  ],
  "timestamp": "1660615531147935",
  "type": "user_transaction"
}
```

この取引では3つの残高変更があります。

1. 取引送信口座`0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b`から`0x1337::my_coin::MyCoin`の`1000`を引き出し
2. `0x1337::my_coin::MyCoin`の`1000`を受取口座`0x5098df8e7969b58ab3bd2d440c6203f64c60a1fd5c08b9d4abe6ae4216246c3e`へ入金
3. `0x1::aptos_coin::AptosCoin`のガス料金`2200`を送金口座`0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b`から

出金情報を取得するには:

1. `0x1::coin::CoinStore<CoinType>`の`changes`をスキャンして下さい。注意）`CoinType`はストアへ保管されているコインの一般的な意味です。この例では`CoinType`は`0x1337::my_coin::MyCoin`です。
2. `withdraw_events`の`guid`を取得します。この例では`guid`は`addr` `0x810026ca8291dd88b5b30a1d3ca2edd683d33d06c4a7f7c451d96f6d47bc5e8b` と`creation_num` `3`を含みます。
3. この`guid`を使用してイベントをスキャンし、関連付けられたイベントを抽出します。この例では`0x1::coin::WithdrawEvent`です。
4. 注意）`amount`フィールドは`guid`のアカウントから削除された`CoinType`の数です。この例では`1000`です。

入金情報を取得する方法は、以下の点以外は出金と同じです。

1. `guid`は`deposit_events`下で使用される。
2. アカウントの残高では`amount`はプラスに増加します。
3. イベントの名前は`0x1::coin::DepositEvent`となります。

ガス料金を取得するには:

1. `gas_used`フィールドは`gas_unit_price`を乗算する必要があります。この例では`gas_used=20`と`gas_unit_price=110`なので、引き出されるガスコインの合計は`2200`です。
2. ガスは常時: `0x1::aptos_coin::AptosCoin`

コインの小数点以下の桁数の情報を取得するには:

1. コインの小数点以下の桁数は`0x1::coin::CoinInfo<CoinType>`を介して取得できます。
2. これは、コインタイプのアドレスに配置してあります。この例では、`0x1337`アドレスの`0x1::coin::CoinInfo<0x1337::my_coin::MyCoin>`を検索する必要があります。 

:::tip
常にこの方法でイベントを使用すれば、アカウントの残高変更を見逃す事はありません。イベントを監視する事で下記の`0x1::coin::CoinStore`の全残高変更が分かります。

1. コインミント
2. コインバーン
3. コイン送金
4. コインをステーキングする
5. ステークしたコインの出金
6. `coin::transfer`から派生しない転送
:::

調査するサンプルデータを作成するには["最初のトランザクション"](../tutorials/first-transaction.md).
を実行します。

コインの作成について詳しくは["最初のコイン"](../tutorials/first-coin.md)を作成してください。

## フォーセットとの統合

このチュートリアルは[Aptos Faucet](https://github.com/aptos-labs/aptos-core/tree/main/crates/aptos-faucet)との統合を希望するSDKとウォレットの開発者を対象としています。dapp開発者の場合は、既存の[SDK](../tutorials/first-transaction.md)か[CLI](../tools/aptos-cli/use-cli/use-aptos-cli.md#initialize-local-configuration-and-create-an-account)を介してフォーセットにアクセスする必要があります。 

### Devネットとテストネットの違い
devネットとテストネットの違いは何でしょう? 実質的には何も有りません。以前はテストネットフォーセットの前にキャプチャがあり、
通常の方法ではクエリ出来ませんでした。今はもう真実ではありません。

各フォーセットのエンドポイントは次のとおりです。

- Devネット: https://faucet.devnet.aptoslabs.com
- テストネット: https://faucet.testnet.aptoslabs.com

### フォーセットの呼び出し:JavaScript/TypeScript

JavaScriptまたはTypeScriptでクライアントを構築している場合は、[@aptos-labs/aptos-faucet-client](https://www.npmjs.com/package/@aptos-labs/aptos-faucet-client)パッケージを使用する必要があります。このクライアントは、フォーセットサービスによって公開されたオープンAPI仕様に基づいて生成されます。

使用例:

```typescript
import {
  AptosFaucetClient,
  FundRequest,
} from "@aptos-labs/aptos-faucet-client";

async function callFaucet(amount: number, address: string): Promise<string[]> {
  const faucetClient = new AptosFaucetClient({
    BASE: "https://faucet.devnet.aptoslabs.com",
  });
  const request: FundRequest = {
    amount,
    address,
  };
  const response = await faucetClient.fund({ requestBody: request });
  return response.txn_hashes;
}
```

### フォーセットの呼び出し:他の言語

他の言語でフォーセットを呼び出そうとする場合、以下の２つの選択肢があります。

1. [OpenAPIスペック](https://github.com/aptos-labs/aptos-core/blob/main/crates/aptos-faucet/doc/spec.yaml)からクライアントを生成します。
2. 自分でフォーセットを呼びます。

後者の場合は、以下と同様のクエリを作成します。

```
curl -X POST 'https://faucet.devnet.aptoslabs.com/mint?amount=10000&address=0xd0f523c9e73e6f3d68c16ae883a9febc616e484c4998a72d8899a1009e5a89d6'
```

これは、`0xd0f523c9e73e6f3d68c16ae883a9febc616e484c4998a72d8899a1009e5a89d6`アドレスへ10000 OCTAを発行することを意味します。
