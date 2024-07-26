---
title: "Aptos Digital Asset Standard"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Aptosデジタル資産スタンダード 

## NFTの概要

[NFT](https://en.wikipedia.org/wiki/Non-fungible_token)は代替不可能な[トークン](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/token.move)
もしくはデータで、ブロックチェーンへ資産の所有権が一位に定義され保存されます。NFTはまず[EIP-721](https://eips.ethereum.org/EIPS/eip-721)へ定義され、後で[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)で拡張されます。
NFTは一般的に以下の項目を使用して定義されます。

- `name`: 資産の名前。コレクション内で一意である必要が有ります。
- `description`: 資産の説明。
- `uri`: 資産の詳細情報のためのオフチェーンへのURLポインター。資産は画像や動画やメタデータ等のメディアも可能。 
- `supply`: このNFTの総ユニット数。多くのNFTはひとつの供給のみですが、複数供給の物はエディションとして参照されます。

殆どのNFTはコレクションや、共通の属性（例えばテーマ、作成者、最小限のコントラクト等）のNFTのセットの一部です。各コレクションは同様の属性のセットが有ります。
 
- `name`: コレクションの名前。名前は作成者のアカウト内で一意である必要が有ります。 
- `description`: コレクションの説明。
- `uri`: 資産の情報のためのオフチェーンのURLポインター。資産は画像、動画、メタデータ等のメディアが適用可能です。
- `supply`: このコレクション内の NFT の総数。
- `maximum`: このコレクションが保持できる最大のNFT数。`maximum`を0で設定した場合、供給は追跡されません。

## 設計原則

The [Aptosデジタル資産スタンダード](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/token.move)は、以下の点でAptosトークン標準を改良して構築されました。

- **柔軟性** - NFTは柔軟性があり、あらゆる創造的なデザインに合わせてカスタマイズできます。
- **構成可能性** - 最終的なオブジェクトがその部分の合計よりも大きくなる様、複数のNFTを互いに簡単に構成できます。
- **スケーラビリティ** - トークン間の並列性の向上

基本のトークンは最小限の機能のみを提供し、より多くの機能が追加されて構築されます。これらの全関数は非エントリーであり、オフチェーンから直接呼び出す事は出来ません。作成者はこれらの機能を使用するかフレームワークのノーコードソリューションを使って自分のモジュールを書き込む必要が有ります。解決策の一つは[aptos_token](#aptos-token)で、カスタムメタデータ(プロパティーマップ経由)とソウルバウンド等の機能を提供します。

## 従来のAptosトークン標準との比較

デジタル アセットは、Moveで以前使用されていたアカウントリソースではなく、Aptos[オブジェクト](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-framework/sources/object.move)を使用します。これにより、アカウントの外部へデータを強化し、柔軟性が追加されます。

- トークンはフレームワークの変更を要求する事なくカスタムデータと機能を簡単に拡張出来ます。
- 送金は単純な参照の更新です。
- オプトイン無しで直接送金が許可されます。
- NFTは他のNFTを追加を所有、簡単に構成出来ます。
- ソウルバウンドトークンは簡単にサポートされます。

## オブジェクトとしてのコレクションとトークン

このトークン標準では、コレクションとトークンのどちらとも別個の[オブジェクト](./aptos-object.md)となります。これらは各自別のアドレスを持ち、オンチェーンでもオフチェーンでもアドレスによって参照出来ます。
各オブジェクトは複数のリソースを含む事が出来、コレクションとトークンはデフォルトで拡張可能で作成者はフレームワークを変更せずカスタムデータと機能を追加出来ます。

オンチェーンでは、別の構造体が以下の様なコレクションやトークンオブジェクトの参照を含む事が出来ます。

```rust
struct ReferenceExample has key {
    my_collection: Object<Collection>,
    my_token: Object<Token>,
}
```

 `my_collection`と`my_token`は両方とも(`Object<>`ラッパー付き)へ位置します。

オフチェーンでは、オブジェクトのアドレスはトランザクション作成によって呼び出されるエントリー関数のオブジェクトの引数を交換して渡されます。引数として、例えば

```rust
public entry fun my_function(my_collection: Object<Collection>) {
    // Do something with the collection
}
```
コレクションとトークンアドレスは、フルノードAPIを介して全てのリソースを取得、もしくはindexingサービスに対してデータのクエリでも使用されます。

### ロイヤリティー

オブジェクトの拡張パターンに従い、ロイヤリティーはコレクションやトークンへ追加されます。[ロイヤリティーモジュール](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/royalty.move)が供給する関連機能を持ったリソースとして追加されます。ロイヤリティーは`MutatorRef`に限って更新され、保存可能な構造物であり、権限を付与し、作成時間に生成され保存されます。`MutatorRef`の保存と使用方法についての例は[Aptosトークン](#aptos-token)を御覧下さい。もしコレクションと違うロイヤリティー構成なら、ロイヤリティーはトークン上で直接設定出来ます。 

## トークンのライフサイクル

全てのデジタルアセットモジュールは予約されたフレームワークアドレス`0x4`へデプロイされます。

### コレクションの作成

全てのトークンはコレクションへ属します。開発者はまず以下を利用してコレクションを作成する必要が有ります。

1. 固定最大供給量。現在の供給は追跡され、最大設定値を超越する事は出来ません。

```rust
use aptos_token_objects::collection;

public entry fun create_collection(creator: &signer) {
    let max_supply = 1000;
    collection::create_fixed_collection(
        creator,
        "My Collection Description",
        max_supply,
        "My Collection",
        royalty,
        "https://mycollection.com",
    );
}
```

2. 無制限の供給。現在の供給は追跡されていますが、最大値は強制されません。

```rust
public entry fun create_collection(creator: &signer) {
    collection::create_unlimited_collection(
        creator,
        "My Collection Description",
        "My Collection",
        royalty,
        "https://mycollection.com",
    );
}
```

どちらも現在の供給を追跡するのでご注意下さい。コレクションを作成した後は最大供給は変更出来ません。コレクションは無限にコンバート出来ません又は逆に固定供給も出来ません。

コレクションには次の属性があります。

- コレクション名 - 各アカウントで一意。一人の作成者アカウントは同じアカウント名で複数のコレクションを作成出来ないという意味です。
- 説明 - `MutatorRef`で2048もじ未満で変更可能。
- URIの長さ - `MutatorRef`で512文字未満で変更可能。
- ロイヤリティ -　販売価格の何％を作成者のコレクションへ支払うのか指定する。これはロイヤリティーモジュールで生成される`MutatorRef`で変更出来ます。

`MutatorRef`、変更を許可する保存可能な構造体で、コレクションが作成される時のみ生成される。作成されると、`MutatorRef`の保有者は`description`と コレクションの`URI length`を変更出来ます。

```rust
public entry fun create_collection(creator: &signer) {
    let collection_constructor_ref = &collection::create_unlimited_collection(
        creator,
        "My Collection Description",
        "My Collection",
        royalty,
        "https://mycollection.com",
    );
    let mutator_ref = collection::get_mutator_ref(collection_constructor_ref);
    // Store the mutator ref somewhere safe
}
```

### コレクションのカスタマイズ

データ(リソースとして)又は機能を追加する事でコレクションをカスタマイズ出来ます。例えば、トークンがミントされた時、制限いに従い、それが作成された時、コレクションを追跡出来ます。

```rust
struct MyCollectionMetadata has key {
    creation_timestamp_secs: u64,
}

public entry fun create_collection(creator: &signer) {
    // Constructor ref is a non-storable struct returned when creating a new object.
    // It can generate an object signer to add resources to the collection object.
    let collection_constructor_ref = &collection::create_unlimited_collection(
        creator,
        "My Collection Description",
        "My Collection",
        royalty,
        "https://mycollection.com",
    );
    // Constructor ref can be exchanged for signer to add resources to the collection object.
    let collection_signer = &object::generate_signer(collection_constructor_ref);
    move_to(collection_signer, MyCollectionMetadata { creation_timestamp_secs: timestamp::now_seconds() } })
}
```

### トークンの作成

作成者はコレクションから分離されたオブジェクトのトークンをミント出来ます。これでより高度なカスタマイズが可能です。トークンは２つの方法で作成されます。

1. 名前付トークン。これらのトークンは決定的なアドレスを持ち、これは作成者アドレス、コレクション名、トークン名、連結のsha256ハッシュです。これはアドレスを予測出来、トークを簡単にクエリ出来ます。が、名前付トークンは完全に削除可能なので、それ故、それらのバーンはトークンデータのみが削除され、根本的なオブジェクトは完全には削除されません。

```rust
use aptos_token_objects::token;

public entry fun mint_token(creator: &signer) {
    token::create_named_token(
        creator,
        "My Collection",
        "My named Token description",
        "My named token",
        royalty,
        "https://mycollection.com/my-named-token.jpeg",
    );
}
```

2. 作成者アカウントのGUIDを基本とした(名前無し)トークン。これらのトークンが持つアドレスは作成者のアカウントの増加するGUIDを基本として生成されます。名前無しトークンのアドレスはミントの外側へ変更出来、アカウントのGUIDとして決定的では有りません。従って、名前無しトークンのクエリはより難しくindexingが必要です。

```rust
use aptos_token_objects::token;

public entry fun mint_token(creator: &signer) {
    token::create(
        creator,
        "My Collection",
        "My named Token description",
        "My named token",
        royalty,
        "https://mycollection.com/my-named-token.jpeg",
    );
}
```

カスタムコレクション・トークンを構築する時、作成者は慎重に`create_named_token`もしくは`create`を使うべきかどうか考慮する必要が有ります。一般的に、トークンがバーンされた時は、トークンの決定的なアドレスは常にindexingサービスを必要とせず、簡潔な削除が出来る`create`が推奨されます。決定的なアドレスと`create_named_token`を好む一例は、各トークンのアドレスが保有者の名前から作成されるソウルバウンドトークンのコレクションです。
 
### トークンのプロパティー

デフォルトのトークンは以下のプロパティーを持ちます。

- トークン名 - 各コレクション内で一意です。コレクションは同じ名前で複数のトークンを持つ事が出来ません。
- トークンの説明 - `MutatorRef`で2048文字未満で変更可能です。
- トークンURIの長さ - `MutatorRef`で512文字未満で変更可能です。
- ロイヤリティー - トークン上でロイヤリティーを設定する事はコレクション上でよりも一般的ではありません。ですが、これはトークンがコレクションよりも違うロイヤリティー設定をする事を可能とします。
 
A `MutatorRef`はトークン作成時のみ生成出来ます。 

```rust
public entry fun mint_token(creator: &signer) {
    // Constructor ref is a non-storable struct returned when creating a new object.
    // It can be exchanged for signer to add resources to the token object.
    let token_constructor_ref = &token::create(
        creator,
        "My Collection",
        "My named Token description",
        "My named token",
        royalty,
        "https://mycollection.com/my-named-token.jpeg",
    );
    let mutator_ref = token::generate_mutator_ref(token_constructor_ref);
    // Store the mutator ref somewhere safe
}
```

### トークンのカスタマイズ

[コレクション](#collection-customization)と同様、メタデータはリソースとしてトークンへ追加されます。

### トークンバーン

作成者がトークンの作成時、`BurnRef`を生成、保存した場合、トークンは作成者によってバーンされます。

```rust
public entry fun mint_token(creator: &signer) {
    let token_constructor_ref = &token::create(
        creator,
        "My Collection",
        "My named Token description",
        "My named token",
        royalty,
        "https://mycollection.com/my-named-token.jpeg",
    );
    let burn_ref = token::generate_burn_ref(token_constructor_ref);
    // Store the burn ref somewhere safe
}

public entry fun burn_token(token: Object<Token>) {
    // Remove all custom data from the token object.
    let token_address = object::object_address(&token);
    let CustomData { ... } = move_from<CustomData>(token_address);

    // Retrieve the burn ref from storage
    let burn_ref = ...;
    token::burn(burn_ref);
}
```

注意。トークンオブジェクトへカスタムデータが追加された場合は`burn_token`関数はまずそれらのデータを削除する必要が有ります。token::burnは、無名トークンとして作成されていた場合、オブジェクトのみを削除します。名前付トークンは全てのトークンデータが削除されますが、オブジェクトは残り、「バーンされた」無効なオブジェクトが作成されます。

### トークン転送

トークンは`object::transfer`を介してどのユーザーにでも単純にオブジェクトとして転送出来ます。

## Aptosトークン

[Aptosトークン](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/aptos_token.move)
は「ノーコード」ソリューションで、Aptosデジタル資産スタンダードの基本上で構築され、より完璧なソリューションを提供し作成者がNFTをコードを書かずにミントする事が出来ます。以下の主な機能を提供します。

- 保有者が転送出来ないソウルバウンドトークン。
- [プロパティーマップ](#property-map)へ保存されたカスタム定義プロパティ、属性名 (文字列) -> 値 (バイト)の単純なマップデータ構造。
- [ソウルバウンドトークンの転送の凍結と解凍](#creator-management)
- [作成者管理機能 - コレクションもしくはトークンのメタデータの変更](#creator-management)

### プロパティーマップ

トークンスタンダードV1と同様、Aptosトークンは拡張可能な[PropertyMap](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token-objects/sources/property_map.move)を提供します。これはNFTに対し型安全な汎用プロパティを提供します。作成者はトークンをミントする時パスの最初のプロパティーを設定出来、後でプロパティーの追加や削除が自由です。

トークンは提供された`aptos_token::mint`を使ってミント出来ます。これはエントリー関数であり、トランザクションを介して直接呼び出す事が出来ます。
 
```rust
public entry fun mint(
    creator: &signer,
    collection: String,
    description: String,
    name: String,
    uri: String,
    property_keys: vector<String>,
    property_types: vector<String>,
    property_values: vector<vector<u8>>,
    ) acquires AptosCollection, AptosToken
```

ソウルバウンドトークンをミントするなら、作成者は`aptos_token::mint_soul_bound`を呼び出す事が出来ます。これは保有者が転送出来ないトークンを作成します。

```rust
public entry fun mint_soul_bound(
    creator: &signer,
    collection: String,
    description: String,
    name: String,
    uri: String,
    property_keys: vector<String>,
    property_types: vector<String>,
    property_values: vector<vector<u8>>,
    soul_bound_to: address,
) acquires AptosCollection
```

### 作成者の管理

デフォルトでは、作成者は以下の事を実行出来ます

- ソウルバウンドトークンを含むトークンのミントとバーン。
- トークン転送の禁止(凍結)し、トークン転送を許可(解凍)する。
- コレクションの説とURIを更新します。
- トークンのプロパティマップからのメタデータプロパティーの追加/削除。
- コレクションのロイヤルティ設定を更新する
- トークンの名前、説明、URI を更新する


### 更なるカスタマイズ

Aptosトークンは「ノーコード」の便利なソリューションとして提供されていますが、拡張可能ではありません。これは殆どの関数がエントリー関数で参照(コンストラクター、ミューテーターなど)を返さないことから明白です。`aptos_token`モジュールは、コレクションとトークンオブジェクトを作成する事で得られる参照を保存、管理し、生のアクセスを晒す事は有りません。

作成者がソウルバウンドトークンの強引な転送の様な、もっとカスタム機能を必要とする場合は、Aptosデジタル資産スタンダードの基本の上へ自身のカスタムモジュールを書く必要が有ります。もちろんAptosトークンモジュールからインスピレーションとコードを借りる事が出来ます。

## 代替可能なトークン

[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)と同様、Aptosデジタル資産スタンダードも代替可能トークン(半代替可能トークンとも呼ばれます)をサポートしています。この例として、ゲーム内のアーマートークンが有ります。各アーマートークンはアーマーのタイプを表し、メタデータ(耐久性、防御力など)を含むコレクション内のトークンでミントとバーンが可能です。が、同じアーマータイプで複数のインスタンスが有ります。例えば、木製アーマーがアーマーコレクション内のトークンの場合、ひとりのプレイヤーは3木製アーマーを持てます。

これはデジタル資産(DA)と代替資産(FA)の両方の資産を作成することで簡単に構築出来ます。結果としてデジタルおよび代替資産(DFA)となります。作成者がアーマーコレクションと木製アーマートークンを作成した後、木製アーマートークンを「代替可能」とする事が出来ます。

```rust
use aptos_framework::primary_fungible_store;

public entry fun create_armor_collection(creator: &signer) {
    collection::create_unlimited_collection(
        creator,
        "Collection containing different types of armors. Each armor type is a separate token",
        "Armor",
        royalty,
        "https://myarmor.com",
    );
}

public entry fun create_armor_type(creator: &signer, armor_type: String) {
    let new_armor_type_constructor_ref = &token::create(
        creator,
        "Armor",
        "Armor description",
        armor_type,
        royalty,
        "https://myarmor.com/my-named-token.jpeg",
    );
    // Make this armor token fungible so there can multiple instances of it.
    primary_fungible_store::create_primary_store_enabled_fungible_asset(
        new_armor_type_constructor_ref,
        maximum_number_of_armors,
        armor_type,
        "ARMOR",
        0, // Armor cannot be divided so decimals is 0,
        "https://mycollection.com/armor-icon.jpeg",
        "https://myarmor.com",
    );

    // Add properties such as durability, defence, etc. to this armor token
}
```

作成者は同じアーマータイプの複数のインスタンスをミント出来、プレーヤーへ転送出来ます。プレイヤーがアーマートークンを代替資産を譲渡するのと同じ方法で互いへ転送するのは自由です。
 