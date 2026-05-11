<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Accordion / Accordion migration roadmap

<!-- Document title (editable) -->

# Accordion migration roadmap

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Component specifications](#component-specifications)
    - [CSS](#css)
    - [SWC](#swc)
- [Comparison](#comparison)
    - [DOM structure changes](#dom-structure-changes)
    - [CSS => SWC mapping](#css--swc-mapping)
- [Summary of changes](#summary-of-changes)
    - [CSS => SWC implementation gaps](#css--swc-implementation-gaps)
    - [CSS Spectrum 2 changes](#css-spectrum-2-changes)
- [Resources](#resources)

</details>

<!-- Document content (editable) -->

Spectrum 2 CSS-to-SWC migration notes for **`sp-accordion`** and **`sp-accordion-item`**. For accessibility behavior (APG accordion pattern, headings, keyboard), see [Accordion accessibility migration analysis](./accessibility-migration-analysis.md).

---

## Component specifications

### CSS

Source: `spectrum-css` `spectrum-two` branch → `components/accordion/dist/metadata.json`

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Accordion`

**Subcomponents:**

- `.spectrum-Accordion-item`
- `.spectrum-Accordion-itemContent`
- `.spectrum-Accordion-itemDirectActions`
- `.spectrum-Accordion-itemHeader`
- `.spectrum-Accordion-itemHeading`
- `.spectrum-Accordion-itemIndicator`
- `.spectrum-Accordion-itemTitle`

**Variants:**

- `.spectrum-Accordion--compact`
- `.spectrum-Accordion--quiet`
- `.spectrum-Accordion--sizeL`
- `.spectrum-Accordion--sizeS`
- `.spectrum-Accordion--sizeXL`
- `.spectrum-Accordion--spacious`
- `.spectrum-Accordion.spectrum-Accordion--noInlinePadding`

**States:**

- `.spectrum-Accordion-item.is-disabled`
- `.spectrum-Accordion-item.is-open > .spectrum-Accordion-itemContent`
- `.spectrum-Accordion-item.is-open > .spectrum-Accordion-itemHeading .spectrum-Accordion-itemIndicator`
- `.spectrum-Accordion-item:first-child`
- `.spectrum-Accordion-itemHeader.spectrum-Accordion-itemHeader:active`
- `.spectrum-Accordion-itemHeader:focus-visible`
- `.spectrum-Accordion-itemHeader:has(+ .spectrum-Accordion-itemDirectActions)`
- `.spectrum-Accordion-itemHeader:hover`
- `.spectrum-Accordion--quiet .spectrum-Accordion-itemHeader:active`
- `.spectrum-Accordion--quiet .spectrum-Accordion-itemHeader:hover`

**Language-specific:**

- `.spectrum-Accordion:lang(ja)`
- `.spectrum-Accordion:lang(ko)`
- `.spectrum-Accordion:lang(zh)`

**Compound selectors:**

- `.spectrum-Accordion--compact.spectrum-Accordion--sizeL`
- `.spectrum-Accordion--compact.spectrum-Accordion--sizeS`
- `.spectrum-Accordion--compact.spectrum-Accordion--sizeXL`
- `.spectrum-Accordion--spacious.spectrum-Accordion--sizeL`
- `.spectrum-Accordion--spacious.spectrum-Accordion--sizeS`
- `.spectrum-Accordion--spacious.spectrum-Accordion--sizeXL`
- `.spectrum-Accordion:dir(rtl)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

None found for this component.

</details>

### SWC

Source: `spectrum-web-components` `main` branch → `1st-gen/packages/accordion/src/Accordion.ts` and `AccordionItem.ts`

<details>
<summary>Attributes (sp-accordion)</summary>

- `allow-multiple` (boolean) — allows multiple items open simultaneously
- `density` (`compact` | `spacious`) — spacing between item content and borders
- `level` (number, default 3) — heading level (2–6) propagated to all items
- `size` (`s` | `m` | `l` | `xl`) — propagated to all child items

</details>

<details>
<summary>Attributes (sp-accordion-item)</summary>

- `open` (boolean) — whether the item is expanded
- `label` (string) — header title text
- `disabled` (boolean) — disables the item
- `level` (number, default 3) — heading level; overwritten by parent `sp-accordion`
- `size` — inherited from parent `sp-accordion`

</details>

<details>
<summary>Slots</summary>

**`sp-accordion`:**

- Default slot: `sp-accordion-item` children

**`sp-accordion-item`:**

- Default slot: panel body content (revealed when item is open)

</details>

---

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- sp-accordion shadow DOM: -->
<slot></slot>

<!-- sp-accordion-item shadow DOM (size="m" example): -->
<h3 id="heading">
  <span class="iconContainer">
    <sp-icon-chevron100
      class="indicator spectrum-UIIcon-ChevronRight100"
      slot="icon"
    ></sp-icon-chevron100>
  </span>
  <button
    id="header"
    type="button"
    aria-expanded="false"
    aria-controls="content"
  >
    Label text
  </button>
</h3>
<div id="content" role="region" aria-labelledby="header">
  <slot></slot>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<!-- Branch verified: main; first import: "@spectrum-css/icon/stories/template.js" -->
<!-- Distinguishing feature vs spectrum-two: no ActionButton/Switch imports; icon in span.spectrum-Accordion-itemIconContainer outside button -->
<div class="spectrum-Accordion spectrum-Accordion--sizeM" role="region">
  <div class="spectrum-Accordion-item is-open" role="presentation">
    <h3 class="spectrum-Accordion-itemHeading">
      <button
        class="spectrum-Accordion-itemHeader"
        type="button"
        id="spectrum-accordion-item-0-header"
        aria-controls="spectrum-accordion-item-0-content"
        aria-expanded="true"
      >
        Heading
      </button>
      <span class="spectrum-Accordion-itemIconContainer">
        <!-- ChevronDown (open) or ChevronRight (closed) -->
        <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100 spectrum-Accordion-itemIndicator">...</svg>
      </span>
    </h3>
    <div
      class="spectrum-Accordion-itemContent"
      role="region"
      id="spectrum-accordion-item-0-content"
      aria-labelledby="spectrum-accordion-item-0-header"
    >
      Content
    </div>
  </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- Branch verified: spectrum-two; first import: "@spectrum-css/actionbutton/stories/template.js" -->
<!-- Distinguishing feature vs main: ActionButton + Switch imports present; icon moved inside button; span.spectrum-Accordion-itemTitle wraps heading text -->
<div class="spectrum-Accordion spectrum-Accordion--quiet" role="region">
  <div class="spectrum-Accordion-item is-open" role="presentation">
    <h3 class="spectrum-Accordion-itemHeading">
      <button
        class="spectrum-Accordion-itemHeader is-hover"
        type="button"
        id="spectrum-accordion-item-0-header"
        aria-controls="spectrum-accordion-item-0-content"
        aria-expanded="true"
      >
        <!-- Icon is now the FIRST CHILD inside the button -->
        <svg class="spectrum-Icon spectrum-UIIcon-ChevronDown100 spectrum-Accordion-itemIndicator">...</svg>
        <span class="spectrum-Accordion-itemTitle">Heading</span>
      </button>
      <!-- Optional direct actions (new in S2): -->
      <div class="spectrum-Accordion-itemDirectActions">
        <!-- Icon-only ActionButton and/or Switch component -->
      </div>
    </h3>
    <div
      class="spectrum-Accordion-itemContent"
      role="region"
      id="spectrum-accordion-item-0-content"
      aria-labelledby="spectrum-accordion-item-0-header"
    >
      Content
    </div>
  </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
--- Legacy DOM structure (main branch)
+++ Spectrum 2 DOM structure (spectrum-two branch)
@@ AccordionItem function signature @@
 export const AccordionItem = ({
   ...
   isOpen = false,
+  isHovered = false,
+  isActive = false,
+  isFocused = false,
+  hasActionButton = false,
+  hasSwitch = false,
+  actionButtonIconName = "",
+  size = "m",
   iconSize = "m",
   ...
 })

@@ AccordionItem button @@
-  <button
-    class="${rootClass}Header"
+  <button
+    class="spectrum-Accordion-itemHeader [is-hover] [is-active] [is-focus-visible]"
     type="button" ...
   >
-    ${heading}
-  </button>
-  <span class="${rootClass}IconContainer">
-    ${Icon({ iconName: !isOpen ? "ChevronRight" : "ChevronDown", ... })}
-  </span>
+    ${Icon({ iconName: "ChevronRight75/100/200/300" based on size, ... })}
+    <span class="${rootClass}Title">${heading}</span>
+  </button>
+  ${when(hasActionButton || hasSwitch,
+    <div class="${rootClass}DirectActions">
+      ${ActionButton(...)}
+      ${Switch(...)}
+    </div>
+  )}

@@ Template function signature @@
 export const Template = ({
   rootClass = "spectrum-Accordion",
   size = "m",
   density = "regular",
+  isQuiet = false,
+  hasNoInlinePadding = false,
   items = [],
+  hasActionButtons = false,
+  actionButtonIconName = "",
+  hasSwitches = false,
   ...
 })

@@ Template root class map @@
-  [`${rootClass}--size${size?.toUpperCase()}`]: typeof size !== "undefined",
+  [`${rootClass}--size${size?.toUpperCase()}`]: typeof size !== "undefined" && size !== "m",
+  [`${rootClass}--quiet`]: isQuiet,
+  [`${rootClass}--noInlinePadding`]: hasNoInlinePadding,
```

</details>

### CSS => SWC mapping

| CSS selector | Attribute or slot | Status |
|---|---|---|
| `.spectrum-Accordion` | `sp-accordion` host element | Implemented |
| `.spectrum-Accordion-item` | `sp-accordion-item` child element | Implemented |
| `.spectrum-Accordion-itemHeading` | `h[2-6]#heading` | Implemented |
| `.spectrum-Accordion-itemHeader` | `button#header` | Implemented |
| `.spectrum-Accordion-itemIndicator` | chevron icon with `indicator` class | Implemented |
| `.spectrum-Accordion-itemContent` | `div#content` | Implemented |
| `.spectrum-Accordion-item.is-disabled` | `disabled` attribute | Implemented |
| `.spectrum-Accordion-item.is-open > .spectrum-Accordion-itemContent` | `open` attribute | Implemented |
| `.spectrum-Accordion-item.is-open > .spectrum-Accordion-itemHeading .spectrum-Accordion-itemIndicator` | `open` attribute | Implemented |
| `.spectrum-Accordion-item:first-child` | CSS structural selector (no WC attribute needed) | Implemented |
| `.spectrum-Accordion-itemHeader:focus-visible` | Native `:focus-visible` on `button#header` | Implemented |
| `.spectrum-Accordion-itemHeader:hover` | Native `:hover` on `button#header` | Implemented |
| `.spectrum-Accordion-itemHeader.spectrum-Accordion-itemHeader:active` | Native `:active` on `button#header` | Implemented |
| `.spectrum-Accordion--compact` | `density="compact"` | Implemented |
| `.spectrum-Accordion--spacious` | `density="spacious"` | Implemented |
| `.spectrum-Accordion--sizeL`, `.spectrum-Accordion--sizeS`, `.spectrum-Accordion--sizeXL` | `size="l"`, `size="s"`, `size="xl"` | Implemented |
| `.spectrum-Accordion--compact.spectrum-Accordion--sizeL/S/XL` | `density="compact"` + `size` | Implemented |
| `.spectrum-Accordion--spacious.spectrum-Accordion--sizeL/S/XL` | `density="spacious"` + `size` | Implemented |
| `.spectrum-Accordion:lang(ja)`, `.spectrum-Accordion:lang(ko)`, `.spectrum-Accordion:lang(zh)` | Language-specific styling | Implemented |
| `.spectrum-Accordion:dir(rtl)` | RTL direction | Implemented |
| `.spectrum-Accordion--quiet` | — | Missing from WC |
| `.spectrum-Accordion--quiet .spectrum-Accordion-itemHeader:active` | — | Missing from WC |
| `.spectrum-Accordion--quiet .spectrum-Accordion-itemHeader:hover` | — | Missing from WC |
| `.spectrum-Accordion.spectrum-Accordion--noInlinePadding` | — | Missing from WC |
| `.spectrum-Accordion-itemDirectActions` | — | Missing from WC |
| `.spectrum-Accordion-itemHeader:has(+ .spectrum-Accordion-itemDirectActions)` | — | Missing from WC |
| `.spectrum-Accordion-itemTitle` | — | Missing from WC |
| — | `allow-multiple` | Missing from CSS |
| — | `level` | Missing from CSS |

---

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC** (CSS features that need new implementation):

- **`quiet` variant** — `.spectrum-Accordion--quiet` is new in S2; no corresponding attribute exists in the 1st-gen component. Requires adding a `quiet` boolean property to `sp-accordion` (with appropriate propagation to items) and dedicated quiet hover/active states on the item header. **Figma usage guidance:** do not mix default and quiet items inside one accordion — the styles are mutually exclusive and produce conflicting interaction behaviors. The quiet hover state uses rounded corners, which creates corner gaps when placed inside a default accordion that uses dividers; prefer one style family per accordion instance.
- **`noInlinePadding` modifier** — `.spectrum-Accordion--noInlinePadding` is new in S2; no corresponding attribute exists in 1st-gen.
- **Direct actions area** — `.spectrum-Accordion-itemDirectActions` is a new optional region inside the item heading (sibling of the button) that houses an ActionButton and/or Switch. Neither element nor the associated `:has(+ .spectrum-Accordion-itemDirectActions)` state selector has any 1st-gen equivalent.
- **`itemTitle` span** — Heading text in S2 is wrapped in `<span class="spectrum-Accordion-itemTitle">` inside the button; 1st-gen renders the `label` property as a direct text node. The DOM structure of `AccordionItem.renderHeading()` must change.

**Missing from CSS** (WC features with no CSS selector equivalent):

- `allow-multiple` — purely behavioral (JS toggle logic); no CSS impact, no migration action needed.
- `level` — controls heading element type (`h2`–`h6`); accessibility/structural only, no CSS impact.

### CSS Spectrum 2 changes

- **Icon relocated inside button**: The chevron indicator moved from a `<span class="spectrum-Accordion-itemIconContainer">` placed after and outside the `<button>` to the first child element inside the button. The `spectrum-Accordion-itemIconContainer` wrapper span was removed entirely in S2. The SWC render currently places the icon in `<span class="iconContainer">` before the button; both the wrapper and position must change.
- **Heading text wrapped in `span.spectrum-Accordion-itemTitle`**: Previously a bare text node inside the button; in S2 it becomes `<span class="spectrum-Accordion-itemTitle">`.
- **Direct actions area added**: New `div.spectrum-Accordion-itemDirectActions` inside the item heading (sibling of the button, after it), conditionally rendering an icon-only ActionButton and/or a Switch.
- **`quiet` variant and its states added**: `.spectrum-Accordion--quiet` on the root with scoped hover/active overrides (`.spectrum-Accordion--quiet .spectrum-Accordion-itemHeader:hover/active`). Previously absent from both S1 CSS and SWC.
- **`noInlinePadding` modifier added**: `.spectrum-Accordion--noInlinePadding` on the root is new in S2.

---

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3684)
- [CSS Direct actions fast follow](https://github.com/adobe/spectrum-css/pull/4020)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/story/components-accordion--default)
- [React](https://react-spectrum.adobe.com/Accordion)
- [Figma — S2 Web (Desktop scale), Accordion](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=39469-5419&p=f&m=dev)
- [1st-gen accordion package](../../../../1st-gen/packages/accordion/)
- [Migration plan](./migration-plan.md)
- [Accessibility analysis](./accessibility-migration-analysis.md)
- [Migration prep (phase 1)](./migration-prep.md)
- [Analyze rendering and styling (workflow)](../../02_workstreams/02_2nd-gen-component-migration/02_step-by-step/01_analyze-rendering-and-styling/README.md)
- [Spectrum CSS — use `spectrum-two` branch](https://github.com/adobe/spectrum-css)
