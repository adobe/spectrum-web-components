<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Color Loupe / Color loupe accessibility migration analysis

<!-- Document title (editable) -->

# Color loupe accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-color-loupe>`](#recommendations-swc-color-loupe)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Keyboard and focus](#keyboard-and-focus)
    - [Story and test examples](#story-and-test-examples)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Non-text contrast on loupe chrome (WCAG 1.4.11)](#non-text-contrast-on-loupe-chrome-wcag-1411)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-color-loupe`** should work for **accessibility**. It supports **WCAG 2.2 Level AA** as the team target, while recording **known** limitations for **non-text contrast** on the loupe chrome. Until **`swc-color-loupe`** ships, use **`1st-gen/packages/color-loupe/src/ColorLoupe.ts`** (`<sp-color-loupe>`) as the behavioral reference.

### Also read

- [Color field migration roadmap](../color-field/rendering-and-styling-migration-analysis.md)—the loupe is almost always used **with** a color **field** or similar **picker** UI, not alone.

### What it is

- A **visual magnifier** that shows the **picked color** (including **transparency** over an **opacity checkerboard**) inside a **loupe** shape with **inner** / **outer** borders.
- It is **not** the primary control for choosing a color; it **reflects** the current sample.

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG](https://www.w3.org/WAI/ARIA/apg/) does **not** define a standalone “color loupe” widget. Treat the loupe as **supporting UI** for **color selection**, with **accessibility** carried by the **surrounding** pattern (**label**, **inputs**, **live** value text where appropriate).

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Borders** and other **non-text** parts needed to **perceive** the loupe shape against **adjacent** colors should meet **at least 3:1** contrast. The loupe sits over **variable** content; **1st-gen** styling often **does not** meet **3:1** for the loupe **chrome**—see **Known 1st-gen issues** and [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193). |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | **1st-gen** marks the **SVG** **`aria-hidden="true"`**—the graphic is **decorative** relative to assistive tech **if** the **parent** pattern exposes the **color** and **purpose** in text or other accessible names. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The **loupe** shows **color**; meaning must **not** rely on the loupe **alone**. The **field** / **slider** / **hex** input must **state** what is being adjusted. |

**Bottom line:** Pair **`swc-color-loupe`** with a **fully labeled** color **workflow**. Accept **documented** **1.4.11** limitations on loupe **chrome** per **SWC-1193** unless design finds a **conformant** approach that still meets product goals.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) | Bug | Done | Working As Designed | [Accessibility] Graphical object lacks 3:1 contrast ratio — `sp-color-loupe` (Color Loupe Example) |

---

## Recommendations: `<swc-color-loupe>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Non-text contrast (1.4.11)** | Aim for **3:1** on **loupe** **borders** / **edges** vs **adjacent** UI where **feasible**. Where **variable color** constraints make **3:1** **unrealistic** for all states, record the **[SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193)** **decision** and keep **audit** language aligned with SWC-1196's **[comment](https://jira.corp.adobe.com/browse/SWC-1193?focusedId=51301299&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-51301299)** on practical limits. |
| **Docs** | State that the loupe is a **visual aid**, not a **standalone** **accessible** color **control**. Point authors to **color field** / **picker** docs for **labels**, **keyboard**, and **values**. |

### Shadow DOM and cross-root ARIA Issues

None

### Accessibility tree expectations

- With **1st-gen** **`aria-hidden`** **SVG**, assistive technologies typically **ignore** the **vector** graphic; users rely on **paired** **controls** and **text** for **color** and **context**.
- If **`open`** is **false**, the loupe is **hidden** visually; behavior should stay **consistent** with **CSS** / **display** and **not** trap **focus** in a **closed** loupe.

### Keyboard and focus

**Not focusable.** Keyboard navigation should skip this component and move to the next focusable element.

### Story and test examples

- **Stories** and **automated tests** should show **`swc-color-loupe`** / **`<sp-color-loupe>`** **in context** with **other** components (for example a **color field**, **sliders**, **labels**, **help text**), **not** as a **lone** widget on an empty canvas—unless the story’s **only** goal is a **narrow** **visual** check.
- Examples must be **fully accessible**: **correct** **`label`** / **`aria-labelledby`** / **`aria-label`** where needed, **descriptive** strings (no **placeholder-only** meaning), and **layouts** that resemble **real** product **usage** so **docs**, **VRT**, and **a11y** tests **exercise** realistic **trees**.

---

## Known 1st-gen issues

### Non-text contrast on loupe chrome (WCAG 1.4.11)

- **1st-gen** **`<sp-color-loupe>`** **border** / **loupe** **outline** styling often **does not** achieve the **minimum 3:1** **contrast ratio** against **adjacent** colors required by [**WCAG 2.2 Success Criterion 1.4.11** (Non-text contrast, Level AA)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast).
- **[SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193)** (Adobe **internal** Jira): **Najika** notes that meeting **1.4.11** for this control **realistically** may **not** be **achievable** given how the loupe **overlays** **arbitrary** **content** and **Spectrum** **visual** **intent**. Treat that ticket as the **product** / **a11y** **decision** record for **exceptions** or **risk** **acceptance** until **design** **changes** or **new** **techniques** land.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`open`** / **`color`** do **not** break **parent** **label** associations; **SVG** **`aria-hidden`** matches implementation. |
| **aXe + Storybook** | Run on **composite** stories (loupe **+** **field** / **sliders**), **not** only **isolated** loupe frames. |
| **Contrast** | Where **policy** requires, measure **loupe** **chrome** at **representative** backgrounds; **document** **gaps** **per** **SWC-1193** when **3:1** is **not** met. |
| **Integration** | **E2E** / **snapshots** use **realistic** **pages**: **labels**, **focus order**, and **values** on **surrounding** **controls**. |

---

## Summary checklist

- [ ] **Stories** place the loupe **in** **real** **picker** **contexts** with **accessible** **siblings**, not **only** the loupe **on** **gray** **canvas**.
- [ ] **Copy** is **descriptive**; **no** **token-only** **labels** as the **sole** **accessible** **name** for **user-facing** **steps**.
- [ ] **Color field** (or **equivalent**) **owns** **name**, **value**, and **keyboard**; loupe does **not** **stand** **in** for **that**.
- [ ] **SWC-1193** **position** on **1.4.11** is **reflected** in **internal** **audit** / **release** **notes** where **needed**.
- [ ] **Contrast** **measurements** for **loupe** **chrome** are **attempted** on **key** **themes**; **failures** are **known** **issues**, **not** **silent**.

---

## References

- [WCAG 2.2 Success Criterion 1.4.11: Non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) (Adobe internal Jira—non-text contrast / realistic constraints for color loupe)
- [Color field migration roadmap](../color-field/rendering-and-styling-migration-analysis.md)
