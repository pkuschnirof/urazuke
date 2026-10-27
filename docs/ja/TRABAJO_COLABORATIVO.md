# Urazuke — 共同作業：複数の開発者が、それぞれ自分のエージェントとともに、同じブランチの上で

著者：Pablo Kuschniroff、Claude Codeの支援による。第1版、2026年10月19日。この文書は
[主文書](ESCALERA_METODOLOGICA.md)を補うものだ：一人の人間と一つのエージェントではなく、
複数の開発者がそれぞれ自分のエージェントとともに、同じリポジトリと同じブランチの上で働く
とき、方法がどう適用されるかを言う。見慣れない言葉は主文書の用語集にある。公開リポジトリ：
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 問題を、回りくどくなく言う

方法は単数形で書かれている：オーナー、エージェント、保留項目。私の三つのシステムはそう作っ
た。一人の人間と一つのモデルで。だが方法を採用するチームには人間が一人ではない：三人、ある
いは五人いて、それぞれが同じコードの上に自分のエージェントのセッションを開いており、小さな
チームの大半では**同じブランチ**の上にいる。長命なブランチの森は、二週間分の作業が金曜日に
怒鳴り声とともに統合される最も確実な方法だからだ。共有ブランチの上で働くことはうまくやれる
し、業界は何年も前から知られたルールでそれをやっている（小さなコミットを一日に何度も統合
する、継続的インテグレーションを審判にする、中途半端な機能はスイッチの後ろに隠す）。方法に
よって変わるのは、それらのルールを守るのがもはや他人のコードを読む人間ではないということ
だ：互いを見ないエージェントたちが守るのであり、だから各エージェントが読む場所にルールを
書かなければならない。

ここに続くのがルールであり、その後にプロンプトだ。段は足さない：二十四のままだ。足すのは、
複数で同時に登るために各段が必要とするものだ。

**初心者の方へ。** *ブランチ*とは作業するコードの複製です。*共有ブランチ*（*main* または
*trunk* と呼ばれることが多い）は唯一重要なもので、デプロイされるものです。*統合する*とは
あなたの変更をそのブランチへ入れることです。*衝突*とは、二人が同じ行を変えて、道具がどちらが
正しいかわからなくなることです。*機能スイッチ*とは、コードがもう入っていても機能を消したま
まにしておける設定の鍵で、利用者に見せずに中途半端なまま統合できるようにするものです。そして
保留項目を*reclamar*（自分のものと宣言する）とは、他の誰にも取られないよう、そこに自分の名前
を書くことです。

## 共有ブランチの七つのルール

1. **保留項目が所有の単位だ。** `docs/PENDING.md` で自分の名前で宣言した保留項目なしには誰も
   働かない。そして一つの保留項目は一度に一人の所有者しか持たない。二人が同じモジュールに
   触れる二つの保留項目を同時に取ることはしない。避けられないなら、互いに知らせ、二人目は
   一人目が統合するまで待つ。エージェントはセッションを始めるとき、他人が宣言した保留項目を
   読み、それらに触れない。
2. **小さく、頻繁に統合する。** 一つの保留項目は、共有ブランチへ一日に何度も統合される変更に
   分けられる。決して週の終わりにではない。各統合の前に：他の人のものを取り込み、テスト群を
   丸ごと走らせ、その後で初めて上げる。一日で統合できない変更は切り方の悪い保留項目だ：切り
   直す。
3. **審判は継続的インテグレーションであって人間ではない。** 連鎖が赤のまま誰も統合しない。
   そしてある変更が「壊す」かどうかを誰も議論しない：それを言うのはテスト群、品質のゲート
   （9）、そしてレガシーなら特性化テストだ。共有ブランチを赤にした者が、他の何よりも先に
   それを直すか、自分の変更を戻す。
4. **中途半端なものはスイッチの後ろへ。** 一日を超える機能も同じように、設定で消した状態で
   統合する。スイッチは保留項目に書き留め、保留項目が証拠とともに閉じられたときに点ける。
   こうして誰も統合のために誰かを待たない。
5. **リストには一人の所有者しかおらず、それが誰かは地図が言う。** 生産者・消費者の地図（11）
   はチームの衝突検出器だ：部分と部分の間の契約に触れる前に、誰がそれを消費しているかを見、
   消費者を同じ変更の中で更新する。それが他人のものであっても。セマンティックツリー（2）は
   共有の地図であり、ノードを足した者が同じコミットでそれを変える。
6. **決定は名前とともに書かれ、全員に効く。** ある開発者がオーナーと決めた事業ルールは、
   その場で `docs/DECISIONS.md` へ行く。隣のエージェントがその日の午後にそれを必要とするの
   であり、推測はしてくれないからだ。共働の約束（1）はチームに一つだけだ。他人が読まない
   自分専用のルールを持つ者はいない。
7. **コードではなく証拠をレビューし、レビューするのは別の人だ。** 保留項目はその所有者が
   完全なルーチン（8、9、10、12）で閉じ、チームの別の人が報告を読んで閉じたと認める：赤、緑、
   回帰、品質、手動のケース。誰も自分の保留項目を自分で閉じないし、閉じるためにコードを読む
   者もいない。

そしてエージェントについてのルールが一つ。モデルのないチームと比べて本当に変わるのはこれだ：
**各エージェントは一人の人の名において働く**。自分自身のセッションの文脈を持ち、共有されるの
はリポジトリに書かれているものだけだ。ファイルの外に共通の記憶はない。だから生きた状態
（`docs/STATUS.md`）、保留項目、決定はその場で書かれる。「一日の終わりに」ではない：同僚の
エージェントは五分後にそれを読むのだから。

## チームでの段の分担

| 段 | 誰が登るか | チームで何が変わるか |
|---|---|---|
| 0から4、立ち上げ | 一人だけ、先導する人が、オーナーとともに。 | 一度、残りの人が入る前に行う。骨組み（4）には審判となるインテグレーションの連鎖が含まれ、ゲート（`docs/GATES.md`）には共有ブランチのものが含まれる。 |
| 1、約束 | 先導者が書き、全員が署名する。 | 上の七つのルールをルーチンとして加える。チームに一つのファイル。 |
| 5、保留項目 | 先導者がオーナーとブロックを開き、各自が宣言する。 | 保留項目は「宣言者」と「触れるモジュール」の欄を持つ。同じモジュールに触れる二つの保留項目は同時に宣言されない。 |
| 6、決定 | それを必要とする人が、オーナーとともに。 | その場で書く。一日の終わりにではない。 |
| 7から12、ループ | 各自が、自分のエージェントとともに、自分の保留項目の上で。 | 統合の前に：取り込み、すべて走らせ、上げる。中途半端なものはスイッチの後ろへ。報告（12）は別の人が読む。 |
| 9、品質 | 全員に単一の設定。 | リンタへの自分専用の例外を持つ者はいない。 |
| 10、手動テストケース | 保留項目の所有者が書き、別の人が実行する。 | その機能を構築しなかった人が、最もよくそれを試せる。 |
| 11、対称性 | 契約に触れる者が、誰のものであれ消費者を更新する。 | 地図が衝突検出器だ。 |
| 13、監査 | 構築したすべてのセッションとは別のセッション。 | チームでは容易だ：そのモジュールに触れなかった人が監査者になる。 |
| 14から20、リリース | 先導者が調整し、各段に責任者がいる。 | 一人が本番へ昇格させる。他の人はしない。 |
| 21から23、運用 | サイクルごとに監視の責任者を一人、持ち回りで。 | 周期報告はチーム全体で読む。そこから出る保留項目は他と同じように宣言される。 |

## プロンプト

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または
チームの先導者）で、エージェントではありません：

- `docs/WORKING_AGREEMENT.md`（第1段）、締められたもの、チームに一つだけ。メンバーの一覧と
  リポジトリ上のユーザー名とともに。
- `docs/PENDING.md`（第5段）。各保留項目に「宣言者」と「触れるモジュール」の欄があること。
  空でも構いません。
- 機能スイッチについてのチームの決定：どこで宣言するか（サーバーの設定、ファイル）、どう
  名付けるか。`PROJECT.md` に書いたもの。
- インテグレーションの連鎖（第4段と第15段）。テスト群と品質のゲート（9）を共有ブランチへの
  融合の条件として、リポジトリのプラットフォームで設定したもの（連鎖が赤では誰も上げられ
  ない）。
- 最低限受け入れられる状態：約束が一つあり、保留項目に二つの欄があり、プラットフォームが
  連鎖の赤いプッシュを拒否すること。

**共有ブランチのルーチン（共働の約束に入る）：**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it.
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
> 私たちは一つの共有ブランチの上でチームとして働きます。各人が自分自身のエージェントの
> セッションを持ち、共有される記憶はリポジトリに書かれているものだけです。ルール：(1) 各
> セッションの始めに `docs/STATUS.md`、`docs/DECISIONS.md`、`docs/PENDING.md` を読んで
> ください。他人が宣言した保留項目には決して触れず、他人が宣言した保留項目が触れるモジュール
> に触れるものを決して取らないでください。(2) 共有ブランチへの各統合の前に：他の人の変更を
> 取り込み、完全なテスト群と品質のゲートを走らせ、その後で初めてプッシュしてください。一日に
> 何度も統合し、決して週の終わりにではなく。(3) 連鎖が赤のときは決してプッシュしないで
> ください。赤にした者が、他の何よりも先に直すか、戻します。(4) 今日中に終えて統合できない
> ものは、既定で消した機能スイッチの後ろへ置き、保留項目に書き留めてください。(5) 部分と部分
> の間の契約（サービス、テーブル、値のリスト）に触れる前に、`docs/PRODUCER_CONSUMER_MAP.md`
> でその消費者を調べ、誰のものであれ同じ変更の中で更新してください。(6) すべての事業上の決定
> は、決まったその瞬間に、人の名前と日付とともに `docs/DECISIONS.md` へ行きます。(7) 始める
> ときと止めるときに、何をしているかを `docs/STATUS.md` に更新してください。他の人の
> エージェントがそれを見られるように。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：七つのルールをエージェントのルーチンにすること。エージェントは他の
エージェントを見ないのであり、読んだものしか守らないからだ。セッションを始めるときの必読、
それが廊下での会話に代わるものだ。テスト群を条件とする、小さく頻繁な統合。中途半端なものの
ためのスイッチ。衝突検出器としての地図。そしてその場で書かれる生きた状態。

**保留項目を宣言するとき：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- あなたが取りたい保留項目。バックログからあなたが選んだもの。そして他人が宣言したものへの
  一瞥：どれかが同じモジュールに触れていませんか。
- リポジトリ上のあなたのユーザー名。「宣言者」の欄に入るものです。
- 最低限受け入れられる状態：あなたの保留項目がどのモジュールに触れるかを知っていて、誰もそれ
  を宣言していないこと。

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them.
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
> 保留項目 [PND-NNN] を取ります。何よりもまず：他人が宣言した保留項目を列挙し、「触れる
> モジュール」の欄と生産者・消費者の地図によって、そのどれかが私のものと同じモジュールに
> 触れるかを教えてください。重なりがあれば、止まって私に教えてください。始めないでください。
> なければ、「宣言者」の欄に今日の日付とともに私の名前を書き、`docs/STATUS.md` に私が何を
> 始めるかを書き、保留項目の仕様を読み直し、この保留項目が地図のどの契約に触れることになり、
> 誰がそれを消費しているかを教えてください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：始める前の重なりの検証、衝突を避けるのに最も安い瞬間だ。書かれた宣言。
そして私が触れることになる消費者の一覧、最初から誰に何を変えるのかを知るために。

**統合するとき：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- 締めのルーチンを済ませた保留項目。中途半端なら、書き留めたスイッチ。
- 共有ブランチが今この瞬間に緑であるという確信（赤なら、誰のものであれ、まずそれを直し
  ます）。
- 最低限受け入れられる状態：終わったものを統合するのか、スイッチの後ろの中途半端なものを統合
  するのかを知っていること。

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item.
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
> 共有ブランチへ統合します。まず他の人の変更を取り込み、何が入ってきたか、そして何かが私の
> モジュールに触れるかを教えてください。衝突があれば、両側を読んで解決し、事業ルールが
> 絡むときは私に聞いてください。決して私のものを残すことで解決しないでください。完全な
> テスト群、品質のゲート、そしてこれが受け継いだシステムなら特性化テスト群を走らせ、数字を
> 見せてください。何かが赤なら、止まってください：何が、誰の変更から来ているかを教えて
> ください。この保留項目が終わっていないなら、機能スイッチが既定で消えていることを確認し、
> コミットのメッセージでそう言ってください。その後プッシュし、共有ブランチの上で連鎖が緑で
> あることを見せ、`docs/STATUS.md` と保留項目を更新してください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：上げる前に取り込むこと。衝突を両側を読んで解決し、「勝つ」のではないこと
（衝突を前にしたモデルの反射は自分の版を残すことだ）。条件としてのテスト群。エージェントの
マシンではなく共有ブランチの上での連鎖の緑を証拠とすること。そして最新の生きた状態。

## 完全性の検証（先導者が行う、コードを読まずに）

- 今週閉じられた保留項目を三つ取ること：その所有者とは別の人が、報告を読んで閉じたか。
- 共有ブランチへ一日に何度統合されたか。履歴を求めること。週に一度なら、ルール2は守られて
  いない。
- 今週、衝突はあったか。どう解決され、そのために地図の保留項目はあるか。
- 共有ブランチに、スイッチのない中途半端な機能はあるか。
- `docs/STATUS.md` は今日それぞれが何をしているかを言っているか。

## 警告サイン

- 各開発者が「働き方が違うから」と自分専用の共働の約束を持っている。エージェントたちは同じ
  コードの上で違うルールに従うことになる。
- 統合が金曜日のためにたまっていく。ブランチなしの、ブランチの森だ。
- 誰かが同僚の保留項目を承認するためにそのコードを読んでいる。方法がコードレビューに退化
  した。それはモデルが証拠よりも下手にやることだ。
- 衝突が「新しい方の版を残して」解決された。誰も決めないまま事業ルールが一つ失われた。
- ある人のエージェントが別の人の宣言した保留項目を閉じた。セッションを始めるときの必読が約束
  にないか、約束が読まれていない。

## 練り上げるべき残り `[仮説]`

1. これらのルールは共有ブランチについての業界の既知の実践と、方法が要求するものから来て
   いる。複数のエージェントが同時に働くチームで試してはいない。最初にこれを使うチームが
   それらを修正するだろう。そして振り返り（23）は、衝突がいくつあったか、そのうちいくつが
   地図で避けられたかを問わなければならない。
2. 方法とともに一つの共有ブランチが何人まで耐えるのか、別の働き方が必要になるまでに、私には
   わからない。私の直感は、方法なしで耐えた人数より多い、というものだ。仕様の書かれた保留
   項目と地図が、衝突の理由の半分を取り除くからだ。
3. Forgeでは、ネイティブの保留項目の記録と知識グラフが宣言と重なりの検出を独りで行う。他の
   道具では保留項目の欄を使って手で行う。それが実際にどれだけ違いを生むかはまだ試していない。
