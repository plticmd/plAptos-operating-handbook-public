---
title: "Security"
---

<!-- ## Introduction -->
## セキュリティガイドライン

Move言語はセキュリティを考慮して設計されており、型システムやライナーロジック等のいくつかの機能を内在しています。しかし、その斬新さと一部のビジネスロジックの複雑さにより、開発者が Move の安全なコーディング パターンへ必ずしも精通しているわけではなく、バグが発生する可能性があります。

このガイドでは、一般的なアンチパターンとその安全な代替策を詳しく説明する事で、このギャップへ対処します。安全保障上の問題がどのように発生するかを示す実践的な例を提供し、安全なコーディングの最善の方法を推奨します。このガイドの目的は、Moveのセキュリティメカニズムへの開発者の理解を深め、スマートコントラクトの確固とした開発を確実にする事です。

## アクセス制御

---
<!-- (Docusaurus) Global Storage Access Controlへ移動-->
<!-- ### オブジェクトのアクセスチェック -->
<!-- Accepting a `&signer` is not always sufficient for access control purposes. Be sure to assert that the signer is the expected account, especially when performing sensitive operations.

Users without proper authorization can execute privileged actions. -->

### オブジェクトの所有権チェック
<!-- (Nextra) -->
<!-- Every Object<T> can be accessed by anyone, which means any Object<T> can be passed to any function, even if the caller doesn’t own it. It’s important to verify that the signer is the rightful owner of the object. -->
全ての`Object<T>`へ誰でもアクセス出来ます。即ち
呼び出し元が所有していなくても`Object<T>`はあらゆる関数へ渡せます。`signer`がオブジェクトの正当な所有者である事を確かめる事が重要です。

#### 安全でないコードの例

<!-- (Docusaurus) Global Storage Access Controlへ移動-->
<!-- This code snippet allows any user invoking the `delete` function to remove an `Object`, without verifying that the caller has the necessary permissions. -->

<!-- (Nextra) -->
<!-- In this module, a user must purchase a subscription before performing certain actions. The user invokes the registration function to acquire an Object<Subscription>, which they can use later to execute operations. -->
このモジュールでは、ユーザーは決定しているアクション実行する前にサブスクリプションを購入する必要があります。ユーザーは登録関数を呼び出して`Object<Subscription>`を取得し、後で操作を実行するためそれを使用出来ます。

<!-- (Docusaurus) Global Storage Access Controlへ移動-->
<!-- move 
    struct Object has key{
        data: vector<u8>
    }

    public fun delete(user: &signer, obj: Object) {
        let Object { data } = obj;
    } -->

<!-- (Nextra) -->
```move title="object_example.move"
module 0x42::example {
 
    struct Subscription has key {
        end_subscription: u64
    }
 
    entry fun registration(user: &signer, end_subscription: u64) {
        let price = calculate_subscription_price(end_subscription);
        payment(user,price);
 
        let user_address = address_of(user);
        let constructor_ref = object::create_object(user_address);
        let subscription_signer = object::generate_signer(&constructor_ref);
        move_to(&subscription_signer, Subscription { end_subscription });
    }
 
    entry fun execute_action_with_valid_subscription(
        user: &signer, obj: Object<Subscription>
    ) acquires Subscription {
        let object_address = object::object_address(&obj);
        let subscription = borrow_global<Subscription>(object_address);
        assert!(subscription.end_subscription >= aptos_framework::timestamp::now_seconds(),1);
        // subscriptionを使う
        [...]
    }
}
```
<!-- (Nextra) -->
<!-- In this insecure example, execute_action_with_valid_subscription does not verify if the user owns the obj passed to it. Consequently, anyone can use another person’s subscription, bypassing the payment requirement. -->
この安全でない例では`execute_action_with_valid_subscription`はユーザーが渡された`obj`を所有しているかどうかを確認しません。その結果、支払い要件を回避して誰でも他の人のサブスクリプションを使用出来ます。

#### 安全なコードの例

<!-- (Docusaurus) Global Storage Access Controlへ移動-->
<!-- A better alternative is to use the global storage provided by Move, by directly borrowing data off of `signer::address_of(signer)`. This approach ensures robust access control, as it exclusively accesses data contained within the address of the signer of the transaction. This method minimizes the risk of access control errors, ensuring that only the data owned by the `signer` can be manipulated. -->

<!-- move
struct Object has key{
	data: vector<u8>
}

public fun delete(user: &signer) {
	let Object { data } = move_from<Object>(signer::address_of(user));
}
``` -->

<!-- (Nextra)
Ensure that the signer owns the object. -->
署名者がオブジェクトを所有している事を確実にします。
```move title="object_example.move"
module 0x42::example {
 
    struct Subscription has key {
        end_subscription: u64
    }
 
    entry fun registration(user: &signer, end_subscription: u64) {
        let price = calculate_subscription_price(end_subscription);
        payment(user,price);
 
        let user_address = address_of(user);
        let constructor_ref = object::create_object(user_address);
        let subscription_signer = object::generate_signer(&constructor_ref);
        move_to(&subscription_signer, Subscription { end_subscription });
    }
 
    entry fun execute_action_with_valid_subscription(
        user: &signer, obj: Object<Subscription>
    ) acquires Subscription {
        //署名者がオブジェクトを所有している事を確実にします。
        assert!(object::owner(&obj)==address_of(user),ENOT_OWNWER);
        let object_address = object::object_address(&obj);
        let subscription = borrow_global<Subscription>(object_address);
        assert!(subscription.end_subscription >= aptos_framework::timestamp::now_seconds(),1);
        // subscriptionを使います。
        [...]
    }
}
```

<!-- タイトルは(Nextra)、中身はDocusaurusと同じ-->
<!-- ### Global Storage Access Control -->
### グローバルストレージアクセス制御

`&signer`を受け入れるだけでは、アクセス制御の目的では必ずしも充分ではありません。特に機密性の高い操作を実行する場合は、署名者が想定されるアカウントであることを断言しているか確認して下さい。

適切な権限を持たないユーザーでも特権アクションを実行出来ます。

### 安全でないコードの例

このコードスニペットを使うと`delete`関数を呼び出す全てのユーザーが、呼び出し元が必要な許可を得ているかどうか確認する事なく`Object`を削除出来ます。

```move
module 0x42::example {
  struct Object has key{
    data: vector<u8>
  }
 
  public fun delete(user: &signer, obj: Object) {
    let Object { data } = obj;
  }
}
```
### 安全なコードの例

より良い代替案は、Moveが提供するグローバルストレージを使用し、`signer::address_of(signer)`のデータを直接借用する事です。

このアプローチでは、トランザクションの署名者のアドレスへ含まれるデータへ独占的にアクセスするため、強力なアクセス制御を確実にします。この方法はアクセス制御エラーのリスクを最小限でおさえ、`signer`が所有するデータのみが操作可能となります。

```move
module 0x42::example {
  struct Object has key{
    data: vector<u8>
  }
 
  public fun delete(user: &signer) {
    let Object { data } = move_from<Object>(signer::address_of(user));
  }
}
```

### 関数の可視性

最小権限の原則を遵守します。

- 常にプライベート関数から開始し、ビジネスロジックの必要に応じて可視性を変更します。
- Aptos CLIまたはSDKを使って単体で使用する事を意図した関数を使い`entry`を利用します。
- 特定のモジュールでのみアクセス出来る関数を使い`friend`を利用します。
- 状態を変更せずストレージからデータを読み取る関数を使い`#[view]`デコレーターを利用します。

関数の可視性は、誰が関数を呼び出せるかを決定します。これはアクセス制御を強制する方法であり、スマートコントラクトのセキュリティにとって重大です。

- プライベート関数は、定義したモジュール内でのみ呼び出す事が出来ます。他のモジュールやCLI/SDK からはアクセスできず、コントラクト内部との意図しないやり取りが防止されます。

```move
module 0x42::example {
    fun sample_function() { ... }
}
```

- `public(friend)`関数は、指定された _フレンド_ モジュールが関数を呼び出す事を許可する事でこれを拡張し、一般的なアクセスを制限しながら、異なるコントラクト間の制御された相互作用を可能にします。

```move
module 0x42::example {
    friend package::module;

    public(friend) fun sample_function() { ... }
}
```

- `public`関数は、公開されたあらゆるモジュールまたはスクリプトから呼び出す事が出来ます。

```move
module 0x42::example {
    public fun sample_function() { ... }
}
```

- `#[view]`デコレートされた関数はストレージを変更出来ません。データを読み取るだけなので、状態変更のリスク無く情報へアクセスする安全な方法を提供します。

```move
module 0x42::example {
    #[view]
    public fun read_only() { ... }
}
```

- Moveの`entry`修飾子は、トランザクションのエントリポイントを示すため使用されます。`entry`修飾子を持つ関数は、トランザクションがブロックチェーンへ送信された時、実行の開始点として機能します。

```move
module 0x42::example {
    entry fun f(){}
}
```

要約すると:

|                | モジュール自体 | その他のモジュール                     | Aptos CLI/SDK |
| -------------- | ------------- | --------------------------------- | ------------- |
| プライベート        | ✅            | ⛔                                | ⛔            |
| public(フレンド) | ✅            | ✅ フレンドの場合<br></br>⛔ それ以外の場合 | ⛔            |
| public         | ✅            | ✅                                | ⛔            |
| エントリー          | ✅            | ⛔                                | ✅            |

この階層化された可視性により、許可されたエンティティのみが確定された機能を実行出来、コントラクトの整合性を損なうバグや攻撃のリスクが大幅に軽減されます。

注意: `entry`と`public`、もしくは`public(friend)`を組み合わせる可能性があります。

```move
module 0x42::example {
    public(friend) entry sample_function() { ... }
}
```

この場合`sample_function`は、Aptos CLI/SDK のどちらでも、フレンドとして宣言された任意のモジュールによって呼び出す事が出来ます。

#### インパクト

この原則に従うことで、関数が過度に公開される事がなくなり、関数のアクセス範囲がビジネスロジックで必要なもののみへ制限されます。

## 型とデータ構造

---

### ジェネリック型チェック

ジェネリクスを使用すると、異なる入力データ型に対し、関数や構造体を定義出来ます。
ジェネリクスを使用する場合は、ジェネリクス型が有効であり、期待どおりであることを確認して下さい。ジェネリクスの[詳細](https://aptos.dev/move/book/generics/)。

チェックされていないジェネリクスは、不正なアクションやトランザクションの中止へと繋がり、プロトコルの整合性を損なう可能性があります。

#### 安全でないコードの例

以下のコードは、フラッシュローンの簡略化されたバージョンの概要を示しています。

`flash_loan<T>`関数では、ユーザーは、指定された金額の **`T`** 型のコインを借りる事が出来ます。借りた金額とトランザクション終了前のプロトコルへ返される手数料を記録する`Receipt`をともないます。

この`repay_flash_loan<T>`関数は`Receipt`と`Coin<T>`をパラメータとして受け入れます。この関数は`Receipt`から返済額を抽出し、返された`Coin<T>`の値が`Receipt`で指定された金額以上であることを主張します。ただし、返された`Coin<T>`が最初に借りた`Coin<T>`と同じである事を確認するチェックは行われないため、より安い価格のコインでローンを返済出来てしまいます。

```move
module 0x42::example {
    struct Coin<T> {
        amount: u64
    }

    struct Receipt {
        amount: u64
    }

    public fun flash_loan<T>(user: &signer, amount: u64): (Coin<T>, Receipt) {
        // let coin, fee = withdraw(user, amount);　（Docusaurus）
        let (coin, fee) = withdraw(user, amount);  //(Nextra)
        ( coin, Receipt {amount: amount + fee} )
    }

    public fun repay_flash_loan<T>(rec: Receipt, coins: Coin<T>) {
        let Receipt{ amount } = rec;
        assert!(coin::value<T>(&coin) >= rec.amount, 0);
        deposit(coin);
    }
}
```

####  安全なコードの例

以下のAptosフレームワークサンプルは、2つのジェネリック型`K`と`V`で構成されるkey-valueテーブルを作成します。その関連する`add`関数は、`Table<K, V>`オブジェクト、`key`、`K`と`V`型の`value`をパラメータとして受け入れます。

`phantom`構文により、キーと値の型がテーブル内の型と異なることはなく、型の不一致を防止します。`phantom`型パラメータの詳細は[詳細](https://aptos.dev/move/book/generics/#phantom-type-parameters)を御覧下さい。

```move
module 0x42::example {
    struct Table<phantom K: copy + drop, phantom V> has store {
        handle: address,
    }

    public fun add<K: copy + drop, V>(table: &mut Table<K, V>, key: K, val: V) {
        add_box<K, V, Box<V>>(table, key, Box { val })
    }
}
```

Move言語が提供する設計上の型チェックを考慮すると、フラッシュローンプロトコルのコードを改良出来ます。以下のコードは`repay_flash_loan`へ渡したコインが最初借りたコインと合致する事を確実にします。

```move
module 0x42::example {
    struct Coin<T> {
        amount: u64
    }
    struct Receipt<phantom T> {
        amount: u64
    }

    public fun flash_loan<T>(_user: &signer, amount:u64): (Coin<T>, Receipt<T>){
        // let coin, fee = withdraw(user, amount); (Docusaurus)
        let (coin, fee) = withdraw(user, amount);  //(Nextra)
        (coin,Receipt { amount: amount + fee})
    }

    public fun repay_flash_loan<T>(rec: Receipt<T>, coins: Coin<T>){
        let Receipt{ amount } = rec;
        assert!(coin::value<T>(&coin) >= rec.amount, 0);
        deposit(coin);
    }
}
```

### リソース管理と無制限実行

効果的なリソース管理と無制限実行防止は、プロトコルのセキュリティとガス効率を維持するため重要です。コントラクト設計では、以下の考慮が重要です。

1. パブリックでアクセス可能な構造体での反復処理を回避して下さい。これは無制限のエントリを許可し、任意の数のユーザーが制約なしで寄与出来てしまいます。
2. コインやNFT等のユーザー固有の資産を個々のユーザーアカウント内へ保存します。
3. モジュールまたはパッケージ関連の情報を、ユーザーデータとは別にオブジェクト内へ保持します。
4. 全てのユーザー操作を単一の共有グローバルスペースへ結合するのではなく、個々のユーザーごと分離します。

#### インパクト

これらの側面を怠ると、攻撃者はガスを使い果たし、トランザクションを中止出来てしまいます。これは、アプリケーションの機能をブロックする可能性があります。

#### 安全でないコードの例

以下のコードは、全てのオープンオーダーを反復するループを示しており、多くのオーダーを登録するとブロックされる可能性があります。

```move
module 0x42::example {
    public fun get_order_by_id(order_id: u64): Option<Order> acquires OrderStore{
        let order_store = borrow_global_mut<OrderStore>(@admin);
        let i = 0;
        let len = vector::length(&order_store.orders);
        while (i < len) {
            let order = vector::borrow<Order>(&order_store.orders, i);
            if (order.id == order_id) {
                return option::some(*order)
            };
            i = i + 1;
        };
        return option::none<Order>()
    }
    //O(1) in time and gas operation.
    public entry fun create_order(buyer: &signer) { ... }
}
```

#### 安全なコードの例

各ユーザーのオーダーが単一のグローバルオーダーストアではなく、それぞれのアカウントへ保存される様オーダー管理システムを構成する事をお勧めします。このアプローチは、ユーザーデータを隔離する事でセキュリティを強化するだけでなく、データ負荷を分配することでスケーラビリティも改善されます。

グローバルストアへアクセスする
 **`borrow_global_mut<OrderStore>(@admin)`** を使用するのではなく、オーダーは個々のユーザーのアカウントを通じてアクセスされる必要があります。

```move
module 0x42::example {
    public fun get_order_by_id(user: &signer order_id: u64): Option<Order> acquires OrderStore{
        let order_store = borrow_global_mut<OrderStore>(signer::address_of(user));
        if (smart_table::contains(&order_store.orders, order_id)) {
            let order = smart_table::borrow(&order_store.orders, order_id);
            option::some(*order)
        } else {
            option::none<Order>()
        }
    }
}
```

実行される操作の特定の要望へ合わせて調整された効率の良いデータ構造の利用もお勧めします。
例えば、 **`SmartTable`** はこのコンテキストで特に効果的です。

### Move機能

Moveの機能は、言語内のデータ構造での可能なアクションを制御する許可のセットです。スマートコントラクト開発者は、これらの機能を慎重に扱い、必要な場合のみ割り当てられるようにし、その影響を理解し、セキュリティの脆弱性を防ぐ必要があります。

| 機能 | 解説                                                                                                            |
| ------- | ---------------------------------------------------------------------------------------------------------------------- |
| コピー    |     値の複製を許可し、契約内で複数回使用出来るようにします。             |
| ドロップ    | 値をメモリから破棄出来る様にします。リソースを制御し、リークを防ぐため必要です。          |
| ストア   | グローバルストレージへのデータの保存を可能にします。トランザクション間でデータを存続するのは危機的。                       |
| 鍵     | データ取得と処理で重要な、グローバルストレージ操作での鍵として提供する機能をデータへ付与します。
 |

機能の[詳細](https://aptos.dev/move/book/abilities/)。

機能を誤って使用すると、機密データの不正コピー (`copy`)、リソース漏洩 (`drop`)、グローバルストレージの誤った取り扱い(`store`)等のセキュリティ問題が発生する可能性があります。

#### 安全でないコードの例

```move
module 0x42::example {
    struct Token has copy { }
    struct FlashLoan has drop { }
}
```

- `Token`の`copy`機能によりトークンの複製が可能となり、二重支払いやトークン供給のインフレが発生し、通貨の価値が下がる可能性があります。
- `FlashLoan`構造体内で`drop`機能の使用を許可すると、借り手が返済前にローンを破棄する事でローンから抜け出す事が許可される可能性があります。

## 算術演算

---

### 除算精度

切り捨てによって精度が低下する算術演算により、プロトコルがこれらの計算の結果を過小報告する可能性があります。

Moveは`u8`、`u16`、`u32`、`u64`、`u128`、`u256`の6つの符号なし整数データ型を含みます。Moveの除算演算では小数部分を切り捨て、効果的に最も近い整数に切り捨てるため、プロトコルがこのような計算結果を過小評価する可能性があります。

計算上の丸め誤差は、財務上の不均衡、データの不正確さ、意思決定プロセスの欠陥など、広範囲で影響を及ぼす可能性があります。これらの誤差は、収益の損失、不当な利益の創出、さらには安全上のリスク(コンテキスト次第ですが)、をもたらす可能性があります。システムの信頼性とユーザーの信頼を維持するため、正確で精密な計算が不可欠です。

#### 安全でないコードの例

```move
module 0x42::example {
    public fun calculate_protocol_fees(size: u64): (u64) {
        return size * PROTOCOL_FEE_BPS / 10000
    }
}
```

`size`が`10000 / PROTOCOL_FEE_BPS`より小さい場合、手数料を0に切り捨て、ユーザーは手数料を実質負担することなくプロトコルと交流出来ます。

#### 安全なコードの例

以下の例で、コードの問題を軽減するための2つの異なる戦略の概要を示します。

- 最小の注文サイズのしきい値を`10000 / PROTOCOL_FEE_BPS`より大きく設定し、手数料がゼロへ切り捨てる事がないよう確実にします。

```move
module 0x42::example {
    const MIN_ORDER_SIZE: u64 = 10000 / PROTOCOL_FEE_BPS + 1;

    public fun calculate_protocol_fees(size: u64): (u64) {
        assert!(size >= MIN_ORDER_SIZE, 0);
        return size * PROTOCOL_FEE_BPS / 10000
    }
}
```

- 手数料がゼロでないことを確認し、最低手数料を設定したり、取引を拒否するなど、具体的な処理をします。

```move
module 0x42::example {
    public fun calculate_protocol_fees(size: u64): (u64) {
        let fee = size * PROTOCOL_FEE_BPS / 10000;
        assert!(fee > 0, 0);
        return fee;
    }
}
```

### 整数の考慮事項

Moveでは、整数演算に関するセキュリティは、予期しない動作や脆弱性の原因となるオーバーフローとアンダーフローを防止するよう設計されています。具体的には、

- 加算(`+`)及び乗算(`*`)は、結果が整数型に対して大きすぎる場合、プログラムが中止する原因となります。このコンテキストでの中止は、プログラムが即終了する事を意味します。
- 減算 (`-`)は結果がゼロ未満の場合は中止します。
- 除算(`/`)は除数がゼロの場合中止します。
- 左シフト(`<<`)は、オーバーフローが発生しても中止しないという点で独特です。即ち、シフトされたビットが整数型の記憶容量を超えた場合、プログラムは終了せず、結果、不適切な値や予測不能な動作が発生します。

演算の詳細は[Read more](https://aptos.dev/move/book/integers/#operations)を御覧下さい。

不正な操作により、望ましくない中止が発生したり、不正確なデータが計算されたりして、スマート コントラクトの正しい実行が予期せず変更される可能性があります。
悪い演算により、望まない中止が原因で、もしくは誤ったデータの計算により、正しいスマートコントラクトの実行が予期せず変更される可能性が有ります。

## Aptosオブジェクト

---

### ConstructorRefリーク

オブジェクトを作成する時は、オブジェクトの`ConstructorRef`を公開しないようにしてください。(オブジェクトへリソースを追加出来てしまうため)

`ConstructorRef`はオブジェクトの所有権を変更または譲渡するために使用される、他の機能(または「Ref」)を生成するためにも使用できます。オブジェクトの機能の詳細は[Read more](https://aptos.dev/standards/aptos-object/#object-capabilities-refs)を御覧下さい。

#### 脆弱なコードの例

例えば、`mint`関数がNFTに対して`ConstructorRef`を返す場合それを`TransferRef`へ変換し、グローバルストレージへ保存すると、元の所有者がNFTを販売後、返送する事が出来てしまいます。

```move
module 0x42::example {
  use std::string::utf8;
 
  public fun mint(creator: &signer): ConstructorRef {
    let constructor_ref = token::create_named_token(
        creator,
        string::utf8(b"Collection Name"),
        string::utf8(b"Collection Description"),
        string::utf8(b"Token"),
        option::none(),
        string::utf8(b"https://mycollection/token.jpeg"),
    );
    constructor_ref
  }
}
```

#### 安全なコードの例

`mint`関数内で`CostructorRef`を返さないで下さい。

```move
module 0x42::example {
  use std::string::utf8;
 
  public fun mint(creator: &signer) {
    let constructor_ref = token::create_named_token(
        creator,
        string::utf8(b"Collection Name"),
        string::utf8(b"Collection Description"),
        string::utf8(b"Token"),
        option::none(),
        string::utf8(b"https://mycollection/token.jpeg"),
    );
  }
}
```

### オブジェクトアカウント

Aptosフレームワークでは、複数の`key`-ableリソースを単一のオブジェクトアカウントへ保存出来ます。が、オブジェクトは別のアカウントへ隔離する必要があります。でなければ、ひとつのアカウント内のひとつのオブジェクトへの変更がコレクション全体へ影響する可能性があります。
 
例えば、ひとつのリソースの転送は、グループメンバー全員の転送を意味します。transfer関数が、`ObjectCore`で演算しているためです。`ObjectCore`は基本的にひとつの総合的なタグであり、アカウントの全リソースで使います。


Aptosオブジェクトの詳細は[こちら](https://aptos.dev/standards/aptos-object/)。

#### 安全でないコードの例

`mint_two`関数を使用すると`sender`自体が`Monkey`を作成し、`recipient`(受信者)へ`Toad`を送信します。

`Monkey`と`Toad`は同じオブジェクトアカウントへ所属しているため、結果として両方のオブジェクトは`recipient`(受信者)が所有しています。

```move
module 0x42::example {
    #[resource_group(scope = global)]
    struct ObjectGroup { }

    #[resource_group_member(group = 0x42::module::ObjectGroup)]
    struct Monkey has store, key { }

    #[resource_group_member(group = 0x42::module::ObjectGroup)]
    struct Toad has store, key { }

    fun mint_two(sender: &signer, recipient: &signer) {
        let constructor_ref = &Object::create_object_from_account(sender);
        let sender_object_signer = Object::generate_signer(constructor_ref);
        let sender_object_addr = object::address_from_constructor_ref(constructor_ref);

        move_to(sender_object_signer, Monkey{});
        move_to(sender_object_signer, Toad{});
        let monkey_object: Object<Monkey> = object::address_to_object<Monkey>(sender_object_addr);
        object::transfer<Monkey>(sender, monkey_object, signer::address_of(recipient));
    }
}
```

#### 安全なコードの例

この例では、オブジェクトは別々のオブジェクトアカウントへ保存する必要があります。

 <!-- (Nextra) -->
```move
module 0x42::example {
  #[resource_group(scope = global)]
  struct ObjectGroup { }
 
  #[resource_group_member(group = 0x42::example::ObjectGroup)]
  struct Monkey has store, key { }
 
  #[resource_group_member(group = 0x42::example::ObjectGroup)]
  struct Toad has store, key { }
 
  fun mint_two(sender: &signer, recipient: &signer) {
    let sender_address = signer::address_of(sender);
 
    let constructor_ref_monkey = &object::create_object(sender_address);
    let constructor_ref_toad = &object::create_object(sender_address);
    let object_signer_monkey = object::generate_signer(&constructor_ref_monkey);
    let object_signer_toad = object::generate_signer(&constructor_ref_toad);
 
    move_to(object_signer_monkey, Monkey{});
    move_to(object_signer_toad, Toad{});
 
    let object_address_monkey = signer::address_of(&object_signer_monkey);
 
    let monkey_object: Object<Monkey> = object::address_to_object<Monkey>(object_address_monkey);
    object::transfer<Monkey>(sender, monkey_object, signer::address_of(recipient));
  }
}
```

## ビジネスロジック

---

### フロントランニング

フロントランニングとは、他の人が既に成立していて将来実行される事の情報を不当利用し、他の人よりも先にトランザクションを実行する事です。この戦術により、フロントランナーは保留中のトランザクションの結果を予測して利益を得ることが出来るため、不当な利益が得られます。

フロントランニングで、分散型アプリケーションの公平性と完全性が損なわれる可能性があります。資金の損失、ゲームでの不公平な優位性、市場価格の操作、プラットフォームの全体的な信頼の喪失へ繋がる可能性が有ります。

#### 安全でないコードの例

宝くじのシナリオでは、ユーザーは1から100までの数字を選択して参加します。ある時点でゲーム管理者は当選番号を設定する`set_winner_number`関数を呼び出します。その後別のトランザクションで、管理者は全てのプレイヤーの賭けを確認し、`evaluate_bets_and_determine_winners`を介して当選者を決定します。
 
`set_winner_number`によって設定された当選番号を観察しているフロントランナーは、`evaluate_bets_and_determine_winners`の実行前、当選番号と一致するよう遅れて賭けを提出したり、既存の賭けを変更する事が出来ます。 

```move
module 0x42::example {
    struct LotteryInfo {
        winning_number: u8,
        is_winner_set: bool,
    }

    struct Bets { }

    public fun set_winning_number(admin: &signer, winning_number: u8) {
        assert!(signer::address_of(admin) == @admin, 0);
        assert!(winning_number < 10,0);
        let lottery_info = LotteryInfo { winning_number, is_winner_set: true };
        move_to<LotteryInfo>(admin, lottery_info);
    }

    public fun evaluate_bets_and_determine_winners(admin: &signer) acquires LotteryInfo, Bets {
        assert!(signer::address_of(admin) == @admin, 0);
        let lottery_info = borrow_global<LotteryInfo>(admin);
        assert(lottery_info.is_winner_set, 1);

        let bets = borrow_global<Bets>(admin);
        let winners: vector<address> = vector::empty();

        let winning_bets_option = smart_table::borrow_with_default(&bets.bets, lottery_info.winning_number, &vector::empty());

        vector::iter(winning_bets_option, |bet| {
        vector::push_back(&mut winners, bet.player);
        });
        distribute_rewards(&winners);
    }
}
```

#### 安全なコードの例

フロントランニングを回避するための効果的な戦略
は、答えを公開してゲームを1回のトランザクションで終了する`finalize_lottery`関数を実装し、他の関数を非公開にする事かもしれません。

このアプローチにより、答えが公開されるとすぐシステムが新しい答えを受け付けなくなる事が保証されるため、フロントランニングの可能性が排除されます。

```move
module 0x42::example {
    public fun finalize_lottery(admin: &signer, winning_number: u64) {
        set_winner_number(admin, winning_number);
        evaluate_bets_and_determine_winners(admin);
    }

    fun set_winning_number(admin: &signer, winning_number: u64) { }

    fun evaluate_bets_and_determine_winners(admin: &signer) acquires LotteryInfo, Bets { }
}
```

### 価格オラクル操作

Defiアプリケーションでは、トークンのペアの流動性比率を利用して取引価格を決定する価格オラクルは操作されやすい可能性があります。この脆弱性は、流動性比率が大量のトークンを保有する市場参加者の影響を受け易いという事実から生じます。これらの参加者が戦略的なトークン保有量の増減を行うと流動性比率が影響を受け、結果として価格オラクルが決定する価格へ影響を及ぼし、プールが枯渇する可能性があります。

価格を決定する際は複数のオラクルを使用する事をお勧めします。

#### 安全なコードの例

Thala、例えば階層型オラクル設計を採用しています。このシステムはプライマリオラクルとセカンダリオラクルがあります。オラクルのひとつに障害が発生した場合、もうひとつが複雑な切り替えロジックに基づいてバックアップとして機能します。
このシステムは敵対的な状況を考慮して設計されており、常に最小限のガバナンス相互作用で非常に正確な価格フィードを提供するよう努めています。


より詳細な情報は[Thalaのドキュメント](https://docs.thala.fi/thala-protocol-design/move-dollar-mod/oracles)を参照して下さい。

### トークン識別子の衝突

トークンの取引の時、トークン構造体を比較する方法を確実にし、決定論的な順序が衝突を引き起こさない様確立してください。アドレス、モジュール、構造体の名前をベクター内へ連結するだけでは不充分です。一意として扱う必要がある類似の名前を区別しないためです。

その結果、トークン構造の比較の際の衝突により、プロトコルが正当なスワップペアを誤って拒否する可能性があります。この見落としにより、スワップ操作の整合性で妥協し、資金の損失へ繋がる可能性があります。

#### 安全でないコードの例

`get_pool_address`関数は、代替資産の取引ペアと関連付けられた流動性プールの一意のアドレスを作成します。指定した2つのトークンの流動性プールの個別の識別子として機能するアドレスを生成して返します。
 
ただし、ユーザーは任意のシンボルを選択して`Object<Metadata>`を作成する自由があります。この柔軟性により、他の既存のインスタンスを模倣した`Object<Metadata>`インスタンスを作成する事があります。この問題の結果シード衝突となり、プールアドレスの生成時、衝突が発生する可能性があります。

```move
module 0x42::example {
    public fun get_pool_address(token_1: Object<Metadata>, token_2: Object<Metadata>): address {
        let token_symbol = string::utf8(b"LP-");
        string::append(&mut token_symbol, fungible_asset::symbol(token_1));
        string::append_utf8(&mut token_symbol, b"-");
        string::append(&mut token_symbol, fungible_asset::symbol(token_2));
        let seed = *string::bytes(&token_symbol);
        object::create_object_address(&@swap, seed)
    }
}
```

#### 安全なコードの例

`object::object_address`は各`Object<Metadata>`へ一意の識別子を返します。

```move
module 0x42::example {
    public fun get_pool_address(token_1: Object<Metadata>, token_2: Object<Metadata>): address {
        let seeds = vector[];
        vector::append(&mut seeds, bcs::to_bytes(&object::object_address(&token_1)));
        vector::append(&mut seeds, bcs::to_bytes(&object::object_address(&token_2)));
        object::create_object_address(&@swap, seed)
    }
}
```

## オペレーション

---

### 一時停止機能

プロトコルは、実質的に操作を一時停止する能力を持つ必要があります。不変のプロトコルの場合、組み込みの一時停止機能が必要です。アップグレード可能なプロトコルは、スマートコントラクト機能またはプロトコルのアップグレードによって一時停止を達成できます。チームは、このプロセスを迅速かつ効率的に実行するための自動化を装備する必要があります。

一時停止メカニズムがないと、脆弱性に長期間さらされ、結果、重大な損失の可能性があります。

効率的な一時停止機能により、セキュリティの脅威、バグ、その他の重大な問題に迅速に対応出来、不当利用リスクを最小限へ抑え、ユーザー資産の安全性とプロトコルの統合性を確保出来ます。

#### 安全なコードの例

一時停止機能を統合する方法の例

```move
module 0x42::example {
    struct State {
        is_paused: bool,
    }

    public entry fun pause_protocol(admin: &signer) {
        let state = borrow_global_mut<State>(@protocol_address);
        state.is_paused = true;
    }

    public entry fun resume_protocol(admin: &signer) {
        let state = borrow_global_mut<State>(@protocol_address);
        state.is_paused = false;
    }

    public fun main(user: &signer) {
        let state = borrow_global<State>(@protocol_address);
        assert!(!state.is_paused, 0);
        [...]
    }
}
```

### スマートコントラクト公開用の鍵の管理

テストネットとメインネットで同じアカウントを使用すると、セキュリティ上のリスクが生じます。テストネットの秘密鍵は、安全性の低い環境（ラップトップ等）へ保存される事が多く、簡単に露出したり漏洩する可能性が有ります。テストネットのスマートコントラクトの秘密鍵を取得できる攻撃者は、メインネットのスマートコントラクトをアップグレードする事が出来ます。
 
## ランダム性 <!-- (Nextra) -->
---

ランダム性の詳細と、乱数の予測可能性を防ぐためにランダム性がなぜ不可欠なのか、このページ[ランダム性ガイド](https://aptos.dev/en/build/smart-contracts/randomness)を参照して下さい。

### ランダム性 - テストと中止
    
 _Aptosはセキュリティ第一です。コンパイル中は、パブリック関数からランダム性APIが呼び出されないようにします。ただし、パブリック関数へ属性`#[lint::allow_unsafe_randomness]`を追加する事で、ユーザーがこの選択を行えるようにしています。_
     

`public`関数が直接的または間接的にランダム性API を呼び出す場合、悪意のあるユーザーはこの関数の構成能力を悪用し、結果が期待通りでない場合はトランザクションを中止出来ます。これにより、ユーザーは有益な結果へ達するまで試行し続け、ランダム性が損なわれます。

#### 脆弱なコードの例

```move title="randomness_example.move"
module user::lottery {
    fun mint_to_user(user: &signer) {
        move_to(user, WIN {});
    }
 
    #[lint::allow_unsafe_randomness]
    public entry fun play(user: &signer) {
        let random_value = aptos_framework::randomness::u64_range(0, 100);
        if (random_value == 42) {
            mint_to_user(user);
        }
    }
}
```

この例では、`play`関数は`public`であり、他のモジュールと組み合わせる事が出来ます。悪意のあるユーザーはこの関数を呼び出して、勝ったかどうかを確認出来ます。勝っていなければ、トランザクションを中止して再試行出来ます。

```move title="randomness_example.move"
module attacker::exploit {
    entry fun exploit(attacker: &signer) {
        @user::lottery::play(attacker);
        assert!(exists<@user::lottery::WIN>(address_of(attacker)));
    }
}
```

起こり得る問題を解決するには、直接的または間接的にランダム性APIを呼び出す全ての関数の可視性を`public`や`public entr`ではなく`entry`へ設定するだけで充分です。

#### 安全なコードの例

```move title="randomness_example.move"
module user::lottery {
    fun mint_to_user(user: &signer) {
        move_to(user, WIN {});
    }
 
    #[lint::allow_unsafe_randomness]
    entry fun play(user: &signer) {
        let random_value = aptos_framework::randomness::u64_range(0, 100);
        if (random_value == 42) {
            mint_to_user(user);
        }
    }
}
```

### ランダム性 - ガス不足

関数内の異なるコードパスが異なる量のガスを消費する場合、攻撃者はガス制限を操作して結果を偏らせる事が出来ます。どのように異なるパスが異なる量のガスを消費するのか例を見てみましょう。

#### 脆弱なコードの例

```move title="randomness_example.move"
module user::lottery {
 
    //10aptosを管理者からユーザーへ送金します
    fun win(user: &signer) {
        let admin_signer = &get_admin_signer();
        let aptos_metadata = get_aptos_metadata();
        primary_fungible_store::transfer(admin_signer, aptos_metadata, address_of(user),10);
    }
 
    //10aptosをユーザーから管理者へ送金し、1aptosを管理者からfee_adminへ送金します
    transfer 10 aptos from user to admin, then 1 aptos from admin to fee_admin
    fun lose(user: &signer) {
 
        //ユーザーから管理者へ
        let aptos_metadata = get_aptos_metadata();
        primary_fungible_store::transfer(user, aptos_metadata, @admin, 10);
 
        //管理者からfee_adminへ
        let admin_signer = &get_admin_signer();
        primary_fungible_store::transfer(admin_signer, aptos_metadata, @fee_admin, 1);
    }
 
    #[randomness]
    entry fun play(user: &signer) {
        let random_value = aptos_framework::randomness::u64_range(0, 100);
        if (random_value == 42) {
            win(user);
        } else {
            lose(user);
        }
    }
}
```

この宝くじの例では、`win`と`lose`は異なる量のガスを消費します。`lose`関数は`win`関数よりも多くのガスを消費します。攻撃者は`win`には充分だが`lose`には充分ではない最大ガス制限を設定出来ます。これにより`lose`パスが選択される時、トランザクションが強制的に中止され、ユーザーが`lose`パスを実行する事が無くなります。 その後、ユーザーは当選するまで関数を繰り返し呼び出す事が出来ます。

#### 安全なコードの例

コードを保護する別の方法が有ります。

- 良い結果の時、悪い結果以上のガスを使うようにします。
- 管理者アドレスのみがランダム性APIを呼び出せるようにします。
- ランダム結果に関係なくエントリー関数が機能するようにします。これはランダムな結果をコミットしランダム結果を使用して別のトランザクションでアクションを提供する事で処理出来ます。
ガスの使用を一定で保つため、ランダム性に基づく即時のアクションは避けてください。

_将来、より複雑なコードでもガス不足攻撃に対して安全を確保できるよう、より多くの機能を提供します。_
   
