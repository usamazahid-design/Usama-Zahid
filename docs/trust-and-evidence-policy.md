# Trust and Evidence Policy

This project uses the following trust rules for case studies and outcomes.

## Metric Label Policy

- `SELF_REPORTED`: internal project logs, working analytics snapshots, or operator notes.
- `CLIENT_REPORTED`: values provided by client-side reporting or stakeholder updates.
- `ANALYTICS_VERIFIED`: traceable metric definition, date range, and analytics source are documented.

Unlabeled metrics are not allowed.

## Conversion-Diagnosis Block Template

Each case should include:

1. Baseline snapshot (metric definition + date range + context).
2. Funnel diagnosis (where and why drop-off happened).
3. Hypothesis log (testable statement tied to one KPI).
4. Experiment sequence (test order + rationale).
5. Post-launch read (evidence label + what to test next).

## AI + Human Strategy Position

AI is used as acceleration for production tasks. Human strategy leads:

- Positioning and narrative decisions
- Trade-off calls
- Test prioritization
- Quality and release decisions

This avoids generic output and keeps accountability in the delivery process.

## Trust Language Rule

- Avoid words like "verified" unless third-party proof is publicly linked.
- Prefer explicit evidence labels over broad credibility claims.
- If a number is unavailable or not defensible, use qualitative language until evidence is ready.
