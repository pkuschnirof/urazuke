# Urazuke — 课程。附实践任务的手册，逐级台阶，直到应用上线生产

作者：Pablo Kuschniroff，由 Claude Code 辅助。第 2 版，2026 年 10 月 18 日。这是 Urazuke 项目
的一份工作文档：我会和第一期使用它的学员一起修正它。它用日常的语言写成，每个缩写或陌生的表达
都在主文档（`ESCALERA_METODOLOGICA.md`）的术语表里。当我引用一个真实案例时，我用一个 `[Ref. N]`
标记，它指向[参考资料文档](REFERENCIAS.md)；手册保持干净，细节一点即达。方法的公开仓库是
[github.com/pkuschnirof/urazuke](https://github.com/pkuschnirof/urazuke)。

## 开始之前

### 这门课是给谁的

给那些想用人工智能构建软件、**并且希望这个软件被真正使用**——被真实的人、使用好几个月——的
人。这不是一门编程课：你不会学到一门语言或一个框架。也不是一门"提示词"课：你不会学到让模型写
得更好的小技巧。这是一门**方法**课：做什么、按什么顺序、在每个时刻向模型要什么、它必须交给你
什么，以及如何——不读代码——知道它交付的东西是完整的。

如果你是下面这些人之一，这门课对你有用：

- 你有一家公司、一个诊所、一家小咨询公司，想要自己的系统，又不想雇一个开发团队。
- 你是自动化顾问或自由职业者，客户向你要的"不只是一个机器人"。
- 你会编程，但想让模型干重活，自己只留下决策。
- 你已经"vibecoding"出过某个东西，跑了两周，到第三个月就崩了。

如果你要的是周五演示用的原型，这门课对你没用。那有更快的工具，而这个方法会让你觉得慢。这个
方法是给演示之后还得继续运转的东西准备的。

### 结束时你会拥有什么

一个属于你的应用，在生产环境中运行，并且带有：在通过之前曾被看到失败的测试；所有流程的端到端
测试；可复现的部署和回滚；仓库之外的配置和密钥；写有日期的业务决策；系统的语义树，以及每一样
被构建之物的详细规格，都在它的待办项里；对一切收费、发送或删除的东西上的锁；三份一个人无需 AI
就能照着做的手册；一次由与构建者不同的代理完成的审计；以及一份带数字的复盘。这就是我在这里所
说的"生产级"：不是它能运行，而是它**能被维持**。

而且你还会得到另一样东西，那才是你真正带走的：不拿到证据就不信模型的反射，以及确切知道在每
一步该向它要什么证据。

### 你需要什么

1. **一个用来编程的 AI 工具。** 任何一个能在你的仓库里读写文件并执行命令的都行：Claude Code、
   Cursor、Codex CLI、Gemini CLI、Forge。方法不依赖于用哪一个；主文档有一张表，说明每个产出物
   在每种工具里放在哪儿。在这本手册里我说"代理"，指的就是你用的那个。
2. **一个 GitHub 账号**（或等价物），以及关于什么是仓库、提交和 push 的最起码的概念。如果你没
   有，开始之前花一个下午；任何入门教程都够。不需要更多。
3. **一个项目。** 最理想的是你自己的：一个你需要的或者客户向你要的系统，有会使用它的用户。如
   果你没有，就用我在下面描述的**引导项目**；它被设计成能走完十六级台阶而不跳过任何一级。
4. **时间。** 课程有十六节课，每级台阶一节，还有一张日历告诉你每件事落在哪一周（见"课程日
   历"）。一个小项目，从头到尾，是六到八周的兼职工作。
5. **一个有时间做决定的领域所有者。** 如果项目是你的，那就是你。如果是客户的，那就是客户，而
   且他得知道整个项目期间他都要回答问题。这一点不可协商：没有做决定的所有者，模型就会做决定，
   方法在那一刻就坏了。

### 怎么上课

每节课都是同一个结构：

- **你需要理解什么**：概念，像给一个人解释那样解释。
- **任务**：一步一步，附上你要给代理的确切提示词（英文，因为模型用英文遵循指令更精确；每条都
  附有翻译，下面还解释了你在要求它什么），以及拿到它返回的东西后该做什么。每条提示词之前都
  有一个写着**"发送提示词之前"**的方框：那是你必须用自己的手做好、然后才能粘贴提示词的文件和
  输入。不要跳过它：提示词会点名那些文件，而如果它们不存在或者是空的，代理要么把它们编出来，
  要么回过头来向你要。
- **完整性检验**：关于代理交付的东西，你要问自己的问题清单，不打开代码。如果有任何一个答案是
  "否"，这节课就没完成。
- **交付物**：最后必须存在的文件或证据。
- **常见错误**：几乎每个人第一次都会碰到的事。
- **在引导项目中**：这节课应用到示例项目上是什么样子。

整门课只有一条规则：**完整性检验有一项是"否"时，不要前进到下一级台阶**。"以后再修"的诱惑恰
恰是方法存在的目的所要避免的。如果一级台阶没登完整，下一级就建在沙子上。

### 课程日历：每件事什么时候做

主文档的 B 部分有方法完整的时间线。这里我把它翻译成课程日历，针对像引导项目这样的小项目。周
数是参考性的；不是参考性的是顺序，尤其是，课与课之间发生什么。

| 周 | 课 | 除了课之外你要做什么 |
|---|---|---|
| 0（两三天） | 无 | **需求摄入**：你采访所有者，用散文写下他想要什么、给谁用、今天的情况是什么、什么有后果、哪些数字只有他知道。你说出能说出的用例（"前台登记一个预约"），哪怕手画也把主要界面画出来，并列出业务实体及其状态。刻意留着不完整。 |
| 1 | 0、1、2、3、4 | **启动，一口气做完。** 适格性、契约、带语义树的定义、容量估算，以及带着**全部基础设施和 CI/CD 链**的骨架：仓库、测试环境、持续集成、第一次空部署。结束时，你打开 URL，看到空白的界面。 |
| 2 | 5、6、7 | **第一个功能块**（基本日程表）。你把请求转换成有规格的待办项来打开功能块。对每个待办项：决策、先证红的测试、流程的端到端测试、你亲自看的界面截图。功能块结束时：完整的端到端测试套件，而且你在测试环境里按功能块的流程使用系统。 |
| 3 | 8、9、10 | **第二个功能块**（患者与搜索）。循环的其余三节课在这个功能块上学。同样的收尾：所有流程的端到端、人工测试、带新界面的用户手册。 |
| 4 | 11、12 | **上线生产，前半段。** 由另一个会话做审计。锁。然后才是**第三个功能块**（提醒和定金），用完整的循环构建，留在演练模式。 |
| 5 | 13、14 | **上线生产，后半段。** 收尾通往生产的链条，回滚经过测试。三份手册；一个不编程的人照着恢复手册做。你或所有者对所有流程做**验收测试**。第一次没有用户的生产部署。 |
| 6 | 15 | **运维。** 看过演练记录之后启用提醒。驻留代理。带数字的复盘和对梯子的修改提案。 |

如果你的项目更大，拉长的是第 2 和第 3 周（更多功能块），不是第 1 周，也不是第 4 和第 5 周。
而如果某个时刻你发现自己在第 3 周做基础设施，或者在第 5 周第一次跑端到端测试套件，回到日历：
有东西被跳过了。

### 引导项目："Turnera"

如果你没有自己的项目，用这个。它很小，但拥有让十六级台阶里没有一级是假的所需要的一切：真实
用户、个人数据、发向外界的消息，还有钱。

**业务。** 一家诊所（也可以是一家事务所、一家理发店、一家修理铺：任何给人安排预约的地方）。今
天预约记在一个本子上，靠手工用 WhatsApp 确认。预约会丢，因为人们忘了；会有重复预约，因为两个
人记在了不同的本子上；没人知道上个月取消了多少预约。

**他们想要什么。** 一个网页日程表，两名前台和三名专业人员都能看到预约；提前 24 小时通过
WhatsApp 或邮件自动发提醒；对某些预约可以通过支付链接收取定金；以及月底的几个数字（多少预
约、多少缺席、多少定金）。

**所有者。** 诊所负责人。她对业务有判断力（知道哪些预约要收定金、提前多久可以取消、对一个爽
约三次的患者说什么），而且每天有十五分钟回答问题。她不编程，也不会读代码。

**只有她知道的数字。** 每天大约四十个预约，一年二百五十天。每个预约大约三条消息（确认、提
醒，有时改期）。患者数据保存五年。高峰是周一早上，两名前台同时录入。还有一个她答不上来但很重
要的问题：如果这玩意儿好用，他们会卖给其他诊所吗？（答案会让容量估算乘以十。）

**有后果的东西。** 发送一条提醒（发两次，惹人烦；发到错误的号码，是隐私问题）。收取定金
（钱）。取消一个预约（对失去它的患者来说不可逆）。删除一个患者（个人数据）。

**负责人说出的用例**，照她的原话："我登记一个预约"、"我找一个患者"、"我取消一个预约"、"患者
收到提醒"、"我向他要定金"、"我看这个月有多少预约"。一共六个；它们将是端到端的流程。

有这些就够开始了。其余的一切都由代理来问，而让它来问正是练习的一部分。

---

## 启动阶段：第 0 到 4 课

这五节课每个项目做一次，在第 1 周，写功能之前。它们是最让人想跳过的（"我想看到点能跑的东
西"），也是跳过代价最高的。一口气做完，然后再打开循环。

### 第 0 课 — 这个项目能这样做吗？

**你需要理解什么。** 方法并不适用于任何项目，而在开始之前就知道这一点是第一个质量决策。有两
个条件，没有它们方法就不起作用：有一个标准仓库可以存放证据（X1），以及界面可以程序化操作、
从而能做从界面到后端的端到端测试（X2）。只要其中任何一个不满足，代理就无法自己验证自己，于
是最终是你去读代码，而那恰恰是方法承诺要避免的。这两条我都是从我拒绝过的项目里得出的
[Ref. 46](REFERENCIAS.md#ref-46)。此外还有加权准则（是否有一个有时间的所有者、错误是否有后
果、能否在独立环境里测试，等等），我还在校准。

对引导项目来说两个条件都满足：它是一个新项目（没有遗留），而且我们要用一个可程序化操作的网
页界面来构建它。对你自己的项目，这节课可能以"不可行"结束，而那是课程的一个有效结果。

**任务。**

**发送提示词之前**，用你自己的手（代理没法替你做这些）：

- `docs/INITIAL_SURVEY.md`：由你手工写，根据第 0 周的需求摄入：客户想要什么、给谁用、今天没
  有系统时是怎样的、现有或拟用什么技术、是否有旧系统以及它有没有仓库、界面能不能由程序操作、
  所有者是谁以及他有多少时间、一个错误有什么后果、将有哪些环境。半页。不完整没关系；事实上，
  不完整正是练习的一部分，而你不知道的就写成"我不知道"。
- `docs/ELIGIBILITY_CRITERIA.md`：把主文档里的准则卡片（排他性准则 X1、X2 和候选准则）复制过
  来，答案、来源和绿或红那几列留空。不要你自己填：填它的是代理。
- 项目文件夹，除了这两个文件之外还是空的，代理在里面打开。
- 每个文件的完整内容在第 0 级台阶的契约里，在同一个方框中。

1. 粘贴这条提示词：

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

> [zh]
> 我们要评估这个项目能否用 Urazuke 方法来做。读 `docs/INITIAL_SURVEY.md` 里的初始调研和
> `docs/ELIGIBILITY_CRITERIA.md` 里的准则卡片。首先，评估调研是否足以回答每一条准则。如果
> 有任何准则无法从调研中得到回答，在继续之前向我索要缺失的信息；不要假设。然后逐条填写卡
> 片：答案、它来自哪里，以及对每条排他性准则，它是绿色还是红色。不要做决定：把填好的卡片
> 连同你的解读和你的疑问呈给我，由我来决定。用我的语言回复。

   你在要求它读这两个文件，**评估调研是否足够，并在回答之前问清缺失的东西**（这个条款在课程
   的所有提示词里都会重复；它是方法的核心），填写卡片并说明每个答案来自哪里，以及不要做决
   定：决定是你的。

2. 回答它的问题。如果它一个都没问，就该怀疑，问它假设了什么。
3. 当它把卡片呈给你时，读一读，然后决定。

**发送提示词之前**（收尾提示词）：你的决定，一行话（可行、不可行，或有条件可行，每个条件都可
验证，而且不超过三个），以及你在这同一个会话里给它那些问题的回答，因为提示词要求它把这些包含
进去。

4. 粘贴收尾提示词：

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

> [zh]
> 决定：[可行 / 不可行 / 在这些条件下可行：……]。把最终卡片写到 `docs/ELIGIBILITY.md`，
> 附上日期、谁做的决定、每条准则的答案及其来源，以及条件（如果有）。把你问过的问题和我的
> 回答包含进去。

**完整性检验。** 打开 `docs/ELIGIBILITY.md` 并问自己：两条排他性准则是否有明确的答案和来源？
是否有哪条准则是用"可能"来回答的？（如果有，代理本该去问。）决定是否有日期和名字？条件（如
果有）能否验证？它问过的问题和你的回答在里面吗？

**交付物。** 一页的 `docs/ELIGIBILITY.md`。

**常见错误。** 把调研写得"完整"好让代理不提问：你错过了练习，更糟的是，你养成了替模型干活的
习惯。带着五个条件回答"可行"：那是伪装的"不可行"。还有最常见的：跳过这节课，因为"显然可
行"。显然的东西就是不会被写下来的东西，而不被写下来的东西就是之后会被争论的东西。

**在引导项目中。** 代理至少应该问：界面是网页还是移动端（因为 X2 取决于此），有没有旧系统哪
怕只是一个 Excel，以及要用什么消息渠道（WhatsApp 有邮件没有的要求）。卡片以"可行"结束，附一
个合理的条件：在第 12 级台阶之前确定消息渠道。

### 第 1 课 — 协作契约

**你需要理解什么。** 代理每次会话到来时都不记得上一次。它像每天早上来一个新同事。协作契约就
是你第一天对它说的、而它每天都会重读的东西：你怎么工作、你不能容忍什么、你给它多大的自主
权。没有契约，你每次会话都要重复同样的话，而且每次都略有不同。我第一次写它是在重复了两周之
后 [Ref. 1](REFERENCIAS.md#ref-1)。

六条最低规则背后各有一个故障："我的时间是神圣的"避免它每个细节都来问你；"零债务"避免"以后
再修"；"范围精确"避免它"顺便"给你加东西；"文档在同一次提交中"避免过时的手册；"绝不把未验证
的报告为已完成"避免那个不是真的"搞定"；"说我的语言"避免它因为提示词是英文就用英文回答你。

**任务。**

**发送提示词之前**，用你自己的手：

- 你的工作偏好，花五分钟想好并记在一张短清单上（写在一张纸上，或者写进
  `docs/MY_PREFERENCES.md`）：你希望它多问还是少问？用什么语言？你给它多大的自主权（能自己提
  交，能自己部署到测试环境，生产环境永远不行）？和别人一起工作时什么让你抓狂？它问的时候你要
  告诉它；这张清单是为了不临场发挥。
- 项目文件夹，代理在里面打开。没有别的了：这是项目的第一个文件。

1. 粘贴这条提示词：

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

> [zh]
> 在写任何代码之前，我们要确定你我之间的协作契约。写 `docs/WORKING_AGREEMENT.md`，至少包含
> 这些规则，每条附一行说明它避免什么：(1) 我的时间是神圣的：不要问我你自己能解决的事，而当
> 你问的时候，用散文问，带上你的建议。(2) 零技术债务：坏掉的东西从根上修，带上它的回归测
> 试，在同一次会话中。(3) 范围精确：不多不少，恰好是所要求的；如果你看到别的什么，记为待办
> 项，不要去做。(4) 文档在变更的同一次提交中更新。(5) 绝不把你没有验证过的东西报告为已完
> 成；始终把你验证过的和你相信的分开。(6) 说我的语言。加上你认为这个项目需要的规则，标为提
> 案。如果为了写这个你需要了解我怎么工作，问我。

   你在要求它写六条规则，每条附上它避免的故障；项目专属的规则标为提案，好让你接受或拒绝；
   以及让它问你关于你的事。

2. 回答它的问题。读它的提案：接受对你有用的，拒绝没用的，总是附一行理由。

**发送提示词之前**（收尾提示词）：你对代理每一条提案的裁决，写下来：你接受哪些 [X, Y]、拒绝
哪些 [Z]、为什么，每条一行。这些要填进提示词的空里，而填空的人是你。

3. 用这个收尾：

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

> [zh]
> 我接受规则 1 到 6 和你的提案 [X, Y]；我拒绝 [Z]，因为 [理由]。用今天的日期和一个版本号
> 定稿契约。然后在项目文件里加上每次会话开始时读这份契约的指令。

   如果还没有项目文件（你在第 2 课做它），它会创建一个只带这条指令的最小文件；没问题。

**完整性检验。** 六条规则都在吗，每条都附有它避免的故障？有没有哪条写成了愿望（"尽量……"）？
项目文件是否命令在每次会话开始时读它？它是否至少问了你一个关于你怎么工作的问题？

**交付物。** 带日期和版本的 `docs/WORKING_AGREEMENT.md`，挂接到项目文件。

**常见错误。** 因为听起来都不错而接受二十条规则：没人遵守二十条；六到八条才会被遵守。留下一
条说代理可以修改契约的规则：不行。还有最安静的一个：从不检验它是否在读。第 2 课你会看到怎么
检验。

**在引导项目中。** 代理通常会为 Turnera 提出的一条专属规则，值得接受："绝不从非生产环境向患
者发送真实消息；在测试环境里，消息进入一个假收件箱"。这是第 12 级台阶提前露了头。

### 第 2 课 — 项目定义、语义树与必读

**你需要理解什么。** 项目文件（`PROJECT.md`，或 `CLAUDE.md`，或你的工具用的名字）是代理每次
会话开始时读的地图。它必须**短**：系统是什么、给谁用、它**不是**什么、模块、带日期的已做决
策，以及读契约的命令。每天发生的事不放在那里：放到活状态（`docs/STATUS.md`）和待办项登记册
里。我的一个系统让这个文件涨到了九千多行；到了那个地步，没人读它，模型也不读
[Ref. 41](REFERENCIAS.md#ref-41)。

但地图还有第二块，而且是干活最多的那块：**语义树**。它是被分解成一棵树的系统：第一层是领
域，每个领域下面是它的参与者、它的流程（你在需求摄入里说出的用例，带参与者、触发条件、步
骤、结果和异常）、它的实体及其属性和状态、它的界面和它的外部集成。这就是需求工程里一直有的
领域模型，摆成树的形式好让模型读。每个节点下面将挂着触及它的待办项和决策。它的价值是双重
的：给代理它要触碰的节点的确切上下文，并给你一种不读代码就能验证代理理解的系统就是业务所要
求的系统的方式。如果树里有一个业务从没说过的状态，那是模型编的，而你会在它在上面构建之前看
到它。

"它不是什么"一节仍然是最重要的、也是所有人都留空的一节。没写下来的东西，就是模型遇到空洞时
会编出来的东西。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/INITIAL_SURVEY.md`，用你在第 0 课学到的东西（代理那些问题的答案）和业务调研补全：谁
  使用系统、它解决什么问题、一节"系统不该做什么"哪怕只有两项、所有者用他自己的话说出的用例、
  带状态的实体、界面草图哪怕只是纸上的照片、外部集成，以及已经做出的决策，附日期。如果你用了
  某种需求摄入方法（访谈、用例、用户故事、原型），说出是哪一种，并把结果贴进去。
- `docs/WORKING_AGREEMENT.md`，已定稿（第 1 课）。
- 如果有旧系统，对它的代码或文档的读访问权，记在调研里。

1. 粘贴：

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
> 我们要以书面形式定义项目。读 `docs/INITIAL_SURVEY.md` 里的业务调研和
> `docs/WORKING_AGREEMENT.md` 里的协作契约。评估调研是否足以描述系统、它的用户、它的领域和
> 它的边界；如果不够，在写任何东西之前向我索要缺失的部分。然后写两样东西。第一，
> `PROJECT.md`，最多三百行，包含：系统是什么、给谁用；它**不是**什么；主要模块列表；已做的
> 决策，每条附日期；以及在每次会话开始时读本文件和语义树的指令。第二，
> `docs/SEMANTIC_TREE.md`：系统作为一棵树，第一层是领域，每个领域下面是它的参与者、它的流程
> （用例，每个带参与者、触发条件、步骤、结果和异常）、它的实体及其属性、状态和转换、它的界
> 面，以及它的外部集成。把你推断出来而不是在调研里读到的每个节点都标出来，好让我确认或修
> 正。另外，创建 `docs/STATUS.md` 用于活状态（正在做什么、什么还开着）：那个文件每天都变；
> 另外两个只在系统变化时才变。用我的语言回复。

   你在要求它在起草之前先问，一个带"它不是什么"一节的短项目文件，结构完整、推断节点已标记的
   语义树，以及放在另一个文件里的活状态。

2. 通读整个 `PROJECT.md`。它必须能在五分钟内读完。修正不属实或不是你的东西。
3. 像客户一样走一遍语义树。看每个标为推断的节点，确认或修正。找缺失的参与者、业务不用的实
   体状态、你没要求的界面。

**发送提示词之前**（收尾提示词）：`PROJECT.md` 由你通读过，树由你一个节点一个节点走过、每个
推断节点都有一个裁决，以及写好的修正清单，要填进提示词的 [列表] 空里。如果第一次这份清单是空
的，该怀疑的是你的阅读。

4. 用这个收尾：

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

> [zh]
> 应用这些修正：[列表]。用今天的日期定稿 `PROJECT.md` 和 `docs/SEMANTIC_TREE.md`。在协作契
> 约里加两条规则：变更历史绝不进入 `PROJECT.md`（它去 `docs/STATUS.md` 或待办项登记册）；
> 每个待办项都必须挂在语义树的一个节点下，而且每当一个功能块添加或改变一个节点时，树在同一
> 次提交中更新。

5. **阅读测试。** 关闭代理的会话，打开一个新的。什么都不多说，问它："这个系统不该做什么？日
   程表界面挂在树的哪个节点下？"。如果它用 `PROJECT.md` 和树里说的内容回答你，挂接就起作用
   了。如果它回答了别的什么，它就没在读地图：检查你的工具是怎么加载项目文件的。

**完整性检验。** `PROJECT.md` 能五分钟读完吗？它说了系统**不**做什么吗？树里有你知道的所有参
与者吗，每个实体的状态是否恰好是业务用的那些，不多不少？你是否确认或修正了所有推断节点？每
条决策是否有日期和决策者？代理在起草前问了什么吗？活状态在另一个文件里吗？阅读测试通过了吗？

**交付物。** `PROJECT.md`（最多三百行）、节点已确认的 `docs/SEMANTIC_TREE.md`、
`docs/STATUS.md`，以及通过的阅读测试。

**常见错误。** 把你已有的全部规格粘进 `PROJECT.md`：它是纲领，不是规格。把"它不是什么"留
空。不走一遍树就接受它：模型推断状态和界面的自然程度令人害怕，而每个被编出来的节点都是没人
要求它就会去构建的功能。还有不做阅读测试：那是唯一能知道第 1 级和第 2 级台阶在起作用而不只
是存在的方式。

**在引导项目中。** Turnera 的"它不是什么"里至少应该有：它不是一个病历系统（不保存医疗数
据），它不是一个支付网关（它用某个供应商的支付链接，不处理银行卡），它不发营销消息（只发确认
和提醒）。树有一个"日程"领域，参与者是前台和专业人员，流程是"登记预约"、"取消预约"和"查找患
者"，实体是预约（状态为待确认、已确认、已取消、缺席）和患者，界面是"当天日程"和"患者档案"；
一个"消息"领域，流程是"发送提醒"，实体是消息，以及与 WhatsApp 供应商的集成；还有一个"支付"
领域，有"索要定金"和与支付供应商的集成。如果代理给预约加了一个"已改期"状态，问它从哪儿来
的：负责人没说过。也许需要，也许不需要；由你决定，不是它。

### 第 3 课 — 在架构之前先做容量估算

**你需要理解什么。** 有些决策，做错了要付出几周的代价：用什么数据库，对数据库的调用是同步还
是异步，多少人能同时使用系统。而它们全都依赖于**只有业务才有**的数字：每天多少预约、每个预约
多少条消息、保存多少年。模型无法推断这些数字；它能推断的是从中派生出来的东西（每年多少行、
五年后多大）。所以提示词要求它区分原始数据和派生数据，并且**索要缺失的原始数据而不是估计它
们**。当模型估计一个原始数据时，它的表情和它计算时一样笃定；你没办法从语气上区分。没有及时
做这件事让我付出了一整个重构阶段的代价 [Ref. 15](REFERENCIAS.md#ref-15)。

此外还有一类决策总是值得做：**非对称决策**，多余时便宜、缺少时昂贵得要命。典型的例子是从第
一天起就把与数据库的接口做成异步的，哪怕第一个数据库只是一个文件：如果你从不换数据库，多了
一个 `await`；如果你换了，你省下了重写一切。

**任务。**

**发送提示词之前**，用你自己的手，和所有者一起：

- `docs/VOLUME_SURVEY.md`：和所有者坐下来（如果项目是你的，就和你自己），写下主要实体（语义
  树里的那些）以及有多少、每月增加多少、每个实体多少事件、高峰时多少人操作以及高峰在什么时候、
  数据保存多久、有没有特殊负载、他们期望什么增长。对每个数字，写上它来自哪里："负责人说的"、
  "在九月的本子里数的"、"假设"。刻意留几个"假设"：你会看到代理怎么处理它们。
- `PROJECT.md` 和 `docs/SEMANTIC_TREE.md`，已定稿（第 2 课）。
- 如果有带数据库的旧系统，一个只读访问权，让代理取到真实数字，连接串放在仓库之外。

1. 粘贴：

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

> [zh]
> 在提出任何架构之前，我们要对系统做容量估算。读 `PROJECT.md` 和 `docs/VOLUME_SURVEY.md` 里
> 的容量调研。区分原始数据（只有业务知道的事实）和派生数据（可以从原始数据计算出来的东西）。
> 评估原始数据是否完整到足以计算接下来的内容；如果缺任何原始数字，或者它被标为假设，在继续
> 之前向我索要所有缺失的数字。绝不估计一个原始数字。如果可以查询旧系统，用它的真实数字并说
> 明每个数字来自哪里。原始数据齐全后，计算并展示算式：三张最大的表每年的行数、高峰并发、五
> 年后的数据大小，以及如果一切乘以十先坏的是什么。然后给出持久化和并发的三个选项，每个附上
> 之后迁移到其他选项的成本。不要选择：由我选。不要写代码。用我的语言回复。

   你在要求它：区分原始数据和派生数据；**向你索要缺失的或标为"假设"的原始数据，而且绝不估
   计它们**；算式可见地计算派生数据；"乘以十"的场景；三个选项附上互相切换的成本；以及不要
   做选择。

2. 如果它向你要"假设"的那些，很好：练习就是这个。弄到数字（问所有者，在本子里数），给它。如
   果它没向你要而是照样算了，停下来问它拿那些假设怎么办了：这是台阶的一次失败，最好现在就看
   见。
3. 读三个选项。手工重算一个算式（比如最大那张表每年的行数）：结果必须一样。做出选择。

**发送提示词之前**（收尾提示词）：假设已经变成带来源的数据，有一笔由你亲手重算、而且和代理算
的一致的账，以及选定的方案，附一行理由。

4. 用这个收尾：

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

> [zh]
> 我选择选项 [B]。记录到 `docs/SIZING.md`：原始数据及其来源，派生数据及其算式，三个选项，
> 选中的那个及理由，以及我们"以防万一"做出的、尽管今天还不需要的决策（例如：持久化接口从
> 第一行起就是异步的，即使第一个引擎是同步的）。把你问过的问题和我的回答包含进去。

**完整性检验。** 有没有哪个原始数据的来源是"假设"或没有来源？每个派生数据是否展示了算式，你
重算时结果一样吗？是否有三个选项以及一个附理由的选中项？它说了"乘以十"会怎样吗？非对称决策写
下来了吗？它问你了吗？

**交付物。** `docs/SIZING.md`。

**常见错误。** 用你自己编的数字补全调研好让代理不提问（和第 0 课是同一个错误，而在这里更糟，
因为这些数字决定架构）。以防万一选"最强"的选项：迁移成本放在表里恰恰是为了让你选能扛住"乘
以十"的最小那个。还有不把非对称决策写下来：没写下来，第 4 课代理就不会遵守它们。

**在引导项目中。** 原始数据：40 预约/天 × 250 天 = 10.000 预约/年；每个预约 3 条消息 = 30.000
消息/年；保存 5 年；高峰是两名前台同时操作。"乘以十"就是是否卖给其他诊所的问题：每年 100.000
个预约和 300.000 条消息。三个典型选项：一个 SQLite 文件（够一家诊所用好几年，多人写入时扛不
住乘以十）、从一开始就用 PostgreSQL（什么都扛得住，基础设施成本略高）、或者现在用 SQLite 加上
异步接口并预设向 PostgreSQL 的迁移（非对称的那个）。课程里我们选第三个：它教的东西最多。

### 第 4 课 — 带闸门的骨架

**你需要理解什么。** 在系统做任何有用的事之前，它必须能**空着**启动、测试和部署。看起来像浪
费时间（"部署什么？什么都没有"），其实恰恰相反：通往生产的路是产品的一部分，而知道它能用的唯
一方式是在还没有什么可失去的时候走一遍。在我的一个系统里，部署在启动一个月之后才到来，接连
付出了五个待办项的代价 [Ref. 32](REFERENCIAS.md#ref-32)；如果骨架第一周就部署了，那五次打击
会在空载时发生。

此外，这节课**是做项目全部基础设施和 CI/CD 链**的地方。到第 13 课之前你不会再碰它，而在这期
间你会在它上面构建全部功能。所以它占了第 1 周的大部分。

**闸门**是从一个阶段进入另一个阶段的条件（"测试套件是绿的"、"到测试环境的部署成功了"）。现在
就把它们写下来，哪怕看起来显而易见，是之后能不争论就说"这个过不去"的依据。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/ENVIRONMENTS_SURVEY.md`：系统要在哪里运行（你已有的一台服务器、一个云服务），会不会
  有一个测试环境和一个生产环境，谁有权访问什么，如果已经有东西今天是怎么部署的，以及项目的类
  型（全新、纠错还是演进）。如果你什么都没有，就这么说：代理会给你提出最简单的选项。提示词把
  它叫作 "the environments survey"，没有给路径：告诉它这个文件叫什么。
- 要部署的地方的凭证，哪怕是一个免费服务：已创建，由你亲自登进控制台试过，并保存在仓库之外；
  你告诉代理它们在哪里，不要把它们贴进聊天。没有它，骨架就留在你的机器上，这节课无法完成。
- `PROJECT.md` 和 `docs/SIZING.md`，已定稿（第 2 课和第 3 课）。

1. 粘贴：

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

> [zh]
> 我们要构建系统的骨架，完全没有功能。读 `PROJECT.md`、`docs/SIZING.md` 和环境调研。评估你
> 是否拥有让骨架在测试环境里运行所需的东西（访问权限、URL、部署方式）；如果缺什么，开始之前
> 问我。然后构建：文件夹结构；能启动的服务器和界面；带一个能通过的冒烟测试的测试结构；每次
> push 都运行该测试套件的持续集成；以及到测试环境的部署。在 `docs/GATES.md` 里声明工作流的
> 闸门（从一个阶段进入下一个阶段必须是绿的东西）。完成后，对运行在测试环境里的空界面截一张
> 图给我看。不要"顺便"加任何功能。用我的语言回复。

   你在要求它在开始之前核实访问权限，一个骨架到底是什么的确切清单，写下来的闸门，一张来自测
   试环境的真实截图，以及禁止添加功能。

2. 这个任务很长（代理一两个小时的工作），而且会有反复：缺凭证、某个服务要求确认邮箱，等等。
   这很正常。不正常的是它没给你测试环境的截图就说"搞定"。
3. 当它给你看截图时，你自己在浏览器里打开那个 URL。必须看到同样的东西。这是对系统的第一次人
   工查看，是一个里程碑。

**发送提示词之前**（收尾提示词）：你亲自访问过测试环境的 URL，由你打开过那条绿色的持续集成运
行链接，以及读过 `docs/GATES.md`，每道闸门都有一个可验证的条件。

4. 用这个收尾：

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

> [zh]
> 骨架通过。把测试环境的 URL、运行测试的命令和部署的命令记录到 `docs/STATUS.md`，并把这一
> 步标为完成。然后再运行一次部署，给我看第二次运行什么都没改变。

**完整性检验。** 你是否亲自打开了测试环境的 URL 并看到了空白界面？有没有一个指向绿色持续集成
运行的链接？部署是否运行了两次而第二次没弄坏任何东西？每个闸门是否都有一个可验证的条件？有
没有你没要求的功能？

**交付物。** 带骨架的仓库、绿色的持续集成、能用的测试环境 URL、`docs/GATES.md`，以及带三个命
令的 `docs/STATUS.md`。

**常见错误。** 接受"本地能跑，部署以后再看"：不行，部署就是骨架。接受一张来自代理机器而不是
测试环境的截图。还有让它"顺便"给你加一个登录页、一个菜单、一个 logo：每一样没有待办项就进来
的东西都是跑掉的范围。

**在引导项目中。** Turnera 的骨架是一个写着"Turnera — 版本 0.0.1"的网页，运行在一个测试环境
的公开 URL 上；一个在健康检查路由上回答"ok"的服务器；一个调用那个路由的冒烟测试；每次 push
都运行那个测试的持续集成；以及到测试环境的自动部署。闸门："测试套件绿色才能合并"、"测试环境
绿色才能提升到生产"、"回滚经过测试才能第一次部署到生产"。仅此而已。而看到那个空白页面出现在
一个真实 URL 上，竟然出奇地令人满足。

---

## 循环阶段：第 5 到 10 课

这六节课是你在整个项目期间**每次变更**都要用的。它们在第 2 和第 3 周、在前两个功能块上学，并
一直练到最后。目的是在阶段结束时你已经有了这个反射：把请求转换成有规格的待办项来打开一个功
能块，取一个，构建，先证红，运行流程的端到端测试，更新另一端，测量该测量的，报告时把已验证
的和相信的分开，记录已关闭的待办项，功能块结束时自己使用系统。这个反射就是方法。

要练习它们你需要真实的功能。在引导项目里，第一个功能块是基本日程表：看当天的预约，登记一个
预约，取消它。第二个是患者与搜索。暂时不做消息和支付；那在锁之后（第 12 课）。
### 第 5 课 — 计划就是待办项，而详细规格住在每一个待办项里

**你需要理解什么。** 没有一边的"计划"和另一边的"任务清单"：**待办项列表就是计划**。但还有两
个想法，它们把这个方法和任何一张任务清单区分开。

第一个：**详细规格住在每个待办项里**。在经典方法里有一份长长的需求规格文档，在写完之前就过
时了。这里它被分解：每个待办项带着它挂在哪个语义树节点下、引发它的用户故事或用例（用客户的
原话）、详细描述、适用的业务规则及其决策和日期、进出的数据、受影响的界面、边界情况、"给定、
当、那么"形式的验收标准，以及如何验证。读一个待办项的规格是你离读代码最近的距离，而那恰恰是
正确的距离：正是在那里，你在它构建之前发现代理理解成了别的东西。

第二个：**已关闭的待办项就是文档**。一个待办项关闭时，它保留着规格、引发它的决策、关闭它所凭
的证据、提交和日期。已关闭的待办项队列就是系统的功能历史，变更日志和手册的新章节都从那里出
来。还有给代理的黄金规则：列表之外出现的东西，记为新待办项，附上规格，不去做。

**任务。**

**发送提示词之前**，用你自己的手：

- 客户对第一个功能块的请求，写在 `docs/INITIAL_SURVEY.md` 里以功能块命名的标题下，或者写在单
  独一个文件里（比如 `docs/blocks/BLOCK_01_REQUEST.md`；提示词说的是 "the client's request
  for this block"，没有给路径，所以告诉它在哪儿），照客户的原话，带着它的模糊之处。对
  Turnera："我想看当天的预约，登记一个新的，还有取消"。如果你在需求摄入时写了用例，也粘进去：
  它们是功能块的自然单位。如果所有者给了你一个优先级，也写上。
- `docs/SEMANTIC_TREE.md`、`PROJECT.md` 和 `docs/STATUS.md`，保持最新（第 2 课）。

1. 粘贴：

> We are going to turn everything that must be done in this block into numbered pending items,
> each one carrying its full specification. Read `PROJECT.md`, `docs/SEMANTIC_TREE.md`, the
> client's request for this block, and whatever is in `docs/STATUS.md`. If the request is
> ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do
> not resolve it by assuming. Then create or extend `docs/PENDING.md` with one item per thing to
> do, each with: number (PND-001 onwards); one-line title; the node of the semantic tree it hangs
> from; the user story or use case that originates it, in the client's words; the detailed
> description; the business rules that apply, each with its decision and date, or marked as
> "rule missing, asked"; the data in and out; the screens affected; the edge cases and
> exceptions; the acceptance criteria in the form "given, when, then"; how it will be verified
> as done; and status. If a node the item needs does not exist in the tree, propose it and mark
> it. Order the items by the priority I gave you; if I gave none, propose an order and tell me
> why. Reply in my language.

> [zh]
> 我们要把这个功能块里必须做的一切转换成编号的待办项，每一个都带着完整的规格。读
> `PROJECT.md`、`docs/SEMANTIC_TREE.md`、客户对这个功能块的请求，以及 `docs/STATUS.md` 里的
> 内容。如果请求在某一点上模糊到你无法为它写出可验证的待办项，问我；不要靠假设来解决。然后
> 创建或扩展 `docs/PENDING.md`，每件要做的事一项，每项包含：编号（从 PND-001 起）；一行标
> 题；它挂在语义树的哪个节点下；引发它的用户故事或用例，用客户的原话；详细描述；适用的业务
> 规则，每条附其决策和日期，或标为"规则缺失，已询问"；进出的数据；受影响的界面；边界情况和
> 异常；"给定、当、那么"形式的验收标准；将如何验证它已完成；以及状态。如果该项需要的节点在
> 树里不存在，提出它并标记。按我给你的优先级排序；如果我没给，提出一个顺序并告诉我理由。用
> 我的语言回复。

   你在要求它把请求转换成可验证的项，**在请求不足以写出可验证的项时提问**，每一项逐字段的完
   整规格，它挂在树的哪个节点下，附决策或标为缺失的业务规则，之后会成为测试脚本的验收标准，
   以及附理由的顺序。

2. 回答问题（对 Turnera 它会问，比如，"当天"是什么：今天，还是任选的一天？取消是删除还是标
   记？）。这些问题都是业务决策；第 6 课你会看到它们写在哪里。
3. **像客户一样读每个待办项的规格**。这是这节课最重要的任务，也是最让人想跳过的。它描述的是
   你要求的东西吗，用的是你的话吗？验收标准是你用来说"行了"的那些吗？有没有你知道而它没写的
   边界情况？它挂在正确的节点下吗？在构建任何东西之前修正。

**发送提示词之前**（例行提示词）：`docs/PENDING.md` 里这个功能块已经规格化，而且由你一个待办
项一个待办项地读过、修改已经做完（没有哪个待办项的规格只有一行），以及
`docs/WORKING_AGREEMENT.md`，例行要加进去的地方。

4. 把每次会话的例行加进协作契约。粘贴：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching any code, open
> `docs/PENDING.md`, tell me which item you are taking and why, and re-read its specification.
> Every commit cites its pending item. A pending item is closed with written evidence (the test
> counts red and green, the screenshot, the measured number), never with 'done'. When you close
> it, keep it in the register with its full specification and add: the evidence, the commit, the
> date, and any decision that was taken along the way; that record is the documentation of what
> was built. If along the way you see something that is not on the list, add it as a new pending
> item with its specification; do not do it."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："在碰任何代码之前，打开 `docs/PENDING.md`，
> 告诉我你取哪个待办项以及为什么，并重读它的规格。每次提交都引用它的待办项。一个待办项凭书
> 面证据关闭（测试红色和绿色的数字、截图、测量的数字），绝不凭'搞定'。关闭时，把它连同完整
> 规格留在登记册里，并加上：证据、提交、日期，以及途中做出的任何决策；那条记录就是所构建之
> 物的文档。如果途中你看到列表上没有的东西，把它作为新待办项加上并附规格；不要去做。"

5. 现在可以开始构建了。让它取第一个待办项。从这里起，每次会话都以"你取哪个待办项、为什么"开
   始，每次关闭都留下记录好的待办项。

**完整性检验。** 随机读一个待办项的规格：它有所有字段吗，描述的是你要求的东西吗？每个待办项
是否挂在一个你认得的树节点下？每一个都说了如何验证吗？有没有标为"缺失，已询问"却没问过你的
规则？有没有没有证据也没有提交就"关闭"的待办项？已关闭的是否保留了规格和关闭文档？随机取三次
提交：它们引用了待办项吗？代码里出现了没有待办项的东西吗？

**交付物。** 带第一个功能块规格的 `docs/PENDING.md`、契约里的例行，以及进行中的第一个待办项。

**常见错误。** 接受一行的规格：代理写它们是为了交差，构建时它会编出缺的东西。不读规格：那是
你能在付出代价之前拦住一个误解的唯一时刻。让代理因为"我已经看它跑了"就不带证据地关闭待办
项。让它不记录就关闭：六个月后没人知道系统为什么这样做。还有最难纠正的：让它做列表之外的
"一件小事"。你第一次放行，范围精确就丢了。

**在引导项目中。** Turnera 的第一个功能块大约是六个待办项，挂在树的"日程"领域下：PND-001 看
某一天的预约；PND-002 登记一个带患者、专业人员、日期和时间的预约；PND-003 阻止同一专业人员
同一时间的两个预约；PND-004 取消一个预约（标记，不删除：第 6 课的决策）；PND-005 按姓名或电
话查找患者；PND-006 带最少数据的患者建档。比如 PND-003 的规格写着：节点 日程 → 流程"登记预
约" → 实体 预约；故事："同一个专业人员同一时间不能有两个预约，用本子的时候我碰到过两次"（负
责人的原话）；规则："只有专业人员启用了才允许双重预约"（决策待定，已询问）；数据：专业人员、
日期、开始时间、时长；界面：登记表单；边界情况：部分重叠的预约、时长不同的预约；验收标准：
"给定 A 医生 10:00 有一个预约，当我试图再登记一个 A 医生 10:00 的预约，那么界面提示且数据库
不保存"；验证：表单的端到端测试加数据库查询。这才是一份规格。

### 第 6 课 — 决策写在代码旁边

**你需要理解什么。** 模型遇到业务规则里的空洞时，**会把它填上**。它不会停下来问；它用它觉得
最可能的东西补全，自然得就像它写其余东西一样。所以这节课不是"写决策"，而是"要求它在缺一条规
则时停下来问"。而当你做了决定，决策用你的原话、你的名字和日期写下来，写在提交里、待办项规格
里和一个记录里。我从第一个系统起就这么做 [Ref. 29](REFERENCIAS.md#ref-29)；六周之后，当有人
问"为什么取消不删除？"，答案是写好的，而且是你的。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/WORKING_AGREEMENT.md`（第 1 课），例行要加进去的地方。
- `docs/DECISIONS.md`，创建好，哪怕是空的，表头里写好格式：日期、谁决定的、原话、需要这个决
  定的那个待办项。
- 和领域所有者（如果不是你）约好的渠道和回答时间：这条例行只有在有人用几小时、而不是几周来做
  决定时才起作用。

1. 把决策例行加进契约。粘贴：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Whenever implementing something requires a
> business rule that is not written down, or you must choose between two approaches that change
> what the user sees, stop and ask me, in prose, with your recommendation and the alternative. Do
> not implement the one you prefer. When I decide, write the decision with my name and the date
> in the commit message, in the pending item's specification and in `docs/DECISIONS.md`, with
> the exact words I used. If I do not answer and you must move on, implement the most reversible
> option and mark it 'decision by omission, pending confirmation', so that I can review it."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："每当实现某样东西需要一条没有写下来的业务规
> 则，或者你必须在两个改变用户所见的方案之间选择时，停下来问我，用散文，带上你的建议和备
> 选。不要实现你偏好的那个。当我决定后，把决策连同我的名字和日期写进提交信息、待办项的规格
> 和 `docs/DECISIONS.md`，用我用的原话。如果我不回答而你必须继续，实现最可逆的选项并标为
> '缺省决策，待确认'，好让我复查。"

   你在要求它遇到未写明的规则时停下，带建议和备选来问（好让你能在十秒内决定），把你的原话记
   录在三个地方，以及当你不回答时选最可逆的并标记出来。

2. 继续构建功能块的待办项。每次它问你一条业务规则，就做决定。

**发送提示词之前**（收尾提示词）：代理的问题，连同它的建议和它的备选，已经读过；还有你的决定，
用你希望永远留下来的原话写成一句话，如果领域所有者不是你就和他商量过，附日期。不在聊天里临场
发挥。

3. 粘贴：

> Rule: [exact wording]. Decided by me, [date]. Write it down and continue.

> [zh]
> 规则：[原话]。由我决定，[日期]。记下来，继续。

4. 刻意做一次反向测试：在一次会话里留一个问题不回答，看它怎么做。它必须选最可逆的并标为"缺
   省"。如果它选了自己觉得对的而没有标记，这是台阶的一次失败：在契约里修正。

**完整性检验。** 打开三次涉及业务规则的提交：它们引用了谁决定、何时吗？规则也在待办项的规格
里吗？有没有未确认的"缺省"决策？系统里有没有你不认为是你的规则？原话是逐字的，还是被"改
进"了？

**交付物。** 增长中的 `docs/DECISIONS.md`，至少有第一个功能块的五条决策，以及引用它们的提交
和待办项。

**常见错误。** 在聊天里回答问题却不要求把它们写下来：到第三次会话就没人记得了。让代理"改
进"你的话：一条被改写的规则是另一条规则。还有最严重的：在生产里发现一条没人决定过的规则。发
生时（会发生的），它不是一个 bug：它是第 6 级台阶的失败，要在契约里修，不只是在代码里。

**在引导项目中。** Turnera 第一个功能块的典型决策："取消把预约标为已取消并保存谁和何时；什么
都不删除"；"一个专业人员同一时间不能有两个预约，但如果专业人员启用了双重预约，一个预约里可以
有两个患者"；"患者的电话是必填的；邮件不是"。每条都附日期和负责人的名字，每条都贴在需要它的
待办项的规格里。

### 第 7 课 — 作为锁的测试，先证红，以及端到端测试

**你需要理解什么。** 这是课程的核心一课。一个你从没见它失败过的测试，你不知道它是否证明了什
么。模型在同一次会话里、用同一种理解写代码和测试：如果它误解了请求，测试证明的是它理解的东
西，并且通过。知道测试在看重要之处的唯一廉价方式是**看它对旧代码变红**：如果变更之前的代码
也能通过它，测试就区分不了前后，那它就没用。所以要求的不是"写测试"，而是"给我看红色，然后绿
色，然后回归"。最能说明这一点的案例是对不上的计数器 [Ref. 26](REFERENCIAS.md#ref-26)。

还有第二个想法，和第一个一样重要：端到端测试。一个从界面开始验证（点击、输入、读取）并检查
后端效果（行留下了、状态变了）的测试，才是替代你读代码的那个。待办项的验收标准（"给定、当、
那么"）就是它的脚本。而且它们要跑**三次，在三个尺度上**：每个待办项，跑它触及的流程；每个功
能块结束时，跑所有已有的流程；每次部署到生产之前，用确切的版本跑所有流程。如果你只做第三
次，到最后你拿到的是一个几周里没人端到端测过的系统。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/WORKING_AGREEMENT.md`，例行要加进去的地方。
- 要关闭的那个待办项，在 `docs/PENDING.md` 里带着它"给定、当、那么"的验收标准和它的"如何验证"：
  那是测试的脚本。如果它没有这些，在要测试之前回到第 5 课。
- `docs/STATUS.md` 里的测试套件和运行它的命令（第 4 课），以及测试环境在运行、有足够的数据覆
  盖被触及的流程；如果缺数据，由你加载，或者让它作为测试的一部分去创建，但不许模拟。

1. 把证据例行加进契约。粘贴：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "To close a pending item I need evidence,
> not your word. (1) Write the test that proves what the item asks for, following its acceptance
> criteria. (2) Demonstrate that this test fails against the previous code: you may temporarily
> revert the change, or run the test against the old version, but show me the red output. (3)
> Show me the green output with the change. (4) Run the regression suite for the neighbouring
> items and show me it is still green. (5) Run the end-to-end test of the flow this item
> touches, from the screen to the backend, and show me the backend effect. (6) Do not replace
> with mocks the very part you are trying to test. If testing end to end requires something you
> lack (data, access, an environment), ask me for it; do not simulate what you do not have.
> Finally, the commit message says 'proved red against [what]' and the test counts."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："要关闭一个待办项我需要证据，不是你的话。
> (1) 按照待办项的验收标准，写出证明它所要求之事的测试。(2) 证明这个测试对之前的代码失败：
> 你可以临时回退变更，或者对旧版本运行测试，但要给我看红色的输出。(3) 给我看带变更的绿色
> 输出。(4) 运行相邻待办项的回归测试套件，给我看它仍然是绿的。(5) 运行这个待办项触及的流
> 程的端到端测试，从界面到后端，并给我看后端的效果。(6) 不要用模拟（mock）替换恰好你要测
> 的那部分。如果端到端测试需要你没有的东西（数据、访问权限、一个环境），向我索要；不要模拟
> 你没有的东西。最后，提交信息写上'先证红，针对 [什么]'以及测试的数字。"

   你在要求它写由验收标准引导的测试，**输出可见地展示红色**，绿色，相邻项的回归，带后端效果
   的流程端到端测试，不模拟恰好要测的那部分，以及缺什么就索要而不是模拟。

2. 取重复预约的待办项（Turnera 里的 PND-003，或你项目里的等价物：一条阻止某事的规则）。让它
   用这个例行关闭它。读报告：必须有带数字的红色输出（"1 个中 1 个对没有这条规则的版本失
   败"），然后是绿色，还有端到端测试：一个程序控制的浏览器打开界面，试图登记重复预约，读到提
   示，并在数据库里核实它没有被保存。
3. 如果它告诉你无法做端到端测试，因为界面不能程序化操作，停下来：那是 X2 在失败，必须现在就
   修（给界面元素加标识符），然后再继续。

**发送提示词之前**：分清它缺的是你手上有的输入（数据、一个访问权、一个环境：给它，别发这条提
示词），还是系统在那里真的不可测试（这条提示词）。

4. 粘贴：

> Explain why it cannot be tested, what would have to be added so that it can, and open a
> pending item for that. The change is not closed until it can be tested.

> [zh]
> 解释为什么无法测试，需要加上什么才能测试，并为此开一个待办项。在能够测试之前，变更不算
> 关闭。

5. **功能块结束时**，当六个待办项都关闭了，跑完整的测试套件。

**发送提示词之前**（测试套件提示词）：六个待办项都用例行关闭了，要提升的那个确切版本已经标识
并部署在测试环境上，以及你自己那份已有流程的清单（从语义树的用例里来），用来对照代理说它覆盖
了什么。

6. 粘贴：

> Run the complete end-to-end suite of every flow that exists so far, in the test environment,
> with the exact version that will be promoted. Show me the counts, and for each flow the
> backend check that proves it. If any flow has no end-to-end test, say so and open a pending
> item for it; do not pass it as covered.

> [zh]
> 在测试环境里，用将要提升的确切版本，运行到目前为止所有流程的完整端到端测试套件。给我看
> 数字，并对每个流程给出证明它的后端检查。如果有任何流程没有端到端测试，说出来并为它开一
> 个待办项；不要把它当作已覆盖放过去。

7. 然后，**你自己使用系统**。打开测试环境，做前台会做的事：登记一个预约，试一下重复预约，取
   消，查找。让你烦的、你不懂的、放错地方的：记为待办项。这半小时找到的是任何测试都找不到的
   东西。

**完整性检验。** 报告是否展示了带数字的红色？回归是否在同一次会话里带数字运行了？端到端测试
是否也验证了后端？变更所在之处是否恰好有被模拟的部分？提交写了"先证红"吗？功能块结束时：所
有流程都在端到端测试套件里吗？你亲自用了系统并记下了你发现的东西吗？

**交付物。** 至少三个用完整例行（红、绿、回归、端到端）关闭的待办项，功能块的完整端到端测试
套件绿色，以及从你的人工测试里产生的待办项。

**常见错误。** 接受没有数字也没有红色的"测试通过"。接受用模拟替换端到端测试来让测试套件"提
速"。放过一个"无法测试"而不开待办项。还有不亲自使用就关闭功能块：对界面的人工查看不能委托。

**在引导项目中。** 重复预约的红色是这样的：代理临时去掉规则，运行测试，输出说测试失败了，因
为第二个预约被保存了。把规则放回去，运行，绿色。然后回归：PND-001 和 PND-002 的测试仍然绿
色。然后端到端：一个程序控制的浏览器填写表单，按"保存"，读到"该时段已被占用"的消息，一条数据
库查询确认那个时间只有一个预约。功能块结束时，端到端测试套件走一遍已有的三个流程（看当天、
登记、取消），而负责人登记了十个测试预约，发现选时间用的下拉菜单很不顺手。新待办项。当你第一
次看到那份报告时，你会明白整个方法是为了什么。

### 第 8 课 — 生产者/消费者对称性与反模式记录

**你需要理解什么。** 当你改了系统的一端（服务器、数据库、一个机器人），另一端（界面、一个计数
器、一份报告）必须在同一次提交中改变。否则它们会分叉，用户在一边看到一个数字，在另一边看到
另一个 [Ref. 26](REFERENCIAS.md#ref-26)。避免这一点的原则说起来简单、坚持起来难：**每张列表
只有一个所有者**。一个预约的可能状态、一份报告的列、某物等待的原因：由一个部分（生产者）定
义，其余部分从那里读 [Ref. 27](REFERENCIAS.md#ref-27)。语义树是这些列表第一个被声明的地方。
一旦有两份副本，其中一份就是过时的；只差知道是哪一份。

这节课的后半部分是反模式记录（GOTCHAS）：你已经吃过一次亏的错误，记下它们的气味、根因、修复
和如何提前检测 [Ref. 2](REFERENCIAS.md#ref-2)。重要的不是记下来：是加上能检测它们的自动检
查，因为一个记下来却没自动化的反模式，会在换了会话时重演。

**任务。**

**发送提示词之前**，用你自己的手：

- 至少已经构建了一个功能块：各部分之间没有契约，就没有地图可做。
- `docs/SEMANTIC_TREE.md` 保持最新：那些列表（状态、类型、原因）是在那里声明的，而地图必须和
  树一致。
- 一份由你写的清单，列出住在仓库之外、却生产或消费系统某样东西的部分（一个机器人、一张读数据
  库的表格、另一个团队的流程），或者确认一个都没有。

1. 向它要契约地图：

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

> [zh]
> 构建 `docs/PRODUCER_CONSUMER_MAP.md`：对系统里的每个契约（一个服务、一张表、一种文件格
> 式、一张值列表），谁生产它、谁消费它。如果系统里有你无法访问或不理解的部分，告诉我，而不
> 是把它们排除在地图之外。用我的语言回复。

   你在要求它列出带两端的契约清单，以及把看不到的东西声明出来而不是省略。

**发送提示词之前**（例行提示词）：地图由你审阅过（挑一个契约，验证两边就是你知道的那两边），
以及 `docs/WORKING_AGREEMENT.md`。

2. 把例行加进契约：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before closing any change that touches a
> contract, look up every consumer in the map and update them in the same commit. Always prefer
> that the producer defines the list (columns, causes, states) and the consumer reads it, rather
> than each keeping its own copy. If the map does not have that relationship, add it."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："在关闭任何触及契约的变更之前，在地图里查找
> 每个消费者并在同一次提交中更新它们。始终倾向于由生产者定义列表（列、原因、状态）而消费者
> 读取它，而不是各自保留一份副本。如果地图里没有那个关系，加上它。"

3. 做列表测试：选一张出现在界面上的列表（Turnera 里是预约的状态：待确认、已确认、已取消、缺
   席），让代理给你看它在哪里定义、在哪里被读取。如果有两处定义，让它只留一处，并与语义树一
   致。
4. 第一次有东西第二次坏掉时（接下来几周会发生的），把它登记下来。

**发送提示词之前**：第一次的那个待办项或那次提交，由你在 `docs/PENDING.md` 已关闭的待办项里
找出来，好和提示词一起贴给它（没有这个引用，反模式会写得很泛泛，什么也检测不到）；还有
`docs/GOTCHAS.md`，创建好哪怕是空的，表头里写好格式：气味、根因、修复、如何提前检测。

5. 粘贴：

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

> [zh]
> 这事我们以前遇到过。把它记录到 `docs/GOTCHAS.md`，包含：它的气味（早期信号）、根因、修
> 复，以及下次如何在它造成伤害之前检测到它。并且，如果可能，加一个能检测它的测试或自动检
> 查。

**完整性检验。** 从地图里选一个契约：每个消费者是从生产者读它，还是有自己的副本？有没有一个
数字在两个界面上显示，而且一致？实体的状态在代码和语义树之间一致吗？GOTCHAS 的每条记录都有四
个部分吗？有没有已经记下的东西重演了？

**交付物。** `docs/PRODUCER_CONSUMER_MAP.md`、契约里的例行，以及 `docs/GOTCHAS.md`（哪怕只以
一条记录开头）。

**常见错误。** 做一次地图就再也不看：它必须随每个新契约增长。把反模式记成轶事（"有一次发生
了……"），没有"如何提前检测"的部分。还有经典的一个：同一个状态的文本手写在服务器和界面两处；
哪天一处改了，另一处就留着。

**在引导项目中。** Turnera 的地图一开始有四五个契约：预约状态列表（服务器定义，界面和月报读
取）；预约表（登记写入，当天日程和报表读取）；患者表；以及之后的消息队列（日程写入，发送器读
取）。第一个 GOTCHA 通常是日期的：日程表把预约显示在了错误的一天，因为服务器用一个时区保存，
界面用另一个时区显示。气味："23 点的预约出现在明天"。根因：两个时区。修复：只用一个，在服务
器上。检测：一个 23:30 的预约的测试。

### 第 9 课 — 构建之前先测量，用一把也被验证的量具

**你需要理解什么。** 模型产出带数字的断言（"有大约 120 个那种查询"），而它们在测量过和估计过
时听起来一模一样。你没法从语气上区分。唯一的方式是要求仪器："你用什么测的？给我看命令"。这
级台阶的规则是：**任何决定某事的数字都不来自印象**：它来自一把住在仓库里的量具，它有一个对已
知案例验证它的测试，而且你能运行它。

还有一件事，是我吃一堑长一智学到的，也是我迟迟没有把这条我视为显然的规则形式化的原因：量具
也会撒谎。在我的一个系统里，一把量具给出零，因为它看不到代码的一部分，另一把说 27，而实际是
44 [Ref. 35](REFERENCIAS.md#ref-35)、[Ref. 36](REFERENCIAS.md#ref-36)。所以要双向审计：从代码
到测量（该计数的都计了吗？）和从测量到代码（计数的都真实存在吗？）。

在小项目里，"测量"是朴素的：数一数一个界面加载时做多少查询，月报要多久，昨天发了多少条消
息。不需要棘轮，也不需要每条路径的预算。需要的是数字背后有一条命令。

**任务。**

**发送提示词之前**，用你自己的手：

- 假设，写成一句话。在 Turnera 里，一个好的假设是："当天日程对它显示的每个预约都做一次数据库
  查询"（经典的 N+1 循环）。如果它不成立，更好：你会看到一个错误的假设是怎么被验证的。它和要
  测量的量一起填进提示词的空里。
- 一个已知案例，用来测试量具，你事先就知道答案（"零个预约时，它必须恰好数出那些基础查询"）。
- 对所测之物的访问权（如果测的是真实数据，数据库的只读权限；日志），以及仓库里已经存在的量具，
  把它们的名字说出来。

1. 粘贴：

> Before building anything, we are going to measure. The hypothesis is: [the day view runs one
> database query per appointment shown]. Write a meter (a script that lives in the repository)
> that measures [the number of queries the day view runs for a day with N appointments], and a
> test for the meter that checks it against a known case where the answer is known in advance.
> If measuring requires access or data you lack, ask me; do not approximate silently. If some
> part can only be approximated, mark it as approximate and tell me the margin. Run the meter,
> show me the number together with the command that produces it, and audit it in both
> directions: from the code to the measurement (is everything that should be counted, counted?)
> and from the measurement to the code (does everything counted actually exist?). Only then
> propose what to build. Reply in my language.

> [zh]
> 在构建任何东西之前，我们要测量。假设是：[当天视图对显示的每个预约运行一次数据库查询]。
> 写一把量具（一个住在仓库里的脚本），测量 [当天视图对一个有 N 个预约的日子运行的查询数]，
> 以及一个量具的测试，对一个答案事先已知的案例核对它。如果测量需要你没有的访问权限或数据，
> 问我；不要静默地近似。如果某部分只能近似，把它标为近似并告诉我误差范围。运行量具，把数字
> 连同产生它的命令给我看，并双向审计它：从代码到测量（该计数的都计了吗？）以及从测量到代码
> （计数的都真实存在吗？）。然后才提出要构建什么。用我的语言回复。

   你在要求它把量具放在仓库里，量具的测试，缺什么就索要而不是近似，标出近似的部分，数字连同
   命令，双向审计，以及顺序：先测量，再提议。

2. 你自己运行它给你的命令。结果必须是同一个数字。你不需要理解脚本；但需要执行它。
3. 如果假设成立且代理提议修复，向它要一个预算。

**发送提示词之前**（预算提示词）：测出来的那个数字，由你用它给的命令亲自跑过（结果必须一样），
以及你愿意给的余量，由你决定：比测出来的多一点，不是"以防万一"翻一倍。

4. 粘贴：

> Set the budget for [queries] on this path at the measured value plus a small margin, and
> protect it with a test that fails if it is exceeded. Tell me the number and the margin.

> [zh]
> 把这条路径上 [查询] 的预算定在测量值加一个小余量，并用一个超出时就失败的测试保护它。告诉
> 我数字和余量。

   这样，如果三个月后有人把循环放回去，测试套件会检测到。

**发送提示词之前**（规则五提示词）：`docs/WORKING_AGREEMENT.md`，以及对计划可能断言的每个量
都已经有一把量具；如果某个数字没有量具，先发这节课的初始提示词。

5. 把第五条规则加进契约，用于计划带着数字的情况：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before executing a plan that asserts
> numbers, verify every number with the meter. If any does not match, stop and tell me; do not
> execute on a wrong number."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："在执行一个断言了数字的计划之前，用量具验证
> 每个数字。如果有任何一个不符，停下来告诉我；不要在错误的数字上执行。"

**完整性检验。** 你运行了量具并得到同样的结果吗？它有测试吗，对什么已知案例？报告里有没有背
后没有量具的数字？近似的部分标出来了吗？有带测试的预算吗？

**交付物。** 仓库里一把带测试的量具，`docs/STATUS.md` 或待办项里一个带命令和日期的数字，以及
（如果适用）一个由测试保护的预算。

**常见错误。** 不运行命令就接受数字：这节课一半的价值在于你亲自运行它。一把给出零的量具：几
乎从来不是零；几乎总是它没看到什么。还有让代理"边测边修"：顺序就是方法。

**在引导项目中。** Turnera 的量具是一个脚本，在测试数据库里加载有 10、50 和 200 个预约的一
天，打开那天的日程并计数查询，写下三个数字。量具的测试验证 0 个预约时它恰好数到基础查询数（比
方说，2）。如果有循环，数字是 12、52 和 202；修好后变成 3、3 和 3，预算定在 4，附一个测试：
对任何数量的预约，如果日程做了超过 4 次查询就失败。

### 第 10 课 — 诚实的验证与相称的报告

**你需要理解什么。** 如果你不打算读代码，代理的报告就必须可信，而这不会自动发生。模型被训练
成有用且完整，而一份说"这个我没能验证"的报告，感觉上不如一份说"搞定"的有用。所以必须**明确
向它要**坏消息、盲点和它没做的事。你不要，它就不给；不是因为它隐瞒，而是因为它不把那当作回
答的一部分。我曾收到一个带着"success"字样报告的认证错误 [Ref. 43](REFERENCIAS.md#ref-43)。

让报告变得诚实的结构是三个块：**已验证**（证据在旁边）、**相信**（它认为能用而没测的，以及为
什么没测）和**盲点**（它从所在之处看不到的东西）。还有一条规则：坏消息先说。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/WORKING_AGREEMENT.md`，例行要加进去的地方。
- 每次会话都把你要求的事情记成一张清单的习惯：提示词要求它逐项覆盖，而你得知道一共有几项。

1. 把报告例行加进契约：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "When you report, separate three blocks:
> VERIFIED (what you tested, with the command and its output), BELIEVED (what you think works but
> did not test, and why not), and BLIND SPOTS (what you cannot see from where you are: another
> environment, real data, the user's browser). Cover every item I asked for, one by one, even when
> the answer is 'I did not do it'. No claim without its proof next to it. Do not say 'done': say
> what is done and how you know it. If something went wrong, say it first."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："报告时，分成三个块：已验证（你测过的，附命
> 令及其输出）、相信（你认为能用但没测的，以及为什么没测）和盲点（你从所在之处看不到的：另
> 一个环境、真实数据、用户的浏览器）。逐一覆盖我要求的每一项，即使答案是'我没做'。没有旁边
> 附着证据的断言不许有。不要说'搞定'：说什么做完了以及你怎么知道的。如果出了什么问题，先说
> 它。"

2. 让它关闭下一个待办项，用下面的检验清单读报告。第一次，几乎肯定，"盲点"块会是空的。问它：
   "你从所在之处看不到什么？"。必须有点什么（你的浏览器、生产环境、真实数据）。如果它坚持说
   没有，你也坚持。
3. 练习"还是坏的"。向它要一个小东西，在测试环境里验证，如果出于任何原因你没看到变化（很常
   见：部署要时间，或者没部署），对它说"还是坏的"。

**发送提示词之前**：你记下来的那次验证（你在哪个 URL 看的、系统显示哪个版本、你做了什么、你
期待什么、结果怎样），以及代理说包含那个修复的提交或版本，从它的报告里抄下来。没有这些，"还
是坏的"只是一种印象。

4. 粘贴：

> Before diagnosing again, compare the version running where I see the problem with the version
> that contains your fix. Tell me both. If they differ, the problem is publication, not code.

> [zh]
> 在重新诊断之前，比较我看到问题的地方正在运行的版本和包含你的修复的版本。两个都告诉我。
> 如果它们不同，问题在于发布，不在于代码。

   一半的"还是坏的"都是修复在仓库里却不在你看的地方 [Ref. 45](REFERENCIAS.md#ref-45)。这个
   条款帮你省下好几个小时。

**完整性检验。** 三个块都在吗？你随机选了一条"已验证"的断言，它旁边有证据，而且你能复现吗？
它覆盖了你要求的每一项吗？坏消息在开头吗？它有没有哪次光秃秃地说了"搞定"？

**交付物。** 契约里的例行，以及连续三份带三个块的报告，其中一份带一个真实的盲点。

**常见错误。** 只读"已验证"块而跳过另外两个：另外两个才是保护你的。接受"已验证"里的"应该能
用"：那是伪装的"相信"。还有习惯了越来越长的报告：一份注水的报告是在用篇幅掩盖什么。

**在引导项目中。** Turnera 里 PND-004（取消一个预约）的一份好的关闭报告："已验证：取消的测试
通过（1/1，先证红，针对会删除的版本）；回归 6/6；'取消'流程端到端绿色，数据库里的行已标记；
在测试环境里，11 月 3 日的 17 号预约显示由 'recepcion1' 于 10:42 取消（截图）。相信：月报会
正确计数取消，但我没测，因为报表是 PND-011，还不存在。盲点：我看不到'已取消'状态在前台的手
机上是什么样子；你来试。"

---

## 运维阶段：第 11 到 15 课

这五节课把"能运行"变成"能被维持"。它们在第 4 和第 5 周做，那时前两个功能块已经用循环构建完
并由你在测试环境里测过，而系统还没有作用于外部世界（发消息、收钱）或拥有真实用户。在引导项
目里，这是加提醒和定金的时候，所以第 12 课（锁）在构建那些功能之前，而不是之后。

### 第 11 课 — 作为计划输入的定期审计

**你需要理解什么。** 每隔一段时间就得用新鲜的眼光看整个系统，而看到的东西不进一份归档的报
告：进待办项列表。重要的部分是"新鲜的眼光"：审计的不该是构建的那个，因为它共享自己的假设。
一个构建了某模块的模型"知道"写在代码里的密码是临时的；一个第一次看到它的模型会如实报告它是
什么。两扇构建者在一天之内留下的管理员后门就是这样被发现的 [Ref. 40](REFERENCIAS.md#ref-40)。
不需要另一家公司：**另一个会话，带另一份指令文件，没有参与过构建**就够了。

**任务。**

**发送提示词之前**，用你自己的手：

- 一个新的代理会话，开在仓库的一份干净副本里（克隆到另一个文件夹）。如果你的工具允许，给它一
  份不同的指令文件，只说"你是审计者；你没有构建这个系统"。
- 给那个会话的测试环境只读访问权（数据库、日志），只读凭据放在仓库之外。
- 由你决定的范围，填进提示词的空里，以及上一次的审计，如果有的话。

1. 粘贴：

> Audit this system for [integrity, security, performance and code quality]. Read-only: change
> nothing except writing your report to `docs/AUDIT_[date].md`. If auditing some part requires
> access you lack (the database, the log, an environment), tell me and mark that part as not
> audited; do not pass it as fine. Go through all of the code, not a sample. For every finding:
> where it is (file and line), what the risk is, what evidence proves it (the command, the
> query, the number), and its priority: P0 must be fixed now, P1 soon, P2 when possible. Give a
> grade to every dimension you audited. End with the list of P0 findings turned into proposed
> pending items. Reply in my language.

> [zh]
> 对这个系统做 [完整性、安全、性能和代码质量] 的审计。只读：除了把你的报告写到
> `docs/AUDIT_[日期].md` 之外什么都不改。如果审计某部分需要你没有的访问权限（数据库、日志、
> 某个环境），告诉我并把那部分标为未审计；不要把它当作没问题放过去。走遍全部代码，不是抽
> 样。对每个发现：它在哪里（文件和行）、风险是什么、什么证据证明它（命令、查询、数字），以
> 及它的优先级：P0 必须马上修，P1 尽快，P2 有空时。给你审计过的每个维度打分。以转换成拟议待
> 办项的 P0 发现列表结束。用我的语言回复。

   你在要求它只读，把无法审计的声明出来而不是默认放行，全部代码而不是抽样，每个发现带位
   置、风险、证据和优先级，按维度打分，以及 P0 已经转成拟议待办项。

2. 读报告。选两个发现，让审计者给你看证据（命令、行号）。它必须能做到。

**发送提示词之前**（收尾提示词）：报告由你读过，两个发现和审计者核实过，以及构建者的会话已经
打开（这条提示词是发给构建者的，不是发给审计者的），文件的日期填进空里。

3. 回到构建者的会话，粘贴：

> Read `docs/AUDIT_[date].md`. Open one pending item for every P0 and P1, citing the finding.
> If you disagree with any of them, tell me with the evidence against; do not ignore it.

> [zh]
> 读 `docs/AUDIT_[日期].md`。为每个 P0 和 P1 开一个待办项，引用该发现。如果你对其中任何一
> 条有异议，带着反面证据告诉我；不要无视它。

4. 在第一次部署到生产之前（第 13 课）重复这节课，之后每一两个月一次。

**完整性检验。** 报告说了它**没能**审计什么吗？随机两个发现是否有文件、行号和可复现的证据？每
个 P0 都有开着的待办项吗？打分能和下一次审计比较吗？审计的是和构建者不同的会话吗？

**交付物。** `docs/AUDIT_[日期].md` 和开好的 P0/P1 待办项。

**常见错误。** 用构建的那个会话做审计：它会确认自己的假设。在一个超过一个月的系统上接受一份
没有任何 P0 的报告：几乎从来不是真的。还有归档报告却不开待办项：那审计就毫无用处。

**在引导项目中。** Turnera 的第一次审计通常会发现：日志里有患者数据（发消息时打印了电话：
P0）；按姓名查找患者没有索引（P1，到 5.000 个患者时会显现）；预约表单没有校验日期在未来
（P1）；以及某个带已知漏洞的依赖（P1）。四个新待办项，全都带文件和行号。

### 第 12 课 — 失败即关闭、锁与零静默损害

**你需要理解什么。** 软件默认在有疑问时继续前进：如果校验失败，代码继续；如果服务没响应，就
假定一切正常。这是"失败即打开"，像一扇停电时打开的门。方法反转了默认值：**有疑问，就不**。每
个有后果的动作（收费、发送、删除、批准）都带一把锁，有写下来的回退路径，而且每个新的自动化
都从演练模式开始，记录它本会做什么，直到你启用它。我在第一个系统里放的锁是样板
[Ref. 28](REFERENCIAS.md#ref-28)。

这节课在构建作用于外部世界的功能**之前**。在 Turnera 里，在提醒和定金之前，它们是第三个功能
块。

**任务。**

**发送提示词之前**，用你自己的手，和所有者一起：

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`：系统做什么或将要做什么是收费、发送、批准、删除或通
  知外部某人的；并且对每个动作，做两次会怎样、做错了会怎样、怎么撤销、谁应该有权做。语义树的
  流程给你起始清单。提示词把它叫作 "the survey of consequential actions"，没有给路径：告诉它
  在哪儿。
- `docs/SEMANTIC_TREE.md`，保持最新。

1. 粘贴：

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [zh]
> 我们要决定系统的哪些动作需要锁。读有后果动作的调研，并走遍代码，找出所有收费、发送、批
> 准、删除或向外通知的东西。比较两张列表：如果代码里有调研没提到的动作，或者反过来，在继续
> 之前问我。对每个动作提出：它是否可逆、它配哪种锁（显式确认、双重保险、演练模式、每日上
> 限、回路中的人），以及出错时的回退路径是什么。通用规则：途中出现任何疑问或故障，动作都
> **不**执行，并记录原因。把表格呈给我；我逐把锁确认。用我的语言回复。

   你在要求它把业务说的和代码做的做比较（没人记得的动作就在那里出现），差异要问而不是自作主
   张，以及对每个动作的可逆性、锁和回退路径，并写明失败即关闭的规则。

2. 和所有者一起，逐把锁确认。

**发送提示词之前**（收尾提示词）：表格的每一行，你的确认或你的修改，都写好准备填进提示词的空
里；没有哪一行缺裁决，因为一把没有确认的锁就是一把不会被实现的锁。

3. 用这个收尾：

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [zh]
> 我确认锁 [列表]；把 [X] 改为 [Y]。实现它们，每把锁配一个测试，证明在疑问条件下动作**不**
> 发生（先证红，针对没有锁的版本）。把最终表格记录到 `docs/LOCKS.md`。而对任何新的自动化：
> 先演练模式，记录它本会做什么，直到我启用它。

4. 现在用第 5 课打开第三个功能块（提醒、定金），用第 5 到 10 课的完整循环构建它，并让它留在
   演练模式。在启用真实发送之前，花几天看"本会发送"的记录。

**完整性检验。** 每个收费、发送、批准或删除的动作都在表里吗？每把锁都有它的红色测试吗？每个
不可逆的动作都有写下来的回退路径吗？新的自动化是从演练模式开始的吗，启用之前你看过记录吗？

**交付物。** `docs/LOCKS.md`、每把锁一个先证红的测试，以及处于演练模式并带记录的自动化。

**常见错误。** "为了用一条发到我自己手机的消息测试"而启用真实发送：演练模式恰恰就是为此存在
的。一把可以用"测试用"参数绕过的锁：那个参数会留在生产里。还有不看"本会做"的记录：那是在错
误到达患者之前看到它的唯一窗口。

**在引导项目中。** Turnera 的锁表：发送提醒（不可逆；锁：按预约幂等，每个预约和渠道只发一
次，每天上限 200，先演练模式；回退：无，所以才有上限）；收取定金（可通过退款撤销；锁：前台的
显式确认，金额由专业人员设定；回退：通过支付供应商退款）；取消预约（对患者不可逆；锁：确认并
记录谁操作的；回退：重新创建预约）；删除患者（不可逆；锁：双重确认，只有负责人可操作，且仅当
没有未来预约时；回退：无，所以才双重）。每把锁都有一个测试表明，没有锁时，动作会发生。

### 第 13 课 — 持续集成、环境、密钥与作为产品一部分的部署

**你需要理解什么。** 到达生产必须是一个可复现的包：测试跑**一**次，部署只打包并上传，配置住
在服务器上而不在仓库里，有一个从测试提升到生产的、可以运行两次的程序，而且回滚**经过测试**
（从没测过的回滚不存在）。每次提交跑三次测试把我的持续集成配额烧光了
[Ref. 39](REFERENCIAS.md#ref-39)。关于密钥，一条没有例外的规则：**在聊天、日志或提交里出现过
的密钥就不再是密钥**；轮换它，没有商量 [Ref. 42](REFERENCIAS.md#ref-42)。

从骨架（第 4 课）起你已经有了其中的大部分：持续集成和到测试环境的部署。这节课把它向生产补
全。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/ENVIRONMENTS_SURVEY.md`（第 4 课），用生产所缺的东西补全：域名和谁管理它、密钥要住在
  哪里以及有哪些（名字，永远不写值）、谁可以动生产、今天要回滚会怎么做，以及你有多少持续集成
  配额（如果用 GitHub Actions，看看套餐的上限）。提示词把它叫作 "the environments and access
  survey"：告诉它在哪儿。
- 给代理的生产访问权，由你决定，凭据放在仓库之外、聊天之外。
- 带持续集成和测试环境部署、已经跑通的骨架（第 4 课）。

1. 粘贴：

> We are going to close the path to production. Read the environments and access survey.
> Evaluate whether you have what is needed to deploy to production safely (access, domain,
> where the secrets live, how to roll back); if anything is missing, ask me. Then set up: (1)
> continuous integration runs the full test suite exactly once per commit; (2) the deployment
> waits for that run's result and only packages and uploads, without running tests again; (3)
> each environment's configuration lives on the server (environment file or vault), never in the
> repository; (4) a written procedure to promote from the test environment to production, which
> can be run twice without breaking anything; (5) the rollback, tested; (6) an automatic check
> that prevents committing a secret. Document all of it in `docs/DEPLOYMENT.md` so that a person
> can do it by hand without you. Reply in my language.

> [zh]
> 我们要收尾通往生产的路。读环境与访问权限调研。评估你是否拥有安全地部署到生产所需的东西
> （访问权限、域名、密钥住在哪里、如何回滚）；如果缺什么，问我。然后搭建：(1) 持续集成对每
> 次提交恰好运行一次完整测试套件；(2) 部署等待那次运行的结果，并且只打包和上传，不再运行
> 测试；(3) 每个环境的配置住在服务器上（环境文件或保险库），绝不在仓库里；(4) 一份从测试环
> 境提升到生产的书面程序，可以运行两次而不弄坏任何东西；(5) 回滚，经过测试；(6) 一个防止提
> 交密钥的自动检查。把这一切记录到 `docs/DEPLOYMENT.md`，让一个人不靠你也能手工完成。用我
> 的语言回复。

   你在要求它在开始之前核实访问权限，每次提交只跑一次测试，只打包的部署，配置放在外面，可重
   复的提升，经过测试的回滚，防密钥的锁，以及给人看的文档。

2. 在第一次部署到生产之前，如果还没做第 11 课的审计就做了，并用将要提升的确切版本跑所有流程
   的完整端到端测试套件（第 7 课的功能块收尾提示词）。

**发送提示词之前**（例行提示词）：`docs/DEPLOYMENT.md` 已写好并由你读过（你一个人能照着做下
来吗？），以及 `docs/WORKING_AGREEMENT.md`。

3. 把部署例行加进契约：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Before touching production: the test
> environment is green with the same version; the rollback is ready; and tell me what changes in
> the configuration. After deploying: show me the version running in production and an
> end-to-end check on production, read-only."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："在碰生产之前：测试环境用同一个版本是绿的；
> 回滚已就绪；并告诉我配置里有什么变化。部署之后：给我看生产里运行的版本，以及一次对生产的
> 只读端到端检查。"

4. 做第一次生产部署，此时系统还没有真实用户。然后**测试回滚**：让它回到上一个版本并给你看它
   在运行，再回到新版本。
5. 如果课程期间你在聊天里粘贴过某个密钥（一个 API 密钥、一个密码），轮换它。

**发送提示词之前**：已经确认的那个密钥（它的名字，永远不写值）、它在哪里出现、什么时候，以及
你对生成它的那个控制台的访问权，以防代理没法自己轮换。这条提示词不存在"晚点再发"。

6. 粘贴：

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [zh]
> 那个密钥已经泄露：现在就轮换它，告诉我它还在哪些地方被用过，并加上本可以拦住它的检查。

**完整性检验。** 每次提交测试套件跑几次？（一次；索要链接）。仓库里有没有任何真实的配置值？
（让它给你看空的搜索结果）。你能独自照着 `docs/DEPLOYMENT.md` 做吗？回滚测过了吗，什么时候，
凭什么证据？聊天里出现过的每个密钥都轮换了吗？你知道还剩多少持续集成配额吗？

**交付物。** 每次提交一次的持续集成、只打包的部署、`docs/DEPLOYMENT.md`、经过测试的回滚、启
用的防密钥锁，以及在生产中运行的系统（暂时没有用户）。

**常见错误。** "手工、快速地部署，因为是个小改动"：小改动会弄坏生产，因为没人测它们。配置示
例文件里有看起来像真实的值（它们就是）。还有直到需要的那天才测回滚。

**在引导项目中。** 对 Turnera，持续集成在每次 push 时运行测试套件（到这时大约 30 个测试，包
括六个端到端流程）；合并到 `main` 时自动部署到测试环境；提升到生产是一条命令，把测试环境里的
版本打包上传，配置（消息供应商的密钥、支付供应商的密钥、数据库的 URL）放在服务器上一个不在仓
库里的环境文件中。回滚是同一条命令带上一个版本。防密钥的锁是每次提交时的一个检查，拒绝任何看
起来像密钥的东西。

### 第 14 课 — 活的文档与无需 AI 即可遵循的手册

**你需要理解什么。** 系统必须能在没有代理、没有你的情况下被使用、维护和恢复。恢复手册的标准
很具体：**一个不编程的可信的人，在凌晨三点，系统宕机、代理离线的情况下，必须能照着它做**。
如果某一步写着"咨询开发者"，它就是不完整的。而既然用模型重新生成文档是免费的，规则就变成"在
同一次提交中"：每个触及用户所见、操作者所做或部署方式的变更，都在同一次提交中更新手册。我按
这个标准为我的第一个系统写的手册是样板 [Ref. 24](REFERENCIAS.md#ref-24)。

还有一个你已经有的来源：已关闭的待办项。如果你按第 5 课的要求记录了每次关闭，用户手册不是从
零写的：它是从关闭的待办项里一块一块搭起来的，变更日志直接从它们产生。

**任务。**

**发送提示词之前**，用你自己的手：

- `docs/WORKING_AGREEMENT.md`，例行要加进去的地方。
- 系统会有哪些手册的清单，每本都写上它的读者（最终用户、维护者、运维基础设施的人），写在
  `PROJECT.md` 里或在聊天里说出来。

1. 把例行加进契约：

> Add this routine to `docs/WORKING_AGREEMENT.md`: "Every change that modifies what the user
> sees, what the operator does, or how the system is deployed, updates the corresponding manual
> in the same commit. At the close of every functional block, add to the user manual the screens
> and flows of the pending items closed in that block, with real screenshots from the test
> environment, and add their entries to the changelog. If you do not know which manual, ask."

> [zh]
> 把这条例行加到 `docs/WORKING_AGREEMENT.md`："每个改变用户所见、操作者所做或系统部署方式
> 的变更，都在同一次提交中更新相应的手册。每个功能块结束时，把该功能块中关闭的待办项的界面
> 和流程加到用户手册里，附来自测试环境的真实截图，并把它们的条目加到变更日志。如果你不知道
> 该放进哪本手册，就问。"

**发送提示词之前**（手册提示词）：系统在测试环境里运行着、带着真实感的数据（截图从那里出来），
已关闭的待办项带着它们的文档（第 5 课），`docs/DEPLOYMENT.md` 和 `docs/LOCKS.md` 保持最新，
以及只有业务才知道的东西，准备好等它来问：谁对什么负责、凌晨三点打哪个电话、谁做备份。

2. 粘贴：

> Generate three manuals from the system as it is today in the test environment: the user
> manual (screen by screen, with real screenshots, in the user's language, no jargon); the
> maintenance manual (how it is built, where everything is, how to run the test suite, how to
> add a module); and the infrastructure and recovery manual (how to deploy, how to roll back,
> how to restore a backup, what to do if it goes down; written for a person who has to do it by
> hand, without AI, at three in the morning). If for any section you need something only the
> business knows (who is responsible for what, which phone number to call), ask me; do not leave
> a gap and do not invent. Each manual carries a date and the system version. Reply in my
> language.

> [zh]
> 根据今天测试环境里的系统现状生成三份手册：用户手册（逐个界面，附真实截图，用用户的语言，
> 没有行话）；维护手册（它是怎么构建的、每样东西在哪里、怎么运行测试套件、怎么添加一个模
> 块）；以及基础设施与恢复手册（怎么部署、怎么回滚、怎么恢复备份、宕机了怎么办；写给一个必
> 须在凌晨三点、不靠 AI、手工完成的人）。如果某一节你需要只有业务才知道的东西（谁负责什么、
> 打哪个电话），问我；不要留空洞，也不要编造。每份手册都带日期和系统版本。用我的语言回复。

   你在要求它三份带真实截图的手册，恢复手册的凌晨三点标准，只有业务才知道的东西要问而不是留
   空洞，以及日期和版本。

3. 真正的测试：把恢复手册交给一个不编程的人（所有者、一个家人），让他在测试环境里照着"宕机
   了"一节做。卡在哪里，手册就得修哪里。
4. 下一次界面变更之后，核实提交动了用户手册。
5. 现在做**验收测试**：所有者在测试环境里用真实感的数据、按六个流程使用整个系统，在第一个真
   实用户进来之前。他发现的东西是待办项；它们关闭后，系统就被接受了。

**完整性检验。** 随机一张截图和今天的测试环境一致吗？一个不编程的人能照着"宕机了"一节做吗？
最近一次改了界面的提交动了手册吗？变更日志对每个已关闭的待办项都有一条吗？有没有"[待补]"之
类的空洞？每份手册都说了它对哪个版本有效吗？所有者对所有流程做了验收测试吗？

**交付物。** 带日期和版本的三份手册、已完成的真人测试，以及已关闭的验收测试。

**常见错误。** 生成一次手册却不把例行放进契约：两个月后它们的截图是已经不存在的界面。一份以
"打开一个代理会话"开头的恢复手册。还有不做真人测试：那是唯一算数的验证。

**在引导项目中。** Turnera 的用户手册有六个带截图的界面，从三个功能块关闭的待办项搭起来；维
护手册解释每个模块在哪里、怎么运行测试套件；恢复手册按顺序、带命令写明：怎么知道系统宕了、
怎么重启、怎么回到上一个版本、怎么从最近一次备份恢复数据库（每天夜里做一次：这也出自这节
课），以及给谁打电话。负责人在测试环境里照着做，卡在了"恢复数据库"，因为命令假定了一个她没
有的文件夹；手册修好了。

### 第 15 课 — 系统里的代理，以及带数字的复盘

**你需要理解什么。** 两件事收尾这个循环。第一件是可选的：把代理留在生产里驻留，范围受限，用
来诊断和提供支持，不需要你在场 [Ref. 13](REFERENCIAS.md#ref-13)。统领它的规则是**它以某人的
名义行动**：它的凭证映射到一个负责的人，它做的一切都以那个人的名义记录；它不是一个匿名账
号，是一个有上司的员工。第二件是必做的：带数字的复盘。花了多少，多少待办项，哪些反复折腾，
有哪些事故以及各落在哪级台阶，以及**至少一条对梯子的修改提案**。一次什么都不改变的复盘不是
复盘；让我砍掉了整个代理团队的那一次是样板 [Ref. 6](REFERENCIAS.md#ref-6)。

**任务（驻留代理，如果适用）。**

**发送提示词之前**，用你自己的手，和所有者一起：

- 系统是否需要驻留代理的决定，以及为了什么。Turnera 需要：前台会有问题（"为什么这个患者没收
  到提醒？"），代理读日志就能回答，不需要任何人打电话给开发者。
- 代理在生产里专属的凭证，由你创建，映射到一个有名字的负责人，一开始只读，值在聊天之外、仓库
  之外。
- `docs/LOCKS.md` 和 `docs/DEPLOYMENT.md` 保持最新，以及它解决不了的事情通过哪个渠道（工单、
  邮件）上报。

1. 粘贴：

> We are going to leave you resident in production. First, build the map of the system you will
> need in order to operate it: modules, environments, where each configuration lives, which
> actions are consequential (read `docs/LOCKS.md`), whom to notify. If there are parts of the
> system you cannot see from where you are, tell me; the map must not have hidden gaps. Then
> propose your scope in three levels: read-only and diagnosis; configuration changes with my
> approval; consequential actions behind locks. I choose the level. Your credential acts as the
> person who created it: everything you do is logged under that person's name. Reply in my
> language.

> [zh]
> 我们要把你留在生产里驻留。首先，构建你操作它所需要的系统地图：模块、环境、每项配置住在
> 哪里、哪些动作有后果（读 `docs/LOCKS.md`）、通知谁。如果系统里有你从所在之处看不到的部
> 分，告诉我；地图不能有隐藏的空洞。然后分三个级别提出你的范围：只读与诊断；经我批准的配置
> 变更；锁之后的有后果动作。由我选级别。你的凭证以创建它的那个人的身份行动：你做的一切都以
> 那个人的名义记录。用我的语言回复。

   你在要求它在操作之前先有地图，地图的空洞要声明出来，三个范围级别让你选一个，以及以某人名
   义的凭证。

2. 选级别（起步时，永远是第一个：只读与诊断）。

**发送提示词之前**（收尾提示词）：地图和三个级别已经读过、级别已经选定，以及由你想好的一个在
那个范围之外的具体动作，好让代理去尝试、而你在日志里看到那次拒绝。

3. 用这个收尾：

> Level [1: read-only and diagnosis]. Write in `docs/RESIDENT_AGENT.md` the map, the scope, the
> credential (never its value), and the procedure to request my approval. Then prove, with a real
> attempt recorded in the log, that something outside your scope is rejected.

> [zh]
> 级别 [1：只读与诊断]。把地图、范围、凭证（绝不写它的值）和请求我批准的程序写到
> `docs/RESIDENT_AGENT.md`。然后用一次记录在日志里的真实尝试证明，你范围之外的某件事会被拒
> 绝。

**任务（复盘，永远要做）。**

**发送提示词之前**，用你自己的手：

- 只有你才有的数字，写在 `docs/RETROSPECTIVE_INPUTS.md` 里或准备好在聊天里给出：你投入了多少
  小时（从你的日历里来，不是从记忆里来）、在 AI 工具上花了多少钱（账单）、用了多少持续集成配
  额，以及开始和结束的日期。
- 事故清单，按你记得的样子，附大致日期，用来和代理从待办项和提交里挖出来的东西对照。
- `docs/PENDING.md` 里带文档的已关闭待办项，以及 `docs/DECISIONS.md`：它们是那些数字的来源。

4. 粘贴：

> [The project] is over. Do the retrospective with numbers, not impressions: what it cost
> (tokens, quota, my time), how many pending items, which ones took the most rounds and why,
> which incidents happened and which step of the ladder each falls into, and which step failed
> or was missing. If you lack the data for any figure (my time, for instance), ask me for it or
> mark it as an estimate; do not invent it. End with a concrete proposal to change the ladder:
> which step is modified, how, and which incident justifies it. Write it to
> `docs/RETROSPECTIVE_[date].md`. Reply in my language.

> [zh]
> [项目] 结束了。做复盘，用数字，不用印象：花了多少（token、配额、我的时间），多少待办项，
> 哪些折腾了最多轮以及为什么，发生了哪些事故以及各落在梯子的哪级台阶，哪级台阶失败了或缺
> 失了。如果某个数字你缺数据（比如我的时间），向我索要或标为估计；不要编造。以一条对梯子的
> 具体修改提案结束：修改哪级台阶、怎么改、哪个事故证明它合理。写到
> `docs/RETROSPECTIVE_[日期].md`。用我的语言回复。

   你在要求它带来源的数字，每个事故映射到一级台阶（落不进任何一级的事故就是缺失的台阶），它
   没有的数字向你索要，以及一条对梯子的具体修改提案。

5. 读修改提案。如果你觉得它成立，把它作为改进提案发到
   [Urazuke 仓库](https://github.com/pkuschnirof/urazuke)（见 `CONTRIBUTING.md`）：这就是方法
   从每个项目学习的方式。

**完整性检验。** 地图说了代理**看不到**什么吗？你在日志里看到范围之外的动作被拒绝了吗？凭证
以某个人的名义行动吗？复盘有带来源的数字，还是形容词？每个事故都落在一级台阶上吗？至少有一
条具体的修改提案吗？

**交付物。** `docs/RESIDENT_AGENT.md`（如果适用）和 `docs/RETROSPECTIVE_[日期].md`。

**常见错误。** 给驻留代理一个高级别"好让它什么都能解决"：从只读开始，有证据了再升。一份说一
切顺利的复盘：从来没有一切顺利；它是写给你的，不是写给方法的。还有不发修改提案：第 15 级台
阶在梯子改变时才关闭，不是在文档写完时。

**在引导项目中。** 典型课程里 Turnera 的复盘：六周，学员大约四十小时，二十八个待办项，折腾最
多的是消息相关的（时区和 WhatsApp 供应商）；两起事故，一起在第 8 级台阶（"缺席"状态存在于界
面而不存在于服务器，也不在语义树里），另一起在第 13 级（一次带着测试配置部署到生产，被部署后
的端到端检查发现）。修改提案：让第 13 级台阶的部署例行在提升之前要求展示测试与生产的配置差
异，而不只是"有什么变化"。

---

## 上线生产清单

当十六节课都完成，系统满足这张清单。这是 Urazuke 里"生产级"的操作性定义，可以作为最终检验清
单使用，和所有者一起，不打开代码：

1. 有一份带决定、日期和名字的适格性卡片（P0）。
2. 有一份代理每次会话都读的协作契约，并且验证过它在读（P1、P2）。
3. 项目文件五分钟能读完，并说了系统**不是**什么；有一棵由所有者确认的语义树，每个待办项都挂
   在一个节点下（P2）。
4. 有一份容量估算，原始数据带来源，派生数据带算式，还有"乘以十"的场景（P3）。
5. 骨架在第一周空着部署了，带 CI/CD 链，而且部署运行了两次（P4）。
6. 每个变更都有带详细规格的待办项，每个已关闭的待办项都保留着规格和证据：这是所做之事的文档
   （P5）。
7. 每条业务规则都有所有者、日期和原话，在提交里、待办项里和记录里（P6）。
8. 每个重要的测试都在变绿之前被看到变红；每个流程都有从界面验证后端的端到端测试；完整测试套
   件在每个功能块结束时和生产之前都跑过（P7）。
9. 每张列表只有一个所有者；有一张生产者/消费者地图；有一份带自动检查的反模式记录（P8）。
10. 每个决定过某事的数字都有一把你能运行的、带测试的量具（P9）。
11. 每份报告都把已验证、相信和盲点分开（P10）。
12. 至少有一次由不同会话做的审计，而且它的 P0 是待办项（P11）。
13. 每个有后果的动作都有带红色测试的锁和回退路径；自动化都经过了演练模式（P12）。
14. 测试每次提交跑一次；配置在仓库之外；回滚测过了；没有密钥住在仓库里或未经轮换地留在聊天里
    （P13）。
15. 有三份带日期和版本的手册，从已关闭的待办项搭起来；一个不编程的人照着恢复手册做了；所有者
    对所有流程做了验收测试（P14）。
16. 有一份带数字的复盘和一条对梯子的修改提案（P15）。

如果十六条都是"是"，系统就可以投入使用了。如果有哪条是"否"，你已经知道该回去重登哪级台阶。

---

## 附录 A — 如何评估（给授课者或自评者）

一份简单的评分表，按课，三个级别：

- **未登上**：缺交付物，或某项完整性检验是"否"。
- **已登上**：交付物存在，所有检验都是"是"。
- **已登上并有判断力的证据**：此外，学员还能讲出一个案例，说明代理在这节课做错了什么（假设
  了、编造了、报告过头了）以及他是怎么发现的。这才是课程真正的目标：不是产出物，而是反射。

不评估的东西：代码的质量。没人读它。评估的是证据的质量。

## 附录 B — 课程对各工具的适配

提示词在任何工具里都一样。变的是课程里加到 `docs/WORKING_AGREEMENT.md` 的那些例行放在哪里：

- 在 **Claude Code** 里，例行放在项目的 `CLAUDE.md`（或从那里引入契约），每次会话自动读取。
- 在 **Cursor** 里，放在 `.cursor/rules/`，作为始终生效的规则。
- 在 **Codex CLI** 或 **Gemini CLI** 里，放在根目录的 `AGENTS.md` 或 `GEMINI.md`。
- 在 **Forge** 里，契约和例行是教义，台阶提示词在跨过每道闸门时自动注入，待办项登记册是原生
  的，语义树是项目的知识图谱。用 Forge 上这门课是同一门课，少一些复制粘贴。

第 2 课的阅读测试对所有工具都有效：如果一个新会话不知道系统**不**做什么，工具就没有加载你放
契约的那个文件。

## 附录 C — 这本手册还没有的东西

- 一期上过它的学员。日历的时间、常见错误和引导项目都是从我的三个系统写出来的，不是从学员。
  第一期学员会修正它们（而这，字面意义上，就是第 15 级台阶应用于课程）。
- 适格性准则的权重（第 0 课），我还在校准。
- 引导项目的一份完整 `docs/PENDING.md` 示例，带二十八个已规格化并关闭的待办项，让学员看到一
  个项目结束时所做之事的文档长什么样。
