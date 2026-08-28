<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Listbox / Listbox accessibility migration analysis

<!-- Document title (editable) -->

# Listbox accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-listbox>`](#recommendations-swc-listbox)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Manual screen reader testing](#manual-screen-reader-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc tells you how **`swc-listbox`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**. `swc-listbox` is a new 2nd-gen component — there is no 1st-gen `sp-listbox` (1st-gen `sp-combobox` borrowed `sp-menu` with `role="listbox"` internally). It is the container that presents a list of selectable [`swc-option`](../option/accessibility-migration-analysis.md) rows, optionally organized into [`swc-option-group`](../option-group/accessibility-migration-analysis.md)s, implementing the APG [listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) pattern.

`swc-listbox` exists so that the `listbox` half of a combobox or a picker is **one shared component** instead of being re-implemented in each, and so that a listbox can also be used **standalone**. It carries `role="listbox"` on its own host and holds `swc-option`/`swc-option-group` children in its default slot. In [`swc-combobox`](../combobox/accessibility-migration-analysis.md) and picker, `swc-listbox` is rendered inside the parent's **shadow DOM**, and the options and option groups the author slots into the combobox or picker are projected into the listbox's default slot. That means an option or option group can have three kinds of parent — a `swc-listbox` (standalone), a `swc-combobox`, or a picker — and the listbox is the element that actually carries `role="listbox"` in every case.

### Also read

- [Combobox accessibility migration analysis](../combobox/accessibility-migration-analysis.md) — the first embedded consumer; explains the `combobox`-to-`listbox` wiring and the cross-root active-descendant reference to options.
- [Option accessibility migration analysis](../option/accessibility-migration-analysis.md) and [Option group accessibility migration analysis](../option-group/accessibility-migration-analysis.md) — the children this component holds; the unique-`value` and distinct-sibling-label rules live there and in the combobox doc.
- [Forms strategy: 2nd-gen proposal](../../05_strategies/forms-strategy-rfc.md) — role-placement and cross-root ARIA direction.

### What it is

- A **list of selectable options**: `role="listbox"` on the host, holding `swc-option` rows (and optional `swc-option-group`s) in its default slot, with single-select by default and optional multi-select (`aria-multiselectable`).
- **The role lives on the `swc-listbox` host**, set via `ElementInternals` (`internals.role = 'listbox'`). Because the real element carries the role, the same component works standalone (author places it in the light DOM) and embedded (a combobox or picker renders it in its shadow DOM and projects slotted options into it).
- **Shared, two-mode component.** Standalone, it is a focusable widget with its own keyboard model and accessible name. Embedded in a combobox or picker, it is the popup surface: it keeps `role="listbox"` but is not the focusable element — the combobox input or the picker button owns focus, `aria-expanded`, and the active-descendant reference into the list.

### When to use something else

- A **single value chosen from a field that also allows typing** — use [`swc-combobox`](../combobox/accessibility-migration-analysis.md), which composes `swc-listbox` internally; do not hand-wire a bare listbox next to a text input.
- A **single value chosen from a collapsed trigger** (no typing) — use a picker, which also composes `swc-listbox`.
- A **menu of commands that perform actions** — use [`swc-menu`](../menu/accessibility-migration-analysis.md) with [`swc-menu-item`](../menu-item/accessibility-migration-analysis.md) (`role="menu"`/`menuitem`), not a listbox of options.
- A set of **independently toggleable options that are all always visible** and behave like form controls — consider a checkbox or radio group instead; a listbox is a single composite widget with one Tab stop, not a set of separate fields.

### What it is not

- Not a menu. `listbox` is for *selecting values*; `menu` is for *running commands*. Do not give `swc-listbox` `menu`/`menuitem`-family semantics even though 1st-gen composes the combobox popup from `sp-menu`.
- Not a form field on its own. When it participates in a form it does so through its embedding parent (combobox, picker), which owns form association; a standalone `swc-listbox` exposes selection but is not itself a form-associated custom element in this migration's scope.
- Not the owner of option identity or option content. Options own their own `value`, label, `lang`, and selected/disabled state; the listbox coordinates selection across them, it does not re-render them.

### Related

- [`swc-option`](../option/accessibility-migration-analysis.md) and [`swc-option-group`](../option-group/accessibility-migration-analysis.md) — the children.
- [`swc-combobox`](../combobox/accessibility-migration-analysis.md) and picker — the embedding consumers that render `swc-listbox` in their shadow DOM.
- The [`FocusgroupNavigationController`](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) and [`LiveSelectionController`](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx) — the shared controllers the listbox uses for option traversal and selection enforcement (and lends to its embedding parents).

---

## ARIA and WCAG context

### Pattern in the APG

- `swc-listbox` implements the APG [listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/): a `listbox` container whose children are `option`s (or `group`s of options), with `aria-selected` marking chosen options and `aria-multiselectable="true"` when more than one may be selected. Grouping follows the [grouped listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/).
- The APG describes two focus models: **roving `tabindex`** (DOM focus moves to the active option) and **active-descendant** (DOM focus stays on the listbox container, which carries `aria-activedescendant`). A standalone `swc-listbox` may use either, driven by the `FocusgroupNavigationController`. When **embedded in a combobox**, the active-descendant model is required and the reference lives on the combobox input, not on the listbox — see [`swc-combobox`](../combobox/accessibility-migration-analysis.md#keyboard-and-focus).
- **Single host role.** `swc-listbox` exposes exactly one role, `listbox`, on its host — fixed, never conditional, never overridable. It is not a value-bearing text control, so the role sitting on the host is correct and lets the same element be reused across standalone, combobox, and picker contexts.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) | The listbox exposes `role="listbox"`, an accessible name, its multi-selectable state, and (through its options) which options are selected. |
| [Info and relationships (1.3.1)](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) | The listbox → option (and listbox → group → option) containment must be a real programmatic relationship. When options are slotted into an embedded listbox across the shadow boundary, the flattened accessibility tree must still show them as the listbox's children. |
| [Keyboard (2.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) | Every option is reachable and selectable by keyboard; one Tab stop for the whole widget (standalone), with arrows/Home/End/typeahead inside. |
| [Focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | The active option has a visible indicator distinct from the selected-option indicator, whether focus is on the option (roving) or on the container (active-descendant). |
| [Use of color (1.4.1)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) | Selected and disabled options are not signalled by color alone; pair with `aria-selected`/`aria-disabled` and a non-color cue. |

**Bottom line:** `swc-listbox` centralizes the `listbox` role, option traversal, and selection so combobox and picker do not each re-implement them, and so a standalone listbox is possible. Its accessibility job is to own `role="listbox"` and a name, coordinate selection across real option children, and behave correctly in both the standalone (focusable) and embedded (parent-driven, active-descendant) modes.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
| --- | --- | --- | --- | --- | --- |
| [SWC-592](https://jira.corp.adobe.com/browse/SWC-592) | Bug | To Do | Unresolved | Combobox a11y issues speaking the options | 1st-gen had no shared listbox; the popup was `sp-menu` with `role="listbox"` re-rendering options |
| [SWC-1373](https://jira.corp.adobe.com/browse/SWC-1373) | Story | To Do | Unresolved | Spike: compare semantics across menu, action menu, combobox, and picker | Motivates a shared listbox distinct from menu semantics |
| [SWC-1377](https://jira.corp.adobe.com/browse/SWC-1377) | Story | To Do | Unresolved | RFC(menu): align menu and listbox components with WAI-ARIA APG patterns | Directly informs the listbox/menu split |

---

## Recommendations: `<swc-listbox>`

Component tag may change until API freeze. `swc-listbox` is new in 2nd-gen; there is no 1st-gen equivalent to preserve compatibility with.

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Host role** | `listbox`, set on the host via `ElementInternals` (`internals.role = 'listbox'`). Fixed and not author-overridable; if a menu is needed, use `swc-menu`, not a role override. |
| **Accessible name** | A standalone listbox must have an accessible name via an `accessible-label`/`accessible-labelledby`-style API (the project's cross-root-safe naming, per the [forms strategy](../../05_strategies/forms-strategy-rfc.md#33-idref-strategy-label-help-text-and-errors)); do not expose raw `aria-label` on the host. When embedded, the parent supplies the name — the combobox/picker field label names the listbox — so the listbox does not need its own visible label in that mode. |
| **Children** | `swc-option` and `swc-option-group` only, in the default slot. In embedded mode these arrive by slot projection from the combobox/picker light DOM; the listbox does not re-render or clone them, so each option keeps its own `value`, `lang`, and state. |
| **Selection: single vs multiple** | Single-select by default (one `aria-selected="true"` at a time). For multi-select, set `aria-multiselectable="true"` on the host and allow multiple `aria-selected` options. Use the **`LiveSelectionController`** in `'single'` mode for single-select; in `'multiple'` mode it imposes no constraint. Selection state (`aria-selected`) lives on the options, not the listbox. |
| **Active option** | The active (keyboard-focused) option is conveyed by `aria-activedescendant`. In standalone active-descendant mode, `aria-activedescendant` (or its element-reference form) lives on the `swc-listbox` host. In embedded combobox mode, it lives on the **combobox input**, not the listbox, and targets the slotted option across the shadow boundary — see [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues). Active state is never the same as `aria-selected`. |
| **Option traversal** | Use the **`FocusgroupNavigationController`** with `direction: 'vertical'` and `skipDisabled: true`. Standalone, it can move DOM focus (roving tabindex) or track the active item for active-descendant. Embedded in a combobox, it must **not** move DOM focus (focus stays on the input); the parent uses the controller's active-item tracking to drive `aria-activedescendant`. |
| **Grouping** | Accept `swc-option-group` (`role="group"`) children; the active-descendant reference targets the option, not the group. See [`swc-option-group`](../option-group/accessibility-migration-analysis.md). |
| **Unique `value` and distinct sibling labels** | The unique-`value`-per-widget and distinct-sibling-label rules (with dev warnings) are owned by the embedding parent for combobox/picker, and by the listbox itself when standalone: a standalone `swc-listbox` should run the same validation over its own options. See [`swc-option`](../option/accessibility-migration-analysis.md#aria-roles-states-and-properties). |
| **Empty / no matches** | When the list has no options to show (for example a combobox filter with no matches), do not present an empty `listbox` as if it had content; the embedding parent manages `aria-expanded` and any "no results" messaging (measured, not an assertive live region — see [`swc-combobox`](../combobox/accessibility-migration-analysis.md#aria-roles-states-and-properties)). |

### Shadow DOM and cross-root ARIA Issues

`swc-listbox` is the component that makes the combobox/picker cross-root story tractable, so its two modes have different — and mostly favorable — cross-root properties.

**Standalone: no cross-root issue.** The listbox and its slotted options are in the same document (light DOM), so listbox → option containment and any `aria-activedescendant` on the listbox host resolve same-root. The listbox's own name and the group labels associate same-root. There is nothing cross-root to solve.

**Embedded in a combobox/picker: the boundary moves, and mostly simplifies.** The `swc-listbox` is rendered in the parent's shadow DOM, and the author's `swc-option`/`swc-option-group` elements — written in the parent's light DOM — are projected into the listbox's default slot. Two relationships result:

- **Parent focus element → listbox (`aria-controls`):** the combobox input (or picker button) and the `swc-listbox` are now in the **same** shadow root (the parent's), so `aria-controls` can be a plain same-root IDREF. This is simpler than referencing a listbox that lives in yet another root, and is a direct benefit of making the listbox a shadow-DOM child of the parent.
- **Parent focus element → active option (`aria-activedescendant`):** the option is a **light-DOM** element of the parent (projected into the shadow listbox, but still rooted in the document), while the input is in the parent's shadow root — so this reference is still cross-root and must use the **`ariaActiveDescendantElement`** element-reference property, not an IDREF string. This is the one genuinely cross-root relationship. It resolves because the option is a real, correctly-roled `swc-option`, and that resolution across slot projection — including the extra nesting level a `swc-option-group` adds — is demonstrated by the [hybrid grouped-combobox POC](https://nikkimk.github.io/web-component-form-strategy-demos/demo-hybrid.html) (active descendant points at the option, never the group); production still confirms it across the full AT matrix. See [`swc-combobox`'s Shadow DOM section](../combobox/accessibility-migration-analysis.md#shadow-dom-and-cross-root-aria-issues).

Because options are projected rather than re-rendered, the listbox → option containment is preserved in the flattened accessibility tree without any duplicate copies — the 1st-gen double-render (and its `lang`-loss and option-announcement defects, [SWC-2359](https://jira.corp.adobe.com/browse/SWC-2359)/[SWC-592](https://jira.corp.adobe.com/browse/SWC-592)) does not occur. Expected axe-core note: `aria-required-children` can still fire on the listbox because axe does not traverse the slot projection to find the `option` children; document it as a written exclusion on the composed story per the [forms strategy axe policy](../../05_strategies/forms-strategy-rfc.md#34-axe-core-policy), and verify child exposure with manual AT testing, especially in Firefox.

### Accessibility tree expectations

- **Standalone, named:** role `listbox` with an accessible name; `aria-multiselectable="true"` when multi-select; `option` children (and `group`s) with correct names and `aria-selected` state; the active option referenced by `aria-activedescendant` on the listbox (active-descendant mode) or focused directly (roving mode).
- **Embedded in a combobox:** role `listbox` named by the field label; not focusable itself; contains the projected `option`/`group` children; the active option is referenced from the combobox input's `aria-activedescendant`, not from the listbox.
- **Grouped:** `group` nodes each with a name, containing their `option` children; arrowing moves across group boundaries; the group is never the active descendant.
- **Selected options:** `aria-selected="true"` on the chosen option(s) — exactly one in single-select, any number in multi-select; carried by the options, not the listbox.
- **Disabled options:** `aria-disabled="true"`, present and perceivable, skipped in traversal.

### Keyboard and focus

Behavior depends on the mode:

- **Standalone.** One Tab stop for the whole widget. Inside, the `FocusgroupNavigationController` (`direction: 'vertical'`, `skipDisabled: true`, `wrap` per design) handles <kbd>ArrowUp</kbd>/<kbd>ArrowDown</kbd>, <kbd>Home</kbd>/<kbd>End</kbd>, and optional typeahead. Selection is made with <kbd>Enter</kbd>/<kbd>Space</kbd>; multi-select adds <kbd>Shift</kbd> + arrows and select-all where the design calls for it, following the [APG listbox keyboard model](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/#keyboardinteraction). The listbox may use roving tabindex (focus on the option) or active-descendant (focus on the container).
- **Embedded in a combobox/picker.** The listbox is **not** a Tab stop and does not hold DOM focus; the combobox input or picker button is the focusable element and owns the keyboard model. The listbox contributes its option-traversal logic through the shared `FocusgroupNavigationController`, but the parent keeps DOM focus on its own control and drives `aria-activedescendant` — see [`swc-combobox`'s Keyboard and focus](../combobox/accessibility-migration-analysis.md#keyboard-and-focus). Pointer users can click an option to select it in every mode.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `internals.role` is `listbox` on the host; `aria-multiselectable` reflects multi-select; single-select keeps exactly one `aria-selected` option via the `LiveSelectionController`; slotted `swc-option`/`swc-option-group` children are projected (not re-rendered) and keep their `value`/`lang`/state; standalone listbox validates unique `value`s and distinct sibling labels; embedded mode does not put a Tab stop on the listbox or move DOM focus off the parent control. |
| **aXe + Storybook** | A standalone named listbox (single and multi-select) with no violations; a grouped listbox; a listbox embedded in a combobox story carrying the documented `aria-required-children` exclusion with a written `// reason:`. Localized-option and disabled-option coverage. |
| **Playwright ARIA snapshots** | Standalone: `role=listbox` with name, `multiselectable`, `option`/`group` children and `selected` state, and correct `activedescendant`/roving focus. Embedded: the listbox named by the field label, not focusable, with the active option referenced from the parent control. |

### Manual screen reader testing

Test both modes with [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) in NVDA, JAWS, and VoiceOver. Standalone: confirm the listbox is announced with its name and multi-selectable state, arrowing announces each option and its selected state, and grouping is announced as context. Embedded: confirm the composed combobox/picker announces the listbox and its options correctly and that focus never leaves the parent control. Verify cross-root active-descendant exposure in **Firefox**, where element-reference ARIA is least consistent.

---

## Summary checklist

- [ ] `swc-listbox` sets `role="listbox"` on its host via `ElementInternals`; fixed, not author-overridable.
- [ ] Works in two modes: standalone (focusable, own keyboard model and name) and embedded (rendered in a combobox/picker shadow DOM, not focusable, parent-driven).
- [ ] Accepts `swc-option` and `swc-option-group` in the default slot; embedded options arrive by slot projection and are not re-rendered (no duplicate copies; `value`/`lang`/state preserved).
- [ ] Single-select by default (one `aria-selected`); multi-select via `aria-multiselectable="true"` and the `LiveSelectionController`.
- [ ] Active option conveyed by `aria-activedescendant` — on the listbox host standalone, on the combobox input when embedded; never conflated with `aria-selected`.
- [ ] Embedded: parent-focus → listbox `aria-controls` is same-root; parent-focus → active option `aria-activedescendant` uses `ariaActiveDescendantElement` cross-root.
- [ ] Standalone listbox validates unique option `value`s and distinct sibling labels; combobox/picker own that validation when embedded.
- [ ] `aria-required-children` axe false positive documented with a written `// reason:`, not a silent disable; child exposure verified manually including Firefox.
- [ ] Menu semantics are not used; `swc-menu`/`swc-menu-item` remain the command-menu components.

## References

- [Combobox accessibility migration analysis (this repo)](../combobox/accessibility-migration-analysis.md), [Option accessibility migration analysis (this repo)](../option/accessibility-migration-analysis.md), [Option group accessibility migration analysis (this repo)](../option-group/accessibility-migration-analysis.md) — the consumer and children.
- [Menu accessibility migration analysis (this repo)](../menu/accessibility-migration-analysis.md) — the command-menu counterpart the listbox is deliberately distinct from.
- [Forms strategy: 2nd-gen proposal (this repo)](../../05_strategies/forms-strategy-rfc.md) — role placement, naming, and cross-root ARIA policy.
- [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: listbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) and [grouped listbox example](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/examples/listbox-grouped/)
- [`FocusgroupNavigationController` (this repo)](../../../../2nd-gen/packages/core/controllers/focusgroup-navigation-controller/focusgroup-navigation-controller.mdx) and [`LiveSelectionController` (this repo)](../../../../2nd-gen/packages/core/controllers/live-selection-controller/live-selection-controller.mdx)
- [2nd-gen Storybook: Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
