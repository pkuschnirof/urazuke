# Step 2 — The project definition and mandatory reading (step contract)

**Phase:** start (once; kept up to date throughout the project).
**Form:** conversation (the agent drafts, asks what is missing, the owner corrects).
**Size:** mandatory in every project. In a small one the project file can be fifty lines; what it
cannot be is absent.

## What it is for

Every agent session starts from zero: it does not remember yesterday. So it needs a map, a short
one, telling it what the project is, what state it is in and which decisions have already been
made. And it needs the obligation to read it before touching anything. The failure it prevents is
twofold: throwaway work from not reading the map, and the map that grows until it is unreadable (in
one of the source systems the project file reached 9,661 lines, and in that state nobody reads it,
not even the model).

The practical rule that comes out of that lesson: **the project file is the programme, not the
history**. What happened goes elsewhere (the pending-items register, the living status, the
journal); the project file says what the system is, for whom, what it is not, and what was decided.

## 1. Required context

- Business survey: what the client does, who uses the system, what problem it solves, what it must
  not do.
- The working agreement (step 1).
- If a previous system exists: read access to its code or its documentation.
- The decisions already made, if any, even if only spoken.

## 2. Prompts

**Opening:**

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users and its boundaries; if it
> is not, ask me for what is missing before writing anything. Then write `PROJECT.md`, three
> hundred lines at most, with: what the system is and for whom; what it is NOT; the main
> modules as a list; the decisions already made, each with its date; and the instruction to
> read this file and the working agreement at the start of every session. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; `PROJECT.md` almost never does. Reply in my language.

What we are asking for: to evaluate the survey and ask before drafting; a project file that is
**short** (the three-hundred-line cap is arbitrary but necessary: without a cap, it grows); to say
explicitly what the system is **not**, because what is left unsaid is what the model will invent;
decisions with dates; and the living state in a separate file, so that the project file does not
turn into a history.

**Closing:**

> Apply these corrections: [list]. Finalize `PROJECT.md` with today's date. Add to the working
> agreement that the change history never goes into `PROJECT.md`: it goes to `docs/STATUS.md`
> or to the pending-items register.

What we are asking for: the owner's corrections, the date, and a new rule in the agreement that
protects the project file from becoming a changelog. That rule is the one that was missing in the
9,661-line case.

## 3. Expected result

- `PROJECT.md` (or `CLAUDE.md`): short, mandatory reading, with what it is, for whom, what it is
  not, modules, decisions with dates, and the order to read it. Three hundred lines at most.
- `docs/STATUS.md`: living state, separate from the above.
- In both, a last-updated date.
- In the agreement, the rule that the history does not go in `PROJECT.md`.

## 4. Completeness check

- Can `PROJECT.md` be read in five minutes? If not, it is wrong: it is the programme, not the
  history.
- Does it say explicitly what the system does NOT do? (What is missing is what the agent will
  invent.)
- Does every decision have a date and who made it?
- Did the agent ask something about the business before drafting? If it asked nothing, check
  what it assumed.
- Is the living state in another file?

## 5. Warning signs

- The project file grew more than 20 % in a month. Something that is not programme is getting in.
- The agent opens a session proposing something that was already decided and written. It did not
  read the map: the mandatory-reading hook failed.
- The "what it is not" section is empty or says "nothing in particular". Every system has
  boundaries; if they are not written, the model will cross them.
