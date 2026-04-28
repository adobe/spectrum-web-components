<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Popover / Popover accessibility migration analysis

<!-- Document title (editable) -->

# Popover accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What popover is (2nd-gen)](#what-popover-is-2nd-gen)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-popover>`](#recommendations-swc-popover)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Form-associated custom properties (labels, `ElementInternals`)](#form-associated-custom-properties-labels-elementinternals)
    - [Live regions, loading, and announcements](#live-regions-loading-and-announcements)
    - [Motion (dedicated recommendations subsection)](#motion-dedicated-recommendations-subsection)
    - [Keyboard and focus](#keyboard-and-focus)
    - [“Not focusable” (skill boilerplate)](#not-focusable-skill-boilerplate)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
    - [Playwright-only or host-only accessibility gates](#playwright-only-or-host-only-accessibility-gates)
    - [Manual and screen reader testing (mandatory, host alone)](#manual-and-screen-reader-testing-mandatory-host-alone)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This document sets accessibility expectations for 2nd-gen **Popover** in Spectrum Web Components: **shared popover styles** (visual layer only) and a **positioning host** (`swc-popover`, name TBD) for **anchor**-relative placement. **`swc-popover` is a container** for **listbox**, **menu**, **tooltip**, and similar **content**—**not** a **replacement** for those patterns. **ARIA** roles, states, and properties, **focus** management, and **keyboard** navigation are implemented by the **components that use** `swc-popover` (for example action menu, combobox, tooltip), not by the popover host. **Modal dialogs** use **shared popover styles** on the **dialog** **surface** when the design needs that **chrome**; they **do** **not** use the **`<swc-popover>`** **component** (that host is for **anchor**-positioned UI only: menus, combobox popups, tooltips, and similar). The target is **WCAG 2.2 Level AA**. Product alignment: [React Spectrum `Popover`](https://react-spectrum.adobe.com/Popover).

### Also read

[Popover migration roadmap](./rendering-and-styling-migration-analysis.md) for the 1st-gen / 2nd-gen split (styles vs positioning), deprecation, and consumer migration ([SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003)).

### What popover is (2nd-gen)

- **Popover styles** are a shared Spectrum visual layer (for example border, drop shadow, tip). They do not set ARIA or keyboard behavior.
- **`swc-popover`** is a **positioning container**: it applies those styles and anchored placement (for example [CSS anchor positioning](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning) and/or [Floating UI](https://floating-ui.com/)) around slotted content. It is not a **menu**, **listbox**, or **tooltip** by itself—those are the components or markup patterns you host inside it.
- **Consumers** of `swc-popover` (action menu, combobox, tooltip, and similar) **own** ARIA roles, states, and properties, **plus** focus management and keyboard navigation for their pattern; the popover host does not implement those.

### When to use something else

- **Modal dialog** (focus trap, `role="dialog"`, `aria-modal`) — use the [APG dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) on the appropriate nodes and any overlay or focus orchestration your stack provides. **Do** **not** use **`<swc-popover>`** for modals (no anchor-to-trigger placement). You **may** apply **shared** **popover** **styles** to the dialog **surface** when the design calls for that look.
- **Menu** or **combobox** popups — [APG menubutton](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/) or [APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/); the popover is only a positioned box you style with popover styles or place inside `swc-popover`.

### What it is not

- **Not** a menu, listbox, tooltip, or other APG widget in one tag—`swc-popover` is only a **container** and positioning **shell**; the components or author markup **inside** provide semantics and interaction.
- **Not** a full “accessible overlay in one import”: inert backdrops, open state, and focus orchestration are separate (app or higher-level primitives) unless a future doc specifies otherwise.
- **Not** a wholesale drop-in for every 1st-gen [overlay](../../../../1st-gen/packages/overlay/README.md) use. **Tooltips** are expected to adopt `swc-popover`-style anchoring instead of overlay-driven tooltip placement. **Action menu** (dropdown) and **combobox** (listbox popup) are planned **`swc-popover` host** call sites. **Modals** and **dialogs** use **shared** **popover** **styles** on the dialog surface, **not** the **`swc-popover` host** (see [roadmap — Planned consumers](./rendering-and-styling-migration-analysis.md#planned-consumers-2nd-gen) and [Overview](./rendering-and-styling-migration-analysis.md#overview)).

### Related

- 1st-gen [`sp-popover`](../../../../1st-gen/packages/popover/README.md) is primarily styling. Many call sites (for example Picker) set `role="presentation"` on the host and place ARIA on child content.
- 2nd-gen (planned, [roadmap — Planned consumers](./rendering-and-styling-migration-analysis.md#planned-consumers-2nd-gen)): **action menu** (dropdown), **combobox** (listbox), **tooltip** (replacing overlay-based positioning for that pattern). **Modal** / **dialog**: **shared** **popover** **styles** on the surface, **not** the **`swc-popover` host** (see [roadmap — Overview](./rendering-and-styling-migration-analysis.md#overview)).

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG “read me first”](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) model does not define a “popover” widget. Overlay **surfaces** are exposed to assistive technology through **dialog**, **listbox** / **menu** / **grid** popup, and other patterns plus their controlling widgets (for example [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)).
- **Name, role, and value** (WCAG 4.1.2) for the interactive experience come from slotted content and the trigger pattern, not from the unlabeled shell. See [Semantic HTML and ARIA (2nd-gen guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx).

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Non-text contrast (1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Shared popover **chrome** (border, tip, drop shadow) should be distinguishable on typical backgrounds. Do not reintroduce 1st-gen **placement** issues such as [SWC-917](https://jira.corp.adobe.com/browse/SWC-917) (RTL tip) in 2nd-gen. |
| [Focus order (2.4.3)](https://www.w3.org/WAI/WCAG22/Understanding/focus-order) and [focus visible (2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | The `swc-popover` host does not define tab order. **Modals and dialogs** (popover **styles** on the surface, no `swc-popover` host) and **combobox** / **menu** (with `swc-popover`) each follow their own **focus** pattern. |
| [Name, role, value (4.1.2)](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value) | Belongs in focusable, labeled content (listbox, menu, dialog body), not unlabeled chrome—whether that is the `swc-popover` host or a **modal** **surface** that only uses **shared** **popover** **styles**. |
| [Animation from interactions (2.3.3)](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) (if open or placement transitions) | If the layer adds entry/exit motion, respect `prefers-reduced-motion` (or equivalent). |

**Bottom line:** Shared popover **styles** and the **`swc-popover` host** cover **presentation** and **anchor** placement for **anchored** UIs. **Modals and dialogs** use **popover** **styles** on the **dialog** **surface** but **not** the **`swc-popover` host**—they are not positioned **relative to a trigger** like a **menu** or **tooltip**. Accessibility comes from the **pattern** and **content**; use [Keyboard testing (2nd-gen guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx) for the pattern you ship.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-933](https://jira.corp.adobe.com/browse/SWC-933) / [SWC-932](https://jira.corp.adobe.com/browse/SWC-932) | Bug | Blocked / To Do | Unresolved | Picker: arrow navigation in list when popover is the overlay |
| [SWC-917](https://jira.corp.adobe.com/browse/SWC-917) | Bug | To Do | Unresolved | Popover: tip placement in RTL |
| [SWC-1227](https://jira.corp.adobe.com/browse/SWC-1227) | Story | To Do | Unresolved | docs: migration documentation (Popover, Picker, Combobox, Coach mark, etc.) |
| [SWC-1994](https://jira.corp.adobe.com/browse/SWC-1994) | Story | To Do | Unresolved | A11y(popover): recommendations for 2nd-gen migration |

---

## Recommendations: `<swc-popover>`

Component tag may change until API freeze; this section describes the **positioning + styles** host, not 1st-gen `sp-popover` alone. `swc-popover` is a **container**, not a replacement for menu, listbox, or tooltip as full widgets—it wraps the **surface** those components render into. **ARIA**, **focus**, and **keyboard** are implemented by the **consumer** components that use this host (action menu, combobox, tooltip, and similar).

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Consumer owns semantics and behavior** | Parent or consumer components (action menu, combobox, tooltip, and similar) set and maintain ARIA roles, states, and behaviors for their pattern on content **inside** or coordinated with `swc-popover`. The `swc-popover` host does **not** implement those patterns for you—it is **not** a substitute for a menu, listbox, or tooltip **component**. |
| **No default ARIA on host** | Do not set a default `role` or `aria-*` on `swc-popover` in the unstyled **geometry** story. **Shared popover** CSS also must not set ARIA. Align with the spirit of [React Spectrum `Popover` props](https://react-spectrum.adobe.com/Popover) (positioning, visual props), not a dialog in one tag. If a build ever exposes a host `role` for a special case, that must be a separate, documented API. |
| **Not a “semantic widget” host** | The host is not `dialog` or `menu` by default. If another role is required, that belongs in child markup (the dialog surface, the listbox container) or a different primitive, not a role override that pretends the box is a menu or dialog. |
| **Labels and ids** | `aria-labelledby`, `aria-describedby`, and `id` wiring for a dialog or combobox listbox live in the same document root as the labeled nodes (light DOM in typical Lit usage). Avoid `aria-*` that must resolve across **disconnected** shadow roots for the default `swc-popover` design. |
| **1st-gen pattern** | Call sites that used `sp-popover` with `role="presentation"` and ARIA on children (for example Picker) are the reference for **chrome vs content**; 2nd-gen continues separating **anchored** **chrome** from **pattern** **ARIA**. |

### Shadow DOM and cross-root ARIA Issues

None: target is a host that does not require `aria-labelledby` / `aria-describedby` targets to live in a different shadow root than the labelled content. If a small shadow exists for a tip, keep labels and ARIA in the **light** tree for composed patterns. Shared **style-only** CSS has no ID-ref concerns.

### Accessibility tree expectations

- **Default `swc-popover` host:** no exposed role or accessible name; the **meaning** is in slotted or projected **children** and the **controlling** trigger.
- **When children implement a pattern** (for example a listbox, role `dialog` on an inner node), the tree for that pattern follows the APG for that content; the outer host remains a neutral shell unless a separate API explicitly adds a role.

### Form-associated custom properties (labels, `ElementInternals`)

**Does not apply.** `swc-popover` is not a [form-associated custom element](https://html.spec.whatwg.org/multipage/custom-elements.html#form-associated-custom-element) and is not a labeled control. Slotted form fields use normal [`<label>`](https://html.spec.whatwg.org/multipage/forms.html#the-label-element), `aria-labelledby`, and pattern-specific wiring documented on those controls—not host-level label association on the popover.

### Live regions, loading, and announcements

**Does not apply to the `swc-popover` host or to shared popover style modules.** The host does not establish `aria-live` regions, `role="status"` or `role="alert"`, or loading/announcement behavior. That belongs to **slotted** content and **parent** patterns (for example combobox or dialog). If a child uses a live region, follow that widget’s a11y doc; avoid `aria-live="assertive"` for routine progress, and use `polite` sparingly when many regions could update together and create noisy screen reader output.

**Optional skill subsection** `### Assistive technology, live regions` is not added separately: the same **product** answer is **no default live-region behavior** on the host, as stated in this **Live regions** block.

### Motion (dedicated recommendations subsection)

**Intentionally omitted.** This doc does not add a separate `### Motion` block under **Recommendations**. [WCAG 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) and reduced-motion expectations for any open or placement transitions are **only** covered in [Guidelines that apply](#guidelines-that-apply), consistent with the accessibility-migration-analysis practice of keeping motion in the **Guidelines** table for components that are not **progress**-like (compare [Progress circle](../progress-circle/accessibility-migration-analysis.md), which also centralizes motion in the guidelines where that fits the component).

### Keyboard and focus

Focus management and keyboard navigation (Escape, arrow keys, roving tabindex, and the rest) are **owned by the consumer components** that use `swc-popover` (menu, listbox, tooltip, and similar), not by the popover host. The host does not implement dismissing with Escape, focus return, or focus trap by default. For **anchored** UIs, wire behavior from the pattern you are shipping ([menubutton](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/), [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)) in those **parents**. For **modals and dialogs** (popover **styles** only, not this host), use the [dialog (modal) pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) and your app’s overlay and focus tools. The `swc-popover` host is not a prescribed “tab to the popover” target; focus belongs on triggers and interactive descendants per the pattern the **parent** component implements.

### “Not focusable” (skill boilerplate)

**Does not apply** as the sole keyboard-and-focus subsection. The accessibility-migration-analysis template uses the single sentence *“Not focusable. Keyboard navigation should skip this component and move to the next focusable element.”* for static decoration (for example [Divider](../divider/accessibility-migration-analysis.md)). The popover host is a positioning shell; slotted controls are focusable when the composed pattern requires it, so the [Keyboard and focus](#keyboard-and-focus) subsection above applies instead of that boilerplate.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** (when `swc-popover` exists) | No surprise default `role` or `aria-*` on the host. Placement + RTL does not make non-text chrome unperceivable (1.4.11). |
| **aXe + Storybook** | For **`swc-popover`**: assert ARIA on **slotted** children (combobox listbox, menu, etc.). For **modal** or **dialog** that only uses **shared popover styles** (not the `swc-popover` host): assert the dialog pattern (`role="dialog"` or `alertdialog`, `aria-modal`, focus)—the host is **inapplicable** there. |
| **E2E** (if the repo has them) | 1st-gen–relevant: nested overlay focus (see SWC-933 / SWC-932), RTL tip (SWC-917). |

### Playwright-only or host-only accessibility gates

**Does not apply** as a mandatory extra gate on the unstyled or lorem-only `swc-popover` story. Automated aXe on the host shell alone is of limited value; meaningful checks run on composed stories (for example [Playwright accessibility testing](../../../02_style-guide/04_testing/03_playwright-accessbility-testing.md) for **combobox** + `swc-popover`, and separately for **modal** / **dialog** stories that use **popover styles** without the `swc-popover` host).

### Manual and screen reader testing (mandatory, host alone)

**Does not apply** as a **required** [screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx) pass for the **host** with **no** real **content** (scaffold-only stories are not an end user task). Use the screen reader guide for **composed** patterns: `swc-popover` with menu or listbox; **modals** and **dialogs** use **popover** **styles** on the **surface** and a **separate** **modal** / **dialog** **pattern** (not the `swc-popover` host).

---

## Summary checklist

- [ ] Consumer guide and 1st-gen deprecation ([SWC-2003](https://jira.corp.adobe.com/browse/SWC-2003), [SWC-1227](https://jira.corp.adobe.com/browse/SWC-1227)) explain shared **popover styles** vs `swc-popover`, and what accessibility the product still owns.
- [ ] [SWC-1994](https://jira.corp.adobe.com/browse/SWC-1994) and Storybook ([SWC-2002](https://jira.corp.adobe.com/browse/SWC-2002) if used) state **no** default ARIA / focus / keyboard on `swc-popover`, and link to the [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx) and APG-aligned **composed** examples.
- [ ] Visual and RTL **tip** placement (SWC-917) does not regress in 2nd-gen.

## References

- 1st-gen: [`sp-popover`](../../../../1st-gen/packages/popover/README.md), [overlay](../../../../1st-gen/packages/overlay/README.md)
- [APG: read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [APG: dialog (modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/), [menubutton](https://www.w3.org/WAI/ARIA/apg/patterns/menubutton/), [combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- 2nd-gen: [Semantic HTML and ARIA](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/semantic_html_aria.mdx), [Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx), [Screen reader testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/screen_reader_testing.mdx)
- [React Spectrum: Popover](https://react-spectrum.adobe.com/Popover)
- [Popover migration roadmap (this repo)](./rendering-and-styling-migration-analysis.md)
