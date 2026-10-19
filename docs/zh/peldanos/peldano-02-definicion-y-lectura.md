# 步骤 2 — 项目定义、语义树与必读（台阶契约）

**阶段：** 启动。
**时机：** 写一次，契约之后；语义树和活状态在整个项目期间保持更新，随每个功能块和
每个新决策。
**形式：** 对话：代理起草，问缺的，你纠正。
**规模：** 所有项目必需。在小项目里，项目文件可以是五十行，语义树二十个节点；它们不能做的
是不存在。

## 用途

代理的每次会话都从零开始：它不记得昨天。给它一张地图，短的，告诉它项目是什么、处于什么状
态、已经做了哪些决定，并强制它在动任何东西之前读。它避免的故障有两个：因为没读地图而白做的
工作 [Ref. 9](../REFERENCIAS.md#ref-9)，以及长到没法读的地图
[Ref. 41](../REFERENCIAS.md#ref-41)。实用规则：**项目文件是纲领，不是历史**。发生过的事放
别处。

地图有两块，第二块干的活最多。第一块是项目文件：系统是什么，为谁，它**不是**什么，已做的决
定。第二块是**语义树**：系统被分解成一棵树，有各个领域，每个领域下面是它的参与者、它的流程
（用例）、它的实体及其状态、它的界面和它的集成；每个节点下挂着触及它的待办项和决策。这棵树
来自你用需求工程的经典方法（访谈、用例、领域模型）做的调研，由代理构建，由你纠正，它给模型
提供它将要触及的那个节点的精确上下文，而不必读整个项目。它也是让你不读代码就能验证代理理解
的系统就是业务要的那个系统的东西。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 业务调研：客户做什么，谁用系统，它解决什么问题，它不该做什么。附访谈、你能叫出名字的用
  例或用户故事，以及业务实体及其状态，哪怕不完整。
- 协作契约（第 1 级台阶）。
- 如果存在旧系统：对其代码或文档的读访问权。
- 已经做过的决定（如有），哪怕只是口头的。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/INITIAL_SURVEY.md`（第 0 级台阶），用业务调研补完。由你根据需求摄入阶段的访谈来写；
  如果你用了某种方法（访谈、用例、用户故事、界面原型），说出是哪一种，并把结果贴进去。它必须
  包含：客户做什么；谁使用系统（参与者，写上角色名）；它解决什么问题；它**不**该做什么，单独
  成一节，哪怕只有两条；所有者说出的用例或用户故事，用他自己的话，哪怕只有十行；业务实体及其
  状态（"一个预约是待定、已确认、已取消"），哪怕不完整；界面的手绘或照片，如果有的话；外部集
  成（消息、支付、另一个系统）；以及已经做出的决定，哪怕是口头的，附日期和谁做的。
- `docs/WORKING_AGREEMENT.md`（第 1 级台阶），已定稿，附日期和版本号。
- 如果存在旧系统：对它的代码或文档的读访问权，路径或链接记在调研里。
- 最低可接受状态：调研里有"它不是什么"那一节，至少两条；至少一个用所有者的话写的用例；至少一
  个带状态的实体。没有这些，出来的树会是编的，而你没有东西可以和它对照。

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

> [zh]
> 我们要把项目写下来。读 `docs/INITIAL_SURVEY.md` 中的业务调研和 `docs/WORKING_AGREEMENT.md`
> 中的协作契约。评估调研是否足以描述系统、它的用户、它的领域和它的边界；如果不够，在写任
> 何东西之前向我索要缺的。然后写两样东西。第一，`PROJECT.md`，最多三百行，包含：系统是什
> 么、为谁；它不是什么；主要模块列表；已做的决定，每条附日期；以及每次会话开始时读本文件
> 和语义树的指令。第二，`docs/SEMANTIC_TREE.md`：把系统写成一棵树，顶层是各个领域，每个领
> 域下面是它的参与者、它的流程（用例，每个附参与者、触发器、步骤、结果和例外）、它的实体
> 及其属性、状态和转换、它的界面，以及它的外部集成。把每个你推断出来而不是从调研中读到的
> 节点标出来，以便我确认或纠正。另外，创建 `docs/STATUS.md` 用于活状态（正在做什么，什么
> 还开着）：那个文件每天都变；另外两个只在系统变化时才变。用我的语言回复。

我在要求什么：先评估调研、再提问、再起草；项目文件要**短**（三百行的上限是随意定的，但必
要：没有上限它就会长）；明确说出系统**不是**什么，因为没说的就是模型会去发明的；决定要附
日期；按完整结构构建**语义树**（领域、参与者、带各部分的用例、带状态和转换的实体、界面、
集成），那是需求工程的领域模型以树的形式呈现；**标出它推断的东西**，因为发明就藏在那里；
把活状态分到另一个文件，让地图不变成历史。

**收尾：**

**发送提示词之前**，你手边必须有这些：

- `PROJECT.md`，由你从头到尾读过（它必须五分钟能读完），你的修改意见已经记下来：哪些不属实，
  哪些不是你的，哪些是多余的。
- `docs/SEMANTIC_TREE.md`，像客户一样一个节点一个节点走过一遍：每个标为推断的节点都有你的裁
  决（确认还是更正），而且你记下了缺的参与者、业务不用的状态、没人要过的界面。
- 那份修改清单，写下来，要填进提示词的 [list] 空里。如果第一次这份清单是空的，该怀疑的是你的
  阅读，不是代理。
- 最低可接受状态：没有一个标着"推断"的节点缺你的裁决。

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [zh]
> 应用这些修正：[清单]。用今天的日期定稿 `PROJECT.md` 和 `docs/SEMANTIC_TREE.md`。在协作契约
> 中加两条规则：变更历史绝不进 `PROJECT.md`（它进 `docs/STATUS.md` 或待办项登记册）；每个待
> 办项都必须挂在语义树的某个节点下，每当一个功能块新增或改变一个节点，树就在同一次提交中
> 更新。

我在要求什么：你的修正（尤其是对它标为推断的节点），日期，以及契约里的两条新规则：一条保护
项目文件不变成历史，一条把每个待办项绑到树的一个节点，那是让树保持活着、让你在十秒内发现一
个超出范围的待办项的东西。

## 3. 预期结果

- `PROJECT.md`（或 `CLAUDE.md`）：短，必读，包含是什么、为谁、不是什么、模块、带日期的决定，
  以及连同树一起读它的命令。最多三百行。
- `docs/SEMANTIC_TREE.md`：语义树，推断出的节点标记着，直到你确认；从第一个功能块起，待办
  项和决策挂在各自的节点下。
- `docs/STATUS.md`：活状态，与前两者分开。
- 三个文件都有最后更新日期。
- 契约里有两条新规则。

## 4. 完整性检验

- `PROJECT.md` 能在五分钟内读完吗？不能就是错的：它是纲领，不是历史。
- 它是否明确说了系统不做什么？（缺的就是代理会去发明的。）
- 像你是客户那样走一遍语义树：你认识的所有参与者都在吗？每个实体的状态是不是业务用的那
  些，不多不少？有没有你不认识的节点？那是发明的：现在就改。
- 推断的节点标出来了吗？你全都确认或纠正了吗？
- 每条决定有日期和谁做的吗？
- 代理在起草之前问了关于业务的问题吗？什么都没问的话，检查它假设了什么。
- 活状态在另一个文件里吗？
- 阅读测试：关闭会话，打开一个新的，问它系统不做什么、某个界面挂在树的哪个节点下。如果它
  用地图回答，挂钩起作用了。

## 5. 警报信号

- 项目文件一个月内长了超过 20%。不是纲领的东西正在进来。
- 代理开始一次会话时提议已经决定、已经写下的事。它没读地图：必读的挂钩失败了。
- "不是什么"一节是空的，或者写着"没什么特别的"。每个系统都有边界；没写下来，模型就会
  越过去。
- 有待办项不挂在树的任何节点下。要么树过时了，要么那些待办项超出了范围；两样都得看。
- 树里的某个实体有一个业务从未叫过的状态。模型发明了它，因为它觉得合乎逻辑，而且会在它之
  上构建。
