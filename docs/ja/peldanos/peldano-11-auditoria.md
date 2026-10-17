# ステップ 11 — 計画への入力としての定期監査（段の契約）

**フェーズ：** 運用（ときどき：大きな段階の締め、重要なデプロイの前、または一、二か月ごと）。
**形式：** 長い一回の送信、理想的には構築するエージェントとは別のエージェントに。
**規模：** どのプロジェクトでも最初の本番デプロイの前に必須。その後は変更の速度に比例
（毎週変わるシステムは毎月監査、安定したものは半年ごと）。

## 何のためか

ときどきシステム全体を新鮮な目で見て、見えたものを保留項目に変換するため。監査は保管する
報告書ではない。計画だ。誰も見ていなかったコードに書かれたパスワード、テーブル全体を読む
264のクエリ、依存関係の既知の脆弱性、2,679行のコンポーネントを防ぐ。そして品質管理の独立性
を一歩内側に持ち込んだものだ。監査する者は構築した者ではない。

独立性について：別の会社も別のツールも要らない。**別のセッション、別の指示ファイル、構築に
参加していないもの**で十分だ。求めるのは監査者が構築者の前提を共有しないことだ。モジュール
を構築したモデルはハードコードされたパスワードが暫定だと「知っている」。初めて見るモデルは
それをあるがままに報告する。

## 1. 必要な文脈

- 完全なリポジトリ、読み取り専用。
- 本番またはテスト環境、読み取り専用（データベース、ログ）。
- 前回の監査、あれば。何が変わったか測るため。
- 範囲：整合性、セキュリティ、性能、コード品質、または全部。

## 2. プロンプト

**最初（可能なら構築者とは別のエージェントに）：**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

何を求めているか、条項ごとに：読み取り専用（監査者は修正せず提案する）。監査向けの完全性
条項：**検証できなかったものは宣言し、省略で合格にしない**。サンプルではなくすべてのコード。
重大な発見はたいてい誰も見ない場所にあるから。各発見に位置、リスク、証拠、優先度。報告を
読み返さずに行動できるように。次元ごとの評点、前回の監査と比べるため。そしてP0は既に提案
保留項目に変換済み。

**締め（構築者に）：**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

何を求めているか：監査が保留項目に変換されること（さもなければ保管される報告書だ）。そして
不同意は黙ってではなく、明示的に証拠付きで。

## 3. 期待される成果物

- `docs/AUDIT_[date].md`：範囲、検証できたものとできなかったもの（と理由）、位置・リスク・
  証拠・優先度付きの発見、次元ごとの評点、提案保留項目のリスト。
- `docs/PENDING.md` に：各P0とP1に一項目、発見を引用して。

## 4. 完全性の検証

- 報告は何を検証できなかったか言っているか。すべて検証したと言うなら疑え。
- 発見を二つ選ぶ。ファイルと行、再現できる証拠があるか。
- 監査を閉じる前に各P0に項目が開かれているか。
- 次元ごとの評点は前回の監査と比べられるか。
- 構築したのと同じエージェントが監査したか。そうならP0に第二の目を求めよ。

## 5. 警告サイン

- 監査がP0を一つも見つけなかった。三か月以上稼働したシステムではほとんどあり得ない。範囲が
  小さかったか、監査者が前提を共有していた可能性が高い。
- 発見にファイルの行がない。意見であって発見ではない。
- 二週間経ってもP0に保留項目がない。監査は保管された。
