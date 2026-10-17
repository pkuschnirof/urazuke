# 步骤 9 — 构建之前先测量，用一把自身也被验证的量具（台阶契约）

**阶段：** 循环（每当一个数字进入某个决定）。
**形式：** 每次测量一次发送；假设来自所有者时偶尔是对话。
**规模：** 按比例。小项目中，"测量"可以是用一条命令数一数并把数字连日期记下；棘轮和查询
预算是给有流量的系统用的。不随规模改变的是：任何决定某事的数字都不来自印象。

## 用途

让每个进入决定的数字都来自一个带测试的程序，而不是文本搜索、印象，或"我觉得大概一百个"。
并让量具自身接受审计，因为量具会撒谎：在 Kikan 中，一把量具计数为零却没看见 84 次调用，
另一把说 27 而实际是 44。五条规则是：带守卫的量具；量具不存在就造一把；双向审计；标出
近似值；执行者核对计划者的数字。

这级台阶存在的根本原因：模型非常擅长生成带数字的断言（"这类循环大约有 120 个"），而这些
断言在测量出来和估算出来时听起来一模一样。所有者无法从语气上区分。唯一的办法是索要量具：
"你用什么测的？给我看命令"。没有命令，无论几位小数，都是印象。

## 1. 所需上下文

- 假设，来自所有者或代理："我觉得问题是 X"、"应该有一百个左右"。
- 对要测量对象的访问：代码、只读数据库、日志。
- 仓库中已有的量具，如果有。

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

我们在要求什么，逐条：量具**放在仓库里**（而不是一条会丢失的散落命令）；针对已知案例的
**量具测试**（守卫）；测量形式的完整性条款（索要访问权，不要默默近似）；标出近似值及其
误差范围；数字**连同生成它的命令**，让所有者能运行；双向审计，正是它揭穿了两把撒谎的量具；
以及顺序：先测量，再提议。

**有预算时：**

> Set the budget for [queries / loops / time] on this path at the measured value plus a small
> margin, and protect it with a test that fails if it is exceeded. Tell me the number and the
> margin.

我们在要求什么：预算是测量值加一点余量，而不是一个整数，并且有一个超过就失败的测试。这样
性能退化会在测试套件中出现，而不是在生产中。

**当计划者给出了数字（规则五）：**

> Before executing the plan, verify every number the plan asserts with the meter. If any does
> not match, stop and tell me; do not execute on a wrong number.

我们在要求什么：执行者不要信任计划者的数字，哪怕是另一次会话中的同一个模型。在 Kikan 中，
计划的四条断言有三条是错的；有量具的地方，数字是准的。

## 3. 预期结果

- 仓库中的量具（`tools/measure_*.py`、`scripts/meter-*.mjs` 或类似），附测试。
- 数字，连同生成它的命令和日期。
- 双向审计，写成两三行。
- 近似值标为近似，附误差范围。
- 如果有预算：值、余量，以及保护它的测试。
- 提交中："measured: [number] with [meter]"。

## 4. 完整性检验

- 你自己运行量具的命令，得到同样的数字吗？（你来运行；不需要理解它，只需运行。）
- 量具有测试吗？针对哪个已知案例？
- 报告中是否有没有量具支撑的数字？问它从哪来。
- 近似值标出来了吗？
- 如果计划带了数字，代理在执行前核对了它们并告诉你哪些对不上吗？

## 5. 警报信号

- 代码没变，两份报告之间数字却变了。其中一份没测量。
- 量具给出零。几乎从来不是零；几乎总是量具没看见什么（在 Kikan 中发生了两次）。
- 代理提议"边测边建"以节省时间。顺序就是方法：先数字，后计划。
