# ステップ 4 — ゲート付きの骨組み（段の契約）

**フェーズ：** 立ち上げ（一度）。
**形式：** 長い一回の送信、最後にオーナーの目視承認。
**規模：** ユーザーを持つことになるすべてのプロジェクトで必須。使い捨てのプロトタイプなら
飛ばせる。だがプロトタイプが生き延びたら（必ず生き延びる）、この段が最初に払うべきもの
になる。

## 何のためか

システムが機能を持つ前に、**空のまま**起動し、テストされ、デプロイされるため。最後に
デプロイを発見するのは非常に高くつく。Kikanでは立ち上げの一か月後に来て、五つの保留項目
を連続で費やした。骨組みを最初の週にデプロイしていれば、その痛手は機能ゼロの状態で受けて
いた。

背後の一般的な考え：**本番への道はプロダクトの一部**であって、最後の手続きではない。
プログラマのマシンでは動くがデプロイできないシステムはシステムではない。デモだ。そして
道が機能すると知る唯一の方法は、まだ失うものがないうちにそれを辿ることだ。

## 1. 必要な文脈

- `docs/SIZING.md`（第3段）：選んだ選択肢が骨組みを定める。
- 環境の調査：どこで動くか（クラウド、自前のサーバー）、テスト環境と本番環境があるか、
  誰がアクセスを持つか、今何かあるならどうデプロイしているか。
- プロジェクトの種類：新規（グリーンフィールド）、修正、または既存のものの進化。

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

何を求めているか：始める前にアクセスがあることを確認すること（それなしでは骨組みは
エージェントのマシンに留まる）。骨組みとは何かの正確なリスト（構造、起動、一つのテスト、
継続的インテグレーション、テスト環境へのデプロイ）。書かれたゲート。テスト環境の実際の
スクリーンショット、デプロイされたことの唯一有効な証拠。そして機能を追加することの明示的
な禁止。モデルは「ついでに」をしがちで、それが正確な範囲を壊すからだ。

**締め：**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

何を求めているか：三つのコマンドを次のセッションが見つけられる場所に残すこと。そして
デプロイが繰り返し可能であることを証明すること（二度実行して何も壊れない）。その二度目の
実行が、手順が幸運ではなく手順であることの証明だ。

## 3. 期待される成果物

- 構造、サーバー、画面が起動するリポジトリ。
- 緑のスモークテストと、継続的インテグレーションで走るテスト群（緑の実行へのリンク付き）。
- テスト環境へのデプロイが機能し、URLがあり、二度実行済み。
- `docs/GATES.md`：ゲートのリスト、それぞれ通過条件付き。
- テスト環境で動く空のシステムのスクリーンショット。
- 三つのコマンド（起動、テスト、デプロイ）で更新された `docs/STATUS.md`。

## 4. 完全性の検証

- テスト環境のURLを開いて空の画面を見られるか。（エージェントではなくあなたが行う。）
- 緑の継続的インテグレーション実行へのリンクがあるか。
- デプロイは二度実行され、二度目は何も壊さなかったか。
- ゲートはそれぞれ検証可能な条件で書かれているか。
- 頼んでいない機能があるか。あればエージェントは正確な範囲に違反した。

## 5. 警告サイン

- 骨組みは「ローカルで動く」がデプロイは「後で見る」。否。デプロイが骨組みだ。
- スクリーンショットがテスト環境ではなくエージェントのマシンのもの。URLを求めよ。
- ゲートが「コードの品質が良い」のようなことを言う。ゲートは検証可能な条件だ。「テスト群が
  緑」「テスト環境へのデプロイが成功」。
