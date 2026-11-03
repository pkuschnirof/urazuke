# Step 11 — Producer/consumer symmetry, and the anti-pattern register (step contract)

**Stretch:** loop.
**When:** with every pending item that touches a contract between two parts of the system. The
map of contracts is built when the second functional block opens, once there is a screen and a
server. The anti-pattern register grows every time something breaks for the second time.
**Form:** automatic inside the loop; plus a file that grows with every blow.
**Size:** symmetry is always mandatory; the producer/consumer map is optional in a single-module
project, and mandatory as soon as there is a screen and a server that are separate.

## What it is for

When you change one end (the server, the robot, the database schema), make the other end (the
screen, the counter, the consumer) change in the same commit. If you do not, sooner or later they
diverge, and the user sees one number on one side and another number on the other
[Ref. 26](../REFERENCIAS.md#ref-26). And the mistakes you have already paid for once, write them
down so you do not pay for them twice [Ref. 2](../REFERENCIAS.md#ref-2).

The general principle behind this, which I imposed at the Health Fund and which holds for every
system [Ref. 27](../REFERENCIAS.md#ref-27): **every list has a single owner**. The columns of a
table, the possible states of an order, the reasons why something is waiting: one single part of
the system (the producer) defines them and all the others read them from there. As soon as there
are two copies of the same list, one of them is out of date; the only thing left to find out is
which. The semantic tree of step 2 is the first place where those lists are declared: the states
of an entity are there, and the code has to read them from a single source.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- A map of which parts of the system consume what: which screens read which services, which
  processes write which tables. If it does not exist, the first prompt builds it.
- The anti-pattern register `docs/GOTCHAS.md`, even if it is empty.

## 2. Prompts

**To build the map (once):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- The system with at least one functional block built: with no contracts between parts there is
  no map to make.
- `docs/SEMANTIC_TREE.md` up to date: the lists (states, types, causes) are declared there, and
  the map has to match the tree.
- A list, written by you, of the parts that live outside the repository and that produce or
  consume something from the system (a robot, a spreadsheet that reads the database, a process
  from another team), so that the agent puts them in the map even though it cannot see them. If
  there are none, say so.
- Minimum acceptable state: the agent can read the whole repository, and you told it what is
  outside.

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map.
>
> And the map carries one more family, which is the ports you doubled for testing:
> `ports_with_a_test_double`, with `ports_total`, how many ports of the system have a double, and
> `ports_with_a_crossing_run`, how many of those have at least one run that crosses them to the real
> other side; and then, per port, its adapter, its double, and `crossing_run`: the exact command,
> and what it reached on the other side, which is `browser`, `operating_system`, `database`,
> `network` or `none`. The other side is whatever the port is doubling, and another double is never
> the other side (Annex H, CQ-21.1). `none` is a declared hole and it is worth more than silence: a
> port whose double no run crosses is where four dead controls fit underneath a green suite. Do not
> write a crossing run you did not run, and count a port with no crossing run inside `ports_total`
> instead of leaving it out so the figure reads better.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: the inventory of contracts with their two sides, and the completeness clause
in its form for this step: what cannot be seen is declared, not omitted. A map with hidden holes is
worse than no map at all.

And what D-087 adds: the family of the ports with a test double. A port with its double is
producer/consumer symmetry in its purest form -- the adapter produces the events the view consumes
-- and it is also the place where the method concentrates the risk, because it pushes you to double
so that the view is verifiable and then demanded no run that looks at that point. The column of the
run that crosses it is what turns the hole into a **declared** hole: what a program can look at is
that the column is there and names what is on the other side; whether that is true is decided by a
person reading the command, and that is written in Annex H instead of being simulated here.

**Routine (goes in the working agreement):**

**Before sending the prompt**, you have to have this at hand:

- `docs/PRODUCER_CONSUMER_MAP.md`, built and reviewed by you: pick one contract and verify that
  the two sides are the ones you know.
- `docs/WORKING_AGREEMENT.md`, where the routine goes.
- Minimum acceptable state: the map exists and has at least the contracts of the first block.

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: symmetry as a reflex (look for the other side before closing), the rule of
the list with a single owner, and that the map maintains itself as it gets used.

**When something breaks for the second time:**

**Before sending the prompt**, you have to have this at hand:

- The evidence that it is the second time: the pending item or the commit of the first one,
  located by you (search among the closed pending items in `docs/PENDING.md`), to paste it
  together with the prompt. Without that reference, the agent is going to record a generic
  anti-pattern that is no use for detecting anything.
- `docs/GOTCHAS.md`, created even if it is empty, with the format in the header: the smell, the
  root cause, the fix, how to detect it earlier.
- Minimum acceptable state: you can name the first time with a date or with a pending item
  number.

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: the fixed format of an anti-pattern (smell, root cause, fix, early
detection) and, above all, the automatic check: an anti-pattern that is written down but not
automated will repeat itself when the person or the session changes.

## 3. Expected result

- `docs/PRODUCER_CONSUMER_MAP.md`: the list of contracts with producer and consumers.
- In every commit that touches a contract: the consumers updated, named in the message.
- `docs/GOTCHAS.md`: one entry per anti-pattern, with the four parts (smell, root cause, fix,
  how to detect it beforehand), and the date of the first time.
- In the map, the family of the ports with a test double: `ports_total`,
  `ports_with_a_crossing_run`, and per port its adapter, its double and the run that crosses it
  with what it reached on the other side.
## 4. Completeness check

- Pick a contract from the map and ask the agent to show you where each consumer reads it. If any
  of them keeps its own copy of the list, there is debt.
- Is there a number that is shown on two different screens? Compare: do they match?
- Does every GOTCHAS entry have the four parts?
- Did a mistake that was already in GOTCHAS repeat itself? If so, the automatic check is missing.
- Take a port with a double and read its run: does the command cross to a browser, an operating
  system, a database or the network, or does it stop at another double? A `crossing_run` at `none`
  is honest; one that names another double is a green that lies.
## 5. Warning signs

- The same value appears hand-written in more than one file ("PENDING", "APPROVED" on the server
  and on the screen). Two copies; one will diverge.
- A change to the server was closed with the server test green and nobody touched the screen.
- GOTCHAS has entries without the "how to detect it beforehand" part. Those are anecdotes, not
  anti-patterns.
- The map does not have the family of the ports and the project has test doubles. The port is where
  the method concentrates the risk: if it is not in the map, nobody is going to look at it.
