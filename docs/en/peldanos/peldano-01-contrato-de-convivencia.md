# Step 1 — The working agreement (step contract)

**Stretch:** start-up.
**When:** once only, in the first week, immediately after eligibility; revised when a hard lesson
demands it. Half an hour.
**Form:** one shot, with one adjustment round from you.
**Size:** mandatory in every project. It is the cheapest step of all and the one that prevents
the most frustration.

## What it is for

Put in writing, before the first line of code, how you and the agent are going to work. It looks
like a formality and it is not: it is what prevents the agent from "helping" by expanding the
scope, leaving debt for later, or reporting as done what it believes it did. In my tool this file
is called `SQ.md` (quality standards); the name does not matter, the content does.

Think of it this way: the agent is a new collaborator who arrives every morning with no memory of
yesterday. The agreement is what you tell them on the first day, and what they will reread every
day. If you do not write it down, you will have to say it every time, and you will say it
differently every time. I wrote it for the first time when I had spent two weeks repeating the
same things in every session [Ref. 1](../REFERENCIAS.md#ref-1), and nothing I put in it was new
in systems engineering; what was new was having to write it for someone without memory.

## 1. Required context

- None from the project: it is the first file.
- From you: your working preferences (language, how you want to be asked, what you consider a
  waste of your time, what level of autonomy you give the agent).

## 2. Prompts

**Opening:**

> Before we write any code, we are going to set the working agreement between you and me.
> Write `docs/WORKING_AGREEMENT.md` with at least these rules, each with one line explaining
> what it prevents: (1) My time is sacred: do not ask me what you can resolve on your own, and
> when you do ask, ask in prose, with your recommendation. (2) Zero technical debt: whatever
> breaks is fixed at the root, with its regression test, in the same session. (3) Exact scope:
> no more and no less than what was asked; if you see something else, log it as a pending item,
> do not do it. (4) Documentation is updated in the same commit as the change. (5) Never report
> as done something you have not verified; always separate what you verified from what you
> believe. (6) Speak my language. Add any rules you think this project needs, marked as
> proposals. If you need to know something about how I work in order to write this, ask me.

What I am asking for: the six minimum rules, each with the failure it prevents (that is what makes
them rules and not advice); that it propose rules of its own for the project but mark them as
proposals, so that you accept or reject them; and that it ask whatever it needs to know about you.
An agreement drafted without a single question is suspicious: the agent does not know the person
it is going to work with.

**Closing:**

> I accept rules 1 to 6 and your proposals [X, Y]; I reject [Z] because [reason]. Finalize the
> agreement with today's date and a version number. Then add to the project file the
> instruction to read this agreement at the start of every session.

What I am asking for: that it close the agreement with a date and a version, and that it hook it
into the project file so that it is read in every session. Without that hook the agreement exists
but does not act.

## 3. Expected result

A file `docs/WORKING_AGREEMENT.md` (or `SQ.md`, or `CONTRATO.md`) with:

- Date and version.
- Each rule numbered, in one or two sentences, with the failure it prevents.
- The project's own rules, marked as such.
- A line at the foot saying that the agent proposes changes but does not edit the agreement on
  its own.

And a line in the project file (`PROJECT.md` or `CLAUDE.md`) ordering it to be read at the start
of every session.

## 4. Completeness check

- Are the six minimum rules there, each with the failure it prevents?
- Is any rule written as an aspiration ("try to…", "whenever possible…")? If there is one, it is
  useless: rules are either followed or not.
- Does the project file order it to be read in every session?
- Did the agent ask you at least one question about how you work? If it drafted everything
  without asking anything, it is suspicious: it does not know you.

## 5. Warning signs

- The agreement has more than twenty rules. Nobody, neither human nor model, follows twenty
  rules; six or eight get followed.
- A rule says "the agent may modify this agreement when it considers it necessary". No.
- Two weeks later, the agent does something the agreement forbids and nobody notices. The
  agreement is not being read: check the hook in the project file.
