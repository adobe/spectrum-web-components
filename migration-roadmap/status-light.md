# Status Light migration roadmap

## CSS selectors

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
- `.spectrum-StatusLight:lang(ja)`, `.spectrum-StatusLight:lang(ko)`, `.spectrum-StatusLight:lang(zh)`

</details>

## Passthroughs

<details>
<summary>Passthroughs</summary>

No passthroughs found for this component.

</details>

## Attributes

<details>
<summary>Attributes</summary>

- `variant` - negative, notice, positive, info, neutral, yellow, fuchsia, indigo, seafoam, chartreuse, magenta, celery, purple
- `size` - s, m, l, xl
- `disabled` - Boolean attribute for disabled state

</details>

## Slots

<details>
<summary>Slots</summary>

- Default slot - Text label of the Status Light

</details>

## Modifiers

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

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<div
    class="spectrum-StatusLight spectrum-StatusLight--sizeM spectrum-StatusLight--info"
>
    Info status
</div>
```

**Spectrum 2 (spectrum-two branch):**

```html
<div
    class="spectrum-StatusLight spectrum-StatusLight--sizeM spectrum-StatusLight--info"
>
    Info status
</div>
```

## Comparison

| CSS selector                                                                                         | Attribute or slot         | Status          |
| ---------------------------------------------------------------------------------------------------- | ------------------------- | --------------- |
| `.spectrum-StatusLight`                                                                              | Base component            | Implemented     |
| `.spectrum-StatusLight--blue:before`                                                                 | `variant="blue"`          | Missing from WC |
| `.spectrum-StatusLight--brown:before`                                                                | `variant="brown"`         | Missing from WC |
| `.spectrum-StatusLight--celery:before`                                                               | `variant="celery"`        | Implemented     |
| `.spectrum-StatusLight--chartreuse:before`                                                           | `variant="chartreuse"`    | Implemented     |
| `.spectrum-StatusLight--cinnamon:before`                                                             | `variant="cinnamon"`      | Missing from WC |
| `.spectrum-StatusLight--cyan:before`                                                                 | `variant="cyan"`          | Missing from WC |
| `.spectrum-StatusLight--fuchsia:before`                                                              | `variant="fuchsia"`       | Implemented     |
| `.spectrum-StatusLight--gray:before`                                                                 | `variant="gray"`          | Missing from WC |
| `.spectrum-StatusLight--green:before`                                                                | `variant="green"`         | Missing from WC |
| `.spectrum-StatusLight--indigo:before`                                                               | `variant="indigo"`        | Implemented     |
| `.spectrum-StatusLight--info:before`                                                                 | `variant="info"`          | Implemented     |
| `.spectrum-StatusLight--magenta:before`                                                              | `variant="magenta"`       | Implemented     |
| `.spectrum-StatusLight--negative:before`                                                             | `variant="negative"`      | Implemented     |
| `.spectrum-StatusLight--neutral`                                                                     | `variant="neutral"`       | Implemented     |
| `.spectrum-StatusLight--neutral:before`                                                              | `variant="neutral"`       | Implemented     |
| `.spectrum-StatusLight--notice:before`                                                               | `variant="notice"`        | Implemented     |
| `.spectrum-StatusLight--orange:before`                                                               | `variant="orange"`        | Missing from WC |
| `.spectrum-StatusLight--pink:before`                                                                 | `variant="pink"`          | Missing from WC |
| `.spectrum-StatusLight--positive:before`                                                             | `variant="positive"`      | Implemented     |
| `.spectrum-StatusLight--purple:before`                                                               | `variant="purple"`        | Implemented     |
| `.spectrum-StatusLight--red:before`                                                                  | `variant="red"`           | Missing from WC |
| `.spectrum-StatusLight--seafoam:before`                                                              | `variant="seafoam"`       | Implemented     |
| `.spectrum-StatusLight--silver:before`                                                               | `variant="silver"`        | Missing from WC |
| `.spectrum-StatusLight--sizeL`                                                                       | `size="l"`                | Implemented     |
| `.spectrum-StatusLight--sizeS`                                                                       | `size="s"`                | Implemented     |
| `.spectrum-StatusLight--sizeXL`                                                                      | `size="xl"`               | Implemented     |
| `.spectrum-StatusLight--turquoise:before`                                                            | `variant="turquoise"`     | Missing from WC |
| `.spectrum-StatusLight--yellow:before`                                                               | `variant="yellow"`        | Implemented     |
| `.spectrum-StatusLight:before`                                                                       | Pseudo-element for dot    | Missing from WC |
| `.spectrum-StatusLight:lang(ja)`, `.spectrum-StatusLight:lang(ko)`, `.spectrum-StatusLight:lang(zh)` | Language-specific styling | Implemented     |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant changes in nesting depth or parent-child relationships
- Both versions maintain the same basic structure with text content

**Class Name Changes:**

- **Size classes**: Both versions use the same `--sizeS`, `--sizeM`, `--sizeL`, `--sizeXL` pattern
- **Variant classes**: Both versions use the same variant naming convention
- **Disabled state**: Legacy uses `is-disabled` class, Spectrum 2 maintains this pattern

**Attribute Changes:**

- **No new required attributes**
- **No removed attributes**
- **Size values**: Both versions use `s`, `m`, `l`, `xl` consistently

**Slot/Content Changes:**

- **No changes in slot usage**
- **Content structure**: Both versions use the same text-based content approach

**Migration Impact:**

- **Minimal breaking changes**: The component maintains backward compatibility
- **Main difference**: Spectrum 2 removes the `accent` variant that was deprecated in legacy
- **Web component implementation**: Already well-aligned with CSS structure

## Implementation Gaps Analysis

### CSS Features Missing from Web Component

- **Additional color variants**: CSS includes `blue`, `brown`, `cinnamon`, `cyan`, `gray`, `green`, `orange`, `pink`, `red`, `silver`, and `turquoise` variants not available in the web component
- **Pseudo-element dot**: CSS uses `:before` pseudo-element for the status dot, which may not be fully replicated in web component styling
- **Semantic vs non-semantic distinction**: CSS has more comprehensive color variant support

### Web Component Features Missing from CSS

- **Disabled state**: Web component has explicit `disabled` attribute support that may not be fully represented in CSS
- **Accessibility features**: Web component includes ARIA attributes and accessibility warnings

### Features Being Deprecated/Removed

- **Accent variant**: Legacy includes `accent` variant that is marked for removal in Spectrum 2
- **Some color variants**: Several color variants are not carried forward to the web component

## Action Items for Web Component Maintainers

**Required Additions:**

- Implement missing color variants: `blue`, `brown`, `cinnamon`, `cyan`, `gray`, `green`, `orange`, `pink`, `red`, `silver`, `turquoise`
- Ensure the `:before` pseudo-element dot styling is properly replicated in web component CSS
- Consider adding support for all semantic and non-semantic color variants present in CSS

**Required Removals:**

- No specific removals required - the web component already excludes the deprecated `accent` variant

**Breaking Changes:**

- **No breaking changes identified**: The component maintains backward compatibility
- **Variant limitations**: Some legacy color variants are not available in the web component
- **Migration guidance**: Consumers may need to map some color variants to available alternatives
