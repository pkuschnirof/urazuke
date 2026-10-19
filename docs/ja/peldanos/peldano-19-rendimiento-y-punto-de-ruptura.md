# ステップ 19 — 量に対する性能テストと破断点（段の契約）

**区間：** 運用品質、本番への最初のデプロイの前。
**いつ：** 本番リリースのフェーズで、第16段の後（可観測性がなければ何が壊れたかわからない）
と第17段の後（最適化済みの永続化の上で）、そして本番への最初のデプロイの前に。アーキテク
チャ、永続化、重要なフローを変えるデプロイのたびに、そしてサイジングが変わるとき（別の顧客に
売る、量が倍になる）に繰り返す。レガシーでは、N6で計測した量で、正常化の後の最初のデプロイの
前に走らせる。
**形式：** 一回の送信。エージェントが負荷をかけ、計測し、壊す。あなたは数字と破断点を読む。
**規模：** 比例的：小さいプロジェクトでは期待される量での一回と「十倍」での一回。帰結のある
プロジェクトでは完全版、破断点を見つけ、監視のために閾値を記録して。

## 何のためか

第3段は計算でサイジングした。この段はその計算を、実際に動いているシステムで確かめる。最初の
ユーザーが入る前に三つのことを知りたい。業務が言った量でシステムがどうふるまうか（最もよく使
われる画面はオーナーが我慢できる時間で応答するか）。「十倍」でどうふるまうか（耐えるか、何が
最初に耐えなくなるか）。そして**どこで壊れるか**：何かが折れる正確な負荷と、その何かが何か
（データベースへの接続、メモリ、キュー、ロック）。破断点はこの区間で最も役に立つ数字だ。そこ
から第20段の警報の閾値が出るからだ。「目分量」で置かれた警報は遅れて知らせるか、いつも知らせ
る。計測された破断点の下に余裕を持って置かれた警報は、まだ時間のあるうちに知らせる。本番のシ
ステムから取り出したスケールのパターン [Ref. 12](../REFERENCIAS.md#ref-12) と、メモリで死んでテ
ストの失敗に見えたテスト群 [Ref. 44](../REFERENCIAS.md#ref-44) が二つの先例だ。前者は実際の負荷
を計測することの、後者は時間内に見つからなかった破断点が別のものに化けることの。

**初心者の方へ。** *負荷テスト*とは、何が起きるかを見るために、多くの利用者が同時にシステム
を使うところを模擬するプログラムのことです。*スループット*とは一秒あたり何件の行動に耐えるか
です。*レイテンシ*とは一つの行動が応答するのにかかる時間で、*中央値*（行動の半分はこれより短
かった）と*95パーセンタイル*（95%はこれより短かった。残りの5%が苦情を言う利用者です）を見ま
す。*破断点*とは、何かが動かなくなる負荷の量のことです：「遅くなる」ではなく「データベースへ
の接続が尽きた」「メモリがいっぱいになった」。そして*閾値*とは、そこから先は監視が知らせる限
界の数字です。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- サイジング（第3段またはN6）：期待される量と「十倍」。
- 可観測性（16）が点いていること。何が壊れるかを見るために。
- 最適化された永続化（17）とその予算。
- 資源の面で本番に似たテスト環境、または何が違うかの自覚。
- 重要なフロー（セマンティックツリーのもの、レガシーでは特性化のもの）。

## 2. プロンプト

**最初（負荷をかけ、計測し、壊す）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- `docs/SIZING.md`、期待される量（ピーク時の同時ユーザー、時間あたりのイベント、テーブルごと
  の行数）と「十倍」とともに：これが負荷の二つの段です。
- プロンプトの空欄のための重要なフローのリスト、セマンティックツリーからあなたが書いたもの：
  最もよく使われるものと帰結のあるもの。三つから六つのあいだ。
- 本番に匹敵する資源を持つテスト環境。不可能なら、何が違うか（メモリが半分、別のエンジン）
  を `docs/ENVIRONMENTS_SURVEY.md` に書き留めること。数字をその補正とともに読むためです。
- テスト環境に期待される量のデータ（第17段と同じスクリプト）。
- オーナーとともに、あなたの許容：業務が受け入れられると考えるために、最もよく使われる画面は
  どれだけ時間がかかってよいか（二秒、五秒）。その数字がなければ結果は判定できません。
- 最低限受け入れられる状態：負荷の二つの段、重要なフロー、許容を知っていること。

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck. Reply in my language.

> [ja]
> このシステムが `docs/SIZING.md` の量でどうふるまうか、そしてどこで壊れるかを調べます。テス
> ト環境で、第16段の可観測性を点け、期待される量のデータを読み込んだ状態で：(1) リポジトリに
> 住み、重要なフロー[リスト]を、利用者がするように画面またはAPIから操作する負荷スクリプトを
> 書いてください。同時ユーザー数と継続時間は設定可能で、スクリプトが本当に各フローを動かして
> いること（バックエンドでの効果が現れること）を証明するテスト付きで。(2) 期待される量で走ら
> せ、フローごとに見せてください：スループット、中央値と95パーセンタイルのレイテンシ、エラー
> 率、そして実行中のサーバーとデータベースの資源使用。(3) 期待される量の十倍で走らせ、同じも
> のを見せてください。(4) 何かが壊れるまで負荷を一段ずつ上げ、最初に何が壊れたか（データベー
> スへの接続、メモリ、キュー、ロック、ディスク）とどの負荷でかを正確に言ってください：それが
> 破断点です。(5) 各数字を `docs/PERSISTENCE.md` の予算、私が与えた許容（最もよく使われる画
> 面について[許容]）、そしてサイジングの前提と比べ、もしあればどの前提が間違っていたか言って
> ください。まだ何も最適化しないでください。`docs/PERFORMANCE_[日付].md` に数字、コマンド、
> 破断点、そして最初のボトルネックについてのあなたの診断を書いてください。私の言語で答えてく
> ださい。

何を求めているか：もう一つの計器である負荷スクリプト（リポジトリに住みテストを持つ。フローを
動かさない負荷スクリプトは空気を計測するからだ）。三つの実行（期待される量、十倍、壊れるま
で）。コマンド付きの数字。予算、業務の許容、サイジングの前提との比較。そこで第3段が何かを間
違えていたことが見つかる。そして**まだ何も最適化しない**こと。診断を読まずに最適化するのは、
そうではなかったものを変えることだからだ。

**締め（閾値と保留項目）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- あなたが読んだ `docs/PERFORMANCE_[日付].md`、業務の許容を隣に置いて：最もよく使われる画面
  は期待される量で許容に収まりますか？ 「十倍」では？
- オーナーとともに、「十倍」についての決定：業務が成長を計画しているなら、「十倍」より下のボ
  トルネックは今の保留項目。そうでなければ待てます、日付とともに。
- 最低限受け入れられる状態：破断点を読み、どのボトルネックを今直すか決めたこと。

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 20) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.

> [ja]
> `docs/PERFORMANCE.md` に記録してください：期待される量、十倍の量、何が壊れるかとともに書い
> た破断点、そして監視（第20段）が使うことになる警報の閾値。閾値は破断点の下に余裕を持って、
> 期待される量の上に置いてください。[期待される量の十倍 / 私が決めた量]より下にあるボトル
> ネックごとに保留項目を開き、計測された数字を受け入れ基準にしてください。負荷テストを
> `docs/GATES.md` のゲートにしてください：アーキテクチャ、永続化、重要なフローを変えるデプロ
> イのたびに走らせ直し、その結果を日付とバージョンとともに保管します。最初の実行が保管された
> のを見せてください。

何を求めているか：破断点から導かれた警報の閾値。それが第20段との接続だ。数字を基準として持つ
保留項目としてのボトルネック（そうすれば「今は速くなった」ではなく証拠で閉じられる）。そして
保管されたゲートとしての負荷テスト。六か月後に比べられるように。

## 3. 期待される成果物

- リポジトリの中の、テスト付きの負荷スクリプト。
- `docs/PERFORMANCE_[日付].md`、三つの実行、数字、破断点、診断とともに。
  `docs/PERFORMANCE.md`、閾値とゲートとともに。
- 決めた量より下のボトルネックごとに一つの保留項目。
- それを必要とするデプロイの前のゲートとしての負荷テスト。

## 4. 完全性の検証

- 最もよく使われる画面は、期待される量で、オーナーの許容より短いですか？ そうでなければ、そ
  の数字とともに開いた保留項目がありますか？
- 破断点は何がどの負荷で壊れたかを言っていますか、それとも「システムが遅くなった」と言ってい
  ますか？
- `docs/PERFORMANCE.md` の閾値は破断点の下、期待される量の上にありますか？
- もらったコマンドで、あなた自身がスクリプトを期待される量で走らせること：数字は似ています
  か？
- テスト環境は資源の面で本番と違いますか、そしてどう違うか書き留めてありますか？

## 5. 警告サイン

- 破断点なしの「十倍を問題なく耐える」。どこで壊れるかを見つけていないなら、負荷を十分に上げ
  ていない。
- 画面が負荷をかける場所なのに、負荷スクリプトはAPIを叩いて画面を通らない。別のものを計測し
  ている。
- 結果がテスト環境ではなくエージェントのマシンでの実行のもの。
- 「ついでに」テストの最中にボトルネックが直された。もうどの数字がどのバージョンのものかわか
  らない。
