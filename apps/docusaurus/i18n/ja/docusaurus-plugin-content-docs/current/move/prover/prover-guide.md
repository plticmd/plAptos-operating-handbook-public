---
title: "Move Proverユーザーガイド"
---

これはMove Proverのユーザーガイドです。このドキュメントには [Move仕様言語](spec-lang.md)が付属しています。詳細は、以下のセクションを御覧下さい。

## Move Proverの実行

Move Proverは[Aptos CLI](../../tools/aptos-cli/use-cli/use-aptos-cli.md)を介して呼び出されます。CLIを呼び出すには、[_Move パッケージ_](../book/packages.md)が配置されている必要があります。

最も単純なケースでは、Moveパッケージは、一連の`.move`ファイルを含むディレクトリと、名前のマニフェスト`Move.toml`によって定義されます。`aptos move init --name <name>`コマンドを実行すると、特定の場所へ新しいMoveパッケージを作成出来ます。

パッケージが存在したら、テストするディレクトリから、またはそのパスを`--package-dir`引数へ指定してMove Prover を呼び出します。

- 現在のディレクトリ内のパッケージのソースを証明します。

  ```shell
  aptos move prove
  ```

<!-- Prove the sources of the package at &lt;path&gt;:

Prove the sources of the package in a specific directly: -->
* パッケージのソースを特定して直接証明します。

  ```shell
  aptos move prove --package-dir <path>
  ````

「Aptos CLIの使用」の[Moveの証明](../../move/move-on-aptos/cli.md#proving-move) セクションで、出力例とその他の利用可能なオプションを御覧下さい。

### ターゲットフィルタリング

デフォルトでは、`aptos move prove`コマンドはパッケージの全てのファイルを検証します。大規模なパッケージの反復開発中は、以下ような`-f` (`--filter`)オプションを使用して特定のファイルの検証へ集中すると効果的です。

```shell script
aptos move prove -f coin
```

通常、`-f`オプションへ提供された文字列がソースのファイル名のどこかへ含まれている場合、ソースは検証へ含められます。

> 注: Move Proverは、モジュールをひとつずつ検証する場合と全てを一度で検証する場合で意味上の違いが無いようにします。

ただし、全てのモジュールを検証する事が目的である場合は、順次検証するより1回の`aptos move prove`実行で検証する方が、著しく高速です。

### 証明者オプション

Move Proverは、`aptos move prove <options>`の呼び出しで渡すオプション(上記のフィルターオプション等)がいくつか有ります。最もよく使用されるオプションは`-t`(`--trace`)オプションで、<!-- これは、エラーが発生した時Move Proverがより多くの診断を生成する原因となります。 -->これにより、エラーが発生した時Move Proverがより多くの診断を生成します。

```shell script
aptos move prove -f coin -t
```
`aptos move prove --help`の実行で、全てのコマンドラインオプションのリストを表示出来ます。

### Prover構成ファイル

`Prover.toml`という名前のMove Prover構成ファイルを作成する事も出来ます。このファイルはパッケージディレクトリのルートのマニフェストファイルと並行して存在します。例えば、パッケージのトレースをデフォルトで可能とするには、`Prover.toml`ファイルを以下の構成へ追加します。 

```toml
[prover]
auto_trace_level = "VerifiedFunction"
```

以下の例`.toml`で最もよく使用されるオプションを見つけて下さい。これを切り取って貼り付け、適宜採用出来ます(適宜、表示された値のデフォルトを調整します)。

```toml
# 几長レベル
# 可能な値: "ERROR", "WARN", "INFO", "DEBUG". 各レベルは前のレベルの出力を含有します。
verbosity_level = "INFO"

[prover]
# 自動トレースレベルの設定, Move Proverが検証エラーに対し生成する分析を強化する。
# 可能な値: "Off", "VerifiedFunction", "AllFunctions"
auto_trace_level = "Off"

# 分析を報告するための最小限の厳格レベル
# 可能な値: "Error", "Warning", "Note"
report_severity = "Warning"

[バックエンド]
# ソルバーバックエンドの秒単位タイムアウト。注意: これはソフトタイムアウトであり常時尊重されるものではありません。 
vc_timeout = 40

# ソルバーバックエンドのランダムシード。ソルバーは試行錯誤を行っているため、異なるシードでは検証ランタイムが異なる場合があります。 
random_seed = 1

# 検証条件の同時チェックを仮定するプロセッサーコアの数。
proc_cores = 4
```

> ヒント: ローカル検証の場合、ターンアラウンド サイクルを高速化するため、積極的な数(実際のコア数)へ`proc_cores`を設定する事をお勧めします。

## Prover診断

Move Proverが検証エラーを発見すると、コンパイラやデバッガと同様のスタイルで標準出力へ診断結果を出力します。以下では、進化する例に基づいて、異なる種類の診断の解説をします。
  
```move
module 0x42::m {
    struct Counter has key {
        value: u8,
    }

    public fun increment(a: address) acquires Counter {
        let r = borrow_global_mut<Counter>(a);
        r.value = r.value + 1;
    }

    spec increment {
        aborts_if !exists<Counter>(a);
        ensures global<Counter>(a).value == old(global<Counter>(a)).value + 1;
    }
}
```

異なる種類の診断を解説する際、この例を変更します。
We will modify this example as we demonstrate different types of diagnoses.

### 予期しない中止

上記の例で急にMove Proverを実行すると、以下のエラーが発生します。

```
error: abort not covered by any of the `aborts_if` clauses
   ┌─ m.move:11:5
   │
 8 │           r.value = r.value + 1;
   │                             - abort happened here with execution failure
   ·
11 │ ╭     spec increment {
12 │ │         aborts_if !exists<Counter>(a);
13 │ │         ensures global<Counter>(a).value == old(global<Counter>(a)).value + 1;
14 │ │     }
   │ ╰─────^
   │
   =     at m.move:6: increment
   =         a = 0x29
   =     at m.move:7: increment
   =         r = &mmm.Counter{value = 255u8}
   =     at m.move:8: increment
   =         ABORTED

{
  "Error": "Move Prover failed: exiting with verification errors"
}
```

Move Proverは、`u8`の値255へ1を加算するとオーバーフローが発生するサンプルカウンタを生成しました。このオーバーフローは、関数の仕様が中止動作を呼び出しているものの、関数が中止する条件が仕様でカバーされていない場合発生します。

実際、`aborts_if !exists<Counter>(a)`ではリソースが存在しないため発生する中止のみをカバーし、算術オーバーフローが原因で発生する中止はカバーしません。

上記を修正して、以下の条件を追加してみましょう。

```move
module 0x42::m {
  spec increment {
      aborts_if global<Counter>(a).value == 255;
      ...
  }
}
```

これで、Move Proverはエラー無しで成功します。

### 事後条件での失敗

上記の例の`ensures`条件へエラーを注入してみましょう。

```move
module 0x42::m {
  spec increment {
      ensures global<Counter>(a).value == /*old*/(global<Counter>(a).value) + 1;
  }
}
```

これで、Move Proverは次の診断を生成します。

```
error: post-condition does not hold
   ┌─ m.move:14:9
   │
14 │         ensures global<Counter>(a).value == /*old*/(global<Counter>(a).value) + 1;
   │         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   │
   =     at m.move:6: increment
   =         a = 0x29
   =     at m.move:7: increment
   =         r = &mmm.Counter{value = 0u8}
   =     at m.move:8: increment
   =     at m.move:9: increment
   =     at m.move:12: increment (spec)
   =     at m.move:15: increment (spec)
   =     at m.move:13: increment (spec)
   =     at m.move:14: increment (spec)

{
  "Error": "Move Prover failed: exiting with verification errors"
}
```

エラーが何であるかは分かっていますが(注入したばかりなので)出力では特に分かりません。これは、`ensures`条件が実際はどの値で評価されたのか直接確認出来ないためです。これを確認するには、`-t( --trace)`オプションを使用します。このオプションは、ソルバーにとって検証問題が少し難しくなるため、デフォルトでは有効となっていません。
 
`--trace`オプションの代わり、もしくは`--trace`オプションに加え、条件で組み込み関数`TRACE(exp)`を使用して、検証失敗時に値を出力する必要がある式を明示的にマークする事が出来ます。 

> 注意: 量化記号に依存する式は追跡出来ません。また、仕様関数に現れる式も現在は追跡出来ません。

## Move Proverのデバッグ

Move Proverは、バグや欠陥のある進化するツールです。Move Proverが基盤となるバックエンドへ渡す出力へ基づいて、問題をデバッグする必要がある場合があります。オプション`--dump`を渡すとMove Proverはコンパイル中、前者が変換されるためオリジナルのMoveバイトコードとMove Proverバイトコードを出力します。

