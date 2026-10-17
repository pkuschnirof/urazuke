# ステップ 13 — プロダクトの一部としての継続的インテグレーション、環境、秘密、デプロイ（段の契約）

**フェーズ：** 運用（第4段の骨組みの上に組む。インフラの変更ごとに見直す）。
**形式：** 組むのに一回の送信。デプロイごとにルーチン。
**規模：** ユーザーのいるすべてのプロジェクトで必須。小さいものなら「継続的インテグレー
ション」はGitHubのアクション一つ、「環境」は同じサーバーの二つのフォルダでよい。譲れない
のは、テストが自動で走ること、設定がリポジトリにないこと、戻り道があること。

## 何のためか

本番に至ることが再現可能なパッケージであるため：テストは**一度**走り、設定はリポジトリの
外に住み、秘密は出回らない。コミットごとに三度走るテスト（16日で2,000分のクォータ）、
トランスクリプトに印字されたデータベースの鍵、最初のドメインしか知らないCORS、テスト群に
上書きされた設定を防ぐ。

秘密については例外なく反射として採用すべきルールがある：**チャット、ログ、コミットで見ら
れた秘密はもう秘密ではない**。「誰も見ていない」も「後で消した」も関係ない。ローテーション
する。ローテーションは十分で済む。誰かが使ったか突き止めるのは不可能だ。

## 1. 必要な文脈

- **環境とアクセスの調査**、一般的に：どんな環境があるか（テスト、本番）、どこで動くか、
  誰がアクセスを持つか、一方から他方へどう昇格するか、どんな秘密があり今どこに住んでいる
  か、継続的インテグレーションのクォータはどれだけか。エージェントが十分か評価して質問する。
- 継続的インテグレーションとテスト環境へのデプロイ付きの骨組み（第4段）。

## 2. プロンプト

**最初：**

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

何を求めているか、条項ごとに：始める前のアクセス。コミットごとに**一度だけ**のテスト（三度
走らせたのがクォータを燃やした）。パッケージするだけのデプロイ。リポジトリ外の設定。繰り
返し可能な手順としての昇格。**試された**ロールバック（試されたことのないロールバックは存在
しない）。コミット内の秘密に対する錠。そして人のための文書、インフラに適用した第14段。

**デプロイごとのルーチン：**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

何を求めているか：三つの前提条件（同じバージョンでテスト環境が緑、ロールバック準備済み、
設定の変更を告知）と二つの事後の証拠（動いているバージョンと、何も書かないエンドツー
エンドの検査）。

**秘密がチャットやコミットに現れたら：**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

何を求めているか：即時のローテーション、他にどこにあったかの目録、そして検知したはずの
検査。次はチャットに届かないように。

## 3. 期待される成果物

- コミットごとに一度走る継続的インテグレーション、実行へのリンク付き。
- インテグレーションを待ってパッケージするだけのデプロイ。計測済み：前後でどれだけかかるか。
- リポジトリ外の設定。リポジトリには値のない例のみ。
- `docs/DEPLOYMENT.md`：デプロイ、昇格、ロールバックの方法、一歩ずつ、人のために。
- 少なくとも一度試されたロールバック、その証拠付き。
- 有効な秘密検査（アップロードの試みが一つ拒否された）。
- 月ごとに消費した継続的インテグレーションのクォータの記録。

## 4. 完全性の検証

- コミットごとにテスト群は何度走るか。一度でなければならない。リンクを求めよ。
- リポジトリに実際の設定値（鍵、パスワード、内部URL）があるか。エージェントに検索させて
  空の結果を見せてもらえ。
- エージェントなしで `docs/DEPLOYMENT.md` を一人で追えるか。その問いを持って読め。
- ロールバックは試されたか。いつ。どんな証拠があるか。
- プロジェクト中にチャットに秘密を貼ったか。そうならローテーションしたか。
- 今月の継続的インテグレーションのクォータがどれだけ残っているか知っているか。

## 5. 警告サイン

- 本番デプロイを「手で、速く、小さな変更だから」で行う。小さな変更こそ本番を壊す。誰も
  テストしないから。
- 設定の例ファイルに実際に見える値がある。おそらく実際の値だ。
- 最後にロールバックを試したのがいつか誰も言えない。
