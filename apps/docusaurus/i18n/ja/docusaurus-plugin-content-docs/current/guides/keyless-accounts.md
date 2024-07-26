---
title: "Aptos Keyless"
---

## Aptosキーレス統合ガイド

Aptos Keyless を使用すると、ユーザーは従来の秘密鍵やニーモニックではなく、既存の Google アカウントから Aptos ブロックチェーン アカウントを設定できます。簡単に言えば、Aptos Keyless では、ユーザーのブロックチェーン アカウントは Google アカウントです。将来、Aptos Keyless は Google だけでなく、多くの OpenID Connect (OIDC) プロバイダーをサポートする予定です。

重要なのは、Aptosキーレスが以下の2つの方法でユーザーのプライバシーを維持することです。

1. ユーザーのメールアドレスは、他のユーザーやバリデーターを含む誰にもオンチェーン上で公開されません。
2. ユーザーのブロックチェーン アドレスと関連するトランザクション履歴は、IDプロバイダー(Googleなど)から隠されます。

キーレス アカウントは、以下によりユーザーにとって革命的です。

1. `Sign In with Google`等の使い慣れたWeb2ログインを介した「1クリック」アカウント作成
2. アプリケーションエクスペリエンスから離れてウォレットをダウンロードする必要なく、Aptos ブロックチェーン上で取引を行うことができます。
3. ユーザーによる秘密鍵の管理は不要です。つまり、ブロックチェーンアカウントへのアクセスは OIDC アカウントへのアクセスと同義であり、ユーザーが OIDC アカウントへのアクセスを失った場合でも、Web2のような回復フローを使用してブロックチェーンアカウントへのアクセスを回復できます。
4. シームレスなクロスデバイスエクスペリエンス。ユーザーは、どのデバイスを使用していてもOIDCアカウントでログインできます。各デバイスにウォレットソフトウェアをダウンロードしたり、キーをインポートしたり、パスワードで暗号化したりする必要はありません。パスワードは維持する必要があります。

:::tip キーレスアカウントスコープ
 **_Aptos Keyless 統合ガイド_**を使用すると、キーレスアカウントをアプリケーションに直接統合できます。つまり、ブロックチェーン アカウントはアプリケーションのドメインにスコープされます (dApp A で Google アカウントを使用してログインし、dApp B で Google アカウントを使用してログインすると、別のアカウントが作成されます)。Aptos の Keyless アカウントをアプリケーション間で移植可能にする計画については、今後の発表をお待ちください。 
 
Aptosキーレスの強化にあたり、フィードバックを提供したり、サポートを受けたり、設計パートナーになったりするには、こちらにご参加ください: https://t.me/+h5CN-W35yUFiYzkx
:::

_Note: This guide is oriented toward non-wallet applications. If you are a wallet developer and have interest in using Keyless accounts, please reach out to us directly._

## 用語

- **オープンIDコネクト(OIDC)**: はID検証の連携を有効にするために使用されるID認証プロトコルです。このプロトコルは、たとえばユーザーが「Google でサインイン」フローを実行するときに使用されます。
- **アイデンティティープロバイダー(IdP)**: OIDC 経由でIDを認証する信頼できる機関です。サポートされている例としては、Google などがあります。
- **JSONウェブトークン(JWT):** は、クライアントとサーバーの2者間でセキュリティ情報を共有するために使用されるオープンスタンダードです。各JWTには、クレームのセットを含むエンコードされたJSONオブジェクトが含まれています。JWTは、トークンの発行後にクレームが変更されないように、暗号化アルゴリズムを使用して署名されます。

  - `iss`, OIDCプロバイダーの識別子(例:https://accounts.google.com)
  - `aud`, OAuth
  ユーザーがサインインしているアプリケーションの
  `client_id` (例: [Notion.so](https://notion.so))
  - `sub`, OIDCプロバイダーがユーザーを識別するために使用する識別子
    - これはこの`client_id`固有の識別子である可能性があります
    - あるいは、異なる`client_id`間で共有される識別子である可能性もあります
    (例: FacebookのOIDCはこれを行います)
  - `email`, 一部のプロバイダーでは、ユーザーのメールアドレスをフィールドの1つとして公開する場合もあります（例：Google）
    - プロバイダがユーザーがこのメールアドレスを所有していることを確認したかどうかを示す`email_verified`フィールドが表示されます。
  - `nonce`, アプリケーションがOIDCプロバイダーに署名を求める任意のデータ
  - `iat`, JWT が発行された時刻。

- **Ephemeralキーペア:** Aptos Keyless アカウントのトランザクションに署名するために使用される一時的な公開/秘密鍵ペア。公開鍵とその有効期限は`nonce`フィールドを介してJWTトークンにコミットされます
- **キーレス アカウント:** (1)ユーザーの OIDCアカウント(例:`alice@gmail.com`)と(2)関連アプリケーションのOAuth client_id(例: Notion.so)から直接派生したブロックチェーンアカウント。OIDCフローを通じたユーザーの認証。

- **JSONウェブキー(JWK):** は、OIDC プロバイダーの暗号化公開鍵です。この公開鍵は、OIDCプロバイダーがクライアントアプリケーションに発行するJWTの署名を検証するために使用されます。これにより、クライアントアプリケーションはトークンの信頼性を検証し、トークンが改ざんされていないことを確認できます。
- **client_id:** アプリケーションをIdPに登録した後にIdPから受け取るアプリケーションのOAuth識別子。
これは、ユーザーのアドレス派生におけるキーレス アーキテクチャで使用されます。
- **redirect_uri:** ユーザーが正常に認証された後のコールバックハンドラーのURI。IdPに登録する必要があります。

# キーレスアカウント統合手順

:::info DEVNETとTESTNETのみがサポートされています
現在、Aptos Keyless は devnet と testnet でのみサポートされています。メインネットのサポートは今後数週間以内に開始される予定です。
:::

大まかに言えば、キーレス アカウントを統合するには 3 つの手順を実行する必要があります。

1. **IdPとのOpenID統合を設定します。** このステップでは、dAppは選択したIdP（例：Google）へ登録し`client_id`を受け取ります。
2. **Aptos TypeScript SDK をインストールします。**
3. **アプリケーションクライアントにキーレスアカウントのサポートを統合する**
   1. ユーザーの`“Sign In with [Idp]”`フローを設定します。
   2. ユーザーの`KeylessAccount`インスタンスを作成する。
   3. `KeylessAccount`を介してトランザクションに署名して送信します。

## ステップ1. OpenIDとIdpの統合の設定

### サポートされているIDプロバイダー

現在はGoogleのみがサポートされています。将来的には追加のOIDCプロバイダー(Apple、Kakaotalk、Microsoft等)もサポートされる予定です。

| アイデンティティープロバイダー | 認証URL                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Google            | https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE} |

暗黙的なフロー(認証コードの交換なし)は、認証の推奨される方法です。統合手順では、暗黙的なフローの使用を前提としています。

### Google

OpenID認証をサポートするには、プロバイダーからの **`client_id`**と、承認されたオリジンとリダイレクト URI の設定が必要です。

1. [Google API Console](https://console.developers.google.com/)でプロジェクトを設定する。
   1. Google Cloud アカウントをお持ちでない場合は登録してください
   2. 存在しない場合は新しいプロジェクトを作成します。
2. [Credentials](https://console.developers.google.com/apis/credentials)へ移動。
3. OAuth2.0クライアントIDを選択または作成します。
4. 承認されたオリジン（dAppオリジン）を構成する。
5. リダイレクト URI (認証後に認証コードや id_token を受け取るコールバックのハンドラー) を構成する
6. アプリケーションの`client_id`を取得する。

## ステップ2. Aptos TypeScript SDKのインストール

```bash
# Experimental SDK version with Keyless support.
pnpm install @aptos-labs/ts-sdk@zeta
```

:::info SDKは実験段階です
API と SDK はまだ実験段階であり、「@zeta」タグの下で積極的に開発されています。統合が機能しなくなった場合は、パッケージを最新の「@zeta」バージョンの SDK にアップグレードしてみてください。
このバージョンでは、非実験的なSDKの機能が不足している可能性があります。
:::

## ステップ3. クライアント統合手順

以下はクライアントがキーレスアカウントを統合するためのデフォルトの手順です。

### 1. 現在のユーザーのUIの“[IdP]で署名する”ボタン？

    1. バックグラウンドで一時的なキーペアを作成します。これをローカルストレージに保存します。

        ```tsx
        import {EphemeralKeyPair} from '@aptos-labs/ts-sdk';

        const ephemeralKeyPair = EphemeralKeyPair.generate();
        ```

    2. `nonce`をキーとして`EphemeralKeyPair`をローカルストレージに保存します

        ```tsx
        // This saves the EphemeralKeyPair in local storage keyed, by its nonce.
        storeEphemeralKeyPair(ephemeralKeyPair.nonce, ephemeralKeyPair);
        ```

<details>
<summary>`storeEphemeralKeyPair`の実装例</summary>

:::tip
この実装は、nonceをキーとして使用してローカル ストレージに`EphemeralKeyPair`を保存する方法の例です。アプリケーションのニーズに応じて、異なる実装が使用される場合があります。
:::

```typescript
/**
 * ローカルストレージへの一時的なキーペアの保存
(nonce -> ephemeralKeyPair)
 */
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

/**
 * ローカルストレージから全ての一時期キーペアを回収し、複合化する。
 *  新しキーペアはその後、キーとしてのnonceと共にローカルストレージへ保存される
 */
export const storeEphemeralKeyPair = (
  ephemeralKeyPair: EphemeralKeyPair,
): void => {
  // ローカルストレージから現在の一時キーペアを回収する
  Retrieve the current ephemeral key pairs from localStorage
  const accounts = getLocalEphemeralKeyPairs();

  // ローカルストレージへ新しい一時キーペアを保存する
  accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair;
  localStorage.setItem(
    "ephemeral-key-pairs",
    encodeEphemeralKeyPairs(accounts),
  );
};

/**
 * ローカルストレージから全ての一時キーペアを回収し複合化する。
 */
export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
  const rawEphemeralKeyPairs = localStorage.getItem("ephemeral-key-pairs");
  try {
    return rawEphemeralKeyPairs
      ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs)
      : {};
  } catch (error) {
    // 次の行でeslintは使えません、コンソール無効？
    // eslint-disable-next-line no-console
    console.warn(
      "Failed to decode ephemeral key pairs from localStorage",
      error,
    );
    return {};
  }
};

/**
 *ローカルストレージへ保存される一時キーペアクラスの暗号化
 */
const EphemeralKeyPairEncoding = {
  decode: (e: any) =>
    new EphemeralKeyPair({
      blinder: new Uint8Array(e.blinder),
      expiryDateSecs: BigInt(e.expiryDateSecs),
      privateKey: new Ed25519PrivateKey(e.privateKey),
    }),
  encode: (e: EphemeralKeyPair) => ({
    __type: "EphemeralKeyPair",
    blinder: Array.from(e.blinder),
    expiryDateSecs: e.expiryDateSecs.toString(),
    privateKey: e.privateKey.toString(),
  }),
};

/**
 * ローカルストレージへ保存される一時キーペアの文字列化
 */
export const encodeEphemeralKeyPairs = (
  keyPairs: StoredEphemeralKeyPairs,
): string =>
  JSON.stringify(keyPairs, (_, e) => {
    if (typeof e === "bigint") return { __type: "bigint", value: e.toString() };
    if (e instanceof EphemeralKeyPair)
      return EphemeralKeyPairEncoding.encode(e);
    return e;
  });

/**
 * 文字列から一時キーペアを分析する
 */
export const decodeEphemeralKeyPairs = (
  encodedEphemeralKeyPairs: string,
): StoredEphemeralKeyPairs =>
  JSON.parse(encodedEphemeralKeyPairs, (_, e) => {
    if (e && e.__type === "bigint") return BigInt(e.value);
    if (e && e.__type === "EphemeralKeyPair")
      return EphemeralKeyPairEncoding.decode(e);
    return e;
  });
```

</details>

    3. ログインURLのURLパラメータを準備します。`redirect_uri`と`client_id`をIdP で構成した値へ設定します。`nonce`をステップ1.1の`EphemeralKeyPair`nonceへ設定します。

        ```tsx
        const redirectUri = 'https://.../login/callback'
        const clientId = env.IDP_CLIENT_ID
        // 一時キーペアと関連付けられたnonceを取得する
        Get the nonce associated with ephemeralKeyPair
        const nonce = ephemeralKeyPair.nonce
        ```

    4. ユーザーがIdPで認証するためのログイン URLを構築します。`openid`スコープが設定されていることを確認します。`email`や`profile`などのその他のスコープはprofileアプリの要求へ基づいて設定できます。

        ```tsx
        const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&scope=openid+email+profile&nonce=${nonce}&redirect_uri=${redirectUri}&client_id=${clientId}`
        ```

    5. ユーザーがログインボタンをクリックすると、手順 1.4 で作成した`loginUrl`へユーザーをリダイレクトします。

### 2. トークンを解析してコールバックを処理し、ユーザーのキーレスアカウントを作成する

    1. ユーザーがログインフローを完了すると、ステップ 1 で設定した`redirect_uri`にリダイレクトされます。
    JWTは`id_token`をキーとするURLフラグメントの検索パラメータとしてURLに設定されます。以下の操作を実行して、`window`からJWTを抽出します。

        ```tsx
        const parseJWTFromURL = (url: string): string | null => {
          const urlObject = new URL(url);
          const fragment = urlObject.hash.substring(1);
          const params = new URLSearchParams(fragment);
          return params.get('id_token');
        };

        // window.location.href = https://.../login/google/callback#id_token=...
        const jwt = parseJWTFromURL(window.location.href)
        ```

    2. JWTをデコードし、ペイロードから nonce値を抽出します。

        ```tsx
        import { jwtDecode } from 'jwt-decode';

        const payload = jwtDecode<{ nonce: string }>(jwt);
        const jwtNonce = payload.nonce
        ```

    3. デコードされたnonceを使用して、手順1.2で保存した`EphemeralKeyPair`を取得します。

        ```tsx
        const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce);
        ```

<details>
<summary>`getLocalEphemeralKeyPair`の実装例</summary>

:::tip
この実装は、ナンスをキーとして使用してローカル ストレージから`EphemeralKeyPair`を取得する方法の例です。アプリケーションの要望に応じて、さまざまな実装を使用できます。一時キーペアの有効期限のタイムスタンプを検証して、それがまだ有効であることを確認する事が重要です。
:::

```typescript
/**
 * ローカルストレージへ保存された一時キーペア
 (nonce -> ephemeral key pair)
 */
export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

/**
 * ローカルストレージから指定されたnonceを持つ一時キーペアを取得します
 */
export const getLocalEphemeralKeyPair = (
  nonce: string,
): EphemeralKeyPair | null => {
  const keyPairs = getLocalEphemeralKeyPairs();

  // 指定されたnonceを持つアカウントを取得します。(生成された一時キーペアのnonceはローカルストレージ内のnonceと一致しない可能性が有ります。)そのためそれを返す前にそれを検証する必要が有ります。(実装固有で)
  const ephemeralKeyPair = keyPairs[nonce];
  if (!ephemeralKeyPair) return null;

  // アカウントが有効な場合は返します。そうで無い場合はデバイスから削除し、nullを返します。
  return validateEphemeralKeyPair(nonce, ephemeralKeyPair);
};

/**
 *ローカルストレージから全ての一時キーペアを取得し復元化します。
 */
export const getLocalEphemeralKeyPairs = (): StoredEphemeralKeyPairs => {
  const rawEphemeralKeyPairs = localStorage.getItem("ephemeral-key-pairs");
  try {
    return rawEphemeralKeyPairs
      ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs)
      : {};
  } catch (error) {
    console.warn(
      "Failed to decode ephemeral key pairs from localStorage",
      error,
    );
    return {};
  }
};

/**
 * 指定されたnonceと有効期限タイムスタンプを使用して一時キーペアを検証します。nonceが生成された一時キーペアのnonceと一異なる場合、その一時キーペアはローカルストレージから削除されます。これはnonceアルゴリズムが同じであることを検証するためです(例:nonceアルゴリズムが変更された場合)
 */
export const validateEphemeralKeyPair = (
  nonce: string,
  ephemeralKeyPair: EphemeralKeyPair,
): EphemeralKeyPair | null => {
  // アカウントのnonceと有効期限タイムスタンプをチェックして有効かどうか確認します。
  if (
    nonce === ephemeralKeyPair.nonce &&
    ephemeralKeyPair.expiryDateSecs > BigInt(Math.floor(Date.now() / 1000))
  ) {
    return ephemeralKeyPair;
  }
  removeEphemeralKeyPair(nonce);
  return null;
};

/**
 * 指定されたnonceを持つ一時キーペアをローカルストレージから削除します
 */
export const removeEphemeralKeyPair = (nonce: string): void => {
  const keyPairs = getLocalEphemeralKeyPairs();
  delete keyPairs[nonce];
  localStorage.setItem(
    "ephemeral-key-pairs",
    encodeEphemeralKeyPairs(keyPairs),
  );
};
```

</details>

    4. ユーザーの`KeylessAccount`インスタンスを作成する

        ```tsx
        import {Aptos, Network} from '@aptos-labs/ts-sdk';

        const aptos = new Aptos({network: Network.DEVNET});  // 現時点ではdevnetとテストネットのみがサポートされています。
        const keylessAccount = await aptos.deriveKeylessAccount({
            jwt,
            ephemeralKeyPair,
        });
        ```

### 3. ブロックチェーンへトランザクションを送信する

    1. 送信するトランザクションを作成します。以下は、単純なコイン転送トランザクションの例です。

        ```tsx
        import {Account} from '@aptos-labs/ts-sdk';

        const bob = Account.generate();
        const transaction = await aptos.transferCoinTransaction({
            sender: keylessAccount.accountAddress,
            recipient: bob.accountAddress,
            amount: 100,
        });
        ```

    2. トランザクションに署名してチェーンに送信します。

        ```tsx
        const committedTxn = await aptos.signAndSubmitTransaction({ signer: keylessAccount, transaction });
        ```

    3. トランザクションがオンチェーンで処理されるのを待つ
  
        ```tsx
        const committedTransactionResponse = await aptos.waitForTransaction({ transactionHash: committedTxn.hash });
        ```

キーレスアカウントの設計の詳細については、[`AIP-61`](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-61.md)を御覧下さい
