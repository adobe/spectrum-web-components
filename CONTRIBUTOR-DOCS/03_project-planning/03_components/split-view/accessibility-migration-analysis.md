<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Split View / Split view accessibility migration analysis

<!-- Document title (editable) -->

# Split view accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-split-view>`](#recommendations-swc-split-view)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-split-view`** should work for **accessibility**. It supports **WCAG 2.2 Level AA**. There is no React Spectrum equivalent and no Figma file for this component; recommendations below are based on the 1st-gen implementation, the current WAI-ARIA 1.2 specification, and comparable external implementations of the same pattern (see [References](#references)). The 2nd-gen API is expected to match 1st-gen's API (`vertical`, `resizable`, `collapsible`, `primary-min`, `primary-max`, `primary-size`, `secondary-min`, `secondary-max`, `splitter-pos`, `label`, and the `change` event).

### Also read

[Split view migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM (once written).

### What it is

- A **layout** element that shows two sibling panes side by side (horizontal) or stacked (`vertical`), with an internal **divider** between them. When `resizable` is set, that divider becomes a **draggable and keyboard-operable** control that changes how much space each pane gets. When `collapsible` is also set (it requires `resizable`), the control can move a pane's size to zero.
- Only the **divider** carries any ARIA semantics. The two panes are plain content containers with no required role; the outer host has no ARIA role of its own.

### When to use something else

- A **static** line between sections that the user cannot drag → [Divider](../divider/accessibility-migration-analysis.md). The divider doc's own "when to use something else" already points **to** split view's pattern for this case ([APG: window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/)); split view is that pattern.
- A **numeric input** the user sets to a precise value (volume, zoom, brightness) → a slider component with `role="slider"`. Split view's divider reports a position as a percentage, but it is a **layout** control, not a data-entry widget.
- **Collapsing/expanding a whole panel** as a primary interaction (not just a side effect of dragging to an edge) → a dedicated disclosure or panel-toggle pattern with a labeled button, so the action has a discoverable name distinct from "resize."

### What it is not

- **Not** an [APG window splitter](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/) *page* implementation — the APG does not currently publish a maintained pattern page for this widget (see [Pattern in the APG](#pattern-in-the-apg)). Split view follows the underlying **separator (interactive/range) role** semantics directly from the WAI-ARIA specification instead of a named APG recipe.
- **Not** a tab or accordion: both panes stay mounted and visible at all times. Resizing never hides a pane's content from the accessibility tree the way a collapsed accordion panel or unselected tab panel would.

---

## ARIA and WCAG context

### Pattern in the APG

- There is **no** current APG pattern page for a resizable "window splitter." Ozzie the ARIA Authoring Practices Guide previously carried a "Window Splitter" pattern in early drafts, but it was not carried forward as a maintained pattern, and the gap is still an open topic in the working group: see [w3c/aria#1443](https://github.com/w3c/aria/issues/1443), which discusses that neither the plain `slider` role nor the (not-yet-shipped) `splitter` role proposal fully covers a two-dimensional resize handle, and that no dedicated role has been adopted.
- In the absence of a named pattern, the **[`separator` role](https://www.w3.org/TR/wai-aria-1.2/#separator)** is the correct fit and is what 1st-gen already implements: the specification states that when a `separator` is **focusable**, it behaves like a **range widget** and should expose `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-orientation` — the same shape recommended by external implementations of this exact pattern, for example [Nord Health's resizable handle component](https://nordhealth.design/components/resizable-handle/), which implements the ARIA window-splitter shape (`aria-controls`, `aria-orientation`, `aria-valuenow`/`min`/`max`, a default localized name, and arrow/<kbd>Home</kbd>/<kbd>End</kbd> keyboard support).
- A non-focusable divider (non-`resizable` split view) has no widget semantics and should not carry value attributes, matching the plain [Divider](../divider/accessibility-migration-analysis.md) guidance.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`separator` role, focusable/range variant](https://www.w3.org/TR/wai-aria-1.2/#separator) | When `resizable`, the divider is a **focusable range widget**: it needs `aria-valuenow`, and should also carry `aria-valuemin` / `aria-valuemax` and `aria-orientation`. When not `resizable`, it is a plain, non-focusable separator with no value attributes. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | A focusable widget with **no accessible name is not exposed to some assistive technology at all** — this is exactly what caused [SWC-276](https://jira.corp.adobe.com/browse/SWC-276): VoiceOver on iOS skipped the resizable divider entirely because it had no label. A name (default or author-supplied) is **required**, not optional, whenever the divider is focusable. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | Every action available by dragging (moving the split, collapsing a pane) must also be available from the keyboard, with no keyboard trap. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | The divider needs a visible focus indicator distinct from its hover/active styling. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | The divider line and its gripper affordance are graphical objects and need at least 3:1 contrast with adjacent colors, in both the resting and `forced-colors` states. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | The draggable hit area is visually thin (a couple of pixels wide, widened by a small gripper). Confirm the **pointer/touch** hit target meets the minimum target size guidance or qualifies for an exception; this is the same class of issue [SWC-276](https://jira.corp.adobe.com/browse/SWC-276)'s "ignored on mobile" title points at, even though that specific bug was a missing-name issue rather than a target-size one. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | Resized/collapsed states (`is-resized-start`, `is-collapsed-end`, etc.) are currently communicated only through cursor and color changes; the `aria-valuenow` percentage is the non-visual equivalent and must stay accurate at the collapsed extremes (0 and 100%). |

**Bottom line:** Ship the divider as a **prescribed, single `separator` role** that is a plain non-focusable divider by default and becomes a focusable range widget — with a name, orientation, and value attributes — whenever `resizable` is set. Do not let the "ignored on mobile" regression from [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) reappear in 2nd-gen: a resizable divider without an accessible name is not an acceptable state.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) | Bug | Done | Fixed | [a11y] SplitView is entirely ignored by screen readers on mobile — VoiceOver on iOS skipped the resizable divider because it had no accessible name; fixed by always applying a default `aria-label` ("Resize the panels") when `resizable` is set, customizable via the `label` attribute. |

---

## Recommendations: `<swc-split-view>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role, on the divider** | The divider maps to **one** semantic role, `separator`, and it is **prescribed and fixed** — not author-overridable. The outer `swc-split-view` host carries **no** ARIA role of its own; it is a layout container. This satisfies the single-role policy without needing a split into multiple components. |
| **Name is required whenever focusable ([SWC-276](https://jira.corp.adobe.com/browse/SWC-276))** | Preserve the 1st-gen fix: apply a default accessible name (1st-gen uses `"Resize the panels"`) to the divider whenever `resizable` is set, overridable via the `label` property/attribute. Do **not** set a name when the divider is not `resizable` — a non-interactive line needs no name, matching [Divider](../divider/accessibility-migration-analysis.md). Never ship a focusable divider with no name; that combination is the exact regression [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) fixed. |
| **`aria-valuenow` (required when resizable)** | Keep reporting the primary pane's size as a percentage of the total split-view size, updated on every drag or keyboard move. |
| **`aria-valuemin` / `aria-valuemax` (gap to close)** | 1st-gen sets `aria-valuenow` but never sets `aria-valuemin` / `aria-valuemax`. Per the [WAI-ARIA `separator` role](https://www.w3.org/TR/wai-aria-1.2/#separator), a focusable separator "behaves as a range widget" and is expected to expose min/max alongside now. Add `aria-valuemin="0"` and `aria-valuemax="100"` (matching the percentage basis already used for `aria-valuenow`) when `resizable` is set. |
| **`aria-valuetext` (consider)** | A bare percentage ("62%") does not say what is 62% of what. Consider a localized `aria-valuetext` (for example, "62% — First panel") so the announcement is meaningful without requiring the user to already know which pane is "now." Keep `aria-valuenow` numeric and correct even when `aria-valuetext` is present. |
| **`aria-orientation`** | Keep setting this whenever `resizable`. **Verify** the current mapping during manual AT testing: 1st-gen sets `aria-orientation` to describe the divider **line's** visual orientation (a vertical split gets `aria-orientation="vertical"`, i.e. the line drawn between side-by-side panes). Because this is a *focusable range widget*, some assistive technology may instead expect `aria-orientation` to describe the **axis of motion** (how the value changes when arrow keys are pressed) — the same ambiguity the [w3c/aria#1443](https://github.com/w3c/aria/issues/1443) discussion flags for this widget shape generally. Do not change the mapping without confirming actual screen reader announcements; document whichever convention is kept. |
| **`aria-controls`** | Keep pointing at the primary (first) pane so assistive technology can identify what the divider resizes. Consider whether `aria-controls` should reference **both** panes (it accepts a space-separated list of IDs) since dragging changes the size of both, not only the primary one — Nord Health's implementation controls "the affected panel elements" (plural). See [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues) for how this reference should be wired in 2nd-gen. |
| **`collapsible` and its effect on value** | When `collapsible` drives `aria-valuenow` to 0 or 100, that is enough for a screen reader user to infer "collapsed," but it is not explicit. Consider naming the collapsed state directly in `aria-valuetext` when this feature is implemented (e.g. "0% — First panel (collapsed)") rather than relying on the bare number. |
| **`vertical`, `primary-min/max`, `secondary-min/max`, `primary-size`, `splitter-pos`** | Layout-only; no independent ARIA mapping beyond feeding the computed `aria-valuenow`/`min`/`max` described above. |
| **Docs** | State plainly that the divider is non-interactive and nameless by default, and becomes a named, focusable, valued widget the moment `resizable` is added — there is no in-between state. |

### Shadow DOM and cross-root ARIA Issues

1st-gen sets `aria-controls` on the divider (rendered in the component's shadow root) to the `id` of the primary pane — a **light-DOM** slotted child whose `id` the component assigns itself. An ID reference set on a shadow-tree element pointing at a light-DOM node is a cross-root relationship: it is not guaranteed to resolve consistently for every browser/assistive-technology combination, because IDREF resolution is scoped per tree and the referencing attribute and the referenced ID sit in different trees (shadow root vs. light DOM). Recommend that 2nd-gen expose this relationship through the project's established **element-reference IDL** pattern (the same `ariaControlsElements`-style approach used for tooltip/popover triggers) in addition to, or instead of, a plain ID string — setting the controls relationship as a live element reference removes the dependency on ID resolution crossing the shadow boundary. Verify with manual screen reader testing whichever approach ships, since IDREF-across-shadow-boundary behavior varies by browser.

### Accessibility tree expectations

**Non-resizable (default)**

- Role: **separator**.
- Name: **none**. No value attributes.
- Focus: not focusable, not in the tab order.

**Resizable**

- Role: **separator**, behaving as a **range widget**.
- Name: the default label ("Resize the panels") or the author-supplied `label`. Never unnamed — see [SWC-276](https://jira.corp.adobe.com/browse/SWC-276).
- Values: `aria-valuenow` always; `aria-valuemin` / `aria-valuemax` once the gap above is closed; `aria-orientation` matching the confirmed convention.
- Focus: `tabindex="0"`, in the normal document tab order (not trapped, not a roving-tabindex composite — each divider, including nested split views, is its own independent tab stop).

**Resizable + collapsible, at a collapsed extreme**

- Same role/name/focus as above; `aria-valuenow` reads 0 or 100, which is the only assistive-technology-facing signal that a pane has collapsed unless `aria-valuetext` is enhanced per the recommendation above.

### Keyboard and focus

Split view has two distinct focus profiles depending on `resizable`:

- **Non-resizable (default):** the divider has no `tabindex` and is not part of the tab order. **Not focusable.** Keyboard navigation should skip this component and move to the next focusable element — the same rule as [Divider](../divider/accessibility-migration-analysis.md).
- **Resizable:** the divider is `tabindex="0"` and is a genuine keyboard widget. Preserve the 1st-gen key map (already covered by unit tests):

| Key | Effect |
|-----|--------|
| <kbd>Tab</kbd> / <kbd>Shift</kbd> + <kbd>Tab</kbd> | Move focus to/from the divider in normal document order. Not trapped; each divider (including each level of a nested split view) is its own stop. |
| <kbd>Arrow</kbd> keys | Move the split position by a small step. Direction is resolved against `vertical` and the current text direction (`dir`), so the visual effect of "left/right" or "up/down" stays consistent in RTL. |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Move by a larger step than the arrow keys — the same large-step convention the [APG slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) uses. |
| <kbd>Home</kbd> | Move to the minimum position (or fully collapse the start, when `collapsible`). |
| <kbd>End</kbd> | Move to the maximum position (or fully collapse the end, when `collapsible`). |

No key currently exists to toggle collapse without moving to an extreme (1st-gen has no <kbd>Enter</kbd> behavior on the divider). Since the API should match 1st-gen, this is not a required addition, but it is worth flagging as an optional, purely additive enhancement — comparable external implementations (for example Nord Health's resizable handle) bind <kbd>Enter</kbd> to toggle the primary pane's collapsed state, which would give keyboard/screen reader users parity with a pointer user who drags past the collapse threshold.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | Non-resizable divider has `role="separator"`, no `tabindex`, no name, no value attributes. Resizable divider has `role="separator"`, `tabindex="0"`, a name (default and custom `label`), `aria-orientation` matching the confirmed convention, `aria-valuenow`, and (once implemented) `aria-valuemin` / `aria-valuemax`. Arrow/Page/Home/End keys move `splitterPos` as specified above, respecting `dir` and `vertical`; keys have no effect when not `resizable`. Tab/Shift+Tab do not trap focus. |
| **aXe + Storybook** | WCAG 2.x rules on default, `resizable`, `collapsible`, `vertical`, and nested split-view stories. |
| **Playwright ARIA snapshots** | Keep a `split-view.a11y.spec.ts` covering non-resizable, resizable, collapsible, vertical, and a custom-`label` story. |
| **Contrast** | Non-text contrast (1.4.11) for the divider line and gripper in default, hover, focus-visible, and `forced-colors` states. |
| **Manual screen reader pass** | Confirm the actual announced orientation and value text for a resizable divider in at least one screen reader, given the `aria-orientation` convention ambiguity noted in [ARIA roles, states, and properties](#aria-roles-states-and-properties); confirm the divider is discoverable on a touch device with VoiceOver/TalkBack, mirroring the [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) regression scenario, so it does not resurface in 2nd-gen. |

---

## Summary checklist

- [ ] Non-resizable divider stays roleless-of-name, valueless, and out of the tab order; resizable divider always has a name, `aria-valuenow`, and (new) `aria-valuemin` / `aria-valuemax`.
- [ ] The [SWC-276](https://jira.corp.adobe.com/browse/SWC-276) fix (default `aria-label` whenever `resizable`) is preserved and unit-tested; a resizable, unnamed divider is treated as a regression.
- [ ] `aria-orientation` convention (line orientation vs. movement axis) is confirmed against real screen reader output, not just carried over from 1st-gen unexamined.
- [ ] `aria-controls` relationship to the primary pane is wired with the project's element-reference IDL pattern, not only a plain ID string, given the shadow-root-to-light-DOM crossing.
- [ ] Keyboard map (arrows, Page Up/Down, Home, End, Tab/Shift+Tab) matches 1st-gen and is RTL- and `vertical`-aware.
- [ ] Non-text contrast for the divider/gripper passes in default, hover, focus-visible, and `forced-colors` states.
- [ ] Touch/pointer target size for the drag handle is confirmed or documented as an accepted exception.
- [ ] `aXe` (WCAG 2.x tags) runs on default, resizable, collapsible, vertical, and nested stories.
- [ ] ARIA snapshot tests cover non-resizable, resizable, collapsible, vertical, and custom-`label` stories.
- [ ] Manual screen reader pass specifically re-tests the mobile/touch scenario from [SWC-276](https://jira.corp.adobe.com/browse/SWC-276).

---

## References

- [WAI-ARIA 1.2: separator](https://www.w3.org/TR/wai-aria-1.2/#separator)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) (large-step key convention referenced above)
- [w3c/aria#1443 — resize handle ARIA semantics discussion](https://github.com/w3c/aria/issues/1443)
- [Nord Health: Resizable handle component](https://nordhealth.design/components/resizable-handle/)
- External context supplied alongside this analysis but not independently fetchable at the time of writing (blocked by the source site): [Stack Overflow — proper accessibility/ARIA role for a resize handle](https://stackoverflow.com/questions/42981485/proper-accessibility-or-aria-role-for-a-resize-handle), [Lenovo glossary — sizing handle](https://www.lenovo.com/us/en/glossary/sizing-handle/). Re-check these if they become reachable, before relying on any specific claim from them.
- 1st-gen: [`sp-split-view`](../../../../1st-gen/packages/split-view/README.md)
- [Divider accessibility migration analysis](../divider/accessibility-migration-analysis.md)
- [Split view migration roadmap](./rendering-and-styling-migration-analysis.md) (once written)
