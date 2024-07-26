# 条件文

`if`式は、特定の条件が満たされる場合のみコードが評価される事を指定します。例えば:

```move
if (x > 5) x = x - 5
```

条件は`bool`型の式でなければなりません。

`if`式には、オプションで`else`句を含める事が出来、条件が偽(false)の場合、別の式を指定して評価します。

```move
if (y <= 10) y = y + 1 else y = 10
```

「true」ブランチまたは「false」ブランチのいずれかが評価されますが、両方が評価されることはありません。どちらのブランチも、単一の式もしくは式ブロックにする事が出来ます。

条件式は`if`式が結果を得られる様、値を生成する場合があります。

```move
let z = if (x < 100) x else 100;
```

trueブランチとfalseブランチの式は互換性のある型である必要があります。例えば:

```move
// xとyはu64整数でなければなりません 
let maximum: u64 = if (x > y) x else y;

// エラー! 型の違うブランチ
let z = if (maximum < 10) 10u8 else 100u64;

// エラー! デフォルトのfalse-branchはu64ではなく()であるため、型の違うブランチです。
if (maximum >= 10) maximum;
```

`else`句が指定されていない場合falseブランチはデフォルトでunit値となります。以下は同等です。

```move
if (condition) true_branch // implied default: else ()
if (condition) true_branch else ()
```

通常[`if`式](./conditionals.md)は式ブロックと組み合わせて使用​​されます。
 
```move
let maximum = if (x > y) x else y;
if (maximum < 10) {
    x = x + 10;
    y = y + 10;
} else if (x >= 10 && y >= 10) {
    x = x - 10;
    y = y - 10;
}
```

## 条件文の文法

> _if-式_ → **if (** _式_ **)** _式_ _else-句_<sub>_opt_</sub>

> _else-句_ → **else** _式_
