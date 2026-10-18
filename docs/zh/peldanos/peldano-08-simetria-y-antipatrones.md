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

- 一张系统哪些部分消费什么的地图：哪些界面读哪些服务，哪些流程写哪些表。如果不存在，第一
  条提示词构建它。
- 反模式记录 `docs/GOTCHAS.md`，哪怕是空的。

## 2. 提示词

**构建地图（一次）：**

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
