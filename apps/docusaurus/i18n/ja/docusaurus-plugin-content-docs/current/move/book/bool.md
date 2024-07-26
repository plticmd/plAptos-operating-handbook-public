# ブール

`bool`はブール値`true`及び`false`のMoveのプリミティブ型です。

## リテラル

`bool`のリテラルは`true`または`false`です。

## オペレーション

### 論理的な

`bool`は3つの論理演算をサポートします。
`bool` supports three logical operations:

| 構文                    | 説明                  | 同等の表現                                               |
| ------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| `&&`                      | 短絡論理積 ? | `p && q`は`if (p) q else false`と同等である                     |
| <code>&vert;&vert;</code> | 短絡論理和 ? | <code>p &vert;&vert; q</code>は`if (p) true else q`と同等である |
| `!`                       | 論理否定             | `!p`は`if (p) false else true`と同等である                      |

### 制御フロー

`bool`値は、Moveの制御フロー構造のいくつかで使用されます。

- [`if (bool) { ... }`](./conditionals.md)
- [`while (bool) { .. }`](./loops.md)
- [`assert!(bool, u64)`](./abort-and-assert.md)

## 所有権

言語に組み込まれている他のスカラー値と同様、ブール値は暗黙的にコピー可能です。即ち[`copy`](./variables.md#move-and-copy)の様な明示的な指示無しでコピー出来ます。 
