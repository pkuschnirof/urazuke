# 步骤 21 — 对资源、函数和超出范围查询的监控，带周期报告（台阶契约）

**阶段：** 运维。
**时机：** 在运维阶段搭建，随第一次部署到生产，用第 19 级的阈值和第 16 级的指标；从那时起它
自己跑，而周期报告每个周期和所有者一起读（有后果的系统每周，小系统每月）。每个超出范围
的事件作为纠正型待办项进入循环。在遗留系统里一样，只有一点不同：报告的第一次阅读就是基线，而第
一天就已经超出范围的东西带着速度标记变成待办项。
**形式：** 一次长发送用来搭建；之后是周期性的例行。
**规模：** 在小项目里最低限度（一份月报、一条磁盘告警和一条数据库错误告警）；在有后果的项目里
完整（按函数和按查询的阈值、告警、周报）。

## 用途

第 19 级台阶的测试说的是系统在某一天、在我选的某个负载下表现如何。生产是每一天，负载由用户来
选，数据在长大，而且每周都有变更进来。十月还在范围里的东西，到了三月就出了范围，没人改过什么，
只是因为那张表长大了。这级台阶存在，是为了让那件事**在用户看到之前被看到**：资源使用对比容量、
每个函数每个入口每个任务每条查询的响应时间，和第 19 级的阈值以及它自己的历史做比较；有东西出了
范围时的一条告警；以及一份我和所有者一起读的周期报告，其中每个偏离都有一个原因或一个待办项。被
收紧到测量值的上限 [Ref. 37](../REFERENCIAS.md#ref-37) 是背后的想法：范围不是一个意见，它是测出来
的数字加一点余量；而在没人看的情况下被烧光的持续集成配额 [Ref. 39](../REFERENCIAS.md#ref-39) 是它
避免的故障：一项没有监控就被消耗的资源，是在它耗尽时才被发现的。

有两条规则我不让步。一条被触发而没人读的告警是那条告警的缺陷，不是没读的人的缺陷：要么调整它，
要么删掉它。还有，不能为了让一条告警闭嘴而在没有一条测出来的书面理由的情况下调高阈值。

**如果你是初学者。** *监控*就是由机器一直看着系统，并在有什么偏离正常时报警。*资源*是系统消耗
的东西：处理器、内存、磁盘、数据库连接，还有外部服务的配额（供应商每月让你发多少条消息）。"*超
出范围*"的意思是高于一个*阈值*（一个固定界限，来自第 19 级台阶的测试）或者和*基线*（同一个数字
最近这些天一直给出的值）差得很远。一条*告警*是当场的通知；*周期报告*是每周或每月平心静气读的那
份汇总。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 可观测性（16）：它赖以为生的指标和日志。
- 第 19 级的阈值和第 17 级的预算。
- 已部署的生产（15），带供监控用的只读访问权。
- 告警渠道和报告的周期：由你和所有者一起决定。

## 2. 提示词

**初始（搭建并演示）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/OBSERVABILITY.md`（16）和 `docs/PERFORMANCE.md`（19）已收尾：指标和阈值。
- `docs/PERSISTENCE.md`（17），带按路径的预算。
- 和所有者一起决定的告警渠道：发给谁、走哪里（邮件、即时通讯），以及谁在几点读它。一条发到没人
  打开的信箱的告警是装饰。
- 报告的周期：每周还是每月，以及谁和你一起读。
- 监控对生产（服务器、数据库、日志）的只读访问权，凭证在聊天之外。
- 你认为算告警的、相对基线的偏离百分比（比如，比最近十四天的平均值高 30%），填进提示词的空位。
- 最低可接受状态：有写下来的阈值、有一个有人在读的渠道，还有一个周期。

> We are going to keep this system watched in production. Using the metrics and logs of step 16, the
> budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1)
> collection of resource usage (CPU, memory, disk, database connections, queue sizes, external
> quotas) and of the response time of every function, endpoint, job and query, with the correlation
> id, kept with a history; (2) alerts when any of them is out of range: above the thresholds, or
> more than [X] percent over the baseline of the last [N] days, sent to [channel], with the rule
> that an alert that fires without a human reading it is a defect of the alert and gets fixed or
> removed; (3) a cyclic report, [weekly], generated automatically, with: resource usage against
> capacity and its trend, the slowest functions and queries and how they moved against the previous
> period, every out-of-range event with its cause if known, and what you propose for each; (4) the
> rule that every out-of-range event becomes a corrective pending item with the measured number as
> its acceptance criterion, closed with the full routine. Nothing here may read or store personal
> data. Show me the first report generated on real data from the test environment, and one alert
> fired on purpose by exceeding a threshold. The row counts that revalidate the sizing carry their
> own verifiable window: the first and the last timestamp read from the database or the log, never a
> number typed by hand; a window typed by hand is marked as such in the report and only warns, it
> never opens a pending item on its own. Document the thresholds, the channel, the cycle and how to
> silence an alert with a written reason in `docs/MONITORING.md`. Reply in my language.

> [zh]
> 我们要让这个系统在生产里被看着。用第 16 级台阶的指标和日志、`docs/PERSISTENCE.md` 的预
> 算和 `docs/PERFORMANCE.md` 的阈值，搭建：(1) 资源使用（CPU、内存、磁盘、数据库连接、队
> 列大小、外部配额）以及每个函数、端点、任务和查询的响应时间的采集，带关联标识符，保留历
> 史；(2) 当其中任何一项超出范围时的告警：高于阈值，或者比最近 [N] 天的基线高出 [X] 个百
> 分点，发到 [渠道]，并带上这条规则：一条被触发而没有人读的告警是那条告警的缺陷，要修掉
> 或删掉；(3) 一份 [每周] 自动生成的周期报告，内容包括：资源使用对比容量及其趋势、最慢的
> 函数和查询以及它们相对上一周期的变化、每个超出范围的事件及其原因（如果知道），以及你对
> 每一项的提议；(4) 这条规则：每个超出范围的事件都变成一个以测出来的数字为验收标准的纠正
> 型待办项，用完整的例行关闭。这里面的任何东西都不得读取或保存个人数据。给我看用测试环境
> 的真实数据生成的第一份报告，以及一条故意超过阈值触发出来的告警。用于复核容量规划的行数必须
> 自带可验证的时间窗口：从数据库或日志读取的最早和最晚时间戳，而不是手工输入的数字；手工输入
> 的窗口要在报告中标明，只发出提醒，绝不自行打开待办项。把阈值、渠道、周期，以及如何带着书面
> 理由让一条告警静默，记进 `docs/MONITORING.md`。用我的语言回复。

**测量的时间窗口。** 周期报告把每年观测到的行数与台阶 3 声明的值作比较。数字正确而窗口错误会打开一个假的待办项：在继承的 Turnera 练习中，三年的 30,000 行被当作一年传入。因此测量必须自带**可验证的**窗口：从数据库或日志读取的最早和最晚记录，而不是手工输入的数字。如果工具读不了数据库，就把它声明为盲点；手工输入的窗口要在报告中标明，只发出提醒，绝不自行打开待办项。（决定 D-039。）

我在要求什么：带历史的采集（没有历史就没有基线，没有基线就没有"超出范围"）；对着两个参照的告
警，第 19 级的绝对阈值和相对自身历史的偏离；有第 12 级台阶那种形状的周期报告（每个偏离带原因或
带提议，不许"一切正常"）；每个偏离转成带数字的待办项；以及两次演示：第一份报告和一条被挑起来的
告警。

**每个周期的例行（写进协作契约）：**

**发送提示词之前**，你手边必须有这些：

- 刚生成的周期报告，以及你和所有者一起读它的一会儿功夫。
- `docs/MONITORING.md` 放在手边，用来对照阈值。
- 最低可接受状态：你在粘贴提示词之前读过报告；代理不替你读。

> With every cyclic report of resources and performance: go through it with me, event by event;
> tell me which out-of-range events become pending items now and which can wait, with your
> reason; write the decision with the date in the report itself; and tell me whether any threshold
> must change and why, with the measurement that justifies it. Never raise a threshold to silence
> an alert without a measured reason written down.

> [zh]
> 每一份资源与性能的周期报告：和我一起逐个事件地走一遍；告诉我哪些超出范围的事件现在变成
> 待办项、哪些可以等，连同你的理由；把带日期的决定写进报告本身；并告诉我是否有哪个阈值必
> 须改、为什么，附上支持它的测量。绝不要为了让一条告警闭嘴而在没有一条测出来的书面理由的
> 情况下调高阈值。

我在要求什么：报告要被读、要做出决定，并留下痕迹；以及阈值那条规则，它是避免监控一点一点变哑的
东西。

## 3. 预期结果

- 带历史的资源与响应时间采集，没有个人数据。
- 按阈值和按偏离的告警，发到一个有人在读的渠道。
- 自动生成的周期报告，每个偏离都有原因或提议。
- `docs/MONITORING.md`，带阈值、渠道、周期和如何带理由静默。
- 写进契约的例行；偏离作为纠正型待办项。

## 4. 完整性检验

- 要求在测试环境里故意超过一个阈值：告警按约定的渠道、带着标识符到你手上了吗？
- 读最后一份报告：每个超出范围的事件都有原因或提议吗？有哪个什么都没有吗？
- 你决定要处理的每个偏离，都有一个以数字为准则的待办项吗？
- 从第 19 级台阶以来有哪个阈值被调高过吗？附的书面理由是什么？
- 报告提到外部服务（即时通讯、持续集成）的配额了吗？

## 5. 警报信号

- 告警每天都在响而没人读。要把它们的数量降到每一条都有意义为止，而不是习惯它们。
- 报告连着三个周期说"一切正常"。要么系统没有用户，要么报告看的不是要紧的东西。
- 有个阈值被调高了"好让它别再报了"。那是第 21 级台阶在无声地死去。
- 监控"为了能诊断"而保存个人数据。那是一次有时刻表的泄漏。
