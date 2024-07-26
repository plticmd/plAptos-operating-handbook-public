---
title: "Aptos Coin (Legacy)"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Aptosコイン(従来の)

[コイン](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/coin.move)が提供する標準は、シンプルで型安全なフレームワーク、代替可能トークンとコインです。

:::tip
コインは `0x1::coin`へ補完されます。
:::

## 構造物

### 再利用性

Moveでコインは以下の様に定義されます。

```rust
struct Coin<phantom CoinType> has store {
    /// このアドレスが持っているコインの量
    value: u64,
}
```

Coinは`CoinType`を使い、個別のコインのコインフレームワークの再利用性をサポートします。例えば`Coin<A>`と`Coin<B>`は別のコインです。

### グローバルストア

Coinはグローバルストアへコインを保存するリソースもサポートしています。

```rust
struct CoinStore<phantom CoinType> has key {
    coin: Coin<CoinType>,
    frozen: bool,
    deposit_events: EventHandle<DepositEvent>,
    withdraw_events: EventHandle<WithdrawEvent>,
}
```

コイン情報やメタデータはコイン作成者アカウント下のグローバルストアへ保存されます。

```rust
struct CoinInfo<phantom CoinType> has key {
    name: string::String,
    /// コインのシンボル、通常は名前の短縮系
    /// 例えば、シンガポールドルはSGD
    symbol: string::String,
    /// ユーザー表現を取得するため使用される小数の数
    /// 例えば`decimals`が`2`と等しい場合`505`コインの残高は
    /// ユーザーへ`5.05` (`505 / 10 ** 2`)と表示されます。
    decimals: u8,
    /// このコインタイプの実在量
    supply: Option<OptionalAggregator>,
}
```

## プリミティブ

Coinはコインを作成・管理しているユーザーや、それを使用するユーザーへプリミティブを提供します。

### 作成者

Coinの作成者と管理者が出来るのは...

- コインの初期化とメタデータの設定をして供給の監視をする
- コインの価値のバーンとミント
- `CoinStore`からコインをバーンする
- `CoinStore`へ出入りする流動性を凍結します

### ユーザー

コインユーザーが出来るのは...

- 同じタイプの２つのCoin構造体を併合する。
- Coin構造体から新しいCoin構造体へ値を抽出する。
- `CoinStore`への入出金の機能と結果としてイベントの発行。
- ユーザーが自分のアカウントの`CoinStore<CoinType>`を登録するのを許可して
コインを処理する。

### コインモジュールキー構造体

以下の表では構造体レベルのフィールドを解説します。最終的なリストについては[`coin`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/doc/coin.md)を含む[Aptosフレームワーク](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/doc/overview.md)を御覧下さい。

##### [`Coin`](https://github.com/aptos-labs/aptos-core/blob/744c2def47cddced878fda9bbd5633022fdb083a/aptos-move/framework/aptos-framework/sources/coin.move#L68)

| 分野  | タイプ |       内容        |
| ------- | ---- | ---------------------------------- |
| `value` | u64  | トークンの値、 例: 1000000000 |

##### [`CoinInfo`](https://github.com/aptos-labs/aptos-core/blob/744c2def47cddced878fda9bbd5633022fdb083a/aptos-move/framework/aptos-framework/sources/coin.move#L92)

| 分野     | タイプ                             | 内容                                                                                                                     |
| ---------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `name`     | String                           | トークン名, 例: Aptos コイン                                                                                                |
| `symbol`   | String                           | トークンのシンボル, 例: APT                                                                                                    |
| `decimals` | u8                               | コインの価値を表す方法を決定します;例えば、APTの10進数は8なので100000000の値は1APTで表されます。 |
| `supply`   | オプション&lt;OptionalAggregator&gt; | option::some(optional_aggregator::new(MAX_U128, parallelizable))                                                                 |

### 新しいコインタイプを作成する

コイン作成者はオンチェーンアカウントへ新しいモジュールを発行出来、新しい`CoinType`を表す構造体を定義します。コイン作成者はそのアカウントから`coin:initialize<CoinType>`を呼び出しこれを有効なコインとして登録します。そして、お返しにコインをバーンしてミントし、`CoinStore`を凍結する関数を呼び出せる構造体を受け取ります。コインの使用を管理するため、これらは作成者によってグローバルストレージへ保存される必要が有ります。

```rust
public fun initialize<CoinType>(
    account: &signer,
    name: string::String,
    symbol: string::String,
    decimals: u8,
    monitor_supply: bool,
): (BurnCapability<CoinType>, FreezeCapability<CoinType>, MintCapability<CoinType>) {
```

作成者は名前、シンボル、少数、コインの合計供給量が監視するかどうかを定義することが出来ます。以下が適用されます。

- 上記の最初の３つ(`name`, `symbol`, `decimals`)は、純粋なメタデータであり、オンチェーンアプリケーションへの影響は有りません。一つのコインと微量のコインを等しくするため、一部のアプリケーションでは少数を使う場合が有ります。

- モニタリングサプライ(`monitor_supply`)は供給されているコインの合計を追跡する手助けをしますが、並行実行機能の働きにより、この選択肢をonにするといかなるミント、バーンの並行実行も防止されます。日常的にコインをミントやバーンしているなら`monitor_supply`の無効化を検討して下さい。

### コインのミント

作成者か管理者がコインをミントしたい場合は、`initialize`で生産され呼び出される`MintCapability`の照会を取得する必要が有ります。

```rust
public fun mint<CoinType>(
    amount: u64,
    _cap: &MintCapability<CoinType>,
): Coin<CoinType> acquires CoinInfo {
```

これは`amount`が指定した価値を含む新しいCoin構造体を生産します。供給が追跡されると、それも調整されます

### コインをバーンする

作成者もしくは管理者がコインをバーンしようと思ったら、`initialize`で生産された`BurnCapability`の照会を取得して以下を呼び出す必要が有ります。

```rust
public fun burn<CoinType>(
    coin: Coin<CoinType>,
    _cap: &BurnCapability<CoinType>,
) acquires CoinInfo {
```

作成者もしくは管理者は`CoinStore`からコインをバーンする事も出来ます。

```rust
public fun burn_from<CoinType>(
    account_addr: address,
    amount: u64,
    burn_cap: &BurnCapability<CoinType>,
) acquires CoinInfo, CoinStore {
```

:::tip burn 対 burn_from

`burn`関数はコインの合計保存値を削除しますが、`burn_from`は`CoinStore`から指定された値の量のみを削除します。 供給が追跡されるとそれも調整されます。

アカウントからバーンされたコインは`withdraw`関数の様な`WithdrawEvent`を発行しません。

:::

### アカウントの凍結

作成者もしくは管理者が特定のアカウントの`CoinStore`を凍結する場合、`initialize`で生成された`FreezeCapability`の照会を取得し、以下を呼び出す必要が有ります。

```rust
public entry fun freeze_coin_store<CoinType>(
    account_addr: address,
    _freeze_cap: &FreezeCapability<CoinType>,
) acquires CoinStore {
```

### コインの統合

同じタイプの２つのコインは単一のコイン構造体へ統合する事が出来ます。この構造体は以下を呼び出す事で２つのコインの累積値をそれぞれ独立して表示します。

```rust
public fun merge<CoinType>(
    dst_coin: &mut Coin<CoinType>,
    source_coin: Coin<CoinType>,
) {
```

### コインを抽出する

以下を呼び出す事で、ひとつのコインの値を控除して別のコインを作成出来ます。

```rust
public fun extract<CoinType>(
		coin: &mut Coin<CoinType>,
		amount: u64,
): Coin<CoinType> {
```

### コインストアからコインを引き出す

`CoinStore`の保有者は以下を呼び出す事で、指定された値のコインを抽出出来ます。

```rust
public fun withdraw<CoinType>(
    account: &signer,
    amount: u64,
): Coin<CoinType> acquires CoinStore {
```

:::tip
この関数は`WithdrawEvent`を発行します
:::

### コインストアへのコインの入金

以下を呼び出す事で、どんなエンティティーもアカウントの`CoinStore`へコインを入金出来ます。

```rust
public fun deposit<CoinType>(
		account_addr: address,
		coin: Coin<CoinType>,
) acquires CoinStore {
```

:::tip
この関数は`DepositEvent`を発行します。
:::

### コインの転送

`CoinStore`の保有者は、以下を呼び出す事で自分のアカウントから別のアカウントの`CoinStore`へ直接コインを転送する事が出来ます。

```rust
public entry fun transfer<CoinType>(
    from: &signer,
    to: address,
    amount: u64,
) acquires CoinStore {
```

:::tip
これはそれぞれの`CoinStore`上で`WithdrawEvent`と`DepositEvent`の両方を発行します。
:::

## イベント

```rust
struct DepositEvent has drop, store {
    amount: u64,
}
```

```rust
struct WithdrawEvent has drop, store {
    amount: u64,
}
```
