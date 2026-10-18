# ステップ 8 — 生産者と消費者の対称性、そしてアンチパターンの記録（段の契約）

**区間：** ループ。
**いつ：** システムの二つの部分間の契約に触れる各保留項目とともに。契約の地図は、既に画面と
サーバーがある二つ目の機能ブロックを開くときに構築する。アンチパターンの記録は、何かが二度
目に壊れるたびに育つ。
**形式：** ループ内で自動。加えて痛手ごとに育つファイル。
**規模：** 対称性は常に必須。生産者/消費者の地図は単一モジュールのプロジェクトでは任意で、
画面とサーバーが分かれた途端に必須。

## 何のためか

一方の端（サーバー、ロボット、データベースのスキーマ）を変えたら、もう一方の端（画面、
カウンタ、消費者）を同じコミットで変えさせること。さもなければ遅かれ早かれ乖離し、ユーザー
は一方である数字を、他方で別の数字を見る [Ref. 26](../REFERENCIAS.md#ref-26)。そして既に
一度払った誤りは、二度払わないよう記すこと [Ref. 2](../REFERENCIAS.md#ref-2)。

背後にある一般原則、共済組合で課し、すべてのシステムに通用するもの
[Ref. 27](../REFERENCIAS.md#ref-27)：**すべてのリストには一人の所有者しかいない**。テーブル
の列、注文の可能な状態、何かが待つ理由：システムの一つの部分（生産者）だけがそれを定義し、
他のすべてはそこから読む。同じリストのコピーが二つあった途端、一方は古い。どちらかを知る
だけだ。第2段のセマンティックツリーは、そのリストが最初に宣言される場所だ。エンティティの
状態はそこにあり、コードはそれを単一の源から読まねばならない。

## 1. 必要な文脈

- システムのどの部分が何を消費するかの地図：どの画面がどのサービスを読むか、どのプロセスが
  どのテーブルに書くか。なければ最初のプロンプトが構築する。
- アンチパターンの記録 `docs/GOTCHAS.md`、空でも。

## 2. プロンプト

**地図を構築するために（一度）：**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [ja]
> `docs/PRODUCER_CONSUMER_MAP.md` を構築してください：システムのすべての契約（サービス、
> テーブル、ファイル形式、値のリスト）について、誰がそれを生産し誰が消費するか。アクセス
> できない、または理解できないシステムの部分があれば、地図から外す代わりに私に教えてくだ
> さい。私の言語で答えてください。

何を求めているか：二つの側を持つ契約の目録、そしてこの段に合わせた形の完全性の条項：見え
ないものは宣言され、省略されない。隠れた穴のある地図は、地図がないより悪い。

**ルーチン（共働の約束に入れる）：**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [ja]
> 契約に触れる変更を閉じる前に、地図で各消費者を探し、同じコミットで更新してください。
> 常に、生産者がリスト（列、理由、状態）を定義し消費者がそれを読む方を、それぞれが自分の
> コピーを持つより優先してください。地図にその関係がなければ、追加してください。

何を求めているか：反射としての対称性（閉じる前に相手側を探す）、一人の所有者を持つリスト
のルール、そして地図が使われるにつれて自然に保守されること。

**何かが二度目に壊れたとき：**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [ja]
> これは以前にも起きました。`docs/GOTCHAS.md` に記録してください：どう匂うか（早期の兆候）、
> 根本原因、修正、そして次回痛む前にどう検知するか。そして可能なら、それを検知するテスト
> または自動チェックを追加してください。

何を求めているか：アンチパターンの固定形式（匂い、根本原因、修正、早期検知）、そして何より
自動検証：記されたが自動化されていないアンチパターンは、人やセッションが変われば繰り返す。

## 3. 期待される成果物

- `docs/PRODUCER_CONSUMER_MAP.md`：生産者と消費者付きの契約のリスト。
- 契約に触れる各コミットに：更新された消費者、メッセージ内で名前付き。
- `docs/GOTCHAS.md`：アンチパターンごとに一項目、四つの部分（匂い、根本原因、修正、事前の
  検知法）と最初の発生日付き。

## 4. 完全性の検証

- 地図から契約を一つ選び、エージェントに各消費者がどこでそれを読んでいるか見せるよう求める
  こと。誰かがリストの自分のコピーを持っているなら、負債がある。
- 二つの異なる画面に表示される数字があるか？ 比べること：同じか？
- GOTCHASの各項目に四つの部分があるか？
- 既にGOTCHASにあった誤りが繰り返されたか？ そうなら、自動検証が欠けている。

## 5. 警告サイン

- 同じ値が複数のファイルに手書きで現れる（サーバーと画面に「PENDIENTE」「APROBADA」）。
  コピーが二つ。一方は乖離する。
- サーバーへの変更がサーバーのテストの緑で閉じられ、誰も画面に触れなかった。
- GOTCHASに「事前にどう検知するか」の部分のない項目がある。逸話であって、アンチパターン
  ではない。
