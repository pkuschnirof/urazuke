# 步骤 13 — 作为产品一部分的持续集成、环境、密钥与部署（台阶契约）

**阶段：** 运维（搭在第 4 级台阶的骨架上；每次基础设施变更时修订）。
**形式：** 搭建时一次发送；每次部署的例行。
**规模：** 所有有用户的项目必需。小项目里，"持续集成"可以是一个 GitHub action，"环境"可以
是同一台服务器上的两个文件夹；不可协商的是测试自动运行、配置不在仓库里、有回退路径。

## 用途

让上线生产成为一个可复现的包：测试运行**一次**，配置住在仓库之外，密钥不到处流转。它避免
每次提交跑三遍的测试（16 天烧掉 2,000 分钟配额）、打印在转录文本里的数据库密钥、只认识第
一个域名的 CORS，以及被测试套件覆盖的配置。

关于密钥有一条值得当作反射采纳、没有例外的规则：**在聊天、日志或提交中被看到的密钥就不再
是密钥**。"没人看见"或"后来删了"都不重要。轮换它。轮换花十分钟；查明是否有人用过是不可能
的。

## 1. 所需上下文

- **环境与访问调研**，以通用方式：有哪些环境（测试、生产），它们在哪里运行，谁有访问权，
  如何从一个提升到另一个，有哪些密钥、今天住在哪里，有多少持续集成配额。代理评估是否足够
  并提问。
- 带持续集成和测试环境部署的骨架（第 4 级台阶）。

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

我们在要求什么，逐条：开始前的访问权；每次提交**只跑一次**测试（跑三遍正是烧光配额的原
因）；只打包的部署；仓库之外的配置；作为可重复流程的提升；**测试过的**回滚（从没测过的
回滚不存在）；防止提交密钥的锁；以及给人看的文档，这是第 14 级台阶应用于基础设施。

**每次部署的例行：**

> Before touching production: the test environment is green with the same version; the
> rollback is ready; and tell me what changes in the configuration. After deploying: show me
> the version running in production and an end-to-end check on production, read-only.

我们在要求什么：三个前提（同一版本在测试环境是绿的、回滚已就绪、配置变化已告知）和两个事
后证据（正在运行的版本，以及一次不写任何东西的端到端检查）。

**如果密钥出现在了聊天或提交里：**

> That secret is compromised: rotate it now, tell me everywhere else it was used, and add the
> check that would have caught it.

我们在要求什么：立即轮换、它还在哪些地方用过的清单，以及本可以拦住它的检查，让下次它到不
了聊天。

## 3. 预期结果

- 每次提交只跑一次的持续集成，附一次运行的链接。
- 等待集成结果、只打包的部署；已测量：前后各花多久。
- 仓库之外的配置；仓库里只有一个没有值的示例。
- `docs/DEPLOYMENT.md`：如何部署、提升和回退，逐步，给人看。
- 至少测试过一次的回滚，附证据。
- 启用的反密钥检查（一次上传尝试被拒）。
- 每月消耗的持续集成配额记录。

## 4. 完整性检验

- 每次提交测试套件跑几次？必须是一次。要链接。
- 仓库里有真实的配置值（密钥、密码、内部 URL）吗？让代理搜索并给你看空的结果。
- 没有代理，你能独自照着 `docs/DEPLOYMENT.md` 做吗？带着这个问题读它。
- 回滚测试过了吗？什么时候？有什么证据？
- 项目期间有没有把密钥粘贴到聊天里？有的话，轮换了吗？
- 你知道这个月还剩多少持续集成配额吗？

## 5. 警报信号

- 生产部署"手动、快速，因为是个小改动"。小改动才会弄坏生产，因为没人测它们。
- 配置的示例文件里有看起来像真的值。很可能就是真的。
- 没人能说出上次测试回滚是什么时候。
