## Alert banner

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
- `.spectrum-AlertBanner:lang(ja)`
- `.spectrum-AlertBanner:lang(ko)`
- `.spectrum-AlertBanner:lang(zh)`

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

- `open` - Boolean property to control the display of the alert banner
- `dismissible` - Boolean property to include a close button
- `variant="neutral"`
- `variant="info"`
- `variant="negative"`
- `variant=""` (default, no variant)

</details>

<details>
<summary>Slots</summary>

- Default slot - For the alert banner text content
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

### Comparison

| CSS selector                                                                                         | Attribute or slot                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `.spectrum-AlertBanner--info`                                                                        | `variant="info"`                   |
| `.spectrum-AlertBanner--negative`                                                                    | `variant="negative"`               |
| `.spectrum-AlertBanner-body`                                                                         | Internal layout element            |
| `.spectrum-AlertBanner-content`                                                                      | Internal layout element            |
| `.spectrum-AlertBanner-text`                                                                         | Default slot                       |
| `.spectrum-AlertBanner.is-open`                                                                      | `open` attribute                   |
| `.spectrum-AlertBanner`                                                                              | Base component                     |
| `.spectrum-AlertBanner-icon`                                                                         | Icon element (auto-generated)      |
| `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`                        | `dismissible` attribute            |
| `.spectrum-AlertBanner:lang(ja)`, `.spectrum-AlertBanner:lang(ko)`, `.spectrum-AlertBanner:lang(zh)` | Language-specific styling          |
|                                                                                                      | `variant="neutral"`                |
|                                                                                                      | `variant=""` (default, no variant) |
|                                                                                                      | `action` slot                      |

## Alert dialog

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

- `variant="confirmation"`
- `variant="information"`
- `variant="warning"`
- `variant="error"`
- `variant="destructive"`
- `variant="secondary"`
- `variant=""` (default, no variant)

</details>

<details>
<summary>Slots</summary>

- Default slot - For the main content of the alert dialog
- `heading` - For the heading/title of the alert dialog
- `button` - For the button group containing action buttons

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

### Comparison

| CSS selector                           | Attribute or slot                  |
| -------------------------------------- | ---------------------------------- |
| `.spectrum-AlertDialog--error`         | `variant="error"`                  |
| `.spectrum-AlertDialog--warning`       | `variant="warning"`                |
| `.spectrum-AlertDialog-buttongroup`    | `button` slot                      |
| `.spectrum-AlertDialog-content`        | Default slot                       |
| `.spectrum-AlertDialog-header`         | `heading` slot                     |
| `.spectrum-AlertDialog-heading`        | `heading` slot                     |
| `.spectrum-AlertDialog`                | Base component                     |
| `.spectrum-AlertDialog .spectrum-Icon` | Icon element (auto-generated)      |
| `.spectrum-AlertDialog-grid`           | Internal layout element            |
|                                        | `variant="confirmation"`           |
|                                        | `variant="information"`            |
|                                        | `variant="destructive"`            |
|                                        | `variant="secondary"`              |
|                                        | `variant=""` (default, no variant) |

## Breadcrumbs

<details>
<summary>CSS selectors</summary>

- `.spectrum-Breadcrumbs`
- `.spectrum-Breadcrumbs--multiline`
- `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type`
- `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type > .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs--sizeL`
- `.spectrum-Breadcrumbs-item`
- `.spectrum-Breadcrumbs-item > .spectrum-ActionButton`
- `.spectrum-Breadcrumbs-item > .spectrum-ActionButton:disabled`
- `.spectrum-Breadcrumbs-item.is-dragged .spectrum-Breadcrumbs-itemLink:before`
- `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-ActionButton`
- `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-item:last-of-type`
- `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemLink`
- `.spectrum-Breadcrumbs-itemLink + .spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemLink.is-disabled`
- `.spectrum-Breadcrumbs-itemLink:focus-visible:before`
- `.spectrum-Breadcrumbs-itemLink[aria-disabled="true"]`
- `.spectrum-Breadcrumbs-itemLink[href]`
- `.spectrum-Breadcrumbs-itemLink[href]:active`
- `.spectrum-Breadcrumbs-itemLink[href]:focus-visible`
- `.spectrum-Breadcrumbs-itemLink[href]:hover`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:active`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:focus-visible`
- `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:hover`
- `.spectrum-Breadcrumbs-itemSeparator`
- `.spectrum-Breadcrumbs-itemSeparator:dir(rtl)`

</details>

<details>
<summary>Passthroughs</summary>

_No passthroughs for this component_

</details>

<details>
<summary>Attributes</summary>

- `max-visible-items` - Number property (defaults to 4)
- `label` - String property for accessible name
- `menu-label` - String property (defaults to "More items")
- `compact` - Boolean property

</details>

<details>
<summary>Slots</summary>

- `icon` - Change the default icon of the action menu
- `root` - Breadcrumb item to always display
- Default slot - Breadcrumb items

</details>

<details>
<summary>Modifiers</summary>

- `--mod-breadcrumbs-action-button-color`
- `--mod-breadcrumbs-action-button-color-disabled`
- `--mod-breadcrumbs-action-button-spacing-block`
- `--mod-breadcrumbs-action-button-spacing-inline`
- `--mod-breadcrumbs-block-size`
- `--mod-breadcrumbs-focus-indicator-color`
- `--mod-breadcrumbs-focus-indicator-gap`
- `--mod-breadcrumbs-focus-indicator-thickness`
- `--mod-breadcrumbs-font-family`
- `--mod-breadcrumbs-font-family-current`
- `--mod-breadcrumbs-font-size`
- `--mod-breadcrumbs-font-size-current`
- `--mod-breadcrumbs-font-style`
- `--mod-breadcrumbs-font-weight`
- `--mod-breadcrumbs-font-weight-current`
- `--mod-breadcrumbs-icon-spacing-block`
- `--mod-breadcrumbs-inline-end`
- `--mod-breadcrumbs-inline-start`
- `--mod-breadcrumbs-inline-start-to-truncated-menu`
- `--mod-breadcrumbs-item-dragged-background`
- `--mod-breadcrumbs-item-link-border-radius`
- `--mod-breadcrumbs-line-height`
- `--mod-breadcrumbs-separator-color`
- `--mod-breadcrumbs-separator-spacing-inline`
- `--mod-breadcrumbs-text-color`
- `--mod-breadcrumbs-text-color-current`
- `--mod-breadcrumbs-text-color-disabled`
- `--mod-breadcrumbs-text-decoration-gap`
- `--mod-breadcrumbs-text-decoration-thickness`
- `--mod-breadcrumbs-text-spacing-block-end`
- `--mod-breadcrumbs-text-spacing-block-start`
- `--mod-breadcrumbs-title-spacing-block-end`
- `--mod-breadcrumbs-title-spacing-block-start`
- `--mod-heading-margin-end`
- `--mod-heading-margin-start`

</details>

### Comparison

| CSS selector                                                                                                | Attribute or slot             |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `.spectrum-Breadcrumbs-item`                                                                                | Individual breadcrumb item    |
| `.spectrum-Breadcrumbs-itemLink`                                                                            | Breadcrumb link element       |
| `.spectrum-Breadcrumbs-itemSeparator`                                                                       | Separator element             |
| `.spectrum-Breadcrumbs`                                                                                     | Base component                |
| `.spectrum-Breadcrumbs-item > .spectrum-ActionButton`                                                       | Action button within item     |
| `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-Breadcrumbs-itemLink`                                 | First item styling            |
| `.spectrum-Breadcrumbs-item:last-of-type`                                                                   | Last item styling             |
| `.spectrum-Breadcrumbs-itemSeparator:dir(rtl)`                                                              | RTL separator styling         |
| `.spectrum-Breadcrumbs--sizeL`                                                                              |                               |
| `.spectrum-Breadcrumbs--multiline`                                                                          |                               |
| `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type`                                  |                               |
| `.spectrum-Breadcrumbs--multiline .spectrum-Breadcrumbs-item:last-of-type > .spectrum-Breadcrumbs-itemLink` |                               |
| `.spectrum-Breadcrumbs-item > .spectrum-ActionButton:disabled`                                              |                               |
| `.spectrum-Breadcrumbs-item.is-dragged .spectrum-Breadcrumbs-itemLink:before`                               |                               |
| `.spectrum-Breadcrumbs-item:first-of-type > .spectrum-ActionButton`                                         |                               |
| `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemLink`                                    |                               |
| `.spectrum-Breadcrumbs-item:last-of-type .spectrum-Breadcrumbs-itemSeparator`                               |                               |
| `.spectrum-Breadcrumbs-itemLink + .spectrum-Breadcrumbs-itemSeparator`                                      |                               |
| `.spectrum-Breadcrumbs-itemLink.is-disabled`                                                                |                               |
| `.spectrum-Breadcrumbs-itemLink:focus-visible:before`                                                       |                               |
| `.spectrum-Breadcrumbs-itemLink[aria-disabled="true"]`                                                      |                               |
| `.spectrum-Breadcrumbs-itemLink[href]`                                                                      |                               |
| `.spectrum-Breadcrumbs-itemLink[href]:active`                                                               |                               |
| `.spectrum-Breadcrumbs-itemLink[href]:focus-visible`                                                        |                               |
| `.spectrum-Breadcrumbs-itemLink[href]:hover`                                                                |                               |
| `.spectrum-Breadcrumbs-itemLink[tabindex="0"]`                                                              |                               |
| `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:active`                                                       |                               |
| `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:focus-visible`                                                |                               |
| `.spectrum-Breadcrumbs-itemLink[tabindex="0"]:hover`                                                        |                               |
|                                                                                                             | `max-visible-items` attribute |
|                                                                                                             | `label` attribute             |
|                                                                                                             | `menu-label` attribute        |
|                                                                                                             | `compact` attribute           |
|                                                                                                             | `icon` slot                   |
|                                                                                                             | `root` slot                   |
|                                                                                                             | Default slot                  |

## Button

<details>
<summary>CSS selectors</summary>

- `.spectrum-Button`
- `.spectrum-Button .spectrum-Button-label`
- `.spectrum-Button .spectrum-Icon`
- `.spectrum-Button .spectrum-Icon + .spectrum-Button-label`
- `.spectrum-Button .spectrum-ProgressCircle`
- `.spectrum-Button--noWrap .spectrum-Button-label`
- `.spectrum-Button--sizeL`
- `.spectrum-Button--sizeS`
- `.spectrum-Button--sizeS.spectrum-Button--iconOnly`
- `.spectrum-Button--sizeXL`
- `.spectrum-Button-label`
- `.spectrum-Button-label:empty`
- `.spectrum-Button.is-disabled`
- `.spectrum-Button.is-focused`
- `.spectrum-Button.is-focused:after`
- `.spectrum-Button.is-pending`
- `.spectrum-Button.is-pending .spectrum-Button-label`
- `.spectrum-Button.is-pending .spectrum-Icon`
- `.spectrum-Button.is-pending .spectrum-ProgressCircle`
- `.spectrum-Button.spectrum-Button--accent`
- `.spectrum-Button.spectrum-Button--accent .spectrum-Button-label`
- `.spectrum-Button.spectrum-Button--iconOnly`
- `.spectrum-Button.spectrum-Button--iconOnly .spectrum-Icon`
- `.spectrum-Button.spectrum-Button--negative`
- `.spectrum-Button.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--primary`
- `.spectrum-Button.spectrum-Button--primary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticBlack.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--outline`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary`
- `.spectrum-Button.spectrum-Button--staticWhite.spectrum-Button--secondary.spectrum-Button--outline`
- `.spectrum-Button::-moz-focus-inner`
- `.spectrum-Button:active`
- `.spectrum-Button:after`
- `.spectrum-Button:disabled`
- `.spectrum-Button:focus`
- `.spectrum-Button:focus-visible`
- `.spectrum-Button:focus-visible:after`
- `.spectrum-Button:hover`
- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite)`
- `.spectrum-Button:not(.spectrum-Button--primary, .spectrum-Button--negative, .spectrum-Button--secondary, .spectrum-Button--staticBlack, .spectrum-Button--staticWhite) .spectrum-Button-label`
- `.spectrum-Button[pending]`
- `.spectrum-Button[pending] .spectrum-Button-label`
- `.spectrum-Button[pending] .spectrum-Icon`
- `.spectrum-Button[pending] .spectrum-ProgressCircle`
- `a.spectrum-Button`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-progress-circle-position`
- `--mod-progress-circle-thickness`
- `--mod-progress-circle-track-border-color`
- `--mod-progress-circle-track-border-color-over-background`

</details>

<details>
<summary>Attributes</summary>

- `pending-label` - String property (defaults to "Pending")
- `pending` - Boolean property
- `variant="accent"`
- `variant="primary"`
- `variant="secondary"`
- `variant="negative"`
- `static-color="black"`
- `static-color="white"`
- `treatment="fill"`
- `treatment="outline"`
- `quiet` - Boolean property (sets treatment to outline)
- `no-wrap` - Boolean property
- `size="s"`
- `size="m"`
- `size="l"`
- `size="xl"`

</details>

<details>
<summary>Slots</summary>

- Default slot - Text label of the Button
- `icon` - The icon to use for Button

</details>

<details>
<summary>Modifiers</summary>

- `--mod-button-animation-duration`
- `--mod-button-background-color-default`
- `--mod-button-background-color-disabled`
- `--mod-button-background-color-down`
- `--mod-button-background-color-focus`
- `--mod-button-background-color-hover`
- `--mod-button-border-color-default`
- `--mod-button-border-color-disabled`
- `--mod-button-border-color-down`
- `--mod-button-border-color-focus`
- `--mod-button-border-color-hover`
- `--mod-button-border-radius`
- `--mod-button-border-width`
- `--mod-button-bottom-to-text`
- `--mod-button-content-color-default`
- `--mod-button-content-color-disabled`
- `--mod-button-content-color-down`
- `--mod-button-content-color-focus`
- `--mod-button-content-color-hover`
- `--mod-button-edge-to-text`
- `--mod-button-edge-to-visual`
- `--mod-button-edge-to-visual-only`
- `--mod-button-focus-ring-border-radius`
- `--mod-button-focus-ring-color`
- `--mod-button-focus-ring-gap`
- `--mod-button-focus-ring-thickness`
- `--mod-button-font-family`
- `--mod-button-font-size`
- `--mod-button-font-weight`
- `--mod-button-height`
- `--mod-button-icon-margin-block-start`
- `--mod-button-line-height`
- `--mod-button-margin-block`
- `--mod-button-margin-left`
- `--mod-button-margin-right`
- `--mod-button-max-inline-size`
- `--mod-button-min-width`
- `--mod-button-padding-label-to-icon`
- `--mod-button-text-align`
- `--mod-button-text-align-with-icon`
- `--mod-button-top-to-icon`
- `--mod-button-top-to-text`

</details>

### Comparison

| CSS selector                                      | Attribute or slot                   |
| ------------------------------------------------- | ----------------------------------- |
| `.spectrum-Button--sizeL`                         | `size="l"`                          |
| `.spectrum-Button--sizeS`                         | `size="s"`                          |
| `.spectrum-Button--sizeXL`                        | `size="xl"`                         |
| `.spectrum-Button--noWrap .spectrum-Button-label` | `no-wrap` attribute                 |
| `.spectrum-Button.spectrum-Button--accent`        | `variant="accent"`                  |
| `.spectrum-Button.spectrum-Button--primary`       | `variant="primary"`                 |
| `.spectrum-Button.spectrum-Button--secondary`     | `variant="secondary"`               |
| `.spectrum-Button.spectrum-Button--negative`      | `variant="negative"`                |
| `.spectrum-Button.spectrum-Button--outline`       | `treatment="outline"`               |
| `.spectrum-Button.spectrum-Button--staticBlack`   | `static-color="black"`              |
| `.spectrum-Button.spectrum-Button--staticWhite`   | `static-color="white"`              |
| `.spectrum-Button.spectrum-Button--iconOnly`      | Icon-only button                    |
| `.spectrum-Button.is-pending`                     | `pending` attribute                 |
| `.spectrum-Button.is-disabled`                    | Disabled state                      |
| `.spectrum-Button.is-focused`                     | Focused state                       |
| `.spectrum-Button`                                | Base component                      |
| `.spectrum-Button .spectrum-Button-label`         | Default slot                        |
| `.spectrum-Button .spectrum-Icon`                 | `icon` slot                         |
| `.spectrum-Button .spectrum-ProgressCircle`       | Progress indicator (auto-generated) |
|                                                   | `size="m"` (default)                |
|                                                   | `pending-label` attribute           |
|                                                   | `treatment="fill"` (default)        |
|                                                   | `quiet` attribute                   |

## Alert banner

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
- `.spectrum-AlertBanner:lang(ja)`
- `.spectrum-AlertBanner:lang(ko)`
- `.spectrum-AlertBanner:lang(zh)`

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

- `open` - Boolean property to control the display of the alert banner
- `dismissible` - Boolean property to include a close button
- `variant="neutral"`
- `variant="info"`
- `variant="negative"`
- `variant=""` (default, no variant)

</details>

<details>
<summary>Slots</summary>

- Default slot - For the alert banner text content
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

### Comparison

| CSS selector                                                                                         | Attribute or slot                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `.spectrum-AlertBanner--info`                                                                        | `variant="info"`                   |
| `.spectrum-AlertBanner--negative`                                                                    | `variant="negative"`               |
| `.spectrum-AlertBanner-body`                                                                         | Internal layout element            |
| `.spectrum-AlertBanner-content`                                                                      | Internal layout element            |
| `.spectrum-AlertBanner-text`                                                                         | Default slot                       |
| `.spectrum-AlertBanner.is-open`                                                                      | `open` attribute                   |
| `.spectrum-AlertBanner`                                                                              | Base component                     |
| `.spectrum-AlertBanner-icon`                                                                         | Icon element (auto-generated)      |
| `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`                        | `dismissible` attribute            |
| `.spectrum-AlertBanner:lang(ja)`, `.spectrum-AlertBanner:lang(ko)`, `.spectrum-AlertBanner:lang(zh)` | Language-specific styling          |
|                                                                                                      | `variant="neutral"`                |
|                                                                                                      | `variant=""` (default, no variant) |
|                                                                                                      | `action` slot                      |

## Alert dialog

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

- `variant="confirmation"`
- `variant="information"`
- `variant="warning"`
- `variant="error"`
- `variant="destructive"`
- `variant="secondary"`
- `variant=""` (default, no variant)

</details>

<details>
<summary>Slots</summary>

- Default slot - For the main content of the alert dialog
- `heading` - For the heading/title of the alert dialog
- `button` - For the button group containing action buttons

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

### Comparison

| CSS selector                           | Attribute or slot                  |
| -------------------------------------- | ---------------------------------- |
| `.spectrum-AlertDialog--error`         | `variant="error"`                  |
| `.spectrum-AlertDialog--warning`       | `variant="warning"`                |
| `.spectrum-AlertDialog-buttongroup`    | `button` slot                      |
| `.spectrum-AlertDialog-content`        | Default slot                       |
| `.spectrum-AlertDialog-header`         | `heading` slot                     |
| `.spectrum-AlertDialog-heading`        | `heading` slot                     |
| `.spectrum-AlertDialog`                | Base component                     |
| `.spectrum-AlertDialog .spectrum-Icon` | Icon element (auto-generated)      |
| `.spectrum-AlertDialog-grid`           | Internal layout element            |
|                                        | `variant="confirmation"`           |
|                                        | `variant="information"`            |
|                                        | `variant="destructive"`            |
|                                        | `variant="secondary"`              |
|                                        | `variant=""` (default, no variant) |

## Illustrated message

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

- `heading` - String property
- `description` - String property

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

### Comparison

| CSS selector                                                                                                                                   | Attribute or slot                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `.spectrum-IllustratedMessage--horizontal`                                                                                                     | Horizontal layout                 |
| `.spectrum-IllustratedMessage--sizeL`                                                                                                          | Large size                        |
| `.spectrum-IllustratedMessage--sizeS`                                                                                                          | Small size                        |
| `.spectrum-IllustratedMessage-actions`                                                                                                         | Actions container                 |
| `.spectrum-IllustratedMessage-content`                                                                                                         | Content container                 |
| `.spectrum-IllustratedMessage-description`                                                                                                     | `description` slot                |
| `.spectrum-IllustratedMessage-heading`                                                                                                         | `heading` slot                    |
| `.spectrum-IllustratedMessage-illustration`                                                                                                    | Default slot                      |
| `.spectrum-IllustratedMessage`                                                                                                                 | Base component                    |
| `.spectrum-IllustratedMessage--sizeL:lang(ja)`, `.spectrum-IllustratedMessage--sizeL:lang(ko)`, `.spectrum-IllustratedMessage--sizeL:lang(zh)` | Language-specific styling (large) |
| `.spectrum-IllustratedMessage--sizeS:lang(ja)`, `.spectrum-IllustratedMessage--sizeS:lang(ko)`, `.spectrum-IllustratedMessage--sizeS:lang(zh)` | Language-specific styling (small) |
| `.spectrum-IllustratedMessage:lang(ja)`, `.spectrum-IllustratedMessage:lang(ko)`, `.spectrum-IllustratedMessage:lang(zh)`                      | Language-specific styling         |
|                                                                                                                                                | `heading` attribute               |
|                                                                                                                                                | `description` attribute           |

## Search

<details>
<summary>CSS selectors</summary>

- `.spectrum-Search`
- `.spectrum-Search .spectrum-HelpText`
- `.spectrum-Search .spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search .spectrum-Search-textfield`
- `.spectrum-Search .spectrum-Search-textfield .spectrum-Search-input`
- `.spectrum-Search--sizeL`
- `.spectrum-Search--sizeS`
- `.spectrum-Search--sizeXL`
- `.spectrum-Search-clearButton`
- `.spectrum-Search-clearButton .spectrum-ClearButton-fill`
- `.spectrum-Search-icon`
- `.spectrum-Search-input`
- `.spectrum-Search-input::-webkit-search-cancel-button`
- `.spectrum-Search-input::-webkit-search-decoration`
- `.spectrum-Search-textfield`
- `.spectrum-Search-textfield.is-disabled .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-disabled:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-focused:hover .spectrum-Search-icon`
- `.spectrum-Search-textfield.is-keyboardFocused .spectrum-Search-icon`
- `.spectrum-Search-textfield:hover .spectrum-Search-icon`
- `.spectrum-Search.is-collapsed`
- `.spectrum-Search.is-disabled .spectrum-Search-clearButton`
- `.spectrum-Search.is-expanded`
- `.spectrum-Search:lang(ja)`
- `.spectrum-Search:lang(ko)`
- `.spectrum-Search:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-textfield-background-color`
- `--mod-textfield-background-color-disabled`
- `--mod-textfield-border-color`
- `--mod-textfield-border-color-disabled`
- `--mod-textfield-border-color-focus`
- `--mod-textfield-border-color-focus-hover`
- `--mod-textfield-border-color-hover`
- `--mod-textfield-border-color-keyboard-focus`
- `--mod-textfield-border-width`
- `--mod-textfield-corner-radius`
- `--mod-textfield-focus-indicator-color`
- `--mod-textfield-focus-indicator-gap`
- `--mod-textfield-focus-indicator-width`
- `--mod-textfield-font-family`
- `--mod-textfield-font-weight`
- `--mod-textfield-placeholder-font-size`
- `--mod-textfield-text-color-default`
- `--mod-textfield-text-color-disabled`
- `--mod-textfield-text-color-focus`
- `--mod-textfield-text-color-focus-hover`
- `--mod-textfield-text-color-hover`
- `--mod-textfield-text-color-keyboard-focus`

</details>

<details>
<summary>Attributes</summary>

- `action` - String property for form action
- `label` - String property (defaults to "Search")
- `method` - String property that accepts values: 'get', 'post', 'dialog'
- `placeholder` - String property (defaults to "Search")
- `holdValueOnEscape` - Boolean property
- `size="s"`
- `size="m"`
- `size="l"`
- `size="xl"`

</details>

<details>
<summary>Slots</summary>

- `help-text` - Default or non-negative help text to associate to your form element
- `negative-help-text` - Negative help text to associate to your form element when `invalid`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-search-background-color`
- `--mod-search-background-color-disabled`
- `--mod-search-block-size`
- `--mod-search-border-color-default`
- `--mod-search-border-color-disabled`
- `--mod-search-border-color-focus`
- `--mod-search-border-color-focus-hover`
- `--mod-search-border-color-hover`
- `--mod-search-border-color-key-focus`
- `--mod-search-border-radius`
- `--mod-search-border-width`
- `--mod-search-bottom-to-text`
- `--mod-search-button-inline-size`
- `--mod-search-collapsed-animation-duration`
- `--mod-search-color-default`
- `--mod-search-color-disabled`
- `--mod-search-color-focus`
- `--mod-search-color-focus-hover`
- `--mod-search-color-hover`
- `--mod-search-color-key-focus`
- `--mod-search-edge-to-visual`
- `--mod-search-focus-indicator-color`
- `--mod-search-focus-indicator-gap`
- `--mod-search-focus-indicator-thickness`
- `--mod-search-font-family`
- `--mod-search-font-style`
- `--mod-search-font-weight`
- `--mod-search-icon-size`
- `--mod-search-inline-size`
- `--mod-search-line-height`
- `--mod-search-min-inline-size`
- `--mod-search-text-to-icon`
- `--mod-search-to-help-text`
- `--mod-search-top-to-icon`
- `--mod-search-top-to-text`

</details>

### Comparison

| CSS selector                                                                          | Attribute or slot                        |
| ------------------------------------------------------------------------------------- | ---------------------------------------- |
| `.spectrum-Search--sizeL`                                                             | `size="l"`                               |
| `.spectrum-Search--sizeS`                                                             | `size="s"`                               |
| `.spectrum-Search--sizeXL`                                                            | `size="xl"`                              |
| `.spectrum-Search .spectrum-HelpText`                                                 | `help-text` slot                         |
| `.spectrum-Search-clearButton`                                                        | Clear button (auto-generated)            |
| `.spectrum-Search-icon`                                                               | Search icon (auto-generated)             |
| `.spectrum-Search-input`                                                              | Input element (inherited from Textfield) |
| `.spectrum-Search-textfield`                                                          | Internal layout element                  |
| `.spectrum-Search.is-collapsed`                                                       | Collapsed state                          |
| `.spectrum-Search.is-disabled .spectrum-Search-clearButton`                           | Disabled state                           |
| `.spectrum-Search.is-expanded`                                                        | Expanded state                           |
| `.spectrum-Search`                                                                    | Base component                           |
| `.spectrum-Search .spectrum-Search-clearButton .spectrum-ClearButton-fill`            | Internal styling                         |
| `.spectrum-Search .spectrum-Search-textfield`                                         | Internal layout element                  |
| `.spectrum-Search .spectrum-Search-textfield .spectrum-Search-input`                  | Internal layout element                  |
| `.spectrum-Search-clearButton .spectrum-ClearButton-fill`                             | Internal styling                         |
| `.spectrum-Search-input::-webkit-search-cancel-button`                                | Webkit-specific styling                  |
| `.spectrum-Search-input::-webkit-search-decoration`                                   | Webkit-specific styling                  |
| `.spectrum-Search-textfield.is-disabled .spectrum-Search-icon`                        | Disabled state styling                   |
| `.spectrum-Search-textfield.is-disabled:hover .spectrum-Search-icon`                  | Disabled hover state                     |
| `.spectrum-Search-textfield.is-focused .spectrum-Search-icon`                         | Focused state styling                    |
| `.spectrum-Search-textfield.is-focused:hover .spectrum-Search-icon`                   | Focused hover state                      |
| `.spectrum-Search-textfield.is-keyboardFocused .spectrum-Search-icon`                 | Keyboard focus state                     |
| `.spectrum-Search-textfield:hover .spectrum-Search-icon`                              | Hover state styling                      |
| `.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)` | Language-specific styling                |
|                                                                                       | `size="m"` (default)                     |
|                                                                                       | `action` attribute                       |
|                                                                                       | `label` attribute                        |
|                                                                                       | `method` attribute                       |
|                                                                                       | `placeholder` attribute                  |
|                                                                                       | `holdValueOnEscape` attribute            |
|                                                                                       | `negative-help-text` slot                |
