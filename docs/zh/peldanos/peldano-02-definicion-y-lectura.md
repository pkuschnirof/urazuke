# 步骤 2 — 项目定义与必读（台阶契约）

**阶段：** 启动（一次；在整个项目期间保持更新）。
**形式：** 对话（代理起草，询问缺失的部分，所有者修正）。
**规模：** 所有项目必需。小项目的项目文件可以只有五十行；不能的是不存在。

## 用途

代理的每次会话都从零开始：它不记得昨天。所以它需要一张简短的地图，告诉它项目是什么、处于
什么状态、已经做了哪些决定。它还需要在动任何东西之前读它的义务。它避免的故障是双重的：因
没读地图而被丢弃的工作，以及长到无法阅读的地图（在一个源系统中，项目文件达到了 9,661 行，
那种状态下没人读它，模型也不读）。

从那次教训中得出的实践规则：**项目文件是纲领，不是历史**。发生过的事放别处（待办项记录、
活状态、日志）；项目文件说系统是什么、为谁、不是什么、决定了什么。

## 1. 所需上下文

- 业务调研：客户做什么，谁使用系统，解决什么问题，不该做什么。
- 协作契约（第 1 级台阶）。
- 如果存在先前的系统：对其代码或文档的读取访问。
- 已做的决定，如果有，哪怕是口头的。

## 2. 提示词

**初始：**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

我们在要求什么：评估调研并在起草之前提问；项目文件要**短**（三百行的上限是武断的但必要
的：没有上限它就会长）；明确说出系统**不是**什么，因为没说的就是模型会编造的；决定要有日期；
把活状态分到另一个文件，让项目文件不变成历史。

**收尾：**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

我们在要求什么：所有者的修正、日期，以及契约中一条新规则，保护项目文件不变成变更日志。那条
规则正是 9,661 行那个案例中缺少的。

## 3. 预期结果

- `PROJECT.md`（或 `CLAUDE.md`）：简短，必读，包含是什么、为谁、不是什么、模块、带日期的
  决定，以及读它的命令。最多三百行。
- `docs/STATUS.md`：活状态，与前者分开。
- 两者都有最后更新日期。
- 契约中的规则：历史不进 `PROJECT.md`。

## 4. 完整性检验

- `PROJECT.md` 能在五分钟内读完吗？不能就是错的：它是纲领，不是历史。
- 它是否明确说了系统不做什么？（缺的就是代理会编造的。）
- 每个决定是否有日期和决定者？
- 代理在起草之前是否问了关于业务的问题？如果什么都没问，检查它假设了什么。
- 活状态是否在另一个文件里？

## 5. 警报信号

- 项目文件一个月内增长超过 20%。有不是纲领的东西在进入。
- 代理在会话开始时提议某件已经决定并写下的事。它没读地图：必读的挂接失效了。
- "不是什么"一节是空的，或者写着"没什么特别的"。每个系统都有边界；没写下来，模型就会越过。
