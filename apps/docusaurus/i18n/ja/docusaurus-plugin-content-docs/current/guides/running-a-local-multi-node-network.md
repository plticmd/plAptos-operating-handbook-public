---
title: "Run a Local Multi-node Network"
slug: "running-a-local-multi-node-network"
---

# ローカルマルチノードネットワークを実行する

このガイドでは、複数のバリデータノードとバリデータフルノードを使用してローカルネットワークを実行する方法を解説します。[Aptos Forge CLI](https://github.com/aptos-labs/aptos-core/tree/main/testsuite/forge-cli/src)を使用します。 

:::tip テストネットワークでのみ使用
このガイドで解説する方法は、マルチノードローカルネットワークのテストネットワークでのみ使用して下さい。このガイドを実稼働環境へのデプロイで使用しないでください。現在、マルチノードネットワーク向けのガイドはこれだけです。

単一ノードでローカルネットワークをデプロイする場合は、「CLI を使用してローカル開発ネットワークを実行する」
 [CLIを使用してローカル開発ネットワークを実行する](../guides/local-development-network.md)を御覧下さい。
:::

## 取りかかる前の準備

このガイドは[ソースからAptosを構築する](building-from-source.md)手順を完了していることを前提としています。

## 複数のバリデーターを実行する

複数のローカルバリデーターをデプロイするには、以下を実行します。

```bash
cargo run -p aptos-forge-cli \
        -- \
        --suite "run_forever" \
        --num-validators 4 test local-swarm
```

これで、それぞれ独自のプロセスで実行される4つのバリデーターのローカルネットワークが開始されます。ネットワークは、手動で終了しない限り永久に実行されます。
 
ターミナル出力には、バリデータファイル(例えば、ジェネシスファイル、ログ、ノード構成など)の場所と、各ノードの起動のため実行されたコマンドが表示されます。起動時は各ノードのプロセスID(PID)とサーバーアドレス(REST API等)も表示されます。例えば、上記のコマンドを実行すると、以下の様に表示されます。

```bash
...
2022-09-01T15:41:27.228289Z [main] INFO crates/aptos-genesis/src/builder.rs:462 Building genesis with 4 validators. Directory of output: "/private/var/folders/dx/c0l2rrkn0656gfx6v5_dy_p80000gn/T/.tmpq9uPMJ"
...
2022-09-01T15:41:28.090606Z [main] INFO testsuite/forge/src/backend/local/swarm.rs:207 The root (or mint) key for the swarm is: 0xf9f...
...
2022-09-01T15:41:28.094800Z [main] INFO testsuite/forge/src/backend/local/node.rs:129 Started node 0 (PID: 78939) with command: ".../aptos-core/target/debug/aptos-node" "-f" "/private/var/folders/dx/c0l2rrkn0656gfx6v5_dy_p80000gn/T/.tmpq9uPMJ/0/node.yaml"
2022-09-01T15:41:28.094825Z [main] INFO testsuite/forge/src/backend/local/node.rs:137 Node 0: REST API is listening at: http://127.0.0.1:64566
2022-09-01T15:41:28.094838Z [main] INFO testsuite/forge/src/backend/local/node.rs:142 Node 0: Inspection service is listening at http://127.0.0.1:64568
...
```

この出力の情報を使用して、単一のノードを停止して再起動することができます。
例えば、ノード`0`を停止して再起動するには、以下のコマンドを実行します。

```bash
kill -9 <Node 0 PID>
cargo run -p aptos-node \
        -- \
        -f <Location to the node 0 configuration file displayed above>
```

## フォーセットとミント

このテストネットワークでコインをミントするには、フォーセットを実行する必要があります。以下のコマンドで実行出来ます。

```bash
cargo run -p aptos-faucet-service -- run-simple --key <key> --node-url <node_url>
```

上記の値は以下の様に取得できます。

- `key`: swarmを開始すると、次の様な出力がありました: `The root (or mint) key for the swarm is: 0xf9f...`.これが`key`です。
- `node_url`: swarmを開始すると、次の様な出力がありました:`REST API is listening at: http://127.0.0.1:64566`. これが`node_url`です。

上記のコマンドは、ポート`8081`をリッスンしてローカルでフォーセットを実行します。このフォーセットを使用すると、テストアカウントへトークンを発行出来ます。例えば、
 
```bash
curl -X POST http://127.0.0.1:8081/mint?amount=<amount to mint>&pub_key=<public key to mint tokens to>
```

フォーセットサービスを使用するかわりに、フォーセットCLIを直接使用する事も出来ます。

```
cargo run -p aptos-faucet-cli -- --amount 10 --accounts <account_address> --key <private_key>
```

:::tip フォーセットとAptos CLI
フォーセットの仕組みは[README](https://github.com/aptos-labs/aptos-core/tree/main/crates/aptos-faucet)を御覧下さい。

既存の[Aptos CLI](../tools/aptos-cli/use-cli/use-aptos-cli.md)を使用する方法も御覧下さい。 
:::

## バリデーターフルノード

ネットワーク内でバリデータフルノードも実行するには、`--num-validator-fullnodes`フラグを使用します。例:

```bash
cargo run -p aptos-forge-cli \
        -- \
        --suite "run_forever" \
        --num-validators 3 \
        --num-validator-fullnodes 1 test local-swarm
```

## 追加の使用法

ツール使用オプション全部を表示する場合、以下を実行。

```bash
cargo run -p aptos-forge-cli --help
```
