<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [RFCs](README.md) / [RFC title]

<!-- Document title (editable) -->

# [RFC title]

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Summary](#summary)
- [Motivation](#motivation)
- [Detailed design](#detailed-design)
- [Documentation](#documentation)
- [Drawbacks](#drawbacks)
- [Backwards compatibility](#backwards-compatibility)
- [Alternatives](#alternatives)
- [Open questions](#open-questions)
- [Authoring notes (remove when copying)](#authoring-notes-remove-when-copying)

</details>

<!-- Document content (editable) -->

**Status:** Proposed
**Author(s):** [Name(s)]
**First commit:** YYYY-MM-DD
**Discussion:** [Link to PR, Slack thread, or office-hours agenda item]
**Supersedes:** [Link to RFC(s) replaced, or `None`]

## Summary

One paragraph — two at most. What is this RFC proposing? A reader should be able to decide from this section alone whether to keep reading.

## Motivation

Why do we need this change? What problem does it solve? Include concrete examples (bugs, user reports, authoring friction, performance incidents) that make the motivation tangible. Do not hand-wave with "consistency" or "cleanliness" — name the actual cost the change avoids.

## Detailed design

The substantive part of the RFC. Cover whatever the proposal needs to be evaluable by a reviewer who has not been in the conversation — likely some combination of:

- API shape (public surface, TypeScript types, CEM fields)
- File layout and package boundaries
- Data flow, lifecycle, or rendering sequence
- Interaction with existing patterns, components, or tooling
- Required scaffolding or pipeline changes

Be specific. Pseudocode, diagrams, or before/after snippets beat prose. If a decision hinges on a particular framework constraint (Lit, Storybook, CEM, TypeScript), name it inline so reviewers can challenge it directly.

## Documentation

How does this RFC change what contributors, consumers, and maintainers read? Which existing pages need updates, which new pages appear, which templates or `.ai/rules/` entries must be amended. A change that requires docs work but doesn't identify it here is incomplete.

## Drawbacks

What makes this proposal expensive, risky, or contentious? Include at least one honest drawback — "there are no downsides" signals the section wasn't taken seriously.

## Backwards compatibility

Which consumers (1st-gen users, 2nd-gen users, contributors, external tooling) need to change behavior? What is the migration path? If the RFC is not backwards-compatible, describe the rollout strategy (major version? codemod? deprecation window?).

## Alternatives

At least two alternatives considered, with a sentence or two on why each was rejected. "Do nothing" is always a valid alternative and should usually appear here.

## Open questions

Known unknowns at time of authoring. Each question should be phrased so a reviewer can answer it in a PR comment. Resolve them before moving the RFC to `accepted/` — unanswered questions at acceptance time become technical debt.

---

## Authoring notes (remove when copying)

- **Status line.** Update when the RFC moves between folders: `Proposed` → `Accepted` → (rarely) `Superseded`.
- **Sections are fixed.** Add subsections inside any section, but do not reorder or rename the top-level sections. Readers and tooling rely on the order.
- **"N/A" is fine.** If a section truly does not apply (e.g. a pure docs RFC has nothing under "Backwards compatibility"), write "N/A — [one-line reason]" rather than deleting the heading.
- **Link generously.** Cross-link to existing RFCs, `.ai/rules/`, related components, and external references. RFCs age; links age better than embedded context.
- **Keep voice human.** Short sentences. Direct. This is not a spec document; it is a proposal to peers.
