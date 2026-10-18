# Step 2 — The project definition, the semantic tree and mandatory reading (step contract)

**Stretch:** start-up.
**When:** written once, in the first week, after the agreement; the semantic tree and the living
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

- Business survey: what the client does, who uses the system, what problem it solves, what it
  must not do. With the interviews, the use cases or user stories you can name, and the business
  entities with their states, even if they are incomplete.
- The working agreement (step 1).
- If there is a previous system: read access to its code or its documentation.
- The decisions already made, if any, even if only spoken.

## 2. Prompts

**Opening:**

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
> the survey, so that I can confirm or correct it. Separately, create `docs/STATUS.md` for the
> living state (what is being worked on, what is open): that file changes every day; the other
> two change only when the system changes. Reply in my language.

What I am asking for: that it evaluate the survey and ask before drafting; that the project file
be **short** (the three-hundred-line cap is arbitrary but necessary: without a cap, it grows);
that it say explicitly what the system is **not**, because what is left unsaid is what the model
is going to invent; that the decisions carry a date; that it build the **semantic tree** with the
full structure (domains, actors, use cases with their parts, entities with states and
transitions, screens, integrations), which is the domain model of requirements engineering put in
the shape of a tree; that it **mark what it inferred**, because that is where the inventions hide;
and that it separate the living state into another file, so that the map does not turn into
history.

**Closing:**

> Apply these corrections: [list]. Finalize `PROJECT.md` and `docs/SEMANTIC_TREE.md` with
> today's date. Add to the working agreement two rules: the change history never goes into
> `PROJECT.md` (it goes to `docs/STATUS.md` or to the pending-items register); and every pending
> item must hang from a node of the semantic tree, and the tree is updated in the same commit
> whenever a block adds or changes a node.

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
- In all three, a date of last update.
- In the agreement, the two new rules.

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
- The reading test: close the session, open a new one, and ask it what the system does NOT do
  and which node of the tree a given screen hangs from. If it answers with the map, the hook
  works.

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
