# Alert Banner migration roadmap

## Component Specifications

### CSS selectors

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

### Passthroughs

<details>
<summary>Passthroughs</summary>

- `--mod-closebutton-align-self`
- `--mod-closebutton-margin-inline`
- `--mod-closebutton-margin-top`
- `--mod-icon-size`

</details>

### Attributes

<details>
<summary>Attributes</summary>

- `variant` - neutral, info, negative
- `open` - Boolean attribute for open/closed state
- `dismissible` - Boolean attribute for close button presence

</details>

### Slots

<details>
<summary>Slots</summary>

- Default slot - The alert banner text content
- `action` slot - Slot for the button element that surfaces the contextual action a user can take

</details>

### Modifiers

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

## Comparison

### Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

### DOM Structure Changes

**Spectrum Web Components:**

```html
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
```

**Legacy (CSS main branch):**

```html
<div class="spectrum-AlertBanner spectrum-AlertBanner--info is-open">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <svg
                class="spectrum-Icon spectrum-AlertBanner-icon"
                aria-hidden="true"
                focusable="false"
            >
                <!-- icon content -->
            </svg>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days...
            </p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--sizeM spectrum-Button--staticWhite"
        >
            Action
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <div
            class="spectrum-Divider spectrum-Divider--vertical spectrum-Divider--sizeS"
            role="separator"
        ></div>
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            <!-- close button content -->
        </button>
    </div>
</div>
```

**Spectrum 2 (CSS spectrum-two branch):**

```html
<div class="spectrum-AlertBanner spectrum-AlertBanner--info is-open">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <svg
                class="spectrum-Icon spectrum-AlertBanner-icon"
                aria-hidden="true"
                focusable="false"
            >
                <!-- icon content -->
            </svg>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days...
            </p>
        </div>
        <button
            class="spectrum-Button spectrum-Button--outline spectrum-Button--sizeM spectrum-Button--staticWhite"
        >
            Action
        </button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <button
            class="spectrum-CloseButton spectrum-CloseButton--sizeM spectrum-CloseButton--staticWhite"
        >
            <!-- close button content -->
        </button>
    </div>
</div>
```

### Comparison Table

| CSS selector                                                                                         | Attribute or slot         | Status      |
| ---------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| `.spectrum-AlertBanner`                                                                              | Base component            | Implemented |
| `.spectrum-AlertBanner--info`                                                                        | `variant="info"`          | Implemented |
| `.spectrum-AlertBanner--negative`                                                                    | `variant="negative"`      | Implemented |
| `.spectrum-AlertBanner-body`                                                                         | Body container            | Implemented |
| `.spectrum-AlertBanner-content`                                                                      | Content container         | Implemented |
| `.spectrum-AlertBanner-icon`                                                                         | Icon element              | Implemented |
| `.spectrum-AlertBanner-text`                                                                         | Default slot              | Implemented |
| `.spectrum-AlertBanner.is-open`                                                                      | `open` attribute          | Implemented |
| `.spectrum-AlertBanner:has(.spectrum-CloseButton) .spectrum-AlertBanner-body`                        | `dismissible` attribute   | Implemented |
| `.spectrum-AlertBanner:lang(ja)`, `.spectrum-AlertBanner:lang(ko)`, `.spectrum-AlertBanner:lang(zh)` | Language-specific styling | Implemented |

## Key Structural Changes

**Element Hierarchy Changes:**

- **Web component structure**: Uses semantic HTML with `role="alert"` and simplified class names
- **Legacy vs Spectrum 2**: Legacy includes a vertical divider between content and close button, while Spectrum 2 removes it
- **Icon implementation**: Web component uses `<sp-icon-*>` elements, CSS versions use SVG icons
- **Button implementation**: Web component uses `<sp-close-button>`, CSS versions use `<button>` with classes

**Class Name Changes:**

- **Web component**: Uses simplified class names (`body`, `content`, `text`, `end`) instead of BEM-style naming
- **CSS versions**: Both use consistent BEM-style naming (`spectrum-AlertBanner--*`)
- **State classes**: All versions use `is-open` for open/closed state
- **Variant classes**: All versions use the same variant pattern (`--info`, `--negative`)

**Attribute Changes:**

- **Web component**: Fully supports `variant`, `open`, and `dismissible` attributes
- **CSS versions**: No attribute changes between legacy and Spectrum 2
- **Variant support**: All versions support `neutral`, `info`, `negative` variants

**Slot/Content Changes:**

- **Default slot**: Web component uses `<slot>` for text content, CSS versions use `<p>` elements
- **Action slot**: Web component uses `slot="action"`, CSS versions render buttons directly
- **Icon rendering**: Web component conditionally renders icons based on variant, CSS versions always include icon placeholders

**Migration Impact:**

- **Major structural change**: Legacy includes divider, Spectrum 2 removes it
- **Class naming**: Web component uses simplified classes vs BEM-style in CSS
- **Icon system**: Web component uses component-based icons vs SVG in CSS
- **No breaking changes**: All functionality remains compatible

## Implementation Gaps Analysis

### CSS Features Missing from Web Component

- **Language-specific styling**: CSS includes `:lang()` selectors for CJK languages that may not be fully utilized
- **Advanced spacing properties**: New spacing custom properties in Spectrum 2 may not be fully implemented
- **Font family customization**: Spectrum 2 introduces font family custom properties that may not be leveraged
- **Enhanced visual properties**: Some new background and border properties may not be fully utilized

### Web Component Features Missing from CSS

- **ARIA attributes**: Web component includes `role="alert"` and proper accessibility features
- **Event handling**: Web component provides proper event dispatching for close actions
- **Dynamic icon rendering**: Web component conditionally renders icons based on variant
- **Slot-based content**: Web component uses modern slot system vs static HTML in CSS

### Features Being Deprecated/Removed

- **Vertical divider**: Legacy includes divider, Spectrum 2 removes it
- **Some spacing properties**: Legacy includes divider-specific spacing that's removed in Spectrum 2
- **Enhanced spacing system**: Spectrum 2 introduces new gap-based layout approaches

## Action Items for Web Component Maintainers

**Required Additions:**

- **Language support**: Implement CJK language-specific styling using the new `:lang()` selectors
- **Enhanced spacing**: Utilize new spacing custom properties for better responsive behavior
- **Font customization**: Implement font family and line height custom properties
- **Visual enhancements**: Leverage new background and border properties for improved theming

**Required Removals:**

- **Legacy spacing**: Remove any references to deprecated spacing properties
- **Divider references**: Update any CSS that assumes the presence of vertical dividers
- **Old custom properties**: Replace deprecated custom property names with new ones

**Breaking Changes:**

- **No breaking changes**: The component structure remains fully compatible
- **CSS property updates**: Some custom properties have been renamed or restructured
- **Spacing system**: New spacing approach may affect custom CSS modifications

### Integration Guidance

**Usage Pattern Differences:**

- **Simplified classes**: Web component uses shorter class names vs BEM-style in CSS
- **Component-based icons**: Web component uses `<sp-icon-*>` elements vs SVG in CSS
- **Slot system**: Web component uses modern slot system vs static HTML rendering

**Integration Considerations:**

- **CSS custom properties**: Update any custom CSS to use the new property names
- **Spacing adjustments**: Review custom spacing modifications to ensure compatibility
- **Theme integration**: Verify theme customizations work with the new property structure
- **Icon system**: Consider migrating from SVG icons to component-based icons for consistency
