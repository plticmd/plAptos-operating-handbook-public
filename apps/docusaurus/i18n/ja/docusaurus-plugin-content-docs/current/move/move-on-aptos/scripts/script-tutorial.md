---
title: "Move Scripts Tutorial"
---

# Moveスクリプト

このチュートリアルでは、[Moveスクリプト](../../book/modules-and-scripts.md)の作成方法と実行方法について解説します。Moveスクリプトを使用すると、公開されたMoveモジュールインターフェイス全体で一連のコマンドを実行できます。

スクリプトの詳細は、[Moveスクリプトドキュメント](./index.md)を御覧下さい。

## 使用例

以下の例は、[aptos_coin.move](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/aptos_coin.move) モジュールの関数を呼び出して、宛先アカウントの残高が`desired_balance`未満であることを確認し、`desired_balance`未満である場合は`desired_balance`まで補充します。

```move
script {
    use std::signer;
    use aptos_framework::aptos_account;
    use aptos_framework::aptos_coin;
    use aptos_framework::coin;

    fun main(src: &signer, dest: address, desired_balance: u64) {
        let src_addr = signer::address_of(src);

        addr::my_module::do_nothing();

        let balance = coin::balance<aptos_coin::AptosCoin>(src_addr);
        if (balance < desired_balance) {
            aptos_account::transfer(src, dest, desired_balance - balance);
        };
    }
}
```

## 実行

何を達成したいかが分かったら、以下を決定する必要が有ります。

- これらのファイルをどこへ置けば良いか?
- 何という名前を付けるのか？
- `Move.toml`は必要か?
- CLIを使用してスクリプトをどうやって実行するか?

[Aptos CLI](../../../tools/aptos-cli/use-cli/use-aptos-cli.md)を使用して、Move スクリプトを実行する方法をステップバイステップの例で解説します。

1. 作業用の新しいディレクトリを作成します。

   ```sh
   mkdir testing
   cd testing
   ```

2. AptosCLIをセットアップして[アカウントを作成します](../../../tools/aptos-cli/use-cli/use-aptos-cli.md#use-the-aptos-cli):

   ```sh
   aptos init --network devnet
   ```

既存の秘密鍵( `0xbd944102bf5b5dfafa7fe865d8fa719da6a1f0eafa3cd600f93385482d2c37a4`の様な)を再利用する事も、アカウント設定の一環として新しい秘密鍵を生成する事も出来ます。例えばアカウントが以下の例の様な場合。

   ```sh
   ---
   profiles:
     default:
       private_key: "0xbd944102bf5b5dfafa7fe865d8fa719da6a1f0eafa3cd600f93385482d2c37a4"
       public_key: "0x47673ec83bb254cc9a8bfdb31846daacd0c96fe41f81855462f5fc5306312b1b"
       account: cb265645385819f3dbe71aac266e319e7f77aed252cacf2930b68102828bf615
       rest_url: "https://api.devnet.aptoslabs.com"
       faucet_url: "https://faucet.devnet.aptoslabs.com"
   ```

3. 同じディレクトリから、新しいMoveプロジェクトを初期化します。

   ```sh
   aptos move init --name run_script
   ```

4. 上記のサンプル スクリプトを含む`my_script.move`ファイルを`testing/`ディレクトリの`sources/`サブディレクトリに作成します。以下の例のような`my_module.move`ファイルも作成します。

   ```
   module addr::my_module {
       public entry fun do_nothing() { }
   }
   ```

   結果は、以下の様なファイル構造となります。
   

   ```
   testing/
      Move.toml
      sources/
         my_script.move
         my_module.move
   ```

5. スクリプトをコンパイルします。

   ```
   $ aptos move compile --named-addresses addr=cb265645385819f3dbe71aac266e319e7f77aed252cacf2930b68102828bf615
   Compiling, may take a little while to download git dependencies...
   INCLUDING DEPENDENCY AptosFramework
   INCLUDING DEPENDENCY AptosStdlib
   INCLUDING DEPENDENCY MoveStdlib
   BUILDING run_script
   {
     "Result": [
       "cb265645385819f3dbe71aac266e319e7f77aed252cacf2930b68102828bf615::my_module"
     ]
   }
   ```

   注意:`--named-addresses`引数の使用方法。
   <!-- This is necessary because in the code we refer to this named address called `addr`. -->
   <!-- これは、参照するコード内でこの名前付きアドレスが`addr`と呼ばれるので必要です。 -->
   <!-- This is necessary because we refer to this named address called `addr` in the code. -->
   これが必要なのはコード内で`addr`という名前付きアドレスを参照するためです。

   コンパイラーは、これが何を参照しているかを認識する必要があります。このCLI引数を使用する代わり、`Move.toml`へこの様な引数を配置出来ます。

   ```
   [addresses]
   addr = "cb265645385819f3dbe71aac266e319e7f77aed252cacf2930b68102828bf615"
   ```

6. コンパイルされたスクリプトを実行します。
   ```
   $ aptos move run-script --compiled-script-path build/my_script/bytecode_scripts/main.mv --args address:b078d693856a65401d492f99ca0d6a29a0c5c0e371bc2521570a86e40d95f823 --args u64:5
   Do you want to submit a transaction for a range of [17000 - 25500] Octas at a gas unit price of 100 Octas? [yes/no] >
   yes
   {
     "Result": {
       "transaction_hash": "0xa6ca6275c73f82638b88a830015ab81734a533aebd36cc4647b48ff342434cdf",
       "gas_used": 3,
       "gas_unit_price": 100,
       "sender": "cb265645385819f3dbe71aac266e319e7f77aed252cacf2930b68102828bf615",
       "sequence_number": 4,
       "success": true,
       "timestamp_us": 1683030933803632,
       "version": 3347495,
       "vm_status": "Executed successfully"
     }
   }
   ```

注意:コンパイルされたスクリプトのパスは`build/my_script/`ではなく`build/run_script/`下であること。これは、`Move.toml`に含まれるプロジェクト名を使用しているためです。プロジェクト名は`aptos move init --name run_script`を実行した時からの`run_script`です。
<!-- (????) -->
<!-- which is run_script from when we ran aptos move init --name run_script. -->

このドキュメントで使用されている[コード](https://github.com/banool/move-examples/tree/main/run_script)を御覧下さい。完全な例が、ユーザーが作成したMoveモジュールに依存するMoveクリプトの使用方法についても解説しています。

Aptos開発者ディスカッションのAptos CLIのかわりに[Rust SDK](https://github.com/aptos-labs/aptos-developer-discussions/discussions/24)を使用してこれを行う方法も御覧下さい。

## 高度な...

スクリプトをより効率的な方法で実行する事も出来ます。`aptos move compile`と`aptos move run-script --compiled-script-path`を別々で実行するのではなく、ただこれをやるだけです。
```
$ aptos move run-script --script-path sources/my_script.move --args address:b078d693856a65401d492f99ca0d6a29a0c5c0e371bc2521570a86e40d95f823 --args u64:5
```

これにより、両方の手順がひとつのCLIコマンドで行われますが、[問題](https://github.com/aptos-labs/aptos-core/issues/5733)があります。このため、今のところは、前の2段階のアプローチを使用する事をお勧めします。