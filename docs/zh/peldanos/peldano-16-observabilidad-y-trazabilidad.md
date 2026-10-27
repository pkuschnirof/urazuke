# 步骤 16 — 完整的可观测性与可追溯性，级别可配置（台阶契约）

**阶段：** 上线生产。
**时机：** 在上线生产阶段，第 15 级之后（已经有部署链和按环境的配置），性能测试（19）之前，因
为没有可观测性，性能测试说不出是什么坏了。在遗留系统里，最低级别（级别可配置的结构化日志，加一
个关联标识符）进安全带（N4）；完整级别，在这里。"每个新模块都记录并传递"这条规则在整个运维期间
有效。
**形式：** 一次长发送；代理搭建并演示；你读一条真实的追踪。
**规模：** 在任何将会有用户的项目里，最低级别必需；在任何有后果的项目里，完整。

## 用途

当生产里有什么东西坏掉的时候——而它一定会坏——我想能够用一个标识符把一个动作从界面一路跟到数
据库、跟到每一次外部调用，不必打开代码，也不必请代理去"查一下"。而且我想能在一分钟内把生产的日
志详细程度调高，不重新部署，之后再调回去。这就是可观测性：看见系统在做什么。第二件事是可追溯
性：每个有后果的动作（收了钱、发了消息、删了数据、批准了什么）都留下一条谁、何时、做了什么、从
哪里、结果如何的痕迹，记在一份应用改不了的记录里。没有这些，第 23 级台阶的驻留代理就是瞎着运
维，第 21 和 22 级的监控没有东西可吃，每一次事故都靠假设而不是靠证据来诊断。那个活了一小时四十
三分钟的孤儿轮次是靠日志找到的，不是靠代码 [Ref. 16](../REFERENCIAS.md#ref-16)；而驻留代理恰恰是
从读日志开始的 [Ref. 13](../REFERENCIAS.md#ref-13)。

"级别可配置"是把这件事和"加点日志"区分开的条款：级别（错误、警告、信息、调试、追踪）在服务器上
按环境用配置来改，不碰代码也不部署，而生产跑在"信息"上，除非正在调查什么。

**如果你是初学者。** 一条*日志记录*（log）是系统每做一件事就写下的一行："10:42:13，日程模块，
用户 recepcion1，预约 17 已取消"。*结构化*的意思是所有行都按同样的顺序有同样的部分，好让机器能
搜。*级别*是写多少细节：在"错误"上只写失败的；在"追踪"上，每一步都写。*关联标识符*是每个动作开
始时（你按下了"取消"）拿到的一个唯一编号，它粘着这个动作引起的一切一起走（对数据库的查询、发给
患者的消息），之后搜这个编号就出现完整的故事。而*审计*是一份改不了的重要动作清单：谁、在什么时
候、做了什么。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 部署链和按环境的配置（第 15 级台阶）：级别就配置在那里。
- 锁的表格（第 14 级台阶）：每个有后果的动作都是审计里的一条记录。
- 标好个人数据的初始调研：日志不能包含它们。
- 日志和指标将住在哪里（一个轮转的文件、一个服务）：由你决定。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/DEPLOYMENT.md`（第 15 级台阶），写着按环境的配置是怎么读的：日志级别将是那份配置里多出
  来的一个变量。
- `docs/LOCKS.md`（第 14 级台阶）：有后果动作的清单，就是必须留在审计里的那份清单。
- 在 `docs/INITIAL_SURVEY.md` 里，哪些数据是个人数据的清单（姓名、电话、邮箱、证件、诊断），由
  你和所有者一起写：那是日志必须脱敏的东西。这是法律义务，不是偏好。
- 你关于日志和指标住在哪里的决定：对一个小项目，服务器上一个轮转的文件就够；对一个有后果的项
  目，一个日志服务。还有保存多久。
- 最低可接受状态：你知道哪些数据是个人数据，也知道日志将住在哪里。

> We are going to make this system observable and traceable, end to end, with a level that I can
> change without redeploying. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, `docs/DEPLOYMENT.md` and
> `docs/LOCKS.md`. Evaluate whether you have what is needed (where the logs and metrics will live,
> how configuration is read per environment, which external services are called); if anything is
> missing, ask me. Then set up: (1) structured logging, one record per event, with timestamp,
> level, module, correlation id and actor, with the level configurable per environment at runtime
> (error, warning, info, debug, trace) without a redeploy, and a default of info in production;
> (2) a correlation id created at the entry of every request, job and message, propagated through
> every call and written in every record, so that one id follows an action from the screen to the
> backend, to the database and to every external call; (3) traceability of every consequential
> action in `docs/LOCKS.md`: who, when, what, from where, with which input and which outcome, in
> an audit record the application cannot edit; (4) health and metrics endpoints or files
> (requests, latency, errors, queue sizes, resource usage) that the monitoring of steps 21 and 22
> will read; (5) masking of every personal field listed in `docs/INITIAL_SURVEY.md`, so that no
> log record contains personal data. Show me one real request followed by its id through every
> layer, and show me the level changing in the test environment without a redeploy. Document the
> levels, where to change them and where the records live in `docs/OBSERVABILITY.md`. Reply in my
> language.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 我们要让这个系统从头到尾可观测、可追溯，而且级别由我来改、不用重新部署。读
> `PROJECT.md`、`docs/SEMANTIC_TREE.md`、`docs/DEPLOYMENT.md` 和 `docs/LOCKS.md`。评估你
> 是否具备所需的东西（日志和指标将住在哪里、按环境的配置怎么读、调用了哪些外部服务）；缺
> 什么，向我索要。然后搭建：(1) 结构化日志，每个事件一条记录，带时间戳、级别、模块、关联
> 标识符和执行者，级别在运行时按环境可配置（错误、警告、信息、调试、追踪），不用重新部
> 署，生产的默认值为"信息"；(2) 一个在每个请求、任务和消息入口创建的关联标识符，经每一次
> 调用传递，写进每一条记录，使得一个标识符能把一个动作从界面跟到后端、跟到数据库、跟到每
> 一次外部调用；(3) 对 `docs/LOCKS.md` 中每个有后果动作的可追溯性：谁、何时、做了什么、
> 从哪里、用什么输入、结果如何，记在一份应用改不了的审计记录里；(4) 第 21 和 22 级台阶的
> 监控将要读的健康与指标端点或文件（请求数、延迟、错误、队列大小、资源使用）；(5) 对
> `docs/INITIAL_SURVEY.md` 中列出的每个个人字段做脱敏，使得没有任何一条日志记录含有个人
> 数据。给我看一个真实请求被它的标识符贯穿每一层，并给我看在测试环境里不重新部署就改变级
> 别。把级别、在哪里改它们、日志住在哪里记进 `docs/OBSERVABILITY.md`。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。
>
> 用我的语言回复。

我在要求什么：那五件东西，以及两次演示，它们就是这级台阶的证据：**一个真实标识符被所有层跟踪**
（如果它拿不出来，传递在某处断了）和**不部署就改变级别**（如果必须部署，那就不是可配置的）。有
后果动作的审计必须对应用而言不可变，因为一条应用可以删掉的痕迹不是痕迹。而个人数据的脱敏放在同
一条提示词里，因为日志正是个人数据最常在没人决定的情况下泄漏出去的地方。

**例行（写进协作契约）：**

**发送提示词之前**，你手边必须有这些：

- `docs/OBSERVABILITY.md`，由你读过：你明白怎么调高级别、去哪里读一条日志吗？
- `docs/WORKING_AGREEMENT.md`，例行写在那里。
- 最低可接受状态：你自己在测试环境里把级别调高又调低过一次。

> Every new module, job or integration writes structured log records with the correlation id and
> the actor at the level that corresponds, masks personal data, propagates the id to every call it
> makes, and records every consequential action in the audit trail. A pending item that adds one
> of those is not closed without showing one real id followed end to end through the new code.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

> [zh]
> 每个新模块、新任务或新集成都要在相应的级别上写带关联标识符和执行者的结构化日志记录，对
> 个人数据做脱敏，把标识符传递给它发起的每一次调用，并把每个有后果的动作记进审计轨迹。一
> 个加了上述之一的待办项，不拿出一个真实标识符被从头到尾跟踪着穿过新代码，就不算关闭。
>
> 当你需要我做决定时，用 UX-28（`docs/ANEXO_HEURISTICAS.md`）的四个部分来问，并按这个顺序：让这个
> 问题成为必要的数据，列举出来；不超过五行的一段话，把这些数据连起来并让问题显现；问题本身，可能的
> 答案逐一编号；以及你的推荐。用项目在 `communication_depth` 中声明的技术深度来说——`beginner`、`de
> cision_maker` 或 `technical`——；项目没有声明就用 `decision_maker`。

我在要求什么：让可观测性不随着每个新模块退化，而不是规则的话这总会发生：第三个月的那个模块什么
都不记录，而它恰恰就是会坏的那个。

## 3. 预期结果

- 结构化日志，级别按环境可配置，不部署就改过。
- 每条记录里一个关联标识符，从界面传递到数据库和外部调用。
- 有后果动作的一份不可变审计记录。
- 健康与指标的端点或文件，有文档。
- 日志里没有任何个人数据。
- `docs/OBSERVABILITY.md` 和写进契约的例行。

## 4. 完整性检验（由你来做，不读代码）

- 向它要一个真实请求的标识符，你自己去日志里搜：它出现在界面、后端、数据库，以及外部调用（如果
  有的话）里吗？
- 在测试环境里把级别调到调试，做一个动作，看日志，再调回去。你必须部署吗？那就是没登上去。
- 在日志里搜一个测试用的姓名或电话：不应该有。
- 在测试环境里做一个有后果的动作（取消、发到假收件箱）：它带着谁、何时、做了什么和结果留在审计
  里了吗？
- `docs/OBSERVABILITY.md` 够不够让你凌晨三点一个人找到一条日志？

## 5. 警报信号

- 代理给你看"日志"，但每个模块写的格式都不一样。那不是结构化的；没人能搜得动。
- 标识符出现在后端，但没出现在外部调用或定时任务里。那恰恰是事故走失的地方。
- 生产的级别"暂时"留在了调试。磁盘会被塞满，数据会泄漏。
- 有后果动作的审计和其余数据住在同一张表里，而应用可以删掉它。
