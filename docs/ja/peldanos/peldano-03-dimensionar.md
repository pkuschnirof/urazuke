# ステップ 3 — アーキテクチャを設計する前にサイジングする（段の契約）

**フェーズ：** 立ち上げ（一度。事業の規模が変われば再実施）。
**形式：** 対話（エージェントが計算して選択肢を示し、オーナーが選ぶ）。
**規模：** 常に必須だが比例する。小さいプロジェクトならサイジングは半ページと一つの決定
（「SQLiteで何年ももつ」）でよい。許されないのはしないことだ。「どれだけ育つか」という問い
は五分で済み、間違った答えは数週間を費やす。

## 何のためか

構造的な決定（どのデータベースエンジンか、インターフェースは同期か非同期か、どれだけの
並行性か）を、好みではなく数字で行うため。飛ばすと最も高くつく段だ。KikanではJSONファイル
で始め、計測してみるとシステムは年間340万行を生成していた。後からインターフェースを変える
のに再設計の一段階まるごとを要した。

この契約を策定する中で浮かんだ要点：**事業だけが持つデータがある**（エンティティがいくつ、
エンティティごとのイベントがいくつ、ピーク時のオペレータが何人、どれだけ保持するか）。
モデルはそれを推論できない。推論できるのは派生データだ。だからプロンプトは、一次データが
完全か評価し、足りないものを自信ありげに推定する代わりに求めるよう要求する。計算に何が
足りないかを知っているのはモデルであって、フォームではない。

もう一つ名前を付ける価値のある考え：**非対称な決定**。取っても不要だったなら非常に安く、
取らずに必要だったなら非常に高くつく決定がある。一行目から非同期の永続化インターフェース
はその典型例だ。エンジンが結局同期なら `await` が一つ余るだけ。非同期になって予見して
いなければ全部書き直しだ。そうした決定は、今日は不要でも、安い限り常に取る。

## 1. 必要な文脈

- 事業の**ボリューム調査**、一般的な名前で：主要エンティティとその成長、エンティティごとの
  イベント、同時オペレータ数とピークの時間帯、データの保持期間、例外的な負荷（キャンペーン、
  締め）、期待される成長。調査は本質的に不完全。エージェントが評価して求める。
- 以前のシステムがあれば：推定の代わりに実数を得るため、そのデータベースへの読み取り
  アクセス。
- `PROJECT.md`（第2段）。

## 2. プロンプト

**最初：**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

何を求めているか、条項ごとに：一次と派生を区別すること（発明を防ぐ区別）。**足りない一次
データを求め、決して推定しないこと**。以前のシステムがあれば出所付きでその実数を使うこと。
派生データを計算の過程を見せて算出し、オーナーが再計算できるようにすること。「十倍」の
シナリオ、何が最初に壊れるかを明かすもの。互いに移行するコスト付きの三つの選択肢、決定は
「どれか」だけでなく「間違えるといくらか」だから。そして選ばず、コードも書かないこと。
この段は決定の段であって構築の段ではない。

**締め：**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

何を求めているか：出所と計算付きの完全な記録。選んだものと理由。そして非対称な決定を
書き残すこと。暗黙のままでは守られないから。

## 3. 期待される成果物

`docs/SIZING.md` に以下を含む：

- 日付と決定者。
- 一次データの表：値、出所（事業からの報告 / 以前のシステムで計測）、日付。出所が「推定」
  のものは一つもない。
- 派生データの表：値、どの一次データから、計算式。
- 「十倍」のシナリオ：何が最初に壊れるか。
- 番号付きの三つの選択肢、互いに移行するコスト付き。
- 選んだものと理由、一、二文で。
- 非対称な決定（間違えても安く、取らないと非常に高い）のリスト。
- エージェントがした質問と回答。

## 4. 完全性の検証

- 出所が「推定」か、出所のない一次データはないか。あれば段は登れていない。エージェントは
  求めるべきだった。
- 各派生データはどの一次データからどの計算で出たかを示しているか。一つ手計算して合うか。
- 三つの選択肢があり、理由を書いて一つ選ばれているか。
- ボリュームが十倍になったら何が起きるか書いてあるか。
- 非対称な決定は書かれているか、それとも暗黙のままか。
- エージェントは質問したか。一つも質問せずに数字を出したなら疑え。

## 5. 警告サイン

- 三つの選択肢が同じ結論に至る。エージェントは既に選んでいて、残り二つは形式のために
  作った。
- 派生の数字が元の一次データより精密（「約5,000家族」から「1,234,567行」）。その精度は
  偽物だ。
- 「十倍」のシナリオが「何も起きない」と言う。必ず何かが起きる。見つからなかったなら、
  探していない。
