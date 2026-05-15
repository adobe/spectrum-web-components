<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Color Loupe / Color loupe migration analysis

<!-- Document title (editable) -->

# Color loupe migration analysis

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [Properties](#properties)
- [Slots](#slots)
- [Events](#events)
- [CSS custom properties](#css-custom-properties)
    - [Spectrum tokens consumed (host / loupe)](#spectrum-tokens-consumed-host--loupe)
    - [Mod overrides](#mod-overrides)
    - [Set in TypeScript](#set-in-typescript)
- [Mixins](#mixins)
- [Render DOM structure](#render-dom-structure)
- [Gen-2 delta notes](#gen-2-delta-notes)
- [Factor assessment](#factor-assessment)

</details>

<!-- Document content (editable) -->

## Properties

| Name    | Type      | Default                  | Reflects | Deprecated |
| ------- | --------- | ------------------------ | -------- | ---------- |
| `open`  | `boolean` | `false`                  | Yes      | No         |
| `color` | `string`  | `'rgba(255, 0, 0, 0.5)'` | No       | No         |

## Slots

None. The component renders only internal markup.

## Events

None dispatched.

## CSS custom properties

### Spectrum tokens consumed (host / loupe)

- `--spectrum-color-handle-size`
- `--spectrum-color-handle-outer-border-width`
- `--spectrum-color-loupe-bottom-to-color-handle`
- `--spectrum-color-loupe-width`
- `--spectrum-color-loupe-height`
- `--spectrum-drop-shadow-x` (S1) / `--spectrum-drop-shadow-elevated-x` (S2)
- `--spectrum-color-loupe-drop-shadow-y` (S1) / `--spectrum-drop-shadow-elevated-y` (S2)
- `--spectrum-color-loupe-drop-shadow-blur` (S1) / `--spectrum-drop-shadow-elevated-blur` (S2)
- `--spectrum-color-loupe-drop-shadow-color` (S1) / `--spectrum-drop-shadow-elevated-color` (S2)
- `--spectrum-color-loupe-inner-border`
- `--spectrum-color-loupe-inner-border-width`
- `--spectrum-color-loupe-outer-border`
- `--spectrum-color-loupe-outer-border-width`
- `--spectrum-opacity-checkerboard-square-dark`
- `--spectrum-opacity-checkerboard-square-light`

### Mod overrides

- `--mod-colorloupe-offset`
- `--mod-colorloupe-drop-shadow-x`
- `--mod-colorloupe-drop-shadow-y`
- `--mod-colorloupe-drop-shadow-blur`
- `--mod-colorloupe-drop-shadow-color`
- `--mod-colorloupe-animation-distance`
- `--mod-colorloupe-inner-border-color`
- `--mod-colorloupe-inner-border-width`
- `--mod-colorloupe-outer-border-color`
- `--mod-colorloupe-outer-border-width`

### Set in TypeScript

- `--spectrum-picked-color` — inline style on `<svg>`, driven by `this.color`

## Mixins

None. Extends `SpectrumElement` directly.

## Render DOM structure

```html
<!-- opacity checkerboard background clipped to loupe shape -->
<div class="opacity-checkerboard loupe-clipped"></div>
<!-- inner border fill clipped to loupe shape -->
<div class="spectrum-ColorLoupe-inner-border loupe-clipped"></div>
<!-- outer border fill clipped to loupe shape -->
<div class="spectrum-ColorLoupe-outer-border loupe-clipped"></div>
<!-- SVG with loupe path, mask defs, and border strokes -->
<svg
  aria-hidden="true"
  class="spectrum-ColorLoupe is-open"
  overflow="visible"
  style="--spectrum-picked-color: ${color}; position: absolute;"
>
  <defs>
    <path
      id="loupe-path"
      d="M23 61.575C...61.575ZZ"
      transform="translate(2, 2)"
    />
    <mask id="loupe-mask">
      <rect x="0" y="0" height="100" width="100" fill="white" />
      <use xlink:href="#path" fill="black" />
      <!-- BUG: should be #loupe-path -->
    </mask>
  </defs>
  <g class="spectrum-ColorLoupe-loupe">
    <g>
      <use
        xlink:href="#loupe-path"
        mask="url(#loupe-mask)"
        transform="translate(2, 2)"
        class="spectrum-ColorLoupe-inner-border"
      />
      <use
        xlink:href="#loupe-path"
        mask="url(#loupe-mask)"
        class="spectrum-ColorLoupe-outer-border"
      />
    </g>
  </g>
</svg>
```

## Gen-2 delta notes

- **Double-Z path bug**: The SVG path data ends with `61.575ZZ` (double close command); fix to `61.575Z`.
- **Mask ID mismatch**: `<use xlink:href="#path">` inside `<mask>` references a non-existent `#path` ID — should be `#loupe-path`. Fix in gen-2.
- **S2 token migration**: The `spectrum-two` branch of spectrum-css introduces `--spectrum-colorloupe-*` intermediary tokens and switches drop shadows to `--spectrum-drop-shadow-elevated-*`. In SWC gen-2 these map to `token("color-loupe-*")` and `token("drop-shadow-elevated-*")`.
- **Opacity checkerboard**: 1st-gen imports from `@spectrum-web-components/opacity-checkerboard`. Gen-2 should inline the checkerboard pattern using `--swc-opacity-checkerboard-*` tokens from `tokens.css`.
- **No new S2 properties anticipated**: The component API (`open`, `color`) is unchanged between S1 and S2.

## Factor assessment

**Recommendation: SKIP_FACTOR**

The component is purely presentational with only two `@property` fields, no lifecycle methods beyond the inherited defaults, and no event dispatching. The `render()` method is tightly coupled to the `color` property (inline style) and `open` state (CSS-driven). There is no separable state logic to extract. Total substantive logic is under 40 lines.
