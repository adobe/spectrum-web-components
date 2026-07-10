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

### CSS class names in prose

When mentioning a CSS class in documentation:

| Context                                                         | Form                           | Example                              |
| --------------------------------------------------------------- | ------------------------------ | ------------------------------------ |
| The word "class" (or "base class" / "modifier class") is stated | Backticks, **no** leading `.`  | apply the `swc-Link` base class      |
| Class token alone (no "class" in the sentence)                  | Backticks **with** leading `.` | add `.swc-Typography--emphasized`    |
| HTML `class` attribute values                                   | Backticks, **no** leading `.`  | `<ul class="swc-Typography--links">` |
| Class column in an API / reference table                        | Backticks, **no** leading `.`  | `swc-Link--standalone`               |

Do not write "the `.swc-Link` class" — the leading `.` and the word "class" are redundant. Pick one signal.

```markdown
<!-- ❌ Bad -->

apply the `.swc-Link` class
add `swc-Typography--emphasized`

<!-- ✅ Good -->

apply the `swc-Link` class
add `.swc-Typography--emphasized`
```

## Keyboard keys

Wrap individual key names in `<kbd>` tags, including in bulleted lists and table cells: `<kbd>Tab</kbd>`, `<kbd>Enter</kbd>`, `<kbd>Home</kbd>`, `<kbd>End</kbd>`. For chords, wrap each key separately and join with ` + `: `<kbd>Shift</kbd> + <kbd>Tab</kbd>` (not `Shift+Tab` as plain text).

## Attribute and variant values in bulleted definitions

When the bolded lead-in of a bullet **is itself** the literal attribute/enum value (not a CSS class — see the CSS class table above), wrap it in backticks even though the bullet already bolds it. This applies to Options-style enumerations (semantic/non-semantic variant names, alignment or positioning keywords, static-color values):

```markdown
<!-- ❌ Bad -->

- **accent**: new, beta, prototype, draft
- **start** (default): Buttons align to the inline start

<!-- ✅ Good -->

- **`accent`**: new, beta, prototype, draft
- **`start`** (default): Buttons align to the inline start
```

When the bolded lead-in is a human-readable label that is *distinct* from the code value (e.g. a size name where the value is a single-letter code), backtick only the code, not the label:

```markdown
<!-- ❌ Bad -->

- **Small (s)**: default size; compact spaces

<!-- ✅ Good -->

- **Small (`s`)**: default size; compact spaces
```

Property names, slot names, event names, and state labels (e.g. `label`, `icon slot`, `change`, **Default**, **Disabled**) are documented elsewhere with their own established conventions and are **not** in scope for this rule — do not add backticks to those.

## UI element names

Bold the names of UI elements being referenced (Storybook panel/tab names, OS settings, menu items) on first mention within a section, e.g. **Network** tab, **System Settings**, **Keyboard navigation** toggle. Do not bold generic nouns that aren't a specific named control.

## Callouts

Use the `⚠️ **Important:**` blockquote form for callouts the reader must not skip, replacing plain `> **Important**:` blockquotes:

```markdown
<!-- ❌ Bad -->

> **Important**: The outline style is only valid for semantic variants.

<!-- ✅ Good -->

> ⚠️ **Important:** The outline style is only valid for semantic variants.
```

## WCAG references

Link bare WCAG success-criterion mentions to the W3C Understanding page for that criterion instead of leaving them as plain text:

```markdown
<!-- ❌ Bad -->

Ensure sufficient contrast between link text and surrounding content (WCAG 1.4.3)

<!-- ✅ Good -->

Ensure sufficient contrast between link text and surrounding content ([WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html))
```

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

| Em dash usage                         | Replace with                   |
|---------------------------------------|--------------------------------|
| Clause separator                      | Semicolon (`;`)                |
| Introducing elaboration or an example | Colon (`:`) or a new sentence  |
| Parenthetical aside                   | Comma or parentheses           |

```markdown
<!-- ❌ Bad -->

appearance — disabled colors and an animated spinner
fill-only — fill-style="outline" is not supported

<!-- ✅ Good -->

appearance: disabled colors and an animated spinner
fill-only; fill-style="outline" is not supported
```

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
