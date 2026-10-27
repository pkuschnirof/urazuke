# ステップ 18 — 脆弱性の走査と解決、連鎖の中で、そして暦とともに（段の契約）

**区間：** 本番リリース。
**いつ：** 本番リリースのフェーズで、第15段の後（走査は継続的インテグレーションで走る）、最
初のデプロイの前に：開いたP0があるものは昇格しない。その後は各プッシュで、そしてプッシュがな
くても独自の暦（週次）で。あなたが何も変えなくても新しい脆弱性は現れるからだ。レガシーでは、
最初の実行はN3の一部（監査のセキュリティの次元）であり、発見は速度の印とともにバックログに入
る。
**形式：** 組み立てて走らせるのに一回の送信。その後は自動で、あなたが読む報告とともに。
**規模：** ユーザーを持つことになるすべてのプロジェクトで必須：依存関係と秘密の走査は交渉の
対象ではない。静的解析と設定の基準線は比例的。

## 何のためか

第13段の監査は、ときどき新鮮な目でシステムを見る。この段はただ一つのこと、セキュリティを、い
つも、機械で見る。両者は補い合う：監査は判断力を要するものを見つけ（誰も持つべきでなかった管
理者の扉 [Ref. 40](../REFERENCIAS.md#ref-40)）、走査は根気を要するものを見つける（昨日は既知の
脆弱性を持っていなかったが今日は持っている依存関係 [Ref. 41](../REFERENCIAS.md#ref-41)）。最初
の正式なセキュリティ監査は、セキュリティが一度チェックを付けるリストではなく定期的なルーチン
だと私を納得させた [Ref. 23](../REFERENCIAS.md#ref-23)。この段はそのルーチンを機械にしたもの
だ。

そして書いておきたいルールが一つ：**依存関係の更新は変更である**。だから他のどんな変更とも同
じようにループから入る。回帰もエンドツーエンドもなしの「脆弱性を閉じるためにバージョンを上げ
た」は、金曜日に本番を壊す最もよくある形だ。

**初心者の方へ。** *脆弱性*とは、誰かが侵入したり、データを盗んだり、システムに本来すべきで
ないことをさせたりするのに使える欠陥のことです。この段が機械で探すものには四種類あります。*
依存関係*の中：あなたのシステムが使う他人のソフトウェア部品（どれに既知の欠陥があるかを列挙
する公開のデータベースがあり、CVEという番号で識別されます）。*コード*の中：*静的解析*はコー
ドを実行せずに読み、危険なパターンを探します。たとえば*インジェクション*（利用者がフォームに
書いたものを、データベースが命令として解釈してしまうこと）。*履歴*の中：いつかリポジトリに保
存された秘密（パスワード、鍵）は、後で消してもそこに残り続けます。そして*設定*の中：必要のな
かった開いたポート、既定のパスワード、欠けている*セキュリティヘッダ*（サーバーがブラウザを守
るために送る指示）。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 継続的インテグレーション（第4段と第15段）、走査が走るところ。
- 環境の調査：どのサーバー、どのコンテナ、どのポート。設定の基準線のために。
- 以前の監査（13、またはN3）。既知のものを報告させないために。
- 何がP0かについてのあなたの基準：侵入を許すもの、個人データを露出するもの、統制なしに請求や
  送信を許すもの。

## 2. プロンプト

**最初（組み立て、走らせ、提案する）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- 各プッシュで走っている継続的インテグレーション（第4段と第15段）、十分なクォータとともに：
  走査は実行ごとに分を足します。あといくつ残っているか調べてください。
- `docs/ENVIRONMENTS_SURVEY.md`、サーバー、あればコンテナ、公開されたポート、ドメインを管理
  するのは誰かとともに。エージェントがどの基準線を当てるべきか知るためです。
- `docs/AUDIT_[日付].md`（第13段またはN3）。既知のものを報告しないために。
- プロンプトの空欄のための、あなたのP0の基準を二行で。ほとんどのシステムでは：認証情報なしに
  侵入を許すもの、個人データを露出するもの、統制なしに請求、送信、削除を許すもの。
- 設定の基準線のための、サーバーへのエージェントの読み取りアクセス。与えないなら、その部分は
  未走査のままになり、エージェントはそう言わなければなりません。
- 最低限受け入れられる状態：継続的インテグレーションが走り、クォータを知っていて、何がP0かを
  書いたこと。

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine.
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
> このシステムの脆弱性を走査し、本番の前に重要なものを直します。継続的インテグレーションの中
> に、各プッシュで、そして週次の暦でも、次を組み立ててください：(1) 既知の脆弱性のデータベー
> スに対する各依存関係の走査。(2) よくある種類の欠陥（インジェクション、安全でないデシリアラ
> イズ、パストラバーサル、弱い暗号、コードに直接書かれた秘密、安全でない既定値）についての
> コードの静的解析。(3) リポジトリの履歴全体に対する秘密の走査。(4) サーバーとコンテナの設定
> の、基準線に対する検証（公開されたポート、既定の認証情報、権限、セキュリティヘッダ、通信の
> 暗号化）。今すべて走らせ、`docs/SECURITY_[日付].md` に各発見を書いてください：どこで、リス
> ク、証拠、優先度（P0は私の基準で今すぐ直すもの：[基準]。P1は本番の前。P2はできるときに）、
> そして修正が存在するか（更新、パッチ、設定の変更）。あなたのいる場所から走査できない部分が
> あれば、そう言って未走査と印してください。きれいだと見なさないでください。その後、各P0とP1
> の修正を、一つにつき一つの保留項目として提案してください。まだどの更新も適用しないでくださ
> い：更新は変更であり、完全なルーチンを通ります。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。
>
> 私の言語で答えてください。

何を求めているか：四つの層の走査（依存関係、コード、履歴の中の秘密、設定）を、連鎖の中で**そ
して暦とともに**。新しい脆弱性はあなたの次のプッシュを待たないからだ。第13段の形をした報告、
「きれい」の代わりに「未走査」の条項付きで。私が与えるP0の基準。そしてループを通さずに更新す
ることの禁止。それが壊れた金曜日を避けるものだ。

**締め（直してゲートにする）：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- あなたが読んだ `docs/SECURITY_[日付].md`、二つの発見を検証したもの（証拠を求めてくださ
  い）。
- プロンプトの空欄のための、承認した修正のリスト。各依存関係の更新については、それが変更であ
  り回帰とエンドツーエンドを走らせることになるという自覚。
- 最低限受け入れられる状態：判定のないP0が一つもないこと。

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> [リスト]を直してください。それぞれを独自の保留項目として、テストが当てはまるところではその
> テストを赤で証明して（もう通らなくなったインジェクション、今はあるヘッダ、今は拒否される秘
> 密）、そして各更新の後に回帰とエンドツーエンドのテスト群が緑であること。走査をもう一度走ら
> せ、P0とP1がきれいであることを見せてください。走査を `docs/GATES.md` のゲートにしてくださ
> い：開いたP0があるものは本番に昇格せず、新しいP1は自動で保留項目を開きます。方針、暦、そし
> て覆われていないものを `docs/SECURITY.md` に記録してください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：修正ごとに一つの保留項目、可能なところでは第8段の赤とともに（テストなしに
直された脆弱性は次のリファクタとともに戻る）。証拠としての繰り返された走査。そしてゲートへの
変換。それが、誰も見ていないときにこの段を生かし続けるものだ。

## 3. 期待される成果物

- 四つの層の走査が、各プッシュで、そして週次で走っていること。
- `docs/SECURITY_[日付].md`、発見と未走査のものとともに。`docs/SECURITY.md`、方針、暦、ゲー
  ト、覆われている範囲とともに。
- P0とP1が直されていること。それぞれ保留項目と、当てはまるところではテストとともに。
- `docs/GATES.md` の中のゲート。

## 4. 完全性の検証

- 走査の最後の実行へのリンクを求めること：緑ですか、そして何日のものですか？
- 報告は何を走査**しなかった**かを言っていますか？
- 各P0に、証拠とともに閉じられた保留項目があるか、日付とともに開いた保留項目がありますか？
- 既知の脆弱性を持つ依存関係を、ブランチにわざと入れるよう求めること：連鎖は赤になりますか？
- 次の予定された走査がいつ走るか知っていますか？

## 5. 警告サイン

- 一か月以上動いているシステムで、走査が一度目できれいに通った。ほとんどの場合それは真実では
  ない：層が一つ抜けているか、履歴ではなくブランチだけを走査した。
- 「発見を閉じるために」一つのコミットで十の依存関係が更新された。そのコミットには前も後もな
  い。壊れた金曜日が待っている。
- 走査はあるがゲートではない。誰も読まない報告を生み出す。
- 保留項目も日付も署名もなしに「受け入れられた」P0がある。
