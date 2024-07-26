# Abilities(機能)

Abilitiesは、Moveの型指定機能であり、特定の型の値に対して許可されるアクションを制御します。このシステムにより値の"linear"typing動作、及びグローバルストレージでの値の使用の有無と使用方法をきめ細かく制御出来ます。これは、特定のバイトコード指示へのアクセスをゲートすることで実装されます。そのため値がバイトコード指示で使用されるため必要とするAbilityが必要(必要な場合、全ての指示がAbilityによってゲートされるわけではありません)。

<!-- TODO future section on detailed walk through, maybe. We have some examples at the end, but it might be helpful to explain why we have precisely this set of abilities

If you are already somewhat familiar with abilities from writing Move programs, but are still confused as to what is going on, it might be helpful to skip to the [motivating walkthrough](#motivating-walkthrough) section to get an idea of what the system is set up in the way that it is. -->

## 4つのAbility

4つのAbilityは:

- [`copy`](#copy)
  - このAbilityを持つ型の値をコピー出来る様にします。
- [`drop`](#drop)
  - このAbilityを持つ型の値をポップ/ドロップ出来る様にします。
- [`store`](#store)
  - このAbilityを持つ型の値がグローバルストレージ内の構造体内に存在出来る様にします。
- [`key`](#key)
  - 型をグローバルストレージ操作のキーとして提供出来る様にします。

### `コピー`

この`copy`機能により、その機能を持つ型の値をコピー出来ます。これは、[`copy`](./variables.md#move-and-copy)演算子を使用してローカル変数外の値をコピーする機能をゲートし、[逆参照`*e`](./references.md#reading-and-writing-through-references)を使用して参照経由で値をコピーします。

値が`copy`を持つ場合、その値内に含まれる全ての値は`copy`となります。

### `ドロップ`

この`drop`機能により、その機能を持つ型の値をドロップできます。ドロップとは、値が転送されずMoveプログラムの実行時に実質的に破棄される事を意味します。そのためこの機能は、以下を含む多くの場所で値を無視する機能を制限します。
 
- ローカル変数またはパラメータの値を使用しない
- [`;`を介したシーケンス](./variables.md#expression-blocks)内の値を使用しない。
- [代入](./variables.md#assignments)時の変数の値を上書きする。
- [`*e1 = e2`の書き込み](./references.md#reading-and-writing-through-references)時、参照を介して値を上書きします。

値が`drop`した場合、その値内に含まれる全ての値は`drop`します。

### `ストア`

`store`機能により、この機能を持つ型の値がグローバルストレージ内の構造体(リソース)内へ存在出来る様になりますが、グローバルストレージ内の最上位のリソースとして存在出来るとは限りません。これは操作を直接ゲートしない唯一の機能です。そのかわり`key`と併用で使用された場合、グローバルストレージの存在をゲートします。

値が`store`である場合, その値が含む全ての値は`store`です。

### `キー`

`key`機能により、型を[グローバルストレージ操作](./global-storage-operators.md)のキーとして提供します。これは全てのグローバルストレージ操作をゲートし、型を`move_to`、`borrow_global`、`move_from`等で使用するには、型は`key`機能が必要です。

注意: 操作は`key`型が定義されているモジュールで使用する必要が有ります。(ある意味で、操作は定義モジュールに対してプライベートです)。

値が`key`である場合、その値が含む全ての値は`store`となります。これは、この種の非対称性を持つ唯一の機能です。

## 組み込み型

殆どのプリミティブな組み込み型には`copy`、`drop`、`store`　が有りますが、`signer`には無くただ`drop`が有ります。

- `bool`、`u8`、`u16`、`u32`、`u64`、`u128`、`u256`、`address`の全てが`copy`、`drop`、`store`を持ちます。
- `signer`は`drop`を持ちます。
  - コピー出来ず、グローバルストレージへ保存出来ません。　　
- `T`の機能に応じて`vector<T>`は`copy`、`drop`、`store`を持つ場合が有ります。
  - 詳細は[Conditional Abilities and Generic Types](#conditional-abilities-and-generic-types)を御覧下さい。
- 不変参照の`&`と可変参照の`&mut`はどちらも `copy`と`drop`を持ちます。
  - これは、参照先ではなく、参照内容自体をコピーして削除する事を指します。
  - 参照内容はグローバルストレージへ出現出来ないため、`store`は有りません。

プリミティブ型には`key`が無いため[グローバルストレージ操作](./global-storage-operators.md)で直接使用する事は出来ません。

## 構造体の注釈

`struct`が機能を持つ事を宣言するには、構造体名の後でありフィールドの前へ`has <ability>`を宣言します。例:

```move
struct Ignorable has drop { f: u64 }
struct Pair has copy, drop, store { x: u64, y: u64 }
```

この場合: `Ignorable`は`drop`機能が有ります。 `Pair`は`copy`、`drop`、`store`機能が有ります。

これらの機能は全て、ゲートされた操作に対して強力な保証を持っています。値が他のコレクション内に深くネストされている場合でも、その機能がある場合のみ値の上で操作を実行できます。
 
つまり、構造体の能力を宣言する場合、フィールドに特定の要件が課されます。すべてのフィールドがこれらの制約を満たす必要があります。これらのルールは、構造体が上記の機能の到達可能性ルールを満たすため必要です。構造体がその機能付きで宣言されている場合は...

- `copy`, 全てのフィールドは`copy`が必要です。
- `drop`, 全てのフィールドは`drop`が必要です。
- `store`, 全てのフィールドは`store`が必要です。
- `key`, 全てのフィールドは`store`が必要です。
  - `key` それ自体が必要としない現時点で唯一の機能です。

例えば：

```move
// 何の機能も持たない構造体
struct NoAbilities {}

struct WantsCopy has copy {
    f: NoAbilities, // エラー 'NoAbilities'には'copy'が有りません。
}
```

同様に:

```move
// 何の機能も持たない構造体
struct NoAbilities {}

struct MyResource has key {
    f: NoAbilities, // Error 'NoAbilities'には'store'が有りません。
}
```

## 条件付き機能とジェネリック型

ジェネリック型に機能が注釈付けされている場合、その型の全てのインスタンスがその機能を持つ事が保証されるわけではありません。この構造体宣言を検討して下さい。

```
struct Cup<T> has copy, drop, store, key { item: T }
```

機能に関係なく`Cup`が任意の型を保持出来ると非常に便利です。型システムは型パラメータを _見る_ 事が出来るため、その能力の保証に違反する型パラメータを見つけた場合は、`Cup`から機能を削除できるはずです。

この動作は最初は少し分かりにくいかもしれませんが、コレクション型について考えると理解し易いかもしれません。組み込み型の`vector`は以下の型宣言が有ると考える事が出来ます。

```
vector<T> has copy, drop, store;
```

`vector`はどの型でも動作する様にしたいです。異なる機能ごとに`vector`型を分けたくありません。では、必要なルールは何でしょうか? 上記のフィールドルールで必要なルールと全く同じです。つまり、内部要素をコピー出来る場合のみ`vector`値をコピーしても安全です。内部要素を無視/削除できる場合のみ`vector`値を無視しても安全です。

また、内部要素をグローバルストレージへ配置出来る場合のみ`vector`をグローバルストレージへ配置しても安全です。

この追加の表現力を持たせるため、型はその型のインスタンス化に応じて宣言された全ての機能を持つとは限りません。そのかわり、型が持つ機能はその宣言 _と_ 型引数次第です。どの型でも悲観的に、型パラメータは構造体内で使用されると想定されるため、型パラメータがフィールドに対して上記で説明した要件を満たしている場合のみ機能が付与されます。上記の例から`Cup`を取り上げます。

- `Cup`は`T`が`copy`を持っている場合のみ`copy`機能を持ちます。
- `T`が`drop`を持つ場合のみ`drop`を持ちます。
- `T`が`store`を持つ場合のみ`store`を持ちます。
- `T`が`store`を持つ場合のみ`key`を持ちます。

各機能の条件付きシステムの例がこちら。

### 例: 条件付き`copy`

```
struct NoAbilities {}
struct S has copy, drop { f: bool }
struct Cup<T> has copy, drop, store { item: T }

fun example(c_x: Cup<u64>, c_s: Cup<S>) {
    // 有効, 'u64'が'copy'を持っているので'Cup<u64>'は'copy'を持っています。 
    let c_x2 = copy c_x;
    // 有効, 'S'が'copy'を持っているので'Cup<S>'は'copy'を持っています。 
    let c_s2 = copy c_s;
}

fun invalid(c_account: Cup<signer>, c_n: Cup<NoAbilities>) {
    // 無効, 'Cup<signer>'は'copy'を持っていません。
    // 'Cup'がcopyで宣言されているにも関わらず、インスタンスには'copy'が有りません。
    // 'signer'には'copy'が無いため
    let c_account2 = copy c_account;
    // 無効, 'Cup<NoAbilities>'には'copy'が有りません。
    // 'NoAbilities'には'copy'が無いため
    let c_n2 = copy c_n;
}
```

### 例: 条件付き`drop`

```
struct NoAbilities {}
struct S has copy, drop { f: bool }
struct Cup<T> has copy, drop, store { item: T }

fun unused() {
    Cup<bool> { item: true }; // 有効, 'Cup<bool>'には'drop'が有ります。
    Cup<S> { item: S { f: false }}; // 有効, 'Cup<S>'には'drop'が有ります。
}

fun left_in_local(c_account: Cup<signer>): u64 {
    let c_b = Cup<bool> { item: true };
    let c_s = Cup<S> { item: S { f: false }};
    // 有効なリターン: 'c_account'、'c_b'、'c_s'には値が有ります。
    // ただし'Cup<signer>'、'Cup<bool>'、'Cup<S>'には'drop'が有ります。
    0
}

fun invalid_unused() {
    // 無効, 'drop'が無いため'Cup<NoAbilities>'は無視出来ません。
    // 'Cup'が'drop'で宣言されているにも関わらずインスタンスには'drop'が有りません。
    // 'NoAbilities'には'drop'が無いため。
    Cup<NoAbilities> { item: NoAbilities {}};
}

fun invalid_left_in_local(): u64 {
    let c_n = Cup<NoAbilities> { item: NoAbilities {}};
    // 無効なリターン: 'c_n'には値が有ります。
    // 'Cup<NoAbilities>'には'drop'が有りません。
  
    0
}
```

### 例: 条件付き `store`

```
struct Cup<T> has copy, drop, store { item: T }

// 'MyInnerResource'は'store'で宣言されているため全てのフィールドは'store'が必要です。
struct MyInnerResource has store {
    yes: Cup<u64>, // 有効, 'Cup<u64>'には'store'が有ります。
    // no: Cup<signer>,無効, 'Cup<signer>'には'store'が有りません。
}

// 'MyResource'は'key'で宣言されているため、全てのフィールドは'store'が必要です。
struct MyResource has key {
    yes: Cup<u64>, // 有効, 'Cup<u64>'には'store'が有ります。
    inner: Cup<MyInnerResource>, // 有効, 'Cup<MyInnerResource>'には'store'が有ります。
    // no: Cup<signer>, 無効, 'Cup<signer>'には'store'が有りません。
}
```

### 例: 条件付き `key`

```
struct NoAbilities {}
struct MyResource<T> has key { f: T }

fun valid(account: &signer) acquires MyResource {
    let addr = signer::address_of(account);
     // 有効, 'MyResource<u64>'には'key'が有ります。
    let has_resource = exists<MyResource<u64>>(addr);
    if (!has_resource) {
         // 有効, 'MyResource<u64>'には'key'が有ります。
        move_to(account, MyResource<u64> { f: 0 })
    };
    // 有効, 'MyResource<u64>'には'key'が有ります。
    let r = borrow_global_mut<MyResource<u64>>(addr)
    r.f = r.f + 1;
}

fun invalid(account: &signer) {
   // 無効, 'MyResource<NoAbilities>'には'key'が有りません。
   let has_it = exists<MyResource<NoAbilities>>(addr);
   // 無効, 'MyResource<NoAbilities>'には'key'が有りません。
   let NoAbilities {} = move_from<NoAbilities>(addr);
   // 無効, 'MyResource<NoAbilities>'には'key'が有りません。
   move_to(account, NoAbilities {});
   // 無効, 'MyResource<NoAbilities>'には'key'が有りません。
   borrow_global<NoAbilities>(addr);
}
```
