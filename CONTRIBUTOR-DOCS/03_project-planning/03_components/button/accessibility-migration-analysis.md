<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Button / Button accessibility migration analysis

<!-- Document title (editable) -->

# Button accessibility migration analysis

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
- [1st-gen implementation notes (avoid in 2nd-gen)](#1st-gen-implementation-notes-avoid-in-2nd-gen)
- [Recommendations: `<swc-button>`](#recommendations-swc-button)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated buttons (`submit` / `reset`) — deferred](#form-associated-buttons-submit--reset--deferred)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Keyboard and focus](#keyboard-and-focus)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc describes how **`swc-button`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. **Navigation** uses **`swc-link`**, **native `<a href>`**, or Spectrum global styling on anchors—not a button-with-**`href`**. In 1st-gen, **`href`** on **`<sp-button>`** was **deprecated** with a migration warning; 2nd-gen **continues** that direction: **do not** ship a **link button** or revive **`href`** on the button component. **Pending / loading** treatment aligns with Spectrum loading guidance ([Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)) and internal **general / accessibility guidance** for loading indicators (delay before show, determinate vs indeterminate, placement, status announcements, and motion).

**Shared infra:** [spectrum-web-components#6120](https://github.com/adobe/spectrum-web-components/pull/6120) proposes moving mixins and utilities into **`@spectrum-web-components/core`**. **`swc-button`** does **not** need **`like-anchor.ts`** (`LikeAnchor`)—that mixin existed to bolt **anchor** behavior onto controls that already looked like buttons; **`swc-button`** is **only** a **`<button>`**, and navigation stays on **`swc-link`** / **`<a>`**.

### Also read

[Button migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM. For **read-only** circular progress semantics (not inline button loading), see [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md).

### What it is

- **`swc-button`:** A **commit control** for in-page actions: submits, opens dialogs, toggles UI, etc. The **custom element host must not** take **`role="button"`** or act as the tab stop: it should **delegate focus** to a **real** `<button>` inside shadow DOM (or slotted light DOM) so the **`<button>`** is what assistive technologies see and what receives **Tab** focus. Alternatively, **CSS-only** Spectrum button appearance on a native `<button>` without a misleading host role.
- **Navigation** (another URL or route): use **`swc-link`**, a **native `<a href>`**, or Spectrum **global element** styles on anchors—not **`href`** on **`swc-button`** (deprecated in 1st-gen and **not** returning in 2nd-gen).
- **CSS-only** Spectrum typography on **native** `<button>` / `<a>` is fine when global / token styles are sufficient—accessibility comes from correct **native** roles and attributes.

### When to use something else

- **Toolbar / action strip** semantics may fit [Action button](../action-button/rendering-and-styling-migration-analysis.md) patterns when the design system splits “action” from default button.
- **Compact field adornments** → [In-field button](../infield-button/rendering-and-styling-migration-analysis.md).
- **Plain hypertext** without button chrome → [Link](../link/rendering-and-styling-migration-analysis.md) or native `<a>`.

### What it is not

- **Not any kind of link:** **`swc-button`** must **only** expose **`<button>`** semantics—**not** **`href`**, **not** **`role="link"`**, **not** anchor activation or **`LikeAnchor`** hybrids. 1st-gen **`href`** on **`<sp-button>`** was **deprecated** for that reason; 2nd-gen does **not** bring it back. Use **`swc-link`** or **native `<a>`** for navigation.
- **Not `role="progressbar"`** on the control surface for **pending** work: a **progress circle** carries **different** meaning (unknown or known **task** progress). For “button is busy,” use an **animated progress icon** (decorative or labeled icon treatment) plus **name / live region** guidance below—not **`swc-progress-circle`** inside the label.

---

## ARIA and WCAG context

### Pattern in the APG

- [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — keyboard activation, **`aria-pressed`** when toggling, **`aria-expanded`** when controlling a popup; ensure a **discernible name**.
- [Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) — applies to **`swc-link`** and native **`<a>`** (**not** **`swc-button`**): **Enter** / **Return** only (native links do **not** activate with **Space**); name from visible text or **`aria-label`** when needed. See [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx).
- Prefer **native** `<button>` and `<a href>` so the browser supplies **context menu**, **modifier+click**, **middle-click**, **long-press**, and **reader** defaults without reimplementation.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Role**, **name**, and state on the **focused** native **`<button>`** inside **`swc-button`**—**not** duplicated on the **host** with **`role="button"`**. For links, semantics live on **`swc-link`** / **`<a>`**. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **`swc-button`:** **Enter** / **Return** or **Space** on the inner **`<button>`**. **Links:** **Enter** / **Return** only. Match native behavior. Details: [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring follows the **inner** **`<button>`** (after delegation). |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Hit targets for primary actions should meet **minimum target size** unless an exception applies. |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | **Loading animation** on the control should respect **reduced motion** where the platform supports it; align with Spectrum motion tokens and product guidance. |
| Loading UX (Spectrum / design guidance) | **~100 ms delay** before showing a progress indicator to avoid **flicker** on fast operations; place the indicator **near** the content it represents. |
| **Pending** control during load ([SWC-459](https://jira.corp.adobe.com/browse/SWC-459)) | Use **`aria-disabled="true"`** on the inner **`<button>`** while keeping it **focusable** (do **not** use native **`disabled`** if that would drop the control from the path users need). This matches common **React** loading-button behavior and keeps the initiating control **discoverable** while signaling **not** actionable—pair with visible pending styling and **name** / live-region guidance below. |

**Bottom line:** **`swc-button`** = real **button** semantics only; **no** **`href`** / link-button hybrid (**deprecated** in 1st-gen, unchanged in intent for 2nd-gen). **Pending** = **`aria-disabled`** + **focusable** + **animated icon** + careful **announcements**, not a **progressbar** inside the action. **`aria-labelledby`** / **`aria-describedby`** across light and shadow DOM and **form-associated** **`submit`** / **`reset`** are **deferred** until **`ElementInternals`** and **axe-core** line up—see sections below.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage.

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1617](https://jira.corp.adobe.com/browse/SWC-1617) | Bug | To Do | — | `sp-button` disabled state has insufficient contrast between text and background |
| [SWC-1139](https://jira.corp.adobe.com/browse/SWC-1139) | Bug | To Do | — | Control text lacks 4.5:1 contrast on hover or focus — `sp-button` (Outline, white) |
| [SWC-1179](https://jira.corp.adobe.com/browse/SWC-1179) | Bug | To Do | — | Text content lacks 4.5:1 contrast — `sp-button` (Outline, white) |
| [SWC-1333](https://jira.corp.adobe.com/browse/SWC-1333) | Bug | To Do | — | `sp-button` does not support `aria-label` |
| [SWC-1369](https://jira.corp.adobe.com/browse/SWC-1369) | Bug | To Do | — | `Pending` button not visible in WHCM |
| [SWC-459](https://jira.corp.adobe.com/browse/SWC-459) | Bug | To Do | — | `Pending` button has accessibility issues |
| [SWC-598](https://jira.corp.adobe.com/browse/SWC-598) | Epic | Research | — | Consider refactoring ButtonBase, Action Button, and Button |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | To Do | — | ElementInternals RFC — form-associated custom elements (related to control semantics) |
| [SWC-1255](https://jira.corp.adobe.com/browse/SWC-1255) | Bug | Done | Fixed | Pending state controller uses semantically incorrect progress circle |
| [SWC-1119](https://jira.corp.adobe.com/browse/SWC-1119) | Bug | Done | Fixed | Progress circle missing appropriate role/attributes — `sp-button` (Pending) |
| [SWC-1114](https://jira.corp.adobe.com/browse/SWC-1114) | Bug | Done | Fixed | Icon lacks 3:1 contrast — `sp-button` (Outline, white) |
| [SWC-1185](https://jira.corp.adobe.com/browse/SWC-1185) | Bug | Done | Duplicate | Focus indicator lacks 3:1 contrast — `sp-button` (Outline, white) |
| [SWC-227](https://jira.corp.adobe.com/browse/SWC-227) | Bug | Done | Fixed | Action-button with `href` cannot be activated by screen reader |
| [SWC-1092](https://jira.corp.adobe.com/browse/SWC-1092) | Story | Done | Done | Author Buttons as Links RFC |
| [SWC-1093](https://jira.corp.adobe.com/browse/SWC-1093) | Story | Done | Done | Buttons as Links RFC Review |

---

## 1st-gen implementation notes (avoid in 2nd-gen)

1st-gen built **link-like** behavior with **`LikeAnchor`** (`like-anchor.ts`) and deprecated **`href`** on **`<sp-button>`**; [#6120](https://github.com/adobe/spectrum-web-components/pull/6120) proposes **dropping** that mixin from the shared → core migration. 2nd-gen **`swc-button`** should **not** revive **`LikeAnchor`** or **`href`** on the button.

1st-gen **`ButtonBase`** documents **“Click HTML anchor element by proxy”** and wires **`aria-hidden="true"`** on the shadow anchor while toggling **`role="link"`** on the host—combine that with host **`tabindex="0"`** and **`focusElement`** returning **`this`**, and navigation / assistive tech no longer match a **single native** surface:

```53:56:1st-gen/packages/button/src/ButtonBase.ts
   * HTML anchor element that component clicks by proxy
   */
  @query('.anchor')
  private anchorElement!: HTMLAnchorElement;
```

```116:126:1st-gen/packages/button/src/ButtonBase.ts
    if (this.anchorElement) {
      // Check if the click already went through the anchor element.
      // If so, the browser will handle navigation naturally and we
      // don't need to proxy the click (which would cause double navigation).
      const path = event?.composedPath() || [];
      if (path.includes(this.anchorElement)) {
        return false;
      }
      // Click HTML anchor element by proxy, but only for non-modified clicks
      this.anchorElement.click();
```

```141:149:1st-gen/packages/button/src/ButtonBase.ts
  public override renderAnchor(): TemplateResult {
    return html`
      ${this.buttonContent}
      ${super.renderAnchor({
        id: 'button',
        ariaHidden: true,
        className: 'button anchor',
        tabindex: -1,
      })}
    `;
  }
```

```237:245:1st-gen/packages/button/src/ButtonBase.ts
  private warnLinkAPIDeprecation(): void {
    if (window.__swc?.DEBUG) {
      const componentSlug =
        this.localName === 'sp-action-button' ? 'action-button' : 'button';
      window.__swc.warn(
        this,
        `The "href" attribute on <${this.localName}> is deprecated and will be removed in a future release. Use a native HTML anchor (<a>) element with Spectrum global element styling instead. Import "@spectrum-web-components/styles/global-elements.css" to enable button styling on native elements.`,
```

2nd-gen should **replace** this with **native-first** architecture as described above.

---

## Recommendations: `<swc-button>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`swc-button` — native mapping** | Render a **real** `<button>` (see **Form-associated buttons** for **`type`** scope). The **host must not** have **`role="button"`** or be the primary tab stop: use **`delegatesFocus: true`** (or an equivalent pattern) so **focus** and **activation** land on the **internal** `<button>`. Do **not** hide a focusable `<button>` behind a host that pretends to be the button. |
| **`href` not supported** | **`href`** on **`sp-button`** was **deprecated** in 1st-gen with a **`DEBUG`** warning; **`swc-button`** **does not** accept **`href`**. Authors use **`swc-link`**, **native `<a>`**, or global anchor styling for navigation—**no** link-button hybrid. |
| **`aria-disabled` on `<button>`** | For **pending** work, set **`aria-disabled="true"`** on the inner **`<button>`** and keep it **focusable** (**no** native **`disabled`** for that state unless product requires removing it from tab order). Align with **[SWC-459](https://jira.corp.adobe.com/browse/SWC-459)** and typical **React** loading-button behavior. Use native **`disabled`** when the control should **not** receive focus. Document both patterns in Storybook. |
| **Pending / loading (visual)** | Use an **animated progress icon** (e.g. looping SVG) **without** **`role="progressbar"`** on that graphic unless it truly represents **measurable** progress. **Do not** embed **`swc-progress-circle`** for button pending—that component is for **progressbar** semantics ([progress circle a11y doc](../progress-circle/accessibility-migration-analysis.md)). |
| **Pending / loading (name)** | Keep the control **named**: update **visible** label (“Saving…”), **`aria-label`**, or reflected **`aria-*`** mapped onto the shadow **`<button>`** when wiring exists. Prefer **specific** strings (“Uploading document…”) over generic “Loading” when context allows. Full **`aria-labelledby`** / **`aria-describedby`** from **light DOM** across shadow roots is **deferred**—see **Shadow DOM** below. |
| **External completion / errors** | For status that completes **outside** the button surface, use **`role="status"`** or **`aria-live="polite"`** on a **single** concise region; **never** **`aria-live="assertive"`** for routine loading. Consolidate duplicate loaders to **one** announcement. Treat **`aria-busy`** on the icon wrapper as **usually unnecessary** if you are not mirroring a **document-level** busy region. |
| **Icon-only** | **`aria-label`** on the **`<button>`** when there is no visible text; decorative spinner **`aria-hidden="true"`** if the **name** already conveys pending. |

### Shadow DOM and cross-root ARIA Issues

**Deferred:** **`aria-labelledby`** and **`aria-describedby`** rely on **ID references** that **do not** cross **shadow root** boundaries when the **button** role lives in shadow DOM and **labels** / **descriptions** use **`id`** in light DOM. A robust story needs **`ElementInternals`** (and related platform behavior) **and** **axe-core** / tooling support to match. Treat **cross-root labeling** as a **future** feature once those pieces align; until then do **not** promise host **`aria-labelledby`** / **`aria-describedby`** mirroring beyond what tests and axe can enforce—track **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)** and tooling updates.

### Form-associated buttons (`submit` / `reset`) — deferred

**Deferred:** **`type="submit"`** and **`type="reset"`** on an internal **`<button>`** depend on **`ElementInternals`** / **form-associated custom elements**. **axe-core** and related tooling still have **gaps** for some **`ElementInternals`** scenarios. Ship **`submit`** / **`reset`** behavior as a **future** enhancement once platform support and **axe-core** (and CI rules) have a clear story—same dependency as cross-root **`aria-*`** above. **Track** [SWC-48](https://jira.corp.adobe.com/browse/SWC-48). Until then, document that **`swc-button`** defaults to **`type="button"`** (or equivalent) for the initial scope.

### Accessibility tree expectations

**`swc-button`**

- Role: **button**; name from subtree or **`aria-label`** on the **internal** `<button>` (full **`aria-labelledby`** / **`aria-describedby`** from light DOM deferred—see **Shadow DOM**).
- State: native **`disabled`** when unfocusable; **`aria-disabled="true"`** when **pending** / busy but **still focusable** ([SWC-459](https://jira.corp.adobe.com/browse/SWC-459)); **`aria-busy`** only if product defines it.

**Pending state**

- Tree still shows **button**; pending uses **`aria-disabled="true"`** + focusable inner **`<button>`**, plus **visual** loading and **name** / **live region**—not a nested **progressbar** masquerading as the control.


### Live regions, loading, and announcements

- Align with [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and team guidance: **behavior-based** announcements rather than prescribing exact SR phrasing; avoid **flooding** users when many regions update.
- **Prefer** updating the **button’s accessible name** or a **single** nearby **`role="status"`** over many parallel **`aria-live`** regions.
- **Do not** use **`aria-live="assertive"`** for loading.
- When motion is reduced, provide **slower** or **static** treatment per WCAG **2.2.2** and product capability (note any **gap** if reduced-motion is not yet implemented repo-wide).

### Keyboard and focus

- **`swc-button`:** Keys apply to the **focused** **`<button>`** (after delegation): **Enter** / **Return** **or** **Space** activates ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)). When **`aria-disabled="true"`** (pending), follow platform / React-style convention: **no** activation until work completes—document in Storybook.
- **Links** (**`swc-link`** / native **`<a>`**): **Enter** / **Return** only—**Space** must **not** activate (see same keyboard guide).
- **Tab order:** One **logical** control per appearance; **Tab** stops on the **internal** **`<button>`**, with focus ring on that node.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | **`swc-button`** renders **`<button>`** with **focus delegation**; **host** lacks **`role="button"`**; pending uses **`aria-disabled="true"`** + focusable button (no mistaken **`role="progressbar"`** on the inline spinner). |
| **aXe + Storybook** | WCAG 2.x rules on default, **disabled**, **pending**, and **icon-only** **`swc-button`** stories. |
| **Playwright ARIA snapshots** | **Button** role and name; pending shows **`aria-disabled`** + focusable pattern per spec. |
| **Playwright keyboard** | **Enter** / **Return** and **Space** on **`swc-button`**; pending blocks activation when **`aria-disabled`** applies. Test **`swc-link`** / anchor separately for **Enter**-only activation. |
| **Contrast / focus** | Pending icon + label meet **non-text** / **focus visible** where applicable. |

---

## Summary checklist

- [ ] **No `href`** on **`swc-button`** (same deprecation stance as 1st-gen); navigation via **`swc-link`** / **native `<a>`**; **no** **`LikeAnchor`** revival (see [#6120](https://github.com/adobe/spectrum-web-components/pull/6120)).
- [ ] **Hosts** do **not** use **`role="button"`**; **focus** targets the internal **native** `<button>` (delegation).
- [ ] **Pending:** **`aria-disabled="true"`** on the inner **`<button>`**, **still focusable**—align with **[SWC-459](https://jira.corp.adobe.com/browse/SWC-459)** and **React**-style loading buttons; **animated icon**, not **`swc-progress-circle`**; **polite** / **status** announcements; **no assertive** live region for default loading.
- [ ] **Reduced motion** / delay-before-show called out in docs where implementation exists.
- [ ] Cross-links to [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and [button rendering roadmap](./rendering-and-styling-migration-analysis.md).
- [ ] Keyboard behavior matches [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx): **`swc-button`** = Enter/Return or Space; **links** tested on **`swc-link`** / `<a>`.
- [ ] **`aria-labelledby`** / **`aria-describedby`** across light + shadow DOM: **deferred** until **`ElementInternals`** + **axe-core** story is clear ([SWC-48](https://jira.corp.adobe.com/browse/SWC-48)).
- [ ] **`submit`** / **`reset`**: **deferred** until same **`ElementInternals`** + tooling path; document **`type="button"`** default for initial scope.

---

## References

- [WAI-ARIA APG: Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) — link vs button activation keys
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)
- [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md) (contrast with **pending icon**)
- [Button migration roadmap](./rendering-and-styling-migration-analysis.md)
- [spectrum-web-components PR #6120 — core migration; `like-anchor.ts` not moved](https://github.com/adobe/spectrum-web-components/pull/6120)
- [SWC-48 — ElementInternals / form-associated custom elements (Jira)](https://jira.corp.adobe.com/browse/SWC-48)
