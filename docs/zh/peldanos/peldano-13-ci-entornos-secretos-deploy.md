# 步骤 13 — 持续集成、环境、密钥与作为产品一部分的部署（台阶契约）

**阶段：** 运维。
**时机：** 集成链和到测试环境的部署在第 4 级台阶搭建。面向生产的收尾——真实环境、服务器上
的密钥、提升、经测试的回滚、防密钥的锁——在上线阶段做，在审计和锁之后。每次部署的例行贯穿
整个运维。
**形式：** 搭建时一次发送；每次部署时例行。
**规模：** 所有有用户的项目必需。在小项目里，"持续集成"可以是一个 GitHub action，"环境"可
以是同一台服务器上的两个文件夹；不可协商的是测试自动运行、配置不在仓库里、有回滚。

## 用途

让到达生产成为一个可复现的包：测试跑**一**次，配置活在仓库之外，密钥不到处乱跑。它避免每次
提交跑三遍测试和烧光的配额 [Ref. 39](../REFERENCIAS.md#ref-39)、因发现太晚而靠一个个待办项
硬化的部署 [Ref. 32](../REFERENCIAS.md#ref-32)，以及贴进聊天的密钥
[Ref. 42](../REFERENCIAS.md#ref-42)。

关于密钥有一条规则，把它当作反射，无例外：**在聊天、日志或提交里出现过的密钥不再是密钥**。
"没人看到"或"后来删了"都不重要。轮换。轮换花十分钟；查明是否有人用过它是不可能的。

## 1. 所需上下文

- **环境与访问调研**，以通用方式：有哪些环境（测试、生产），它们运行在哪里，谁有访问权，如何
  从一个提升到另一个，存在哪些密钥、今天住在哪里，有多少持续集成配额。代理评估是否足够并
  提问。
- 带持续集成和到测试环境部署的骨架（第 4 级台阶）。

## 2. 提示词

**初始：**

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
> 我们要收尾通往生产的路。读环境与访问调研。评估你是否具备安全部署到生产所需的东西（访问
> 权、域名、密钥住在哪里、如何回滚）；如果缺什么，问我。然后搭建：(1) 持续集成每次提交恰
> 好运行一次完整测试套件；(2) 部署等待那次运行的结果，只打包和上传，不再运行测试；(3) 每
> 个环境的配置活在服务器上（环境文件或保险库），绝不在仓库里；(4) 一份从测试环境提升到生
> 产的书面流程，可以运行两次而不弄坏任何东西；(5) 回滚，经过测试；(6) 一个阻止提交密钥的
> 自动检查。把这一切写进 `docs/DEPLOYMENT.md`，让一个人不靠你也能手工完成。用我的语言
> 回复。

我在要求什么，逐条：开始前的访问权；测试每次提交**只跑一次**（跑三遍就是烧光配额的原因）；
只打包的部署；仓库之外的配置；作为可重复流程的提升；**经过测试**的回滚（从没测过的回滚不存
在）；提交里防密钥的锁；以及给一个人看的文档，那是第 14 级台阶应用于基础设施。

**每次部署的例行：**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

> [zh]
> 动生产之前：测试环境用同一版本是绿色的；回滚已就绪；并告诉我配置里有什么变化。部署之
> 后：给我看生产中运行的版本，以及一次对生产的只读端到端检查。

我在要求什么：三个前置条件（同一版本在测试环境绿色、回滚就绪、配置变化已宣布）和两个事后证
据（运行中的版本，以及一次不写任何东西的端到端检查）。

**如果某个密钥出现在聊天或提交里：**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

> [zh]
> 那个密钥已经泄露：现在就轮换它，告诉我它还在哪些地方用过，并加上本可以拦住它的检查。

我在要求什么：立即轮换，它还在哪些地方的清单，以及本可以检测到它的检查，让下次它到不了聊天。

## 3. 预期结果

- 持续集成每次提交只跑一次，附一次运行的链接。
- 等待集成、只打包的部署；测过：之前和之后各花多久。
- 配置在仓库之外；仓库里只有一个没有值的示例。
- `docs/DEPLOYMENT.md`：如何部署、提升和回滚，逐步，给一个人看。
- 回滚至少测过一次，附证据。
- 防密钥检查生效（一次上传密钥的尝试，被拒绝）。
- 每月消耗的持续集成配额记录。

## 4. 完整性检验

- 测试套件每次提交跑几次？必须是一次。要链接。
- 仓库里有没有任何真实的配置值（密钥、密码、内部 URL）？让代理搜索并给你看空的搜索结果。
- 你一个人、没有代理，能照着 `docs/DEPLOYMENT.md` 做吗？带着这个问题读它。
- 回滚测过了吗？什么时候？有什么证据？
- 项目期间有没有密钥贴进过聊天？有的话，轮换了吗？
- 你知道这个月还剩多少持续集成配额吗？

## 5. 警报信号

- 部署到生产是"手工、快速，因为是个小改动"。小改动才是弄坏生产的，因为没人测它们。
- 配置示例文件里有看起来像真的值。很可能就是真的。
- 没人说得出上一次测试回滚是什么时候。
