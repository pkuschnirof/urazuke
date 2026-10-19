# 步骤 19 — 量级下的性能测试与断裂点（台阶契约）

**阶段：** 上线生产。
**时机：** 在上线生产阶段，第 16 级之后（没有可观测性就不知道是什么坏了）和第 17 级之后（跑在
已经优化过的持久化之上），并且在第一次部署到生产之前。在每次会改变架构、持久化或某条关键流程的
部署之前重复，以及当容量估算变了（卖给了另一个客户、量级翻倍）时重复。在遗留系统里，用 N6 测出
来的量级跑，在规范化之后的第一次部署之前。
**形式：** 一次长发送；代理加载、测量并把它压垮；你读数字和断裂点。
**规模：** 按比例：在小项目里，一次预期量级的运行和一次"乘以十"的运行；在有后果的项目里，完
整，找到断裂点并把阈值记下来给监控用。

## 用途

第 3 级台阶用算式做了容量估算；这级台阶用真正跑着的系统来核对那些算式。在第一个用户进来之前，
我想知道三件事：系统在业务说的那个量级下表现如何（最常用的那个界面，响应时间是所有者能容忍的
吗？），在"乘以十"下表现如何（扛得住吗，还是什么会先扛不住？），以及**它在哪里断裂**：某样东西
屈服时的确切负载，以及那样东西是什么（数据库连接、内存、一个队列、一个锁）。断裂点是整个阶段里
最有用的数字，因为第 21 级台阶的告警阈值就是从它来的：一个"拍脑袋"定的告警不是报晚了就是一直在
报；一个定在测出来的断裂点之下、带一点余量的告警，在还来得及的时候报。我从一个生产系统里提取的
伸缩模式 [Ref. 12](../REFERENCIAS.md#ref-12)，以及那个因内存而死、看起来像测试失败的测试套件
[Ref. 44](../REFERENCIAS.md#ref-44)，是两个前身：第一个，关于测量真实负载；第二个，关于一个没有及
时找到的断裂点会伪装成别的东西。

**如果你是初学者。** 一次*负载测试*是一个模拟很多用户同时使用系统的程序，用来看看会发生什么。*
吞吐量*是每秒能扛多少个动作。*延迟*是一个动作要多久才响应；要看*中位数*（一半的动作比这个快）
和*95 百分位*（95% 比这个快；剩下的 5% 就是会来抱怨的那些用户）。*断裂点*是某样东西不再工作时
的负载量：不是"变慢了"，而是"数据库连接耗尽了"或者"内存满了"。而一个*阈值*是一个数字界限，超过
它监控就报警。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 容量估算（第 3 级台阶或 N6）：预期量级和"乘以十"。
- 可观测性（16）已打开，用来看是什么坏了。
- 已优化的持久化（17）连同它的预算。
- 一个资源上和生产相像的测试环境，或者清楚它在哪里不一样。
- 关键流程（语义树里的那些，或遗留系统里表征测试覆盖的那些）。

## 2. 提示词

**初始（加载、测量、压垮）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/SIZING.md`，带预期量级（峰值并发用户、每小时事件数、每张表行数）和"乘以十"：它们是两级
  负载台阶。
- 填进提示词空位的关键流程清单，由你根据语义树写出来：用得最多的那些和有后果的那些。三到六条。
- 一个资源可与生产相比的测试环境，或者，如果做不到，在 `docs/ENVIRONMENTS_SURVEY.md` 里记下它
  在哪里不一样（内存只有一半、另一个引擎），好让那些数字带着这个修正来读。
- 测试环境里预期量级的数据（和第 17 级台阶同一个脚本）。
- 你和所有者一起定的容忍度：最常用的那个界面要多久业务才认为可以接受（两秒、五秒）。没有那个数
  字，结果无法判断。
- 最低可接受状态：你知道两级负载台阶、关键流程和容忍度。

> We are going to find out how this system behaves at the volumes of `docs/SIZING.md`, and where
> it breaks. In the test environment, with the observability of step 16 on and the data loaded at
> the expected volume: (1) write a load script that lives in the repository and drives the
> critical flows [list] from the screen or the API as users would, with a configurable number of
> concurrent users and duration, and with a test that proves the script really exercises each
> flow (the backend effect appears); (2) run it at the expected volume and show me, per flow:
> throughput, median and 95th percentile latency, error rate, and the resource usage of the
> server and the database during the run; (3) run it at ten times the expected volume and show me
> the same; (4) raise the load step by step until something breaks, and tell me exactly what
> broke first (database connections, memory, a queue, a lock, the disk) and at which load: that
> is the breaking point; (5) compare every number with the budgets of `docs/PERSISTENCE.md`, with
> the tolerance I gave you ([tolerance] for the most used screen) and with the sizing assumptions,
> and tell me which assumption was wrong, if any. Do not optimize anything yet. Write
> `docs/PERFORMANCE_[date].md` with the numbers, the commands, the breaking point and your
> diagnosis of the first bottleneck. Reply in my language.

> [zh]
> 我们要搞清楚这个系统在 `docs/SIZING.md` 的量级下表现如何，以及它在哪里断裂。在测试环境
> 里，打开第 16 级台阶的可观测性，装载好预期量级的数据：(1) 写一个住在仓库里的负载脚本，
> 像用户那样从界面或 API 驱动关键流程 [清单]，并发用户数和持续时间可配置，还要有一个测试
> 证明这个脚本确实在演练每条流程（后端的效果出现了）；(2) 在预期量级上跑它，按流程给我
> 看：吞吐量、中位数延迟和 95 百分位延迟、错误率，以及运行期间服务器和数据库的资源使用；
> (3) 在预期量级的十倍上跑它，给我看同样的东西；(4) 一级一级地把负载加上去，直到有什么坏
> 掉，并准确告诉我最先坏的是什么（数据库连接、内存、一个队列、一个锁、磁盘）以及在什么负
> 载下：那就是断裂点；(5) 把每个数字和 `docs/PERSISTENCE.md` 的预算、和我给你的容忍度
> （最常用界面 [容忍度]）、和容量估算的假设做比较，并告诉我哪个假设错了，如果有的话。先
> 不要优化任何东西。写出 `docs/PERFORMANCE_[日期].md`，带上数字、命令、断裂点和你对第一
> 个瓶颈的诊断。用我的语言回复。

我在要求什么：一个也是量具的负载脚本（它住在仓库里而且有测试，因为一个不演练流程的负载脚本测的
是空气）；三次运行（预期、乘以十、直到压垮）；带命令的数字；和预算、业务容忍度以及容量估算假设
的对照，那正是发现第 3 级台阶在某件事上搞错了的地方；以及**先什么都不要优化**，因为不读诊断就
优化，改的是不该改的东西。

**收尾（阈值与待办项）：**

**发送提示词之前**，你手边必须有这些：

- `docs/PERFORMANCE_[日期].md`，由你读过，业务容忍度放在旁边：最常用的界面在预期量级下进得了容
  忍范围吗？"乘以十"呢？
- 和所有者一起，关于"乘以十"的决定：如果业务打算成长，"乘以十"之下的瓶颈现在就是待办项；如果不
  打算，它们可以等，带日期。
- 最低可接受状态：你读了断裂点，并决定了哪些瓶颈现在修。

> Record in `docs/PERFORMANCE.md`: the expected volume, the ten-times volume, the breaking point
> with what breaks, and the alert thresholds that monitoring (step 21) will use, set below the
> breaking point with a margin and above the expected volume. Open a pending item for each
> bottleneck that sits below [ten times the expected volume / the volume I decided], with the
> measured number as its acceptance criterion. Make the load test a gate in `docs/GATES.md`: it
> reruns before every deployment that changes the architecture, the persistence or a critical
> flow, and its results are archived with date and version. Show me the first run archived.

> [zh]
> 把这些记进 `docs/PERFORMANCE.md`：预期量级、十倍量级、断裂点连同是什么断了，以及监控
> （第 21 级台阶）将要用的告警阈值，定在断裂点之下留一点余量、并在预期量级之上。为每个落
> 在 [预期量级的十倍 / 我决定的量级] 之下的瓶颈开一个待办项，以测出来的数字作为验收标
> 准。把负载测试做成 `docs/GATES.md` 里的一道闸门：在每次会改变架构、持久化或某条关键流
> 程的部署之前重跑，而且它的结果带日期和版本归档。给我看归档的第一次运行。

我在要求什么：从断裂点推导出来的告警阈值，那是和第 21 级台阶的挂钩；瓶颈作为以数字为准则的待办
项（这样它们是带着证据关闭的，而不是"现在跑得好多了"）；以及作为归档闸门的负载测试，好让六个月
之后还能比较。

## 3. 预期结果

- 仓库里的负载脚本，带测试。
- `docs/PERFORMANCE_[日期].md`，带三次运行、数字、断裂点和诊断；`docs/PERFORMANCE.md`，带阈值
  和闸门。
- 每个瓶颈一个待办项，在所决定的量级之下。
- 负载测试作为那些需要它的部署之前的闸门。

## 4. 完整性检验

- 最常用的那个界面，在预期量级下，比所有者的容忍度快吗？如果不是，有没有一个带着那个数字开着的
  待办项？
- 断裂点说了是什么坏了、在什么负载下，还是说了"系统变慢了"？
- `docs/PERFORMANCE.md` 的阈值在断裂点之下、预期量级之上吗？
- 你自己用它给你的命令在预期量级上跑一遍脚本：数字相像吗？
- 测试环境在资源上和生产不一样吗，而且记下了怎么不一样？

## 5. 警报信号

- "乘以十也毫无压力扛得住"，却没有断裂点。如果它没找到在哪里断，就是负载加得不够。
- 在一个由界面承载负载的系统里，负载脚本打的是 API 而不经过界面。它测的是别的东西。
- 结果来自代理那台机器上的一次运行，不是来自测试环境。
- 在测试过程中"顺手"修了瓶颈。现在你不知道哪个数字对应哪个版本。
