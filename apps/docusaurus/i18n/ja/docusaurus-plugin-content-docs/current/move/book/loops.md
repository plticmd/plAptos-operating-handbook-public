# While, For, ループ

Moveは `while`、`for`、`loop`の3つのループ構造を提供します。

## `while`ループ

この`while`構文は、条件(`bool`の型の式)が`false`と評価されるまで、本体(unitの型の式)を繰り返します。

以下は`1`から`n`までの数値の合計を計算する単純な`while`ループの例です。

```move
script {
    fun sum(n: u64): u64 {
        let sum = 0;
        let i = 1;
        while (i <= n) {
            sum = sum + i;
            i = i + 1
        };

        sum
    }
}
```
無限ループが許可されます:

```move
script {
  fun foo() {
    while (true) { }
  }
}
```

### `break`

`break`式は、条件が`false`と評価する前にループを終了するために使用出来ます。例えば、以下のループは`break`を使用し、1より大きい`n`の最小の因数を見つけます。

```move
script {
    fun smallest_factor(n: u64): u64 {
        //入力が0もしくは1ではないと仮定します
        let i = 2;
        while (i <= n) {
            if (n % i == 0) break;
            i = i + 1
        };

        i
    }
}
```

`break`式はループの外部では使用できません。 

### `continue`

`continue`式はループの残りをスキップし、次の反復処理へ進みます。
このループは、数値が10で割り切れる場合を除き、`continue`を使用して`1, 2, ..., n`の合計を計算します。

```move
script {
    fun sum_intermediate(n: u64): u64 {
        let sum = 0;
        let i = 0;
        while (i < n) {
            i = i + 1;
            if (i % 10 == 0) continue;
            sum = sum + i;
        };

        sum
    }
}
```

`continue`式はループの外部では使用出来ません。

### `break`と`continue`の型

`break`と`continue`は`return`や`abort`と同様、任意の型を持つ事が出来ます。以下の例で、この柔軟な型付けが役立つ所を示します。

```move
script {
    fun pop_smallest_while_not_equal(
        v1: vector<u64>,
        v2: vector<u64>,
    ): vector<u64> {
        let result = vector::empty();
        while (!vector::is_empty(&v1) && !vector::is_empty(&v2)) {
            let u1 = *vector::borrow(&v1, vector::length(&v1) - 1);
            let u2 = *vector::borrow(&v2, vector::length(&v2) - 1);
            let popped =
                if (u1 < u2) vector::pop_back(&mut v1)
                else if (u2 < u1) vector::pop_back(&mut v2)
                else break; // ここで、`break`の型は`u64`です
            vector::push_back(&mut result, popped);
        };

        result
    }
}
```

```move
script {
    fun pick(
        indexes: vector<u64>,
        v1: &vector<address>,
        v2: &vector<address>
    ): vector<address> {
        let len1 = vector::length(v1);
        let len2 = vector::length(v2);
        let result = vector::empty();
        while (!vector::is_empty(&indexes)) {
            let index = vector::pop_back(&mut indexes);
            let chosen_vector =
                if (index < len1) v1
                else if (index < len2) v2
                else continue; // ここで、 `continue`の型は`&vector<address>`です
            vector::push_back(&mut result, *vector::borrow(chosen_vector, index))
        };

        result
    }
}
```

## `for`式

この`for`式は、整数型の`lower_bound`(包括的)式と`upper_bound`(非包括的)式を使用して定義された範囲を反復処理し、範囲の各要素に対してループ本体を実行します。`for`はループの反復回数が特定の範囲によって決定されるシナリオ向けで設計されています。

以下は`for`ループの例で、`0`から`n-1`までの範囲の要素の合計を計算します。

```move
script {
    fun sum(n: u64): u64 {
        let sum = 0;
        for (i in 0..n) {
            sum = sum + i;
        };

        sum
    }
}    
```
ループ反復子変数 (上記の例では`i`)は現在数値型(境界から推論)である必要があり、境界`0`と`n`ここでは任意の数値式へ置き換える事が出来ます。それぞれはループの開始時に1回だけ評価されます。反復子変数`i`は`lower_bound`(この場合は`0`)を割り当て、各ループ反復後に増分します。反復子`i`が`upper_bound`(この場合は`n`)へ達するか超えるとループが終了します。

### `for`ループの`中断`と`続行`

`while`ループと同様、`break`式を`for`ループ内で使用して途中で終了する事が出来ます。`continue`式を使用して、現在の反復をスキップし、次の反復へ進む事が出来ます。以下は`break`と`continue`の両方の使用例です。ループは`0`から`n-1`までの数値を反復処理し、それらを合計します。

 `3`で割り切れる数値はスキップし(`continue`を使用)、`10`より大きい数値と遭遇すると停止します(`break`を使用)。

```move
script{
    fun sum_conditional(n: u64): u64 {
        let sum = 0;
        for (iter in 0..n) {
            if (iter > 10) {
                break; // 数値が10より大きい場合はループを終了します
            }
            if (iter % 3 == 0) {
                continue; // 数値が3で割り切れる場合は現在の反復をスキップします
            }

            sum = sum + iter;
        };

        sum
    }
}
```

## `loop`式

`loop`式は`break`とヒットするまでループ本体(型`()`の式)をリピートします。

`break`がなければ、ループは永遠に続きます。

```move
script {
    fun foo() {
        let i = 0;
        loop { i = i + 1 }
    }
}
```

以下の例は、`loop`を使用して`sum`関数を記述します。

```move
script {
    fun sum(n: u64): u64 {
        let sum = 0;
        let i = 0;
        loop {
            i = i + 1;
            if (i > n) break;
            sum = sum + i
        };

        sum
    }
}
```

予想通り`continue`は`loop`内でも使用でき出来ます。ここでは`while`の代わりに`loop`を使って上記`sum_intermediate`を書き直しました。
 
```move
script {
    fun sum_intermediate(n: u64): u64 {
        let sum = 0;
        let i = 0;
        loop {
            i = i + 1;
            if (i % 10 == 0) continue;
            if (i > n) break;
            sum = sum + i
        };

        sum
    }
}
```

## `while`、`loop`、`for`式の型

Moveのループは型指定された式です。`while`と`for`表現の型は常に`()`です。
 
```move
script {
    fun example() {
        let () = while (i < 10) { i = i + 1 };
        let () = for (i in 0..10) {};
    }
}
```

`loop`が`break`を含む場合、式の型はunit`()`となります。

```move
script {
  fun example() {
    (loop { if (i < 10) i = i + 1 else break }: ());
    let () = loop { if (i < 10) i = i + 1 else break };
  }
}
```

`loop`に`break`が無い場合、`loop`は`return`、`abort`、`break`、`continue`等の任意の型を持つ事が出来ます。

```move
script {
  fun example() {
    (loop (): u64);
    (loop (): address);
    (loop (): &vector<vector<u8>>);
  }
}
```
