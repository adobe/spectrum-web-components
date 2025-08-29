# Search migration roadmap

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
- `.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)`

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

- `action` (String) - Form action attribute
- `label` (String) - Label for the search field (default: "Search")
- `method` (String) - Form method (`get`, `post`, `dialog`)
- `placeholder` (String) - Placeholder text (default: "Search")
- `holdValueOnEscape` (Boolean) - Whether to hold the value when Escape is pressed
- `value` (String) - Current search input value
- `size` (String) - Search field size (`s`, `m`, `l`, `xl`)
- `disabled` (Boolean) - Whether the search field is disabled
- `invalid` (Boolean) - Whether the search field is in an invalid state
- `quiet` (Boolean) - Whether to use the quiet variant

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

## Visual Comparison

**Legacy Component:**

<!-- Screenshot of legacy component will be added here -->

**Spectrum 2 Component:**

<!-- Screenshot of Spectrum 2 component will be added here -->

## DOM Structure Changes

**Legacy (main branch):**

```html
<form
    class="spectrum-Search spectrum-Search--size{size} spectrum-Search--quiet"
>
    <div class="spectrum-Textfield spectrum-Search-textfield">
        <svg
            class="spectrum-Icon spectrum-Search-icon spectrum-UIIcon-Magnify"
        ></svg>
        <input
            type="search"
            placeholder="Search"
            name="search"
            class="spectrum-Textfield-input spectrum-Search-input"
            autocomplete="off"
        />
    </div>
    <button class="spectrum-ClearButton spectrum-Search-clearButton">
        <svg class="spectrum-ClearButton-fill"></svg>
    </button>
    <div class="spectrum-HelpText">[help text]</div>
</form>
```

**Spectrum 2 (spectrum-two branch):**

```html
<form
    class="spectrum-Search spectrum-Search--size{size} spectrum-Search--quiet"
>
    <div class="spectrum-Textfield spectrum-Search-textfield">
        <svg
            class="spectrum-Icon spectrum-Search-icon spectrum-UIIcon-Magnify"
        ></svg>
        <input
            type="search"
            placeholder="Search"
            name="search"
            class="spectrum-Textfield-input spectrum-Search-input"
            autocomplete="off"
        />
    </div>
    <button class="spectrum-ClearButton spectrum-Search-clearButton">
        <svg class="spectrum-ClearButton-fill"></svg>
    </button>
    <div class="spectrum-HelpText">[help text]</div>
</form>
```

## Comparison

| CSS selector                                                                          | Attribute or slot             | Status           |
| ------------------------------------------------------------------------------------- | ----------------------------- | ---------------- |
| `.spectrum-Search`                                                                    | Root element                  | Implemented      |
| `.spectrum-Search--sizeS`                                                             | `size="s"`                    | Implemented      |
| `.spectrum-Search--sizeL`                                                             | `size="l"`                    | Implemented      |
| `.spectrum-Search--sizeXL`                                                            | `size="xl"`                   | Implemented      |
| `.spectrum-Search-textfield`                                                          | Textfield wrapper             | Implemented      |
| `.spectrum-Search-input`                                                              | Input element                 | Implemented      |
| `.spectrum-Search-icon`                                                               | Search icon                   | Implemented      |
| `.spectrum-Search-clearButton`                                                        | Clear button                  | Implemented      |
| `.spectrum-Search .spectrum-HelpText`                                                 | Help text element             | Implemented      |
| `.spectrum-Search.is-collapsed`                                                       | Collapsed state               | Missing from WC  |
| `.spectrum-Search.is-expanded`                                                        | Expanded state                | Missing from WC  |
| `.spectrum-Search.is-disabled`                                                        | `disabled` attribute          | Implemented      |
| `.spectrum-Search-textfield.is-focused`                                               | Focus state                   | Implemented      |
| `.spectrum-Search-textfield.is-keyboardFocused`                                       | Keyboard focus state          | Implemented      |
| `.spectrum-Search:lang(ja)`, `.spectrum-Search:lang(ko)`, `.spectrum-Search:lang(zh)` | Language-specific styling     | Implemented      |
| -                                                                                     | `action` attribute            | Missing from CSS |
| -                                                                                     | `method` attribute            | Missing from CSS |
| -                                                                                     | `holdValueOnEscape` attribute | Missing from CSS |
| -                                                                                     | `help-text` slot              | Missing from CSS |
| -                                                                                     | `negative-help-text` slot     | Missing from CSS |

## Key Structural Changes

**Element Hierarchy Changes:**

- No significant hierarchy changes between main and spectrum-two branches
- Maintained consistent form > textfield > input structure

**Class Name Changes:**

- No major class name changes
- Consistent naming convention maintained

**Attribute Changes:**

- Added `action` and `method` attributes for form functionality
- Added `holdValueOnEscape` for controlling escape key behavior
- Added `label` attribute for accessibility
- Extended Textfield functionality with search-specific features

**Slot/Content Changes:**

- Added `help-text` slot for descriptive text
- Added `negative-help-text` slot for error messaging
- Inherits all Textfield slots and functionality

**Migration Impact:**

- Search component extends Textfield providing all textfield functionality
- Enhanced form handling with action and method support
- Better accessibility with automatic labeling

### Implementation Gaps

**CSS Features Missing from Web Component:**

- Collapsed/expanded state support - web component should support animated expansion/collapse
- More sophisticated state management for search interactions

**Web Component Features Missing from CSS:**

- `action` attribute - CSS should provide styling for form action states
- `method` attribute - CSS should provide styling based on form method
- `holdValueOnEscape` attribute - CSS should provide styling for this behavior state
- Help text slots - CSS should provide styling for slotted help text elements

**Features Being Deprecated/Removed:**

- None identified - component maintains backward compatibility

### Action Items for Web Component Maintainers

**Required Additions:**

- Collapsed/expanded state functionality for search field animations
- Enhanced form integration with action and method handling
- Better state management for search-specific interactions

**Required Removals:**

- None identified

**Breaking Changes:**

- None identified - component extends existing Textfield functionality
- Migration guidance: Search component provides enhanced functionality while maintaining Textfield compatibility
