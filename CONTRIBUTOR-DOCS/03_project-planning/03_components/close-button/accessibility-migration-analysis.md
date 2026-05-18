<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Close Button / Close button accessibility migration analysis

<!-- Document title (editable) -->

# Close button accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [Button, close button, and clear button (compared)](#button-close-button-and-clear-button-compared)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [1st-gen implementation notes](#1st-gen-implementation-notes)
- [Recommendations: `<swc-close-button>`](#recommendations-swc-close-button)
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

This doc describes how **`swc-close-button`** should behave for **accessibility** in 2nd-gen, targeting **WCAG 2.2 Level AA**. **`sp-close-button`** lives in the **`button`** package and extends **`StyledButton`** → **`ButtonBase`** in 1st-gen (alongside **`sp-button`**); 2nd-gen semantics should stay aligned with [Button migration plan](../button/migration-plan.md) for shared **`ButtonBase`** / **core** sequencing, **`aria-label`** / **`label`** reflection, and other **`swc-button`** outcomes tracked there (**e.g.** [SWC-1333](https://jira.corp.adobe.com/browse/SWC-1333)). It aligns with [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) and the same **native button**, **focus delegation**, and **naming** expectations as compact **chrome** controls in [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md): a **real** **`<button type="button">`**, **delegated focus**, a **discernible name**, and **no** duplicate host **`role="button"`** when an inner button is the focus target. **`swc-close-button`** is the **dismiss** affordance for dialogs, banners, action bars, and similar surfaces—authors must not ship it **icon-only** without an explicit **accessible name** that matches the **action** (for example **Close** vs **Clear selection**). For **how** **close** differs from **default button** and **clear**, see [Button, close button, and clear button (compared)](#button-close-button-and-clear-button-compared).

### Also read

[Button migration plan](../button/migration-plan.md) (**`ButtonBase`**, **`swc-button`** sequencing, core vs **SWC** split). [Button migration roadmap](../button/rendering-and-styling-migration-analysis.md) (layout, CSS, DOM). [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md). Field adornments that often pair with **clear** (not **close**): [In-field button](../infield-button/rendering-and-styling-migration-analysis.md), [Search](../search/rendering-and-styling-migration-analysis.md). Tooltip policy for chrome controls: [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md).

### Button, close button, and clear button (compared)

All three are **`role="button"`** surfaces in Spectrum: **native** **`<button type="button">`**, **Enter** / **Space** activation, **focus visible**, and (for **`swc-*`**) the same **delegation** posture as [Button accessibility migration analysis](../button/accessibility-migration-analysis.md). They differ by **job**, **context**, and **how strict naming must be**—especially for **icon-only** chrome where a **cross** glyph is shared visually.

| | **`swc-button`** | **`swc-close-button`** | **`swc-clear-button`** |
| --- | --- | --- | --- |
| **Primary job** | General **commit** actions: submit, open dialog, toggle UI, choose variant, etc. | **Dismiss** or **close** a **container** or chrome region (dialog, popover, toast, action bar, banner). | **Clear** or **reset** a **value** in an **input** or similar control (search field, text field, tag)—the **parent** surface usually **stays** open. |
| **Typical context** | Forms, pages, dialogs (primary actions), toolbars. | **Chrome** on overlays and layout regions that **end** when dismissed. | **Adornments** on **fields** and **compact** controls ([Search](../search/rendering-and-styling-migration-analysis.md) patterns show **`sp-clear-button`**). |
| **Visual / emphasis** | Full **button** scale and variants (fill, outline, pending, …). | **Compact** **cross**-forward **dismiss** styling. | **Compact** **cross**-forward **clear** styling (often **quiet**). |
| **Accessible name** | From visible label, **`aria-label`**, or reflected props—breadth of Spectrum **button** content. | **Must** describe **dismiss** in context (**Close**, **Dismiss**, …)—not a bare cross ([SWC-1150](https://jira.corp.adobe.com/browse/SWC-1150)). **Do not** label a **close** control as if it **cleared** a selection when it actually **closes** the bar ([SWC-550](https://jira.corp.adobe.com/browse/SWC-550)). | **Must** describe **clearing** the value (**Clear**, **Clear search**, **Clear text**, …)—not **Close**. In 1st-gen, **`label`** is **required** and maps to **`aria-label`** only (not visually rendered by default); see snippet below. |
| **Pending / loading** | Full **`swc-button`** **pending** contract ([Button accessibility migration analysis](../button/accessibility-migration-analysis.md)). | Not a typical **close** surface; if product adds async dismiss, align with **`swc-button`** **pending** guidance. | Same as **close**—not the primary **pending** surface. |
| **`href` / link** | **No** **`href`** on **`swc-button`** (navigation on **`swc-link`** / **`<a>`**). | **No** **`href`**. | **No** **`href`**. |
| **2nd-gen a11y doc** | [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) | This doc. | **Dedicated** **`swc-clear-button`** accessibility migration analysis **when** that component is migrated—until then, apply the same **name** / **keyboard** / **delegation** rules here and in field composite docs. |

```69:75:1st-gen/packages/button/src/ClearButton.ts
  /**
   * An accessible label that describes the component.
   * It will be applied to aria-label, but not visually rendered.
   * This attribute is required for clear buttons.
   */
  @property()
  public override label!: string;
```

**`sp-close-button`** documents a default **slot** for visually hidden text alongside the cross ([`CloseButton.ts`](../../../../1st-gen/packages/button/src/CloseButton.ts)); **`sp-clear-button`** treats **`label`** as **mandatory** in JSDoc because the control is **icon-first** without that slot pattern. **2nd-gen** should keep the **semantic** distinction: **close** = leave / dismiss **surface**; **clear** = remove **field value**—never swap strings between the two patterns in Storybook or product.

### What it is

- **`swc-close-button`:** A **compact** control whose **primary** job is to **close** or **dismiss** a region (dialog, popover, toast, selection bar, etc.). It is **keyboard-focusable** and activates with **Enter** / **Return** or **Space** like any **button** ([APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)).
- **Name:** Comes from the **`label`** attribute (reflected to the underlying button when wired), visible slotted text (1st-gen places default slot content in a **visually hidden** span so the **cross** icon can dominate layout), and/or **`aria-label`** on the focus target—**every** instance needs a **name** that describes the **outcome** for assistive technologies.

### When to use something else

- **Primary actions** or **non-dismiss** work → [Button](../button/accessibility-migration-analysis.md) or [Action button](../action-button/rendering-and-styling-migration-analysis.md).
- **Clear field** or **reset input value** without dismissing a dialog, banner, or action bar → **`swc-clear-button`** (see [Button, close button, and clear button (compared)](#button-close-button-and-clear-button-compared); dedicated **`swc-clear-button`** a11y migration analysis when that workstream lands).

### What it is not

- **Not an unnamed icon:** A bare **cross** with **no** **`label`**, **no** slotted text, and **no** **`aria-label`** fails **WCAG 4.1.2** ([SWC-1150](https://jira.corp.adobe.com/browse/SWC-1150)).
- **Not a misleading name:** The **accessible name** must match the **real** action (**Close** vs **Clear selection**, etc.—see [SWC-550](https://jira.corp.adobe.com/browse/SWC-550)).

---

## ARIA and WCAG context

### Pattern in the APG

- [Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) — **Enter** / **Return** or **Space** activates; discernible **name**; **`aria-disabled`** when the control must stay **focusable** but not act (align with [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) **pending** guidance if a future variant adds async dismiss).
- [Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — **Close** controls belong in **dialog** / **alertdialog** choreography; focus management and **Escape** behavior are owned by the **dialog** host, but the **close** control still needs a correct **name** and **keyboard** contract.

### Guidelines that apply

| Idea | Plain meaning |
| --- | --- |
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | **button** role on the **focus target**; **name** reflects the **dismiss** action in context, not a generic glyph. |
| [Keyboard (WCAG 2.1.1)](https://www.w3.org/TR/WCAG22/#keyboard) | **Tab** reaches the control; **Enter** / **Space** activate ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)). |
| [Focus visible (WCAG 2.4.7)](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus ring on the **inner** **`<button>`** when using delegation. |
| [Target size (WCAG 2.5.8)](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Hit target meets **minimum** size or documented **exception** (compact chrome). |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Cross** icon and **focus** ring meet **3:1** against adjacent colors where applicable (shared **button** token work). |
| [Content on hover or focus (WCAG 1.4.13)](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | If a **Tooltip** is paired with **`swc-close-button`**, follow overlay dismissal and **keyboard** parity ([Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md); [SWC-600](https://jira.corp.adobe.com/browse/SWC-600)). |

**Bottom line:** **`swc-close-button`** is a **named** **dismiss** **button** with the same **focus** and **delegation** expectations as **`swc-button`**; **label** strings must match **user-visible** intent in context.

---

## Related 1st-gen accessibility (Jira)

Adobe Jira is authoritative for current status and resolution; refresh cells when you triage. Rows below omit issues labeled **`gen2`** / **`gen-2`** from the shared **Button / ButtonBase / Close button** query and omit **audit** epic **[SWC-872](https://jira.corp.adobe.com/browse/SWC-872)** (cross-cutting audit).

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
| --- | --- | --- | --- | --- |
| [SWC-1150](https://jira.corp.adobe.com/browse/SWC-1150) | Bug | Done | Fixed | Button does not have a name — **`sp-close-button`** (Label, Disabled region) |
| [SWC-550](https://jira.corp.adobe.com/browse/SWC-550) | Bug | Done | Duplicate | Action Bar close button is labelled clear selection |
| [SWC-600](https://jira.corp.adobe.com/browse/SWC-600) | Story | To Do | Unresolved | Should we allow tooltips on Close and Clear buttons? |
| [SWC-1039](https://jira.corp.adobe.com/browse/SWC-1039) | Bug | Done | Fixed | **`button-base`** **`aria-label`** not updating on change |
| [SWC-1333](https://jira.corp.adobe.com/browse/SWC-1333) | Bug | To Do | Unresolved | **`sp-button`** does not support **`aria-label`** — track **`ButtonBase`** / attribute reflection; **`swc-close-button`** must mirror whatever **`swc-button`** ships |
| [SWC-48](https://jira.corp.adobe.com/browse/SWC-48) | Epic | To Do | — | ElementInternals RFC — form-associated custom elements |
| [SWC-598](https://jira.corp.adobe.com/browse/SWC-598) | Epic | In Progress | — | Consider refactoring ButtonBase, Action Button, and Button |

---

## 1st-gen implementation notes

**`sp-close-button`** lives in the **`button`** package and extends **`StyledButton`** → **`ButtonBase`** (same **`focusElement`** / anchor concerns as [Button accessibility migration analysis](../button/accessibility-migration-analysis.md) until 2nd-gen converges on **inner** **`<button>`** + **delegation**). **2nd-gen** implementation order and shared **core** decisions should follow [Button migration plan](../button/migration-plan.md). Default content is wrapped in a **visually hidden** span so the **cross** icon remains the visible affordance—authors still owe a **real** **name** via **`label`**, slot text, or reflected **`aria-*`** on the focus target.

```79:87:1st-gen/packages/button/src/CloseButton.ts
  protected override get buttonContent(): TemplateResult[] {
    return [
      crossIcon[this.size](),
      html`
        <span id="label" class="visually-hidden">
          <slot @slotchange=${this.manageTextObservedSlot}></slot>
        </span>
      `,
    ];
  }
```

---

## Recommendations: `<swc-close-button>`

### ARIA roles, states, and properties

| Topic | What to do |
| --- | --- |
| **Native mapping** | Render a **real** `<button type="button">`. Prefer **`delegatesFocus`** so **Tab** and **activation** hit the **inner** **`<button>`**; **host** must **not** duplicate **`role="button"`** as the only focusable surface. |
| **Name (required)** | **Always** set a **discernible name**: default **`label`** for icon-first chrome, slotted accessible text, or **`aria-label`** on the **button** surface. Match **verb** to **effect** (**Close**, **Dismiss**, **Clear selection**). |
| **`aria-disabled`** | If a **non-interactive** but **focusable** dismiss state is needed (rare), follow the same **`aria-disabled`** + **focusable** pattern as **`swc-button`** **pending**—do **not** use **`role="progressbar"`** on decorative spinners. |
| **Icon** | **Cross** icon is decorative when the **name** already says **Close**; otherwise give the icon an accessible name only if it adds non-duplicate information. |

### Shadow DOM and cross-root ARIA Issues

**Deferred:** Same **`aria-labelledby`** / **`aria-describedby`** **ID** limits across **shadow** roots as **`swc-button`** until **`ElementInternals`** and **axe-core** coverage mature — track **[SWC-48](https://jira.corp.adobe.com/browse/SWC-48)**.

### Form-associated buttons (`submit` / `reset`)

**Does not apply** to **`type="submit"`** / **`reset`** for **`swc-close-button`** product shape.

### Accessibility tree expectations

- **Role:** **button**.
- **Name:** From **`label`**, visible/slot text piped to the **button**, or **`aria-label`**—must **update** when authors change attributes ([SWC-1039](https://jira.corp.adobe.com/browse/SWC-1039)).
- **State:** Native **`disabled`** when removed from interaction; **`aria-disabled="true"`** only when product explicitly keeps dismiss **focusable** but inactive.

### Live regions, loading, and announcements

**Does not apply** for the current **1st-gen** **`sp-close-button`** (no **pending** surface). If product adds **async close**, align with [Figma — Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) and **`swc-button`** guidance—**never** **`aria-live="assertive"`** for routine UI.

### Keyboard and focus

- **Enter** / **Return** or **Space** activates ([Keyboard testing](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)).
- **Tab** order: one **logical** dismiss control per surface; focus ring on the **inner** **`<button>`** after delegation.
- **Dialog** hosts manage **Escape** and **focus return**; **`swc-close-button`** still exposes a **consistent** **name** and **activation** behavior.

---

## Testing

### Automated tests

| Kind of test | What to check |
| --- | --- |
| **Unit** | Inner **`<button>`**; **delegated focus**; **`label`** / **`aria-label`** reflected; **no** unnamed icon-only default. |
| **aXe + Storybook** | Default, **`disabled`**, **`static-color`**, sizes, and **in-context** stories (dialog, action bar, alert banner). |
| **Playwright ARIA snapshots** | **button** role and **name**; regression for **[SWC-1150](https://jira.corp.adobe.com/browse/SWC-1150)**. |
| **Playwright keyboard** | **Enter** / **Space** activation. |
| **Integration** | **Action bar** string matches action ([SWC-550](https://jira.corp.adobe.com/browse/SWC-550)); tooltip pairing if **[SWC-600](https://jira.corp.adobe.com/browse/SWC-600)** resolves to supported API. |

---

## Summary checklist

- [ ] **Inner** **`<button type="button">`** with **focus delegation**; **host** does **not** fake a second **button** in the tab order.
- [ ] **Every** instance has a **correct** **accessible name** (**Close** vs **Clear selection**, etc.) — [SWC-1150](https://jira.corp.adobe.com/browse/SWC-1150), [SWC-550](https://jira.corp.adobe.com/browse/SWC-550).
- [ ] **`aria-label`** / **`label`** updates propagate to the focus target — [SWC-1039](https://jira.corp.adobe.com/browse/SWC-1039); align with **[SWC-1333](https://jira.corp.adobe.com/browse/SWC-1333)** **`swc-button`** outcome.
- [ ] **Tooltip** usage (if allowed) matches [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md) — [SWC-600](https://jira.corp.adobe.com/browse/SWC-600).
- [ ] Cross-root **`aria-labelledby`** / **`aria-describedby`** **deferred** per **`swc-button`** — [SWC-48](https://jira.corp.adobe.com/browse/SWC-48).
- [ ] **`ButtonBase`** / shared **button** core alignment — [SWC-598](https://jira.corp.adobe.com/browse/SWC-598); follow [Button migration plan](../button/migration-plan.md) for sequencing with **`swc-button`**.
- [ ] Docs and Storybook distinguish **`swc-close-button`** (**dismiss** surface) from **`swc-clear-button`** (**clear** value) and from default **`swc-button`** (**general** commit)—[Button, close button, and clear button (compared)](#button-close-button-and-clear-button-compared).

---

## References

- [WAI-ARIA APG: Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
- [WAI-ARIA APG: Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [WAI-ARIA APG: Read me first](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Button accessibility migration analysis](../button/accessibility-migration-analysis.md)
- [Button migration plan](../button/migration-plan.md) (**`ButtonBase`**, **`swc-button`** migration sequencing)
- [Button migration roadmap](../button/rendering-and-styling-migration-analysis.md)
- [Search rendering and styling migration analysis](../search/rendering-and-styling-migration-analysis.md) (**`sp-clear-button`** in context)
- [Action button migration roadmap](../action-button/rendering-and-styling-migration-analysis.md)
- [Tooltip accessibility migration analysis](../tooltip/accessibility-migration-analysis.md)
- [Keyboard testing (2nd-gen Storybook accessibility guide)](../../../../2nd-gen/packages/swc/.storybook/guides/accessibility-guides/keyboard_testing.mdx)
- [Figma: Loading animation discovery](https://www.figma.com/design/42VzvpW262EAUbYsadO4e8/Loading-animation-discovery) (if async dismiss is added later)
