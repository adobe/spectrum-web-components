---
name: clone-gen2-migration-epic
description: >
  Clones the SWC-1727 component migration epic template and all 7 child stories
  into new Jira issues, replacing all [COMPONENT] placeholders with the target
  component name. TRIGGER whenever a user asks to create a new component migration
  epic, clone the migration template, scaffold a new component migration in Jira,
  or says anything like "set up migration tickets for [component]",
  "create the migration epic for [component]", or "clone 1727 for [component]".
  Requires the component name as input — always ask for it if not provided.
---

# Clone SWC Migration Epic

Clones SWC-1727 (the component migration epic template) and all 7 child stories
into a fresh set of Jira issues for a specific component, replacing every
`[COMPONENT]` placeholder with the real component name.

---

## Required Input

**Component name** — must be provided before starting. If not given, ask:

> "What is the name of the component you want to create a migration epic for?
> (e.g. `button`, `tooltip`, `accordion`)"

Use **lowercase-hyphenated** form (e.g. `action-button`) for file paths and
Jira summaries. Derive a **Sentence case** form (e.g. `Action button`) for use in
descriptions and overview text.

---

## Template Source

| Key      | Issue Type | Summary                                                                        |
| -------- | ---------- | ------------------------------------------------------------------------------ |
| SWC-1727 | Epic       | Migration of the [COMPONENT]                                                   |
| SWC-1757 | Story      | [A11y([COMPONENT])] Accessibility recommendations for 2nd-gen migration        |
| SWC-1758 | Story      | [[COMPONENT]] Analyze component and create migration plan                      |
| SWC-1759 | Story      | [[COMPONENT]] Foundations — file structure, API, TypeScript, and accessibility |
| SWC-1762 | Story      | [[COMPONENT]] Full S2 visual fidelity                                          |
| SWC-1763 | Story      | [[COMPONENT]] Code style conformance and testing                               |
| SWC-1765 | Story      | [[COMPONENT]] Storybook documentation and consumer migration guide             |
| SWC-1767 | Story      | [[COMPONENT]] Review and finalize migration                                    |

---

## Execution Steps

### Step 1 — Fetch template content

Fetch the full description and story points of SWC-1727 and SWC-1757 through
SWC-1767 using `corp-jira:search_jira_issues`:

```
fields: ["summary", "description", "customfield_10003", "issuetype", "labels"]
jql: key in (SWC-1727, SWC-1757, SWC-1758, SWC-1759, SWC-1762, SWC-1763, SWC-1765, SWC-1767)
```

### Step 2 — Replace placeholders

For every fetched issue (summary + description), perform these replacements:

| Placeholder           | Replace with                                          |
| --------------------- | ----------------------------------------------------- |
| `[COMPONENT]`         | lowercase component name (e.g. `action-button`)       |
| `[A11y([COMPONENT])]` | `[A11y(action-button)]`                               |
| `[[COMPONENT]]`       | `[Action button]` (Sentence case in summary brackets) |

Do **not** replace `[PLACEHOLDER: ...]` markers — leave those intact for the
engineer to fill in manually (Figma links, Stackblitz links, 1st-gen source paths).

### Step 3 — Create the epic first, one at a time

Use `corp-jira:bulk_create_jira_issues` with **`batchSize: 1`** for every issue.
This is critical — parallel batch creation causes non-sequential key assignment.
Create in this exact order:

1. Epic (issuetype id `6`, requires `customfield_11801` = summary text)
2. SWC-1757 equivalent (story 1)
3. SWC-1758 equivalent (story 2)
4. SWC-1759 equivalent (story 3)
5. SWC-1762 equivalent (story 4)
6. SWC-1763 equivalent (story 5)
7. SWC-1765 equivalent (story 6)
8. SWC-1767 equivalent (story 7)

Fields to set on every issue:

- `project`: `{ "key": "SWC" }`
- `issuetype`: `{ "id": "6" }` for epic, `{ "id": "7" }` for stories
- `summary`: replaced summary text
- `description`: replaced description text
- `labels`: copy from template (preserve `gen2`, `engineering-processes` where present)
- `customfield_10003`: story points from template (numeric value)
- `customfield_11801`: epic name — same as summary (epic only)

Record every newly created key in order as you go.

### Step 4 — Link stories to epic (Child-Issue)

For each of the 7 new story keys, call `corp-jira:link_issues`:

- `inwardIssue`: the new epic key
- `linkType`: `Child-Issue`
- `outwardIssue`: the new story key

Do these one at a time sequentially.

### Step 5 — Link epic to SWC-1607 (Child-Issue)

Link the new epic as a child of SWC-1607:

- `inwardIssue`: `SWC-1607`
- `linkType`: `Child-Issue`
- `outwardIssue`: new epic key

### Step 6 — Add "is blocked by" dependency links

Apply the following links using `corp-jira:link_issues` one at a time.
For each: `inwardIssue` = the blocked story, `outwardIssue` = the blocker.

| Blocked story (inward)       | Blocked by (outward)         |
| ---------------------------- | ---------------------------- |
| Story 2 (Analyze)            | Story 1 (A11y)               |
| Story 3 (Foundations)        | Story 1 (A11y)               |
| Story 3 (Foundations)        | Story 2 (Analyze)            |
| Story 4 (Visual fidelity)    | Story 3 (Foundations)        |
| Story 5 (Styles and testing) | Story 4 (Visual fidelity)    |
| Story 6 (Docs)               | Story 3 (Foundations)        |
| Story 6 (Docs)               | Story 4 (Visual fidelity)    |
| Story 6 (Docs)               | Story 5 (Styles and testing) |
| Story 7 (Review)             | Story 1 (A11y)               |
| Story 7 (Review)             | Story 2 (Analyze)            |
| Story 7 (Review)             | Story 3 (Foundations)        |
| Story 7 (Review)             | Story 4 (Visual fidelity)    |
| Story 7 (Review)             | Story 5 (Styles and testing) |
| Story 7 (Review)             | Story 6 (Docs)               |

### Step 7 — Update the epic description with new story keys

After all issues are created, update the new epic's description using
`corp-jira:update_jira_issue`. Replace the SWC-175x/176x key references in the
child story table with the actual new keys. The table structure should match
the one in SWC-1727 but with the new keys and component name substituted.

---

## Confirmation Summary

After completing all steps, present a summary table to the user:

| #    | Key            | Story                                                            | Pts |
| ---- | -------------- | ---------------------------------------------------------------- | --- |
| Epic | [new epic key] | Migration of [component name]                                    | —   |
| 1    | [key]          | A11y recommendations                                             | 2   |
| 2    | [key]          | Analyze & create migration plan                                  | 1   |
| 3    | [key]          | Foundations — file structure, API, TypeScript, and accessibility | 5   |
| 4    | [key]          | Full S2 visual fidelity                                          | 3   |
| 5    | [key]          | Code style conformance and testing                               | 5   |
| 6    | [key]          | Storybook documentation and consumer migration guide             | 3   |
| 7    | [key]          | Review and finalize migration                                    | 1   |

Then remind the user of the `[PLACEHOLDER: ...]` items that still need manual
updates in Jira:

- Figma design link (SWC-1762 and SWC-1765 equivalents)
- Stackblitz link (SWC-1765 equivalent)
- 1st-gen component source path (SWC-1757, SWC-1758, SWC-1759 equivalents)
- 1st-gen test path (SWC-1758 equivalent)

---

## Error Handling

- If any single issue creation fails, stop and report which step failed before
  continuing — do not silently skip.
- If a link call fails, report it and continue with remaining links — link
  failures are recoverable manually.
- If the component name contains spaces, automatically convert to
  lowercase-hyphenated form and confirm with the user before proceeding.
