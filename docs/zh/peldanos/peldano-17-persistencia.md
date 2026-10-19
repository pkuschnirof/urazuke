# 步骤 17 — 持久化层的优化，前后都要测量（台阶契约）

**阶段：** 上线生产。
**时机：** 在上线生产阶段，第 16 级之后（需要看得见查询才能测量它们），第 19 级之前（性能测试
跑在已经优化过的持久化之上；否则它们测的是早就知道的那个问题）。当某个功能块加进一张大表或改了
一条关键流程时重复，以及当监控（21）显示某条查询超出范围时重复。在遗留系统里，测量来自 N6，找
到的东西大部分"触及时偿还"，除了已经超出范围的那些。
**形式：** 两次发送：测量并提议；带前后对比地应用。
**规模：** 按比例：在小项目里，真实查询的索引和 N+1 循环的终结；在有后果的项目里，完整，带每条
路径的预算。

## 用途

持久化层是系统慢慢死掉的地方：一百条记录时好好的，一万条时还能接受，到了十万条每个界面要等二十
秒，而没人知道是什么时候开始的。这级台阶的存在，是为了让那件事用数字来决定，而且在生产之前，不
是靠抱怨、不是在之后。而且是**用第 7 级台阶的方法**来决定：系统做的每一条查询都用一把有测试的
量具来计数和计时，按数字说的去改，然后在同样的数据上重新测量。对一个活着的系统做的第一次无索引
查询审计 [Ref. 18](../REFERENCIAS.md#ref-18)，以及被收紧到测量值的查询预算
[Ref. 37](../REFERENCIAS.md#ref-37)，是这级台阶的来源；而从第一行起就用异步接口的那个决定
[Ref. 15](../REFERENCIAS.md#ref-15)，是它在起步阶段的前身。

它不是什么：不是"重写数据访问"，也不是换一个引擎。那是第 3 级台阶决定的。它是根据真实查询做的
事，去调整现有的东西（索引、分页、批量、保留期、连接池大小）。

**如果你是初学者。** *持久化层*是系统里保存和读取数据的那一部分，几乎总是一个数据库。一个*索引
*就像一本书的目录：没有它，数据库为了找到一个预约要读整张表（那叫*全表扫描*）；有它，就直奔目
标。*N+1 循环*是一个很常见的错误：为了显示一百个预约，系统先做一条查询取列表，然后再做一百条查
询，每个预约一条，而不是只做一条。*分页*是一次显示二十条而不是全部一起。*保留期*是每条数据在归
档或删除之前保存多久。而*连接池*是系统同时和数据库保持的"开着的线路"的数量。这些都不要求你读代
码：它们要求你看前后的数字。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 容量估算和容量调研（第 3 级台阶，或遗留系统里的 N6）：要在什么量级上测量。
- 生产者-消费者地图（第 11 级台阶）：每张表被谁消费。
- 可观测性（16）：每条查询连同它的时间都看得见。
- 装载了预期量级数据的测试环境。

## 2. 提示词

**初始（测量并提议）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/SIZING.md` 和 `docs/VOLUME_SURVEY.md`（第 3 级台阶或 N6），已经收尾：要装载的量级。
- 装载了**预期量级**数据的测试环境，不是十条示例记录。如果有旧系统或生产，用一份匿名化的副本；
  如果是新项目，让代理按语义树的形状和容量估算的量级生成合成数据，并把它作为脚本留在仓库里。这
  是一个在先的待办项，不是这条提示词的一部分。
- `docs/PRODUCER_CONSUMER_MAP.md`（第 11 级台阶），保持最新。
- 如果有生产：只读访问权，凭证在聊天之外，以便除了测试数据之外也在真实数据上测量。
- 给每把量具的测试用的一个已知案例（一张你知道行数的表）。
- 最低可接受状态：测试环境有容量估算的量级，而且代理能看到每条查询连同它的时间（第 16 级台
  阶）。

> We are going to optimize the persistence layer with measurements, not opinions. Read
> `docs/SIZING.md`, `docs/VOLUME_SURVEY.md` and `docs/PRODUCER_CONSUMER_MAP.md`. With the test
> environment loaded at the volumes of the sizing (and, if I gave you access, production
> read-only), measure first, with meters that live in the repository and have a test against a
> known case: every query the system runs per screen and per job, with its count and its time;
> the queries that read whole tables; the ones that run once per item; the size and monthly growth
> of every table; the connection pool usage at the peak. Audit each meter in both directions. Show
> me the numbers with the commands that produce them. Then propose, query by query, what to
> change: indexes derived from the real queries, pagination, batching, the elimination of N+1
> loops, retention and archiving per table, pool size; for each change, the expected gain, the
> risk, and which consumers in the map it touches. Do not change anything yet: I approve the list.
> Reply in my language.

> [zh]
> 我们要用测量而不是意见来优化持久化层。读 `docs/SIZING.md`、`docs/VOLUME_SURVEY.md` 和
> `docs/PRODUCER_CONSUMER_MAP.md`。在按容量估算的量级装载好的测试环境里（以及，如果我给
> 了你访问权，只读的生产上），先测量，用住在仓库里、而且有一个针对已知案例的测试的量具：
> 系统每个界面、每个任务所做的每一条查询，连同它的次数和时间；读整张表的查询；每个条目跑
> 一次的查询；每张表的大小和月增长；峰值时连接池的使用。在两个方向上审计每一把量具。把数
> 字连同产生它们的命令给我看。然后逐条查询地提议改什么：从真实查询推导出来的索引、分页、
> 批量、N+1 循环的消除、每张表的保留期和归档、连接池大小；对每项改动，说明预期收益、风
> 险，以及它触及地图里的哪些消费者。先不要改任何东西：由我批准这份清单。用我的语言回复。

我在要求什么：在提议之前，用第 7 级台阶的方法测量（量具带测试，在两个方向上审计过，数字带命
令）；逐条查询地提议，带上收益和风险，以及每项改动触及的地图消费者（一个新索引谁也不触及；一张
表的保留期触及所有读那张表的人）；以及**在我批准之前什么都不改**，因为优化正是"改进"了没人要的
东西最多的地方。

**收尾（带前后对比地应用）：**

**发送提示词之前**，你手边必须有这些：

- 被提议的改动清单，读过了，每一项带着你的批准或拒绝；被拒绝的，附一行理由。对那些触及地图消费
  者的改动，确认你明白对他们来说有什么变化。
- 对测量里的某个数字手工重算一遍（比如最大那张表每月的行数），而且对得上。
- 最低可接受状态：每项改动都有裁决，而且你明白它触及哪个消费者。

> Apply the approved changes [list], one commit each. For each one show me the meter before and
> after on the same data, the regression suite green, and the end-to-end suite green. Set a budget
> per critical path (queries and time) at the measured value plus a small margin, protected by a
> test that fails if it is exceeded. Update every consumer in the map that a change touches, in
> the same commit. Record the before and after table, the budgets and the retention per table in
> `docs/PERSISTENCE.md`.

> [zh]
> 应用批准的改动 [清单]，每项一次提交。对每一项，把同样数据上的量具前后对比、绿色的回
> 归、绿色的端到端套件给我看。按关键路径设一个预算（查询数和时间），定在测量值加一点小余
> 量上，由一个超出就失败的测试保护。在同一次提交里更新每项改动所触及的地图消费者。把前后
> 对比表、预算和每张表的保留期记进 `docs/PERSISTENCE.md`。

我在要求什么：一项改动一次提交，好让前和后可归因；同一把量具在同样的数据上（数据变了，数字就什
么都说明不了）；带测试的预算，那是防止 N+1 循环三个月后回来的东西；以及第 11 级台阶的对称性应用
到持久化上。

## 3. 预期结果

- 仓库里的查询量具，带测试。
- `docs/PERSISTENCE.md`，带每项改动的前后对比表、按路径的预算和每张表的保留期。
- 索引、分页、批量和保留期都已应用，每项一次提交，回归和端到端都是绿的。
- 每个预算一个超出就失败的测试。

## 4. 完整性检验

- 你自己跑一把量具的前和后（代理给你两条命令）：和表里对得上吗？
- 关键流程里还有读整张表的查询吗？它为什么留下了？
- 每张表都有写下来的保留策略吗，哪怕是"永久保存"？
- 预算有测试吗？让它故意超出一个，给你看那个红。
- 最慢的那个界面，在量级数据下，耗时和容量估算预期的一样吗？

## 5. 警报信号

- 测量是用骨架里的示例数据做的。十行的时候什么都快。
- 代理提议"迁移到另一个数据库"或"重写数据层"。那是第 3 级台阶，而且要不要回到那里是你的决定，
  不是一次优化。
- 数字变好了，但某条流程的端到端不过了。一个索引不会弄坏一条流程；一个保留期或一次分页会：漏了
  地图里的一个消费者。
- 没有预算。没有预算，优化只能维持到下一个功能块。
