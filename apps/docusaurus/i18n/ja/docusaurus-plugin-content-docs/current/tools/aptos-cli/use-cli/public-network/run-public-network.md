---
title: "Running a Public Network"
---

# パブリックネットワークの実行

:::caution
テストのために自身のローカルネットワークを実行したいだけの場合は[ここ](../running-a-local-network.md)でその方法を学習できます。
:::

## ジェネシスセレモニー

この`aptos`ツールは、ジェネシスセレモニーを通じて、新しいブロックチェーンの開始をサポートします。
ジェネシスセレモニーの出力は、ブロックチェーンのオンライン運用の準備をするMove指導の出力です。入力は以下で構成されます。

- バリデータとその構成のセット
- Moveモジュールの初期セットはフレームワークとして
- 他のネットワークと区別するユニークな`ChainId`（u8）
- テストチェーンには、Aptosコインのミントを管理するアカウントも存在します。

## ジェネシスの生成

- ジェネシス設立者は`Layout`を構築して配布します。
- ジェネシス設立者はAptosフレームワークのバイトコードを準備し、配布します。
- 各参加者は、`ValidatorConfiguration`を生成し、配布します。
- 各参加者は、結果として生じた貢献から`genesis.blob`を生成します。
- ジェネシス オーガナイザーは`genesis.blob`を実行して初期ウェイポイントを引き出し、配布します。
- 各参加者は`aptos-node`を開始します。`aptos-node`は起動時に、ジェネシスオーガナイザーによって提供されたウェイポイントで`genesis.blob`を確認します。
- ブロックチェーンは、ステークの最小人数が利用可能となるとコンセンサスを開始します。

### Aptosコアを準備する

以下のセクションでは、Aptosソースのツールを使用します。設定は[ソースからAptosを構築する](../../../../guides/building-from-source.md)を御覧下さい。

### `layout`ファイル

レイアウトファイルは以下を含みます。

- `root_key`: Aptosコイン管理用の Ed25519 公開鍵。
- `users`: 参加者のセット
- `chain_id`: `ChainId`もしくは、このデプロイを他のAptosネットワークと区別する一意の整数

例:

```
root_key: "0xca3579457555c80fc7bb39964eb298c414fd60f81a2f8eedb0244ec07a26e575"
users:
  - alice
  - bob
chain_id: 8
```

### Aptosフレームワークの構築

あなたのAptosコアリポジトリからフレームワークを構築してパッケージ化します。

```
cargo run --package framework
mkdir aptos-framework-release
cp aptos-framework/releases/artifacts/current/build/**/bytecode_modules/* aptos-framework-release
```

フレームワークは`aptos-framework-release`ディレクトリ内へ保存されます。

### `ValidatorConfiguration`ファイル

`ValidatorConfiguration`ファイルは以下を含みます。 

- `account_address`: このバリデーターを管理するアカウント。これは、`ValidatorConfiguration`ファイル内で提供された`account_key`から派生する必要があります。
- `consensus_key`: バリデータからのコンセンサスメッセージを認証するための公開鍵
- `account_key`: このバリデーターを管理するアカウントの公開鍵。これは`account_address`を派生するため使用されます。
- `network_key`: バリデータとフルノードネットワーク認証および暗号化の両方で使用される公開鍵。
- `validator_host`: バリデータが存在するネットワーク アドレス。これは`host`フィールドと`port`フィールドを含みます。`host`は、DNS名またはIPアドレスのいずれかである必要があります。現在はIPv4のみがサポートされています。
- `full_node_host`: フルノードが存在するオプションのネットワークアドレス。これは`host`フィールドと`port`フィールドを含みます。`host`はDNS名またはIPアドレスのいずれかである必要があります。現在はIPv4のみがサポートされています。
- `stake_amount`: このノードがステークしているコインの数。これは`1`であると予想されます。予想と違う場合は、構成が無効と見なされます。

例:

```
account_address: ccd49f3ea764365ac21e99f029ca63a9b0fbfab1c8d8d5482900e4fa32c5448a
consensus_key: "0xa05b8f41057ac72f9ca99f5e3b1b787930f03ba5e448661f2a1fac98371775ee"
account_key: "0x3d15ab64c8b14c9aab95287fd0eb894aad0b4bd929a5581bcc8225b5688f053b"
network_key: "0x43ce1a4ac031b98bb1ee4a5cd72a4cca0fd72933d64b22cef4f1a61895c2e544"
validator_host:
  host: bobs_host
  port: 6180
full_node_host:
  host: bobs_host
  port: 6182
stake_amount: 1
```

`aptos`CLIを使用してこれを生成するには、

1. あなたのバリデータのキーを生成します

```
cargo run --package aptos -- genesis generate-keys --output-dir bobs
```

2. あなたの`ValidatorConfiguration`を生成します

```
cargo run --package aptos -- \\
    genesis set-validator-configuration \\
    --keys-dir bobs \\
    --username bob \\
    --validator-host bobs_host:6180 \\
    --full-node-host bobs_host:6180 \\
    --local-repository-dir .
```

3. 最後のコマンドは、`genesis.blob`生成のため他の参加者へ配布する必要がある`bob.yaml`ファイルを生産します。

### ジェネシスとウェイポイントを生成する

`genesis.blob`とウェイポイントは`layout`ファイル、個々の各`ValidatorConfiguration`ファイル、フレームワークリリースを取得した後生成できます。前の段階で提供された`ValidatorConfiguration`段階が`genesis.blob`の生成のための配布物と同じであることを検証することが重要です。
不一致がある場合は、すべての参加者に通知します。

`genesis.blob`とウェイポイントを生成するには、

- `layout`ファイルをディレクトリ (例:`genesis`)へ配置します。
- 全ての`ValidatorConfiguration`ファイルを`genesis`ディレクトリへ配置します。
- `ValidatorConfiguration`ファイルが`layout`ファイル内の`users`のセット下へリストされていることを確認します。
- `genesiss`ディレクトリ内に`framework`ディレクトリを作成し、フレームワークリリース`.mv`ファイルをその`framework`ディレクトリに配置します。
- `aptos`CLIを使用してジェネシスとウェイポイントを生成します。

```
cargo run --package aptos -- genesis generate-genesis --local-repository-dir genesis
```

### `aptos-node`の開始

`genesis.blob`とウェイポイントを生成したら、それらをバリデーターとフルノードの構成ディレクトリに配置し、あなたのバリデーターとフルノードを開始します。