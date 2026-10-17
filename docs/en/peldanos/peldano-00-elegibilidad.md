# Step 0 — Can this project be run this way? (step contract)

**Phase:** start (once per project, before opening the repository).
**Form:** conversation (the agent assesses and asks; the owner decides).
**Size:** mandatory in every project, however small. It takes an hour; it saves months.
**Status:** being elaborated with Pablo. The exclusionary criteria X1 and X2 are confirmed; the
weighted criteria (D1 to D10) are still hypotheses without weights.

## What it is for

To avoid getting into a project where the method cannot work. If the agent will not be able to
verify itself end to end, or if there is no domain owner who decides, the method degrades into
"programming with AI" and the human ends up reading code. This step is the front door: you cross
it once, and if you cannot cross it, better to know before than after.

There is an underlying idea worth saying out loud: **the method does not work for every project,
and that is not a defect**. A method that promises to work for everything is saying nothing. What
this step does is put the boundary in writing, so that the decision to go in or not is a decision
and not a hope.

## 1. Required context

Named generically; the agent evaluates whether it is enough and asks for what is missing.

- Survey of the request: what the client wants, for whom, and what happens today without the
  system.
- Technology survey: what technology exists or is proposed, whether there is a previous system,
  whether that system has a repository and how it is managed.
- Testability survey: whether the screens can be driven programmatically and whether every
  element of the interface is accessible with its various methods (click, type, read state), so
  that a test can walk through the screen and verify the effect on the backend.
- Who the domain owner is and how much time they have to decide.
- What the consequence of an error is (money, health, operations, nothing).
- Environments and access: whether there will be a test environment, whether the agent can reach
  it, whether production can be queried read-only.

## 2. Prompts

The prompts are in English, the language in which models follow instructions most precisely and
with the fewest tokens. Under each one, the explanation of what we are asking for and why each
clause is there.

**Opening:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

What we are asking for: to read the two inputs (the survey and the criteria sheet); to **evaluate
whether the survey is sufficient before answering** and, if it is not, to ask rather than assume
(this is the central clause of every prompt in the method); to fill in the sheet with the source of
every answer, so that it can be traced later; to mark the exclusionary criteria green or red; and
**not to decide**, because eligibility is decided by the owner. The last line asks it to answer in
the owner's language, because the prompt is in English but the conversation need not be.

**Closing:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

What we are asking for: to leave the decision written with date and owner (step 6), with the
conditions if any, and with the trail of questions and answers, which is the evidence that nothing
was assumed.

## 3. Expected result

A file `docs/ELIGIBILITY.md` (or whatever name the project uses), one page, with:

- Date and who decided.
- The two exclusionary criteria with their answer and source:
  - X1: there is an accessible repository managed in a standard way (or the project is new).
  - X2: the interface can be driven programmatically and every element is accessible with its
    various methods, with verification of the effect on the backend.
- The weighted criteria (D1 to D10 of the ladder, once they are settled), each with answer,
  source and weight.
- The decision: go, no-go, or go under conditions, with the conditions written down.
- The questions the agent asked and the answers, so that the trail remains.

## 4. Completeness check (done by the owner, without reading code)

- Do the two exclusionary criteria have an explicit answer and a source? If either is red, is the
  decision "no-go", or is there a condition that resolves it?
- Is any criterion answered with "I suppose so" or "probably"? If so, the step is not climbed:
  the agent had to ask.
- Is the decision written with a date and a name?
- Are the conditions (if any) verifiable? ("Have read access to production before step 3" is;
  "the client cooperates" is not.)

## 5. Warning signs

- The agent filled in the whole sheet without asking a single question. Either the survey was
  perfect (it never is) or it assumed.
- The decision is "go under conditions" and there are more than three conditions. It is probably
  a "no-go" nobody wants to say.
- Criterion X2 was answered "yes, with a bit of work". If the screens cannot be driven
  programmatically today, that "bit of work" is the whole project.
