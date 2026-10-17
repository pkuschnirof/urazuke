# ステップ 6 — 決定はコードの隣に書く（段の契約）

**フェーズ：** ループ（事業ルールや構造的決定が現れるたびに）。
**形式：** 短い対話：エージェントが決定があることを検知し、質問し、書き残す。
**規模：** すべてのプロジェクトで必須。小さいプロジェクトなら記録は十行の表でよい。重要
なのは事業ルールにオーナーがいることだ。

## 何のためか

各事業ルールと各構造的決定に、オーナー、日付、場所があるため。さもなければ六週間後、
「承認済み＋残高はキューに戻る」が顧客の決定だったのかエージェントの思いつきだったのか
誰も知らない。そして最悪の事態を防ぐ。エージェントが妥当に思えたからという理由でドメイン
のルールを発明すること。

これには声に出して言う価値のある帰結がある。モデルはルールの穴に出会うと、**それを
埋める**。立ち止まらない。最もありそうなもので補完し、他のことを書くのと同じ自然さで
そうする。だからこの段のルーチンは「決定を書け」ではなく「欠けているときは止まって聞け」
だ。後者が難しく、約束で要求すべきものだ。

## 1. 必要な文脈

- オーナーとの対話：唯一の文脈。エージェントは事業ルールを決められない。
- 決定を書く合意された場所：コミットメッセージ、保留項目の文書、または `docs/DECISIONS.md`
  の記録。

## 2. プロンプト

**ルーチン（共働の約束に入れる）：**

> Whenever implementing something requires a business rule that is not written down, or you
> must choose between two approaches that change what the user sees, stop and ask me, in prose,
> with your recommendation and the alternative. Do not implement the one you prefer. When I
> decide, write the decision with my name and the date in the commit message and in
> `docs/DECISIONS.md`, with the exact words I used. If I do not answer and you must move on,
> implement the most reversible option and mark it "decision by omission, pending confirmation",
> so that I can review it.

何を求めているか：書かれていないルールや目に見える分岐の前で**止まる**こと。推奨と代替案
を添えて質問すること（オーナーが十分ではなく十秒で決められるように）。決定を「改善した」
言い換えではなくオーナーの言葉そのままで記録すること。そしてオーナーが答えないときは、
最も可逆な選択肢を「省略による決定」と印すこと。それが決定を消さずに進むことを可能にする。

**締め（各決定）：**

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

何を求めているか：決定の最小形式：ルールの原文、誰が、いつ。三つ。どれか一つ欠けても
記録された決定ではない。

## 3. 期待される成果物

- `docs/DECISIONS.md`：決定ごとに一行または一段落、日付、決定者、原文、適用された保留項目
  またはコミット、「省略による」かどうか。
- 事業ルールを実装する各コミットに：出所の文（"rule from the owner: approved + balance = back
  to the queue"、"owner decision 2026-08-10"）。

## 4. 完全性の検証

- 事業ルールに触れるコミットを三つ開く。それぞれ誰がいつ決めたか引用しているか。
- 未確認の「省略による」決定があるか。確認するか戻すかせよ。放置するな。
- 自分のものと認識できないルールがシステムにあるか。あればエージェントが発明した。段の
  失敗であり、保留項目として書き、見直す。
- 文は原文か、エージェントが「改善」したか。あなたの言葉でなければならない。

## 5. 警告サイン

- 一週間の作業を経て決定の記録が育っていない。作業が純粋に機械的だったか（まれ）、
  エージェントが単独で決めたか。
- 記録された決定がすべて同じ洗練された文体で書かれている。エージェントの言い換えであって、
  あなたの言葉ではない。
- システムのユーザーが「なぜこうなるのか」と尋ね、誰も決定を見つけられない。
