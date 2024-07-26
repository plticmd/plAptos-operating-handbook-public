---
title: "Aptos Wallet Standard"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# アプトス ウォレット スタンダード

ウォレット標準は、ウォレットの種類間の相互運用性に関するガイドラインを提供します。これにより、dapp開発者は、異なるウォレットを処理するためアプリケーションを変更する必要がなくなります。この標準は全てのdapp開発者へ単一のインターフェイスを提供し、各アプリケーションへの新しいウォレットの追加やより多くのユーザーの追加が簡単です。この相互運用性により、ユーザーはアプリがユースケースをサポートしているかどうかを気にする事無く、必要なウォレットを選択できます。

Aptosウォレット経由の相互運用性を確保するには、以下が必要です。:

1. ニーモニック - アカウントの秘密鍵を導出するために使用できる単語のセット
2. dapp API - ウォレットによって管理されるIDへのアクセスをサポートするウォレットへのエントリ ポイント
3. キーのローテーション - ニーモニック関連の関係と、異なるウォレット内のアカウントの回復の両方を処理する機能

## ニーモニックフレーズ

ニーモニックフレーズは、アカウントアドレスの生成に使用される複数の単語のフレーズです。キーのローテーションをより良く処理するため、アカウントごとに 1 つのニーモニックをお勧めします。ただしウォレットによっては、他のチェーンからの多数のアカウントに対する1つのニーモニックをサポートしたい場合があります。これらの両方のユースケースをサポートするため、Aptos ウォレット標準は[Bitcoin Improvement Proposal(BIP44)](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)を使用して、アカウントへのニーモニックのパスを導出します。


### Aptosアカウントを作成する

Aptos アカウントの作成は、次の方法でウォレット経由でサポートできます。:

1. 例えばBIP39を使用してニーモニックフレーズを生成します。
2. そのニーモニックフレーズからマスターシードを取得します。
3. BIP44派生のパスを使用してアカウントアドレスを取得します (例`m/44'/637'/0'/0'/0'`)
   - [派生パスについては、Aptos TypeScript SDK の実装](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_account.ts#L49-L69)を御覧下さい。
   - 例えば、Petraウォレットは1つのアカウントごと1つのニーモニックがあるため、常時`m/44'/637'/0'/0'/0'`パスを使用します。

```typescript
/**
   * bip44パスとニーモニックを使用し新しいアカウントを作成します。
   * @param path. (e.g. m/44'/637'/0'/0'/0')
   * 詳細 : {@link https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki}
   * @param mnemonics.
   * @returns Aptosアカウント
   */
  static fromDerivePath(path: string, mnemonics: string): AptosAccount {
    if (!AptosAccount.isValidPath(path)) {
      throw new Error("Invalid derivation path");
    }

    const normalizeMnemonics = mnemonics
      .trim()
      .split(/\s+/)
      .map((part) => part.toLowerCase())
      .join(" ");

    const { key } = derivePath(path, bytesToHex(bip39.mnemonicToSeedSync(normalizeMnemonics)));

    return new AptosAccount(new Uint8Array(key));
  }
```

### マルチアカウントウォレットで一つのニーモニック、をサポート

1つのニーモニックから複数のアカウントへのパラダイムは、ローテーションされたキーの処理が難しくなるため、これはお勧めできません (ニーモニックは1つのアカウントでは変更されますが、他のアカウントでは変更されません)。ただし、他のエコシステムの多くのウォレットはこのパラダイムを使用し、アカウントを生成するために以下の手順を実行します。

1. 例えばBIP39を使用してニーモニックフレーズを生成します。
2. そのニーモニックフレーズからマスターシードを取得します。
3. BIP44派生のパスを使用して秘密鍵を取得します(例:`m/44'/637'/i'/0'/0'`)iはアカウントインデックスです。
   - [派生パスについては、Aptos TypeScript SDK の実装](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_account.ts#L49-L69)を御覧下さい。
4. ユーザーがインポートしたいアカウントがすべて見つかるまで`i`を増やします。
   - 注: 繰り返し処理は制限する必要があります。繰り返し中にアカウントが存在しない場合は、一定数繰り返しを続けて、`address_gap_limit`(今のところ10)他にアカウントがあるかどうかを確認します。アカウントが見つかった場合は、通常通り繰り返し処理を続けます。

即ち、

```typescript
const gapLimit = 10;
let currentGap = 0;

for (let i = 0; currentGap < gapLimit; i += 1) {
  const derivationPath = `m/44'/637'/${i}'/0'/0'`;
  const account = fromDerivePath(derivationPath, mnemonic);
  const response = account.getResources();
  if (response.status !== 404) {
    wallet.addAccount(account);
    currentGap = 0;
  } else {
    currentGap += 1;
  }
}
```

## dapp API

アカウントの作成よりも重要なのは、ウォレットがどのようにdappsへ接続されるかです。以下のAPIへ従うことで、ウォレット開発者は[Aptosウォレットアダプター標準](../integration/wallet-adapter-concept.md)と統合出来ます。APIは次の通りです。

- `connect()`, `disconnect()`
- `account()`
- `network()`
- `signAndSubmitTransaction(transaction: EntryFunctionPayload)`
- `signMessage(payload: SignMessagePayload)`
- イベントリスニング  (`onAccountChanged(listener)`, `onNetworkChanged(listener)`)

```typescript
// 一般的な引数と応答

// 単一署名アカウントの場合公開鍵がひとつ有り、minKeysRequiredはnullです。
// マルチ署名アカウントの場合、複数の公開鍵とminKeysRequired値が有ります。
type AccountInfo {
    address: string;
    publicKey: string | string[];
    minKeysRequired?: number; // for multi-signer account
}

type NetworkInfo = {
  name: string;
  chainId: string;
  url: string;
};

// ここでトランザクションハッシュを返し、dappが待機出来る事が重要です。
type [PendingTransaction](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/generated/models/PendingTransaction.ts)

type [EntryFunctionPayload](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/generated/models/EntryFunctionPayload.ts)


```

### コネクションAPIs

接続APIにより、ユーザーがリクエスト表示の希望を承認するまで、ウォレットがリクエストを受け入れない事が保証されます。これは、ユーザーの状態のクリーンさを保ち、ユーザーの無意識なプロンプ​​ト表示を防止します。

- `connect()` ユーザーに接続を求めるプロンプトが表示されます
  - return `Promise<AccountInfo>`
- `disconnect()` ユーザーがdappへのアクセスの許可を停止出来る様にし、dappの状態管理も支援します。
  - return `Promise<void>`

### 状態APIs

#### アカウントを取得

**接続が必要です**

dappが現在接続されているアカウントのアドレスと公開鍵をクエリ出来るようにします。

- `account()` ユーザーへプロンプ​​トを表示しない
  - 戻り値 `Promise<AccountInfo>`

#### ネットワークを取得

**接続が必要です**

dappが現在接続されているネットワーク名、チェーン ID、URLをクエリ出来るようにします。

- `network()` ユーザーへプロンプ​​トを表示しない
  - 戻り値 `Promise<NetworkInfo>`

### APIの署名

#### Sign and submit transactionトランザクションへ署名して送信する

**接続が必要**

[TypeScript SDK](https://github.com/aptos-labs/aptos-core/blob/1bc5fd1f5eeaebd2ef291ac741c0f5d6f75ddaef/ecosystem/typescript/sdk/src/aptos_client.ts#L217-L221)を使用してdappが単純なJSONペイロードを送信出来るようにし、署名して現在のネットワークへ送信します。ユーザーには承認を求めるプロンプトが表示されます。

- `signAndSubmitTransaction(transaction: EntryFunctionPayload)`は署名するトランザクションをユーザーに要求します。
  - 戻り値 `Promise<PendingTransaction>`

#### メッセージへの署名

**接続が必要**

dappが秘密鍵を使用してメッセージに署名出来るようにします。最も一般的な使用例は身元を確認することですが、他にもいくつかの使用例が考えられます。ユーザーには承認を求めるプロンプトが表示される必要が有ります。他のチェーンの一部のウォレットは、ただ任意の文字列に署名するインターフェイスを提供しているだけだと気付くかもしれません。これは、中間者攻撃、文字列トランザクションの署名など​​の影響を受ける可能性があります。

種類:

```typescript
export interface SignMessagePayload {
  address?: boolean; //メッセージへアカウントアドレスを含めるべきか
  application?: boolean; //dappのドメインを含めるべきか
  chainId?: boolean; //ウォレットが接続されている現在のチェーンIDを含めるべきか
  message: string; // 署名されてユーザーへ表示されるメッセージ
  nonce: string; //dappが生成するnonce
}

export interface SignMessageResponse {
  address?: string;
  application?: string;
  chainId?: number;
  fullMessage: string; //署名するため生成されたメッセージ
  message: string; //ユーザーによって渡されたメッセージ
  nonce: string;
  prefix: string; //常時APTOSである必要がある
  signature: string | string[]; //署名されたメッセージ全文
  bitmap?: Uint8Array; //長さNの4バイト(32ビット)ビットベクター
}
```

- `signMessage(payload: SignMessagePayload)` 
ユーザーに`payload.message` の署名を求めるプロンプトを表示します
  - 戻り値 `Promise<SignMessageResponse>`

例:
`signMessage({nonce: 1234034, message: "Welcome to dapp!", address: true, application: true, chainId: true })`

これにより`fullMessage`が生成され、署名され`signature`として返されます。:

```yaml
APTOS
address: 0x000001
chain_id: 7
application: badsite.firebase.google.com
nonce: 1234034
message: Welcome to dapp!
```

Aptosは、単一署名者アカウントと複数署名者アカウントの両方をサポートしています。ウォレットが単一署名者アカウントの場合、署名は1つだけ存在し、`bitmap`はnullです。ウォレットが複数署名アカウントの場合、複数の`signature`、`bitmap値`が有ります。`bitmap`はメッセージに署名した公開鍵をマスクします。

### イベントリスニング

将来追加される予定:

- イベントリスニング(`onAccountChanged(listener)`, `onNetworkChanged(listener)`)

## キーのローテーション

キーのローテーションは現在どのウォレットにも実装されていません。回転キーのマッピングは[実装](https://github.com/aptos-labs/aptos-core/pull/2972), されていますが、SDK の統合は進行中です。

秘密鍵をインポートするウォレットは以下の事を行う必要があります。

1. 認証キーを派生します。
2. アカウント作成テーブルでオンチェーンの認証キーを検索します。

- アカウントが存在しない場合は、新しいアカウントです。使用するアドレスが認証キーとなります。
- アカウントが存在する場合、それはローテーションされたキー アカウントであり、使用されるアドレスはテーブルから取得されます。

## 付録

- dapp API関連の　**[フォーラム投稿ディスカッション](https://forum.aptoslabs.com/t/wallet-dapp-api-standards/11765/33)** 
