---
layout: guide.njk
title: 'Writing Helpful Changesets and Changelogs'
displayName: Changesets and Changelogs
slug: writing-changesets
---

# Writing Helpful Changesets and Changelogs

## Guiding principles

-   **Human-First**: Changesets and changelogs are for humans, not machines. Write clear, concise descriptions that users can understand.
-   **Impact-Focused**: Communicate the impact of changes on users, not implementation details.
-   **Structured**: Use package names and categories for better readability.
-   **Complete**: Include a line for every user-facing change.
-   **Linkable**: Make content easily linkable for reference.

## Version bumping guidelines

Follow semantic versioning principles when determining version changes:

-   **Patch** (1.0.0 → 1.0.1): Bug fixes and non-breaking changes
-   **Minor** (1.0.0 → 1.1.0): New features, backwards-compatible
-   **Major** (1.0.0 → 2.0.0): Breaking changes requiring user updates

## Types of changes

Each change should be categorized under one of these types:

-   **Added**: New features or capabilities
-   **Changed**: Changes in existing functionality
-   **Deprecated**: Soon-to-be removed features
-   **Removed**: Features that have been removed
-   **Fixed**: Bug fixes

## Essential elements of a good change description

Every change entry should clearly communicate:

1. WHAT changed
2. WHY it changed
3. HOW users should update their code (if applicable)

❌ Bad:

```md
---
'@spectrum-web-components/dialog': patch
---

Fixed some bugs in the dialog
```

✅ Good:

```md
---
'@spectrum-web-components/dialog': patch
---

-   **Fixed**: Fixed `<sp-dialog>` focus management to prevent focus from escaping the dialog while open, improving accessibility for keyboard users. [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

## Writing style guidelines

### Use past tense

Write changes in past tense to describe what has been modified:

❌ Bad:

```md
---
'@spectrum-web-components/button': minor
---

-   **Fixed**: Resolves `<sp-button>` accessibility [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
-   **Added**: Adds new variant `tertiary` [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

✅ Good:

```md
---
'@spectrum-web-components/button': minor
---

-   **Fixed**: Resolved `<sp-button>` accessibility [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
-   **Added**: Added new variant `tertiary` [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

### Be specific and component-focused

Reference components by their tag names, include links to the PR, and be specific about changes:

❌ Bad:

```md
---
'@spectrum-web-components/alert': minor
---

-   Changed alert styles
```

✅ Good:

```md
---
'@spectrum-web-components/alert': minor
---

-   **Fixed**: Updated `<sp-alert>` default styles for better contrast [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

### Document breaking changes

Clearly mark and explain breaking changes with migration guidance:

❌ Bad:

```md
---
'@spectrum-web-components/textfield': major
---

-   Changed how `<sp-textfield>` labels and placeholders work [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

✅ Good:

```md
---
'@spectrum-web-components/textfield': major
---

-   **Deprecated**: Deprecated `label` attribute, which confused label with placeholder text. [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

-   **Added**: Added `hidden-label` attribute, for use with assistive technologies.
-   **Added**: Added `placeholder` attribute, for placeholder text.

Before:

\`\`\`html
<sp-textfield label="Full Name"></sp-textfield>

<sp-label for="email">Email</sp-label>
<sp-textfield id="email" label="john.smith@example.com"></sp-textfield>
\`\`\`

After:
\`\`\`html
<sp-textfield hidden-label="Full Name"></sp-textfield>

<sp-label for="email">Email</sp-label>
<sp-textfield id="email" placeholder="john.smith@example.com"></sp-textfield>
\`\`\`

### Focus on user impact

Describe changes from the user's perspective, not implementation details:

❌ Bad:

```md
---
'@spectrum-web-components/overlay': patch
---

-   Replace native showModal() for performance optimization [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

✅ Good:

```md
---
'@spectrum-web-components/overlay': patch
---

-   **Fixed**: Improved `<sp-overlay>` performance in Chromium-based browsers. [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

[gfm]: https://github.github.com/gfm/
[yml]: https://yaml.org/
[frm]: https://www.seancdavis.com/posts/wtf-is-frontmatter/
