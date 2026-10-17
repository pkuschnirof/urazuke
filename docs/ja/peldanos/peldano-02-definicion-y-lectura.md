# ステップ 2 — プロジェクトの定義と必読（段の契約）

**フェーズ：** 立ち上げ（一度。プロジェクト全体を通じて最新に保つ）。
**形式：** 対話（エージェントが起草し、足りないものを質問し、オーナーが修正する）。
**規模：** すべてのプロジェクトで必須。小さいプロジェクトならプロジェクトファイルは五十行
でよい。存在しないことだけは許されない。

## 何のためか

エージェントの各セッションはゼロから始まる。昨日を覚えていない。だから短い地図が必要だ。
プロジェクトとは何で、どんな状態で、どの決定が既になされたかを伝える地図が。そして何かに
触れる前にそれを読む義務が。防ぐ失敗は二重だ。地図を読まなかったことによる捨てる仕事と、
読めなくなるまで育つ地図（起源システムの一つでプロジェクトファイルは9,661行に達し、その
状態では誰も、モデルさえも読まない）。

その痛手から出た実践ルール：**プロジェクトファイルは綱領であって履歴ではない**。起きた
ことは別の場所へ（保留項目の記録、生きた状態、日誌）。プロジェクトファイルはシステムが
何で、誰のためで、何でないか、何が決まったかを言う。

## 1. 必要な文脈

- 事業の調査：顧客は何をし、誰がシステムを使い、どの問題を解決し、何をしてはならないか。
- 共働の約束（第1段）。
- 以前のシステムがあれば：そのコードまたは文書への読み取りアクセス。
- 既になされた決定、あれば。口頭でも。

## 2. プロンプト

**最初：**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

何を求めているか：調査を評価し、起草前に質問すること。プロジェクトファイルが**短い**こと
（三百行の上限は恣意的だが必要。上限なしでは育つ）。システムが何**でない**かを明示する
こと。言われていないことこそモデルが発明するものだから。決定に日付があること。そして生きた
状態を別ファイルに分けること。プロジェクトファイルが履歴にならないように。

**締め：**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

何を求めているか：オーナーの修正、日付、そしてプロジェクトファイルが変更履歴になるのを
防ぐ新しいルールを約束に加えること。そのルールこそ9,661行の事例に欠けていたものだ。

## 3. 期待される成果物

- `PROJECT.md`（または `CLAUDE.md`）：短く、必読で、何か、誰のためか、何でないか、
  モジュール、日付付きの決定、読む命令を含む。最大三百行。
- `docs/STATUS.md`：生きた状態、前者とは分離。
- 両方に最終更新日。
- 約束に、履歴は `PROJECT.md` に入れないというルール。

## 4. 完全性の検証

- `PROJECT.md` は五分で読み切れるか。読めないなら間違っている。綱領であって履歴ではない。
- システムが何をしないかを明示しているか。（欠けているものがエージェントの発明するものだ。）
- 各決定に日付と決定者があるか。
- エージェントは起草前に事業について何か質問したか。何も聞かなかったなら、何を推測したか
  確認せよ。
- 生きた状態は別ファイルにあるか。

## 5. 警告サイン

- プロジェクトファイルが一か月で20%以上育った。綱領でないものが入り込んでいる。
- エージェントがセッションの冒頭で、既に決まって書かれていることを提案する。地図を読んで
  いない。必読の結び付けが失敗している。
- 「何でないか」の節が空か、「特になし」と言う。すべてのシステムに限界がある。書かれて
  いなければ、モデルはそれを越える。
