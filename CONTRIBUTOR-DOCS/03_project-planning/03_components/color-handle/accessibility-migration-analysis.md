<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Color Handle / Color handle accessibility migration analysis

<!-- Document title (editable) -->

# Color handle accessibility migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Overview](#overview)
    - [Also read](#also-read)
    - [What it is](#what-it-is)
    - [When to use something else](#when-to-use-something-else)
    - [What it is not](#what-it-is-not)
    - [Related](#related)
- [ARIA and WCAG context](#aria-and-wcag-context)
    - [Pattern in the APG](#pattern-in-the-apg)
    - [Guidelines that apply](#guidelines-that-apply)
- [Related 1st-gen accessibility (Jira)](#related-1st-gen-accessibility-jira)
- [Recommendations: `<swc-color-handle>`](#recommendations-swc-color-handle)
    - [ARIA roles, states, and properties](#aria-roles-states-and-properties)
    - [Shadow DOM and cross-root ARIA Issues](#shadow-dom-and-cross-root-aria-issues)
    - [Accessibility tree expectations](#accessibility-tree-expectations)
    - [Assistive technology, live regions](#assistive-technology-live-regions)
    - [Keyboard and focus](#keyboard-and-focus)
    - [Story and test examples](#story-and-test-examples)
- [Known 1st-gen issues](#known-1st-gen-issues)
    - [Non-text contrast on focused handle chrome (WCAG 1.4.11)](#non-text-contrast-on-focused-handle-chrome-wcag-1411)
- [Implementation: adaptive dual-border algorithm](#implementation-adaptive-dual-border-algorithm)
    - [Contrast utilities](#contrast-utilities)
    - [Ring sampling](#ring-sampling)
    - [Finding the minimum α](#finding-the-minimum-)
    - [Choosing α: the two adaptive modes](#choosing--the-two-adaptive-modes)
    - [Visibility verdict: the additive dual check](#visibility-verdict-the-additive-dual-check)
    - [Handle SVG rendering](#handle-svg-rendering)
    - [Loupe SVG rendering](#loupe-svg-rendering)
    - [Page-background edge mode (strict)](#page-background-edge-mode-strict)
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-color-handle`** should work for **accessibility**. It targets **WCAG 2.2 Level AA**, including full conformance for non-text contrast on handle borders via the adaptive dual-border approach specified in RSP-2021 and SDS-16402. Until **`swc-color-handle`** ships under `2nd-gen/`, use **`1st-gen/packages/color-handle/src/ColorHandle.ts`** (`<sp-color-handle>`) as the behavioral reference and update this spec against the real 2nd-gen source when it lands.

### Also read

- [Color handle migration roadmap](./rendering-and-styling-migration-analysis.md) for layout, CSS, tokens, and DOM changes.
- [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md); the handle **hosts** the loupe when **`open`**.
- [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md); the handle applies the checkerboard pattern on **`:host`** for transparent **`color`** values.

### What it is

- A **circular thumb** that marks the **current color** on a **color area**, **color slider**, or **color wheel** track.
- It shows the **picked fill** (with an **opacity checkerboard** when **`color`** is transparent), optional **inner** / **outer** borders, and an enlarged **focused** size when the **parent** color widget has keyboard focus.
- On **touch** input, it can set **`open`** so an embedded **`swc-color-loupe`** appears above the thumb so the finger does not hide the sample ([S2 color handle](https://s2.spectrum.corp.adobe.com/page/color-handle/)).

### When to use something else

- A **standalone** color **control** with **label**, **value**, and **keyboard** semantics ➜ use **`swc-color-field`**, **`swc-color-area`**, **`swc-color-slider`**, or **`swc-color-wheel`** (or compose them), not an isolated handle.
- A **read-only** color **preview** (swatch, thumbnail) ➜ use **`swc-swatch`** or **`swc-thumbnail`**, not a handle.

### What it is not

- The **primary accessible control** for choosing a color. **Name**, **role**, **value**, and **keyboard** interaction live on the **parent** color widget (hidden **`input[type="range"]`** elements and related ARIA in 1st-gen).
- A **standalone** Storybook/demo widget authors should ship in product UI without a **labeled** parent picker.

### Related

- **`swc-color-loupe`** ➜ [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md).
- **Parent pickers** (each owns labeling and slider semantics) ➜ `sp-color-area`, `sp-color-slider`, `sp-color-wheel` (2nd-gen migration docs pending).

---

## ARIA and WCAG context

### Pattern in the APG

- The [APG](https://www.w3.org/WAI/ARIA/apg/) does **not** define a standalone “color handle” widget. Treat the handle as **supporting UI** inside the [slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) (or **2D slider**) patterns implemented by **parent** color components.
- **1st-gen** parents expose **`input[type="range"]`** sliders with implicit **`slider`** roles, **`aria-label`**, **`aria-valuetext`**, and related properties. The handle is a **visual** thumb only.

### Guidelines that apply

| Idea | Plain meaning |
|------|----------------|
| [Name, role, value (WCAG 4.1.2)](https://www.w3.org/WAI/WCAG22/#name-role-value) | The **parent** picker must expose a **name** and **value**. The handle **must not** pretend to be the sole **slider**; **1st-gen** sets **no** **`role`** or **`aria-*`** on **`<sp-color-handle>`**. |
| [Labels or instructions (WCAG 3.3.2)](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions) | **Visible** or programmatic **labels** belong on the **parent** widget (for example **`label`** on **`sp-color-slider`**, **`label-x`** / **`label-y`** on **`sp-color-area`**). The handle does **not** supply its own label. |
| [Use of color (WCAG 1.4.1)](https://www.w3.org/TR/WCAG22/#use-of-color) | The **fill** shows **color**; meaning must **not** rely on the handle **alone**. **Text**, **hex** inputs, or **slider** **value** announcements must state what is selected. |
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | Handle borders and focus chrome must meet 3:1 against adjacent colors. The **adaptive dual-border** approach achieves this across the full HSV cube: a dark border at variable opacity (floor 42%, climbing until 3:1 is met) combined with a white separator, checked additively — the handle passes if either border meets 3:1 on every adjacency. See RSP-2021, SDS-16402, and Known 1st-gen issues. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | The handle **fill** and **borders** are **graphical** relative to assistive tech when the **parent** already exposes **value** and **purpose**. Do **not** add a conflicting **`role="img"`** on the host unless product and a11y agree on a **redundant** name strategy. |
| [Focus appearance (WCAG 2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) / [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Keyboard users must see **which** picker has focus. **1st-gen** reflects focus with **`[focused]`** / **`:focus-visible`** **size** expansion and **border** treatment on the handle while **`outline: none`** is set on **`:host(:focus)`**; verify **2nd-gen** keeps a **visible** focus indicator aligned with parent behavior. |

**Bottom line:** `swc-color-handle` stays role-less on the host, carries no default accessible name, and relies on parent color widgets for slider semantics. Preserve the touch loupe behavior. Implement the **adaptive dual-border** approach (RSP-2021, SDS-16402) to achieve 3:1 non-text contrast across all track colors; the essential-presentation exception for this control is superseded by the conformant solution.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
|------|------|-------------------|-------------------------|---------|-------|
| [SWC-1134](https://jira.corp.adobe.com/browse/SWC-1134) | Bug | Done | Working As Designed | [Accessibility] Focus indicator lacks 3:1 contrast ratio — `sp-color-area` (Anatomy section), `sp-color-handle` | **Focused** handle **ring** / **borders** on **variable** backgrounds |
| [SWC-1135](https://jira.corp.adobe.com/browse/SWC-1135) | Bug | To Do | Unresolved | [Accessibility] Visible label missing — `sp-color-area` | **Parent** owns **label**; handle is **not** standalone |
| [SWC-1132](https://jira.corp.adobe.com/browse/SWC-1132) | Bug | To Do | Unresolved | [Accessibility] Visible label missing — `sp-color-slider` (Default, Vertical section) | **Parent** owns **`label`** / **`aria-label`** on internal range input |
| [SWC-1166](https://jira.corp.adobe.com/browse/SWC-1166) | Bug | Done | Working As Designed | [Accessibility] Color alone is used to convey info — `sp-color-area` (Anatomy and Accessible Label section) | **Fill** is **visual**; **parent** **sliders** announce **values** |
| [RSP-2021](https://jira.corp.adobe.com/browse/RSP-2021) | — | — | — | Adaptive border contrast for color area handle | Specification for the dual-border adaptive opacity approach that resolves 1.4.11 on spectrum tracks; see Known 1st-gen issues |
| [SDS-16402](https://jira.corp.adobe.com/browse/SDS-16402) | — | — | — | Non-text contrast — color area handle adaptive border specification | Spectrum Design System design decision for adaptive border opacity; drives the 2nd-gen implementation |

---

## Recommendations: `<swc-color-handle>`

### ARIA roles, states, and properties

| Topic | What to do |
|-------|------------|
| **One semantic role** | The handle represents **one** thing: a **visual thumb** on a **parent** color control. **Do not** set a host **`role`** that turns it into a **different** widget (**`role="slider"`**, **`role="button"`**, etc.). **Slider** semantics stay on the **parent** pattern. If authors need a **standalone** **slider**, they must use the **parent** color component or appropriate **slider** markup, **not** a role override on **`swc-color-handle`**. |
| **Role** | **No** default **`role`** on the host (**matches 1st-gen**). |
| **Name** | **Do not** require a default **`aria-label`** on the handle. The **parent** supplies **names** on its internal **range** inputs (or future **ElementInternals** / **form field** strategy). **Standalone** handle usage in docs must include a **labeled** **parent** or be marked **visual-only** / **`aria-hidden`** on the demo host. |
| **`color` property** | **Visual only** on the handle. **Assistive technology** should hear **values** from the **parent** control, not from parsing the handle **fill**. |
| **`disabled` property** | Reflect with **`[disabled]`** (and **`pointer-events: none`** as today). **Parent** **`disabled`** should **disable** interaction for the whole picker, including the handle. |
| **`focused` property** | **Visual** state set by the **parent** when the picker has **visible focus** in the tree. **Not** an ARIA **state** on the handle host. |
| **`open` property** | Controls embedded **`swc-color-loupe`** visibility (**touch** opens in **1st-gen** via **`pointerType === 'touch'`**). **Loupe** remains **decorative**; see [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md). |
| **S2 `showHandleFill` / `showColorLoupe`** | Map to **visual** toggles only. **Do not** map to **ARIA** **states** unless product defines a **documented** exception. |
| **Opacity checkerboard** | Applied on **`:host`** via shared **opacity checkerboard** CSS (**matches 1st-gen**). Follow [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md): pattern is **decorative** when **parent** announces **opacity** / **color** in text. |
| **Non-text contrast (1.4.11)** | Implement the adaptive dual-border technique specified in RSP-2021 and SDS-16402. Sample a 5px ring around the handle; composite rgba(0,0,0,α) over each adjacent sample — α starts at 42% and climbs until 3:1 is met against the gradient. A white separator between the two dark borders provides an additive check: the handle passes visibility if either the dark border or the white separator meets 3:1 on every adjacency. At gradient edges, also check the dark border against the page background. This approach has been verified to pass across the full HSV cube. The essential-presentation exception recorded in SWC-1134 no longer applies; a conformant solution exists. |
| **Docs** | State that **`swc-color-handle`** is a **primitive** used **inside** color pickers, **not** a **labeled** **form control** by itself. Point authors to **parent** docs for **labels**, **keyboard**, and **values**. Cite [**essential presentations**](https://accessibility.corp.adobe.com/docs/visual_design/color/#essential-presentations) when explaining **1.4.11** limits on **focus** **chrome**. |

### Shadow DOM and cross-root ARIA Issues

None

The handle does **not** use **`aria-labelledby`** / **`aria-describedby`** ID references across shadow boundaries, and it is **not** **form-associated** on its own. The embedded **`swc-color-loupe`** keeps **SVG** **`aria-hidden="true"`** per the loupe spec.

### Accessibility tree expectations

**Embedded in a parent color widget (supported use)**

- Assistive technologies should **not** treat the handle as the **primary** **slider**. **1st-gen** parents place **`tabindex="0"`** on **`<sp-color-handle>`** only until focus moves, then forward focus to **hidden** **`input[type="range"]`** elements that carry **`aria-label`**, **`aria-valuetext`**, and related properties.
- The handle host typically appears as a **focusable** custom element **without** an **accessible name** briefly during focus forwarding; **AT** should interact with the **parent** **range** inputs for **name** and **value** (verify per browser during **manual** testing of migrated parents).
- When **`open`** is **true**, the **loupe** subtree is **decorative** (**SVG** hidden); **color** meaning still comes from the **parent** control.

**Standalone handle (unsupported product use)**

- A lone **`<sp-color-handle>`** in a story or app exposes **no** **role** and **no** **name** if focused. **Do not** document standalone handles as an accessible pattern.

**Disabled**

- **`[disabled]`** hides the inner fill in **1st-gen** and removes **pointer** interaction; **parent** should prevent **keyboard** adjustment as well.

### Assistive technology, live regions

Does not apply. The handle does **not** own **value** announcements. **Parents** update **`aria-valuetext`** on internal **range** inputs. Do **not** add **`aria-live="assertive"`** on the handle; treat **`aria-live="polite"`** as **rare** on **parent** pickers only when product docs justify it.

### Keyboard and focus

**Default supported use:** embedded in **`swc-color-area`**, **`swc-color-slider`**, or **`swc-color-wheel`**.

- **Parents** may assign **`tabindex="0"`** on the handle as the **single** tab **entry** for the picker, then **forward** focus to internal **range** inputs (**matches 1st-gen** **`forwardFocus`** / **`hasVisibleFocusInTree`** pattern).
- The handle **reflects** keyboard focus **visually** via **`[focused]`** and **`:focus-visible`** (**size** expands to **`color-handle-size-key-focus`** in **1st-gen** tokens).
- **Arrow keys**, **Page Up** / **Page Down**, **Home**, and **End** are handled by the **parent**, not the handle class.
- **`swc-color-handle`** must **not** be documented as a **standalone** keyboard widget.
- When **`disabled`**, the handle must **not** remain the only **focusable** node in an otherwise **disabled** picker.

### Story and test examples

- **Stories** and **automated tests** should show **`swc-color-handle`** **inside** **`swc-color-area`**, **`swc-color-slider`**, or **`swc-color-wheel`**, with **labels** and **realistic** layouts, **not** as a **lone** thumb on an empty canvas (except narrow **visual** regression frames).
- **Composite** **aXe** runs must include the **parent** picker so **label** and **slider** rules apply.
- **Isolated** handle stories that pass **`to.be.accessible()`** today do **not** prove **product-ready** accessibility; treat them as **smoke** tests only.

---

## Known 1st-gen issues

### Non-text contrast on focused handle chrome (WCAG 1.4.11)

1st-gen `<sp-color-handle>` uses a static dark border at 42% opacity (with a second dark border on the focused handle) against whatever gradient color underlies the thumb. This frequently fails the 3:1 non-text contrast threshold required by WCAG 2.2 SC 1.4.11 on bright, saturated, or light gradient areas. SWC-1134 was closed "Working As Designed" under the Adobe Accessibility [essential presentations](https://accessibility.corp.adobe.com/docs/visual_design/color/#essential-presentations) rationale.

**Resolution for 2nd-gen (RSP-2021, SDS-16402):** An adaptive dual-border approach has been specified and prototyped ([color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip)) that achieves 3:1 across every color in the HSV cube without breaking the visual character of the control. The prototype demonstrates four border modes — the current static 42% opacity, a 100% static mode, and two adaptive modes (white-first and live α) — alongside live contrast readouts, keyboard- and drag-movable handles, and a drag-anywhere color area. The two adaptive modes are the reference for 2nd-gen:

1. **Sample** the 5px ring surrounding the handle. Classify each sample as gradient adjacency or page-background adjacency (when the handle overhangs a gradient edge).
2. **Dark border check (drives α):** composite rgba(0,0,0,α) over the adjacency color, then measure contrast. Start α at the floor (42%) and increase until 3:1 is reached for the gradient adjacency.
3. **White separator check (additive):** measure contrast(#FFFFFF, adjacency). Reported but does not lower α; provides an independent pass path.
4. **Strict edge mode:** when enabled, α is the maximum needed across both gradient and page-background adjacencies, so the dark border meets 3:1 on every side at edges.
5. **Bulletproof rule:** the handle is visible if every present adjacency has either its dark border or its white separator pass 3:1.

2nd-gen should implement adaptive border opacity following this specification. The essential-presentation exception for this control is superseded by the conformant solution in RSP-2021 and SDS-16402.

---

## Implementation: adaptive dual-border algorithm

This section translates the prototype in [color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip) into the steps a 2nd-gen implementer needs to follow. The loupe rendering variant is described below in [Loupe SVG rendering](#loupe-svg-rendering); the sampling and alpha computation are shared.

### Contrast utilities

Use standard WCAG 2.2 relative luminance and contrast ratio. The key addition is `compositeBlackOver`, which predicts the color of a dark border rendered at opacity α over a background:

```js
function srgbToLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function relativeLuminance([r, g, b]) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}
function contrastRatio(colorA, colorB) {
  const la = relativeLuminance(colorA), lb = relativeLuminance(colorB);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}

// Composite black at opacity α over an RGB background.
// Result: the rendered border color.
function compositeBlackOver([r, g, b], alpha) {
  return [Math.round(r * (1 - alpha)), Math.round(g * (1 - alpha)), Math.round(b * (1 - alpha))];
}
```

### Ring sampling

Sample a 5 px ring around the handle center using 24 angular positions × 3 radii (inner edge, mid-ring, outer edge). Classify each sample point:

- **Gradient sample**: the point falls inside the control boundary (color area canvas, hue ring band). Compute the gradient color at that position using the HSV model.
- **Page-background sample**: the point falls outside the boundary. Attribute it to the application background color.

```js
// Returns { gradient: [r, g, b], pageBg: [r, g, b], pageBgWeight: 0..1 }
function sampleSurrounding(handleCx, handleCy, sampleColor, isInsideBounds, pageBg) {
  const HANDLE_R_PX = 12, RING_PX = 5;
  const radii = [HANDLE_R_PX, HANDLE_R_PX + RING_PX / 2, HANDLE_R_PX + RING_PX];
  const SAMPLES = 24;
  let R = 0, G = 0, B = 0, gradientCount = 0, pageBgCount = 0;
  for (let i = 0; i < SAMPLES; i++) {
    const angle = (i / SAMPLES) * 2 * Math.PI;
    for (const r of radii) {
      const px = handleCx + Math.cos(angle) * r;
      const py = handleCy + Math.sin(angle) * r;
      if (isInsideBounds(px, py)) {
        const [rv, gv, bv] = sampleColor(px, py);
        R += rv; G += gv; B += bv; gradientCount++;
      } else {
        pageBgCount++;
      }
    }
  }
  const total = SAMPLES * radii.length;
  return {
    gradient: gradientCount > 0
      ? [Math.round(R / gradientCount), Math.round(G / gradientCount), Math.round(B / gradientCount)]
      : sampleColor(handleCx, handleCy),
    pageBg,
    pageBgWeight: pageBgCount / total
  };
}
```

### Finding the minimum α

Step α up from `floor` by 0.01 until the composited dark border meets the target contrast ratio against the adjacency color, or until α reaches 1.0:

```js
// Returns the minimum α in [floor, 1.0] that makes the dark border meet the target.
function findMinAlpha(adjacency, target = 3, floor = 0.42) {
  for (let a = floor; a <= 1 + 1e-9; a += 0.01) {
    if (contrastRatio(compositeBlackOver(adjacency, a), adjacency) >= target) return a;
  }
  return 1.0;
}
```

Note: both arguments to `contrastRatio` are derived from the same adjacency color. The dark border is composited black over the adjacency; the reference is the adjacency itself. This self-referential check correctly models "can this dark ring be perceived against the background it sits on?"

### Choosing α: the two adaptive modes

Collect the adjacencies to consider (gradient always; page background when `includePageBg` is on and the handle overhangs an edge):

```js
const WHITE = [255, 255, 255];

function computeAlpha(surrounding, mode, { target = 3, floor = 0.42, includePageBg = false } = {}) {
  const adjacencies = (includePageBg && surrounding.pageBgWeight > 0)
    ? [surrounding.gradient, surrounding.pageBg]
    : [surrounding.gradient];

  // Adaptive (live α): α climbs until the dark border meets the target
  // against the worst adjacency. Straightforward; recommended baseline.
  if (mode === 'adaptive-live') {
    return Math.max(...adjacencies.map(a => findMinAlpha(a, target, floor)));
  }

  // Adaptive (white-first): if the white separator already passes 3:1 against
  // every adjacency, stay at the floor for softer, more uniform borders.
  // Only escalate α when white cannot carry the load.
  if (mode === 'adaptive-smart') {
    const allWhitePass = adjacencies.every(a => contrastRatio(WHITE, a) >= target);
    return allWhitePass
      ? floor
      : Math.max(...adjacencies.map(a => findMinAlpha(a, target, floor)));
  }

  return floor;
}
```

### Visibility verdict: the additive dual check

After computing α, confirm that the handle is visible. The check is additive: the handle passes for each adjacency if **either** the dark border **or** the white separator meets the target:

```js
function isVisible(alpha, surrounding, target = 3) {
  const check = (adj) =>
    contrastRatio(compositeBlackOver(adj, alpha), adj) >= target ||
    contrastRatio(WHITE, adj) >= target;

  if (!check(surrounding.gradient)) return false;
  if (surrounding.pageBgWeight > 0 && !check(surrounding.pageBg)) return false;
  return true;
}
```

The prototype verifies this holds for every color in the HSV cube with default settings (floor 42%, target 3:1).

### Handle SVG rendering

The double-border handle renders two concentric dark circles separated by a white annulus. The white gap between the rings is the separator that provides the additive path to visibility:

```html
<!-- White annulus: fills the space between the outer and inner dark strokes.
     Even-odd fill rule punches the hole in the center. -->
<path fill="white" fill-rule="evenodd" d="
  M {cx - outerR - 1} {cy} a {outerR+1} {outerR+1} 0 1 0 {2*(outerR+1)} 0
                          a {outerR+1} {outerR+1} 0 1 0 {-2*(outerR+1)} 0 Z
  M {cx - innerR + 1} {cy} a {innerR-1} {innerR-1} 0 1 1 {2*(innerR-1)} 0
                            a {innerR-1} {innerR-1} 0 1 1 {-2*(innerR-1)} 0 Z
" />
<!-- Outer dark ring -->
<circle cx="{cx}" cy="{cy}" r="{outerR}" fill="none"
        stroke="rgba(0,0,0,{α})" stroke-width="2" />
<!-- Inner dark ring (encloses the color fill area) -->
<circle cx="{cx}" cy="{cy}" r="{innerR}" fill="none"
        stroke="rgba(0,0,0,{α})" stroke-width="2" />
```

**Size on focus/press (Spectrum focus pattern):** Growing the handle is the focus indicator — no separate focus ring is drawn.

| State | Outer radius | Inner radius | Visible diameter |
|-------|-------------|-------------|-----------------|
| Idle | 7 px | 3 px | 16 px |
| Active (focused or pressed) | 11 px | 5 px | 24 px |

Apply a 120 ms ease transition on radius changes for the grow/shrink effect.

### Loupe SVG rendering

The loupe uses a different structure from the handle. Instead of two dark rings, it uses a **white outer halo** to separate itself from the gradient, and a **single inner dark border** that contrasts against the white. This avoids a visually heavy double dark border on the loupe shape.

```html
<!-- 1. White halo: a white-filled, white-stroked outer teardrop provides
        3:1 separation between the loupe edge and the underlying gradient. -->
<path d="{outer-teardrop}" fill="white" stroke="white" stroke-width="3" />

<!-- 2. Color fill on a slightly smaller teardrop (~1 px inset from the inner
        border path). Inset prevents the inner border's centered stroke from
        landing on the colored fill (which causes a dark-rim artifact on
        bright hues). -->
<path d="{inner-fill-teardrop}" fill="{current-color}" />

<!-- 3. The single dark border. Stroke is centered on the inner teardrop path,
        so its inner half lands on white — always meeting 3:1 against white.
        No outer dark border is needed. -->
<path d="{inner-teardrop}" fill="none"
      stroke="rgba(0,0,0,{α})" stroke-width="2" />
```

The white separator path for the loupe is the 5 px gap between the outer and inner teardrop radii (23 px outer, 18 px inner in the prototype).

### Page-background edge mode (strict)

When the handle overhangs a control boundary, `pageBgWeight > 0` and some ring samples are attributed to the page background. Two behaviors:

- **Default (non-strict):** α is computed against the gradient adjacency only. The page-background adjacency is measured and shown in diagnostics, but it does not drive α.
- **Strict:** α is the maximum needed across both gradient and page-background adjacencies, ensuring the dark border meets 3:1 on every side at edges.

For 2nd-gen, evaluate whether strict mode should be the default based on how often handles sit at control edges in production color picker layouts.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit (`sp-color-handle`)** | **`open`** toggles on **touch** **pointer** events; **`disabled`** blocks **pointer**; **no** **`role`** / **`aria-*`** on host (**matches 1st-gen**). |
| **Unit (parents)** | Single **tab** stop behavior; **forwardFocus** reaches **labeled** **range** inputs; **handle** **`focused`** tracks **parent** focus. |
| **aXe + Storybook** | Run on **composite** stories (**area** / **slider** / **wheel** **+** **field** **label**), not **isolated** handle-only frames for **release** gates. |
| **Contrast** | Verify that the adaptive dual-border approach meets 3:1 on handle borders at representative gradient colors and at gradient edges against the page background, per RSP-2021 and SDS-16402. |
| **Integration** | **E2E** / snapshots use **labeled** pickers; **touch** opens **loupe** without breaking **parent** **aria-valuetext**. |

---

## Summary checklist

- [ ] **2nd-gen** host sets **no** default **`role`** and **no** **`aria-label`**; **slider** semantics stay on **parent** pickers.
- [ ] **`disabled`**, **`focused`**, and **`open`** behavior matches **1st-gen** and **S2** **states** docs without inventing **ARIA** **mappings**.
- [ ] **Touch** **`open`** still drives **`swc-color-loupe`**; **loupe** doc **decisions** (**1.4.11**, **decorative** **SVG**) remain **aligned**.
- [ ] **Opacity checkerboard** on **`:host`** follows [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md).
- [ ] **Stories** and **tests** use **labeled** **parent** pickers, not **standalone** handles, for **a11y** **gates**.
- [ ] Adaptive dual-border opacity is implemented on handle borders; 3:1 non-text contrast is verified across representative gradient colors and at gradient edges against the page background, per RSP-2021 and SDS-16402.
- [ ] **Docs** state the handle is a **primitive**; **authors** must not ship it **without** a **labeled** **parent** color widget.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)
- [WCAG 2.2 Success Criterion 1.4.11: Non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2 Success Criterion 1.4.1: Use of color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [Adobe Accessibility — Color: Essential presentations](https://accessibility.corp.adobe.com/docs/visual_design/color/#essential-presentations) (Adobe internal)
- [Color handle migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md)
- [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md)
- [S2 color handle documentation](https://s2.spectrum.corp.adobe.com/page/color-handle/)
- [S2 color handle — Figma (Web Desktop scale)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13065-162)
- [RSP-2021](https://jira.corp.adobe.com/browse/RSP-2021) (Adobe internal Jira — adaptive border contrast specification for color handle)
- [SDS-16402](https://jira.corp.adobe.com/browse/SDS-16402) (Adobe internal Jira — Spectrum Design System adaptive border specification)
- [color-area-adaptive-borders.zip](https://jira.corp.adobe.com/secure/attachment/18750666/18750666_color-area-adaptive-borders.zip) — interactive prototype demonstrating all four border modes with live contrast readouts
