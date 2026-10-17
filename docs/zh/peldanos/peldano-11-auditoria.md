# 步骤 11 — 作为计划输入的定期审计（台阶契约）

**阶段：** 运维（时不时：一个大阶段收尾时、重要部署之前，或每一两个月）。
**形式：** 一次长发送，最好交给与构建者不同的代理。
**规模：** 任何项目在第一次生产部署之前必需；之后与变更节奏成比例（每周都变的系统每月
审计；稳定的每半年）。

## 用途

时不时用新鲜的眼光看整个系统，并把看到的转成待办项。审计不是归档的报告：它是计划。它避免
没人见过的写在代码里的密码、读整张表的 264 条查询、依赖中的已知漏洞、2,679 行的组件。它
也是质量控制的独立性再往里走一步：审计的人不是构建的人。

关于独立性：不需要另一家公司，也不需要另一个工具。**另一次会话、另一个指令文件、没参与
构建的**就够了。要的是审计者不共享构建者的前提。一个构建了某模块的模型"知道"硬编码的密码
是临时的；一个第一次看到它的模型会照实报告。

## 1. 所需上下文

- 完整的仓库，只读。
- 生产或测试环境，只读（数据库、日志）。
- 上一次审计，如果有，用来衡量变了什么。
- 范围：完整性、安全、性能、代码质量，或全部。

## 2. 提示词

**初始（尽可能交给与构建者不同的代理）：**

> Audit this system for [scope]. Read-only: change nothing except writing your report to
> `docs/AUDIT_[date].md`. If auditing some part requires access you lack (the database, the
> log, an environment), tell me and mark that part as not audited; do not pass it as fine. Go
> through all of the code, not a sample. For every finding: where it is (file and line), what
> the risk is, what evidence proves it (the command, the query, the number), and its priority:
> P0 must be fixed now, P1 soon, P2 when possible. Give a grade to every dimension you audited.
> End with the list of P0 findings turned into proposed pending items. Reply in my language.

我们在要求什么，逐条：只读（审计者不修复；它提议）；审计形式的完整性条款：**没能验证的要
声明，不因省略而放行**；全部代码而非抽样，因为严重的发现通常在没人看的地方；每个发现附位
置、风险、证据和优先级，使其无需重读报告即可行动；按维度打分，以便与上次审计比较；P0 已转
成建议的待办项。

**收尾（给构建者）：**

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

我们在要求什么：审计转成待办项（否则就是一份归档的报告），以及不同意要明确并附证据，而不
是沉默。

## 3. 预期结果

- `docs/AUDIT_[date].md`，包含：范围、能验证的和不能验证的（以及原因）、附位置、风险、证据
  和优先级的发现、按维度的评分，以及建议的待办项列表。
- `docs/PENDING.md` 中：每个 P0 和 P1 一条，引用该发现。

## 4. 完整性检验

- 报告是否说了它没能验证什么？如果它说验证了一切，要起疑。
- 挑两个发现：有文件和行号，以及你能复现的证据吗？
- 在宣布审计关闭之前，每个 P0 是否都开了待办项？
- 按维度的评分能与上次审计比较吗？
- 审计的是构建的那个代理吗？是的话，要求对 P0 再看一眼。

## 5. 警报信号

- 审计没找到任何 P0。在一个运行超过三个月的系统里几乎从不成立；更可能是范围小，或者审计者
  共享了前提。
- 发现没有文件行号。那是意见，不是发现。
- 过了两周，P0 还没有待办项。审计被归档了。
