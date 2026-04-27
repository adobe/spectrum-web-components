<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Menu / Action menu accessibility migration analysis

<!-- Document title (editable) -->

# Action menu accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
- [Also read](#also-read)
- [What it is not](#what-it-is-not)
- [Pattern in the WAI-ARIA APG](#pattern-in-the-wai-aria-apg)
- [Guidelines](#guidelines)
- [Related Jira issues](#related-jira-issues)
- [Recommendations](#recommendations)
    - [Roles for `swc-menu` and children](#roles-for-swc-menu-and-children)
    - [Composition and labelling](#composition-and-labelling)
    - [Viewport and presentation (tray vs popover)](#viewport-and-presentation-tray-vs-popover)
    - [Focus and navigation](#focus-and-navigation)
    - [Submenus](#submenus)
    - [Actions vs navigation](#actions-vs-navigation)
- [Shadow DOM and cross-root accessibility](#shadow-dom-and-cross-root-accessibility)
- [Tree expectations](#tree-expectations)
- [Keyboard](#keyboard)
- [Assistive technology and Escape](#assistive-technology-and-escape)
- [Testing](#testing)
    - [Rules, snapshots, and axe](#rules-snapshots-and-axe)
    - [Keyboard navigation](#keyboard-navigation)
    - [Radio and checkbox items](#radio-and-checkbox-items)
    - [Nested menu tests](#nested-menu-tests)
    - [Manual testing](#manual-testing)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

**`<swc-action-menu>`** (2nd-gen) is the Spectrum surface for a **menu button** that opens commands or choices in an overlay. On **smaller viewports** the menu should open in a **tray** by default for touch targets, readability, and escape from cramped layouts; on larger viewports it typically uses a **popover** unless the author **forces** popover (or tray) via API. It composes a trigger (typically a button) with `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` (or equivalent wiring) and a **`swc-menu`** that exposes **`role="menu"`** to assistive technologies regardless of tray vs popover presentation. The trigger and menu must share one DOM or shadow root because cross-root ARIA is not supported in browsers today.

**`<swc-menu>`** must not be used as a standalone surface in product. Screen readers often announce guidance such as “Escape to close,” and a menu without a controlling trigger has no defined focus return or close affordance. Menus opened from action buttons or menubar entries are always embedded in a parent component that owns open/close, focus management, and labelling.

Treat **application command menus** (action menu) and **site navigation** patterns as separate 2nd-gen components or documented compositions. Their keyboard contracts, roles, and user expectations differ; conflating them encourages incorrect `role="menu"` on link lists and confusing screen reader interaction modes.

## Also read

- [Action menu migration roadmap](./rendering-and-styling-migration-analysis.md) — 2nd-gen DOM, CSS, and API migration (placeholder until expanded).

## What it is not

- **Not** a select or listbox: **`swc-menu`** used with **`swc-action-menu`** must expose **`role="menu"`** only. Do not add conditional **`role="listbox"`** or dual semantics on the same container; Picker and combobox patterns use different APG patterns and components.
- **Not** primary site navigation by default: for collections of links that navigate pages, the APG [disclosure navigation menu example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) explicitly avoids **`role="menu"`** because typical site navigation does not implement the full menu keyboard contract, and **`menu`** triggers interaction modes screen readers reserve for application widgets.
- **Not** `aria-activedescendant` for focus in 2nd-gen: cross-root ARIA does not solve active descendant across shadow boundaries reliably, and `aria-activedescendant` has known limitations on iOS VoiceOver. Action menu should use the proposed **`FocusgroupNavigationController`** (and related focus group work) as in [spectrum-web-components#6129](https://github.com/adobe/spectrum-web-components/pull/6129), not `aria-activedescendant`, for roving tabindex and arrow navigation inside the menu.

## Pattern in the WAI-ARIA APG

| Pattern | APG example | When to use |
| --- | --- | --- |
| Menu button (actions) | [Actions menu button example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/) | Commands (cut, copy), choices that execute actions without navigating away as plain links. Trigger opens **`role="menu"`**; items are **`menuitem`**, **`menuitemradio`**, or **`menuitemcheckbox`**. |
| Menubar (navigation style) | [Navigation menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/) | Horizontal bar of menus where structure matches menubar plus menu subtrees. Different layout and focus model than a single action menu button. |
| Menubar (editor — groups, radios, separators) | [Editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) | Reference for **`menuitemradio`**, **`group`**, and separator inside menus; informs item variants and section structure. |
| Disclosure navigation | [Example disclosure navigation menu](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) | Top-level sections revealing lists of links. No **`role="menu"`**; buttons, **`aria-expanded`**, and link lists in **`nav`**. |

**Takeaway:** use **`menu`** and **`menuitem`** family roles when behavior matches the menu button or menubar patterns. Use disclosure plus native links (or tabs or other patterns) when the primary job is in-page or multi-page navigation without application menu semantics.

## Guidelines

| Guideline | Target for 2nd-gen |
| --- | --- |
| WCAG 2.2 | Level AA where applicable (keyboard, name, role, value, focus order, labels). |
| WAI-ARIA APG | [Menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/), [Menubar](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/), and — for link nav — [Disclosure](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) navigation example above. |
| Browser / AT | Verify VoiceOver (macOS and iOS), NVDA, JAWS; avoid patterns known to fail on iOS (for example `aria-activedescendant` for this use case). |
| Responsive presentation | On **smaller viewports**, open the menu in a **tray** unless a **popover** is **forced** by author API; tray and popover must both preserve **menu** semantics, focus return to the trigger, and Escape to close. |
| Single root for trigger + menu | **Trigger** and **`swc-menu`** share one DOM or shadow root; **cross-root ARIA** (ID references across shadow boundaries) is not supported in browsers today. |

## Related Jira issues

| Type | Key | Status | Summary |
| --- | --- | --- | --- |
| Bug | [SWC-617](https://jira.corp.adobe.com/browse/SWC-617) | Done | Remove `aria-activedescendant` from action menu; use roving tabindex / focus group approach. |
| Bug | [SWC-572](https://jira.corp.adobe.com/browse/SWC-572) | Done | Action menu / picker VoiceOver issues. |
| Bug | [SWC-1488](https://jira.corp.adobe.com/browse/SWC-1488) | Done | Safari crash opening Picker/ActionMenu with VoiceOver. |
| Bug | [SWC-1448](https://jira.corp.adobe.com/browse/SWC-1448) | Done | Refactor Picker/Action Menu dependency split. |
| Bug | [SWC-230](https://jira.corp.adobe.com/browse/SWC-230) | Done | Arrow keys when opened by mouse (Picker/Action-Menu). |
| Bug | [SWC-60](https://jira.corp.adobe.com/browse/SWC-60) | Done | Keyboard navigation should start at first menu item. |
| Bug | [SWC-553](https://jira.corp.adobe.com/browse/SWC-553) | To Do | Picker and action menu untranslatable strings. |
| Story | [SWC-577](https://jira.corp.adobe.com/browse/SWC-577) | Done | Research accessible menu navigation. |

## Recommendations

### Roles for `swc-menu` and children

- **`swc-menu`** (when used with **`swc-action-menu`** or an equivalent menu host): **`role="menu"`** only. No listbox branch on the same primitive.
- Allowed descendant roles (WAI-ARIA menu content): **`menuitem`**, **`menuitemradio`**, **`menuitemcheckbox`**, **`separator`**, **`group`**. Each role implies different keyboard and state behavior (toggle, radio group, section label, divider). Consider separate 2nd-gen components or clear variants per role so behavior and tests stay correct — for example **`swc-menu-item`** (`menuitem`), **`swc-menu-item-checkbox`**, **`swc-menu-item-radio`**, **`swc-menu-group`**, **`swc-menu-separator`** (`separator`).
- Do not use **`role="listitem"`** on rows inside **`role="menu"`**. **`listitem`** belongs under **`list`**; menu rows must use **`menuitem`** or the checkbox or radio variants per [APG menu patterns](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/).

### Composition and labelling

- Always compose **`swc-menu`** inside a parent that provides open/close, focus return to the trigger, and `aria-labelledby` or `aria-label` for the menu where needed.
- **Trigger and menu must share one root:** the trigger (button) and the **`swc-menu`** surface must live in the same tree root (for example both inside the **`swc-action-menu`** shadow root or the same light-DOM subtree owned by that host). **Cross-root ARIA** — ID references such as **`aria-controls`**, **`aria-labelledby`**, and **`aria-activedescendant`** across separate shadow roots — is not supported in browsers today, so splitting the trigger and menu across unrelated custom element boundaries breaks those relationships.
- Trigger should mirror APG menu button attributes (`aria-haspopup`, `aria-expanded`, `aria-controls` when appropriate).

### Viewport and presentation (tray vs popover)

- **Default on small viewports:** present the menu in a **tray** (bottom sheet or equivalent Spectrum pattern) so content is usable on narrow screens and does not rely on a floating popover that can clip or obscure the trigger awkwardly.
- **Popover when forced:** when the author **forces** popover presentation (API or attribute — exact name TBD in implementation), use the popover overlay even on small viewports; document that this is opt-in because it can hurt usability on touch-first layouts.
- **Accessibility:** tray vs popover is **presentational**; **`role="menu"`**, **keyboard** behavior, **focus** **trap** / **return** to the trigger, and **modal** or **non-modal** semantics for the overlay layer must stay **consistent** with the chosen pattern (for example ensure the tray is **dismissible** and **labelled** like the popover case).

### Focus and navigation

- Implement arrow, Home, End, and typeahead per APG menu patterns using **`FocusgroupNavigationController`** (see [PR #6129](https://github.com/adobe/spectrum-web-components/pull/6129)) rather than `aria-activedescendant` for 2nd-gen action menu.

### Submenus

- A parent row is still a **`menuitem`** (or variant) with **`aria-haspopup="menu"`** (or **`true`**) and **`aria-expanded`** reflecting whether its child **`role="menu"`** is open. The nested menu keeps **`role="menu"`** and the same shared-root rules as the top-level menu relative to its parent item (IDs and focus wiring must not rely on cross-root ARIA).
- Keyboard behavior for opening, closing, and moving between parent menu and submenu should follow the [menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) submenu expectations where they apply (for example Right Arrow or Enter to open, Left Arrow or Escape to close and return focus, Arrow keys inside the submenu). Exact keys may be refined with design and platform norms but must be documented and tested.

### Actions vs navigation

- **Action menu (commands):** **`swc-action-menu`** plus **`swc-menu`** with **`menu`** / **`menuitem`** family.
- **Navigation (links, site structure):** prefer disclosure navigation or menubar navigation examples as separate components or documented patterns; do not reuse **`swc-action-menu`** semantics for pure link navigation without a deliberate APG match.

## Shadow DOM and cross-root accessibility

- **Shared root:** keep the menu button trigger and **`swc-menu`** under a single shadow root (or one document subtree where IDREF targets are not split across unrelated shadow trees). Browsers do not implement cross-root ARIA; **`aria-controls`**, **`aria-labelledby`**, and related ID references must resolve in the same root as the referencing element.
- Prefer focusable menu items with roving **`tabindex`** inside the menu root over `aria-activedescendant` pointing across shadow roots.
- Ensure visible focus rings and high contrast behavior for focused **`menuitem`** rows.

## Tree expectations

Illustrative light DOM (conceptual):

```html
<swc-action-menu label="Actions">
  <swc-menu id="actions-menu">
    <swc-menu-item>Duplicate</swc-menu-item>
    <swc-menu-item>Rename</swc-menu-item>
    <swc-menu-separator></swc-menu-separator>
    <swc-menu-item>Delete</swc-menu-item>
  </swc-menu>
</swc-action-menu>
```

Expectations:

- Trigger and menu are composed under one host root so ARIA ID references between them resolve (cross-root ARIA is unsupported).
- Trigger exposes button semantics with **`aria-haspopup="menu"`** and **`aria-expanded`** tied to open state.
- **`swc-menu`** root has **`role="menu"`** and an accessible name (from label or **`aria-labelledby`**) when needed.
- Items expose **`menuitem`** (or checkbox or radio variants) and correct **`aria-checked`** / **`aria-disabled`** as applicable.

## Keyboard

Align with the [menu button pattern keyboard table](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and the [actions menu example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/) (open with Arrow, Space, or Enter from the button; wrap inside the menu; Escape closes and returns focus to the button; typeahead where specified).

When **`swc-menu`** supports **submenus**, also align submenu open/close and cross-level movement with the [menubar pattern keyboard table](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) (submenu section) or an equivalent documented mapping.

## Assistive technology and Escape

Screen readers may announce that Escape closes the menu. That is only valid when a host component implements close on Escape and returns focus to the trigger. Document that **`swc-menu`** is not a standalone widget for this reason.

## Testing

Use a mix of **axe**, **ARIA snapshots**, **Playwright** (or integration) **keyboard** tests, and **manual** assistive technology checks. Patterns for Playwright in this repo are described in [Playwright accessibility testing](../../../02_style-guide/04_testing/03_playwright-accessbility-testing.md).

### Rules, snapshots, and axe

- Run **axe** (or the project’s equivalent WCAG rule set) on action menu stories.
- Capture ARIA or accessibility snapshots for **open** and **closed** states with plain **`menuitem`** rows.

### Keyboard navigation

Add **Playwright** or integration tests that send real key events (not only static snapshots). Cover at least:

- Open from the trigger: Arrow Down or Up, Space, Enter ([APG menu button](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)).
- Move inside the menu: Arrow Up/Down and, if implemented, Home/End; assert focus or active item.
- Activate: Enter or Space on a plain **`menuitem`**.
- Close: Escape returns focus to the trigger; **`aria-expanded`** toggles correctly.
- **`menuitemradio`** and **`menuitemcheckbox`**: same style of tests for toggling and group semantics (see [Radio and checkbox items](#radio-and-checkbox-items)).
- **Nested menus**: when supported, add the cases in [Nested menu tests](#nested-menu-tests).
- **Typeahead**: add tests if the implementation supports it.

### Radio and checkbox items

Use dedicated Storybook (or app) stories for **`menuitemradio`** and **`menuitemcheckbox`**.

| Kind | What to verify |
| --- | --- |
| **Snapshots** (menu open) | **`role="menuitemradio"`** or **`role="menuitemcheckbox"`**; **`aria-checked`** (`true` / `false` / `mixed` for tri-state checkboxes if supported); **`aria-disabled`** when applicable. For radios, include a **`group`** (or equivalent) with a section name (visible or **`aria-label`**) per [editor menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/) patterns. |
| **Keyboard** | Checkbox: Space (and Enter if implemented) toggles **`aria-checked`**. Radio: after keyboard selection, only one item is **`aria-checked="true"`**; arrows still move focus across the group. |
| **axe** | Same WCAG rule pass on those stories, open and closed where relevant. |

### Nested menu tests

Only required if the product supports **submenus**.

| Kind | What to verify |
| --- | --- |
| **Snapshots** | Parent **`menuitem`**: **`aria-haspopup`**, **`aria-expanded`**. Nested surface: **`role="menu"`**. States: root **closed**; root **open** and submenu **closed**; root **open** and submenu **open**. |
| **Keyboard** | Open submenu from parent; arrows inside nested **`menu`**; activate a leaf **`menuitem`**; Left Arrow or Escape closes submenu (per implementation) and returns focus to parent **`menuitem`**; closing root returns focus to trigger. Prefer at least one **two-level** path if allowed. |
| **axe** | Run on submenu stories for open/closed combinations when stable enough to avoid flakes. |

### Manual testing

- **Keyboard:** open, navigate, activate, Escape without a pointer.
- **Screen readers:** VoiceOver (macOS and iOS, Safari); NVDA with Firefox or Chrome per project norms.
- **Small viewports:** tray open/close, focus order, Escape; forced popover path if exposed.
- **Content coverage:** at least one **radio** group and one **checkbox** menu per pass.
- **Submenus:** if they exist, verify open, traverse, close, and focus return (including iOS VoiceOver where applicable).

## Summary checklist

- [ ] **`swc-menu`** with **`swc-action-menu`**: **`role="menu"`** only (no listbox mode).
- [ ] Menu always composed in a parent that handles close and focus return.
- [ ] Trigger and **`swc-menu`** share one root; no reliance on cross-root ARIA (unsupported).
- [ ] Children use **`menuitem`**, **`menuitemradio`**, **`menuitemcheckbox`**, **`separator`**, **`group`** — not **`listitem`**.
- [ ] Separate components or patterns for action menus vs navigation (disclosure or menubar as appropriate).
- [ ] Focus via **`FocusgroupNavigationController`** ([#6129](https://github.com/adobe/spectrum-web-components/pull/6129)), not `aria-activedescendant` for this pattern.
- [ ] Keyboard matches APG menu button expectations.
- [ ] Automated tests cover keyboard navigation (open, move, activate, Escape, focus return), not only snapshots or axe.
- [ ] **`menuitemradio`** and **`menuitemcheckbox`**: automated keyboard tests and ARIA snapshots (open menu, roles, **`aria-checked`**, groups); axe on those stories.
- [ ] **Submenus** (if supported): automated keyboard tests for open, navigate, close, and focus return; ARIA snapshots for **`aria-haspopup`**, **`aria-expanded`**, nested **`role="menu"`**; manual pass on AT including iOS where applicable.
- [ ] Verified with screen readers including iOS.
- [ ] **Smaller viewports:** menu opens in **tray** by default; **popover** only when **forced** via API; tray and popover both meet **focus** and **Escape** expectations.

## References

- [WAI-ARIA APG: Menu button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/)
- [WAI-ARIA APG: Actions menu button example](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-actions/)
- [WAI-ARIA APG: Menubar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [WAI-ARIA APG: Editor menubar example (radio, group, separator)](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-editor/)
- [WAI-ARIA APG: Navigation menubar example](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/examples/menubar-navigation/)
- [WAI-ARIA APG: Disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- [spectrum-web-components PR #6129 — Focusgroup navigation controller](https://github.com/adobe/spectrum-web-components/pull/6129)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
