# Badge migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Badge`
- `.spectrum-Badge--accent`
- `.spectrum-Badge--blue`
- `.spectrum-Badge--brown`
- `.spectrum-Badge--celery`
- `.spectrum-Badge--chartreuse`
- `.spectrum-Badge--cinnamon`
- `.spectrum-Badge--cyan`
- `.spectrum-Badge--fixed-block-end`
- `.spectrum-Badge--fixed-block-start`
- `.spectrum-Badge--fixed-inline-end`
- `.spectrum-Badge--fixed-inline-start`
- `.spectrum-Badge--fuchsia`
- `.spectrum-Badge--gray`
- `.spectrum-Badge--green`
- `.spectrum-Badge--indigo`
- `.spectrum-Badge--informative`
- `.spectrum-Badge--magenta`
- `.spectrum-Badge--negative`
- `.spectrum-Badge--neutral`
- `.spectrum-Badge--notice`
- `.spectrum-Badge--orange`
- `.spectrum-Badge--pink`
- `.spectrum-Badge--positive`
- `.spectrum-Badge--purple`
- `.spectrum-Badge--red`
- `.spectrum-Badge--seafoam`
- `.spectrum-Badge--silver`
- `.spectrum-Badge--sizeL`
- `.spectrum-Badge--sizeS`
- `.spectrum-Badge--sizeXL`
- `.spectrum-Badge--style-outline.spectrum-Badge--accent`
- `.spectrum-Badge--style-outline.spectrum-Badge--informative`
- `.spectrum-Badge--style-outline.spectrum-Badge--negative`
- `.spectrum-Badge--style-outline.spectrum-Badge--neutral`
- `.spectrum-Badge--style-outline.spectrum-Badge--notice`
- `.spectrum-Badge--style-outline.spectrum-Badge--positive`
- `.spectrum-Badge--style-outline:is(.spectrum-Badge--neutral, .spectrum-Badge--accent, .spectrum-Badge--informative, .spectrum-Badge--negative, .spectrum-Badge--positive, .spectrum-Badge--notice)`
- `.spectrum-Badge--style-subtle`
- `.spectrum-Badge--style-subtle.spectrum-Badge--accent`
- `.spectrum-Badge--style-subtle.spectrum-Badge--blue`
- `.spectrum-Badge--style-subtle.spectrum-Badge--brown`
- `.spectrum-Badge--style-subtle.spectrum-Badge--celery`
- `.spectrum-Badge--style-subtle.spectrum-Badge--chartreuse`
- `.spectrum-Badge--style-subtle.spectrum-Badge--cinnamon`
- `.spectrum-Badge--style-subtle.spectrum-Badge--cyan`
- `.spectrum-Badge--style-subtle.spectrum-Badge--fuchsia`
- `.spectrum-Badge--style-subtle.spectrum-Badge--gray`
- `.spectrum-Badge--style-subtle.spectrum-Badge--green`
- `.spectrum-Badge--style-subtle.spectrum-Badge--indigo`
- `.spectrum-Badge--style-subtle.spectrum-Badge--informative`
- `.spectrum-Badge--style-subtle.spectrum-Badge--magenta`
- `.spectrum-Badge--style-subtle.spectrum-Badge--negative`
- `.spectrum-Badge--style-subtle.spectrum-Badge--neutral`
- `.spectrum-Badge--style-subtle.spectrum-Badge--notice`
- `.spectrum-Badge--style-subtle.spectrum-Badge--orange`
- `.spectrum-Badge--style-subtle.spectrum-Badge--pink`
- `.spectrum-Badge--style-subtle.spectrum-Badge--positive`
- `.spectrum-Badge--style-subtle.spectrum-Badge--purple`
- `.spectrum-Badge--style-subtle.spectrum-Badge--red`
- `.spectrum-Badge--style-subtle.spectrum-Badge--seafoam`
- `.spectrum-Badge--style-subtle.spectrum-Badge--silver`
- `.spectrum-Badge--style-subtle.spectrum-Badge--turquoise`
- `.spectrum-Badge--style-subtle.spectrum-Badge--yellow`
- `.spectrum-Badge--turquoise`
- `.spectrum-Badge--yellow`
- `.spectrum-Badge-icon`
- `.spectrum-Badge-icon + .spectrum-Badge-label`
- `.spectrum-Badge-icon--no-label`
- `.spectrum-Badge-label`
- `.spectrum-Badge-label:lang(ja)`
- `.spectrum-Badge-label:lang(ko)`
- `.spectrum-Badge-label:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-badge-background-color-accent`
- `--mod-badge-background-color-blue`
- `--mod-badge-background-color-brown`
- `--mod-badge-background-color-celery`
- `--mod-badge-background-color-chartreuse`
- `--mod-badge-background-color-cinnamon`
- `--mod-badge-background-color-cyan`
- `--mod-badge-background-color-default`
- `--mod-badge-background-color-fuchsia`
- `--mod-badge-background-color-gray`
- `--mod-badge-background-color-green`
- `--mod-badge-background-color-indigo`
- `--mod-badge-background-color-informative`
- `--mod-badge-background-color-magenta`
- `--mod-badge-background-color-negative`
- `--mod-badge-background-color-notice`
- `--mod-badge-background-color-orange`
- `--mod-badge-background-color-pink`
- `--mod-badge-background-color-positive`
- `--mod-badge-background-color-purple`
- `--mod-badge-background-color-red`
- `--mod-badge-background-color-seafoam`
- `--mod-badge-background-color-silver`
- `--mod-badge-background-color-turquoise`
- `--mod-badge-background-color-yellow`
- `--mod-badge-border-color`
- `--mod-badge-border-width`
- `--mod-badge-corner-radius`
- `--mod-badge-font-size`
- `--mod-badge-height`
- `--mod-badge-icon-only-spacing-horizontal`
- `--mod-badge-icon-spacing-horizontal`
- `--mod-badge-icon-spacing-vertical-top`
- `--mod-badge-icon-text-spacing`
- `--mod-badge-label-icon-color`
- `--mod-badge-label-spacing-horizontal`
- `--mod-badge-label-spacing-vertical-bottom`
- `--mod-badge-label-spacing-vertical-top`
- `--mod-badge-line-height`
- `--mod-badge-line-height-cjk`
- `--mod-badge-outline-background-color-default`
- `--mod-badge-outline-border-color-accent`
- `--mod-badge-outline-border-color-informative`
- `--mod-badge-outline-border-color-negative`
- `--mod-badge-outline-border-color-neutral`
- `--mod-badge-outline-border-color-notice`
- `--mod-badge-outline-border-color-positive`
- `--mod-badge-outline-label-icon-color`
- `--mod-badge-subtle-background-color-accent`
- `--mod-badge-subtle-background-color-blue`
- `--mod-badge-subtle-background-color-brown`
- `--mod-badge-subtle-background-color-celery`
- `--mod-badge-subtle-background-color-chartreuse`
- `--mod-badge-subtle-background-color-cinnamon`
- `--mod-badge-subtle-background-color-cyan`
- `--mod-badge-subtle-background-color-default`
- `--mod-badge-subtle-background-color-fuchsia`
- `--mod-badge-subtle-background-color-gray`
- `--mod-badge-subtle-background-color-green`
- `--mod-badge-subtle-background-color-indigo`
- `--mod-badge-subtle-background-color-informative`
- `--mod-badge-subtle-background-color-magenta`
- `--mod-badge-subtle-background-color-negative`
- `--mod-badge-subtle-background-color-notice`
- `--mod-badge-subtle-background-color-orange`
- `--mod-badge-subtle-background-color-pink`
- `--mod-badge-subtle-background-color-positive`
- `--mod-badge-subtle-background-color-purple`
- `--mod-badge-subtle-background-color-red`
- `--mod-badge-subtle-background-color-seafoam`
- `--mod-badge-subtle-background-color-silver`
- `--mod-badge-subtle-background-color-turquoise`
- `--mod-badge-subtle-background-color-yellow`
- `--mod-badge-subtle-label-icon-color`
- `--mod-badge-workflow-icon-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `variant` - Badge variant (accent, neutral, informative, positive, negative, notice, fuchsia, indigo, magenta, purple, seafoam, yellow, gray, red, orange, chartreuse, celery, green, cyan, blue)
- `fixed` - Fixed positioning (inline-start, inline-end, block-start, block-end)
- `size` - Badge size (s, m, l, xl)

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the badge
- `icon` - Optional icon that appears to the left of the label

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-badge variant="informative" fixed="inline-start" size="m">
    #shadow-root
    <slot name="icon"></slot>
    <div class="label">
        <slot></slot>
    </div>
</sp-badge>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-Badge spectrum-Badge--sizeM spectrum-Badge--informative spectrum-Badge--fixed-inline-start"
>
    <svg
        class="spectrum-Icon spectrum-Badge-icon"
        focusable="false"
        aria-hidden="true"
    >
        <!-- Icon content -->
    </svg>
    <div class="spectrum-Badge-label">Label text</div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-Badge spectrum-Badge--sizeM spectrum-Badge--informative spectrum-Badge--style-subtle spectrum-Badge--fixed-inline-start"
>
    <svg
        class="spectrum-Icon spectrum-Badge-icon"
        focusable="false"
        aria-hidden="true"
    >
        <!-- Icon content -->
    </svg>
    <div class="spectrum-Badge-label">Label text</div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

#### Non-color selectors

| CSS selector                                                                                     | Attribute or slot         | Status                       |
| ------------------------------------------------------------------------------------------------ | ------------------------- | ---------------------------- |
| `.spectrum-Badge--sizeS`                                                                         | `size="s"`                | Implemented                  |
| `.spectrum-Badge--sizeL`                                                                         | `size="l"`                | Implemented                  |
| `.spectrum-Badge--sizeXL`                                                                        | `size="xl"`               | Implemented                  |
| `.spectrum-Badge--fixed-inline-start`                                                            | `fixed="inline-start"`    | Implemented                  |
| `.spectrum-Badge--fixed-inline-end`                                                              | `fixed="inline-end"`      | Implemented                  |
| `.spectrum-Badge--fixed-block-start`                                                             | `fixed="block-start"`     | Implemented                  |
| `.spectrum-Badge--fixed-block-end`                                                               | `fixed="block-end"`       | Implemented                  |
| `.spectrum-Badge`                                                                                | Base component            | Implemented                  |
| `.spectrum-Badge-icon`                                                                           | `icon` slot               | Implemented                  |
| `.spectrum-Badge-label`                                                                          | Default slot              | Implemented                  |
| `.spectrum-Badge-label:lang(ja), .spectrum-Badge-label:lang(ko), .spectrum-Badge-label:lang(zh)` | Language-specific styling | Implemented                  |
| `.spectrum-Badge--style-outline`                                                                 | `style="outline"`         | Missing from WC (new for S2) |
| `.spectrum-Badge--style-subtle`                                                                  | `style="subtle"`          | Missing from WC (new for S2) |

#### Color/variant selectors

| CSS selector                   | Attribute or slot       | Status                       |
| ------------------------------ | ----------------------- | ---------------------------- |
| `.spectrum-Badge--accent`      | `variant="accent"`      | Implemented                  |
| `.spectrum-Badge--blue`        | `variant="blue"`        | Implemented                  |
| `.spectrum-Badge--celery`      | `variant="celery"`      | Implemented                  |
| `.spectrum-Badge--chartreuse`  | `variant="chartreuse"`  | Implemented                  |
| `.spectrum-Badge--cyan`        | `variant="cyan"`        | Implemented                  |
| `.spectrum-Badge--fuchsia`     | `variant="fuchsia"`     | Implemented                  |
| `.spectrum-Badge--gray`        | `variant="gray"`        | Implemented                  |
| `.spectrum-Badge--green`       | `variant="green"`       | Implemented                  |
| `.spectrum-Badge--indigo`      | `variant="indigo"`      | Implemented                  |
| `.spectrum-Badge--informative` | `variant="informative"` | Implemented                  |
| `.spectrum-Badge--magenta`     | `variant="magenta"`     | Implemented                  |
| `.spectrum-Badge--negative`    | `variant="negative"`    | Implemented                  |
| `.spectrum-Badge--neutral`     | `variant="neutral"`     | Implemented                  |
| `.spectrum-Badge--notice`      | `variant="notice"`      | Implemented                  |
| `.spectrum-Badge--orange`      | `variant="orange"`      | Implemented                  |
| `.spectrum-Badge--positive`    | `variant="positive"`    | Implemented                  |
| `.spectrum-Badge--purple`      | `variant="purple"`      | Implemented                  |
| `.spectrum-Badge--red`         | `variant="red"`         | Implemented                  |
| `.spectrum-Badge--seafoam`     | `variant="seafoam"`     | Implemented                  |
| `.spectrum-Badge--yellow`      | `variant="yellow"`      | Implemented                  |
| `.spectrum-Badge--brown`       | `variant="brown"`       | Missing from WC (new for S2) |
| `.spectrum-Badge--cinnamon`    | `variant="cinnamon"`    | Missing from WC (new for S2) |
| `.spectrum-Badge--pink`        | `variant="pink"`        | Missing from WC (new for S2) |
| `.spectrum-Badge--silver`      | `variant="silver"`      | Missing from WC (new for S2) |
| `.spectrum-Badge--turquoise`   | `variant="turquoise"`   | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- **New color variants**: `brown`, `cinnamon`, `pink`, `silver`, `turquoise`
- **Style variants**: `outline` and `subtle` styles

**Note**: Fixed positioning exists in both SWC and Spectrum 2 CSS but is not in the design spec. Consider whether to keep this for 2nd gen.

### CSS Spectrum 2 changes

**No significant structural changes.**

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3740)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-badge--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/badge--docs)
