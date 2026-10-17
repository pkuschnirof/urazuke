# ステップ 15 — システムの中のエージェント、そして数字による振り返り（段の契約）

**フェーズ：** 運用（システムが既に本番にあるとき）と締め（次のプロジェクトのため第0段へ
戻る）。
**形式：** 二部構成：常駐エージェントの範囲を定める対話と、振り返りのための長い一回の送信。
**規模：** 常駐エージェントは任意（多くのシステムには不要。サポートを求めるユーザーがいる
ものには必要）。振り返りはすべてのプロジェクトで必須、一ページでも。それなしでは方法は
学ばない。

## 何のためか

同じサイクルを閉じる二つのこと。第一：エージェントが限定された範囲で本番に常駐し、構築者が
いなくても診断、運用、サポートを行う。第二：方法自体が数字で見直され、学んだことがはしごを
変える。システムの地図なしに運用するエージェントと、プロジェクトごとに学ばず同じことを
繰り返す方法を防ぐ（マルチエージェントのチームは振り返りで閉じられた：60ドルと73分対90分）。

常駐エージェントについて、すべてを律するルール：**誰かの名において行動する**。その認証情報
は責任ある人に紐付けられ、することはすべてその人の名で記録される。匿名のシステムアカウント
ではない。上司のいる従業員だ。これがその範囲（その人が許可したこと）と追跡可能性（したこと
に誰が責任を負うか）を定める。

## 1. 必要な文脈

常駐エージェントのために：
- エージェントが本番で何をできて何をできないか：読む、診断する、設定を変える、行動を実行
  する。オーナーが決める。
- エージェントがシステムに対してどう身元を示すか（責任ある人に紐付いた自身の認証情報）。
- 解決できないものを見つけたとき誰に知らせるか（チケット、メール）。

振り返りのために：
- プロジェクトのインシデント、コスト（トークン、クォータ、オーナーの時間）、最も往復した
  保留項目、日付。

## 2. プロンプト

**常駐エージェントのために（最初）：**

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

何を求めているか：運用する前のシステムの地図（地図なしの運用がこの段の防ぐ失敗）。この段向け
の完全性条項：**地図の穴は隠さず宣言する**。オーナーが「場合による」ではなく一つ選べるよう
三段階の範囲。そして人の名における認証情報のルール。

**常駐エージェントのために（締め）：**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

何を求めているか：常駐エージェントの文書（認証情報の値は決して含めない）、そして範囲の赤の
証明：レベル外のことをする実際の記録された試みが拒否されること。権限に適用した第7段だ。

**振り返りのために：**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

何を求めているか：出所付きの数字（コスト、項目、往復、インシデント）。各インシデントを段に
対応付けること、どの段にも落ちないインシデントは欠けている段だから。持っていない数字のための
完全性条項（求めるか推定と印す）。そして**はしごへの具体的な変更提案を少なくとも一つ**、
何も変えない振り返りは振り返りではなかったから。

## 3. 期待される成果物

- `docs/RESIDENT_AGENT.md`：システムの地図、選んだ範囲、人に紐付いた認証情報、承認手順、
  ログに記録された拒否の証拠。
- `docs/RETROSPECTIVE_[date].md`：出所付きの数字、段に対応付けられたインシデント、理由付きの
  はしごへの変更提案を少なくとも一つ。

## 4. 完全性の検証

- システムの地図はエージェントが見られないものを言っているか。言っていなければ隠れた穴が
  ある。
- 範囲外の行動が拒否されるのを試した（またはログで見た）か。
- エージェントの認証情報は特定可能な人の名で行動するか。
- 振り返りには出所付きの数字があるか、それとも形容詞か。（「高くついた」は数字ではない。）
- 各インシデントはある段に落ちるか。どれにも落ちないものがあれば段が欠けている。それが
  変更提案だ。
- はしごへの具体的な変更提案が少なくとも一つあるか。振り返りが何も変えないなら、振り返り
  ではなかった。

## 5. 警告サイン

- 常駐エージェントが毎週より高い権限レベルを「必要とする」。求めているものがシステムの
  問題の解決のためか、自身の制限のためか確認せよ。
- 振り返りがすべてうまくいったと言う。すべてうまくいくことはない。方法ではなくオーナーの
  ために書かれている。
- 二つ連続のプロジェクトで同じインシデントがあり、間ではしごが変わらなかった。第15段が
  閉じていない。振り返りを書いて適用していない。
