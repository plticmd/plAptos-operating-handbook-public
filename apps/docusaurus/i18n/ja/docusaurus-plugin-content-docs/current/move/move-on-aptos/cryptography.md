---
title: "Cryptography"
---

# Moveでの暗号化

暗号化は、ブロックチェーンシステムでのデータのセキュリティ、整合性、機密性、不変性を確保する上で重要な役割を果たします。Move用のAptosアダプターは、開発者へ一連の暗号化プリミティブを提供し、この需要を満たします。このドキュメントでは、Move on Aptosが提供する暗号化機能について詳しく解説し、その設計の原動力となる原則を解説します。

## 暗号プリミティブ

MoveはAptosアダプタを通じて、いくつかの基本的な暗号化ツールを網羅しています。

1. [暗号化ハッシュ関数](#cryptographic-hash-functions) – 
可変サイズの入力データから固定サイズの出力(ハッシュ)を生成するアルゴリズム。サポートされている関数は、SHA2-256、SHA3-256、Keccak256、Blake2b-256です。
2. [デジタル署名検証](#digital-signature-verification) – メッセージの整合性の確保、送信者の認証、否認防止の確保、またはそれらの組み合わせのためメッセージに署名するアルゴリズム。サポートされている署名スキームは、Ed25519、ECDSA、BLS等です。
3. [楕円曲線演算](#elliptic-curve-arithmetic) – 
楕円曲線は、デジタル署名、公開鍵暗号化、検証可能な秘密共有などの高度な暗号化プリミティブの構築ブロックのひとつです。サポートされている曲線は、Ristretto255とBLS12-381等です。
4. [ゼロ知識証明(ZKP)](#building-powerful-cryptographic-applications) – これらの暗号技術により、当事者は次の事を証明出来ます。秘密の証言 $w$ を漏らさず保持させ、関係 $R(x; w)$は公開ステートメント $x$ で満たされます。現在、Groth16 ZKP 検証と Bulletproofs ZK 範囲証明検証をサポートしています。

MoveへのAptos暗号化拡張機能の設計と統合は、以下の3つの基本原則へ従い行われます。

1. **経済的なガス使用** – 
keyプリミティブを[Moveネイティブ関数](../book/functions.md#native-functions)として実装する事で、Move開発者のガスコストを最小限に抑える事を目指します。
例えば[BLS signatures over BLS12-381 elliptic curves](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/bls12381.move)のモジュールを御覧下さい。

2. **型安全APIs** – 
タイプセーフは、APIが一般的な間違いへの耐性の確立で、コードの信頼性を高め、効率的な開発プロセスを促進します。例は[Ed25519署名モジュール](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ed25519.move)を御覧下さい。
3. **開発者のエンパワーメント** – 
ネイティブ関数が利用できない場合は、_有限体_ や _アーベル群_ 等の抽象的な暗号化ビルディングブロックの上へ開発者が独自の暗号化プリミティブを構築出来る権利を与えます。詳細は[`aptos_std::crypto_algebra`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/crypto_algebra.move)モジュールを御覧下さい。

読み進めて、これら拡張機能の背後の複雑な仕組みや拡張機能で実現される応用範囲を詳しく調べて下さい。この主題最の包括的な理解は[暗号化Moveモジュールコード](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/framework/aptos-stdlib/sources/cryptography)を御覧下さい。

## 暗号ハッシュ関数

開発者は[`aptos_std::aptos_hash`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/hash.move)モジュールを介してMoveで多くの暗号化ハッシュ関数を使用出来ます。

| ハッシュ関数 | ハッシュサイズ（ビット） | 1KiB のハッシュコスト (内部ガス単位) | 衝突耐性セキュリティ（ビット） |
| ------------- | ---------------- | --------------------------------------------- | ------------------------------------ |
| Keccak256     | 256              | 1,001,600                                     | 128                                  |
| SHA2-256      | 256              | 1,084,000                                     | 128                                  |
| SHA2-512      | 512              | 1,293,600                                     | 256                                  |
| SHA3-256      | 256              | 1,001,600                                     | 128                                  |
| SHA3-512      | 512              | 1,114,000                                     | 256                                  |
| RIPEMD160     | 160              | 1,084,000                                     | 80 (**弱い**)                        |
| Blake2b-256   | 256              | 342,200                                       | 128                                  |

全てのハッシュ関数は同じセキュリティ特性（一方向性、衝突耐性など）を持ちますが、セキュリティレベルは異なります。

:::caution
RIPEMD160はセキュリティレベルが80ビットであるため、衝突耐性関数としては使用しないで下さい。これは主に下位互換性の理由でサポートされています。例えば、Bitcoinアドレスの導出はRIPEMD160へ依存しています。
:::

これらの関数の一部は、他のチェーンとの相互運用性のため使用出来ます(例:[`aptos_std::aptos_hash::keccak256`](https://github.com/aptos-labs/aptos-core/blob/137acee4c6dddb1c86398dce25b041d78a3028d3/aptos-move/framework/aptos-stdlib/sources/hash.move#L35)を介して Ethereum Merkle 証明を検証する)。[`aptos_std::aptos_hash::blake2b_256`](https://github.com/aptos-labs/aptos-core/blob/137acee4c6dddb1c86398dce25b041d78a3028d3/aptos-move/framework/aptos-stdlib/sources/hash.move#L69)等、その他の関数はガスコストが低くなります。一般に、ハッシュ関数の種類が多い程、セキュリティと他のオフチェーン暗号化システムとの相互運用性の両面で開発者の自由度が高まります。

## デジタル署名の検証

これで、開発者は _型安全な_ APIを使用し、Moveで多種類のデジタル署名を検証する事が出来ます。

| 署名方式                                                                                                                                          | 曲線         | 署名サイズ（バイト） | PK サイズ (バイト) | 柔軟性 | 仮定 | 長所         | 短所                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----------------- | --------------- | ------------ | ----------- | ------------- | ------------------- |
| [ECDSA](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/secp256k1.move)                          | secp256k1     | 64                | 64              | 有り          | GGM         | 幅広い採用 | セキュリティ証明      |
| [Ed25519](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ed25519.move)                          | Edwards 25519 | 64                | 32              | 無し           | DLA, ROM    | 速い          | 細かい          |
| [マルチEd25519](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/multi_ed25519.move)               | Edwards 25519 | $4 + t \cdot 64$  | $n \cdot 32$    | 無し           | DLA, ROM    | 導入が簡単 | 大きな署名サイズ     |
| [最小PK BLS](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/bls12381.move)                       | BLS12-381     | 96                | 48              | 無し           | CDH, ROM    | 多用途     | 検証が遅い |
| [最小署名 BLS](https://github.com/aptos-labs/aptos-core/blob/7d4fb98c6604c67e526a96f55668e7add7aaebf6/aptos-move/move-examples/drand/sources/drand.move#L57) | BLS12-381     | 48                | 96              | 無し           | CDH, ROM    | 多用途    | 検証が遅い |

:::note

- CDHは _「計算的ディフィー・ヘルマン仮定」_　の略です。 
- DLAは _「離散対数仮定」_ の略です。 
- GGMは _「ジェネリックグループモデル」_ の略です。 
- ROMは _「ランダムオラクルモデル」_ の略です。
  :::

上記デジタル署名モジュールは、スマートコントラクトベースのウォレット、エアドロップの安全な請求メカニズム、またはdappのデジタル署名ベースのアクセス制御メカニズムの構築で使用出来ます。

Dappでの署名スキームの適切な選択は、多くの要因で決まります。

1. **下位互換性**
   - dappのユーザーベースが殆ど特定の署名メカニズムを使用している場合、移行と採用を容易にするため、そのメカニズムをサポートするのが妥当です。
     - 例: ユーザーが主に Ed25519 を使用して署名する場合、それが論理的な選択となります。
2. **実装の容易さ**
   - 理論的には正しいものの、複雑なプロトコルを実際実装するのは難しい場合が有ります。
     - 例: Ed25519のしきい値プロトコル$t$-out-of-$n$は存在しますが、署名者側の複雑さのため、より簡単な署名実装のMultiEd25519が開発者へ推奨される可能性があります。
   
3. **効率**
   - dappの要件次第で、効率性のある側面を他より優先する場合があります。
     - 署名サイズ対公開鍵サイズ: アプリケーションによっては小さな署名フットプリントを優先しますが、コンパクトなPKを重視するものもあります。
     - 署名時間対検証時間: 特定のdappでは署名速度が重要な場合がありますが、他のdappでは迅速な署名検証が優先される場合があります。
    
4. **セキュリティ分析**
   - 署名スキームの基本的な前提と潜在的な脆弱性を考慮する事が重要です。
     - 例: ECDSAのセキュリティは、ジェネリックグループモデル(GGM)等の強力な仮定の下で証明されています。
     - マリアビリティの懸念: 一部の署名方式は改ざんの影響を受けやすく、有効な署$\sigma$が同じメッセージ$m$に対し、別のまだ有効な署名$\sigma$へ改変される可能性があります。

5. **汎用性**
   - 署名スキームの適応性と柔軟性を考慮することは重要であり、これでdappの暗号化需要へ適応出来ます。
     - 例：しきい値 $t$-out-of-$n$ BLS署名の実装は非常に簡単です。

:::caution
慎重かつ原則的な設計[^ed25519]にもかかわらず、Ed25519は、実装の巧妙さで知られています。例えば、異なる実装では、特にバッチ検証が採用されている場合[^devalence]$^,$[^eddsa]、署名の有効性について簡単に反対する可能性があります。
:::

:::tip
[MinPK BLS](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#name-variants)用のAptosの[`aptos_std::bls12381`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/bls12381.move)のモジュールは、個別の署名、**複数**の署名、**集約**署名、**しきい値**署名の検証をサポートしています。
:::

## 楕円曲線算術

[ハッシュ関数](#cryptographic-hash-functions)と[デジタル署名](#digital-signature-verification)モジュールは、殆どのアプリケーションへ充分な機能を提供しますが、一部のアプリケーションではより強力な暗号化が必要となります。

通常、そのようなアプリケーションの開発者は、必要な暗号化機能が[AptosMoveフレームワーク](/reference/move)の[Moveネイティブ関数](../book/functions.md#native-functions)として効率的に実装されるまで待たなければなりません。そのかわり、基本的な構築ブロックを公開し、
 開発者がMove言語で直接独自の暗号化プリミティブを**効率良く**実装出来ます。

現在、2つの一般的な楕円曲線グループとその関連する有限フィールドで低レベルの算術演算を公開しています。

1. Ristretto255、[`aptos_std::ristretto255`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ristretto255.move)経由。
2. BLS12-381、[`aptos_std::crypto_algebra`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/crypto_algebra.move)
及び[`aptos_std::bls12381_algebra`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/bls12381_algebra.move)経由。

これらのモジュールは、次のような低レベルの演算をサポートします。

- 楕円曲線点のスカラー乗算
- マルチスカラー乗算(MSM)
- ペアリング
- スカラー加算、乗算、反転
- スカラーまたはポイントへのハッシュ
- などなど

上へ構築できる強力なアプリケーションの例は以下を含みます。

1.  **有効性ロールアップ** – [`groth16`zkSNARK 検証者例](#groth16-zksnark-verifier)を御覧下さい。
2.  **ランダム性ベースのゲーム** – [`drand`検証者例](#verifying-randomness-from-the-drand-beacon)を御覧下さい。
3.  **プライバシー保護アプリケーション** – [`veiled_coin`例](#veiled-coins)を御覧下さい。

### リストレット255算術

[`aptos_std::ristretto255`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ristretto255.move)モジュールは、一般的な[Ristretto255曲線](https://ristretto.group/)上の楕円曲線演算のサポートを提供します。

Ristretto255の主な利点のひとつは(Edwards 25519曲線とは異なり)素数位数群であることです。
これにより、上へ構築された高レベル暗号システムに対する小サブグループ攻撃が除去されます。Ristretto255シリアル化は標準的であり、逆シリアル化では標準エンコーディングのみが受け入れられるため、高レベルプロトコルでの改ざん性の問題が除去されます。

このモジュールがいくつかの暗号化プリミティブの実装で役立つ事が証明されています。

1.  **ゼロ知識$\Sigma$-プロトコル** –[`veiled_coin`例](#veiled-coins)を御覧下さい。
2.  **ElGamal** encryption –[`aptos_std::ristretto255_elgamal`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ristretto255_elgamal.move)を御覧下さい。
3.  **ペダーセン**コミットメント –[`aptos_std::ristretto255_pedersen`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ristretto255_pedersen.move)を御覧下さい。
4.  **Bulletproofs** ZKレンジプルーフ[^bulletproofs] –[`aptos_std::ristretto255_bulletproofs`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/ristretto255_bulletproofs.move)を御覧下さい。

 `ristretto255`上で構築する暗号システムのアイデアが必要ですか? 簡単に構築できる人気のプリミティブは、Ristretto255グループ上のSchnorr 署名の強化バージョンである[schnorrkel](https://github.com/w3f/schnorrkel)署名スキームです。

### 一般的な楕円曲線算術

ひとつの曲線よりも優れているものは何でしょうか? 曲線がもっと有る事です!

[`aptos_std::crypto_algebra`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/crypto_algebra.move) は、ペアリングに適した曲線を含む、サポートされている**あらゆる**楕円曲線用の楕円曲線算術演算を提供します。その結果Move開発者は、現在サポートされている、または将来サポートされる予定の**あらゆる**曲線用上の、暗号システムを凡用的に実装出来ます。

コード内へ特定の曲線を固定する(例えば、 [Ristretto255モジュール](#ristretto255-arithmetic)に対して実装する)場合と比較して、このアプローチは柔軟性が高く、異なる曲線に移行する際の開発時間を短縮出来ます。

現在、この`crypto_algebra`モジュールは BLS12-381 曲線 ([`aptos_std::bls12381_algebra`](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/framework/aptos-stdlib/sources/cryptography/bls12381_algebra.move)で宣言されたマーカータイプ経由aptos_std::bls12381_algebra)での算術のみをサポートしていますが、将来的にはさらに多くの曲線がサポートされる予定です (例: BN254、Ristretto255、BLS12-377、BW6-761、secp256k1、secp256r1)。

例えばMove開発者は、実装で曲線型の[型引数](../../../move/book/functions#type-parameters)を使用する事で、人気のBoneh-Lynn-Shacham(BLS)署名スキームを**あらゆる**曲線上で汎用的な実装が出来ます。

```rust title="あらゆる曲線上での凡用BLS署名検証"
use std::option;
use aptos_std::crypto_algebra::{eq, pairing, one, deserialize, hash_to};

/// ペアリングに適したグループトリプル`Gr1`、 `Gr2`、`GrT`上で機能するBLS署名検証関数の例。署名が有るのはは`Gr1`内、PKsは`Gr2`内。
/// ポイントは`FormatG1`と`FormatG2`の形式を使用してシリアライズ化され、ハッシュ化メソッドは`HashMethod`です。
///
/// 警告: この例は型安全では無いため、恐らく実稼動コードにはあまり適していません。
public fun bls_verify_sig<Gr1, Gr2, GrT, FormatG1, FormatG2, HashMethod>(
    dst:        vector<u8>,
    signature:  vector<u8>,
    message:    vector<u8>,
    public_key: vector<u8>): bool
{
    let sig  = option::extract(&mut deserialize<Gr1, FormatG1>(&signature));
    let pk   = option::extract(&mut deserialize<Gr2, FormatG2>(&public_key));
    let hash = hash_to<Gr1, HashMethod>(&dst, &message);

    // $e(H(m), pk) = e(sig, g_2)$ かどうか確認します。$g_2$ は $\mathbb{G}_2$　を生成します。
    eq(
        &pairing<Gr1, Gr2, GrT>(&hash, &pk),
        &pairing<Gr1, Gr2, GrT>(&sig, &one<Gr2>())
    )
}
```

上記の`bls_verify_sig` _汎用_ 関数を使用し、開発者はサポートされている(ペアリングに適した)**あらゆる**曲線でBLS署名を検証出来ます。
例えば、適切なBLS12-381マーカー型を型引数として上記の関数を呼び出す事で、BLS12-381曲線で[MinSig BLS](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#name-variants)署名を検証出来ます。


```rust title="BLS12-381でのMinSig BLS署名検証"
use aptos_std::bls12381_algebra::{
    G1, G2, Gt, FormatG1Compr, FormatG2Compr, HashG1XmdSha256SswuRo
};

// BLS12-381j曲線上のMinSig BLS署名が検証出来なかった場合、コード1で中止します。

assert(
    bls_verify_sig<G1, G2, Gt, FormatG1Compr, FormatG2Compr, HashG1XmdSha256SswuRo>(
        dst, signature, message, public_key
    ),
    1
);
```

`crypto_algebra`モジュールの使用例は、Moveの例を御確認下さい。

1. **あらゆる**曲線上での[Verifying Groth16 zkSNARK proofs](#groth16-zksnark-verifier)
2. [drand`ビーコンからのランダム性の検証](#verifying-randomness-from-the-drand-beacon)

## 強力な暗号化アプリケーションの構築

### 隠されたコイン

この[`veiled_coin`例](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/veiled_coin/sources)は[上記のRistretto255モジュール](#ristretto255-arithmetic)を使用して、コインの残高とトランザクションに合理的な機密性レイヤーを追加する方法を示します。

具体的には、ユーザーは残高を**隠し**、バリデーターを含む全ての人から隠す事が出来ます。更に、ユーザーは、バリデーターを含む全ての人から取引金額を隠す**隠蔽トランザクション**を送信出来ます。重要な注意点は、隠蔽トランザクションでは送信者または受信者の身元が隠され**ない**ことです。

:::danger
このモジュールは教育用です。本番環境へは**対応していません**。使用すると資金が失われる可能性があります。
:::

### Groth16 zkSNARK検証者

この[`groth16`例](https://github.com/aptos-labs/aptos-core/blob/main/aptos-move/move-examples/groth16_example/sources/groth16.move)は、最短かつ最速で検証可能な汎用のゼロ知識証明であるGroth16 zkSNARK証明[^groth16]を検証する方法を示します。重要なのは、[上記](#generic-elliptic-curve-arithmetic)の様に、この実装は**どの**曲線に対しても _汎用的_ であるため、Move開発者が自分の好きな(サポートされている)曲線での使用が簡単な事です。

:::caution
このコードは第三者機関の監査を受けていません。本番システムで使用する場合は、自己責任で進めてください。
:::

### `drand`ビーコンからのランダム性の検証

この[`drand`例](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/drand/sources) は、[drand](https://drand.love)ランダム性ビーコンから公開ランダム性を検証する方法を示します。このランダム性は、ゲームやその他のチャンスベースのスマートコントラクトで使用出来ます。

[`lottery.move`](https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples/drand/sources/lottery.move)の`drand`ランダム性へ基づいて実装された宝くじの簡単な例を示します。

:::caution
このコードは第三者機関による監査を受けていません。本番システムで使用する場合は、自己責任で進めて下さい。
:::

`drand`上で構築できる別のアプリケーションは、タイムロック暗号化[^tlock]です。これによりユーザーは情報を暗号化して、将来のブロックでのみ復号化出来ます。現在実装は有りませんが、読者は実装する事をお勧めします。

[^bulletproofs]: _防弾:_ **Bulletproofs: 機密トランザクション等のための短い証明**; by B. Bünz、J. Bootle、D. Boneh、A. Poelstra、P. Wuille、G. Maxwell著; 2018 IEEE セキュリティとプライバシー関連の討論会
[^devalence]: _価格低下:_ **255:19AMです。 あなたの検証基準が何か知っていますか？**, Henry de Valence著、 [https://hdevalence.ca/blog/2020-10-04-its-25519am](https://hdevalence.ca/blog/2020-10-04-its-25519am)
[^ed25519]: _ed25519:_ **Ed25519:高速高セキュリティ署名**、Daniel J. Bernstein、Niels Duif、Tanja Lange、Peter Schwabe、Bo-Yin Yang著、 [https://ed25519.cr.yp.to/](https://ed25519.cr.yp.to/)
[^eddsa]: _eddsa:_ **多くのEdDSAを制御する**、Konstantinos Chalkias、François Garillot、Valeria Nikolaenko著、in SSR 2020, [https://dl.acm.org/doi/abs/10.1007/978-3-030-64357-7_4](https://dl.acm.org/doi/abs/10.1007/978-3-030-64357-7_4)
[^groth16]: _groth16:_ **ペアリングベースの非対話型引数のサイズについて**; Groth、Jens著; EUROCRYPT 2016
[^tlock]: _tlock:_ **tlock: しきい値 BLS からの実用的なタイムロック暗号化**; Nicolas Gailly、Kelsey Melissaris、Yolan Romailler著; [https://eprint.iacr.org/2023/189](https://eprint.iacr.org/2023/189)
