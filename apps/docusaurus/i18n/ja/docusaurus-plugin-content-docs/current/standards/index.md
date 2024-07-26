---
title: "Aptos Standards"
---

# Aptos標準

標準は、すべての開発者が構築するための共通の相互運用可能なインターフェイスを定義します。これらは、Aptos ブロックチェーン上のアプリケーションとウォレット間の互換性を確保するためのルールで構成されています。hippospaceが提供するAptosの[既知のコインリソースアドレスのリスト](https://github.com/hippospace/aptos-coin-list)を御覧下さい。

## Move標準

### [Aptosオブジェクト](./aptos-object.md)

[オブジェクトモデル](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/object.move)はMoveが複雑なタイプを単一アドレスに保存されたリソースのセットとして表す事が出来、キメの細かいリソース制御と所有権管理が可能な豊富な機能モデルを与えます。

## 資産標準

### [デジタル資産(DA)](./digital-asset.md)

新しい[Aptosデジタル資産標準](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/token.move)で可能となるのは、

- 豊富で柔軟な資産と収集品。
- 基本機能を簡単に強化して、より豊富なカスタム機能を提供します。この例は[aptos_token module](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/aptos_token.move)です。

デジタル資産(DA)は、NFTもしくは半代替トークンを構築したい新しいコレクションまたはプロトコルへ推奨されます。

### [代替可能資産(FA)](./fungible-asset.md)

新しい[Aptos代替可能資産標準](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/fungible_asset.move)は、シンプルで型安全な標準であり、Aptosコインの入れ替えを意図するオブジェクトモデルを基準とした代替可能資産という意味です。代替可能資産(FA)は代替可能資産の作成と管理のためのより多くの機能と柔軟性をAptos move開発者へ提供します。

## ウォレット標準

### [Aptosウォレット](./wallets.md)

ウォレット標準は全てのウォレットが主な機能では同じ機能を使う事を保証します。これはが含むのは、
 
- 同じニーモニックなので、プロバイダー間でウォレットを移動できます。
- [ウォレットアダプター](../integration/wallet-adapter-concept.md)で全てのアプリケーションが共通のインターフェイスとシームレスに対話出来ます。

## 従来の標準

### [Aptosトークン](./aptos-token.md)

古い既存の[トークンモジュール](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/token.move)は、

- 豊富で柔軟な資産と収集品をカプセル化します。これらの資産は個別(少数ではない)であり、代替可能、半代替可能、または非代替可能です。
- トークン標準は、それ自身の`0x3`アドレスの`AptosToken`パッケージへ含まれていて、コミュニティーからのフィードバックを基準とした、迅速な反復を可能とします。

### [Aptosコイン](./aptos-coin.md)

[コインモジュール](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/coin.move)は、シンプルでタイプセーフで代替可能なアセットを目的とした軽量の標準です。コイン標準は、以下の事を保証するため独自のMoveモジュールへ分離されています。

- アプリケーションとユーザーは高いパフォーマンスと低いガス間接費のシンプルなトークンを作成して使用できます。
- コイン標準はptos コア フレームワークの一部なので、ガス通貨を含む通貨に使用出来ます。