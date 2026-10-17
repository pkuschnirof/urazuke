# ステップ 9 — 構築の前に計測する、自身も検証される計器で（段の契約）

**フェーズ：** ループ（数字が決定に入力されるたびに）。
**形式：** 計測ごとに一回の送信。仮説がオーナーのものなら対話になることも。
**規模：** 比例する。小さいプロジェクトなら「計測」はコマンドで数えて日付付きで数字を記す
ことでよい。ラチェットとクエリ予算はボリュームのあるシステム向け。規模で変わらないもの：
何かを決める数字は印象からは出ない。

## 何のためか

決定に入力されるすべての数字が、テキスト検索でも、印象でも、「百くらいだと思う」でもなく、
テスト付きのプログラムから出るため。そして計器自体が監査されるため。計器は嘘をつく。
Kikanではある計器がカウンタゼロで84回の呼び出しを見落とし、別の計器は44のところ27と言った。
五つのルール：ガード付きの計器。計器がなければ作る。双方向で監査する。近似は印す。実行者は
計画者の数字を検証する。

この段が存在する根本的な理由：モデルは数字付きの主張（「この種のループは約120ある」）を
作るのがとても上手で、それらは計測されたときも推定されたときもまったく同じに聞こえる。
オーナーには口調で区別する術がない。唯一の方法は計器を要求すること：「何で測った？コマンド
を見せて」。コマンドがなければ、小数点が何桁あろうと印象だ。

## 1. 必要な文脈

- オーナーまたはエージェントの仮説：「問題はXだと思う」「百くらいのはずだ」。
- 計測したいものへのアクセス：コード、読み取り専用のデータベース、ログ。
- リポジトリに既にある計器、あれば。

## 2. プロンプト

**最初：**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

何を求めているか、条項ごとに：**リポジトリ内**の計器（失われる野良コマンドではなく）。既知
の事例に対する**計器のテスト**（ガード）。計測向けの完全性条項（アクセスを求め、黙って近似
しない）。近似をその誤差幅付きで印すこと。オーナーが実行できるよう、数字を**生成する
コマンドとともに**。双方向の監査、嘘をついた二つの計器を暴いたもの。そして順序：まず計測、
次に提案。

**予算があるとき：**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

何を求めているか：予算が丸い数字ではなく計測値プラス少しであること。超えたら失敗する
テストがあること。こうして性能の退行は本番ではなくテスト群で現れる。

**計画者が数字を出したとき（ルール五）：**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

何を求めているか：実行者が計画者の数字を信用しないこと。別セッションの同じモデルであって
も。Kikanでは計画の四つの主張のうち三つが誤っていた。計器があったところでは数字は正確
だった。

## 3. 期待される成果物

- リポジトリ内の計器（`tools/measure_*.py`、`scripts/meter-*.mjs` など）、そのテスト付き。
- 数字、生成するコマンドと日付付き。
- 双方向の監査、二、三行で書かれたもの。
- 近似はそうと印され、誤差幅付き。
- 予算があれば：値、誤差幅、守るテスト。
- コミットに："measured: [number] with [meter]"。

## 4. 完全性の検証

- 計器のコマンドを自分で実行して同じ数字が出るか。（あなたが実行する。理解する必要はない、
  実行するだけ。）
- 計器にテストはあるか。どの既知の事例に対して。
- 報告に計器の裏付けのない数字があるか。出所を尋ねよ。
- 近似は印されているか。
- 計画に数字があったなら、エージェントは実行前に検証し、合わなかったものを告げたか。

## 5. 警告サイン

- コードが変わっていないのに二つの報告の間で数字が変わった。どちらかは計測されていない。
- 計器がゼロを出す。ほとんどゼロではない。ほとんど常に計器が何かを見落としている（Kikanで
  二度）。
- エージェントが時間節約のため「計測しながら」構築を提案する。順序が方法だ：まず数字、次に
  計画。
