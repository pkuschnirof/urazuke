# Urazuke — 進化・修正の道：方法で生まれなかったシステムを正常化し、それからはしごを登る

著者：Pablo Kuschniroff、Claude Codeの支援による。第1版、2026年10月18日。このページは
方法の後半だ：[主文書](ESCALERA_METODOLOGICA.md)は新規プロジェクトの道を記述し、ここでは
システムが既に存在し、それを作ったのが他人（あるいは証拠なしに「バイブコーディング」した
私自身）で、今それを修正するか成長させなければならないときに私が何をするかを記述する。
見慣れない言葉は主文書の用語集にあり、実際の事例は[参照文書](REFERENCIAS.md)にある。公開
リポジトリ：[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## なぜこのページが存在するか

はしごを書いたとき、私は空のフォルダを見ながら書いた：第0段はプロジェクトに取り組むかを
決め、第4段は機能のない骨組みをデプロイし、第5段になってようやくユーザーが見る最初のものが
現れる。きれいな場合であり、最もよく教える場合でもある。だが最も頻繁な場合ではない。実務
では、誰かが私を呼ぶときの大半は、既に動いていて、それに依存するユーザーがいて、もういない
誰か、あるいは誰も証拠を求めなかったモデルが作ったシステムがあり、依頼は「これを直して」か
「あれを足して」だ。私自身のツールは、はしごが書かれるずっと前から診断モードで他人の
システムに入っていたし [Ref. 11](REFERENCIAS.md#ref-11)、方法が初めて本番のシステムから
栄養を得たのは、既に存在していたものを見ているときだった
[Ref. 12](REFERENCIAS.md#ref-12)。

そしてここに、先へ進む前に名指ししておきたい罠がある：レガシーを前にした誘惑は、どちらも
間違っている二つの極端のどちらかを選ぶことだ。一つは「方法でゼロから書き直す」：きれいに
聞こえるし、ほとんど常に、最初のシステムを置き換えるに至らない二番目のシステムで終わる。
もう一つは「直接ループを当てる、そのために第5段から第12段があるのだから」：実際的に聞こえ
るが、砂の上に建てることだ。ループは契約が、地図が、テスト環境が、動くテスト群が、繰り返せる
デプロイが存在することを前提にしているからだ。方法で生まれなかったシステムには、そのどれも
存在しない。この道は真ん中を行くものだ：**まず正常化し、書き直さず、それからはしごを登る**。

## 方法の三つのユースケース

方法には三つのユースケースがあり、エージェントを開く前にどれにいるかを知っておくとよい。
どこから入るかが変わるからだ。

| ケース | 出発点 | どこから入るか | 最初の機能の前に何があるか | どこに書かれているか |
|---|---|---|---|---|
| **新規プロジェクト** | 空のフォルダと依頼を持つオーナー。 | 第0段、そこから二十四を順に。 | 最初の機能の前に立ち上げの区間まるごと。 | 主文書、二十四の契約、コースのマニュアル。 |
| **方法で作られたシステムへの進化・修正** | システムは既にはしごを登っている：契約、地図、証拠付きで閉じた保留項目、テスト群、デプロイ、マニュアルがある。 | 第5段：ブロックを開いてループを辿る。第13段は定期的に。第23段は段階の締めに。 | なし：次の段階のために第23段が第0段へ戻るだけで、既に主文書のパートBにある。 | 主文書（フェーズ4、運用）。 |
| **方法なしで作られたシステムへの進化・修正** | 動いていて、ユーザーがいて、それらの成果物が一つもないか、いくつかが中途半端なシステム。 | このページの正常化の区間（N0からN7）、そしてその後にようやくループを、修正モードか進化モードで。 | 正常化の区間まるごと、機能の最初の一行に触れる前に。 | このページとコースのマニュアル、パート2。 |

混同されないよう名指ししておく、外に残るもの：**技術の移行**（プラットフォームの変更、
言語の変更、データベースの変更）は方法のユースケースではない。それは別のプロジェクトであり、
一般には第0段の排除基準に当たる [Ref. 46](REFERENCIAS.md#ref-46)。受け継ぐシステムにアクセス
可能なリポジトリがないか、その画面をプログラムから操作できず操作可能にもできないなら、
相応しいのはそれを正常化することではなく、第0段を丸ごと通した、それを置き換える新規
プロジェクトだ。

そして三番目のケースに当てはまる一言：レガシーが他のチームのものか自分のものかは同じことだ。
三か月前にモデルと一緒に証拠なしで構築したシステムは、三年前に請負業者が作ったものと
まったく同じだけレガシーだ。変わるのは読む労力であって、道ではない。

## 原則：書き直さずに正常化する、すべての入力とともに

正常化とは、システムを、方法がループを開くときに前提としている状態まで持っていくことだ。
そしてそれを、私が譲らない三つのルールで行う。

**第一：書き直さない。** 正常化は機能に触れない。システムの周りに足りないもの（契約、地図、
テスト環境、テスト群、繰り返せるデプロイ、既に世界へ作用しているものの上の錠）を置き、
システムは以前と同じことをしたままにする。レガシーは、直すべきだったバグよりも「全部
片付けよう」という熱意によって壊れることの方が多い。

**第二：二つの速度。** 負債には、どんな変更よりも前に払う部分があり、それを**安全ベルト**と
呼ぶ：実データに似たデータを持つテスト環境でシステムを走らせられること、繰り返せる形で
デプロイできること、秘密をコードの外に置くこと、そしてそのどれかが変わったら赤になる、
重要なフローの特性化テスト群を持つこと。安全ベルトは**硬いゲート**だ：それなしには何も
変えない。例外は、本番の緊急のために書かれた一つだけで、後ほど説明する。残りの負債は
**触れたときに**払う：ブロックがあるモジュールに入るとき、そのモジュールの正常化の保留項目が
一緒に入る。決して、始める前の「全体清掃」ではない。

**第三：前の段階のすべての入力が存在しなければならない。たとえ自動発見で復元する必要が
あっても。** これがこの道を「ループを当てるだけ」から区別するルールだ。立ち上げ区間の各段は
後続の段が読む成果物を生む：初期調査、適格性シート、共働の約束、プロジェクトファイル、
セマンティックツリー、ボリュームの調査、サイジング、環境の調査、ゲート。新規プロジェクトでは
それらの入力を、オーナーがエージェントとともに取り込みから書く。レガシーでは誰も書いて
おらず、ループはそれなしには始められない。解決は飛ばすことではない：エージェントが
**システムそのものから復元する**ことだ。コードを、データベースのスキーマを、各環境の設定を、
ログを、あるだけの文書を読み、それらの文書の各主張がどこから出たかの印を帯びるようにする。
私が使う印は五つ：`[コード]`、`[データベース]`、`[設定]`、`[文書]`、`[推定]`、加えて
オーナーが確認または訂正したものには`[業務]`。印の付いた復元された文書は、コードを読まずに
検証できる文書だ：オーナーは`[推定]`と印された主張を見て確認するか訂正し、`[コード]`と
印されたものを見てシステムが自分の思っている通りのことをしているか確かめる。合わないものは
**食い違い**であり、食い違いは正常化の金塊だ：誰も報告しなかったバグであり、誰も決めなかった
ルールだ。

### 復元される入力の表

抽象のままにならないよう、立ち上げ区間の各入力と、新規プロジェクトではそれがどこで生まれ、
進化・修正の道ではどう手に入れるかを並べておく。

| 入力 | 新規プロジェクトでは誰が作るか | 進化・修正の道では | 誰が確認するか |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | オーナーが、手で、取り込みで（第0段と第2段）。 | エージェントがN2でコード、データベース、設定から出所の印付きで起草する。オーナーは業務だけが知ることを足す。 | オーナーが、`[推定]`の部分を主張ごとに。 |
| `docs/ELIGIBILITY_CRITERIA.md` と `docs/ELIGIBILITY.md` | 第0段。 | N0、レガシー固有の四つの基準を加えて。 | オーナーが決める。 |
| `docs/WORKING_AGREEMENT.md` | 第1段。 | N1、レガシー固有の五つのルールを加えて。 | オーナー。 |
| `PROJECT.md`、`docs/SEMANTIC_TREE.md`、`docs/STATUS.md` | 第2段、調査から。 | N2、システムから、印付きで。加えて食い違いの一覧。 | オーナーがツリーを辿り、食い違いを一つずつ決める。 |
| `docs/AUDIT_[fecha].md` | 第13段、最後に。 | N3、最初に：負債の棚卸しだ。 | オーナーが読み、二つの発見を検証する。 |
| `docs/ENVIRONMENTS_SURVEY.md`、テスト環境、継続的インテグレーション、繰り返せるデプロイ、`docs/GATES.md` | 第4段と第15段。 | N4、安全ベルト、特性化テスト群とともに。 | オーナーがスクリーンショットとデプロイの二度目の実行を見る。 |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`、`docs/PRODUCER_CONSUMER_MAP.md` | 第14段と第11段。 | N5、コードとデータベースの棚卸しによって。 | オーナーが錠を一つずつ確認する。 |
| `docs/VOLUME_SURVEY.md`、`docs/SIZING.md` | 第3段、業務が出す数字で。 | N6、データベースとログで計測した数字で（サイジングに適用した第7段）。 | オーナーは計測できないものだけを提供する。 |
| `docs/PENDING.md` | 第5段、顧客の依頼から。 | N7、監査、食い違い、顧客の依頼から、「ブロックする／触れたときに払う／待てる」の印付きで。 | オーナーが順序を決める。 |
| `docs/DECISIONS.md`、`docs/GOTCHAS.md`、`docs/LOCKS.md`、`docs/DEPLOYMENT.md` | 第6、8、12、13段。 | 空で作られるか、N2、N4、N5で埋められ、新規プロジェクトと同じようにループの中で育つ。 | オーナー。 |

N7を終えてこれらのファイルのどれかが欠けていたら、区間は登れていない。システムが「動いて
いる」かどうかは関係ない：ループは最初のセッションでそれを必要とする。

## 正常化の区間：八つのステーション

はしごの二十四と混同されないよう、これらを段ではなくステーションと呼び、N0からN7と番号を振
る。新しい段ではない：立ち上げの段と運用の三つ（第11段、第13段、第14段）を、別の順序と別の入
口で並べたものだ。新規プロジェクトでは入口が調査であり、ここでは入口がシステムで、読むのは
エージェントだ。

| ステーション | 由来する段 | 新規プロジェクトとの違い |
|---|---|---|
| N0 — 既存システムの適格性 | 0 | 基準が四つ多い。X2は画面ごとに測る。赤なら、それは条件ではなく最初の保留項目だ。 |
| N1 — レガシーのための共働の約束 | 1 | ルールが五つ多い：頼まれていないリファクタリングをしない、触れる前に読む、ついでに直さず書き留める、現在の挙動が仕様である、特性化が緑でなければ何も入らない。 |
| N2 — システムの読み取り | 2 | 調査、プロジェクトファイル、ツリーが、出所の印付きでコードから出てくる。食い違いの一覧が現れる。 |
| N3 — 棚卸しとしての監査 | 11 | 最後ではなく最初に行き、各発見がブロックするか、触れたときに払うか、待てるかを言う。 |
| N4 — 安全ベルト | 4、7、13 | データ付きのテスト環境、繰り返せるデプロイ、外に出した秘密、継続的インテグレーション、そして特性化テスト群。硬いゲート。 |
| N5 — コードからの錠と地図 | 12、8 | 何も変える前に、世界へ作用するすべてと、部分と部分のあいだのすべての契約を棚卸しする。 |
| N6 — 実数でサイジングする | 3、9 | 一次の数字は聞くのではなく測る。オーナーはデータベースにないものだけを提供する。 |
| N7 — 正常化のバックログ | 5 | 負債と顧客の依頼を一つのキューに、速度の印とモジュールごとの対付きで。 |

順序が重要だ。N3がN4より前なのは、監査が安全ベルトに何が入るべきかを言うからだ（見つけた
秘密、操作できない画面、繰り返せないデプロイ）。N5が安全ベルトの後なのは、帰結のある行動を
棚卸しするには、間違えても高くつかない場所でシステムを走らせられる必要があるからだ。N6が
最後なのは、N4でようやく存在するデータ付きのテスト環境の上で測るからだ。そしてN7が締める
のは、それ以前のすべてを一つのキューにまとめるからだ。

### 正常化の順序

期限はない：各段階はシステムが求めるだけ続き、唯一決まっているのは順序だ。

| 段階 | ステーション | ほかに何が起きるか |
|---|---|---|
| 1 | N0、N1、N2、N3 | オーナーを隣に置いてシステムを読む。ノードを確認し、食い違いを決める。何も変えない。段階の締めに：復元された地図と負債の棚卸し。 |
| 2 | N4、N5 | 安全ベルト：データ付きのテスト環境、二度繰り返したデプロイ、ローテーションした秘密、重要なフローの特性化テスト群。既に作用しているものの上の錠を確認。締めに：システムがテスト環境で動き、テスト群が緑。 |
| 3 | N6、N7、そして最初のブロック | 計測したサイジング。順序の付いたバックログ。第5段で最初のブロックを開く。修正か進化か、正常化の保留項目を対にして。ここから先はいつものループだ。 |

システムが大きければ、育つのは段階1（読むものが多い）と段階2の特性化テスト群（フローが
多い）だ。N7は育たない：一度に座って書けない正常化のバックログは、誰も維持しないバックログ
だ。

---

### N0 — 既存システムの適格性：モデルが検証できる前提条件

- **意図**：このシステムを方法で引き受けられるかを、触れる前に、人間の評価にではなく、
  フロンティアのモデルがそのシステムに対してできるかできないかに依存する基準で決める。ある
  前提条件が満たされないなら、それは「不可」ではない：それ自体が一つの**前段のプロジェク
  ト**であり、そのシステムを適格にするためのものだ。
- **いつ**：一度だけ、他の何よりも前に。
- **入力**：短い初期調査、リポジトリへの読み取りアクセス、できれば動いている環境とその
  データベースへのアクセス。
- **成果物**：決定と、レガシーの七つの排除的な前提条件を記した `docs/ELIGIBILITY.md`。
  それぞれは人が宣言するのではなく、エージェントが証拠とともに検証したもの：
  1. **システムの完全な環境を立ち上げられる**。すべてのソース、データモデル、永続化とともに、
     リポジトリとデータの複製から。
  2. **コードがフロンティアのモデルにとって理解可能で取り組み可能である**：エージェントが
     それを丸ごと読み、各モジュールが何をするかを、作り話なしに説明できる。
  3. **コードから、モデルがシステムの完全な機能を文書に記述できる**。エンドユーザーが自分の
     システムだと認め、受け入れる形で。
  4. **フロントエンドをテスト用の道具で辿れる**。エンドツーエンドのテストを生成するために、
     各要素にアクセスでき、バックエンドへの効果が検証できる形で（これがX2だ）。
  5. **システムをソースから今日入手できる道具で構築し実行できる**：依存関係が解決し、
     バージョンが存在し、失われたバイナリに頼るものが何もない。
  6. **本番のデータを複製し匿名化できる**。テスト環境のために。そして少なくとも一度復元された
     バックアップが存在する。
  7. **外部の連携にテストモードがあるか、境界で隔離できる**（偽の受信箱、ドライランモードの
     提供者）。帰結のある行動を帰結なしに試せるように。
- **ゲート**：七つすべてが緑で、エージェントの証拠（立ち上げた環境、書かれた機能の文書、
  一つのフローのエンドツーエンドのテストの実行）とともに。各赤は、それ自身の出口の保留項目を
  持つ前段のプロジェクトになる。
- **誰が決めるか**：エージェントが検証して証拠を提示し、オーナーが前段のプロジェクトに
  取り組むかどうかを決める。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- `docs/INITIAL_SURVEY.md`、初日に書ける短い版：業務によればシステムは何をして誰のためか、
  今日何が痛むか（依頼のきっかけとなったバグ、足りないもの）、誰が作ったか、その人は
  つかまるか、どこで動いているか、誰が何にアクセスできるか、バックアップはあるか誰が取るか。
  半ページ、意図的に不完全に：N2でエージェントがシステムから完成させます。
- `docs/ELIGIBILITY_CRITERIA.md`：第0段のシート（X1、X2と重み付けのもの）に、上のレガシーの
  七つの前提条件を加えたもの。それぞれに空の三列を：緑か赤か、証拠（エージェントがそれを
  検証するために何をしたか）、そして赤なら前段のプロジェクト。
- エージェントのためのリポジトリへの読み取りアクセス、データの複製（または読み取り専用の
  本番）へのアクセス、そして環境を立ち上げようと試せる場所。認証情報はチャットの外に。
  これがなければ前提条件1、5、6は検証できず、赤のままになります。
- 受け入れられる最低限の状態：エージェントがリポジトリをクローンでき、システムを立ち上げよう
  と試せる場所があること。

**最初の：**

> We are going to assess whether this existing system can be taken over with the Urazuke method,
> with prerequisites that you verify by doing, not by asking. Read the initial survey in
> `docs/INITIAL_SURVEY.md` and the criteria sheet in `docs/ELIGIBILITY_CRITERIA.md`. Then, changing
> nothing in the system, verify each prerequisite with evidence: (1) try to set up a complete
> environment of the system from the repository and a copy of the data, with its sources, data
> model and persistence, and tell me exactly what you could and could not bring up; (2) read the
> whole code and tell me whether you can understand and work with it, module by module, naming
> what you cannot understand; (3) from the code alone, write `docs/FUNCTIONALITY_RECOVERED.md`: the
> complete functionality of the system described for an end user, screen by screen and process by
> process, marking what you inferred; (4) list every screen and say whether it can be driven by a
> test tool with each element accessible and the backend effect checkable, and prove it by writing
> and running one end-to-end test of one flow; (5) try to build and run the system from the sources
> with today's tools and report every dependency that does not resolve; (6) check whether the
> production data can be copied and anonymized into a test environment and whether a backup exists
> and has ever been restored; (7) list every external integration and say whether it has a test
> mode or can be isolated at the edge. For each prerequisite: green or red, the evidence (what you
> did and what happened), and, if red, what project would make it green. Do not decide: present me
> the sheet, and I decide.
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
> この既存システムをUrazukeの方法で引き受けられるかを、あなたが聞くのではなく実際に行って
> 検証する前提条件で評価します。`docs/INITIAL_SURVEY.md` の初期調査と
> `docs/ELIGIBILITY_CRITERIA.md` の基準シートを読んでください。その後、システムの中の何も
> 変えずに、各前提条件を証拠とともに検証してください：(1) リポジトリとデータの複製から、
> ソース、データモデル、永続化を含むシステムの完全な環境を立ち上げようと試み、何を立ち上げ
> られて何が立ち上げられなかったかを正確に教えてください。(2) コードを丸ごと読み、それを
> 理解して扱えるかをモジュールごとに、理解できないものの名前を挙げながら教えてください。
> (3) コードだけから `docs/FUNCTIONALITY_RECOVERED.md` を書いてください：システムの完全な
> 機能を、エンドユーザーに向けて、画面ごと、プロセスごとに記述し、推測したものに印を付けて。
> (4) 各画面を列挙し、各要素にアクセスでき、バックエンドへの効果が検証できる形で、テスト用の
> 道具で操作できるかを言い、一つのフローのエンドツーエンドのテストを書いて実行することで
> それを示してください。(5) システムをソースから今日の道具で構築し実行しようと試み、解決
> しない依存関係をすべて報告してください。(6) 本番のデータをテスト環境へ複製し匿名化できるか、
> そして一度でも復元されたバックアップが存在するかを確認してください。(7) 外部の連携をすべて
> 列挙し、テストモードがあるか、境界で隔離できるかを言ってください。各前提条件について：
> 緑か赤か、証拠（あなたが何をして何が起きたか）、そして赤なら、どんなプロジェクトがそれを
> 緑にするか。決定はしないでください：シートを私に提示してください。私が決めます。私の言語
> で答えてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：前提条件が**実際に行うこと**で検証されること（立ち上げる、読む、文書を
書く、テストを走らせる）。フロンティアのモデルはその四つができるのであり、そうすれば適格性
は意見ではなくなるからだ。回復された機能の文書。コードが取り組み可能であることの最も強い
証明であり、しかもN2が地図に変えるものの最初の草稿でもある。そして各赤がそれを緑にする
プロジェクトとともに来ること。足りない前提条件は拒絶ではなく、独自の範囲を持つ前段の作業
だからだ。

**プロンプトを送る前に**（締めのプロンプト）：各前提条件の証拠とともにシートを読んだ後の、
一行のあなたの決定。そして各赤について、前段のプロジェクトを今やるか、後でやるか、決して
やらないか（そのときシステムは適格ではありません）というあなたの決定。

**締めの：**

> Decision: [go / go after these prerequisite projects: … / no-go]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, each prerequisite with its colour and its
> evidence, and, for every red one, the prerequisite project as a pending item in `docs/PENDING.md`
> marked as blocking, with its own acceptance criterion: the prerequisite verified green. Include
> the questions you asked and my answers.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> 決定：[可 / 次の前段のプロジェクトの後に可：… / 不可]。最終シートを
> `docs/ELIGIBILITY.md` に書いてください。日付、誰が決めたか、各前提条件をその色と証拠と
> ともに。そして赤のものそれぞれについて、前段のプロジェクトを `docs/PENDING.md` の保留項目
> として、ブロックすると印し、独自の受け入れ基準とともに：前提条件が緑で検証されること。
> あなたがした質問と私の答えを含めてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

完全性の検証：各前提条件に、あなたの答えではなくエージェントが**行った**ことの証拠がある
か？ `docs/FUNCTIONALITY_RECOVERED.md` は存在し、あなたはオーナーとしてそれを読んだか：彼が
持っていると思っているシステムを記述しているか？ 一つのフローの本物のエンドツーエンドの
テストを走らせたか？ 各赤に出口の基準を持つ前段のプロジェクトがあるか？ 警告サイン：誰も
理解していないシステムについて、一日ですべてが緑。エージェントは行う代わりに答えた。

---

### N1 — レガシーのための共働の約束

- **意図**：何にも触れる前にルールを定める。第1段より五つ多いルールとともに。それは受け継いだ
  システムが、エージェントが勝手に「改善」しないために必要とするものだ。
- **いつ**：N0の後、何かを読む前に。
- **入力**：あなたの働き方の好み、第1段と同じ。
- **成果物**：方法の六つのルールとレガシーの五つを記した `docs/WORKING_AGREEMENT.md`。
- **ゲート**：約束に日付と版があり、プロジェクトファイル（N2で存在するようになったら）が
  それを読むよう命じている。
- **誰が決めるか**：オーナー。

**プロンプトを送る前に**、これを手元に持っていなければなりません：

- あなたの働き方の好み、第1段と同じく短い一覧で：言語、どれだけ質問してほしいか、どんな自律を
  与えるか、何は許容しないか。
- 正常化のあいだに受け入れるリスクの水準についてのあなたの決定：エージェントが自分で
  テスト環境にデプロイしてよいかどうか（本番へは、N4が閉じて第15段を登るまで、決して）。
- `docs/ELIGIBILITY.md`（N0）、締め済み。
- 受け入れられる最低限の状態：第1段の質問とリスクの質問に答えられます。

**最初の：**

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
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

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
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

求めているのは、いつもの六つのルールと、他人のコードを前にしたモデルが反射的に三つのことを
するから存在する五つだ：並べ替える。悪いと思ったところを「直す」。そして、コードがすること
が自分の期待と違えばそれは誤りだと決めてかかる。ルール7、9、10はまさにその三つの反射を
塞ぐ。ルール8は読むことを地図に変える。エージェントがあるモジュールについて学んだことが
セッションを閉じたときに失われないように。ルール11は安全ベルトをルールとして書いたもので、
テスト群が存在する前にルールが存在するようにするためだ。

**締めの：** 第1段の締めのプロンプトを変更なしで。提案を理由付きで受け入れたり却下したり
して、約束は日付と版とともに残る。

警告サイン：エージェントが「触れるにつれてコードを現代化する」をルールとして提案する。その
ルールは変装した書き直しだ。書かれた理由とともに却下すること。

---

### N2 — システムの読み取り：復元された地図と食い違い

- **意図**：第2段が新規プロジェクトで生む地図を、システムそのものから、出所の印付きで、
  そしてコード、データベース、文書、業務が信じていることのあいだで合わないすべての一覧と
  ともに存在させる。リバースエンジニアリングで行う第2段であり、この道全体で時間あたりの
  価値が最も高い段階だ。
- **いつ**：N1の後、オーナーが確認のために動ける状態で。
- **入力**：リポジトリ全体、読み取り専用のデータベースのスキーマ、各環境の設定、あればログ、
  存在する文書、そしてN0の短い調査。
- **成果物**：印付きで完成した `docs/INITIAL_SURVEY.md`。`PROJECT.md`。各ノードに印の付いた
  `docs/SEMANTIC_TREE.md`。`docs/STATUS.md`。そして食い違いの一覧、それぞれオーナーが決め、
  `docs/DECISIONS.md` に書かれたもの。
- **ゲート**：オーナーの判定のない`[推定]`のノードがない。決定も保留項目もない食い違いが
  ない。第2段の読み取りテストを通った。
- **誰が決めるか**：オーナーが、食い違いを一つずつ。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- 読めるものすべてへのエージェントの読み取りアクセス：リポジトリ全体（主ブランチだけでなく
  すべてのブランチ）、データベースのスキーマ（読み取り専用の認証情報、チャットの外に）、
  各環境の設定（秘密の値を伏せた環境ファイル、または値のない変数の一覧）、あれば最近のログ、
  そして古いメールでも時代遅れのマニュアルでもいいので何らかの文書。
- N0の `docs/INITIAL_SURVEY.md` に、あなたがオーナーと書く新しい節：**業務がシステムは
  こうすると信じていること**を、業務の言葉で、ユースケースごとに。そして覚えているルール
  （「予約は二時間前を切ったらキャンセルできない」）。それをシステムと照合しないでください：
  まさにその比較をエージェントがするのであり、違いが食い違いです。
- `docs/WORKING_AGREEMENT.md`（N1）、締め済み。
- リポジトリの外に住んでいてシステムに触れるもののあなたが書いた一覧：ロボット、データベース
  を読む表計算、サーバーに仕込まれた定期処理、あるテーブルを消費する別のシステム。エージェ
  ントはコードからそれを見ることができません。
- 受け入れられる最低限の状態：エージェントがコードとデータベースのスキーマを読めて、調査に
  業務の言葉によるユースケースが三つとルールが三つ以上あります。

**最初の：**

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
> for the living state.
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
> 存在するものからこのシステムの地図を復元します。リポジトリ全体（すべてのブランチ）、
> データベースのスキーマ（読み取り専用）、各環境の設定、最近のログ、そしてあるだけの文書を
> 読んでください。あなたのいる場所から読めない部分があれば、私に言って穴と印してください。
> 推測で埋めないでください。それから三つのものを書いてください。第一に、
> `docs/INITIAL_SURVEY.md` を方法が期待する形で完成させてください（システムは何をして誰の
> ためか。何をしないか。誰が使うか。技術。環境。誤りが何を要するか）。各主張にはその出所の
> 印を付けて：
> [コード]、[データベース]、[設定]、[文書]、調査が既に言っていることには[業務]、または
> [推定]。第二に、`PROJECT.md`、最大で三百行、そして `docs/SEMANTIC_TREE.md`：ドメインと、
> その下に、アクター、プロセス（それぞれ、コードが実際に実装している通りの引き金、手順、
> 結果、例外とともに）、データベースとコードが課している属性、状態、遷移を持つエンティティ、
> 画面、外部インテグレーション、定期処理。各ノードに同じ印を付けて。第三に、
> `docs/DISCREPANCIES.md`：コード、データベース、文書、そして調査で業務が言っていることが
> 一致しないすべてを、それぞれの側の証拠とともに。どの食い違いも解決しないでください。何も
> 直さないでください：列挙してください。生きた状態のために `docs/STATUS.md` を作って
> ください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、すべてを読んで読めなかったものを申告すること（完全性の条項のレガシー版：
穴は印すのであって埋めるのではない）。調査とツリーが各主張に**出所の印**付きで出てくること。
その印こそがコードを読まずに検証することを可能にするからだ。プロセスと状態が、あるべき姿では
なく**コードが実装しているもの**であること。現在の挙動が仕様だからだ（約束のルール10）。
定期処理を含めること。誰も覚えておらず、最も害をなすものだからだ。そして食い違いが
それぞれの側の証拠とともに、**解決されずに**列挙されること。解決することは決めることであり、
決めるのはあなたの仕事だからだ。

**プロンプトを送る前に**（締めのプロンプト）：オーナーとノードを一つずつ辿ったツリー、確認
されたノードの一覧と訂正されたノードの一覧。そして食い違いの一覧、それぞれオーナーの決定を
一行と日付付きで（システムが正しくて業務が忘れていた。システムが間違っていて変える。または
日付付きで開いたまま、ただし多すぎないように）。

**締めの：**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> このノードを確認します：[一覧]。これを訂正してください：[一覧]。食い違いはこう決まります：
> [それぞれ一行で：食い違い、私の決定、今日の日付]。`docs/INITIAL_SURVEY.md`、`PROJECT.md`、
> `docs/SEMANTIC_TREE.md` を今日の日付で締め、出所の印を保ってください。食い違いについての
> 各決定を `docs/DECISIONS.md` に私の言葉そのままで書き、システムを変えなければならないと
> 私が決めた食い違いごとに `docs/PENDING.md` に保留項目を開いてください。現在の挙動が残ると
> 私が決めたものは、確認されたルールとしてノードの隣に書いてください。`PROJECT.md` に、各
> セッションの始めにこのファイル、ツリー、共働の約束を読む指示を加えてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

求めているのは、各食い違いについての決定がいつもの三つの場所（決定の記録、変える必要が
あれば保留項目、確認されたならツリー）に残ること。そして締めるときに出所の印が**消され
ない**こと：印を失ったツリーは、もう検証できないツリーだ。

完全性の検証：オーナーとしてツリーを辿ること。業務が一度も使わなかったエンティティの状態は
あるか？ `[コード]`と印されているなら、誰も使っていなくてもシステムはそれを持っており、
それは食い違いだ。ツリーに定期処理はあるか？ 一つもないなら、エージェントにどこを探したか
聞くこと。各食い違いに日付付きの決定はあるか？ 第2段の読み取りテストを通ったか（新しい
セッションがシステムは何を*しない*か知っている）？ 警告サイン：ツリーに`[推定]`と印された
ものが一つもない（エージェントは読んだものと推測したものを区別していない）。食い違いの一覧が
空だ（レガシーで空になることは決してない：エージェントは比較を誤ったか、比較しなかった）。
プロジェクトファイルが「文書化することが多かったから」三百行を超える（それはツリーへ行き、
起きたことは生きた状態へ行く [Ref. 41](REFERENCIAS.md#ref-41)）。

---

### N3 — 負債の棚卸しとしての監査

- **意図**：第13段を、ただし最初に、そして発見ごとに質問を一つ加えて：ブロックするか、その
  モジュールに触れたときに払うか、待てるか。報告書は報告書ではない：安全ベルト（N4）と
  バックログ（N7）の原料だ。方法が既に書かれた状態で始まった最初のプロジェクトでは、早期の
  一連の監査がそのまま保留項目になった [Ref. 30](REFERENCIAS.md#ref-30)。ここでは同じことを
  他人のシステムの上で行う。
- **いつ**：N2の後、できればシステムを読んだのとは別のセッションで。
- **入力**：読み取り専用のリポジトリ、読み取り専用の動いている環境、復元された地図（N2）。
- **成果物**：各発見に「ブロックする／触れたときに払う／待てる」と印された
  `docs/AUDIT_[fecha].md`。
- **ゲート**：速度の印のない発見がない。ブロックするものはN4を始める前に保留項目が開いて
  いる。
- **誰が決めるか**：オーナーが、速度の印について。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- ツールが許すなら、エージェントの新しいセッション。きれいなクローンと「あなたは監査人です。
  このシステムを読んだこともなく、触れることもありません」と書いた指示ファイル付きで。N2の
  セッションの前提を共有しないためです。できないなら同じセッションで、ただしそれを承知の上で。
- システムが動いている環境（データベース、ログ、設定）への読み取り専用アクセス、読み取り専用
  の認証情報はチャットの外に。
- N2の復元された地図（`PROJECT.md`、`docs/SEMANTIC_TREE.md`）と `docs/DISCREPANCIES.md`。
  監査人が既に書かれていることを再発見しないためです。
- 「ブロックする」が何を意味するかについてのあなたの基準：一般には、露出した秘密、プログラム
  から操作できない画面、繰り返せないデプロイ、バックアップの不在、そしてデータを損なうか
  過剰に請求しうるもの。渡せるように二行で書いておくこと。
- 受け入れられる最低限の状態：監査人は読み取り専用を持ち、あなたが何をブロックすると考えて
  いるかを知っています。

**最初の：**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first.
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
> このシステムを、完全性、セキュリティ、性能、コードの品質、デプロイ可能性について監査して
> ください。その進化の前と最中に正常化しなければならないものの棚卸しとして。読み取り専用：
> `docs/AUDIT_[fecha].md` に報告書を書く以外、何も変えないでください。どこかの部分を監査する
> のに手元にないアクセス（データベース、ログ、サーバー）が必要なら、私に言ってその部分を
> 未監査と印してください。良しとして通さないでください。見本ではなくコード全体を辿り、
> 既に分かっていることを報告しないよう、先に `docs/SEMANTIC_TREE.md` と
> `docs/DISCREPANCIES.md` を読んでください。各発見について：どこにあるか（ファイルと行）、
> リスク、それを証明する証拠（コマンド、クエリ、数字）、その優先度（P0は今すぐ直すべき、
> P1は間もなく、P2はできるときに）、そしてもう一つの項目：それがブロックするか（どんな変更
> よりも前に直さなければならない。私の基準では：[基準]）、触れたときに払うか（そのモジュール
> に入る最初の変更と一緒に直す）、それとも待てるか。監査した各次元に評点を付けてください。
> 各発見を提案された保留項目に変えて終えてください。ブロックするものを先に。私の言語で答えて
> ください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

求めているのは、第13段の監査に「デプロイ可能性」の次元を加えたもの（レガシーではデプロイが
最初の問題であることが多いから）と、速度の項目だ。それが報告書を計画に変える：その項目が
なければ、監査されたレガシーには四十の発見があり、どれから始めるか誰も分からない。何が
ブロックするかの基準は監査人ではなく私が与える。業務上の帰結に依存するからだ。

**締めの：** 第13段の締めのプロンプトを、構築者に、一つ付け加えて：開く保留項目は発見の速度の
印を帯びる。

検証：報告書は何を監査*できなかった*かを言っているか？ 「ブロックする」と印された発見が
少なくとも一つあるか？（レガシーには常にある。なければ、監査人は秘密もデプロイも見ていない。）
無作為に選んだ二つの発見に、ファイル、行、再現できる証拠はあるか？ 警告サイン：すべてが
「待てる」にある。それは迷惑をかけたくない監査人だ。

---
### N4 — 安全ベルト

- **意図**：システムの周りに、その機能に触れずに、それを変えても安全にするものを存在させる：
  実データに似たデータを持つテスト環境、繰り返せるデプロイ、コードの外に出した秘密、あるもの
  を走らせる継続的インテグレーション、そして重要なフローの**特性化テスト群**。第4段と第15段の
  前半、そして第8段の反転した形を、まとめて、どんな変更よりも前に行う。**硬いゲート**だ：
  安全ベルトが緑になるまで、機能の一行も変えない。
- **いつ**：N3の後、いかなる変更よりも前に。
- **入力**：環境の調査（N2で復元され、あなたが確認したもの）、ブロックする発見を持つN3の
  報告書、プロセスを持つセマンティックツリー、そしてサーバーとデータベースへのアクセス。
- **成果物**：匿名化されたデータで動いているテスト環境。テスト環境へのデプロイを二度繰り返した
  `docs/DEPLOYMENT.md`。サーバーの設定へ移されローテーションされた秘密。緑の継続的
  インテグレーション。`docs/GATES.md`。そして緑の特性化テスト群、各フローについて赤を実証
  済みのもの。
- **ゲート**：あなたが見た、テスト環境で動いているシステムのスクリーンショット。変更なしの
  デプロイの二度目の実行。リポジトリでの秘密の検索が空。特性化テスト群が緑で、各テストが
  ミューテーションで赤になることを証明済み。
- **誰が決めるか**：オーナーが、どのフローが重要かと、データの匿名化について。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- `docs/ENVIRONMENTS_SURVEY.md`。エージェントがN2で印付きで起草し、あなたが完成させたもの：
  今日どこで動いているか、今日どうデプロイしているか（「FTPでファイルをコピーしている」でも
  構いません）、秘密はサーバーのどこに住むことになるか、誰がアクセスを持つか、そしてテスト
  環境はどこで動くことになるか（別のサーバー、コンテナ、クラウドのアカウント。何もなければ
  そう言えばエージェントが最も単純なものを提案します）。プロンプトはそれを「the environments
  survey」と呼びます。どこにあるか伝えてください。
- 本番サーバーへのエージェントの読み取り専用アクセス（データベースと設定をコピーするため）
  と、テスト環境が動く場所への書き込み権限。認証情報はチャットの外に。
- テストデータの**匿名化**についてのあなたの決定：どの項目が個人データか（氏名、電話、
  メール、身分証）、どう置き換えるか。法律上の義務であって技術的な好みではないので、決める
  のはあなたです。
- 特性化のための**重要なフロー**の一覧。セマンティックツリーのプロセスをもとにあなたが
  書くもの：意図せず変わったら、業務にお金か信頼を失わせるもの。小さいシステムで四つから
  八つ。「全部」ではありません：全部はゼロと同じです。
- `docs/AUDIT_[fecha].md`（N3）。エージェントがどんな秘密を見つけ、どの画面が操作できないかを
  知るために。
- 少なくとも一度復元された本番のバックアップ。あなたのマシンの上でも構いません。エージェント
  がサーバーに触れる前に。N0の条件がここで期限を迎えます。
- 受け入れられる最低限の状態：テスト環境がどこで動くか分かっていて、重要なフローの一覧が
  あり、匿名化を決め、バックアップを復元しました。

**環境、デプロイ、秘密のための：**

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
> スクリーンショットを撮って私に見せてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、既に存在するものの周りに築く第4段の骨組みだ。第15段の半分を前倒しして
（秘密を外へ、デプロイを文書化）。レガシーではコードの中の秘密が例外ではなく規則だからだ
[Ref. 42](REFERENCIAS.md#ref-42)。匿名化を細部ではなく環境の一部として。そしてテスト群が
存在する前にゲートを書いて、テスト群が生まれたときから既にゲートであるように。

**プロンプトを送る前に**（テスト群のプロンプト）：匿名化されたデータとともにあなたが開いた
テスト環境。一覧の秘密を今日ローテーションしたこと。プロンプトの穴のための重要なフローの
一覧。そしてN0が赤の画面を残していたなら、それを操作可能にするブロックする保留項目を、この
テスト群の前か一部として閉じておくこと。

**特性化テスト群のための：**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says.
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
> この重要なフローの特性化テストを書きます：[一覧]。特性化テストは、システムが今日している
> ことを、している通りそのままに、欠陥も含めて捉えます。システムがすべきことのテストでは
> ありません。各フローについて：ユーザーがするように画面から操作し、バックエンドでの効果
> （行、状態、キューに入ったメッセージ）を確認してください。すべてのテストが現在のコードに
> 対して通らなければなりません。その後、各テストが本当に自分のフローを見張っていることを
> 証明してください：一時的な変更でわざとフローを壊し、赤の出力を私に見せ、変更を戻し、緑を
> 私に見せてください。画面から操作できないフローがあれば、模擬しないでください：そう言って、
> ブロックすると印した保留項目を開いてください。これらのテストを書いているあいだに誤って
> いそうな挙動を見つけても、直さないでください：証拠とともに `docs/DISCREPANCIES.md` に
> 加えてください。テスト群を走らせるコマンドを `docs/STATUS.md` に記録し、`docs/GATES.md` が
> 言う通り、テスト群をテスト環境のゲートにしてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、第8段を裏返したものだ。新規プロジェクトではテストは赤で生まれ、変更とともに
緑になる。ここではテストは緑で生まれる。あるものを捉えるからだ。そして役に立つことの証明は、
**わざとフローを壊したときに赤になる**ことだ。そのミューテーションの実証がなければ、特性化
テストは何も見ていないから通るテストであり、それはバグを隠す緑と同じ問題だ
[Ref. 44](REFERENCIAS.md#ref-44)。そして二つの規律の条項：操作できないものは申告されブロック
する。悪く見えるものは食い違いとして書き留められ、直されない。オーナーが決めるまでは、現在の
挙動が仕様だからだ。

完全性の検証：あなた自身がテスト環境のURLを開いて、データの入ったシステムを見たか？ その
データの中で本物の名前を探して、なかったか？ デプロイは二度走り、二度目は何も変えなかったか？
リポジトリでの秘密の検索を求めて、空で返ってきたか？ 一覧の秘密をそれぞれローテーション
したか？ 各重要なフローに自分のテストがあり、各テストにミューテーションによる赤が見えて
いるか？ 警告サイン：特性化テスト群が「一発で」全部通り、赤が一度も示されなかった。テスト
環境が「エージェントのマシンの中」で動いていて、あなたが開ける場所ではない。テストデータが
匿名化されたコピーではなく「いくつかの見本のレコード」だ（レガシーのバグは実データの中に
住んでいて、見本のデータの中にはいない）。

---

### N5 — コードからの錠と生産者・消費者の地図

- **意図**：何かを変える前に、システムのうち世界へ作用するもの（請求する、送る、承認する、
  削除する、知らせる、夜に独りで走る）が何かと、部分と部分のあいだの各契約を誰が生産し誰が
  消費するかを知る。新規プロジェクトではこれを構築の前に決め（第14段）、構築するにつれて
  地図にする（第11段）。レガシーでは既に構築されていて、誰もそれを丸ごと覚えていない。進化の
  変更は眠っていた帰結のある行動を目覚めさせかねないし、修正の変更は消費者を時代遅れのまま
  残しかねない。
- **いつ**：安全ベルトの後。行動を棚卸しするには、間違えても高くつかない場所で
  システムを走らせられる必要があるからだ。
- **入力**：コード、データベース、サーバーの定期処理、セマンティックツリー、そしてリポジトリ
  の外に住むものの一覧。
- **成果物**：出所の印付きの `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`、
  `docs/PRODUCER_CONSUMER_MAP.md`、そして締めの後に、今行く錠と後で行く錠を記した
  `docs/LOCKS.md`。
- **ゲート**：オーナーの判定のない帰結のある行動がない。「今」と印された錠が、最初の
  ブロックの前に、赤のテストとともに実装されている。
- **誰が決めるか**：オーナーが、錠を一つずつ。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- オーナーとともに、システムが外へ向けてすると業務が**知っている**ことの書かれた一覧：何を
  請求するか、何を送るか、誰に知らせるか、何を削除するか、何が独りで走るか。
  `docs/INITIAL_SURVEY.md` の一節に入ります。エージェントは業務が覚えているより多くのものを
  コードの中に見つけます。二つの一覧の比較が結果です。
- サーバーの定期処理（定期タスクの一覧、またはあなたのプラットフォームの同等物）への
  エージェントのアクセス。自動の送信はコードではなくそこに住んでいることが多いからです。
- リポジトリの外に住むものの一覧（N2）、地図のために。
- N4のテスト環境が動いていること。実際の帰結なしに行動を発火させて何が起きるか見られる
  ように。
- 受け入れられる最低限の状態：業務が自分の一覧を書き、エージェントが定期タスクを見られます。

**最初の：**

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
> module is touched. Do not implement anything yet: I confirm lock by lock.
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
> 錠を一つずつ確認します。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、第14段と第11段の棚卸しを一周で行うことだ。同じコードを辿るからだ。業務が
覚えていることとコードがすることの比較、そこに誰も覚えていなかった送信が現れる。そして各錠
についての**今か、触れたときか**の提案、それは二つの速度のルールを保護に当てはめたものだ：
請求する行動の上の錠は今行く。月次の書き出しの上の錠は、そのモジュールに触れるブロックまで
待てる。

**締めの：** 第14段の締めのプロンプトを、「今」と印された錠とともに。それぞれ錠のない
バージョンに対する赤のテスト付きで。残りは印とともにバックログに残る。

警告サイン：エージェントが業務の列挙したのとまったく同じ行動を見つけた。レガシーでそんな
ことは決してない。定期タスクかデータベースのトリガを見ていない。

---

### N6 — 実数でサイジングする

- **意図**：第3段を、ただしレガシーの大きな利点とともに：一次のデータは聞く必要がない。
  データベースとログの中にある。第7段（テスト付きの計器、二方向で監査されたもの）で計測し、
  オーナーはどこにもないものだけを提供する：どれだけ成長すると見込むか、そしてシステムを
  他に売るのか。
- **いつ**：N5の後、最初のブロックを開く前。
- **入力**：読み取り専用の本番データベースまたは完全なテストのコピー、ログ、エンティティを
  持つセマンティックツリー。
- **成果物**：各数字に`[データベース]`または`[ログ]`の印とそのコマンドを付けた
  `docs/VOLUME_SURVEY.md`。テスト付きでリポジトリに住む計器。そして「十倍」と、進化の前に
  取っておくとよい非対称な決定を記した `docs/SIZING.md`。
- **ゲート**：計器のない一次の数字がない。あなたがやり直して一致した計算が一つある。
- **誰が決めるか**：オーナーが、見込む成長と非対称な決定について。

**プロンプトを送る前に**、これを手元に持っていなければなりません：

- 本番データベース（または、匿名化が日付も数量も触っていないなら、N4の完全なコピー）と
  アクセスまたはアプリケーションのログへの読み取り専用アクセス。認証情報はチャットの外に。
- 業務だけが持つ二つの答えを書いたもの：今後二年でどれだけ成長すると見込むか、そして
  システムが一か所より多くで使われるか（「十倍」）。
- 各計器のテストのための既知の事例：例えば、あなたが手で数えられる小さいテーブルのレコード数。
- 受け入れられる最低限の状態：エージェントがデータベースを参照でき、あなたは二つの答えを
  持っています。

**最初の：**

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
> cheap today and expensive later. Do not change any code.
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
> 今どんな非対称な決定を取るか。コードは何も変えないでください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、聞く代わりに計測することだ。それはレガシーが許し、新規プロジェクトが許さ
ないことだ。テスト付きの計器と第7段の二方向の監査。計器は嘘をつくからだ
[Ref. 35](REFERENCIAS.md#ref-35)、[Ref. 36](REFERENCIAS.md#ref-36)。そして進化の前のゲート
としてのサイジング [Ref. 14](REFERENCIAS.md#ref-14)：現在のアーキテクチャが「十倍」に耐え
ず、顧客の依頼がまさに成長することなら、それは三番目のブロックではなく今分かる。

**締めの：** 第3段の締めのプロンプトを、耐えないものについて提案された選択肢から選ぶか、
現在のもので耐えると確認して。

警告サイン：近似と印されていない「おおよそ」の数字。データベースにあるなら測る。なければ
聞く。三つ目の選択肢はない。

---

### N7 — 顧客の依頼と対にした正常化のバックログ

- **意図**：完全な仕様を持つ保留項目の一つのキュー。そこに負債（監査から出たもの、食い違い、
  操作できない画面、未実装の錠、サイジングの決定）と顧客の依頼（修正すべきことと追加すべき
  こと）が同居し、それぞれが速度の印を持ち、モジュールごとに対になっている。二つの列を
  加えた第5段だ。
- **いつ**：区間の締めに。その後はループ。
- **入力**：`docs/AUDIT_[fecha].md`、決定を書き込んだ `docs/DISCREPANCIES.md`、
  `docs/LOCKS.md`、`docs/SIZING.md`、セマンティックツリー、そしてこの段階に対する顧客の依頼。
- **成果物**：すべての保留項目が仕様付きで、「ブロックする／触れたときに払う／待てる」と
  「修正／進化／正常化」の印付きで、モジュールごとの対とともに書かれた `docs/PENDING.md`。
- **ゲート**：最初のブロックの前に「ブロックする」と印された保留項目が一つも開いていない。
  顧客の各保留項目に、一緒に入る正常化の保留項目が列挙されている。
- **誰が決めるか**：オーナーが、順序について。

**プロンプトを送る前に**、これが存在しなければならず、作るのはあなた（またはあなたと業務）
であってエージェントではありません：

- この段階に対する顧客の依頼を、散文で、顧客の言葉で、二つの一覧に分けて：**今日失敗して
  いる**こと（それぞれ、業務によればどう再現するか、何が起きるか、何が起きるべきか）と、
  **足りない**こと（新しいもの）。`docs/blocks/STAGE_01_REQUEST.md` でも好きな場所でも
  構いません。プロンプトは「the client's request for this stage」と言うので、どこにあるか
  伝えてください。オーナーが優先順位を出したなら、それも。
- N2からN6までのすべての成果物が締め済みであること：ツリー、監査、決定済みの食い違い、錠、
  サイジング。どれかが欠けているならこのプロンプトを開かないでください：バックログが不完全に
  出てきて、何が足りないのか分からなくなります。
- 既に存在するブロックする保留項目（N0、N3、N4のもの）が閉じているか、日付付きで進行中で
  あること。
- 受け入れられる最低限の状態：顧客の依頼がその言葉で二つの一覧になっていて、前のステーション
  の成果物が存在します。

**最初の：**

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
> normalization.
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
> 私が与えた優先順位で、それぞれ対になった正常化とともに。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、完全な第5段（詳細な仕様は各保留項目の中に住む。正常化のものにも）に、この道
を成り立たせる二つの印を加えたものだ。速度は各負債をいつ払うかを言い、種類はどう閉じるかを
言う（修正は失敗を再現するテストで閉じ、進化は第8段のテストで閉じる）。そして**モジュール
ごとの対**、これは「触れたときに払う」のルールを運用可能にしたものだ：「手付金」のブロックを
開くとき、支払いモジュールの正常化の保留項目が一緒に入り、それより前でも後でもない。

**締めの：** 第5段の各セッションのルーチンを、変更なしで、共働の約束の中に。

完全性の検証：「ブロックする」が開いたまま残っているか？ ならば最初のブロックは開かない。
各修正は顧客の言葉で再現の仕方を言っているか？ 顧客の各保留項目には、たとえ空でも対の一覧が
あるか？ 警告サイン：バックログに「待てる」の正常化の保留項目が五十を超えている。それは記録
された負債ではない：一覧に変装した書き直しだ。決して払われないものは保管庫へ送って、そう言う
こと。

---

## 受け継いだシステムの上のループ：修正モードと進化モード

N7を終えると、道ははしごと合流する：第5段から第12段を保留項目ごとに登る。新規プロジェクトと
同じく、同じ契約と同じプロンプトで。だが一節を割く価値のある二つの機微がある。それは
「方法でレガシーに触れる」を「注意深くレガシーに触れる」から区別するものだからだ。

### 修正モード：赤は自然なもの

修正の保留項目はバグだ：今日失敗していて、顧客がそれを知っている。新規プロジェクトの第8段
では赤は作り出される（テストを書き、古いコードに対して走らせ、失敗するのを見る）。修正では
赤は**バグそのもの**だ：失敗を再現するテストを、報告したユーザーのように画面からフローを
操作して書き、それが現在のコードに対して失敗しなければならない。失敗しないなら、報告された
バグを再現していない。別のものを再現したのだ。その赤は正しいものを直していることの証明で
あり、「起きているに違いないこと」についてのエージェントのどんな説明よりも価値がある。根本
原因まで四ラウンドかかった事例 [Ref. 22](REFERENCIAS.md#ref-22) が、書かれた再現なしには
各ラウンドが別々の症状を直すのだと私に教えた。

**プロンプトを送る前に**、これを手元に持っていなければなりません：

- `docs/PENDING.md`（N7）の中の修正の保留項目。顧客の言葉による再現の仕方付きで：何をして、
  何が起きて、何を期待していたか。顧客が再現の仕方を知らないなら、まず事例（レコード、日付、
  スクリーンショット）を手に入れること。再現なしにテストはなく、テストなしに締めはありません。
- テスト環境で緑の特性化テスト群（N4）、コマンドは `docs/STATUS.md` に。
- これと対になった正常化の保留項目、その保留項目の中に列挙されていること。
- 決める覚悟：根本原因が、誰も書かなかった業務ルールだったとき（よく起きます）、エージェント
  は止まって聞いてきます。誰かがその日のうちに答えなければなりません。
- 受け入れられる最低限の状態：テスト環境で手でバグを再現できます。

**修正の保留項目を閉じるための：**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts.
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
> この保留項目は修正です：[何が失敗するか、顧客の言葉で、そしてどう再現するか]。何かを変える
> 前に：(1) 画面からフローを操作してバックエンドでの効果を確認するテストで失敗を再現し、
> 現在のコードに対して失敗することを私に見せてください。その赤が、正しい欠陥を再現したことの
> 証明です。再現できないなら、何を試して何が必要かを私に言ってください。見えないものを直さ
> ないでください。(2) 根本原因を見つけ、直す前に、証拠とともに散文で私に言ってください。根本
> 原因が誰も書かなかった業務ルールなら、止まって私に聞いてください。(3) 痛むところではなく
> 根で直し、それ以外は何も：ほかに見つけたものは保留項目へ行きます。(4) テストが緑であること、
> 特性化テスト群がまだ緑であること、そして近隣の項目の回帰を私に見せてください。(5) 修正が、
> 誰かが依存しているかもしれない現在の挙動を変えるなら、はっきりそう言ってください：それは
> 副作用ではなく私の決定です。このモジュールの対になった正常化の保留項目を同じブロックで、
> それぞれ自分の証拠とともに閉じてください。コミットのメッセージには「[バージョン]に対して
> 赤で証明」とテストの数を書いてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

求めているのは、診断の**前の**再現だ。モデルは再現していないものをとても自信ありげに診断する
からだ。触れる前の散文による根本原因、あなたが的外れな修正を止められるように。根とそれだけ、
レガシーでは「ついでだから」が動いていたものを壊す最も多い形だからだ。システム全体の回帰と
しての緑の特性化。そして条項5、挙動の変更を決定に変えるもの。そして対：このモジュールの負債は
「後で」ではなく今、その証拠とともに払われる。

### 進化モード：特性化が回帰である

進化の保留項目は、存在するものの上の新しい何かだ。第5段のプロンプトで開き、第6段と第8段で
そのまま構築し、唯一の違いは「近隣の回帰」が何を意味するかだ：ここでは近隣はシステム全体で
あり、動いていたものが動き続けていると言うのは特性化テスト群だ。ルールがもう二つ。第一：
ブロックがあるモジュールに入るとき、そのモジュールの「触れたときに払う」と印された正常化の
保留項目が、自分の証拠とともに一緒に入る。二つの速度のルールだ。第二：新しいものは最初から
完全な方法とともに生まれる。つまり、保留項目の中の仕様、赤のテスト、エンドツーエンドの検証、
そして世界へ作用するなら錠とともに。レガシーが古いモジュールにしたことを、新しいモジュールに
してはいけない。

### 例外：本番の緊急

安全ベルトは硬いゲートであり、硬いゲートには書かれた例外が必要だ。書かなければ、夜の十一時に
何かが落ちた日に例外が発明されるからだ。例外はこれだ：本番が落ちているかデータを損なって
いて、安全ベルトがまだ完成していないなら、損害を止める最小限を、手での戻り道付きで、オーナー
に知らせた上で行う。そして**同じ日のうちに**修正の保留項目を開き、完全なルーチンで閉じる：
それを再現する赤のテスト、根本原因、回帰。ループへ戻ってこない緊急の修正は、利息付きで
取り立てられる負債だ。

**プロンプトを送る前に**、これを手元に持っていなければなりません：本当に緊急であることの
確認（本番が落ちているかデータを損なっている。「顧客がピリピリしている」ではありません）、
知らせたオーナー、そして戻る方法（N0のバックアップか前のバージョン）が手元にあること。

**緊急のための：**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green.
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
> これは本番での緊急の修正です：[何が起きているか]。損害を止める最小限を、ブランチの上で、
> デプロイする前にロールバックを用意した上で行い、正確に何を変えて何を検証しなかったかを私に
> 言ってください。ほかには何にも触れないでください。その後、今日のうちに、`docs/PENDING.md`
> に何が起きたかを記した修正の保留項目を開いてください。それを完全なルーチンで閉じます：
> それを再現する赤のテスト、根本原因、根での修正、特性化テスト群と回帰が緑であること。私の
> 言語で答えてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

求めているのは、最小限を、戻り道を後ではなく先に用意して、検証していないことの誠実な報告
（第12段）とともに。そして同じ日のうちにループへ戻る義務、それが例外を習慣から分けるものだ。

## レガシーにおける運用品質の六つの段（16から19、21と22）

主文書の第16段から第19段、第21段と第22段（可観測性とトレーサビリティ、永続化、脆弱性、性能、
そして二つの監視）は二つのユースケースに当てはまり、レガシーでは正確な場所を持つ。そのうちのいくつかは、正
常化の区間によって仕事の半分がもう済んでいるからだ：

- **16、可観測性とトレーサビリティ**：最低限のレベル（設定可能なレベルを持つ構造化された記録
  と、重要なフローにおける相関識別子）は安全ベルト（N4）に入る。それがなければ特性化のテスト
  群は何が壊れたかを言わないからだ。完全なレベルは、N5が棚卸しした帰結のある行動の不変の監査
  とともに、正常化の後の最初のデプロイの前に登る。
- **17、永続化**：計測はN6でもう済んでいる。そこから出るものはその印とともにバックログ（N7）
  に入る：業務の許容からもう外れているものは「ブロックする」か「今」。残りは「触れたときに払
  う」で、そのモジュールに触れるブロックと一緒に入る。
- **18、脆弱性**：最初の実行はN3の監査のセキュリティの次元であり、連鎖の中の走査は安全ベルト
  （N4）の一部だ。レガシーはほとんどいつも古い依存関係と履歴の中の秘密を持っているからだ。P0
  はブロックする。残りはバックログへ。
- **19、性能**：N6で計測した量で、ブロックするものについてはもう直された永続化の上で、正常化
  の後の最初のデプロイの前に走らせる。レガシーでは、破断点が業務の思っているより近いことを発
  見するのが普通だ。
- **21と22、監視**：新規プロジェクトと同じく最初のデプロイとともに組み立てる。違いが一つ：報告
  の最初の読みがレガシーの基準線であり、初日に既に存在していた逸脱とエラーは速度の印とともに
  保留項目になる。保留項目なしに「既知」のまま残るものは一つもない。

実際のところ、デプロイ前の四つは正常化のもう一つの段階であり、最初の進化のブロックの前に、
または依頼の急ぎ具合によってはそれと一緒に行う。そして二つの監視はデプロイとともに組み
立てる。

## システムが正常化されたと言えるのはいつか

完全にはならないし、それでいい：「触れたときに払う」と印された負債は何か月もかけて、
モジュールごとに払われ、「待てる」と印されたものは払われないまま終わることもあり、それは
言わなければならない。はっきりした瞬間を持つのは**区間の締め**で、それは最初のブロックを
開くときだ。その一覧がこれだ：

1. 復元される入力の表のすべての入力が出所の印付きで存在し、オーナーがツリーの`[推定]`の
   ノードをすべて確認した（N2）。
2. 各食い違いに日付付きの決定があり、システムを変えるものには保留項目がある（N2）。
3. 監査が存在し、各発見に速度の印がある（N3）。
4. 安全ベルトが緑：あなたが開いた、匿名化されたデータを持つテスト環境。二度走ったデプロイ。
   空の秘密の検索と、見つかったもののローテーション。緑の継続的インテグレーション。各重要な
   フローについてミューテーションによる赤を実証した、緑の特性化テスト群（N4）。
5. すべての帰結のある行動に判定があり、「今」と印された錠に赤のテストがある（N5）。
6. 一次の数字が計器とテストとともに計測されていて、「十倍」が書かれている（N6）。
7. 「ブロックする」と印された保留項目が一つも開いておらず、顧客の各保留項目に対のものが
   ある（N7）。
8. 共働の約束にレガシーの五つのルールがあり、新しいセッションが読み取りテストを通る
   （N1、N2）。

八つが「はい」なら、システムはこの道が要求するところまで正常化されていて、続くのはいつもの
はしごだ。主文書のフェーズ3と4（本番リリースと運用）はそのまま当てはまる：定期監査、
マニュアル（レガシーには存在しないことが多く、第20段であるがままのシステムから生成する）、
常駐エージェント、そして数字による振り返り。振り返りにはレガシー固有の質問が一つある：
正常化にいくらかかったか、そして「待てる」と印した負債のうち、結局同じだけ高くついたのは
どれか。

## 道全体の警告サイン

- エージェントが「理解するより書き直す方が簡単だから」とモジュールの書き直しを提案する。約束
  のルール7の違反だ。レガシーでは、理解することが仕事だ。
- 安全ベルトが中途半端なまま機能を変え始めた（「テスト群は後で終わらせよう」）。後では決して
  来ないし、テスト群なしの最初の変更こそが、誰も存在を知らなかったものを壊す。
- 食い違いの一覧が、オーナーが一つずつ決めないまま「業務の言う通りになるようコードを直して」
  解決された。それらの食い違いのいくつかは、業務が忘れてコードが覚えていたルールだ。
- 正常化のバックログが、払われる速さより速く育つ。印が間違っている：「触れたときに払う」に
  「待てる」ものが入っているか、負債を払わずに触れられているモジュールがある。
- サイジングの数字が「データベースが大きすぎて数えられないから」と推定から出てきた。大きい
  データベースはクエリで数える。それが計器だ。
- 緊急の修正がループへ戻らなかった。その月に何件あったか数えること。一件より多いなら、安全
  ベルトはゲートではなく飾りだ。

## 練り上げるべき残り `[仮説]`

1. N0の七つの前提条件は実際に行って検証されるので、較正可能だ：N0を通る各レガシーが証拠付き
   のシートを残す。足りないのは事例だ：どれだけのレガシーが各前提条件で落ちるのか、そして
   それを緑にする前段のプロジェクトがいくらかかるのか。もはや基準についての仮説ではない。
   まだ手元にない計算だ。
2. 特性化テスト群の大きさ：四つから八つのフローは小さいシステムで私にうまくいったものだ。
   大きいものでは、基準がフローごとなのか、モジュールごとなのか、かかっている金額ごとなのか
   分からない。
3. 大きいシステムで正常化がどう分割されるか：読み取り（N2）は丸ごと行うが、安全ベルト（N4）
   は各モジュールが触れられることになるのに合わせてモジュールごとに組まれ、硬いゲートは
   システムごとではなくモジュールごとに硬くなるのだろうと疑っている。試してはいない。
4. 方法を中途半端に使ってモデルが構築したレガシー（契約はあるがテストはない）はどうなるか：
   この道を丸ごと辿るのか、近道があるのか。私の直感は、近道はなく、近道こそがまさに誤りだと
   いうものだが、直感でしかない。
