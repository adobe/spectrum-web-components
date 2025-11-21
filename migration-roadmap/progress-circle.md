# Progress Circle migration roadmap

## Component specifications

### CSS

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

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-progress-circle-fill-border-color`
- `--mod-progress-circle-position`
- `--mod-progress-circle-size`
- `--mod-progress-circle-thickness`
- `--mod-progress-circle-track-border-color`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `size` (s, m, l)
- `indeterminate` (boolean)
- `label` (string)
- `static-color` (white)
- `progress` (number)

</details>

<details>
<summary>Slots</summary>

- Default slot (for label content, sets the aria label)

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-progress-circle role="progressbar" aria-valuenow="50">
    #shadow-root
    <slot></slot>
    <div class="track"></div>
    <div class="fills">
        <div class="fillMask1">
            <div class="fillSubMask1" style="transform: rotate(0deg);">
                <div class="fill"></div>
            </div>
        </div>
        <div class="fillMask2">
            <div class="fillSubMask2" style="transform: rotate(0deg);">
                <div class="fill"></div>
            </div>
        </div>
    </div>
</sp-progress-circle>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-ProgressCircle spectrum-ProgressCircle--medium"
    id="progress-circle-123"
    data-testid="test-id"
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

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-ProgressCircle"
    id="progress-circle-123"
    data-testid="test-id"
>
    <svg fill="none" width="100%" height="100%" class="spectrum-outerCircle">
        <circle
            class="spectrum-innerCircle"
            cx="50%"
            cy="50%"
            r="calc(50% - 3px)"
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
            stroke-dashoffset="50"
            stroke-linecap="round"
        />
    </svg>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
<div
    class="spectrum-ProgressCircle"
-   class="spectrum-ProgressCircle spectrum-ProgressCircle--medium"
    id="progress-circle-123"
    data-testid="test-id"
>
-   <div class="spectrum-ProgressCircle-track"></div>
-   <div class="spectrum-ProgressCircle-fills">
-       <div class="spectrum-ProgressCircle-fillMask1">
-           <div class="spectrum-ProgressCircle-fillSubMask1">
-               <div class="spectrum-ProgressCircle-fill"></div>
-           </div>
-       </div>
-       <div class="spectrum-ProgressCircle-fillMask2">
-           <div class="spectrum-ProgressCircle-fillSubMask2">
-               <div class="spectrum-ProgressCircle-fill"></div>
-           </div>
-       </div>
-   </div>
+   <svg fill="none" width="100%" height="100%" class="spectrum-outerCircle">
+       <circle class="spectrum-innerCircle" cx="50%" cy="50%" r="calc(50% - 3px)" stroke-width="2" />
+       <circle
+           cx="50%"
+           cy="50%"
+           class="spectrum-ProgressCircle-track"
+           r="calc(50% - 1.5px)"
+       />
+       <circle
+           cx="50%"
+           cy="50%"
+           r="calc(50% - 1.5px)"
+           class="spectrum-ProgressCircle-fill"
+           pathLength="100"
+           stroke-dasharray="100 200"
+           stroke-dashoffset="50"
+           stroke-linecap="round"
+       />
+   </svg>
</div>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                                  | Attribute or slot          | Status                                    |
| --------------------------------------------------------------------------------------------- | -------------------------- | ----------------------------------------- |
| `.spectrum-ProgressCircle`                                                                    | `:host`                    | Implemented                               |
| `.spectrum-ProgressCircle--sizeS`                                                             | `size="s"`                 | Implemented                               |
| `.spectrum-ProgressCircle--sizeL`                                                             | `size="l"`                 | Implemented                               |
| `.spectrum-ProgressCircle--indeterminate`                                                     | `indeterminate`            | Implemented                               |
| `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticWhite`                               | `static-color="white"`     | Implemented                               |
| `.spectrum-ProgressCircle-fill`                                                               | `.fills`                   | Implemented                               |
| `.spectrum-ProgressCircle-track`                                                              | `.track`                   | Implemented                               |
| `.spectrum-ProgressCircle--indeterminate .spectrum-ProgressCircle-fill`                       | Indeterminate fill styling | Implemented                               |
| `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-innerCircle` | Determinate inner circle   | Missing from CSS                          |
| `.spectrum-ProgressCircle:not(.spectrum-ProgressCircle--indeterminate) .spectrum-outerCircle` | Determinate outer circle   | Missing from CSS                          |
|                                                                                               | `label`                    | Missing from CSS                          |
|                                                                                               | Default slot               | Missing from CSS                          |
| Maps to `stroke-dashoffset` attribute (100 - value) within `.spectrum-ProgressCircle-fill`    | `progress`                 | Implemented, but will need changes for S2 |
| `.spectrum-ProgressCircle.spectrum-ProgressCircle--staticBlack`                               | `static-color="black"`     | Missing from WC (New for S2)              |

## Summary of changes

The progress circle component has significant differences between CSS and web component implementations:

- **Rendering approach**: Complete shift from div-based CSS masks to SVG-based rendering - **this will require changes to SWC's render method** and will also potentially affect how `progress` is applied to calculate inline styles
- **Static black**: Static white was previously supported, but Spectrum 2 should support both static white and static black
- **Label attribute**: Web component supports a `label` attribute for accessibility that is not present in CSS

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/commit/0c52c4820a3c5fb0881f23c6144fb0d0bd9a35cf)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-progress-circle--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/progresscircle--docs)
