# Illustrated Message migration roadmap

<details>
<summary>CSS selectors</summary>

- `.spectrum-IllustratedMessage`
- `.spectrum-IllustratedMessage--horizontal`
- `.spectrum-IllustratedMessage--horizontal .spectrum-IllustratedMessage-illustration`
- `.spectrum-IllustratedMessage--sizeL`
- `.spectrum-IllustratedMessage--sizeL:lang(ja)`
- `.spectrum-IllustratedMessage--sizeL:lang(ko)`
- `.spectrum-IllustratedMessage--sizeL:lang(zh)`
- `.spectrum-IllustratedMessage--sizeS`
- `.spectrum-IllustratedMessage--sizeS:lang(ja)`
- `.spectrum-IllustratedMessage--sizeS:lang(ko)`
- `.spectrum-IllustratedMessage--sizeS:lang(zh)`
- `.spectrum-IllustratedMessage-actions`
- `.spectrum-IllustratedMessage-content`
- `.spectrum-IllustratedMessage-description`
- `.spectrum-IllustratedMessage-heading`
- `.spectrum-IllustratedMessage-illustration`
- `.spectrum-IllustratedMessage:lang(ja)`
- `.spectrum-IllustratedMessage:lang(ko)`
- `.spectrum-IllustratedMessage:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-buttongroup-justify-content`

</details>

<details>
<summary>Attributes</summary>

- `heading` (String) - Headline text for the message
- `description` (String) - Description text for the illustration

</details>

<details>
<summary>Slots</summary>

- Default slot - The SVG that represents the illustration
- `heading` - Headline for the message
- `description` - Description text for the illustration

</details>

<details>
<summary>Modifiers</summary>

- `--mod-illustrated-message-description-color`
- `--mod-illustrated-message-description-font-family`
- `--mod-illustrated-message-description-font-size`
- `--mod-illustrated-message-description-font-style`
- `--mod-illustrated-message-description-font-weight`
- `--mod-illustrated-message-description-line-height`
- `--mod-illustrated-message-description-pointer-events`
- `--mod-illustrated-message-description-position`
- `--mod-illustrated-message-description-to-action`
- `--mod-illustrated-message-description-z-index`
- `--mod-illustrated-message-display`
- `--mod-illustrated-message-heading-to-description`
- `--mod-illustrated-message-horizontal-maximum-width`
- `--mod-illustrated-message-illustrated-inline-size`
- `--mod-illustrated-message-illustration-block-size`
- `--mod-illustrated-message-illustration-color`
- `--mod-illustrated-message-illustration-size`
- `--mod-illustrated-message-illustration-to-heading`
- `--mod-illustrated-message-pointer-events`
- `--mod-illustrated-message-title-color`
- `--mod-illustrated-message-title-font-family`
- `--mod-illustrated-message-title-font-size`
- `--mod-illustrated-message-title-font-style`
- `--mod-illustrated-message-title-font-weight`
- `--mod-illustrated-message-title-line-height`
- `--mod-illustrated-message-vertical-maximum-width`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<div class="spectrum-IllustratedMessage">
    <svg class="spectrum-IllustratedMessage-illustration">[illustration]</svg>
    <div
        class="spectrum-Heading spectrum-Heading--sizeM spectrum-Heading--light spectrum-IllustratedMessage-heading"
    >
        [heading]
    </div>
    <div
        class="spectrum-Body spectrum-Body--sizeS spectrum-IllustratedMessage-description"
    >
        [description content]
    </div>
</div>
```

**Spectrum 2 (spectrum-two branch):**

```html
<div class="spectrum-IllustratedMessage">
    <svg class="spectrum-IllustratedMessage-illustration">[illustration]</svg>
    <div
        class="spectrum-Heading spectrum-Heading--sizeM spectrum-Heading--light spectrum-IllustratedMessage-heading"
    >
        [heading]
    </div>
    <div
        class="spectrum-Body spectrum-Body--sizeS spectrum-IllustratedMessage-description"
    >
        [description content]
    </div>
</div>
```

## Comparison

| CSS selector                                                                                                              | Attribute or slot            | Status           |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------- |
| `.spectrum-IllustratedMessage`                                                                                            | Root element                 | Implemented      |
| `.spectrum-IllustratedMessage--horizontal`                                                                                | Horizontal layout variant    | Missing from WC  |
| `.spectrum-IllustratedMessage--sizeL`                                                                                     | Large size variant           | Missing from WC  |
| `.spectrum-IllustratedMessage--sizeS`                                                                                     | Small size variant           | Missing from WC  |
| `.spectrum-IllustratedMessage-illustration`                                                                               | Default slot                 | Implemented      |
| `.spectrum-IllustratedMessage-heading`                                                                                    | `heading` slot               | Implemented      |
| `.spectrum-IllustratedMessage-description`                                                                                | `description` slot           | Implemented      |
| `.spectrum-IllustratedMessage-content`                                                                                    | Content container            | Missing from WC  |
| `.spectrum-IllustratedMessage-actions`                                                                                    | Actions container            | Missing from WC  |
| `.spectrum-IllustratedMessage:lang(ja)`, `.spectrum-IllustratedMessage:lang(ko)`, `.spectrum-IllustratedMessage:lang(zh)` | Language-specific styling    | Implemented      |
| `.spectrum-IllustratedMessage--sizeL:lang(ja)`, etc.                                                                      | Size + language combinations | Missing from WC  |
| -                                                                                                                         | `heading` attribute          | Missing from CSS |
| -                                                                                                                         | `description` attribute      | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant hierarchy changes between main and spectrum-two branches
- Maintained consistent illustration > heading > description structure

**Class Name Changes:**

- No major class name changes
- Consistent naming convention maintained

**Attribute Changes:**

- Added `heading` attribute for setting heading text
- Added `description` attribute for setting description text
- No size variants exposed as attributes

**Slot/Content Changes:**

- Added `heading` slot for heading content
- Added `description` slot for description content
- Default slot for illustration SVG content

**Migration Impact:**

- Web component provides simplified API with attribute-based content
- Missing size and layout variants may limit design flexibility
- Simplified structure reduces complexity but may limit customization

### Implementation Gaps

**CSS Features Missing from Web Component:**

- Horizontal layout variant support - web component should support `horizontal` layout
- Size variant support - web component should support size options (`sizeS`, `sizeL`)
- Content container support - web component should provide content grouping
- Actions container support - web component should support action buttons/elements
- Language + size combination styling

**Web Component Features Missing from CSS:**

- `heading` attribute - CSS should provide styling for heading attribute content
- `description` attribute - CSS should provide styling for description attribute content

**Features Being Deprecated/Removed:**

- None identified - component maintains basic functionality

### Action Items for Web Component Maintainers

**Required Additions:**

- Horizontal layout variant support for side-by-side illustration and content
- Size variant support (small, medium, large) for different use cases
- Content container wrapper for better content organization
- Actions slot/container for buttons and interactive elements
- Size attribute with responsive design considerations

**Required Removals:**

- None identified

**Breaking Changes:**

- Missing layout and size variants limit design flexibility compared to CSS version
- Migration guidance: Consider adding size and layout attributes to match CSS variant capabilities
