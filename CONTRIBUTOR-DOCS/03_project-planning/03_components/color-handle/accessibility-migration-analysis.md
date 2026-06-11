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
- [Testing](#testing)
    - [Automated tests](#automated-tests)
- [Summary checklist](#summary-checklist)
- [References](#references)

</details>

<!-- Document content (editable) -->

## Overview

This doc explains how **`swc-color-handle`** should work for **accessibility**. It supports **WCAG 2.2 Level AA** as the team target, while recording **known** limitations for **non-text contrast** on the handle **focus** ring. Until **`swc-color-handle`** ships under `2nd-gen/`, use **`1st-gen/packages/color-handle/src/ColorHandle.ts`** (`<sp-color-handle>`) as the behavioral reference and update this spec against the real 2nd-gen source when it lands.

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
| [Non-text contrast (WCAG 1.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) | **Borders** and **focus** **chrome** needed to **perceive** the thumb against **variable** track colors should meet **at least 3:1** where **feasible**. **1st-gen** **focused** styling is **Working As Designed** per audit when **3:1** is **not** achievable on all backgrounds; see **Known 1st-gen issues**. |
| [Non-text content (WCAG 1.1.1)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content) | The handle **fill** and **borders** are **graphical** relative to assistive tech when the **parent** already exposes **value** and **purpose**. Do **not** add a conflicting **`role="img"`** on the host unless product and a11y agree on a **redundant** name strategy. |
| [Focus appearance (WCAG 2.4.11)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance) / [Focus visible (WCAG 2.4.7)](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Keyboard users must see **which** picker has focus. **1st-gen** reflects focus with **`[focused]`** / **`:focus-visible`** **size** expansion and **border** treatment on the handle while **`outline: none`** is set on **`:host(:focus)`**; verify **2nd-gen** keeps a **visible** focus indicator aligned with parent behavior. |

**Bottom line:** **`swc-color-handle`** stays **role-less** on the host, carries **no** default **accessible name**, and relies on **parent** color widgets for **slider** semantics. Preserve the **touch** loupe behavior and document **1.4.11** limits on **focus** **chrome** where design requires.

---

## Related 1st-gen accessibility (Jira)

| Jira | Type | Status (snapshot) | Resolution (snapshot) | Summary | Notes |
|------|------|-------------------|-------------------------|---------|-------|
| [SWC-1134](https://jira.corp.adobe.com/browse/SWC-1134) | Bug | Done | Working As Designed | [Accessibility] Focus indicator lacks 3:1 contrast ratio — `sp-color-area` (Anatomy section), `sp-color-handle` | **Focused** handle **ring** / **borders** on **variable** backgrounds |
| [SWC-1135](https://jira.corp.adobe.com/browse/SWC-1135) | Bug | To Do | Unresolved | [Accessibility] Visible label missing — `sp-color-area` | **Parent** owns **label**; handle is **not** standalone |
| [SWC-1132](https://jira.corp.adobe.com/browse/SWC-1132) | Bug | To Do | Unresolved | [Accessibility] Visible label missing — `sp-color-slider` (Default, Vertical section) | **Parent** owns **`label`** / **`aria-label`** on internal range input |
| [SWC-1166](https://jira.corp.adobe.com/browse/SWC-1166) | Bug | Done | Working As Designed | [Accessibility] Color alone is used to convey info — `sp-color-area` (Anatomy and Accessible Label section) | **Fill** is **visual**; **parent** **sliders** announce **values** |

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
| **Docs** | State that **`swc-color-handle`** is a **primitive** used **inside** color pickers, **not** a **labeled** **form control** by itself. Point authors to **parent** docs for **labels**, **keyboard**, and **values**. |

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

- **1st-gen** **`<sp-color-handle>`** **focused** styling (**white** border, **outer** ring, **enlarged** hit area) often **does not** achieve **3:1** **contrast** against **adjacent** **track** / **gradient** colors required by [**WCAG 2.2 Success Criterion 1.4.11**](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast).
- **[SWC-1134](https://jira.corp.adobe.com/browse/SWC-1134)** (Adobe **internal** Jira): audit finding for **`sp-color-area`** anatomy and **`sp-color-handle`** was closed **Working As Designed** because the thumb sits on **arbitrary** **color** **backgrounds** and **Spectrum** **visual** intent prioritizes **legibility** of the **picked** **fill** over a **fixed** **focus** **ring** **contrast** on every background.
- **2nd-gen** should **re-measure** against [S2 Figma](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13065-162) tokens (**inner** / **outer** border opacities, **`color-handle-size-key-focus`**) and either **improve** contrast where **design** allows or **document** the same **constraint** explicitly in **release** / **audit** notes.

---

## Testing

### Automated tests

| Kind of test | What to check |
|--------------|----------------|
| **Unit (`sp-color-handle`)** | **`open`** toggles on **touch** **pointer** events; **`disabled`** blocks **pointer**; **no** **`role`** / **`aria-*`** on host (**matches 1st-gen**). |
| **Unit (parents)** | Single **tab** stop behavior; **forwardFocus** reaches **labeled** **range** inputs; **handle** **`focused`** tracks **parent** focus. |
| **aXe + Storybook** | Run on **composite** stories (**area** / **slider** / **wheel** **+** **field** **label**), not **isolated** handle-only frames for **release** gates. |
| **Contrast** | Sample **focused** handle on **light**, **dark**, and **saturated** track backgrounds; record **gaps** per **Known 1st-gen issues**. |
| **Integration** | **E2E** / snapshots use **labeled** pickers; **touch** opens **loupe** without breaking **parent** **aria-valuetext**. |

---

## Summary checklist

- [ ] **2nd-gen** host sets **no** default **`role`** and **no** **`aria-label`**; **slider** semantics stay on **parent** pickers.
- [ ] **`disabled`**, **`focused`**, and **`open`** behavior matches **1st-gen** and **S2** **states** docs without inventing **ARIA** **mappings**.
- [ ] **Touch** **`open`** still drives **`swc-color-loupe`**; **loupe** doc **decisions** (**1.4.11**, **decorative** **SVG**) remain **aligned**.
- [ ] **Opacity checkerboard** on **`:host`** follows [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md).
- [ ] **Stories** and **tests** use **labeled** **parent** pickers, not **standalone** handles, for **a11y** **gates**.
- [ ] **Focused** **handle** **contrast** is **measured** on **key** themes; **SWC-1134** **position** is **reflected** if **3:1** remains **impractical**.
- [ ] **Docs** state the handle is a **primitive**; **authors** must not ship it **without** a **labeled** **parent** color widget.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Using ARIA (read this first)](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)
- [WAI-ARIA slider pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)
- [WCAG 2.2 Success Criterion 1.4.11: Non-text contrast (understanding)](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- [WCAG 2.2 Success Criterion 1.4.1: Use of color](https://www.w3.org/TR/WCAG22/#use-of-color)
- [Color handle migration roadmap](./rendering-and-styling-migration-analysis.md)
- [Color loupe accessibility migration analysis](../color-loupe/accessibility-migration-analysis.md)
- [Opacity checkerboard accessibility migration analysis](../opacity-checkerboard/accessibility-migration-analysis.md)
- [S2 color handle documentation](https://s2.spectrum.corp.adobe.com/page/color-handle/)
- [S2 color handle — Figma (Web Desktop scale)](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13065-162)
