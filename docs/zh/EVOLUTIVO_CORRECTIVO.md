# Urazuke — 演进-纠正之路：把一个不是用方法诞生的系统规范化，然后再登梯子

作者：Pablo Kuschniroff，由 Claude Code 辅助。第 1 版，2026 年 10 月 18 日。这一页是方法的后
半部分：[主文档](ESCALERA_METODOLOGICA.md)描述的是一个新项目的路，而在这里我描述的是，当系统
已经存在、是别人做的（或者是我自己"凭感觉写"、没有证据做出来的），现在要纠正它或者让它成长时，
我会怎么做。陌生的词在主文档的术语表里；真实案例在[参考资料](REFERENCIAS.md)里。公开仓库：
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 这一页为什么存在

我写梯子的时候，是看着一个空文件夹写的：第 0 级台阶决定项目要不要接，第 4 级部署没有功能的骨
架，直到第 5 级才出现用户将会看到的第一样东西。那是干净的情形，也是最适合教学的情形。但它不
是最常见的情形。在实践中，大多数有人来找我的时候，都已经有一个在跑的系统，有依赖它的用户，做
它的人已经不在了，或者是一个没人向它要过证据的模型做的，而请求是"把这个修一下"或者"给它加上
那个"。早在梯子写出来之前，我自己的工具就已经以诊断模式进入过别人的系统
[Ref. 11](REFERENCIAS.md#ref-11)；而方法第一次从一个生产中的系统里吸取养分，正是在看一个已经
存在的系统的时候 [Ref. 12](REFERENCIAS.md#ref-12)。

这里有一个陷阱，我想在往下讲之前先把它说出来：面对一个遗留系统，诱惑是在两个极端里选一个，而
这两个都是错的。一个是"我用方法从零重写它"：听起来干净，而且几乎总是以第二个永远替代不了第一
个的系统收场。另一个是"我直接对它套用循环，第 5 到 10 级台阶不就是干这个的吗"：听起来务实，
其实是在沙子上盖房，因为循环预设了存在一份契约、一张地图、一个测试环境、一套能跑的测试套件和
一条可复现的部署链。在一个不是用方法诞生的系统里，这些一样都不存在。这条路走的是中间：**先规
范化，不重写，然后再登梯子**。

## 方法的使用场景

方法有三个使用场景，在打开代理之前最好知道自己在哪一个里，因为入口不一样。

| 场景 | 起点 | 从哪里进 | 入口要花多久 | 写在哪里 |
|---|---|---|---|---|
| **新项目** | 空文件夹，加一个带着请求的所有者。 | 第 0 级台阶，然后二十二级按顺序登。 | 第一个功能出现之前，一周的启动。 | 主文档、二十二份契约和课程手册。 |
| **对一个用方法做出来的系统做演进-纠正** | 系统已经登过梯子：有契约、地图、带证据关闭的待办项、测试套件、部署链和手册。 | 第 5 级台阶：开一个功能块，然后跟着循环走；第 11 级定期；第 15 级在阶段收尾。 | 没有入口：它就是第 15 级台阶回到第 0 级，开始下一个阶段，这已经在主文档的 B 部分里了。 | 主文档（阶段 4，运维）。 |
| **对一个不是用方法做出来的系统做演进-纠正** | 一个在跑的、有用户的系统，上面那些产出物一样没有，或者有几样做了一半。 | 这一页的规范化阶段（N0 到 N7），之后才进入循环，以纠正模式或演进模式。 | 对一个小系统，两到三周，然后才碰第一行功能代码。 | 这一页，以及课程手册第 2 部分。 |

有一样东西落在外面，我把它点名出来免得混淆：**技术迁移**（换平台、换语言、换数据库）不是方法
的使用场景；那是另一个项目，而且一般会落进第 0 级台阶的排他性准则
[Ref. 46](REFERENCIAS.md#ref-46)。如果你继承的系统没有可访问的仓库，或者它的界面既不能由程序
操作、也没法改造成可操作，那么该做的不是规范化它，而是做一个替代它的新项目，走完整的第 0 级
台阶。

还有一点说明对第三个场景有效：遗留系统是别的团队的还是你自己的，都一样。一个你三个月前用模型、
没有证据构建出来的系统，和一个承包商三年前做的系统，是同等程度的遗留。变的是读懂它要花多少力
气，而不是路。

## 原则：不重写地规范化，而且输入物齐全

规范化，就是把系统带到方法在开启循环时所预设的那个状态。我用三条不讲价的规则来做。

**第一条：不重写。** 规范化不碰功能。它在系统周围补上它缺的东西（契约、地图、测试环境、测试
套件、可复现的部署链、对那些已经作用于现实世界的东西加的锁），而让系统继续做它一直在做的事。
一个遗留系统被"全面整理一下"的热情弄坏的次数，比被那个本来要修的 bug 弄坏的次数要多。

**第二条：两种速度。** 债务里有一部分要在任何改动之前就还掉，我把它叫做**安全带**：能在一个
有近似真实数据的测试环境里跑这个系统，能以可复现的方式部署它，密钥在代码之外，以及有一套关键
流程的表征测试，只要上面任何一样变了它就变红。安全带是一道**硬闸门**：没有它，什么都不许改，
只有一个为生产紧急情况写下来的例外，下面我会解释。其余的债务**触及时偿还**：当一个功能块进入
某个模块时，那个模块的规范化待办项跟着它一起进。永远不要"花一周做一次大扫除"。

**第三条：前面各个阶段的输入物都必须存在，哪怕要靠自动发现把它们恢复出来。** 这条规则是这条
路和"直接套用循环"的分界线。启动阶段的每一级台阶都产出一个产出物，后面的台阶要读它：初始调研、
适格性卡片、协作契约、项目文件、语义树、容量调研、容量估算、环境调研、闸门。在新项目里，这些
输入物是所有者和代理一起、从需求摄入里写出来的。在遗留系统里没人写过它们，而循环没有它们就启
动不了。解法不是跳过它们，而是让代理**从系统本身把它们恢复出来**：读代码、读数据库结构、读各
环境的配置、读日志、读现有的任何文档，并且让这些文档里的每一条断言都带上一个"它从哪里来"的标
记。我用的标记有五个：`[代码]`、`[数据库]`、`[配置]`、`[文档]`、`[推断]`，再加上 `[业务]`，
给所有者确认过或纠正过的东西。一份带标记恢复出来的文档，是一份不读代码就能验证的文档：所有者
去看标着 `[推断]` 的断言，确认或纠正它们；再去看标着 `[代码]` 的，看看系统做的是不是他以为的
那回事。对不上的地方就是一条**不一致**，而这些不一致正是规范化的金矿：它们是没人报过的 bug，
和没人决定过的规则。

### 恢复出来的输入物一览表

为了不停留在抽象层面，下面列出启动阶段的每一个输入物、它在新项目里从哪里诞生，以及在演进-纠
正之路上怎么拿到它。

| 输入物 | 新项目里由谁产出 | 演进-纠正之路上怎么来 | 谁确认 |
|---|---|---|---|
| `docs/INITIAL_SURVEY.md` | 所有者，手工写，在需求摄入里（第 0 和第 2 级台阶）。 | 代理在 N2 从代码、数据库和配置里起草，带来源标记；所有者补上只有业务才知道的东西。 | 所有者，对 `[推断]` 的部分逐条确认。 |
| `docs/ELIGIBILITY_CRITERIA.md` 和 `docs/ELIGIBILITY.md` | 第 0 级台阶。 | N0，外加四条遗留系统专属的准则。 | 所有者决定。 |
| `docs/WORKING_AGREEMENT.md` | 第 1 级台阶。 | N1，外加五条遗留系统专属的规则。 | 所有者。 |
| `PROJECT.md`、`docs/SEMANTIC_TREE.md`、`docs/STATUS.md` | 第 2 级台阶，从调研出发。 | N2，从系统出发，带标记；外加不一致清单。 | 所有者走一遍树，并对每条不一致做决定。 |
| `docs/AUDIT_[日期].md` | 第 11 级台阶，在最后。 | N3，在最开始：它是债务的清单。 | 所有者读它，并验证其中两条发现。 |
| `docs/ENVIRONMENTS_SURVEY.md`、测试环境、持续集成、可复现的部署链、`docs/GATES.md` | 第 4 和第 13 级台阶。 | N4，安全带，附带表征测试套件。 | 所有者看截图和部署链的第二次运行。 |
| `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`、`docs/PRODUCER_CONSUMER_MAP.md` | 第 12 和第 8 级台阶。 | N5，靠盘点代码和数据库。 | 所有者一把锁一把锁地确认。 |
| `docs/VOLUME_SURVEY.md`、`docs/SIZING.md` | 第 3 级台阶，数字由业务给出。 | N6，数字在数据库和日志里测出来（第 9 级台阶用在容量估算上）。 | 所有者只提供测不出来的那部分。 |
| `docs/PENDING.md` | 第 5 级台阶，从客户的请求出发。 | N7，从审计、不一致和客户的请求出发，带上"阻塞／触及时偿还／可以等待"的标记。 | 所有者排序。 |
| `docs/DECISIONS.md`、`docs/GOTCHAS.md`、`docs/LOCKS.md`、`docs/DEPLOYMENT.md` | 第 6、8、12、13 级台阶。 | 在 N2、N4 和 N5 里建成空的或补全，然后像新项目一样在循环中生长。 | 所有者。 |

如果 N7 结束时这些文件缺了任何一个，这个阶段就没有登上去。系统"能跑"并不要紧：循环在第一次会
话就会需要它。

## 规范化阶段：八个站点

我把它们叫做站点而不是台阶，并且编号 N0 到 N7，是为了不和梯子的二十二级混淆。它们不是新台阶：
它们就是启动阶段的那几级，加上运维阶段的三级（第 8、11 和 12 级），换了顺序，换了入口。在新
项目里入口是调研；在这里入口是系统本身，而阅读由代理来做。

| 站点 | 来源台阶 | 相对新项目变了什么 |
|---|---|---|
| N0 — 既有系统的适格性 | 0 | 多四条准则；X2 一个界面一个界面地测；如果是红的，那是第一条待办项，而不是开工的条件。 |
| N1 — 遗留系统的协作契约 | 1 | 多五条规则：不重构没被要求的东西，动之前先读，顺手发现的怪事只记不修，当前行为就是规格，表征测试不绿就什么都不许进。 |
| N2 — 阅读系统 | 2 | 调研、项目文件和语义树都从代码里出来，带来源标记；出现不一致清单。 |
| N3 — 作为清单的审计 | 11 | 放在最前面而不是最后面，而且每条发现都要说明它是阻塞、触及时偿还，还是可以等待。 |
| N4 — 安全带 | 4、7、13 | 带数据的测试环境、可复现的部署链、密钥挪到外面、持续集成，以及表征测试套件。硬闸门。 |
| N5 — 从代码里找出锁和地图 | 12、8 | 在改动任何东西之前，盘点所有作用于现实世界的动作，以及各部分之间的全部契约。 |
| N6 — 用真实数字做容量估算 | 3、9 | 原始数据是测出来的，不是问出来的；所有者只提供数据库里没有的那部分。 |
| N7 — 规范化待办队列 | 5 | 债务和客户的请求进同一条队列，带速度标记，并按模块配对。 |

顺序很重要。N3 放在 N4 前面，是因为审计会告诉你安全带里必须包含什么（它找到的密钥、那些不能
由程序操作的界面、那条没法重复的部署链）。N5 放在安全带之后，是因为盘点有后果的动作需要能在
一个"弄错了也不要紧"的地方把系统跑起来。N6 放在最后，是因为它要在带数据的测试环境上测量，而
那个环境从 N4 起才存在。N7 收尾，是因为它把前面所有东西汇进一条队列。

### 时机：规范化的日历

| 周 | 站点 | 还会发生什么 |
|---|---|---|
| 1 | N0、N1、N2、N3 | 和所有者一起阅读系统，确认节点、决定不一致。什么都不改。周末交付：恢复出来的地图和债务清单。 |
| 2 | N4、N5 | 安全带：带数据的测试环境、部署链跑两遍、密钥轮换、关键流程的表征测试套件。对已经作用于现实世界的东西确认锁。周末：系统在测试环境里跑起来，测试套件是绿的。 |
| 3 | N6、N7，以及第一个功能块 | 测量出来的容量估算。排好序的待办队列。用第 5 级台阶开第一个功能块，纠正型或演进型，带上配对的规范化待办项。从这里开始就是一贯的循环了。 |

如果系统很大，拉长的是第 1 周（要读的更多）和第 2 周的表征测试套件（流程更多）。不会拉长的是
N7：一份要花一周才写得出来的规范化待办队列，是一份没人会去维护的待办队列。

---

### N0 — 既有系统的适格性

- **意图**：在动它之前，决定这个系统能不能用方法接下来。两条排他性准则和第 0 级台阶一样，X1
  （仓库可访问且以标准方式管理）和 X2（界面可由程序操作，并能在后端验证效果），但这里 X2 是
  对着现有的东西一个界面一个界面地测，而且如果它是红的，那不是开工的条件：那是待办队列里的第
  一条待办项，标为阻塞。
- **时机**：只一次，第一天。两个小时。
- **输入**：初始调研（请求、谁在用这个系统、哪里疼）、仓库的读访问权，以及如果可能的话，系统
  运行环境的访问权。
- **产出物**：`docs/ELIGIBILITY.md`，含决定，以及我为遗留系统增加的四条准则：有没有人知道它
  是怎么运作的（以及他还有多少时间）；生产环境能不能以只读方式查询；有没有任何自动化测试；有
  没有备份，以及有没有真的恢复过一次。
- **闸门**：X1 绿色；X2 绿色，或者它的阻塞待办项已经开出来；备份在 N4 之前至少恢复过一次。
- **谁决定**：所有者。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- `docs/INITIAL_SURVEY.md`，第一天就能写出来的那个简短版本：按业务的说法，系统做什么、给谁用；
  今天哪里疼（引出这次请求的那个 bug、缺的东西）；谁做的，他还在不在；它在哪里运行；谁有什么
  访问权；有没有备份、谁在做。半页，故意不完整：到了 N2，代理会从系统里把它补全。
- `docs/ELIGIBILITY_CRITERIA.md`：第 0 级台阶的卡片（X1、X2 和那些加权准则），再加四行遗留系
  统的准则：有人知道、生产可查询、已有测试、备份恢复过。答案、来源和绿或红那几列留空。
- 给代理的仓库读访问权，如果可能的话还有测试环境或生产环境的只读访问权，凭证不要放在聊天里。
- 最低可接受状态：代理能克隆仓库，而且你知道系统是谁做的、还活着没有（系统和那个人都算）。

**初始：**

> We are going to assess whether this existing system can be taken over with the Urazuke method.
> Read the initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`, which for an existing system adds four criteria: whether anyone
> who knows how the system works is available; whether production can be queried read-only;
> whether any automated test exists; and whether a backup exists and has ever been restored. Then
> explore the repository and, if I gave you access, the environment where it runs: change nothing.
> Fill in the sheet criterion by criterion with the answer, its source (survey, code, database,
> configuration, or inferred) and, for the exclusionary criteria X1 and X2, green or red. For X2,
> list every screen and say for each whether it can be driven by a program today and whether the
> effect can be checked in the backend. If a criterion cannot be answered from what you have, ask
> me; do not assume. Do not decide: present me the completed sheet with your reading and your
> doubts, and I will decide. Reply in my language.

> [zh]
> 我们要评估这个既有系统能不能用 Urazuke 方法接下来。读 `docs/INITIAL_SURVEY.md` 里的初始调研
> 和 `docs/ELIGIBILITY_CRITERIA.md` 里的准则卡片，对一个既有系统它多了四条准则：有没有人知道这
> 个系统怎么运作而且找得到；生产环境能不能以只读方式查询；有没有任何自动化测试；以及有没有备份、
> 它有没有被恢复过。然后探索仓库，如果我给了你访问权，还有它运行的环境：什么都不要改。逐条填写
> 卡片，写上答案、它的来源（调研、代码、数据库、配置，或推断），并且对排他性准则 X1 和 X2 写上
> 绿或红。对 X2，列出每一个界面，并对每一个说明它今天能不能由程序操作、效果能不能在后端验证。
> 如果某条准则用你手上的东西回答不了，就问我；不要假设。不要做决定：把填好的卡片连同你的解读和
> 你的疑问呈给我，由我来决定。用我的语言回复。

我在要求的东西和第 0 级台阶一样，有三点不同。要它探索系统但什么都不改，因为这里确实有一个系
统可探索；要每个答案都说明它从哪里来，因为调研很短，大多数答案会来自代码；还有 X2 要**一个界
面一个界面地**测，因为在遗留系统里，答案从来不是对整个系统说"是"或"否"，而是"这四个可以，这
两个不行"，而那两个就是第一条待办项。

**发送提示词之前**（收尾提示词）：你的决定，一行话，在读完整张卡片之后做出；条件，可验证而且
不超过三条（"备份在 N4 之前恢复过"几乎总是其中一条）；以及 X2 里那些红色界面的清单，提示词会
把它变成第一条待办项。

**收尾：**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, every answer with its source, and the
> conditions if any. If X2 is red for any screen, create `docs/PENDING.md` and open the first
> pending item: make every screen drivable by a program with its backend effect checkable; mark it
> as blocking. Include the questions you asked and my answers.

> [zh]
> 决定：[可行 / 不可行 / 在这些条件下可行：……]。把最终卡片写到 `docs/ELIGIBILITY.md`，附上日期、
> 谁做的决定、每个答案及其来源，以及条件（如果有）。如果 X2 对任何一个界面是红的，创建
> `docs/PENDING.md` 并开出第一条待办项：让每一个界面都能由程序操作、其后端效果都能验证；把它标
> 为阻塞。把你问过的问题和我的回答包含进去。

完整性检验：X2 是每个界面一个答案，而不是整个系统一个答案吗？遗留系统的四条准则都有带来源的
答案吗？如果备份从来没有恢复过，它有没有成为 N4 之前的一个条件？警报信号：代理因为"这是一个
网页应用"就把 X2 整个答成绿色。老的网页应用恰恰是最不能由程序操作的那一类。

---

### N1 — 遗留系统的协作契约

- **意图**：在动任何东西之前把规则定下来，比第 1 级台阶多五条规则，这五条是一个继承来的系统
  为了不让代理自作主张地"改进"它所需要的。
- **时机**：第一天，在 N0 之后。半小时。
- **输入**：你的工作偏好，和第 1 级台阶一样。
- **产出物**：`docs/WORKING_AGREEMENT.md`，含方法的六条规则和遗留系统的五条规则。
- **闸门**：契约有日期和版本，而且项目文件（等它在 N2 存在以后）会命令读它。
- **谁决定**：所有者。

**发送提示词之前**，你得把这些准备在手边：

- 你的工作偏好，写成一张短清单，和第 1 级台阶一样：语言、你希望它多问还是少问、你给它多大的
  自主权、你不能容忍什么。
- 你自己对规范化期间可接受风险水平的一个决定：代理能不能自己部署到测试环境（部署到生产环境永
  远不行，直到 N4 关闭且第 13 级台阶登上去）。
- `docs/ELIGIBILITY.md`（N0），已关闭。
- 最低可接受状态：你答得上第 1 级台阶的那些问题，再加上风险那一条。

**初始：**

> Before we touch anything, we are going to set the working agreement between you and me for a
> system that already exists and has users. Write `docs/WORKING_AGREEMENT.md` with the six rules
> of the method (my time is sacred; zero technical debt; exact scope; documentation in the same
> commit; never report as done what you have not verified; speak my language), each with one line
> explaining what it prevents, and these five rules for an inherited system: (7) Nothing is
> refactored that was not asked for, and no module is rewritten. (8) Code you do not understand
> is read before it is touched, and what you learn goes into the system map. (9) Anything strange
> you find (a secret in the code, a dead path, a duplicated rule, a query without an index) is
> logged as a pending item with its evidence, never fixed in passing. (10) Current behaviour is
> the specification until the owner says otherwise: a difference between what the code does and
> what the business says is a discrepancy for me to decide, not a bug for you to fix silently.
> (11) No change reaches the test environment without the characterization suite green. Add any
> rules you think this system needs, marked as proposals. If you need to know something about how
> I work in order to write this, ask me.

> [zh]
> 在我们动任何东西之前，要为一个已经存在、而且有用户的系统，定下你和我之间的协作契约。写
> `docs/WORKING_AGREEMENT.md`，包含方法的六条规则（我的时间是神圣的；零技术债务；精确的范围；
> 文档在同一次提交里；绝不把没验证过的东西报告为已完成；说我的语言），每条附一行说明它避免了什
> 么，再加上这五条针对继承来的系统的规则：（7）不重构任何没被要求的东西，不重写任何模块。（8）
> 你不理解的代码，先读再动，而你学到的东西要进系统地图。（9）你发现的任何怪事（代码里的一个密
> 钥、一条死路径、一条重复的规则、一个没有索引的查询）都作为带证据的待办项记下来，绝不顺手修掉。
> （10）当前行为就是规格，直到所有者另有说法为止：代码做的事和业务说的事之间的差异，是一条由我
> 来决定的不一致，不是一个由你悄悄修掉的 bug。（11）表征测试套件不绿，任何改动都不许进测试环境。
> 你认为这个系统还需要什么规则，就加上，标为提案。如果你需要知道我是怎么工作的才能写出这份契约，
> 就问我。

我在要求的东西：一贯的六条规则，再加五条，它们之所以存在，是因为一个模型面对别人的代码会条件
反射地做三件事：重排它，在它觉得不对的地方"修"它，以及当代码的行为和它预期的不一样时就认定那
是个错误。规则 7、9 和 10 恰好挡住这三个反射。规则 8 把阅读变成地图，这样代理从某个模块里学
到的东西不会在会话关闭时丢掉。规则 11 是把安全带写成规则，好让它在测试套件存在之前就先存在。

**收尾：** 第 1 级台阶的收尾提示词，不变：你带着理由接受或拒绝那些提案，契约留下日期和版本。

警报信号：代理提出一条规则叫"随着触及逐步把代码现代化"。那条规则就是伪装起来的重写；带着写下
来的理由拒绝它。

---

### N2 — 阅读系统：恢复出来的地图和那些不一致

- **意图**：让第 2 级台阶在新项目里产出的那张地图在这里也存在，只不过是从系统本身里取出来的，
  带来源标记，并且附上一份清单，列出代码、数据库、文档和业务所相信的东西之间一切对不上的地方。
  这是用逆向工程做的第 2 级台阶，也是整条路上每小时价值最高的一步。
- **时机**：第一周，在 N1 之后。两到三天，所有者要随时能确认。
- **输入**：完整的仓库、只读的数据库结构、每个环境的配置、日志（如果有）、现有的文档，以及
  N0 的那份简短调研。
- **产出物**：带标记补全的 `docs/INITIAL_SURVEY.md`；`PROJECT.md`；每个节点都带标记的
  `docs/SEMANTIC_TREE.md`；`docs/STATUS.md`；以及不一致清单，每一条都由所有者决定并写进
  `docs/DECISIONS.md`。
- **闸门**：没有任何 `[推断]` 节点缺少所有者的裁决；没有任何不一致缺少决定或缺少待办项；第 2
  级台阶的阅读测试通过。
- **谁决定**：所有者，一条不一致一条不一致地决定。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- 给代理一切能读的东西的读访问权：整个仓库（所有分支，不只是主分支）、数据库结构（一个只读凭
  证，放在聊天之外）、每个环境的配置（把密钥值遮住的环境文件，或者只列变量名不列值的清单）、
  最近的日志（如果有），以及任何文档，哪怕只是一封旧邮件或一份过时的手册。
- N0 的 `docs/INITIAL_SURVEY.md`，加一个新小节，由你和所有者一起写：**业务认为系统做了什么**，
  用他们自己的话，一个用例一个用例地写，以及他们记得的业务规则（"一个预约在不到两小时前不能
  取消"）。不要去对着系统核实：这个比对恰恰是代理要做的事，而差异就是那些不一致。
- `docs/WORKING_AGREEMENT.md`（N1），已关闭。
- 一份由你写的清单，列出住在仓库之外却会碰到系统的东西：一个机器人、一张读数据库的表格、服务
  器上的一个定时任务、另一个消费某张表的系统。代理从代码里是看不到它们的。
- 最低可接受状态：代理能读代码和数据库结构，而且调研里至少有三个用例和三条用业务原话写的规则。

**初始：**

> We are going to recover the map of this system from what exists. Read the whole repository
> (every branch), the database schema (read-only), the configuration of each environment, the
> recent logs and whatever documentation there is; if some part cannot be read from where you are,
> tell me and mark it as a gap; do not fill it by guessing. Then write three things. First,
> complete `docs/INITIAL_SURVEY.md` in the form the method expects (what the system does and for
> whom; what it does NOT do; who uses it; the technology; the environments; what an error costs),
> with every statement tagged by its source: [code], [database], [configuration], [documentation],
> [business] for what the survey already says, or [inferred]. Second, `PROJECT.md`, three hundred
> lines at most, and `docs/SEMANTIC_TREE.md`: the domains and, under each one, the actors, the
> processes (each with trigger, steps, outcome and exceptions as the code actually implements
> them), the entities with the attributes, states and transitions the database and the code
> enforce, the screens, the external integrations and the scheduled jobs; every node tagged the
> same way. Third, `docs/DISCREPANCIES.md`: everything where the code, the database, the
> documentation and what the business says in the survey do not agree, with the evidence on each
> side. Do not resolve any discrepancy and do not fix anything: list them. Create `docs/STATUS.md`
> for the living state. Reply in my language.

> [zh]
> 我们要从现有的东西里把这个系统的地图恢复出来。读整个仓库（所有分支）、数据库结构（只读）、每
> 个环境的配置、最近的日志，以及现有的任何文档；如果某部分从你所在的位置读不到，告诉我并把它标
> 为缺口；不要靠猜来填它。然后写三样东西。第一，按方法预期的形式补全 `docs/INITIAL_SURVEY.md`
> （系统做什么、给谁用；它**不**做什么；谁在用；技术；环境；一个错误的代价），每条断言都带上来
> 源标记：`[代码]`、`[数据库]`、`[配置]`、`[文档]`、对调研里已经写了的东西用 `[业务]`，或者 `[
> 推断]`。第二，`PROJECT.md`，最多三百行，以及 `docs/SEMANTIC_TREE.md`：各个领域，以及每个领域
> 下面的参与者、流程（每个带触发条件、步骤、结果和异常，按代码实际实现的样子写）、实体连同数据
> 库和代码真正强制的属性、状态和状态转移、界面、外部集成和定时任务；每个节点都用同样的方式打标
> 记。第三，`docs/DISCREPANCIES.md`：代码、数据库、文档，以及业务在调研里说的话，这四者对不上
> 的一切，附上各方的证据。不要解决任何一条不一致，也不要修任何东西：把它们列出来。创建
> `docs/STATUS.md` 来记录活状态。用我的语言回复。

我在要求的东西：要它读完一切并声明读不到什么（完整性条款在遗留系统里的形态：缺口要标出来，不
要填上）；要调研和树里的每条断言都带**来源标记**，因为那个标记正是让你不读代码也能验证的东西；
要流程和状态是**代码实际实现的那些**，而不是本该是的那些，因为当前行为就是规格（契约的规则
10）；要它把定时任务包含进来，因为那是没人记得、却伤害最大的东西；还要那些不一致附着各方的证
据列出来而**不解决**，因为解决它们就是做决定，而做决定是你的事。

**发送提示词之前**（收尾提示词）：树已经和所有者一个节点一个节点地走过，带着确认了的节点清单
和纠正了的节点清单；还有不一致清单，每条附上所有者一行话的决定和日期（系统是对的，业务忘了；
系统是错的，要改；或者挂着不决定但有日期，而且别太多）。

**收尾：**

> I confirm these nodes: [list]. Correct these: [list]. The discrepancies are decided as follows:
> [one line each: discrepancy, my decision, today's date]. Finalize `docs/INITIAL_SURVEY.md`,
> `PROJECT.md` and `docs/SEMANTIC_TREE.md` with today's date, keeping the source tags. Write each
> discrepancy decision in `docs/DECISIONS.md` with my exact words, and open a pending item in
> `docs/PENDING.md` for every discrepancy where I decided the system must change; for the ones
> where I decided the current behaviour stays, write it next to the node as a confirmed rule. Add
> to `PROJECT.md` the instruction to read this file, the tree and the working agreement at the
> start of every session.

> [zh]
> 我确认这些节点：[清单]。纠正这些：[清单]。那些不一致这样决定：[每条一行：不一致、我的决定、
> 今天的日期]。用今天的日期关闭 `docs/INITIAL_SURVEY.md`、`PROJECT.md` 和
> `docs/SEMANTIC_TREE.md`，保留来源标记。把每一条关于不一致的决定用我的原话写进
> `docs/DECISIONS.md`，并且对每一条我决定要改系统的不一致，在 `docs/PENDING.md` 里开一条待办项；
> 对那些我决定保留当前行为的，把它作为一条已确认的规则写在对应节点旁边。在 `PROJECT.md` 里加上
> 一条指令：每次会话开始时读这个文件、语义树和协作契约。

我在要求的东西：每条不一致的决定都落在一贯的三个地方（决策记录、要改的话就落在待办项、确认的
话就落在树上），而且来源标记在关闭时**不要被抹掉**：一棵丢了标记的树，是一棵再也无法验证的树。

完整性检验：像所有者那样走一遍树：有没有某个实体状态是业务从来没用过的？如果它标着 `[代码]`，
那系统里就有它，哪怕没人用，而这就是一条不一致。树里有没有定时任务？如果一个都没有，去问代理
它在哪里找过。每条不一致都有带日期的决定吗？第 2 级台阶的阅读测试过了吗（一个新会话知道系统
**不**做什么）？警报信号：树里没有任何东西标着 `[推断]`（代理没有在区分它读到的和它猜到的）；
不一致清单是空的（在遗留系统里它从来不是空的：代理比错了，或者根本没比）；项目文件因为"要记
录的东西太多"而超过三百行（那些东西该进树，而发生过的事该进活状态
[Ref. 41](REFERENCIAS.md#ref-41)）。

---

### N3 — 作为债务清单的审计

- **意图**：第 11 级台阶，但放在最前面，而且每条发现多问一个问题：它阻塞吗，是触及那个模块时
  偿还，还是可以等待？这份报告不是一份报告：它是安全带（N4）和待办队列（N7）的原材料。在我第
  一个从一开始就有成文方法的项目里，早期的那一系列审计直接变成了待办项
  [Ref. 30](REFERENCIAS.md#ref-30)；在这里我对别人的系统做同样的事。
- **时机**：第一周，在 N2 之后，如果可以的话用一个和读系统时不同的会话。一天。
- **输入**：只读的仓库、只读的运行环境、恢复出来的地图（N2）。
- **产出物**：`docs/AUDIT_[日期].md`，每条发现都标着"阻塞／触及时偿还／可以等待"。
- **闸门**：没有任何发现缺少速度标记；标为阻塞的那些，在 N4 开始之前都已经开出待办项。
- **谁决定**：所有者，决定速度标记。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- 一个代理的新会话，如果你的工具支持的话，用一个干净的克隆和一份写着"你是审计者；你没读过、
  也不会去动这个系统"的指令文件，好让它不共享 N2 那次会话的预设。如果做不到，就用同一个会话，
  但你要心里有数。
- 对系统运行环境（数据库、日志、配置）的只读访问权，只读凭证放在聊天之外。
- N2 恢复出来的地图（`PROJECT.md`、`docs/SEMANTIC_TREE.md`）和 `docs/DISCREPANCIES.md`，好让
  审计者不要再去发现一遍已经写下来的东西。
- 你自己对"阻塞"是什么意思的判断标准：一般来说，暴露的密钥、不能由程序操作的界面、不能重复的
  部署、没有备份，以及任何可能损坏数据或多收钱的东西。用两行写下来交给它。
- 最低可接受状态：审计者有只读权限，而且知道你认为什么是阻塞。

**初始：**

> Audit this system for integrity, security, performance, code quality and deployability, as the
> inventory of what must be normalized before and during its evolution. Read-only: change nothing
> except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires access you
> lack (the database, the logs, the server), tell me and mark that part as not audited; do not
> pass it as fine. Go through all of the code, not a sample, and read `docs/SEMANTIC_TREE.md` and
> `docs/DISCREPANCIES.md` first so that you do not report what is already known. For every
> finding: where it is (file and line), the risk, the evidence that proves it (the command, the
> query, the number), its priority (P0 must be fixed now, P1 soon, P2 when possible), and one more
> field: whether it BLOCKS (must be fixed before any change, by my criteria: [criteria]), whether
> it is PAID WHEN TOUCHED (fixed together with the first change that enters its module), or whether
> it CAN WAIT. Grade every dimension you audited. End with every finding turned into a proposed
> pending item, blocking ones first. Reply in my language.

> [zh]
> 从完整性、安全、性能、代码质量和可部署性五个方面审计这个系统，作为"在演进之前和演进期间必须
> 规范化什么"的清单。只读：除了把报告写到 `docs/AUDIT_[日期].md`，什么都不要改。如果审计某部分
> 需要你没有的访问权（数据库、日志、服务器），告诉我并把那部分标为未审计；不要把它当成没问题。
> 走遍全部代码，不是抽样，并且先读 `docs/SEMANTIC_TREE.md` 和 `docs/DISCREPANCIES.md`，免得报
> 告已经知道的东西。对每条发现：它在哪里（文件和行）、风险、证明它的证据（命令、查询、数字）、
> 它的优先级（P0 必须马上修，P1 尽快，P2 有条件时），再加一个字段：它是**阻塞**（任何改动之前
> 必须修掉，按我的标准：[标准]）、是**触及时偿还**（和进入它所在模块的第一个改动一起修掉），还
> 是**可以等待**。给你审计过的每个维度打一个评级。最后把每条发现都变成一条提议的待办项，阻塞的
> 排在前面。用我的语言回复。

我在要求的东西：第 11 级台阶的审计，加上"可部署性"这个维度（因为在遗留系统里部署往往是第一个
问题），再加上速度字段，而这正是把一份报告变成一份计划的东西：没有那个字段，一个审计过的遗留
系统有四十条发现，没人知道从哪条开始。什么算阻塞由我来给标准，不是审计者，因为那取决于业务的
后果。

**收尾：** 第 11 级台阶的收尾提示词，发给构建者，加一句：它开出的待办项要带上对应发现的速度
标记。

检验：报告有没有说它**没能**审计什么？有没有至少一条标着"阻塞"的发现？（在遗留系统里总会有；
如果没有，审计者就没看密钥也没看部署。）随便挑两条发现，它们有文件、行和可复现的证据吗？警报
信号：全都在"可以等待"里。那是一个不想打扰人的审计者。

---

### N4 — 安全带

- **意图**：让"使改动变得安全"的那些东西在系统周围存在，而且不碰它的功能：一个有近似真实数据
  的测试环境、一条跑得起来而且重复得了的部署链、代码之外的密钥、跑着现有东西的持续集成，以及
  关键流程的**表征测试套件**。它是第 4 级台阶、第 13 级的前半部分，和第 7 级的一个反过来的形
  态，合在一起，放在任何改动之前。它是一道**硬闸门**：安全带不绿，一行功能代码都不许改。
- **时机**：第二周，整整一周。
- **输入**：环境调研（在 N2 恢复、由你确认）、N3 那份带阻塞发现的报告、带流程的语义树，以及
  服务器和数据库的访问权。
- **产出物**：带匿名化数据跑起来的测试环境；`docs/DEPLOYMENT.md`，记录着向测试环境重复跑过两
  次的部署；挪到服务器配置里并且轮换过的密钥；绿色的持续集成；`docs/GATES.md`；以及绿色的表
  征测试套件，每个流程都演示过它的红。
- **闸门**：你亲眼看过系统在测试环境里运行的截图；部署的第二次运行没有变化；在仓库里搜密钥搜
  出来是空的；表征测试套件是绿的，而且每个测试都用变异证明过它会变红。
- **谁决定**：所有者，决定哪些流程是关键流程，以及数据怎么匿名化。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- `docs/ENVIRONMENTS_SURVEY.md`，代理在 N2 带标记起草、由你补全的那份：今天它在哪里运行、今
  天怎么部署（哪怕只是"我用 FTP 把文件复制上去"）、密钥将来住在服务器的什么地方、谁有访问权，
  以及测试环境将在哪里运行（另一台服务器、一个容器、一个云账号；如果你什么都没有，就说出来，
  代理会提出最简单的方案）。提示词里管它叫 "the environments survey"；告诉它它在哪儿。
- 代理对生产服务器的只读访问权（用来复制数据库和配置），以及对测试环境运行位置的写权限，凭证
  放在聊天之外。
- 你对测试数据**匿名化**的决定：哪些字段是个人数据（姓名、电话、邮箱、证件号），以及它们怎么
  替换。这由你决定，因为这是法律义务，不是技术偏好。
- 给表征测试用的**关键流程**清单，由你根据语义树里的流程写出来：那些一旦被无意改掉就会让业务
  赔钱或失去信任的流程。小系统四到八个。不要"全部"：全部等于没有。
- `docs/AUDIT_[日期].md`（N3），好让代理知道它找到了哪些密钥、哪些界面不能操作。
- 一份至少恢复过一次的生产备份，哪怕是在你自己的机器上恢复的，在代理碰服务器之前。这是 N0 那
  条到期日落在这里的条件。
- 最低可接受状态：你知道测试环境将在哪里运行，有关键流程清单，决定了匿名化方案，而且恢复过一
  次备份。

**环境、部署与密钥：**

> We are going to build the safety belt around this system before changing anything in it. Read
> the environments survey, `docs/AUDIT_[date].md` and `docs/SEMANTIC_TREE.md`. Evaluate whether you
> have what is needed (read access to the server where it runs and to its database, write access
> to where the test environment will run, the way it is deployed today); if anything is missing,
> ask me before starting. Then set up, without touching any functionality: (1) a test environment
> that runs the system exactly as production does, with a copy of the data where the personal
> fields I listed are anonymized; (2) a reproducible deployment to that environment, run twice,
> showing me that the second run changed nothing; (3) every secret found in the repository or in
> the code moved to the server configuration (environment file or vault), with the list of what
> you moved so that I rotate each one; (4) continuous integration running whatever test suite
> exists today, even if it is a single smoke test, on every push; (5) `docs/GATES.md` with the
> gates of this project, including: nothing reaches the test environment without the
> characterization suite green, and nothing reaches production without the full suite green with
> the exact version. Document all of it in `docs/DEPLOYMENT.md` so that a person can do it by hand
> without you. Take a screenshot of the system running in the test environment and show it to me.
> Reply in my language.

> [zh]
> 在改动这个系统里的任何东西之前，我们要在它周围造一条安全带。读环境调研、`docs/AUDIT_[日期
> ].md` 和 `docs/SEMANTIC_TREE.md`。评估你是不是具备所需的东西（对它运行所在的服务器和它的数据
> 库的读访问权、对测试环境将要运行的位置的写访问权、它今天的部署方式）；如果缺什么，在开始之前
> 向我索要。然后搭建以下东西，而且不碰任何功能：（1）一个测试环境，它运行这个系统的方式和生产
> 完全一样，带一份数据副本，其中我列出来的那些个人字段已经匿名化；（2）一条到那个环境的可复现
> 部署链，跑两遍，并演示给我看第二遍什么都没有改变；（3）仓库里或代码里找到的每一个密钥都挪到
> 服务器配置里（环境文件或保险库），并给我一份你挪动过的清单，好让我把每一个都轮换掉；（4）持
> 续集成，在每次 push 时运行今天现有的任何测试套件，哪怕只有一个冒烟测试；（5）`docs/GATES.md`，
> 写上这个项目的闸门，包括：表征测试套件不绿，任何东西都不许到测试环境；完整测试套件不以确切版
> 本变绿，任何东西都不许到生产。把这一切记录到 `docs/DEPLOYMENT.md`，让一个人不靠你也能手工完
> 成。给我截一张系统在测试环境里运行的图并拿给我看。用我的语言回复。

我在要求的东西：第 4 级台阶的骨架，围着一个已经存在的东西来造，并且把第 13 级台阶的一半提前
（密钥挪到外面、部署有记录），因为在遗留系统里代码里有密钥是常态而不是例外
[Ref. 42](REFERENCIAS.md#ref-42)；匿名化作为环境的一部分，而不是一个细节；还有在测试套件存在
之前就先写好闸门，好让测试套件一出生就已经是闸门。

**发送提示词之前**（表征测试套件的提示词）：测试环境由你亲手打开过，里面是匿名化数据；清单上
的密钥已经轮换，今天就轮换；关键流程清单，用来填提示词的空；而且如果 N0 留下了红色的界面，那
条让它们变得可操作的阻塞待办项要在这套测试之前或者作为它的一部分关闭。

**表征测试套件：**

> We are going to write the characterization tests of these critical flows: [list]. A
> characterization test captures what the system does today, exactly as it does it, defects
> included; it is not a test of what the system should do. For each flow: drive it from the
> screen as a user would and check the effect in the backend (the row, the state, the message
> queued). Every test must pass against the current code. Then prove that each test actually
> watches its flow: break the flow deliberately with a temporary change, show me the red output,
> revert the change, show me the green. If a flow cannot be driven from the screen, do not
> simulate it: say so and open a pending item marked as blocking. If while writing these tests you
> find behaviour that looks wrong, do not fix it: add it to `docs/DISCREPANCIES.md` with the
> evidence. Record the command to run the suite in `docs/STATUS.md`, and make the suite the gate
> for the test environment as `docs/GATES.md` says. Reply in my language.

> [zh]
> 我们要为这些关键流程写表征测试：[清单]。一个表征测试捕捉的是系统今天做了什么、而且完全按它今
> 天的做法，缺陷也照收不误；它不是一个检验系统"本该做什么"的测试。对每个流程：像用户那样从界面
> 操作它，并在后端验证效果（那一行、那个状态、那条进了队列的消息）。所有测试都必须对着当前代码
> 通过。然后证明每个测试真的在看守它那个流程：用一处临时改动故意把流程弄坏，给我看红色输出，再
> 把改动撤回，给我看绿色。如果某个流程没法从界面操作，不要模拟它：说出来，并开一条标为阻塞的待
> 办项。如果在写这些测试的过程中你发现某个行为看起来不对，不要修它：把它连同证据加到
> `docs/DISCREPANCIES.md` 里。把运行测试套件的命令记录到 `docs/STATUS.md`，并按
> `docs/GATES.md` 所说，让这套测试成为测试环境的闸门。用我的语言回复。

我在要求的东西：反过来的第 7 级台阶。在新项目里，测试诞生时是红的，改动让它变绿；在这里，测
试诞生时是绿的，因为它捕捉的是现有的东西，而它有用的证据是**当你故意弄坏流程时它会变红**。没
有那次演示过的变异，一个表征测试就是一个因为什么都没看着所以才通过的测试，这和那种藏着 bug
的绿色是同一个问题 [Ref. 44](REFERENCIAS.md#ref-44)。还有两条纪律条款：操作不了的东西要声明
出来并且阻塞，看起来不对的东西记为不一致、不去修，因为在所有者做决定之前，当前行为就是规格。

完整性检验：测试环境的网址是你自己打开的、而且你看到系统带着数据吗？你在那些数据里搜过一个真
名、而且搜不到吗？部署跑了两遍，第二遍什么都没变吗？你要求过在仓库里搜密钥、而且搜出来是空的
吗？清单上的每个密钥你都轮换了吗？每个关键流程都有自己的测试，而且每个测试的变异红都摆在眼前
吗？警报信号：表征测试套件"一次就"全通过了，而且从来没展示过一次红色；测试环境跑"在代理的机
器上"，而不是跑在一个你能打开的地方；测试数据是"几条示例记录"，而不是一份匿名化副本（遗留系
统的 bug 住在真实数据里，不住在示例数据里）。

---

### N5 — 从代码里找出锁和生产者-消费者地图

- **意图**：在改动任何东西之前，知道系统里有哪些东西在作用于现实世界（收钱、发送、批准、删除、
  通知、夜里自己跑），以及各部分之间的每一份契约由谁生产、由谁消费。在新项目里，这些在构建之
  前决定（第 12 级台阶），并随着构建逐步绘制（第 8 级台阶）。在遗留系统里它已经建好了，而且
  没人完整记得。一个演进型的改动可能触发一个沉睡着的有后果的动作，一个纠正型的改动可能让某个
  消费者过时。
- **时机**：第二周，在安全带之后，因为盘点动作需要能在一个"弄错了也不要紧"的地方把系统跑起来。
- **输入**：代码、数据库、服务器上的定时任务、语义树，以及那份住在仓库之外的东西的清单。
- **产出物**：带来源标记的 `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`、
  `docs/PRODUCER_CONSUMER_MAP.md`，以及收尾之后的 `docs/LOCKS.md`，里面写着哪些锁现在就上、
  哪些以后再上。
- **闸门**：没有任何有后果的动作缺少所有者的裁决；标为"现在"的锁在第一个功能块之前都已实现，
  并带着它们的红色测试。
- **谁决定**：所有者，一把锁一把锁地决定。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- 和所有者一起，写一份清单，列出业务**知道**系统对外做了什么：收什么钱、发什么、通知谁、删什
  么、什么会自己跑。它放进 `docs/INITIAL_SURVEY.md` 的一个小节。代理会在代码里找到比业务记得
  的更多的东西；两份清单的比对就是结果。
- 代理对服务器定时任务（计划任务清单或者你那个平台的等价物）的访问权，因为自动发送往往住在那
  里，而不在代码里。
- 住在仓库之外的东西的清单（N2），给地图用。
- N4 的测试环境跑着，好让它能触发一个动作、看看会发生什么，而不产生真实后果。
- 最低可接受状态：业务写好了他们那份清单，而且代理能看到定时任务。

**初始：**

> Go through the code, the database triggers and the scheduled jobs of the server looking for
> everything that charges, sends, approves, deletes, notifies outwards or runs on a schedule, and
> write `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md` with every statement tagged by its source. Compare
> it with the list the business wrote in `docs/INITIAL_SURVEY.md`: whatever the code does that the
> business did not list, or the other way round, ask me about before going on. For every action:
> what triggers it, whether it can run twice, whether it is reversible, what lock exists today if
> any, and what the way back is. In the same pass, build `docs/PRODUCER_CONSUMER_MAP.md`: for every
> contract in the system (a service, a table, a file format, a list of values), who produces it
> and who consumes it, including the things outside the repository I told you about. If there are
> parts you cannot see, say so instead of leaving them out. Present me the actions table with a
> proposed lock for each (explicit confirmation, double safety, dry-run mode, daily limit, a human
> in the loop) and a proposal of which locks go NOW, before any change, and which can go when the
> module is touched. Do not implement anything yet: I confirm lock by lock. Reply in my language.

> [zh]
> 走遍代码、数据库触发器和服务器上的定时任务，找出一切会收钱、发送、批准、删除、对外通知或者按
> 时间表自己运行的东西，并写 `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`，每条断言都带上来源标记。
> 把它和业务写在 `docs/INITIAL_SURVEY.md` 里的那份清单做比对：代码做了而业务没列出来的，或者反
> 过来，在继续之前都来问我。对每个动作：什么触发它、它会不会跑两次、它可不可逆、它今天有没有锁
> （如果有是什么锁），以及回头路是什么。在同一遍里，构建 `docs/PRODUCER_CONSUMER_MAP.md`：对系
> 统里的每一份契约（一个服务、一张表、一种文件格式、一份取值清单），谁生产它、谁消费它，包括我
> 告诉过你的那些仓库之外的东西。如果有些部分你看不到，说出来，不要把它们略掉。把动作表呈给我，
> 每个动作附一把提议的锁（显式确认、双重保险、演练模式、每日上限、回路中的人），以及一份提案：
> 哪些锁**现在**就上，在任何改动之前，哪些可以等到触及那个模块时再上。先不要实现任何东西：我一
> 把锁一把锁地确认。用我的语言回复。

我在要求的东西：把第 12 和第 8 级台阶的盘点放在一遍里做，因为它们走的是同一份代码；业务记得
的和代码做的之间的比对，而那正是"没人记得的那些发送"冒出来的地方；还有每把锁的**现在还是触及
时**提案，那就是两种速度的规则应用在保护上：一把管着收钱动作的锁现在就上；一把管着月度导出的
锁，可以等到触及那个模块的功能块。

**收尾：** 第 12 级台阶的收尾提示词，带上标为"现在"的那些锁，每一把都带着它对着没有锁的版本
的红色测试；其余的留在待办队列里，带着它们的标记。

警报信号：代理找到的动作和业务列出来的一模一样。在遗留系统里这从来不会发生；它漏看了定时任务
或者数据库触发器。

---

### N6 — 用真实数字做容量估算

- **意图**：第 3 级台阶，但带着遗留系统的巨大优势：原始数据不用问，它们就在数据库和日志里。
  用第 9 级台阶（一把带测试、双向验证过的量具）把它们测出来，而所有者只提供哪里都没有的东西：
  他们预期增长多少，以及这个系统会不会卖给别人。
- **时机**：第三周，在开第一个功能块之前。半天。
- **输入**：只读的生产数据库或者完整的测试副本、日志、带实体的语义树。
- **产出物**：`docs/VOLUME_SURVEY.md`，每个数字都标着 `[数据库]` 或 `[日志]` 并附上它的命令；
  仓库里带测试的量具；以及 `docs/SIZING.md`，写着"乘以十"和演进之前值得做的那些不对称决策。
- **闸门**：没有任何原始数字缺少量具；有一笔由你重算且对得上的账。
- **谁决定**：所有者，决定预期增长和那些不对称决策。

**发送提示词之前**，你得把这些准备在手边：

- 对生产数据库的只读访问权（或者 N4 那份完整副本，如果匿名化没有动过日期和数量的话），以及对
  访问日志或应用日志的访问权，凭证放在聊天之外。
- 两个只有业务才有的答案，写下来：他们预期未来两年增长多少，以及这个系统会不会用在不止一个地
  方（"乘以十"）。
- 给每把量具的测试用的一个已知案例：比如某张小表的记录数，你可以手工数出来。
- 最低可接受状态：代理能查询数据库，而且你有那两个答案。

**初始：**

> Before changing anything we are going to size this system with its real numbers. With read-only
> access to the production database (or the complete test copy) and to the logs, measure instead
> of asking: rows per table and growth per month from the timestamps, events per entity, peak
> concurrency from the access logs, data size today and projected at five years, and the slowest
> queries. Write a meter for each number (a script that lives in the repository, with a test
> against a known case I will give you) and show me every number together with the command that
> produces it; audit each meter in both directions (is everything that should be counted, counted?
> does everything counted exist?). Write `docs/VOLUME_SURVEY.md` with every figure tagged
> [database] or [log], and ask me only for what cannot be measured: the growth the business
> expects and whether the system will serve more than one site. Then write `docs/SIZING.md`: what
> breaks first if everything is multiplied by ten, which of the current architecture choices hold
> and which do not, and which asymmetric decisions we take now, before evolving, because they are
> cheap today and expensive later. Do not change any code. Reply in my language.

> [zh]
> 在改动任何东西之前，我们要用这个系统的真实数字给它做容量估算。用对生产数据库（或者完整的测试
> 副本）和日志的只读访问权，去测量而不是去问：每张表的行数和按时间戳算出的每月增长、每个实体的
> 事件数、从访问日志算出的峰值并发、今天的数据体量和五年后的预测，以及最慢的那些查询。给每个数
> 字写一把量具（一个住在仓库里的脚本，带一个对着我会给你的已知案例的测试），并把每个数字连同产
> 出它的命令展示给我；对每把量具做双向审计（该被数到的都数到了吗？数到的都真实存在吗？）。写
> `docs/VOLUME_SURVEY.md`，每个数字标上 `[数据库]` 或 `[日志]`，并且只向我索要测不出来的东西：
> 业务预期的增长，以及这个系统会不会服务于不止一个站点。然后写 `docs/SIZING.md`：如果一切都乘
> 以十，最先坏掉的是什么；当前架构的哪些选择撑得住、哪些撑不住；以及我们现在、在演进之前要做哪
> 些不对称决策，因为它们今天便宜、以后昂贵。不要改任何代码。用我的语言回复。

我在要求的东西：测量而不是提问，这是遗留系统给得起而新项目给不起的；第 9 级台阶的带测试量具
和双向审计，因为量具会撒谎 [Ref. 35](REFERENCIAS.md#ref-35)、
[Ref. 36](REFERENCIAS.md#ref-36)；还有把容量估算当成演进之前的闸门
[Ref. 14](REFERENCIAS.md#ref-14)：如果当前架构撑不住"乘以十"，而客户的请求恰恰就是增长，这件
事现在就要知道，而不是等到第三个功能块。

**收尾：** 第 3 级台阶的收尾提示词，在它为撑不住的部分提出的那些方案里做选择，或者确认现状撑
得住。

警报信号：一个"大约"的数字，却没有标明它是大约。如果它在数据库里，就去测；如果不在，就去问；
没有第三个选项。

---

### N7 — 和客户请求配对的规范化待办队列

- **意图**：一条带完整规格的待办项队列，债务（审计出来的东西、那些不一致、不可操作的界面、未
  上的锁、容量估算的决策）和客户的请求（要纠正的和要新加的）住在一起，每一项带着自己的速度标
  记，并按模块配对。这是多了两列的第 5 级台阶。
- **时机**：第三周，这一阶段收尾时。半天。之后就是循环。
- **输入**：`docs/AUDIT_[日期].md`、带决定的 `docs/DISCREPANCIES.md`、`docs/LOCKS.md`、
  `docs/SIZING.md`、语义树，以及客户对这一阶段的请求。
- **产出物**：`docs/PENDING.md`，所有待办项都有规格，标着"阻塞／触及时偿还／可以等待"和"纠正
  型／演进型／规范化"，并带按模块的配对。
- **闸门**：第一个功能块之前，没有任何标着"阻塞"的待办项还开着；每个客户待办项都列出了跟它一
  起进的规范化待办项。
- **谁决定**：所有者，决定顺序。

**发送提示词之前**，这些东西必须存在，而且是你（或者业务和你一起）来做，不是代理：

- 客户对这一阶段的请求，用散文、用他自己的话写，分成两份清单：**今天出错的**（每一条附上怎么
  复现、会发生什么、按业务的说法本该发生什么）和**缺少的**（新东西）。它放在
  `docs/blocks/STAGE_01_REQUEST.md` 或者你喜欢的地方；提示词里说的是 "the client's request
  for this stage"，所以要告诉它它在哪儿。如果所有者给了优先级，也一起写上。
- N2 到 N6 的全部产出物都已关闭：树、审计、决定过的不一致、锁、容量估算。如果缺了任何一个，
  先别发这条提示词：待办队列会出得不完整，而你不会知道它缺了什么。
- 已经存在的那些阻塞待办项（来自 N0、N3 和 N4）已关闭，或者在进行中并有日期。
- 最低可接受状态：客户的请求已经用他的话分成两份清单，而且前面各站点的产出物都存在。

**初始：**

> We are going to turn the normalization and the client's request for this stage into one queue
> of numbered pending items in `docs/PENDING.md`, each with its full specification as the method
> asks (number, title, node of the semantic tree, origin, description, business rules with
> decision and date or marked as missing, data in and out, screens, edge cases, acceptance
> criteria as given, when, then, how it will be verified, status). Sources for the normalization
> items: `docs/AUDIT_[date].md`, the discrepancies I decided to change, the screens that cannot be
> driven by a program, the secrets to rotate, the locks that are not implemented yet, and the
> decisions in `docs/SIZING.md`; each one keeps its speed mark: BLOCKS, PAID WHEN TOUCHED, or CAN
> WAIT. Sources for the client's items: the client's request for this stage; each one marked
> CORRECTIVE (something that fails today, with the way to reproduce it in the client's words) or
> EVOLUTIVE (something new). For every client item, list the normalization items that touch the
> same modules and should be paid together with it. If the request is ambiguous on any point such
> that you cannot write a verifiable item, ask me; do not resolve it by assuming. Order: blocking
> items first, then the client's items in the priority I gave you, each with its paired
> normalization. Reply in my language.

> [zh]
> 我们要把规范化和客户对这一阶段的请求，变成 `docs/PENDING.md` 里一条编号待办项的单一队列，每
> 一条都带着方法要求的完整规格（编号、标题、语义树节点、来源、描述、带决定和日期的业务规则或标
> 为缺失、进出的数据、界面、边界情况、以"给定、当、那么"形式写的验收标准、将如何验证、状态）。
> 规范化待办项的来源：`docs/AUDIT_[日期].md`、我决定要改的那些不一致、不能由程序操作的那些界面、
> 要轮换的密钥、还没实现的那些锁，以及 `docs/SIZING.md` 里的决策；每一条都保留它的速度标记：**
> 阻塞**、**触及时偿还**，或者**可以等待**。客户待办项的来源：客户对这一阶段的请求；每一条标为
> **纠正型**（今天出错的东西，附上用客户的话写的复现方式）或**演进型**（新东西）。对每个客户待
> 办项，列出那些触及同样模块、应该和它一起偿还的规范化待办项。如果请求在某一点上含糊到你写不出
> 一条可验证的待办项，就问我；不要靠假设去解决它。顺序：先是阻塞的那些，然后是客户的那些，按我
> 给你的优先级，每一条带着它配对的规范化待办项。用我的语言回复。

我在要求的东西：完整的第 5 级台阶（详细规格住在每一个待办项里，规范化的那些也一样），加上让
这条路之所以成立的两个标记：速度，它说每一笔债务什么时候偿还；类型，它说每一项怎么关闭（一个
纠正型用复现故障的测试关闭；一个演进型用第 7 级台阶的测试关闭）。还有**按模块配对**，那是把
"触及时偿还"这条规则做成可操作的：当我开"定金"这个功能块时，支付模块的规范化待办项跟着它一起
进，不早也不晚。

**收尾：** 第 5 级台阶里每次会话的例行，不变，写进协作契约。

完整性检验：还有"阻塞"开着吗？那第一个功能块就不能开。每个纠正型都说明了怎么复现、而且用的是
客户的话吗？每个客户待办项都有自己的配对清单吗，哪怕是空的？警报信号：待办队列里有超过五十条
"可以等待"的规范化待办项。那不是登记在册的债务：那是伪装成清单的重写。把永远不会偿还的那些归
档掉，并且把这件事说出来。

---

## 对遗留系统跑循环：纠正模式与演进模式

N7 结束之后，这条路和梯子汇合：第 5 到 10 级台阶随每条待办项登上去，和新项目一样，同样的契约、
同样的提示词。但有两个细微之处值得单开一节，因为它们正是"有方法地动遗留系统"和"小心地动遗留
系统"之间的区别。

### 纠正模式：红是自然的

一条纠正型待办项是一个 bug：今天出错的东西，而客户知道。在新项目的第 7 级台阶里，红是制造出
来的（写测试、对着旧代码跑、看它失败）。在纠正模式里，红**就是那个 bug 本身**：那个复现故障
的测试，像报告它的那个用户一样从界面操作流程，必须对着当前代码失败。如果它不失败，你复现的就
不是别人报给你的那个 bug；你复现的是另一个。那个红是你在修对东西的证据，而且比代理关于"应该
是在发生什么"的任何解释都更有价值。那个走了四轮才找到根因的案例
[Ref. 22](REFERENCIAS.md#ref-22)，就是它教会我：没有写下来的复现，每一轮修的都是另一个症状。

**发送提示词之前**，你得把这些准备在手边：

- `docs/PENDING.md`（N7）里那条纠正型待办项，带着用客户的话写的复现方式：他做了什么、发生了
  什么、他期待什么。如果客户不知道怎么复现，先去拿到一个案例（一条记录、一个日期、一张截图）；
  没有复现就没有测试，没有测试就没有关闭。
- N4 的表征测试套件在测试环境里是绿的，命令写在 `docs/STATUS.md` 里。
- 和这条待办项配对的那些规范化待办项，列在它里面。
- 你愿意做决定的准备：如果根因原来是一条没人写下来的业务规则（这经常发生），代理会停下来提问，
  而那天必须有人回答。
- 最低可接受状态：你知道怎么在测试环境里手工复现这个 bug。

**关闭一条纠正型待办项：**

> This pending item is a correction: [what fails, in the client's words, and how to reproduce
> it]. Before changing anything: (1) Reproduce the failure with a test that drives the flow from
> the screen and checks the effect in the backend, and show me that it fails against the current
> code; that red is the proof that you reproduced the right defect. If you cannot reproduce it,
> tell me what you tried and what you need; do not fix what you cannot see. (2) Find the root
> cause and tell me in prose, with the evidence, before fixing. If the root cause is a business
> rule nobody wrote down, stop and ask me. (3) Fix at the root, not where it hurts, and nothing
> else: anything else you find goes to a pending item. (4) Show me the test green, the
> characterization suite still green, and the regression of the neighbouring items. (5) If the
> fix changes a current behaviour that someone may depend on, say so explicitly: that is a decision
> for me, not a side effect. Close the paired normalization items of this module in the same
> block, each with its own evidence. The commit message says "proved red against [version]" and
> the test counts. Reply in my language.

> [zh]
> 这条待办项是一次纠正：[用客户的话写：什么出错了，以及怎么复现它]。在改动任何东西之前：（1）
> 用一个从界面操作流程、并在后端验证效果的测试复现这次故障，并给我看它对着当前代码失败；那个红
> 是你复现对了缺陷的证据。如果你复现不出来，告诉我你试过什么、你需要什么；不要去修你看不见的东
> 西。（2）找出根因，并在修之前用散文连同证据告诉我。如果根因是一条没人写下来的业务规则，停下
> 来问我。（3）在根上修，不要在疼的地方修，而且只修它：你发现的任何别的东西都进一条待办项。（4）
> 给我看测试变绿、表征测试套件仍然是绿的，以及相邻待办项的回归。（5）如果这次修复改变了某个当
> 前行为、而可能有人依赖它，明确说出来：那是我的一个决定，不是一个副作用。把这个模块里和它配对
> 的规范化待办项在同一个功能块里关闭，每一条都带自己的证据。提交信息里写"对着[版本]先证红"以及
> 测试的数字。用我的语言回复。

我在要求的东西：复现在诊断**之前**，因为一个模型会非常笃定地诊断它没有复现过的东西；根因在动
手之前用散文说出来，好让你能叫停一次指错方向的修复；在根上修而且只修它，因为在遗留系统里"反
正我都来了"是弄坏本来能跑的东西最常见的方式；表征测试套件作为整个系统的回归；还有第 5 条，它
把行为的改变变成一个决定。还有配对：这个模块的债务现在就偿还，带着它的证据，不是"以后"。

### 演进模式：表征测试就是回归

一条演进型待办项是在已有的东西上加新东西。它用第 5 级台阶的提示词打开，用第 6 和第 7 级原样
构建，唯一的区别是"相邻的回归"意味着什么：在这里相邻的就是整个系统，而表征测试套件就是那个说
"本来能跑的还在跑"的东西。还有两条规则。第一：当功能块进入某个模块时，那个模块里标着"触及时
偿还"的规范化待办项跟着它一起进，带着各自的证据；这就是两种速度的规则。第二：新东西一出生就
带着完整的方法，也就是说，它在待办项里有规格，有红色测试，有端到端测试，如果它作用于现实世界
还有锁。不要对新模块做遗留系统当年对旧模块做的事。

### 例外：生产环境的紧急情况

安全带是一道硬闸门，而一道硬闸门需要它写下来的例外，因为如果我不写，那么在某天晚上十一点有东
西塌了的时候，例外就会被当场发明出来。例外是这样的：如果生产环境已经宕了或者正在损坏数据，而
安全带还没造完，那就做能止住损害的最小改动，带着手工的回退路径，并且告知所有者；而且**当天**
就开出那条纠正型待办项，用完整的例行来关闭它：复现它的红色测试、根因、回归。一次没有再走一遍
循环的紧急修复，是一笔要连本带利收回来的债务。

**发送提示词之前**，你得把这些准备在手边：确认这真的是一次紧急情况（生产宕了或者正在损坏数据，
而不是"客户很着急"）、所有者已被告知，以及回头路（N0 的那份备份或者上一个版本）就在手边。

**紧急情况：**

> This is an urgent fix on production: [what is happening]. Do the minimum that stops the damage,
> on a branch, with the rollback ready before you deploy, and tell me exactly what you changed and
> what you did not verify. Do not touch anything else. Then, today, open the corrective pending
> item in `docs/PENDING.md` with what happened, and we close it with the full routine: the test
> that reproduces it in red, the root cause, the fix at the root, the characterization suite and
> the regression green. Reply in my language.

> [zh]
> 这是一次生产环境的紧急修复：[正在发生什么]。做能止住损害的最小改动，在一个分支上做，在部署之
> 前把回退准备好，并且准确告诉我你改了什么、以及什么是你没有验证的。别的什么都不要碰。然后，就
> 在今天，在 `docs/PENDING.md` 里开出那条纠正型待办项，写上发生了什么，我们用完整的例行来关闭
> 它：复现它的红色测试、根因、在根上的修复、表征测试套件和回归都变绿。用我的语言回复。

我在要求的东西：最小改动，回退在前不在后，还有对未验证内容的诚实报告（第 10 级台阶）；以及当
天就必须重新走一遍循环的义务，那正是把一次例外和一个习惯区分开来的东西。

## 遗留系统里的运维质量六级台阶

主文档里的第 16 到 21 级台阶（可观测性与可追溯性、持久化、漏洞、性能，以及两个监控）对两个使用
场景都有效，而在遗留系统里它们有一个精确的位置，因为其中有几级的工作已经被规范化阶段做掉了一
半：

- **16，可观测性与可追溯性**：最低级别（级别可配置的结构化日志，加上关键流程里的一个关联标识
  符）进安全带（N4），因为没有它，表征测试套件说不出是什么坏了。完整级别，连同 N5 盘点出来的那
  些有后果动作的不可变审计，在规范化之后的第一次部署之前登。
- **17，持久化**：测量在 N6 里已经做过了。从里面出来的东西进待办队列（N7），带着它的标记：已经
  超出业务容忍度的，"阻断"或"现在"；其余的，"触及时偿还"，跟着触及那个模块的功能块一起进来。
- **18，漏洞**：第一次运行是 N3 审计的安全维度，而链条里的扫描是安全带（N4）的一部分，因为一个
  遗留系统几乎总是有旧依赖和历史里的密钥。P0 阻断；其余的进待办队列。
- **19，性能**：用 N6 测出来的量级跑，跑在已经把阻断部分纠正过的持久化之上，在规范化之后的第一
  次部署之前。在遗留系统里它常常会发现断裂点比业务以为的近得多。
- **20 和 21，监控**：在第一次部署的那一周搭起来，和新项目一样，只有一点不同：报告的第一次阅读
  就是这个遗留系统的基线，而第一天就已经存在的偏离和错误带着速度标记变成待办项。没有任何一个留
  作"已知"而没有待办项。

在实践中，对一个小系统来说，部署之前那四级给规范化的日历加上一周（第四周，在第一个演进功能块之
前，或者和它一起，看请求有多急），而两个监控在部署的那一周搭起来。

## 系统什么时候算规范化了

永远不会完全规范化，而这样也挺好：标着"触及时偿还"的债务会在几个月里一个模块一个模块地偿还，
标着"可以等待"的有时候永远不会偿还，而这件事要说出来。真正有一个精确时刻的，是**这个阶段的收
尾**，也就是第一个功能块打开的时候。清单是这样的：

1. 恢复出来的输入物一览表里的全部输入物都存在，带来源标记，而且所有者确认了树里每一个 `[推断
   ]` 节点（N2）。
2. 每条不一致都有带日期的决定，要改系统的那些都有待办项（N2）。
3. 审计存在，而且每条发现都有速度标记（N3）。
4. 安全带是绿的：带匿名化数据的测试环境由你亲手打开过；部署跑了两遍；搜密钥搜出来是空的，而
   且找到的都轮换了；持续集成是绿的；表征测试套件是绿的，而且每个关键流程的变异红都演示过
   （N4）。
5. 每个有后果的动作都有裁决，而且标为"现在"的锁都有它们的红色测试（N5）。
6. 原始数字都用带测试的量具测过，而且"乘以十"写下来了（N6）。
7. 没有任何标着"阻塞"的待办项还开着，而且每个客户待办项都有它的配对项（N7）。
8. 协作契约里有遗留系统的那五条规则，而且一个新会话能通过阅读测试（N1、N2）。

如果这八条都是"是"，那么系统已经规范化到这条路所要求的程度，接下来就是一贯的梯子。主文档的阶
段 3 和 4（上线生产和运维）原样适用：定期审计、手册（在遗留系统里往往不存在，用第 14 级台阶
根据系统现状生成）、驻留代理，以及带数字的复盘，而复盘在遗留系统里多了一个它自己的问题：规范
化花了多少成本，以及我们标为"可以等待"的债务里，有哪些最后还是照样付了代价。

## 整条路的警报信号

- 代理提出要重写某个模块，"因为这样比读懂它更容易"。那是契约规则 7 被违反；在遗留系统里，读
  懂就是工作本身。
- 安全带只做了一半就开始改功能（"测试套件我们以后再补"）。以后永远不会到，而第一个没有测试套
  件护着的改动，就是那个弄坏了"没人知道它存在"的东西的改动。
- 不一致清单被"把代码改成业务说的那样"给解决掉了，而所有者没有逐条做决定。那些不一致里有一些
  是业务忘了、而代码还记得的规则。
- 规范化待办队列增长得比偿还得快。那是标记打错了：有些标着"触及时偿还"的其实是"可以等待"，或
  者有些模块被触及了却没有偿还它的债务。
- 容量估算的数字出自一个估计，"因为数据库太大了数不过来"。一个大数据库用一条查询就能数出来；
  那就是一把量具。
- 一次紧急修复没有再走一遍循环。数数这个月有过几次；如果不止一次，那安全带就不是闸门，是装饰。

## 尚待展开的 `[假设]`

1. 遗留系统专属的那四条适格性准则，是从我以诊断模式接触别人系统的经验里写出来的；我没有像校
   准 X1 和 X2 那样用被拒绝的项目去校准它们。一个没人知道它怎么运作的遗留系统，如果数据库和
   代码都可读，照样可能是可行的；一个有一堆两年没人跑过的测试的遗留系统，也许比一个完全没有
   测试的更糟。缺案例。
2. 表征测试套件的规模：四到八个流程是我在小系统上行之有效的；在大系统上，我不知道标准该是按
   流程、按模块，还是按涉及的金额。
3. 规范化在一个大系统里要持续多久：三周的日历是给引导项目那么大的系统的。在一个有几十个模块
   的系统里，我猜规范化是按模块做的，一个模块一条安全带，而 N2 整体做一次、N4 分批做。我没有
   试过。
4. 一个由模型用半套方法构建出来的遗留系统（有契约，没有测试）会怎么样：这条路是整条走完，还
   是有捷径。我的直觉是没有捷径，而捷径恰恰就是那个错误，但这只是直觉。
