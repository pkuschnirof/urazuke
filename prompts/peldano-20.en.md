# Urazuke — step 20 prompts (English, single source)

Generated from `docs/peldanos/peldano-20-monitoreo-de-recursos-y-rendimiento.md` by `build/prompts.mjs`. Do not edit by hand.

## Prompt 1

We are going to keep this system watched in production. Using the metrics and logs of step 16, the budgets of `docs/PERSISTENCE.md` and the thresholds of `docs/PERFORMANCE.md`, set up: (1) collection of resource usage (CPU, memory, disk, database connections, queue sizes, external quotas) and of the response time of every function, endpoint, job and query, with the correlation id, kept with a history; (2) alerts when any of them is out of range: above the thresholds, or more than [X] percent over the baseline of the last [N] days, sent to [channel], with the rule that an alert that fires without a human reading it is a defect of the alert and gets fixed or removed; (3) a cyclic report, [weekly], generated automatically, with: resource usage against capacity and its trend, the slowest functions and queries and how they moved against the previous period, every out-of-range event with its cause if known, and what you propose for each; (4) the rule that every out-of-range event becomes a corrective pending item with the measured number as its acceptance criterion, closed with the full routine. Nothing here may read or store personal data. Show me the first report generated on real data from the test environment, and one alert fired on purpose by exceeding a threshold. Document the thresholds, the channel, the cycle and how to silence an alert with a written reason in `docs/MONITORING.md`. Reply in my language.

## Prompt 2

With every cyclic report of resources and performance: go through it with me, event by event; tell me which out-of-range events become pending items now and which can wait, with your reason; write the decision with the date in the report itself; and tell me whether any threshold must change and why, with the measurement that justifies it. Never raise a threshold to silence an alert without a measured reason written down.
