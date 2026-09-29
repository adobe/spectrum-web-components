# Test-pruning campaign

Adapted from [OpenClaw's campaign guidance](https://github.com/openclaw/openclaw/blob/main/.agents/skills/test-audit/CAMPAIGN.md) under the MIT license in [LICENSE](LICENSE). The value bar, retention bar, candidate evidence, and validation in [SKILL.md](SKILL.md) apply throughout.

Campaign mode covers a whole subsystem's test surface in one coordinated change. For `gen2`, select an actual owner boundary (for example, one package or component) rather than treating all of `gen2` as a single owner.

1. **Baseline:** Record every in-scope test file's pass/fail state and test/support line counts at a pinned commit. Investigate baseline failures as possible product bugs.
2. **Inventory:** Assign each test file and browser, Storybook, or accessibility scenario to exactly one lane along production owner boundaries. Include shared boundary and harness tests.
3. **Read-only ledger:** Read every test, production owner, caller, relevant history, and test routing. Mark every test declaration `R` (retain), `F` (repair assertion), `C` (consolidate into a named keeper), or `D` (delete with remaining proof or justification). Record an evidence line for every mark; judge assertions rather than names.
4. **Layer plan:** Name the keeper suite for each contract, retired files, assertions to move, and test-only production seams unlocked. Prefer the real boundary with a fake network to a mocked collaborator where possible.
5. **Cutover:** Edit one lane at a time; serialize shared harness changes. Remove seams after moving retained regressions. Update test routing and inventories where applicable. Each keeper must pass.
6. **Preservation review:** Independently check that deleted contracts still have proof. Restore gaps at the owning boundary and confirm restored assertions catch a deliberate mutation before reverting it.
7. **Product defects:** For any baseline failure that survives into a keeper, fix the owner separately with a failing control and a passing candidate. Record unrelated issues as follow-ups.
8. **Reconcile:** Recheck any concurrent changes, rerun the whole subsystem suite, and report baseline and final test/support lines separately from production, retired layers and keepers, preservation gaps, and product defects.

Finish each step's evidence before starting the next. A focused audit uses [SKILL.md](SKILL.md) instead of this campaign checklist.
