<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Avatar / Avatar accessibility migration analysis

<!-- Document title (editable) -->

# Avatar accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [Avatar image as an SWC style](#avatar-image-as-an-swc-style)
    - [Avatar image as **`<swc-avatar>`** (component)](#avatar-image-as-swc-avatar-component)
    - [When to use **`swc-avatar-link`** instead](#when-to-use-swc-avatar-link-instead)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: avatar image](#recommendations-avatar-image)
    - [SWC style (native **`<img>`**)](#swc-style-native-img)
    - [**`<swc-avatar>`** (component)](#swc-avatar-component)
    - [Shared: tokens and **`swc-avatar-link`**](#shared-tokens-and-swc-avatar-link)
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

This doc defines how the **avatar image** should work for **accessibility**—the **static**, **non-navigating** photo (not wrapped in a link)—targeting **WCAG 2.2 Level AA**. **2nd-gen** should **offer** the avatar image in **two** ways so teams can choose what fits their stack:

1. **SWC style** — Spectrum **CSS** / **design tokens** and **usage guidance** applied to a native **`<img>`** (or equivalent) in **light** DOM.
2. **Component** — **`<swc-avatar>`** (no **`href`**) that **encapsulates** the same **visual** **language**, **`src`**, **`label`** → shadow **`<img alt>`**, **`isDecorative`**, and **dev** **warnings**, matching **1st-gen** **`<sp-avatar>`** without **`href`** in spirit.

**Linked** avatars (hyperlink affordance) use a **separate** **component**: **`swc-avatar-link`** (see [Avatar — linked variant (`swc-avatar-link`)](../avatar/accessibility-migration-analysis.md#the-linked-variant-avatar-link)).

**1st-gen** **`<sp-avatar>`** mixes **avatar image** and **`href`** on one tag; **2nd-gen** splits **`<swc-avatar>`** (static) **or** **styled** **`<img>`** from **`swc-avatar-link`**.

### Also read

- [Avatar migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, and DOM.
- [Avatar — linked variant (`swc-avatar-link`)](../avatar/accessibility-migration-analysis.md#the-linked-variant-avatar-link) for **`href`**, keyboard, and link naming.

### Avatar image as an SWC style

- **Visual:** circular (or Spectrum-shaped) chrome via shared classes / custom properties (see the rendering roadmap), applied to a standard **`<img>`**.
- **Semantics:** **`alt`** / **`alt=""`** + **`aria-hidden="true"`** are **author-owned**; optional **ESLint**, Storybook, or docs checks can mirror **1st-gen** **warnings** when **avatar** **styling** is detected.

### Avatar image as **`<swc-avatar>`** (component)

- **Visual:** same **tokens** / **stylesheet** surface as the **SWC** **style** path so **`swc-avatar-link`** and **`<swc-avatar>`** stay **visually** **aligned**.
- **Semantics:** expose **`label`** → shadow **`<img alt>`**, **`isDecorative`** (reflect **`is-decorative`**), and **dev-only** **`window.__swc.warn`** when **`!label && !isDecorative`**, per **1st-gen** **`Avatar.ts`** and resolved **[SWC-915](https://jira.corp.adobe.com/browse/SWC-915)** (Adobe internal Jira).
- **No `href`** on **`<swc-avatar>`**; navigation is **`swc-avatar-link`** only.

### When to use **`swc-avatar-link`** instead

- The avatar image should **navigate** (profile, mailto, external URL). Use **`swc-avatar-link`** so focus, keyboard, and name match a real hyperlink.

---

## ARIA and WCAG context

### Pattern in the APG

- Treat the **avatar image** as an **informative** or **decorative** image ([non-text content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)). There is no separate APG “avatar” role.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Non-text content (1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | Meaningful avatar images need **`alt`** text; decorative ones use **`alt=""`** and hide from AT when appropriate (**`aria-hidden="true"`**). |
| [Name, role, value (4.1.2)](https://www.w3.org/TR/WCAG22/#name-role-value) | The meaningful node is the **`<img>`** (name via **`alt`**); the **avatar image** is not an interactive widget. |

**Bottom line:** The **avatar image** is not a link or button. Do not put it in the **Tab** order. A native **`<img>`** is not tab-focusable by default; **`<swc-avatar>`** must **not** delegate **focus** to the host or shadow **`<img>`** (fix **1st-gen** **`Focusable`** behavior for the static case).

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-915](https://jira.corp.adobe.com/browse/SWC-915) | Bug | Done | Done | [Bug][a11y]: Avatar should render an `alt` tag even if no label is specified to avoid a11y violations |

---

## Recommendations: avatar image

### SWC style (native **`<img>`**)

| Topic | What to do |
|-------|------------|
| **Decorative** | **`alt=""`** and **`aria-hidden="true"`** when the image adds no information—same outcome as **`isDecorative`** on **`<swc-avatar>`**. |
| **Informative** | Non-empty **`alt`** (person name, account role, entity name)—**WCAG 1.1.1**. |
| **Tooling** | Optional ESLint / Storybook / docs checks flag **`<img>`** with avatar styling that lacks **`alt`** or a decorative pairing. |
| **Role** | Do not wrap in **`role="button"`** or **`role="link"`** unless interactive (then use **`swc-avatar-link`** or a button). |

### **`<swc-avatar>`** (component)

| Topic | What to do |
|-------|------------|
| **`isDecorative`** | Add **`is-decorative`**; **`alt=""`** and **`aria-hidden="true"`** on shadow **`<img>`** when decorative and not linked (match **1st-gen** render rules). |
| **`label`** | Maps to shadow **`<img alt>`** when the image is informative. |
| **Dev warning** | **`!label && !isDecorative`** → **`window.__swc.warn`** in dev, as **1st-gen**. |
| **No `href`** | Reject or ignore **`href`** on **`<swc-avatar>`**; authors use **`swc-avatar-link`**. Consider a dev mode warning for **`href`** on **`<swc-avatar>`** to help teams migrate to **`swc-avatar-link`**.|
| **Focus** | **Not** **focusable**; do **not** extend **`Focusable`** for the static avatar image, or ensure **`tabIndex`** **-1** and **no** **delegated** **focus** **to** **host**. |

### Shared: tokens and **`swc-avatar-link`**

- Ship one **avatar** **appearance** **surface** (CSS + tokens) consumed by **apps**, **`<swc-avatar>`**, and **`swc-avatar-link`** internally.

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Host** | **`<swc-avatar>`** should **not** expose **`role="button"`** or **`role="link"`**. |
| **Decorative** | Empty **`alt`** and **`aria-hidden="true"`** on the **`<img>`** when the photo is pure decoration relative to adjacent text. |

### Shadow DOM and cross-root ARIA Issues

- **SWC** **style** path: **`<img>`** in **light** DOM—**`alt`** is straightforward.
- **`<swc-avatar>`**: **`label`** → shadow **`<img>`** **`alt`**; no **cross-root** **`aria-labelledby`** required if **`alt`** is correct.

### Accessibility tree expectations

- **Informative:** screen readers announce **`alt`** (from author or **`label`**).
- **Decorative:** image skipped per **`alt=""`** / **`aria-hidden`**; nearby text carries identity.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

---

## Known 1st-gen issues

- **Single** **`<sp-avatar>`** supports **`href`** and **`Focusable`**, mixing **avatar image** and **link**—migrate to **`<swc-avatar>`** **or** **SWC** **style** **+** **`img`**, **plus** **`swc-avatar-link`** for links.
- **Non-link** **`Focusable`** may leave the host as **`focusElement`** when **`#link`** is absent—**`<swc-avatar>`** must not repeat that for static avatar images.
- **`warnMissingAlt`** and **[SWC-915](https://jira.corp.adobe.com/browse/SWC-915)** define **1st-gen** avatar image rules; **2nd-gen** **`swc-avatar`** should preserve them on the component path, and the **SWC** **style** path should document the same rules for authors and optional lint.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Docs / examples** | **SWC** **style:** styled **`<img>`** has **`alt`** or decorative pattern (**`alt=""`** + **`aria-hidden`**). **Component:** **`<swc-avatar>`** stories cover **`label`**, **`isDecorative`**, and dev warnings. |
| **Unit (`swc-avatar`)** | **`label`** → **`img.alt`**; **`isDecorative`** matches **1st-gen**; **`href`** not supported. |
| **Focus** | **`<swc-avatar>`** is in the Tab order. |
| **aXe + Storybook** | Stories cover both **style** and **component** examples with real **`alt`** or explicit decorative markup. |

---

## Summary checklist

- [ ] **Avatar image** is offered and documented as **both** **SWC** **style** (**`<img>`**) **and** **`<swc-avatar>`** (no **`href`**).
- [ ] Shared **CSS** / **tokens** keep **`<swc-avatar>`**, **SWC** **style**, and **`swc-avatar-link`** visually aligned.
- [ ] Guidance covers decorative vs informative **`alt`**, **`aria-hidden`**, and **`isDecorative`** / **`label`** on **`<swc-avatar>`**.
- [ ] **`<swc-avatar>`** uses dev warnings like **1st-gen**; **SWC** **style** path documents optional lint or docs checks.
- [ ] Avatar image is not keyboard-focusable on either path.
- [ ] **`swc-avatar-link`** owns linked cases; cross-link [Avatar — linked variant (`swc-avatar-link`)](../avatar/accessibility-migration-analysis.md#the-linked-variant-avatar-link) from Storybook.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding 1.1.1 Non-text content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [Avatar migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Avatar — linked variant (`swc-avatar-link`)](../avatar/accessibility-migration-analysis.md#the-linked-variant-avatar-link)
- [SWC-915](https://jira.corp.adobe.com/browse/SWC-915) (resolved)—**avatar image** accessibility for **`<sp-avatar>`** without **`href`** (Adobe internal Jira)
