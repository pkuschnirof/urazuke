# ステップ 1 — 共働の約束（段の契約）

**フェーズ：** 立ち上げ（プロジェクトごとに一度。痛い目に遭ったら見直す）。
**形式：** 一回の送信、オーナーの調整を一往復。
**規模：** すべてのプロジェクトで必須。最も安価で、最も多くの苛立ちを防ぐ段。

## 何のためか

人間とエージェントが、最初の一行のコードの前に、どう働くかを合意するため。形式的に見える
がそうではない。エージェントが範囲を広げて「助け」たり、負債を後回しにしたり、やったと
思うことをやったと報告したりするのを防ぐのがこれだ。Forgeではこのファイルは `SQ.md`
（品質基準）と呼ばれる。名前は重要ではなく、中身が重要だ。

こう理解するとよい。エージェントは毎朝、昨日の記憶なしにやって来る新しい同僚だ。約束とは
初日に伝えることであり、毎日読み返すものだ。書かなければ毎回言わなければならず、毎回
違う言い方になる。

## 1. 必要な文脈

- プロジェクトからは何も不要。最初のファイルである。
- オーナーから：仕事上の好み（言語、どう質問してほしいか、何を時間の無駄と考えるか、
  エージェントにどの程度の自律を与えるか）。

## 2. プロンプト

**最初：**

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

何を求めているか：六つの最小ルール、それぞれが防ぐ失敗付き（これが助言ではなくルール
にする）。プロジェクト固有のルールを提案するが、提案と印すこと。オーナーが受け入れるか
却下できるように。そしてオーナーについて知る必要があることを質問すること。一つも質問
せずに書かれた約束は怪しい。エージェントは一緒に働く人を知らないのだから。

**締め：**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

何を求めているか：約束を日付とバージョン付きで確定し、プロジェクトファイルに結び付けて
毎セッションで読まれるようにすること。この結び付けがなければ、約束は存在しても機能しない。

## 3. 期待される成果物

`docs/WORKING_AGREEMENT.md`（または `SQ.md`、`CONTRATO.md`）に以下を含む：

- 日付とバージョン。
- 番号付きの各ルール、一、二文で、防ぐ失敗付き。
- プロジェクト固有のルール、そうと印して。
- 末尾に一行：エージェントは変更を提案するが、約束を単独では編集しない。

そしてプロジェクトファイル（`PROJECT.md` または `CLAUDE.md`）に、毎セッション開始時に
読むよう命じる一行。

## 4. 完全性の検証

- 六つの最小ルールがあり、それぞれに防ぐ失敗が付いているか。
- 願望として書かれたルール（「〜するよう努める」「可能な限り」）はないか。あれば役に
  立たない。ルールは守るか守らないかだ。
- プロジェクトファイルは毎セッションで読むよう命じているか。
- エージェントはあなたの働き方について少なくとも一つ質問したか。何も聞かずに全部書いた
  なら怪しい。あなたを知らないのだ。

## 5. 警告サイン

- 約束のルールが二十を超える。人間もモデルも二十のルールは守らない。守れるのは六から八。
- あるルールが「エージェントは必要と判断したらこの約束を修正できる」と言う。否。
- 二週間後、エージェントが約束の禁じることをして誰も気づかない。約束は読まれていない。
  プロジェクトファイルの結び付けを確認せよ。
