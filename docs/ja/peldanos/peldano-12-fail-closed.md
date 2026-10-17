# ステップ 12 — フェイルクローズド、錠、静かな損害ゼロ（段の契約）

**フェーズ：** 運用（システムが世界に作用する前に設計。帰結のある新しい行動ごとに見直す）。
**形式：** 対話：エージェントが帰結のある行動を列挙し、オーナーがどれにどんな錠を付けるか
確認する。
**規模：** システムが不可逆なこと（請求、送信、削除、承認）をする瞬間から必須。読み取り専用
のシステムは飛ばせる。世界に作用する最初のボタンを得た瞬間、この段が最も重要になる。

## 何のためか

システムが疑いや故障の前で、行動**しない**で、そう言うため。当たり前に聞こえるが、ソフト
ウェアが既定でやることの逆だ。ソフトウェアは疑いの前で進む。二重請求、人を通さない自動
承認、認証情報をアップロードする `git add -A`、顧客データの削除を防ぐ。

この原則には「フェイルクローズド」という名前があり、物理的セキュリティから来ている。停電
したとき閉じたままの防火扉だ。逆の「フェイルオープン」は開く扉。ソフトウェアではほとんどが
既定でフェイルオープンだ。検証が失敗してもコードは続き、サービスが応答しなくても問題なしと
仮定する。方法は既定を反転する：**疑わしきは、否**。システムにも、それを運用するエージェント
にも適用される。

## 1. 必要な文脈

- **帰結のある行動の調査**、一般的な名前で：システムが何を請求し、送信し、承認し、削除し、
  外部の誰かに通知するか。二度やったら何が起きるか。誤ったら何が起きるか。どう取り消すか。
  事業が知っている。エージェントがリストが完全か評価して質問する。
- エージェント自身がシステムに対してできる行動（組み込まれているなら）。

## 2. プロンプト

**最初：**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

何を求めているか：事業が言ったこととコードがすることの比較（そこに誰も覚えていなかった
行動が現れる）。この段向けの完全性条項：二つのリストの差異は解決せず質問する。各行動に
可逆性、錠、戻り道。そしてプロンプトに書かれたフェイルクローズドの一般ルール、表とコードに
残るように。

**締め：**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

何を求めているか：**赤で証明された**錠ごとのテスト（錠なしでは行動が起きた。錠ありでは
起きない）、セキュリティに適用した第7段。最終の表。そして新しい自動化すべてにドライラン
モードのルール、やらせる前に何をしたはずか見られるようにするもの。

## 3. 期待される成果物

- `docs/LOCKS.md`：帰結のある行動ごとに一行：何をするか、可逆か、錠、戻り道、誰がいつ
  承認したか。
- 錠ごとに一つのテスト、赤で証明、疑いの下で行動が起きないことを検証。
- ドライランモードで始まる新しい自動化、「したはず」の記録付き。
- エージェントが組み込まれているなら：その権限を書いたもの（何を読めるか、何を変えられる
  か、何に承認が要るか）。

## 4. 完全性の検証

- 請求、送信、承認、削除するすべての行動が表にあるか。ないものを一つ考えて尋ねよ。
- 各錠に赤のテストがあるか。（「錠なしでは行動が起きた。錠ありでは起きない。」）
- 不可逆な行動すべてに書かれた戻り道があるか。なければ二重の安全装置が要る。
- 新しい自動化はドライランモードで始まったか。有効にする前に「したはず」の記録を見たか。
- 組み込まれたエージェントが権限外のことを試みたら何が起きるか。試させて、ログの拒否を
  見せてもらえ。

## 5. 警告サイン

- 自動化がドライラン期間なしに「存在しない」から「自走している」になった。
- ログに「疑いにより未実行」の項目が一つもない。システムが決して疑わない（不可能）か、
  疑っても進んでいる。
- 錠を「テスト用」パラメータで迂回できる。そのパラメータは本番で有効のままになる。
