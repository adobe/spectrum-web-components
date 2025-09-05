# Progress Circle migration roadmap

## CSS selectors

<details>
<summary>CSS selectors</summary>

- `.spectrum-ProgressCircle`
- `.spectrum-ProgressCircle--indeterminate .spectrum-ProgressCircle-fill`
- `.spectrum-ProgressCircle--sizeL`
- `.spectrum-ProgressCircle--sizeS`
- `.spectrum-ProgressCircle-fill`
- `.spectrum-ProgressCircle-track`
- `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticBlack`
- `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticWhite`
- `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-innerCircle`
- `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-outerCircle`

</details>

## Passthroughs

<details>
<summary>Passthroughs</summary>

No passthroughs found for this component.

</details>

## Attributes

<details>
<summary>Attributes</summary>

- `indeterminate` - Boolean attribute for indeterminate state
- `label` - String attribute for accessibility label
- `static-color` - String attribute for static color variants (white)
- `progress` - Number attribute for progress value (0-100)
- `size` - String attribute for size variants (s, m, l)

</details>

## Slots

<details>
<summary>Slots</summary>

- Default slot - Optional content for accessibility labeling

</details>

## Modifiers

<details>
<summary>Modifiers</summary>

- `--mod-progress-circle-fill-border-color`
- `--mod-progress-circle-position`
- `--mod-progress-circle-size`
- `--mod-progress-circle-thickness`
- `--mod-progress-circle-track-border-color`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<div
    class="spectrum-ProgressCircle spectrum-ProgressCircle--medium spectrum-ProgressCircle--indeterminate"
>
    <div class="spectrum-ProgressCircle-track"></div>
    <div class="spectrum-ProgressCircle-fills">
        <div class="spectrum-ProgressCircle-fillMask1">
            <div class="spectrum-ProgressCircle-fillSubMask1">
                <div class="spectrum-ProgressCircle-fill"></div>
            </div>
        </div>
        <div class="spectrum-ProgressCircle-fillMask2">
            <div class="spectrum-ProgressCircle-fillSubMask2">
                <div class="spectrum-ProgressCircle-fill"></div>
            </div>
        </div>
    </div>
</div>
```

**Spectrum 2 (spectrum-two branch):**

```html
<div class="spectrum-ProgressCircle spectrum-ProgressCircle--indeterminate">
    <svg fill="none" width="100%" height="100%" class="spectrum-outerCircle">
        <circle
            class="spectrum-innerCircle"
            cx="50%"
            cy="50%"
            r="calc(50% - 1px)"
            stroke-width="2"
        />
        <circle
            cx="50%"
            cy="50%"
            class="spectrum-ProgressCircle-track"
            r="calc(50% - 1.5px)"
        />
        <circle
            cx="50%"
            cy="50%"
            r="calc(50% - 1.5px)"
            class="spectrum-ProgressCircle-fill"
            pathLength="100"
            stroke-dasharray="100 200"
            stroke-dashoffset="0"
            stroke-linecap="round"
        />
    </svg>
</div>
```

## Comparison

| CSS selector                                                                                  | Attribute or slot         | Status          |
| --------------------------------------------------------------------------------------------- | ------------------------- | --------------- |
| `.spectrum-ProgressCircle`                                                                    | Base component            | Implemented     |
| `.spectrum-ProgressCircle--indeterminate .spectrum-ProgressCircle-fill`                       | `indeterminate` attribute | Implemented     |
| `.spectrum-ProgressCircle--sizeL`                                                             | `size="l"`                | Implemented     |
| `.spectrum-ProgressCircle--sizeS`                                                             | `size="s"`                | Implemented     |
| `.spectrum-ProgressCircle-fill`                                                               | Progress fill element     | Implemented     |
| `.spectrum-ProgressCircle-track`                                                              | Track element             | Implemented     |
| `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticBlack`                               | `static-color` attribute  | Missing from WC |
| `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticWhite`                               | `static-color="white"`    | Implemented     |
| `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-innerCircle` | Non-indeterminate state   | Implemented     |
| `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-outerCircle` | Non-indeterminate state   | Implemented     |

## Key Structural Changes

**Element Hierarchy Changes:**

- **Major restructuring**: Legacy uses complex nested div structure with masks and submasks
- **Spectrum 2**: Simplified to SVG-based approach with circles for track and fill
- **Removed complexity**: Eliminated the complex mask/submask system in favor of SVG stroke-dasharray

**Class Name Changes:**

- **Size classes**: Legacy uses `--small`, `--medium`, `--large` while Spectrum 2 uses `--sizeS`, `--sizeM`, `--sizeL`
- **Static color**: Legacy supports both `--staticBlack` and `--staticWhite`, Spectrum 2 only supports `--staticWhite`
- **Simplified structure**: Removed complex fill mask classes in favor of SVG-based approach

**Attribute Changes:**

- **No new required attributes**
- **No removed attributes**
- **Size values**: Legacy uses `small/medium/large`, Spectrum 2 uses `s/m/l`

**Slot/Content Changes:**

- **No changes in slot usage**
- **Content structure**: Completely different internal implementation approach

**Migration Impact:**

- **Breaking changes**: Complete restructuring of internal DOM elements
- **Visual consistency**: Maintained through CSS styling but different underlying structure
- **Accessibility**: Preserved through maintained attributes and ARIA support

## Implementation Gaps Analysis

### CSS Features Missing from Web Component

- **Static black variant**: CSS supports `--staticBlack` but web component only supports `--staticWhite`
- **Complex mask system**: Legacy CSS has sophisticated mask/submask system that's not replicated in web component
- **Theme imports**: Legacy includes multiple theme imports that may affect styling

### Web Component Features Missing from CSS

- **SVG-based rendering**: Web component uses modern SVG approach not present in legacy CSS
- **Simplified structure**: Web component eliminates complex mask system in favor of cleaner SVG implementation

### Features Being Deprecated/Removed

- **Complex mask system**: The intricate fillMask1/fillMask2/fillSubMask1/fillSubMask2 structure is removed
- **Theme-specific imports**: Legacy theme imports are simplified in Spectrum 2
- **Static black variant**: No longer supported in Spectrum 2

## Action Items for Web Component Maintainers

**Required Additions:**

- Implement `static-color="black"` variant to match legacy `--staticBlack` support
- Ensure SVG-based rendering maintains visual parity with legacy mask-based approach
- Consider exposing mask-related custom properties for advanced customization

**Required Removals:**

- No specific removals required - the web component already simplifies the complex legacy structure

**Breaking Changes:**

- **Major structural changes**: Complete rewrite of internal DOM structure from div-based masks to SVG-based circles
- **Size class changes**: Migration from `small/medium/large` to `s/m/l` values
- **Static color limitation**: Loss of `staticBlack` variant support
- **Template updates required**: Consumers will need to update any code that relies on the specific legacy DOM structure
