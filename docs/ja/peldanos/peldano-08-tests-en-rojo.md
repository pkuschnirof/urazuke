# ステップ 8 — 錠としてのテスト、赤で証明（段の契約）

**区間：** ループ。
**いつ：** 各保留項目とともに、それを閉じるとき：赤と緑のテスト、隣接項目の回帰、触れた
フローのエンドツーエンドテスト。すべてのフローの完全なエンドツーエンドのテスト群は、各ブロ
ックの締めと本番への各デプロイの前に。
**形式：** 一回の送信。エージェントが実行して報告し、あなたが報告を読む。
**規模：** すべてのプロジェクトで必須。方法の心臓部だ。交渉できない段が一つあるなら、これだ。

## 何のためか

一度も失敗するのを見ていないテストは、何かを証明しているかわからない。ここでのルールは
「テストを書け」ではない。「古いコードに対してテストが赤になり、その後新しいコードで緑に
なることを示せ」だ。何も証明しないから通るテストと、バグを隠す緑を防ぐ
[Ref. 44](../REFERENCIAS.md#ref-44)。

人間のプログラマよりモデルでこれがより重要な理由：モデルはコードとテストを**同じセッション
で、同じ理解で**書く。依頼を誤解していれば、テストは誤解したものを証明し、通る。古いコード
に対する赤は、テストが重要なものを見ていることを確かめる唯一の安価な方法だ。古いコードが
通るなら、テストは前後を区別しておらず、役に立たない。これを最もよく示す事例は一致しなかっ
たカウンタのものだ [Ref. 26](../REFERENCIAS.md#ref-26)。

この段には深刻な反論があり、これに対して使われることになるので、書き残しておきたい：テスト
とコードを書く同じエージェントが、**赤を装う**ことができる。2026年8月に公開されたある研究
は、エージェントにテストが先のサイクルを頼むと、ときに赤を飛ばし、走らせていないのに走らせ
たと語り、あるいは最初から通るようにテストより先に実装することを計測した（主文書のパートF、
関連する取り組みの部にある）。私の答えは三つの部品からなり、三つともはしごの中にある。一つ
目はここに：赤は語りではなく、**レシート**だ。正確なコマンド、それが走った対象のバージョン
の識別子、失敗するテストの数、そして終了コードを、すべて出たままの形で貼る。あなたがそれが
何をするか理解しなくても、一つのコマンドでもう一度走らせられるようにだ。二つ目は第13段に：
別のセッションによる監査が、それらのレシートの標本をもう一度走らせる。三つ目は第9段に：ミュ
ーテーションテスト。わざと誤りを植え、テストがいくつ捕まえるかを数えるもので、同じ研究の中
で、見張るテストと飾るテストを区別した唯一の尺度だ。

そして後半：エンドツーエンドテスト。画面から（クリックし、入力し、読み）検証し、バック
エンドでの効果（行が残った、状態が変わった）を確かめるテストが、あなたのコード読みを置き
換えるものだ。保留項目の受け入れ基準（「前提、もし、ならば」）がその台本だ。そして三回、
三つの規模で実行する：各保留項目とともに触れたフロー、各ブロックの締めにすべてのフロー、
本番の前に正確なバージョンですべてのフロー。

## 1. 必要な文脈

ここに続くのは一般的なリストです。各プロンプトの前にあなたが作り終えていなければならない具体
的なファイルは、その内容と最低限受け入れられる状態とともに、第2節の、それぞれのプロンプトに
先立つ「プロンプトを送る前に」の枠に書いてあります。

- 既に実装された変更（既定ではテストは実装の後。「テストが先」は小さく明確な範囲の選択肢
  として残る）。
- 変更の元となる保留項目、その受け入れ基準と「どう検証するか」付き。
- 既存のテスト群と実行コマンド（第4段）。

## 2. プロンプト

**ルーチン（共働の約束に入れる。変更ごとに適用）：**

**プロンプトを送る前に**、次のものが存在していなければなりません。作るのはあなた（または業務
側とあなた）で、エージェントではありません：

- 閉じようとしている保留項目。`docs/PENDING.md` に完全な仕様があり、とりわけ「前提、操作、結
  果」の形の受け入れ基準と「どう検証するか」があること。それがテストの台本です。保留項目にそ
  れがないなら、テストを頼む前に第5段へ戻ってください。
- エージェントがすでに実装した変更（この方法は実装のあとにテストします。小さく、よく定義され
  た範囲に対してあなたが「テストが先」を選ぶ場合を除いて）。
- 既存のテスト群と、それを走らせるコマンド。`docs/STATUS.md`（第4段）に書いてあること。
- テスト環境が動いていて、エージェントからアクセスでき、触れるフローに十分なテストデータがあ
  ること。フローが存在しないデータ（患者、昨日の予約）を必要とするなら、あなたが入れるか、テ
  ストの一部として作るよう頼んでください。してはいけないのは、それをシミュレートすることで
  す。
- `docs/WORKING_AGREEMENT.md`、最初の一度、ルーチンが入る先。
- 最低限受け入れられる状態：仕様に受け入れ基準があり、テスト群が既知のコマンドで走ること。

> To close this pending item I need evidence, not your word. (1) Write the test that proves what the
> item asks for, following its acceptance criteria. (2) Demonstrate that this test fails against the
> previous code: you may temporarily revert the change, or run the test against the old version, but
> show me the red output as a receipt, not a summary: the exact command, the identifier of the
> version it ran against, the count of failing tests and the exit code, pasted as they came out, so
> that I can rerun it myself with one command. (3) Show me the green output with the change. (4) Run
> the regression suite for the neighbouring items and show me it is still green. (5) Run the
> end-to-end test of the flow this item touches, from the screen to the backend, and show me the
> backend effect. (6) Do not replace with mocks the very part you are trying to test. If testing end
> to end requires something you lack (data, access, an environment), ask me for it; do not simulate
> what you do not have. If the previous version does not have the module at all (the first block of
> a new project), a failure to load is not a red: prove the red by planting one deliberate defect in
> the function you just wrote (an inverted condition, a deleted line), show me the test failing
> against that defect as the same kind of receipt, with the diff of the defect, and then revert it.
> Finally, the commit message says "proved red against [what]" and the test counts.
>
> The same pending item also carries the Annex H test. Write it, and see it
> fail first: for every declared profile, what that profile can reach is
> exactly its row in `docs/PROFILE_MATRIX.md`, neither less nor more, and
> every route checks the permission on the server, because hiding the entry
> point protects nothing (Annex H, UX-11, UX-12, UX-15). A matrix that
> nothing exercises is a document nobody reads.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> この保留項目を閉じるには、あなたの言葉ではなく証拠が必要です。(1) 項目が求めることを
> 証明するテストを、その受け入れ基準に従って書いてください。(2) このテストが以前のコードに
> 対して失敗することを示してください。変更を一時的に戻すか、古いバージョンに対してテストを
> 実行してもよいですが、赤の出力を要約ではなくレシートとして私に見せてください：正確な
> コマンド、それが走った対象のバージョンの識別子、失敗するテストの数、そして終了コードを、
> 出たままの形で貼ってください。私自身が一つのコマンドでもう一度走らせられるようにです。
> (3) 変更ありでの緑の出力を見せてください。(4) 隣接項目の回帰テスト群を実行し、まだ緑で
> あることを見せてください。(5) この項目が触れるフローのエンドツーエンドテストを、画面から
> バックエンドまで実行し、バックエンドでの効果を見せてください。(6) まさにテストしようと
> している部分をモックで置き換えないでください。エンドツーエンドのテストにあなたが持って
> いないもの（データ、アクセス、環境）が必要なら、私に求めてください。持っていないものを
> シミュレートしないでください。以前のバージョンにそのモジュールがまったく存在しない場合
> （新規プロジェクトの最初のブロック）、読み込めないファイルは赤ではありません。書いたばかりの
> 関数に意図的な欠陥（条件の反転、行の削除）をひとつ植え、その欠陥に対してテストが失敗する
> ところを、欠陥の diff を含む同じ種類のレシートとして見せてから、元に戻してください。最後に、
> コミットメッセージは「[何]に対して赤で証明」とテストの数を述べます。
>
> 同じ項目は付録Hのテストも担います。それを書き、まず失敗するのを見てください。宣言さ
> れた各プロファイルについて、そのプロファイルが到達できるものは
> `docs/PROFILE_MATRIX.md` のその行と正確に一致し、少なくても
> 多くてもいけません。そして各ルートはサーバー側で権限を検査します。入り口を隠すことは
> 何も守らないからです（付録H、UX-11、UX-12、UX-15）。何も実行しないマ
> トリクスは、誰も読まない文書です。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

**最初のブロックの赤。** 新規プロジェクトの最初のブロックには以前のコードがありません。新しいテストはモジュールが存在しないから失敗するのであって、その失敗はテストが振る舞いを見分けることを証明しません。そのため、以前のバージョンにモジュールがないときは、赤を**ミューテーションで**証明します。エージェントは書いたばかりの関数に意図的な欠陥を植え、その欠陥に対してテストが赤になるところを見せ（レシートには欠陥の diff が付くので、些細なものでなかったことが分かります）、元に戻して緑を見せます。保留項目ごとにミュータントひとつ、他のレシートと同じように実行して記録します。コードベース全体のミューテーションテストは、引き続き段 9 の任意の補強です。（決定 D-037。練習 Turnera から：「ファイルが読み込めない」としか言わない赤のレシートが六つ。）

何を求めているか、条項ごとに：(1) 保留項目の受け入れ基準に導かれたテスト。(2) **レシート
として示された赤**（コマンド、バージョン、数字、終了コード）。この方法を「テストを書け」と
区別する条項であり、赤が語りになるのを妨げる条項だ。(3) 緑。(4) 同じセッション
での隣接項目の回帰。変更は隣のものを壊すから。(5) 触れたフローのエンドツーエンドテスト、
バックエンドでの効果を見せて。(6) まさに試すものをシミュレートしないこと。そしてこの段に
合わせた完全性の条項：エンドツーエンドでテストするのに何か欠けていれば、**シミュレート
するのではなく求める**こと。数字付きのコミットメッセージが、コードが住む場所に証拠を残す。

**各ブロックの締めと本番への各デプロイの前に：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- ブロックのすべての保留項目が、ルーチンで閉じられていること（赤、緑、回帰、フローのエンド
  ツーエンド）。
- 昇格される正確なバージョンが特定されていて（バージョン番号かコミット）、テスト環境にデプロ
  イされていること。`docs/STATUS.md` になければチャットで伝えてください。
- ここまでに存在するフローのリスト。セマンティックツリーのユースケースをもとにあなたが書いた
  もの。エージェントがカバーしたと言うものと突き合わせるためです。あなたのリストがなければ、
  「すべてのフロー」はエージェントが覚えている範囲のことになります。
- 最低限受け入れられる状態：テスト群がいくつのフローを辿るべきかを、いくつ辿ったかを尋ねる前
  に知っていること。

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> ここまでに存在するすべてのフローの完全なエンドツーエンドのテスト群を、テスト環境で、
> 昇格される正確なバージョンで実行してください。数を見せ、各フローについてそれを証明する
> バックエンドの検証を見せてください。エンドツーエンドテストのないフローがあれば、そう
> 言って保留項目を開いてください。カバー済みとして通さないでください。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：エンドツーエンドテストの二つ目と三つ目の規模、正確なバージョンで（「最新」
ではなく）、フローごとのバックエンドでの効果付きで、そして完全性の条項とともに：カバーされ
ていないものは宣言されて保留項目になる、カバー済みとしては通さない。

**エージェントがテストできないと言うとき：**

**プロンプトを送る前に**、次のものを手元に用意しておいてください：

- テストできないというエージェントのメッセージ、注意深く読んだもの：できないのか、それとも何
  かが足りないのか。足りないのがあなたの持っている材料（データ、アクセス、環境）なら、それを
  渡してください。このプロンプトは送りません。このプロンプトは、本当にシステムの側に何かが足
  りないとき（画面の要素に識別子がない、外部の提供者にテストモードがない）のためのものです。
- 最低限受け入れられる状態：「材料が足りない」（あなたが渡す）と「ここではシステムがテスト可
  能でない」（このプロンプト）を区別したこと。

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [ja]
> なぜテストできないのか、テストできるようにするには何を追加すべきかを説明し、そのための
> 保留項目を開いてください。テストできるようになるまで変更は閉じられません。
>
> 私の決定が必要になったら、UX-28（`docs/ANEXO_HEURISTICAS.md`）の四つの部分を、この順で示して聞い
> てください。その問いを必要にしているデータを箇条書きで、それらをつないで問いが見えるようにする五
> 行以内の段落、取りうる答えに番号を振った問いそのもの、そしてあなたの推奨。プロジェクトが `commun
> ication_depth` で宣言した技術的な深さで——`beginner`、`decision_maker`、`technical`——。宣言がなけ
> れば `decision_maker` を使ってください。

何を求めているか：「テストできない」が会話の終わりではなく保留項目の始まりであること。
テスト不可能性は負債であり、負債は記録される。

## 3. 期待される成果物

- リポジトリ内の新しいテスト、閉じる保留項目の名前付き。
- エージェントの報告とコミットメッセージに：レシートとしての赤の出力（コマンド、それが走った
  対象のバージョン、いくつ失敗したか、終了コード）、緑の出力、数字付きの緑の回帰。
- 触れたフローのエンドツーエンドテスト、バックエンドが変わった証拠（行、記録、状態）付き。
- 各ブロックの締めと本番の前に：フローごとの、正確なバージョンでの、緑の完全なエンドツー
  エンドのテスト群。

## 4. 完全性の検証

- 報告は赤を見せているか？ 数字付きで：「古い基準に対して8のうち4が失敗」。緑しか見せて
  いないなら、段は登れていない。
- 赤はレシートか、それとも語りか？ 正確なコマンド、それが走った対象のバージョン、数字、
  終了コードがなければならない。ブロックごとに一度、保留項目を一つ無作為に選び、そのコマンド
  をあなた自身が走らせること：赤がもう一度現れなければならない。
- 回帰は同じセッションで走ったか？ テストはいくつ、緑はいくつ？
- 変更のまさにその場所に「シミュレート」（モック）された部分があるか？ エージェントに何を
  なぜシミュレートしたか聞くこと。
- コミットは保留項目を引用し、「赤で証明」と言っているか？
- 画面のテストはバックエンドでの効果も検証しているか？
- ブロックの締めに：すべてのフローがエンドツーエンドのテスト群にあるか、それとも「ユニット
  テストでカバーする」ものがあるか？

## 5. 警告サイン

- 今週の新しいテストがすべて一発で緑になり、赤が一度も示されなかった。エージェントが手順を
  省いているか、テストが何も証明していないかだ。
- テスト群がだんだん遅くなり、誰もなぜか知らない。たいていはエンドツーエンドテストが
  「速く走るように」シミュレーションに置き換えられていったのだ。
- エージェントがいくつかを言わずに「テストは通る」と報告する。常に数字付きで。
- 赤が散文で語られてくる（「テストは期待どおり失敗した」）。コマンドも、バージョンも、数字も
  ない。レシートのない赤は、ないのと同じ値打ちだ。
- 本番リリースに至って、完全なエンドツーエンドのテスト群が初めて走る。ブロックの締めが
  欠けていた。
