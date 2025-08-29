# Alert Dialog migration roadmap

<details>
<summary>CSS selectors</summary>

- `.spectrum-AlertDialog`
- `.spectrum-AlertDialog .spectrum-Icon`
- `.spectrum-AlertDialog--error`
- `.spectrum-AlertDialog--warning`
- `.spectrum-AlertDialog-buttongroup`
- `.spectrum-AlertDialog-content`
- `.spectrum-AlertDialog-grid`
- `.spectrum-AlertDialog-header`
- `.spectrum-AlertDialog-heading`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-buttongroup-justify-content`
- `--mod-icon-color`

</details>

<details>
<summary>Attributes</summary>

- `variant` (String) - The visual variant to apply to this dialog (`confirmation`, `information`, `warning`, `error`, `destructive`, `secondary`)

</details>

<details>
<summary>Slots</summary>

- `heading` - Headline for the alert dialog
- Default slot - Description text content for the alert dialog
- `button` - Button elements for the dialog actions

</details>

<details>
<summary>Modifiers</summary>

- `--mod-alert-dialog-background-color`
- `--mod-alert-dialog-body-color`
- `--mod-alert-dialog-body-font-family`
- `--mod-alert-dialog-body-font-style`
- `--mod-alert-dialog-body-font-weight`
- `--mod-alert-dialog-body-line-height`
- `--mod-alert-dialog-corner-radius`
- `--mod-alert-dialog-description-content-size`
- `--mod-alert-dialog-description-to-button-group`
- `--mod-alert-dialog-edge-to-content`
- `--mod-alert-dialog-error-icon-color`
- `--mod-alert-dialog-heading-size`
- `--mod-alert-dialog-icon-size`
- `--mod-alert-dialog-max-width`
- `--mod-alert-dialog-min-width`
- `--mod-alert-dialog-minimum-title-to-icon`
- `--mod-alert-dialog-title-color`
- `--mod-alert-dialog-title-font-family`
- `--mod-alert-dialog-title-font-style`
- `--mod-alert-dialog-title-font-weight`
- `--mod-alert-dialog-title-line-height`
- `--mod-alert-dialog-title-to-description`
- `--mod-alert-dialog-warning-icon-color`

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
    class="spectrum-AlertDialog spectrum-AlertDialog--{variant}"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby="dialog_label"
>
    <div class="spectrum-AlertDialog-grid">
        <div class="spectrum-AlertDialog-header">
            <h1 class="spectrum-AlertDialog-heading" id="dialog_label">
                [heading]
            </h1>
            <svg class="spectrum-AlertDialog-icon spectrum-Icon">[icon]</svg>
        </div>
        <div
            class="spectrum-Divider spectrum-Divider--horizontal spectrum-AlertDialog-divider"
        ></div>
        <section class="spectrum-AlertDialog-content">[content]</section>
        <div class="spectrum-ButtonGroup">[buttons]</div>
    </div>
</div>
```

**Spectrum 2 (spectrum-two branch):**

```html
<div
    class="spectrum-AlertDialog spectrum-AlertDialog--{variant}"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby="dialog_label"
>
    <div class="spectrum-AlertDialog-grid">
        <div class="spectrum-AlertDialog-header">
            <svg class="spectrum-AlertDialog-icon spectrum-Icon">[icon]</svg>
            <h1 class="spectrum-AlertDialog-heading" id="dialog_label">
                [heading]
            </h1>
        </div>
        <section class="spectrum-AlertDialog-content">[content]</section>
        <section class="spectrum-AlertDialog-buttongroup">
            <div class="spectrum-ButtonGroup">[buttons]</div>
        </section>
    </div>
</div>
```

## Comparison

| CSS selector                           | Attribute or slot        | Status           |
| -------------------------------------- | ------------------------ | ---------------- |
| `.spectrum-AlertDialog`                | Root element             | Implemented      |
| `.spectrum-AlertDialog--error`         | `variant="error"`        | Implemented      |
| `.spectrum-AlertDialog--warning`       | `variant="warning"`      | Implemented      |
| `.spectrum-AlertDialog-grid`           | Layout grid              | Implemented      |
| `.spectrum-AlertDialog-header`         | Header container         | Implemented      |
| `.spectrum-AlertDialog-heading`        | `heading` slot           | Implemented      |
| `.spectrum-AlertDialog-content`        | Default slot             | Implemented      |
| `.spectrum-AlertDialog-buttongroup`    | Button container         | Implemented      |
| `.spectrum-AlertDialog .spectrum-Icon` | Icon element             | Implemented      |
| -                                      | `variant="confirmation"` | Missing from CSS |
| -                                      | `variant="information"`  | Missing from CSS |
| -                                      | `variant="destructive"`  | Missing from CSS |
| -                                      | `variant="secondary"`    | Missing from CSS |
| -                                      | `button` slot            | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- Removed divider element between header and content in Spectrum 2
- Reordered icon and heading elements within header (icon now comes first)
- Added dedicated `spectrum-AlertDialog-buttongroup` container
- Changed button container from direct ButtonGroup to section wrapper

**Class Name Changes:**

- Added `spectrum-AlertDialog-buttongroup` for button container
- Removed `spectrum-AlertDialog-divider` class

**Attribute Changes:**

- Expanded variant options to include `confirmation`, `information`, `destructive`, `secondary`
- Added automatic icon mapping for `warning` and `error` variants

**Slot/Content Changes:**

- Added dedicated `heading` slot for dialog title
- Added dedicated `button` slot for action buttons
- Default slot for main content/description

**Migration Impact:**

- Removal of divider element will affect visual separation between sections
- Icon reordering may affect existing layout assumptions
- New variants provide better semantic meaning for different dialog types

### Implementation Gaps

**CSS Features Missing from Web Component:**

- All major CSS selectors are properly implemented in the web component

**Web Component Features Missing from CSS:**

- `confirmation` variant - CSS should provide styling for confirmation dialogs
- `information` variant - CSS should provide styling for information dialogs
- `destructive` variant - CSS should provide styling for destructive action dialogs
- `secondary` variant - CSS should provide styling for secondary priority dialogs
- `button` slot - CSS should provide styling for slotted button elements

**Features Being Deprecated/Removed:**

- Divider element between header and content has been removed in Spectrum 2
- Icon/heading order has been updated for better visual hierarchy

### Action Items for Web Component Maintainers

**Required Additions:**

- CSS support for additional variant types (`confirmation`, `information`, `destructive`, `secondary`)
- CSS styling for button slot functionality

**Required Removals:**

- Remove dependency on divider element between header and content
- Update icon/heading layout order in templates

**Breaking Changes:**

- Divider removal changes visual layout of dialog
- Icon/heading reordering may affect existing styling
- Migration guidance: Update expectations for visual separation and element ordering in dialog header
