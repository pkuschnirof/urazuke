# Urazuke — step 18 prompts (English, single source)

Generated from `docs/peldanos/peldano-18-vulnerabilidades.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to scan this system for vulnerabilities and fix what matters before production. Set up, in continuous integration, on every push and also on a weekly schedule: (1) a scan of every dependency against the known vulnerability databases; (2) static analysis of the code for the common classes of defect (injection, insecure deserialization, path traversal, weak cryptography, hard-coded secrets, insecure defaults); (3) a secrets scan over the whole repository history; (4) a check of the server and container configuration against a baseline (exposed ports, default credentials, permissions, security headers, transport encryption). Run all of it now and write `docs/SECURITY_[date].md` with every finding: where, the risk, the evidence, the priority (P0 must be fixed now by my criteria: [criteria]; P1 before production; P2 when possible), and whether a fix exists (an upgrade, a patch, a configuration change). If a part cannot be scanned from where you are, say so and mark it as not scanned; do not pass it as clean. Then propose the fixes for every P0 and P1, one pending item each. Do not apply any upgrade yet: an upgrade is a change and goes through the full routine. Reply in my language.

## Prompt 2

Fix [list], each as its own pending item, with its test proved red where a test applies (an injection that no longer passes, a header that is now present, a secret that is now refused), and with the regression suite and the end-to-end suite green after every upgrade. Run the scan again and show me it is clean of P0 and P1. Make the scan a gate in `docs/GATES.md`: nothing is promoted to production with an open P0, and a new P1 opens a pending item automatically. Record the policy, the schedule and what is not covered in `docs/SECURITY.md`.
