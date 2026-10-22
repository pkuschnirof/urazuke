# Annex H - Code quality and usability heuristics

**Status: APPROVED AND IN PRODUCTION.** No decision is left open: the form (D-043 and D-044), the switches (D-045 and D-046), the dashboard (D-047) and the initial severities with the weight of accessibility (D-048, section 10) are decided. The document is published in all eight languages of the method and its two prompts are part of the prompts API: from there, `build/prompts.mjs` requires the English text identical byte for byte in all eight or the build fails. Date: 2026-10-22.

Record of the decisions of this annex: `docs/DECISIONES.md`, D-043 to D-048. The compliance dashboard (section 12) was decided with two figures in D-047. The implementation work lives in PND-002; the translation and the indexing, in PND-003.

## 1. What is missing today, and why

Step 9 already measures the code, and it does so with a gate that lets nothing through: a single formatter, size limits (three hundred lines per file, forty per function), complexity per function, duplicated code, dead code, dependencies declared and used, coverage with a ratchet and mutation testing where there are real users. The number is written in `docs/CODE_QUALITY.md`. That is solved.

What is not solved is the other half of the product. I checked the corpus of steps: there is not a single mention of usability, of people/profiles or of functional grouping. The interface holds today on two things: the screenshot the owner looks at for ten seconds and the manual test cases. Both are good and both are human, expensive and forgetful. A system can pass the quality gate with honours and be unusable: everything green, and the person cannot find where to charge.

And there is a second-layer problem that is technical but shows up in the interface: when the same product is used by several profiles (administration, operations, queries, customer), the functionalities are enabled in three different places - the database, the menu and the route guard - which are written at different moments and drift out of sync on their own. The symptom is always the same: someone sees a button that is not theirs, or worse, someone who does have the permission cannot find the screen.

The two heuristics that follow attack those two things with the same form: a short catalogue of verifiable statements, a few instruments that measure them on their own, and a declared exception path for when the project needs to step out.

## 2. The model: three layers, one single form of rule

The temptation is to make a list of rules and tie it to the stack of the first project. That ages badly: the React rule does not apply in Angular, the Angular one does not apply in a server with templates, and in two years half the list is dead. The proposal separates three layers.

**Layer 1 - Agnostic core (not negotiable).** Statements about outcomes, not about tools. "There is a single formatter and nobody argues with it" applies equally in TypeScript, PHP or Go. The core is enumerated with stable identifiers and does not change from project to project.

**Layer 2 - Adapter per stack (configurable).** For each rule of the core, each frontend family declares *with what* it is measured and *with what threshold*. A React project with Vite, a Next one, an Angular one, a server with templates, a mobile one and a command-line one are six different adapters of the same core. Everything the user asked for as "configurable per frontend" lives here.

**Layer 3 - Project decisions (declared).** The concrete thresholds and the exemptions. They are not invented: they are asked of the owner and they stay written, just like the sizing of the architecture step. If a threshold is not declared, the adapter's applies and it is recorded as such.

Every rule is always written with the same six-field sheet:

| Field | What it contains |
|---|---|
| `id` | Stable identifier (`CQ-07`, `UX-12`). Never reused. |
| Statement | A single sentence, in the imperative, about an observable outcome. |
| Why | The concrete damage it avoids. If there is no damage, the rule is superfluous. |
| How it is verified | The instrument: automatic gate, matrix query, end-to-end test or manual case. |
| Severity | `BLOCKS` (the gate goes red and the block does not close), `WARNS` (opens a pending item), `RECORDS` (only stays in the document). |
| Applies to | Profiles where it rules. Outside them it does not run, and that is not an exception: it is scope. |

**The exception is declared, never omitted.** A rule is switched off with a four-field record: identifier, reason in one line, who authorises it (the owner, not the agent) and review date. A rule switched off without a record is a failure of the gate, not a decision. It is the same criterion the method already uses to refuse a limit raised "in order to pass".

## 3. The four instruments

No heuristic is worth anything if its verification is an opinion. There are four, and every rule declares which one it belongs to.

1. **Automatic gate.** It runs on every push and at block close. It returns green or red. It is cheap, it is repeatable and it does not argue. It measures everything that can be counted.
2. **Matrix query.** The functionality-by-profile matrix (see B2) is a declarative artifact; the menu, the routing and the permissions are derived from it. Checking the matrix is checking the interface. It is the piece that turns part of usability into something a machine can verify.
3. **End-to-end test per profile.** For each declared profile, a script that enters as that profile and compares the set of reachable functionalities against the row of the matrix: *neither less nor more*. It is the test that catches the two typical desynchronisations (the button that is left over and the screen that is missing).
4. **Manual case.** What no machine judges: whether the grouping is understood, whether the task is completed without help, whether the text is in the user's language. It is run with people and it is recorded, as step 10 already mandates.

## 4. Part A - Code quality

The core extends step 9: it does not replace it and does not contradict it, it gives a name, a severity and an adapter to each thing that is already measured, and it adds what is missing today, which is the interface seen as code.

| id | Family | Statement | Verifies | Severity |
|---|---|---|---|---|
| CQ-01 | Form | There is a single formatter, it runs without intervention and it admits no discussion. | Gate | BLOCKS |
| CQ-02 | Form | There is a single linter per repository and its rules are the same for everybody; a rule is switched off with a written reason, never in a loose file. | Gate | BLOCKS |
| CQ-03 | Size | No file exceeds the declared limit (starts at 300 lines) and no function exceeds its own (starts at 40). | Gate | BLOCKS |
| CQ-04 | Complexity | No function exceeds the declared path limit. | Gate | BLOCKS |
| CQ-05 | Duplication | No new duplication enters: the copied block is extracted or justified. | Gate | BLOCKS |
| CQ-06 | Dead things | There is no dead code: unused functions, variables, imports, branches and dependencies. | Gate | BLOCKS |
| CQ-07 | Types | If the language allows types, the project uses them seriously; the "any" type is a declared exception, not a habit. | Gate | WARNS |
| CQ-08 | Tests | Coverage does not go down: today's number is tomorrow's floor. | Gate | BLOCKS |
| CQ-09 | Tests | With real users, the mutation score is measured per block and every mutant that survives in new code opens a pending item. | Gate + record | BLOCKS |
| CQ-10 | Dependencies | Every dependency is declared, is used and does not bring a third-party tree out of proportion to what it contributes. | Gate | WARNS |
| CQ-11 | Secrets | There are no credentials, keys or connection strings in the repository, nor in the new history. | Gate | BLOCKS |
| CQ-12 | Interface | The interface does not decide: no screen or component contains business rules (what is allowed, how much it costs, which state follows). It lives in the domain and the view queries it. | Review at close + manual case | BLOCKS |
| CQ-13 | Interface | Every server call goes through a single typed client; no screen builds its own request by hand. | Gate (search) | BLOCKS |
| CQ-14 | Interface | There is a single place where shared state lives; duplicating state between screens is a failure, not a shortcut. | Review at close | BLOCKS |
| CQ-15 | Interface | Every visible text comes out of a translation catalogue; no user string stays written inside the component. | Gate (search) | BLOCKS |
| CQ-16 | Interface | Every interactive element carries a stable identifier and a role, so that the automated test finds it by name and not by position. | Gate (search) | BLOCKS |
| CQ-17 | Interface | All colours, spacings and typefaces come out of tokens; no loose magic value in the stylesheet. | Gate (search) | BLOCKS |
| CQ-18 | Interface | Basic accessibility is verified on its own: contrast, labels on fields, visible focus, keyboard navigation in the main flows, images with alternative text. | Gate | WARNS |

Rules CQ-12 to CQ-18 are the ones that make "code quality" mean something on the front end. Without them, the project can have ninety per cent mutation and a screen that computes the total with its own arithmetic inside a component: the worst of both worlds, because the duplicated calculation passes every backend test.

**Initial severities (D-048).** From day one, the fourteen rules that have a verifier and that do not depend on a threshold worth discussing block: CQ-01 to CQ-06, CQ-08 and CQ-11 to CQ-17. CQ-09 blocks where there are real users, which is where it is measured. Three warn, and only three: CQ-07 (types), CQ-10 (dependencies) and CQ-18 (accessibility), because they are the ones that need the project to calibrate first. The formatter, the linter, size and complexity **are not loosened**: step 9 already blocks them today, and this extends it, it does not replace it; inherited debt is resolved with a declared exception or with the ratchet baseline, never by lowering the severity. And CQ-12 and CQ-14 are the only two rules in this table that block with a human red rather than a machine one: they are verified at the close of the pending item and with the manual case in front, just like UX-22 and UX-27, not on every commit. If the project cannot sustain that close, the rule goes down to WARNS by recorded decision, not by oversight.

**Adapter per frontend family.** An example of how layer 2 is instantiated (the names are illustrative; the project chooses and writes them):

| Concept | Single-page application (React, Vue, Angular) | Server with templates | Native mobile | Command line |
|---|---|---|---|---|
| CQ-12 domain in the view | Lint rule on component size and dependencies + review | Controller review | View-model review | Command-layer review |
| CQ-13 single client | Generation from the API contract | Single server service | Generated client | Single SDK client |
| CQ-15 texts | Catalogue + rule that forbids visible literals | Template engine catalogue | Resource catalogue | Catalogue |
| CQ-16 identifiers | Declarative attributes per element | Identifiers in the markup | Accessibility identifiers | Stable output |
| CQ-17 tokens | Tokens in the stylesheet, no loose values | Same | Same | Not applicable |
| CQ-18 accessibility | Automated analyser in the gate | Analyser over the generated HTML | Accessibility analyser | Not applicable |

What changes between columns is the tool and the threshold. What does not change is the statement. That is what makes the heuristic agnostic without turning it decorative.

## 5. Part B - Usability

Five families. The first and the second are the ones the owner explicitly asked for; the other three exist because without them the grouping and the profiles degrade just the same, more slowly.

### B1 - Grouping by functional convergence

The mother rule: **a functionality is grouped by what the person came to do, not by the module it came out of.** The code is organised by entities ("Invoice", "Customer", "Payment"); people are not. Nobody enters the system to "manage entities": they enter to charge, to dispatch, to close the month. If the menu shows the entities, the person does the translating. The menu *is* the work.

| id | Statement | Verifies | Severity |
|---|---|---|---|
| UX-01 | Every menu group is named with a user job (in their vocabulary, with the project glossary), never with a technical module nor with a data entity. | Manual case + matrix review | WARNS |
| UX-02 | Every functionality has exactly one canonical home. If it serves two groups, one home is chosen and the other links to it; the entry is not duplicated. | Matrix query | BLOCKS |
| UX-03 | There are no orphans: every declared functionality is reachable from the entry screen in no more than three steps. | Automatic route walk | BLOCKS |
| UX-04 | The size of a group is reasonable: fewer than three functionalities indicates a group that was not a group; more than seven indicates a drawer. | Matrix query | WARNS |
| UX-05 | Every group has an entry screen that says what is done there and which is the main action. No group opens straight into an empty table. | Manual case | WARNS |
| UX-06 | The flows the person does often live together: if "record a payment" and "see the customer's account" are used in the same session, they share a group. | Manual case (task test) | RECORDS |
| UX-07 | The first-click test: the owner, facing a concrete task ("where do you charge a payment?"), names one place. If they name two, there is duplication; if they name none, there is an orphan. It runs at the close of every block. | Manual case | WARNS |

### B2 - Profiles and functionalities enabled per profile

Here is the piece that pays the most, and the reason is engineering, not design: **enablement is declared once, in a matrix, and everything else is derived from it.** Today the classic error is writing the permission three times (in the menu, in the route guard and in the data filter) and having the three drift apart. With the matrix as the single producer, the menu, the routing, the server permissions and the test scripts are consumers, and the producer/consumer symmetry the method already demands becomes verifiable on its own.

The matrix has four columns and one row per functionality: *functionality*, *home* (the group from B1), *profiles that have it*, *entry route*. Nothing else.

| id | Statement | Verifies | Severity |
|---|---|---|---|
| UX-08 | Every functionality declares in the matrix which profiles have it. A functionality without a profile does not exist: either it is given a profile or it is deleted. | Matrix query | BLOCKS |
| UX-09 | Every declared profile has at least one functionality and its own entry point. An empty profile is a profile nobody used while designing. | Matrix query | BLOCKS |
| UX-10 | Navigation is generated from the matrix. A hand-written menu is a failure, not a shortcut. | Gate (search) | BLOCKS |
| UX-11 | Hiding is not protecting: every route verifies the permission on the server side in addition to hiding the entry. Typing the address by hand is not enough to get in. | End-to-end test | BLOCKS |
| UX-12 | Neither less nor more: for each profile, the set of reachable functionalities is exactly the one in its row of the matrix. | End-to-end test per profile | BLOCKS |
| UX-13 | The refusal is explained: if a person enters a functionality that is not theirs, they see a message that says why and who to ask for access. Never a blank screen, never a grey button without a reason. | Manual case | WARNS |
| UX-14 | The same button means the same for everybody: if two profiles share a label, they share an effect. If the effect changes per profile, the label changes or the functionality is split in two. | Manual case | WARNS |
| UX-15 | Data is also filtered by profile: whoever sees the list sees the rows that correspond to them, not the whole list with the rows hidden in the browser. | End-to-end test + server review | BLOCKS |
| UX-16 | The matrix and the user manual are updated in the same pending item as the functionality. A new functionality without a row in the matrix does not close. | Pending close | BLOCKS |

### B3 - States, and what the person sees when something is not there

Most "it does not work" complaints are screens that did not know how to say "there is nothing", "it is loading" or "it failed". Four states, always, in every list and every detail screen.

| id | Statement | Verifies | Severity |
|---|---|---|---|
| UX-17 | Every list has four resolved states: with data, empty, loading and with error. The empty one distinguishes "there is nothing yet" from "your search found nothing". | Manual case + review | WARNS |
| UX-18 | While something takes time, it is visible that it is working and it can be cancelled if it is long. A button that answers nothing is complaint number one. | Manual case | WARNS |
| UX-19 | The error says what happened, what can be done and does not erase what was entered. Neither a technical code alone, nor an "an error occurred". | Manual case | WARNS |

### B4 - Actions and errors

| id | Statement | Verifies | Severity |
|---|---|---|---|
| UX-20 | A screen has one evident main action; the rest are secondary and look like it. | Manual case | WARNS |
| UX-21 | Every destructive action asks for confirmation naming the affected object, and when it can be done it is undone instead of confirmed. | Manual case | WARNS |
| UX-22 | A form that fails keeps what was entered and marks the field with the problem, in the place of the field. | Manual case | BLOCKS |
| UX-23 | No action leaves the screen without an exit: after saving, deleting or cancelling, the person knows where they are and how to continue. | Manual case | WARNS |

### B5 - Language and accessibility

| id | Statement | Verifies | Severity |
|---|---|---|---|
| UX-24 | The interface speaks the language of the project glossary: the same object is called the same on the screen, in the manual and in the email. A synonym is a defect. | Manual case + review | WARNS |
| UX-25 | Everything can be done without a mouse and with a screen reader in the main flows; the focus is always visible and it does not get trapped. | Gate (CQ-18) + manual case | WARNS |
| UX-26 | States are not communicated by colour alone; every informative image has alternative text; texts are read at normal size without zoom. | Gate (CQ-18) | WARNS |
| UX-27 | Every pending item that touches a screen delivers the real screenshot of the test environment, and the owner looks at it before closing. The screenshot is not optional and it is not a mock-up. | Pending close | BLOCKS |

## 6. Where it hooks, and what artifacts it produces

The annex does not invent new steps: it hangs from the ones that exist. That avoids duplicating gates and avoids the usual fate of usability lists, which is to be read once.

**Where it goes (D-043).** It is transversal to the four stretches, with the main weight on the Construction Loop (steps 5 to 12), which is where things are decided and built. It is not a step of its own: a numbered step would force the ladder to be renumbered, would alter the step count and would subject the annex to the mandatory translation of the contracts into the eight languages before the construction could pass green, without adding any gate the loop does not already have.

**How it hooks (D-044).** One canonical source, five anchors and two previous entries. The text of the rules lives only here and the prompts cite it; they never copy it. Repeating the forty-five rules inside the eight prompts of the loop dilutes them (they compete with the work of each step and the agent obeys them differently each time), drifts them (two copies of the same text drift apart on their own, which is the antipattern step 11 pursues) and does not make them more transversal: what makes a rule transversal is that every block passes through the same gate, not that the rule is written everywhere.

| Moment | What is added | Why there |
|---|---|---|
| **Previous entry 1** - scope definition | The user glossary | Without a glossary, UX-01 and UX-24 have nothing to compare against. |
| **Previous entry 2** - scope definition | The list of profiles | Without the list, the matrix of B2 is invented in step 5 and everything derived from it is born without foundation. |
| **Anchor 1** - step 5 (the plan) | Every pending item that touches a screen declares three things: which convergence group it belongs to (B1), which profiles have it and which acceptance criteria are per profile ("given profile X, the person can do Y and cannot do Z"). Without that declaration the pending item does not pass the step. | Here the grouping and the profiles are *born*: they are planning decisions, not code ones. It is the highest-yield anchor and the one that does not exist today. |
| **Anchor 2** - step 8 (tests in red) | The matrix becomes a test that is first seen failing: for each profile, what is reachable against its row (UX-11, UX-12, UX-15). | Without this the matrix is a document nobody looks at. |
| **Anchor 3** - step 9 (quality) | The complete CQ catalogue with its adapter and its declared thresholds; `docs/CODE_QUALITY.md` reports per rule, not as a single number. And the matrix as a gate (UX-02, UX-03, UX-08, UX-09, UX-10, UX-16). | It is the only place where the text enters literally as a directive, and it is the gate that runs on every block with a ratchet. |
| **Anchor 4** - step 10 (manual cases) | Each case is run **once per affected profile**, derived from the matrix and not written by hand. A case run with a single profile does not count as run. | The manual cases are the only human verification of the method; if they are not opened per profile, half of B2 is never looked at. |
| **Anchor 5** - step 12 (verification and honest reporting) | The report says what was measured, what stayed on warn and which rule is switched off, with its reason, its author and its review date. | Zero silent damage: a switched-off group cannot be read as fulfilled. |
| User manual | It is organised by the groups of B1 and declares, per group, which profiles enter. | The manual and the menu are named with the same words or the glossary breaks. |
| Close of every block | First-click test (UX-07), screenshot of the real environment (UX-27) and the two end-to-end tests of the matrix. | They are the three verifications that cannot be automated. |

**Status (D-049).** The five anchors are wired: the opening prompt of steps 5, 8, 9, 10 and 12 cites this annex in the eight languages, with a single English wording identical in all of them and its local translation alongside. The document is published on the site with the rest of the method in the eight languages, and its two prompts entered `docs/html/api/prompts.json` as contract `anexo-h`: from there `build/prompts.mjs` compares them byte for byte in all eight or the build fails.

Steps 6, 7 and 11 receive at most one line: step 6 already records thresholds and exceptions as decisions (it is the natural place of the declared exception), and step 11 is where the case of the matrix written in four places comes in with blows. They are not given text of their own so as not to dilute them.

Three artifacts, all in `docs/`: `CODE_QUALITY.md` (extended), `USABILITY.md` (new, with the result per rule and the declared exceptions) and `PROFILE_MATRIX.md` (the matrix, which is at the same time a document and the source of the menu).

## 7. Configuration

A single file per project declares layer 2 and layer 3. Example with the proposed form, not with definitive values:

```json
{
  "version": 1,
  "frontend": "react-vite",
  "measured_by": {
    "format": "prettier",
    "lint": "eslint",
    "types": "tsc",
    "complexity": "eslint-complexity",
    "duplication": "jscpd",
    "dead": "knip",
    "coverage": "vitest-coverage",
    "mutation": "stryker",
    "accessibility": "axe-core"
  },
  "thresholds": {
    "lines_per_file": 300,
    "lines_per_function": 40,
    "paths_per_function": 10,
    "minimum_coverage": 0,
    "mutation_target": 0
  },
  "exceptions": [
    {
      "rule": "CQ-17",
      "reason": "inherited printable report, without tokens",
      "authorised_by": "owner",
      "review": "2027-01-31"
    }
  ]
}
```

The two zeros are deliberate and they are the part that matters: the minimum coverage is set by the ratchet with what was measured, and the mutation target is set by the owner when the project has users. If they are at zero and nobody declared them, the gate reports it as an undeclared threshold instead of inventing it.

## 8. The two pieces, in the form the method uses

**Code quality.**

> Set up and maintain the code-quality gate for this project, configured for its frontend family. The core rules are the same in every project; what changes is how each one is measured and at which threshold. Install one formatter and one linter with a single shared configuration; enforce size limits per file and per function, complexity per function, duplication, dead code, declared-and-used dependencies, type checking where the language allows it, coverage with a ratchet, and secret scanning. Where the project has real users, add mutation testing scoped to the changed lines and record the score per block. Then extend the gate to the frontend itself: no business rule inside a screen, one typed client for every server call, one home for shared state, no user-visible string outside the translation catalogue, a stable identifier and role on every interactive element, styling only through tokens, and automatic basic accessibility checks. Every rule has a stable id, a severity (blocks, warns, records) and a named verifier. Thresholds and exceptions are declared by the owner in one configuration file; a rule switched off without a written exception is a gate failure, not a decision. Report the result per rule in `docs/CODE_QUALITY.md`, not as a single number.

**Usability.**

> Build the usability criteria for this project before writing the first screen, and enforce them where the method already has hooks. Group functionality by what the person came to do, never by the internal module or the data entity: every menu group is named with a user job in the project glossary, every functionality has exactly one canonical home, no functionality is orphaned, and every group is reachable in no more than three steps from the entry screen. Then declare accessibility in one matrix and derive everything from it: each functionality lists the profiles that have it, each functionality has at least one profile, each profile has at least one functionality and its own entry point, the navigation is generated from the matrix instead of written by hand, and every route checks the permission on the server because hiding an entry is not protecting it. Verify the matrix per profile with an end-to-end check that compares what is reachable with the matrix row: neither less nor more. Require the four states on every list (with data, empty, loading, error), a visible working indicator with the option to cancel long operations, an error message that says what happened and what to do without losing entered data, a primary action per screen, confirmation or undo for destructive actions, and a form that keeps what was typed. Run each manual test case once per affected profile, run the first-click check at the close of every block, and require a real screenshot of the test environment on every item that touches a screen. Record the result per rule, with owner-declared exceptions, in `docs/USABILITY.md`, and keep the matrix in `docs/PROFILE_MATRIX.md` as the single source of truth.

## 9. What this proposal does not do

- **It does not add a step.** They are forty-five transversal rules (18 of quality and 27 of usability), not a new stage. They hang from the steps that already exist.
- **It does not invent a score.** A number of "usability 78" does not say what to fix and gets optimised in the wrong direction. It is reported per rule. Section 12 proposes two derived figures, but they are a count of rules with their entry - not a quality or usability grade - and they do not authorise closing anything.
- **It does not replace the owner.** The first-click test, the screenshot and the task test remain human: they are the only instrument that distinguishes "it works" from "it serves".
- **It brings no factory thresholds.** Those of the adapter are a declared starting point; the project that does not declare its own inherits them and it is recorded as such.
- **It does not promise that the gate detects bad grouping.** A machine can verify that there is no duplication and no orphans; if the group is called "Management", a person has to see it.

## 10. The decisions: what is settled and what is missing

### Settled

| # | Decision | Record |
|---|---|---|
| 1 | **Transversal to the Construction Loop, not a step of its own.** The ladder is not renumbered, the step count is not altered and the annex does not inherit the obligation to translate a step contract. | D-043 |
| 2 | **One canonical source with five anchors and two previous entries,** instead of copying the forty-five rules inside the eight prompts of the loop. | D-044 |
| 3 | **Two independent switches** (quality and usability), three states per rule (blocks, warns, switched off), adapter per frontend family, thresholds and exceptions declared by the owner. | D-045 |
| 4 | **Switch discipline:** it lives in the project configuration and not in the prompt; switching off is only valid as a recorded decision with reason, author and review date; the switching off is observable in the report; and the switch is tested by turning it on and off. | D-046 |
| 5 | **Initial severities, fixed rule by rule:** in quality fourteen block (CQ-01 to CQ-06, CQ-08, CQ-11 to CQ-17), CQ-09 blocks where there are real users, and three warn (CQ-07, CQ-10, CQ-18). In usability eleven block (UX-02, UX-03, UX-08 to UX-12, UX-15, UX-16, UX-22, UX-27), UX-06 only records and the rest warn. Neither "everything blocks" - the project does not start - nor "everything warns" - the heuristic is an ornament. | D-048 |
| 6 | **Accessibility starts by warning and escalates to blocking by declaration of the owner** when the product has end users outside the organisation. The default is not invented: the escalation is declared, with the same mechanism as any threshold (D-045). | D-048 |

### Closed in D-048, and the two corrections it carries

The two questions that were blocking the writing of the prompts are already answered: the first one became row 5 and the second one row 6. But the recommendation that was approved had two errors of fact, and they are written here so that they do not come back:

1. **The counting defect.** Where this annex said "twenty-seven rules" the correct number is **forty-five**: 18 of quality (CQ-01 to CQ-18) and 27 of usability (UX-01 to UX-27). The old figure came from a draft that only counted half. Corrected in sections 6 and 9 and noted in D-048; the text of D-044 is kept as it was written, because a decision is a record and it is not rewritten.
2. **The formatter, the linter, size and complexity are not loosened.** An earlier version of this recommendation sent them to "warns" so as not to block projects with inherited debt. It cannot be: step 9 already blocks them today, and this extension extends it, it does not replace it. Inherited debt is resolved with a declared exception - with reason and review date - or with the ratchet baseline, not by lowering the severity of the rule.

And a declared limitation, because it is the only one of its class: **CQ-12 and CQ-14 block with a human red.** No tool proves that a screen does not decide business rules. They are verified at the close of the pending item, with the manual case in front and the same criterion as UX-22 and UX-27; if the project cannot sustain that close, they go down to WARNS by recorded decision. A rule that blocks and that nobody verifies is worse than a rule that warns.

### Calendar, not decision

**The translation.** Done: the annex exists in the eight languages and its two prompts are part of the prompts API, byte-identical in English across the eight versions (D-043 requires it and `build/prompts.mjs` enforces it). The Spanish text remains the canonical one: if a translation and the Spanish text ever disagree, the Spanish one wins and the translation is fixed in the same change.

## 11. How it is verified that the gate watches

A heuristic that changes nothing when it is turned on or off is not a gate, it is decoration. The acceptance test of the implementation (PND-002) is a fixture project with deliberate violations of each family:

| Scenario | Required result |
|---|---|
| Quality on, with a violation | Red, naming the rule and the file where the violation is. |
| Quality off **with a record** | Green, and the report **says** that it is off, since when and who authorised it. |
| Quality off **without a record** | Red. Switching off without a written reason is a failure, not an absence of rule. |
| Usability on, with a profile that reaches too much | Red on UX-12, with the profile and the functionality named. |
| Usability on, with a functionality without a row in the matrix | Red on UX-08 at the close of the pending item (UX-16). |
| Both groups off | Green in both, with the two switching-off lines in the report. |
| A violation is planted of a rule that **warns** | Green, and a pending item opens that names the rule and the file: warning is not approving. |
| A violation is planted of a rule that **blocks** | Red, with rule, file and remedy named. And there is no dashboard: the average does not close blocks. |
| Dashboard: a rule is switched off **with a record** | Compliance may go up, but the **gate coverage goes down** and the figure is published with the entry that explains it. With a single figure this scenario would go unnoticed; it is the proof that the two figures exist for a reason (D-047). |
| Dashboard: two runs with different regulations | Both figures are shown with their fingerprint (catalogue version, active and switched-off rules, adapter, tool versions) and **they are not plotted as a continuous series**: they are two different yards and saying so is part of the result. |
| Dashboard: invalid regulation (rule switched off without a record) | It emits no figures. The output is red, not a dashboard with an asterisk. |
| Dashboard: high compliance with a rule that blocks in red | The block **does not close**. The dashboard averages; the green is decided by each rule, one by one. |
| Dashboard: the percentage improves by touching only the automatic part | The percentage goes up and the human verification line does not move; it is reported separately and the report does not add the two things into a single number. |

What is looked at is not only the colour: it is looked at that the two switching-off lines **exist** in the report. A green result without that line is the only failure this test cannot detect on its own by colour, and that is why it is verified by reading the output.

## 12. The compliance dashboard (DECIDED: two figures, D-047)

**Status.** Decided on 2026-10-22 in D-047: the dashboard goes with two figures, with the fingerprint of the regulation, with a ratchet, with the human part outside the percentage and with the entry mandatory. It does not authorise closing blocks. What follows is the specification that the implementation (PND-002) has to comply with.

**What it is.** A deterministic derivative of the per-rule result that the gate already emitted. It measures nothing new and judges nothing new: it counts. If the dashboard could change the verdict of a rule there would be two sources of truth for the same thing, which is exactly what the annex fights in UX-10 (navigation is derived from the matrix) and in CQ-14 (a single place for state).

**What it is not.** It is not an acceptance criterion. No figure authorises closing a block: the green or the red is decided by each rule that blocks, one by one. The dashboard describes the trend and points at what to look at. If it starts being used as a closing threshold, it stops serving, because the shortest path to raise a number is to switch rules off.

**Two figures, never one.**

| Figure | Formula | What it measures | How it moves |
|---|---|---|---|
| **Compliance** | rules that pass / active rules | how clean what is being looked at is | goes up when it is fixed |
| **Gate coverage** | active rules / rules declared in the catalogue | how much of the annex is really watching | goes down when a rule is switched off |

The reason there are two: switching a rule off **raises** compliance and **lowers** coverage. With a single figure switching off is free and the dashboard rewards blindness. With two figures that move in opposite directions, the shortcut disappears: to show a better dashboard the code has to be fixed, not the rules switched off. And coverage cannot be raised without measuring.

**The fingerprint of the regulation.** Every record keeps with which yard it was calculated: catalogue version, active and switched-off rules, frontend adapter and tool versions. Without that, an 82 from yesterday and a 91 from today are not the same measurement even if they are written the same: they are two different regulations and the series is false. Two figures without a fingerprint produce an illusion of progress, which is worse than having no dashboard. If the fingerprint changes, the record is marked as **not comparable** or the history is recalculated with the current yard; it is never plotted together without saying so.

**Ratchet.** Compliance does not go down from one block to the next without a recorded decision that explains it. It is the same mechanism that test coverage already has in CQ-08: today's number is tomorrow's floor. Going down is not forbidden; going down without a record is.

**What does not enter the count.** What only a person can judge - the first-click test (UX-07), the task test (UX-06), the screenshot (UX-27) and all the manual cases - is recorded as passed or failed, per block, with name and date, and is reported separately as human verification coverage. It does not enter the compliance percentage. If they are mixed, the result is a number that is sixty per cent measurement and forty per cent opinion, and nobody can say which is which. That is why section 9 still holds: the dashboard does not invent a usability grade, it counts rules.

**How it is falsified.** It extends the acceptance test of section 11:

| Scenario | Required result |
|---|---|
| A violation is planted of a rule that blocks | Compliance goes down by exactly one rule out of the active ones, and the red appears with the rule named. |
| A rule is switched off with a record | Compliance may go up; coverage goes down by one rule out of the declared ones; the report names the rule, the reason and the review date. |
| It is switched off without a record | Red, and no dashboard is emitted: an invalid regulation produces no figures. |
| Same tree and same configuration, two runs | The same figure, identical. |
| The configuration changes between two blocks | Both records are marked as not comparable, or the history is recalculated with the current yard. |
| The dashboard is used as a closing criterion | Misuse, not a valid scenario: the green is decided by the rule, not by the average. |

**Where it appears.** In the honest report of step 12 (anchor 5), and in this order: first the binary verdict of the gate, then the two figures, then what is switched off and until when, then the movement against the previous block with its named cause. Always with the entry: *it went down four points: CQ-15, three strings outside the catalogue on the charging screen*. A figure without an entry is noise; the entry is what makes it actionable for an owner who does not read code.

**Declared risk.** The dashboard is going to be read by the owner, who does not read code, and that is why they will want it to go up. The number becomes the objective, and the objective displaces the purpose. The defences are the ones above, and there are five: two figures that contradict each other when switching off, the fingerprint that prevents comparing different yards, the ratchet that does not allow going down without a record, the human part outside the percentage and the mandatory entry, with the gate that is not negotiated by average. If any of the five falls, the dashboard is switched off: a dashboard badly used does more damage than not having one.

## 13. Record

Every decision of this annex stays in `docs/DECISIONES.md` with date, author, textual quote and impact files: D-043 (form), D-044 (mechanism), D-045 (switches), D-046 (switch discipline), D-047 (the dashboard with two figures) and D-048 (initial severities and the weight of accessibility). The implementation and its acceptance criteria live in PND-002; the translation and the indexing, in PND-003.

No decision is left open: the form (D-043 and D-044), the switches (D-045 and D-046), the dashboard (D-047) and the initial severities with the weight of accessibility (D-048) are decided. The text travels in the eight languages and is part of the prompts API, which closes the only item that was left on the calendar.
