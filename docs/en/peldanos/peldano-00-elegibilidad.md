# Step 0 — Can this project be run this way? (step contract)

**Stretch:** start-up.
**When:** once only, before opening the repository and before anything else.
**Form:** conversation: the agent evaluates and asks; you decide.
**Size:** mandatory in every project, however small.
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

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

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

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/INITIAL_SURVEY.md`: the initial survey. You write it, by hand, after talking to the
  client (it is the result of the phase 0 intake). Half a page to one page, in prose, not as a
  form, with six things: (1) the request: what the client wants, in their own words, for whom,
  and what happens today without the system (the notebook, the spreadsheet, the person who does
  it by hand); (2) the technology: what exists or what is proposed, whether there is a previous
  system, whether that system has a repository and how it is managed (branches, who pushes,
  whether there are tests); (3) testability: whether the screens can be driven by a program, and
  whether every element of the interface can be found, clicked, typed into and read; if you do
  not know, say so; (4) the domain owner: who it is, with name and role, and how much time they
  have per week to decide; (5) the consequence of an error: money, health, operations, nothing;
  (6) the environments: whether there will be a test one, whether the agent will be able to reach
  it, whether there is a production that can be queried read-only. What you do not know is
  written down as "I do not know": do not fill it in yourself so that the agent does not ask,
  because the point of the step is to see what it asks.
- `docs/ELIGIBILITY_CRITERIA.md`: the criteria sheet. You copy it from the main document (the
  step 0 sheet: the two exclusionary criteria X1 and X2 and the criteria D1 to D10 that weigh),
  with one empty column for the answer, another for the source and another for green or red. Do
  not fill it in yourself: the agent fills it in.
- The project folder, created, with the agent opened there and still nothing in it other than
  those two files inside `docs/`.
- Minimum acceptable state: both files exist, the survey touches the six things even if several
  of them say "I do not know", and the agent is standing in the folder.

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

**Before sending the prompt**, you have to have this at hand:

- Your decision, in one line, taken after reading the complete sheet the agent presented: go, no
  go, or go under conditions. If there are conditions, write them before pasting the prompt, each
  one verifiable ("read access to production before step 3" yes; "that the client collaborates"
  no), and no more than three.
- The answers you gave to the agent's questions, given in this same chat session: the prompt asks
  it to include them in the final sheet, and if the session is another one, it does not have
  them.
- Minimum acceptable state: every criterion in the sheet has an answer and a source in sight, and
  you have already decided. If you are still in doubt, do not send the closing: keep asking.

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
