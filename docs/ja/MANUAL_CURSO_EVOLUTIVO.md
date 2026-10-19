# Urazuke — コース、パート2：受け継いだプロジェクト。方法で生まれなかったシステムを正常化し、それから進化させる

著者：Pablo Kuschniroff、Claude Codeの支援による。第1版、2026年10月18日。これは
[コースのマニュアル](MANUAL_CURSO.md)の第二部だ：あなたが第一部をやったこと、少なくとも
レッスン0から7を読んだことを前提にしている。ここでは保留項目とは何か、赤のテストとは何か、
セマンティックツリーとは何かを改めて説明しないからだ。このパートの方法は
[進化・修正の道](EVOLUTIVO_CORRECTIVO.md)のページにある。ここにあるのは実践で、二つ目の
ガイドプロジェクトとともに。見慣れない言葉は主文書の用語集に、実際の事例は
[参照文書](REFERENCIAS.md)にある。公開リポジトリ：
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 始める前に

### このパートは誰のためか

第一部をやって、現実には空のフォルダを渡されることなどほとんどないと気づいた人のため。
渡されるのは既に動いているシステムで、それに依存するユーザーがいて、「これを直して」か
「あれを足して」と言われる。そして数か月前に何かを「バイブコーディング」して、動いて、今は
崩れないようにその上に構築を続けなければならない人のためでもある。二人は同じ場所にいる：
レガシーとともに。たとえ片方はそれを自分で書いたのだとしても。

### 最後に何を手にするか

受け継いだのと同じシステムが、以前と同じことをしていて、しかし周りに方法が前提とする
すべてを備えている：レガシーのルールを備えた共働の約束。各主張がどこから出たかの印とともに
復元されたシステムの地図。コードがすることと業務が信じていることのあいだの食い違いの一覧。
速度の印付きでバックログに変わった監査。匿名化されたデータを持つテスト環境。繰り返せる
デプロイ。コードの外に出してローテーションした秘密。重要なフローを見張る特性化テスト群。
既に世界へ作用しているものの上の錠。計測された数字によるサイジング。そして負債と顧客の依頼が
モジュールごとに対になって同居するバックログ。その後に、赤のテストとともに修正された最初の
バグと、完全な方法で構築された最初の新しい機能。

### このパートのカレンダー

| 週 | レッスン | ほかに何をするか |
|---|---|---|
| 1 | N0、N1、N2、N3 | **読み取り。** 何も変えない。復元されたツリーをオーナーと辿り、食い違いを一つずつ決め、監査を読む。締めに：地図と負債の棚卸し。 |
| 2 | N4、N5 | **安全ベルト。** 匿名化されたデータを持つテスト環境、二度のデプロイ、ローテーションした秘密、ミューテーションによる赤付きの特性化テスト群。既に作用しているものの上の錠を確認。締めに：システムがテスト環境で動き、テスト群が緑。 |
| 3 | N6、N7、R1 | **測る、順序を付ける、直す。** 計測したサイジング。二つの印を持つバックログ。最初のブロック：既知のバグを、対のものとともに修正モードで閉じる。 |
| 4 | R2 | **進化させる。** 二つ目のブロック：新しい機能を、完全な方法で（第一部のレッスン5から10）、特性化を回帰として構築する。 |
| 5と6 | 第一部の11、12、13、14、16、17、18、19 | **本番リリース。** 定期監査、残りの錠、本番への道の締め、三つのマニュアル（レガシーにはなかった）、そしてデプロイ前の運用品質の四つの段：完全な可観測性、N6が計測したものによる永続化、ゲートとしての脆弱性の走査、破断点を伴う負荷テスト。 |
| 7 | 第一部の15、20、21 | **運用。** デプロイの週に組み立てる二つの監視、最初の読みをレガシーの基準線として。常駐エージェント。レガシー固有の質問を伴う振り返り：正常化にいくらかかったか。 |

### ガイドプロジェクト：「受け継いだTurnera」

第一部と同じ診療所の、二年後、別の時間軸だ：彼らはTurneraを方法で作ることが決してなかった。
その代わりに、責任者の甥が一夏で「Turnos」というウェブアプリケーションを作り、それ以来
動いている。今日、二人の受付係と三人の専門職が毎日使っていて、約二万件の予約が入っていて、
それを丸ごと理解している人は誰もいない：甥は外国に住むようになり、二週間に一度メッセージを
返す。

**あるもの。** コードの入ったGitHubのリポジトリ（ブランチは一つ、コミットのメッセージは
「修正」など）、アプリケーションが動くのと同じサーバーの上のデータベース、FTPでファイルを
コピーする手でのデプロイ、コードに書かれたデータベースのパスワード、テストはゼロ、毎晩
リマインダーを送るサーバーの定期処理、そして責任者がデスクトップのツールでデータベースに
つないで毎月落とす表計算。誰も復元したことのない「自動」のバックアップがある。

**痛むもの。** 二つ。一つ目はバグだ：患者が時々リマインダーを二度受け取り、時々一度も受け
取らない。責任者はいつ起きるか分からないが、苦情を言う患者のスクリーンショットを持っている。
二つ目は足りないものだ：ある種の予約について支払いリンクで手付金を求めたいし、表計算を
落とさずに今月の予約数、欠席数、キャンセル数を見たい。

**オーナー。** 同じ責任者：事業についての判断力があり、一日十五分、コードは読まない。そして
重要な新しい点が一つ：彼女はシステムがしないことをすると信じていて、システムが実際にして
いることを知らない。レガシーではそれが普通であり、それこそレッスンN2が明るみに出すものだ。

**重要なフロー**、彼女の言葉で：「予約を登録する」「予約をキャンセルする」「リマインダーが
届く」「患者を探す」「今月の表計算を落とす」。五つあり、それが特性化テスト群になる。

これで足りる。ほかのすべてはシステムの中にあり、それを読むのはエージェントだ。

---

## 正常化の区間：レッスンN0からN7

この八つのレッスンが、第一部になかった区間だ。最初の四つは読み取りのためのもの：何も変え
ないし、何かを変えたい誘惑は巨大になる。次の二つが安全ベルトを組む。最後の二つが測って順序を
付ける。機能に触れるのはその後だ。

### レッスン N0 — 既存システムの適格性

**理解すべきこと。** 二つの排除基準はレッスン0と同じだが、ここではX2（プログラムから操作
できる画面）に画面ごとに答え、どれかが赤でもそれは始めない理由にはならない：最初の保留項目
であり、ブロックする。レガシー固有の四つの基準が加わる：どう動くか知っている人がいるか、
本番を読み取り専用で参照できるか、何かテストが存在するか、そしてバックアップが一度でも
復元されたことがあるか。最後のものは、ほとんど全員が赤だと気づくものだ。

**プロンプトを送る前に**、あなたの手で：

- `docs/INITIAL_SURVEY.md`、短く：責任者によればTurnosは何をして誰のためか、何が痛むか
  （二重のリマインダー、足りないもの）、誰が作ってどれだけで返事が来るか、どこで動いて
  いるか、誰がアクセスを持つか、そして誰も復元したことのない「自動」のバックアップがある
  こと。半ページ。
- `docs/ELIGIBILITY_CRITERIA.md`：レッスン0のシートに四行追加：知っている人、参照できる
  本番、既存のテスト、復元されたバックアップ。列は空のままで。
- エージェントのためのリポジトリへの読み取りアクセス、そして手に入るなら、データベースへの
  読み取り専用の認証情報、チャットの外に。

1. これを貼ること：

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

> [ja]
> この既存システムをUrazukeの方法で引き受けられるかを評価します。`docs/INITIAL_SURVEY.md`
> の初期調査と `docs/ELIGIBILITY_CRITERIA.md` の基準シートを読んでください。シートは既存
> システムのために四つの基準を加えています：システムがどう動くか知っている人がつかまるか。
> 本番を読み取り専用で参照できるか。自動テストが存在するか。そしてバックアップが存在し、
> 一度でも復元されたことがあるか。その後リポジトリを、そしてアクセスを与えたなら動いている
> 環境を探索してください：何も変えないでください。シートを基準ごとに、答え、その出所
> （調査、コード、データベース、設定、または推定）とともに埋め、排除基準X1とX2については
> 緑か赤かを書いてください。X2については、各画面を列挙し、それぞれについて今日プログラム
> から操作できるか、効果をバックエンドで確認できるかを言ってください。手元のもので答え
> られない基準があれば、私に聞いてください。推測しないでください。決定はしないでください：
> 完成したシートをあなたの読みと疑問とともに私に提示してください。私が決めます。私の言語で
> 答えてください。

   求めているのはレッスン0と同じこと、加えて三つ：何も変えずに探索すること、各答えがどこ
   から出たかを言うこと、そしてX2を画面ごとに測ること。

2. 質問に答えて、シートを読むこと。とりわけX2の各画面の行を見ること。
3. 決めること。

**プロンプトを送る前に**（締めのプロンプト）：一行のあなたの決定、そしてこのプロジェクトでは
必須の条件が一つ：レッスンN4の前にバックアップをあなたのマシンで復元すること。

4. 締めのプロンプトを貼ること：

> Decision: [go under this condition: the backup is restored at least once before N4]. Write the
> final sheet to `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source,
> and the conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the
> first pending item: make every screen drivable by a program with its backend effect checkable;
> mark it as blocking. Include the questions you asked and my answers.

> [ja]
> 決定：[次の条件で可：バックアップがN4の前に少なくとも一度復元される]。最終シートを
> `docs/ELIGIBILITY.md` に書いてください。日付、誰が決めたか、出所付きの各答え、そして条件が
> あればその条件とともに。どれかの画面でX2が赤なら、`docs/PENDING.md` を作り、最初の保留項目
> を開いてください：すべての画面をプログラムから操作でき、その効果をバックエンドで検証
> できるようにすること。ブロックすると印してください。あなたがした質問と私の答えを含めて
> ください。

**完全性の検証。** X2に画面ごとの答えがあるか？ レガシーの四つの基準に出所付きの答えが
あるか？ バックアップが日付付きの条件として残ったか？

**提出物。** `docs/ELIGIBILITY.md`、そして必要なら最初のブロックする保留項目。

**典型的な誤り。** 「ウェブだから」とX2に緑と答えること。そして「自動のがあるから」と
バックアップの条件を飛ばすこと：レッスンN4でエージェントは本番のデータベースをコピーする
のであり、何かがうまくいかなかったとき、誰も試していないそのバックアップが唯一あるものだ。

**ガイドプロジェクトでは。** エージェントは、Turnosの六つの画面のうち四つはプログラムから
操作でき、二つはできないことを見つける（予約のフォームが識別子のないカレンダーを使っていて、
患者の検索がキーボードのイベントに反応しない入力欄だ）。ブロックする保留項目を開く。責任者が
言わなかったリマインダーの定期処理を見つける。バックアップはあり、一度も復元されていない：
条件だ。甥については「つかまる、二週間に一度」で、エージェントはそれを「つかまらない」と
読むことを提案し、それは正しい。可、条件が一つ。

### レッスン N1 — レガシーのための共働の約束

**理解すべきこと。** レッスン1の六つのルールに五つが加わる。それが存在するのは、他人の
コードを前にしたモデルが反射的に三つのことをするからだ：並べ替える、悪いと思ったところを
「直す」、そして自分の期待と違うことをコードがしていたらそれは誤りだと決めてかかる。レガシー
のルールはその反射を塞ぐ：頼まれていないリファクタリングはしない、触れる前に読む、変なものは
直さずに書き留める、オーナーが別のことを言うまで現在の挙動が仕様である、そして特性化が緑で
なければ何も入らない。

**プロンプトを送る前に**、あなたの手で：

- あなたの働き方の好み、レッスン1と同じく。そしてもう一つの決定：正常化のあいだにどれだけ
  のリスクを受け入れるか。コースでは：エージェントは自分でテスト環境にデプロイしてよい。
  本番へは、レッスン13まで決して。
- `docs/ELIGIBILITY.md` が締め済みであること。

1. これを貼ること：

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [ja]
> 何にも触れる前に、既に存在してユーザーがいるシステムのための、あなたと私の共働の約束を
> 定めます。`docs/WORKING_AGREEMENT.md` を書いてください。方法の六つのルール（私の時間は
> 神聖。技術的負債ゼロ。範囲は正確に。文書は同じコミットで。検証していないことを決して
> やったと報告しない。私の言語で話す）を、それぞれ何を防ぐかを説明する一行とともに。そして
> 受け継いだシステムのためのこの五つのルールを：(7) 頼まれていないものは何もリファクタ
> リングせず、どのモジュールも書き直さない。(8) 理解していないコードは触れる前に読み、
> 学んだことはシステムの地図に入れる。(9) 見つけた変なもの（コードの中の秘密、死んだ経路、
> 重複したルール、インデックスのないクエリ）はすべて、証拠とともに保留項目として記録し、
> 決してついでに直さない。(10) オーナーが別のことを言うまで、現在の挙動が仕様である：
> コードがすることと業務が言うことの違いは、私が決める食い違いであって、あなたが黙って直す
> バグではない。(11) 特性化テスト群が緑でなければ、どんな変更もテスト環境に届かない。この
> システムに必要だと思うルールがあれば、提案と印して加えてください。これを書くために私の
> 働き方について知る必要があることがあれば、聞いてください。

2. 提案を読むこと。「触れるにつれてコードを現代化する」と言うものがあれば、理由とともに
   却下すること：それは変装した書き直しだ。

**プロンプトを送る前に**（締めのプロンプト）：各提案についてのあなたの判定、一行の理由付き
で。プロンプトの穴のためです。

3. レッスン1の締めのプロンプトで、変更なしで締めること。

**完全性の検証。** 十一のルールが、それぞれ防ぐ失敗とともに揃っているか？ リファクタリング
や書き直しを許す提案はないか？

**提出物。** 日付と版の付いた `docs/WORKING_AGREEMENT.md`。

**典型的な誤り。** 妥当に聞こえるからと「漸進的な清掃」のルールを受け入れること。妥当に
聞こえるし、それはエージェントが頼まれていないことを変える許可を自分に出す形だ。

**ガイドプロジェクトでは。** エージェントが受け入れる価値のある独自のルールを二つ提案する：
「このシステムではテスト環境から実際の送信は一切出ない：テストでのリマインダーは偽の受信箱へ
行く」、そして「責任者が落とす月次の表計算はシステムの消費者であり、契約として数える」。
二つ目は生産者・消費者の地図が早めに顔を出したものであり、それでいい。
### レッスン N2 — システムの読み取り：復元された地図と食い違い

**理解すべきこと。** コース全体で時間あたりの価値が最も高いレッスンだ。レッスン2では
プロジェクトファイルとツリーは調査から出てきた。ここではシステムそのものから出てきて、各
主張がどこから出たかの印を帯びる：`[コード]`、`[データベース]`、`[設定]`、`[文書]`、
`[業務]`、または`[推定]`。印こそがコードを読まずに検証することを可能にする：推定されたものを
見て、確認するか訂正する。そして新しい文書が現れる、食い違いの一覧だ：コードがすること、
データベースが課すこと、業務が信じていることのあいだで合わないすべて。それは勝手には解決
しない：一つずつがあなたの、日付付きの決定だ。レガシーには常に食い違いがある。一覧が空で
出てきたら、エージェントは比較していない。

**プロンプトを送る前に**、あなたの手で、オーナーとともに：

- すべてへのエージェントの読み取りアクセス：リポジトリ全体、データベースのスキーマ（読み取り
  専用、認証情報はチャットの外に）、秘密の値を伏せたサーバーの設定、最近のログ、そしてある
  だけの文書（Turnosでは、甥の「変更の上げ方」というメールが一通）。
- `docs/INITIAL_SURVEY.md` に、責任者とともに書く新しい節：**彼女がシステムはこうすると
  信じていること**を、ユースケースごとに。そして覚えているルール（「予約は二時間前を切ったら
  キャンセルできない」「リマインダーは夜八時に出る」）。それをシステムと照合しないで
  ください：その比較はエージェントの仕事です。
- リポジトリの外に住むものの一覧：リマインダーの定期処理と、データベースにつなぐ月次の表計算。
- `docs/WORKING_AGREEMENT.md` が締め済みであること。

1. これを貼ること：

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [ja]
> 存在するものからこのシステムの地図を復元します。リポジトリ全体（すべてのブランチ）、
> データベースのスキーマ（読み取り専用）、各環境の設定、最近のログ、そしてあるだけの文書を
> 読んでください。あなたのいる場所から読めない部分があれば、私に言って穴と印してください。
> 推測で埋めないでください。それから三つのものを書いてください。第一に、
> `docs/INITIAL_SURVEY.md` を方法が期待する形で完成させてください（システムは何をして誰の
> ためか。何をしないか。誰が使うか。技術。環境。誤りが何を要するか）。各主張にはその出所の
> 印を付けて：[コード]、[データベース]、[設定]、[文書]、調査が既に言っていることには
> [業務]、または[推定]。第二に、`PROJECT.md`、最大で三百行、そして
> `docs/SEMANTIC_TREE.md`：ドメインと、その下に、アクター、プロセス（それぞれ、コードが実際
> に実装している通りの引き金、手順、結果、例外とともに）、データベースとコードが課している
> 属性、状態、遷移を持つエンティティ、画面、外部インテグレーション、定期処理。各ノードに
> 同じ印を付けて。第三に、`docs/DISCREPANCIES.md`：コード、データベース、文書、そして調査で
> 業務が言っていることが一致しないすべてを、それぞれの側の証拠とともに。どの食い違いも解決
> しないでください。何も直さないでください：列挙してください。生きた状態のために
> `docs/STATUS.md` を作ってください。私の言語で答えてください。

   求めているのは、すべてを読んで読めなかったものを申告すること、印付きの調査とツリー、
   コードが実装している通りの（あるべき姿ではない）プロセス、定期処理、そして解決せずに
   列挙された食い違いだ。

2. 責任者とツリーをノードごとに辿ること。`[推定]`はそれぞれ確認するか訂正する。`[コード]`は
   それぞれ彼女の信じていることと比べる：合わないところに食い違いがあり、エージェントが既に
   列挙しているかもしれないし、していなければあなたが加える。
3. 食い違いを彼女と一つずつ、一行で、日付付きで決めること。答えは三つありうる：「システムが
   正しくて、業務が忘れていた」（確認されたルールとして残る）、「システムが間違っていて、
   変えなければならない」（保留項目を開く）、または「分からない、後で見る」（日付付きで
   開いたまま。多すぎないように）。

**プロンプトを送る前に**（締めのプロンプト）：確認したノードと訂正したノードの一覧、そして
食い違いの一覧を、あなたの決定と日付とともに、それぞれ一行で。

4. これで締めること：

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [ja]
> このノードを確認します：[一覧]。これを訂正してください：[一覧]。食い違いはこう決まります：
> [それぞれ一行で：食い違い、私の決定、今日の日付]。`docs/INITIAL_SURVEY.md`、`PROJECT.md`、
> `docs/SEMANTIC_TREE.md` を今日の日付で締め、出所の印を保ってください。食い違いについての
> 各決定を `docs/DECISIONS.md` に私の言葉そのままで書き、システムを変えなければならないと
> 私が決めた食い違いごとに `docs/PENDING.md` に保留項目を開いてください。現在の挙動が残ると
> 私が決めたものは、確認されたルールとしてノードの隣に書いてください。`PROJECT.md` に、各
> セッションの始めにこのファイル、ツリー、共働の約束を読む指示を加えてください。

5. **読み取りテスト**、レッスン2と同じく：新しいセッション、文脈なしで、「このシステムは何を
   *しない*か？ どの処理が夜に独りで走るか？」。地図で答えられなければならない。

**完全性の検証。** `[推定]`と印されたノードはあるか？（一つもないなら、エージェントは読んだ
ものと推測したものを区別していない。）ツリーに定期処理が少なくとも一つあるか？ 食い違いの
一覧はゼロより多いか？ それぞれに日付付きの決定があるか、意図的に開いたままか？ 印は締めを
生き延びたか？ 読み取りテストを通ったか？

**提出物。** 印付きで完成した `docs/INITIAL_SURVEY.md`、`PROJECT.md`、
`docs/SEMANTIC_TREE.md`、決定済みの `docs/DISCREPANCIES.md`、決定の入った
`docs/DECISIONS.md`、`docs/STATUS.md`。

**典型的な誤り。** 一つずつ決めずに、「責任者の言う通りになるようコードを直して」食い違いを
解決すること：それらの食い違いのいくつかは、業務が忘れてコードが覚えていたルールだ。そして
「その方がきれいだから」と締めのときにエージェントに印を消させること：印のないツリーは、
もう検証できない。

**ガイドプロジェクトでは。** Turnosのツリーには責任者が予期していたアジェンダのドメインと、
予期していなかった二つのものがある：データベースには存在するがどの画面も表示しない「予定
変更済み」という予約の状態`[データベース]`と、リマインダーを送るほかに一年以上前の
キャンセル済みの予約を削除する定期処理`[コード]`。責任者はそれが削除されていることを知ら
なかった。典型的な食い違いは八つ：キャンセルの二時間ルールがコードに存在しない（いつでも
キャンセルできる）。リマインダーは彼女によれば八時、設定によれば七時に出る。患者の電話は
彼女が必須だと信じているのにデータベースでは必須でない。等々。削除のものが彼女を最も驚かせ、
彼女は一分で決める：「それはもう削除しない」。保留項目だ。

### レッスン N3 — 負債の棚卸しとしての監査

**理解すべきこと。** レッスン11を、ただし最後ではなく最初に、そして発見ごとに項目を一つ
加えて：ブロックするか（どんな変更よりも前に直さなければならない）、そのモジュールに触れた
ときに払うか、待てるか。その項目がなければ、監査されたレガシーには四十の発見があり、どれ
から始めるか誰も分からない。何がブロックするかを決めるのは監査人ではなくあなただ：一般には、
露出した秘密、操作できない画面、繰り返せないデプロイ、バックアップの不在、そしてデータを
損なうか過剰に請求しうるもの。

**プロンプトを送る前に**、あなたの手で：

- エージェントの新しいセッション、きれいなクローンと「あなたは監査人です。このシステムを
  読んだこともなく、触れることもありません」と書いた指示ファイル付きで。データベースと
  サーバーへの読み取り専用アクセス。
- N2の `PROJECT.md`、`docs/SEMANTIC_TREE.md`、`docs/DISCREPANCIES.md`。書かれたものを再発見
  しないためです。
- 何がブロックするかのあなたの基準を二行で、プロンプトの穴のために。Turnosでは：露出した
  秘密、操作できない画面、繰り返せないデプロイ、試されていないバックアップ、制御なしに削除
  または送信するもの。

1. これを貼ること：

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [an exposed secret, a
> screen that cannot be driven by a program, a deployment that cannot be repeated, no tested
> backup, anything that deletes or sends without control]), whether it is PAID WHEN TOUCHED (fixed
> together with the first change that enters its module), or whether it CAN WAIT. Grade every
> dimension you audited. End with every finding turned into a proposed pending item, blocking
> ones first. Reply in my language.

> [ja]
> このシステムを、完全性、セキュリティ、性能、コードの品質、デプロイ可能性について監査して
> ください。その進化の前と最中に正常化しなければならないものの棚卸しとして。読み取り専用：
> `docs/AUDIT_[fecha].md` に報告書を書く以外、何も変えないでください。どこかの部分を監査する
> のに手元にないアクセス（データベース、ログ、サーバー）が必要なら、私に言ってその部分を
> 未監査と印してください。良しとして通さないでください。見本ではなくコード全体を辿り、
> 既に分かっていることを報告しないよう、先に `docs/SEMANTIC_TREE.md` と
> `docs/DISCREPANCIES.md` を読んでください。各発見について：どこにあるか（ファイルと行）、
> リスク、それを証明する証拠（コマンド、クエリ、数字）、その優先度（P0は今すぐ直すべき、
> P1は間もなく、P2はできるときに）、そしてもう一つの項目：それがブロックするか（どんな変更
> よりも前に直さなければならない。私の基準では：[露出した秘密、プログラムから操作できない
> 画面、繰り返せないデプロイ、試されたバックアップがないこと、制御なしに削除または送信する
> もの]）、触れたときに払うか（そのモジュールに入る最初の変更と一緒に直す）、それとも
> 待てるか。監査した各次元に評点を付けてください。各発見を提案された保留項目に変えて終えて
> ください。ブロックするものを先に。私の言語で答えてください。

2. 報告書を読むこと。発見を二つ選んで証拠を求めること。速度の印を見直すこと：あなたは理由を
   付けてどれでも上げ下げできる。

**プロンプトを送る前に**（締めのプロンプト）：読んだ報告書、検証した二つの発見、そして開いた
構築者のセッション（締めは監査人ではなく構築者へ行きます）。

3. 構築者のセッションに戻り、レッスン11の締めのプロンプトを貼ること。最後にこう付け加えて：
   「Each pending item keeps the speed mark of its finding.」

**完全性の検証。** 何を監査できなかったか言っているか？ 「ブロックする」が少なくとも一つ
あるか？ 各発見にファイル、行、証拠はあるか？ ブロックするものは既に保留項目になっているか？

**提出物。** 速度の印付きの `docs/AUDIT_[fecha].md` と、開かれたブロックする保留項目。

**典型的な誤り。** 迷惑をかけたくない監査人のせいで、すべてが「待てる」。あるいは怯えた
オーナーのせいで、すべてが「ブロックする」：すると何も始められなくなる。小さいシステムでは
ブロックするものが三つから八つが普通だ。

**ガイドプロジェクトでは。** Turnosの監査はブロックするものとしてこれを見つける：コードの
中のデータベースのパスワード（しかもgitの履歴の中にもあるので、移すだけでなくローテーション
しなければならない）、どのバージョンが動いているかの記録のないFTPでのデプロイ、錠のないまま
予約を削除する定期処理、操作できない二つの画面。「触れたときに払う」としては：インデックス
のない患者の検索（患者のモジュール）、予約ごとに一回クエリを投げるその日のアジェンダの参照
（アジェンダのモジュール）、冪等でないリマインダーの送信（メッセージのモジュール。バグの
手がかりだ）。「待てる」としては：既知の脆弱性のない古い依存関係と、三か所に重複した日付の
整形のコード。

### レッスン N4 — 安全ベルト

**理解すべきこと。** この道の硬いゲートだ：安全ベルトが緑になるまで、機能の一行も変えない。
安全ベルトには五つの部品がある：匿名化されたデータを持つテスト環境、繰り返せるデプロイ、
コードの外に出してローテーションした秘密、あるものを走らせる継続的インテグレーション、そして
特性化テスト群。最後のものはレッスン7を裏返したものだ：テストは緑で生まれる。システムが今日
していることを、欠陥も含めて捉えるからだ。そして役に立つことの証明は、わざとフローを壊した
ときに赤になることだ。そのミューテーションによる赤がなければ、何も見ていないから通るテスト
だ。

**プロンプトを送る前に**、あなたの手で、オーナーとともに：

- `docs/ENVIRONMENTS_SURVEY.md`。エージェントがN2で印付きで起草し、あなたが完成させるもの：
  テスト環境がどこで動くことになるか（コースでは無料のサービスかあなたのマシンのコンテナで
  足ります）、今日どうデプロイしているか、秘密はサーバーのどこに住むことになるか。
- 責任者との匿名化の決定：患者の氏名、電話、メール、身分証は偽の値に置き換え、日付と数量は
  保つ。法律上の義務であって技術的な細部ではありません。
- 特性化のための重要なフローの一覧：責任者の五つ。
- あなたのマシンで復元されたバックアップ（N0の条件）。やっていないなら今やること：エージェ
  ントは本番のデータベースをコピーするので、戻り道があると知っている必要があります。
- サーバーへの読み取り専用アクセスと、テスト環境の場所への書き込みアクセス。認証情報は
  チャットの外に。

1. これを貼ること：

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [ja]
> このシステムに何かを変える前に、その周りに安全ベルトを築きます。環境の調査、
> `docs/AUDIT_[fecha].md`、`docs/SEMANTIC_TREE.md` を読んでください。必要なものが手元にある
> か評価してください（動いているサーバーとそのデータベースへの読み取りアクセス、テスト環境が
> 動く場所への書き込みアクセス、今日どうデプロイされているか）。足りないものがあれば、始める
> 前に私に求めてください。その後、どの機能にも触れずに、次を整えてください：(1) 本番と
> まったく同じようにシステムを走らせるテスト環境。私が列挙した個人項目が匿名化されたデータの
> コピー付きで。(2) その環境への再現可能なデプロイ。二度実行し、二度目が何も変えなかったこと
> を私に示して。(3) リポジトリまたはコードの中で見つかったすべての秘密をサーバーの設定
> （環境ファイルまたは金庫）へ移し、私がそれぞれをローテーションできるよう移したものの一覧を
> 付けて。(4) 今日存在するテスト群を、たとえ単一の煙テストでも、プッシュのたびに走らせる
> 継続的インテグレーション。(5) このプロジェクトのゲートを記した `docs/GATES.md`。次を含めて
> ください：特性化テスト群が緑でなければ何もテスト環境に届かない。完全なテスト群が正確な
> バージョンで緑でなければ何も本番に届かない。そのすべてを `docs/DEPLOYMENT.md` に、人が
> あなたなしで手で行えるように文書化してください。テスト環境で動いているシステムの
> スクリーンショットを撮って私に見せてください。私の言語で答えてください。

2. 行き来のある長い作業だ。スクリーンショットを見せられたら、あなた自身がURLを開くこと：
   データの入ったTurnosが見えなければならない。本物の患者を名前で探すこと：いてはいけない。
3. 渡された一覧の秘密をそれぞれローテーションすること。あなたが、しかるべき管理画面で、
   今日。

**プロンプトを送る前に**（テスト群のプロンプト）：あなたが開いたテスト環境、ローテーション
した秘密、そしてプロンプトの穴のための五つの重要なフローの一覧。

4. これを貼ること：

> We are going to write the characterization tests of these critical flows: [load an
> appointment; cancel an appointment; the reminder reaches the patient; search a patient; download
> the monthly sheet]. A characterization test captures what the system does today, exactly as it
> does it, defects included; it is not a test of what the system should do. For each flow: drive
> it from the screen as a user would and check the effect in the backend (the row, the state, the
> message queued). Every test must pass against the current code. Then prove that each test
> actually watches its flow: break the flow deliberately with a temporary change, show me the red
> output, revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [ja]
> この重要なフローの特性化テストを書きます：[予約を登録する。予約をキャンセルする。
> リマインダーが患者に届く。患者を探す。今月の表計算を落とす]。特性化テストは、システムが
> 今日していることを、している通りそのままに、欠陥も含めて捉えます。システムがすべきことの
> テストではありません。各フローについて：ユーザーがするように画面から操作し、バックエンド
> での効果（行、状態、キューに入ったメッセージ）を確認してください。すべてのテストが現在の
> コードに対して通らなければなりません。その後、各テストが本当に自分のフローを見張っている
> ことを証明してください：一時的な変更でわざとフローを壊し、赤の出力を私に見せ、変更を戻し、
> 緑を私に見せてください。画面から操作できないフローがあれば、模擬しないでください：そう
> 言って、ブロックすると印した保留項目を開いてください。これらのテストを書いているあいだに
> 誤っていそうな挙動を見つけても、直さないでください：証拠とともに
> `docs/DISCREPANCIES.md` に加えてください。テスト群を走らせるコマンドを `docs/STATUS.md` に
> 記録し、`docs/GATES.md` が言う通り、テスト群をテスト環境のゲートにしてください。私の言語で
> 答えてください。

   求めているのは、緑で生まれてミューテーションによる赤で役に立つことを証明するテスト。
   操作できないものを模擬することは一切なし。そして悪く見えるものは、直すのではなく食い違い
   として書き留めること。

5. 操作できない二つの画面（N0のブロックする保留項目）はここで、テスト群の前かその一部として
   解決する：レッスン7のルーチンでその保留項目を閉じ、その後にそれらのフローの特性化テストを
   書くよう頼むこと。
6. あなた自身が `docs/STATUS.md` のコマンドでテスト群を走らせること。緑でなければならない。

**完全性の検証。** テスト環境を開いて、本物の名前が見つからなかったか？ デプロイは二度走り、
二度目は何も変えなかったか？ リポジトリでの秘密の検索は空で返ってきて、見つかったものを
ローテーションしたか？ 五つのフローのそれぞれに自分のテストとミューテーションによる赤が
見えているか？ あなた自身がテスト群を走らせたか？

**提出物。** 匿名化されたデータで動いているテスト環境、`docs/DEPLOYMENT.md`、
`docs/GATES.md`、ローテーションした秘密、緑の継続的インテグレーション、そして五つの赤を
実証した緑の特性化テスト群。

**典型的な誤り。** テスト群を「来週に」回してバグを直し始めること：中途半端な安全ベルトは、
動いていたものを壊す原因の第一位だ。匿名化されたコピーではなく「見本の」テストデータ：
レガシーのバグは実データの中に住んでいる（Turnosの二重のリマインダーは特定の患者でしか
現れない）。そして秘密をローテーションせずに移すこと：gitの履歴の中にあったのだから、もう
秘密ではない。

**ガイドプロジェクトでは。** リマインダーの特性化テストが最も面白い：夜の処理が翌日の予約
ごとに一通のメッセージを偽の受信箱へ送ることを捉え、通る。それを書いているあいだに、処理が
二度走れば二度送ることにエージェントが気づき、証拠とともに食い違いとして書き留める。バグの
手がかりであり、まだ直さない：現在の挙動がレッスンR1まで仕様だ。ミューテーションによる赤：
エージェントがメッセージをキューに入れる行をコメントアウトし、テストが落ち、コメントを外し、
通る。
### レッスン N5 — コードからの錠と生産者・消費者の地図

**理解すべきこと。** レッスン12と8を、既に存在するものの上に棚卸しで行う。何かを変える前に。
エージェントは、システムが外へ向けてすると業務が覚えているよりも多くのものをコードの中に
見つける：送信、削除、夜の処理。二つの一覧の比較が結果だ。そして各錠は「今」か「触れたとき」
かの提案を帯びる：メッセージを送るものの上の錠は今行く。月次の書き出しの上のものは、その
モジュールに触れるブロックまで待てる。

**プロンプトを送る前に**、あなたの手で、オーナーとともに：

- `docs/INITIAL_SURVEY.md` に、システムが外へ向けてすると責任者が**知っている**ことの一覧：
  彼女によれば、リマインダーを送る、それだけ。
- サーバーの定期タスクへのエージェントのアクセス。
- リポジトリの外に住むものの一覧（月次の表計算）、地図のために。
- N4のテスト環境が動いていること。

1. これを貼ること：

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [ja]
> コード、データベースのトリガ、サーバーの定期処理を辿り、請求するもの、送るもの、承認する
> もの、削除するもの、外へ知らせるもの、時刻を決めて走るものをすべて探し、各主張にその出所の
> 印を付けて `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` を書いてください。それを業務が
> `docs/INITIAL_SURVEY.md` に書いた一覧と比べてください：コードがしていて業務が列挙しな
> かったもの、またはその逆は、先へ進む前に私に聞いてください。各行動について：何がそれを
> 発火させるか、二度走りうるか、取り消せるか、今日あれば何の錠があるか、そして戻り道は何か。
> 同じ一周で `docs/PRODUCER_CONSUMER_MAP.md` を構築してください：システムのすべての契約
> （サービス、テーブル、ファイル形式、値の一覧）について、誰がそれを生産し誰が消費するか。
> 私が話したリポジトリの外のものも含めて。見えない部分があれば、外に置くのではなくそう言って
> ください。各行動に提案された錠（明示的な確認、二重の安全、ドライランモード、一日の上限、
> 回路内の人間）を付けた行動の表と、どの錠がどんな変更よりも前に今すぐ行き、どれがモジュール
> に触れるときに行けるかの提案を、私に提示してください。まだ何も実装しないでください：私が
> 錠を一つずつ確認します。私の言語で答えてください。

2. 責任者と錠を一つずつ確認すること。そしてそれぞれの「今」か「触れたとき」の印も。

**プロンプトを送る前に**（締めのプロンプト）：行ごとのあなたの判定を書き込んだ表と、
プロンプトの穴のための「今」の錠の一覧。

3. レッスン12の締めのプロンプトで、「今」の錠だけを列挙して締めること。残りは印とともに
   バックログに残る。

**完全性の検証。** エージェントの一覧は責任者のものより行動が多いか？（同じなら、定期
タスクを見ていない。）「今」の錠はそれぞれ、錠のないバージョンに対する赤のテストを持つか？
月次の表計算は消費者として地図に載っているか？

**提出物。** `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`、`docs/PRODUCER_CONSUMER_MAP.md`、
「今」の錠を実装し検証した `docs/LOCKS.md`。

**典型的な誤り。** 「ついでだから」とすべての錠を今実装すること：二つの速度のルールの違反
であり、顧客が頼んだバグに充てられない一週間だ。

**ガイドプロジェクトでは。** エージェントは責任者が列挙しなかった三つの行動を見つける：
古いキャンセル済みの予約の夜間の削除、予約がキャンセルされたときにシステムが専門職へ送る
メール（彼女は知らなかった）、そして表計算を養う書き出し。「今」の錠：夜間の削除は彼女が
決めるまでドライランモードに移り（削除したはずのものを記録する）、リマインダーの送信は一日の
上限を受け取る。「触れたとき」：送信の冪等性（メッセージのモジュール、バグと一緒に入る）、
キャンセルでの確認（アジェンダのモジュール）。地図には六つの契約があり、月次の表計算は予約の
テーブルの消費者だ：誰かが列を一つ変えたら、表計算は黙って壊れる。

### レッスン N6 — 実数でサイジングする

**理解すべきこと。** レッスン3に利点が一つ：一次のデータはデータベースとログの中にある。
聞くのではなく、テスト付きの計器で測る（レッスン9）。責任者が提供するのはどこにもないもの
だけだ：どれだけ成長すると見込むか、そしてシステムを他の診療所に売るのか。

**プロンプトを送る前に**、あなたの手で：

- 本番データベースへの、またはN4の完全なコピーへの読み取り専用アクセス（匿名化は日付も数量も
  触っていません）、そしてアクセスログへの読み取り専用アクセス。
- 業務の二つの答え：見込む成長（「今と同じ、せいぜい専門職が一人増えるくらい」）と「十倍」
  （「うまくいったら、姉がもう一つ診療所を持っている」）。
- 計器のテストのための既知の事例：専門職の人数、三人。

1. これを貼ること：

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [ja]
> 何かを変える前に、このシステムをその実数でサイジングします。本番データベース（または完全な
> テストのコピー）とログへの読み取り専用アクセスで、聞く代わりに計測してください：テーブル
> ごとの行数と日時からの月あたりの増加、エンティティごとのイベント数、アクセスログからの
> ピーク時の並行性、今日のデータの大きさと五年後の見込み、そして最も遅いクエリ。数字ごとに
> 計器（リポジトリに住むスクリプトで、私が与える既知の事例に対するテスト付き）を書き、各数字
> をそれを生むコマンドとともに私に見せてください。各計器を二つの方向で監査してください
> （数えられるべきものはすべて数えられているか？ 数えられたものはすべて存在するか？）。各値に
> [データベース]または[ログ]の印を付けた `docs/VOLUME_SURVEY.md` を書き、計測できないものだけ
> を私に求めてください：業務が見込む成長と、システムが一か所より多くに仕えるかどうか。その後
> `docs/SIZING.md` を書いてください：すべてが十倍になったら何が最初に壊れるか、現在のアーキ
> テクチャの決定のどれが耐えてどれが耐えないか、そして今日は安く後では高いから、進化する前に
> 今どんな非対称な決定を取るか。コードは何も変えないでください。私の言語で答えてください。

2. あなた自身が計器を一つ走らせること（例えばテーブルごとの行数のもの）。同じ結果が出な
   ければならない。計算を一つ手でやり直すこと。

**プロンプトを送る前に**（締めのプロンプト）：一致したやり直しの計算、そして「十倍」に耐え
ないものがあれば、それについてのあなたの決定。

3. レッスン3の締めのプロンプトで、提案された選択肢から選ぶか、現在のもので耐えると確認して
   締めること。

**完全性の検証。** 計器のない一次の数字はあるか？ 一つあなたが走らせたか？ 「十倍」は書か
れているか？

**提出物。** 印付きの `docs/VOLUME_SURVEY.md`、テスト付きの計器、`docs/SIZING.md`。

**典型的な誤り。** 「データベースが大きすぎて数えられないので、十万くらいと推定します」を
受け入れること。大きいデータベースはクエリで数える。それが計器だ。

**ガイドプロジェクトでは。** 二年で二万件の予約、月に千件でゆっくり増えている。メッセージは
六万件。ピークで利用者二人。データベースの占有は小さい。最も遅いクエリは名前による患者の
検索（インデックスなし、監査が既に言っていた）。「十倍」はその検索と、予約数に比例して
時間のかかる夜間の送信を除いて、すべてで耐える。非対称な決定：メッセージ送信のインター
フェースにキューを持たせる。今日は不要でも、手付金（レッスンR2）が同じ経路を使うからだ。

### レッスン N7 — 顧客の依頼と対にした正常化のバックログ

**理解すべきこと。** レッスン5に二つの列を加えたもの。負債（監査、食い違い、画面、未実装の
錠、サイジングの決定）と顧客の依頼（失敗しているもの、足りないもの）が同居する一つのキュー。
各保留項目は速度の印と種類を持ち、顧客の各保留項目は、同じモジュールに触れていて一緒に払う
とよい正常化の保留項目の一覧を持つ。それが「触れたときに払う」のルールを運用可能にしたものだ。

**プロンプトを送る前に**、あなたの手で、オーナーとともに：

- この段階に対する顧客の依頼を、`docs/blocks/STAGE_01_REQUEST.md` に、責任者の言葉で二つの
  一覧にして。失敗しているもの：「リマインダーが時々二度届いて、時々届かない。先週の患者
  三人のスクリーンショットがある」。足りないもの：「初診の予約で支払いリンクの手付金を
  求めたい」「表計算を落とさずに今月の数字を見たい」。
- N2からN6までのすべての成果物が締め済みであること。どれかが欠けているならこのプロンプトを
  開かないでください。
- N0、N3、N4のブロックする保留項目が閉じていること。

1. これを貼ること：

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [ja]
> 正常化とこの段階に対する顧客の依頼を、`docs/PENDING.md` の中の番号付き保留項目の一つの
> キューに変えます。それぞれ方法が求める完全な仕様付きで（番号、題名、セマンティックツリーの
> ノード、出所、記述、決定と日付を伴う業務ルールまたは欠落と印したもの、入るデータと出る
> データ、画面、境界ケース、「ある状況を前提に、あることが起きたとき、ならば」の形の受け入れ
> 基準、どう検証するか、状態）。正常化の項目の出所：`docs/AUDIT_[fecha].md`、変えると私が
> 決めた食い違い、プログラムから操作できない画面、ローテーションすべき秘密、まだ実装されて
> いない錠、そして `docs/SIZING.md` の決定。それぞれが速度の印を保ちます：ブロックする、
> 触れたときに払う、または待てる。顧客の項目の出所：この段階に対する顧客の依頼。それぞれに
> 修正（今日失敗していること、顧客の言葉による再現の仕方とともに）または進化（新しいこと）と
> 印してください。顧客の各項目について、同じモジュールに触れていて一緒に払うべき正常化の項目
> を列挙してください。依頼がどこかの点で曖昧で検証可能な項目を書けないなら、私に聞いて
> ください。推測で解決しないでください。順序：ブロックする項目を先に、その後に顧客の項目を
> 私が与えた優先順位で、それぞれ対になった正常化とともに。私の言語で答えてください。

2. 顧客の各保留項目の仕様を、責任者になったつもりで読むこと。レッスン5と同じだ。そして対を
   見直すこと：その依頼とともにその負債を払うのは理にかなっているか？
3. 約束に、レッスン5の各セッションのルーチンを変更なしで加えること。

**完全性の検証。** 「ブロックする」が開いたまま残っているか？ 各修正は顧客の言葉で再現の
仕方を言っているか？ 顧客の各保留項目に対のものがあるか？

**提出物。** すべてを入れた `docs/PENDING.md` と、約束の中のルーチン。

**典型的な誤り。** 「待てる」に五十の保留項目があるバックログ：一覧に変装した書き直しだ。
払われないものは保管庫へ送って、そう言うこと。そして「小さいから」とブロックするものを
開いたまま最初のブロックを開くこと。

**ガイドプロジェクトでは。** Turnosのバックログには顧客の保留項目が三つ残る：二重の
リマインダー（修正、メッセージのモジュール、送信の冪等性とサイジングのメッセージのキューと
対になる）、手付金（進化、支払いの新しいモジュール、同じ画面に触れるのでキャンセルでの確認と
対になる）、そして月次の報告（進化、報告のモジュール、患者のインデックスと、置き換えられる
表計算の契約と対になる）。そして正常化のものが十二ほど、うち三つは「待てる」で、そう言われて
いる。

---

## レガシーの上のループ：レッスンR1とR2

### レッスン R1 — 最初のブロック：バグを、修正モードで

**理解すべきこと。** 修正の保留項目は既知のバグだ。レッスン7では赤は作り出された。ここでは
赤はバグそのものだ：報告したユーザーのようにフローを操作して失敗を再現するテストが、現在の
コードに対して失敗しなければならない。失敗しないなら、別のバグを再現したのだ。その赤は
正しいものを直していることの証明であり、「起きているに違いないこと」についてのエージェントの
どんな説明よりも価値がある [Ref. 22](REFERENCIAS.md#ref-22)。そして根本原因は触れる前に散文
で言われる。根本原因が誰も書かなかった業務ルールであることが時々あり、それを決めるのは
あなただからだ。

**プロンプトを送る前に**、あなたの手で：

- `docs/PENDING.md` の中の修正の保留項目を、責任者の言葉による再現とともに。そして具体的な
  事例：先週の三つのスクリーンショット、患者の名前（テストでは偽のもの）と日付付きで。事例が
  なければテストはありません。
- 緑の特性化テスト群、コマンドは `docs/STATUS.md` に。
- この保留項目の対のもの、その中に列挙されていること。
- 今日あなたが業務の質問を一つすると責任者に知らせてあること。

1. 各セッションのルーチンでブロックを開くこと：エージェントがどの保留項目を取るか宣言し、
   仕様を読み直す。
2. これを貼ること：

> This pending item is a correction: [some patients receive the reminder twice and some receive
> none; three cases from last week are attached in the item]. Before changing anything: (1)
> Reproduce the failure with a test that drives the flow from the screen and checks the effect in
> the backend, and show me that it fails against the current code; that red is the proof that you
> reproduced the right defect. If you cannot reproduce it, tell me what you tried and what you
> need; do not fix what you cannot see. (2) Find the root cause and tell me in prose, with the
> evidence, before fixing. If the root cause is a business rule nobody wrote down, stop and ask me.
> (3) Fix at the root, not where it hurts, and nothing else: anything else you find goes to a
> pending item. (4) Show me the test green, the characterization suite still green, and the
> regression of the neighbouring items. (5) If the fix changes a current behaviour that someone
> may depend on, say so explicitly: that is a decision for me, not a side effect. Close the paired
> normalization items of this module in the same block, each with its own evidence. The commit
> message says "proved red against [version]" and the test counts. Reply in my language.

> [ja]
> この保留項目は修正です：[一部の患者はリマインダーを二度受け取り、一部は一度も受け取ら
> ない。先週の三つの事例が項目に添えてある]。何かを変える前に：(1) 画面からフローを操作して
> バックエンドでの効果を確認するテストで失敗を再現し、現在のコードに対して失敗することを私に
> 見せてください。その赤が、正しい欠陥を再現したことの証明です。再現できないなら、何を試して
> 何が必要かを私に言ってください。見えないものを直さないでください。(2) 根本原因を見つけ、
> 直す前に、証拠とともに散文で私に言ってください。根本原因が誰も書かなかった業務ルールなら、
> 止まって私に聞いてください。(3) 痛むところではなく根で直し、それ以外は何も：ほかに見つけた
> ものは保留項目へ行きます。(4) テストが緑であること、特性化テスト群がまだ緑であること、
> そして近隣の項目の回帰を私に見せてください。(5) 修正が、誰かが依存しているかもしれない
> 現在の挙動を変えるなら、はっきりそう言ってください：それは副作用ではなく私の決定です。この
> モジュールの対になった正常化の保留項目を同じブロックで、それぞれ自分の証拠とともに閉じて
> ください。コミットのメッセージには「[バージョン]に対して赤で証明」とテストの数を書いて
> ください。私の言語で答えてください。

   求めているのは、診断の前の再現、触れる前の散文による根本原因、根とそれだけ、システム全体
   の回帰としての特性化、そして挙動の変更があなたの決定であること。

3. 修正を許可する前に根本原因を読むこと。業務ルールを聞かれたら、責任者と決めて、レッスン6の
   締めの形式で答えること。
4. 締めに：あなた自身が特性化テスト群を走らせること。そしてテスト環境で三十分、受付係の
   ようにシステムを使うこと：人間による目視は委譲しない。

**完全性の検証。** バグを再現するテストの赤を、数字とともに見たか？ 根本原因は修正の前に
散文で書かれていたか？ 特性化は緑のままか？ 対のものはそれぞれ自分の証拠とともに閉じたか？
コミットは「赤で証明」と言っているか？

**提出物。** 完全なルーチンで閉じたバグ、閉じた対のもの、そしてバグのテストで拡張された
特性化テスト群。

**典型的な誤り。** 根本原因を読まずに修正を許可すること：Turnosでは、エージェントの最初の
仮説はたいてい「処理が二度走っている」で、それは真実の半分だ。そして「ついでだから」と
メッセージのモジュールを片付けさせること：ルール7だ。

**ガイドプロジェクトでは。** テストは、予定変更された予約で二重の送信を再現する：夜の処理は
翌日の予約の行ごとに一通のリマインダーを送り、予定変更された予約には行が二つある（どの画面も
表示しない「予定変更済み」の状態の古い行と、新しい行）。一度も受け取らないのは、送信の後に
予定変更された人たちだ。根本原因：レッスンN2で現れた「予定変更済み」の状態。業務の質問：
「予定変更された予約は新しい予約か、同じ予約か？」。責任者が決める：同じ予約、履歴付きで。
根での修正は送信ではなく状態に触れる。対になった冪等性は同じブロックで払われる。赤は
「予約1件に対してメッセージ2通」と言い、緑は「予約1件に対してメッセージ1通」と言う。そして
挙動の変更が申告される：予定変更された予約が月次の表計算に二度現れなくなる。表計算は
テーブルの消費者だからだ。責任者がそれを承認する。

### レッスン R2 — 二つ目のブロック：手付金を、進化モードで

**理解すべきこと。** 古いものの上の新しいものは、第一部のレッスン5から10そのままに、完全な
方法で構築する：保留項目の中の仕様、日付付きの決定、赤のテスト、エンドツーエンドの検証、
誠実な報告。違いは二つ。近隣の回帰はシステム全体であり、それを言うのは特性化テスト群だ。
そしてブロックがあるモジュールに入るとき、そのモジュールの「触れたときに払う」と印された
正常化の保留項目が、自分の証拠とともに一緒に入る。レガシーが古いモジュールにしたことを、
新しいモジュールにしてはいけない。

**プロンプトを送る前に**、あなたの手で：

- `docs/PENDING.md` の中の手付金の進化の保留項目を、あなたが読んだ完全な仕様、その対のもの、
  そして責任者が既に取れる業務の決定とともに：どの予約に手付金が付くか、いくらか、払われな
  かったらどうなるか。
- 帰結のある行動の調査（N5）に「手付金を請求する」の行を加えたもの。世界へ作用する新しい
  行動だからです：レッスン12と同じく、構築の前に錠を。
- 緑の特性化テスト群。

1. レッスン5の開始のプロンプトで、手付金の依頼についてブロックを開き、責任者として仕様を
   読むこと。
2. 構築の前に、錠：「手付金を請求する」の行動について、レッスン12の締めのプロンプトを、まず
   ドライランモードで貼ること。
3. レッスン7のルーチンで、保留項目ごとに、対のものを同じブロックに入れて構築すること。
4. ブロックの締めに：完全なエンドツーエンドのテスト群（特性化のものに新しいテストを加えた
   もの）を、レッスン7のブロックの締めのプロンプトで。そしてあなたがシステムを使う三十分。

**完全性の検証。** 手付金には、請求が存在するより前に赤のテスト付きの錠があるか？ ブロックの
後も特性化は緑のままか？ モジュールの対のものは払われたか？ 古いモジュールで、保留項目なしに
「改善」されたものはないか？

**提出物。** テスト環境でドライランモードで動いている手付金、その仕様、その錠、そのテスト、
そのエンドツーエンドの検証とともに。そして閉じた対のもの。

**典型的な誤り。** 収まりがいいからと「残りと同じやり方で、速く」手付金を構築すること：
新しいモジュールは常に完全な方法とともに生まれる。そして「支払いリンクであって我々が請求
するわけではない」と錠を忘れること：リンクは患者に送られる。それは外へ向かう行動だ。

**ガイドプロジェクトでは。** 手付金はリマインダーと同じ経路を使い、その経路には今やキューが
ある（N6の非対称な決定が独りで元を取っている）。錠：受付係の明示的な確認と専門職が定めた
金額。一週間のドライランモードで「手付金を求めたはずの相手」を記録する。キャンセルの画面の
対のもの（確認）は、手付金がキャンセル時に起きることを変えるので、このブロックで払われる。
締めに、テスト群は七つのフローを走る：特性化の五つ、R1のバグのもの、そして手付金のもの。

---

## その後：本番リリースと運用

ここからは、レガシーは方法を持つシステムであり、第一部のレッスン11から21がそのまま当てはま
る。注記が四つ。一つ目は運用品質の六つの段についてだ：最低限の可観測性と脆弱性の走査はもう安
全ベルトとともに入っており、永続化の計測はもうN6にあり、負荷テストはその量で最初のデプロイの
前に走らせる。二つの監視は最初の読みを基準線として始まり、初日にもう悪かったものはその印とと
もに保留項目になる。残り三つの注記はこれだ。レッスン11の監査はN3のものと比べる：負債をどれだ
け払い、どれだけ残っているか。レッスン14のマニュアルはレガシーには存在しないことが多く、ある
がままのシステムと、今や本当にやったことを文書化している閉じた保留項目から生成する。そして
レッスン15の振り返りにはこの道固有の質問がある：正常化にいくらかかったか（時間で、トークン
で、最初の変更までの週数で）、そして「待てる」と印した負債のうち、結局同じだけ高くついたのは
どれか。その答えが、次の版でこのパートのカレンダーを修正することになる。

## 正常化の区間の修了リスト

オーナーがコードを読まずに検証する、最初のブロックを開く前の八つの条件。進化・修正の道の
ページのものと同じだが、このパートの提出物なのでここで繰り返す。

1. 前の段階のすべての入力（調査、適格性、約束、プロジェクトファイル、ツリー、環境、
   ボリューム、サイジング、ゲート）が出所の印付きで存在し、オーナーが推定の各ノードを確認した
   （N2）。
2. 各食い違いに日付付きの決定があり、システムを変えるものには保留項目がある（N2）。
3. 監査が存在し、各発見に速度の印がある（N3）。
4. 安全ベルトが緑：匿名化されたデータを持つテスト環境、二度走ったデプロイ、外に出して
   ローテーションした秘密、継続的インテグレーション、ミューテーションによる赤を実証した
   特性化テスト群（N4）。
5. すべての帰結のある行動に判定があり、「今」の錠に赤のテストがある（N5）。
6. 一次の数字が計器とテストとともに計測されていて、「十倍」が書かれている（N6）。
7. 「ブロックする」が一つも開いておらず、顧客の各保留項目に対のものがある（N7）。
8. 約束にレガシーの五つのルールがあり、新しいセッションが読み取りテストを通る（N1、N2）。

## 付録 — このパートにまだないもの

- 本物のレガシーの上でこれを受講したコホート。受け継いだTurnosは、診断モードで見た他人の
  システムから構築したものであって、受講生から構築したものではない。
- 甥が残したままの「Turnos」の例のリポジトリ。自分のレガシーを持たない受講生が、正常化する
  ものを一つ持てるように。このパートで最も重要な保留項目だ。
- 大きいシステムのための特性化テスト群の大きさの基準と、システムに数十のモジュールがある
  ときに正常化をモジュールごとにどう分けるか。
