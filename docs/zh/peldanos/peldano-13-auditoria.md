# 步骤 13 — 作为计划输入的定期审计（台阶契约）

**阶段：** 上线生产。
**时机：** 第一次部署到生产之前必需；它开启上线阶段。之后，在运维中，根据变化节奏每一到两个
月一次，以及每个大阶段收尾时。
**形式：** 一次长发送，最好发给一个与构建者不同的代理。
**规模：** 任何项目第一次部署到生产之前必需；之后与变化节奏成比例（每周都变的系统每月审计
一次；稳定的系统每六个月一次）。

## 用途

每隔一段时间用新鲜的眼光看整个系统，并把看到的转成待办项。审计不是一份归档的报告：它是计
划。它避免没人看见的写在代码里的密码、读整张表的查询
[Ref. 18](../REFERENCIAS.md#ref-18)、依赖里的已知漏洞、几千行的组件
[Ref. 41](../REFERENCIAS.md#ref-41)。它也是把质量控制的独立性再往里推一步：审计的人不是构
建的人。

关于独立性：不需要另一家公司或另一个工具。**另一次会话，用另一个指令文件，没有参与过构建**
就够了。你要的是审计者不共享构建者的预设。一个构建了某模块的模型"知道"硬编码的密码是临时
的；一个第一次看到它的模型会如实报告。两道构建者在一天内留下的管理员入口就是这样被发现的
[Ref. 40](../REFERENCIAS.md#ref-40)。

如果你能选，那就让它还是**跟构建的那个不同的模型**，而不只是同一个模型的另一个会话：2026 年
的一项研究测出，用另一个模型的一个干净会话，比同一个模型的两个会话找到更多错误
（[arXiv 2610.01471](https://arxiv.org/abs/2610.01471)）。但这个偏好有一个**能力下限**，我
说出来是因为我量过：另一个模型找到更多，**只在那个模型做得了这件事的时候**。低于某个能力，
多样性就不再是优势，而变成成本，因为核实一个假发现，花的和你自己去找它差不多。所以顺序是
这样的：先是**另一个模型，如果它够得上这项工作**；如果够不上，就是**同一个模型的另一个
会话，并把这个偏离声明在报告的 `Auditor:` 那一行**；而**绝不**是按哪把密钥装好了、按哪个
超时扛得住来挑的审计者。如果是工具的某个限制挑中了它，报告就用这些话说出来：这是键
`auditor_choice` 的 `tool_constraint` 情形。它之所以存在，是因为工具的约束会伪装成技术选择，
而唯一能把它剥光的，就是必须把它点名。构建者的模型是唯一能用的，这不是方法的失败：这是一个
被声明的偏离，而被声明的偏离是可以审计的。（决定 D-079，关于 2026-11-02 的实验：用另一个
模型的审计者，交出了它自己宣布的九个发现里的四个，而它唯一的 P0 是假的，因为它把一个小数点
读错了；用同一个模型的那个，偏离了这个偏好并在第一行就声明了，交出了十七个，一个一个核实
下来，没有一个是假的。）

下面是那条界线，因为把它说出来比把它装出来更有价值：**第 13 级没法由机器从头到尾验证**。它的
工作是第三方做的，所以闸门没法评估工作本身，只能评估它的**痕迹**。我在 2026-11-02 测过，而且
很不舒服：一份报告逐字写着自己「我找到了九个发现，我写四个，这份报告不完整」，却**绿着**通过
了，因为「完整」不是文件的属性——它是报告预告的东西和它交付的东西之间的关系——而一个只看文件的
闸门看不见这层关系。而且给审计者更多预算也不够：在那次测量里，会话**并没有被截断**，它自己
结束了，一个回合、十三万个词元，自作主张打出了收尾标记。闸门分不清一份被截断的报告和一份被
放弃的报告。它能做的，也是从 D-081 起方法对它的要求，是让报告**声明**那些事后能靠数一数来
反证的东西：`audit_completeness` 下面的完整性，连同它预告了多少个发现、写了多少个；
`dimension_grades` 下面每个维度的评分；`receipts_reproduced` 下面每一张重跑过的凭据的裁定；
以及 `not_audited` 下面它没有审计的部分，带着它开着的待办项。这四条都挡不住说谎。这四条把谎言
从一片沉默，变成一句具体的、写下来的、带日期带签名的断言；而把一份报告里写出来的发现数一数、
再和它自己的数字比一比，只花两分钟，也完全不需要读代码——这正是这套方法要求你做的那类验证。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 完整的仓库，只读。
- 生产环境或测试环境，只读（数据库、日志）。
- 上一次审计，如果有，用来衡量什么变了。
- 范围：完整性、安全、性能、代码质量，或全部。
- `docs/PENDING.md`，附上一周期关闭的待办项及其凭据，供审计者挑选要复现哪些。
- 上一个完整周期的证据登记册：功能性提交、带着凭据关闭的待办项，以及归档的带变异的凭据。
  这和上一条不是一回事：那里审计者挑两三份凭据去复现，这里它得能把整个登记册数清。

## 2. 提示词

**初始（如果可以，发给与构建者不同的代理）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 一个新的代理会话，和构建者的那个不同：在另一个文件夹里克隆一份干净的仓库，而且，如果你的工
  具允许，给它一个不同的指令文件，上面只写"你是审计者；这个系统不是你造的"。没有这一点，审计
  者会共享构建者的假设，然后确认它们。
- 给那个会话的测试环境或生产环境的只读访问权：数据库、日志。只读凭据，放在仓库之外，变量名在
  聊天里说。
- 范围，由你决定，填进 [scope] 空：完整性、安全、性能、代码质量，或者全部。
- 上一次的审计，如果有的话（上次的 `docs/AUDIT_[日期]`），好让它衡量变了什么。
- 谁来审计、为什么是它，由你决定：够得上这项工作就用另一个模型，够不上就用同一个模型的另一个
  会话，而绝不用那个"因为它是刚好装好的密钥"或"因为它是唯一扛得住超时的"而留下来的。提示词
  要求它在报告里声明这件事，但决定是你的：你不做决定，工具就替你做。
- 最低可接受状态：审计者的会话不是构建者的那个，而且它只有只读权限。

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. Pick two or three pending items closed in the last cycle
> and reproduce their receipts literally: rerun the exact red-then-green commands they cite
> against the commits they name, and say for each one whether it reproduces or not. A receipt you
> only read is not a receipt you audited. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items.
>
> This report carries declarations that a gate reads, each one under its fixed key, so write the
> key in English even when the report is in my language. `auditor_choice`: which case applies and
> who decided it -- `different_model` if you are a model other than the one that built this
> system; `same_model_declared` if you are the same model because no other one was up to the
> task; `tool_constraint` if what chose you was a key that happened to be loaded, a timeout or
> any other limit of the tool, and then say so with those words. In the `Auditor:` line, the
> model that built and the model that audits. `evidence_register_health`: the health of the
> register of the evidence, which is a dimension of this audit and is not optional -- how many
> functional commits carry no receipt of any kind; how many pending items closed as shipped lack
> their receipts, and of those how many have the reason written; and of the receipts that carry
> a mutation, how many can be applied again. Each of those figures measured by a program, with
> the command next to it, and a figure you could not measure declared as not measured and never
> as zero. If the register of the evidence is broken, every other finding in this report rests
> on data nobody can reproduce. `findings_by_destination`: every finding assigned to one
> destination -- `product` if the defect is in the audited system, `method` if it is in the
> method being followed, `tool` if it is in the tool that runs it -- with the register where its
> pending item goes. A finding whose destination nobody assigned leaves this audit open.
>
> Four more declarations, about this report and not about the system, because a gate can read the
> trace of the work and cannot read the work. `audit_completeness`: `complete` when you wrote down
> every finding you found, and next to it `findings_announced` and `findings_written` with their
> figures. Those two figures have to be the same figure: if you announce nine findings and write
> four, this report is not complete and this step does not close with it -- so do not announce a
> count you are not going to write, and do not stop halfway and emit your closing marker as if you
> had finished. `dimension_grades`: the grade of every dimension you audited, each one with the name
> of its dimension next to it. `receipts_reproduced`: for every receipt you reran, `reproduces` or
> `does_not_reproduce`, with the command and its output; at least one, and a receipt you only read
> is not one of them. `not_audited`: `none` when you audited everything in the scope, or
> `with_pending` and then, part by part, what you did not audit, why, and the pending item that is
> open for it. A part named as not audited and left without its own pending item leaves this report
> open; an audit with a smaller scope declared up front is worth more than a wide one with holes.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

> [zh]
> 对这个系统做 [范围] 审计。只读：除了把你的报告写到 `docs/AUDIT_[日期].md` 之外什么都不
> 改。如果审计某部分需要你没有的访问权（数据库、日志、某个环境），告诉我并把那部分标为未
> 审计；不要把它当作没问题放过去。走遍全部代码，不是抽样。挑选上一周期关闭的两三个待办项，
> 逐字复现它们的凭据：针对它们点名的提交，重新运行它们引用的那个确切的先红后绿的命令，并对
> 每一个说明它能不能复现。一份你只读过的凭据，不是你审计过的凭据。每个发现：它在哪里（文件和
> 行）、风险是什么、什么证据证明它（命令、查询、数字），以及它的优先级：P0 必须马上修，P1
> 尽快，P2 有可能时。给你审计的每个维度打分。以转成拟议待办项的 P0 发现清单收尾。用我的语
> 言回复。
>
> 这份报告要带上闸门会读的声明，每一条都放在它固定的键下面；即使报告用我的语言写，键也用
> 英文写。`auditor_choice`：适用哪种情形、是谁决定的——`different_model` 指你是与构建这个
> 系统的那个不同的模型；`same_model_declared` 指没有别的模型胜任这项工作，所以你是同一个
> 模型；`tool_constraint` 指选中你的是一把刚好装好的密钥、一个超时，或者工具的任何别的
> 限制，那就用这些话把它说出来。在 `Auditor:` 这一行写明构建的模型和审计的模型。
> `evidence_register_health`：证据登记册的健康，这是本次审计的一个维度，不是可选项——有多少
> 功能性提交没有任何凭据；有多少以交付关闭的待办项缺了它们的凭据，其中又有多少写明了理由；
> 带变异的凭据里，有多少能重新应用。每个数字都由程序测量、旁边附上命令，测不到的数字要
> 声明为未测量，绝不写成零。如果证据登记册是坏的，这份报告里其他所有发现都立在没人能复现
> 的数据上。`findings_by_destination`：每个发现都指派一个去向——缺陷在被审计的系统里就是
> `product`，在所遵循的方法里就是 `method`，在运行它的工具里就是 `tool`——并写明它的待办项
> 进哪个登记册。没有人指派去向的发现，会让这次审计一直开着。
>
> 再写四条声明，它们关于这份报告而不关于系统，因为闸门能读到工作的痕迹，读不到工作本身。
> `audit_completeness`：当你把找到的每一个发现都写下来了，就写 `complete`，并在旁边写上
> `findings_announced` 和 `findings_written` 各自的数字。这两个数字必须是同一个数字：如果你
> 预告了九个发现却只写了四个，这份报告就不完整，这一级也不会凭它收尾——所以不要预告一个你
> 不打算写出来的数目，也不要走到一半就停下、像完成了一样打出你的收尾标记。
> `dimension_grades`：你审计过的每个维度的评分，每个旁边写上它那个维度的名字。
> `receipts_reproduced`：你重跑过的每一张凭据，写 `reproduces` 或 `does_not_reproduce`，
> 并附上命令和它的输出；至少一张，而只读过的凭据不算在里面。`not_audited`：范围内的东西都
> 审计过了就写 `none`，否则写 `with_pending`，然后一部分一部分地说：哪些没有审计、为什么、
> 以及为它开着的待办项是哪一个。被点名为未审计、却没有自己待办项的那部分，会让这份报告
> 一直开着；一开始就声明较小范围的审计，比一个带着窟窿的宽范围审计更有价值。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么，逐条：只读（审计者不修；它提议）；适配审计的完整性条款：**没能验证的要声明，
不默认通过**；全部代码而不是抽样，因为严重的发现通常在没人看的地方；**逐字复现两三份凭据**，
让审计去验证证据而不只是读它（这就是堵上 D-033 那个缺口的条款：被转述的红不是被审计过的红）；
每个发现附位置、风险、证据和优先级，让它不必重读报告就能行动；按维度打分，用来和上一次审计
比较；以及 P0 已经转成拟议的待办项。

还有十一月那两个决定加进来的东西，单独说，因为两个都改变了审计者的工作，而不只是它的写法：
**三条带固定键的声明**，因为"完整"和"已审计"不是能从一份用自由散文写成的报告里读出来的性质
（D-079 和 D-080）；把**证据登记册的健康**作为必须的维度，因为它是唯一审计其余所有维度的那一
个——如果证据登记册是坏的，报告里其他所有发现都立在没人能复现的数据上，那整份报告就比它的
评分所说的更不值钱——；以及**每个发现的去向**，因为把方法的缺陷记在产品的登记册里，是一个
永远没人会修的缺陷：产品的主人修不了方法，而修得了的那个人从来不知道。

**收尾（发给构建者）：**

**发送提示词之前**，你手边必须有这些：

- `docs/AUDIT_[日期].md`，由你读过，并且随机挑两条发现和审计者核实过（向它要命令、要行号；它
  必须拿得出来）。
- 构建者的会话已打开：这条提示词是发给构建者的，不是发给审计者的，文件的日期要填进空里。
- 最低可接受状态：你读了报告，知道有多少条 P0 和 P1，而且你打算去数它开了多少个待办项。

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.
>
> Open each one in the register of the destination the report assigned to it: the product
> register for `product`, and for `method` and for `tool` the register of the method or the
> register of the tool, never the product's. If a finding arrives with no destination, ask me
> for it before opening anything.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 读 `docs/AUDIT_[日期].md`。为每个 P0 和 P1 开一个待办项，引用该发现。如果你不同意其中任
> 何一条，带着反面证据告诉我；不要忽略它。
>
> 每一条都开在报告给它指派的那个去向的登记册里：`product` 开在产品的登记册，`method` 和
> `tool` 开在方法的登记册或工具的登记册，绍不开在产品的。如果某个发现来的时候没有去向，
> 在开任何东西之前先问我。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：审计转成待办项（否则就是一份归档的报告），而且不同意要明确并附证据，不能沉默。

还有，从 D-080 起，每个待办项都要开在它去向的登记册里。构建的那一方是手在产品里的那一方，
所以也是最容易把什么都送进产品登记册的那一方；一个到的时候没有去向的发现，在开任何东西之前
先问你。

## 3. 预期结果

- `docs/AUDIT_[日期].md`，包含：范围、什么能验证什么不能（以及为什么）、附位置、风险、证据和
  优先级的发现、每个维度一个分数、复现上一周期两三份凭据的结果，以及拟议待办项清单。
- 在 `docs/PENDING.md` 里：每个 P0 和 P1 一个待办项，引用该发现。
- 在同一份报告里，闸门能读的三条声明，键用英文：`auditor_choice`（适用哪种情形、是谁决定
  的）、`evidence_register_health`（证据登记册的数字，每个都附上测它的命令，测不到时写"未
  测量"）和 `findings_by_destination`（每个发现带着它的去向）。
- 在每个去向的登记册里：每个 P0 和 P1 一个待办项。产品的进产品的登记册，方法的进方法的，
  工具的进工具的。
- 在同一份报告里，D-081 在前三条之上再加的四条声明：`audit_completeness` 为 `complete`，并且
  `findings_announced` 和 `findings_written` 是同一个数字；`dimension_grades` 带着每个审计过
  的维度的评分；`receipts_reproduced` 带着每一张重跑过的凭据的裁定；以及 `not_audited` 为
  `none` 或 `with_pending`，后者还要带上每个被留在外面的部分的那个开着的待办项。

## 4. 完整性检验

- 报告说了它**没能**验证什么吗？如果它说全验证了，别信。
- 挑两个发现：它们有文件和行、有你能复现的证据吗？
- 报告说了它复现了哪些凭据、附上命令和结果，还是只说读过了？
- 在宣布审计关闭之前，每个 P0 都开了待办项吗？
- 各维度的分数能和上一次审计比较吗？
- 审计的是构建的那个代理吗？是的话，要求对 P0 做第二次审视。
- 报告说了谁审计的、为什么是它吗？如果理由是"它是唯一装好的"或"它是唯一扛得住超时的"，那就是
  `tool_constraint`，而且必须这样写出来。
- 证据登记册健康的那些数字在吗，每个都附着测它的命令吗？测不到的数字要说"未测量"；一个不能
  区分"一个都没有"和"我没能看"的零，不是一个数字（CQ-19，分母）。
- 每个发现都有去向吗，它的待办项是不是开在那个去向的登记册里？
- `findings_announced` 和 `findings_written` 说的是同一个数字吗？把写出来的发现用手数一遍，
  再和声明的数字比一比：这是反证这条声明的唯一办法，也是这一级里最便宜的验证。
- 报告点名为未审计的每一部分，都有它开着的待办项吗？声明了却没有待办项的部分，是一个永远不会
  有人去审计的部分。
- 至少有一张带裁定的凭据吗——`reproduces` 或 `does_not_reproduce`，并贴上命令和输出？只读过的
  凭据没有裁定。

## 5. 警报信号

- 审计没有发现任何 P0。在一个超过三个月的系统里，这几乎从不为真；更可能是范围太小，或者审
  计者共享了预设。
- 发现没有文件行号。那是意见，不是发现。
- 报告说凭据"已经复核过"，却没有展示跑过的命令或它的输出。读过的凭据和复现过的凭据不是一
  回事，只有后者才堵上 D-033 的异议。
- 过了两周，P0 还没有待办项。审计被归档了。
- 报告在夸审计者的独立性，却不说适用 `auditor_choice` 的哪种情形。审计者是工具挑的而不是你挑
  的时候，恰好就是没人会自己写下来的那种情形。
- 证据登记册的健康回来是零，而且没有命令。一个没有产生它的那条命令的零，是装成好消息的
  "我没能看"。
- 所有发现出来都带着去向 `product`。在一个带着方法和工具去看系统的控制里，没有一个是方法的、
  也没有一个是工具的，这不太可能：更可能的是没人问过去向。
- 报告声明了 `audit_completeness: complete`，而写出来的发现的数目对不上。这是唯一一条两分钟
  就能反证的声明，所以每次都值得去做。
- 报告以一句无可挑剔的收尾句结束，却再也没有回到它标过「未审计」的那些部分。一个写不下去的
  审计者照样会打出收尾标记：分开一份写完的报告和一份被放弃的报告的，不是结尾，而是
  `not_audited`。
