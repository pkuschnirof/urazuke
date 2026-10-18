# 步骤 9 — 构建之前先测量，用一把自己也要被验证的量具（台阶契约）

**阶段：** 循环。
**时机：** 每当一个待办项依赖一个数字或一个原因假设时，在构建**之前**。在启动阶段，容量估算
是第一个案例。在小项目里，"测量"就是用一条命令数一数，并把数字连日期记下来。
**形式：** 每次测量一次发送；当假设是你的时，有时是一次对话。
**规模：** 按比例。棘轮和查询预算是给有数据量的系统的。不随规模改变的是：没有一个决定什么
的数字出自印象。

## 用途

让每个喂给决定的数字都出自一个带测试的程序，而不是文本搜索、印象，或者"我觉得大概一百
个"。并让量具本身被审计，因为量具会撒谎：我的一把量具在计数器为零时看不见 84 次调用，另一
把说 27 而其实是 44 [Ref. 35](../REFERENCIAS.md#ref-35)、[Ref. 36](../REFERENCIAS.md#ref-36)。
我在那之后写下的五条规则是：带守卫的量具；仪器不存在就构建它；双向审计；近似的要标出来；执
行者验证规划者的数字。

这是我最晚形式化的一级台阶，原因值得一说：我以为"动手前先测量"这么基本的工程常识，模型会
自己应用。它不会。模型非常善于产出带数字的断言（"那种循环大约有 120 个"），而那些断言在测过
和估过的时候听起来一模一样。你没法靠语气分辨。唯一的办法是要求仪器："你用什么测的？给我看
命令。"没有命令，那就是印象，不管它有几位小数。这些规则是我在会话中纠正代理时强制推行的，
在它们成为教义之前 [Ref. 45](../REFERENCIAS.md#ref-45)。

## 1. 所需上下文

- 假设，你的或代理的："我觉得问题是 X"、"应该有一百来个"。
- 对要测量之物的访问权：代码、只读的数据库、日志。
- 仓库里已有的量具，如果有。

## 2. 提示词

**初始：**

> Before building anything, we are going to measure. The hypothesis is: [X]. Write a meter (a
> script that lives in the repository) that measures [the quantity], and a test for the meter
> that checks it against a known case where the answer is known in advance. If measuring
> requires access or data you lack, ask me; do not approximate silently. If some part can only
> be approximated, mark it as approximate and tell me the margin. Run the meter, show me the
> number together with the command that produces it, and audit it in both directions: from the
> code to the measurement (is everything that should be counted, counted?) and from the
> measurement to the code (does everything counted actually exist?). Only then propose what to
> build. Reply in my language.

> [zh]
> 在构建任何东西之前，我们要先测量。假设是：[X]。写一把量具（一个活在仓库里的脚本）来测
> 量 [那个数量]，再写一个量具的测试，对一个事先知道答案的已知案例检验它。如果测量需要你没
> 有的访问权或数据，问我；不要悄悄近似。如果某部分只能近似，标为近似并告诉我误差范围。运
> 行量具，把数字连同产生它的命令给我看，并双向审计它：从代码到测量（该数的都数了吗？）和
> 从测量到代码（数到的都真的存在吗？）。只有那时才提议要构建什么。用我的语言回复。

我在要求什么，逐条：量具**在仓库里**（不是一条会丢的零散命令）；对已知案例的**量具测试**
（守卫）；适配测量的完整性条款（索要访问权，不悄悄近似）；把近似的标出来并附误差范围；数字
**连同产生它的命令**，让你能运行；双向审计，那是揭穿我那两把撒谎量具的东西；以及顺序：先测
量，再提议。

**当有预算时：**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

> [zh]
> 把这条路径上 [查询 / 循环 / 时间] 的预算定在测得的值加一个小余量，并用一个超过就失败的测
> 试保护它。告诉我数字和余量。

我在要求什么：预算是测得的值加一点点，不是一个整数，并且有一个超过就失败的测试。这样一次性
能退化会出现在测试套件里，而不是生产里 [Ref. 37](../REFERENCIAS.md#ref-37)。

**当规划者给了数字时（规则五）：**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

> [zh]
> 在执行计划之前，用量具验证计划断言的每一个数字。如果有任何一个不符，停下来告诉我；不要
> 在错误的数字上执行。

我在要求什么：执行者不信任规划者的数字，哪怕是同一个模型在另一次会话里。在我的案例中，计划
的四条断言有三条是错的；有仪器的地方，数字是精确的。

## 3. 预期结果

- 仓库里的量具（`tools/measure_*.py`、`scripts/meter-*.mjs` 或类似），附其测试。
- 数字，附产生它的命令和日期。
- 双向审计，写成两三行。
- 近似的标为近似，附误差范围。
- 如果有预算：值、余量，以及保护它的测试。
- 提交里："measured: [number] with [meter]"。

## 4. 完整性检验

- 你自己能运行量具的命令并得到同样的数字吗？（你来运行；不需要理解它，只需要执行。）
- 量具有测试吗？对哪个已知案例？
- 报告里有没有哪个数字背后没有量具？问它从哪里来。
- 近似的标出来了吗？
- 如果计划带了数字，代理在执行之前验证了它们，并告诉你哪些不符吗？

## 5. 警报信号

- 一个数字在两份报告之间变了，而代码没变。两份中有一份没测。
- 量具得零。几乎从来不是零；几乎总是量具没看见某样东西。
- 代理提议"边测边建"以节省时间。顺序就是方法：先数字，后计划。
