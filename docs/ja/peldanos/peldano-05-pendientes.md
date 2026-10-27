# ステップ 5 — 計画とは保留項目のこと：詳細な仕様はそれぞれの中に住む（段の契約）

**区間：** ループ。
**いつ：** 記録は最初の機能ブロックを開くとき、立ち上げが終わった直後に作る。新しいブロック
はそれぞれ、顧客の依頼を仕様付きの保留項目に変換することから始まる。ルーチンはプロジェクト
全体を通じて毎セッション使う。完了した保留項目の文書化は、閉じるときに同じセッションで書く。
**形式：** 各ブロックを開くとき一回の送信。その後は毎セッションのルーチン。
**規模：** すべてのプロジェクトで必須。他のすべての段を辿れるようにする段だ。番号付きで仕様
のある保留項目なしには、仕様も証拠もぶら下げる場所がない。

## 何のためか

順序とゲートを持つ単一の作業キューを持ち、それがプロジェクトの真実であること。「計画」が
一方に「タスク」が他方にあるのではない。保留項目のリストが計画そのものだ。二週間で追い越
されて陳腐化する長い仕様 [Ref. 17](../REFERENCIAS.md#ref-17) と、なぜやったか誰も知らない
仕事 [Ref. 7](../REFERENCIAS.md#ref-7) を防ぐ。

だがそれ以上のものがあり、それがこの段を単なるタスクリストから区別する。古典的方法には、
システムがすべきことすべてを記述し、完成する前に古びる長い要件仕様書があった。ここでは
その文書が分解される：**詳細な仕様は各保留項目の中に住む**。よく書かれた保留項目が持つ
もの：ぶら下がるセマンティックツリーのノード。顧客の言葉による、それを生むユーザー
ストーリーまたはユースケース。詳細な記述。適用される事業ルール、その決定と日付付き。
入出力データ。影響を受ける画面、プロトタイプがあればそれも。境界ケースと例外。「前提、
もし、ならば」の形の受け入れ基準。そしてどう検証するか。保留項目の総和がシステムの仕様で
あり、トレーサビリティ（要件 → 保留項目 → テスト → コミット）は別のマトリクスではない。
保留項目そのものだ。

そして三つ目、円環を閉じるもの：**閉じた保留項目は文書である**。保留項目が閉じるとき、
消されも空のまま保管されもしない。その仕様、それを生んだ決定、閉じたときの証拠（赤と緑の
数字、スクリーンショット、計測した数字）、コミット、日付とともに残る。閉じた保留項目の
キューはシステムの機能的な履歴だ：何を、なぜ、いつ構築し、どうテストしたか。そこから変更
日誌、マニュアルの新しい節、そして六か月後の「なぜシステムはこうするのか？」への答えが
出てくる。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- ブロックに対する顧客の依頼、散文で、顧客が言う通りに、その曖昧さとともに。取り込みで
  ユースケースやユーザーストーリーを作ったならなお良い。それらはブロックの自然な単位だ。
- セマンティックツリー（第2段）、各保留項目をそのノードにぶら下げるため。
- 監査と人間によるテストの発見、既にあれば。
- `PROJECT.md` と `docs/STATUS.md`。

## 2. プロンプト

**ブロックを開くために：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- このブロックに対する顧客の依頼。散文で、顧客が言う通りに、その曖昧さとともに書いたもの。
  `docs/INITIAL_SURVEY.md` のブロック名の見出しの下か、独自のファイル（たとえば
  `docs/blocks/BLOCK_01_REQUEST.md`）に置きます。プロンプトは「the client's request for
  this block」とパスなしで呼ぶので、チャットでどこにあるかを言ってください。取り込みでユース
  ケースやユーザーストーリーを書いたなら、それもそこへ。ブロックの自然な単位です。オーナーが
  優先順位をくれたなら、それも。あなたが「改善」してはいけません。曖昧さは、エージェントが質
  問すべきものです。
- `docs/SEMANTIC_TREE.md`（第2段）、最新のもの：各保留項目はそこのノードにぶら下がります。
- `PROJECT.md` と `docs/STATUS.md`（第2段）、最新のもの。
- 監査（第13段）や人間によるテスト（前のブロックの締めでの人間の視界）があったなら：その発見
  を、`docs/AUDIT_[日付].md` か生きた状態に書き留めて。このブロックの保留項目の候補だからで
  す。
- 最低限受け入れられる状態：ブロックの依頼が顧客の言葉で書かれていて、木にそのブロックのノー
  ドがあるか、依頼からどれが足りないかが見えること。

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why.
>
> This block also carries the hooks of Annex H. Every pending item that
> touches a screen declares, in `docs/PENDING.md`: the group of convergence
> it belongs to (Annex H, B1), the profiles that have it, and one acceptance
> criterion per affected profile, written as "given profile X, this person
> can do Y and cannot do Z". It also adds or updates its row in
> `docs/PROFILE_MATRIX.md`: the functionality, its group, its profiles and
> its entry route. A pending item that touches a screen without that row is
> not planned: the row is written here, not invented later in the code. The
> catalogue lives in `docs/ANEXO_HEURISTICAS.md`: cite it, do not restate
> it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [ja]
> このブロックでやるべきことすべてを、それぞれ完全な仕様を持つ番号付きの保留項目に変換
> します。`PROJECT.md`、`docs/SEMANTIC_TREE.md`、このブロックに対する顧客の依頼、そして
> `docs/STATUS.md` にあるものを読んでください。依頼が検証可能な保留項目を書けないほど
> どこかで曖昧なら、私に聞いてください。推測で解決しないでください。次に `docs/PENDING.md`
> を作成または拡張し、やるべきこと一つにつき一項目、それぞれに：番号（PND-001から）。一行の
> タイトル。ぶら下がるセマンティックツリーのノード。顧客の言葉による、それを生むユーザー
> ストーリーまたはユースケース。詳細な記述。適用される事業ルール、それぞれ決定と日付付き、
> または「ルール欠落、質問済み」と印して。入出力データ。影響を受ける画面。境界ケースと例外。
> 「前提、もし、ならば」の形の受け入れ基準。完了をどう検証するか。そして状態。項目が必要と
> するノードが木に存在しなければ、提案して印してください。私が与えた優先順位で項目を並べて
> ください。与えていなければ、順序を提案してその理由を教えてください。私の言語で答えて
> ください。
>
> このブロックは付録Hの掛け金も担います。画面に触れる保留項目はすべて、
> `docs/PENDING.md` に次を宣言してください：属する収束グループ（付録
> H、B1）、その機能を持つプロファイル、影響を受けるプロファイルごとの受け入れ基準。
> 受け入れ基準は「プロファイルXを与えられたとき、この人はYができ、Zはできない」とい
> う形で書きます。さらに `docs/PROFILE_MATRIX.md` に行を追加
> または更新してください：機能、そのグループ、そのプロファイル、その入り口の経路です。
> その行のないまま画面に触れる項目は、計画されていないものとして扱います。行はここで書
> き、後でコードの中で発明しません。カタログは
> `docs/ANEXO_HEURISTICAS.md` にあります：引用し、繰り返さ
> ないでください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：依頼を検証可能な項目に変換し、**依頼が検証可能な項目を書けるほど十分で
ないときは質問する**こと（曖昧さは選ぶのではなく質問して解決する）。各保留項目の完全な
仕様、フィールドごとに、それは古典的な要件工学を小さな単位に分解したものだ。ぶら下がる木
のノード、範囲外の保留項目を検知できるようにするもの。決定付きか欠落と印された事業ルール、
第6段との結び付け。古典的な形の受け入れ基準、第8段のエンドツーエンドテストの台本。そして
理由付きの提案された順序、あなたが確認または変更するため。

**毎セッションのルーチン（共働の約束に入れる）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- `docs/PENDING.md`。ブロックが仕様化されていて、あなたが顧客になったつもりで保留項目を一つ
  ずつ読み、訂正をすでに済ませてあるもの（この段で最も重要な作業であり、最も飛ばしたくなる作
  業です）。
- `docs/WORKING_AGREEMENT.md`（第1段）、このルーチンが加わる先。
- 最低限受け入れられる状態：一行の仕様しか持たない保留項目が一つもないこと。あるなら、構築を
  始めないでください。先に完成させてもらってください。

> Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why,
> and re-read its specification. Every commit cites its pending item. A pending item is closed
> with written evidence (the test counts red and green, the screenshot, the measured number),
> never with "done". When you close it, keep it in the register with its full specification and
> add: the evidence, the commit, the date, and any decision that was taken along the way; that
> record is the documentation of what was built. If along the way you see something that is not
> on the list, add it as a new pending item with its specification; do not do it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> コードに触れる前に `docs/PENDING.md` を開き、どの項目をなぜ取るかを私に告げ、その仕様を
> 読み直してください。すべてのコミットはその保留項目を引用します。保留項目は書かれた証拠
> （赤と緑のテストの数、スクリーンショット、計測した数字）で閉じ、決して「完了」では閉じ
> ません。閉じるときは、完全な仕様とともに記録に残し、追加してください：証拠、コミット、
> 日付、そして途中で取られた決定。その記録が構築したものの文書です。途中でリストにない
> ものを見つけたら、仕様付きの新しい保留項目として追加してください。やらないでください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：毎セッションの規律：何を取るかを告げて仕様を読み直す（エージェントは
記憶なしに始まり、仕様が保留項目についての記憶だ）、各コミットで保留項目を引用する、証拠で
閉じる、**完了した保留項目を同じ記録に文書化する**、そしてリスト外に現れたものは**やらずに
記す**。最後の条項が、モデルが「他に何か見つけた」ときに正確な範囲を守るものだ。

## 3. 期待される成果物

`docs/PENDING.md`（またはあなたのプロジェクトが使うツール）、保留項目ごとに：

- 番号、タイトル、状態（開 / 進行中 / 閉）、開始日と終了日。
- セマンティックツリーのノード。
- 顧客の言葉による、起源のストーリーまたはユースケース。
- 詳細な仕様：記述、決定と日付付きの事業ルール、データ、画面、境界ケース、受け入れ基準、
  どう検証するか。
- 閉じるとき：証拠、コミット、日付、途中で取られた決定。

そして共働の約束の中のルーチン。

## 4. 完全性の検証

- 無作為に選んだ保留項目の仕様を、顧客になったつもりで読むこと：あなたが頼んだことを、
  あなたの元の言葉で記述しているか？ 受け入れ基準は、あなたが「よし」と言うために使うもの
  か？ あなたが知っていて載っていない境界ケースはあるか？
- 各保留項目は木のノードからぶら下がっているか？ 見覚えのないノードにぶら下がっているもの
  はあるか？
- 各保留項目はどう検証するかを言っているか？ 検証のない保留項目は閉じられない。
- 「欠落、質問済み」と印されたのに、あなたに聞かれていない事業ルールがあるか？
- 証拠もコミットもなしに「閉じた」保留項目があるか？ あるなら再び開くこと。閉じたものは
  その仕様と終了の文書を保持しているか？
- 無作為に三つのコミットを取ること：保留項目を引用しているか？
- 保留項目のないものがコードに現れたか？ そこでエージェントは範囲を外れた。

## 5. 警告サイン

- ある保留項目が三セッション以上「進行中」。三つの保留項目であるか、誰も取らなかった決定で
  詰まっているか（第6段）。
- 一日に閉じた保留項目がその日のコミットより多い。証拠なしに閉じられている。
- 仕様が一行。エージェントは形式のために書いたのであって、その上に構築するためではない。
  構築の時点で足りないものを発明する。
- リストに五十以上の開いた保留項目がある。計画ではなく不安の目録だ。優先順位を付けて
  保管すること。
- 誰かがシステムがなぜあることをするのか聞き、答えがどの閉じた保留項目にもない。完了の
  文書が書かれていない。
