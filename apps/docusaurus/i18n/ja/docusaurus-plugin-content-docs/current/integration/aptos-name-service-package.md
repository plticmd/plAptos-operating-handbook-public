---
title: "Aptosネームサービスとの統合"
id: "aptos-names-service-package"
---

# Aptosネームサービスとの統合

Aptosネームサービスは、開発者がボタンとモーダルをカスタマイズ可能なReactUIパッケージを提供し、ユーザーがWebサイトから直接Aptos名を検索、ミント出来る様にします。

## Prerequisites前提条件

- npmまたはYarnを使用し、[Reactプロジェクト](https://create-react-app.dev/docs/getting-started/)のルートディレクトリにインストールされた依存関係をサポートします。
  - `npm install @emotion/styled @emotion/react`
  - `yarn add @emotion/styled @emotion/react react-copy-to-clipboard`

## Aptosネームサービスコネクターを使う 

1. ターミナルを開き、Reactプロジェクトのルートディレクトリへ移動します。
2. npmかyarnを使用して`aptos-names-connector`パッケージをインストールします。 
   - `npm install "@aptos-labs/aptos-names-connector"`
   - `yarn add "@aptos-labs/aptos-names-connector"`
3. パッケージをインストールしたら`AptosNamesConnector`コンポーネントをインポートしてReactアプリケーションで使用できます(デフォルトでは`./src/App.js`):

   ```
   import { AptosNamesConnector } from "@aptos-labs/aptos-names-connector";

   function MyComponent() {
     const handleSignTransaction = async () => {
       // Handle signing of transaction
     };

     return (
       <AptosNamesConnector
         onSignTransaction={handleSignTransaction}
         isWalletConnected={true}
         network="mainnet"
         buttonLabel="Claim"
       />
     );
   }
   ```

4. 変更を確認するには、npmまたはYarnを使用して開発サーバーを起動します。以下のコマンドはデフォルトのWebブラウザー(通常`localhost:3000`)でReactアプリケーションを開きます。:
   - `npm start`
   - `yarn start`

## `AptosNamesConnector`プロパティーを構成する

`AptosNamesConnector`コンポーネントは以下のpropsを受け入れます:
- `onSignTransaction`: ユーザーがモーダルの「Mint」ボタンをクリックしたときに呼び出される必須のコールバック関数。この関数はトランザクションの署名を処理する必要があります。
- `isWalletConnected`: ユーザーのウォレットが接続されているかどうかを示すブール値。
- `network`: コンポーネントをメインネットに接続するかテストネットに接続するかを指定する文字列値。
- `buttonLabel`: ボタンに表示するテキストを指定する文字列値。

## ボタンのラベルと外観をカスタマイズする

ボタンのラベルは、文字列値をボタンラベルプロパティに渡すことでカスタマイズできます。`AptosNamesConnector`コンポーネントのボタンの外観は、Web サイトに合わせてカスタマイズできます。ボタンのCSSクラス名は`ans_connector_button`です:

```
.ans-connector-button {
  background-color: #000000;
  border: none;
  border-radius: 4px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 16px;
}
```

Reactアプリケーションで`ans_connector_button`を使用するには、`import "@aptos-labs/aptos-names-connector/dist/index.css";` をApp.jsファイルのトップに追加し、`<button className="ans_connector_button"></button>`で参照します。

## サポートされているネットワーク

この`AptosNamesConnector`コンポーネントはメインネットとテストネットの両方をサポートします。メインネットに接続するには、ネットワークプロパティを「mainnet」に設定します。テストネットに接続するには、ネットワークプロパティを「testnet」に設定します。

## 例

以下の例は、Reactアプリケーションで`AptosNamesConnector`コンポーネントを使用する方法を示しています。
<last image />

- アプリケーションの任意のページに「クレーム名」ボタンを追加します。これにより、ユーザーは Aptos名を直接作成し、Aptosウォレット アドレスに人間が判読できる .apt名を付ける事が出来ます。アプリケーションに合わせてボタンの外観をカスタマイズできます。これは、NFTマーケットプレイスのプロフィールページの例です。

<!-- ![Claim name](../../static/img/docs/ans_entrypoint_example.png) -->
![Claim name](/img/docs/ans_entrypoint_example.png)

- ボタンをクリックすると、Aptos名モーダルが表示され、ユーザーは名前を検索してアプリケーション内で直接ミントできます。

<!-- ![Show Aptos Name Service modal](../../static/img/docs/ans_entrypoint_modal_example.png) -->
![Show Aptos Name Service modal](/img/docs/ans_entrypoint_modal_example.png)

- ユーザーが自分の名前をミント(作成)したら、Aptosフルノードからクエリを実行して、Aptos ウォレットアドレスを置き換えることができます。これで、ユーザーは人間が読める.apt名を持てました。

<!-- ![Claim another name](../../static/img/docs/ans_entrypoint_with_other_name.png) -->
![Claim another name](/img/docs/ans_entrypoint_with_other_name.png)
