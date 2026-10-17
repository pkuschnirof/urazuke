# ステップ 7 — 錠としてのテスト、赤で証明（段の契約）

**フェーズ：** ループ（変更ごと）。
**形式：** 一回の送信。エージェントが実行して報告し、オーナーが報告を読む。
**規模：** すべてのプロジェクトで必須。方法の心臓部。交渉できない段が一つあるなら、これだ。

## 何のためか

一度も失敗するのを見ていないテストは、何かを証明しているかわからない。ここでのルールは
「テストを書け」ではない。「古いコードに対してテストが赤になり、新しいコードで緑になる
ことを示せ」だ。何も証明しないから通るテストと、バグを隠す緑を防ぐ。

人間のプログラマよりモデルでこれがより重要な理由：モデルはコードとテストを**同じ
セッションで、同じ理解で**書く。依頼を誤解していれば、テストは誤解したものを証明し、通る。
古いコードに対する赤は、テストが重要なものを見ていることを確かめる唯一の安価な方法だ。古い
コードが通るなら、テストは前後を区別しておらず、役に立たない。

## 1. 必要な文脈

- 既に実装された変更（既定ではテストは実装の後。「テストが先」は小さく明確な範囲の選択肢
  として残る）。
- 変更の元となる保留項目、その「どう検証するか」付き。
- 既存のテスト群と実行コマンド（第4段）。

## 2. プロンプト

**ルーチン（共働の約束に入れる。変更ごとに適用）：**

> To close this pending item I need evidence, not your word. (1) Write the test that proves what
> the item asks for. (2) Demonstrate that this test fails against the previous code: you may
> temporarily revert the change, or run the test against the old version, but show me the red
> output. (3) Show me the green output with the change. (4) Run the regression suite for the
> neighbouring items and show me it is still green. (5) Do not replace with mocks the very part
> you are trying to test. If testing end to end requires something you lack (data, access, an
> environment), ask me for it; do not simulate what you do not have. Finally, the commit message
> says "proved red against [what]" and the test counts.

何を求めているか、条項ごとに：(1) テスト。(2) **示された赤**、出力を見せて。この方法を
「テストを書け」と区別する条項。(3) 緑。(4) 同じセッションでの隣接項目の回帰。変更は隣の
ものを壊すから。(5) まさに試す部分をモックしないこと。そしてこの段に合わせた完全性の条項：
エンドツーエンドで試すのに何か欠けているなら、**シミュレートせず求める**こと。数字付きの
コミットメッセージが、証拠をコードの住む場所に残す。

**エージェントがテストできないと言うとき：**

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

何を求めているか：「テストできない」が会話の終わりではなく保留項目の始まりであること。
テスト不能は負債であり、負債は記録する。

## 3. 期待される成果物

- リポジトリ内の新しいテスト、閉じる保留項目の名前付き。
- エージェントの報告とコミットメッセージに：赤の出力（いくつ失敗、どのバージョンに対して）、
  緑の出力、数字付きの緑の回帰。
- エンドツーエンド（画面 → バックエンド）で試したなら、バックエンドが変わった証拠（行、
  記録、状態）。

## 4. 完全性の検証

- 報告は赤を示しているか。数字付きで：「古い基準に対して8のうち4が失敗」。緑だけなら段は
  登れていない。
- 回帰は同じセッションで走ったか。テストはいくつ、緑はいくつ。
- 変更のまさにその場所に「シミュレート」（モック）された部分があるか。エージェントに何を
  なぜシミュレートしたか尋ねよ。
- コミットは保留項目を引用し、「赤で証明」と言っているか。
- 画面のテストなら、バックエンドへの効果も検証しているか。

## 5. 警告サイン

- 今週の新しいテストがすべて一発で緑になり、赤が一度も示されなかった。エージェントが手順
  を省いているか、テストが何も証明していない。
- テスト群がどんどん遅くなり、誰も理由を知らない。たいてい「速く走るように」とエンドツー
  エンドのテストがシミュレーションに置き換えられている。
- エージェントが数を言わずに「テストは通る」と報告する。常に数字付きで。
