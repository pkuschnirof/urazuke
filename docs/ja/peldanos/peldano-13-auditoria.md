# ステップ 13 — 計画への入力としての定期監査（段の契約）

**区間：** 本番リリース。
**いつ：** 本番への最初のデプロイの前に必須。本番リリース区間を開く。その後、運用中は変更の
ペースに応じて一、二か月ごとに、そして各大きな段階の締めに。
**形式：** 長い一回の送信、理想的には構築するのとは別のエージェントへ。
**規模：** どのプロジェクトでも、本番への最初のデプロイの前に必須。その後は変更のペースに
比例（毎週変わるシステムは毎月監査し、安定したものは六か月ごと）。

## 何のためか

ときどきシステム全体を新鮮な目で見て、見えたものを保留項目に変換すること。監査は保管される
報告ではない。計画だ。誰も見ていなかったコードに書かれたパスワード、テーブル全体を読む
クエリ [Ref. 18](../REFERENCIAS.md#ref-18)、依存関係の既知の脆弱性、数千行のコンポーネント
[Ref. 41](../REFERENCIAS.md#ref-41) を防ぐ。そして品質管理の独立を一歩内側へ持ち込んだもの
だ：監査する者は構築した者ではない。

独立について：別の会社も別のツールも要らない。**構築に参加していない、別の指示ファイルを
持つ別のセッション**で足りる。求めるのは、監査者が構築者の前提を共有しないことだ。モジュール
を構築したモデルは、ハードコードされたパスワードが暫定だったと「知っている」。初めて見る
モデルはそれをそのまま報告する。こうして構築者が一日で残した二つの管理者の扉が検知された
[Ref. 40](../REFERENCIAS.md#ref-40)。

選べるなら、同じモデルの別のセッションではなく、**構築したのとは別のモデル**にしてください。
2026年の研究が、別のモデルによるきれいなセッションは、同じモデルの二つのセッションより多くの
誤りを見つけると測りました（[arXiv 2610.01471](https://arxiv.org/abs/2610.01471)）。ただしこの
好みには**能力の下限**があります。測ったので言います：別のモデルがより多く見つけるのは、
**そのモデルがその仕事をできる場合に限られます**。ある能力を下回ると、多様性は利点であることを
やめて費用に変わります。偽の発見を検証する手間は、自分で探したのとほとんど同じだからです。
だから順序はこうです。まず、**課題の水準に達している別のモデル**。達していないなら、
**同じモデルの別のセッションで、逸脱を報告書の `Auditor:` の行に宣言して**。そして、
どの鍵が読み込まれているか、どの制限時間に耐えるかで選ばれた監査人は**絶対に**だめです。
道具の制限がそれを選んだのなら、報告書はその言葉でそう言います：キー `auditor_choice` の
`tool_constraint` の場合で、これが存在する理由は、道具の制約が技術的な選択に化けること、
そしてそれを裸にする唯一のものが、それを名指さなければならないことだからです。構築した
モデルしか手に入らないのは、方法の失敗ではありません。宣言された逸脱であり、宣言された
逸脱は監査できます。（決定 D-079、2026-11-02 の実験について：別のモデルの監査人は、自ら
予告した九つの発見のうち四つを出し、その唯一の P0 は小数点を読み違えたために偽でした。
同じモデルのほうは、好みから外れることを最初の行で宣言して十七を出し、一つずつ検証しても
偽と判明したものは一つもありませんでした。）

そして、ここに限界があります。偽装するより、言うほうが価値があるからです。**段 13 は端から端まで
機械で検証することはできません。** その仕事は第三者がするので、ゲートは仕事そのものを評価できず、
その**痕跡**だけを評価できます。2026-11-02 に測りました。そして、それは不都合です。自分自身について
「九つの発見を見つけ、四つを書き、この報告書は不完全だ」と文字どおり書いた報告書が**緑**で通って
いました。「完全」はファイルの性質ではなく——報告書が予告するものと引き渡すものとの関係であり——
ファイルを見るゲートにはそれが見えないからです。しかも、監査人にもっと予算を与えても足りません。
その測定では、セッションは**途切れていません**。一ターンと十三万トークンで自分から終わり、
締めの印を自分の判断で出していました。ゲートは、途切れた報告書と放棄された報告書を区別できません。
ゲートができること、そして D-081 以降この方法がゲートに求めることは、あとから数えれば反証できる
ものを報告書に**宣言**させることです。`audit_completeness` の下に完全性を、予告した発見の数と
書いた数とともに。`dimension_grades` の下に各次元の評点を。`receipts_reproduced` の下に、
もう一度走らせた領収書ごとの判定を。そして `not_audited` の下に、監査しなかったものを、その
保留項目とともに。四つのどれも嘘を防ぎません。四つは嘘を、沈黙ではなく、日付と署名のついた、
書かれた具体的な主張に変えます。そして、報告書に書かれた発見を数えて自分の数字と比べることは、
二分で済み、コードを読む必要もありません。それはまさに、この方法があなたに求める種類の検証です。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 完全なリポジトリ、読み取り専用で。
- 本番またはテスト環境、読み取り専用で（データベース、ログ）。
- 前回の監査、あれば、何が変わったか測るため。
- 範囲：整合性、セキュリティ、性能、コード品質、またはすべて。
- `docs/PENDING.md`、直近のサイクルで閉じた保留項目とその領収書とともに。監査人がどれを再現
  するか選べるように。
- 直近の一周期ぶん全部の証拠の記録：機能的なコミット、領収書つきで閉じた保留項目、そして
  変異を伴う保管済みの領収書。前の項目とは別です。あちらでは監査人が再現する領収書を二つか
  三つ選び、こちらでは記録の全体を数えられなければなりません。

## 2. プロンプト

**最初（可能なら構築者とは別のエージェントへ）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- 構築者のものとは別の、エージェントの新しいセッション：別のフォルダへのリポジトリのきれいな
  クローンと、ツールが許すなら「あなたは監査人だ。このシステムを構築していない」とだけ書いた
  別の指示ファイル。これがないと、監査人は構築者の仮定を共有し、それを追認します。
- そのセッションのための、テスト環境か本番への読み取り専用のアクセス：データベース、ログ。読
  み取り専用の資格情報で、リポジトリの外に、変数の名前はチャットで伝えて。
- あなたが決めた範囲、空欄 [scope] のために：整合性、セキュリティ、性能、コードの品質、また
  はそのすべて。
- 前回の監査、あれば（前回の `docs/AUDIT_[日付]`）。何が変わったかを測れるように。
- 誰が監査するか、そしてなぜそれなのか。あなたが決めます：課題の水準に達しているなら別の
  モデル、達していないなら同じモデルの別のセッション、そして、たまたま読み込まれていた鍵
  だったから、あるいは制限時間に耐える唯一のものだったから残った、というものは決して選び
  ません。プロンプトは報告書でそれを宣言するよう求めますが、決定はあなたのものです。
  あなたが決めなければ、道具が決めます。
- 最低限受け入れられる状態：監査人のセッションが構築者のものではないこと、そして読み取り専用
  であること。

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> Four more declarations, about this report and not about the system, because a gate can read the
> trace of the work and cannot read the work. `audit_completeness`: `complete` when you wrote down
> every finding you found, and next to it `findings_announced` and `findings_written` with their
> figures. Those two figures have to be the same figure: if you announce nine findings and write
> four, this report is not complete and this step does not close with it -- so do not announce a
> count you are not going to write, and do not stop halfway and emit your closing marker as if you
> had finished. `dimension_grades`: the grade of every dimension you audited, each one with the name
> of its dimension next to it. `receipts_reproduced`: for every receipt you reran, `reproduces` or
> `does_not_reproduce`, with the command and its output; at least one, and a receipt you only read
> is not one of them. `not_audited`: `none` when you audited everything in the scope, or
> `with_pending` and then, part by part, what you did not audit, why, and the pending item that is
> open for it. A part named as not audited and left without its own pending item leaves this report
> open; an audit with a smaller scope declared up front is worth more than a wide one with holes.
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
> このシステムを[範囲]について監査してください。読み取り専用：`docs/AUDIT_[日付].md` に
> 報告を書く以外は何も変えないでください。ある部分の監査にあなたが持っていないアクセス
> （データベース、ログ、環境）が必要なら、私に教えてその部分を未監査と印してください。問題
> なしとして通さないでください。サンプルではなくすべてのコードを調べてください。直近のサイ
> クルで閉じた保留項目を二つか三つ選び、その領収書を文字通り再現してください：引用されている
> 正確な赤から緑へのコマンドを、名指しされているコミットに対してもう一度走らせ、それぞれが
> 再現するかどうかを教えてください。読んだだけの領収書は、監査した領収書ではありません。各発
> 見について：どこにあるか（ファイルと行）、リスクは何か、どの証拠がそれを証明するか（コマンド、
> クエリ、数字）、そして優先度：P0は今すぐ修正、P1は近いうちに、P2は可能なときに。監査した
> 各次元に評点を付けてください。P0の発見を提案保留項目に変換したリストで終えてください。
>
> この報告書は、ゲートが読む宣言をそれぞれ固定のキーで載せます。報告が私の言語でも、キーは
> 英語で書いてください。`auditor_choice`：どの場合に当たるか、誰が決めたか——
> `different_model` はあなたがこのシステムを構築したのとは別のモデルである場合、
> `same_model_declared` は他のどのモデルも仕事に見合わなかったためあなたが同じモデルである
> 場合、`tool_constraint` はあなたを選んだのが、たまたま読み込まれていた鍵、タイムアウト、
> その他の道具の制限である場合で、そのときはその言葉で言ってください。`Auditor:` の行には、
> 構築したモデルと監査するモデルを書いてください。`evidence_register_health`：証拠の記録の
> 健全性。これはこの監査の一つの次元であり、任意ではありません——機能的なコミットのうち
> 領収書を一つも持たないものはいくつか、納品として閉じた保留項目のうち領収書が欠けている
> ものはいくつで、そのうち理由が書かれているものはいくつか、そして変異を伴う領収書のうち、
> もう一度適用できるものはいくつか。それぞれの数字はプログラムで測り、隣にコマンドを置き、
> 測れなかった数字は未測定として宣言し、決してゼロとしないでください。証拠の記録が壊れて
> いれば、この報告書の他のすべての発見は、誰も再現できないデータの上に立っています。
> `findings_by_destination`：各発見を一つの行き先に割り当ててください——欠陥が監査対象の
> システムにあるなら `product`、従っている方法にあるなら `method`、それを走らせる道具に
> あるなら `tool`——そして、その保留項目が入る記録とともに。行き先を誰も割り当てていない
> 発見は、この監査を開いたままにします。
>
> さらに四つの宣言を、システムについてではなくこの報告書について書いてください。ゲートは
> 仕事の痕跕を読めますが、仕事そのものは読めないからです。`audit_completeness`：見つけた
> 発見をすべて書き切ったときに `complete`、そしてその隣に `findings_announced` と
> `findings_written` をそれぞれの数字とともに。この二つの数字は同じ数字でなければなりません。
> 九つの発見を予告して四つしか書かないなら、この報告書は完全ではなく、この段はそれでは
> 閉じません——ですから、書くつもりのない数を予告しないでください。そして途中で止めて、
> 終えたかのように締めの印を出さないでください。`dimension_grades`：监査した各次元の評点を、
> それぞれの次元の名前を隣に添えて。`receipts_reproduced`：もう一度走らせた領収書ごとに、
> `reproduces` か `does_not_reproduce` を、コマンドとその出力とともに。少なくとも一つ。
> 読んだだけの領収書はそのうちに入りません。`not_audited`：範囲のすべてを监査したときは
> `none`、そうでなければ `with_pending` とし、部分ごとに、何を监査しなかったか、なぜか、
> そのために開いている保留項目を書いてください。未监査と名指しておきながら自分の保留項目を
> 持たない部分は、この報告書を開いたままにします。最初から小さい範囲を宣言した监査のほうが、
> 穴のある広い监査より価値があります。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか、条項ごとに：読み取り専用（監査者は直さない。提案する）。監査に合わせた
形の完全性の条項：**検証できなかったものは宣言され、省略によって承認されない**。サンプル
ではなくすべてのコード、重大な発見はたいてい誰も見ない場所にあるから。**二つか三つの領収書
の文字通りの再現**。監査が証拠を読むだけでなく検証するように（これがD-033の穴を塞ぐ条項で
す：語られた赤は監査された赤ではありません）。各発見に位置、リスク、証拠、優先度、報告を読
み直さずに行動できるように。次元ごとの評点、前回の監査と比べるため。そしてP0は既に提案保留
項目に変換されて。

そして十一月の二つの決定が加えるもの。どちらも監査人の文章づかいだけでなく仕事そのものを
変えるので、分けて言います。**固定のキーによる三つの宣言**は、「完全」と「監査済み」が、
自由な散文で書かれた報告書から読み取れる性質ではないからです（D-079 と D-080）。
**証拠の記録の健全性**を必須の次元にしたのは、それが他のすべてを監査する唯一の次元だから
です——証拠の記録が壊れていれば、報告書の他のすべての発見は誰も再現できないデータの上に
立ち、報告書全体がその評点より安くなります——。そして**各発見の行き先**は、方法の欠陥を
製品の記録に書くことが、誰も直さない欠陥になるからです。製品の持ち主は方法を直せず、
直せる人はそれを知らされなかったのです。

**締め（構築者へ）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- `docs/AUDIT_[日付].md`、あなたが読んだもの。そして無作為に選んだ二つの発見を監査人と検証し
  たこと（コマンドを、行を見せてもらってください。見せられるはずです）。
- 構築者のセッションが開いていること：このプロンプトは監査人ではなく構築者に送ります。空欄に
  はファイルの日付を入れて。
- 最低限受け入れられる状態：報告書を読み、P0とP1がいくつあるかを知っていて、開かれる保留項目
  の数を数えるつもりでいること。

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> `docs/AUDIT_[日付].md` を読んでください。各P0とP1について、発見を引用した保留項目を一つ
> 開いてください。どれかに同意しないなら、反証とともに私に教えてください。無視しないで
> ください。
>
> それぞれを、報告書が割り当てた行き先の記録に開いてください：`product` は製品の記録、
> `method` と `tool` は方法の記録または道具の記録で、決して製品の記録ではありません。
> 行き先のない発見が来たら、何も開く前に私に聞いてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：監査が保留項目に変わること（さもなければ保管される報告だ）、そして不同意
は黙ってではなく明示的に証拠付きで。

そして D-080 以降は、各保留項目をその行き先の記録に開くこと。構築する側は製品に手を
入れている側なので、いちばん簡単にすべてを製品の記録に送ってしまいます。行き先なしで
届いた発見は、何も開く前にあなたに尋ねます。

## 3. 期待される成果物

- `docs/AUDIT_[日付].md`、内容：範囲、検証できたものとできなかったもの（とその理由）、位置・
  リスク・証拠・優先度付きの発見、次元ごとの評点、直近のサイクルの領収書を二つか三つ再現した
  結果、提案保留項目のリスト。
- `docs/PENDING.md` に：各P0とP1につき一つの保留項目、発見を引用して。
- その同じ報告書に、ゲートが読める三つの宣言を、キーは英語で：`auditor_choice`（どの場合に
  当たるか、誰が決めたか）、`evidence_register_health`（証拠の記録の数字。それぞれを測った
  コマンドつきで、測れなかったときは「未測定」）、`findings_by_destination`（各発見とその
  行き先）。
- 各行き先の記録に：P0とP1ごとに保留項目を一つ。製品のものは製品の記録に、方法のものは
  方法の記録に、道具のものは道具の記録に。
- その同じ報告書に、D-081 が前の三つに加える四つの宣言：`audit_completeness` が `complete`
  であり、`findings_announced` と `findings_written` が同じ数字であること。`dimension_grades`
  に監査した各次元の評点。`receipts_reproduced` にもう一度走らせた各領収書の判定。そして
  `not_audited` が `none` か `with_pending` であり、後者なら、外に残った各部分の開いている
  保留項目。

## 4. 完全性の検証

- 報告は何を検証**できなかった**かを言っているか？ すべて検証したと言うなら、疑うこと。
- 発見を二つ選ぶこと：ファイルと行、そしてあなたが再現できる証拠があるか？
- 報告はどの領収書を再現したか、コマンドと結果とともに言っているか、それとも読んだとだけ
  言っているか？
- 監査を閉じたとする前に、各P0に開かれた保留項目があるか？
- 次元ごとの評点は前回の監査と比べられるか？
- 構築したのと同じエージェントが監査したか？ そうなら、P0について二つ目の目を求めること。
- 報告書は、誰が監査したか、なぜそれなのかを言っていますか。理由が、読み込まれていた唯一の
  ものだった、制限時間に耐える唯一のものだった、であれば、それは `tool_constraint` であり、
  そう書かれていなければなりません。
- 証拠の記録の健全性の数字は、それぞれを測ったコマンドつきでありますか。測れなかった数字は
  「未測定」と言います。「一つもない」と「見られなかった」を区別しないゼロは数字では
  ありません（CQ-19、分母）。
- 各発見に行き先があり、その保留項目はその行き先の記録に開かれましたか。
- `findings_announced` と `findings_written` は同じ数字を言っていますか。書かれた発見を手で
  数えて、宣言された数字と比べてください。宣言を反証する唯一の方法であり、この段でもっとも
  安い検証です。
- 報告書が未監査と名指した各部分に、その保留項目が開いていますか。宣言されて保留項目のない
  部分は、誰も永遠に監査しない部分です。
- 判定のついた領収書が少なくとも一つありますか——`reproduces` か `does_not_reproduce` を、
  コマンドと出力を貼って。読んだだけの領収書には判定がありません。

## 5. 警告サイン

- 監査がP0を一つも見つけなかった。三か月以上のシステムでは、ほとんどの場合真実ではない。
  範囲が小さかったか、監査者が前提を共有していた可能性の方が高い。
- 発見にファイルの行がない。意見であって発見ではない。
- 報告が、領収書は「確認した」とだけ言い、実行したコマンドもその出力も示していない。読んだ
  領収書と再現した領収書は同じではなく、後者だけがD-033の異論を閉じます。
- 二週間が過ぎてP0にまだ保留項目がない。監査は保管された。
- 報告書が監査人の独立性をほめていて、`auditor_choice` のどの場合に当たるかを言っていない。
  監査人をあなたではなく道具が選んだときこそ、誰も自分からは書かない場合です。
- 証拠の記録の健全性がゼロで、コマンドなしで返ってくる。それを生んだコマンドのないゼロは、
  良い知らせに化けた「見られなかった」です。
- すべての発見が行き先 `product` で出てきた。方法と道具を使って系を見る統制で、どれも方法の
  ものでも道具のものでもないというのはありそうにありません。もっとありそうなのは、誰も
  行き先を問わなかったということです。
- 報告書が `audit_completeness: complete` と宣言しているのに、書かれた発見の数が合わない。
  二分で反証できる唯一の宣言であり、だからこそ毎回やる価値があります。
- 報告書が申し分のない締めの一文で終わっているのに、未監査と印をつけた部分に戻ってこなかった。
  場所が足りなくなった監査人も、締めの印は同じように出します。終わった報告書と放棄された
  報告書を分けるのは終わり方ではなく、`not_audited` です。
