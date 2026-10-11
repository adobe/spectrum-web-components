# React Spectrum's RFC Process — Analysis & Adoption Proposal for Spectrum Web Components

**Author:** Casey Eickhoff · **Date:** 2026-09-01
**Sources:** [react-spectrum `rfcs/README.md`](https://github.com/adobe/react-spectrum/blob/async-react/rfcs/README.md), [`template.md`](https://github.com/adobe/react-spectrum/blob/async-react/rfcs/template.md), [example RFC PR #9894 (async-react)](https://github.com/adobe/react-spectrum/pull/9894), and all ~16 historical RFCs (2019–2026).

---

## TL;DR

React Spectrum runs a **lightweight, low-volume, PR-based RFC process**: an RFC is a markdown file added to `rfcs/` via a pull request, discussed publicly, and merged (= accepted) or closed (= rejected) by an informal core-team consensus. There is **no voting, no SLA, no lifecycle labels, no final-comment-period machinery**. In 7 years they've merged ~16 RFCs — roughly 2/year. It's deliberately high-signal, not a gate on everyday work.

**We could adopt this almost verbatim.** The main adaptations SWC needs: a clear "when is an RFC required" trigger that fits a web-components/design-system context, a named set of decision-makers, and integration with our existing `.ai/` docs + migration workflow. **The main risks: process becoming a bottleneck, unclear decision authority, and RFCs going stale after merge.**

---

## Part 1 — The Operational Model (how React Spectrum actually does it)

### 1.1 Where RFCs live

- A single `rfcs/` directory **inside the main repo** (not a separate repo).
- Contents: `README.md` (the process), `template.md` (the form), an `images/` folder, and one markdown file per RFC.
- Naming: `YYYY-short-description.md` (e.g. `2026-async-react.md`, `2023-react-aria-components.md`).
  - Note: the README *instructs* authors to create a **dated directory** with a `README.md` inside, but in practice every real RFC is a **flat `YYYY-*.md` file**. The docs and reality have drifted — a small lesson for us: keep the instruction and the convention in sync.

### 1.2 When an RFC is required

**Required for "substantial" changes:**
- New React Spectrum components
- Breaking API changes

**Not required:**
- Rephrasing, reorganizing, or refactoring
- Performance improvements invisible to end users

That's the entire trigger definition. It's intentionally short and leans on judgment.

### 1.3 The template (what an RFC must contain)

Required sections:
1. **Header** — Start Date, RFC PR link, Authors
2. **Summary** — one paragraph
3. **Motivation** — why, use cases, expected outcome
4. **Detailed Design** — enough for someone familiar with the codebase to implement it; specifics, edge cases, usage examples, terminology
5. **Documentation** — how it'll be documented; is an announcement needed?
6. **Drawbacks** — downsides, maintenance burden, incompatibilities, UX disruption
7. **Backwards Compatibility Analysis** — impact on current users + mitigation
8. **Alternatives** — other designs considered + prior art

Optional sections: **Open Questions**, **Help Needed**, **Frequently Asked Questions**, **Related Discussions**.

The "Backwards Compatibility Analysis" being a *first-class required section* is notable — it signals the org treats API stability as a primary concern, not an afterthought.

### 1.4 The lifecycle

```
Draft (fork)  →  PR opened  →  Public + core-team review  →  Core team decides
                                                              ├─ Accepted → PR merged into rfcs/
                                                              └─ Rejected → PR closed (not merged)
```

- **Accepted = merged.** The merged markdown file *is* the record. No separate issue tracker, no status field.
- **Rejected = closed** without merge.
- **Author is not obligated to implement.** Anyone can implement an accepted RFC.
- **Implementation is separate from the RFC.** It goes through normal PR review. If the design changes during implementation, the RFC should be updated with links to the implementing PRs.

### 1.5 How review actually works (from PR #9894)

The async-react RFC is a realistic window into the process:

- **RFC-only PR.** The author (a core maintainer) explicitly split implementation into separate PRs: *"this PR will just be for the RFC."* The RFC PR is a discussion artifact, not a code drop.
- **Long-lived and iterative.** Opened April 2026, still open and evolving months later; the author revised the core API mid-discussion based on feedback.
- **Heavy async discussion.** ~22 review threads, conversational, between core members (GitHub `MEMBER`) and outside contributors (`CONTRIBUTOR`). Consensus-seeking, not adversarial.
- **CI participates.** A bot posts live Storybook / docs preview links on each push, so reviewers can see rendered output tied to the proposal.
- **No formal approval ceremony.** No required-approver count, no "FCP" countdown, no merge checklist. It merges when the core team is satisfied consensus exists.

### 1.6 What's deliberately absent

Compared to heavier processes (e.g. Rust/Ember RFCs), React Spectrum has **no**:
- Voting or quorum rules
- Status labels (proposed/active/accepted/rejected)
- Final Comment Period timer
- Response-time SLA
- Shepherd/champion role assignment

This is a **feature, not a gap** — it keeps overhead low for a small core team. It works *because* volume is low (~2/yr) and the core team is tight-knit. That's the key context to carry into adoption.

---

## Part 2 — Adopting This in Spectrum Web Components

### 2.1 Why it fits SWC well

- We already do everything in-repo and PR-first. An RFC is just a markdown PR — zero new tooling.
- It slots cleanly next to our existing `.ai/` conventions, `CONTRIBUTOR-DOCS`, and the migration skill workflow.
- It gives our in-flight **1st-gen → 2nd-gen migration** and **new-component** work a durable "why we decided this" record — exactly the kind of context that currently lives in Slack threads and PR comments and evaporates.

### 2.2 Proposed structure

```
rfcs/
  README.md        # the process (adapt RS's)
  template.md      # the form (adapt RS's, add SWC-specific sections)
  0000-template    # optional numbering
  YYYY-<slug>.md   # one file per RFC — pick flat files, keep it consistent
  images/
```

**Recommendation: use flat `YYYY-<slug>.md` files** (what RS actually does) and make the README match — don't repeat their doc/convention drift.

### 2.3 When SWC should require an RFC

Adapt the trigger to a web-components design system. Require an RFC for:
1. **New public components** (new custom element / new package)
2. **Breaking API changes** — attributes, properties, events, slots, CSS custom properties (`--swc-*` public styling API), or removal/rename of any public surface
3. **Cross-cutting architecture or convention changes** — theming/token strategy, base-class changes, build/output format, SSR/shadow-DOM behavior, the styling-API contract
4. **Migration-policy decisions** that affect consumers broadly (e.g. deprecation windows, 1st→2nd-gen breaking-change batches)

Explicitly **not** required for: bug fixes, refactors, internal-only changes, docs, perf work invisible to consumers, single-component migrations that follow the already-agreed migration playbook.

> SWC-specific angle worth adding to the template: a **Design/Figma alignment** section (does this match the Spectrum 2 design spec?) and a **Token/Styling-API impact** section (`--swc-*` surface), since those are our recurring breaking-change vectors.

### 2.4 Decision authority (the one thing you MUST define)

React Spectrum can leave "the core team decides" vague because everyone knows who that is. **SWC should name it explicitly** to avoid stall-by-ambiguity. Options:
- A named **maintainers group** (2–3 approving maintainers = accepted), OR
- A designated **RFC owner/shepherd** per RFC who drives it to a decision.

Pick one and write it into the README. This is the single highest-leverage adaptation.

### 2.5 Suggested lifecycle for SWC

Mirror RS but add a light status marker so long-lived RFCs are legible:
```
Draft PR → Review (comment period, e.g. min 1 week open) → Decision
  Accepted → merged, status: Accepted
  Rejected → closed, status: Declined
  Later → status: Implemented / Superseded (updated in-file)
```
A single `Status:` line in the header (Accepted / Implemented / Superseded) is enough — don't build a label taxonomy.

### 2.6 Rollout plan

1. Add `rfcs/README.md` + `template.md` adapted from React Spectrum (½ day).
2. Name the decision-makers and the minimum comment period in the README (needs a maintainer sign-off).
3. **Back-fill 1–2 RFCs retroactively** for decisions already made (e.g. the `--swc-*` styling API prefix, the migration tooling direction). This seeds the format with real examples and proves the value immediately.
4. Announce the process; require RFCs for the next new component / next breaking migration batch.

Effort: ~1 day of doc work + one maintainer alignment meeting. The hard part is social (agreeing who decides and when an RFC is required), not technical.

---

## Part 3 — Risks & Mitigations

| # | Risk | Why it matters for SWC | Mitigation |
|---|------|------------------------|------------|
| 1 | **Bottleneck / velocity drag** | If "when required" is drawn too wide, routine migration/component work stalls waiting on RFCs. | Keep the trigger narrow (§2.3). Exempt work that follows an already-agreed playbook. Set a *minimum* comment period, not a maximum blocking one. |
| 2 | **Ambiguous decision authority** | RS gets away with "core team decides"; SWC has a broader contributor base and could stall on "who says yes?" | Name approvers/shepherd explicitly (§2.4). This is the #1 mitigation. |
| 3 | **Stale RFCs after merge** | Merged markdown drifts from shipped reality; the record becomes misleading (RS's own README/convention drift is a live example). | Require RFC updates during implementation (link the PRs), and a `Status: Implemented/Superseded` marker. Treat the RFC as living until Implemented. |
| 4 | **Process theater / low adoption** | A template nobody fills in, or RFCs written *after* decisions to check a box. | Back-fill 1–2 real ones to model quality (§2.6). Keep the template short. Let RFC-only PRs be a normal, respected artifact (as RS does). |
| 5 | **Consensus works at RS's scale, maybe not ours** | Informal consensus depends on a small, aligned core team. A larger/more distributed contributor set can deadlock without tie-break rules. | Define a tie-break (RFC owner or lead maintainer decides after the comment period). Don't require unanimity. |
| 6 | **Docs/convention drift** | RS instructs a dated-directory layout but ships flat files. Copying blindly imports the inconsistency. | Choose one convention (flat files) and make README + template + reality agree from day one. |

---

## Part 4 — Recommendation

**Adopt a trimmed, SWC-flavored copy of the React Spectrum process.** It's proven, near-zero-tooling, and matches how we already work. Do exactly three things beyond a straight copy:

1. **Narrow, explicit "when required" trigger** tuned to components / public API / tokens / migration policy (§2.3).
2. **Name who decides and the minimum comment period** (§2.4) — the one place RS's informality won't transfer.
3. **Add `Status:` + require post-merge updates** so RFCs stay honest (Risk #3).

**Next action (under 2 min):** create `rfcs/` and drop in an adapted `README.md` + `template.md`, then back-fill the `--swc-*` styling-API decision as the first worked example.
