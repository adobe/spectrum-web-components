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
    - [Spectrum 2 design file vs coded accessibility](#spectrum-2-design-file-vs-coded-accessibility)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated buttons (`submit` / `reset`) — deferred](#form-associated-buttons-submit--reset--deferred)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-action-button`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It parallels [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) for shared patterns (native **`<button>`**, focus delegation, **no** link-shaped **`href`** API, and **pending / loading** semantics when async states ship). **`swc-action-button`** is the compact **toolbar / chrome** control; it must **not** accept **`href`**—navigation belongs on a classed **`<a href>`** (see [Link accessibility migration analysis](../link/accessibility-migration-analysis.md)), or on a **`<button type="button">`** with routing, not on this component.

**Pending / loading** uses the **same** contract as **`swc-button`**: **pending** visuals appear in [Spectrum 2 — Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877); align **motion**, delay, and announcement patterns with Spectrum loading guidance ([Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)) and internal **general / accessibility guidance** for loading indicators (delay before show, determinate vs indeterminate, placement, status announcements, and motion). 1st-gen **`sp-action-button`** does **not** expose a **pending** API today; if 2nd-gen adds one, follow the **Recommendations** and **Live regions** sections below and keep parity with **`swc-button`**.

**Hold affordance / longpress:** Use [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) and [React Spectrum `MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html) as the reference for accessible **hold affordance** / **longpress** behavior, rather than treating 1st-gen **`hold-affordance`** / **`longpress`** as normative. **React Aria** documents **hold affordance** with **Alt** + **Down arrow** so **keyboard** users get parity with **longpress** on pointer. Use **`aria-describedby`** on the **focus target** for **additional** instruction so **screen reader** users understand that **keyboard** pattern (and how it relates to **touch** **longpress** where relevant)—keep that text out of the accessible **name**. 

**Storybook (consumer / end-user docs):** **`swc-action-button`** Storybook and other **consumer-facing** component documentation **must** state that a **split button**—one **button** for the **primary** action and a **separate** **button** for the content that would otherwise be reached via **longpress**—is **much more accessible** than using **longpress** alone.

### Also read

[Action button migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM. **Spectrum 2** component visuals and property matrix (**show icon**, **show label**, **selection**, **quiet**, **show hold icon**, **pending**, sizes **extra-small**–**extra-large**, compositions): [Spectrum 2 — Web (desktop scale): Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877). Shared semantics, **no-`href`** stance, and **pending** treatment: [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). **Read-only** circular **progressbar** semantics (not inline button pending): [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md). **Tooltip**, **overlay**, and **`longpress`**: [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md). Grouping and Spectrum **button group** visuals: [Button group migration roadmap](../button-group/rendering-and-styling-migration-analysis.md). Action strips: [Action group migration roadmap](../action-group/rendering-and-styling-migration-analysis.md).

### Related components and grouping (2nd-gen)

- **`swc-segmented-control`** and **`swc-segmented-control-button`** — own **mutually exclusive** (“radio group”) semantics. Use them when the UX is a **single choice** among segments; **do not** push **`role="radio"`** onto **`swc-action-button`**.
- **`Role="button"` only on `swc-action-button`:** the host and its focus target must map to **`role="button"`** in the accessibility tree—**never** **`role="toolbar"`**, **`role="group"`**, **`role="link"`**, **`role="radio"`**, or **`role="checkbox"`** on this component. Landmarks, collections, and toolbar chrome live on **ancestors** (**`swc-button-group`**, **`swc-action-group`**, layout wrappers), not on **`swc-action-button`** itself.

### What it is

- **`swc-action-button`:** A **compact commit control** for toolbars, action groups, and icon-first chrome—aligned with Spectrum 2 intent (“perform tasks or mark selections” in task-style UI where controls stay low emphasis). Visual properties, states, and sizes are defined in [Spectrum 2 — Web (desktop scale): Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877). Same **button** interaction contract as **`swc-button`** at a smaller visual scale: a **real** `<button type="button">` (or equivalent) should receive **Tab** focus and activation keys, with **`delegatesFocus`** (or the same delegation pattern as **`swc-button`**) so the **host** does **not** present a duplicate **`role="button"`** tab stop.
- **`selected` / `toggles`:** The exposed role stays **`button`** only. Use **`aria-pressed="true|false"`** for **independent** toggles or **multi-select** toolbars where design keeps **action-button** chrome—**never** **`role="radio"`** or **`role="checkbox"`** on **`swc-action-button`**. **Mutually exclusive** “one of many” segments belong in **`swc-segmented-control`** / **`swc-segmented-control-button`**, not on **`swc-action-button`**. When the control opens a menu, keep **`aria-expanded`** / **`aria-haspopup`** in sync; do **not** pair **`aria-pressed`** with **`aria-expanded`** on the same trigger in conflicting ways (same branching idea as 1st-gen `ActionButton.updated`).

### When to use something else

- **Primary** or **high-emphasis** calls to action → [Button](../button/accessibility-migration-analysis.md) / default **`swc-button`**.
- **Field adornments** inside inputs → [In-field button](../infield-button/rendering-and-styling-migration-analysis.md).
- **Navigation** to another URL → classed **`<a href>`** or framework routing on a **native** control—not **`href`** on **`swc-action-button`**.

### What it is not

- **Not a link:** **No** **`href`**, **no** **`LikeAnchor`** proxy anchor, **no** host **`role="link"`**. 1st-gen deprecated the link API on **`sp-action-button`** (dev warning); 2nd-gen **drops** the API surface entirely. Prior art: [SWC-227](https://jira.corp.adobe.com/browse/SWC-227).
- **Not `role="radio"` or `role="checkbox"`:** **`swc-action-button`** is always a **button** in the accessibility tree. **Radio-group** UX ships on **`swc-segmented-control`** / **`swc-segmented-control-button`**. **`swc-action-group`** + **`swc-button-group`** use **`role="group"`** on the wrapper and plain **buttons** inside—**not** 1st-gen **`role="radio"`** / **`role="checkbox"`** on children (see **1st-gen implementation notes**).
- **Not a silent timed gesture as the only secondary path:** **Hold** / **longpress** must **not** be the **only** way to reach critical functionality ([Pointer gestures (WCAG 2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures); align with [Tooltip](../tooltip/accessibility-migration-analysis.md) guidance on **`longpress`**).
- **Not `role="progressbar"`** on the control surface for **pending** work: a **progress circle** carries **different** meaning (unknown or known **task** progress). For “button is busy,” use an **animated progress icon** (decorative or labeled icon treatment) plus **name / live region** guidance in **Live regions** below—**not** **`swc-progress-circle`** inside the label ([Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md)).

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
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Enter** / **Return** or **Space** activates; **hold-affordance** keyboard path in 1st-gen uses **Space** or **Alt** + **Down arrow** hold. If SWC adopts **MenuTrigger**-class behavior aligned with **React Aria**, document **Alt** + **Down arrow** (and related keys) as the **non–longpress** **keyboard** path to the **menu** alongside **`aria-describedby`** instructions (see **Hold affordance** in **Overview** and [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress)). |
| [Pointer gestures (WCAG 2.5.1)](https://www.w3.org/TR/WCAG22/#pointer-gestures) | If a **path** requires a **multipoint** or **timed** gesture (for example press-and-hold), provide a **single-pointer** alternative unless essential. Treat **longpress-only** secondary actions as high risk; pair with menus, settings, or explicit controls. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | [Spectrum 2 Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877) spans **extra-small** through **extra-large**; **compact** sizes are common—document **minimum** touch targets and **quiet** hit slop where Spectrum allows. |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | **Loading animation** on the control should respect **reduced motion** where the platform supports it; align with Spectrum motion tokens and product guidance. |
| Loading UX (Spectrum / design guidance) | **~100 ms delay** before showing a progress indicator to avoid **flicker** on fast operations; place the indicator **near** the content it represents. |
| **Pending** control during load ([SWC-459](https://jira.corp.adobe.com/browse/SWC-459)) | Use **`aria-disabled="true"`** on the inner **`<button>`** while keeping it **focusable** (do **not** use native **`disabled`** if that would drop the control from the path users need). Matches common **React** loading-button behavior and keeps the initiating control **discoverable** while signaling **not** actionable—pair with visible pending styling and **name** / live-region guidance in **Live regions**. |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | **Down (pressed)** and **keyboard focus** visuals are **not** represented in the [Spectrum 2 Action button Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877) file; implementation must still ship a clear **focus-visible** ring and **pressed** feedback on the real **`<button>`** (see Spectrum coded guidance / [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton)). |
| [Content on hover or focus (WCAG 1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | When **Tooltip** or overlays sit on **`swc-action-button`**, dismiss without activating the control underneath — [SWC-321](https://jira.corp.adobe.com/browse/SWC-321), [React Spectrum Tooltip `shouldCloseOnPress`](https://react-spectrum.adobe.com/Tooltip). |

**Bottom line:** **`swc-action-button`** = **`role="button"`** (only), **no** **`href`**, **no** **`role="radio"`**, **no** **`role="checkbox"`**; **exclusive** segments → **`swc-segmented-control`**; **clusters** in **`swc-action-group`** → **`swc-button-group`** with **`role="group"`**; **`toolbar`** on the **outer** aggregate per **APG** (contrast with **React Spectrum** putting **`toolbar`** on inner strips—document the chosen layering). For **menu + action**, **split buttons** first; if one surface remains, **`aria-describedby`** + **Alt** + **Down arrow** per [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) and [React Spectrum `MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html), plus **non–longpress** alternatives. **Toggle** / **popup** / **hold** guidance unchanged above. **Pending** (when implemented) = **`aria-disabled`** + **focusable** inner **`<button>`** + **animated icon** + careful **announcements**, **not** a **progressbar** inside the action—**same** as **`swc-button`**.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-227](https://jira.corp.adobe.com/browse/SWC-227) | Bug | Done | Fixed | Action-button with `href` cannot be activated by screen reader |
| [SWC-321](https://jira.corp.adobe.com/browse/SWC-321) | Bug | To Do | Unresolved | Clicking open self-managed tooltip on action-button triggers underlying button ([#3969](https://github.com/adobe/spectrum-web-components/issues/3969)) |
| [SWC-598](https://jira.corp.adobe.com/browse/SWC-598) | Epic | Research | — | Consider refactoring ButtonBase, Action Button, and Button |
| [SWC-459](https://jira.corp.adobe.com/browse/SWC-459) | Bug | To Do | — | `Pending` button has accessibility issues — **mirror** **`swc-button`** fix patterns if **`swc-action-button`** gains **pending** |
| [SWC-1369](https://jira.corp.adobe.com/browse/SWC-1369) | Bug | To Do | — | `Pending` button not visible in WHCM — same **WHCM** / contrast checks for **pending** **`swc-action-button`** |
| [SWC-1255](https://jira.corp.adobe.com/browse/SWC-1255) | Bug | Done | Fixed | Pending state controller uses semantically incorrect progress circle (`sp-button`) — **do not** repeat on **`swc-action-button`** |
| [SWC-1119](https://jira.corp.adobe.com/browse/SWC-1119) | Bug | Done | Fixed | Progress circle missing appropriate role/attributes — `sp-button` (Pending) — **contrast** with decorative **pending** icon on **`swc-action-button`** |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | To Do | — | ElementInternals RFC — form-associated custom elements (shared with controls extending `ButtonBase`) |

---

## 1st-gen implementation notes (avoid in 2nd-gen)

**`sp-action-button`** extends **`ButtonBase`**, so it inherited **`LikeAnchor`** / deprecated **`href`** and the same **proxy-anchor** risks called out in [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). **`swc-action-button`** must **not** ship **`href`**. The wider **`href`** / double-activation class of bugs (for example [SWC-923](https://jira.corp.adobe.com/browse/SWC-923) on **`menu-item`**) reinforces keeping navigation on a **single** native **`<a href>`** surface—see [Link accessibility migration analysis](../link/accessibility-migration-analysis.md).

**`hold-affordance`** wires a **300 ms** pointer timer and dispatches a **`longpress`** custom event; keyboard path holds **Space** or **Alt** + **Down arrow** then releases:

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

### Spectrum 2 design file vs coded accessibility

The [Spectrum 2 — Web (desktop scale): Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877) file documents **default**, **hover**, **disabled**, and **pending** visuals (including **static white** / **static black**), **show hold icon**, **selection** / **emphasized** variants, and **icon + label** / **label only** / **icon only** compositions. **Do not** treat Figma as complete for accessibility: the design file notes that **down (pressed)** and **keyboard focus** states are **not** available there and are implemented in Spectrum’s **coded** components—**WCAG** **focus visible** and correct **keyboard** / **pressed** semantics remain **mandatory** in **`swc-action-button`** and must be covered in **Storybook** and **Testing** below. When **show hold icon** is on, keep **hold** / **MenuTrigger** guidance in [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress) (**pointer alternatives**, **`aria-describedby`**, **split button** preference).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Native mapping** | Render a **real** `<button type="button">` (unless/until **`submit`** / **`reset`** ship with **`ElementInternals`**—see below). **Host** must **not** be the sole **`role="button"`** tab stop when an inner button exists; prefer **delegated focus** to match **`swc-button`**. |
| **`href` not supported** | **Do not** add **`href`**, **`target`**, **`download`**, or anchor proxying. Authors use a classed **`<a href>`** for navigation ([Link accessibility migration analysis](../link/accessibility-migration-analysis.md)). |
| **`role="button"` only** | **Must not** expose **`role="radio"`** or **`role="checkbox"`**. **Mutually exclusive** choices → **`swc-segmented-control`** / **`swc-segmented-control-button`**. |
| **`swc-button-group` in `swc-action-group`:** **`role="group"`** | Whenever **`swc-button-group`** wraps **`swc-action-button`** items inside **`swc-action-group`**, the wrapper **always** uses **`role="group"`** (with a discernible name). **Do not** promote that inner wrapper to **`role="toolbar"`** if a **parent** already should own **`toolbar`** for the whole bar—follow [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) layering; contrast with **React Spectrum** assigning **`toolbar`** to inner strips and document the SWC choice. |
| **`aria-pressed` / `aria-expanded`** | **`aria-pressed`** for **independent** toggles or **multi-select** **button** toolbars. When **`aria-haspopup`** + **`aria-expanded`** define a **menu** trigger, follow the same **non-overlap** rules as 1st-gen **`ActionButton.updated`** (do **not** combine conflicting pressed/expanded semantics on one surface). |
| **`aria-disabled` on `<button>`** | For **pending** work, set **`aria-disabled="true"`** on the inner **`<button>`** and keep it **focusable** (**no** native **`disabled`** for that state unless product requires removing it from tab order). Align with **[SWC-459](https://jira.corp.adobe.com/browse/SWC-459)** and typical **React** loading-button behavior. Use native **`disabled`** when the control should **not** receive focus. Document both patterns in Storybook. |
| **Pending / loading (visual)** | Use an **animated progress icon** (e.g. looping SVG) **without** **`role="progressbar"`** on that graphic unless it truly represents **measurable** progress. **Do not** embed **`swc-progress-circle`** for **action-button** pending—that component is for **progressbar** semantics ([progress circle a11y doc](../progress-circle/accessibility-migration-analysis.md)). |
| **Pending / loading (name)** | Keep the control **named**: update **visible** label (“Saving…”), **`aria-label`**, or reflected **`aria-*`** mapped onto the shadow **`<button>`** when wiring exists. Prefer **specific** strings (“Uploading document…”) over generic “Loading” when context allows. Full **`aria-labelledby`** / **`aria-describedby`** from **light DOM** across shadow roots is **deferred**—see **Shadow DOM** below. |
| **External completion / errors** | For status that completes **outside** the button surface, use **`role="status"`** or **`aria-live="polite"`** on a **single** concise region; **never** **`aria-live="assertive"`** for routine loading. Consolidate duplicate loaders to **one** announcement. **`aria-busy`** on the icon wrapper is **usually unnecessary** if you are not mirroring a **document-level** busy region. |
| **Icon-only** | Require an **accessible name** (**`label`** reflected to the inner button or **`aria-label`**); **`aria-hidden`** on decorative icons. Decorative **pending** spinner **`aria-hidden="true"`** when the **name** already conveys busy state. |
| **`aria-haspopup`** | When opening menus or popovers, set **`aria-haspopup`** and keep **`aria-expanded`** in sync with the open surface. |
| **`aria-describedby` (hold / menu from one surface)** | When **design** keeps **longpress** or **MenuTrigger**-class behavior on **one** **button**, set **`aria-describedby`** on the **focus target** to **short** instructions that include **touch** (**longpress**) and **keyboard** (**Alt** + **Down arrow**, per [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press)). Keep that text out of the **name**. **Prefer** a **split button** instead (see **Overview** and **Hold affordance**). |

### Shadow DOM and cross-root ARIA Issues

**Deferred:** **`aria-labelledby`** and **`aria-describedby`** that reference **IDs** in **light DOM** while the **button** role lives in **shadow DOM** stay **deferred** for the same **`ElementInternals`** + **axe-core** reasons as **`swc-button`** — track **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** and [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **Shadow DOM** subsection.

**Narrower exception:** Help text for **MenuTrigger** / **hold** instructions **authored in the same shadow root** as the inner **`<button>`** can pair **`aria-describedby`** without crossing into **light DOM**—use that pattern when product insists on a **single** surface, while still pushing **split button** as the **default** recommendation.

### Form-associated buttons (`submit` / `reset`) — deferred

**Deferred:** Same platform and tooling dependencies as **`swc-button`** for **`type="submit"`** / **`type="reset"`** on an internal **`<button>`** inside a custom element. Ship **`type="button"`** for initial **`swc-action-button`** scope unless **`ElementInternals`** + **axe-core** story matures — see [SWC-48](https://jira.corp.adobe.com/browse/SWC-48).

### Accessibility tree expectations

**`swc-action-button` (default)**

- **Role:** **button**; **name** from visible label, **`label`**, or **`aria-label`** on the focus target (full **`aria-labelledby`** / **`aria-describedby`** from light DOM deferred—see **Shadow DOM**).
- **State:** native **`disabled`** when unfocusable; **`aria-disabled="true"`** when **pending** / busy but **still focusable** ([SWC-459](https://jira.corp.adobe.com/browse/SWC-459)); **`aria-busy`** only if product defines it.

**Pending state**

- Tree still shows **button**; **pending** uses **`aria-disabled="true"`** + focusable inner **`<button>`**, plus **visual** loading and **name** / **live region**—not a nested **progressbar** masquerading as the control (**same** contract as **`swc-button`**).

**Toggle (`toggles` / `selected`)**

- **Role:** **button** with **`aria-pressed="true|false"`** for **independent** or **multi-select** toolbars. **Never** **radio** or **checkbox** roles on **`swc-action-button`**.

**Mutually exclusive segments**

- Implement with **`swc-segmented-control`** / **`swc-segmented-control-button`** (**radiogroup** semantics), not by re-typing **`swc-action-button`**.

**Menu / picker trigger**

- **button** with **`aria-haspopup`**, **`aria-expanded`** matching overlay visibility.

### Live regions, loading, and announcements

1st-gen **`sp-action-button`** does **not** ship a **pending** API; **Spectrum 2** still shows **pending** in the [Action button Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877). When 2nd-gen adds **async** / **busy** feedback, treat it **identically** to **`swc-button`** pending guidance:

- Align with [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (motion / indicator behavior) and team guidance: **behavior-based** announcements rather than prescribing exact SR phrasing; avoid **flooding** users when many regions update.
- **Prefer** updating the **button’s accessible name** or a **single** nearby **`role="status"`** over many parallel **`aria-live`** regions.
- **Do not** use **`aria-live="assertive"`** for loading.
- When motion is reduced, provide **slower** or **static** treatment per WCAG **2.2.2** and product capability (note any **gap** if reduced-motion is not yet implemented repo-wide).

See [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **Live regions** and **Pending** subsections for the canonical checklist; [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md) for why **`swc-progress-circle`** is **not** the inline **pending** graphic.

### Hold affordance and alternatives to synthesized longpress

**Terminology:** **Hold affordance** is how **design** typically refers to the timed press-and-hold interaction; **`longpress`** (event) and **`hold-affordance`** (attribute) are the **1st-gen** engineering names for the same idea.

1. **Design + a11y decision:** Replace or demote **synthesized `longpress`** as the **primary** secondary-action channel. Options to evaluate with design: **“more” menu**, **split control**, **visible chevron** already used elsewhere in Spectrum, or **settings** surface where the action is discoverable without timing.
2. **Prefer split buttons for menu + action:** For **MenuTrigger**-class UX (**default** press vs **menu**), a **split button**—**separate** **buttons** for the **primary** action and for opening the **menu**—is **much more accessible** than one combined control (**required** callout in **Storybook** consumer docs per **Overview**). Document **split** patterns in Storybook and product specs **before** single-surface **longpress** layouts.
3. **React Aria long-press parity:** [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) and [React Spectrum `MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html) document **Alt** + **Down arrow** (and related keys) so **keyboard** users can open the **menu** without **longpress**—mirror that contract if SWC ships a **MenuTrigger**-like API.
4. **`aria-describedby` for instructions:** When a **single** surface still exposes **longpress** (or equivalent), it is **important** to add **`aria-describedby`** so **screen reader** users hear how to reach the **menu**, **especially on touch** where **longpress** is not discoverable. Wire **`aria-describedby`** to **concise** help (see **Shadow DOM** for same-root **ID** pairing vs **deferred** cross-root cases).
5. **Align with React Spectrum ActionButton:** [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton) documents **focusable** behavior, **keyboard** activation, and **React Aria** **press** hooks (`onPress`, `onPressStart`, `onPressEnd`)—prefer **documented**, **testable** **press** and **key** contracts for integrators instead of **hold-only** behavior.
6. **Tooltip and overlay alignment:** If **tooltips** use **`longpress`** on touch, that stacks poorly with **hold-affordance** on the same control class—see [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md) (**Pointer gestures**, **Interaction**). Prefer **focus** + **hover** descriptions and **explicit** disclosure patterns for touch.
7. If a **timed** gesture remains for **backward compatibility**, document a **single-pointer** alternative, **keyboard** parity (**Alt** + **Down arrow** per [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press)), **`aria-describedby`** instructions, and still steer authors toward **split** **buttons** where possible.

### Keyboard and focus

- **Tab** lands on the **inner** **`<button>`** (or delegated equivalent). **Enter** / **Return** or **Space** activates the **primary** action ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)). When **`aria-disabled="true"`** (**pending**), follow platform / **React**-style convention: **no** activation until work completes—document in Storybook (**same** as **`swc-button`**).
- **Popup triggers:** **Space** / **Enter** open; **Arrow** keys follow **APG** for the attached widget; **Escape** closes and returns focus per overlay rules.
- **MenuTrigger / longpress-style menu:** If product aligns with [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) and [React Spectrum `MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html), document **Alt** + **Down arrow** as the **keyboard** path to open the **menu** (in addition to any **longpress** path) and verify it in [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx).
- **1st-gen hold keyboard path** (**Space** or **Alt** + **Down arrow** hold, release fires **`longpress`**): any 2nd-gen carryover must be **documented**, **tested** with **screen readers**, paired with **`aria-describedby`** instructions where a **single** surface remains, and **paired** with non-timed alternatives per [Hold affordance and alternatives to synthesized longpress](#hold-affordance-and-alternatives-to-synthesized-longpress).
- **`swc-action-group`:** **Arrow** navigation and **roving `tabindex`** should respect **`role="group"`** on **`swc-button-group`** and any outer **`toolbar`** contract; align keyboard tables with [Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and the [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/).

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Inner **`<button>`**; **host** without duplicate **`role="button"`** when delegating; **`aria-pressed`** / **`aria-expanded`** toggles; **no** **`href`**; **no** **`role="radio"`** / **`role="checkbox"`**; **pending** uses **`aria-disabled="true"`** + focusable button (no mistaken **`role="progressbar"`** on the inline spinner). |
| **aXe + Storybook** | Default, **disabled**, **pending** (when implemented), **quiet**, **static** color, **icon-only** (named), **toggle**, **`swc-action-group` + `swc-button-group` (`role="group"`)**, **menu trigger**, and **`swc-segmented-control`** stories. Include **keyboard focus** and **pressed** states even though they are **out of scope** for the [Action button Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877) artboard. |
| **Playwright ARIA snapshots** | **`role="button"`** on **`swc-action-button`**; **`role="group"`** on **`swc-button-group`**; **`role="toolbar"`** only where the outer contract intends it; **`aria-pressed`** for toggles; **pending** shows **`aria-disabled`** + focusable pattern per spec; **`aria-describedby`** present when **hold** / **MenuTrigger**-style help is required; **radiogroup** semantics on **`swc-segmented-control`** only; assert **absent** **radio**/**checkbox** roles on **`swc-action-button`**. |
| **Playwright keyboard** | **Enter** / **Space**; **pending** blocks activation when **`aria-disabled`** applies; menu trigger keys; **Alt** + **Down arrow** where **MenuTrigger**-style behavior is implemented; **Escape** with overlays. |
| **Screen reader** | **`aria-describedby`** resolves; instructions mention **longpress** and **keyboard** paths on **touch**-relevant stories; **pending** name / **polite** status announcements. |
| **Contrast / focus** | **Pending** icon + label meet **non-text** / **focus visible** where applicable (align with **[SWC-1369](https://jira.corp.adobe.com/browse/SWC-1369)** **WHCM** concerns when **pending** ships). |
| **Overlay + Tooltip** | Regression for **[SWC-321](https://jira.corp.adobe.com/browse/SWC-321)** — overlay dismiss must **not** activate **`swc-action-button`** underneath. |

---

## Summary checklist

- [ ] **No `href`** or anchor proxy on **`swc-action-button`**; navigation via **`<a href>`** / design-system link patterns ([SWC-227](https://jira.corp.adobe.com/browse/SWC-227)).
- [ ] **Focus** on inner **native** **`<button>`** with **delegation**; **no** misleading **host-only** button semantics.
- [ ] **Role** remains **`button`** only—**no** **`role="radio"`** or **`role="checkbox"`** on **`swc-action-button`**; **exclusive** UX on **`swc-segmented-control`** / **`swc-segmented-control-button`**; **`swc-button-group`** inside **`swc-action-group`** **always** **`role="group"`**; **`toolbar`** on the **outer** parent per [APG Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) (document divergence from **React Spectrum** **`toolbar`** placement if any).
- [ ] **Toggle** / **group** / **menu** states: correct **`aria-pressed`**, **`aria-expanded`**, **`aria-haspopup`** combinations.
- [ ] **Pending** (when implemented): **`aria-disabled="true"`** on the inner **`<button>`**, **still focusable**—align with **[SWC-459](https://jira.corp.adobe.com/browse/SWC-459)** and **`swc-button`**; **animated icon**, not **`swc-progress-circle`**; **polite** / **status** announcements; **no assertive** live region for default loading; **WHCM** / contrast for **pending** chrome (**[SWC-1369](https://jira.corp.adobe.com/browse/SWC-1369)**).
- [ ] **Reduced motion** / delay-before-show called out in docs where implementation exists (parity with **`swc-button`**).
- [ ] **Hold** / **secondary** actions: **Storybook** consumer docs **must** call out **split button** vs **longpress** (**Overview**); if a **single** surface remains, **`aria-describedby`** per [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) / [React Spectrum `MenuTrigger`](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html) (**Alt** + **Down arrow**, **touch** + **keyboard**); align **press** / **key** events with [React Spectrum `ActionButton`](https://react-spectrum.adobe.com/ActionButton) where applicable.
- [ ] **Tooltip** / **overlay** stacking: no **click-through** to trigger ([SWC-321](https://jira.corp.adobe.com/browse/SWC-321)); align with [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md).
- [ ] Cross-links to [Action button migration roadmap](./rendering-and-styling-migration-analysis.md), [Spectrum 2 — Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877), [Button accessibility migration analysis](../button/accessibility-migration-analysis.md), [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery), and [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md) when **pending** is in scope.
- [ ] **Focus** / **pressed** states validated in code and Storybook (not only Figma—see **Spectrum 2 design file vs coded accessibility**).
- [ ] **`aria-labelledby`** / **`aria-describedby`** across light + shadow: **deferred** for **light-DOM** → **shadow** **ID** refs per **`swc-button`** until **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** + tooling path is clear; **same-shadow** **`aria-describedby`** for **hold** / **menu** instructions is **in scope** when documented (see **Shadow DOM**).
- [ ] **`submit`** / **`reset`**: **deferred** like **`swc-button`** until **`ElementInternals`** story matures.

---

## References

- [WAI-ARIA APG: Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Toolbar pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) and [Toolbar example](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/examples/toolbar/) (`role="group"` for **Copy / Cut / Paste**, **`toolbar`** on parent)
- [WAI-ARIA APG: Radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) (for **`swc-segmented-control`**)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Spectrum 2 — Web (desktop scale): Action button (Figma)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=702-2877) (visual spec; **focus** / **pressed** implemented in code only)
- [React Spectrum: ActionButton](https://react-spectrum.adobe.com/ActionButton)
- [React Spectrum: MenuTrigger](https://react-spectrum.adobe.com/react-spectrum/MenuTrigger.html)
- [React Aria: Menu — long press](https://react-aria.adobe.com/Menu#long-press) (**hold affordance**, **Alt** + **Down arrow**, **`aria-describedby`**)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Link accessibility migration analysis](../link/accessibility-migration-analysis.md) (`href` proxy and double-activation context, [SWC-923](https://jira.corp.adobe.com/browse/SWC-923))
- [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md)
- [Action button migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (**pending** / loading UX; same bar as **`swc-button`**)
- [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md) (contrast with **pending** icon on **`swc-action-button`**)
- [spectrum-web-components PR #6120 — core migration; `like-anchor.ts` not moved](https://github.com/adobe/spectrum-web-components/pull/6120)
