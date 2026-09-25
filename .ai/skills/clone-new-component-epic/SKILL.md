---
name: clone-new-component-epic
description: >
  Clones the SWC-2164 component migration epic template and all 7 child stories
  into new Jira issues, replacing all [COMPONENT] placeholders with the target
  component name. TRIGGER whenever a user asks to create a new component
  epic, clone the new component template, scaffold a new component epic in Jira,
  or says anything like "set up new component tickets for [component]",
  "create the new component epic for [component]", or "clone 2164 for [component]".
  Requires the component name as input — always ask for it if not provided.
---

# Clone SWC new component epic

Clones SWC-2164 (the new component epic template) and all 7 child stories
into a fresh set of Jira issues for a specific component, replacing every
`[COMPONENT]` placeholder with the real component name.

---

## Required Input

**Component name** — must be provided before starting. If not given, ask:

> "What is the name of the component you want to create an epic for?
> (e.g. `Button`, `Tooltip`, `Action button`)"

Use **lowercase-hyphenated** form (e.g. `segmented-control`) for file paths and
Jira summaries. Derive a **Sentence case** form (e.g. `Segmented control`) for use in
descriptions and overview text.

---

## Template Source

| Key      | Issue Type | Summary                                                                        |
| -------- | ---------- | ------------------------------------------------------------------------------ |
| SWC-2164 | Epic       | New component: [COMPONENT]                                                     |
| SWC-2183 | Story      | [[Component]]: New component a11y analysis                                     |
| SWC-2209 | Story      | [[COMPONENT]]: New component analysis                                          |
| SWC-2184 | Story      | [[COMPONENT]] Foundations — file structure, API, TypeScript, and accessibility |
| SWC-2185 | Story      | [[COMPONENT]] S2 visual fidelity                                               |
| SWC-2186 | Story      | [[COMPONENT]] Code style conformance and testing                               |
| SWC-2187 | Story      | [[COMPONENT]] Storybook documentation and consumer migration guide             |
| SWC-2188 | Story      | [[COMPONENT]] Review and finalize                                              |

---

## Execution Steps

### Step 1 — Fetch template content

Fetch the full description and story points of SWC-2164, SWC-2209, and SWC-2183 through
SWC-2188 using `corp-jira:search_jira_issues`:

```
fields: ["summary", "description", "customfield_10003", "issuetype", "labels"]
jql: key in (SWC-2164, SWC-2183, SWC-2209, SWC-2184, SWC-2185, SWC-2186, SWC-2187, SWC-2188)
```

### Step 2 — Replace placeholders

For every fetched issue (summary + description), perform these replacements:

| Placeholder           | Replace with                                          |
| --------------------- | ----------------------------------------------------- |
| `[COMPONENT]`         | lowercase component name (e.g. `action-button`)       |
| `[A11y([COMPONENT])]` | `[A11y(action-button)]`                               |
| `[[COMPONENT]]`       | `[Action button]` (Sentence case in summary brackets) |

Do **not** replace `[PLACEHOLDER: ...]` markers — leave those intact for the
engineer to fill in manually (Figma links, Stackblitz links, source paths).

### Step 3 — Create the epic first, one at a time

Use `corp-jira:bulk_create_jira_issues` with **`batchSize: 1`** for every issue.
This is critical — parallel batch creation causes non-sequential key assignment.
Create in this exact order:

1. Epic (issuetype id `6`, requires `customfield_11801` = summary text)
2. SWC-2183 equivalent (story 1)
3. SWC-2209 equivalent (story 2)
4. SWC-2184 equivalent (story 3)
5. SWC-2185 equivalent (story 4)
6. SWC-2186 equivalent (story 5)
7. SWC-2187 equivalent (story 6)
8. SWC-2188 equivalent (story 7)

Fields to set on every issue:

- `project`: `{ "key": "SWC" }`
- `issuetype`: `{ "id": "6" }` for epic, `{ "id": "7" }` for stories
- `summary`: replaced summary text
- `description`: replaced description text
- `labels`: copy from template (preserve `gen2`, `new-component`, `engineering-processes` where present)
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
`corp-jira:update_jira_issue`. Replace the SWC-2XXX key references in the
child story table with the actual new keys. The table structure should match
the one in SWC-2164 but with the new keys and component name substituted.

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

- Figma design link (SWC-2185 and SWC-2187 equivalents)
- Stackblitz link (SWC-2187 equivalent)
- Component source path (SWC-2209, SWC-2184, SWC-2187 equivalents)
- test path (SWC-2187 equivalent)

Remind the user that they must also create a new `Component` in Jira, select all the child stories using "Bulk Change", and put all the stories into the epic and assign the new component to the `Component` field.

---

## Error Handling

- If any single issue creation fails, stop and report which step failed before
  continuing — do not silently skip.
- If a link call fails, report it and continue with remaining links — link
  failures are recoverable manually.
- If the component name contains spaces, automatically convert to
  lowercase-hyphenated form and confirm with the user before proceeding.
