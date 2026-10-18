# ステップ 15 — システムの中のエージェント、そして数字による振り返り（段の契約）

**区間：** 運用と締め。
**いつ：** 常駐エージェントは、本番への最初のデプロイの後、運用に入るとき。振り返りは各段階
とプロジェクトの締めに。次のプロジェクトのために第0段へ戻る。
**形式：** 二部構成：常駐エージェントの範囲を定める対話と、振り返りのための長い送信。
**規模：** 常駐エージェントは任意（多くのシステムは必要としない。サポートを求めるユーザー
のいるシステムは必要とする）。振り返りはすべてのプロジェクトで必須、一ページでも。それ
なしには方法は学ばない。

## 何のためか

同じサイクルを閉じる二つのこと。第一：常駐エージェントを限定された範囲で本番に残し、
あなたがいなくても診断し、運用し、サポートできるようにすること
[Ref. 13](../REFERENCIAS.md#ref-13)。第二：方法自体を数字で見直し、学んだことがはしごを
変えるようにすること。システムの地図なしに運用するエージェントと、学ばずにプロジェクト
ごとに同じことを繰り返す方法を防ぐ。エージェントのチームまるごとを廃止するに至った数字に
よる振り返りが、後者の模範だ [Ref. 6](../REFERENCIAS.md#ref-6)。

常駐エージェントについて、すべてを律するルール：**誰かの名において行動する**。その認証
情報は責任ある人に紐付けられ、することのすべてがその人の名で記録される。匿名のシステム
アカウントではない。上司のいる従業員だ。それがその範囲（その人が許可したこと）とトレー
サビリティ（したことに誰が責任を負うか）を定める。

## 1. 必要な文脈

常駐エージェントのために：
- エージェントが本番で何をできて何をできないか：読む、診断する、設定を変える、行動を実行
  する。あなたが決める。
- エージェントはシステムに対してどう識別されるか（責任ある人に紐付けられた固有の認証情報）。
- 解決できないものを見つけたとき誰に知らせるか（チケット、メール）。

振り返りのために：
- プロジェクトのインシデント、コスト（トークン、クォータ、あなたの時間）、最も往復の多かった
  保留項目、そして日付。

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

> [ja]
> あなたを本番に常駐させます。まず、運用のために必要になるシステムの地図を構築してくだ
> さい：モジュール、環境、各設定がどこに住むか、どの行動に帰結があるか（`docs/LOCKS.md` を
> 読んでください）、誰に通知するか。あなたのいる場所から見えないシステムの部分があれば、
> 私に教えてください。地図に隠れた穴があってはなりません。次にあなたの範囲を三つのレベルで
> 提案してください：読み取り専用と診断。私の承認付きの設定変更。錠の背後の帰結のある行動。
> 私がレベルを選びます。あなたの認証情報はそれを作った人として行動します。あなたがする
> すべてはその人の名で記録されます。私の言語で答えてください。

何を求めているか：運用する前のシステムの地図（地図なしで運用することがこの段が防ぐ失敗
だ）。この段に合わせた形の完全性の条項：**地図の穴は宣言され、隠されない**。あなたが
「場合による」ではなく一つを選べるようにする三つの範囲のレベル。そして人の名における
認証情報のルール。

**常駐エージェントのために（締め）：**

> Level [X]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the credential (never its
> value), and the procedure to request my approval. Then prove, with a real attempt recorded in
> the log, that something outside your scope is rejected.

> [ja]
> レベル[X]。`docs/RESIDENT_AGENT.md` に地図、範囲、認証情報（決してその値ではなく）、私の
> 承認を求める手順を書いてください。その後、ログに記録された実際の試みで、あなたの範囲外の
> ことが拒否されることを証明してください。

何を求めているか：常駐エージェントの文書（認証情報の値なしで、決して）、そして範囲の赤の
証明：レベル外のことをする、記録された実際の試みが、拒否される。権限に適用された第7段だ。

**振り返りのために：**

> [The stage / the project] is over. Do the retrospective with numbers, not impressions: what it
> cost (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [ja]
> [段階 / プロジェクト]が終わりました。印象ではなく数字で振り返りをしてください：何がかかっ
> たか（トークン、クォータ、私の時間）、保留項目はいくつ、どれが最も往復を要しなぜか、どんな
> インシデントが起き、それぞれがはしごのどの段に落ちるか、そしてどの段が失敗したか、欠けて
> いたか。ある数字のデータがなければ（例えば私の時間）、私に求めるか推定と印してください。
> 発明しないでください。はしごを変える具体的な提案で終えてください：どの段をどう修正し、
> どのインシデントがそれを正当化するか。`docs/RETROSPECTIVE_[日付].md` に書いてください。
> 私の言語で答えてください。

何を求めているか：出所付きの数字（コスト、保留項目、往復、インシデント）。各インシデント
を段に対応付けること、どの段にも落ちないインシデントは欠けている段だから。持っていない
数字のための完全性の条項（求めるか推定と印す）。そして**はしごへの少なくとも一つの具体的
な変更提案**、何も変えない振り返りは振り返りではなかったから。

## 3. 期待される成果物

- `docs/RESIDENT_AGENT.md`：システムの地図、選んだ範囲、人に紐付けられた認証情報、承認の
  手順、そしてログに記録された拒否の証明。
- `docs/RETROSPECTIVE_[日付].md`：出所付きの数字、段に対応付けられたインシデント、そして
  正当化付きのはしごへの少なくとも一つの変更提案。

## 4. 完全性の検証

- システムの地図はエージェントが何を見られ**ない**かを言っているか？ 言っていなければ、
  隠れた穴がある。
- 範囲外の行動が拒否されることを試した（またはログで見た）か？
- エージェントの認証情報は識別できる人の名において行動しているか？
- 振り返りには出所付きの数字があるか、形容詞か？（「とてもかかった」は数字ではない。）
- 各インシデントは段に落ちるか？ どれにも落ちないものがあれば、段が欠けている。それが
  変更提案だ。
- はしごへの少なくとも一つの具体的な変更提案があるか？ 振り返りが何も変えないなら、
  振り返りではなかった。

## 5. 警告サイン

- 常駐エージェントが毎週より高い権限レベルを「必要とする」。求めているのがシステムの問題を
  解決するためか、自身の限界のためか見直すこと。
- 振り返りがすべてうまくいったと言う。すべてうまくいくことは決してない。あなたのために
  書かれており、方法のためではない。
- 連続する二つのプロジェクトで同じインシデントが起き、その間にはしごが変わらなかった。
  第15段が閉じられていない。振り返りは書かれるが適用されない。
