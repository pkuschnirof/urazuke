# 步骤 8 — 生产者与消费者之间的对称性，以及反模式记录（台阶契约）

**阶段：** 循环。
**时机：** 每个触及系统两部分之间契约的待办项。契约地图在开启第二个功能块时构建，那时已经
有了界面和服务器。反模式记录在每次有东西第二次坏掉时增长。
**形式：** 循环内自动；加上一个随每次教训增长的文件。
**规模：** 对称性始终必需；生产者/消费者地图在单模块项目里可选，一旦有了分开的界面和服务
器就必需。

## 用途

当你改动一端（服务器、机器人、数据库模式）时，让另一端（界面、计数器、消费者）在同一次提交
中改动。否则它们迟早会分叉，用户在一边看到一个数字，在另一边看到另一个
[Ref. 26](../REFERENCIAS.md#ref-26)。而你已经付过一次代价的错误，记下来，别付两次
[Ref. 2](../REFERENCIAS.md#ref-2)。

背后的一般原则，是我在互助会强制推行的，对所有系统都适用
[Ref. 27](../REFERENCIAS.md#ref-27)：**每张列表只有一个所有者**。一张表的列、一个订单的可能
状态、某物等待的原因：由系统的一个部分（生产者）定义，其他所有部分都从那里读。一旦同一张列
表有两份副本，就有一份过时了；只差知道是哪份。第 2 级台阶的语义树是这些列表第一次被声明的
地方：一个实体的状态就在那里，代码必须从单一来源读取它们。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 一张系统哪些部分消费什么的地图：哪些界面读哪些服务，哪些流程写哪些表。如果不存在，第一
  条提示词构建它。
- 反模式记录 `docs/GOTCHAS.md`，哪怕是空的。

## 2. 提示词

**构建地图（一次）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 系统至少已经构建了一个功能块：各部分之间没有契约，就没有地图可做。
- `docs/SEMANTIC_TREE.md` 保持最新：那些清单（状态、类型、原因）是在那里声明的，而地图必须和
  树一致。
- 一份由你写的清单，列出住在仓库之外、但生产或消费系统某样东西的那些部分（一个机器人、一张读
  数据库的表格、另一个团队的流程），好让代理把它们放进地图，哪怕它看不见。如果一个都没有，也
  说出来。
- 最低可接受状态：代理能读整个仓库，而且你告诉了它外面有什么。

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [zh]
> 构建 `docs/PRODUCER_CONSUMER_MAP.md`：对系统中的每个契约（一个服务、一张表、一种文件格
> 式、一张取值列表），谁生产它、谁消费它。如果系统有你无法访问或不理解的部分，告诉我，而
> 不是把它们排除在地图之外。用我的语言回复。

我在要求什么：带两端的契约清单，以及适配这级台阶的完整性条款：看不到的要声明，不省略。一张
藏着洞的地图比没有地图更糟。

**例行（放进协作契约）：**

**发送提示词之前**，你手边必须有这些：

- `docs/PRODUCER_CONSUMER_MAP.md`，已构建并由你审阅过：挑一个契约，验证两边就是你知道的那两
  边。
- `docs/WORKING_AGREEMENT.md`，这条例行要加进去的地方。
- 最低可接受状态：地图存在，而且至少有第一个功能块的那些契约。

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

> [zh]
> 在关闭任何触及契约的变更之前，在地图中查出每个消费者，并在同一次提交中更新它们。永远优
> 先让生产者定义列表（列、原因、状态）、消费者读取它，而不是各自保留一份副本。如果地图里
> 没有那个关系，加上。

我在要求什么：对称性作为反射（关闭之前找另一端），单一所有者的列表规则，以及地图随着使用自
行维护。

**当有东西第二次坏掉时：**

**发送提示词之前**，你手边必须有这些：

- 这是第二次的证据：第一次的那个待办项或那次提交，由你找出来（在 `docs/PENDING.md` 已关闭的
  待办项里找），好和提示词一起贴给它。没有这个引用，代理会登记一条泛泛的反模式，什么也检测不
  到。
- `docs/GOTCHAS.md`，已创建，哪怕是空的，表头里写好格式：味道、根因、修法、下次怎么提前发现。
- 最低可接受状态：你能说出第一次是什么时候，附日期或待办项编号。

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [zh]
> 这事我们以前遇到过。把它记到 `docs/GOTCHAS.md`，包含：它的气味（早期信号）、根因、修复，
> 以及下次如何在它造成伤害之前检测到它。并且，如果可能，加一个能检测到它的测试或自动检查。

我在要求什么：一个反模式的固定格式（气味、根因、修复、提前检测），而且最重要的，自动检查：
一个记下来却没有自动化的反模式，会在换人或换会话时重演。

## 3. 预期结果

- `docs/PRODUCER_CONSUMER_MAP.md`：契约清单，附生产者和消费者。
- 在每次触及契约的提交里：消费者已更新，在提交信息中点名。
- `docs/GOTCHAS.md`：每个反模式一条，带四个部分（气味、根因、修复、如何提前检测），以及第
  一次发生的日期。

## 4. 完整性检验

- 从地图里挑一个契约，让代理给你看每个消费者在哪里读它。如果有哪个有自己的列表副本，那是
  债务。
- 有没有一个数字显示在两个不同的界面上？比较：一样吗？
- GOTCHAS 的每条都有四个部分吗？
- 已经在 GOTCHAS 里的错误重演了吗？是的话，缺自动检查。

## 5. 警报信号

- 同一个值在不止一个文件里手写出现（服务器和界面上都有"PENDIENTE"、"APROBADA"）。两份副
  本；总有一份会分叉。
- 一次对服务器的改动在服务器测试绿色后就关闭了，没人动界面。
- GOTCHAS 有条目缺"如何提前检测"这部分。那是轶事，不是反模式。
