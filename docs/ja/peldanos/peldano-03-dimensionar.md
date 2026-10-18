# ステップ 3 — アーキテクチャを設計する前にサイジングする（段の契約）

**区間：** 立ち上げ。
**いつ：** 一度、最初の週に、定義の後、骨組みを組む前。事業がスケールを変えればやり直す。
**形式：** 対話。エージェントが計算して選択肢を提示し、あなたが選ぶ。
**規模：** 常に必須だが比例的。小さいプロジェクトならサイジングは半ページと一つの決定
（「SQLiteで何年も収まる」）でよい。やらないことだけは許されない。「どれだけ育つか」という
問いは五分で済み、間違った答えは数週間を要するからだ。

## 何のためか

構造的な決定（どのデータベースエンジンか、インターフェースは同期か非同期か、どれだけの
並行性か）を、好みではなく数字で行うこと。飛ばすと最も高くつく段であり、私は身をもって
知っている。私のあるシステムではJSONファイルで始め、計測したら年間340万行を生成すると
判明した。後からインターフェースを変えるのは再設計の一段階まるごとを要した
[Ref. 15](../REFERENCIAS.md#ref-15)。

心に留めておく価値のある要点がある。**事業だけが持つデータがある**（エンティティはいくつ、
エンティティあたりのイベントはいくつ、ピーク時のオペレータは何人、どれだけ保存するか）、
そしてモデルはそれを推論できない。推論できるのは派生物だ。だからプロンプトは、一次データ
が完全か評価し、足りないものを求めるよう要求する。自信ありげな顔で推定する代わりに。計算に
何が足りないかを知っているのはモデルであって、フォームではない。

そして持ち帰ってほしい二つ目の考え：**非対称な決定**。取っても不要だった場合は非常に安く、
取らずに必要だった場合は非常に高くつく決定がある。一行目から非同期の永続化インターフェース
が典型例だ。エンジンが結局同期なら、`await` が一つ余っただけ。結局非同期で、予見していな
かったら、すべてを書き直さなければならない。そうした決定は、今日必要でなくても、安いなら
常に取ること。

## 1. 必要な文脈

- 事業の**ボリュームデータの調査**、一般的な名前で：主要エンティティとその成長、エンティ
  ティあたりのイベント、同時オペレータとピークの時間帯、データの保存期間、例外的な負荷
  （キャンペーン、締め）、期待される成長。調査は本質的に不完全。エージェントが評価して
  求める。
- 以前のシステムがあるなら：推定ではなく実数を得るためのそのデータベースへの読み取り
  アクセス。
- `PROJECT.md` とセマンティックツリー（第2段）：木のエンティティがサイジングすべきもの。

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

> [ja]
> アーキテクチャを提案する前にシステムをサイジングします。`PROJECT.md` と
> `docs/VOLUME_SURVEY.md` のボリューム調査を読んでください。一次データ（事業だけが知る
> 事実）と派生データ（一次データから計算できるもの）を区別してください。一次データが以下を
> 計算するのに十分完全か評価してください。一次の数字が欠けているか、推定と印されているなら、
> 先へ進む前に足りない数字をすべて私に求めてください。一次の数字を決して推定しないでくだ
> さい。以前のシステムを参照できるなら、その実数を使い、それぞれの出所を述べてください。
> 一次データが完全になったら、計算を示しながら算出してください：最大の三テーブルの年間行数、
> ピーク時の並行性、五年後のデータ量、そしてすべてが十倍になったとき最初に壊れるもの。次に
> 永続化と並行性の三つの選択肢を、それぞれ後で他へ移行するコストとともに提示してください。
> 選ばないでください。私が選びます。コードを書かないでください。私の言語で答えてください。

何を求めているか、条項ごとに：一次と派生を区別すること（発明を防ぐ区別だ）。**足りない
一次データを求め、決して推定しないこと**。以前のシステムがあればその実数を出所とともに
使うこと。派生物を計算を見せて算出すること、あなたがやり直せるように。「十倍」のシナリオ、
最初に壊れるものを明らかにするもの。互いに移行するコスト付きの三つの選択肢、決定は「どれ」
だけでなく「間違えるといくらかかるか」だから。そして選ばず、コードも書かないこと。この段
は決定の段であって、構築の段ではないからだ。

**締め：**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [ja]
> 選択肢[B]を選びます。`docs/SIZING.md` に記録してください：出所付きの一次データ、計算付き
> の派生データ、三つの選択肢、選んだものとその理由、そして今日は必要でなくても「念のため」
> 取る決定（例えば：永続化インターフェースは最初のエンジンが同期でも一行目から非同期）。
> あなたがした質問と私の答えを含めてください。

何を求めているか：出所と計算付きの完全な記録。選んだものと理由。そして書かれた非対称な
決定。暗黙のままでは守られないから。

## 3. 期待される成果物

`docs/SIZING.md`。内容：

- 日付と誰が決めたか。
- 一次データの表：値、出所（事業が報告 / 以前のシステムで計測）、日付。出所「推定」のもの
  は一つもない。
- 派生データの表：値、どの一次データから出るか、計算。
- 「十倍」のシナリオ：最初に壊れるもの。
- 番号付きの三つの選択肢、互いに移行するコスト付き。
- 選んだものと理由、一、二文で。
- 非対称な決定、リストで。
- エージェントがした質問と答え。

## 4. 完全性の検証

- 出所「推定」または出所なしの一次データがあるか？ あるなら段は登れていない。エージェント
  は求めるべきだった。
- 各派生データはどの一次データからどんな計算で出るかを示しているか？ 一つの計算を手でやり
  直して合うか？
- 三つの選択肢があり、理由が書かれた一つが選ばれているか？
- ボリュームが十倍になったら何が起きるかを言っているか？
- 非対称な決定は書かれているか、暗黙のままか？
- エージェントは質問したか？ 一つも質問せずに数字を提示したなら、疑うこと。

## 5. 警告サイン

- 三つの選択肢のシナリオが同じ結論に至る。エージェントは既に選んでいて、他の二つは形式の
  ために組んだ。
- 派生の数字が、元になる一次データより精度が高い（「約5,000家族」から「1,234,567行」）。
  その精度は偽物だ。
- 「十倍」のシナリオが「何も起きない」と言う。常に何かが起きる。見つからなかったなら、
  探さなかったのだ。
