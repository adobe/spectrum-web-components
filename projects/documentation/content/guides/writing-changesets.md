---
layout: guide.njk
title: 'Writing Changesets'
displayName: Writing Changesets
slug: writing-changesets
---

# What are changesets?

Each changeset represents changes that have enough significance to warrant a new version. A changelog represents a single release. A changelog may contain several changesets.

There are three levels of releases that a changeset can describe, which are described by semantic versioning:

-   **Patch** (1.0.0 → 1.0.1): Bug fixes and non-breaking changes
-   **Minor** (1.0.0 → 1.1.0): New features, backwards-compatible
-   **Major** (1.0.0 → 2.0.0): Breaking changes requiring user update

Each change should be categorized under one of these types:

-   **Added**: New features or capabilities
-   **Changed**: Changes in existing functionality
-   **Deprecated**: Soon-to-be removed features
-   **Removed**: Features that have been removed
-   **Fixed**: Bug fixes

## Writing changesets

Changesets are different from commit messages. **Commit messages** are used to document the changes for _contributors_. **Changesets** are used to communicate the changes to the _consumers_ of the design system.

### Be specific and component-focused

Reference components by their tag names, include links to the PR, and be specific about changes, including:

-   What changed
-   Why it changed
-   How users should update their code (if applicable)

Use package names and categories for better readability. Make content easily linkable for reference.

#### ❌ Bad: not specific

```md
---
'@spectrum-web-components/alert': minor
---

-   Changed alert styles
```

#### ✅ Good: very specific

```md
---
'@spectrum-web-components/alert': minor
---

-   **Fixed**: Updated `<sp-alert>` default styles for better contrast [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

### Document breaking changes

Clearly mark and explain breaking changes with migration guidance. List each change on its own line.

#### ❌ Bad: doesn't list breaking changes

```md
---
'@spectrum-web-components/textfield': major
---

-   Changed how `<sp-textfield>` labels and placeholders work [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

#### ✅ Good: lists breaking changes

```md
---
'@spectrum-web-components/textfield': major
---

-   **Deprecated**: Deprecated `label` attribute, which confused label with placeholder text. [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
-   **Added**: Added `hidden-label` attribute, for use with assistive technologies. (Before: `<sp-textfield label="Full Name"></sp-textfield>` / After: `<sp-textfield hidden-label="Full Name"></sp-textfield>`)
-   **Added**: Added `placeholder` attribute, for placeholder text. (Before: `<sp-textfield label="john.smith@example.com"></sp-textfield>` / After: `<sp-textfield placeholder="john.smith@example.com"></sp-textfield>`)
```

### Focus on user impact

Describe changes from the user's perspective, not implementation details.

#### ❌ Bad: not user-focused

```md
---
'@spectrum-web-components/overlay': patch
---

-   Replace native `showModal()` for performance optimization [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

#### ✅ Good: user-focused

```md
---
'@spectrum-web-components/overlay': patch
---

-   **Fixed**: Improved `<sp-overlay>` performance in Chromium-based browsers. [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

### Use past tense

Write changes in past tense to describe what has been modified.

#### ❌ Bad: uses present tense

```md
---
'@spectrum-web-components/button': minor
---

-   **Fixed**: Resolves `<sp-button>` accessibility [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
-   **Added**: Adds new variant `tertiary` [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

#### ✅ Good: usespast tense

```md
---
'@spectrum-web-components/button': minor
---

-   **Fixed**: Resolved `<sp-button>` accessibility [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
-   **Added**: Added new variant `tertiary` [#9999](https://github.com/adobe/spectrum-web-components/pull/9999)
```

## Additional Resources

-   [Changesets Documentation](https://github.com/changesets/changesets)
-   [Common Questions](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
-   [Detailed Release Process](https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md)
