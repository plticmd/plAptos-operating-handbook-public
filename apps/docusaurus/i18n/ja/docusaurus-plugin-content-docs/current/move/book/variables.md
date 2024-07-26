# ローカル変数とスコープ

Moveのローカル変数は、語彙的に(静的)スコープ(観測)されています。新しい変数はキーワード`let`で導入され、同じ名前の以前のローカル変数をシャドウします。ローカル変数は可変であり、直接更新する事も、可変参照を介して更新する事も出来ます。

## ローカル変数の宣言

### `let`バインディング

Moveプログラムは`let`を使用して変数名を値へバインドします。

```move
script {
  fun example() {
    let x = 1;
    let y = x + x:
  }
}
```

ローカルへ値をバインドせず`let`を使用する事も出来ます。

```move
script {
  fun example() {
    let x;
  }
}
```

ローカルは後で値を割り当てる事が出来ます。

```move
script {
  fun example() {
    let x;
    if (cond) {
    x = 1
    } else {
    x = 0
    }
  }
}
```

これは、デフォルト値が提供出来ない場合ループから値を抽出しようとする時役立ちます。

```move
script {
  fun example() {
    let x;
    let cond = true;
    let i = 0;
    loop {
        (x, cond) = foo(i);
        if (!cond) break;
        i = i + 1;
    }
  }
}
```

### 使用前、変数を割り当てる必要が有ります

Moveの型システムは、ローカル変数が割り当てられる前に使用される事を防ぎます。

```move
script {
  fun example() {
    let x;
    x + x // エラ＾!
  }
}
```

```move
script {
  fun example() {
    let x;
    if (cond) x = 0;
    x + x // エラー!
  }
}
```

```move
script {
  fun example() {
    let x;
    while (cond) x = 0;
    x + x // エラー!
  }
}
```

### 有効な変数名

変数名は、アンダースコア`_`、`a`から`z`までの_文字、`A`から`Z`までの文字、`0`から`9`までの数字を含む事が出来ます。変数名は、アンダースコア`_`または `a`から`z`までの文字で始まる必要が有ります。大文字で始める事は _出来ません_。

```move
script {
  fun example() {
    // 全て有効
    let x = e;
    let _x = e;
    let _A = e;
    let x0 = e;
    let xA = e;
    let foobar_123 = e;

    // 全て無効
    let X = e; // エラー!
    let Foo = e; // エラー!
  }
}
```

### 型注釈

ローカル変数の型は、Moveの型システムによってほぼ常時推測出来ます。Moveは、読みやすさ、明確さ、デバッグしやすさで役立つ明示的な型注釈を使用出来ます。型注釈を追加するための構文は:

```move
script {
  fun example() {
    let x: T = e; // "型Tの変数xは式eへ初期化されます"
  }
}
```

型注釈の例:

```move
module 0x42::example {

    struct S { f: u64, g: u64 }

    fun annotated() {
        let u: u8 = 0;
        let b: vector<u8> = b"hello";
        let a: address = @0x0;
        let (x, y): (&u64, &mut u64) = (&0, &mut 1);
        let S { f, g: f2 }: S = S { f: 0, g: 1 };
    }
}
```

注意: 型注釈は常時パターンの右側である必要が有ります

```move
script {
  fun example() {
    let (x: &u64, y: &mut u64) = (&0, &mut 1); // エラー! (x, y): ... = とする必要が有ります
  }
}
```

### 注釈が必要な場合

型システムが型を推測できない場合、ローカル型注釈が必要となります。これは通常、ジェネリック型の型引数を推論できない場合発生します。例:

```move
script {
  fun example() {
    let _v1 = vector::empty(); // エラー!
    //        ^^^^^^^^^^^^^^^ この型を推測出きませんでした。注釈の追加を試して下さい。 
    let v2: vector<u64> = vector::empty(); // エラーは有りません
  }
}
```

型システムが分岐コード(後続のコードが全て到達不能)の型を推論出来ない場合が有ります。`return`と[`abort`](./abort-and-assert.md)はどちらも式であり、任意の型を持つ事がで出来ます。`break`がある場合、[`loop`](./loops.md)は`()`型を持ちますが、`loop`から抜け出す事が出来ない場合は、任意の型を持つ事が出来ます。これらの型が推論出来ない場合は、型注釈が必要です。例えば、このコード:

```move
script {
  fun example() {
    let a: u8 = return ();
    let b: bool = abort 0;
    let c: signer = loop ();

    let x = return (); // エラー!
    //  ^ この型を推測出きませんでした。注釈の追加を試して下さい。
    let y = abort 0; // エラー!
    //  ^ この型を推測出きませんでした。注釈の追加を試して下さい。
    let z = loop (); // エラー!
    //  ^ この型を推測出きませんでした。注釈の追加を試して下さい。
    
  }
}
```

このコードへ型注釈を追加すると、デッドコードや未使用のローカル変数関連の他のエラーが表示されますが、この例は問題の理解で役立ちます。

### タプルを使った複数の宣言

`let`とタプルを使用して、一度で複数のローカルを導入出来ます。括弧内で宣言されたローカルは、タプルの対応する値へ初期化されます。

```move
script {
  fun example() {
    let () = ();
    let (x0, x1) = (0, 1);
    let (y0, y1, y2) = (0, 1, 2);
    let (z0, z1, z2, z3) = (0, 1, 2, 3);
  }
}
```

式の型はタプルパターンの個数(アリティ)と合致する必要が有ります。

```move
script {
  fun example() {
    let (x, y) = (0, 1, 2); // エラー!
    let (x, y, z, q) = (0, 1, 2); // エラー!
  }
}
```

ひとつの`let`で同じ名前のローカルを複数宣言する事は出来ません。

```move
script {
  fun example() {
    let (x, x) = 0; // エラー!
  }
}
```

### 構造体を使った複数の宣言

`let`は構造体を分解(または照合)する時、一度で複数のローカルを導入する事も出来ます。

この形式で`let`はローカル変数のセットを作成し、構造体のフィールドの値へ初期化されます。
以下のような構文となります。

```move
script {
  fun example() {
    struct T { f1: u64, f2: u64 }
  }
}
```

```move
script {
  fun example() {
    let T { f1: local1, f2: local2 } = T { f1: 1, f2: 2 };
    // local1: u64
    // local2: u64
  }
}
```

こちらはより複雑な例です。

```move
module 0x42::example {
    struct X { f: u64 }
    struct Y { x1: X, x2: X }

    fun new_x(): X {
        X { f: 1 }
    }

    fun example() {
        let Y { x1: X { f }, x2 } = Y { x1: new_x(), x2: new_x() };
        assert!(f + x2.f == 2, 42);

        let Y { x1: X { f: f1 }, x2: X { f: f2 } } = Y { x1: new_x(), x2: new_x() };
        assert!(f1 + f2 == 2, 42);
    }
}
```

構造体のフィールドは、バインドするフィールドの識別と変数の名前の識別という2つの役割を提供出来ます。これは、パンニングと呼ばれる事もあります。

```move
script {
    fun example() {
        let X { f } = e;
    }
}
```

は以下と同等です:

```move
script {
  fun example() {
    let X { f: f } = e;
  }
}
```

以下のタプルで示したような、単一の`let`で同じ名前のローカルを複数宣言する事は出来ません。


```move
script {
  fun example() {
    let Y { x1: x, x2: x } = e; // エラー!
  }
}
```

### 対参照構造化分解

上記の構造体の例では、let内のバインドされた値が移動され、構造体の値が破棄され、そのフィールドがバインドされました。

```move
script {
  fun example() {   
    struct T { f1: u64, f2: u64 }
  }
}
```

```move
script {
  fun example() {
    let T { f1: local1, f2: local2 } = T { f1: 1, f2: 2 };
    // local1: u64
    // local2: u64
  }
}
```

このシナリオでは、`let`の後構造体の値`T { f1: 1, f2: 2 }`は存在しなくなります。

構造体の値を移動したり破壊したくない場合は、各フィールドを借用する事が出来ます。例えば:

```move
script {
  fun example() {
    let t = T { f1: 1, f2: 2 };
    let T { f1: local1, f2: local2 } = &t;
    // local1: &u64
    // local2: &u64
  }
}
```

可変参照も同様です。

```move
script {
  fun example() {
    let t = T { f1: 1, f2: 2 };
    let T { f1: local1, f2: local2 } = &mut t;
    // local1: &mut u64
    // local2: &mut u64
  }
}
```

この動作は入れ子となった構造体でも機能します。

```move
module 0x42::example {
    struct X { f: u64 }
    struct Y { x1: X, x2: X }

    fun new_x(): X {
        X { f: 1 }
    }

    fun example() {
        let y = Y { x1: new_x(), x2: new_x() };

        let Y { x1: X { f }, x2 } = &y;
        assert!(*f + x2.f == 2, 42);

        let Y { x1: X { f: f1 }, x2: X { f: f2 } } = &mut y;
        *f1 = *f1 + 1;
        *f2 = *f2 + 1;
        assert!(*f1 + *f2 == 4, 42);
    }
}
```

### 値の無視

`let`バインディングでは、いくつかの値を無視する時役立ちます。`_`で始まるローカル変数は無視され、新しい変数は導入されません。

```move
module 0x42::example {
    fun three(): (u64, u64, u64) {
        (0, 1, 2)
    }

    fun example() {
        let (x1, _, z1) = three();
        let (x2, _y, z2) = three();
        assert!(x1 + z1 == x2 + z2, 42);
    }
}
    
```

未使用のローカル変数でコンパイラがエラーとなる場合、これが必要な時もあります。

```move
module 0x42::example {
  fun example() {
    let (x1, y, z1) = three(); // エラー!
    //       ^ 未使用のローカル'y'
  }
}
```

### 一般的な`let`文法

`let`　内の異なる構造は全て組み合わせる事が出来ます!これで`let`宣言の一般的な文法へ到達します:
 
> _let-binding_ → **let** _pattern-or-list_ _type-annotation_<sub>_opt_</sub> _initializer_<sub>_opt_</sub>

> _pattern-or-list_ → _pattern_ | **(** _pattern-list_ **)**

> _pattern-list_ → _pattern_ **,**<sub>_opt_</sub> | _pattern_ **,** _pattern-list_

> _type-annotation_ → **:** _type_

> _initializer_ → **=** _expression_

バインディングを導入する項目の一般的な用語は _パターン_ です。

パターンは、データの構造化解除(おそらく再帰的に)とバインディング導入の両方を提供します。パターンの文法は以下の様なものです。

> _pattern_ → _local-variable_ | _struct-type_ **\{** _field-binding-list_ **}**

> _field-binding-list_ → _field-binding_ **,**<sub>_opt_</sub> | _field-binding_ **,** _field-binding-list_

> _field-binding_ → _field_ | _field_ **:** _pattern_

この文法を適用した具体的な例をいくつか示します。

```move
script {
  fun example() {
        let (x, y): (u64, u64) = (0, 1);
    //       ^                           ローカル変数
    //       ^                           パターン
    //          ^                        ローカル変数
    //          ^                        パターン
    //          ^                        パターンリスト
    //       ^^^^                        パターンリスト
    //      ^^^^^^                       パターンもしくはリスト
    //            ^^^^^^^^^^^^           型注釈
    //                         ^^^^^^^^  初期化子
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ let-バインディング

        let Foo { f, g: x } = Foo { f: 0, g: 1 };
    //      ^^^                                    構造体型
    //            ^                                フィールド
    //            ^                                フィールドバインディング
    //               ^                             フィールド
    //                  ^                          ローカル変数
    //                  ^                          パターン
    //               ^^^^                          フィールドバインディング
    //            ^^^^^^^                          フィールドバインディングリスト
    //      ^^^^^^^^^^^^^^^                        パターン
    //      ^^^^^^^^^^^^^^^                        パターンもしくはリスト
    //                      ^^^^^^^^^^^^^^^^^^^^   初期化子
    //  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ let-バインディング
  }
}
```


## 変更

### 代入

ローカルが導入された後(`let`または関数パラメータとして)、ローカルは代入を介して変更出来ます。

```move
script {
  fun example(e: u8) {
    let x = 0;
    x = e
  }
}
```

`let`バインディングとは異なり、代入は式です。一部の言語では、代入は割り当てられた値を返しますが、Move では、代入の型は常時`()`です。

```move
script {
  fun example(e: u8) {
    let x = 0;
    (x = e) == ()
  }
}
```

実際には、代入が式であるということは、中括弧(`{`...`}`)で新しい式ブロックを追加しなくても使用出来る事を意味します。

```move
script {
  fun example(e: u8) {
  let x = 0;
  if (cond) x = 1 else x = 2;
  }
}
```

代入は`let`バインディングと同じパターン構文スキームを使用します。

```move
module 0x42::example {
    struct X { f: u64 }

    fun new_x(): X {
        X { f: 1 }
    }

    // この例は未使用の変数と代入について警告します
    fun example() {
       let (x, _, z) = (0, 1, 3);
       let (x, y, f, g);

       (X { f }, X { f: x }) = (new_x(), new_x());
       assert!(f + x == 2, 42);

       (x, y, z, f, _, g) = (0, 0, 0, 0, 0, 0);
    }
}
```

注意: ローカル変数はひとつの型しか持てないため、代入間でローカルの型を変更出来ません。

```move
script {
  fun example() {
  let x;
  x = 0;
  x = false; // エラー!
  }
}
```

### 参照を介した変更

代入でローカルを直接変更するだけでなく、可変参照`&mut`を介してローカルを変更する事も出来ます。

```move
script {
  fun example() {
  let x = 0;
  let r = &mut x;
  *r = 1;
  assert!(x == 1, 42);
  }
}
```

これは、 以下のいずれかの場合特に役立ちます。

(1) 何らかの条件に応じて異なる変数を変更する。

```move
script {
  fun example() {
  let x = 0;
  let y = 1;
  let r = if (cond) {
    &mut x
  } else {
    &mut y
  };
  *r = *r + 1;
  }
}
```

(2) ローカル値を変更する別の関数が必要です。

```move
script {
  fun example() {
  let x = 0;
  modify_ref(&mut x);
  }
}
```
この種の変更は、構造体とベクター！を変更する方法です。

```move
script {
  use 0x1::vector;
 
  fun example() {
    let v = vector::empty();
    vector::push_back(&mut v, 100);
    assert!(*vector::borrow(&v, 0) == 100, 42);
  }
}
```

詳細は[参照](./references.md)を御覧下さい。

## スコープ

`let`で宣言されたローカルは、 _そのスコープ内の_ 後続の式で使用出来ます。スコープは式ブロック、`{`...`}`で宣言されます。

ローカルは宣言されたスコープ外で使用する事は出来ません。

```move
script {
  fun example() {
  let x = 0;
  {
      let y = 1;
  };
  x + y // エラー!
  //  ^ バインドされていないローカル'y'
  }
}
```

ただし、外部スコープからのローカルは入れ子となったスコープ内で使用 _出来ます_。

```move
script {
  fun example() {
    {
        let x = 0;
        {
            let y = x + 1; // 有効
        }
    }
  }
}
```

ローカルは、アクセス可能な任意のスコープで変更出来ます。変更を実行したスコープに関係なく、その変更はローカルとともに存続します。
 
```move
script {
  fun example() {
    let x = 0;
    x = x + 1;
    assert!(x == 1, 42);
    {
        x = x + 1;
        assert!(x == 2, 42);
    };
    assert!(x == 2, 42);
  }
}
```

### 式ブロック

式ブロックはセミコロン(`;`)で区切られた一連のステートメントです。式ブロックの結果の値は、ブロック内の最後の式の値です。

```move
script {
  fun example() {
    { let x = 1; let y = 1; x + y }
  }
}
```

この例では、ブロックの結果は`x + y`です。

ステートメントは`let`宣言または式のいずれかとなります。代入(`x = e`)は型`()`の式である事を覚えておいて下さい。

```move
script {
  fun example() {
    { let x; let y = 1; x = 1; x + y }
  }
}
```
関数呼び出しは、`()`型の一般的な別の式です。データを変更する関数呼び出しは、ステートメントとしてよく使用されます。
 
```move
script {
  fun example() {
    { let v = vector::empty(); vector::push_back(&mut v, 1); v }
  }
}
```

これはただ`()`型に限定される物ではなく、任意の式をシーケンス内のステートメントとして使用出来ます。

```move
{
    let x = 0;
    x + 1; // 値は廃棄されます
    x + 2; // 値は廃棄されます
    b"hello"; // 値は廃棄されます
}
```

式がリソース(`drop`[機能](./abilities.md)を持たない値)を含んでいる場合エラーが発生します。これは、Moveの型システムが、ドロップされる全ての値が`drop`[機能](./abilities.md)を持つ事を保証しているためです。（所有権を譲渡するか、宣言モジュール内で値を破棄する必要があります。）

```move
script {
  fun example() {
    {
        let x = 0;
        Coin { value: x }; // エラー!
    //  ^^^^^^^^^^^^^^^^^ `drop`機能を持たない未使用の値
        x
    }
  }
}
```

ブロック内に最後の式が存在しない場合、つまり末尾にセミコロン`;`がある場合は、暗黙の[ユニット`()`値](https://en.wikipedia.org/wiki/Unit_type)が有ります。式ブロックが空の場合も、暗黙のユニット`()`値が有ります。

```move
script {
  fun example() {
    // どちらも同等です
    { x = x + 1; 1 / x; }
    { x = x + 1; 1 / x; () }
  }
}
```

```move
script {
  fun example() {
    // どちらも同等です
    { }
    { () }
  }
}
```

式ブロック自体が式であり、式が使用されるどこでも使用出来ます。(注: 関数の本体も式ブロックですが、関数本体を別の式へ置き換える事は出来ません。)

```move
script {
  fun example() {
    let my_vector: vector<vector<u8>> = {
        let v = vector::empty();
        vector::push_back(&mut v, b"hello");
        vector::push_back(&mut v, b"goodbye");
        v
    };
  }
}
```

(この例では型注釈は不要ですが、分かり易さのため追加しました。)

### シャドーイング

`let`が、既にスコープにある名前でローカル変数を導入する場合、その以前の変数へは、このスコープの残りの部分ではアクセス出来なくなります。これを _シャドウイング_ と呼びます。

```move
script {
  fun example() {
    let x = 0;
    assert!(x == 0, 42);

    let x = 1; // x はシャドウされている
    assert!(x == 1, 42);
  }
}
```

ローカルがシャドウ化されると、以前と同じ型を保持する必要はありません。

```move
script {
  fun example() {
    let x = 0;
    assert!(x == 0, 42);

    let x = b"hello"; // x はシャドウされている
    assert!(x == b"hello", 42);
  }
}
```

ローカルがシャドウされた後も、ローカルへ保存された値は存在しますが、アクセス出来なくなります。

 値の所有権は関数の終了までに移転する必要があるため、[`drop`機能](./abilities.md)を持たない型の値を覚えておく事が重要です。

```move
module 0x42::example {
    struct Coin has store { value: u64 }

    fun unused_resource(): Coin {
        let x = Coin { value: 0 }; // エラー!
        //  ^ このローカルは`drop`機能を持たな値をまだ含んでいる
        x.value = 1;
        let x = Coin { value: 10 };
        x
        //  ^ 無効なリターン
    }
}
```

ローカルがスコープ内でシャドウ化される時、シャドウ化はそのスコープへのみ残ります。そのスコープが終了するとシャドウ化は無くなります。

```move
script {
  fun example() {
    let x = 0;
    {
        let x = 1;
        assert!(x == 1, 42);
    };
    assert!(x == 0, 42);
  }
}
```

シャドウ化している時、ローカルは型を変更出来ます。覚えておいて下さい。

```move
script {
  fun example() {
    let x = 0;
    {
        let x = b"hello";
        assert!(x = b"hello", 42);
    };
    assert!(x == 0, 42);
  }
}
```

## ムーブとコピー

Moveの全てのローカル変数は、`move`、`copy`の2つの方法で使用出来ます。

どちらかが指定されていない場合は、Moveコンパイラは、`copy`か`move`のどちらが使用されるのか推測出来ます。上記の全ての例では、コンパイラが`move`もしくは`copy`を挿入します。`move`または`copy`を使用せずローカル変数を使用する事は出来ません。

`copy`は、変数内の値の新しいコピーを作成してその式で使用するので、他のプログラミング言語から来た人にとっては最も馴染みのある方法であると思われます。`copy`を使用すると、ローカル変数を複数回使用出来ます。

```move
script {
  fun example() {
    let x = 0;
    let y = copy x + 1;
    let z = copy x + 2;
  }
}
```

この方法では、`copy`[機能](./abilities.md)を持つ任意の値をコピー出来ます。

`move`はデータをコピー _せず_ ローカル変数から値を取得します。`move`が発生した後、ローカル変数は使用出来なくなります。

```move
script {
  fun example() {
    let x = 1;
    let y = move x + 1;
    //      ------ ローカルはここへ移動されました
    let z = move x + 2; // エラー!
    //      ^^^^^^ ローカル'x'の使用法が無効です
    y + z
  }
}
```

### 安全性

Moveの型システムは、値が移動された後使用されるのを防ぎます。

これは、[`let`宣言](#let-bindings)で記述されているのと同じ安全性チェックで、値が代入される前にローカル変数が使用されるのを防ぎます。

<!-- For more information, see TODO future section on ownership and move semantics. -->

### 推測

どちらも示されていない場合、Moveコンパイラは`copy`もしくは`move`を推測します。そのためのアルゴリズムは非常に単純です。

- `copy`[機能](./abilities.md)を持つ任意の値へ`copy`が与えられます
- 任意の参照(可変`&mut`と不変`&`の両方)へ`copy`が与えられます
  - ただし、`move`が作った予測可能な借用チェッカーエラーが発生する特別な事情を除く。
- その他の値へ`move`が与えられます。
- コンパイラが、コピー機能を持つソース値が代入後使用されていない事を立証出来る場合、パフォーマンスのためコピーのかわりmoveが使用される事が有りますが、プログラマは見えません(時間またはガスコストの減少の可能性を除く)。

例えば:

```move
module 0x42::example {
  struct Foo {
      f: u64
  }

  struct Coin has copy {
      value: u64
  }
fun example() {
  let s = b"hello";
  let foo = Foo { f: 0 };
  let coin = Coin { value: 0 };

  let s2 = s; // copy
  let foo2 = foo; // move
  let coin2 = coin; // copy

  let x = 0;
  let b = false;
  let addr = @0x42;
  let x_ref = &x;
  let coin_ref = &mut coin2;

  let x2 = x; // copy
  let b2 = b; // copy
  let addr2 = @0x42; // copy
  let x_ref2 = x_ref; // copy
  let coin_ref2 = coin_ref; // copy
}
}
```
