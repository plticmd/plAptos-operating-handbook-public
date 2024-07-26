---
title: "Running a Local Network"
---

# CLIAptos CLI経由でローカルネットワークを実行する

ローカルネットワークは、コードをテストする時役立ちます。メインネットのようなAptosネットワークにはどのプロダクションも接続されていませんが、主に次の3つの事由で役立ちます。

1. **レート制限なし:** Node API、Indexer API、Faucet等のホストされたサービスとレート制限なしでやり取りして、テストを高速化できます。
2. **再現性:** 特定のオンチェーンシナリオを設定し、いつでもネットワークを最初から再起動して白紙の状態に戻す事ができます。
3. **高有用性**: Aptosのdevnetおよびtestnetネットワークは定期的にアップグレードされるため、その間は利用できない場合があります。ローカル開発ネットワークは、インターネットにアクセス出来ない場合でも常に利用できます。

# ローカルネットワークの開始

1. [Aptos CLI](../install-cli/index.md)がインストールされていることを確認してください。 
2. [Docker](https://docs.docker.com/get-docker/)がインストールされていることを確認してください。
   1. これは、インデクサーAPIを実行して本番環境の様な環境を作成するためにのみ必要です。Aptos SDK等の多くのダウンストリームツールは、インデクサーAPIに依存しています。
   2. 自動更新を取得するため、Dockerは[Dockerデスクトップ](https://www.docker.com/products/docker-desktop/)経由でインストールすることをお勧めします。
3. Dockerを起動します。
4. プライベートネットワークを開始するには、新しいターミナルで以下のコマンドを実行します。

```bash
aptos node run-local-testnet --with-indexer-api
```

:::caution
注: 名前(`local-testnet`)にも関わらず、これは Aptosテストネットで何もせず、マシンで完全にローカルなネットワークを実行します。
:::

以下と同様の出力が表示されることが予想されます。

```
Readiness endpoint: http://0.0.0.0:8070/

Indexer API is starting, please wait...
Node API is starting, please wait...
Transaction stream is starting, please wait...
Postgres is starting, please wait...
Faucet is starting, please wait...

Completed generating configuration:
        Log file: "/Users/dport/.aptos/testnet/validator.log"
        Test dir: "/Users/dport/.aptos/testnet"
        Aptos root key path: "/Users/dport/.aptos/testnet/mint.key"
        Waypoint: 0:397412c0f96b10fa3daa24bfda962671c3c3ae484e2d67ed60534750e2311f3d
        ChainId: 4
        REST API endpoint: http://0.0.0.0:8080
        Metrics endpoint: http://0.0.0.0:9101/metrics
        Aptosnet fullnode network endpoint: /ip4/0.0.0.0/tcp/6181
        Indexer gRPC node stream endpoint: 0.0.0.0:50051

Aptos is running, press ctrl-c to exit

Node API is ready. Endpoint: http://0.0.0.0:8080/
Postgres is ready. Endpoint: postgres://postgres@127.0.0.1:5433/local_testnet
Transaction stream is ready. Endpoint: http://0.0.0.0:50051/
Indexer API is ready. Endpoint: http://127.0.0.1:8090/
Faucet is ready. Endpoint: http://127.0.0.1:8081/

Applying post startup steps...

Setup is complete, you can now use the localnet!
```

5. `Setup is complete, you can now use the localnet!`の最終行を待ちます。

   :::caution
   エラーが発生した場合は、以下の[一般的なエラー](#common-errors-on-network-startup)セクションへ進んで下さい。
   :::

上記の出力例から分かる様に、ローカルネットワークが実行されると、以下のサービスへアクセス出来ます。

- [ノードAPI](../../../nodes/aptos-api-spec.md): これはノード上で直接実行されるREST APIです。トランザクションの送信などのコア書き込み機能と、アカウントリソースやMoveモジュール情報の読み取り等の限定された読み取り機能を有効にします。
- [インデクサーAPI](../../../indexer/api/index.md):これはインデックス付ブロックチェーンデータへの豊富な読み取りアクセスを提供する[GraphQL](https://graphql.org/)APIです。
上記のインデクサーAPIのURL[http://127.0.0.1:8090](http://127.0.0.1:8090/)をクリックすると、インデクサーGraphQL APIのクエリに役立つWeb UIであるHasuraコンソールが開きます。
- [トランザクションストリームサービス](../../../indexer/txn-stream/index.md): これは、インデクサーAPIが使用するトランザクションのgRPCストリームです。これは[カスタムプロセッサ](../../../indexer/custom-processors/index.md)を開発している場合にのみ関係します。
- [Postgres](https://www.postgresql.org/): 
これは、インデクサープロセッサが書き込むデータベースです。インデクサーAPIはこのデータベースから読み取ります。
- [フォーセット](../../../reference/glossary.md#faucet): これを使用して、ローカル ネットワーク上のアカウントへ資金を投入できます。

ネットワークのこれらのサブコンポーネントを実行したくない場合は、それらを無効にするフラグがあります。

スクリプトを書いていて、ローカル ネットワークがすべてのサービスに対応するまで待機したい場合は、 `http://127.0.0.1:8070`へGETリクエスト出来ます。最初は http コード[503](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503)が返されます。[200](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200)が返された場合は、全てのサービスが準備完了である事を意味します。
 
ローカル ネットワークを起動するときに渡すことができる異なるフラグや、特定のサービスが実行されるポートの変更などの構成設定の詳細については、help コマンドを実行してください。 

```bash
aptos node run-local-testnet --help
```

## ネットワーク起動時の一般的なエラー

:::tip
ローカル ネットワークを正常に起動した場合は[ローカル ネットワークの使用](#using-the-local-network)へ進みます。
:::

### アドレスはすでに使用されています

```bash
panicked at 'error binding to 0.0.0.0:8080: error creating server listener: Address already in use (os error 48)
```

これは、ローカルネットワークが必要とするポートの1つが既に別のプロセスによって使用されている事を意味します。

Unixシステムでこれを修正するには、以下が可能です。

1. `lsof -i :8080`を実行して、プロセスの名前と PIDを識別します。
2. `kill <pid>`を実行し、PIDが分かったら実行して、そのポートを解放します。

### 開いているファイルが多すぎるエラー

```bash
panicked at crates/aptos/src/node/local_testnet/logging.rs:64:10:
called `Result::unwrap()` on an `Err` value: Os { code: 24, kind: Uncategorized, message: \"Too many open files\" }"""
```

これは、システム上で開いているファイルが多過ぎる亊を意味します。多くの Unix システムでは、次のようなものを`.zshrc`追へ加する事で、開いているファイルの最大数を増やす事が出来ます。

```bash
ulimit -n 32768
```

### Dockerは利用出来ません

```
Unexpected error: Failed to apply pre-run steps for Postgres: Docker is not available, confirm it is installed and running. On Linux you may need to use sudo
```

これをデバッグするには、以下の修正を試してください。

1. `docker --version`を実行して、docker 
がインストールされていることを確認します
2. `docker info`を実行してDockerデーモンが実行されていることを確認します。(このエラーが`Cannot connect to the Docker daemon`と言っている場合、Dockerは実行されていません)
3. Dockerに接続するためのソケットがマシン上のデフォルトの場所に存在する事を確認してく下さい。例えば、Unix システムでは、`/var/run/docker.sock`が存在する必要があります。
   1. そのファイルが存在しない場合は、Dockerデスクトップを開いて
   `Settings -> Advanced -> Allow the default Docker socket to be used.`を有効にします。
   2. または、`docker context inspect | grep Host`を実行してDockerソケットの場所を見つける事が出来ます。そして、`sudo ln -s /Users/dport/.docker/run/docker.sock /var/run/docker.sock`を実行して、その場所をデフォルトの場所へsymlinkします。

## ローカルネットワークを使う

ネットワークが稼働しているので、他のネットワークと同様に使用出来ます。
 
したがって、以下の様にローカルプロファイルを作成出来ます。 

```bash
aptos init --profile <your-profile-name> --network local
```

その後、そのプロファイルを今後使用するコマンドに使用できます。例えば[`hello_blockchain`](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/hello_blockchain)パッケージのような Moveモジュールをローカルネットワークへ公開したい場合は、次のコマンドを実行できます。

```bash
aptos move publish --profile <your-profile-name> --package-dir /opt/git/aptos-core/aptos-move/move-examples/hello_blockchain --named-addresses HelloBlockchain=local
```

### TypeScript SDKを構成する

TypeScript SDKでローカルネットワークを使用する場合、クライアントオブジェクト(`Aptos`)を初期化する時、ローカルネットワークURLを使用出来ます。

```tsx
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

const network = Network.LOCAL;
const config = new AptosConfig({ network });
const client = new Aptos(config);
```

### ローカルネットワークの再設定

開発中、ローカルネットワークを初期状態へリセットすると便利な場合があります。以下へ例を示します。

- Move モジュールに下位互換性のない変更を加えたので、名前を変更したり新しいアカウントを使用したりせず再デプロイしたいと考えています。
- あなたは[カスタムインデクサープロセッサ](https://aptos.dev/indexer/custom-processors/)を構築しており、新しいネットワークを使用してインデックスしたいと考えています。
- アカウント、オブジェクトなど、チェーン上の全ての状態をクリアしたいと考えています。

真新しいローカルネットワークを開始するには、`--force-restart`フラグを使用します。

```bash
aptos node run-local-testnet --force-restart

```

その後、作業内容を誤って削除しない様、本当にチェーンを再開するかどうかを確認するメッセージが表示されます。

```bash
Are you sure you want to delete the existing chain? [yes/no]
> yes
```

プロンプトを表示したくない場合は、 `--assume-yes`も同様に含めます。

```bash
aptos node run-local-testnet --force-restart --assume-yes
```