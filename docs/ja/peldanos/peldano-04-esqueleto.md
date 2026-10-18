# ステップ 4 — ゲート付きの骨組み（段の契約）

**区間：** 立ち上げ。
**いつ：** 一度、最初の週の締めに、サイジングの後、いかなる機能よりも前。ここで初期インフラ
のすべてと、インテグレーションとデプロイの連鎖を作る。
**形式：** 長い一回の送信、最後にあなたの目視承認。
**規模：** ユーザーを持つことになるすべてのプロジェクトで必須。使い捨てのプロトタイプでは
飛ばせる。だがプロトタイプが生き残ったら（常に生き残る）、この段が最初に払うべきものだ。

## 何のためか

機能を持つ前に、システムを**空のまま**起動し、テストし、デプロイさせること。最後にデプロイ
を発見するのは非常に高くつく。私のあるシステムでは立ち上げの一か月後に来て、五つの連続した
保留項目を要した [Ref. 32](../REFERENCIAS.md#ref-32)。骨組みが最初の週にデプロイされて
いれば、その痛手は機能ゼロの状態で受けていた。

背後にある一般的な考え：**本番への道はプロダクトの一部**であり、最後の手続きではない。
プログラマのマシンで動くがデプロイできないシステムはシステムではない。デモだ。そして道が
機能すると知る唯一の方法は、まだ失うものがないときにそれを辿ることだ。だからこの段で、
後にループが使うすべてを組む：構造を持つリポジトリ、テスト環境、プッシュごとにテスト群を
走らせる継続的インテグレーション、そしてテスト環境への自動デプロイ。

## 1. 必要な文脈

- `docs/SIZING.md`（第3段）：選んだ選択肢が骨組みを定める。
- 環境の調査：どこで動くか（クラウド、自前のサーバー）、テスト環境と本番環境はあるか、誰が
  アクセスを持つか、何かあるなら今日どうデプロイしているか。
- デプロイ先の認証情報、無料サービスでも。
- プロジェクトの種類：新規、修正、既存のものの進化。

## 2. プロンプト

**最初：**

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [ja]
> システムの骨組みを、機能なしで構築します。`PROJECT.md`、`docs/SIZING.md`、環境の調査を
> 読んでください。骨組みがテスト環境で動くために必要なもの（アクセス、URL、デプロイ方法）
> があるか評価してください。何か欠けていれば、始める前に私に求めてください。次に構築して
> ください：フォルダ構造。起動するサーバーとUI。通るスモークテスト一つを持つテスト構造。
> プッシュごとにそのテスト群を走らせる継続的インテグレーション。そしてテスト環境へのデプ
> ロイ。ワークフローのゲート（ある段階から次へ進むために何が緑でなければならないか）を
> `docs/GATES.md` に宣言してください。終わったら、テスト環境で動いている空のUIのスクリーン
> ショットを撮って私に見せてください。「ついでに」機能を追加しないでください。私の言語で
> 答えてください。

何を求めているか：始める前にアクセスがあることを確認すること（それなしには骨組みはエージェ
ントのマシンに留まる）。骨組みとは何かの正確なリスト（構造、起動、一つのテスト、継続的
インテグレーション、テストへのデプロイ）。書かれたゲート。テスト環境の実際のスクリーン
ショット、デプロイされたことの唯一の有効な証拠。そして機能追加の明示的な禁止。モデルは
「ついでに」をやりがちで、それが正確な範囲を壊すからだ。

**締め：**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [ja]
> 骨組みを承認します。`docs/STATUS.md` にテスト環境のURL、テストを実行するコマンド、デプロイ
> するコマンドを記録し、このステップを完了と印してください。その後デプロイを二度目に実行し、
> 二度目の実行が何も変えなかったことを私に見せてください。

何を求めているか：次のセッションが見つけられる場所に三つのコマンドを残すこと、そしてデプ
ロイが繰り返し可能であることを証明すること（何も壊さずに二度実行する）。その二度目の実行
が、手順が運ではなく手順であることの証明だ。

## 3. 期待される成果物

- 構造を持ち、サーバーと画面が起動するリポジトリ。
- 緑のスモークテストと、継続的インテグレーションで走るテスト群（緑の実行へのリンク付き）。
- 機能するテスト環境へのデプロイ、URL付き、二度実行済み。
- `docs/GATES.md`：ゲートのリスト、それぞれ通過条件付き。
- テスト環境で動く空のシステムのスクリーンショット。
- 三つのコマンド（実行、テスト、デプロイ）で更新された `docs/STATUS.md`。

## 4. 完全性の検証

- テスト環境のURLを開いて空の画面を見られるか？（あなたがする。エージェントではない。）
- 緑の継続的インテグレーション実行へのリンクはあるか？
- デプロイは二度実行され、二度目は何も壊さなかったか？
- ゲートはそれぞれ検証可能な条件付きで書かれているか？
- 頼んでいない機能があるか？ あるなら、エージェントは正確な範囲に違反した。

## 5. 警告サイン

- 骨組みは「ローカルで動く」がデプロイは「後で見よう」。だめ。デプロイが骨組みだ。
- スクリーンショットがテスト環境ではなくエージェントのマシンのもの。URLを求めること。
- ゲートが「コードの品質が良い」のようなことを言っている。ゲートは検証可能な条件だ：
  「テスト群が緑」「テストへのデプロイが機能した」。
