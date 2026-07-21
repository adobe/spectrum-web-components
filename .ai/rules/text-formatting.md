---
description: Text formatting and capitalization rules for documentation and tickets
globs: **/*.md, **/*.txt,**/*.mdx
alwaysApply: false
---

# Text formatting conventions

## Capitalization rules

- Use sentence case for all headings and section titles (capitalize first word only)
  - Correct: "Getting started with components"
  - Incorrect: "Getting Started With Components"
- Exceptions: Proper nouns, acronyms, and technical terms should maintain their standard capitalization (e.g., JavaScript, CSS, HTML, GitHub)
- Never use all caps except for:
  - Established acronyms (e.g., API, HTML, CSS)
  - Severity levels (e.g., SEV1, SEV2)

## Markdown formatting

- Use backticks (`) for:
  - Code snippets
  - File names
  - Component names
  - Technical terms
- Use bold (\*\*) for:
  - Section headers in structured content
  - Important terms on first use
  - UI element names
- Use italics (\*) sparingly, only for:
  - Term definitions
  - Emphasis in technical explanations

## Lists and bullets

- Start each bullet point with a capital letter
- End each bullet point consistently (either all with periods or all without)
- Use parallel structure in lists (all items should be same grammatical form)

## Technical writing style

- Use present tense
- Use active voice
- Be concise and direct
- Avoid jargon unless technically necessary
- Define abbreviations on first use

## Punctuation

### Em dashes

Do not use em dashes (`—`) in documentation prose or code comments. Replace them with the punctuation that matches the sentence's intent:

| Em dash usage                         | Replace with                  |
| ------------------------------------- | ----------------------------- |
| Clause separator                      | Semicolon (`;`)               |
| Introducing elaboration or an example | Colon (`:`) or a new sentence |
| Parenthetical aside                   | Comma or parentheses          |

```markdown
<!-- ❌ Bad -->

appearance — disabled colors and an animated spinner
fill-only — fill-style="outline" is not supported

<!-- ✅ Good -->

appearance: disabled colors and an animated spinner
fill-only; fill-style="outline" is not supported
```

## Callouts

### Important blockquotes

When a `> **Important**:` blockquote warns about a constraint that is easy to miss and has real consequences if ignored (an invalid attribute combination, a WCAG failure, a behavior that looks like a bug but isn't), prefix it with the ⚠️ emoji so it's visually distinct from a plain aside:

```markdown
<!-- ❌ Bad -->

> **Important**: The outline style is only valid for semantic variants.

<!-- ✅ Good -->

> ⚠️ **Important:** The outline style is only valid for semantic variants.
```

Do not use ⚠️ on routine notes, tips, or `> **Note**:` asides; reserve it for the "if you get this wrong, something will visibly break" case. This is the only place project docs use emoji outside of the ❌/✅ markers in this file's own before/after examples; do not introduce emoji elsewhere in prose, headings, or code comments.

## Internal references

### No Jira ticket references in documentation

Do not include Jira ticket numbers (e.g. `SWC-1139`, `SWC-2034`) in documentation files, JSDoc comments, or MDX guides. They are internal tracking IDs that add no value to readers outside the team and become stale or inaccessible over time. Describe the factual constraint or behavior instead.

```markdown
<!-- ❌ Bad -->

verify contrast on hover (SWC-1139)
tracked for a future release (SWC-2035)

<!-- ✅ Good -->

verify that the background color maintains sufficient contrast on hover
not part of the initial 2nd-gen Button scope
```
