# ステップ 14 — フェイルクローズド、錠、静かな損害ゼロ（段の契約）

**区間：** 本番リリース。
**いつ：** 本番リリース区間で、請求し、送信し、承認し、削除する機能を構築する**前**に。帰結
のある新しい行動ごとに見直す。新しい自動化はドライランモードで始め、数日その記録を見た
後に有効化する。
**形式：** 対話。エージェントが帰結のある行動を列挙し、あなたがどれにどの種類の錠を付ける
か確認する。
**規模：** システムが不可逆なこと（請求、送信、削除、承認）をする途端に必須。読み取り専用
のシステムは飛ばせる。世界に作用する最初のボタンを得た瞬間、この段は最も重要なものになる。

## 何のためか

システムが、疑いや故障の前で行動**しない**ようにし、そしてそう言うようにすること。当たり前
に聞こえるが、ソフトウェアが既定でやることの逆だ。ソフトウェアは疑いの前で進む。二重請求、
人を通さない自動承認、認証情報をアップロードする `git add -A`、顧客データの削除を防ぐ。
共済組合で私が設置した錠が模範だ：二重の安全装置付き緊急ボタン、ドライランモードの自動
承認者、ガード付きの番人 [Ref. 28](../REFERENCIAS.md#ref-28)。そして故障がリスト全体を
壊す代わりに行をボタンなしで残すという反射 [Ref. 25](../REFERENCIAS.md#ref-25)。

この原則には名前があり、「フェイルクローズド」、物理的セキュリティから来ている：停電した
とき閉じたままになる防犯扉。反対の「フェイルオープン」は開く扉だ。ソフトウェアでは
ほとんどのものが既定でフェイルオープンだ：検証が失敗すればコードは続く。サービスが応答
しなければ、すべて問題ないと仮定する。方法は既定を逆転する：**疑わしきは、しない**。そして
システムにも、それを操作するエージェントにも適用される。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- **帰結のある行動の調査**、一般的な名前で：システムが請求し、送信し、承認し、削除し、
  外部の誰かに通知することは何か。二度行われたらどうなるか。間違って行われたらどうなるか。
  どう取り消すか。事業が知っている。エージェントはリストが完全か評価し、質問する。セマン
  ティックツリーが助けになる：帰結のある各プロセスはそこにある。
- エージェント自身がシステムに対してできる行動は何か（組み込まれているなら）。

## 2. プロンプト

**最初：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`：帰結のある行動の調査、ドメインのオーナーと一緒に書
  きます。システムが何をするか、または何をすることになるか——請求する、送る、承認する、消す、
  外の誰かに知らせる。そして各行動について：二度行われたら何が起きるか、誤って行われたら何が
  起きるか、どう取り消すか、誰がそれをできるべきか。セマンティックツリーのプロセスが出発点の
  リストをくれます。一つずつ辿ってください。プロンプトはこれを「the survey of consequential
  actions」とパスなしで呼びます。この名前で保存するか、チャットでどこにあるかを言ってくださ
  い。
- エージェントが組み込みか常駐になるなら：エージェント自身がシステムに対してどんな行動をでき
  るかを、同じ調査の別の節に。
- `docs/SEMANTIC_TREE.md`、最新のもの。
- 最低限受け入れられる状態：世界に対して作用する木のプロセスがすべてリストにあり、それぞれに
  「二度行われたら何が起きるか」が書かれていること。

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock.
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
> システムのどの行動に錠が必要かを決めます。帰結のある行動の調査を読み、コードを調べて
> 請求し、送信し、承認し、削除し、外へ通知するものすべてを探してください。二つのリストを
> 比べてください：調査が言及しない行動がコードにあるか、その逆なら、先へ進む前に私に聞いて
> ください。各行動について提案してください：可逆か、どの錠を付けるか（明示的な確認、二重の
> 安全装置、ドライランモード、日次上限、回路内の人間）、そしてうまくいかなかったときの戻り
> 道は何か。一般ルール：途中で疑いや故障があれば、行動は実行**されず**、理由が記録される。
> 表を私に提示してください。私が錠ごとに確認します。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：事業が言ったこととコードがすることの突き合わせ（誰も覚えていなかった
行動がそこに現れる）。この段に合わせた形の完全性の条項：二つのリストの差異は解決するの
ではなく質問する。各行動に可逆性、錠、戻り道。そしてプロンプトに書かれたフェイルクローズド
の一般ルール、表とコードに残るように。

**締め：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- エージェントが提示した表。オーナーと一緒に錠ごとに読んだもの。各行について、あなたの確認か
  変更を、プロンプトの空欄 [list]、[X]、[Y] のために書き出して。
- 最低限受け入れられる状態：判定のない行がないこと。確認されていない錠は、実装されない錠で
  す。

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.
>
> Then write `docs/THIRD_PARTY_EXECUTION.md`: the inventory of the third-party code this
> system EXECUTES -- not the code it imports: install scripts that run when a dependency is
> installed, binaries put on the path, permanent background processes, and hooks that run a
> command on an event. For each entry: what it runs, when it runs, the privilege it `runs_as`,
> and MY decision -- accepted, narrowed or rejected, with who and when. Carry `entries_total`
> and `entries_with_a_decision` at the head: an inventory whose entries nobody resolved
> verifies nothing. If an entry runs with more privilege than it needs, say so and ask me.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> 錠[リスト]を確認します。[X]を[Y]に変えてください。錠ごとに一つのテストで実装してくだ
> さい。疑いの条件下で行動が起き**ない**ことを証明するテストです（錠のないバージョンに対して
> 赤で証明）。最終の表を `docs/LOCKS.md` に記録してください。そして新しい自動化はすべて：
> まずドライランモードで、何をしたはずかを記録し、私が有効化するまで。
>
> そのあと `docs/THIRD_PARTY_EXECUTION.md` を書く
> こと。このシステムが**実行する**第三者コードの台帳である——取り込むコードで
> はない。依存を入れるときに走るインストールスクリプト、PATH に置かれる実行フ
> ァイル、常駐する背後のプロセス、そしてイベントでコマンドを走らせる留め具だ。各項
> 目について、何が走るか、いつ走るか、どの権限で走るか（`runs_as`）、そし
> て**私の決定**——受け入れ、限定、拒否、誰がいつ——を書く。先頭に `entries_total`
> と `entries_with_a_decision` を置くこと。誰も項目を
> 解決していない台帳は何も検証しない。必要以上の権限で走る項目があれば、それを言っ
> て私に尋ねること。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：**赤で証明**された錠ごとのテスト（錠なしでは行動が起きた。錠ありでは
起きない）、セキュリティに適用された第8段だ。最終の表。そしてすべての新しい自動化に対する
ドライランモードのルール、やらせる前に何をしたはずかを見られるようにするもの。

## 3. 期待される成果物

- `docs/LOCKS.md`：帰結のある行動ごとに一行：何をするか、可逆か、錠、戻り道、誰がいつ承認
  したか。
- 錠ごとに一つのテスト、赤で証明、疑いの前で行動が起きないことを検証する。
- 新しい自動化はドライランモードで始まり、「したはず」の記録付き。
- エージェントが組み込まれているなら：書かれた権限（何を読めるか、何を変えられるか、何に
  承認が要るか）。
- `docs/THIRD_PARTY_EXECUTION.md`：システムが**
  実行する**第三者コードの台帳。`entries_total`、`entries_with_a_decision`、
  各項目の権限、そして項目ごとのあなたの決定を伴う。台帳が存在するだけでは足りない。
  段を閉じるのは、各項目に決定があることだ（CQ-22.4）。
- その台帳の**配信物に対する**検証。読者が受け取るページをネットワーク越しに要求し、台帳が宣言
  する注入を差し引いたうえで、残りのバイトをリポジトリのものと対照し、最後の走行の日付を添える。
  リポジトリだけを読む検査では、読者が何を実行しているかを立てられない（CQ-25）。

## 4. 完全性の検証

- 請求し、送信し、承認し、削除する各行動は表にあるか？ ないものを一つ考えて聞くこと。
- 各錠に赤のテストがあるか？（「錠なしでは行動が起きた。錠ありでは起きない。」）
- すべての不可逆な行動に書かれた戻り道があるか？ なければ二重の安全装置が必要だ。
- 新しい自動化はドライランモードで始まったか？ 有効化する前に「したはず」の記録を見たか？
- 組み込まれたエージェントが権限外のことを試みたらどうなるか？ 試みさせて、ログでの拒否を
  見せてもらうこと。
- 各検証はどの特権で走ったか。読み取り専用として提示されるコマンドは書き込みの許可なしで、
  そして阻止された行動を行使する探りは、その命令が着地できない場所で、前と後に状態を数えて
  走ったか（CQ-20）。
- 台帳について君が主張していることは、サーバーに訊いたのか、リポジトリに訊いたのか。ページを
  ネットワーク越しに要求し、台帳が宣言する注入を差し引き、残りがリポジトリのものとバイト単位で
  同じであることを求めたか。そして対照は、commit のときだけでなく暦で走っているか。配信する側が
  加えるものも取り去るものも commit なしで変わるので、欠けている走行や古い走行は赤である
  （CQ-25）。

## 5. 警告サイン

- 自動化がドライランモードの期間なしに「存在しない」から「独りで走る」へ移った。
- ログに「疑いにより行動を実行せず」の項目が一つもない。システムが決して疑わない（不可能）
  か、疑っても進んでいるかだ。
- 錠が「テスト用」パラメータで飛ばせる。そのパラメータは本番に残ることになる。
