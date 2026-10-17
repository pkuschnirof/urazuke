# 步骤 12 — 失败即关闭、锁与零静默损害（台阶契约）

**阶段：** 运维（在系统作用于世界之前设计；每有新的有后果的动作就修订）。
**形式：** 对话：代理列出有后果的动作，所有者确认哪些上锁、上什么锁。
**规模：** 一旦系统做不可逆的事（扣款、发送、删除、批准）就必需。只读系统可以跳过；在它获
得第一个作用于世界的按钮的那一刻，这级台阶就成为最重要的。

## 用途

让系统在疑问或故障面前**不**行动，并且说出来。听起来显而易见，却与软件默认的行为相反，软件
在疑问面前会继续。它避免重复扣款、不经人手的自动批准、上传凭证的 `git add -A`，以及删除客
户数据。

这个原则有个名字，"失败即关闭"（fail-closed），来自物理安全：断电时保持关闭的安全门。相反
的"失败即打开"（fail-open）是会打开的门。软件里大多数东西默认是失败即打开：校验失败，代码
继续；服务不响应，假定一切正常。方法把默认反过来：**有疑问，就不做**。它既适用于系统，也适
用于运维它的代理。

## 1. 所需上下文

- **有后果动作的调研**，以通用方式命名：系统做什么会扣款、发送、批准、删除，或通知外部的
  人；做两次会怎样；做错会怎样；如何撤销。业务方知道；代理评估列表是否完整并提问。
- 代理自身能对系统做哪些动作（如果它是嵌入的）。

## 2. 提示词

**初始：**

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

我们在要求什么：比较业务方说的和代码做的（没人记得的动作就在那里出现）；这级台阶形式的
完整性条款：两份列表的差异要提问，不要自行解决；每个动作的可逆性、锁和回退路径；以及写进
提示词的失败即关闭总规则，让它留在表格和代码里。

**收尾：**

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

我们在要求什么：每把锁一个**先证红**的测试（没有锁，动作发生；有锁，不发生），这是第 7 级
台阶应用于安全；最终的表格；以及每个新自动化的演练模式规则，它让你在放手之前看到它本会做
什么。

## 3. 预期结果

- `docs/LOCKS.md`：每个有后果的动作一行：它做什么、是否可逆、锁、回退路径、谁何时批准。
- 每把锁一个测试，先证红，验证有疑问时动作不发生。
- 新自动化以演练模式启动，附"本会做"的记录。
- 如果代理是嵌入的：它的权限写下来（能读什么、能改什么、什么需要批准）。

## 4. 完整性检验

- 每个扣款、发送、批准或删除的动作都在表里吗？想一个不在的，问一问。
- 每把锁有先证红的测试吗？（"没有锁，动作发生；有锁，不发生。"）
- 每个不可逆动作都有写下的回退路径吗？没有的话，需要双重保险。
- 新自动化是以演练模式启动的吗？启用之前你看过"本会做"的记录吗？
- 嵌入的代理尝试权限之外的事会怎样？让它试一下，并给你看日志里的拒绝。

## 5. 警报信号

- 一个自动化从"不存在"直接变成"自己在跑"，没有经过演练模式。
- 日志里没有任何"因疑问未执行"的条目。要么系统从不怀疑（不可能），要么它怀疑了也照做。
- 一把锁可以用一个"测试用"参数绕过。那个参数会留在生产里。
