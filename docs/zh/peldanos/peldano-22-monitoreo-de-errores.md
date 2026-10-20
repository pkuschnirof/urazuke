# 步骤 22 — 错误监控与周期报告：没有任何错误没有待办项（台阶契约）

**阶段：** 运维。
**时机：** 在运维阶段搭建，随第一次部署，和第 21 级一起，建在第 16 级的日志之上；从
那时起它自己跑，带当场的告警和一份与所有者一起读的周期报告。每个新错误作为纠正型待办项进入循
环，并用复现它的红色测试来关闭。在遗留系统里，第一次阅读就是基线：第一天就已经存在的错误带着速
度标记变成待办项，而且没有任何一个会在没有一个说明为什么容忍它、容忍到什么时候的待办项的情况下
留作"已知"。
**形式：** 一次长发送用来搭建；之后是周期性的例行。
**规模：** 在任何有用户的项目里必需：集中捕获和报告不可协商；当场的告警，按比例。

## 用途

一个生产中的系统会产生没有任何用户报告的错误：那个看到白屏又重试了一次的人，那个失败了而没人看
的夜间任务，那个返回了错误而被代码吞掉的外部调用。如果我不捕获它们，它们就不存在，直到它们存在
得太多。这级台阶是第 21 级的对应面：那个看守性能，这个看守错误，而且两个都终结在同一个地方，循
环，作为纠正型待办项。背后的规则有两条。**没有任何错误没有待办项**：一个新错误开一个待办项，并
用复现它的红色测试来关闭，就像演进之路的纠正模式所要求的那样。还有，**不存在"已知错误"**，除非
有一个待办项说明为什么容忍它、容忍到什么时候；"那个错误一直都在"是一个系统腐烂时所用的句子。被
报告为成功的认证错误 [Ref. 43](../REFERENCIAS.md#ref-43)，以及一直到根因的四轮折腾
[Ref. 22](../REFERENCIAS.md#ref-22)，是两个前身：第一个，关于错误如果不由机器捕获就会藏起来；第二
个，关于一个没有复现的错误会被修好几次。

**如果你是初学者。** 一个*错误*是系统试着做而没做成的任何事情：一个没加载出来的界面、一个中断
了的夜间任务、一次失败了的对其他服务的调用。一个*未处理异常*是代码没有预见到、并且会中断它正在
做的事的错误。*捕获*一个错误，就是把它连同它的全部数据（什么时候、在哪个版本、带什么标识符，还
有*调用栈*，也就是程序一直到出错为止的步骤清单）保存在一个集中的地方，而不是让它消失在某个用户
的屏幕上。*分组*是把同一个错误发生的一千次合并成一条带计数器的条目。而*按流程的错误率*是：每一
百次有人登记预约，其中有多少次失败了。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 可观测性（16）：错误带着关联标识符、版本和执行者过来。
- 锁的表格（14）：有后果动作里的错误是立即告警。
- 已部署的生产（15），用户的浏览器也包含在捕获里。
- 告警渠道和报告周期，和第 21 级共用。

## 2. 提示词

**初始（搭建并演示）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/OBSERVABILITY.md`（16）已收尾：错误必须带着标识符、版本、环境和执行者出来。
- `docs/LOCKS.md`（14）：有后果动作的清单，它们的错误是当场告警。
- 渠道和报告周期，和第 21 级台阶一样，和所有者一起决定；以及一个已知错误每小时出现多少次你就想
  要告警，填进提示词的空位。
- 错误保存在哪里、保存多久（和日志同一个地方，或者一个错误捕获服务），由你决定，带着它们不含个
  人数据这条规则。
- 最低可接受状态：错误已经带着标识符出来（16），而且有一个有人在读的渠道。

> We are going to make sure that no error in production goes unseen. Using the records of step 16,
> set up: (1) centralized capture of every error and unhandled exception in the backend, in the jobs
> and in the user's browser, with the correlation id, the version, the environment, the actor (never
> personal data) and the stack; (2) grouping of errors by cause, so that one defect is one entry,
> with its count, first and last occurrence, versions affected and the flows it touches; (3) alerts
> to [channel] for every new error type, for a known error that crosses [N] occurrences per hour,
> and for any error inside a consequential action of `docs/LOCKS.md`; (4) a cyclic report, [weekly],
> generated automatically, with: new errors, recurring errors and their trend, the errors fixed in
> the period with their pending item, the error rate per flow against the previous period, and what
> you propose for each open one; (5) the rule that every new error type opens a corrective pending
> item, closed with the test that reproduces it in red, and that there is no "known error" without a
> pending item that says why it is tolerated and until when. Show me one error provoked on purpose
> in the test environment, in the browser, followed by its id to the backend record, the alert and
> the report. Tag every captured error with its source, and keep the errors of the tools that watch
> the system (the panel, the resident agent, the monitoring itself) apart from the errors of the
> system: the report lists them in a separate section, and only the system's errors open pending
> items. Document it in `docs/MONITORING.md`. Reply in my language.

> [zh]
> 我们要确保生产里没有任何错误不被看见。用第 16 级台阶的记录，搭建：(1) 对后端、任务和用
> 户浏览器里每个错误和未处理异常的集中捕获，带关联标识符、版本、环境、执行者（绝不含个人
> 数据）和调用栈；(2) 按原因对错误分组，使得一个缺陷是一条条目，带它的次数、第一次和最后
> 一次出现、受影响的版本和它触及的流程；(3) 向 [渠道] 发告警：每一个新类型的错误、一个已
> 知错误超过每小时 [N] 次、以及 `docs/LOCKS.md` 中某个有后果动作内部的任何错误；(4) 一份
>  [每周] 自动生成的周期报告，内容包括：新错误、复发错误及其趋势、本期修好的错误及其待办
> 项、按流程的错误率对比上一周期，以及你对每个还开着的错误的提议；(5) 这条规则：每个新类
> 型的错误都开一个纠正型待办项，用复现它的红色测试来关闭，而且不存在"已知错误"，除非有一
> 个待办项说明为什么容忍它、容忍到什么时候。给我看一个在测试环境里、在浏览器里故意引发的
> 错误，被它的标识符一路跟到后端记录、告警和报告。给每个捕获的错误标注来源，并把观测系统的工
> 具（面板、常驻代理、监控本身）的错误与系统本身的错误分开：报告把它们列在单独一节，只有系统
> 的错误才会打开待办项。把它记进 `docs/MONITORING.md`。用我的语言回复。

**工具的错误不是系统的错误。** 集中捕获按来源区分：系统的错误和观测它的工具（面板、常驻代理、监控本身）的错误以不同来源保存，报告把它们列在不同的节里，只有系统的错误才会打开待办项。在 Turnera 练习中，第一份周期报告打开了六个"bug"，其实是 Forge 面板在跟一个已关闭的服务器通信。（决定 D-038。）

我在要求什么：在错误藏身的三个地方（后端、任务、浏览器）都做捕获，带上第 16 级的标识符以便跟踪
它们；分组，没有它报告就是一万行的清单；三类要紧的告警（新的、在长大的复发的、有后果的）；带按
流程错误率的报告，那是所有者看得懂的数字；两条规则；以及从头到尾的演示，从浏览器到报告。

**每个周期的例行（写进协作契约）：**

**发送提示词之前**，你手边必须有这些：

- 刚生成的错误周期报告，由你读过。
- `docs/PENDING.md` 放在手边，用来核实复发的那些有待办项。
- 最低可接受状态：你在粘贴提示词之前读过报告。

> With every cyclic error report: go through it with me; open the corrective pending items for
> the new errors, each with the way to reproduce it; confirm that every recurring error has a
> pending item or a written reason with a date; and tell me which errors disappeared and why,
> with the commit that fixed each one. An error that disappeared without a fix is not solved: it
> is hiding, and it stays in the report until its cause is known.

> [zh]
> 每一份错误周期报告：和我一起走一遍；为新错误开纠正型待办项，每个带上复现它的方式；确认
> 每个复发错误都有一个待办项或者一条带日期的书面理由；并告诉我哪些错误消失了、为什么，附
> 上修好每一个的那次提交。一个没有修复就消失的错误并没有被解决：它藏起来了，而且它会留在
> 报告里，直到它的原因被弄清楚。

我在要求什么：周期的纪律，以及关于消失的错误的那条规则，它是最反直觉、也最有价值的一条：一个自
己走掉的错误会自己回来。

## 3. 预期结果

- 对后端、任务和浏览器的集中错误捕获，按原因分组，没有个人数据。
- 按新错误、在长大的复发错误和有后果的错误发出的告警。
- 带按流程错误率的周期报告。
- `docs/MONITORING.md` 完整（和第 21 级一起）；写进契约的例行。
- 每个开着的错误一个待办项；没有任何"已知"错误没有待办项。

## 4. 完整性检验

- 你自己在测试环境的浏览器里引发一个错误（一个你知道会失败的动作）：它带着你的标识符出现在捕获
  里了吗，告警到你手上了吗？
- 读最后一份报告：有没有哪个复发错误既没有待办项也没有理由？
- 从报告里挑一个"已修好"的错误：它的待办项里有那个把它复现成红色的测试吗？
- 按流程的错误率在不在，相对上一周期是降了还是升了？
- 在错误捕获里搜一个个人数据：不应该有。

## 5. 警报信号

- 有真实用户的情况下，生产里一个月零错误。没有这样的系统；捕获没有看到浏览器或者任务。
- 一个有一千次出现的错误，附一条"已知，不影响"的注释。没有待办项，没有日期。
- 错误靠重启服务来"修好"。它们消失，然后回来。
- 错误报告和资源报告由不同的人读，而且没人把它们交叉看：第 21 级的那条慢查询就是第 22 级那个等
  待超时的原因。
