# Divider migration roadmap

## CSS selectors

<details>
<summary>CSS selectors</summary>

- `.spectrum-Divider`
- `.spectrum-Divider--sizeL`
- `.spectrum-Divider--sizeS`
- `.spectrum-Divider--staticBlack`
- `.spectrum-Divider--staticBlack.spectrum-Divider--sizeL`
- `.spectrum-Divider--staticWhite`
- `.spectrum-Divider--staticWhite.spectrum-Divider--sizeL`
- `.spectrum-Divider--vertical`
- `.spectrum-Divider:not(.spectrum-Divider.spectrum-Divider--vertical)`

</details>

## Passthroughs

<details>
<summary>Passthroughs</summary>

No passthroughs found for this component.

</details>

## Attributes

<details>
<summary>Attributes</summary>

- `vertical` - Boolean attribute for vertical orientation
- `static-color` - String attribute for static color variants (white, black)
- `size` - String attribute for size variants (s, m, l)

</details>

## Slots

<details>
<summary>Slots</summary>

No slots found for this component.

</details>

## Modifiers

<details>
<summary>Modifiers</summary>

- `--mod-divider-background-color`
- `--mod-divider-block-minimum-size`
- `--mod-divider-inline-minimum-size`
- `--mod-divider-thickness`
- `--mod-divider-vertical-align`
- `--mod-divider-vertical-height`
- `--mod-divider-vertical-margin`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<hr
    class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical"
    role="separator"
    style="min-block-size: 20px;"
/>
```

**Spectrum 2 (spectrum-two branch):**

```html
<hr
    class="spectrum-Divider spectrum-Divider--sizeM spectrum-Divider--vertical"
    role="separator"
/>
```

## Comparison

| CSS selector                                                          | Attribute or slot                   | Status      |
| --------------------------------------------------------------------- | ----------------------------------- | ----------- |
| `.spectrum-Divider`                                                   | Base component                      | Implemented |
| `.spectrum-Divider--sizeL`                                            | `size="l"`                          | Implemented |
| `.spectrum-Divider--sizeS`                                            | `size="s"`                          | Implemented |
| `.spectrum-Divider--staticBlack`                                      | `static-color="black"`              | Implemented |
| `.spectrum-Divider--staticBlack.spectrum-Divider--sizeL`              | `static-color="black"` + `size="l"` | Implemented |
| `.spectrum-Divider--staticWhite`                                      | `static-color="white"`              | Implemented |
| `.spectrum-Divider--staticWhite.spectrum-Divider--sizeL`              | `static-color="white"` + `size="l"` | Implemented |
| `.spectrum-Divider--vertical`                                         | `vertical` attribute                | Implemented |
| `.spectrum-Divider:not(.spectrum-Divider.spectrum-Divider--vertical)` | Non-vertical state                  | Implemented |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant changes in nesting depth or parent-child relationships
- Both versions maintain the same basic structure with `<hr>` or `<div>` elements

**Class Name Changes:**

- **Size classes**: Both versions use the same `--sizeS`, `--sizeM`, `--sizeL` pattern
- **Static color classes**: Both versions use the same `--staticBlack` and `--staticWhite` pattern
- **Vertical orientation**: Both versions use the same `--vertical` class

**Attribute Changes:**

- **No new required attributes**
- **No removed attributes**
- **Size values**: Both versions use `s`, `m`, `l` consistently

**Slot/Content Changes:**

- **No slots**: This component doesn't use slots
- **Content structure**: Both versions are self-closing elements with no content

**Migration Impact:**

- **Minimal breaking changes**: The component maintains backward compatibility
- **Main difference**: Legacy includes additional theme imports and min-dimension styling
- **Web component implementation**: Already well-aligned with CSS structure

## Implementation Gaps Analysis

### CSS Features Missing from Web Component

- **Theme imports**: Legacy includes multiple theme imports (`spectrum.css`, `express.css`) that may affect styling
- **Min-dimension styling**: Legacy includes `min-inline-size` and `min-block-size` styling that's not present in Spectrum 2
- **System theme support**: Legacy includes system theme custom properties that may not be fully utilized

### Web Component Features Missing from CSS

- **No significant gaps identified**: The web component implementation covers most CSS capabilities
- **Accessibility features**: Web component includes ARIA attributes and role management

### Features Being Deprecated/Removed

- **Theme-specific imports**: Legacy theme imports are simplified in Spectrum 2
- **Min-dimension styling**: The explicit min-dimension styling is removed in favor of CSS-based sizing

## Action Items for Web Component Maintainers

**Required Additions:**

- Ensure theme imports are properly handled in web component CSS
- Consider implementing min-dimension styling if needed for layout consistency
- Verify system theme support is properly implemented

**Required Removals:**

- No specific removals required - the web component already simplifies the legacy structure

**Breaking Changes:**

- **No breaking changes identified**: The component maintains backward compatibility
- **Styling differences**: Some legacy styling approaches are simplified in Spectrum 2
- **Migration guidance**: Consumers may need to adjust any custom styling that relied on legacy theme imports
