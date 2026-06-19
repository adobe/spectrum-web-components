<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Sidenav / Side navigation accessibility migration analysis

<!-- Document title (editable) -->

# Side navigation accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What side navigation is](#what-side-navigation-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Why disclosure navigation (not tree, menu, or tablist)](#why-disclosure-navigation-not-tree-menu-or-tablist)
    - [Category items](#category-items)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-sidenav>` / `<swc-sidenav-item>`](#recommendations-swc-sidenav--swc-sidenav-item)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Links vs disclosure buttons: the proxy click constraint](#links-vs-disclosure-buttons-the-proxy-click-constraint)
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

This doc describes how **`swc-sidenav`**, **`swc-sidenav-item`**, and **`swc-sidenav-heading`** should behave for accessibility in 2nd-gen, targeting **WCAG 2.2 Level AA**. It aligns with the [APG disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) (vertical orientation) and prescribes use of `FocusgroupNavigationController` for arrow-key navigation.

### Also read

[Side navigation migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM migration (placeholder until expanded).

### What side navigation is

- A **persistent vertical navigation list** that gives users access to the main sections of a product or site. It lives alongside the main content area and exposes a single level or multi-level hierarchy of destinations. Items that have sub-items can expand to reveal nested navigation via the disclosure pattern.

### When to use something else

- **Horizontal top-level navigation** (site-wide or app-level links across the top of the page): use `swc-top-nav`. Top navigation uses the same disclosure navigation pattern as side navigation — links, `<nav>` landmark, `aria-current="page"` — but is oriented horizontally and lives at the top of the layout. It does **not** use `role="tablist"` or `tabpanel` semantics.
- **In-page panel switching** (toggling content sections within the same page without navigating): use `swc-tabs`. Tabs use `role="tablist"`, `role="tab"`, `role="tabpanel"`, and `aria-selected`; they are not navigation and do not change the URL. Do not use `swc-tabs` for page-level navigation.
- **In-page section navigation** (anchor links, TOC): use a plain `<nav>` with links, not side navigation.
- **Command menus or action menus** (perform actions, not navigate to pages): use `swc-action-menu` or `swc-menu`.
- **App-frame side navigation with product-specific chrome** (a `create` slot for an action button above the nav list, or other app-frame affordances): use the [UEC sidenav](https://git.corp.adobe.com/pages/Spectrum/unified-experience-components/main/labs/sidenav/). The UEC sidenav builds on the same disclosure navigation pattern as `swc-sidenav` but adds slots and behaviors for app-frame shell integration that are outside the scope of the base component.

### What it is not

- **Not a menu:** `menu` / `menuitem` semantics (roving tabindex, different arrow-key behavior, escape to close) do not match navigation semantics. Side navigation uses the disclosure pattern + regular tab order, not a menu widget.
- **Not a tree:** `role="tree"` and `role="treeitem"` imply complex parent-child keyboard interactions (`aria-expanded` on tree items, different Home/End behavior) and are not appropriate for navigation links. The [APG disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) explicitly avoids `role="tree"` for navigation lists.
- **Not tabs:** Items navigate to different pages or views; they do not toggle panels within the same page.

### Related

- **`swc-sidenav`** is the navigation container.
- **`swc-sidenav-item`** is a single item; it renders as a link, a disclosure button, or a category label depending on its configuration.
- **`swc-sidenav-heading`** is an optional visible group heading.

---

## ARIA and WCAG context

### Pattern in the APG

Two APG examples cover the two item shapes `swc-sidenav-item` must support:

- **[APG disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)** — the base pattern. A `<nav>` element containing a list of links where items with sub-navigation use `<button aria-expanded>` (not a link) to disclose a nested list. Use this shape for parent items that have no `href` of their own.
- **[APG disclosure navigation hybrid example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/)** — extends the base pattern for items that are **both** navigable links **and** parents of sub-navigation. The item renders an `<a>` for navigation alongside a **separate** `<button aria-expanded>` (typically a chevron icon button) for disclosure. Use this shape when `swc-sidenav-item` has both an `href` and child items.
- The outer `<nav>` provides the landmark; an `aria-label` on that element distinguishes it from other navigation landmarks on the page.
- Leaf items (no children) are plain `<a>` elements. The current page is indicated by `aria-current="page"` on the active link.
- **No `role="tree"`, `role="menu"`, or `role="tablist"`** is used. The navigation widget is a native `<nav>` + `<ul>` + links and buttons — semantic HTML handles the structure.

The [UEC sidenav](https://git.corp.adobe.com/pages/Spectrum/unified-experience-components/main/labs/sidenav/) is a well-regarded accessible implementation of this pattern for Adobe products. It differs in that it adds a `create` slot for product-specific action buttons; that feature is out of scope for the base `swc-sidenav` analysis.

### Why disclosure navigation (not tree, menu, or tablist)

| Approach | Why it does not fit |
| --- | --- |
| `role="tree"` + `role="treeitem"` | Tree widgets require complex keyboard handling (Home, End, asterisk to expand all, `aria-level` on items) and carry data-structure semantics users associate with file browsers, not navigation. The APG explicitly avoids tree semantics for navigation lists. |
| `role="menu"` + `role="menuitem"` | Menu widgets have different keyboard expectations (Escape closes, arrow keys cycle, typically transient overlays). Screen reader users would expect activation to perform actions, not navigate to pages. |
| `role="tablist"` + `role="tab"` | Tab widgets show one panel at a time and manage `aria-selected` + panel visibility. Side navigation items navigate to different pages/views and do not control in-page panel swapping. |
| Disclosure navigation | Disclosure pattern (`<nav>`, `<ul>`, `<a>`, `<button aria-expanded>`) maps directly to what the component is: a list of navigation destinations with collapsible sub-sections. Screen reader users encounter familiar semantics (navigation landmark, links, buttons). |

### Category items

The Figma design introduces **category items** — items that do not link to a page and serve only as visual grouping labels. These appear at level 1 only. Their key characteristics:

- **No hover or selection states.** They are purely visual markers, not interactive controls.
- **Not tab stops.** They must not be focusable as part of normal keyboard navigation.
- **Accessible label for the group.** They should function like a visible group heading (similar to `swc-sidenav-heading`) so screen reader users understand the structure of the list beneath them.

Category items map to the same concept as `swc-sidenav-heading` — they provide a visible label for a sub-group of items. **Recommended:** implement category items using the same mechanism as `swc-sidenav-heading` (a visible non-interactive label with an associated `<ul aria-labelledby="...">` for the children), or confirm with the design/engineering team whether `swc-sidenav-heading` absorbs this role.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Landmark regions (APG)](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/) | The `<nav>` element provides a navigation landmark. An `aria-label` is required when multiple `<nav>` elements are present on a page so users can distinguish them. |
| [Info and relationships (WCAG 1.3.1)](https://www.w3.org/TR/WCAG22/#info-and-relationships) | Hierarchy (levels 1–3) and grouping (headings/categories) must be reflected in the accessibility tree — not just through visual indentation. Native `<ul>` / `<li>` nesting provides this structure. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | All navigation and disclosure actions must be fully keyboard-operable without requiring a mouse or pointer. |
| [Focus order (WCAG 2.4.3)](https://www.w3.org/TR/WCAG22/#focus-order) | Tab / Shift+Tab and arrow-key focus order must follow a logical sequence that reflects the visual hierarchy. Items hidden by a collapsed parent must not appear in the focus sequence. |
| [Focus visible (WCAG 2.4.11)](https://www.w3.org/TR/WCAG22/#focus-appearance) | All focusable items (links and disclosure buttons) must have a visible focus indicator. |
| [Location (WCAG 2.4.8)](https://www.w3.org/TR/WCAG22/#location) | `aria-current="page"` communicates the current page location to screen reader users; this is the programmatic equivalent of the visual selected state. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/TR/WCAG22/#non-text-contrast) | The focus indicator and selected / active state indicator must meet 3:1 contrast ratio against adjacent colors. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The current page state must not rely on color alone; `aria-current="page"` (and potentially a visual indicator beyond color) carries the semantic. |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | Each interactive item (link or disclosure button) must have an accessible name, role, and state. Disclosure buttons must reflect their `expanded` state via `aria-expanded`. |

**Bottom line:** Use the [APG disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/) as the base reference and the [hybrid example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/) for items that are both links and parents. `<nav aria-label="...">` provides the landmark; `<ul>/<li>` provides list structure; `<a>` elements with `aria-current="page"` handle navigation; `<button aria-expanded>` handles disclosure. Enhance the tab-order-only APG model with vertical arrow-key navigation via `FocusgroupNavigationController`.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-271](https://jira.corp.adobe.com/browse/SWC-271) | Bug | To Do | Unresolved | [Bug][a11y]: SideNav: state of active SideNavItem lacks 3:1 contrast ratio — active item selection indicator does not meet non-text contrast requirement |
| [SWC-1230](https://jira.corp.adobe.com/browse/SWC-1230) | Bug | To Do | Unresolved | [Bug][a11y] SideNav: Space should also trigger expansion of children items — Space key does not open sub-navigation, only Enter works |

---

## Recommendations: `<swc-sidenav>` / `<swc-sidenav-item>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **One semantic pattern** | The sidenav maps to the **disclosure navigation pattern** only. Do not implement `role="tree"`, `role="menu"`, `role="listbox"`, or `role="tablist"` on any part of the sidenav widget. The `<nav>` landmark, `<ul>/<li>` list structure, `<a>` links, and `<button aria-expanded>` disclosure buttons are the complete semantic set. |
| **`<swc-sidenav>` host** | Renders a `<nav>` element with `aria-label` derived from the component's `label` property. The `aria-label` is **required** when more than one navigation landmark can appear on the same page (for example when both a side navigation and a breadcrumb `<nav>` are present). |
| **Inner list structure** | The `<nav>` wraps a `<ul>`. Each `<swc-sidenav-item>` maps to an `<li>` (either the host sets `role="listitem"` or a native `<li>` is used in shadow DOM — see Shadow DOM below). Nested sub-lists are `<ul>` elements rendered inside their parent item's shadow DOM when expanded. |
| **Leaf item with `href`** | Renders as an `<a href="...">` element. Reflects `aria-current="page"` on the internal `<a>` when the consumer marks the item as current. **Do not** use a `<button>` with a proxy click to navigate — the link must be a real `<a>` element so it behaves correctly with screen readers, keyboard shortcuts, and context menus. |
| **Parent item (has children, no `href`)** | Renders as a `<button aria-expanded="true|false">` element. The button's accessible name comes from the visible label text. No `aria-current` applies. |
| **Parent item (has children AND `href`)** | Renders as an `<a href="...">` for navigation AND a **separate adjacent `<button aria-expanded="true|false">`** (or icon button) for disclosure. Both must have accessible names. The button's accessible name should describe its purpose in context, for example `aria-label="Expand [Section name]"`. Do not combine link and button into a single element — that mangles role and activation semantics. |
| **`aria-current="page"`** | The component is **not responsible for routing** — it does not detect the current URL or page. The consumer must mark the current item based on their routing system, for example by setting a `current` (or `selected`) boolean property on the active `swc-sidenav-item`. When that property is set, the component reflects `aria-current="page"` onto its internal `<a>` element. When the current page is inside a collapsed parent, the parent button should remain collapsed by default; the parent may show a visual "contains current" indicator via CSS, but **do not** set `aria-current` on the parent button — `aria-current` belongs on the actual current-page link. |
| **`aria-expanded`** | Set on the disclosure `<button>` element only: `"true"` when children are visible, `"false"` when hidden. **Do not** set `aria-expanded` on leaf links. |
| **Category items** | Non-interactive group labels. They must not be focusable (no `tabindex`, not a link or button). Use a visible label element (or the same mechanism as `swc-sidenav-heading`) with an `id` that a sibling `<ul aria-labelledby="...">` references to provide an accessible group name for the items beneath it. |
| **`swc-sidenav-heading`** | Renders a visible `<h*>` (heading level appropriate to context — expose via a `heading-level` property) whose `id` is referenced by `aria-labelledby` on the associated item group `<ul>`. Do not use a presentational `<h2>` with a fixed level; expose the heading level to consumers. |
| **Disabled items** | Use `aria-disabled="true"` on the `<a>` or `<button>`. Do **not** use the HTML `disabled` attribute on `<a>` (invalid) or on the button if that would remove it from the tab order entirely (some browsers). Disabled items should remain visible in the focus sequence so users know the item exists but is unavailable; script must block activation. |
| **Icons** | Icons are decorative when the label text carries the full meaning: set `aria-hidden="true"` on the icon element. For icon-only configurations (if supported), the item's `<a>` or `<button>` must carry an accessible name via `aria-label` or a visually hidden text element. |
| **`label` property** | `swc-sidenav` needs a `label` property that maps to `aria-label` on the `<nav>` element, mirroring 1st-gen. Document this as required for products with multiple navigation landmarks. |
| **`value` property** | Preserve the `value` property on `swc-sidenav-item` for consumers to identify which item is current. The consumer is responsible for comparing this value against their routing state and setting the `current` (or `selected`) property on the matching item. |
| **Docs** | Document `aria-label` on `swc-sidenav` as required when used alongside other nav landmarks. Document that the component does not manage routing — consumers must set the current item based on their URL or routing system. Document the required `label` property. |

### Links vs disclosure buttons: the proxy click constraint

**Do not use the proxy click pattern for items with `href`.**

In 1st-gen (`sp-sidenav-item`), the anchor `href` renders as a real `<a>` element and `handleClick` prevents default only when the item has no `href`. This is correct behavior. In 2nd-gen, the same constraint applies and must be treated as a hard requirement:

- Items with `href` **must** render a real `<a href="...">` element in shadow DOM.
- The `<a>` must be the element that receives focus and keyboard activation (Enter) for navigation.
- Do not wrap the `<a>` in a `<button>` or intercept its click to fire a proxy navigation event.
- The `click()` and `focus()` methods on the host must delegate to the internal `<a>`, not to a button shim.

This constraint exists because:
1. Screen readers announce links and buttons differently; a proxied button announced as "button" for a navigation destination misleads users.
2. Keyboard shortcuts (for example Ctrl+click to open in new tab) and browser context menus (open in new tab, copy URL) work only on real `<a>` elements.
3. The browser's visited-link state applies only to real `<a>` elements.

For items that have both `href` and children, follow the [APG hybrid disclosure navigation pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/): the expansion affordance (chevron / disclosure button) must be a **separate `<button>`** adjacent to the `<a>`, not merged into it.

### Shadow DOM and cross-root ARIA Issues

The primary ARIA cross-root concern is the **`role="listitem"`** requirement for `<swc-sidenav-item>` hosts that are slotted into the `<swc-sidenav>` shadow DOM's `<ul>`.

The 1st-gen approach sets `role="listitem"` on the host element in `firstUpdated`. This is a known workaround for slotted custom elements in a `<ul>` context: a `<swc-sidenav-item>` is not a native `<li>`, so the browser's accessibility tree may not expose it as a list item without an explicit role.

**Recommendation:** Continue setting `role="listitem"` on the `swc-sidenav-item` host element so the outer `<ul>` in `swc-sidenav`'s shadow DOM produces a valid list structure. Verify against the flat-tree accessibility tree in Chrome, Firefox, and Safari to confirm the list/listitem relationship is computed correctly.

For nested sub-lists, the `<ul>` rendered in the parent item's shadow DOM does not require `aria-labelledby` unless a visible heading or category label describes the group. When a `swc-sidenav-heading` or category item labels the group, the `<ul>` for that group should carry `aria-labelledby` referencing the heading's `id`. Because the heading and the `<ul>` may be in different shadow roots, align on whether the `id` reference resolves correctly; prefer keeping both in the same shadow root or use a host-level attribute to carry the resolved name.

`aria-controls` is **not** used in the disclosure navigation pattern for sidenav (unlike accordion, which uses `aria-controls` on its header button). The APG disclosure navigation example does not wire `aria-controls` from the disclosure button to the sub-list. Omit `aria-controls` unless a specific design review requests it.

### Accessibility tree expectations

**`swc-sidenav` — outer container**

```
navigation "Accessible label"
  list
    [swc-sidenav-item items as listitem nodes]
```

**Leaf item (has `href`, no children)**

```
listitem
  link "Item label" (aria-current="page" if current)
```

**Parent item (has children, no `href`) — collapsed**

```
listitem
  button "Item label" (aria-expanded="false")
```

**Parent item (has children, no `href`) — expanded**

```
listitem
  button "Item label" (aria-expanded="true")
  list
    listitem
      link "Child 1"
    listitem
      link "Child 2"
```

**Parent item (has children AND `href`) — collapsed**

```
listitem
  link "Item label"
  button "Expand Item label" (aria-expanded="false")
```

**Category item**

```
listitem (or group label — confirm final implementation)
  [non-interactive label text, not a link or button]
  list (aria-labelledby references the category label id)
    listitem ...
```

**Disabled leaf item**

```
listitem
  link "Item label" (aria-disabled="true", no href navigation)
```

**Icon-only item** (if supported)

```
listitem
  link "Accessible name" (no visible text; icon aria-hidden="true")
```

**`swc-sidenav-heading` group**

```
heading (level from heading-level property) "Heading text"
list (aria-labelledby → heading id)
  listitem ...
```

### Keyboard and focus

#### Vertical arrow navigation via `FocusgroupNavigationController`

Use `FocusgroupNavigationController` (from `2nd-gen/packages/core/controllers/focusgroup-navigation-controller/`) with `direction: 'vertical'` on the `swc-sidenav` host. This adds Up/Down arrow navigation between items as a keyboard efficiency enhancement on top of the base tab-order navigation from the APG model.

**Controller configuration:**

| Option | Value | Rationale |
| --- | --- | --- |
| `direction` | `'vertical'` | Items are stacked vertically; Up/Down arrows move focus. |
| `getItems()` | All visible `swc-sidenav-item` focusables in DOM order, excluding items hidden by a collapsed parent | Only reachable items participate in arrow navigation. |
| `skipDisabled` | `true` | Arrow navigation should skip disabled items. |
| `wrap` | `false` (recommended default) | Wrapping from last to first can disorient users in long navigation lists; review with design. |
| `memory` | `true` | Tab re-entry restores focus to the last visited item, consistent with roving tabindex memory behavior. |

Items hidden by a collapsed parent must be **excluded** from `getItems()`. Re-evaluate (call `refresh()`) on expansion and collapse of parent items.

#### Full keyboard interaction table

| Key | Behavior |
| --- | --- |
| Tab | Move focus to the next focusable element outside the sidenav (or the first sidenav item when entering). Side navigation uses roving tabindex via the `FocusgroupNavigationController`: only one item has `tabindex="0"` at a time; all others have `tabindex="-1"`. |
| Shift+Tab | Move focus to the previous focusable element outside the sidenav. |
| Up arrow | Move focus to the previous visible sidenav item (wraps if `wrap: true`). |
| Down arrow | Move focus to the next visible sidenav item (wraps if `wrap: true`). |
| Enter | On a leaf link: follow the link (navigate). On a disclosure button: toggle expanded / collapsed state. On a parent with `href`: follow the link; the separate disclosure button requires its own activation. |
| Space | On a disclosure button: toggle expanded / collapsed state (call `preventDefault()` to prevent page scroll). On a leaf link: follow the link. **Fix for SWC-1230:** Space must activate expansion just as Enter does. |
| Home | Move focus to the first visible sidenav item (if implemented; aligns with `FocusgroupNavigationController` Home/End support). |
| End | Move focus to the last visible sidenav item (if implemented). |

#### Focus management on expand / collapse

- When a parent item is **collapsed** and focus is on a child of that item: move focus to the parent disclosure button before collapsing.
- When a parent item is **expanded**: focus stays on the disclosure button; the user can arrow down into children.
- Do not automatically move focus into the newly revealed child list on expansion — let the user navigate there with arrow keys.

#### Disabled items

- Disabled items remain visible in the list and focusable (Tab, arrow keys reach them). Use `aria-disabled="true"` on the link or button. Script must block Enter and Space activation on disabled items.
- Do not remove disabled items from the tab sequence entirely.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | `<nav>` has `aria-label` from `label` property; leaf items with `href` render real `<a>` elements (not buttons); `aria-current="page"` is set on the selected leaf link and absent from all others; disclosure button has `aria-expanded="false"` when collapsed and `"true"` when expanded; `role="listitem"` is set on the `swc-sidenav-item` host; disabled items have `aria-disabled="true"` and activation is blocked; Space key calls `preventDefault()` on disclosure buttons; child items hidden by a collapsed parent are absent from the flat-tree tab order. |
| **aXe + Storybook** | Run WCAG 2.x rules on all sidenav stories (single level, multi-level, with icons, with categories, with headings, disabled items). Confirm no landmark-labeling violations and no list-structure violations. |
| **Playwright ARIA snapshots** | Snapshot the accessibility tree for: leaf item (link, `aria-current`); parent item collapsed (button, `aria-expanded="false"`); parent item expanded (button, `aria-expanded="true"`, child list visible); category item (non-interactive label + labeled child list); heading + group. |
| **Playwright keyboard** | Tab into sidenav; Up/Down arrows navigate between visible items; items inside collapsed parents are not reached by arrows; Enter activates links (navigation) and buttons (toggle); Space toggles disclosure buttons without page scroll; disabled items are reachable but not activatable. |
| **Contrast / focus** | Selected item indicator meets 3:1 non-text contrast (fixes SWC-271); focus ring is visible on all focusable items per WCAG 2.4.11. |

---

## Summary checklist

- [ ] `swc-sidenav` renders a `<nav aria-label="...">` with the label from the `label` property. `aria-label` is documented as required when multiple navigation landmarks exist on the same page.
- [ ] Leaf items with `href` render real `<a>` elements — no proxy click pattern is used.
- [ ] Parent items without `href` render `<button aria-expanded="true|false">` disclosure controls.
- [ ] Parent items with both `href` and children render a separate `<a>` (for navigation) and `<button aria-expanded>` (for disclosure) as adjacent siblings.
- [ ] The component does not manage routing; docs make clear that consumers must set the current item based on their URL or routing system.
- [ ] When the consumer marks an item as current, `aria-current="page"` is reflected on the internal `<a>` element; all other items have `aria-current` absent.
- [ ] `aria-current` is **not** set on parent disclosure buttons.
- [ ] Category items are non-interactive (no focus stop, no link or button role); they provide accessible group labels via `aria-labelledby` on the child `<ul>`.
- [ ] `swc-sidenav-heading` renders an appropriate heading element with a `heading-level` property; the associated item group `<ul>` uses `aria-labelledby` referencing the heading `id`.
- [ ] `role="listitem"` is set on `swc-sidenav-item` hosts to satisfy the outer `<ul>` list structure in shadow DOM composition.
- [ ] Disabled items use `aria-disabled="true"` (not the HTML `disabled` attribute alone); they remain visible in Tab and arrow-key order; activation is blocked in script.
- [ ] Icons are `aria-hidden="true"` when they are decorative (label text is present). Icon-only items carry an accessible name on the link or button.
- [ ] `FocusgroupNavigationController` is configured with `direction: 'vertical'`, `skipDisabled: true`, and `getItems()` that excludes items hidden by a collapsed parent; `refresh()` is called on each expand/collapse.
- [ ] Space key activates disclosure buttons and calls `preventDefault()` to prevent scroll (addresses SWC-1230).
- [ ] Selected item indicator meets 3:1 non-text contrast ratio (addresses SWC-271).
- [ ] Automated tests confirm `aria-current="page"` is reflected when the consumer sets the item as current, and is absent on all other items.
- [ ] Automated tests cover: link rendering, `aria-current`, `aria-expanded`, `role="listitem"`, disabled behavior, Space key, and accessibility tree structure.
- [ ] Playwright keyboard tests confirm arrow navigation skips hidden children, Space/Enter activate correctly, and disabled items are reachable but inactive.

---

## References

- [WAI-ARIA APG: Disclosure navigation example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)
- [WAI-ARIA APG: Disclosure navigation hybrid example](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation-hybrid/) (items that are both links and parents)
- [WAI-ARIA APG: Disclosure button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
- [WAI-ARIA APG: Landmark regions](https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/)
- [WAI-ARIA APG: Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA 1.2: `aria-current`](https://www.w3.org/TR/wai-aria-1.2/#aria-current)
- [WAI-ARIA 1.2: `aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded)
- [WAI-ARIA 1.2: `aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Spectrum 2 side navigation design (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=21993-665&p=f&m=dev)
- [Spectrum 2 side navigation documentation](https://s2.spectrum.corp.adobe.com/page/side-navigation/)
- [SWC Focusgroup navigation controller (PR #6129)](https://github.com/adobe/spectrum-web-components/pull/6129)
- [Side navigation migration roadmap](./rendering-and-styling-migration-analysis.md)
