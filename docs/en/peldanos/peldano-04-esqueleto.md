# Step 4 — The skeleton with its gates (step contract)

**Phase:** start (once).
**Form:** one long shot, with the owner's visual approval at the end.
**Size:** mandatory in every project that will have users. In a throwaway prototype it can be
skipped; but if the prototype survives (they always survive), this step is the first thing to pay
for.

## What it is for

So that the system starts, is tested and is deployed EMPTY before it has any functionality.
Discovering deployment at the end is very expensive: in Kikan it arrived a month after the start and
cost five pending items in a row. If the skeleton is deployed in the first week, those blows land
with zero functionality at stake.

The general idea behind it: **the path to production is part of the product**, not a chore at the
end. A system that works on the programmer's machine and cannot be deployed is not a system; it is
a demo. And the only way to know the path works is to walk it when there is still nothing to lose.

## 1. Required context

- `docs/SIZING.md` (step 3): the chosen option defines the skeleton.
- Environments survey: where it will run (cloud, own server), whether there is a test environment
  and a production one, who has access, how deployment is done today if anything exists.
- The kind of project: new (greenfield), corrective, or evolution of something existing.

## 2. Prompts

**Opening:**

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

What we are asking for: to verify it has the access before starting (without that the skeleton
stays on the agent's machine); the exact list of what a skeleton is (structure, startup, one test,
continuous integration, deployment to test); the gates written down; a real screenshot of the test
environment, which is the only valid evidence that it was deployed; and the explicit prohibition on
adding functionality, because the model tends to "while I'm at it" and that breaks exact scope.

**Closing:**

> Skeleton approved. Record in `docs/STATUS.md` the test environment URL, the command to run
> the tests and the command to deploy, and mark this step as done. Then run the deployment a
> second time and show me that the second run changed nothing.

What we are asking for: to leave the three commands where the next session will find them, and to
prove that the deployment is repeatable (run it twice without breaking anything). That second run
is the proof that the procedure is a procedure and not luck.

## 3. Expected result

- The repository with the structure, the server and the screen starting up.
- A smoke test in green and the suite running in continuous integration (with the link to the
  green run).
- The deployment to the test environment working, with the URL, and run twice.
- `docs/GATES.md`: the list of gates, each with the condition to pass.
- A screenshot of the empty system running in the test environment.
- `docs/STATUS.md` updated with the three commands (run, test, deploy).

## 4. Completeness check

- Can you open the test environment URL and see the empty screen? (You do it, not the agent.)
- Is there a link to a green continuous-integration run?
- Was the deployment run twice, and did the second run break nothing?
- Are the gates written with one verifiable condition each?
- Is there any functionality you did not ask for? If so, the agent violated exact scope.

## 5. Warning signs

- The skeleton "works locally" but the deployment "we'll see later". No: the deployment is the
  skeleton.
- The screenshot is from the agent's machine, not the test environment. Ask for the URL.
- The gates say things like "the code has good quality". A gate is a verifiable condition: "the
  suite is green", "the deployment to test worked".
