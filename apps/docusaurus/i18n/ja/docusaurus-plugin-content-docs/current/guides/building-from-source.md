---
title: "Building Aptos From Source"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ソースから Aptos を構築する

[バイナリリリースは利用可能です](../tools/aptos-cli/install-cli/index.md)が、ソースからビルドしたり、Aptosツールで開発したりする場合は、以下の様にします。

## サポートされているオペレーティングシステム

AptosはLinux、macOS、Windows等、様々なオペレーティングシステムで構築出来ます。
Aptos は Linux と macOS で広範囲でテストされていますが、Windowsではそれほどテストされていません。私達は以下のバージョンを使用しています。

- Linux - Ubuntuバージョン20.04と22.04
- macOS - macOS Monterey以後
- Microsoft Windows - Windows10、11、Windowsサーバー2022+

## Aptosコアリポジトリをクローンする 

1. [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)をインストールします。aptos-coreリポジトリをクローンするにはGitが必要なので、続行する前にインストールする必要があります。

公式[Gitウェブサイト](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)の指示に従いインストール出来ます。

2. Aptosリポジトリをクローンします。Aptosリポジトリ(repo)をクローンするには、まずコマンドラインプロンプト (macOS/Linuxの場合はターミナル、Windowsの場合はPowerShell)を開く必要があります。次に、次のコマンドを実行して、GitHubからGitリポジトリをクローンします。

   ```
   git clone https://github.com/aptos-labs/aptos-core.git
   ```

3. 今から _changing directory_ か`cd`を使い、新しく作成された`aptos-core`ディレクトリへ移動します。

   ```
   cd aptos-core
   ```

### (オプション)リリースブランチをチェックアウトする

devnet
オプションとして、リリースブランチをチェックアウトしてAptosノードをインストールします。最初の開発で`devnet`をチェックアウトする事をお勧めします。その違いについては[ネットワークの選択](./system-integrators-guide.md#choose-a-network)を御覧下さい。

<details>
<summary>リリースブランチ</summary>
<Tabs groupId="network">
    <TabItem value="devnet" label="Devnet">

    git checkout --track origin/devnet

</TabItem>
    <TabItem value="testnet" label="テストネット" default>

    git checkout --track origin/testnet

</TabItem>
<TabItem value="mainnet" label="メインネット">

    git checkout --track origin/mainnet

</TabItem>
</Tabs>
</details>

## build dependenciesの設定

Aptosコアの構築、テスト、検査で必要な依存関係をインストールして開発環境を準備します。これらの依存関係をインストールするため選択したメカニズムと関係なく、**ツールチェーン全体を最新の状態に保つことが不可欠です**。
後で問題が発生した場合は、全てのパッケージを更新して再試行してください。

<details>
<summary>macOS</summary>

**> 自動スクリプトの使用**

1. `brew`パッケージ マネージャーがインストールされていることを確認してください: https://brew.sh/
2. 開発セットアップ スクリプトを実行して環境を準備します。`./scripts/dev_setup.sh`
3. 現在のシェル環境を更新します: `source ~/.cargo/env`.

:::tip
スクリプトで利用可能なオプションは`./scripts/dev_setup.sh --help`の実行で確認出来ます。
:::

**> 依存関係の手動インストール**

上記のスクリプトが機能しない場合は、これらを手動でインストールできますが、**お勧めしません**。

1. [Rust](https://www.rust-lang.org/tools/install)
2. [CMake](https://cmake.org/download/)
3. [LLVM](https://releases.llvm.org/)
4. [LLD](https://lld.llvm.org/)

</details>

<details>
<summary>Linux</summary>

**> 自動スクリプトの使用**

1. 開発セットアップ スクリプトを実行して環境を準備します。: `./scripts/dev_setup.sh`
2. 現在のシェル環境を更新します。: `source ~/.cargo/env`

:::tip
スクリプトで利用可能なオプションは`./scripts/dev_setup.sh --help`の実行で確認出来ます。
:::

**> 依存関係の手動インストール**

上記のスクリプトが機能しない場合は、これらを手動でインストールできますが、**お勧めしません**。

1. [Rust](https://www.rust-lang.org/tools/install).
2. [CMake](https://cmake.org/download/).
3. [LLVM](https://releases.llvm.org/).
4. [libssl-dev](https://packages.ubuntu.com/jammy/libssl-dev) and [libclang-dev](https://packages.ubuntu.com/jammy/libclang-dev)

</details>

<details>
<summary>Windows</summary>

**> 自動スクリプトの使用**

1. 管理者として PowerShell ターミナルを開きます。
2. 開発セットアップ スクリプトを実行して環境を準備します。: `PowerShell -ExecutionPolicy Bypass -File ./scripts/windows_dev_setup.ps1`
3. すべての依存関係をインストールした後、新しいPowerShellターミナルを開きます。

**> 依存関係の手動インストール**

1. [Rust](https://www.rust-lang.org/tools/install)をインストールします。
2. [LLVM](https://releases.llvm.org/)をインストールします。[最新のビルド済みリリース](https://github.com/llvm/llvm-project/releases/tag/llvmorg-15.0.7)は、GitHubリポジトリを御覧下さい。
3. [Microsoft Visual Studio Build Tools for Windows](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022)をインストールします。セットアップ中に「C++によるデスクトップ開発」と3つの追加オプション(MSVC C++ビルドツール、Windows10/11SDK、Windows用C++CMakeツール)を選択します。
4. Windows ARMの場合は[Visual Studio](https://visualstudio.microsoft.com/vs)をインストールします。
5. Visual Studio/Build Tools のインストール時にまだインストールされていない場合は[CMake](https://cmake.org/download/)をインストールします。
6.全ての依存関係をインストールした後、新しいPowerShellターミナルを開きます。 

</details>

### 追加のツール

macOS または Linux のセットアップで`scripts/dev_setup.sh`が必要な場合はオプションで追加のツールが利用出来ます。

#### TypeScript

[リリースされたSDKの使用は、npm/pnpm/yarnから実現できます。](/sdks/ts-sdk/index.md).

## Aptosの構築

作業環境があるかどうかを確認する最も簡単な方法は、全てをビルドしてテストを実行する事です。

```bash
cargo build
cargo test -- --skip prover
```

上記のMove Proverツールをインストールしている場合は、proverテストをスキップする必要はありません。

特定のツールのドキュメントには、`cargo build`と`cargo run`のための推奨パターンが有ります。

- [ローカル開発ネットワークを実行する](../guides/local-development-network.md)
- [インデクサー](../indexer/legacy/indexer-fullnode.md)
- [ノードヘルスチェッカー](../nodes/measure/node-health-checker.md)
- [ローカルマルチノードネットワークの実行](running-a-local-multi-node-network.md)
