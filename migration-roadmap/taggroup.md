# TagGroup migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-TagGroup`

**Variants:**

- `.spectrum-TagGroup--sideLabel`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-actionButton`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-helpText`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-label`
- `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-tags`
- `.spectrum-TagGroup--sizeL`
- `.spectrum-TagGroup--sizeS`
- `.spectrum-TagGroup-actionButton`
- `.spectrum-TagGroup-helpText`
- `.spectrum-TagGroup-label`
- `.spectrum-TagGroup-tag`
- `.spectrum-TagGroup-tags`

**Language-specific:**

- `.spectrum-TagGroup:lang(ja)`
- `.spectrum-TagGroup:lang(ko)`
- `.spectrum-TagGroup:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-body-cjk-line-height`
- `--mod-body-font-size`
- `--mod-body-line-height`
- `--mod-body-margin-end`
- `--mod-body-margin-start`
- `--mod-tag-group-block-spacing-label-to-tags`
- `--mod-tag-group-block-tag-spacing`
- `--mod-tag-group-inline-spacing-label-to-tags`
- `--mod-tag-group-inline-tag-spacing`
- `--mod-tag-group-spacing-help-text-to-tags`

</details>

### SWC

**Note**: In Spectrum Web Components, this component is named `<sp-tags>` (not `<sp-taggroup>`).

<details>
<summary>Attributes</summary>

None found for `<sp-tags>`.

</details>

<details>
<summary>Slots</summary>

- Default slot (no name) - Tag elements to manage as a group

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<slot></slot>
<!-- Slotted sp-tag elements -->
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div role="list" class="spectrum-TagGroup" style="" aria-label="Tags">
    <!-- Tags container with role="list" -->
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">2025</span>
    </div>
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">Outdoors</span>
    </div>
    <div
        class="spectrum-Tag spectrum-Tag--sizeM spectrum-TagGroup-item"
        tabindex="0"
    >
        <span class="spectrum-Tag-label">Blue</span>
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-TagGroup spectrum-TagGroup--sizeM">
    <!-- Optional label -->
    <label class="spectrum-FieldLabel spectrum-TagGroup-label">Label</label>

    <!-- Tags container with role="list" -->
    <div class="spectrum-TagGroup-tags" role="list" aria-label="Tags">
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
        <div class="spectrum-Tag spectrum-TagGroup-tag">...</div>
    </div>

    <!-- Optional action button -->
    <button class="spectrum-ActionButton spectrum-TagGroup-actionButton">
        Show all
    </button>

    <!-- Optional help text -->
    <div class="spectrum-HelpText spectrum-TagGroup-helpText">Help text</div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**Structural changes:**

Legacy (main branch):

- `role="list"` applied to the root `.spectrum-TagGroup` element
- Tags use `.spectrum-TagGroup-item` class

Spectrum 2 (spectrum-two branch):

- Separate `.spectrum-TagGroup-tags` container with `role="list"`
- Tags use `.spectrum-TagGroup-tag` class (changed from `-item`)
- Optional `.spectrum-TagGroup-label` for field labels
- Optional `.spectrum-TagGroup-actionButton` for actions
- Optional `.spectrum-TagGroup-helpText` for help text
- Support for side label variant via `--sideLabel` modifier

**Key differences:**

1. **Class naming**: `.spectrum-TagGroup-item` → `.spectrum-TagGroup-tag`
2. **Role placement**: `role="list"` moved from root element to child `.spectrum-TagGroup-tags` container
3. **Component composition**: Evolved from a simple wrapper to a complete form field component with label, help text, and action button support
4. **Layout variants**: Added `--sideLabel` modifier for horizontal label positioning

</details>

### CSS => SWC mapping

| CSS selector                                                    | Attribute or slot                | Status           |
| --------------------------------------------------------------- | -------------------------------- | ---------------- |
| `.spectrum-TagGroup`                                            | Base component (`<sp-tags>`)     | Implemented      |
| `.spectrum-TagGroup--sideLabel`                                 | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-actionButton` | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-helpText`     | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-label`        | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sideLabel .spectrum-TagGroup-tags`         | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sizeL`                                     | N/A                              | Missing from WC  |
| `.spectrum-TagGroup--sizeS`                                     | N/A                              | Missing from WC  |
| `.spectrum-TagGroup-actionButton`                               | N/A                              | Missing from WC  |
| `.spectrum-TagGroup-helpText`                                   | N/A                              | Missing from WC  |
| `.spectrum-TagGroup-label`                                      | N/A                              | Missing from WC  |
| `.spectrum-TagGroup-tag`                                        | Individual tags (from templates) | Missing from WC  |
| `.spectrum-TagGroup-tags`                                       | N/A                              | Missing from WC  |
| `.spectrum-TagGroup:lang(ja)`                                   | N/A                              | Missing from WC  |
| `.spectrum-TagGroup:lang(ko)`                                   | N/A                              | Missing from WC  |
| `.spectrum-TagGroup:lang(zh)`                                   | N/A                              | Missing from WC  |
| Default slot                                                    | Slot for `<sp-tag>` elements     | Implemented      |
| Keyboard navigation                                             | RovingTabindexController         | Missing from CSS |
| Focus management                                                | Internal controller              | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-TagGroup-label` class - Field label for the tag group
- `.spectrum-TagGroup-tags` class - Container for the tags with `role="list"`
- `.spectrum-TagGroup-tag` class - Applied to individual tags within the group
- `.spectrum-TagGroup-actionButton` class - Optional action button below the tags
- `.spectrum-TagGroup-helpText` class - Optional help text below the tags
- `--sideLabel` variant - Layout variant for side-positioned labels
- Size variants (`--sizeS`, `--sizeL`) - Only medium size is supported in WC

**Missing from CSS:**

- Keyboard navigation behavior - The `<sp-tags>` component uses `RovingTabindexController` to manage focus and keyboard navigation between tags
- Focus management - Automatic focus handling when navigating with arrow keys

**Implementation differences:**

- **CSS approach**: Uses a wrapper `<div>` with class `spectrum-TagGroup` that contains child elements for label, tags container (with `role="list"`), action button, and help text. Individual tags receive the `spectrum-TagGroup-tag` class.
- **WC approach**: Uses a custom element `<sp-tags>` that acts as a simple slot container with built-in keyboard navigation and focus management. It does not include label, action button, or help text functionality.

### CSS Spectrum 2 changes

**Structural changes in Spectrum 2:**

1. **Class naming change**: `.spectrum-TagGroup-item` → `.spectrum-TagGroup-tag`
2. **DOM structure enhancement**: Added dedicated `.spectrum-TagGroup-tags` container element
3. **Role placement change**: `role="list"` moved from root `.spectrum-TagGroup` element to child `.spectrum-TagGroup-tags` container
4. **Component composition**: Evolved from simple wrapper to complete form field with optional label, action button, and help text

**New features in Spectrum 2:**

- `.spectrum-TagGroup-label` - Optional field label support with top or side positioning (`--sideLabel` modifier)
- `.spectrum-TagGroup-actionButton` - Optional action button for tag-related actions
- `.spectrum-TagGroup-helpText` - Optional help text for additional context or validation messages
- Side label layout variant via `--sideLabel` modifier for horizontal label positioning

**Maintained features:**

- Size variants (`--sizeS`, `--sizeM`, `--sizeL`)
- Language-specific styling (`:lang(ja)`, `:lang(ko)`, `:lang(zh)`)
- Tag wrapping behavior when horizontal space is limited
- Custom styles and spacing modifiers support
- Semantic HTML structure with proper ARIA roles for accessibility

**Migration impact:**

Migrating from Legacy to Spectrum 2 requires:

- Updating class names from `.spectrum-TagGroup-item` to `.spectrum-TagGroup-tag`
- Wrapping tags in a `.spectrum-TagGroup-tags` container
- Moving `role="list"` from root element to the tags container
- Optionally adding label, action button, or help text elements for enhanced functionality

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3966)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-tag-group--docs)
- [React](https://react-spectrum.adobe.com/TagGroup)
