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
- [Implementation: loupe adaptive borders](#implementation-loupe-adaptive-borders)
    - [Loupe SVG rendering](#loupe-svg-rendering)
    - [When the loupe is shown](#when-the-loupe-is-shown)
    - [Teardrop path construction](#teardrop-path-construction)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-color-loupe`** should work for **accessibility**. It targets **WCAG 2.2 Level AA**, including full conformance for non-text contrast on loupe chrome via the adaptive dual-border approach specified in RSP-2021 and SDS-16402. Until **`swc-color-loupe`** ships, use **`1st-gen/packages/color-loupe/src/ColorLoupe.ts`** (`<sp-color-loupe>`) as the behavioral reference.

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
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Loupe borders and chrome must meet 3:1 against adjacent colors. The **adaptive dual-border** approach achieves this across the full HSV cube: a dark border at variable opacity (floor 42%, climbing until 3:1 is met) combined with a white separator, checked additively — chrome passes if either border meets 3:1 on every adjacency. See SWC-1193, RSP-2021, SDS-16402, and Known 1st-gen issues. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | **1st-gen** marks the **SVG** **`aria-hidden="true"`**—the graphic is **decorative** relative to assistive tech **if** the **parent** pattern exposes the **color** and **purpose** in text or other accessible names. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The **loupe** shows **color**; meaning must **not** rely on the loupe **alone**. The **field** / **slider** / **hex** input must **state** what is being adjusted. |

**Bottom line:** Pair `swc-color-loupe` with a fully labeled color workflow. Implement the **adaptive dual-border** approach (RSP-2021, SDS-16402) to achieve 3:1 non-text contrast on loupe chrome across all background colors; the 1.4.11 limitation documented in SWC-1193 is resolved by the conformant solution.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary |
|------|------|-------------------|-------------------------|---------|
| [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) | Bug | Done | Working As Designed | [Accessibility] Graphical object lacks 3:1 contrast ratio — `sp-color-loupe` (Color Loupe Example) |
| [RSP-2021](https://jira.corp.adobe.com/browse/RSP-2021) | — | — | — | Adaptive border contrast for color loupe — specification for the dual-border adaptive opacity approach that resolves 1.4.11 on spectrum tracks; see Known 1st-gen issues |
| [SDS-16402](https://jira.corp.adobe.com/browse/SDS-16402) | — | — | — | Non-text contrast — color loupe adaptive border specification; Spectrum Design System design decision for adaptive border opacity; drives the 2nd-gen implementation |

---

## Recommendations: `<swc-color-loupe>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **Non-text contrast (1.4.11)** | Implement the adaptive dual-border technique specified in RSP-2021 and SDS-16402. Sample a 5px ring around the loupe chrome; composite rgba(0,0,0,α) over each adjacent sample — α starts at 42% and climbs until 3:1 is met against the gradient. A white separator between the two dark borders provides an additive check: chrome passes visibility if either the dark border or the white separator meets 3:1 on every adjacency. At gradient edges, also check the dark border against the page background. This resolves SWC-1193; the practical-limits exception is superseded by the conformant solution. |
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

1st-gen `<sp-color-loupe>` border and outline styling frequently fails the 3:1 non-text contrast threshold required by WCAG 2.2 SC 1.4.11. SWC-1193 recorded this as a case where meeting 1.4.11 may not be achievable given variable background content and Spectrum visual intent, leaving it as a practical-limits exception.

**Resolution for 2nd-gen (RSP-2021, SDS-16402):** An adaptive dual-border approach has been specified and prototyped ([color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip)) that achieves 3:1 across every color in the HSV cube. The prototype demonstrates four border modes — current static 42% opacity, 100% static, and two adaptive modes (white-first and live α) — with live contrast readouts. The two adaptive modes are the reference for 2nd-gen:

1. **Sample** the 5px ring surrounding the loupe chrome. Classify each sample as gradient adjacency or page-background adjacency (when the loupe overhangs a gradient edge).
2. **Dark border check (drives α):** composite rgba(0,0,0,α) over the adjacency color; α starts at 42% and increases until 3:1 is reached.
3. **White separator check (additive):** measure contrast(#FFFFFF, adjacency). Does not lower α; provides an independent pass path.
4. **Bulletproof rule:** chrome is visible if every present adjacency has either its dark border or its white separator pass 3:1.

2nd-gen should implement adaptive border opacity following this specification. The practical-limits exception recorded in SWC-1193 is superseded by the conformant solution in RSP-2021 and SDS-16402.

---

## Implementation: loupe adaptive borders

See [Color handle implementation: adaptive dual-border algorithm](../color-handle/accessibility-migration-analysis.md#implementation-adaptive-dual-border-algorithm) for the shared contrast utilities, ring sampler, alpha computation, and visibility verdict. The loupe uses the same α value computed from the handle's ring sample; it does not run its own independent sample.

### Loupe SVG rendering

The loupe's border structure differs from the handle. Rather than two dark rings, it uses a **white outer halo** that separates the loupe shape from the underlying gradient, and a **single inner dark border** that contrasts against the white. This keeps the loupe visually lighter than a double-dark-border approach.

```html
<!-- 1. White halo: outer teardrop, filled white with a 3 px white stroke.
        This provides the contrast between the loupe edge and the gradient
        (white-first path to 3:1). -->
<path d="{outer-teardrop}" fill="white" stroke="white" stroke-width="3" />

<!-- 2. Color fill on a 1 px inset teardrop. The inset keeps the inner
        border's centered stroke from landing on the colored fill, which
        would cause a dark-rim artifact on bright or saturated hues. -->
<path d="{inner-fill-teardrop}" fill="{selected-color}" />

<!-- 3. Single inner dark border. Stroke is centered on the inner teardrop
        path, so its inward half lands on white — always ≥ 3:1 against white.
        No outer dark ring needed. -->
<path d="{inner-teardrop}" fill="none"
      stroke="rgba(0,0,0,{α})" stroke-width="2" />
```

**Prototype dimensions:** outer teardrop bulb radius 23 px, inner teardrop bulb radius 18 px (5 px white separator each side), overall shape 48 × 64 px visible.

### When the loupe is shown

The loupe appears only when the parent handle is in the active state (focused or being dragged) — matching the 1st-gen behavior where `open` is set on touch input to prevent the finger obscuring the selected color. In the inactive state, only the handle circles are rendered; the loupe SVG group is omitted.

### Teardrop path construction

The loupe shape is a teardrop: a circle for the bulb, tapering to a point at the bottom (the pin that touches the handle). Build it as a closed SVG path using cubic Bézier curves approximating the circular arc and a symmetric taper. The prototype constructs this with `teardropPath(tipY, bulbCy, bulbR)` — see [color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip) for the reference implementation.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit** | **`open`** / **`color`** do **not** break **parent** **label** associations; **SVG** **`aria-hidden`** matches implementation. |
| **aXe + Storybook** | Run on **composite** stories (loupe **+** **field** / **sliders**), **not** only **isolated** loupe frames. |
| **Contrast** | Verify that the adaptive dual-border approach meets 3:1 on loupe chrome at representative gradient colors and at gradient edges against the page background, per RSP-2021 and SDS-16402. |
| **Integration** | **E2E** / **snapshots** use **realistic** **pages**: **labels**, **focus order**, and **values** on **surrounding** **controls**. |

---

## Summary checklist

- [ ] **Stories** place the loupe **in** **real** **picker** **contexts** with **accessible** **siblings**, not **only** the loupe **on** **gray** **canvas**.
- [ ] **Copy** is **descriptive**; **no** **token-only** **labels** as the **sole** **accessible** **name** for **user-facing** **steps**.
- [ ] **Color field** (or **equivalent**) **owns** **name**, **value**, and **keyboard**; loupe does **not** **stand** **in** for **that**.
- [ ] Adaptive dual-border opacity is implemented on loupe chrome; 3:1 non-text contrast is verified across representative background colors and at gradient edges, per RSP-2021 and SDS-16402.
- [ ] Contrast measurements for loupe chrome confirm the adaptive approach meets 3:1 across the HSV cube; SWC-1193 practical-limits exception is superseded.

---

## References

- [WCAG 2.2 Success Criterion 1.4.11: Non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [SWC-1193](https://jira.corp.adobe.com/browse/SWC-1193) (Adobe internal Jira — non-text contrast / practical-limits exception for color loupe, superseded by adaptive approach)
- [RSP-2021](https://jira.corp.adobe.com/browse/RSP-2021) (Adobe internal Jira — adaptive border contrast specification for color loupe)
- [SDS-16402](https://jira.corp.adobe.com/browse/SDS-16402) (Adobe internal Jira — Spectrum Design System adaptive border specification)
- [color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip) — interactive prototype demonstrating all four border modes with live contrast readouts
- [Color field migration roadmap](../color-field/rendering-and-styling-migration-analysis.md)
