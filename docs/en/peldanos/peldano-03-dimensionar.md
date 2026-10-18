# Step 3 — Size before designing the architecture (step contract)

**Stretch:** start-up.
**When:** once, in the first week, after the definition and before building the skeleton; redone
if the business changes scale.
**Form:** conversation: the agent computes and presents options; you choose.
**Size:** always mandatory, but proportional: in a small project the sizing can be half a page and
a single decision ("it fits in SQLite for years"). What it cannot be is skipped, because the
question "how much is it going to grow?" costs five minutes and the wrong answer costs weeks.

## What it is for

Make the structural decisions —which database engine, whether the interface is synchronous or
asynchronous, how much concurrency— with numbers and not with taste. It is the step that costs the
most to skip, and I say so from experience: in one of my systems I started with JSON files and
when I measured it turned out it was going to generate 3.4 million rows per year; changing the
interface afterwards cost a whole stage of re-engineering [Ref. 15](../REFERENCIAS.md#ref-15).

There is a key point worth keeping in mind: **there is data that only the business has** (how
many entities, how many events per entity, how many operators at the peak, how much has to be
kept) and the model cannot infer it. What it can infer is what is derived. That is why the prompt
requires it to evaluate whether the primary data is complete and to ask for what is missing,
instead of estimating it with a straight face. The one who knows what it lacks in order to
compute is the model, not a form.

And a second idea I want you to take away: **asymmetric decisions**. There are decisions that cost
very little if you make them and they turn out unnecessary, and a great deal if you do not make
them and they turn out necessary. The asynchronous persistence interface from line one is the
canonical example: if the engine ends up synchronous, one `await` was superfluous; if it ends up
asynchronous and you did not plan for it, everything has to be rewritten. Make those decisions
whenever they are cheap, even if they are not needed today.

## 1. Required context

- **Volume data survey** of the business, named generically: main entities and their growth,
  events per entity, simultaneous operators and peak hours, data retention time, exceptional
  loads (campaigns, closings), expected growth. The survey is incomplete by nature; the agent
  evaluates and asks.
- If there is a previous system: read access to its database to get real numbers instead of
  estimates.
- `PROJECT.md` and the semantic tree (step 2): the entities in the tree are the ones to size.

## 2. Prompts

**Opening:**

> Before proposing any architecture we are going to size the system. Read `PROJECT.md` and the
> volume survey in `docs/VOLUME_SURVEY.md`. Distinguish primary data (facts only the business
> knows) from derived data (what can be computed from the primary data). Evaluate whether the
> primary data is complete enough to compute what follows; if any primary figure is missing, or
> is marked as an assumption, ask me for all the missing figures before going on. Never estimate
> a primary figure. If a previous system can be queried, use its real numbers and state where
> each came from. With the primary data complete, compute, showing the arithmetic: rows per year
> for the three largest tables, peak concurrency, data size at five years, and what breaks first
> if everything is multiplied by ten. Then present three options for persistence and concurrency,
> each with the cost of migrating to the others later. Do not choose: I choose. Do not write code.
> Reply in my language.

What I am asking for, clause by clause: distinguish primary from derived (it is the distinction
that prevents the invention); **ask for the missing primary figures and never estimate them**;
use real numbers from the previous system when there is one, with their source; compute what is
derived with the arithmetic in plain sight, so that you can redo it; the "times ten" scenario,
which is what reveals what breaks first; three options with the cost of migrating between them,
because the decision is not only "which one" but "how much does it cost to be wrong"; and that it
neither choose nor write code, because this step is about deciding, not building.

**Closing:**

> I choose option [B]. Record in `docs/SIZING.md`: the primary data with its source, the derived
> data with its arithmetic, the three options, the chosen one and why, and the decisions we are
> taking "just in case" even though they are not needed today (for example: the persistence
> interface is asynchronous from line one, even if the first engine is synchronous). Include the
> questions you asked and my answers.

What I am asking for: the complete record, with sources and arithmetic; the chosen option and the
reason; and the asymmetric decisions written down, because if they stay implicit they are not
respected.

## 3. Expected result

A file `docs/SIZING.md` with:

- Date and who decided.
- Table of primary data: value, source (reported by the business / measured in the previous
  system), date. None with source "assumption".
- Table of derived data: value, which primary figures it comes from, the arithmetic.
- The "times ten" scenario: what breaks first.
- The three options, numbered, with the cost of migrating between them.
- The chosen one and the reason, in one or two sentences.
- The asymmetric decisions, listed.
- The questions the agent asked and the answers.

## 4. Completeness check

- Is there any primary figure with source "assumption" or with no source? If there is, the step
  is not climbed: the agent had to ask for it.
- Does each derived figure show which primary figures it comes from and with what arithmetic?
  Can you redo one calculation by hand and get the same result?
- Are there three options and one chosen with a written reason?
- Does it say what happens if the volume is multiplied by ten?
- Are the asymmetric decisions written down, or did they stay implicit?
- Did the agent ask? If it presented numbers without having asked a single question, be
  suspicious.

## 5. Warning signs

- The three option scenarios lead to the same conclusion. The agent had already chosen and built
  the other two to comply.
- A derived figure has more precision than the primary figures it comes from ("1,234,567 rows"
  from "about 5,000 families"). The precision is false.
- The "times ten" scenario says "nothing happens". Something always happens; if it did not find
  it, it did not look.
