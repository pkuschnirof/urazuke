# ステップ 16 — 設定可能なレベルを持つ、完全な可観測性とトレーサビリティ（段の契約）

**区間：** 本番リリース。
**いつ：** 本番リリースのフェーズで、第15段の後（デプロイの連鎖と環境ごとの設定がもうあ
る）、性能テスト（19）の前に。可観測性がなければ性能テストは何が壊れたかを言わないからだ。レ
ガシーでは、最低限のレベル（設定可能なレベルを持つ構造化された記録と、一つの相関識別子）が安
全ベルト（N4）に入る。完全なレベルはここで。「新しいモジュールはすべて記録し伝播する」という
ルールは運用の全期間にわたって効力を持つ。
**形式：** 一回の送信。エージェントが組み立てて実証し、あなたは実際のトレースを読む。
**規模：** ユーザーを持つことになるすべてのプロジェクトで最低限のレベルは必須。帰結のあるど
のプロジェクトでも完全版。

## 何のためか

本番で何かが失敗したとき、そして失敗するものだが、一つの識別子だけで、コードを開かず、エー
ジェントに「調べて」と頼まずに、画面からデータベースまで、そして外部への各呼び出しまで、一つ
の行動を追えるようにしたい。そして本番での記録の詳細さのレベルを、一分で、再デプロイせずに上
げ、後で下げられるようにしたい。それが可観測性だ：システムがしていることを見ること。二つ目は
トレーサビリティ：帰結のあるすべての行動（請求した、送信した、削除した、承認した）が、誰が、
いつ、何を、どこから、どんな結果でという跡を、アプリケーションが編集できない記録に残すこと。
これがなければ、第23段の常駐エージェントは盲目のまま運用し、第21段と第22段の監視は食べるもの
を持たず、各インシデントは証拠ではなく仮説で診断される。1時間43分生き続けた孤児ターンはコー
ドではなくログで見つかったし [Ref. 16](../REFERENCIAS.md#ref-16)、常駐エージェントはまさにログ
を読むことから始まった [Ref. 13](../REFERENCIAS.md#ref-13)。

「設定可能なレベル」は、これを「ログを入れる」ことから区別する条項だ：レベル（エラー、警告、
情報、デバッグ、トレース）はサーバー上で、環境ごとに、コードに触れずデプロイもせずに設定で変
えられ、本番は何かを調査しているときを除いて情報で走る。

**初心者の方へ。** *記録*（ログ）とは、システムが何かをするたびに書く一行のことです：
「10:42:13、予約台帳モジュール、ユーザーrecepcion1、予約17をキャンセル」。*構造化された*と
は、すべての行が同じ部分を同じ順序で持ち、機械で検索できるという意味です。*レベル*とはどれだ
けの詳細を書くかです：「エラー」では失敗したものだけ、「トレース」では一歩ごと。*相関識別子*
とは、各行動が始まるとき（あなたが「キャンセル」を押した）にそれに与えられる固有の番号で、そ
の行動が引き起こすすべて（データベースへの照会、患者へのメッセージ）にくっついて旅をします。
だから後でその番号を検索すれば完全な履歴が現れます。そして*監査*とは、重要な行動の、編集でき
ないリストです：誰が何をいつしたか。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- デプロイの連鎖と環境ごとの設定（第15段）：レベルはそこで設定される。
- 錠の表（第14段）：帰結のある各行動が監査の一項目になる。
- 個人データに印の付いた初期調査：記録はそれらを含むことができない。
- 記録と指標がどこに住むことになるか（ローテーションするファイル、サービス）：あなたが決め
  る。

## 2. プロンプト

**最初：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- `docs/DEPLOYMENT.md`（第15段）、環境ごとの設定の読まれ方とともに：記録のレベルはその設定の
  もう一つの変数になります。
- `docs/LOCKS.md`（第14段）：帰結のある行動のリストが、監査に残らなければならないもののリス
  トです。
- `docs/INITIAL_SURVEY.md` に、どのデータが個人データか（氏名、電話番号、メールアドレス、証
  明書番号、診断）のリスト、あなたがオーナーと一緒に書いたもの：記録が伏せなければならないも
  のです。これは好みではなく法的な義務です。
- 記録と指標がどこに住むかというあなたの決定：小さいプロジェクトにはサーバー上のローテーショ
  ンするファイルで十分。帰結のあるプロジェクトには記録のサービス。そしてどれだけの期間保存す
  るか。
- 最低限受け入れられる状態：どのデータが個人データかを知っており、記録がどこに住むかを知って
  いること。

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.

> [ja]
> このシステムを、端から端まで、観測可能でトレース可能にします。レベルは再デプロイなしに私が
> 変えられるものにします。`PROJECT.md`、`docs/SEMANTIC_TREE.md`、`docs/DEPLOYMENT.md`、
> `docs/LOCKS.md` を読んでください。必要なものが揃っているか評価してください（記録と指標がど
> こに住むか、設定が環境ごとにどう読まれるか、どの外部サービスが呼ばれるか）。足りないものが
> あれば私に求めてください。その後、次を組み立ててください：(1) 構造化された記録、イベントご
> とに一つの記録、日付と時刻、レベル、モジュール、相関識別子、アクター付きで、レベルは環境ご
> とに実行時に（エラー、警告、情報、デバッグ、トレース）再デプロイなしに設定でき、本番の既定
> 値は情報。(2) すべての要求、ジョブ、メッセージの入口で作られ、あらゆる呼び出しを通って伝播
> し、あらゆる記録に書かれる相関識別子。一つの識別子が、画面からバックエンド、データベース、
> そしてあらゆる外部呼び出しまで一つの行動を追えるように。(3) `docs/LOCKS.md` の帰結のあるす
> べての行動のトレーサビリティ：誰が、いつ、何を、どこから、どんな入力で、どんな結果で。アプ
> リケーションが編集できない監査記録に。(4) 第21段と第22段の監視が読むことになる健全性と指標
> のエンドポイントまたはファイル（要求、レイテンシ、エラー、キューの大きさ、資源の使用）。
> (5) `docs/INITIAL_SURVEY.md` に列挙されたすべての個人項目のマスキング。どの記録にも個人
> データが含まれないように。実際の要求一つがその識別子によってすべての層を通って追われるとこ
> ろを見せてください。そしてテスト環境でレベルが再デプロイなしに変わるところを見せてくださ
> い。レベル、どこで変えるか、記録がどこに住むかを `docs/OBSERVABILITY.md` に文書化してくだ
> さい。私の言語で答えてください。

何を求めているか：五つの部品と、この段の証拠である二つの実証だ。**実際の識別子がすべての層を
通って追われること**（見せられないなら、伝播がどこかで壊れている）と、**デプロイなしにレベル
が変わること**（デプロイが必要なら、設定可能ではない）。帰結のある行動の監査はアプリケーショ
ンから不変でなければならない。アプリケーションが消せる跡は跡ではないからだ。そして個人データ
のマスキングが同じプロンプトに入るのは、記録が、誰も決めないまま最も多くの個人データが漏れる
場所だからだ。

**ルーチン（共働の約束に入る）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- あなたが読んだ `docs/OBSERVABILITY.md`：レベルをどう上げ、記録をどこで読むか理解しています
  か？
- ルーチンが入る `docs/WORKING_AGREEMENT.md`。
- 最低限受け入れられる状態：テスト環境で、あなた自身が一度、レベルを上げて下げたこと。

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.

> [ja]
> すべての新しいモジュール、ジョブ、インテグレーションは、相関識別子とアクターを伴う構造化さ
> れた記録を、対応するレベルで書き、個人データを伏せ、自分が行うあらゆる呼び出しに識別子を伝
> 播し、帰結のあるすべての行動を監査の跡に記録します。そのいずれかを追加する保留項目は、新し
> いコードを通って端から端まで追われた実際の識別子を一つ見せずには閉じられません。

何を求めているか：可観測性が新しいモジュールごとに劣化しないこと。ルールでなければ必ずそうな
る：三か月目のモジュールは何も記録せず、そしてそれこそが失敗するモジュールだ。

## 3. 期待される成果物

- 環境ごとに設定可能なレベルを持つ構造化された記録、デプロイなしに変えられたもの。
- 各記録に一つの相関識別子、画面からデータベースと外部呼び出しまで伝播したもの。
- 帰結のある行動の、不変の監査記録。
- 健全性と指標のエンドポイントまたはファイル、文書化されたもの。
- 記録の中に個人データが一つもないこと。
- `docs/OBSERVABILITY.md` と、約束の中のルーチン。

## 4. 完全性の検証（あなたが行う、コードを読まずに）

- 実際の要求の識別子を求めて、あなた自身で記録の中を探すこと：画面に、バックエンドに、データ
  ベースに、そしてあれば外部呼び出しに現れますか？
- テスト環境でレベルをデバッグに上げ、行動を一つして、記録を見て、下げること。デプロイが必要
  でしたか？ なら登れていません。
- テスト用の氏名か電話番号を記録の中で探すこと：あってはなりません。
- テスト環境で帰結のある行動を一つすること（キャンセルする、偽の受信箱に送る）：誰が、いつ、
  何を、結果はどうだったかとともに監査に残りましたか？
- 午前三時にあなた一人で記録を見つけるのに `docs/OBSERVABILITY.md` で足りますか？

## 5. 警告サイン

- エージェントは「ログ」を見せるが、モジュールごとに違う形式で書いている。構造化されていな
  い。誰も検索できないだろう。
- 識別子はバックエンドには現れるが、外部呼び出しやスケジュールされたジョブには現れない。イン
  シデントが失われるのはまさにそこだ。
- 本番のレベルが「今のところ」デバッグのままになった。ディスクが埋まり、データが漏れる。
- 帰結のある行動の監査が、残りのデータと同じテーブルに住んでいて、アプリケーションがそれを消
  せる。
