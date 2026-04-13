<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../README.md) / [Contributor guides](README.md) / Participating in PR reviews

<!-- Document title (editable) -->

# Participating in PR reviews

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Labels and their meanings](#labels-and-their-meanings)
- [Pull request review process](#pull-request-review-process)
    - [Review timing](#review-timing)
    - [Review expectations](#review-expectations)
    - [Review etiquette](#review-etiquette)
    - [Scope, workflow, and status](#scope-workflow-and-status)
    - [References and alignment](#references-and-alignment)
    - [Reviewer quick reference](#reviewer-quick-reference)
- [Merge criteria](#merge-criteria)

</details>

<!-- Document content (editable) -->

This document outlines our team's expectations and best practices for reviewing pull requests and participating in the PR review process for Spectrum Web Components.

## Labels and their meanings

[See the complete list of labels on GitHub.](https://github.com/adobe/spectrum-web-components/labels)

- `Contribution`: This label denotes the PR is from someone other than the maintainers of SWC.
- `Status: Ready for review`: PR is ready for maintainer review
- `Status: Ready for merge`: PR has two approvals and all tests pass.
- `Status: WIP`: PR is still being worked on, not ready for review
- `Status: Blocked`: PR is blocked for another reason, for example another PR needs to merge first
- `Status: On hold`: PR on hold pending more discussion.
- `Status: Addressing feedback`: PR owner is addressing review comments and will request re-review when ready.
- `Status: Ready for design review`: PR needs to be checked by the Spectrum Design team
- `Breaking`: PR contains changes that break backward compatibility
- `High priority PR review`: PR is related to a SEV 1 issue or other critical work
- `Component: [Name]`: PR affects this component

Apply labels promptly to help maintainers prioritize and manage the review queue.

---

## Pull request review process

### Review timing

- Maintainers aim to review PRs in a timely manner.
- When you can, aim to **respond within about a business day**. Treat **blockers** and **high-priority** PRs (see `High priority PR review`) as **same-day** or faster when feasible.
- If your PR has not received attention, feel free to **ping the team** in the PR comments.
- Agree as a team how **hot fixes**, **expected review duration**, and **re-review** handoffs work, including when to **add another reviewer** if someone is unavailable.

### Review expectations

Reviewers will check for:

- Adherence to code style and component patterns
- Proper test coverage
- Documentation completeness
- **Accessibility compliance:** The PR author has completed the [Accessibility testing checklist](https://github.com/adobe/spectrum-web-components/blob/main/.github/PULL_REQUEST_TEMPLATE.md#accessibility-testing-checklist) in the pull request template. For PRs that affect interactive components, verify that **keyboard testing steps** and **screen reader testing steps** are documented (where tested, what was done, expected result). When in doubt, re-run key steps to confirm behavior. See [Accessibility testing — Manual testing required for PRs](09_accessibility-testing.md#manual-testing-required-for-prs) for guidelines. Do not ship **regressions** in accessibility, semantics, or documented behavior.
- Visual regression test coverage; use **Chromatic** with a **healthy baseline** so diffs stay trustworthy (see [Visual regression testing](../02_style-guide/04_testing/04_visual-regresssion-testing.md)). For a concise reviewer checklist, see [PR review checklist](../02_style-guide/04_testing/09_pr_review-checklist.md).
- Performance considerations
- **Depth beyond the template:** Treat the author's validation steps as a **minimum**. Exercise **unhappy paths** and **error or empty states** in good faith. **Check out the branch locally** when it helps; validate **dependencies** and behavior in contexts closer to **production**, not only Storybook.
- **Layout and reflow:** Where relevant, consider **responsive** behavior, realistic copy, and **WCAG** concerns such as zoom and reflow.
- **Integration:** Consider how the change behaves with **surrounding UI**, APIs, and other components, not only the edited file.
- **Implicit checks:** When you use **Windows High Contrast Mode**, combined size/variant/state setups, or other checks that are easy to omit, **note them in a comment** so authors and future reviewers learn the bar.
- **User-centric validation:** When behavior is easy to misread, authors should add steps in the PR description (for example **Given/When/Then** or a short **user scenario**); reviewers should run them.

#### Storybook, Chromatic, and playground demos

- Prefer **Playground** stories when you need to **probe** unclear behavior, **edge cases**, or **atomic** components in isolation.
- Decide deliberately whether a scenario belongs in **Storybook**, in **Docs** only, or in a **StackBlitz-style** demo; favor Storybook when the example should stay **maintained** as part of the design system.
- **Flex and grid wrappers** in Storybook can **stretch or shrink** small components; verify critical layouts in a **neutral** container when sizing matters.

### Review etiquette

Pull requests are the start of a conversation. During the process, we aim to provide feedback that is constructive, respectful, and actionable. Suggestions will be focused on team coding standards but not on an individual's coding preferences unless there are specific considerations or risks in one approach over another.

Both reviewers and PR authors should follow these guidelines:

#### For reviewers

- **Maintain momentum** and complete reviews in a timely manner (see [Review timing](#review-timing)).
- **Provide clear, actionable feedback** with **brief rationale**; use **code suggestions** when they speed up implementation.
- **Seek understanding:** Ask questions; default to **curiosity** over directives when you are exploring intent. If you are unsure of the right fix, **say so** or **look it up briefly** instead of leaving the author guessing.
- **Stay constructive:** Keep comments **clear, kind, and informative**; **name what works**, not only what to change. **Call out strong choices** so good habits spread.
- **Prefer patterns over nits:** Focus on themes that improve quality; if feedback is **non-blocking**, prepend the comment with `nit:` (see also [Conventional Comments](https://conventionalcomments.org/) for labeling blocking vs questions vs suggestions vs praise).
- **Link to standards:** Point to **docs, prior art, or ADRs** when that shortens the loop.
- **Focus on impact and value:** Prioritize architecture, functionality, accessibility, and performance; **consider context** such as the author's experience level and PR scope.
- **Use Changes Requested thoughtfully:** Reserve it for **blocking** or **high-risk** issues; use inline comments and suggestions for preferences and nits when appropriate.
- **Review VRTs with care:** Examine visual regression results and communicate approval to authors before golden images are updated.
- **Collaboration modalities:** Use **short video or live walkthroughs** when the UI is **complex** or hard to show in screenshots; afterward, **post a summary on the PR** so decisions stay discoverable. For **high-impact** changes that are easy to misread in the diff, a **brief sync** or **PR kickoff** can save rounds of review. **DM or huddle** is fine for thrashing out an approach; **capture the outcome on the PR**.
- **Multiple perspectives:** Welcome a second view; optionally read the diff **before** other reviewers' comments for an **independent** take. Align as a team on **second reviews** after a subject-matter expert approves, behavior when someone **requests changes**, and **who updates** GitHub and tracker labels.
- **Automation:** Consider **linting and CI** (and, where helpful, other tooling) for a first pass on formatting and obvious issues so human review can focus on design and correctness.

#### For PR authors

- **Self-review:** Run your own **validation** and review the diff before requesting reviewers; a first pass in comments can pre-empt questions.
- **Explain and curate:** For non-obvious changes, explain **why** in the description. **Curate commits** (for example with **interactive rebase**) so history tells a clear story—see guides such as *Advanced techniques in Git: interactive rebasing* and *Curating commits to speed up pull requests* for technique.
- **Track deferred work:** Use **tickets** for follow-ups; **TODOs in code** should reference a **tracked issue** (for example Jira). Involve **design** when the spec or edge cases are unclear.
- **Help reviewers validate:** Add **reviewer-friendly steps** (for example **Gherkin-style** or a short **user scenario**) when behavior is easy to misread.
- **Respond and notify:** Resolve or respond to **every** comment; ask for clarification when feedback is unclear; after addressing feedback, **notify** reviewers (Slack or **request re-review** on GitHub).
- **Re-read the whole PR** while addressing feedback so fixes do not introduce regressions elsewhere.
- **Treat review as a dialogue:** You do not need to accept every suggestion; **defer** or open a **follow-up PR** when that is cleaner.
- **Keep status visible:** Use **labels**, **Jira**, **dashboards**, and **Slack threads** on the original announcement as your squad expects; make **priority** obvious for urgent work.
- **Scope:** Prefer **small, focused PRs**; see [Scope, workflow, and status](#scope-workflow-and-status).

#### Resolving disagreements

- **Focus on data:** Back up opinions with data, documentation, or examples where possible.
- **Refer to standards:** Use project conventions and industry best practices to guide decisions.
- **Compromise when appropriate:** Be willing to find middle ground when opinions differ.
- **Escalate respectfully:** If consensus cannot be reached, involve a third team member or technical lead for guidance.
- **Document decisions:** Record the reasoning behind significant technical decisions on the PR; treat the thread as a **decision record**, not only a code handoff.

Remember that code reviews are a collaborative process aimed at improving code quality, knowledge sharing, and maintaining project standards. Approaching reviews with empathy and professionalism benefits everyone involved.

### Scope, workflow, and status

- **Small, focused PRs** reduce review fatigue; plan scope **before** opening the PR when possible so reviewers are not asked to split work late.
- Strong candidates for a **split**: unrelated features or fixes in one PR; mixing **refactor, feature, and bugfix**; or a **behavior change** bundled with a large **structural** refactor. If a reviewer cannot grasp **what changed and why** in a few minutes, improve the **description**, **commits**, or **scope**.
- Decide at **refinement or ticket breakdown** whether work ships as **one PR or several**.
- When you find **bugs outside the ticket**, use a team default: **follow-up ticket**, **new branch**, or a **narrow in-scope fix**—and track it.
- **Open a new branch** to **prevent scope creep** when needed; branching is cheap.
- Only skip **docs, tests, or accessibility** updates when the team has an **explicit** agreement (for example **feature branch** work under an **epic** with **tracked follow-ups**).

### References and alignment

- **[Conventional Comments](https://conventionalcomments.org/)** can clarify what is blocking versus optional.
- **[Working agreements](https://www.swarms.com/blog/agile-team-working-agreements/)** are one way to capture shared norms (review load, draft vs ready-for-review and tracker states, **AI** assistance in review or drafting, **external contributor** expectations and stale branches, and similar topics).

### Reviewer quick reference

1. Exercise **unhappy paths**, not only the happy path.
2. **Prioritize** urgent and **blocking** PRs.
3. Validate **beyond** the written steps; check **integration** and realistic contexts.
4. Use a **new branch** instead of letting **scope creep** onto one PR.

---

## Merge criteria

A PR is ready to merge when:

1. It has received approval from two maintainers
2. All CI checks are passing
    - Unit tests passing
    - Integration tests passing
    - Visual regression tests passing (**VRT golden images should not be updated until an approver confirms they look good**)
    - Linting checks passing
3. All requested changes have been addressed
4. PR follows conventional commit standards
5. Includes proper changeset (when applicable)
6. Documentation has been updated as needed
