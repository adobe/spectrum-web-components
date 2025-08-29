# Alert Banner migration roadmap

<details>
<summary>CSS selectors</summary>

- `.spectrum-AlertBanner`
- `.spectrum-AlertBanner--info`
- `.spectrum-AlertBanner--negative`
- `.spectrum-AlertBanner-body`
- `.spectrum-AlertBanner-content`
- `.spectrum-AlertBanner-icon`
- `.spectrum-AlertBanner-text`
- `.spectrum-AlertBanner.is-open`
- `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`
- `.spectrum-AlertBanner:lang(ja)`, `.spectrum-AlertBanner:lang(ko)`, `.spectrum-AlertBanner:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-closebutton-align-self`
- `--mod-closebutton-margin-inline`
- `--mod-closebutton-margin-top`
- `--mod-icon-size`

</details>

<details>
<summary>Attributes</summary>

- `open` (Boolean) - Controls the display of the alert banner
- `dismissible` (Boolean) - Whether to include an icon-only close button to dismiss the alert banner
- `variant` (String) - The variant applies specific styling when set to `negative`, `neutral`, or `info`

</details>

<details>
<summary>Slots</summary>

- Default slot - The alert banner text context
- `action` - Slot for the button element that surfaces the contextual action a user can take

</details>

<details>
<summary>Modifiers</summary>

- `--mod-alert-banner-background`
- `--mod-alert-banner-block-edge-to-button`
- `--mod-alert-banner-bottom-to-text`
- `--mod-alert-banner-close-button-to-content`
- `--mod-alert-banner-close-button-to-inline-end`
- `--mod-alert-banner-font-color`
- `--mod-alert-banner-font-family`
- `--mod-alert-banner-font-size`
- `--mod-alert-banner-icon-size`
- `--mod-alert-banner-icon-to-text`
- `--mod-alert-banner-informative-background`
- `--mod-alert-banner-inline-end-to-content`
- `--mod-alert-banner-inline-size`
- `--mod-alert-banner-inline-start-to-content`
- `--mod-alert-banner-line-height`
- `--mod-alert-banner-max-inline-size`
- `--mod-alert-banner-min-height`
- `--mod-alert-banner-negative-background`
- `--mod-alert-banner-neutral-background`
- `--mod-alert-banner-text-margin-block-end`
- `--mod-alert-banner-text-margin-block-start`
- `--mod-alert-banner-text-to-button-horizontal`
- `--mod-alert-banner-text-to-button-vertical`
- `--mod-alert-banner-top-to-close-button`
- `--mod-alert-banner-top-to-icon`
- `--mod-alert-banner-top-to-text`

</details>

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<div class="spectrum-AlertBanner spectrum-AlertBanner--{variant} is-open">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <svg class="spectrum-AlertBanner-icon">[icon]</svg>
            <p class="spectrum-AlertBanner-text">[text]</p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--staticWhite"
        >
            [action button]
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <div
            class="spectrum-Divider spectrum-Divider--vertical spectrum-Divider--sizeS"
        ></div>
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            [close button]
        </button>
    </div>
</div>
```

**Spectrum 2 (spectrum-two branch):**

```html
<div class="spectrum-AlertBanner spectrum-AlertBanner--{variant} is-open">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <svg class="spectrum-AlertBanner-icon">[icon]</svg>
            <p class="spectrum-AlertBanner-text">[text]</p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--staticWhite"
        >
            [action button]
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            [close button]
        </button>
    </div>
</div>
```

## Comparison

| CSS selector                                                                                         | Attribute or slot         | Status           |
| ---------------------------------------------------------------------------------------------------- | ------------------------- | ---------------- |
| `.spectrum-AlertBanner`                                                                              | Root element              | Implemented      |
| `.spectrum-AlertBanner--info`                                                                        | `variant="info"`          | Implemented      |
| `.spectrum-AlertBanner--negative`                                                                    | `variant="negative"`      | Implemented      |
| `.spectrum-AlertBanner-body`                                                                         | -                         | Implemented      |
| `.spectrum-AlertBanner-content`                                                                      | -                         | Implemented      |
| `.spectrum-AlertBanner-icon`                                                                         | -                         | Implemented      |
| `.spectrum-AlertBanner-text`                                                                         | Default slot              | Implemented      |
| `.spectrum-AlertBanner.is-open`                                                                      | `open` attribute          | Implemented      |
| `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`                        | `dismissible` attribute   | Implemented      |
| `.spectrum-AlertBanner:lang(ja)`, `.spectrum-AlertBanner:lang(ko)`, `.spectrum-AlertBanner:lang(zh)` | Language-specific styling | Implemented      |
| -                                                                                                    | `action` slot             | Missing from CSS |
| -                                                                                                    | `dismissible` attribute   | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- Removed divider element between content and close button in Spectrum 2
- Simplified end container structure

**Class Name Changes:**

- No major class name changes
- Maintained consistent naming convention

**Attribute Changes:**

- Added `open` attribute for controlling display state
- Added `dismissible` attribute for controlling close button visibility

**Slot/Content Changes:**

- Added dedicated `action` slot for button elements
- Default slot remains for text content

**Migration Impact:**

- Removal of divider element will affect visual separation between content and close button
- Web component provides better semantic structure with slots

### Implementation Gaps

**CSS Features Missing from Web Component:**

- All CSS selectors are properly implemented in the web component

**Web Component Features Missing from CSS:**

- `action` slot - needs CSS support for slotted action button positioning
- `dismissible` attribute - CSS should provide conditional styling based on this attribute

**Features Being Deprecated/Removed:**

- Divider element between content and close button has been removed in Spectrum 2

### Action Items for Web Component Maintainers

**Required Additions:**

- No major additions needed - component is well-aligned with CSS implementation

**Required Removals:**

- None identified

**Breaking Changes:**

- Divider removal may affect existing implementations expecting visual separation
- Migration guidance: Update expectations for visual separation between content and close button
