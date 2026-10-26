# The twenty-five questions for the provider

This sheet is for one very concrete moment: somebody is offering to build you a system, or is
handing it over to you, and you do not program. You do not have to learn to program for this
meeting. You have to know **what to ask them to show you**.

The full method lives in the contracts of the twenty-four steps, and each contract carries its
"completeness check without reading code": the list of checks the owner makes on what was handed
over. That works while the project is running, but it is spread across thirty-two files and nobody
walks into a meeting with that. This sheet is the same thing, gathered together and ordered by
**what they are promising you**. You print it and you take it with you.

## The only rule you have to remember

**The answers that count are the ones that can be seen.** A file, a number with the command that
produces it, a test that was seen failing, a manual, a signature with a date. The ones that cannot
be seen are promises, and a promise is not an answer: it is an intention, said by somebody who wants
to close the meeting.

You do not need to understand what they show you. It is enough that it **exists** and that the
person opens it in front of you. If answering you requires explaining why not yet, write down the
date and ask again at the next meeting: what gets repeated twice without being shown is not going to
appear.

Three sentences worth recognising, because they mean "I do not have that":

- "Trust me, we always do it that way."
- "That is seen at the end, when everything is ready."
- "It is in my head / it is in the repository, I will send it to you later."

And one honest clarification in the other direction: **a "no" said with its reason is a good
answer.** "We have no load tests because it is thirty users and we agreed on that" is a no with a
reason, and it is exactly what the method calls proportionality. What is no use is the "yes" that
cannot be seen.

## If you only have ten minutes

If the meeting is short, these five carry more information than the twenty-five: number **4** (a
test seen in red), **7** (the plan is the pending items), **13** (the limit that stops
construction), **20** (the recovery manual, tested by a person) and **24** (the report that says
what could not be verified). If those five can be seen, the rest almost always is there. If none of
them can be seen, the rest almost never is.

---

## What they promise: "I will hand it over working"

**1. Can you show me the system running somewhere that is not your computer?**
What can be seen: an address you open yourself, on your phone, with test data. If it only works on
the machine of whoever built it, it does not exist yet as a system.
*(Step 15.)*

**2. What has to be true for you to consider a request of mine finished?**
What can be seen: written down, before starting, for each request. It should include "the test
passed" and "a person used it". If the answer is "when it works", there is no criterion: there is an
opinion.
*(Step 5, acceptance criteria.)*

**3. Is there an automatic test for every thing that matters to me?**
What can be seen: a run of the test suite, with numbers, on screen. You do not care about the
content: you care that there is output and that it says how many passed.
*(Step 8.)*

**4. Can you show me one of those tests **failing**?**
What can be seen: the piece of screen where the test turned red against the system without the fix,
with the command that ran it and the date. It is the most important question on the sheet: a test
nobody saw fail is a test nobody knows proves anything. A system can have a thousand passing tests
and watch nothing.
*(Step 8. In the method it is called "proven in red".)*

**5. Who, other than you and a program, used the system and got all the way through?**
What can be seen: a list of test cases written for a person, with a date, with the name of whoever
ran them and what happened. Whoever built it cannot be the only one who tested it, and the model
tests what it understood, which is not always what you asked for.
*(Step 10.)*

**6. If I do something wrong on the screen -- enter it twice, hit the button in a hurry -- what
happens?**
What can be seen: the list of actions that cannot be undone, each with its lock and what happens if
it fails halfway. The correct answer is never "that should not happen".
*(Step 14.)*

## What they promise: "I know what is left and in what order"

**7. Where is the list of what is left, and can I see it today?**
What can be seen: a register of numbered pending items, each one written out in detail and with the
date it was closed. **That list is the plan**: if there is a plan somewhere else and a list over
here, there are two plans, and the one that counts is the one nobody is looking at.
*(Step 5.)*

**8. Is every thing you are going to build for me written down before building it, in my words?**
What can be seen: the open pending item, with the story of where the request came from said the way
you said it, the rules that apply, the screens and the odd cases. If it is one line, somebody is
going to invent what is missing.
*(Step 5.)*

**9. When something about the business is not clear, what do you do?**
What can be seen: the decisions file, with the date and who decided each one. The answer you are
looking for is "I ask you and I write it down". A model that finds a gap in the business rules fills
it in on its own and moves on, and six weeks later nobody knows why the system does that.
*(Steps 1 and 6.)*

**10. Is it written down what the system is **not** going to do?**
What can be seen: a section of its own, with at least two items, in the project document. What is
left unsaid is exactly what is going to turn up built some other way.
*(Step 2.)*

**11. Who are the different types of person who are going to use this, and is it written down what
each one can do?**
What can be seen: the list of profiles -- who each one is and what they come to do -- and a table
saying what each profile can do. If there is a single profile called "user", half of it is usually
missing: it is the most common cause of somebody seeing a button that is not theirs, or of somebody
who does have the permission not finding the screen.
*(Step 2, the prior inputs of Annex H; step 8, the matrix.)*

## What they promise: "it is well made"

**12. What does a machine measure on every change, without anybody having to remember to look?**
What can be seen: the configuration of the verification chain in the repository and the record of
the last run. "We review it among ourselves" is not an answer: it is a habit, and habits fall over
in the week there is a rush.
*(Steps 4 and 9.)*

**13. Is there a limit that, if crossed, **stops** construction?**
What can be seen: a file with the limits and their measured value as of today, and a run stopped by
one of them. The control question, worth asking verbatim: *did you ever raise a limit in order to
keep going?* If the answer is yes and it is not written down why, the limit is decorative.
*(Step 9.)*

**14. How do you know somebody else will be able to maintain the code?**
What can be seen: the result per rule, not a single number: file size, function size, duplicated
code, dead code. A "ninety-five per cent quality" does not tell you what to fix.
*(Step 9 and Annex H.)*

**15. Did somebody think about the screens, or did they come out of what the program needed?**
What can be seen: the record of the usability rules with their result, and the exceptions switched
off with the reason written down, who authorised it and when it gets reviewed. A system can pass
every technical check and be unusable: all green, and the person cannot find where to charge.
*(Annex H, the twenty-seven usability rules.)*

**16. Do the tests you showed me actually watch, or do they decorate?**
What can be seen: the mutation score. It is a program that introduces errors on purpose and counts
how many the tests catch; the number comes out with its command. If your system has real users, this
is not optional in the method.
*(Step 9.)*

## What they promise: "it will not harm you"

**17. What happens to my data if something breaks halfway through an operation?**
What can be seen: the table of actions with their reversibility, and the written rule that when in
doubt the system **stops** instead of carrying on. A duplicated charge or an automatic approval that
nobody looked at are the typical case.
*(Step 14.)*

**18. Are there backups, and did you ever test restoring one?**
What can be seen: the date of the last **tested** restore. A backup that was never restored is not a
backup: it is a file nobody knows anything about.
*(Step 20, recovery manual.)*

**19. Who checks that the system has no known holes, and how often?**
What can be seen: the scan running in the chain, with a date, and the findings turned into pending
items. Plus a short and very revealing question: *where are the system's keys and passwords kept?*
If they are in the code, you already have a problem.
*(Steps 18 and 15.)*

**20. Did somebody who does not program recover the system from scratch following a manual?**
What can be seen: the manual, and the record of that test with three things: how long it took end to
end, at which exact step the person got stuck, and which words they did not understand. If the
manual starts with "open a session with the agent", it is not a manual for a person. And while that
does not exist, said without hedging: **the owner is not an owner, they are a tenant**. They have the
system, they pay for it, and they cannot get in without asking permission from whoever built it.
*(Step 20.)*

## What they promise: "it will hold"

**21. What numbers did you size this with, and where did they come from?**
What can be seen: how many simultaneous users, how many operations per day, how much it grows per
year, how long it has to stay stored. And the part that matters: those numbers belong to **your
business**, not to whoever builds. If they invented them, they are wrong.
*(Step 3.)*

**22. Did you test it with the load I am going to give it, and with ten times more?**
What can be seen: the report of the run, with the exact point where the system fell over. Knowing
where it breaks is the only way to know how much margin you have.
*(Step 19.)*

**23. When the system is slow in six months, how are you going to know why?**
What can be seen: the logs with an identifier per action, the report of the slowest queries, and the
alerts configured. If the answer is "we look into it when it happens", you are going to see it first,
through an angry user.
*(Steps 16, 17, 21 and 22.)*

## What they promise: "I will tell you the truth"

**24. When you tell me something is done, how do I tell apart what you tested from what you assume?**
What can be seen: the report in three blocks: **verified** (with the proof next to it), **believed**
(and why it was not tested) and **blind spots** (what cannot be seen from where they are). A bare
"done" is not a report. And the second half of the question is worth more than the first: *what
things about this delivery could you **not** verify?* If the answer is "none, everything verified",
be suspicious: nobody verifies everything.
*(Step 12.)*

**25. Who reviews the work, besides you?**
What can be seen: an audit done by somebody -- or something -- other than whoever built it, with its
findings turned into pending items and with a date. A model endorses a considerable share of its own
errors, and so does a person. Whoever builds cannot be the only one who verifies.
*(Step 13.)*

---

## What to do with the answers

Write down, next to each question, one of three things: **I saw it**, **I have not seen it yet**
(with the date they promised it to you) or **it does not exist and they told me why** (with the
reason). It does not have to be twenty-five times "I saw it": a small project does not need load
tests or weekly monitoring, and the method says so. What does have to happen is that **every "no"
has its reason written down**, because a no with a reason is a decision of yours and a no without a
reason is a debt you are going to pay without having chosen it.

And one last one, unnumbered because it is not for the provider: if somebody gets uncomfortable
because you ask to see things, that is information too.

---

## Where this sheet comes from

The twenty-five questions are the "completeness check without reading code" of the contracts of this
method, gathered together: each one cites the step it comes from, so anybody can go to the contract
and read the full version. They are written from scratch for this sheet.

**The idea that this had to exist as a sheet is not mine.** It came from the first adaptation of the
method to another format -- Oscar Schmitz's novel "El Arte de Forjar Sistemas", 2026, credited in
Part F of the main document -- which said it better than I did: the method has the check spread
across its contracts and was missing the piece an owner takes to a meeting. The criterion at the top
of this sheet -- that the answers that count are the ones that can be seen -- is also from there. His
version of the questions is his work and carries his reserved rights; these are different ones,
written from my contracts, and that is why they are published under the licence of this repository.
