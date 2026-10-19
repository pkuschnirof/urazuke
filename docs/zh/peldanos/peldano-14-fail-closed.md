# 步骤 14 — 失败即关闭、锁与零静默损害（台阶契约）

**阶段：** 上线生产。
**时机：** 在上线生产阶段，在构建任何收费、发送、批准或删除的功能**之前**；每有一个新的有后
果的动作就复查。新的自动化从演练模式起步，看过它几天的记录后再启用。
**形式：** 对话：代理列出有后果的动作，你确认哪些上锁、上什么锁。
**规模：** 系统一做不可逆的事（收费、发送、删除、批准）就必需。只读的系统可以跳过；在它获得
第一个作用于现实世界的按钮那一刻，这级台阶变成最重要的一级。

## 用途

让系统面对疑问或故障时**不**行动，并且说出来。听起来显而易见，但它是软件默认行为的反面，软件
面对疑问会继续往前走。它避免重复收费、不经人就自动批准、把凭证上传的 `git add -A`，以及删
除客户数据。我在互助会放的锁是范本：带双重保险的紧急按钮、演练模式下的自动批准器、带守卫的
哨兵 [Ref. 28](../REFERENCIAS.md#ref-28)；还有让一次故障只让一行没有按钮、而不是弄坏整个列
表的反射 [Ref. 25](../REFERENCIAS.md#ref-25)。

这个原则有名字，"失败即关闭"，来自物理安防：断电时保持关闭的安全门。反面，"失败即打开"，
是会打开的门。在软件里大多数东西默认是失败即打开：验证失败，代码继续；服务没响应，就当一切
正常。方法反转了默认：**有疑问，就不**。它既适用于系统，也适用于操作系统的代理。

## 1. 所需上下文

下面这份是通用清单。你在每条提示词之前必须已经做好的具体文件，连同它们的内容和最低状态，在第
2 节里，在每条提示词前面的"发送提示词之前"方框里。

- **有后果动作的调研**，以通用方式这么称呼：系统做的哪些事会收费、发送、批准、删除或通知外
  部的人；做两次会怎样；做错会怎样；怎么撤销。业务知道；代理评估清单是否完整并提问。语义
  树有帮助：每个有后果的流程都在那里。
- 代理本身能对系统做哪些动作（如果它是嵌入的）。

## 2. 提示词

**初始：**

**发送提示词之前**，下面这些必须已经存在，而且是你（或业务方和你一起）来做，不是代理：

- `docs/CONSEQUENTIAL_ACTIONS_SURVEY.md`：有真实后果的动作调研，和领域所有者一起写。系统做或
  将要做的事情里，哪些会收钱、发送、批准、删除，或者通知外面的某个人；以及对每个动作：做两次
  会怎么样，做错了会怎么样，怎么撤销，谁应该有权做。语义树里的流程给你一份起始清单：一个一个
  走过去。提示词把它叫作 "the survey of consequential actions"，没有给路径：就用这个名字保存，
  或者在聊天里告诉它在哪儿。
- 如果代理会是嵌入的或驻留的：它自己能对系统做哪些动作，写在同一份调研的单独一节里。
- `docs/SEMANTIC_TREE.md`，保持最新。
- 最低可接受状态：树里每个对世界产生作用的流程都在清单上，并附有它的"做两次会怎么样"。

> We are going to decide which actions of the system need a lock. Read the survey of
> consequential actions, and go through the code looking for everything that charges, sends,
> approves, deletes or notifies outwards. Compare the two lists: if the code has actions the
> survey does not mention, or the other way round, ask me before going on. For every action
> propose: whether it is reversible, which lock it gets (explicit confirmation, double safety,
> dry-run mode, daily limit, a human in the loop), and what the way back is if it goes wrong.
> General rule: on any doubt or failure along the way, the action is NOT executed and the reason
> is logged. Present me the table; I confirm lock by lock. Reply in my language.

> [zh]
> 我们要决定系统的哪些动作需要锁。读有后果动作的调研，并走遍代码，找出一切收费、发送、批
> 准、删除或向外通知的东西。比较两张清单：如果代码里有调研没提到的动作，或者反过来，在继
> 续之前问我。对每个动作提议：它是否可逆、它上什么锁（显式确认、双重保险、演练模式、每日
> 上限、回路中的人），以及出错时的回退路径是什么。总规则：途中有任何疑问或故障，动作就不
> 执行，并记录原因。把表呈给我；我逐个锁确认。用我的语言回复。

我在要求什么：业务说的和代码做的之间的交叉（没人记得的动作就在那里浮现）；适配这级台阶的完
整性条款：两张清单之间的差异要问，不要自行解决；每个动作的可逆性、锁和回退路径；以及写进提
示词的失败即关闭总规则，让它留在表里和代码里。

**收尾：**

**发送提示词之前**，你手边必须有这些：

- 代理呈上的那张表，和所有者一起一把锁一把锁地读过；对每一行，你的确认或你的修改，写好准备填
  进提示词的 [list]、[X] 和 [Y] 三个空。
- 最低可接受状态：没有哪一行缺裁决。一把没有确认的锁，就是一把不会被实现的锁。

> I confirm locks [list]; change [X] to [Y]. Implement them with one test per lock that proves
> that, under the doubt condition, the action does NOT happen (proved red against the version
> without the lock). Record the final table in `docs/LOCKS.md`. And for any new automation:
> dry-run mode first, logging what it would have done, until I enable it.

> [zh]
> 我确认锁 [清单]；把 [X] 改为 [Y]。实现它们，每个锁一个测试，证明在疑问条件下动作不发生
> （对没有锁的版本先证红）。把最终的表记录到 `docs/LOCKS.md`。对任何新的自动化：先演练模
> 式，记录它本会做什么，直到我启用它。

我在要求什么：每个锁的测试**先证红**（没有锁，动作发生；有锁，不发生），那是第 8 级台阶应用于
安全；最终的表；以及所有新自动化的演练模式规则，那是让你在放手之前看到它本会做什么的东西。

## 3. 预期结果

- `docs/LOCKS.md`：每个有后果的动作一行：它做什么、是否可逆、锁、回退路径、谁批准的、何时。
- 每个锁一个先证红的测试，验证面对疑问时动作不发生。
- 新的自动化从演练模式起步，附"本会做"的记录。
- 如果代理是嵌入的：它的权限写下来（能读什么、能改什么、什么需要批准）。

## 4. 完整性检验

- 每个收费、发送、批准或删除的动作都在表里吗？想一个不在的，问一问。
- 每个锁有它的红色测试吗？（"没有锁，动作发生；有锁，不发生。"）
- 每个不可逆的动作都写了回退路径吗？没有的话，它需要双重保险。
- 新的自动化从演练模式起步了吗？启用之前你看过"本会做"的记录吗？
- 嵌入的代理尝试权限之外的事会怎样？让它试一下，并给你看日志里的拒绝。

## 5. 警报信号

- 一个自动化从"不存在"直接到"自动运行"，没有演练模式的时期。
- 日志里没有任何"因疑问未执行动作"的条目。要么系统从不怀疑（不可能），要么它怀疑时照样往
  前走。
- 一个锁可以用一个"用于测试"的参数跳过。那个参数会留在生产里。
