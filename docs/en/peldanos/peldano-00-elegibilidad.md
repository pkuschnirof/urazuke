# Step 0 — Can this project be run this way? (step contract)

**Stretch:** start-up.
**When:** once only, in the first week, before opening the repository and before anything else.
One hour of work.
**Form:** conversation: the agent evaluates and asks; you decide.
**Size:** mandatory in every project, however small. It takes an hour; it saves months.
**Status:** the exclusionary criteria X1 and X2 are closed; the weighted criteria (D1 to D10) I am
still calibrating, and I mark them as hypotheses.

## What it is for

Do not get into a project where the method cannot work. If the agent is not going to be able to
verify itself end to end, or if there is no domain owner who decides, the method degrades into
"programming with AI" and you end up reading code. This step is the entrance door: it is crossed
once, and if it cannot be crossed, better to know it before than after.

And a background idea I want you to be clear about: **the method does not work for every project,
and that is not a defect**. A method that promises to work for everything is saying nothing. What
this step does is put the boundary in writing, so that the decision to go in or not is a decision
and not a hope. The two exclusionary criteria come from projects I turned down, not from the ones
I accepted [Ref. 46](../REFERENCIAS.md#ref-46).

## 1. Required context

Named generically; the agent evaluates whether it is enough and asks for what is missing.

- Survey of the request: what the client wants, for whom, and what happens today without the
  system.
- Technology survey: what technology exists or is proposed, whether there is a previous system,
  whether that system has a repository and how it is managed.
- Testability survey: whether the screens can be driven by a program and whether every element of
  the interface is accessible with its different methods (click, type, read its state), so that a
  test can walk the screen and verify the effect in the backend.
- Who the domain owner is and how much time they have to decide.
- What consequence an error has (money, health, operations, nothing).
- Environments and access: whether there will be a test environment, whether the agent can reach
  it, whether production can be queried read-only.

## 2. Prompts

The prompts are in English, which is the language in which models follow instructions with the
most precision and the fewest tokens. In the Spanish version each prompt carries its translation;
here the document is already in English. Below each prompt is the explanation of what I am asking
for and why each clause is there. What you paste to the model is the English.

**Opening:**

> We are going to assess whether this project can be run with the Urazuke method. Read the
> initial survey in `docs/INITIAL_SURVEY.md` and the criteria sheet in
> `docs/ELIGIBILITY_CRITERIA.md`. First, evaluate whether the survey is sufficient to answer
> every criterion. If any criterion cannot be answered from the survey, ask me for the missing
> information before going on; do not assume. Then fill in the sheet criterion by criterion:
> the answer, where it comes from, and for each exclusionary criterion whether it is green or
> red. Do not decide: present me the completed sheet with your reading and your doubts, and I
> will decide. Reply in my language.

What I am asking for: that it read the two inputs (the survey and the criteria sheet); that
**before answering it evaluate whether the survey is enough** and, if it is not, ask instead of
assuming (this is the central clause of every prompt in the method); that it fill in the sheet
with the source of each answer, so that it can be traced later; that it mark the exclusionary
criteria green or red; and that it **not decide**, because eligibility is decided by me. The last
line asks it to reply in my language, because the prompt is in English but the conversation does
not have to be.

**Closing:**

> Decision: [go / no-go / go under these conditions: …]. Write the final sheet to
> `docs/ELIGIBILITY.md` with the date, who decided, the answer to every criterion with its
> source, and the conditions if any. Include the questions you asked and my answers.

What I am asking for: that it leave the decision written with date and owner (step 6), with the
conditions if there are any, and with the trail of questions and answers, which is the evidence
that it assumed nothing.

## 3. Expected result

A file `docs/ELIGIBILITY.md` (or whatever name your project uses), one page long, with:

- Date and who decided.
- The two exclusionary criteria with their answer and their source:
  - X1: there is an accessible repository managed in a standard way (or the project is new).
  - X2: the interface can be driven by a program and every element is accessible with its
    different methods, with verification of the effect in the backend.
- The weighted criteria, each with answer, source and weight (once the weight is calibrated).
- The decision: go, no-go, or go under conditions, with the conditions written down.
- The questions the agent asked and the answers, so that the trail remains.

## 4. Completeness check (you do it, without reading code)

- Do the two exclusionary criteria have an explicit answer and a source? If either is red, is the
  decision "no-go", or does it carry a condition that resolves it?
- Is any criterion answered with "I suppose so" or "probably"? If there is one, the step is not
  climbed: the agent had to ask.
- Is the decision written with a date and a name?
- Are the conditions (if any) verifiable? ("Have read access to production before step 3" is;
  "the client cooperates" is not.)

## 5. Warning signs

- The agent filled in the whole sheet without asking a single question. Either the survey was
  perfect (it never is) or it assumed.
- The decision is "go under conditions" and there are more than three conditions. It is probably
  a "no-go" nobody wants to say out loud.
- Criterion X2 was answered "yes, with a little work". If the screens cannot be driven by a
  program today, that "little work" is the whole project.
