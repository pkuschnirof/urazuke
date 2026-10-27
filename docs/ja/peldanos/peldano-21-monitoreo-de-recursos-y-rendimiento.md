# ステップ 21 — 資源、関数、クエリの範囲外の監視、周期報告とともに（段の契約）

**区間：** 運用。
**いつ：** 運用のフェーズで、本番への最初のデプロイとともに、第19段の閾値と第16段の指標と
ともに組み立てる。それ以降は独りで走り、周期報告はサイクルごとにオーナーと読む（帰結のあるシ
ステムでは週次、小さいものでは月次）。範囲外の各イベントは修正の保留項目としてループに入る。
レガシーでも同じだが、違いが一つ：報告の最初の読みが基準線であり、初日に既に範囲外だったもの
は速度の印とともに保留項目になる。
**形式：** 組み立てるのに一回の送信。その後は周期的なルーチン。
**規模：** 小さいプロジェクトでは最低限（月次の報告、ディスクの警報一つとデータベースのエ
ラーの警報一つ）。帰結のあるプロジェクトでは完全版（関数ごと、クエリごとの閾値、警報、週次の
報告）。

## 何のためか

第19段のテストは、私が選んだ負荷で、ある一日にシステムがどうふるまうかを言う。本番は毎日であ
り、利用者が選ぶ負荷で、データは増え続け、変更は毎週入る。十月に範囲内だったものが、誰も何も
変えていないのに、テーブルが育っただけで三月には範囲外になる。この段は、それが**利用者が見る
前に**見えるために存在する：容量に対する資源の使用、各関数、各エンドポイント、各ジョブ、各ク
エリの応答時間を、第19段の閾値と、そしてそれ自身の歴史と比べる。何かが範囲外に出たときの警
報。そして私がオーナーと読む周期報告、そこでは各逸脱に原因か保留項目がある。計測値に締められ
た天井 [Ref. 37](../REFERENCIAS.md#ref-37) が根底にある考えだ：範囲は意見ではなく、計測された数
字に余裕を足したものだ。そして誰も見ないまま燃え尽きた継続的インテグレーションのクォータ
[Ref. 39](../REFERENCIAS.md#ref-39) が、この段が防ぐ失敗だ：監視なしに消費される資源は、尽きた
ときに発見される。

交渉しない二つのルール。発報しても誰も読まない警報は、読まなかった人の欠陥ではなく警報の欠陥
だ：調整するか、取り除く。そして閾値は、警報を黙らせるために、計測された書かれた理由なしに上
げてはならない。

**初心者の方へ。** *監視する*とは、システムをいつも機械で見て、何かが普通から外れたら知らせ
ることです。*資源*とはシステムが消費するもののことです：プロセッサ、メモリ、ディスク、データ
ベースへの接続、そして外部サービスのクォータ（提供者が月に何通のメッセージを送らせてくれる
か）も。「*範囲外*」とは、*閾値*（第19段のテストから出た固定の限界）を超えているか、*基準線*
（その同じ数字がここ数日出していた値）と大きく違うという意味です。*警報*はその場での知らせ。
*周期報告*は毎週か毎月、落ち着いて読む要約です。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 可観測性（16）：それが食べる指標と記録。
- 第19段の閾値と第17段の予算。
- デプロイされた本番（15）、監視のための読み取り専用アクセス付きで。
- 警報の経路と報告のサイクル：あなたがオーナーと決める。

## 2. プロンプト

**最初（組み立てて実証する）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- `docs/OBSERVABILITY.md`（16）と `docs/PERFORMANCE.md`（19）、締められたもの：指標と閾値。
- `docs/PERSISTENCE.md`（17）、経路ごとの予算とともに。
- オーナーと決めた警報の経路：誰に届くか、何で（メール、メッセージング）、そして誰が何時に読
  むか。誰も開かない受信箱に届く警報は飾りです。
- 報告のサイクル：週次か月次か、そして誰があなたと一緒に読むか。
- 監視の本番への読み取り専用アクセス（サーバー、データベース、記録）、認証情報はチャットの外
  に。
- 基準線に対する何パーセントの逸脱を警報と見なすか（たとえば直近十四日の平均より30%多い）、
  プロンプトの空欄のために。
- 最低限受け入れられる状態：書かれた閾値があり、それを読む人のいる経路があり、サイクルがある
  こと。

> We are going to keep this system watched in production. Using the metrics and logs of step 16, the
> budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the correlation
> id, kept with a history; (2) alerts when any of them is out of range: above the thresholds, or
> more than [X] percent over the baseline of the last [N] days, sent to [channel], with the rule
> that an alert that fires without a human reading it is a defect of the alert and gets fixed or
> removed; (3) a cyclic report, [weekly], generated automatically, with: resource usage against
> capacity and its trend, the slowest functions and queries and how they moved against the previous
> period, every out-of-range event with its cause if known, and what you propose for each; (4) the
> rule that every out-of-range event becomes a corrective pending item with the measured number as
> its acceptance criterion, closed with the full routine. Nothing here may read or store personal
> data. Show me the first report generated on real data from the test environment, and one alert
> fired on purpose by exceeding a threshold. The row counts that revalidate the sizing carry their
> own verifiable window: the first and the last timestamp read from the database or the log, never a
> number typed by hand; a window typed by hand is marked as such in the report and only warns, it
> never opens a pending item on its own. Document the thresholds, the channel, the cycle and how to
> silence an alert with a written reason in `docs/MONITORING.md`.
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
> このシステムを本番で見張り続けます。第16段の指標と記録、`docs/PERSISTENCE.md` の予算、
> `docs/PERFORMANCE.md` の閾値を使って、次を組み立ててください：(1) 資源の使用（CPU、メモ
> リ、ディスク、データベースへの接続、キューの大きさ、外部のクォータ）と、各関数、エンドポイ
> ント、ジョブ、クエリの応答時間の収集。相関識別子とともに、歴史を保って。(2) そのいずれかが
> 範囲外に出たときの警報：閾値を超えたとき、または直近[N]日の基準線より[X]パーセント以上多い
> とき。[経路]へ送り、人が読まないまま発報する警報は警報の欠陥であり直すか取り除くというルー
> ルとともに。(3) 周期報告、[週次]、自動で生成され、次を含むもの：容量に対する資源の使用とそ
> の傾向、最も遅い関数とクエリ、そしてそれらが前の期間に対してどう動いたか、範囲外の各イベン
> トとわかっていればその原因、そしてそれぞれについてあなたが提案すること。(4) 範囲外の各イベ
> ントが、計測された数字を受け入れ基準とする修正の保留項目になり、完全なルーチンで閉じられる
> というルール。ここでは何一つ個人データを読んだり保存したりしてはいけません。テスト環境の実
> データで生成した最初の報告と、閾値をわざと超えて発報させた警報を一つ見せてください。サイジ
> ングを再検証する行数には、検証可能な期間を必ず添えます。データベースかログから読んだ最初と
> 最後のタイムスタンプであって、手で入力した数字ではありません。手入力の期間はレポートにそう
> 明記し、警告するだけで、それ自体では保留項目を開きません。閾値、経路、サイクル、そして書か
> れた理由とともに警報を黙らせる方法を `docs/MONITORING.md` に文書化してください。私の言語で
> 答えてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

**測定の期間。** 周期レポートは、年あたりの観測行数を段 3 で宣言した値と比べます。正しい数でも期間が間違っていれば、偽の保留項目を開きます。引き継いだ Turnera の練習では、3 年分の 30,000 行が 1 年分として渡されました。だから測定には**検証可能な**期間を添えます。データベースかログから読んだ最初と最後のレコードであって、手で入力した数字ではありません。道具がデータベースを読めなければ、それを盲点として宣言します。手入力の期間はレポートにそう明記し、警告するだけで、それ自体では保留項目を開きません。（決定 D-039。）

何を求めているか：歴史を持つ収集（歴史がなければ基準線はなく、基準線がなければ「範囲外」はな
い）。二つの基準に対する警報、第19段の絶対的な閾値と、自身の歴史に対する相対的な逸脱。第12段
の報告の形をした周期報告（各逸脱に原因か提案を。「すべて正常」はなし）。各逸脱の、数字を伴う
保留項目への変換。そして二つの実証：最初の報告と、引き起こされた警報。

**各サイクルのルーチン（共働の約束に入る）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- 生成されたばかりの周期報告と、それをオーナーと読むためのあなたのひととき。
- 閾値を比べるために手元に置く `docs/MONITORING.md`。
- 最低限受け入れられる状態：プロンプトを貼る前にあなたが報告を読んだこと。エージェントがあな
  たの代わりに読むのではありません。

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> 資源と性能の周期報告のたびに：私と一緒に、イベントごとに見ていってください。どの範囲外のイ
> ベントが今保留項目になり、どれが待てるかを、あなたの理由とともに言ってください。決定を日付
> とともに報告そのものに書いてください。そしてどれかの閾値を変えなければならないか、なぜか、
> それを正当化する計測とともに言ってください。計測された理由を書かずに、警報を黙らせるために
> 閾値を上げては決していけません。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：報告が読まれ、跡とともに決定されること。そして閾値のルール。それが監視が少
しずつ沈黙していくのを防ぐものだ。

## 3. 期待される成果物

- 歴史を持つ資源と応答時間の収集、個人データなしで。
- 閾値による警報と逸脱による警報、人が読む経路へ。
- 周期報告、独りで生成され、各逸脱に原因か提案が付いたもの。
- `docs/MONITORING.md`、閾値、経路、サイクル、理由とともに黙らせる方法とともに。
- 約束の中のルーチン。修正の保留項目としての逸脱。

## 4. 完全性の検証

- テストでわざと閾値を超えるよう求めること：合意した経路で、識別子とともに、警報が届きました
  か？
- 最後の報告を読むこと：範囲外の各イベントに原因か提案がありますか？ 何もないまま残ったもの
  がありますか？
- あなたが対応すると決めた逸脱ごとに、数字を基準とする保留項目がありますか？
- 第19段から上がった閾値はありますか？ どんな書かれた理由で？
- 報告は外部サービスのクォータ（メッセージング、継続的インテグレーション）に触れていますか？

## 5. 警告サイン

- 警報が毎日発報して誰も読まない。それぞれが何かを意味するようになるまで数を減らすべきで、慣
  れるべきではない。
- 報告が三サイクル続けて「すべて正常」と言う。システムに利用者がいないか、報告が重要なものを
  見ていないかだ。
- 閾値が「知らせなくなるように」上がった。第21段が静かに死につつある。
- 監視が「診断できるように」個人データを保存している。時間割のある漏洩だ。
