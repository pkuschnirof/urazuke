# ステップ 5 — 計画とは保留項目のこと（段の契約）

**フェーズ：** ループ（変更のたびに、プロジェクト全体を通じて使う）。
**形式：** 作成時に一回の送信。その後は毎セッションのルーチン。
**規模：** すべてのプロジェクトで必須。他のすべての段を追跡可能にする段。番号付きの保留
項目がなければ証拠を掛ける場所がない。

## 何のためか

順序とゲートを持つ単一の作業キューが、プロジェクトの真実であるため。「計画」が一方に
「タスク」が他方にあるのではない。保留項目のリストが計画そのものだ。二週間で追い越されて
陳腐化する仕様書と、なぜやったのか誰も知らない仕事を防ぐ。

よく書かれた保留項目には、タスクリストの項目には通常ない三つのものがある。どこから来たか
（それを生んだ決定または依頼）、完了をどう検証するか、そして閉じたときの証拠。一つ目は
仕事が理由を失うのを防ぎ、二つ目は「完了」で閉じるのを防ぎ、三つ目はオーナーがコードの
代わりに見るものだ。

## 1. 必要な文脈

- 仕様書または顧客の最初の依頼、どれほど不完全でも。
- 監査、既にあれば。
- `PROJECT.md` と `docs/STATUS.md`。

## 2. プロンプト

**記録を作るために：**

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

何を求めているか：依頼を検証可能な項目に変換し、**検証可能な項目を書けないほど依頼が
曖昧なときは質問すること**（曖昧さは選ぶのではなく質問して解決する）。各保留項目の
フィールド、特に「どう検証するか」、後で証拠付きで閉じられるようにするもの。そして理由
付きの順序の提案、オーナーが確認または変更できるように。

**毎セッションのルーチン（共働の約束または `PROJECT.md` に入れる）：**

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why.
> Every commit cites its pending item. A pending item is closed with written evidence (the test,
> the screenshot, the number), never with "done". If along the way you see something that is not
> on the list, add it as a new pending item; do not do it.

何を求めているか：毎セッションの規律。何を取るか宣言し、各コミットで保留項目を引用し、
証拠で閉じ、リスト外に現れたものは**やる代わりに書き留める**。最後の条項が、モデルが
「他にも何か見つけた」ときに正確な範囲を守るものだ。

## 3. 期待される成果物

`docs/PENDING.md`（またはプロジェクトが使うツール）に、保留項目ごとに：

- 番号、タイトル、状態（開 / 進行中 / 閉）、開始日と終了日。
- 何が求められているか、二、三文で。
- 出所：決定または依頼、日付付き。
- 完了をどう検証するか：テスト、画面、数字。
- 閉じるとき：証拠とコミット。

そして約束または `PROJECT.md` にルーチン。

## 4. 完全性の検証

- 各保留項目はどう検証するか言っているか。検証のない保留項目は閉じられない。
- 証拠もコミットもなく「閉じた」保留項目があるか。あれば再開せよ。
- コミットを三つ無作為に取る。保留項目を引用しているか。
- 保留項目のないものがコードに現れたか。そこでエージェントは範囲を外れた。
- エージェントは依頼の曖昧な点について質問したか、それとも自分で解決したか。

## 5. 警告サイン

- ある保留項目が三セッション以上「進行中」のまま。三つの保留項目であるか、誰も取らなかった
  決定で詰まっている（第6段）。
- ある日に閉じた保留項目がその日のコミットより多い。証拠なしで閉じている。
- 開いた保留項目が五十を超える。計画ではなく不安の目録だ。優先順位を付けて保管せよ。
