# ステップ 10 — 手動テストケースは機能とともに書かれ、それを実行するのは人である（段の契約）

**区間：** ループ。
**いつ：** 各保留項目とともに、それを閉じるとき、赤のテスト（8）と品質（9）の後に。エージェ
ントは触れたフローの手動テストケースを書く。それを人が実行するのは三つの瞬間：各ブロックの締
め（人によるテスト）、本番への最初のデプロイの前（オーナーとの受け入れテスト）、そして各デプ
ロイの後、読み取り専用の一巡で。失敗した各実行は、修正の保留項目として一つの要件をループに再
注入する。
**形式：** 各保留項目のルーチン。その後はサイクルごとの人による実行。
**規模：** 利用者のいるすべてのプロジェクトで必須：手動テストケースは、モデルが書きも走らせ
もしない唯一のテストだ。

## 何のためか

この方法には自動テストが有り余るほどある。赤のテスト、回帰、三つの尺度でのエンドツーエンド。
すべてモデルが書き、モデルが走らせ、すべてモデルが理解したことを検証する。欠けているのは、人
が自分の目と自分の手で、書かれた台本に従って行うテストだ。それはどのテストも見つけないものを
見つける：あるべきでない場所にあるボタン、理解できないメッセージ、技術的には動くが人間的には
役に立たないフロー。人間の目視と人によるテストはすでにタイムラインにあった。欠けていたのは、
それらが**台本**を持つこと、そしてその台本を、その機能を構築したのと同じ者が、同じ瞬間に、保
留項目の受け入れ基準から書くことだった。台本がなければ、人によるテストは「しばらくシステムで
遊んでみて」になり、見つかるものはその日の気分次第になる。台本があれば、毎回同じように実行さ
れ、何が起きたかが記録され、失敗したものは要件としてループへ戻る。これが、プロセスの図が示す
円環の閉じだ：テストケースの手動実行が、要件を開発へ再注入する。

手動テストケースは常に同じ形を持つ：識別子。それを生んだ保留項目。前提条件（前に何が存在して
いなければならないか：ある患者、昨日の予約）。番号付きの手順。それぞれに人が何をするかと何が
見えなければならないか。最後の期待される結果、人が検証できるバックエンドでの効果を含めて（現
れる記録、偽の受信箱のメッセージ）。使うテストデータ。そして各実行の結果のための欄：日付、
誰、通ったか失敗したか、所見。

**初心者の方へ。** *手動テストケース*とは、人が機能を試すためのレシピです：何を用意し、何を
一歩ずつ行い、各段階で何が起きなければならないか。システムがどう作られているかを知らなくて
も、誰でも同じように追えるように書きます。ケースを*実行する*とは、レシピに従って、通ったか
失敗したかを書き留めることです。*前提条件*とは、始める前に存在していなければならないもので
す。そして*再注入する*とは、人が見つけた不具合が、その人の言葉とともに、新しい依頼として保
留項目のリストへ戻ることです。

D-082 でさらに二つのことが入りました。二つであって、一つではありません。一つめ：**人は受け入れる
ために実行し、エージェントは欠陥を見つけるために歩く**。この方法は両方を求めます。エージェントの
歩き——各画面を開き、そこに何があるかを見て、使い、ある画面から次の画面へ流れをたどること、人が
するように——は人の実行を置き換えませんし、段 8 の端から端までの試験でもありません。端から端まで
の試験は誰かが選んだ道を通りますが、歩きは、誰も試そうと思わなかったものを探します。求めるのは、
測ったからです。エージェントが一つの完全な周期でしたことのうち、歩きが**インタフェースの欠陥を
もっとも多く見つけたもの**でした。そして方法はそれを求めていませんでした。エージェントが自分自身に
求めていたのです。それは `docs/SCREEN_WALKTHROUGH.md` に、その分母とともに残ります——システムに
画面がいくつあるか、いくつ歩いたか、欠陥をいくつ見つけたか。入れなかった画面も総数に数え、その
理由を名指します。数字の見えをよくするために分母から外すことは、まさに付録 H の `CQ-19.1` が
禁じていることです。

そして二つめは、この段の限界を正面から言ったものです。**ケースを書くことと、人がそれを実行する
ことは二つの別の状態であり、二つめを方法は強制できません。** 人が自分の手で台本をたどったことは、
どんなプログラムも検証できません。それを要求するゲートは、嘘をつくことでしか満たせません。
だから段は検証できるもの——宣言——を要求し、負債は目に見えるところに残ります：
`docs/MANUAL_TESTS.md` の冒頭の `cases_written`、`cases_executed_by_a_person`、
`execution_debt`。二つめの数字を動かすのは署名された実行だけで、エージェントの読みでは決して
動きません。この宣言は**新しいゲートを追加しません**。段が余分に求めるのは、負債が書かれていることであり、
数字がゼロより大きいことではありません。人を強制することが、方法にできないことだからです。
**止める**のは、付録 H のアンカー 4 からすでにあったことです。プロファイルごとに誰も走らせなかった
ケースは、実行されたケースではありません。2026-11-02 に実際の評価器で測りました。そのアンカーを
実装している環境は、署名されたケースの記録が空だと言って赤になります。つまり、足りなかったのは
封鎖ではなく、負債が**読める**ことでした——その数字と、それを負っている人の名前。「誰も署名して
いない」とだけ言い、誰が署名すべきでいつから欠けているのかを言わない空の記録の代わりにです。そして、
この段を読むために知っておくのがよいこと：これを開いた測定の出所は、空の表のまま進んだ計画であり、
それはスキーマ 1 の**凍結**で走っていました。そこでの段 10 の唯一の検査は、ファイルが存在することだけです。2026-11-02 に
実際の計画で測りました：十三のケースが書かれ、実行表は空で、段は緑、そして適合文書が六つの基準を
検証済みと主張していて、その検証者は一度も実行していない人でした。エージェントは段が言ったことを
正確にやっていました。穴は段の側にありました。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 閉じようとしている保留項目と、その「前提、とき、ならば」の受け入れ基準（第5段）：ケースの
  原材料です。
- データの入ったテスト環境。手順が本当に追えるように。
- 誰がケースを実行するか（オーナー、信頼できる利用者）といつ（ブロックの締め、受け入れ、各デ
  プロイの後）。

## 2. プロンプト

**各保留項目のルーチン（共働の約束に入る）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- `docs/PENDING.md` の中の、受け入れ基準を持つ保留項目（第5段）。すでに構築され、赤のテスト
  と緑の品質を持つもの（第8段と第9段）。
- `docs/MANUAL_TESTS.md` が作られていること。空でも構いませんが、ヘッダにケースの書式ととも
  に：識別子、保留項目、前提条件、手順（行動と目に見える結果）、人が検証できるバックエンドで
  の効果を含む期待される結果、テストデータ、そして実行の表（日付、誰、通ったか失敗したか、所
  見）。
- 誰がいつ実行するかの決定。`PROJECT.md` か約束に書いたもの：小さいプロジェクトなら、各ブロ
  ックの締めと最初のデプロイの前にオーナーが。
- `docs/WORKING_AGREEMENT.md`。ルーチンはそこに入ります。
- 最低限受け入れられる状態：ファイルがその書式とともに存在し、保留項目に受け入れ基準があるこ
  と。

> Every pending item that changes what a user sees or does is closed with its manual test cases
> written in `docs/MANUAL_TESTS.md`, derived from its acceptance criteria: one case per flow the
> item touches, with an id, the pending item, the precondition, the numbered steps (what the
> person does and what they must see), the expected result including a backend effect a person
> can verify without tools, the test data to use, and an empty execution table (date, who,
> passed or failed, observation). Write them for a person who does not know how the system is
> built. Keep the cases of closed items up to date: when a flow changes, its cases change in the
> same commit. Never mark a case as executed yourself: execution is human.
>
> Every manual case also runs once per affected profile, and it is derived
> from `docs/PROFILE_MATRIX.md` instead of being written by hand: a case run
> with a single profile is not an executed case (Annex H, anchor 4). At the
> close of each block add the two human checks no machine replaces: the
> first-click check, where I name the place I would look for a task and you
> compare that with the menu, and the real screenshot of the test
> environment.
>
> `docs/MANUAL_TESTS.md` carries at its head three declarations that a gate reads, each one under
> its fixed key in English even when the file is in my language, because what this step owes is not
> the same as what it can prove. `cases_written`: how many cases are written.
> `cases_executed_by_a_person`: how many of those a person signed in their execution table, with a
> date and a name; you keep the first figure, and the second one moves only when a person executes
> -- never from your own reading of the system. `execution_debt`: `none` when the two figures are
> the same, or `pending_verifier` and then the cases nobody has executed yet, with who owes each
> execution and since when. That debt is not a gate of its own: what this step asks you for is the
> declaration and not a figure above zero, because the method cannot make a person execute. But it
> is never silent either, and a step that advances with its debt declared is honest in a way that a
> step advancing while it looks complete is not.
>
> And walk the screens yourself, which is a different thing from the execution a person owes and
> never a replacement for it: you walk to find defects, a person executes to accept. Go through
> every screen the system has as a person would -- open it, look at what is on it, use it, and
> follow the flow from one screen to the next -- and write `docs/SCREEN_WALKTHROUGH.md` with
> `screens_total`, how many screens the system has; `screens_walked`, how many of them you actually
> walked; and `walkthrough_findings`, how many defects the walk found. A screen you could not reach
> is counted in the total and named with its reason: taking it out of the denominator so that the
> figure reads better is the one thing this file must never do. For every defect: the screen, what
> you saw, what you expected instead, and the pending item you opened for it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> 利用者が見るものや行うことを変えるすべての保留項目は、その受け入れ基準から導いた手動テス
> トケースを `docs/MANUAL_TESTS.md` に書いた状態で閉じます：その保留項目が触れるフローごと
> に一つのケース。識別子、保留項目、前提条件、番号付きの手順（人が何をし、何が見えなければ
> ならないか）、人が道具なしで検証できるバックエンドでの効果を含む期待される結果、使うテス
> トデータ、そして空の実行の表（日付、誰、通ったか失敗したか、所見）とともに。システムがど
> う作られているかを知らない人に向けて書いてください。閉じた保留項目のケースは最新に保って
> ください：フローが変わったら、そのケースも同じコミットで変わります。ケースを実行済みと自
> 分で印すことは決してしないでください：実行は人のものです。
>
> 各手動ケースは、影響を受けるプロファイルごとに一度ずつ実行します。手で書くのではなく
>  `docs/PROFILE_MATRIX.md` から導出してください。一つのプロ
> ファイルだけで実行したケースは、実行済みのケースではありません（付録H、アンカー4）。
> 各ブロックの締めくくりに、機械が置き換えられない二つの人による確認を加えてください：
> 最初のクリックの確認（私がその作業を探す場所を一つ挙げ、あなたがそれをメニューと照ら
> す）と、テスト環境の実際のスクリーンショットです。
>
> `docs/MANUAL_TESTS.md` はその冒頭に、ゲートが読む三つの宣言を、それぞれ固定のキーで英語で
> 載せます。ファイルが私の言語であってもです。この段が負っていることと、この段が証明できる
> ことは同じでないからです。`cases_written`：書かれているケースがいくつか。
> `cases_executed_by_a_person`：そのうち、人が実行表に日付と名前を入れて署名したのがいくつか。
> 最初の数字はあなたが維持し、二つ目の数字は人が実行したときにのみ動きます——あなた自身の
> 読みからは決して動きません。`execution_debt`：二つの数字が同じときは `none`、そうでなければ
> `pending_verifier` とし、まだ誰も実行していないケースを、その実行を誰がいつから負っているかと
> ともに。この負債はそれ自身がゲートなのではありません。この段があなたに求めるのは宣言であり、
> ゼロより大きい数字ではありません。方法は人に実行を強制できないからです。しかし決して沈黙した
> ままでもありません。負債を宣言して進む段は、完全に見えながら進む段とは違って、誠実です。
>
> そして、画面をあなた自身で歩いてください。これは人に負っている実行とは別のことであり、
> その代わりには決してなりません。あなたは欠陥を見つけるために歩き、人は受け入れるために
> 実行します。システムにあるすべての画面を、人がするように通ってください——開いて、上に何が
> あるかを見て、使って、ある画面から次の画面への流れをたどって——そして
> `docs/SCREEN_WALKTHROUGH.md` に、`screens_total`（システムに画面がいくつあるか）、
> `screens_walked`（そのうち実際に歩いたのはいくつか）、`walkthrough_findings`（歩いて
> 見つけた欠陥はいくつか）を書いてください。入れなかった画面も総数に数え、その理由を
> 名指します。数字の見えをよくするために分母から外すことが、このファイルが決してしては
> いけないただ一つのことです。欠陥ごとに：画面、見たもの、代わりに期待していたもの、そして
> そのために開いた保留項目。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：ケースが受け入れ基準から出ること（そうすればモデルが理解したことではなく、
依頼されたことを検証する）。システムがどう動くかを知らない誰かに向けて書かれていること。それ
がテストケースと技術メモの違いだ。人が検証できるバックエンドでの効果を含むこと。手動テストも
画面の向こう側を見るように。ケースが文書と同じく同じコミットで保守されること。そして**モデル
が決してそれを実行しないこと**。モデルが実行したならそれはもう一つのテストにすぎず、肝心なの
は人が実行することだからだ。

そして D-082 が加えること：エージェントが**自分で画面を歩くこと**。それがインタフェースの欠陥を
もっとも多く見つけるものであり、方法が求めていなかったものです。そして、ケースのファイルがその
冒頭に、書かれたものと実行されたものの差を載せること。負債とともに進む段が、**それを言いながら**
進むためです。歩きは人の実行を置き換えません。短くします。エージェントが見れば気づけた欠陥に、
人がもう出会わなくなるからです。

**ある実行のために（ブロックの締め、受け入れ、デプロイの後）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- 実行が済んでいること：人が `docs/MANUAL_TESTS.md` のケースをテスト環境で（またはデプロイの
  後なら本番で、読み取り専用で）追い、各ケースの表に日付、誰、通ったか失敗したか、所見を書き
  留めたこと。これは人が、手で、プロンプトを貼る前に行います。エージェントは行いません。
- どのケースにも収まらない単独の所見（煩わしかったもの、理解できなかったもの）を、ファイルの
  最後に日付とともに書き留めたもの。
- 最低限受け入れられる状態：範囲のすべてのケースに今日の結果があること。たとえ「実行できなか
  った」とその理由であっても。

> Read the executions of today in `docs/MANUAL_TESTS.md`. For every case that failed, and for
> every loose observation at the end of the file, open a corrective pending item in
> `docs/PENDING.md` with the person's words as the way to reproduce it, hanging from the node of
> the semantic tree it touches; do not fix anything now. For every case that passed, nothing. Then
> tell me, flow by flow, how many cases passed and how many failed, compared with the previous
> execution, and which failures repeat. If a case could not be executed, tell me why and whether
> the case or the system is the problem.
>
> Then refresh the three declarations at the head of the file: `cases_written`,
> `cases_executed_by_a_person` counted from the signed execution tables and from nothing else, and
> `execution_debt` with who still owes which execution and since when.
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
> `docs/MANUAL_TESTS.md` の今日の実行を読んでください。失敗した各ケースと、ファイルの最後
> にある各単独の所見について、`docs/PENDING.md` に修正の保留項目を開いてください。再現の
> 仕方としてその人の言葉を使い、それが触れるセマンティックツリーのノードにぶら下げて。今は
> 何も直さないでください。通った各ケースについては、何もしません。そのあと、フローごとに、
> 前回の実行と比べて、いくつのケースが通りいくつが失敗したか、そしてどの失敗が繰り返されて
> いるかを教えてください。あるケースが実行できなかったなら、なぜか、そして問題はケースなの
> かシステムなのかを教えてください。
>
> そのあと、ファイルの冒頭の三つの宣言を更新してください：`cases_written`、
> 署名された実行表からだけ数えた `cases_executed_by_a_person`、そして、誰がどの実行を
> いつから負ったままなのかを書いた `execution_debt`。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：再注入を運用可能にすること。人の各失敗が修正の保留項目になり、再現として
（モデルの言葉ではなく）人の言葉を持ち、ツリーにぶら下がること。前回の実行との比較。ブロック
の間にシステムが良くなっているか劣化しているかを教えてくれるものだ。そして「ケースの書き方が
悪い」と「システムが悪い」の区別。これは二つの別の保留項目だ。

## 3. 期待される成果物

- `docs/MANUAL_TESTS.md`：閉じた各保留項目が触れたフローごとに一つのケース、その書式で、人に
  向けて書かれたもの。
- 記録された実行、日付と誰付きで、各サイクルで。
- 各失敗と各所見につき一つの修正の保留項目。
- 約束の中のルーチン。
- `docs/SCREEN_WALKTHROUGH.md` にエージェントの歩き：`screens_total`、`screens_walked`、
  `walkthrough_findings`。そして各欠陥に、その画面、見たもの、期待したもの、その保留項目。
- `docs/MANUAL_TESTS.md` の冒頭に、ゲートが読む三つの宣言：`cases_written`、署名された実行だけが
  動かす `cases_executed_by_a_person`、そして `none` か `pending_verifier` の `execution_debt`
  を、誰がどの実行をいつから負っているかとともに。

## 4. 完全性の検証（あなたが行う、コードを読まずに）

- ケースを一つ無作為に取り、エージェントに何も聞かずにテスト環境で自分で追ってみること：でき
  ましたか。聞かなければならなかったなら、そのケースは人に向けて書かれていません。
- 画面に触れる閉じた保留項目はそれぞれケースを持っているか。ケースのない保留項目のリストを求
  めること。
- ケースは画面の向こう側でどの効果を検証するか、そして人がそれをどう検証するかを言っているか。
- 最後の実行は各ケースに日付と名前を持っているか。日付のない「通った」はあるか。
- 最後の実行の各失敗はその保留項目を、人の言葉とともに持っているか。
- `cases_executed_by_a_person` は、エージェントの読みではなく署名された表から出ていますか。
  実行済みと数えられたケースを一つ取って、その表に日付と名前があるか探してください。
- 負債があるなら、`execution_debt` は誰がいつから負っているかを言っていますか。名前のない負債は
  負債ではなく、書式のついた忘れものです。
- 歩きは、開けなかった画面を総数の中に、その理由とともに数えていますか。エージェントが持たない
  プロファイルの裏に画面がある系で `screens_walked` が総数と同じなら、それは作られた数字です。
- 歩きの欠陥には、人の失敗と同じように、その保留項目がありますか。

## 5. 警告サイン

- エージェントがケースを実行済みと印した。彼が実行したのであり、それは実行しなかったのと同じ
  だ。
- ケースが自動テストを散文に写しただけのもの。手動のケースはテストが見ないものを見なければな
  らない：何が見えるか、何が理解できるか、何が煩わしいか。
- すべての実行ですべてのケースが通る。人は常に何かを見つける。何も見つけないなら、台本に従っ
  ていないか、台本が見ることを求めていない。
- 失敗がその場で、保留項目なしに「直される」。人の言葉と、何が繰り返されたかの痕跡が失われる。
- 段は達成と出ているのに、`cases_executed_by_a_person` がゼロ。これは誤りではありません。負債
  であり、達成と読まれないために、わざわざ目に見えるところに置かれています。
- エージェントの歩きが何も見つけず、しかもシステムには新しい画面がある。歩くことは開くことでは
  ありません。発見がないなら、画面を見ただけで使っていない可能性が高いです。
- 歩きが、ケースを実行しないための口実に使われはじめる。二つの目的を持つ二つのことであり、
  受け入れるほうは人のものです。
