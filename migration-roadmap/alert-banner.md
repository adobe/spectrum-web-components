# Alert Banner migration roadmap

## Component specifications

### CSS

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

### SWC

<details>
<summary>Attributes</summary>

- `open` (Boolean) - Controls the display of the alert banner
- `dismissible` (Boolean) - Whether to include an icon-only close button to dismiss the alert banner
- `variant` (String) - The variant applies specific styling when set to `negative` or `info`; `variant` attribute is removed when it's passed an invalid variant. Valid values: `neutral`, `info`, `negative`

</details>

<details>
<summary>Slots</summary>

- Default slot - The alert banner text context
- `action` - Slot for the button element that surfaces the contextual action a user can take

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<sp-alert-banner variant="info" dismissible>
    #shadow-root
    <div class="body" role="alert">
        <div class="content">
            <sp-icon-info label="Information" class="type"></sp-icon-info>
            <div class="text"><slot></slot></div>
        </div>
        <slot name="action"></slot>
    </div>
    <div class="end">
        <sp-close-button
            @click="${this.shouldClose}"
            label="Close"
            static-color="white"
        ></sp-close-button>
    </div>
</sp-alert-banner>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-AlertBanner is-open spectrum-AlertBanner--info">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <div
                class="spectrum-Icon spectrum-Icon--sizeM spectrum-AlertBanner-icon"
                aria-hidden="true"
            >
                <svg
                    class="spectrum-Icon-svg"
                    focusable="false"
                    aria-hidden="true"
                >
                    <use xlink:href="#spectrum-icon-18-Info"></use>
                </svg>
            </div>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days
            </p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--staticWhite spectrum-Button--sizeM"
        >
            <span class="spectrum-Button-label">Action</span>
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <div
            class="spectrum-Divider spectrum-Divider--vertical spectrum-Divider--sizeS"
        ></div>
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            <span class="spectrum-CloseButton-icon" aria-hidden="true">
                <svg
                    class="spectrum-Icon spectrum-Icon--sizeS"
                    focusable="false"
                    aria-hidden="true"
                >
                    <use xlink:href="#spectrum-icon-18-Cross"></use>
                </svg>
            </span>
        </button>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-AlertBanner is-open spectrum-AlertBanner--info">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <div
                class="spectrum-Icon spectrum-Icon--sizeM spectrum-AlertBanner-icon"
                aria-hidden="true"
            >
                <svg
                    class="spectrum-Icon-svg"
                    focusable="false"
                    aria-hidden="true"
                >
                    <use xlink:href="#spectrum-icon-18-Info"></use>
                </svg>
            </div>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days
            </p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--staticWhite spectrum-Button--sizeM"
        >
            <span class="spectrum-Button-label">Action</span>
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            <span class="spectrum-CloseButton-icon" aria-hidden="true">
                <svg
                    class="spectrum-Icon spectrum-Icon--sizeS"
                    focusable="false"
                    aria-hidden="true"
                >
                    <use xlink:href="#spectrum-icon-18-Cross"></use>
                </svg>
            </span>
        </button>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
  <div class="spectrum-AlertBanner-end">
-     <div
-         class="spectrum-Divider spectrum-Divider--vertical spectrum-Divider--sizeS"
-     ></div>
      <button
          class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
      >
          <span class="spectrum-CloseButton-icon" aria-hidden="true">
              <svg
                  class="spectrum-Icon spectrum-Icon--sizeS"
                  focusable="false"
                  aria-hidden="true"
              >
                  <use xlink:href="#spectrum-icon-18-Cross"></use>
              </svg>
          </span>
      </button>
  </div>
```

</details>

### CSS => SWC mapping

| CSS selector                                                                                     | Attribute or slot                       | Status      |
| ------------------------------------------------------------------------------------------------ | --------------------------------------- | ----------- |
| `.spectrum-AlertBanner`                                                                          | Base component, `variant="neutral"`     | Implemented |
| `.spectrum-AlertBanner--info`                                                                    | `variant="info"`                        | Implemented |
| `.spectrum-AlertBanner--negative`                                                                | `variant="negative"`                    | Implemented |
| `.spectrum-AlertBanner.is-open`                                                                  | `open` attribute                        | Implemented |
| `.spectrum-AlertBanner-text`                                                                     | Default slot within `.text`             | Implemented |
| `.spectrum-AlertBanner-icon`                                                                     | Icon rendering (info/negative variants) | Implemented |
| `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`                    | `dismissible` attribute                 | Implemented |
| `.spectrum-AlertBanner:lang(ja), .spectrum-AlertBanner:lang(ko), .spectrum-AlertBanner:lang(zh)` | Language-specific styling               | Implemented |
| `.spectrum-AlertBanner-body`                                                                     | `.body`                                 | Implemented |
| `.spectrum-AlertBanner-content`                                                                  | `.content`                              | Implemented |
| `.spectrum-AlertBanner-end`                                                                      | `.end`                                  | Implemented |
| Corresponds to `.spectrum-Button` within `.spectrum-AlertBanner`                                 | `action` slot                           | Implemented |

Note: the `neutral` variant of Alert banner is the default variant in both CSS and SWC.

## Summary of changes

### CSS => SWC implementation gaps

**No missing features.** All CSS selectors have corresponding web component implementations:

- **Variants**: `--info` → `variant="info"`, `--negative` → `variant="negative"`
- **State**: `.is-open` → `open` attribute
- **Content**: Text and icon selectors → default slot and programmatic icon rendering
- **Dismissible**: Close button presence → `dismissible` attribute
- **Action slot**: Available in SWC but not in CSS templates

### CSS Spectrum 2 changes

**Divider element removed in spectrum-two branch**: The `<div class="spectrum-Divider spectrum-Divider--vertical spectrum-Divider--sizeS"></div>` element is no longer included in the close button section. The spectrum-two branch template only includes the close button without the divider separator.

This divider does not appear to be present in SWC, and therefore will not need to be removed for Spectrum 2.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2652)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-alert-banner--docs)
