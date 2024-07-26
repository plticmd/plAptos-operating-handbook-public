# スポンサードトランザクション

[AIP-39](https://github.com/aptos-foundation/AIPs/blob/main/aips/aip-39.md)の概要で示す様に、スポンサードトランザクションはひとつのアカウントが別のアカウントのトランザクション実行料金を支払う事が出来、
実質的に手数料支払者が設定されます。スポンサードトランザクションはアプリケーションがAptosブロックチェーンとの対話と関連する全ての料金をカバー出来る様にする事でユーザーをアプリケーションへオンボーディングさせる工程を単純化します。以下の２つの例をご覧下さい。

-ユーザーのAptosウォレットを作成する事で[MerkleTrade](https://merkle.trade/)はEthereumウォレットでの低料金の取引を提供し、全てのトランザクション料金をカバーしているのでユーザーがApotosのユーティリティートークンを獲得する必要が有りません。
- [Graffio](https://medium.com/aptoslabs/graffio-web3s-overnight-sensation-81a6cf18b626)の様なコミュニティーエンゲージメントアプリケーションは、カストディアルアカウントのトランザクション料金をカバーし、ウォレット無しで共同立案のアプリケーションをサポートします。

## プロセスの概要

スポンサードトランザクションを送信するプロセスは以下を御覧下さい。

- トランザクションの送信者は`RawTransaction`が定義した操作を決定します。
- 送信者は`RawTransactionWithData::MultiAgentWithFeePayer`構造を生成します。
  - フレームワーク1.8リリースの前に、料金支払い者のアドレスを含める必要が有ります。
  - フレームワークリリース1.8以降は、`0x0`へ設定も出来ます。
- (オプション)送信者は他の署名者からの署名を集約します。
- 送信者は、署名されたトランザクションを料金支払い者へ転送して、署名してブロックチェーンに転送することができます。
- トランザクションが実行されると、送信者アカウントのシーケンス番号が増加し、全てのガス料金がガス料金支払者から差し引かれ、ガス料金支払者へ全て返金されます。
 
あるいは、料金支払者が操作内容や関与する全ての署名者を知っている場合、料金支払者はトランザクションを生成して署名し、他の署名者に返信して署名させる事も出来ます。

## 技術的な内容

Aptosでは、スポンサードトランザクションは同じ署名トランザクションを他のユーザートランザクションと同様に再利用します。

```rust
pub struct SignedTransaction {
    /// The raw transaction
    raw_txn: RawTransaction,

    /// Public key and signature to authenticate
    authenticator: TransactionAuthenticator,
}
```

`TransactionAuthenticator`の違いは、トランザクションの料金支払者からの承認を保存して彼らのアカウントからユーティリティー料金を差し引く事です。

```rust
pub enum TransactionAuthenticator {
...
    /// Optional Multi-agent transaction with a fee payer.
    FeePayer {
        sender: AccountAuthenticator,
        secondary_signer_addresses: Vec<AccountAddress>,
        secondary_signers: Vec<AccountAuthenticator>,
        fee_payer_address: AccountAddress,
        fee_payer_signer: AccountAuthenticator,
    },
...
}
```

アカウントのスポンサードトランザクションの準備のため、まず、アカウントがオンチェーン上で存在している必要が有ります。これは1.8フレームワークリリースで削除される要件です。

フレームワーク1.8リリース時点では、アカウントはオンチェーン上で存在している必要は有りません。が、アカウントの最初のトランザクションではトランザクションを実行するだけではなくアカウント作成と関連するコストのための充分なガスが必要です、例えアカウントが既に存在しているとしても。アカウントモデルの将来の改善ではこの要求を排除する予定です。

トランザクションの署名中、全ての当事者は以下へ署名します。

```rust
pub enum RawTransactionWithData {
...
    MultiAgentWithFeePayer {
        raw_txn: RawTransaction,
        secondary_signer_addresses: Vec<AccountAddress>,
        fee_payer_address: AccountAddress,
    },
}
```

フレームワークリリース1.8の前に、全ての署名者は署名する前に実際の料金支払者アドレスを知っている必要が有りました。フレームワークリリース1.8以降では、署名者はアドレスを`0x0`へ設定する選択が出来、料金支払い者のみがそれらのアドレスセットへ署名する必要が有ります。

## SDKサポート

以下はスポンサードトランザクションの実演です。

- TypeScript SDKは[いくつかの例](https://github.com/aptos-labs/aptos-ts-sdk/tree/main/examples/typescript-esm/sponsored_transactions)が有ります。
- Python SDKの例は[fee_payer_transfer_coin.py](https://github.com/aptos-labs/aptos-core/blob/main/ecosystem/python/sdk/examples/fee_payer_transfer_coin.py)内に有ります。
- Rust SDKは[APIテスト](https://github.com/aptos-labs/aptos-core/blob/0a62e54e13bc5da604ceaf39efed5c012a292078/api/src/tests/transactions_test.rs#L255)のテストケースが有ります。
