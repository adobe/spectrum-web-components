<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Tabs / Tabs accessibility migration analysis

<!-- Document title (editable) -->

# Tabs accessibility migration analysis

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
    - [First-gen (`sp-tabs`) activation and keyboard](#first-gen-sp-tabs-activation-and-keyboard)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-tabs>`](#recommendations-swc-tabs)
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

This doc describes how `swc-tabs` (with `swc-tab` and `swc-tab-panel`) should behave for accessibility in 2nd-gen, targeting **WCAG 2.2 Level AA**. It aligns with the WAI-ARIA tabs pattern, documents **automatic vs manual activation**, and ties tablist keyboard behavior to the proposed `FocusgroupNavigationController` ([spectrum-web-components#6129](https://github.com/adobe/spectrum-web-components/pull/6129)).

### Also read

[Tabs migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM migration (placeholder until expanded).

### What it is

- **Tabbed interface:** a `tablist` containing `tab` controls and associated `tabpanel` regions. Only one panel is visible at a time; the selected tab exposes `aria-selected` and is wired to its panel with `aria-controls` (tab → panel) and `aria-labelledby` (panel → tab) per APG.

### When to use something else

- Same-page sections that do not need desktop-style tab keyboard semantics are often better as a table of contents and in-page links to headings or regions. [Inclusive Components on tabbed interfaces](https://inclusive-components.design/tabbed-interfaces/) argues that progressive enhancement from TOC + sections can be simpler and more robust than ARIA tabs when the UX does not require true tab ergonomics.
- Site-wide navigation should not be styled or implemented as tabs if users would expect links and full-page navigation instead ([Inclusive Components](https://inclusive-components.design/tabbed-interfaces/)).
- Single-page application views or routes should be communicated as distinct pages or regions (focus management, `<title>`, links), not as `tabpanel` semantics, unless the UI is explicitly a tabs widget ([Inclusive Components — When panels are views](https://inclusive-components.design/tabbed-interfaces/)).

### What it is not

- **Not a menu:** `tablist`, `tab`, and `tabpanel` use different roles and keys than `menu` / `menuitem`. For command menus, use the [APG Menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

---

## ARIA and WCAG context

### Pattern in the APG

- The [Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) is the normative APG reference. Two examples differ by activation model:
  - **Automatic:** [Tabs with automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) — when a tab receives focus (for example via Left / Right Arrow), it is activated and its panel is shown immediately. APG recommends this only when all panel content is already in the DOM and can be shown without delay (see *Deciding When to Make Selection Automatically Follow Focus* linked from the example).
  - **Manual:** [Tabs with manual activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/) — Arrow keys move focus between tabs without changing the selected tab; the user activates the focused tab with Space or Enter (or click). Use this when panels are expensive to render, lazy-loaded, or not all present in the DOM at once.
- [Deque University — Tabpanel](https://dequeuniversity.com/library/aria/tabpanel) illustrates `role="tablist"`, `role="tab"` with `aria-controls` and `aria-selected`, and `role="tabpanel"` as a compact reference for tab–panel relationships (still verify keys and activation against APG).
- [Inclusive Components — Tabbed interfaces](https://inclusive-components.design/tabbed-interfaces/) covers roving `tabindex` (Tab skips inactive tabs; arrows move within the tablist), focusable `tabpanel` (or first focusable child) so screen reader users do not miss panel content, responsive layouts (avoid tabs-to-accordion hybrid complexity), and when many tabs make accordions preferable.

### First-gen (`sp-tabs`) activation and keyboard

`<sp-tabs>` maps APG manual vs automatic activation to the boolean `auto` attribute / property (default `false`). The JSDoc points authors to [Deciding When to Make Selection Automatically Follow Focus](https://w3c.github.io/aria-practices/#kbd_selection_follows_focus) (same idea as the APG examples).

```116:125:1st-gen/packages/tabs/src/Tabs.ts
  /**
   * Whether to activate a tab on keyboard focus or not.
   *
   * By default a tab is activated via a "click" interaction. This is specifically intended for when
   * tab content cannot be displayed instantly, e.g. not all of the DOM content is available, etc.
   * To learn more about "Deciding When to Make Selection Automatically Follow Focus", visit:
   * https://w3c.github.io/aria-practices/#kbd_selection_follows_focus
   */
  @property({ type: Boolean })
  public auto = false;
```

- **Manual pattern** (`auto` omitted or `false`) — matches [tabs with manual activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/): `RovingTabindexController` moves focus between `sp-tab` elements with arrow keys, but `elementEnterAction` does not change selection when `auto` is false. The user activates the focused tab with Enter or Space (or click). `onKeyDown` on the tablist calls `selectTarget` for Enter and Space only.

```206:230:1st-gen/packages/tabs/src/Tabs.ts
  rovingTabindexController = new RovingTabindexController<Tab>(this, {
    focusInIndex: (elements) => {
      let focusInIndex = 0;
      const firstFocusableElement = elements.find((el, index) => {
        const focusInElement = this.selected
          ? el.value === this.selected
          : !el.disabled;
        focusInIndex = index;
        return focusInElement;
      });
      return firstFocusableElement ? focusInIndex : -1;
    },
    direction: () => 'both',
    elementEnterAction: (el) => {
      if (!this.auto) {
        return;
      }

      this.shouldAnimate = true;
      this.selectTarget(el);
    },
    elements: () => this.tabs,
    isFocusableElement: (el) => !this.disabled && !el.disabled,
    listenerScope: () => this.tabList,
  });
```

```476:484:1st-gen/packages/tabs/src/Tabs.ts
  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      const target = event.target as HTMLElement;
      if (target) {
        this.selectTarget(target);
      }
    }
  };
```

- **Automatic pattern** (`auto` true) — matches [tabs with automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/): when roving focus enters a tab, `elementEnterAction` runs `selectTarget(el)`, so selection (and visible panel) follows arrow navigation without a separate Enter or Space. Click still selects via `onClick`.

**2nd-gen note:** 1st-gen uses `RovingTabindexController` from `@spectrum-web-components/reactive-controllers`. 2nd-gen should use `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for arrow navigation inside the tablist while preserving the same `auto` semantics (selection on focus move vs selection only on activate).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Tabs pattern (APG)](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) | `tablist`, `tab`, `tabpanel`; `aria-selected`; `aria-controls`; `aria-labelledby` on panels; roving `tabindex` on tabs per APG examples. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | The selected tab and visible panel relationship must be exposed in the accessibility tree. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | All tab selection and navigation within the widget must work without a pointer. |
| [Focus order (WCAG 2.4.3)](https://www.w3.org/TR/WCAG22/#focus-order) | Tab from the tablist should move to meaningful content (`tabpanel` with `tabindex="0"` when needed, or first focusable in panel) per APG guidance. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Each tab needs a name; state (`aria-selected`) must update; panels hidden with `hidden` or equivalent must not leave stale state exposed. |

**Bottom line:** Choose automatic vs manual activation from real performance and DOM shape; implement APG keyboard tables for the chosen model; keep tab↔panel references valid in the composed tree (see Shadow DOM below).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| — | — | — | — | No issues listed. |

---

## Recommendations: `<swc-tabs>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Prescribed structure** | `swc-tabs` (or its internal wrapper) exposes `role="tablist"` with an accessible name (`aria-label` or `aria-labelledby`). Each `swc-tab` exposes `role="tab"`; each `swc-tab-panel` exposes `role="tabpanel"`. Do not map this component to different ARIA widgets (`menu`, `listbox`) via author overrides on the host. |
| **`aria-selected`** | `true` on the active tab; `false` on all others. Must stay in sync with the visible panel. |
| **`aria-controls`** | On each tab, reference the `id` of the associated `tabpanel` (same root as ID resolution requires — see Shadow DOM). |
| **`aria-labelledby`** | On each `tabpanel`, reference the `id` of its controlling tab for an accessible name. |
| **Hidden panels** | Inactive panels use `hidden` (or visibility/display patterns that hide from AT) per APG; do not leave inert content falsely exposed. |
| **`tabindex` on `tabpanel`** | Per [automatic activation example](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/), `tabindex="0"` on `tabpanel` helps users move from tablist into panel content when the first element inside is not focusable. [Manual example](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/) may omit `tabpanel` tabindex when the first child is focusable — match APG for your story variants. |
| **Vertical orientation** | If the tablist is vertical, set `aria-orientation="vertical"` and arrow key mapping consistent with APG (Up/Down or Left/Right per spec and docs). |
| **Activation mode (API)** | Mirror 1st-gen `auto` (boolean, default off = manual): `auto` false — arrows move focus only; Enter, Space, or click select; `auto` true — selection follows focus when arrows move between tabs. Document and test both modes; default manual matches lazy or heavy panels. |

### Shadow DOM and cross-root ARIA Issues

`aria-controls` and `aria-labelledby` rely on **ID references** that must resolve in the document tree. If tabs and panels split across shadow roots without a supported cross-root strategy, IDs may not resolve as expected. Prefer a composition where references resolve in the same document subtree as the referencing node, or document the 2nd-gen plan (ElementInternals, explicit light DOM slots, synchronized ids on light children, etc.) once implementation exists. Until then, treat cross-root IDREF as a design constraint to solve in the rendering migration.

### Accessibility tree expectations

**Tablist**

- Role: `tablist` with a discernible name.
- Children: `tab` elements with names from text or `aria-label`.

**Selected tab**

- `aria-selected="true"`, in tab order per APG roving pattern (typically only the selected tab has `tabindex="0"`, others `-1` — verify against the chosen APG example).

**Tabpanel**

- Role: `tabpanel`; name from `aria-labelledby` pointing at the tab.
- Visibility: inactive panels hidden from AT and sight per pattern.

### Keyboard and focus

- Implement APG keyboard behavior for the chosen activation model ([automatic](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/) vs [manual](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/)): Tab into/out of tablist; arrow keys within tablist; Home / End where APG shows them; Space / Enter for manual activation.
- Use `FocusgroupNavigationController` ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)) for linear arrow navigation and roving `tabindex` within the `tablist` where it matches the controller’s model. Tab moving focus from tablist to panel (and Shift+Tab back) is focus traversal between groups, not only intra-group arrows — implement in the tabs component (or a small tabs-specific helper) unless a generalized “exit group on Tab” behavior is added to shared infrastructure for multiple widgets.

#### Extending focus infrastructure vs component logic

When implementation gaps appear, classify missing behavior:

| If the behavior is… | Prefer… |
| --- | --- |
| **Shared broadly** (Home/End, wrap, orientation for most roving tabindex / focus groups) | Extend `FocusgroupNavigationController` (or a shared core utility) so menus, toolbars, tabs, etc. stay consistent. |
| **Shared narrowly** (e.g. tabs + toolbar, but not every group) | Add a small composable helper or optional controller mode rather than duplicating in each component. |
| **Tabs-specific** (automatic vs manual activation, selection following focus, sync with `aria-selected`, Tab to `tabpanel`) | Keep in `swc-tabs` (or a tabs-only controller) unless refactoring reveals a reusable abstraction worth promoting upward. |

**Activation semantics:** Automatic activation is selection on focus change inside the tablist; manual activation decouples focused tab from `aria-selected` until the user confirms — that state machine is tabs-specific even if arrows use the shared controller.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Selection state mirrors `aria-selected`; only one selected tab; panel visibility matches selection; activation mode flag behaves as documented. |
| **aXe + Storybook** | WCAG 2.x rules on tabs stories (horizontal / vertical if supported). |
| **Playwright ARIA snapshots** | Selected vs unselected tabs `tabpanel` visibility; relationship attributes present. Separate stories or snapshots for automatic vs manual activation. |
| **Playwright keyboard** | Tab into tablist and out to panel; arrows within tablist; Home/End if implemented; manual mode: Space/Enter changes selection; automatic mode: arrow moves selection with focus. |
| **Contrast / focus** | Selected vs unselected tabs and focus ring discernible (non-text contrast / focus appearance per design system). |

---

## Summary checklist

- [ ] `tablist` / `tab` / `tabpanel` roles and labelling match APG.
- [ ] Automatic vs manual activation documented and tested; default matches content loading model.
- [ ] Roving `tabindex` and arrows use `FocusgroupNavigationController` where appropriate ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)); tabs-only logic stays in component unless promoted to shared infra deliberately.
- [ ] `aria-controls` / `aria-labelledby` valid in composed tree (no silent cross-root ID failures).
- [ ] `tabpanel` focus behavior matches APG for focusable vs non-focusable first content.
- [ ] Automated snapshots and keyboard tests cover both activation modes where both ship.
- [ ] Manual smoke with VoiceOver and NVDA (or project standard).

---

## References

- [WAI-ARIA APG: Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [WAI-ARIA APG: Example of tabs with automatic activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/)
- [WAI-ARIA APG: Example of tabs with manual activation](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-manual/)
- [Deque University: Tabpanel](https://dequeuniversity.com/library/aria/tabpanel)
- [Inclusive Components: Tabbed interfaces](https://inclusive-components.design/tabbed-interfaces/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Tabs migration roadmap](./rendering-and-styling-migration-analysis.md)
