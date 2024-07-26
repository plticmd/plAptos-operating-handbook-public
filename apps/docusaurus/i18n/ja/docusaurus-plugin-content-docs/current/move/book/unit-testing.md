# ユニットテスト

Moveのユニットテストでは、Moveソース言語へ3つの新しい注釈を追加します。

- `#[test]`
- `#[test_only]`
- `#[expected_failure]`

これらはそれぞれ、関数をテストとしてマークし、モジュールまたはモジュールメンバー(`use`、関数、または構造体)をテストのみに含めるコードとしてマークし、テストが失敗するという予測をマークします。これらの注釈は任意の可視性を持つ関数へ配置出来ます。

モジュールまたはモジュールメンバーが`#[test_only]`もしくは`#[test]`の注釈を付けられている場合は、テスト用でコンパイルされた場合を除き、コンパイルされたバイトコードには含まれません。

## テスト注釈 : その意味と使用法

`#[test]`及び`#[expected_failure]`注釈はどちらも#[expected_failure]、引数の有無に関わらず使用出来ます。

引数がない場合、`#[test]`注釈はパラメータの無い関数へのみ配置出来ます。この注釈は、この関数をユニット テストハーネスが実行するテストとしてマークするだけです。

```
#[test] // OK
fun this_is_a_test() { ... }

#[test] // テストが引数を取るのでコンパイルに失敗します
fun this_is_not_correct(arg: signer) { ... }
```

### 予測される失敗

テストには`#[expected_failure]`という注釈を付ける事も出来ます。この注釈はテストでエラーの発生が予測される事をマークします。

`abort`ステートメント (または失敗した`assert!`マクロ)のパラメータへ対応する`#[expected_failure(abort_code = <code>)]`で注釈を付ける事で、テストが特定の中止`<code>`で中止されてい事を確認出来ます。

`abort_code`のかわりに`expected_failure`は`arithmetic_error`、`major_status`、`vector_error`、`out_of_gas`等のプログラム実行エラーを特定出来ます。より具体的には、`minor_status`をオプションで特定出来ます。
 
特定の場所からのエラー発生が予測される場合は、その場所も`#[expected_failure(abort_code = <code>, location = <loc>)]`で指定出来ます。その後、テストが別のモジュールで正しいエラーで失敗した場合、テストも失敗します。注意:`<loc>`は`Self`(現在のモジュール内)または修飾名 (例:`vector::std`)に出来ます。

`#[test]`を持つ関数のみ、#`[expected_failure]`として注釈する事も出来ます。

```
module 0x42::example {
    #[test]
    #[expected_failure]
    public fun this_test_will_abort_and_pass() { abort 1 }

    #[test]
    #[expected_failure]
    public fun test_will_error_and_pass() { 1/0; }

    #[test]
    #[expected_failure(abort_code = 0, location = Self)]
    public fun test_will_error_and_fail() { 1/0; }

    #[test, expected_failure] // Can have multiple in one attribute. This test will pass.
    public fun this_other_test_will_abort_and_pass() { abort 1 }

    #[test]
    #[expected_failure(vector_error, minor_status = 1, location = Self)]
    fun borrow_out_of_range() { ... }
    #[test]
    #[expected_failure(abort_code = 26113, location = extensions::table)]
    fun test_destroy_fails() { ... }
}
```

### テストパラメータ

引数がある場合、テスト注釈は`#[test(<param_name_1> = <address>, ..., <param_name_n> = <address>)]`という形式となります。

関数がこのように注釈付けされている場合、関数のパラメータはパラメータ`<param_name_1>, ..., <param_name_n>`の順列である必要があります。

つまり、関数内で起こるこれらのパラメーターの順序とテスト注釈内の順序は同じである必要はありませんが、お互い名前で一致する必要が有ります。

`signer`タイプのパラメータのみがテストパラメータとしてサポートされています。`signer`以外のパラメータが供給された場合テストは実行時、エラーとなります。

```
module 0x42::example {
    #[test(arg = @0xC0FFEE)] // OK
    fun this_is_correct_now(arg: signer) { ... }

    #[test(wrong_arg_name = @0xC0FFEE)] // Not correct: arg name doesn't match
    fun this_is_incorrect(arg: signer) { ... }

    #[test(a = @0xC0FFEE, b = @0xCAFE)] // OK. We support multiple signer arguments, but you must always provide a value for that argument
    fun this_works(a: signer, b: signer) { ... }

    // somewhere a named address is declared
    #[test_only] // test-only named addresses are supported
    address TEST_NAMED_ADDR = @0x1;
    ...
    #[test(arg = @TEST_NAMED_ADDR)] // Named addresses are supported!
    fun this_is_correct_now(arg: signer) { ... }
}
```

### テストをサポートする任意のコード

モジュールとそのメンバーは、テストのみとして宣言できます。このような場合のみ項目は、テストモードでコンパイルされた時、コンパイルされたMoveバイトコードへ含まれます。更に、テストモード以外でコンパイルされた場合、`#[test_only]`モジュールの非テスト`use`は、コンパイル中にエラーを発生させます。

```
#[test_only] // テストオンリー属性はモジュールへ付加出来る
module 0x42::abc { /*... */ }

module 0x42::other {
    #[test_only] // テストオンリー属性は名前付きアドレスへ付加出来る
    address ADDR = @0x1;

    #[test_only] // .. useへ
    use 0x1::some_other_module;

    #[test_only] // .. 構造体へ
    struct SomeStruct { ... }

    #[test_only] // .. _関数。 テストコードからのみ呼び出せる。テストからは呼び出せません。
    fun test_only_function(...) { ... }
}
```

## ユニットテストの実行

Moveパッケージの単体テストは、`aptos move test`コマンドを使用して実行出来ます。詳細は、[パッケージ](./packages.md)を御覧下さい。

テストを実行すると、全てのテストは`PASS`、`FAIL`もしくは`TIMEOUT`のいずれかとなります。テストケースが失敗した場合、可能であれば、失敗の場所と失敗の原因となった関数名が報告されます。以下でその例を御覧下さい。

ひとつのテストで実行出来る命令の最大数を超えると、テストはタイムアウトとしてマークされます。この制限は、以下のオプションを使用して変更出来ます。デフォルト値は100000命令で設定されています。テストの結果は常に決定論的ですが、テストはデフォルトで並列実行されるため、ひとつのスレッドのみで実行していない限り、テスト実行でのテスト結果の順序は非決定論的です (以下の`OPTIONS`参照)。

テストを微調整したり、失敗したテストをデバッグするため、ユニットテストバイナリへ渡せるオプションもいくつか有ります。これらは、ヘルプフラグを使用して見つける事が出来ます。

```
$ aptos move test -h
```

## 例

ユニットテスト機能をいくつか使用する単純なモジュール例を以下で示します。

まず、空のディレクトリ内で空のパッケージを作成します。

```
$ aptos move init --name TestExample
```

以下を`Move.toml`へ追加します

```
[dependencies]
MoveStdlib = { git = "https://github.com/aptos-labs/aptos-core.git", subdir="aptos-move/framework/move-stdlib", rev = "main", addr_subst = { "std" = "0x1" } }
```

`sources`ディレクトリの下へ以下のモジュールを追加します。

```
// filename: sources/my_module.move
module 0x1::my_module {

    struct MyCoin has key { value: u64 }

    public fun make_sure_non_zero_coin(coin: MyCoin): MyCoin {
        assert!(coin.value > 0, 0);
        coin
    }

    public fun has_coin(addr: address): bool {
        exists<MyCoin>(addr)
    }

    #[test]
    fun make_sure_non_zero_coin_passes() {
        let coin = MyCoin { value: 1 };
        let MyCoin { value: _ } = make_sure_non_zero_coin(coin);
    }

    #[test]
    // もしくは、中止コードを気にしない場合は #[expected_failure] 
    #[expected_failure(abort_code = 0, location = Self)]
    fun make_sure_zero_coin_fails() {
        let coin = MyCoin { value: 0 };
        let MyCoin { value: _ } = make_sure_non_zero_coin(coin);
    }

    #[test_only] // テストオンリーヘルパー関数
    fun publish_coin(account: &signer) {
        move_to(account, MyCoin { value: 1 })
    }

    #[test(a = @0x1, b = @0x2)]
    fun test_has_coin(a: signer, b: signer) {
        publish_coin(&a);
        publish_coin(&b);
        assert!(has_coin(@0x1), 0);
        assert!(has_coin(@0x2), 1);
        assert!(!has_coin(@0x3), 1);
    }
}
```

### テストの実行

`aptos move test`コマンドでこれらのテストを実行出来ます

```
$ aptos move test
BUILDING MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::my_module::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::my_module::make_sure_zero_coin_fails
[ PASS    ] 0x1::my_module::test_has_coin
Test result: OK. Total tests: 3; passed: 3; failed: 0
```

### テストフラグの使用

#### `-f <str>` もしくは `--filter <str>`

これにより、完全修飾名に`<str>`が含まれるテストのみが実行されます。例えば、名前へ`"zero_coin"`が含まれるテストのみを実行したい場合:

```
$ aptos move test -f zero_coin
CACHED MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::my_module::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::my_module::make_sure_zero_coin_fails
Test result: OK. Total tests: 2; passed: 2; failed: 0
```

#### `--coverage`

これにより、テストケースで適用されるコードが計算され、適用範囲の概要が生成されます。

```
$ aptos move test --coverage
INCLUDING DEPENDENCY AptosFramework
INCLUDING DEPENDENCY AptosStdlib
INCLUDING DEPENDENCY MoveStdlib
BUILDING TestExample
Running Move unit tests
[ PASS    ] 0x1::my_module::make_sure_non_zero_coin_passes
[ PASS    ] 0x1::my_module::make_sure_zero_coin_fails
[ PASS    ] 0x1::my_module::test_has_coin
Test result: OK. Total tests: 3; passed: 3; failed: 0
+-------------------------+
| Move Coverage Summary   |
+-------------------------+
Module 0000000000000000000000000000000000000000000000000000000000000001::my_module
>>> % Module coverage: 100.00
+-------------------------+
| % Move Coverage: 100.00  |
+-------------------------+
Please use `aptos move coverage -h` for more detailed source or bytecode test coverage of this package
```

その後`aptos move coverage`を実行すると、より詳細な適用範囲の情報を取得出来ます。これらは、ヘルプ フラグを使用して確認出来ます。

```
$ aptos move coverage -h
```
