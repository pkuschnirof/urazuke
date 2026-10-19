# Step 4 — The skeleton with its gates (step contract)

**Stretch:** start-up.
**When:** once, at the close of the start-up stretch, after the sizing and before any
functionality.
This is where all the initial infrastructure and the integration and deployment pipeline get
built.
**Form:** one long shot, with your visual approval at the end.
**Size:** mandatory in every project that is going to have users. In a throwaway prototype it can
be skipped; but if the prototype survives (they always survive), this step is the first thing
that has to be paid for.

## What it is for

Make the system start, test and deploy EMPTY before it has any functionality. Discovering
deployment at the end is hugely expensive: in one of my systems it arrived a month after the start
and cost five pending items in a row [Ref. 32](../REFERENCIAS.md#ref-32). If the skeleton is
deployed during start-up, those blows land with zero functionality at stake.

The general idea behind it: **the path to production is part of the product**, not a formality at
the end. A system that works on the programmer's machine and cannot be deployed is not a system;
it is a demo. And the only way to know the path works is to walk it while there is still nothing
to lose. That is why this step sets up everything the loop is going to use later: the repository
with its structure, the test environment, the continuous integration that runs the test suite on
every push, and the automatic deployment to the test environment.

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the
prompt" block that precedes each one.

- `docs/SIZING.md` (step 3): the chosen option defines the skeleton.
- Environments survey: where it is going to run (cloud, own server), whether there is a test
  environment and a production one, who has access, how it is deployed today if there is
  anything.
- The credentials of the place where it is going to be deployed, even if it is a free service.
- The kind of project: new, correction, or evolution of something existing.

## 2. Prompts

**Opening:**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- `docs/ENVIRONMENTS_SURVEY.md`: the environments survey, written by you. Where the system is
  going to run (a server you already have, a cloud service, which one); whether there is going to
  be a test environment and a production one, and whether they already exist; who has access to
  what; how it is deployed today if there is anything (by hand, a script, nothing); the kind of
  project (new, corrective, or an evolution of something existing); and the URL or the domain the
  test environment is going to have, if it is already known. The prompt names it "the
  environments survey", with no path: save it under this name, or tell it in the chat what it is
  called.
- The credentials of the place where it is going to be deployed, even if it is a free service:
  created, tested by you once (log into the panel), and kept outside the repository (in an
  environment file on your machine or in your tool's secret manager). The agent is told where
  they are; they are not pasted into the chat.
- `PROJECT.md` (step 2) and `docs/SIZING.md` (step 3), closed: the skeleton is built on the
  option chosen there, and the agent has to read it.
- Minimum acceptable state: you can log into the service where it is going to be deployed
  yourself, and the survey says which one the test environment is. Without that, the skeleton
  stays on your machine and the step is not climbed.

> We are going to build the skeleton of the system, with no functionality at all. Read
> `PROJECT.md`, `docs/SIZING.md` and the environments survey. Evaluate whether you have what is
> needed for the skeleton to run in the test environment (access, URL, deployment method); if
> anything is missing, ask me before starting. Then build: the folder structure; the server and
> the UI starting up; the test structure with one smoke test that passes; continuous
> integration running that test suite on every push; and the deployment to the test
> environment. Declare the gates of the workflow (what must be green to move from one stage to
> the next) in `docs/GATES.md`. When done, take a screenshot of the empty UI running in the
> test environment and show it to me. Do not add any functionality "while you are at it".
> Reply in my language.

What I am asking for: that it verify it has the access before starting (without that the skeleton
stays on the agent's machine); the exact list of what a skeleton is (structure, start-up, one
test, continuous integration, deployment to test); the gates written down; a real screenshot of
the test environment, which is the only valid evidence that it was deployed; and the explicit
prohibition on adding functionality, because the model tends to "while I am at it" and that
breaks the exact scope.

**Closing:**

**Before sending the prompt**, you have to have this at hand:

- The screenshot of the test environment the agent showed you, and your own visit to that URL
  from your browser: it has to look the same. It is the first human view of the system, and it is
  a milestone.
- A link to a green continuous integration run, asked of the agent and opened by you.
- `docs/GATES.md`, read: every gate has a verifiable condition.
- Minimum acceptable state: you saw the empty screen at the real URL, with your own eyes. If you
  only saw the screenshot, do not approve.

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

What I am asking for: leaving the three commands where the next session will find them, and
proving that the deployment is repeatable (running it twice without breaking anything). That
second run is the proof that the procedure is a procedure and not luck.

## 3. Expected result

- The repository with the structure, the server and the screen starting up.
- A smoke test in green and the test suite running in continuous integration (with the link to
  the green run).
- The deployment to the test environment working, with the URL, and run twice.
- `docs/GATES.md`: the list of gates, each with the condition to pass.
- A screenshot of the empty system running in the test environment.
- `docs/STATUS.md` updated with the three commands (run, test, deploy).

## 4. Completeness check

- Can you open the URL of the test environment and see the empty screen? (You do it, not the
  agent.)
- Is there a link to a green continuous-integration run?
- Was the deployment run twice, and did the second run break nothing?
- Are the gates written down, each with a verifiable condition?
- Is there any functionality you did not ask for? If there is, the agent violated the exact
  scope.

## 5. Warning signs

- The skeleton "works locally" but the deployment "we will see later". No: the deployment is the
  skeleton.
- The screenshot is from the agent's machine, not from the test environment. Ask for the URL.
- The gates say things like "the code has good quality". A gate is a verifiable condition: "the
  test suite is green", "the deployment to test worked".
