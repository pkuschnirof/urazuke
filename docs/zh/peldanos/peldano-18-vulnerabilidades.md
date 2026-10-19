# 步骤 18 — 漏洞的扫描与解决，放进链条并带日程（台阶契约）

**阶段：** 上线生产。
**时机：** 在上线生产阶段，第 15 级之后（扫描跑在持续集成里），第一次部署之前：没有任何一个
P0 还开着的时候才提升。之后，在每次 push 时，以及按它自己的日程（每周）跑，哪怕没有 push，因为
新漏洞会在你什么都不改的情况下出现。在遗留系统里，第一次运行是 N3 的一部分（审计的安全维度），
发现的东西带着速度标记进待办队列。
**形式：** 一次长发送用来搭建和运行；之后自动，带一份由你来读的报告。
**规模：** 在任何将会有用户的项目里必需：依赖扫描和密钥扫描不可协商；静态分析和配置基线，按比
例。

## 用途

第 13 级台阶的审计每隔一段时间用新鲜的眼睛看整个系统；这级台阶只看一件事，安全，而且一直看、由
机器看。它们是互补的：审计找需要判断力的东西（一道谁都不该有的管理员入口
[Ref. 40](../REFERENCIAS.md#ref-40)）；扫描找需要恒心的东西（昨天还没有已知漏洞、今天有了的那个依
赖 [Ref. 41](../REFERENCIAS.md#ref-41)）。第一次正式的安全审计让我确信安全是一项周期性的例行，而
不是一张打一次勾的清单 [Ref. 23](../REFERENCIAS.md#ref-23)；这级台阶就是那项例行做成了机器。

还有一条规则我希望写下来：**一次依赖更新就是一次变更**，它和其他任何变更一样要走循环。"升了个
版本把漏洞关掉"而没有回归、没有端到端，是在星期五弄坏生产最常见的方式。

**如果你是初学者。** 一个*漏洞*是一个别人可以用来进来、偷数据，或者让系统做它不该做的事的缺
陷。这级台阶由机器去找的有四类。在*依赖*里：你的系统用的别人的软件组件（有公开的数据库列出哪些
有已知缺陷，用一个 CVE 编号标识）。在*代码*里：*静态分析*不执行代码地读它，寻找危险模式，比如
一次*注入*（用户在表单里写的东西被数据库当成一条命令来解释）。在*历史*里：一个曾经被保存进仓库
的密钥（一个密码、一把钥匙）即使后来被删掉也还在那里。还有在*配置*里：本来不需要却开着的端口、
默认密码、缺失的*安全响应头*（服务器发给浏览器、用来保护它的指令）。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- 持续集成（第 4 和 15 级台阶），扫描在那里跑。
- 环境调研：什么服务器、什么容器、哪些端口，用于配置基线。
- 之前的审计（13，或 N3），以免报告已经知道的东西。
- 你关于什么是 P0 的判断：能让人进来的、能暴露个人数据的、能不经控制就收钱或发送的。

## 2. 提示词

**初始（搭建、运行、提议）：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- 持续集成在每次 push 时都在跑（第 4 和 15 级台阶），而且配额够用：扫描会给每次运行加上几分
  钟；去查一下你还剩多少。
- `docs/ENVIRONMENTS_SURVEY.md`，写着服务器、容器（如果有）、暴露的端口和谁管理域名，好让代理
  知道该套用哪条基线。
- `docs/AUDIT_[日期].md`（第 13 级台阶或 N3），好让它不报告已知的东西。
- 你那两行的 P0 判断准则，填进提示词的空位。对大多数系统来说：能不带凭证就进来的、能暴露个人数
  据的、能不经控制就收钱、发送或删除的。
- 代理对服务器的读访问权，用于配置基线；如果你不给，那一部分就算作未扫描，而且它必须说出来。
- 最低可接受状态：持续集成在跑，你知道配额，而且你写下了什么是 P0。

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine. Reply in my language.

> [zh]
> 我们要在这个系统里扫描漏洞，并在生产之前修掉要紧的那些。在持续集成里搭建，在每次 push
> 时、也按每周日程运行：(1) 对每个依赖在已知漏洞数据库上做扫描；(2) 对代码做静态分析，查
> 常见缺陷类别（注入、不安全的反序列化、路径穿越、弱加密、写死在代码里的密钥、不安全的默
> 认值）；(3) 对整个仓库历史做密钥扫描；(4) 对服务器和容器的配置做一次基线核查（暴露的端
> 口、默认凭据、权限、安全响应头、传输加密）。现在就全部跑一遍，并写出
> `docs/SECURITY_[日期].md`，列出每一项发现：在哪里、风险、证据、优先级（P0 按我的准则必
> 须马上修：[准则]；P1 在生产之前；P2 有条件就修），以及是否存在修复（一次升级、一个补
> 丁、一处配置变更）。如果有一部分从你所在的位置扫描不到，说出来并标为未扫描；不要把它算
> 作干净。然后为每个 P0 和 P1 提议修复，每个一个待办项。先不要应用任何升级：一次升级是一
> 次变更，要走完整的例行。用我的语言回复。

我在要求什么：四层扫描（依赖、代码、历史里的密钥、配置），放进链条**并带日程**，因为新漏洞不会
等你下一次 push；一份有第 13 级台阶那种形状的报告，带着"未扫描"而不是"干净"的条款；由我给出的
P0 准则；以及不走循环就不许更新的禁令，那是避免星期五出事的东西。

**收尾（修复并变成闸门）：**

**发送提示词之前**，你手边必须有这些：

- `docs/SECURITY_[日期].md`，由你读过，其中两项发现核实过（向它要证据）。
- 填进提示词空位的已批准修复清单；对每次依赖更新，清楚它是一次变更，要跑回归和端到端。
- 最低可接受状态：没有任何一个 P0 没有裁决。

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.

> [zh]
> 修复 [清单]，每项作为自己的待办项，在测试适用的地方带上它被证明为红的测试（一次不再通
> 过的注入、一个现在存在的响应头、一个现在会被拒绝的密钥），而且在每次升级之后回归套件和
> 端到端套件都是绿的。重新跑一遍扫描，给我看它在 P0 和 P1 上是干净的。把扫描做成
> `docs/GATES.md` 里的一道闸门：有 P0 开着就不往生产提升，而且一个新的 P1 自动开一个待办
> 项。把策略、日程和没有覆盖到的东西记进 `docs/SECURITY.md`。

我在要求什么：一项修复一个待办项，在能做到的地方带上第 8 级台阶的红（一个没有测试就修好的漏洞
会在下一次重构时回来）；重跑一遍扫描作为证据；以及变成闸门，那是让这级台阶在没人看的时候仍然活
着的东西。

## 3. 预期结果

- 四层扫描在每次 push 和每周运行。
- `docs/SECURITY_[日期].md`，带发现和未扫描的部分；`docs/SECURITY.md`，带策略、日程、闸门和覆
  盖范围。
- P0 和 P1 都修好了，每个带它的待办项，适用时带它的测试。
- `docs/GATES.md` 里的那道闸门。

## 4. 完整性检验

- 向它要最近一次扫描运行的链接：是绿的吗，是哪一天的？
- 报告说了它**没有**扫描什么吗？
- 每个 P0 都有带证据关闭的待办项，或者带日期开着的待办项吗？
- 让它在一个分支里故意引入一个有已知漏洞的依赖：链条会变红吗？
- 你知道下一次计划的扫描什么时候跑吗？

## 5. 警报信号

- 一个存在超过一个月的系统，扫描第一次就干净通过。这几乎从来不是真的：少了一层，或者只扫了分支
  没扫历史。
- 为了"把发现关掉"，在一次提交里更新了十个依赖。那次提交没有前也没有后；它是等着发生的那个星期
  五。
- 扫描有了，但不是闸门：它产出没人读的报告。
- 有一个"被接受"的 P0，没有待办项、没有日期、没有签字。
