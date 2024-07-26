---
title: "ウォレット用"
id: "wallet-adapter-for-wallets"
---

# ウォレットビルダー用ウォレットアダプター

Aptosエコシステムのdappsから、ユーザーの求めるウォレット機能を提供するには、ウォレットプラグインが[Aptosウォレット標準](../standards/wallets.md)に準拠している必要が有り、Aptosウォレットアダプターから構築する必要があります。

[wallet-adapter-plugin-template](https://github.com/aptos-labs/wallet-adapter-plugin-template)リポジトリは、ウォレットビルダーに、必要なウォレット機能(Aptosウォレットスタンダード準拠)を全て備えていて事前作成されたクラスを提供し、簡単で迅速な開発を実現します。

## 構成

1. `git clone git@github.com:aptos-labs/wallet-adapter-plugin-template.git`
2. 編集用に`src/index.ts`を開きます。 
3. 全ての`AptosWindow` 参照を`<Your-Wallet-Name>Window`の様に置き換えます。
4. `AptosWalletName`を`<Your-Wallet-Name>WalletName`へ置き換えます。
5. `url`をwebサイトのURLへ置き換えます。
6. `icon`をウォレットのアイコンに変更します（必要な形式に注意してください）。
7. `window.aptos`を`window.<your-wallet-name>`へ置き換えます。
-  `Window Interface`が `<your-wallet-name>`をキーとして持っている事を確認して下さい (`aptos`ではなく)。
8. `__tests/index.test.tsx`を開き、`AptosWallet`を `<Your-Wallet-Name>Wallet`へ変更します。
9. `pnpm test`でテストを実行します。 - 全てのテストがパスするはずです。

この時点で、ウォレットクラスが完成し、必要な全てのプロパティと関数が備わり、Aptosウォレットアダプターと統合出来ます。

### パッケージとして公開

次のステップは、ウォレットをNPM パッケージとして公開し、dappsが依存関係としてウォレットをインストールできるようにする事です。以下のオプションのいずれかを使用します:

[スコープされたパブリックパッケージの作成と公開](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)

[スコープ外のパブリック パッケージの作成と公開](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)

:::tip
ウォレットに含まれていない機能を提供している場合は、コアパッケージ内の`aptos-wallet-adapter`に対してプルリクエストを開き、この機能をサポートさせる必要があります。ガイダンスは[wallet core package](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/packages/wallet-adapter-core/src/WalletCore.ts) 
の`signTransaction`を御覧下さい。
:::

### ウォレットリストへあなたの名前を追加する

パッケージが公開されたら、[aptos-wallet-adapter](https://github.com/aptos-labs/aptos-wallet-adapter)パッケージに対してプルリクエストを作成し、NPMパッケージへのURLとしてREADMEファイル上の[サポートされているウォレットリスト](https://github.com/aptos-labs/aptos-wallet-adapter#supported-wallet-packages)にウォレット名を追加します。

## AIP-62ウォレットスタンダード 

AIP-62ウォレット標準は、チェーンに依存しないインターフェイスと規約のセットで、アプリケーションと挿入済みウォレットが対話する方法の改善が目的です。詳細は[こちら](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md)を御覧下さい。

### なぜAIP-62ウォレット標準と統合するのか？

:::note
近い将来、新しい標準を取り入れたウォレットとして、ウォレットアダプターは従来の標準を廃止し、AIP-62 ウォレット標準サポートのみを維持する予定です。
:::

AIP-62ウォレット標準により、Dappが現在抱えている以下の問題が解消されます:

- dapp検出プロセスロジックのみに依存すると、ウォレットよりも先にdappがロードされdappが新しいウォレットを認識していない場合、競合状態のリスクを引き起こす可能性があります。
- 従来の標準はAptosウォレットアダプター内へ深く統合されており、変更が行われるとdAppやウォレットに重大な変更が生じる可能性があり、dAppやウォレットにこれらの変更を実装する必要があるため、終わりのないメンテナンス作業が発生します。
- 従来の標準は従来のTS SDK入力、タイプ、ロジックのみをサポートします。これは、新しいTS SDKの機能や拡張機能を活用できない事を意味します。さらに、従来のTS SDKは、それ以上のサポートや新機能を受け入れません。

AIP-62で解説されている新しいウォレット標準は、ウォレットに多くの利点をもたらします。　　

- ウォレットは独自のインターフェースを所有および制御し、dappに重大な変更を導入することなく簡単に更新して新機能を提供出来ます。
- ウォレット統合コードはウォレットのコードベース内に存在し、ウォレットで別のウォレットパッケージを作成および保守する必要が有りません。
- ウォレットは、ウォレット パッケージのインストールと維持をdappsに依存する必要がありません
- AIP-62 ウォレット標準は、より優れた検証とエラー処理のサポートを提供し、より信頼性が高く、高速で、新機能を備え積極的に保守及び開発されている新しいTS SDKを使用します(従来のSDK、つまりaptosは、今後積極的に保守及び開発はされません) 。


## AIP-62ウォレット標準と統合する方法

:::tip
Aptosは[@aptos-labs/wallet-standard](https://github.com/aptos-labs/wallet-standard)パッケージを提供します。パッケージはウォレットが実装する必要がある標準インターフェイスとクラスを保持しています。Aptos互換ウォレットを検出するためのヘルパー関数も提供します。
:::

AIP-62ウォレット標準との統合は非常にシンプルで簡単です。詳細については、ユーザーは[この例](https://github.com/aptos-labs/aptos-wallet-adapter/blob/main/apps/nextjs-example/utils/standardWallet.ts)を参照して、新しいウォレット標準と統合する方法を学ぶことができます。 

:::note
AIP-62ウォレット標準と互換性を持ち、dappsで検出できるようにするには、ウォレットは[必要な機能](https://github.com/aptos-labs/wallet-standard/blob/main/src/detect.ts#L16)を実装してサポートする必要があります。
:::

### Aptosウォレットインターフェースの実装

ウォレットは、ウォレットプロバイダーの情報と機能を備えた`AptosWallet`インターフェイスを実装する必要があります:

```ts
import { AptosWallet } from "@aptos-labs/wallet-standard";

class MyWallet implements AptosWallet {
  url: string;
  version: "1.0.0";
  name: string;
  icon:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`;
  chains: AptosChain;
  features: AptosFeatures;
  accounts: readonly AptosWalletAccount[];
}
```

### Aptosウォレットアカウントインターフェースの実装

ウォレットは、dapp によって承認されたアカウントを表す `AptosWalletAccount`インターフェイスを実装する必要があります。

```ts
import {
  AptosWalletAccount,
  IdentifierArray,
} from "@aptos-labs/wallet-standard";
import { SigningScheme } from "@aptos-labs/ts-sdk";

class MyWalletAccount implements AptosWalletAccount {
  address: string;

  publicKey: Uint8Array;

  chains: IdentifierArray;

  features: IdentifierArray;

  signingScheme: SigningScheme;

  label?: string;

  icon?:
    | `data:image/svg+xml;base64,${string}`
    | `data:image/webp;base64,${string}`
    | `data:image/png;base64,${string}`
    | `data:image/gif;base64,${string}`
    | undefined;

  constructor(account: Account) {
    this.address = account.accountAddress.toString();
    this.publicKey = account.publicKey.toUint8Array();
    this.chains = APTOS_CHAINS;
    this.features = ["aptos:connect"];
    this.signingScheme = SigningScheme.Ed25519;
  }
}
```

### ウォレットの登録

#### Web拡張ウォレット 

ウォレットは、registerWalletメソッドを使用して自身を登録し、登録の準備ができたことをdappに通知します。

```ts
import { registerWallet } from "@aptos-labs/wallet-standard";

const myWallet = new MyWallet();

registerWallet(myWallet);
```