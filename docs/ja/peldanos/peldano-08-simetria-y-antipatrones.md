# ステップ 8 — 生産者と消費者の対称性、そしてアンチパターンの記録（段の契約）

**フェーズ：** ループ（二者間の契約に触れるすべての変更）。
**形式：** ループ内で自動。加えて、痛い目に遭うたびに育つファイル。
**規模：** 対称性は常に必須。生産者/消費者の地図は単一モジュールのプロジェクトでは任意、
画面とサーバーが分かれた瞬間から必須。

## 何のためか

一方の端（サーバー、ロボット、データベースのスキーマ）を変えたら、もう一方の端（画面、
カウンタ、消費者）も同じコミットで変わらなければならない。さもなければ遅かれ早かれ乖離し、
ユーザーは一方である数字を、他方で別の数字を見る（1,355対1,234の事例）。そして一度払った
誤りは、二度払わないように書き留める。

背後の一般原則：**すべてのリストには唯一の所有者がいる**。テーブルの列、注文の取りうる
状態、何かが待つ理由。それらはシステムの一部分（生産者）だけが定義し、他はすべてそこから
読む。同じリストのコピーが二つある瞬間、どちらかがずれている。どちらかを知るだけだ。

## 1. 必要な文脈

- システムのどの部分が何を消費するかの地図：どの画面がどのサービスを読み、どのプロセスが
  どのテーブルに書くか。なければ最初のプロンプトが作る。
- アンチパターンの記録 `docs/GOTCHAS.md`、空でも。

## 2. プロンプト

**地図を作るために（一度）：**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

何を求めているか：契約とその両側の目録。そしてこの段向けの完全性条項：見えないものは
省くのではなく宣言する。隠れた穴のある地図は、地図がないより悪い。

**ルーチン（共働の約束に入れる）：**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

何を求めているか：反射としての対称性（閉じる前に相手側を探す）、唯一の所有者を持つリストの
ルール、そして使うにつれて地図が自ら保守されること。

**何かが二度目に壊れたとき：**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

何を求めているか：アンチパターンの固定形式（匂い、根本原因、修正、早期検知）、そして何より
自動検査。書き留めただけで自動化されていないアンチパターンは、人やセッションが変わると
繰り返される。

## 3. 期待される成果物

- `docs/PRODUCER_CONSUMER_MAP.md`：契約のリスト、生産者と消費者付き。
- 契約に触れる各コミットに：更新された消費者、メッセージに名前付きで。
- `docs/GOTCHAS.md`：アンチパターンごとに一項目、四つの部分（匂い、根本原因、修正、事前の
  検知法）と最初に起きた日付付き。

## 4. 完全性の検証

- 地図から契約を一つ選び、エージェントに各消費者がどこでそれを読むか見せてもらう。誰かが
  リストの自分のコピーを持っていれば負債がある。
- 二つの異なる画面に表示される数字はあるか。比べよ。同じか。
- GOTCHASの各項目に四つの部分があるか。
- 既にGOTCHASにある誤りが繰り返されたか。そうなら自動検査が欠けている。

## 5. 警告サイン

- 同じ値が複数のファイルに手書きで現れる（サーバーと画面に「保留」「承認済み」）。二つの
  コピー。どちらかが乖離する。
- サーバーの変更がサーバーのテストが緑で閉じられ、誰も画面に触れていない。
- GOTCHASに「事前の検知法」の部分がない項目がある。逸話であってアンチパターンではない。
