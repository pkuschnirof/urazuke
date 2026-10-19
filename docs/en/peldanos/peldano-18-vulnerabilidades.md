# Step 18 — Scanning and fixing vulnerabilities, in the chain and on a schedule (step contract)

**Stretch:** going live.
**When:** in the go-live phase, after step 15 (the scan runs in continuous integration) and
before the first deployment: no open P0 gets promoted. Afterwards, on every push, and with a
schedule of its own (weekly) even if there are no pushes, because new vulnerabilities appear
without you changing anything. In a legacy system, the first run is part of N3 (the security
dimension of the audit) and the findings go into the backlog with their speed mark.
**Form:** one shot to set it up and run it; afterwards, automatic, with a report that you read.
**Size:** mandatory in every project that is going to have users: the dependency scan and the
secrets scan are not negotiable; the static analysis and the configuration baseline are
proportional.

## What it is for

The audit of step 13 looks at the system with fresh eyes every so often; this step looks at a
single thing, security, all the time and by machine. They are complementary: the audit finds what
requires judgement (an administrator door nobody should have
[Ref. 40](../REFERENCIAS.md#ref-40)); the scan finds what requires persistence (the dependency that
yesterday had no known vulnerability and today does [Ref. 41](../REFERENCIAS.md#ref-41)). The first
formal security audit convinced me that security is a periodic routine and not a list you tick
once [Ref. 23](../REFERENCIAS.md#ref-23); this step is that routine turned into a machine.

And a rule I want written down: **a dependency upgrade is a change**, and it comes in through the
loop like any other. "I bumped the version to close the vulnerability" without a regression suite
or an end-to-end suite is the most common way of breaking production on a Friday.

**If you are a beginner.** A *vulnerability* is a defect somebody can use to get in, steal data
or make the system do something it should not. There are four kinds that this step searches for
by machine. In the *dependencies*: the pieces of other people's software your system uses (there
are public databases that list which ones have known defects, identified with a CVE number). In
the *code*: *static analysis* reads the code without running it, looking for dangerous patterns,
such as an *injection* (a user writing into a form something the database interprets as an
order). In the *history*: a secret (a password, a key) that was once committed to the repository
is still there even if it was deleted afterwards. And in the *configuration*: open ports that
were not needed, default passwords, missing *security headers* (instructions the server sends to
the browser to protect it).

## 1. Required context

What follows is the generic list. The concrete files you have to have made before each prompt,
with their content and their minimum state, are in section 2, in the "Before sending the prompt"
block that precedes each one.

- Continuous integration (steps 4 and 15), where the scan runs.
- The survey of environments: which server, which container, which ports, for the configuration
  baseline.
- The previous audit (13, or N3), so as not to report what is already known.
- Your criteria about what is a P0: what lets somebody in, what exposes personal data, what allows
  charging or sending without control.

## 2. Prompts

**Opening (set up, run, propose):**

**Before sending the prompt**, this has to exist, and you (or the business with you) make it, not
the agent:

- Continuous integration running on every push (steps 4 and 15), with enough quota: the scan adds
  minutes per run; find out how many you have left.
- `docs/ENVIRONMENTS_SURVEY.md` with the server, the container if there is one, the exposed ports
  and who administers the domain, so that the agent knows which baseline to apply.
- `docs/AUDIT_[date].md` (step 13 or N3), so that it does not report what is known.
- Your P0 criteria in two lines, for the prompt's slot. For most systems: what lets somebody in
  without a credential, what exposes personal data, what allows charging, sending or deleting
  without control.
- Read access for the agent to the server for the configuration baseline; if you do not give it,
  that part stays as not scanned, and it has to say so.
- Minimum acceptable state: continuous integration runs, you know the quota, and you wrote down
  what a P0 is.

> We are going to scan this system for vulnerabilities and fix what matters before production.
> Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of
> every dependency against the known vulnerability databases; (2) static analysis of the code for
> the common classes of defect (injection, insecure deserialization, path traversal, weak
> cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole
> repository history; (4) a check of the server and container configuration against a baseline
> (exposed ports, default credentials, permissions, security headers, transport encryption). Run
> all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the
> evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production;
> P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a
> part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as
> clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any
> upgrade yet: an upgrade is a change and goes through the full routine. Reply in my language.

What I am asking for: the four layers of scanning (dependencies, code, secrets in the history,
configuration), in the chain **and on a schedule**, because new vulnerabilities do not wait for
your next push; the report with the shape of step 13, with the "not scanned" clause instead of
"clean"; the P0 criteria given by me; and the ban on upgrading without going through the loop,
which is the one that avoids the broken Friday.

**Closing (fix and turn into a gate):**

**Before sending the prompt**, you have to have this at hand:

- `docs/SECURITY_[date].md` read by you, with two findings verified (ask it for the evidence).
- The list of approved fixes for the prompt's slot; for every dependency upgrade, the awareness
  that it is a change and that it is going to run the regression suite and the end-to-end suite.
- Minimum acceptable state: no P0 without a verdict.

> Fix [list], each as its own pending item, with its test proved red where a test applies (an
> injection that no longer passes, a header that is now present, a secret that is now refused),
> and with the regression suite and the end-to-end suite green after every upgrade. Run the scan
> again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is
> promoted to production with an open P0, and a new P1 opens a pending item automatically. Record
> the policy, the schedule and what is not covered in `docs/SECURITY.md`.

What I am asking for: one pending item per fix, with the red of step 8 where it is possible (a
vulnerability fixed without a test comes back with the next refactor); the repeated scan as
evidence; and the conversion into a gate, which is what keeps this step alive when nobody is
looking at it.

## 3. Expected result

- The four-layer scan running on every push and weekly.
- `docs/SECURITY_[date].md` with the findings and what was not scanned; `docs/SECURITY.md` with
  the policy, the schedule, the gate and the coverage.
- The P0s and P1s fixed, each with its pending item and its test where it applies.
- The gate in `docs/GATES.md`.

## 4. Completeness check

- Ask it for the link to the last run of the scan: is it green, and what date is it from?
- Does the report say what it did NOT scan?
- Does every P0 have its pending item closed with evidence, or open with a date?
- Ask it to introduce on purpose a dependency with a known vulnerability on a branch: does the
  chain go red?
- Do you know when the next scheduled scan runs?

## 5. Warning signs

- The scan came out clean on the first try on a system more than a month old. It is almost never
  true: a layer is missing, or only the branch was scanned and not the history.
- Ten dependencies were upgraded in one commit "to close the findings". That commit has no before
  and no after; it is the broken Friday waiting to happen.
- The scan is there but it is not a gate: it produces reports nobody reads.
- There is an "accepted" P0 with no pending item, no date and no signature.
