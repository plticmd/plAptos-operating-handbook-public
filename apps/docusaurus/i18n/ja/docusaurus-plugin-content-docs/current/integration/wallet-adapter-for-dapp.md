---
title: "Dapps用"
id: "wallet-adapter-for-dapp"
---

# Dapp構築者用ウォレットアダプター

素晴らしいDAPPのアイデアがあり、その構築を始めようとしているとイメージして下さい。最終的には、ユーザーがAptosブロックチェーンと対話できる様、1つまたは複数のウォレットを統合する必要があります。ウォレット統合の実装は、すべてのエッジケース、新機能、サポートされていない機能をサポートすることが難しい場合があります。そして、複数のウォレットをサポートすることはさらに困難になる可能性があります。

さらに、ウォレットが異なればAPIも異なり、全てのウォレットが同じ命名規則を共有するわけではありません。例えば、おそらく全てのウォレットには`connect`メソッドが有りますが、全てのウォレットがそのメソッドを`connect`と呼ぶわけではありません。それをサポートするのは難しいかもしれません。

幸いなことに、Aptosはウォレットアダプターを構築しました。これはAptosチームによって作成および保守されています。開発の強化、可能な場合は標準化に役立ちます。

Aptos ウォレット アダプターは以下を提供します:

- 簡単なウォレットの実装 - 複数のウォレットのコードを実装してサポートする必要はありません。
- さまざまなウォレットAPIのサポート。
- ウォレットレベルで実装されていない機能のサポート。
- アンインストールされたウォレットの検出(ウォレットがインストールされていない事をユーザーへ示す事が出来ます)。
- 自動接続機能があり、現在のウォレットの状態を記憶します。
- アカウントやネットワーク変更などのウォレットイベントを待機します。
- Aptos エコシステム チームによって十分に開発および保守されたリファレンス実装。

## インストール

現在アダプターは、アプリに含めることが出来る _Reactプロバイダー_ をサポートしています。

アプリに含めるウォレットの依存関係をインストールします。ウォレットのリストは、Aptosウォレットアダプター[のREADME](https://github.com/aptos-labs/aptos-wallet-adapter#supported-wallet-packages)で見つかります。

React プロバイダーをインストールします:

```bash
npm install @aptos-labs/wallet-adapter-react
```

## 依存関係をインポートする

`App.jsx`ファイル内 :

インストールされているウォレットをインポートします:

```js
import { PetraWallet } from "petra-plugin-wallet-adapter";
```

`AptosWalletAdapterProvider`をインポートします:

```js
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
```

アプリをプロバイダーでラップし、アプリに含めたいプラグイン(ウォレット)を配列として渡し、自動接続オプション(デフォルトではfalseに設定)を含めます:

```js
const wallets = [new PetraWallet()];
<AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
  <App />
</AptosWalletAdapterProvider>;
```

### 使う

ウォレットプロパティを使用したいページで、
`@aptos-labs/wallet-adapter-react`から`useWallet`をインポートします。

```js
import { useWallet } from "@aptos-labs/wallet-adapter-react";
```

エクスポートされたプロパティを使用できます。

```js
const {
  connect,
  account,
  network,
  connected,
  disconnect,
  wallet,
  wallets,
  signAndSubmitTransaction,
  signTransaction,
  signMessage,
} = useWallet();
```

Finally, use the [examples](https://github.com/aptos-labs/aptos-wallet-adapter/tree/main/packages/wallet-adapter-react#examples) on the package README file to build more functionality into your dapps.
最後に、パッケージの README ファイルの例を使用して、dapps にさらに多くの機能を組み込みます。

## AIP-62ウォレットスタンダード 

AIP-62ウォレット標準は、チェーンに依存しないインターフェイスと規約のセットで、アプリケーションと挿入済みウォレットが対話する方法の改善が目的です。詳細は[こちら](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-62.md)を御覧下さい。

### なぜAIP-62ウォレット標準と統合するのか？

:::note
近い将来、新しい標準を取り入れたウォレットとして、ウォレットアダプターは従来の標準を廃止し、AIP-62 ウォレット標準サポートのみを維持する予定です。
:::

AIP-62ウォレット標準により、Dappが現在抱えている以下の問題が解消されます:

- dapp検出プロセスロジックは、ウォレットよりも先にdappがロードされdappが新しいウォレットを認識していない場合、競合状態のリスクを引き起こす可能性があります。
- 従来の標準はAptosウォレットアダプター内へ深く統合されており、変更が行われるとdAppやウォレットに重大な変更が生じる可能性があり、dAppやウォレットにこれらの変更を実装する必要があるため、終わりのないメンテナンス作業が発生します。
- 従来の標準は従来のTS SDK入力、タイプ、ロジックのみをサポートします。これは、新しいTS SDKの機能や拡張機能を活用できない事を意味します。さらに、従来のTS SDKは、それ以上のサポートや新機能を受け入れません。

AIP-62で解説されている新しいウォレット標準は、dAppsに多くの利点をもたらします。

- ウォレットアダプターは、dAppの代わりにウォレットパッケージのメンテナンスとインストールを処理し、潜在的なサプライチェーン攻撃を防ぎます。
- 新しいアダプターのバージョンでは、より優れた検証とエラー処理のサポートが提供されます。
- 新しいアダプターバージョンは、より信頼性が高く、高速で、積極的に保守され、新しい機能で更新される新しいTS SDKを使用します(従来のSDK、即ち`npm i aptos`は積極的に保守、開発されなくなりました)

### AIP-62ウォレット標準と統合する方法

最新バージョンのウォレット・アダプタは、ウォレットが両方の標準をサポートするという事を解決する事で、AIP-62ウォレット標準の統合をサポートします。

AIP-62ウォレット標準はdappとウォレット間のイベント通信を使用するため、dappはインストールしたり、保守したり、複数のウォレット・プラグイン(パッケージ)をウォレット・アダプタに渡す必要がありません。更に、AIP-62ウォレット標準と互換性のあるウォレットの場合、ウォレットアダプタはデフォルトでウォレットを検出します。

#### AIP-62ウォレットstandardのみをサポート

:::tip
既に従来の標準ウォレット・アダプタを使用している場合は、AIP-62 ウォレット標準と互換性のあるウォレットの依存関係をアンインストールして削除します。
:::

AIP-62 ウォレット標準のみをサポートするには、dappはReactプロバイダーに`plugins`propを含めないでください。

```js
<AptosWalletAdapterProvider autoConnect={true}>
  <App />
</AptosWalletAdapterProvider>
```

AIP-62ウォレット標準と互換性のあるウォレット

- [Nightly](https://chromewebstore.google.com/detail/nightly/fiikommddbeccaoicoejoniammnalkfa)

#### 両方の標準をサポートする

両方の標準をサポートするには、dappはReactプロバイダーにウォレット配列を提供する必要があります。そうすることで、アダプターは両方のウォレット標準の存在を解決し、dappにインストール済みのウォレットとAIP-62ウォレット標準互換のウォレットをエンドユーザーに提供します。

```js
const wallets = [new PetraWallet()];
<AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
  <App />
</AptosWalletAdapterProvider>;
```