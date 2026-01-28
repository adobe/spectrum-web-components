# Dropzone migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-DropZone`
- `.spectrum-DropZone .spectrum-IllustratedMessage`

**Subcomponents:**

- `.spectrum-DropZone-actions`
- `.spectrum-DropZone.is-filled.is-dragged .spectrum-DropZone-actions`
- `.spectrum-DropZone-button`
- `.spectrum-DropZone-button .spectrum-Button-label`
- `.spectrum-DropZone-content`
- `.spectrum-DropZone.is-filled.is-dragged .spectrum-DropZone-content`
- `.spectrum-DropZone-stroke`
- `.spectrum-DropZone-strokePath`
- `.spectrum-DropZone.is-dragged .spectrum-DropZone-strokePath`
- `.spectrum-DropZone:has(.spectrum-DropZone-stroke)`

**Interactive states:**

- `.spectrum-DropZone-button:focus`
- `.spectrum-DropZone-button:hover`
- `.spectrum-DropZone:focus-visible`

**Variants:**

- `.spectrum-DropZone.is-dragged`
- `.spectrum-DropZone.is-filled`
- `.spectrum-DropZone.is-filled.is-dragged`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-button-border-radius`
- `--mod-illustrated-message-description-font-size`
- `--mod-illustrated-message-description-position`
- `--mod-illustrated-message-description-to-action`
- `--mod-illustrated-message-description-z-index`
- `--mod-illustrated-message-display`
- `--mod-illustrated-message-illustration-color`
- `--mod-illustrated-message-vertical-maximum-width`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-drop-zone-background-color`
- `--mod-drop-zone-background-color-opacity`
- `--mod-drop-zone-background-color-opacity-filled`
- `--mod-drop-zone-body-font-size`
- `--mod-drop-zone-body-to-action`
- `--mod-drop-zone-border-color`
- `--mod-drop-zone-border-color-hover`
- `--mod-drop-zone-border-dash-gap`
- `--mod-drop-zone-border-dash-length`
- `--mod-drop-zone-border-style`
- `--mod-drop-zone-border-style-dragged`
- `--mod-drop-zone-border-width`
- `--mod-drop-zone-content-background-color`
- `--mod-drop-zone-content-bottom-to-text`
- `--mod-drop-zone-content-font-family`
- `--mod-drop-zone-content-font-size`
- `--mod-drop-zone-content-font-weight`
- `--mod-drop-zone-content-height`
- `--mod-drop-zone-content-max-width`
- `--mod-drop-zone-content-maximum-width`
- `--mod-drop-zone-content-top-to-text`
- `--mod-drop-zone-corner-radius`
- `--mod-drop-zone-edge-to-text`
- `--mod-drop-zone-illustration-color-hover`
- `--mod-drop-zone-inline-size`
- `--mod-drop-zone-padding`
- `--mod-drop-zone-title-line-height`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `dropEffect` (String) - Controls the feedback during drag and drop: 'copy', 'move', 'link', or 'none'
- `isDragged` (Boolean) - Indicates that files are currently being dragged over the dropzone
- `isFilled` (Boolean) - Set to indicate that the component is in a filled state

</details>

<details>
<summary>Slots</summary>

- Default slot - drop zone content (i.e. `<sp-illustrated-message>`, links, instructive copy)

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- The default slot is intended for `<sp-illustrated-message>`, links, instructive copy, etc. that make up the dropzone content. -->
<slot></slot>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-DropZone" role="region" tabindex="0">
    <div class="spectrum-IllustratedMessage">
        <svg class="spectrum-IllustratedMessage-illustration">
            <!-- Custom illustration SVG and illustrated message markup -->
        </svg>
    </div>

    <!-- dropzone content is display: none by default -->
    <div class="spectrum-DropZone-content">
        <button class="spectrum-DropZone-button">Select files</button>
        <!-- .spectrum-ActionButton markup -->
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-DropZone" role="region" tabindex="0">
    <svg
        class="spectrum-DropZone-stroke"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
    >
        <rect
            x="1"
            y="1"
            rx="10px"
            ry="10px"
            fill="none"
            width="100%"
            height="100%"
            stroke-linecap="round"
            stroke-linejoin="round"
            vector-effect="non-scaling-stroke"
            class="spectrum-DropZone-strokePath"
        />
    </svg>

    <div class="spectrum-DropZone-content">
        <div class="spectrum-IllustratedMessage">
            <svg class="spectrum-IllustratedMessage-illustration">
                <!-- Custom illustration SVG -->
            </svg>
        </div>

        <div class="spectrum-DropZone-actions">
            <button class="spectrum-Button">
                <!-- .spectrum-Button markup -->
            </button>
        </div>
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

### HTML Output Diff

**Key Structural Changes:**

```diff
<div class="spectrum-DropZone" role="region" tabindex="0">
+ <svg class="spectrum-DropZone-stroke" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
+   <rect x="1" y="1" rx="10px" ry="10px" fill="none" width="100%" height="100%" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" class="spectrum-DropZone-strokePath" />
+ </svg>

- <div class="spectrum-IllustratedMessage">
-   <svg class="spectrum-IllustratedMessage-illustration">
-     <!-- Custom illustration SVG and illustrated message markup -->
-   </svg>
- </div>
-
  <div class="spectrum-DropZone-content">
-   <button class="spectrum-DropZone-button">Select files</button>
-     <!-- .spectrum-ActionButton markup -->
+   <div class="spectrum-IllustratedMessage">
+     <svg class="spectrum-IllustratedMessage-illustration">
+       <!-- Custom illustration SVG -->
+     </svg>
+   </div>
+
+   <div class="spectrum-DropZone-actions">
+     <button class="spectrum-Button">
+        <!-- .spectrum-Button markup -->
+     </button>
+   </div>
  </div>
</div>
```

### Key Changes in HTML Structure

1. **Enhanced visual border**: Added SVG stroke element (`.spectrum-DropZone-stroke`) with customizable dashed border styling that provides better visual feedback during drag operations.

2. **Restructured content organization**: Moved the illustrated message inside the `.spectrum-DropZone-content` container and separated actions into dedicated `.spectrum-DropZone-actions` container for better structural hierarchy.

3. **Button component upgrade**: Switched from `ActionButton` to `Button` component for improved consistency with other Spectrum components.

4. **Improved content flow**: The content container now properly wraps both the illustrated message and actions, creating a more logical content structure.

</details>

### CSS => SWC mapping

| CSS selector                    | Attribute or slot                        | Status                       |
| ------------------------------- | ---------------------------------------- | ---------------------------- |
| `.spectrum-DropZone`            | `:host`                                  | Implemented                  |
| `.spectrum-DropZone.is-dragged` | `isDragged` attribute                    | Implemented                  |
| `.spectrum-DropZone.is-filled`  | `isFilled` attribute                     | Implemented                  |
| `.spectrum-DropZone-content`    | default slot; `<sp-illustrated-message>` | Implemented                  |
| `.spectrum-DropZone-button`     | default slot; `<sp-button>`              | Implemented                  |
| `.spectrum-DropZone-actions`    | Actions container                        | Missing from WC (new for S2) |
| `.spectrum-DropZone-stroke`     | SVG stroke border                        | Missing from WC (new for S2) |
| `.spectrum-DropZone-strokePath` | SVG path element                         | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

- **Content structure**: The web component will require updating the internal structure including `.spectrum-DropZone-content`, `.spectrum-DropZone-actions`, and associated button elements. The `.spectrum-DropZone-content` and `.spectrum-DropZone-actions` classes are styled based on the Figma design specs. The SWC implementation provides only a simple slot-based container. We should consider if this approach is the approach we prefer moving into Spectrum 2 since the single-slot approach leaves the option open for lots of potentially unnecessary customization by the consumer (i.e. consumers could freely compose a drop zone with other components that does not follow the design expectations and standards).

- **Visual border system**: Missing the SVG-based stroke system (`.spectrum-DropZone-stroke` and `.spectrum-DropZone-strokePath`) provides enhanced visual feedback with customizable dashed borders. The svg borders were implemented in place of the CSS-only dashed border style to ensure the dashes have the corner rounding as laid out in the design spec.

- **Built-in UI elements**: The web component doesn't include built-in illustrated message and button components, requiring developers to manually compose these elements in the slot.

- **State-specific styling**: While drag and fill states are tracked separately, the web component currently doesn't handle the combination state of dragged and filled. Some missing features include include a button when the drop zone is filled, taking advantage of the custom SVG border options when dragged and filled, and `<sp-drop-zone>` needs to support the background illustration for the filled state.

Also worth consideration is the concept of "filled" vs. "replace." The design file refers to the "filled" state as the "replace" variant, so we should consider an API refactor if we want to align with design intentions more.

### CSS Spectrum 2 changes

- **Enhanced border system**: Introduced SVG-based stroke system replacing simple CSS borders, providing better visual feedback and customization options for drag states.

- **Improved content organization**: Repurposed `.spectrum-DropZone-content` wrapper and separated actions into `.spectrum-DropZone-actions` container for better organization.

- **Component upgrades**: Switched from an action button to a button for better visual hierarchy and consistency. Additionally, the `.spectrum-Dropzone-content` element was set by default to `display: none` in Spectrum 1, but didn't wrap the corresponding illustrated message content. For Spectrum 2, the purpose of `.spectrum-Dropzone-content` has been updated to more accurately wrap the component's visual content and be displayed by default.

- **Enhanced state styling**: Added more sophisticated styling for filled and dragged state combinations, including background image support for filled states.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3429)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-drop-zone--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/dropzone--docs)
