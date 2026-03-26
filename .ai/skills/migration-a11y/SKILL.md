---
name: migration-a11y
description: Phase 5 of 1st-gen to 2nd-gen component migration. Use to implement WCAG-aligned semantics, ARIA, keyboard support, and focus management, and document accessibility behavior.
---

# Migration a11y ([Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md))

[Phase 5](../../../CONTRIBUTOR-DOCS/03_project-planning/02_workstreams/02_2nd-gen-component-migration/README.md) of the 1st-gen → 2nd-gen component migration. The goal is to implement WCAG-aligned behavior — semantics, ARIA, keyboard support, and focus management — and verify it with assistive technology and automated tests.

See also: [`accessibility-compliance`](../accessibility-compliance/SKILL.md) for general WCAG 2.2 patterns, ARIA reference, and testing tools.

## When to use this skill

- Phase 4 (migration-styling) is complete
- The user asks to "implement accessibility" or "add a11y" for a component
- The user asks to add keyboard support, ARIA, or screen reader behavior
- The user refers to "Phase 5" of the 2nd-gen component migration workstream

## When NOT to use

- Phase 4 is not complete — styling should be in place before a11y testing
- You need general WCAG or ARIA reference — use the [`accessibility-compliance`](../accessibility-compliance/SKILL.md) skill

## How to invoke

- "Implement accessibility for [component]"
- "Add a11y for [component]"
- "Phase 5 for [component] migration"

---

## Workflow

### 1. Read the accessibility guides

- Follow the repo's [Accessibility testing guide](../../../CONTRIBUTOR-DOCS/01_contributor-guides/09_accessibility-testing.md) and the [PR template accessibility checklist](../../../.github/PULL_REQUEST_TEMPLATE.md).
- Use the codebase-specific a11y patterns in [2nd-gen Storybook accessibility guides](../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/) — these complement the contributor guide and the APG.

### 2. Identify the APG pattern

Find the [ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/) pattern for your component type (e.g. button, combobox, dialog). This is the authoritative source for role, keyboard behavior, and ARIA requirements.

**Stop and ask:** If the component's primary role maps to multiple APG patterns or could be split into more than one component (e.g. `sp-menu` → menu vs. listbox), confirm the approach before implementing.

---

## Decision trees

### What accessibility pattern applies?

- **Simple interactive element** (e.g. button, link, checkbox) → Match to the native HTML element or the closest [APG](https://www.w3.org/WAI/ARIA/apg/) pattern; prefer native semantics over ARIA.
- **Composite widget** (e.g. menu, listbox, toolbar, radio group) → Follow the full composite APG pattern: role on the container, item roles on children, roving `tabindex`, full keyboard/ARIA requirements.
- **Multiple patterns apply, or component could be split** → Stop and ask — confirm the approach with the team before implementing.

---

### 3. Implement

Cover all four areas:

- **Semantics** — prefer native HTML elements; add ARIA only where native semantics are insufficient
- **ARIA** — roles, states (`aria-expanded`, `aria-selected`, `aria-disabled`), and properties (`aria-labelledby`, `aria-describedby`) matching the APG pattern
- **Keyboard support** — all interactions operable by keyboard; arrow keys, Enter, Escape, Tab/Shift+Tab as defined by APG
- **Focus management** — trap focus in overlays/dialogs; restore focus on close; manage `tabindex` for composite widgets

### 4. Native vs custom controls

| Control type                        | Approach                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Native form control (e.g. Checkbox) | Use `delegatesFocus: true`; let the native element handle focus and keyboard     |
| Custom control (e.g. Radio)         | Add `role` and `aria-*` attributes on host; implement keyboard handling manually |

See the 2nd-gen Checkbox and Radio components as reference implementations for each pattern.

### 5. Test with assistive technology

- Test with a screen reader (VoiceOver on macOS, NVDA or JAWS on Windows)
- Verify announcements, focus behavior, and keyboard navigation match the APG pattern
- Check for regressions against the 1st-gen component's behavior

### 6. Document in JSDoc

Add JSDoc comments for:

- Public events — note whether they are native or custom and what data they carry
- ARIA relationships between host and internal elements
- Any keyboard shortcuts beyond standard Tab navigation

**Stop and ask:** Custom events vs native events

Prefer native events when they give the right semantics (e.g. `click`). Add custom events only when you need to expose extra data or lifecycle hooks (e.g. `sp-close`). Document both in JSDoc.

---

## Checklist

- [ ] APG pattern identified and linked in the component's documentation
- [ ] Semantics and ARIA match the chosen APG pattern
- [ ] Keyboard and focus behavior implemented and tested
- [ ] Component behaves as expected with a screen reader
- [ ] No accessibility regressions vs 1st-gen
- [ ] Automated a11y tests added (`.a11y.spec.ts`)
- [ ] Public events documented in JSDoc (native vs custom, payload)

---

## Common problems

| Problem                           | Solution                                                                                                                                                          |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unclear which APG pattern applies | Start from the component's primary role (e.g. "combobox" → Combobox pattern). If the component spans multiple patterns, consider splitting it.                    |
| Focus trap in overlays            | Use a shared focus-trap utility if the repo provides one; follow the APG modal/dialog pattern.                                                                    |
| Custom controls missing semantics | Ensure every interactive custom element has a `role`, an accessible name, and keyboard support. Never use `div` or `span` for interactive elements without these. |

---

## Quality gate

Phase 5 is complete when:

> The APG pattern is identified and linked; keyboard and ARIA are implemented; automated a11y tests pass; screen reader testing is complete with no regressions vs 1st-gen.
