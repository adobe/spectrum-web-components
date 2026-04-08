<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Pull request review tips and practices

<!-- Document title (editable) -->

# Pull request review tips and practices

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Reviewing the change](#reviewing-the-change)
    - [Edge cases, integration, and validation mindset](#edge-cases-integration-and-validation-mindset)
    - [Storybook, Chromatic, and playgrounds](#storybook-chromatic-and-playgrounds)
- [How we communicate in review](#how-we-communicate-in-review)
    - [Tone of feedback](#tone-of-feedback)
    - [Making review a learning opportunity](#making-review-a-learning-opportunity)
    - [Modality: written PR, video, and meeting](#modality-written-pr-video-and-meeting)
- [Scope, timing, and workflow](#scope-timing-and-workflow)
    - [Timing and prioritization](#timing-and-prioritization)
    - [When to split a PR](#when-to-split-a-pr)
    - [Status communication and incorporating feedback](#status-communication-and-incorporating-feedback)
- [Review bar and collaboration](#review-bar-and-collaboration)
    - [When to request changes](#when-to-request-changes)
    - [Multiple reviewers and labels](#multiple-reviewers-and-labels)
- [Authors](#authors)
    - [Setting context, self-review, and edge cases](#setting-context-self-review-and-edge-cases)
- [References and alignment](#references-and-alignment)
    - [Tooling and habits](#tooling-and-habits)
    - [What to agree on as a team](#what-to-agree-on-as-a-team)
    - [Reviewer quick reference](#reviewer-quick-reference)

</details>

<!-- Document content (editable) -->

Practical tips for reviewers and authors. For **process specifics** (labels, merge rules, etiquette), see [Participating in PR reviews](05_participating-in-pr-reviews.md). Treat the sections below as guidance you can adopt or adapt when your team aligns on norms.

---

## Reviewing the change

### Edge cases, integration, and validation mindset

- Treat the PR’s validation steps as a **minimum**; also exercise **unhappy paths** and try to surface failures **in good faith**.
- **Check out the branch locally** when it helps; validate **dependencies** and behavior in contexts closer to **production**, not only Storybook.
- Include **accessibility** (keyboard, screen readers), **responsive** layout, realistic copy, and **WCAG** concerns such as zoom and reflow.
- Walk **error and empty states** and confirm each failure mode is intentional and usable.
- Review **integration**: how the change behaves with **surrounding UI**, APIs, and other components—not only the edited file.
- When you rely on **implicit checks** (Windows High Contrast Mode, multiple viewports, combinations of size, variant, and state), consider listing them in a comment so authors and future reviewers learn the bar.
- When it helps reviewers, add **user-centric validation** (for example Given/When/Then or a short user-story style scenario).

### Storybook, Chromatic, and playgrounds

- Use **Chromatic** for **visual/style** regression coverage; invest in a **healthy baseline** and periodic cleanup so diffs stay trustworthy.
- Prefer **Playground** stories when you need to **probe** unclear behavior, **edge cases**, or **atomic** components in isolation.
- Decide deliberately whether a scenario belongs in **Storybook**, in **Docs** only, or in a **StackBlitz-style** demo; favor Storybook when the example should stay **maintained** as part of the design system.
- Remember that **flex and grid wrappers** in Storybook can **stretch or shrink** small components; verify critical layouts in a **neutral** container when sizing matters.

---

## How we communicate in review

### Tone of feedback

- Default to **questions** and **curiosity** instead of directives when the intent is to understand or suggest.
- Stay **constructive**: name what works, not only what to change.
- Keep comments **clear, kind, and informative** so feedback feels **supportive**, not personal.

### Making review a learning opportunity

- **Ask questions** when something is unclear; prefer **curiosity** over issuing orders.
- Prefer **patterns and themes** over commenting on every trivial nit unless the team wants that level of polish.
- **Call out strong choices** so good habits spread.
- Pair feedback with **brief rationale** and, when useful, a **concrete code suggestion** so authors can apply it quickly.
- Link to **docs, prior art, or ADRs** when that shortens the feedback loop.
- If you are unsure of the right fix, **say so** or **look it up briefly** instead of leaving the author to guess your expectation.
- Use **DM or a quick huddle** to untangle ambiguity, then **summarize the outcome on the PR** so the record stays with the code.

### Modality: written PR, video, and meeting

- Use **short video or live walkthroughs** when the UI is **complex** or hard to convey in screenshots—especially helpful for **distributed** teams.
- After async video or live discussion, **post a short summary** on the PR so decisions stay discoverable.
- For changes that are **high impact** but easy to misread in the diff, a **brief sync** (or **PR kickoff**) can save rounds of review.

---

## Scope, timing, and workflow

### Timing and prioritization

- Aim to **respond within about a business day** when you can; treat **blockers** and **high-priority** work as **same-day** or faster when feasible.
- Agree as a team how **hot fixes**, **expected review duration**, and **re-review** handoffs work—including when to **add another reviewer** if someone is unavailable.

### When to split a PR

- **Small, focused PRs** reduce fatigue; plan scope **before** opening the PR when possible so reviewers are not asked to split work late.
- Strong candidates for a split: **unrelated** features or fixes; mixing **refactor, feature, and bugfix**; or pairing a **behavior change** with a large **structural** refactor.
- If a reviewer cannot grasp **what changed and why** in a few minutes, improve the **description**, **commits**, or **scope**.
- Decide at **refinement or ticket breakdown** whether work will ship as **one PR or several**.
- When you find **bugs outside the ticket**, agree a default: **fix in a follow-up**, **new branch**, or **narrow in-scope fix**—and track it.
- For **TODOs in code**, reference a **tracked issue** (for example Jira) so work is **traceable** and **completable**.
- **Open a new branch** freely to **prevent scope creep**; branching is cheap.

### Status communication and incorporating feedback

- Keep **status visible**: **Jira**, **dashboards**, **GitHub labels**, and **Slack threads** on the original announcement, consistent with how your squad operates.
- Make **priority** obvious (labels, title prefix, or team norm) so urgent PRs surface quickly.
- While addressing feedback, **re-read the full PR** so fixes do not introduce **regressions** elsewhere.
- Treat review as a **dialogue**: you need not accept every suggestion; **defer** or **spin out** follow-up PRs when that is the cleaner outcome.

---

## Review bar and collaboration

### When to request changes

- Reserve **request changes** for issues you consider **blocking** or **high risk**; use inline comments or suggestions for **preferences** and **nits** when your team prefers a lighter queue.
- Do not ship **regressions** in **accessibility**, **semantics**, or **documented behavior**; treat **style** drift according to your **linting** and **team bar**.
- Consider **automation or tooling** for a first pass on **formatting** and **obvious** issues so human review focuses on design and correctness.
- Only skip **docs, tests, or accessibility** updates when the team has an **explicit** agreement (for example **feature branch** work under an **epic** with **tracked follow-ups**).

### Multiple reviewers and labels

- Welcome **multiple perspectives**; optionally review the diff **before** reading others’ comments to form an **independent** view.
- Agree how **second reviews** work after a **subject-matter expert** approves, how the queue behaves when someone **requests changes**, and **who updates** **GitHub** and **issue tracker** labels.

---

## Authors

### Setting context, self-review, and edge cases

- Run through your own **validation** and **self-review** the diff before requesting reviewers.
- Explain **non-obvious decisions** in the description; **curate commits** (for example with **interactive rebase**) so the history tells a clear story—see guides such as *Advanced techniques in Git: interactive rebasing* and *Curating commits to speed up pull requests* for technique.
- Open **tickets** for deferred work; involve **design** when the spec or edge cases are unclear.
- Supply **reviewer-friendly validation** (for example **Gherkin-style** steps or a short **user scenario**) when behavior is easy to misread.

---

## References and alignment

### Tooling and habits

- Consider **[Conventional Comments](https://conventionalcomments.org/)** to label **blocking** feedback versus **questions**, **suggestions**, or **praise**.
- Treat the PR thread as a **decision record**, not only a code handoff.

### What to agree on as a team

- **AI assistance** in review or drafting: where it is welcome and what still needs human sign-off.
- Whether **draft PRs** and **ready for review** map to **issue tracker** states.
- **External contributors**: target **response times**, how **change requests** work, and what to do when a branch goes **stale**; consider sizing **contributor PRs** during **planning** so large reviews do not arrive without capacity.
- **Review load**: expectations for **who** reviews and how to **spread** work so a few people do not carry the queue.
- Capture shared norms in a **working agreement** (see for example [Swarms — agile team working agreements](https://www.swarms.com/blog/agile-team-working-agreements/)).

### Reviewer quick reference

1. Exercise **unhappy paths**, not only the happy path.
2. **Prioritize** urgent and **blocking** PRs.
3. Validate **beyond** the written steps; check **integration** and real usage contexts.
4. Use a **new branch** instead of letting **scope creep** onto one PR.
