# Urazuke — step 5 prompts (English, single source)

Generated from `docs/peldanos/peldano-05-pendientes.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to turn everything that must be done into numbered pending items. Read `PROJECT.md`, the client's request and whatever is in `docs/STATUS.md`. If the request is ambiguous on any point such that you cannot write a verifiable pending item for it, ask me; do not resolve it by assuming. Create `docs/PENDING.md` with one item per thing to do: number (PND-001 onwards), one-line title, what is requested, which decision originates it (or "client request, date"), how it will be verified as done, and status. Order them by the priority I gave you; if I gave none, propose an order and tell me why. Reply in my language.

## Prompt 2

Before touching any code, open `docs/PENDING.md`, tell me which item you are taking and why. Every commit cites its pending item. A pending item is closed with written evidence (the test, the screenshot, the number), never with "done". If along the way you see something that is not on the list, add it as a new pending item; do not do it.
