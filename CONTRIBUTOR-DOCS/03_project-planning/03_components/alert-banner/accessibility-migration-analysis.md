<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Alert Banner / Alert banner accessibility migration analysis

<!-- Document title (editable) -->

# Alert banner accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What **`swc-alert-banner`** is](#what-swc-alert-banner-is)
    - [When to use **`swc-alert-region`** instead](#when-to-use-swc-alert-region-instead)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Recommendations: `<swc-alert-banner>`](#recommendations-swc-alert-banner)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
- [Known 1st-gen issues](#known-1st-gen-issues)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc defines how **`swc-alert-banner`** should work for **accessibility**. It matches the goal of **WCAG 2.2 Level AA**.

**`swc-alert-banner`** is the **non-dismissible** banner: it uses **`role="alert"`** and **must not** include a dismiss control. **Escape** **must not** close or hide it—that behavior belongs on **`swc-alert-region`** only. For a banner users can close (including with **Escape**), use **`swc-alert-region`** (see [Alert region accessibility migration analysis](../alert-region/accessibility-migration-analysis.md)).

**1st-gen** **`<sp-alert-banner>`** supports optional **`dismissible`** in one element; **2nd-gen** splits into two components so **ARIA** roles match behavior.

### Also read

- [Alert Banner migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- [Alert region accessibility migration analysis](../alert-region/accessibility-migration-analysis.md) for **`role="region"`**, dismiss button, and **Escape**.

### What **`swc-alert-banner`** is

- A high-signal message (**neutral**, **info**, or **negative** **variant**) with **default** and **`action`** slots.
- **`role="alert"`** on the message container so assistive technologies announce the content when it appears or updates (assertive live region).
- **No** close button and **no** **`dismissible`** API.
- **Escape** does **not** dismiss or hide the banner (**`swc-alert-region`** **must** handle **Escape** for the dismissible pattern).

### When to use **`swc-alert-region`** instead

- Users need to **dismiss** the banner (close control and/or **Escape**). That component uses **`role="region"`** and a dismiss pattern—see the sibling doc.

---

## ARIA and WCAG context

### Pattern in the APG

- The [Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) describes important messages with **`role="alert"`**. It is **not** aimed at banners that include dismiss chrome; dismissible messaging belongs on **`swc-alert-region`**.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [`alert` role](https://www.w3.org/TR/wai-aria-1.2/#alert) | **`role="alert"`** is an **assertive** live region. **Do not** nest another **`role="alert"`**. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) | Default **slot** text (and **icon** labels where used) should make the message clear. **`action`** slot controls need proper names per their components. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | **Variant** is supplemental—the **words** carry meaning. |
| [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) | Any **control** that **shows** or **hides** the banner must expose **expanded** state: **`true`** when the banner is **visible**, **`false`** when **hidden** (**SWC-1126**). That control also needs an **accessible name** and correct **role** so **WCAG** **4.1.2** (**name**, **role**, **value**) is satisfied. |
| [Keyboard inside components (APG)](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents) | **Tab** / **Shift**+**Tab** move **between** **components** on the **page**; **arrow** keys move **focus among multiple focusable controls inside** the **banner** (see **Keyboard and focus**). |
| **Escape** | **Must not** close or hide **`swc-alert-banner`**. **Escape**-to-dismiss is **required** on **`swc-alert-region`** when **`open`**—see the sibling doc. |

**Bottom line:** **`swc-alert-banner`** is **`role="alert"`** only, **no** dismiss UI, **no** **Escape** dismissal. Keep copy concise so assertive announcements stay usable. If something **else** on the page **toggles** the banner, that control **must** use **`aria-expanded`** per **SWC-1126**.

---

## Recommendations: `<swc-alert-banner>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **`role="alert"`** | Set on the component host. **Do not** ship a dismiss control on this component. |
| **No dismiss API** | **Do not** expose **`dismissible`**, **`close`**, or a close button on **`swc-alert-banner`**. |
| **`Escape`** | **Do not** listen for **Escape** to **dismiss** or **hide** the banner. **Consumers** who need **Escape**-to-close **must** use **`swc-alert-region`**. |
| **`variant`** | Drives styling; **icons** need accessible **names** (**`label`**) when they convey type (**info**, **negative**). |
| **`action` slot** | Optional. Slotted **buttons** or **links** must follow those components’ labeling rules. **Focus** is **delegated** to these **slotted** **controls**—the **host** does **not** need to be **focusable** when there is **no** **`action`** **content**. |
| **Keyboard (in-banner)** | With **two** or **more** **focusable** **`action`** **controls**, handle **arrow** keys to **roam** **focus** among them; **Tab** / **Shift**+**Tab** move **focus** **out of** the **banner** to the **rest** of the **tab** **sequence** ([APG: keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)). |
| **`open`** | When **`open`** is **false**, hide the banner visually and from the accessibility tree per implementation (no stale **alert** exposed). |
| **Toggle control (`aria-expanded`)** | When a **separate** control **shows** or **hides** the banner (app **UI** or **Storybook** demos), that control **must** set [**`aria-expanded`**](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) to **`true`** while the banner is **visible** and **`false`** while **hidden** (**SWC-1126**). When practical, add **`aria-controls`** referencing the banner element’s **id**. The **dismiss** pattern lives on **`swc-alert-region`**; do **not** conflate **dismiss** with **expand/collapse** semantics on the same control unless the **UX** is truly a single toggle. |

### Shadow DOM and cross-root ARIA Issues

- None.

### Accessibility tree expectations

**Banner open**

- **Role:** **alert** (assertive).
- **Name:** From slot text and named icons as exposed by the user agent.

**Banner closed**

- Not presented as an active alert (match **`open`** and DOM visibility).

### Keyboard and focus

- **Focusable** **surface:** The **`swc-alert-banner`** **host** is **only** **meaningfully** **keyboard**-**reachable** when it **contains** **focusable** **elements**—typically **`action`** **slot** **buttons** or **links**. **Message** **text** and **icons** stay **unfocused**; **focus** **delegates** to **slotted** **actions**.
- **Multiple** **`action`** **controls:** Follow [keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents): **arrow** keys (**Left**/**Right** or **Up**/**Down**, **consistent** with **layout**) move **focus** **from** **button** **to** **button** **within** the **banner**; **Tab** and **Shift**+**Tab** move **focus** **away** from the **banner** to the **next** or **previous** **component** in the **page** **tab** **order**—**do** **not** **keep** **Tab** **cycles** **inside** the **banner** (no **focus** **trap**).
- **Single** or **no** **`action`:** **Tab** **passes** **through** or **lands** on the **sole** **control** as **DOM** **order** dictates; **arrow** **handling** is **unnecessary** when there is **at** **most** **one** **focusable** **child**.
- **Escape:** **Must not** close or hide **`swc-alert-banner`**. Do **not** attach a **keydown** **Escape** handler for dismissal (**contrast** with **`swc-alert-region`**, which **must** dismiss on **Escape** when **`open`**).

---

## Known 1st-gen issues

- **SWC-1126**: **Storybook** (and similar) examples that **toggle** banner visibility often omitted **`aria-expanded`** on the **trigger**; **2nd-gen** **must** wire [**`aria-expanded`**](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded) on any control that **opens** / **closes** the banner.
- **`<sp-alert-banner>`** sets **`role="alert"`** on **`.body`** even when **`dismissible`**—mixing assertive live region semantics with dismiss interaction. **2nd-gen** **`swc-alert-region`** uses **`role="region"`** for the dismissible case.
- **`AlertBannerBase`** registers **Escape** only when **`dismissible`**—not applicable to **`swc-alert-banner`**.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`role="alert"`** on message wrapper; **no** dismiss API or close button in template; **Escape** does **not** trigger hide or **`close`**. |
| **aXe + Storybook** | Open stories pass WCAG rules; copy and icon labels are meaningful. |
| **Live region** | Where tooling allows, assert alert exposure when content appears. |
| **Toggle demos** | Trigger has **`aria-expanded`** in sync with banner **`open`** / visibility (**SWC-1126**). |
| **Keyboard** | With **multiple** **`action`** **controls** in the **`action`** **slot**, **arrow** keys move **focus** **between** them; **Tab** **exits** the **banner** per [APG inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents). |

---

## Summary checklist

- [ ] **`swc-alert-banner`** is **`role="alert"`** only; **no** dismiss UI; **Escape** does **not** close it (**`swc-alert-region`** **does**).
- [ ] Dismissible cases use **`swc-alert-region`**; Storybook cross-links both.
- [ ] **`action`** slot examples use accessible controls.
- [ ] Icons expose **`label`** when they convey meaning.
- [ ] Any **Storybook** / **demo** that **toggles** the banner documents **`aria-expanded`** (and preferably **`aria-controls`**) on the trigger (**SWC-1126**).
- [ ] **Multiple** **`action`** **examples** document **arrow**-key **focus** **roving** and **Tab** / **Shift**+**Tab** **exiting** the **banner** ([APG](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)).

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA `alert` role](https://www.w3.org/TR/wai-aria-1.2/#alert)
- [WAI-ARIA `aria-expanded` (state)](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded)
- [APG: Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [APG: Developing a keyboard interface — keyboard navigation inside components](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#keyboardnavigationinsidecomponents)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Alert Banner migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Alert region accessibility migration analysis](../alert-region/accessibility-migration-analysis.md)
