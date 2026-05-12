<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Action Button / Action button accessibility migration analysis

<!-- Document title (editable) -->

# Action button accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [Related components and grouping (2nd-gen)](#related-components-and-grouping-2nd-gen)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [1st-gen implementation notes (avoid in 2nd-gen)](#1st-gen-implementation-notes-avoid-in-2nd-gen)
- [Recommendations: `<swc-action-button>`](#recommendations-swc-action-button)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated buttons (`submit` / `reset`) — deferred](#form-associated-buttons-submit--reset--deferred)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress)
    - [Keyboard and focus](#keyboard-and-focus)
    - [Toolbars, `role="group"`, and segmented control](#toolbars-rolegroup-and-segmented-control)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-action-button`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It parallels [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) for shared patterns (native **`<button>`**, focus delegation, **no** link-shaped **`href`** API). **`swc-action-button`** is the compact **toolbar / chrome** control; it must **not** accept **`href`**—navigation belongs on a classed **`<a href>`** (see [Link accessibility migration analysis](../link/accessibility-migration-analysis.md)), or on a **`<button type="button">`** with routing, not on this component.

Work with **accessibility** and **design** to replace or narrow **press-and-hold** (**`hold-affordance`**) behavior from 1st-gen. **Design** usually calls this pattern **hold affordance**; **1st-gen** surfaces the same behavior as a synthesized **`longpress`** **`CustomEvent`** (a **timed pointer gesture**) with weak discoverability on touch and overlaps concerns called out for **Tooltip** and overlay **`longpress`** triggers ([Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md) — prefer explicit toggles and keyboard parity). [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton) leans on **`usePress`**-style **press and keyboard events** instead of a dedicated **longpress** primitive; treat that as the cross-platform product reference when proposing alternatives (for example **overflow menu**, **split action**, or **documented** `onPressStart` / `onPressEnd` contracts for secondary behavior).

### Also read

[Action button migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM. Shared semantics and **no-`href`** stance: [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). **Tooltip**, **overlay**, and **`longpress`**: [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md). Grouping and Spectrum **button group** visuals: [Button group migration roadmap](../button-group/rendering-and-styling-migration-analysis.md). Action strips: [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md).

### Related components and grouping (2nd-gen)

- **`swc-segmented-control`** and **`swc-segmented-control-button`** — own **mutually exclusive** (“radio group”) semantics. Use them when the UX is a **single choice** among segments; **do not** push **`role="radio"`** onto **`swc-action-button`**.
- **`Role="button"` only on `swc-action-button`:** the host and its focus target must map to **`role="button"`** in the accessibility tree—**never** **`role="toolbar"`**, **`role="group"`**, **`role="link"`**, **`role="radio"`**, or **`role="checkbox"`** on this component. Landmarks, collections, and toolbar chrome live on **ancestors** (**`swc-button-group`**, **`swc-action-group`**, layout wrappers), not on **`swc-action-button`** itself.

### What it is

- **`swc-action-button`:** A **compact commit control** for toolbars, action groups, and icon-first chrome. Same **button** interaction contract as **`swc-button`** at a smaller visual scale: a **real** `<button type="button">` (or equivalent) should receive **Tab** focus and activation keys, with **`delegatesFocus`** (or the same delegation pattern as **`swc-button`**) so the **host** does **not** present a duplicate **`role="button"`** tab stop.
- **`selected` / `toggles`:** The exposed role stays **`button`** only. Use **`aria-pressed="true|false"`** for **independent** toggles or **multi-select** toolbars where design keeps **action-button** chrome—**never** **`role="radio"`** or **`role="checkbox"`** on **`swc-action-button`**. **Mutually exclusive** “one of many” segments belong in **`swc-segmented-control`** / **`swc-segmented-control-button`**, not on **`swc-action-button`**. When the control opens a menu, keep **`aria-expanded`** / **`aria-haspopup`** in sync; do **not** pair **`aria-pressed`** with **`aria-expanded`** on the same trigger in conflicting ways (same branching idea as 1st-gen `ActionButton.updated`).

### When to use something else

- **Primary** or **high-emphasis** calls to action → [Button](../button/accessibility-migration-analysis.md) / default **`swc-button`**.
- **Field adornments** inside inputs → [In-field button](../infield-button/rendering-and-styling-migration-analysis.md).
- **Navigation** to another URL → classed **`<a href>`** or framework routing on a **native** control—not **`href`** on **`swc-action-button`**.

### What it is not

- **Not a link:** **No** **`href`**, **no** **`LikeAnchor`** proxy anchor, **no** host **`role="link"`**. 1st-gen deprecated the link API on **`sp-action-button`** (dev warning); 2nd-gen **drops** the API surface entirely. Prior art: [SWC-227](https://jira.corp.adobe.com/browse/SWC-227).
- **Not `role="radio"` or `role="checkbox"`:** **`swc-action-button`** is always a **button** in the accessibility tree. **Radio-group** UX ships on **`swc-segmented-control`** / **`swc-segmented-control-button`**. **`swc-action-group`** + **`swc-button-group`** use **`role="group"`** on the wrapper and plain **buttons** inside—**not** 1st-gen **`role="radio"`** / **`role="checkbox"`** on children (see **1st-gen implementation notes**).
- **Not a silent timed gesture as the only secondary path:** **Hold** / **longpress** must **not** be the **only** way to reach critical functionality ([Pointer gestures (WCAG 2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures); align with [Tooltip](../tooltip/accessibility-migration-analysis.md) guidance on **`longpress`**).

---

## ARIA and WCAG context

### Pattern in the APG

- [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — activation with **Enter** / **Return** or **Space**; **`aria-pressed`** when toggling; **`aria-expanded`** when opening a popup; discernible **name** (visible text, **`label`**, or **`aria-label`** on the focus target).
- [Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) — the outer container uses **`role="toolbar"`**; related actions such as **Copy / Cut / Paste** sit in a nested **`role="group"`**. The example’s **text alignment** strip uses **`radiogroup`** with **`role="radio"`** on **`button`** elements; in Spectrum Web Components, that **exclusive** pattern belongs on **`swc-segmented-control`** / **`swc-segmented-control-button`** so **`swc-action-button`** stays **`role="button"`** only, while **`swc-button-group`** matches the example’s **`role="group"`** clusters.
- [Radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) — for **`swc-segmented-control`** / **`swc-segmented-control-button`**, not for re-typing **`swc-action-button`** as **radio**.
- [Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) — **not** **`swc-action-button`**; use real anchors for navigation.
- Prefer **native** `<button>` so the browser supplies **context menu**, **modifier+click**, and predictable **screen reader** mapping without host **`role`** duplication.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Role**, **name**, and state on the **focused** control—typically the inner **`<button>`**, not a misleading duplicate on the **host**. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Enter** / **Return** or **Space** activates; **hold-affordance** keyboard path in 1st-gen uses **Space** or **Alt+ArrowDown** hold—any 2nd-gen replacement must stay **fully operable** without timed pointer holds alone. |
| [Pointer gestures (WCAG 2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures) | If a **path** requires a **multipoint** or **timed** gesture (for example press-and-hold), provide a **single-pointer** alternative unless essential. Treat **longpress-only** secondary actions as high risk; pair with menus, settings, or explicit controls. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Compact sizes are common; document **minimum** touch targets and **quiet** hit slop where Spectrum allows. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring on the **actual** focus target after delegation. |
| [Content on hover or focus (WCAG 1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | When **Tooltip** or overlays sit on **`swc-action-button`**, dismiss without activating the control underneath — [SWC-321](https://jira.corp.adobe.com/browse/SWC-321), [React Spectrum Tooltip `shouldCloseOnPress`](https://react-spectrum.adobe.com/Tooltip). |

**Bottom line:** **`swc-action-button`** = **`role="button"`** (only), **no** **`href`**, **no** **`role="radio"`**, **no** **`role="checkbox"`**; **exclusive** segments → **`swc-segmented-control`**; **clusters** in **`swc-action-group`** → **`swc-button-group`** with **`role="group"`**; **`toolbar`** on the **outer** aggregate per **APG** (contrast with **React Spectrum** putting **`toolbar`** on inner strips—document the chosen layering). **Toggle** / **popup** / **hold** guidance unchanged above.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-227](https://jira.corp.adobe.com/browse/SWC-227) | Bug | Done | Fixed | Action-button with `href` cannot be activated by screen reader |
| [SWC-321](https://jira.corp.adobe.com/browse/SWC-321) | Bug | To Do | Unresolved | Clicking open self-managed tooltip on action-button triggers underlying button ([#3969](https://github.com/adobe/spectrum-web-components/issues/3969)) |
| [SWC-598](https://jira.corp.adobe.com/browse/SWC-598) | Epic | Research | — | Consider refactoring ButtonBase, Action Button, and Button |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | To Do | — | ElementInternals RFC — form-associated custom elements (shared with controls extending `ButtonBase`) |

---

## 1st-gen implementation notes (avoid in 2nd-gen)

**`sp-action-button`** extends **`ButtonBase`**, so it inherited **`LikeAnchor`** / deprecated **`href`** and the same **proxy-anchor** risks called out in [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). **`swc-action-button`** must **not** ship **`href`**. The wider **`href`** / double-activation class of bugs (for example [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) on **`menu-item`**) reinforces keeping navigation on a **single** native **`<a href>`** surface—see [Link accessibility migration analysis](../link/accessibility-migration-analysis.md).

**`hold-affordance`** wires a **300 ms** pointer timer and dispatches a **`longpress`** custom event; keyboard path holds **Space** or **Alt+ArrowDown** then releases:

```37:37:1st-gen/packages/action-button/src/ActionButton.ts
export const LONGPRESS_DURATION = 300;
```

```141:157:1st-gen/packages/action-button/src/ActionButton.ts
  private handlePointerdownHoldAffordance(event: PointerEvent): void {
    if (event.button !== 0) {
      return;
    }
    this.addEventListener('pointerup', this.handlePointerupHoldAffordance);
    this.addEventListener('pointercancel', this.handlePointerupHoldAffordance);
    LONGPRESS_TIMEOUT = setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent<LongpressEvent>('longpress', {
          bubbles: true,
          composed: true,
          detail: {
            source: 'pointer',
          },
        })
      );
    }, LONGPRESS_DURATION);
  }
```

The host defaults **`role="button"`** while **`ButtonBase`** uses **`this`** as **`focusElement`**—2nd-gen should converge on **inner native button** + **delegation**, consistent with **`swc-button`**.

**`sp-action-group`** (1st-gen) assigns **`role="radio"`** or **`role="checkbox"`** to child **`sp-action-button`** elements when **`selects`** is **`single`** or **`multiple`**. **`swc-action-button`** must **never** carry those roles in 2nd-gen. Replace that behavior with **`swc-segmented-control`** / **`swc-segmented-control-button`** for **radio-group** UX, and with **`swc-button-group`** using **`role="group"`** (plus **`aria-pressed`** / roving **`tabindex`** on **buttons** where appropriate) when **`swc-action-button`** sits inside **`swc-action-group`**. Place **`role="toolbar"`** on an **outer** parent when the page needs a single **toolbar** landmark over several clusters—see [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).

---

## Recommendations: `<swc-action-button>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Native mapping** | Render a **real** `<button type="button">` (unless/until **`submit`** / **`reset`** ship with **`ElementInternals`**—see below). **Host** must **not** be the sole **`role="button"`** tab stop when an inner button exists; prefer **delegated focus** to match **`swc-button`**. |
| **`href` not supported** | **Do not** add **`href`**, **`target`**, **`download`**, or anchor proxying. Authors use a classed **`<a href>`** for navigation ([Link accessibility migration analysis](../link/accessibility-migration-analysis.md)). |
| **`role="button"` only** | **Must not** expose **`role="radio"`** or **`role="checkbox"`**. **Mutually exclusive** choices → **`swc-segmented-control`** / **`swc-segmented-control-button`**. |
| **`swc-button-group` in `swc-action-group`:** **`role="group"`** | Whenever **`swc-button-group`** wraps **`swc-action-button`** items inside **`swc-action-group`**, the wrapper **always** uses **`role="group"`** (with a discernible name). **Do not** promote that inner wrapper to **`role="toolbar"`** if a **parent** already should own **`toolbar`** for the whole bar—follow [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) layering; contrast with **React Spectrum** assigning **`toolbar`** to inner strips and document the SWC choice. |
| **`aria-pressed` / `aria-expanded`** | **`aria-pressed`** for **independent** toggles or **multi-select** **button** toolbars. When **`aria-haspopup`** + **`aria-expanded`** define a **menu** trigger, follow the same **non-overlap** rules as 1st-gen **`ActionButton.updated`** (do **not** combine conflicting pressed/expanded semantics on one surface). |
| **Icon-only** | Require an **accessible name** (**`label`** reflected to the inner button or **`aria-label`**) and **`aria-hidden`** on decorative icons. |
| **`aria-haspopup`** | When opening menus or popovers, set **`aria-haspopup`** and keep **`aria-expanded`** in sync with the open surface. |

### Shadow DOM and cross-root ARIA Issues

**Deferred:** Same **`aria-labelledby`** / **`aria-describedby`** **ID** reference limits across **shadow** roots as **`swc-button`** until **`ElementInternals`** and **axe-core** coverage are clear — track **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** and [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **Shadow DOM** subsection.

### Form-associated buttons (`submit` / `reset`) — deferred

**Deferred:** Same platform and tooling dependencies as **`swc-button`** for **`type="submit"`** / **`type="reset"`** on an internal **`<button>`** inside a custom element. Ship **`type="button"`** for initial **`swc-action-button`** scope unless **`ElementInternals`** + **axe-core** story matures — see [SWC-48](https://jira.corp.adobe.com/browse/SWC-48).

### Accessibility tree expectations

**Default**

- **Role:** **button**; **name** from visible label, **`label`**, or **`aria-label`** on the focus target.

**Toggle (`toggles` / `selected`)**

- **Role:** **button** with **`aria-pressed="true|false"`** for **independent** or **multi-select** toolbars. **Never** **radio** or **checkbox** roles on **`swc-action-button`**.

**Mutually exclusive segments**

- Implement with **`swc-segmented-control`** / **`swc-segmented-control-button`** (**radiogroup** semantics), not by re-typing **`swc-action-button`**.

**Menu / picker trigger**

- **button** with **`aria-haspopup`**, **`aria-expanded`** matching overlay visibility.

### Live regions, loading, and announcements

**Does not apply** at the component level in the same way as **`swc-button` pending**: 1st-gen **action button** does **not** ship the **pending / progress circle** pattern. If product adds async feedback later, follow [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and **`swc-button`** guidance—**never** **`aria-live="assertive"`** for routine loading.

### Hold affordance and alternatives to synthesized longpress

**Terminology:** **Hold affordance** is how **design** typically refers to the timed press-and-hold interaction; **`longpress`** (event) and **`hold-affordance`** (attribute) are the **1st-gen** engineering names for the same idea.

1. **Design + a11y decision:** Replace or demote **synthesized `longpress`** as the **primary** secondary-action channel. Options to evaluate with design: **“more” menu**, **split control**, **visible chevron** already used elsewhere in Spectrum, or **settings** surface where the action is discoverable without timing.
2. **Align with React Spectrum:** [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton) documents **focusable** behavior, **keyboard** activation, and **React Aria** **press** hooks (`onPress`, `onPressStart`, `onPressEnd`, **keyboard** event surfaces)—not a **300 ms** **DOM `longpress`** event. Prefer **documented**, **testable** **press** and **key** contracts for integrators instead of **hold-only** behavior.
3. **Tooltip and overlay alignment:** If **tooltips** use **`longpress`** on touch, that stacks poorly with **hold-affordance** on the same control class—see [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md) (**Pointer gestures**, **Interaction**). Prefer **focus** + **hover** descriptions and **explicit** disclosure patterns for touch.
4. If a **timed** gesture remains for **backward compatibility**, document a **single-pointer** alternative and ensure **keyboard** can complete the same outcome **without** holding keys in a non-standard way unless harmonized with platform conventions.

### Keyboard and focus

- **Tab** lands on the **inner** **`<button>`** (or delegated equivalent). **Enter** / **Return** or **Space** activates the **primary** action.
- **Popup triggers:** **Space** / **Enter** open; **Arrow** keys follow **APG** for the attached widget; **Escape** closes and returns focus per overlay rules.
- **1st-gen hold keyboard path** (**Space** or **Alt+ArrowDown** hold, release fires **`longpress`**): any 2nd-gen carryover must be **documented**, **tested** with **screen readers**, and **paired** with non-timed alternatives per [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress).
- **`swc-action-group`:** **Arrow** navigation and **roving `tabindex`** should respect **`role="group"`** on **`swc-button-group`** and any outer **`toolbar`** contract; align keyboard tables with [Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and the [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).

### Toolbars, `role="group"`, and segmented control

| Topic | What to do |
| --- | --- |
| **`swc-segmented-control`** | Own **radio group** semantics via **`swc-segmented-control-button`** children; keep **`swc-action-button`** out of that **radiogroup** shape. |
| **`swc-button-group`** | Inside **`swc-action-group`**, **`swc-button-group`** **always** exposes **`role="group"`** around **`swc-action-button`** siblings. Name the **group** for screen readers. |
| **`role="toolbar"`** placement | Prefer **APG**-style **`toolbar`** on the **ancestor** that wraps **all** clusters (and other widgets), with inner **`role="group"`** sections—see **Copy / Cut / Paste** in the [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/). **React Spectrum** may use **`toolbar`** on a narrower element; capture the SWC vs RS difference in Storybook docs so testers know which landmark to expect. |
| **Keyboard** | Nested **radio** behavior inside a **toolbar** differs from standalone **radiogroup** (horizontal arrows owned by **toolbar**—**APG** documents this). **`swc-segmented-control`** should implement the **radio group** pattern appropriate to its **DOM** position (inside vs outside a **toolbar**). |

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Inner **`<button>`**; **host** without duplicate **`role="button"`** when delegating; **`aria-pressed`** / **`aria-expanded`** toggles; **no** **`href`**; **no** **`role="radio"`** / **`role="checkbox"`**. |
| **aXe + Storybook** | Default, **disabled**, **quiet**, **static** color, **icon-only** (named), **toggle**, **`swc-action-group` + `swc-button-group` (`role="group"`)**, **menu trigger**, and **`swc-segmented-control`** stories. |
| **Playwright ARIA snapshots** | **`role="button"`** on **`swc-action-button`**; **`role="group"`** on **`swc-button-group`**; **`role="toolbar"`** only where the outer contract intends it; **`aria-pressed`** for toggles; **radiogroup** semantics on **`swc-segmented-control`** only; assert **absent** **radio**/**checkbox** roles on **`swc-action-button`**. |
| **Playwright keyboard** | **Enter** / **Space**; menu trigger keys; **Escape** with overlays. |
| **Overlay + Tooltip** | Regression for **[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)** — overlay dismiss must **not** activate **`swc-action-button`** underneath. |

---

## Summary checklist

- [ ] **No `href`** or anchor proxy on **`swc-action-button`**; navigation via **`<a href>`** / design-system link patterns ([SWC-227](https://jira.corp.adobe.com/browse/SWC-227)).
- [ ] **Focus** on inner **native** **`<button>`** with **delegation**; **no** misleading **host-only** button semantics.
- [ ] **Role** remains **`button`** only—**no** **`role="radio"`** or **`role="checkbox"`** on **`swc-action-button`**; **exclusive** UX on **`swc-segmented-control`** / **`swc-segmented-control-button`**; **`swc-button-group`** inside **`swc-action-group`** **always** **`role="group"`**; **`toolbar`** on the **outer** parent per [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) (document divergence from **React Spectrum** **`toolbar`** placement if any).
- [ ] **Toggle** / **group** / **menu** states: correct **`aria-pressed`**, **`aria-expanded`**, **`aria-haspopup`** combinations.
- [ ] **Hold** / **secondary** actions: **design + a11y** signed-off alternative to **timed-only** **`longpress`**; parity with **press** / **key** event expectations per [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton).
- [ ] **Tooltip** / **overlay** stacking: no **click-through** to trigger ([SWC-321](https://jira.corp.adobe.com/browse/SWC-321)); align with [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md).
- [ ] Cross-links to [Action button migration roadmap](./rendering-and-styling-migration-analysis.md) and [Button accessibility migration analysis](../button/accessibility-migration-analysis.md).
- [ ] **`aria-labelledby`** / **`aria-describedby`** across light + shadow: **deferred** per **`swc-button`** until **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** + tooling path is clear.
- [ ] **`submit`** / **`reset`**: **deferred** like **`swc-button`** until **`ElementInternals`** story matures.

---

## References

- [WAI-ARIA APG: Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) (`role="group"` for **Copy / Cut / Paste**, **`toolbar`** on parent)
- [WAI-ARIA APG: Radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) (for **`swc-segmented-control`**)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [React Spectrum: ActionButton](https://react-spectrum.adobe.com/ActionButton)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Link accessibility migration analysis](../link/accessibility-migration-analysis.md) (`href` proxy and double-activation context, [SWC-923](https://jira.corp.adobe.com/browse/SWC-923))
- [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md)
- [Action button migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (if async states are added later)
- [spectrum-web-components PR #6120 — core migration; `like-anchor.ts` not moved](https://github.com/adobe/spectrum-web-components/pull/6120)
