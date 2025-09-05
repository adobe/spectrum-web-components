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
- `.spectrum-AlertBanner-end`
- `.spectrum-AlertBanner-icon`
- `.spectrum-AlertBanner-text`
- `.spectrum-AlertBanner.is-open`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-button-margin-block`
- `--mod-button-margin-left`
- `--mod-button-margin-right`
- `--mod-closebutton-align-self`
- `--mod-closebutton-margin-inline`
- `--mod-closebutton-margin-top`
- `--mod-divider-vertical-align`
- `--mod-divider-vertical-height`
- `--mod-divider-vertical-margin`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-alert-banner-bottom-text`
- `--mod-alert-banner-close-button-spacing`
- `--mod-alert-banner-edge-to-button`
- `--mod-alert-banner-edge-to-divider`
- `--mod-alert-banner-font-color`
- `--mod-alert-banner-font-size`
- `--mod-alert-banner-icon-size`
- `--mod-alert-banner-icon-to-text`
- `--mod-alert-banner-informative-background`
- `--mod-alert-banner-max-inline-size`
- `--mod-alert-banner-min-height`
- `--mod-alert-banner-negative-background`
- `--mod-alert-banner-neutral-background`
- `--mod-alert-banner-size`
- `--mod-alert-banner-start-edge`
- `--mod-alert-banner-text-to-button-horizontal`
- `--mod-alert-banner-text-to-button-vertical`
- `--mod-alert-banner-text-to-divider`
- `--mod-alert-banner-top-icon`
- `--mod-alert-banner-top-text`

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
<div class="spectrum-AlertBanner is-open spectrum-AlertBanner--info">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <sp-icon-info
                iconName="Info"
                setName="workflow"
                class="spectrum-AlertBanner-icon"
            ></sp-icon-info>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days
            </p>
        </div>
        <sp-button
            size="m"
            staticColor="white"
            treatment="outline"
            label="Action"
        ></sp-button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <sp-divider vertical="true" size="s" tag="div"></sp-divider>
        <sp-close-button size="m" staticColor="white"></sp-close-button>
    </div>
</div>
```

**Spectrum 2 (CSS spectrum-two branch):**

```html
<div class="spectrum-AlertBanner is-open spectrum-AlertBanner--info">
    <div class="spectrum-AlertBanner-body">
        <div class="spectrum-AlertBanner-content">
            <sp-icon-info
                iconName="Info"
                setName="workflow"
                class="spectrum-AlertBanner-icon"
            ></sp-icon-info>
            <p class="spectrum-AlertBanner-text">
                Your trial will expire in 3 days
            </p>
        </div>
        <sp-button
            size="m"
            staticColor="white"
            treatment="outline"
            label="Action"
        ></sp-button>
    </div>
    <div class="spectrum-AlertBanner-end">
        <sp-divider vertical="true" size="s" tag="div"></sp-divider>
        <sp-close-button size="m" staticColor="white"></sp-close-button>
    </div>
</div>
```

### CSS => SWC mapping

| CSS selector                      | Attribute or slot                  | Status      |
| --------------------------------- | ---------------------------------- | ----------- |
| `.spectrum-AlertBanner--info`     | `variant="info"`                   | Implemented |
| `.spectrum-AlertBanner--negative` | `variant="negative"`               | Implemented |
| `.spectrum-AlertBanner.is-open`   | `open` attribute                   | Implemented |
| `.spectrum-AlertBanner-text`      | Default slot                       | Implemented |
| `.spectrum-AlertBanner-icon`      | Icon rendering based on variant    | Implemented |
| `.spectrum-AlertBanner-content`   | Content container in render method | Implemented |
| `.spectrum-AlertBanner-body`      | Body container in render method    | Implemented |
| `.spectrum-AlertBanner-end`       | End container in render method     | Implemented |
| `.spectrum-AlertBanner`           | Root element styling               | Implemented |

## Key Structural Changes

### Element Hierarchy Changes

The Spectrum Web Components implementation maintains the same overall structure as the CSS implementation, with the following key differences:

- **Icon handling**: Web components use `<sp-icon-*>` elements with conditional rendering based on variant, while CSS uses template-based icon injection
- **Action button**: Web components use a named slot (`action`) for flexibility, while CSS templates directly include button components
- **Close button**: Web components conditionally render the close button based on `dismissible` attribute, while CSS uses template parameters
- **Divider**: Web components do not include the vertical divider in the close button area, while CSS templates include it

### Class Name Changes

No class name changes found for this component.

### Attribute Changes

- **New attributes**: `dismissible` (Boolean) - controls whether close button is shown
- **Variant handling**: Web components validate variant values and remove invalid attributes, while CSS templates accept any variant value

### Slot/Content Changes

- **Default slot**: Replaces the direct text content in CSS templates
- **Action slot**: Provides flexible placement for action buttons instead of fixed template positioning

### Migration Impact

The most critical changes that will require template updates:

1. **Action button placement**: Move from direct template inclusion to named slot usage
2. **Close button control**: Use `dismissible` attribute instead of template parameters
3. **Icon rendering**: Icons are automatically handled based on variant, no manual icon placement needed
4. **Divider removal**: The vertical divider in the close button area is not included in the web component

## Implementation Gaps

### CSS Features Missing from Web Component

- **Vertical divider**: The CSS template includes a vertical divider between content and close button, but the web component does not
- **Flexible action button positioning**: CSS templates allow action buttons to be placed directly in the body, while web components use a named slot

### Web Component Features Missing from CSS

- **Dismissible attribute**: Web components have a `dismissible` attribute to control close button visibility, which is not present in CSS templates
- **Automatic icon rendering**: Web components automatically render appropriate icons based on variant, while CSS requires manual icon placement
- **Event handling**: Web components include keyboard event handling (Escape key) and custom close events

### Features Being Deprecated/Removed

No features are being deprecated or removed for this component.

## Action Items for Web Component Maintainers

### Required Additions

- **Vertical divider**: Consider adding the vertical divider between content and close button to match CSS implementation
- **Enhanced action button flexibility**: Ensure the action slot provides the same flexibility as CSS template positioning

### Required Removals

No removals required at this time.

### Breaking Changes

- **Action button placement**: Existing implementations using direct button inclusion will need to move to the `action` slot
- **Close button control**: Template-based close button control will need to use the `dismissible` attribute
- **Icon handling**: Manual icon placement will be replaced with automatic variant-based icon rendering
