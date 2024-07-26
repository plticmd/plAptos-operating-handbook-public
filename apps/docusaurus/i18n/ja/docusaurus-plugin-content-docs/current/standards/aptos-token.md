---
title: "Aptos Token (Legacy)"
---

import ThemedImage from '@theme/ThemedImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Aptosトークン(従来の)

:::tip Aptosトークン標準の比較
[Aptosトークン標準の比較](../guides/nfts/aptos-token-overview.md)も御覧下さい。
:::

## NFTの概要

[NFT](https://en.wikipedia.org/wiki/Non-fungible_token)は代替不可能な[トークン](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/token.move)もしくはデータで、資産の所有権が一意で定義され、ブロックチェーン上へ保存されています。NFTはまず [EIP-721](https://eips.ethereum.org/EIPS/eip-721)で定義され、その後[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)で拡張されます。NFTは通常以下のプロパティーを使用して定義されます。

- `name`: 資産の名前。コレクション内で一意である必要が有ります。
- `description`: 資産の説明。
- `uri`: 資産の詳細情報のためのオフチェーンへのURLポインター。資産は画像や動画等のメディアやメタデータでも可能です。
- `supply`: このNFTの総ユニット数。多くのNFTは単一の供給のみですが、複数供給の物はエディションとして参照されます。

殆どのNFTはコレクションもしくは共通の属性のNFTセットの一部です。例えば、テーマ、作成者、最小限のコントラクト等。
各コレクションは同じ属性セットを持ちます。 

- `name`: コレクションの名前。名前は作成者のアカウント内で一意である必要が有ります。
- `description`: コレクションの説明。
- `uri`: 資産の詳細情報のためのオフチェーンへのURLポインター。資産は画像や動画等のメディアやメタデータでも可能です。
- `supply`: このコレクション内のNFTの総数。
- `maximum`: このコレクションが保持出来る最大NFT数。`maximum`を0と設定している場合、供給は追跡されません。

## 設計原則

[Aptosトークン標準](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/token.move)は、以下の原則でデプロイされています。 

- **相互運用性**: 経済圏プロジェクトを通した相互運用性の改善の標準実装を提供します。Moveは静的言語であり動的ディスパッチをしないためこの原則は必須です。
- **流動性**: ひとつのコントラクト内でNFT、代替可能(非小数)トークン、半代替可能トークンの定義によって最大の流動性を獲得します。これら異なるタイプのトークンは同じ方法で簡単に保存、転送、処理出来ます。結果、市場、取引所、その他の両替方法を通して簡単に最大の相互運用性を達成する事が出来ます。
 
- **豊富なオンチェーン トークン プロパティ**: オンチェーントークンプロパティのカスタマイズを有効にします。ユーザーは自身のプロパティーを定義する事が出来、オンチェーンへ保存出来ます。これはオフチェーンメタデータの必要性を排除する可能性が有ります。

- **間接費用の削減**: 代替可能トークンから大量のNFT作成コストを削減します。これは例えば、代替可能トークンのオンチェーンメタデータを再利用する事で類似トークンの間接費用を削減します。

:::tip 代替可能なトークン → NFT
Aptos トークン標準は[代替可能トークンからNFTへの転換](#evolving-from-fungible-token-to-nft)をサポートしています。
:::

### カスタマイズされたトークンプロパティをオンチェーンへ保存する

Aptos トークン標準は[`PropertyMap`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/property_map.move)モジュールを使用し、トークンのオンチェーンプロパティーを保存します。`PropertyMap`は文字列キーをオンチェーンプロパティー値へマップし、値をBCS(バイナリ基準シリアライゼーション)形式と型で保存します。現在`PropertyMap`では、プリミティブ型 (bool、u8、u64、u128、アドレス、文字列) のみがサポートされています。[Aptos Names](https://www.aptosnames.com/)等のアプリケーションは、アプリケーション特有のプロパティーで定義され、アプリケーションのスマートコントラクトで読み書きされます。

#### デフォルトのプロパティー

トークンデータの[`default_properties`](https://github.com/aptos-labs/aptos-core/blob/e62fd09cb1c916d857fa655b3f174991ef8698b3/aptos-move/framework/aptos-token/sources/token.move#L98)へプロパティーを追加出来ます。ここで定義されたプロパティは、デフォルトですべてのトークンが共有します。

default_propertiesフィールドは、型情報を含むキー値のストアです。これは別のプリミティブ型のプロパティー値へのシリアル化と逆シリアル化をする関数を含むプロパティーマップモジュールを活用します。

#### トークンプロパティー

オンチェーンでカスタマイズするためトークン自体に定義されている`token_properties`を使う事も出来ます。
この特定のトークンのプロパティーのカスタマイズ値を作成する事も出来るため、トークンがデフォルトからの異なるプロパティー値を得る事が可能となります。

注意。カスタマイズされたトークンプロパティーのオンチェーンへの保存は制限が有ります。即ちトークンあたり1000プロパティー、フィールド名128文字上限。

### 代替可能なトークンからNFTへの進化

代替可能なトークンは、同じデフォルトのプロパティ値を共有します。ただし、これらのプロパティ値は時間の経過とともに進化し、異なる値となります。この様なトークンプロパティーの進化をサポートするため、Aptosトークン標準は`property_version`フィールドを提供しています。その仕組みは:

- トークンの作成(ミント)中、全てのトークンは最初に に`property_version` が`0`で設定されていて、これらのトークンは代替可能なトークンとしてスタックできます。
- 作成者がトークンのデフォルトのプロパティを変更すると、変更されたトークンは一意の`property_version`が割り当てられ、新しい
[`token_id`](https://github.com/aptos-labs/aptos-core/blob/bba1690d7268759bd86ccd7459d7967172f1da24/aptos-move/framework/aptos-token/sources/token.move#L288)が作成され他の代換可能トークンと区別されます。この一意の`token_id`はトークンが自身のプロパティー値を持つ事を可能とし、更なるこのトークンの全変更が`property_version`を再び変更する事は**有りません**。実質的にこのトークンはNFTとなります。

#### 可変性の構成

作成者と所有者の両方へ変更可能性を示すため、Aptosトークン標準は[`mutability_config`](https://github.com/aptos-labs/aptos-core/blob/bba1690d7268759bd86ccd7459d7967172f1da24/aptos-move/framework/aptos-token/sources/token.move#L100)を提供し、コレクションレベルとトークンレベルの両方でどのフィールドが変更可能かコントロールします。ここでの構成可能というのは、作成中、作成者がこのフィールドを変更可能もしくは不変へ構成出来るという意味です。

### オフチェーンメタデータを保存する

様々ななウォレットでNFTが正確に表示される様、以下の標準へ従ってください。

`uri`フィールドのJSONファイルへURLを提供する必要が有ります。[arweave](https://www.arweave.org/)の様なオフチェーンストレージソリューションのJSONファイルへメタデータを保存する必要が有り、トークンもしくはコレクションの `uri` フィールドのJSONファイルへURLを提供する必要が有ります。
開発者が[ERC-1155oオフチェーンデータ](https://eips.ethereum.org/EIPS/eip-1155)へ従い、JSONファイルをフォーマットする事をお勧めします。 

```json
{
  "image": "https://www.arweave.net/abcd5678?ext=png",
  "animation_url": "https://www.arweave.net/efgh1234?ext=mp4",
  "external_url": "https://petra.app/",
  "attributes": [
    {
      "trait_type": "web",
      "value": "yes"
    },
    {
      "trait_type": "mobile",
      "value": "yes"
    },
    {
      "trait_type": "extension",
      "value": "yes"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://www.arweave.net/abcd5678?ext=png",
        "type": "image/png"
      },
      {
        "uri": "https://watch.videodelivery.net/9876jkl",
        "type": "unknown",
        "cdn": true
      },
      {
        "uri": "https://www.arweave.net/efgh1234?ext=mp4",
        "type": "video/mp4"
      }
    ],
    "category": "video"
  }
}
```

- `image`: 画像資産へのURL`?ext={file_extension}`クエリを使用して、ファイルタイプの情報を提供できます。
- `animation_url`: 資産のマルチメディア添付ファイルへのURL。同じ`file_extension`クエリを使用して ファイルタイプを提供出来ます。
- `external_url`: ユーザーが画像を表示する事もできる外部WebサイトへのURL。
- `attributes` - オブジェクト配列。オブジェクトは`trait_type`と`value`フィールドが含まれます。`value`は文字列か数値を指定出来ます。
- `properties.files`: オブジェクト配列。オブジェクトには、URIとアセットの一部であるファイルのタイプが含まれます。タイプはファイル拡張子と一致する必要があります。配列は`image`と`animation_url`フィールドで指定された資産と関連するどんな他のファイルも含んでいる必要が有ります。`?ext={file_extension}`クエリを使ってファイルタイプの情報を提供出来ます。
- `properties.category`: サポートされているカテゴリ:
  - `image` - PNG, GIF, JPG
  - `video` - MP4, MOV
  - `audio` - MP3, FLAC, WAV
  - `vr` - 3Dモデル; GLB, GLTF
  - `html` - HTMLページ; scripts and relative paths within the HTML page are also supported
  HTML ページ内のスクリプトと相対パスもサポートされています

CDNでファイルをホストし、ファイルオブジェクトの`cdn`フラグを使用して、読み込み時間を高速化する事ができます。ファイルが存在する場合、これはウォレットがメディアファイル(`video`, `audio`, `vr`) を読み取る主要な場所となります。ファイルが長期的に利用できなくなった時、ウォレットは後退して`animation_url`を使用しファイルを読み込む事が出来ます。

```json
"properties": {
  "files": [
    ...
    {
      "uri": "https://watch.videodelivery.net/52a52c4a261c88f19d267931426c9be6",
      "type": "unknown",
      "cdn": true
    },
    ...
  ]
}
```

## トークンデータモデル

[以下の図](/img/docs/aptos-token-standard-flow.svg)は、Aptosを介したトークンデータの流れを表しています。 

<ThemedImage
alt="Signed Transaction Flow"
sources={{
light: useBaseUrl('/img/docs/aptos-token-standard-flow.svg'),
dark: useBaseUrl('/img/docs/aptos-token-standard-flow-dark.svg'),
}}
/>

## トークンリソース

上図で示す様に、トークン関連のデータは作成者のアカウントと所有者のアカウントの両方へ保存されます。

### 構造体レベルのリソース

以下の表では、構造体レベルのフィールドについて解説します。最終的なリストについては[Aptos Token Framework](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/overview.md)を御覧下さい。

####　作成者のアドレスへ保存されるリソース

| 分野                                                                                                                                                                | 説明                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Collections`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#resource-collections)                                | `collection_data`というテーブルを管理します。,このテーブルは、コレクション名を`collection_data`へマップします。この作成者が作成したすべての`TokenData`も保存されます。                                                  |
| [`CollectionData`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#struct-collectiondata)                            | コレクションのメタデータを保存します。供給量は、現在のコレクション用に作成されたトークンの数です。最大値は、このコレクション内のトークンの上限です。                                                                                     |
| [`CollectionMutabilityConfig`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_CollectionMutabilityConfig) |                                        どのフィールドが変更可能か指定します。                                                                                                                                                                                   |
| [`TokenData`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_TokenData)                                   | トークンのメタデータを保持するためのメイン構造体として機能します。 プロパティは、ユーザーがトークン データで定義されていない独自のプロパティを追加できる場所です。 ユーザーは`TokenData`に基づいてより多くのトークンをミントでき、 それらのトークンは同じ`TokenData`を共有します。
| [`TokenMutabilityConfig`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_TokenMutabilityConfig)           |  どのフィールドが変更可能であるかを制御します。                                                                                                                                                                                                                       |
| [`TokenDataId`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_TokenDataId)                               | オンチェーン`TokenData`のクエリと表現に使用されるID。 このIDは主として、作成者アドレス、コレクション名、トークン名、の3フィールドが含まれます。                                                                        |
| [`Royalty`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_Royalty)                                       | ロイヤルティ料金を計算するための分母と分子を指定します。 ロイヤルティを入金するための受取人アカウントアドレスも含まれています。                                                                                                  |
| `PropertyValue`                                                                                                                                                       | プロパティとプロパティタイプの両方の値を含みます。                                                                                                                                                                                                 |

#### 所有者のアドレスへ保存されたリソース

| 分野                                                                                                                                 | 説明                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`TokenStore`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_TokenStore) | このアドレスが所有するトークンを格納するためのメイン構造体。 実際のトークンへ`TokenId`をマッピングします。                                                                  |
| [`Token`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_Token)           |       金額はトークンの数です。                                                                                                                              |
| [`TokenId`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_TokenId)       | `TokenDataId` はこのトークンのメタデータを指します。`property_version`は`TokenData`内の`default_properties`から`PropertyMap`を変更したトークンを表します。 |

さらに詳しい解説は[Aptosトークンフレームワーク](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/overview.md)を御覧下さい。

## トークンのライフサイクル

### トークンの作成

すべての Aptos トークンはコレクションに属します。開発者はまず、`create_collection_script`を介してコレクションを作成し、続いて、そのコレクション`create_token_script`に属するトークンを作成する必要があります。   
並列`TokenData`と`Token`作成を達成するため、開発者は無制限のコレクションと`TokenData`を作成出来、コレクションの`maximum`と`TokenData`を0へ設定出来ます。この設定では、トークンコントラクトは
トークンタイプの供給量(`TokenData`カウント)と各トークンタイプごとのトークンの供給量を追跡しません。結果として、`TokenData`とトークンは並列で作成出来ます。

Aptosは、インプットサイズの単純な検証を強制し、重複を防ぎます。

- トークン名 - 各コレクション内で一意です
- コレクション名 - 各アカウント内で一意です
- トークンとコレクション名の長さ - 128 文字未満
- URIの長さ - 512文字未満
- プロパティ マップ - 最大1000のプロパティを保持でき、各キーは128文字未満である必要があります。

### トークンの変異

私たちの標準はトークンの作成中、変更可能フィールドが指定されるという原則で変更をサポートしています。
これによりトークン所有者は、作成者からトークンを取得する時、どのフィールドが変更可能か知る事が出来ます。私たちのコントラクトは、`CollectionMutabilityConfig`を使い、フィールドが変更可能かどうかを確認します。私たちのコントラクトは`TokenMutabilityConfig`を使用し、`TokenData`フィールドが変更可能かどうかを確認します。
 
プロパティの変異については、両方があります。

- `default_properties` `TokenData`に属する全てのトークンが共有する`TokenData`へ保存されます。
- `token_properties` トークン自体に保存される

`default_properties`を変更するには、開発者は`TokenMutabilityConfig`が`true`へ設定される時`mutate_tokendata_property`を使用し、プロパティを変更出来ます。

> **注意: 絶対に必要な場合を除き、`TokenMutabilityConfig`フィールドを`false`へ設定します。`default_properties`の変更を許可する事は、作成者へ多大な権限を与えます。作成者はバーン可能な構成を変更して、トークンを作成した後トークンをバーンする権利を自分自身で与える事が出来ます。
変更可能であることをfalse許可すると、作成者は、書き込み可能な構成を変更して、トークンの作成後にトークンを書き込む権限を自分自身に与えることができます。**


トークンに保存されている`token_properties`の変更を行うため、私たちの標準は`default_properties`へ保存されている`TOKEN_PROPERTY_MUTABLE`プロパティを使用します。作成者が`TokenData`を作成し、`TOKEN_PROPERTY_MUTABLE`プロパティーを`true`へ設定する時、作成者は`token_properties`を変更出来ます。注意：`mutate_tokendata_property`が`true`へ設定されている時は、`default_properties`内の設定を上書き出来るため、作成者は`token_properties`を変更出来ます。

### トークンバーン

私たちはトークン所有者と作成者がトークンをバーン(もしくは破棄)出来る`burn`と`burn_by_creator`機能を提供します。ただし、これら2つの機能はトークン作成時に指定される構成が監視し、作成者と所有者の両方がトークンのバーンを出来る様にします。バーンは
`BURNABLE_BY_OWNER`プロパティーが`default_properties`内で`true`へ設定されている時のみ許可されます。作成者のバーンは`default_properties`内で`BURNABLE_BY_CREATOR`が`true`の時のみ許可されます。`TokenData`へ属する全てのトークンがバーンされると`TokenData`は作成者のアカウントから削除されます。同様に、コレクションに属する全ての`TokenData`が削除されると、その`CollectionData`は作成者のアカウントから削除されます。

### トークン転送

送信者と受信者の間でトークンを転送するための3つのモードを提供しています。

#### 2段階転送

ユーザーが望まないNFTの受け取りを回避するため、まずNFTを提供してから、提供されたNFTを受け入れる必要があります。その後、提供されたNFTのみがユーザーのトークンストアへ保存されます。これはデフォルトのトークン転送動作です。例えば：

1. アリスがボブにNFTを送信したい場合は、アリスはまずボブへこのNFTを提供する必要があります。このNFTはまだアリスのアカウントへ保存されています。
2. ボブが NFT を要求した場合にのみ、NFT はアリスのアカウントから削除されボブのトークンストアへ保存されます。

:::tip トークン転送モジュール
トークン転送は[`token_transfers`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/sources/token_transfers.move)モジュール
へ実装されます。 
:::

#### オプトイン転送
　
ユーザーが直接NFTの転送を受け取りたい場合、最初の申込と請求のステップをスキップする事が出来ます。そして、ユーザーは
[`opt_in_direct_transfer`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_opt_in_direct_transfer)を呼び出し、他の人がユーザーのトークンストアへNFTを直接転送出来る様にします。直接送信を選択した後、ユーザーは[`transfer`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#0x3_token_transfer)を呼び出して直接トークンを転送出来ます。例えば、ボブが選択すれば、アリスと誰かがボブのトークンストアへ直接トークンを送信出来ます。 

:::tip 直接転送をオフにする
同じ`opt_in_direct_transfer`関数を呼び出し、デフォルト動作をリセットする事で、ユーザーはこの直接送信動作をオフにする事が出来ます。
:::

#### マルチエージェント転送

送信者と受信者は両方とも転送トランザクションに署名し、送信者から受信者へトークンを直接転送できます。[`direct_transfer_script`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-token/doc/token.md#function-direct_transfer_script)例えば、アリスとボブの両方が転送トランザクションへ署名すると、トークンはアリスのアカウントからボブへ直接転送されます。


