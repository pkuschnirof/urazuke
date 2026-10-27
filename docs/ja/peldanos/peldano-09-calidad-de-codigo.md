# ステップ 9 — 機械で検証されるコードの品質、ゲート付きで（段の契約）

**区間：** ループ。
**いつ：** 一度だけ、最初の機能ブロックを開くとき（立ち上げが終わった直後）に組み立て、それ
以降は各コミットで独りで走る、継続的インテグレーションのゲートとして。各保留項目は品質が緑の
状態で閉じる。赤のテスト（8）の後、手動テストケース（10）の前に。各ブロックの締めと各デプロ
イの前に、品質の報告をオーナーと読む。レガシーでは、最初の実行が基準線であり、発見は速度の印
とともにバックログに入る。
**形式：** 組み立てるのに一回の送信。その後は各変更のルーチンとブロックごとの読み。
**規模：** すべてのプロジェクトで最低限のレベルは必須（リンタ一つと連鎖の中の大きさの上限
一つ）。利用者のいるプロジェクトでは、ミューテーションテストを含めて完全版。ミューテーショ
ンテストが任意の補強のままなのは、実際の利用者がいないとき（内部ツール、他の誰も動かさない
試作品）だけだ。

## 何のためか

オーナーはコードを読まない。それがこの方法の要点だ。だがコードは存在し、誰か（次のエージェン
ト、次の開発者）がそれを保守することになる。そして今日動いて明日読めないコードは、三か月目に
取り立てられる負債だ。誰も読まないなら、**機械が見なければならない**。各コミットで、人間のレ
ビュアーが見るであろうものを計測し、上限を持つ数字に変える道具たちだ。私はそれを自分のすべて
のプロジェクトで、段として名付けないままやってきた。そして品質の監査は、二千行を超えるコンポ
ーネント一つと、一万行近いプロジェクトファイル一つを返してきた
[Ref. 41](../REFERENCIAS.md#ref-41)。どちらも、書かれた大きさの上限を通らなかっただろう。品
質の数字が悪化することを妨げる静的なラチェット [Ref. 35](../REFERENCIAS.md#ref-35) が、私が
この段に与える形だ。

機械で計測されるもの、重要な順に：コードが単一のスタイルを守ること（*リンタ*と*フォーマッ
タ*）。どの関数もどのファイルもある大きさを超えないこと。各関数の*複雑度*が上限の下に収まる
こと。重複したコードも死んだコードもないこと。依存関係が宣言され使われていること。テストの
*カバレッジ*が決して下がらないこと（ラチェット）。そして言語が許すなら、型が閉じること。この
どれも赤のテストの代わりにはならない。非の打ちどころのないコードが間違っていることはありう
る。これが防ぐのは、正しいが誰も二度と触れないコードだ。

そして、利用者のいるどんなプロジェクトでも任意の補強として扱うのをやめるもの：**ミューテー
ションテスト**だ。この文書の以前のバージョンでは「任意、推奨」のままにしていたが、この方法
への外部からの評価が矛盾を指摘してくれた。パートFは、私の知る限り、2026年の研究で証明する
テストと飾るだけのテストを見分けた唯一の指標がミューテーションだと言っている。だとすれば、
一つ余分な飾りのテストが誰かを傷つける、まさにその利用者のいるプロジェクトで、それを「完全
版」から外す意味がない。道具がコードにわざと誤りを植え（「より大きい」を「以上」に変える、一行を消す、条件を
反転させる）、テストを走らせる。テストが捕まえない誤りはどれも*生き残るミュータント*であ
り、捕まえた割合が得点だ。第8段の示された赤を補う尺度である：赤は、あるテストが今日の変更
を見張っていることを証明する。ミューテーションは、テスト群全体がどれだけ見張っているかを計
測する。そして私の知る限り、2026年の研究の中で、証明するテストと飾るテストを区別した唯一の
尺度だ（主文書のパートF）。

**初心者の方へ。** *リンタ*とは、コードを読んで、まずく書かれたものや危険なものを印す
プログラムです（使われない変数、いつも同じ結果になる比較）。ワープロのスペルチェッカーの
ようなものです。*フォーマッタ*はそれを単一のスタイルに整えます（字下げ、空白）。すべての
コードが同じ手で書かれたように見えるようにです。関数の*複雑度*とは、その関数がいくつの
異なる経路を取りうるかです（「もし」が一つ増えるたびに増えます）。四十の経路を持つ関数は
誰にも理解できません。*重複したコード*とは、同じ塊が二か所に写されていることです。片方を
直した日に、もう片方が間違ったまま残ります。*カバレッジ*とは、コードの何パーセントが何らか
のテストで実行されるかです。そして*ラチェット*とは、良くなる方向にしか動かさない仕組みで
す。今日の数字が明日の床になります。*ミューテーションテスト*とは、一度に小さな変更を一つ
ずつ、コードをわざと壊してみて、どれかのテストが気づくかを見るプログラムです。どれも気づか
なければ、そのコードの断片は見張られていません。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 各プッシュで走る継続的インテグレーション（第4段）。
- 最初の機能ブロックが開いていて、少なくとも一つの保留項目が構築済みであること：コードがなけ
  れば計測する品質もありません。
- 上限についてのあなたの決定、またはエージェントが理由とともに提案するものを受け入れる用意。
- 以前の監査（13、レガシーではN3）、あれば。

## 2. プロンプト

**最初（ゲートを組む）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- 各プッシュで走る継続的インテグレーション（第4段）と、残っているクォータがどれだけか：品質
  の検証は分数を足します。
- 最初のブロックの保留項目が少なくとも一つ、第8段で構築され閉じられていること。空の骨組みで
  はなく、本物のコードを計測するためです。
- 二つの上限についてのあなたの決定、一行で書いたもの：一ファイルと一関数の最大の大きさ（まず
  は三百行と四十行）、そしてカバレッジが上がることしかできないかどうか。その他はエージェント
  が提案し、あなたが承認します。
- レガシーでは：`docs/AUDIT_[日付].md`（N3）。エージェントが既知のものを報告せず、最初の実行
  が基準線になるように。
- 最低限受け入れられる状態：連鎖が走っていること、閉じた保留項目のコードがあること、そして二
  つの上限を書いたこと。

> We are going to make the code quality verified by machine, because nobody is going to read the
> code. Set up, in continuous integration, on every push: (1) a linter and a formatter with one
> configuration for the whole repository, failing the build on any violation; (2) limits on the
> size of every file and every function ([file lines] and [function lines]) and on the complexity
> of every function, failing the build when exceeded; (3) detection of duplicated code and of dead
> code (unused functions, variables, imports, dependencies); (4) a test coverage report with a
> ratchet: the measured coverage of today becomes the floor, and the build fails if it drops; (5)
> type checking if the language allows it. Run all of it now on the current code and write
> `docs/CODE_QUALITY.md` with: the tools, the configuration, every limit with its current measured
> value, and the list of what fails today with where it is. Do not fix anything yet: what fails
> today becomes pending items, and I decide which limits apply now and which are raised with a
> date. Make the whole set a gate in `docs/GATES.md`: nothing is merged with quality red.
>
> Extend this gate to the screen frontier, as Annex H section 4 declares: no
> business rule inside a screen, one typed client for every server call, one
> home for shared state, no user-visible string outside the translation
> catalogue, a stable identifier and role on every interactive element,
> styling only through tokens, and automatic basic accessibility checks.
> Every rule carries its stable id, its severity and its named verifier; the
> thresholds and the exceptions are declared by me in the project
> configuration file, and a rule switched off with no written exception is a
> failure of the gate, not a decision. `docs/CODE_QUALITY.md` and
> `docs/USABILITY.md` report result by result, never as a single number. The
> catalogue is `docs/ANEXO_HEURISTICAS.md`: cite it, do not copy it.
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
> コードの品質を機械で検証されるようにします。誰もコードを読まないからです。継続的インテグ
> レーションの中に、各プッシュで走るものとして、次を組み立ててください：(1) リポジトリ全体
> に単一の設定を持つリンタとフォーマッタ。どんな違反でもビルドを失敗させること。(2) 各ファ
> イルと各関数の大きさ（[ファイルの行数]と[関数の行数]）、および各関数の複雑度への上限。超
> えたらビルドを失敗させること。(3) 重複したコードと死んだコード（使われない関数、変数、
> インポート、依存関係）の検出。(4) ラチェット付きのテストカバレッジ報告：今日計測された
> カバレッジが床になり、下がったらビルドが失敗すること。(5) 言語が許すなら型の検査。これら
> すべてを今、現在のコードの上で実行し、`docs/CODE_QUALITY.md` に次を書いてください：道具、
> 設定、各上限とその現在の計測値、そして今日失敗しているもののリストとその場所。まだ何も直
> さないでください。今日失敗しているものは保留項目になり、どの上限を今すぐ適用し、どれを日
> 付付きで引き上げるかは私が決めます。この一式全体を `docs/GATES.md` のゲートにしてくださ
> い：品質が赤のものは何もマージされません。
>
> この掛け金を画面の境界まで広げてください。付録Hの第4節が宣言しているとおりです：画
> 面の中に業務ルールを置かない、サーバー呼び出しごとに型付きの単一クライアント、共有状
> 態の置き場所は一つ、翻訳カタログの外に利用者に見える文字を置かない、すべての操作要素
> に安定した識別子とロール、スタイルはトークン経由のみ、基本的なアクセシビリティの自動
> 検査。各ルールは安定したID、重大度、名前のある検証者を持ちます。しきい値と例外は私
> がプロジェクトの設定ファイルで宣言し、書面の例外なしに切られたルールは掛け金の故障で
> あり、判断ではありません。`docs/CODE_QUALITY.md` と
> `docs/USABILITY.md` は結果ごとに報告し、決して一つの数値にはしま
> せん。カタログは `docs/ANEXO_HEURISTICAS.md` です：引用
> し、コピーしないでください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：人間のレビュアーが行うであろう五つの検証を、機械が行い、ビルドの赤を帰結と
して持つこと。止めない検証は助言にすぎないからだ。計測値付きの上限。上限が意見ではなく数字か
ら出るように。カバレッジのラチェット。品質が独りでに劣化しないようにする部品だ。そして**まだ
何も直さないこと**。すでにコードが書かれたシステムでは最初の実行は必ず赤になり、何を今直し何
を日付付きで許容するかの決定は私のものだからだ。

**ルーチン（共働の約束に入る）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- あなたが読んだ `docs/CODE_QUALITY.md`：各上限と、それがなぜそこにあるかを理解していますか。
- 今日失敗しているもののリストについてのあなたの決定：何を今直し（それぞれ一つの保留項目）、
  何を日付付きで許容するか。同じファイルに書いたもの。
- `docs/WORKING_AGREEMENT.md`。ルーチンはそこに入ります。
- 最低限受け入れられる状態：ゲートが緑であるか、各赤に保留項目か日付があること。

> Every pending item is closed with the quality gate green: linter, formatter, size and
> complexity limits, no new duplication, no dead code, coverage at or above the ratchet. A quality
> failure is fixed in the same commit, never silenced with an exception, and a limit is never
> raised to pass; if a limit must change, say so with the reason and I decide. At the close of
> every block, show me `docs/CODE_QUALITY.md` with the numbers of the block against the previous
> one.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> すべての保留項目は品質のゲートが緑の状態で閉じます：リンタ、フォーマッタ、大きさと複雑度
> の上限、新しい重複なし、死んだコードなし、カバレッジはラチェット以上。品質の失敗は同じ
> コミットで直し、決して例外で黙らせず、通すために上限を引き上げることも決してしません。
> 上限が変わらなければならないなら、理由とともに言ってください。決めるのは私です。各ブロッ
> クの締めに、そのブロックの数字を前のブロックと対比した `docs/CODE_QUALITY.md` を見せて
> ください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：品質が別の作業ではなく各保留項目の締めの一部であること。黙らせることの禁止
（赤のリンタを前にしたモデルは、直すより速いので例外を足す方へ傾く）と上限を引き上げることの
禁止。そしてブロックごとの読み。あなたが数字を見る唯一の瞬間だ。

**利用者のいるどんなプロジェクトでも必須（実際の利用者がいないときだけ任意）：ミューテーショ
ンテスト。**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- 組み立てられて緑になっている品質のゲートと、`docs/CODE_QUALITY.md` に計測されたカバレッ
  ジ。
- 第8段で閉じられた機能ブロックが少なくとも一つ。ミューテーションにかけるテストがあるよう
  にです。
- 範囲についてのあなたの決定、一行で書いたもの：コード全体（高くつき、基準線として一度だけ
  意味がある）か、各保留項目で変更された行だけ（これが普通）か。
- 最低限受け入れられる状態：計測されたカバレッジがあり、閉じたブロックがあること。

> Add mutation testing to the quality gate, [on the whole codebase | only on the lines changed by
> each pending item]: a tool that plants small deliberate bugs in the code (a flipped condition, a
> deleted line, a changed operator) and runs the tests. Run it now and write in
> `docs/CODE_QUALITY.md`: the tool, the scope, the number of mutants planted, how many the tests
> killed, how many survived and where. Do not fix anything yet: every surviving mutant in code
> that matters becomes a pending item for a test that catches it, and I decide which ones matter.
> From now on, report the mutation score at the close of every block next to the coverage, and
> treat a drop as a quality failure.
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
> 品質のゲートにミューテーションテストを加えてください。[コード全体に | 各保留項目で変更
> された行だけに]：コードに小さな誤りをわざと植え（反転した条件、消された行、変えられた演
> 算子）、テストを走らせる道具です。今それを走らせ、`docs/CODE_QUALITY.md` に次を書いてく
> ださい：道具、範囲、植えたミュータントの数、テストがいくつ殺したか、いくつ生き残ったか、
> そしてどこで。まだ何も直さないでください。重要なコードの中で生き残ったミュータントはそれ
> ぞれ、それを捕まえるテストのための保留項目になり、どれが重要かは私が決めます。これ以降、
> 各ブロックの締めにミューテーションの得点をカバレッジの隣に報告し、低下を品質の失敗として
> 扱ってください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：カバレッジが与えない尺度（カバレッジはどのコードが実行されたかを言い、
ミューテーションはどのコードが見張られているかを言う）。変更された行に絞った範囲。各保留項
目でその費用を払えるようにするものだ。**まだ何も直さないこと**。どのミュータントが重要かを
決めるのは私だからだ。そして各ブロックの締めの得点を、カバレッジの隣に、低下は赤として扱っ
て。

## 3. 期待される成果物

- リンタ、フォーマッタ、上限、重複と死んだコードの検出、ラチェット付きのカバレッジ、型が、各
  プッシュで走り、該当するときは赤になること。
- `docs/CODE_QUALITY.md`：道具、設定、計測値付きの上限、そして失敗しているもののリストと、そ
  れぞれの保留項目か日付。
- `docs/GATES.md` のゲートと、約束の中のルーチン。
- 利用者のいるどんなプロジェクトでも：`docs/CODE_QUALITY.md` のミューテーションの得点、ブロ
  ックごとに、カバレッジの隣に。そして重要なコードの中で生き残ったミュータントごとに一つの
  保留項目。

## 4. 完全性の検証（あなたが行う、コードを読まずに）

- 連鎖の最後の実行へのリンクを求めること：品質は緑か。
- ブランチの中に、百行の関数一つと使われない変数一つをわざと入れてもらうこと：連鎖は二つとも
  で赤になるか。
- 今日のカバレッジは前のブロックの締めのもの以上か。二つの数字を求めること。
- コードの中にリンタへの例外はあるか。そのリストを求めること。それぞれに書かれた理由がなけれ
  ばなりません。
- 最初の実行から引き上げられた上限はあるか。どんな理由で、誰が決めたのか。
- プロジェクトに実際の利用者がいるなら：ミューテーションテストは走っているか。走っていなけれ
  ば、持たない理由がどう書かれているか。
- ミューテーションテストがあるなら：最後のブロックで生き残ったミュータントはいくつで、それ
  ぞれに保留項目か書かれた理由があるか。

## 5. 警告サイン

- すでに書かれたコードの上で品質が一発で緑になった。ほとんどの場合それは本当ではない。上限が
  緩すぎる。
- エージェントが「このルールは厳しすぎるので無効にしよう」と提案する。ときには正しい。だが常
  にあなたを通り、理由が書かれなければならない。
- 何も証明しないテストを足したのでカバレッジが上がる（バグを隠す緑、第8段）。ラチェットは量を
  計測し、示された赤は質を計測する。両者は一緒に行く。
- ファイルが上限まで育ち、同じ内容の二つのファイルに割られた。遵守を装った重複だ。
- カバレッジは高いのにミューテーションの得点は低い。何も検証せずにコードを実行するテスト
  だ。第8段の示された赤が避けようとする、まさにその事例である。
- プロジェクトに実際の利用者がいるのに、誰もミューテーションテストを走らせず、その理由も
  書いていない。「任意だから」は、利用者のいるプロジェクトではもう有効な理由ではない。
