# Status Light migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-StatusLight`
- `.spectrum-StatusLight--blue:before`
- `.spectrum-StatusLight--brown:before`
- `.spectrum-StatusLight--celery:before`
- `.spectrum-StatusLight--chartreuse:before`
- `.spectrum-StatusLight--cinnamon:before`
- `.spectrum-StatusLight--cyan:before`
- `.spectrum-StatusLight--fuchsia:before`
- `.spectrum-StatusLight--gray:before`
- `.spectrum-StatusLight--green:before`
- `.spectrum-StatusLight--indigo:before`
- `.spectrum-StatusLight--info:before`
- `.spectrum-StatusLight--magenta:before`
- `.spectrum-StatusLight--negative:before`
- `.spectrum-StatusLight--neutral`
- `.spectrum-StatusLight--neutral:before`
- `.spectrum-StatusLight--notice:before`
- `.spectrum-StatusLight--orange:before`
- `.spectrum-StatusLight--pink:before`
- `.spectrum-StatusLight--positive:before`
- `.spectrum-StatusLight--purple:before`
- `.spectrum-StatusLight--red:before`
- `.spectrum-StatusLight--seafoam:before`
- `.spectrum-StatusLight--silver:before`
- `.spectrum-StatusLight--sizeL`
- `.spectrum-StatusLight--sizeS`
- `.spectrum-StatusLight--sizeXL`
- `.spectrum-StatusLight--turquoise:before`
- `.spectrum-StatusLight--yellow:before`
- `.spectrum-StatusLight:before`
- `.spectrum-StatusLight:lang(ja)`
- `.spectrum-StatusLight:lang(ko)`
- `.spectrum-StatusLight:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-statuslight-border-width`
- `--mod-statuslight-content-color-default`
- `--mod-statuslight-corner-radius`
- `--mod-statuslight-dot-size`
- `--mod-statuslight-font-family`
- `--mod-statuslight-font-size`
- `--mod-statuslight-font-style`
- `--mod-statuslight-font-weight`
- `--mod-statuslight-height`
- `--mod-statuslight-line-height`
- `--mod-statuslight-line-height-cjk`
- `--mod-statuslight-nonsemantic-blue-color`
- `--mod-statuslight-nonsemantic-brown-color`
- `--mod-statuslight-nonsemantic-celery-color`
- `--mod-statuslight-nonsemantic-chartreuse-color`
- `--mod-statuslight-nonsemantic-cinnamon-color`
- `--mod-statuslight-nonsemantic-cyan-color`
- `--mod-statuslight-nonsemantic-fuchsia-color`
- `--mod-statuslight-nonsemantic-gray-color`
- `--mod-statuslight-nonsemantic-green-color`
- `--mod-statuslight-nonsemantic-indigo-color`
- `--mod-statuslight-nonsemantic-magenta-color`
- `--mod-statuslight-nonsemantic-orange-color`
- `--mod-statuslight-nonsemantic-pink-color`
- `--mod-statuslight-nonsemantic-purple-color`
- `--mod-statuslight-nonsemantic-red-color`
- `--mod-statuslight-nonsemantic-seafoam-color`
- `--mod-statuslight-nonsemantic-silver-color`
- `--mod-statuslight-nonsemantic-turquoise-color`
- `--mod-statuslight-nonsemantic-yellow-color`
- `--mod-statuslight-semantic-info-color`
- `--mod-statuslight-semantic-negative-color`
- `--mod-statuslight-semantic-neutral-color`
- `--mod-statuslight-semantic-notice-color`
- `--mod-statuslight-semantic-positive-color`
- `--mod-statuslight-spacing-bottom-to-label`
- `--mod-statuslight-spacing-dot-to-label`
- `--mod-statuslight-spacing-top-to-dot`
- `--mod-statuslight-spacing-top-to-label`
- `--mod-statuslight-subdued-content-color-default`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `size` (s, m, l, xl)
- `variant` (negative, notice, positive, info, neutral, yellow, fuchsia, indigo, seafoam, chartreuse, magenta, celery, purple)
- `disabled` (boolean)

</details>

<details>
<summary>Slots</summary>

- Default slot (for label content)

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-status-light variant="info" size="m">
    #shadow-root
    <slot></slot>
</sp-status-light>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-StatusLight spectrum-StatusLight--sizeM spectrum-StatusLight--info"
>
    Status text
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-StatusLight spectrum-StatusLight--sizeM spectrum-StatusLight--info"
>
    Status text
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
<!-- No differences found between main and spectrum-two branches -->
```

</details>

### CSS => SWC mapping

#### Non-color selectors

| CSS selector                                                                                     | Attribute or slot           | Status                        |
| ------------------------------------------------------------------------------------------------ | --------------------------- | ----------------------------- |
| `.spectrum-StatusLight`                                                                          | Base component              | Implemented                   |
| `.spectrum-StatusLight--sizeS`                                                                   | `size="s"`                  | Implemented                   |
| `.spectrum-StatusLight--sizeM`                                                                   | `size="m"`                  | Implemented                   |
| `.spectrum-StatusLight--sizeL`                                                                   | `size="l"`                  | Implemented                   |
| `.spectrum-StatusLight--sizeXL`                                                                  | `size="xl"`                 | Implemented                   |
| `.spectrum-StatusLight:before`                                                                   | Status dot (pseudo-element) | Implemented                   |
| `.spectrum-StatusLight:lang(ja), .spectrum-StatusLight:lang(ko), .spectrum-StatusLight:lang(zh)` | Language-specific styling   | Implemented                   |
| No selector, corresponds to default content within `.spectrum-StatusLight`                       | Default slot                | Implemented                   |
|                                                                                                  | `disabled`                  | Missing from CSS (deprecated) |

#### Color/variant selectors

| CSS selector                        | Attribute or slot      | Status                                                                                    |
| ----------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------- |
| `.spectrum-StatusLight--negative`   | `variant="negative"`   | Implemented                                                                               |
| `.spectrum-StatusLight--notice`     | `variant="notice"`     | Implemented                                                                               |
| `.spectrum-StatusLight--positive`   | `variant="positive"`   | Implemented                                                                               |
| `.spectrum-StatusLight--info`       | `variant="info"`       | Implemented                                                                               |
| `.spectrum-StatusLight--neutral`    | `variant="neutral"`    | Implemented                                                                               |
| `.spectrum-StatusLight--yellow`     | `variant="yellow"`     | Implemented                                                                               |
| `.spectrum-StatusLight--fuchsia`    | `variant="fuchsia"`    | Implemented                                                                               |
| `.spectrum-StatusLight--indigo`     | `variant="indigo"`     | Implemented                                                                               |
| `.spectrum-StatusLight--seafoam`    | `variant="seafoam"`    | Implemented                                                                               |
| `.spectrum-StatusLight--chartreuse` | `variant="chartreuse"` | Implemented                                                                               |
| `.spectrum-StatusLight--magenta`    | `variant="magenta"`    | Implemented                                                                               |
| `.spectrum-StatusLight--celery`     | `variant="celery"`     | Implemented                                                                               |
| `.spectrum-StatusLight--purple`     | `variant="purple"`     | Implemented                                                                               |
| `.spectrum-StatusLight--cyan`       | `variant="cyan"`       | Missing from WC, present in both S1 and S2                                                |
| `.spectrum-StatusLight--pink`       | `variant="pink"`       | Missing from WC - new for S2                                                              |
| `.spectrum-StatusLight--turquoise`  | `variant="turquoise"`  | Missing from WC - new for S2                                                              |
| `.spectrum-StatusLight--cinnamon`   | `variant="cinnamon"`   | Missing from WC - new for S2                                                              |
| `.spectrum-StatusLight--brown`      | `variant="brown"`      | Missing from WC - new for S2                                                              |
| `.spectrum-StatusLight--silver`     | `variant="silver"`     | Missing from WC - new for S2                                                              |
| `.spectrum-StatusLight--gray`       | `variant="gray"`       | Missing from WC, not in the design spec for S2                                            |
| `.spectrum-StatusLight--blue`       | `variant="blue"`       | Missing from WC, not in the design spec for S2 (appears to be different from "info")      |
| `.spectrum-StatusLight--green`      | `variant="green"`      | Missing from WC, not in the design spec for S2 (appears to be different from "positive")  |
| `.spectrum-StatusLight--orange`     | `variant="orange"`     | Missing from WC, not in the design spec for S2 (appears to be different from "notice")    |
| `.spectrum-StatusLight--red`        | `variant="red"`        | Missing from WC, not in the design spec for S2 (appears to be different from "negative" ) |
| `.spectrum-StatusLight--accent`     | `variant="accent"`     | Missing from WC, appears to be deprecated for S2                                          |

## Summary of changes

### CSS => SWC implementation gaps

The status light component has several missing variants in the web component implementation:

**Missing from WC:**

**New variants for S2:**

- Pink variant
- Turquoise variant
- Cinnamon variant
- Brown variant
- Silver variant

**Variants present in both S1 and S2:**

- Cyan variant: CSS supports `--cyan` but web components doesn't, this is in the design spec and **will need to be added in 2nd gen**

**Variants not in design spec for S2 (need verification):**
These variants are not in the design spec for S2 but are present in the S2 preview for CSS. These will likely need verification to determine whether or not we will include them.

Notes: These variants all exist in the S2 design spec and CSS preview of the Badge component. These all also have a similarly-colored "semantic" variant. This may be useful when determining whether they should be included in the 2nd gen web components.

- Gray variant (similar to "neutral" variant)
- Blue variant (similar to "info" variant)
- Green variant (similar to "positive" variant)
- Orange variant (similar to "notice" variant)
- Red variant (similar to "negative" variant)

**Deprecated variants:**

- Accent variant: deprecated for S2

**Other implementation differences:**

- **Disabled attribute**: There is no disabled state for this component in the S2 design spec, this attribute should be deprecated.

### CSS Spectrum 2 changes

No differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches. The template structure and class naming remain consistent across both branches.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2818)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-status-light--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/statuslight--docs)
