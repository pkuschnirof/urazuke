# 步骤 3 — 在设计架构之前先做容量估算（台阶契约）

**阶段：** 启动（一次；业务规模变化时重做）。
**形式：** 对话（代理计算并呈现选项；所有者选择）。
**规模：** 始终必需，但按比例：小项目的容量估算可以是半页和一个决定（"SQLite 能撑好几
年"）。不能的是不做，因为"会增长多少"这个问题只要五分钟，而错误的答案要花几周。

## 用途

让结构性决定（哪个数据库引擎、接口是同步还是异步、多少并发）用数字做，而不是凭喜好。这是
跳过代价最高的一级台阶：Kikan 从 JSON 文件开始，一测量发现系统每年生成 340 万行；事后更换
接口花了整整一个重构阶段。

制定这份契约时浮现的一个关键点：**有些数据只有业务方有**（多少实体、每个实体多少事件、峰值
时多少操作员、要保留多久），模型推断不出来。它能推断的是派生数据。所以提示词要求它评估
原始数据是否完整并索要缺失的，而不是一脸笃定地估算。知道自己缺什么才能计算的是模型，不是
表单。

还有第二个值得命名的想法：**非对称决定**。有些决定如果你做了而结果不需要，代价很低；如果
你没做而结果需要，代价极高。从第一行就异步的持久化接口是经典例子：如果引擎最终是同步的，
多了一个 `await`；如果最终是异步的而你没预见，就得全部重写。这类决定只要便宜就一定做，哪怕
今天不需要。

## 1. 所需上下文

- 业务的**容量数据调研**，以通用方式命名：主要实体及其增长、每个实体的事件数、并发操作员数
  和峰值时段、数据保留时间、异常负载（活动、结账）、预期增长。调研天然不完整；代理评估并
  索要。
- 如果有先前的系统：对其数据库的读取访问，以获取真实数字而不是估算。
- `PROJECT.md`（第 2 级台阶）。

## 2. 提示词

**初始：**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

我们在要求什么，逐条：区分原始与派生（这是避免编造的区分）；**索要缺失的原始数据，绝不
估算**；存在先前系统时使用其真实数字并注明来源；把派生数据连算式一起算出来，让所有者能重
算；"乘以十"的场景，它揭示什么先坏；三个选项及彼此迁移的成本，因为决定不只是"选哪个"，
还有"选错代价多大"；不选择也不写代码，因为这级台阶是决定的台阶，不是构建的。

**收尾：**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

我们在要求什么：完整的记录，带来源和算式；选中的选项和理由；把非对称决定写下来，因为留在
隐含状态就不会被遵守。

## 3. 预期结果

一个 `docs/SIZING.md` 文件，包含：

- 日期和决定者。
- 原始数据表：值、来源（业务方告知 / 在先前系统中测量）、日期。没有来源为"假设"的。
- 派生数据表：值、来自哪些原始数据、算式。
- "乘以十"的场景：什么先坏。
- 编号的三个选项，附彼此迁移的成本。
- 选中的和理由，一两句话。
- 非对称决定（错了便宜，不做极贵）的列表。
- 代理提出的问题和答案。

## 4. 完整性检验

- 是否有来源为"假设"或没有来源的原始数据？有就说明台阶没登上：代理应该索要。
- 每个派生数据是否标明来自哪些原始数据和什么算式？你能手算一个并得到相同结果吗？
- 是否有三个选项，并选了一个附书面理由？
- 是否说了容量乘以十会怎样？
- 非对称决定是否写下来了，还是留在隐含状态？
- 代理提问了吗？如果它一个问题都没问就给出了数字，要起疑。

## 5. 警报信号

- 三个选项的场景导向同一个结论。代理早就选好了，另外两个是凑数的。
- 某个派生数字比它来源的原始数据更精确（从"大约 5,000 个家庭"得出"1,234,567 行"）。这种
  精确是假的。
- "乘以十"的场景说"没事"。总会有事；没找到，就是没找。
