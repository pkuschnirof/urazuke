# Step 2 — The project definition, the semantic tree and mandatory reading (step contract)

**Stretch:** start-up.
**When:** written once, after the agreement; the semantic tree and the living
state are kept up to date throughout the project, with every block and every new decision.
**Form:** conversation: the agent drafts, asks for what is missing, you correct.
**Size:** mandatory in every project. In a small one the project file can be fifty lines and the
semantic tree twenty nodes; what they cannot do is not exist.

## What it is for

Every session of the agent starts from zero: it does not remember yesterday. Give it a map, a
short one, that tells it what the project is, what state it is in and what decisions have already
been made, and force it to read the map before touching anything. The failure it prevents is
twofold: throwaway work from not reading the map [Ref. 9](../REFERENCIAS.md#ref-9), and the map
that grows until it becomes unreadable [Ref. 41](../REFERENCIAS.md#ref-41). The practical rule:
**the project file is the programme, not the history**. What happened goes somewhere else.

The map has two pieces, and the second one does the most work. The first is the project file:
what the system is, for whom, what it is NOT, the decisions made. The second is the **semantic
tree**: the system broken down as a tree, with the domains, and under each one its actors, its
processes (the use cases), its entities with their states, its screens and its integrations; and
hanging from each node, the pending items and the decisions that touch it. The tree comes out of
the survey you did with the classic methods of requirements engineering (interviews, use cases,
domain model), the agent builds it, you correct it, and it is what gives the model the exact
context of the node it is going to touch without having to read the whole project. And it is what
lets you verify, without reading code, that the system the agent understands is the one the
business asked for.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- Business survey: what the client does, who uses the system, what problem it solves, what it
  must not do. With the interviews, the use cases or user stories you can name, and the business
  entities with their states, even if they are incomplete.
- The working agreement (step 1).
- If there is a previous system: read access to its code or its documentation.
- The decisions already made, if any, even if only spoken.
- The words the business actually uses for each thing, and who the different types of person who
  are going to use the system are. They are the two **prior inputs** of
  [Annex H](../ANEXO_HEURISTICAS.md), and this step is where they get written: without them, the
  profile matrix of step 8 gets invented and the usability rules have nothing to compare against.

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/INITIAL_SURVEY.md` (step 0), completed with the business survey. You write it from the
  intake interviews; if you used a method (interviews, use cases, user stories, screen
  prototypes), say which one and paste the result. It has to have: what the client does; who uses
  the system (the actors, with the name of their role); what problem it solves; what it must NOT
  do, in a section of its own, even if it has two items; the use cases or user stories the owner
  names, in their own words, even if they are ten lines; the business entities with their states
  ("an appointment is pending, confirmed, cancelled"), even if they are incomplete; the drawings
  or the photos of the screens, if there are any; the external integrations (messaging, payments,
  another system); and the decisions already taken, even if they were verbal, with the date and
  who took them.
- `docs/WORKING_AGREEMENT.md` (step 1), closed with a date and a version number.
- If a previous system exists: read access to its code or to its documentation, with the path or
  the link written down in the survey.
- Minimum acceptable state: the survey has the "what it is not" section with at least two items,
  at least one use case in the owner's words, and at least one entity with its states. Without
  that, the tree that comes out is going to be invented, and you are going to have nothing to
  compare it against.
- And for the two prior inputs of Annex H: in the survey, the actors named **with the word the
  business uses** (if the receptionist is called "the front-desk girl", that is the data, not
  "operational user"), and any list of user types that already exists, even if it is in an email.
  If you have neither one nor the other, say so: the agent has to **ask** for them, not invent
  them.

> We are going to define the project in writing. Read the business survey in
> `docs/INITIAL_SURVEY.md` and the working agreement in `docs/WORKING_AGREEMENT.md`. Evaluate
> whether the survey is sufficient to describe the system, its users, its domain and its
> boundaries; if it is not, ask me for what is missing before writing anything. Then write two
> things. First, `PROJECT.md`, three hundred lines at most, with: what the system is and for
> whom; what it is NOT; the main modules as a list; the decisions already made, each with its
> date; and the instruction to read this file and the semantic tree at the start of every
> session. Second, `docs/SEMANTIC_TREE.md`: the system as a tree, with the domains at the top
> level and, under each one, its actors, its processes (the use cases, each with actor, trigger,
> steps, outcome and exceptions), its entities with their attributes, states and transitions,
> its screens, and its external integrations. Mark every node you inferred rather than read in
> the survey, so that I can confirm or correct it. Third, the two prior inputs that Annex H
> needs before a single screen exists: the user glossary, with the words people actually use
> for each thing as the business says them and not as the system calls them; and the list of
> profiles, saying who each one is and what they come to do. Take both from the survey, ask
> me for whatever is not in it instead of inventing it, write them as `docs/GLOSSARY.md` and
> `docs/PROFILES.md`, name them in `PROJECT.md`, and mark what you inferred there too. Separately, create
> `docs/STATUS.md` for the living state (what is being worked on, what is open): that file
> changes every day; the other two change only when the system changes.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.
>
> Reply in my language.

What I am asking for: that it evaluate the survey and ask before drafting; that the project file
be **short** (the three-hundred-line cap is arbitrary but necessary: without a cap, it grows);
that it say explicitly what the system is **not**, because what is left unsaid is what the model
is going to invent; that the decisions carry a date; that it build the **semantic tree** with the
full structure (domains, actors, use cases with their parts, entities with states and
transitions, screens, integrations), which is the domain model of requirements engineering put in
the shape of a tree; that it **mark what it inferred**, because that is where the inventions hide;
and that it separate the living state into another file, so that the map does not turn into
history.

And the two prior inputs of Annex H, which are what keeps step 2 from being only a map for the
model. The **user glossary** is the list of words people actually use: "appointment", not "agenda
booking"; "the front-desk girl", not "operational user". It is for two things that come later:
naming the menu groups with user jobs, and making the text on the screens say what people say. The
**list of profiles** is who each one is and what they come to do, and it is the column the matrix of
step 8 comes from; if it is not written here, at step 5 it gets invented, and an invented matrix is
the cause of somebody seeing a button that is not theirs. I explicitly ask it to **ask** for them
rather than deduce them, because they are data of the business and not of the system; and to mark
what it inferred, for the same reason as in the tree.

**Closing:**

**Before sending the prompt**, you have to have this at hand:

- `PROJECT.md`, read in full by you (it has to fit in five minutes), with your corrections noted
  down: what is not true, what is not yours, what is superfluous.
- `docs/SEMANTIC_TREE.md`, walked node by node as if you were the client: every node marked as
  inferred has your verdict (confirmed or corrected), and you noted the actors that are missing,
  the states the business does not use, the screens nobody asked for.
- The list of corrections, written down, which goes into the [list] gap of the prompt. If the
  list is empty the first time, distrust your reading, not the agent.
- Minimum acceptable state: no node marked "inferred" is left without a verdict of yours.

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.
>
> When you need a decision from me, ask it with the four parts of UX-28
> (`docs/ANEXO_HEURISTICAS.md`) and in this order: the data that makes the question necessary,
> listed; one paragraph of at most five lines that links that data and lets the question be seen;
> the question itself with its possible answers numbered; and your recommendation. Say it at the
> technical depth the project declared in `communication_depth` -- `beginner`, `decision_maker` or
> `technical`; if the project declared none, use `decision_maker`.

What I am asking for: your corrections (above all to the nodes it marked as inferred), the date,
and two new rules in the agreement: the one that protects the project file from becoming history,
and the one that ties every pending item to a node of the tree, which is what keeps the tree alive
and what lets you spot an out-of-scope pending item in ten seconds.

## 3. Expected result

- `PROJECT.md` (or `CLAUDE.md`): short, mandatory reading, with what it is, for whom, what it is
  not, modules, decisions with dates, and the order to read it together with the tree. Three
  hundred lines at most.
- `docs/SEMANTIC_TREE.md`: the semantic tree, with the inferred nodes marked until you confirm
  them, and, from the first block onwards, the pending items and decisions hanging from their
  nodes.
- `docs/STATUS.md`: living state, separate from the previous two.
- The two prior inputs of Annex H, written and named in `PROJECT.md`: the **user glossary** (the
  words people actually use for each thing) and the **list of profiles** (who each one is and what
  they come to do), with whatever was inferred marked. The method declares the names of those two files
  -- `docs/GLOSSARY.md` and `docs/PROFILES.md` --, just as it declares the other three: a gate
  cannot look at a file whose name nobody knows, and while it declared none, the matrix of step 8
  could keep being invented against a list that nothing obliged to exist. What it demands is still
  the same: that they exist, that they can be found from the project file, and that they are there
  before step 5.
- In all three, a date of last update.
- In the agreement, the two new rules.
- In the project file, one line saying which version of the method the project works with: the
  `catalog_version` you pinned and the content fingerprint that version declares. It is what makes
  it possible, a year from now, to know against which definition each step was given its green,
  and what makes raising the version a decision instead of an accident.

## 4. Completeness check

- Does `PROJECT.md` fit in a five-minute read? If not, it is wrong: it is the programme, not the
  history.
- Does it say explicitly what the system does NOT do? (What is missing is what the agent is going
  to invent.)
- Walk the semantic tree as if you were the client: are all the actors you know there? Does each
  entity have the states the business uses, no more and no less? Is there any node you do not
  recognise? That one is an invention: correct it now.
- Are the inferred nodes marked? Did you confirm or correct all of them?
- Does each decision have a date and who made it?
- Did the agent ask anything about the business before drafting? If it asked nothing, check what
  it assumed.
- Is the living state in another file?
- Is the user glossary written, with the words people actually use for each thing? Read it and look
  for a word you would not say: if it is there, the system wrote it and not the business.
- Is the list of profiles written, saying who each one is and what they come to do? Count the
  profiles on the fingers of your business: if one is missing, a row of the matrix of step 8 is
  missing, and a batch of manual test cases of step 10.
- The reading test: close the session, open a new one, and ask it what the system does NOT do
  and which node of the tree a given screen hangs from. If it answers with the map, the hook
  works.
- Is it written which version of the method the project works with, with its fingerprint? If it is
  not, the day the definition changes nobody will be able to say whether the closed steps are still
  closed.

## 5. Warning signs

- The project file grew more than 20 % in a month. Something that is not programme is getting
  in.
- The agent starts a session proposing something that was already decided and written down. It
  did not read the map: the mandatory-reading hook failed.
- The "what it is not" section is empty or says "nothing in particular". Every system has
  boundaries; if they are not written down, the model is going to cross them.
- There are pending items that do not hang from any node of the tree. Either the tree went stale
  or those items are out of scope; both things have to be looked at.
- An entity in the tree has a state the business never named. The model invented it because it
  seemed logical, and it is going to build on top of it.
- The user glossary has the same words as the semantic tree. That is not a user glossary: it is the
  vocabulary of the system copied twice. Ask the business what they call it.
- The list of profiles has a single profile, "user". It almost never is true, and it is the most
  common way to arrive at step 8 with a one-row matrix that protects nothing.
