# Urazuke — コース。段ごとの実践課題付きマニュアル、アプリケーションが本番に出るまで

第1版、2026年10月17日。Urazukeプロジェクトの作業文書である。これを使う最初の受講生とともに
修正していく。日常の言葉で書かれており、略語や見慣れない表現はすべて主文書
（`ESCALERA_METODOLOGICA.md`）の用語集にある。これは日本語版で、スペイン語が正本である。
モデルへのプロンプトは英語で、すべての言語で同一である。

## 始める前に

### このコースは誰のためか

人工知能でソフトウェアを構築し、**そのソフトウェアが本当に使われる**ことを望む人のため。
本物の人々に、何か月も。プログラミングのコースではない。言語もフレームワークも学ばない。
「プロンプト」のコースでもない。モデルにうまく書かせるコツは学ばない。**方法**のコースだ。
何をどの順でするか、各時点でモデルに何を頼むか、何を納めてもらうべきか、そして納められた
ものが完全だとコードを読まずにどう知るか。

次のような人に役立つ：

- 事業、診療所、小さなコンサルティング会社を持ち、開発チームを雇わずに自分のシステムが
  欲しい。
- 自動化のコンサルタントやフリーランスで、顧客がロボット以上の「何か」を求めてくる。
- プログラミングはできるが、モデルに重労働をさせて自分は決定だけを握りたい。
- 既に何かを「バイブコーディング」し、二週間動いて、三か月目に崩れた。

金曜のデモのためのプロトタイプが欲しいなら役に立たない。それにはもっと速いツールがあり、
この方法は遅く感じるだろう。方法はデモの後も動き続けなければならないもののためにある。

### 最後に何を手にするか

本番で動く自分のアプリケーション。それには：通る前に失敗するのを見たテスト。ロールバック
付きの再現可能なデプロイ。リポジトリの外にある設定と秘密。日付付きで書かれた事業の決定。
請求、送信、削除するすべてに錠。人がAIなしで追える三つのマニュアル。構築したのとは別の
エージェントによる監査。そして数字付きの振り返り。これがここで「production grade」と呼ぶ
ものだ。動くことではなく、**維持できる**こと。

そしてもう一つ、本当に持ち帰るもの：証拠なしにモデルを信じない反射、そして各ステップで
どんな証拠を求めるべきか正確に知っていること。

### 必要なもの

1. **プログラミング用のAIツール。** リポジトリのファイルを読み書きしコマンドを実行できる
   ものなら何でも：Claude Code、Cursor、Codex CLI、Gemini CLI、Forge。方法はどれかに
   依存しない。主文書に各ツールでの各成果物の置き場所の表がある。このマニュアルでは使う
   ものを指して「エージェント」と言う。
2. **GitHubのアカウント**（または同等品）と、リポジトリ、コミット、プッシュが何かの最低限
   の知識。なければ始める前に午後一つを充てること。入門チュートリアルで十分。それ以上は
   不要。
3. **プロジェクト。** 理想は自分のもの：必要なシステム、または顧客に頼まれたシステムで、
   使うユーザーがいるもの。なければ下の**ガイドプロジェクト**を使うこと。十六の段を一つも
   飛ばさずに通るよう設計されている。
4. **時間。** コースには段ごとに一つ、十六のレッスンがある。立ち上げ（0から4）はそれぞれ
   一〜三時間。ループ（5から10）は午後一つで学び、プロジェクト全体で練習する。運用（11から
   15）はそれぞれ二〜四時間。小さいプロジェクトを端から端まで、パートタイムで四〜八週間。
5. **決定する時間のあるドメインのオーナー。** プロジェクトが自分のものならあなただ。顧客の
   ものなら顧客で、プロジェクト全体を通じて質問に答えなければならないことを知っておく必要が
   ある。この点は譲れない。決めるオーナーがいなければモデルが決め、そこで方法は壊れる。

### コースの進め方

各レッスンは同じ構造を持つ：

- **理解すべきこと**：概念、人に説明するように説明。
- **課題**：一歩ずつ、エージェントに与える正確なプロンプト付き（英語で。モデルは英語で
  より正確に指示に従うから。各プロンプトの下に何を頼んでいるか日本語で説明）、そして
  返ってきたものをどうするか。
- **完全性の検証**：エージェントが納めたものについて、コードを開かずに自問する質問のリスト。
  一つでも「否」ならレッスンは終わっていない。
- **提出物**：最後に存在しなければならないファイルまたは証拠。
- **よくある間違い**：初回にほぼ全員に起きること。
- **ガイドプロジェクトでは**：このレッスンを例のプロジェクトに適用するとどう見えるか。

コース全体のルール：**検証に「否」があるまま次の段に進まない**。「後で直す」の誘惑こそ、
方法が防ぐために存在するものだ。段を完全に登らなければ、次の段は砂の上に建つ。

### ガイドプロジェクト：「Turnera」

自分のプロジェクトがなければこれを使うこと。小さいが、十六の段のどれも偽物にならないため
に必要なすべてを持つ：実際のユーザー、個人データ、世界に出るメッセージ、そして金銭。

**事業。** 診療所（事務所、美容院、工房でもよい：予約を取るところならどこでも）。今日、
予約はノートに書かれ、手でWhatsAppで確認される。人が忘れて予約が失われ、二人が別々のノート
に書いたために二重予約があり、先月いくつの予約がキャンセルされたか誰も知らない。

**望むもの。** 二人の受付と三人の専門家が予約を見るウェブの予約表。24時間前のWhatsAppか
メールでの自動リマインダー。特定の予約に支払いリンクで手付金を求める可能性。そして月末の
いくつかの数字（予約数、無断キャンセル数、手付金数）。

**オーナー。** 診療所の責任者。事業について判断力がある（どの予約に手付金が要るか、どれ
だけ前ならキャンセルできるか、三度来なかった患者に何を言うか）、そして質問に答える時間が
一日十五分ある。プログラミングはせず、コードは読まない。

**彼女だけが知る数字。** 一日約四十件の予約、年二百五十日。予約ごとに約三通のメッセージ
（確認、リマインダー、時に再調整）。患者データは五年保管。ピークは月曜の朝、二人の受付が
同時に入力する。そして彼女が答えられず、しかも重要な問い：もしうまくいったら、他の診療所
に売るのか？（答えはサイジングを十倍変える。）

**帰結のあるもの。** リマインダーの送信（二度送れば迷惑、間違った番号に送れば個人情報の
問題）。手付金の請求（金銭）。予約のキャンセル（失う患者にとって不可逆）。患者の削除（個人
データ）。

始めるにはこれで足りる。他のすべてはエージェントが質問し、質問することが演習の一部だ。

---

## 立ち上げフェーズ：レッスン0から4

この五つのレッスンは機能を書く前に、プロジェクトごとに一度行う。飛ばす誘惑が最も強く
（「動くものを見たい」）、飛ばすと最も高くつくものだ。実践的な助言：一週間で、続けて行い、
その後で初めてループを開くこと。

### レッスン 0 — このプロジェクトはこの方法で取り組めるか？

**理解すべきこと。** 方法はどんなプロジェクトにも使えるわけではなく、始める前にそれを知る
ことが最初の品質の決定だ。それなしでは機能しない二つの条件がある：証拠を残す標準リポジトリ
があること（X1）、そして画面からバックエンドまでエンドツーエンドでテストするため、画面を
プログラムから操作できること（X2）。どちらかが欠ければ、エージェントは自分を検証できず、
あなたがコードを読む羽目になる。それこそ方法が避けると約束するものだ。その後に重み付けの
基準がある（時間のあるオーナーがいるか、誤りに帰結があるか、別環境でテストできるか等）。
最初のプロジェクトで較正中だ。

ガイドプロジェクトでは二つの条件が満たされる：新規プロジェクト（レガシーなし）で、プロ
グラムから操作可能なウェブインターフェースで構築する。自分のプロジェクトなら、このレッスン
は「不可」で終わることもあり、それはコースの有効な結果だ。

**課題。**

1. ファイル `docs/INITIAL_SURVEY.md` に、手で、プロジェクトについて知っていることを書く：
   顧客は何を望むか、誰のためか、今システムなしで何が起きているか、どんな技術があるか提案
   されているか、以前のシステムがありリポジトリがあるか、オーナーは誰で時間はどれだけか、
   誤りの帰結は何か、どんな環境があるか。半ページ。不完全でも構わない。実際、不完全で
   あることが演習の一部だ。
2. 主文書の基準シート（排除基準X1とX2、候補D1からD10）を `docs/ELIGIBILITY_CRITERIA.md`
   にコピーする。
3. プロジェクトのフォルダ（その二ファイル以外はまだ空）でエージェントを開き、このプロンプト
   を貼る：

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

   頼んでいるのは：二つのファイルを読むこと、**調査が十分か評価し、答える前に足りないもの
   を質問すること**（この条項はコースのすべてのプロンプトで繰り返される。方法の核心だ）、
   各回答の出所を言ってシートを埋めること、そして決定しないこと。決定はあなたのものだ。

4. 質問に答える。一つも質問されなかったら疑い、何を仮定したか尋ねる。
5. シートが提示されたら、読んで決める。それから締めのプロンプトを貼る：

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

**完全性の検証。** `docs/ELIGIBILITY.md` を開いて自問する：二つの排除基準に明示的な回答と
出所があるか。「おそらく」で答えられた基準があるか。（あればエージェントは質問すべき
だった。）決定に日付と名前があるか。条件があれば検証可能か。した質問とあなたの回答がある
か。

**提出物。** 一ページの `docs/ELIGIBILITY.md`。

**よくある間違い。** エージェントが質問しないよう「完全な」調査を書くこと：演習を失い、
さらに悪いことに、モデルの仕事を自分でする癖がつく。五つの条件付きで「可」と答えること：
変装した「不可」だ。そして最も多いもの：「明らかに可」だからとレッスンを飛ばすこと。
明らかなことは書かれず、書かれないことが後で議論になる。

**ガイドプロジェクトでは。** エージェントは最低限、インターフェースがウェブかモバイルか
（X2がそれに依存するから）、Excelでも以前のシステムがあるか、どのメッセージチャネルを使う
か（WhatsAppにはメールにない要件がある）を質問すべきだ。シートは妥当な条件付きで「可」で
終わる：第12段の前にメッセージチャネルを定めておくこと。

### レッスン 1 — 共働の約束

**理解すべきこと。** エージェントは毎セッション、前回の記憶なしにやって来る。毎朝新しい
同僚のようなものだ。共働の約束とは初日に伝え、毎日読み返すもの：どう働くか、何を許さないか、
どの程度の自律を与えるか。約束なしには毎セッション同じことを、毎回少しずつ違って繰り返す
ことになる。

六つの最小ルールにはそれぞれ背後に失敗がある：「私の時間は神聖」は細部ごとの相談を防ぐ。
「負債ゼロ」は「後で直す」を防ぐ。「正確な範囲」は「ついでに」の追加を防ぐ。「同じコミット
での文書」は古いマニュアルを防ぐ。「検証していないものを完了と報告しない」はそうでなかった
「完了」を防ぐ。「私の言語で話す」はプロンプトが英語だったから英語で答えることを防ぐ。

**課題。**

1. 五分、自分の働き方を考える：多く質問されたいか少なくか。どの言語で。他の人と働くとき
   何に苛立つか。短いリストに書く。質問されたら伝える。
2. このプロンプトを貼る：

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

   頼んでいるのは：それぞれが防ぐ失敗付きの六つのルール、受け入れるか却下できるよう提案と
   印された独自のルール、そしてあなたについて質問すること。

3. 質問に答える。提案を読む：役立つものを受け入れ、そうでないものを却下し、常に一行の理由
   を添える。
4. こう締める：

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

   まだプロジェクトファイルがなければ（レッスン2で作る）、その指示付きの最小のものを作る
   だろう。それでよい。

**完全性の検証。** 六つのルールがそれぞれ防ぐ失敗付きであるか。願望（「〜するよう努める」）
として書かれたものがあるか。プロジェクトファイルは毎セッション開始時に読むよう命じている
か。あなたの働き方について少なくとも一つ質問したか。

**提出物。** 日付とバージョン付きの `docs/WORKING_AGREEMENT.md`、プロジェクトファイルに
結び付けられたもの。

**よくある間違い。** すべて良さそうだからと二十のルールを受け入れること：誰も二十は守ら
ない。六から八は守れる。エージェントが約束を変えられるというルールを残すこと：否。そして
最も静かなもの：読んでいるか一度も試さないこと。レッスン2でその方法を見る。

**ガイドプロジェクトでは。** エージェントがTurneraでよく提案し、受け入れる価値のある独自
ルール：「本番以外の環境から患者に本物のメッセージを決して送らない。テストではメッセージは
偽の受信箱に行く」。第12段が早くも顔を出している。

### レッスン 2 — プロジェクトの定義と必読

**理解すべきこと。** プロジェクトファイル（`PROJECT.md`、`CLAUDE.md`、またはツールが使う
名前）はエージェントが各セッションの最初に読む地図だ。**短く**なければならない：システムは
何で、誰のためで、何でないか、モジュール、日付付きの決定、約束を読む命令。日々起きたこと
はそこには入らない。生きた状態（`docs/STATUS.md`）と保留項目の記録に行く。方法の起源
システムの一つはこのファイルを9,661行まで育てた。その状態では誰も読まず、モデルも読まない。

「何でないか」の節が最も重要で、全員が空にする節だ。書かれていないことが、穴に出会った
モデルが発明するものだ。

**課題。**

1. レッスン0で学んだこと（エージェントの質問への回答）で `docs/INITIAL_SURVEY.md` を補完
   する。「システムがしてはならないこと」の節を、二項目でも加える。
2. 貼る：

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

   頼んでいるのは：起草前に質問すること、「何でないか」の節を持つ短いプロジェクトファイル、
   日付付きの決定、そして別ファイルの生きた状態。

3. `PROJECT.md` を全部読む。五分に収まらなければならない。真実でないもの、自分のでないもの
   を直す。
4. こう締める：

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

5. **読み取りテスト。** エージェントのセッションを閉じて新しいものを開く。他に何も言わず
   頼む：「このシステムがしてはならないことは何？」。`PROJECT.md` にあることで答えれば、
   結び付けは機能している。他の何かで答えれば地図を読んでいない：ツールがプロジェクト
   ファイルをどう読み込むか確認せよ。

**完全性の検証。** `PROJECT.md` は五分で読めるか。システムが何をしないか言っているか。各
決定に日付と決定者があるか。エージェントは起草前に何か質問したか。生きた状態は別ファイル
にあるか。読み取りテストに合格したか。

**提出物。** `PROJECT.md`（最大三百行）と `docs/STATUS.md`、そして合格した読み取りテスト。

**よくある間違い。** 既にあった仕様全体を `PROJECT.md` に貼ること：綱領であって仕様では
ない。「何でないか」を空にすること。そして読み取りテストをしないこと：第1段と第2段が
存在するだけでなく機能していると知る唯一の方法だ。

**ガイドプロジェクトでは。** Turneraの「何でないか」には最低限：診療記録システムではない
（医療データを保存しない）、決済ゲートウェイではない（プロバイダの支払いリンクを使い、
カードを処理しない）、マーケティングメッセージを送らない（確認とリマインダーのみ）。この
三つの「否」のそれぞれが、後の三十分の会話を節約する。

### レッスン 3 — アーキテクチャを設計する前にサイジングする

**理解すべきこと。** 誤ると数週間を費やす決定がある：どのデータベースか、データベースへの
呼び出しは同期か非同期か、何人が同時にシステムを使えるか。そしてすべては**事業だけが持つ**
数字に依存する：一日何件の予約、予約ごとに何通のメッセージ、何年保管するか。モデルはその
数字を推論できない。そこから導かれるもの（年間の行数、五年後のサイズ）は推論できる。だから
プロンプトは一次データと派生データを区別し、**足りない一次データを推定する代わりに求める**
よう要求する。モデルが一次データを推定するとき、計算するときと同じ自信ありげな顔でそうする。
口調で区別する術はない。

さらに常に取るべき種類の決定がある：**非対称な**決定、余れば安く、欠ければ非常に高い。
典型例は、最初のデータベースがファイルでも初日からデータベースとのインターフェースを非同期
にすること。データベースを変えなければ `await` が一つ余るだけ。変えれば全部書き直すのを
免れる。

**課題。**

1. オーナー（プロジェクトが自分のものなら自分自身）と座って `docs/VOLUME_SURVEY.md` を
   書く：主要エンティティとその数、月に何件追加されるか、エンティティごとに何件のイベント、
   ピークで何人が操作しいつがピークか、データをどれだけ保管するか、例外的な負荷があるか、
   どんな成長を期待するか。各数字に出所を記す：「責任者が言った」「9月のノートで数えた」
   「仮定」。いくつかはわざと「仮定」のまま残す。エージェントがそれをどうするか見るために。
2. 貼る：

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

   頼んでいるのは：一次と派生を区別すること。**足りないか「仮定」の一次データを求め、決して
   推定しないこと**。計算を見せて派生を算出すること。「十倍」のシナリオ。互いに移行する
   コスト付きの三つの選択肢。そして選ばないこと。

3. 「仮定」を求められたら、よい：それが演習だった。数字を手に入れ（オーナーに聞く、ノート
   で数える）、与える。求めずに計算したなら、止めて仮定をどうしたか尋ねる：段の失敗であり、
   今見ておく方がよい。
4. 三つの選択肢を読む。一つ手計算し直す（例えば最大テーブルの年間行数）：同じにならなければ
   ならない。選ぶ。
5. こう締める：

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

**完全性の検証。** 出所が「仮定」か出所のない一次データがあるか。各派生データは計算を示し、
再計算して合うか。三つの選択肢があり理由付きで一つ選ばれているか。「十倍」で何が起きるか
言っているか。非対称な決定は書かれているか。質問したか。

**提出物。** `docs/SIZING.md`。

**よくある間違い。** エージェントが質問しないよう自分で作った数字で調査を埋めること
（レッスン0と同じ誤りで、その数字がアーキテクチャを決めるからここではより悪い）。念のため
「最も強力な」選択肢を選ぶこと：移行コストが表にあるのは、まさに「十倍」に耐える最小のもの
を選ぶためだ。そして非対称な決定を書かないこと：書かれていなければ、レッスン4でエージェント
は守らない。

**ガイドプロジェクトでは。** 一次：40件/日 × 250日 = 10,000件/年。予約ごとに3通 = 30,000
通/年。5年保管。二人の受付の同時ピーク。「十倍」は他の診療所に売るかの問い：年間100,000件
と300,000通。典型的な三つの選択肢：SQLiteファイル（一診療所なら何年ももつ、複数が書き込む
十倍には耐えない）、最初からPostgreSQL（すべてに耐える、インフラが少し高い）、または今は
SQLiteで非同期インターフェース、PostgreSQLへの移行を予定（非対称）。コースでは三番目を
選ぶ：最も学べるから。

### レッスン 4 — ゲート付きの骨組み

**理解すべきこと。** システムが何か役立つことをする前に、**空のまま**起動し、テストされ、
デプロイされなければならない。時間の無駄に見える（「何もないのに何をデプロイ？」）が逆だ：
本番への道はプロダクトの一部であり、機能すると知る唯一の方法は、まだ失うものがないうちに
辿ることだ。起源システムの一つではデプロイが立ち上げの一か月後に来て、五つの保留項目を
連続で費やした。最初の週に骨組みをデプロイしていれば、その五つの痛手は空の状態で受けていた。

**ゲート**とは段階から段階へ進む条件（「テスト群が緑」「テストへのデプロイが成功」）。明らか
に見えても今書くことが、後で「これは通らない」と議論なしに言えるようにする。

**課題。**

1. `docs/ENVIRONMENTS_SURVEY.md` を書く：システムはどこで動くか（既にあるサーバー、クラウド
   サービス）、テスト環境と本番環境があるか、誰が何にアクセスできるか、今何かあるならどう
   デプロイしているか。何もなければそう言う：エージェントが最も簡単な選択肢を提案する。
2. デプロイ先の認証情報を、無料サービスでも、持っていることを確認する。なければ骨組みは
   自分のマシンに留まり、レッスンは終えられない。
3. 貼る：

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

   頼んでいるのは：始める前にアクセスを確認すること、骨組みとは何かの正確なリスト、書かれた
   ゲート、テスト環境の実際のスクリーンショット、そして機能追加の禁止。

4. この課題は長く（エージェントの作業で一、二時間）、行き来がある：足りない認証情報、メール
   確認を求めるサービス等。正常だ。正常でないのは、テスト環境のスクリーンショットなしに
   「完了」と言うことだ。
5. スクリーンショットが示されたら、自分でブラウザでURLを開く。同じものが見えなければなら
   ない。
6. こう締める：

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

**完全性の検証。** 自分でテスト環境のURLを開いて空の画面を見たか。緑の継続的インテグレー
ション実行へのリンクがあるか。デプロイは二度実行され二度目は何も壊さなかったか。ゲートは
それぞれ検証可能な条件を持つか。頼んでいない機能があるか。

**提出物。** 骨組みのあるリポジトリ、緑の継続的インテグレーション、機能するテスト環境の
URL、`docs/GATES.md`、三つのコマンド付きの `docs/STATUS.md`。

**よくある間違い。** 「ローカルで動く、デプロイは後で見る」を受け入れること：否、デプロイが
骨組みだ。テスト環境ではなくエージェントのマシンのスクリーンショットを受け入れること。
そして「ついでに」ログイン画面、メニュー、ロゴを追加させること：保留項目なしに入るものは
すべて逃げた範囲だ。

**ガイドプロジェクトでは。** Turneraの骨組みは、テスト環境の公開URLで動く「Turnera —
バージョン0.0.1」と言うウェブページ、ヘルスルートで「ok」と答えるサーバー、そのルートを
呼ぶスモークテスト、各プッシュでそのテストを走らせる継続的インテグレーション、テスト環境
への自動デプロイ。ゲート：「マージには緑のテスト群」「本番への昇格には緑のテスト環境」
「最初の本番デプロイには試されたロールバック」。それ以上なし。そして実際のURLでその空の
ページを見るのが不思議なほど満足感があることだ。

---

## ループフェーズ：レッスン5から10

この六つのレッスンは**変更のたびに**、プロジェクト全体を通じて使うものだ。午後一つで学ぶが、
数週間練習する。フェーズの終わりに反射を持つことが狙いだ：保留項目を取り、構築し、赤で試し、
もう一方の側を更新し、測るべきものを測り、検証済みと信じていることを分けて報告する。その
反射が方法だ。

練習するには実際の機能が必要だ。ガイドプロジェクトでは、最初の保留項目ブロックは基本の
予約表：その日の予約を見る、予約を入力する、キャンセルする。メッセージも支払いもまだない。
それは錠（レッスン12）の後に来る。
### レッスン 5 — 計画とは保留項目のこと

**理解すべきこと。** 「計画」が一方に「タスクリスト」が他方にあるのではない：**保留項目の
リストが計画だ**。各保留項目には番号、どこから来たか（生んだ決定または依頼）、完了をどう
検証するか、そして閉じたときの証拠がある。最後のものが、コードを見る代わりにあなたが見る
ものだ。そしてエージェントへの黄金律：リスト外に現れたものは新しい保留項目として書き留め、
やらない。

**課題。**

1. `docs/INITIAL_SURVEY.md`（または別ファイル）に、最初の機能ブロックへの顧客の依頼を、
   顧客が言うままに、曖昧さを含めて書く。Turneraでは：「その日の予約を見て、新しいのを
   入れて、キャンセルしたい」。
2. 貼る：

> We are going to turn everything that must be done into numbered pending items. Read
> `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me;
> do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number
> (PND-001 onwards), one-line title, what is requested, which decision originates it (or
> "client request, date"), how it will be verified as done, and status. Order them by the
> priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

   頼んでいるのは：依頼を検証可能な項目に変換すること、**検証可能な項目を書けないほど依頼
   が曖昧なら質問すること**、そして理由付きで順序を提案すること。

3. 質問に答える（Turneraでは例えば「その日」とは何か：今日か、選んだ任意の日か。キャンセル
   は削除か印か）。それらの質問は事業の決定だ。レッスン6でどこに書くか見る。
4. 共働の約束に毎セッションのルーチンを加える。貼る：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending
> item. A pending item is closed with written evidence (the test, the screenshot, the number),
> never with 'done'. If along the way you see something that is not on the list, add it as a new
> pending item; do not do it."

5. いよいよ構築を始める。最初の保留項目を取るよう頼む。ここから、各セッションは「どの項目
   をなぜ取るか」で始まる。

**完全性の検証。** 各保留項目はどう検証するか言っているか。証拠もコミットもなく閉じた項目
があるか。コミットを三つ無作為に取る：項目を引用しているか。項目のないものがコードに現れた
か。曖昧な点を質問したか。

**提出物。** 最初のブロックを持つ `docs/PENDING.md`、約束内のルーチン、進行中の最初の項目。

**よくある間違い。** 「どう検証するか」のない項目を書くこと（「予約画面を改善する」）：
閉じられず、だから「完了」で閉じられる。「動くのを見たから」と証拠なしに項目を閉じさせる
こと。そして最も直しにくいもの：リスト外の「もう一つ小さいこと」をやらせること。一度許せば、
正確な範囲は失われた。

**ガイドプロジェクトでは。** Turneraの最初のブロックは六項目ほど：PND-001 ある日の予約を
見る。PND-002 患者、専門家、日付、時刻で予約を入力する。PND-003 同じ専門家の同時刻の二重
予約を防ぐ。PND-004 予約をキャンセルする（削除ではなく印：レッスン6の決定）。PND-005 名前
または電話で患者を検索する。PND-006 最小データでの患者登録。それぞれ検証付き：「画面に見え
データベースに残る」「二重予約を試みると画面が警告しデータベースは保存しない」等。

### レッスン 6 — 決定はコードの隣に書く

**理解すべきこと。** モデルは事業ルールの穴を見つけると、**それを埋める**。止まって質問
しない。最もありそうなもので補完し、他のことを書くのと同じ自然さでそうする。だからこの
レッスンは「決定を書け」ではなく、「欠けているときは止まって聞くよう要求せよ」だ。そして
あなたが決めるとき、決定はあなたの原文の言葉、名前、日付で、コミットと記録に書かれる。六週間
後、誰かが「なぜキャンセルは削除しないのか」と尋ねたとき、答えは書かれていてあなたのものだ。

**課題。**

1. 約束に決定のルーチンを加える。貼る：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message and in `docs/DECISIONS.md`, with the exact words I used. If I do not
> answer and you must move on, implement the most reversible option and mark it 'decision by
> omission, pending confirmation', so that I can review it."

   頼んでいるのは：書かれていないルールの前で止まること、推奨と代替案付きで質問すること
   （十秒で決められるように）、原文の言葉を記録すること、答えないときは最も可逆なものを
   選んで印すこと。

2. ブロックの保留項目の構築を続ける。事業ルールを質問されるたびに、決めて締めの形式で
   答える：

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

3. 逆のテストを一度、わざと行う：一セッションの間質問に答えず、何をするか見る。最も可逆な
   ものを選び「省略による」と印さなければならない。好きなものを選んで印さなかったなら、段の
   失敗だ：約束で直す。

**完全性の検証。** 事業ルールに触れるコミットを三つ開く：誰がいつ決めたか引用しているか。
未確認の「省略による」決定があるか。自分のものと認識できないルールがシステムにあるか。文は
原文か「改善」されたか。

**提出物。** 育っていく `docs/DECISIONS.md`、最初のブロックの少なくとも五つの決定付き、
そしてそれを引用するコミット。

**よくある間違い。** チャットで質問に答えて書き残すよう要求しないこと：三セッション目には
誰も覚えていない。エージェントにあなたの言葉を「改善」させること：言い換えられたルールは
別のルールだ。そして最も重大：誰も決めなかったルールを本番で発見すること。起きたら（起きる）、
バグではない：第6段の失敗であり、コードだけでなく約束で直す。

**ガイドプロジェクトでは。** Turneraの最初のブロックの典型的な決定：「キャンセルは予約を
キャンセル済みと印し、誰がいつかを保存する。何も削除しない」「専門家は同時刻に二つの予約を
持てないが、専門家が有効にしていればダブル予約で二人の患者は可」「患者の電話は必須、メール
は任意」。それぞれ日付と責任者の名前付き。

### レッスン 7 — 錠としてのテスト、赤で証明

**理解すべきこと。** コースの中心のレッスンだ。一度も失敗するのを見ていないテストは何かを
証明しているかわからない。モデルはコードとテストを同じセッションで同じ理解で書く：依頼を
誤解していれば、テストは誤解したものを証明し、通る。テストが重要なものを見ていると知る唯一
の安価な方法は、**古いコードに対して赤で見ること**：変更前のコードも通るなら、テストは前後
を区別せず、役に立たない。だから依頼は「テストを書け」ではなく「赤を見せ、次に緑、次に回帰」
だ。

そして第二の考え：エンドツーエンドのテスト。画面から検証し（クリック、入力、読み取り）
バックエンドへの効果を確認する（行が残った、状態が変わった）テストが、あなたのコード読みを
置き換えるものだ。レッスン0の基準X2が実践になったものだ。

**課題。**

1. 約束に証拠のルーチンを加える。貼る：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for. (2) Demonstrate that this
> test fails against the previous code: you may temporarily revert the change, or run the test
> against the old version, but show me the red output. (3) Show me the green output with the
> change. (4) Run the regression suite for the neighbouring items and show me it is still green.
> (5) Do not replace with mocks the very part you are trying to test. If testing end to end
> requires something you lack (data, access, an environment), ask me for it; do not simulate what
> you do not have. Finally, the commit message says 'proved red against [what]' and the test
> counts."

   頼んでいるのは：テスト、**出力を見せて示された赤**、緑、同じセッションでの近隣の回帰、
   まさに試すものをシミュレートしないこと、そしてエンドツーエンドで試すのに足りないものを
   シミュレートする代わりに求めること。

2. 二重予約の保留項目（TurneraのPND-003、または自分のプロジェクトでの同等品：何かを防ぐ
   ルール）を取る。ルーチンで閉じるよう頼む。報告を読む：数字付きの赤の出力（「ルールなし
   のバージョンに対して1のうち1が失敗」）、次に緑がなければならない。
3. 同じ項目にエンドツーエンドのテストを頼む：画面を開き、二重予約を試み、警告を読み、データ
   ベースで保存されなかったことを確認する。画面をプログラムから操作できないからできないと
   言われたら、止まる：それはX2の失敗で、続ける前に今直す（画面要素に識別子を加える）。
4. エージェントが何かを「テストできない」と言ったら、貼る：

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

**完全性の検証。** 報告は数字付きで赤を示しているか。回帰は同じセッションで数字付きで走った
か。変更のまさにその場所にシミュレートされた部分があるか。コミットは「赤で証明」と言って
いるか。画面のテストはバックエンドも検証しているか。

**提出物。** 完全なルーチン（赤、緑、回帰）で閉じた少なくとも三つの保留項目、うち一つは
エンドツーエンドのテスト付き。

**よくある間違い。** 数字も赤もなしに「テストは通る」を受け入れること。エンドツーエンドの
テストをシミュレーションに置き換えてテスト群を「高速化」するのを受け入れること。そして
「テストできない」を保留項目を開かずに通すこと：テスト不能は負債であり、負債は記録する。

**ガイドプロジェクトでは。** 二重予約の赤はこう見える：エージェントが一時的にルールを外し、
テストを走らせ、出力は二番目の予約が保存されたためテストが失敗したと言う。ルールを戻し、
走らせ、緑。次に回帰：PND-001とPND-002のテストは緑のまま。そしてエンドツーエンド：プログラム
で制御されたブラウザがフォームを読み込み、「保存」を押し、「その時間は既に埋まっています」
のメッセージを読み、データベースへのクエリがその時刻に予約が一つだけであることを確認する。
初めてその報告を見たとき、方法全体が何のためかわかるだろう。

### レッスン 8 — 生産者と消費者の対称性、そしてアンチパターンの記録

**理解すべきこと。** システムの一方の端（サーバー、データベース、ロボット）を変えたら、
もう一方の端（画面、カウンタ、レポート）も同じコミットで変わらなければならない。さもなければ
乖離し、ユーザーは一方である数字を、他方で別の数字を見る。これを防ぐ原則は述べるのは簡単で
維持するのは難しい：**すべてのリストには唯一の所有者がいる**。予約の取りうる状態、レポート
の列、何かが待つ理由：一つの部分（生産者）だけが定義し、他はそこから読む。コピーが二つある
瞬間、どちらかが古い。どちらかを知るだけだ。

レッスンの後半はアンチパターンの記録（GOTCHAS）：既に一度払った誤りを、匂い、根本原因、
修正、事前の検知法付きで書き留める。重要なのは書き留めることではなく、検知する自動検査を
加えることだ。書き留めただけで自動化されていないアンチパターンは、セッションが変わると
繰り返される。

**課題。**

1. 契約の地図を頼む：

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

   頼んでいるのは：両側付きの契約の目録、そして見えないものを省く代わりに宣言すること。

2. 約束にルーチンを加える：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

3. リストのテストをする：画面に現れるリストを一つ選び（Turneraでは予約の状態：保留、確認
   済み、キャンセル済み、不在）、どこで定義されどこで読まれるかエージェントに見せてもらう。
   定義が二つあれば、一つだけ残すよう頼む。
4. 初めて何かが二度目に壊れたら（今後数週間に起きる）、貼る：

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

**完全性の検証。** 地図から契約を一つ選ぶ：各消費者は生産者から読むか、自分のコピーを持つか。
二つの画面に表示されて同じになる数字があるか。GOTCHASの各項目に四つの部分があるか。既に
書き留めたものが繰り返されたか。

**提出物。** `docs/PRODUCER_CONSUMER_MAP.md`、約束内のルーチン、そして `docs/GOTCHAS.md`
（一項目で始まっても）。

**よくある間違い。** 地図を一度作って二度と見ないこと：新しい契約ごとに育たねばならない。
「事前の検知法」の部分なしにアンチパターンを逸話（「一度こんなことが…」）として書くこと。
そして古典：同じ状態のテキストがサーバーと画面に手書きで。一方が変わる日、他方は残る。

**ガイドプロジェクトでは。** Turneraの地図には最初、四、五の契約がある：予約状態のリスト
（サーバーが定義、画面と月次レポートが読む）。予約テーブル（入力が書き、日の予約表とレポート
が読む）。患者テーブル。そして後に、メッセージキュー（予約表が書き、送信者が読む）。最初の
GOTCHAはたいてい日付のもの：サーバーがあるタイムゾーンで保存し画面が別のタイムゾーンで
表示したため、予約表が予約を間違った日に表示した。匂い：「23時の予約が明日に現れる」。根本
原因：二つのタイムゾーン。修正：サーバーで一つだけ。検知：23:30の予約でのテスト。

### レッスン 9 — 構築の前に計測する、自身も検証される計器で

**理解すべきこと。** モデルは数字付きの主張（「その種のクエリは約120ある」）を作り、計測
されたときも推定されたときもまったく同じに聞こえる。口調で区別できない。唯一の方法は計器を
要求すること：「何で測った？コマンドを見せて」。段のルールは、**何かを決める数字は印象からは
出ない**：リポジトリに住み、既知の事例に対して検証するテストを持ち、あなたが実行できる計器
から出る。

そしてもう一つ、痛手を重ねて学んだこと：計器も嘘をつく。起源システムの一つで、ある計器は
コードの一部を見ていなかったためゼロを出し、別のものは44のところ27と言った。だから双方向の
監査：コードから計測へ（数えるべきものはすべて数えられているか）、計測からコードへ（数えら
れたものはすべて本当に存在するか）。

小さいプロジェクトでは「計測」はささやかだ：画面の読み込みで何回クエリするか、月次レポート
にどれだけかかるか、昨日何通送ったか。ラチェットも経路ごとの予算も要らない。要るのは数字の
背後にコマンドがあることだ。

**課題。**

1. 仮説を選ぶ。Turneraではよいもの：「日の予約表は表示する予約ごとにデータベースに一回
   クエリする」（古典的なN+1ループ）。真でなければなおよい：偽の仮説がどう検証されるか見る。
2. 貼る：

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

   頼んでいるのは：リポジトリ内の計器、計器のテスト、近似する代わりに足りないものを求める
   こと、近似を印すこと、コマンド付きの数字、双方向の監査、そして順序：まず計測、次に提案。

3. 与えられたコマンドを自分で実行する。同じ数字が出なければならない。スクリプトを理解する
   必要はない。実行することが必要だ。
4. 仮説が真でエージェントが修正を提案したら、予算を頼む：

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

   こうして、三か月後に誰かがループを戻しても、テスト群が検知する。

5. 計画が数字を伴うときのために、約束にルール五を加える：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

**完全性の検証。** 計器を実行して同じになったか。テストがあり、どの既知の事例に対してか。
報告に計器の裏付けのない数字があるか。近似は印されているか。テスト付きの予算があるか。

**提出物。** テスト付きのリポジトリ内の計器、`docs/STATUS.md` または保留項目内のコマンドと
日付付きの数字、そして（該当すれば）テストで守られた予算。

**よくある間違い。** コマンドを実行せずに数字を受け入れること：このレッスンの価値の半分は
あなたが実行することにある。ゼロを出す計器：ほとんどゼロではない。ほとんど常に何かを見て
いない。そしてエージェントに「測りながら直す」ことを許すこと：順序が方法だ。

**ガイドプロジェクトでは。** Turneraの計器は、テストデータベースに10、50、200件の予約の日を
読み込み、クエリを数えながらその日の予約表を開き、三つの数字を書くスクリプト。計器のテスト
は0件で基本クエリ（たとえば2）を正確に数えることを検証する。ループがあれば数字は12、52、202。
直すと3、3、3になり、予算は4に置かれ、予約表がどんな件数でも4回を超えてクエリすれば失敗
するテスト付き。

### レッスン 10 — 誠実な検証と釣り合った報告

**理解すべきこと。** コードを読まないなら、エージェントの報告は信頼できなければならず、それは
自然には起きない。モデルは有用で完全であるよう訓練され、「これは検証できなかった」と言う報告
は「完了」と言う報告より有用でなく感じられる。だから悪い知らせ、盲点、やらなかったことを
**明示的に求める**必要がある。求めなければ出てこない。隠すからではなく、答えの一部と考えて
いないからだ。

誠実にする構造は三つのブロック：**検証済み**（隣に証拠付き）、**信じている**（動くと思うが
なぜ試さなかったか）、**盲点**（いる場所から見えないもの）。そしてルール：悪い知らせを最初に。

**課題。**

1. 約束に報告のルーチンを加える：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

2. 次の保留項目を閉じるよう頼み、下の検証リストで報告を読む。初回はほぼ確実に「盲点」
   ブロックが空だろう。尋ねる：「いる場所から何が見えない？」。何かあるはずだ（あなたの
   ブラウザ、本番環境、実データ）。何もないと言い張るなら、あなたが言い張る。
3. 「まだ壊れている」を練習する。小さいことを頼み、テスト環境で検証し、何らかの理由で変更が
   見えなければ（よくある：デプロイが遅い、または行われていない）、「まだ壊れている」と言って
   貼る：

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

   「まだ壊れている」の半分は、リポジトリにはあってあなたが見る場所にはない修正だ。この
   条項は何時間も節約する。

**完全性の検証。** 三つのブロックがあるか。「検証済み」の主張を無作為に選んで隣に証拠があり、
再現できたか。頼んだ各項目を網羅しているか。悪い知らせは最初にあるか。素っ気ない「完了」と
言ったことがあるか。

**提出物。** 約束内のルーチンと、三つのブロックを持つ連続三つの報告、うち一つは実際の盲点
付き。

**よくある間違い。** 「検証済み」ブロックだけ読んで他の二つを飛ばすこと：他の二つがあなたを
守るものだ。「検証済み」の中の「動くはず」を受け入れること：変装した「信じている」だ。そして
ますます長い報告に慣れること：膨らんだ報告は量で何かを覆っている。

**ガイドプロジェクトでは。** TurneraのPND-004（予約のキャンセル）の良い締めの報告：
「検証済み：キャンセルのテストが通る（1/1、削除していたバージョンに対して赤で証明）。回帰
6/6。テスト環境で、11月3日の予約17が10:42に'reception1'によりキャンセル済みと表示（スクリー
ンショット）。信じている：月次レポートはキャンセルを正しく数えるだろうが、レポートはPND-011
でまだ存在しないため試していない。盲点：受付の携帯で'キャンセル済み'状態がどう見えるかは
見えない。あなたが試して」。

---

## 運用フェーズ：レッスン11から15

この五つのレッスンは「動く」を「維持できる」に変えるものだ。最初の機能ブロックがループで
構築され、システムが世界に作用する（メッセージを送る、請求する）前、実際のユーザーを持つ前
に行う。ガイドプロジェクトでは、リマインダーと手付金を加える時点で、だからレッスン12（錠）
はそれらの機能を構築する前に来る。後ではなく。

### レッスン 11 — 計画への入力としての定期監査

**理解すべきこと。** ときどきシステム全体を新鮮な目で見なければならず、見えたものは保管
される報告ではなく保留項目のリストに行く。重要な部分は「新鮮な目」：監査する者は構築した者
であってはならない。前提を共有するからだ。モジュールを構築したモデルはコードに書かれた
パスワードが暫定だと「知っている」。初めて見るモデルはそれをあるがままに報告する。別の会社
は要らない。**別のセッション、別の指示ファイル、参加していないもの**で十分だ。

**課題。**

1. リポジトリのクリーンなコピー（別フォルダにクローン）で新しいエージェントセッションを開く。
   ツールが許すなら、「あなたは監査者です。このシステムを構築していません」とだけ言う別の
   指示ファイルを与える。テスト環境への読み取り専用アクセスを与える。
2. 貼る：

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

   頼んでいるのは：読み取り専用、監査できなかったものを省略で合格にする代わりに宣言する
   こと、サンプルではなくすべてのコード、各発見に位置、リスク、証拠、優先度、次元ごとの
   評点、そして提案保留項目としてのP0。

3. 報告を読む。発見を二つ選び、監査者に証拠（コマンド、行）を見せてもらう。できなければ
   ならない。
4. 構築者のセッションに戻り、貼る：

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

5. 最初の本番デプロイ（レッスン13）の前に、そしてその後一、二か月ごとにこのレッスンを
   繰り返す。

**完全性の検証。** 報告は何を監査できなかったか言っているか。無作為の二つの発見にファイル、
行、再現可能な証拠があるか。各P0に保留項目が開かれているか。評点は次の監査と比べられるか。
構築したのとは別のセッションが監査したか。

**提出物。** `docs/AUDIT_[日付].md` と開かれたP0/P1の保留項目。

**よくある間違い。** 構築したのと同じセッションで監査すること：自分の前提を確認する。一か月
以上のシステムでP0のない報告を受け入れること：ほとんど真ではない。そして保留項目を開かずに
報告を保管すること：そこで監査は何の役にも立たなかった。

**ガイドプロジェクトでは。** Turneraの最初の監査はたいてい見つける：ログ内の患者データ
（メッセージ送信時に印字された電話番号：P0）。インデックスなしの名前による患者検索（P1、
5,000人で目立つ）。日付が未来であることを検証しない予約フォーム（P1）。既知の脆弱性を持つ
依存関係（P1）。四つの新しい保留項目、すべてファイルと行付き。

### レッスン 12 — フェイルクローズド、錠、静かな損害ゼロ

**理解すべきこと。** ソフトウェアは既定で疑いの前で進む：検証が失敗してもコードは続き、
サービスが応答しなくても問題なしと仮定する。「フェイルオープン」、停電すると開く扉のようだ。
方法は既定を反転する：**疑わしきは、否**。帰結のあるすべての行動（請求、送信、削除、承認）は
錠を持ち、書かれた戻り道があり、すべての新しい自動化はあなたが有効にするまで、したはずの
ことを記録しながらドライランモードで始まる。

このレッスンは世界に作用する機能を構築する**前**に来る。Turneraではリマインダーと手付金の前。

**課題。**

1. オーナーと `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` を書く：システムが請求、送信、承認、
   削除、外部への通知で何をするか、またはするようになるか。二度やったら何が起きるか。誤ったら
   何が起きるか。どう取り消すか。
2. 貼る：

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

   頼んでいるのは：事業が言ったこととコードがすることの比較（そこに誰も覚えていなかった
   行動が現れる）、差異を質問すること、各行動に可逆性、錠、戻り道、そしてフェイルクローズド
   のルールを書くこと。

3. 錠ごとに確認する。こう締める：

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

4. 今、レッスン5から10のループで帰結のある機能（リマインダー、手付金）を構築し、ドライラン
   モードのままにする。実際の送信を有効にする前に数日、「送ったはず」の記録を見る。

**完全性の検証。** 請求、送信、承認、削除するすべての行動が表にあるか。各錠に赤のテストが
あるか。不可逆なすべての行動に書かれた戻り道があるか。新しい自動化はドライランモードで始まり、
有効にする前に記録を見たか。

**提出物。** `docs/LOCKS.md`、赤で証明された錠ごとのテスト、記録付きのドライランモードの
自動化。

**よくある間違い。** 「自分の電話にメッセージを送って試すため」に実際の送信を有効にする
こと：ドライランモードはまさにそのためにある。「テスト用」パラメータで迂回できる錠：その
パラメータは本番で有効のままになる。そして「したはず」の記録を見ないこと：患者に届く前に
誤りを見る唯一の窓だ。

**ガイドプロジェクトでは。** Turneraの錠の表：リマインダー送信（不可逆。錠：予約ごとの冪等
性、予約とチャネルごとに一回の送信、一日200の上限、まずドライラン。戻り：なし、だから上限）。
手付金の請求（返金で可逆。錠：受付の明示的確認、専門家が定めた金額。戻り：決済プロバイダ
経由の返金）。予約のキャンセル（患者にとって不可逆。錠：確認と誰がの記録。戻り：予約の再
作成）。患者の削除（不可逆。錠：二重確認、責任者のみ、将来の予約がない場合のみ。戻り：なし、
だから二重）。各錠に、錠なしでは行動が起きたことを示すテスト付き。

### レッスン 13 — プロダクトの一部としての継続的インテグレーション、環境、秘密、デプロイ

**理解すべきこと。** 本番に至ることは再現可能なパッケージでなければならない：テストは**一度**
走り、デプロイはパッケージしてアップロードするだけ、設定はリポジトリではなくサーバーに住み、
二度実行できるテストから本番への昇格手順があり、ロールバックは**試されている**（試された
ことのないロールバックは存在しない）。秘密については例外なしのルール：**チャット、ログ、
コミットで見られた秘密はもう秘密ではない**。ローテーションする、以上。

この大部分は骨組み（レッスン4）から既にある。このレッスンはそれを本番に向けて完成させる。

**課題。**

1. 本番に欠けているもので `docs/ENVIRONMENTS_SURVEY.md` を補完する：ドメイン、秘密がどこに
   住むか、継続的インテグレーションのクォータはどれだけか（GitHub Actionsを使うならプランの
   上限を確認：起源システムの一つはコミットごとに三度テストを走らせて使い切った）。
2. 貼る：

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

   頼んでいるのは：始める前のアクセス、コミットごとに一度だけのテスト、パッケージするだけの
   デプロイ、外にある設定、繰り返し可能な昇格、試されたロールバック、秘密に対する錠、そして
   人のための文書。

3. 最初の本番デプロイの前に、していなければレッスン11の監査をする。
4. 約束にデプロイのルーチンを加える：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

5. システムにまだ実際のユーザーがいない状態で最初の本番デプロイをする。そして**ロールバック
   を試す**：前のバージョンに戻して動いていることを見せ、次に新しいものに戻すよう頼む。
6. コースのどこかでチャットに秘密（APIキー、パスワード）を貼ったなら、貼る：

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

**完全性の検証。** コミットごとにテスト群は何度走るか（一度。リンクを求める）。リポジトリに
実際の設定値があるか（空の検索を求める）。`docs/DEPLOYMENT.md` を一人で追えるか。ロールバック
は試されたか、いつ、どんな証拠で。チャットに現れたすべての秘密はローテーションされたか。
継続的インテグレーションのクォータがどれだけ残っているか知っているか。

**提出物。** コミットごとに一度の継続的インテグレーション、パッケージするだけのデプロイ、
`docs/DEPLOYMENT.md`、試されたロールバック、有効な秘密検査、本番で動くシステム（まだ
ユーザーなし）。

**よくある間違い。** 「手で、速く、小さな変更だから」のデプロイ：小さな変更こそ本番を壊す。
誰もテストしないから。実際に見える値を持つ設定の例ファイル（実際の値だ）。そして必要な日まで
ロールバックを試さないこと。

**ガイドプロジェクトでは。** Turneraでは、継続的インテグレーションが各プッシュでテスト群
（この時点で約30のテスト、エンドツーエンドを含む）を走らせる。テストへのデプロイは `main`
へのマージで自動。本番への昇格はテストにあるバージョンをパッケージしてアップロードする
コマンドで、設定（メッセージプロバイダの鍵、決済プロバイダの鍵、データベースのURL）は
リポジトリにないサーバー上の環境ファイルに。ロールバックは前のバージョンでの同じコマンド。
そして秘密検査は鍵に見えるものを拒否する各コミットでの検証。

### レッスン 14 — 生きた文書と、人がAIなしで追えるマニュアル

**理解すべきこと。** システムはエージェントなしで、あなたなしで、使い、保守し、復旧できな
ければならない。復旧マニュアルの基準は具体的だ：**プログラミングをしない信頼できる人が、
午前三時に、システムがダウンしエージェントが接続できない状態で追えなければならない**。手順
が「開発者に相談」と言えば不完全だ。そしてモデルで文書を再生成するのは無料なので、ルールは
「同じコミットで」になる：ユーザーが見るもの、オペレータがすること、デプロイの仕方に触れる
すべての変更は、同じコミットでマニュアルを更新する。

**課題。**

1. 約束にルーチンを加える：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual in
> the same commit. If you do not know which manual, ask."

2. 貼る：

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

   頼んでいるのは：実際のスクリーンショット付きの三つのマニュアル、復旧マニュアルの午前三時
   基準、穴を残す代わりに事業だけが知ることを質問すること、そして日付とバージョン。

3. 実際のテスト：復旧マニュアルをプログラミングをしない誰か（オーナー、家族）に渡し、テスト
   環境で「ダウンした」の節を追ってもらう。詰まるところは、マニュアルを直す。
4. 次の画面変更の後、コミットがユーザーマニュアルに触れたことを確認する。

**完全性の検証。** 無作為のスクリーンショットは今日のテスト環境と一致するか。プログラミング
をしない誰かが「ダウンした」の節を追えたか。画面を変えた最後のコミットはマニュアルに触れた
か。「[要記入]」のような穴があるか。各マニュアルはどのバージョンに有効か言っているか。

**提出物。** 日付とバージョン付きの三つのマニュアル、そして人とのテスト済み。

**よくある間違い。** マニュアルを一度生成して約束にルーチンを入れないこと：二か月後にはもう
存在しない画面のスクリーンショットになる。「エージェントとのセッションを開く」で始まる復旧
マニュアル。そして人とのテストをしないこと：唯一価値のある検証だ。

**ガイドプロジェクトでは。** Turneraのユーザーマニュアルはスクリーンショット付きの六画面。
保守マニュアルは各モジュールの場所とテスト群の実行方法を説明。復旧マニュアルは順に、コマンド
付きで：システムがダウンしているかどう知るか、どう再起動するか、前のバージョンにどう戻すか、
最後のバックアップからデータベースをどう復元するか（毎晩行われる：これもこのレッスンから出る）、
誰に電話するか。責任者がテスト環境で追い、「データベースの復元」で詰まった。コマンドが彼女
にないフォルダを仮定していたからだ。マニュアルを直した。

### レッスン 15 — システムの中のエージェント、そして数字による振り返り

**理解すべきこと。** 二つのことがサイクルを閉じる。第一は任意：限定された範囲でエージェント
を本番に常駐させ、あなたがいなくても診断とサポートをさせる。これを律するルールは**誰かの名
において行動する**：認証情報は責任ある人に紐付けられ、することはすべてその人の名で記録
される。匿名アカウントではなく、上司のいる従業員だ。第二は必須：数字付きの振り返り。何が
かかったか、保留項目はいくつか、どれが往復したか、どんなインシデントがありどの段に落ちるか、
そして**はしごへの少なくとも一つの変更提案**。何も変えない振り返りは振り返りではなかった。

**課題（常駐エージェント、該当する場合）。**

1. オーナーとシステムに常駐エージェントが必要か決める。Turneraでは必要：受付は質問を持つ
   だろう（「なぜこの患者にリマインダーが届かなかった？」）。エージェントは誰も開発者を呼ば
   ずにログを読んで答えられる。
2. 貼る：

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

   頼んでいるのは：運用前の地図、地図の穴を宣言すること、一つ選べるよう三段階の範囲、そして
   人の名における認証情報。

3. レベルを選ぶ（始めるには常に最初のもの：読み取り専用と診断）。こう締める：

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

**課題（振り返り、常に）。**

4. あなただけが持つ数字を集める：何時間充てたか、AIツールにいくら使ったか、継続的インテグ
   レーションのクォータをどれだけ使ったか。
5. 貼る：

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

   頼んでいるのは：出所付きの数字、各インシデントを段に対応付けること（どの段にも落ちない
   インシデントは欠けている段）、持っていない数字を求めること、そしてはしごへの具体的な変更
   提案。

6. 変更提案を読む。妥当と思えば、改善提案としてUrazukeのリポジトリに送る（`CONTRIBUTING.md`
   参照）：それが方法が各プロジェクトから学ぶ方法だ。

**完全性の検証。** 地図はエージェントが見られないものを言っているか。範囲外の行動が拒否
されるのをログで見たか。認証情報は人の名で行動するか。振り返りには出所付きの数字があるか、
形容詞か。各インシデントは段に落ちるか。少なくとも一つの具体的な変更提案があるか。

**提出物。** `docs/RESIDENT_AGENT.md`（該当する場合）と `docs/RETROSPECTIVE_[日付].md`。

**よくある間違い。** 「すべて解決できるように」常駐エージェントに高いレベルを与えること：
読み取り専用から始め、証拠があれば上げる。すべてうまくいったと言う振り返り：すべてうまく
いくことはない。方法ではなくあなたのために書かれている。そして変更提案を送らないこと：第15段
は文書が書かれたときではなく、はしごが変わったときに閉じる。

**ガイドプロジェクトでは。** 典型的なコースでのTurneraの振り返り：六週間、受講者の約四十
時間、二十八の保留項目、最も往復したのはメッセージのもの（タイムゾーンとWhatsAppプロバイダ）。
二つのインシデント、一つは第8段（「不在」状態が画面にあってサーバーになかった）、一つは第13段
（テストの設定での本番デプロイ、デプロイ後のエンドツーエンド検証で検知）。変更提案：第13段の
デプロイルーチンが昇格前に「何が変わるか」だけでなくテストと本番の設定の差分を見せるよう
要求すること。

---

## 本番リリースのチェックリスト

十六のレッスンが終わったとき、システムはこのリストを満たす。Urazukeにおける「production
grade」の運用上の定義であり、オーナーとともに、コードを開かずに最終チェックリストとして
使える：

1. 決定、日付、名前付きの適格性シートがある（G0）。
2. エージェントが毎セッション読む共働の約束があり、読むことが試された（G1、G2）。
3. プロジェクトファイルは五分で読め、システムが何でないかを言う（G2）。
4. 出所付きの一次データ、計算付きの派生データ、「十倍」シナリオを持つサイジングがある（G3）。
5. 骨組みは空でデプロイされ、デプロイは二度実行された（G4）。
6. すべての変更に保留項目があり、閉じたすべての項目に証拠がある（G5）。
7. すべての事業ルールにオーナー、日付、原文の言葉がある（G6）。
8. すべての重要なテストは緑の前に赤で見られた。画面からバックエンドを検証するエンドツー
   エンドのテストがある（G7）。
9. すべてのリストに唯一の所有者がいる。生産者/消費者の地図がある。自動検査付きのアンチ
   パターンの記録がある（G8）。
10. 何かを決めたすべての数字に、あなたが実行できるテスト付きの計器がある（G9）。
11. すべての報告が検証済み、信じている、盲点を分ける（G10）。
12. 別のセッションによる監査が少なくとも一度あり、そのP0は保留項目である（G11）。
13. 帰結のあるすべての行動に赤のテスト付きの錠と戻り道がある。自動化はドライランモードを
    経た（G12）。
14. テストはコミットごとに一度走る。設定はリポジトリの外。ロールバックは試された。ローテー
    ションされていない秘密はリポジトリにもチャットにもない（G13）。
15. 日付とバージョン付きの三つのマニュアルがあり、プログラミングをしない人が復旧マニュアル
    を追った（G14）。
16. 数字付きの振り返りとはしごへの変更提案がある（G15）。

十六すべてが「はい」なら、システムは実装の準備ができている。どれかが「否」なら、どの段を
登り直すべきかもうわかっている。

---

## 付録A — 評価の仕方（コースを教える人、または自己評価する人のために）

レッスンごとの三段階の簡単なルーブリック：

- **登れていない**：提出物が欠けている、または完全性の検証のどれかが「否」。
- **登れた**：提出物が存在し、すべての検証が「はい」。
- **判断力の証拠付きで登れた**：加えて、受講者がそのレッスンでエージェントが何か間違った
  こと（仮定した、発明した、多めに報告した）をした事例と、どう検知したかを語れる。それが
  コースの本当の目標だ：成果物ではなく反射。

評価しないもの：コードの品質。誰も読まない。証拠の品質を評価する。

## 付録B — 各ツールへのコースの適応

プロンプトはどのツールでも同じだ。変わるのは、コースで `docs/WORKING_AGREEMENT.md` に加える
ルーチンがどこに行くかだ：

- **Claude Code**では、ルーチンはプロジェクトの `CLAUDE.md` に入り（またはそこから約束を
  含め）、各セッションで自動で読まれる。
- **Cursor**では、常に有効なルールとして `.cursor/rules/` に。
- **Codex CLI**または**Gemini CLI**では、ルートの `AGENTS.md` または `GEMINI.md` に。
- **Forge**では、約束とルーチンは教義であり、段のプロンプトは各ゲートを通過するとき自動で
  注入される。保留項目の記録はネイティブ。Forgeでのコースは、コピー＆ペーストの少ない同じ
  コースだ。

レッスン2の読み取りテストはすべてに有効：新しいセッションがシステムが何をしないか知らなけ
れば、ツールは約束を置いたファイルを読み込んでいない。

## 付録C — このマニュアルにまだないもの

- 受講した受講生。時間、よくある間違い、ガイドプロジェクトは受講者からではなく三つの起源
  システムから書かれている。最初の受講生がそれらを修正する（そしてそれは文字通り、コースに
  適用された第15段だ）。
- 適格性基準の重み（レッスン0）、策定中。
- 変更のたびに他言語版がスペイン語版と整合しているかの検証。
