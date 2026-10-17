# ステップ 14 — 生きた文書と、人がAIなしで追えるマニュアル（段の契約）

**フェーズ：** 運用（システムとともに生まれる。変更ごとに保守する）。
**形式：** ルーチン。加えて、マニュアルを生成するときに長い一回の送信。
**規模：** 比例する。小さいシステムは最低限、インフラと復旧のマニュアル（どう立ち上げ直す
か、どう復元するか）が要る。ユーザー向けは一ページでよい。変わらないもの：構築した人が消え
ても、別の人が続けられなければならない。

## 何のためか

エージェントなしで、構築した人なしで、システムを使い、保守し、復旧できるため。エージェント
がいない日にデプロイできないなら、完成していない。古典的方法では文書は高価で古びた。ここ
では再生成は無料なので、ルールは「同じコミットで」と「手で再現可能」になる。間違った
リポジトリへのコミットを引き起こした古い文書と、履歴と化したプロジェクトファイルを防ぐ。

技術者でなくても判断できる、復旧マニュアルの品質基準：**プログラミングをしない信頼できる人
が、午前三時に、システムがダウンしエージェントが接続できない状態で追えなければならない**。
どこかの手順に「開発者に相談」や「場合による」とあれば、その手順は不完全だ。

## 1. 必要な文脈

- 各マニュアルの読者は誰か：エンドユーザー、保守する人、インフラを運用する人。事業が知って
  いる。不明ならエージェントが質問する。
- テスト環境で動くシステム、実際のスクリーンショットを撮るため。
- `docs/DEPLOYMENT.md`（第13段）と `docs/LOCKS.md`（第12段）、入力となるもの。

## 2. プロンプト

**ルーチン（共働の約束に入れる）：**

> Every change that modifies what the user sees, what the operator does, or how the system is
> deployed, updates the corresponding manual in the same commit. If you do not know which
> manual, ask.

何を求めているか：同じコミットのルール、マニュアルを最新に保つ唯一のもの。そしてどの
マニュアルか不明なときの質問。

**マニュアルを生成するために：**

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

何を求めているか：それぞれの読者を持つ三つのマニュアル。テスト環境の**実際の**スクリーン
ショット（図でも説明でもなく）。復旧マニュアルの午前三時基準。文書化向けの完全性条項：
事業だけが知ることは質問し、**穴を残さず、発明しない**。そして日付とバージョン、各マニュアル
がどのシステムに対応するか分かるように。

## 3. 期待される成果物

- `docs/USER_MANUAL.md`（またはHTML）、埋め込まれた実際のスクリーンショット付き。
- `docs/MAINTENANCE_MANUAL.md`。
- `docs/INFRASTRUCTURE_AND_RECOVERY_MANUAL.md`：一歩ずつ、人のために。
- それぞれに日付と文書化するシステムのバージョン。
- 画面、運用、デプロイを変えるコミットに：更新されたマニュアル。

## 4. 完全性の検証

- ユーザーマニュアルを無作為の画面で開く。スクリーンショットは今日のテスト環境にあるものと
  一致するか。
- 復旧マニュアルをあなた自身か、プログラミングをしない信頼できる人が追えるか。「ダウン
  した」の節を読め。何をするか、順に、コマンド付きで言っているか。
- 画面を変えた最近のコミットを選ぶ。マニュアルに触れたか。
- 「[要記入]」や「担当者に相談」のような穴があるか。そこでエージェントは質問すべきだった。
- 各マニュアルはどのバージョンに有効か言っているか。

## 5. 警告サイン

- ユーザーマニュアルにもう存在しないバージョンのスクリーンショットがある。一度生成され
  保守されていない。同じコミットのルールが約束にないか、適用されていない。
- 復旧マニュアルが「エージェントとのセッションを開く」で始まる。エージェントが前提なら、
  人のためのマニュアルではない。
- 構築者以外の誰も復旧マニュアルを読んだことがない。誰かにテスト環境で追ってもらえ。詰まる
  ところが直すべきところだ。
