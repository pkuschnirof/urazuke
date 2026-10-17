# 步骤 8 — 生产者与消费者的对称性，以及反模式记录（台阶契约）

**阶段：** 循环（每次触及双方之间契约的变更）。
**形式：** 在循环中自动；加上一个每次受挫都会增长的文件。
**规模：** 对称性始终必需；生产者/消费者地图在单模块项目中可选，一旦有了分开的界面和服务
器就必需。

## 用途

当你改动一端（服务器、机器人、数据库模式），另一端（界面、计数器、消费者）必须在同一次提
交中改动。否则迟早会分叉，用户在一边看到一个数字，在另一边看到另一个（1,355 对 1,234 的
案例）。而已经付过一次代价的错误要记下来，不付第二次。

背后的一般原则：**每个列表只有一个所有者**。表的列、订单的可能状态、某事等待的原因：只由
系统的一个部分（生产者）定义，其他部分都从那里读。一旦同一个列表有两份副本，其中一份就
不同步了；只差知道是哪一份。

## 1. 所需上下文

- 一张系统哪些部分消费什么的地图：哪些界面读哪些服务，哪些进程写哪些表。没有的话，第一条
  提示词会构建它。
- 反模式记录 `docs/GOTCHAS.md`，哪怕是空的。

## 2. 提示词

**构建地图（一次）：**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

我们在要求什么：契约及其两端的清单，以及这级台阶形式的完整性条款：看不见的要声明，不要省
略。一张有隐藏空洞的地图比没有地图更糟。

**例行（放进协作契约）：**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

我们在要求什么：作为反射的对称性（关闭之前先找另一端）、单一所有者列表的规则，以及地图随
使用自我维护。

**当某事第二次坏掉时：**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

我们在要求什么：反模式的固定格式（气味、根因、修复、提前检测），尤其是自动检查：一个记下
却没自动化的反模式，在换人或换会话时会重演。

## 3. 预期结果

- `docs/PRODUCER_CONSUMER_MAP.md`：契约列表，附生产者和消费者。
- 每次触及契约的提交中：更新了的消费者，在提交信息中点名。
- `docs/GOTCHAS.md`：每个反模式一条，带四个部分（气味、根因、修复、如何提前检测）和第一次
  发生的日期。

## 4. 完整性检验

- 从地图中挑一个契约，让代理展示每个消费者在哪里读它。如果有人保留了自己的列表副本，就有
  债务。
- 有没有一个数字显示在两个不同界面上？比一比：一样吗？
- GOTCHAS 的每条是否都有四个部分？
- 已经在 GOTCHAS 里的错误是否重演了？是的话，缺自动检查。

## 5. 警报信号

- 同一个值手写出现在多个文件中（服务器和界面上都有"待处理"、"已批准"）。两份副本；有一份
  会分叉。
- 一次服务器变更以服务器测试全绿关闭，没人动界面。
- GOTCHAS 有条目缺"如何提前检测"部分。那是轶事，不是反模式。
