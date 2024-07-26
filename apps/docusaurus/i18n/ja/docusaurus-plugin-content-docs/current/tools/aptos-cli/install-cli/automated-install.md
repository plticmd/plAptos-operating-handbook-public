---
title: "Install CLI by Script"
---

# scriptでCLIをインストールする

この`aptos`ツールは、Aptos ブロックチェーン上で開発し、Move コントラクトをデバッグし、ノード操作を実行するためのコマンド ライン インターフェイス (CLI) です。このドキュメントでは自動インストール スクリプトを使用して`aptos`CLI ツールをインストールする方法について解説します。

## 前提条件

まず、Python 3.6 以降がインストールされていることを確認します。

```
$ python3 --version
Python 3.9.13
```

インストールされていない場合は[python.org](https://www.python.org/downloads/)でインストール手順を参照してください。

## インストール

以下の手順に従って、さまざまなオペレーティング システムに Aptos CLI をインストールします。オペレーティング システムに関係なく、常に Aptos CLI の最新リリースが表示されます。

<details>
<summary>macOS / Linux / Linux 用Windows サブシステム (WSL)</summary>

:::tip
これらの手順は、Ubuntu 20.04、Ubuntu 22.04、Arch Linux、macOS (ARM)、および WSL でテストされており、`curl`または`wget`がインストールされていてスクリプトをダウンロード出来ることを前提としています。
:::

ターミナルで次の`curl`コマンドを実行します。

```
curl -fsSL "https://aptos.dev/scripts/install_cli.py" | python3
```

または`wget`:

```
wget -qO- "https://aptos.dev/scripts/install_cli.py" | python3
```

:::tip
このメッセージが表示された場合は:

```
Couldn't find distutils or packaging. We cannot check the current version of the CLI. We will install the latest version.
```

まず`packaging`をインストールする事を考えて下さい。:

```Shell
pip3 install packaging
```

:::

</details>

<details>

<summary>Windows (NT)</summary>

:::tip
これらの手順は Windows 11 でテストされています。
:::

PowerShell の場合:

```Shell
iwr "https://aptos.dev/scripts/install_cli.py" -useb | Select-Object -ExpandProperty Content | python3
```

:::tip
`ModuleNotFoundError`エラーが発生した場合は: `No module named packaging`(名前付きパッケージングモジュールがありません)まず、`packaging`をインストールする必要があります。
```Shell
pip3 install packaging
```

:::

</details>

## 更新

Aptos CLI の更新をトリガーするには、`aptos update`を実行し、成功を示す出力を確認します。

```
{
  "Result": "CLI already up to date (v1.0.4)"
}
```

あるいは、`python3 install_cli.py`インストール スクリプトを再度実行して次のような出力を受け取り、CLI を更新することもできます。

```
Latest CLI release: 1.0.4
Currently installed CLI: 1.0.4

The latest version (1.0.4) is already installed.
```
