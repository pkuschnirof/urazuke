# Urazuke — 协作开发：多名开发者，每人带着自己的代理，在同一个分支上

作者：Pablo Kuschniroff，由 Claude Code 辅助。第 1 版，2026 年 10 月 19 日。本文档是[主文档
](ESCALERA_METODOLOGICA.md)的补充：它说明当场上不是一个人带一个代理、而是多名开发者各带各的
代理、在同一个仓库和同一个分支上工作时，方法怎么用。陌生的词在主文档的术语表里。公开仓库：
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 把问题直说出来

方法是用单数写的：所有者、代理、待办项。我那三个系统就是这样建起来的，一个人和一个模型。但一
个采用方法的团队没有一个人：它有三个，或者五个，每人都在同一份代码上开着自己的代理会话，而且
在大多数小团队里，是在**同一个分支**上，因为长寿分支的森林是最稳妥地让两周的工作在某个星期五
吵着架合并进来的办法。在一个共享分支上工作是可以做好的，业界多年来就靠一些众所周知的规则在这
么做（小提交、每天集成好几次、把持续集成当裁判、没做完的功能藏在一个开关后面）。方法带来的变
化是，这些规则不再由那些互相读代码的人来遵守了：由那些彼此看不见的代理来遵守，于是必须把它们
写在每个代理都会读到的地方。

下面是那些规则，然后是提示词。我不加台阶：二十四级还是那二十四级。我加的是每一级台阶为了让好
几个人同时登而需要的东西。

**如果你是初学者。** 一个*分支*是代码的一份副本，工作在上面做；*共享分支*（通常叫 *main* 或
*trunk*）是唯一重要的那一个，是会被部署的那一个。*集成*就是把你的改动放进那个分支；*冲突*是
两个人改了同一行而工具不知道哪个算数。一个*功能开关*是一个配置项，它让一个功能即便代码已经在
那里也处于关闭状态，好让没做完的东西也能集成进去而用户看不到。而*认领*一个待办项，就是在它上
面写下你的名字，好让别人不要再拿它。

## 共享分支的七条规则

1. **待办项是所有权的单位。** 没有人在 `docs/PENDING.md` 里没有一条以自己名义认领的待办项的
   情况下工作，而一个待办项同一时间只有一个所有者。两个人不同时拿两个触及同一个模块的待办项；
   如果实在避不开，就互相打招呼，第二个人等第一个人集成完。代理在开始会话时会读别人认领的待办
   项，并且不碰它们。
2. **小步集成，频繁集成。** 一个待办项要拆成一天之内往共享分支集成好几次的改动，绝不留到周
   末。每次集成之前：把别人的东西拉下来，跑整套测试，然后才上传。一个一天之内集成不了的改动，
   是一个切得不好的待办项：重新切。
3. **持续集成是裁判，人不是。** 没有人在链条为红时集成，也没有人争论一个改动"坏没坏"：由测试
   套件、质量闸门（9）说了算，如果是遗留系统还有表征测试。谁把共享分支弄红了，谁就先于任何其
   他事情把它修好，或者撤回自己的改动。
4. **没做完的东西放在一个开关后面。** 一个要花不止一天的功能照样集成进去，通过配置关着，它的
   开关记在待办项里，等待办项带着证据关闭时再打开。这样就没有人要等谁才能集成。
5. **列表只有一个所有者，而地图说出是哪一个。** 生产者-消费者地图（11）是团队的冲突探测器：
   在动一个部分之间的契约之前，先看谁在消费它，而那些消费者要在同一次改动中更新，哪怕它们是
   别人的。语义树（2）是共享的地图，谁加了一个节点谁就在同一次提交里改它。
6. **决策写下来并署名，而且对所有人有效。** 一条由某个开发者和所有者一起决定的业务规则，当场
   就进 `docs/DECISIONS.md`，因为旁边那位的代理当天下午就会需要它，而且它猜不出来。协作契约
   （1）整个团队只有一份；没有人有别人读不到的私人规则。
7. **审查的是证据，不是代码，而且由另一个人审查。** 一个待办项由它的所有者用完整的例行关闭
   （8、9、10、12），再由团队里的另一个人读报告来认定它已经关闭：红、绿、回归、质量、人工用
   例。没有人关闭自己的待办项，也没有人为了关闭它们去读代码。

还有一条关于代理的规则，它才是相对一个没有模型的团队真正改变的东西：**每个代理以一个人的名义
工作**，带着它自己的会话上下文，而它们唯一共享的就是写在仓库里的东西。文件之外没有共同的记
忆。正因如此，活状态（`docs/STATUS.md`）、待办项和决策都要当场写，而不是"到一天结束时"写：同
事的代理五分钟之后就要读它们。

## 台阶在一个团队里怎么分配

| 台阶 | 谁来登 | 在团队里有什么变化 |
|---|---|---|
| 0 到 4，启动 | 只有一个人，那个带头的，和所有者一起。 | 做一次，而且在其余的人进来之前做完。骨架（4）包含那条将要当裁判的集成链，而闸门（`docs/GATES.md`）包含共享分支的那些闸门。 |
| 1，契约 | 带头的写；所有人签。 | 把上面那七条规则作为例行加进去。整个团队一个文件。 |
| 5，待办项 | 带头的和所有者一起开功能块；每个人各自认领。 | 待办项带一个"认领人"字段和一个"触及的模块"字段。两个触及同一模块的待办项不同时被认领。 |
| 6，决策 | 需要它的那个人，和所有者一起。 | 当场写，不是到一天结束时写。 |
| 7 到 12，循环 | 每个人，带着自己的代理，在自己的待办项上。 | 集成之前：拉下来、全部跑一遍、上传。没做完的东西放在开关后面。报告（12）由另一个人读。 |
| 9，质量 | 所有人共用一份配置。 | 没有人有自己私人的 linter 例外。 |
| 10，人工测试用例 | 由待办项的所有者写；由另一个人执行。 | 没有构建这个功能的那个人，才是最会测它的人。 |
| 11，对称性 | 谁动了一个契约，谁就去更新那些消费者，不管它们是谁的。 | 地图就是冲突探测器。 |
| 13，审计 | 一个和所有构建过的会话都不同的会话。 | 在团队里反而更容易：审计者就是那个没碰过那个模块的人。 |
| 14 到 20，上线 | 带头的协调；每级台阶有一个负责人。 | 由一个人提升到生产；其他人不做。 |
| 21 到 23，运维 | 每个周期有一个监控负责人，轮流当。 | 周期报告由整个团队读；从里面出来的待办项和其他任何待办项一样被认领。 |

## 提示词

**发送提示词之前**，下面这些必须已经存在，而且是你（或者团队带头的人）来做，不是代理：

- `docs/WORKING_AGREEMENT.md`（第 1 级台阶），已定稿，整个团队只有一份，含成员名单和他们在仓
  库里的用户名。
- `docs/PENDING.md`（第 5 级台阶），每个待办项都有"认领人"和"触及的模块"字段，哪怕它们是空的。
- 团队关于功能开关的决定：它在哪里声明（服务器的配置、一个文件）以及怎么命名，写在 `PROJECT.md`
  里。
- 集成链（第 4 和第 15 级台阶），把测试套件和质量闸门（9）作为合并进共享分支的条件，在仓库平
  台上配置好（任何人都不能在链条为红时上传）。
- 最低可接受状态：有一份唯一的契约，待办项有那两个字段，而且平台会拒绝链条为红时的 push。

**共享分支的例行（放进协作契约）：**

> We work as a team on one shared branch, each person with their own agent session, and the only
> shared memory is what is written in the repository. Rules: (1) At the start of every session,
> read `docs/STATUS.md`, `docs/DECISIONS.md` and `docs/PENDING.md`; never touch a pending item
> claimed by someone else, and never take one that touches a module another claimed item touches.
> (2) Before every integration into the shared branch: pull the others' changes, run the full
> suite and the quality gate, and only then push; integrate several times a day, never at the end
> of the week. (3) Never push with the pipeline red; whoever turns it red fixes it before anything
> else or reverts. (4) Anything that cannot be finished and integrated today goes behind a feature
> switch, off by default, noted in the pending item. (5) Before touching a contract between parts
> (a service, a table, a list of values), look up its consumers in `docs/PRODUCER_CONSUMER_MAP.md`
> and update them in the same change, whoever owns them. (6) Every business decision goes to
> `docs/DECISIONS.md` the moment it is taken, with the person's name and the date. (7) Update
> `docs/STATUS.md` with what you are doing when you start and when you stop, so that the others'
> agents see it. Reply in my language.

> [zh]
> 我们是一个团队，在一个共享分支上工作，每个人有自己的代理会话，而唯一共享的记忆是写在仓库里
> 的东西。规则：(1) 每次会话开始时，读 `docs/STATUS.md`、`docs/DECISIONS.md` 和
> `docs/PENDING.md`；绝不碰别人认领的待办项，也绝不去拿一个触及了别人已认领待办项所触及模块
> 的待办项。(2) 每次往共享分支集成之前：拉下别人的改动，跑完整的测试套件和质量闸门，然后才
> push；一天集成好几次，绝不留到周末。(3) 绝不在流水线为红时 push；谁把它弄红了，谁就先于任
> 何其他事情把它修好，或者撤回。(4) 今天完成不了也集成不了的东西，放在一个功能开关后面，默认
> 关闭，并记在待办项里。(5) 在动一个部分之间的契约（一个服务、一张表、一份取值列表）之前，先
> 在 `docs/PRODUCER_CONSUMER_MAP.md` 里查它的消费者，并在同一次改动中更新它们，不管它们属于
> 谁。(6) 每一条业务决策在作出的那一刻就进 `docs/DECISIONS.md`，带那个人的名字和日期。(7) 开
> 始和停下时都用你正在做的事更新 `docs/STATUS.md`，好让别人的代理看得见。用我的语言回答。

我在要求什么：那七条规则变成代理的例行，因为代理看不见其他代理，它只会遵守它读到的东西；会话
开始时的必读，那是取代走廊闲聊的东西；以测试套件为条件的小步频繁集成；给没做完的东西准备的开
关；作为冲突探测器的地图；以及当场写下的活状态。

**认领一个待办项时：**

**发送提示词之前**，你手边必须有这些：

- 你想拿的那个待办项，由你自己从待办队列里挑出来，再看一眼别人认领的那些：有没有哪个触及同一
  个模块？
- 你在仓库里的用户名，它将留在"认领人"字段里。
- 最低可接受状态：你知道你的待办项触及哪些模块，而且没有人认领了那些模块。

> I am taking pending item [PND-NNN]. Before anything: list the pending items claimed by others
> and tell me whether any of them touches the same modules as mine, by the "modules it touches"
> field and by the producer-consumer map; if there is an overlap, stop and tell me, do not start.
> If there is none, write my name in the "claimed by" field with today's date, write in
> `docs/STATUS.md` what I am starting, re-read the item's specification, and tell me which
> contracts of the map this item will touch and who consumes them. Reply in my language.

> [zh]
> 我拿下待办项 [PND-NNN]。首先：列出别人认领的待办项，并按"触及的模块"字段和生产者-消费者地
> 图告诉我，它们里面有没有哪个触及了和我的一样的模块；如果有重叠，停下来告诉我，不要开始。如
> 果没有，在"认领人"字段里写上我的名字和今天的日期，在 `docs/STATUS.md` 里写下我开始了什么，
> 重读这个待办项的规格，并告诉我这个待办项将要触及地图里的哪些契约、以及谁在消费它们。用我的
> 语言回答。

我在要求什么：开始之前的重叠检查，那是避免一次冲突最便宜的时刻；写下来的认领；以及我将要触及
的消费者清单，好让我从一开始就知道我在给谁改东西。

**集成时：**

**发送提示词之前**，你手边必须有这些：

- 那个待办项，收尾例行已经做完；或者，如果它还没做完，开关已经记下来。
- 确认共享分支此刻是绿的（如果它是红的，先把那个修好，不管它是谁的）。
- 最低可接受状态：你知道自己集成的是一个做完的东西，还是一个藏在开关后面没做完的东西。

> We are going to integrate into the shared branch. Pull the others' changes first and tell me
> what came in and whether anything touches my modules. Resolve conflicts, if any, by reading
> both sides and asking me when a business rule is involved; never by keeping mine. Run the full
> suite, the quality gate and, if this is an inherited system, the characterization suite, and
> show me the counts. If anything is red, stop: tell me what and whose change it comes from. If
> this item is not finished, confirm the feature switch is off by default and say so in the
> commit message. Then push, show me the pipeline green on the shared branch, and update
> `docs/STATUS.md` and the pending item. Reply in my language.

> [zh]
> 我们要往共享分支集成。先拉下别人的改动，并告诉我进来了什么、有没有什么触及了我的模块。如果
> 有冲突，读两边来解决它，遇到有业务规则牵涉其中时问我；绝不要靠留下我的那一边来解决。跑完整
> 的测试套件、质量闸门，如果这是一个继承来的系统还要跑表征测试套件，并把数字给我看。如果有什
> 么是红的，停下来：告诉我是什么，以及它来自谁的哪个改动。如果这个待办项还没做完，确认那个功
> 能开关默认是关闭的，并在提交信息里写明。然后 push，给我看共享分支上流水线是绿的，并更新
> `docs/STATUS.md` 和那个待办项。用我的语言回答。

我在要求什么：先拉再上传；靠读两边来解决冲突，而不是靠"赢"（模型面对冲突的反射是留下自己那
个版本）；以测试套件为条件；以共享分支上的链条变绿作为证据，而不是代理机器上的；以及保持最新
的活状态。

## 完整性检验（由带头的人来做，不读代码）

- 挑这周关闭的三个待办项：关闭它们的是不是它们所有者之外的另一个人，而且是靠读报告？
- 一天往共享分支集成了几次？把历史要过来；如果是一周一次，规则 2 没有被遵守。
- 这周有过冲突吗？它是怎么解决的，有没有因此产生一条地图的待办项？
- 共享分支上有没有哪个没做完的功能没有开关？
- `docs/STATUS.md` 有没有说出今天每个人在做什么？

## 警报信号

- 每个开发者都有自己的协作契约，"因为他的工作方式不一样"。那些代理会在同一份代码上遵守不同的
  规则。
- 集成全攒到星期五。那是分支的森林，只是没有分支。
- 有人为了批准同事的待办项去读他的代码。方法退化成了代码评审，而那恰恰是模型做得比证据更差的
  事。
- 一个冲突靠"留下更新的那个版本"解决了。一条业务规则在没有任何人做决定的情况下丢了。
- 某个人的代理关闭了另一个人认领的待办项。会话开始时的必读不在契约里，或者契约没人读。

## 尚待展开的 `[假设]`

1. 这些规则来自业界关于共享分支的已知实践，以及方法所要求的东西；我没有用一个多代理同时工作
   的团队试过它们。第一个使用它们的团队会修正它们，而复盘（23）必须问：发生了多少次冲突，其
   中有多少本来可以靠地图避免。
2. 我不知道一个共享分支在方法之下能撑住多少人，超过之后就需要另一种工作方式。我的直觉是比没
   有方法时撑得住的人更多，因为带规格的待办项和地图去掉了一半的冲突来源。
3. 在 Forge 里，原生的待办项登记册和知识图谱会自己做认领和重叠检测；在其他工具里要靠待办项的
   那些字段手工做。我还没有试过这在实践中差别有多大。
