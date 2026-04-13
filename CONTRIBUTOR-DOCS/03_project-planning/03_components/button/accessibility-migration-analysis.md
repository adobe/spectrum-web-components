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
- [Recommendations: `<swc-button>` and `<swc-link-button>`](#recommendations-swc-button-and-swc-link-button)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Form-associated buttons (`submit` / `reset`)](#form-associated-buttons-submit--reset)
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

This doc describes how **`swc-button`** and a dedicated **`swc-link-button`** (or equivalent) should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. It separates **actions** (`<button>` semantics) from **navigation** (`<a href>` semantics), avoids the 1st-gen **proxy-click** pattern on a synthetic link, and aligns **pending / loading** treatment with Spectrum loading guidance ([Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery)) and internal **general / accessibility guidance** for loading indicators (delay before show, determinate vs indeterminate, placement, status announcements, and motion).

**Shared infra:** [spectrum-web-components#6120](https://github.com/adobe/spectrum-web-components/pull/6120) proposes moving mixins and utilities into **`@spectrum-web-components/core`** and **not** migrating **`like-anchor.ts`** (`LikeAnchor`); the PR documents that mixin as **removed**, with anchor-like properties added **directly** on components that still need them. That direction matches this doc: **no** shared **`LikeAnchor`** layer that merges button and link on one host—use **native** `<button>` vs **native** `<a>` (or **`swc-link-button`**) instead.

### Also read

[Button migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM. For **read-only** circular progress semantics (not inline button loading), see [Progress circle accessibility migration analysis](../progress-circle/accessibility-migration-analysis.md).

### What it is

- **`swc-button`:** A **commit control** for in-page actions: submits, opens dialogs, toggles UI, etc. The **custom element host must not** take **`role="button"`** or act as the tab stop: it should **delegate focus** to a **real** `<button>` inside shadow DOM (or slotted light DOM) so the **`<button>`** is what assistive technologies see and what receives **Tab** focus—same idea as **`swc-link-button`** delegating to `<a>`. Alternatively, **CSS-only** Spectrum button appearance on a native `<button>` / `<input type="submit">` without a misleading host role.
- **`swc-link-button`:** Spectrum-styled **navigation** to another URL or route. The **host must not** take **`role="link"`** while hiding the real anchor: expose a **native** `<a href="…">` as the **focus target** (typically shadow + **delegates focus** to that anchor), or **CSS-only** button typography on a native `<a class="…">` without a wrapper component.
- **Either** interactive surface can also be delivered as **CSS-only typography** on native elements when global / token styles are sufficient—accessibility then comes entirely from correct **native** roles and attributes.

### When to use something else

- **Toolbar / action strip** semantics may fit [Action button](../action-button/rendering-and-styling-migration-analysis.md) patterns when the design system splits “action” from default button.
- **Compact field adornments** → [In-field button](../infield-button/rendering-and-styling-migration-analysis.md).
- **Plain hypertext** without button chrome → [Link](../link/rendering-and-styling-migration-analysis.md) or native `<a>`.

### What it is not

- **Not a single component** that is both “button” and “link” by toggling `href` on the same host while faking activation: that pattern led to **proxy** `click()` on a hidden anchor and mixed **focus** / **screen reader** models in 1st-gen (see citations below).
- **Not a disabled link:** `<a>` cannot be **semantically** disabled; do not rely on `aria-disabled` on a link to remove it from interaction—use **different** UX (remove `href`, use a real **button**, or show a **non-interactive** message).
- **Not `role="progressbar"`** on the control surface for **pending** work: a **progress circle** carries **different** meaning (unknown or known **task** progress). For “button is busy,” use an **animated progress icon** (decorative or labeled icon treatment) plus **name / live region** guidance below—not **`swc-progress-circle`** inside the label.

---

## ARIA and WCAG context

### Pattern in the APG

- [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — keyboard activation, **`aria-pressed`** when toggling, **`aria-expanded`** when controlling a popup; ensure a **discernible name**.
- [Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) — navigation with **Enter** / **Return** only (native links do **not** activate with **Space**); focusable element with **href**; name from visible text or **`aria-label`** when needed. See [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) (Storybook accessibility guides).
- Prefer **native** `<button>` and `<a href>` so the browser supplies **context menu**, **modifier+click**, **middle-click**, **long-press**, and **reader** defaults without reimplementation.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **Role**, **name**, and state on the **focused** `<button>` / `<a>` (`disabled` on button; link **not** semantically disabled)—**not** duplicated on the **`swc-*`** host with **`role="button"`** / **`role="link"`**. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **`<button>`:** **Enter** / **Return** or **Space** activates. **`<a href>`:** **Enter** / **Return** only—**not** Space. Match native behavior; do not trap focus or drop keys because of proxy handlers. Details: [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring must follow the **actual** focused node (the `<button>` or the **real** `<a>`). |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Hit targets for primary actions should meet **minimum target size** unless an exception applies. |
| [Pause, stop, hide (WCAG 2.2.2)](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | **Loading animation** on the control should respect **reduced motion** where the platform supports it; align with Spectrum motion tokens and product guidance. |
| Loading UX (Spectrum / design guidance) | **~100 ms delay** before showing a progress indicator to avoid **flicker** on fast operations; place the indicator **near** the content it represents. |
| Initiating control during load (Spectrum / design guidance) | The control that **started** the operation should **remain understandable** in assistive tech: **do not** mark it **`disabled="true"`** merely to block repeats if that would **hide** the current **pending** state from users who still need to land on that control; prefer **visual** pending styling, **in-label** pending text or icon, and/or **programmatic** status elsewhere per pattern. |

**Bottom line:** **`swc-button`** = real **button** semantics; navigation = **`swc-link-button`** or native **`<a>`** with focus on that surface—**no** hidden-anchor **proxy** `click()`. **Pending** = **animated icon** + careful **announcements**, not a **progressbar** inside the action.

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

1st-gen builds link behavior with **`LikeAnchor`** (`like-anchor.ts`); [#6120](https://github.com/adobe/spectrum-web-components/pull/6120) proposes **dropping** that mixin from the shared → core migration and inlining anchor concerns only where needed—2nd-gen **`swc-button`** / **`swc-link-button`** should **not** revive **`LikeAnchor`** as the way to combine both models.

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

## Recommendations: `<swc-button>` and `<swc-link-button>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **`swc-button` — native mapping** | Render a **real** `<button type="button|submit|reset">` (correct `type`). The **host must not** have **`role="button"`** or be the primary tab stop: use **`delegatesFocus: true`** (or an equivalent pattern) so **focus** and **activation** land on the **internal** `<button>`. Do **not** hide a focusable `<button>` behind a host that pretends to be the button. |
| **`swc-link-button` — native mapping** | Render a **real** `<a href="…">` as the **focused** element (e.g. shadow anchor + **`delegatesFocus`** on the custom element—exact wiring is an implementation detail). **Host** must **not** carry **`role="link"`** while the real anchor is inert. Mirror **`download`**, **`rel`**, **`target`**, **`hreflang`** on that anchor. |
| **No `href` on `swc-button`** | Do **not** recreate 1st-gen **`href` on `<sp-button>`**. Authors choose **button** *or* **link** component / native element. |
| **`aria-disabled` on `<button>`** | Only when intentionally using **disabled semantics** that still allow **focus** (rare); prefer native **`disabled`** when the control should not be in tab order. Document differences in Storybook. |
| **Links and “disabled”** | Do **not** document **`aria-disabled`** on links as “disabled link”—**links are not semantically disabled**. Use a **button**, remove **`href`**, or change copy. |
| **Pending / loading (visual)** | Use an **animated progress icon** (e.g. looping SVG) **without** **`role="progressbar"`** on that graphic unless it truly represents **measurable** progress. **Do not** embed **`swc-progress-circle`** for button pending—that component is for **progressbar** semantics ([progress circle a11y doc](../progress-circle/accessibility-migration-analysis.md)). |
| **Pending / loading (name)** | Keep the control **named**: update **visible** label (“Saving…”), **`aria-label`**, or **`aria-labelledby`** so the **accessible name** reflects **in-progress** when helpful. Prefer **specific** strings (“Uploading document…”) over generic “Loading” when context allows (per loading a11y guidance). |
| **External completion / errors** | For status that completes **outside** the button surface, use **`role="status"`** or **`aria-live="polite"`** on a **single** concise region; **never** **`aria-live="assertive"`** for routine loading. Consolidate duplicate loaders to **one** announcement. Treat **`aria-busy`** on the icon wrapper as **usually unnecessary** if you are not mirroring a **document-level** busy region. |
| **Icon-only** | **`aria-label`** on the **button** (or **link**) when there is no visible text; decorative spinner **`aria-hidden="true"`** if the **name** already conveys pending. |

### Shadow DOM and cross-root ARIA Issues

**`aria-labelledby`** and **`aria-describedby`** use **ID references** that **do not** cross **shadow root** boundaries, so light DOM cannot use **`aria-labelledby`** / **`aria-describedby`** to reference **`id`** attributes that exist only inside shadow to name the **internal** `<button>` / `<a>`. The **host** must **surface** properties and/or reflected **`aria-*`** (for example **`label`**, **`aria-label`**, **`aria-describedby`**) that the implementation **maps onto** the shadow `<button>` or `<a>` (for example via **`ElementInternals`**, slot mirroring, or internal **`aria-labelledby`** when both ends of the reference sit in the **same** shadow tree). For **form-associated** **`submit`** / **`reset`** and **`ElementInternals`**, also follow **Form-associated buttons** below and the forthcoming team note tied to [SWC-48](https://jira.corp.adobe.com/browse/SWC-48).

**`swc-button`** and **`swc-link-button`** hosts should **not** expose **`role="button"`** / **`role="link"`** while the real control is **`aria-hidden`** or unfocusable—1st-gen hid the anchor and set **`role="link"`** on the host, which breaks native link behavior; avoid the same for **`<button>`**.

### Form-associated buttons (`submit` / `reset`)

**`ElementInternals`** is the platform path for **form-associated custom elements** (including **`type="submit"`** and **`type="reset"`** on an internal `<button>`). **axe-core** and related **accessibility tooling** still have **gaps or inconsistent** support for some **`ElementInternals`** scenarios, which complicates automated rules and CI.

**Team recommendation (pending):** Spectrum Web Components will publish a **single, explicit recommendation** for how we handle **form-associated** controls—especially **submit** and **reset** buttons in **`swc-button`** (and siblings)—so authors and tests share one approach until tooling matures. **Track** [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) (ElementInternals / FACE RFC). When the recommendation lands, **link it from this doc** and from Storybook; until then, treat **`submit`** / **`reset`** as **high-visibility** cases for **manual** verification and **documented** patterns.

### Accessibility tree expectations

**`swc-button`**

- Role: **button**; name from subtree, **`aria-label`**, or **`aria-labelledby`**.
- State: **`disabled`** or valid **`aria-disabled`** pattern per docs; **`aria-busy`** only if product defines it.

**`swc-link-button`**

- **Host:** No **`role="link"`** substituting for the anchor.
- **Internal `<a>`:** Role **link**; **`name`** from visible text or **`aria-label`**; **`href`** exposed.
- Focus: the **anchor** receives **Tab** focus (delegation), not an inert wrapper.

**Pending state**

- Tree shows **button** or **link** still (unless replaced by different control); pending is **visual** + **name** / **live region**, not a nested **progressbar** masquerading as the control.

### Live regions, loading, and announcements

- Align with [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and team guidance: **behavior-based** announcements rather than prescribing exact SR phrasing; avoid **flooding** users when many regions update.
- **Prefer** updating the **button’s accessible name** or a **single** nearby **`role="status"`** over many parallel **`aria-live`** regions.
- **Do not** use **`aria-live="assertive"`** for loading.
- When motion is reduced, provide **slower** or **static** treatment per WCAG **2.2.2** and product capability (note any **gap** if reduced-motion is not yet implemented repo-wide).

### Keyboard and focus

- **`swc-button`:** Keys apply to the **focused** **`<button>`** (after delegation): **Enter** / **Return** **or** **Space** activates ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)).
- **`swc-link-button`:** Keys apply to the **focused** **`<a>`**: **Enter** / **Return** only—**Space** must **not** activate the link.
- **Tab order:** One **logical** control per appearance; **Tab** stops on the **internal** native control (or its delegated equivalent), with focus ring on that node.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | **`swc-button`** renders **`<button>`** with **focus delegation**; **host** lacks **`role="button"`**; **`swc-link-button`** exposes **link** + **`href`** on the focused **`<a>`**; **no** `aria-hidden` on the active anchor; pending does **not** set **`role="progressbar"`** on the inline spinner. |
| **aXe + Storybook** | WCAG 2.x rules on default, **disabled**, **pending**, and **icon-only** stories for both components. |
| **Playwright ARIA snapshots** | **Button** role and name; **Link** role and name; pending stories show **name** / **busy** treatment per spec. |
| **Playwright keyboard** | **Tab** lands on **button** vs **link** correctly; **Enter** / **Return** and **Space** on **button**; **Enter** / **Return** only on **link** (**Space** does nothing / must not navigate). |
| **Contrast / focus** | Pending icon + label meet **non-text** / **focus visible** where applicable. |

---

## Summary checklist

- [ ] **`href`** removed from **`swc-button`**; **`swc-link-button`** (or documented native-`<a>` CSS path) owns navigation; **no** revival of shared **`LikeAnchor`** for the split (see [#6120](https://github.com/adobe/spectrum-web-components/pull/6120)).
- [ ] **No proxy** `anchorElement.click()` from a **custom element** that is not the focused **link**; **hosts** do **not** use **`role="button"`** / **`role="link"`**; **focus** targets **native** `<button>` / `<a>` (delegation).
- [ ] **Link** docs state **no semantic disabled**; patterns for “unavailable navigation” documented without **`aria-disabled`** on `<a>`.
- [ ] **Pending** uses **animated icon**, not **`swc-progress-circle`**; announcements follow **polite** / **status** guidance; **no assertive** live region for default loading.
- [ ] **Initiating button** guidance: pending UX does **not** rely on **`aria-disabled="true"`** on the trigger if that would **block** understanding of in-flight work (align with design guidance).
- [ ] **Reduced motion** / delay-before-show called out in docs where implementation exists.
- [ ] Cross-links to [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and [button rendering roadmap](./rendering-and-styling-migration-analysis.md).
- [ ] Keyboard behavior matches [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx): **button** = Enter/Return or Space; **link** = Enter/Return only.
- [ ] **Form-associated** **`submit`** / **`reset`**: implement and document per the team **`ElementInternals`** / tooling recommendation once published ([SWC-48](https://jira.corp.adobe.com/browse/SWC-48)).

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
