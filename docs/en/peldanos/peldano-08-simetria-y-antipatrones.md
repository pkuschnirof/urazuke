# Step 8 — Producer/consumer symmetry, and the anti-pattern register (step contract)

**Phase:** loop (every change that touches a contract between two parts).
**Form:** automatic within the loop; plus a file that grows with every hard lesson.
**Size:** the symmetry is always mandatory; the producer/consumer map is optional in a
single-module project, and mandatory as soon as there is a screen and a server apart.

## What it is for

When you change one end (the server, the robot, the database schema), the other end (the screen,
the counter, the consumer) has to change in the same commit. If not, sooner or later they diverge,
and the user sees one number on one side and another number on the other (the 1,355 versus 1,234
case). And the mistakes we already paid for once are written down so we do not pay for them twice.

The general principle behind it: **every list has a single owner**. The columns of a table, the
possible states of an order, the reasons something is waiting: one part of the system (the
producer) defines them and every other part reads them from there. As soon as there are two copies
of the same list, one of them is out of date; the only question is which.

## 1. Required context

- A map of which parts of the system consume what: which screens read which services, which
  processes write which tables. If it does not exist, the first prompt builds it.
- The anti-pattern register `docs/GOTCHAS.md`, even if empty.

## 2. Prompts

**To build the map (once):**

> Build `docs/PRODUCER_CONSUMER_MAP.md`: for every contract in the system (a service, a table,
> a file format, a list of values), who produces it and who consumes it. If there are parts of
> the system you cannot access or do not understand, tell me instead of leaving them out of the
> map. Reply in my language.

What we are asking for: the inventory of contracts with both sides, and the completeness clause in
its form for this step: what cannot be seen is declared, not omitted. A map with hidden gaps is
worse than no map.

**Routine (goes in the working agreement):**

> Before closing any change that touches a contract, look up every consumer in the map and
> update them in the same commit. Always prefer that the producer defines the list (columns,
> causes, states) and the consumer reads it, rather than each keeping its own copy. If the map
> does not have that relationship, add it.

What we are asking for: symmetry as a reflex (look up the other side before closing), the
single-owner-per-list rule, and the map maintaining itself as it is used.

**When something breaks for the second time:**

> This has happened to us before. Record it in `docs/GOTCHAS.md` with: how it smells (the early
> sign), the root cause, the fix, and how to detect it next time before it hurts. And add, if
> possible, a test or an automatic check that detects it.

What we are asking for: the fixed format of an anti-pattern (smell, root cause, fix, early
detection) and, most importantly, the automatic check: an anti-pattern written down but not
automated will repeat when the person or the session changes.

## 3. Expected result

- `docs/PRODUCER_CONSUMER_MAP.md`: the list of contracts with producer and consumers.
- In every commit that touches a contract: the consumers updated, named in the message.
- `docs/GOTCHAS.md`: one entry per anti-pattern, with the four parts (smell, root cause, fix, how
  to detect it earlier), and the date of the first occurrence.

## 4. Completeness check

- Pick a contract from the map and ask the agent to show you where each consumer reads it. If
  any has its own copy of the list, there is debt.
- Is there a number shown on two different screens? Compare: are they equal?
- Does every GOTCHAS entry have the four parts?
- Did any mistake already in GOTCHAS repeat? If so, the automatic check is missing.

## 5. Warning signs

- The same value is typed by hand in more than one file ("PENDING", "APPROVED" in the server and
  in the screen). Two copies; one will diverge.
- A server change was closed with the server test green and nobody touched the screen.
- GOTCHAS has entries without the "how to detect it earlier" part. They are anecdotes, not
  anti-patterns.
