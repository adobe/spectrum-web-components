# Action group migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-ActionGroup`

**Sizes:**

- `.spectrum-ActionGroup--sizeXS`
- `.spectrum-ActionGroup--sizeS`
- `.spectrum-ActionGroup--sizeM`
- `.spectrum-ActionGroup--sizeL`
- `.spectrum-ActionGroup--sizeXL`

**Layout variants:**

- `.spectrum-ActionGroup--vertical`
- `.spectrum-ActionGroup--compact`

**Compact mode:**

- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet)`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item + .spectrum-ActionGroup-item`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item .spectrum-ActionButton-label`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item.is-selected`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:first-child`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:last-child`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:hover`
- `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:focus-visible`

**Compact + vertical mode:**

- `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet)`
- `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item`
- `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item + .spectrum-ActionGroup-item`
- `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:first-child`
- `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:last-child`

**Child elements:**

- `.spectrum-ActionGroup .spectrum-ActionGroup-item`
- `.spectrum-ActionGroup .spectrum-ActionGroup-item:focus-visible`

**Justified layout:**

- `.spectrum-ActionGroup--justified .spectrum-ActionGroup-item`

**Regular (non-compact, non-vertical) spacing:**

- `.spectrum-ActionGroup:not(.spectrum-ActionGroup--vertical, .spectrum-ActionGroup--compact) .spectrum-ActionGroup-item`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-actionbutton-focus-indicator-border-radius`

</details>

<details>
<summary>Modifiers</summary>

**Spacing:**

- `--mod-actiongroup-horizontal-spacing-regular`
- `--mod-actiongroup-horizontal-spacing-compact`
- `--mod-actiongroup-vertical-spacing-regular`
- `--mod-actiongroup-vertical-spacing-compact`
- `--mod-actiongroup-gap-size-compact`

**Border radius (for compact mode):**

- `--mod-actiongroup-border-radius`
- `--mod-actiongroup-border-radius-reset`

**Button spacing reset (for compact mode):**

- `--mod-actiongroup-button-spacing-reset`

</details>

### SWC

<details>
<summary>Attributes</summary>

**Size:**

- `size` (values: `xs`, `s`, `m`, `l`, `xl`) - group size, no default, propagates to child action buttons

**Layout:**

- `vertical` - stacks buttons vertically (boolean)
- `compact` - buttons appear connected with shared borders (boolean)
- `justified` - buttons fill available width equally (boolean)

**Child action button appearance (propagated to children):**

- `quiet` - applies quiet styling to all child action buttons (boolean)
- `emphasized` - applies emphasized styling to all child action buttons (boolean)
- `static-color` (values: `white`, `black`) - static color variant, propagates to children

**Selection management:**

- `selects` (values: `single`, `multiple`, undefined) - selection mode
    - `single`: radio group behavior (single selection)
    - `multiple`: checkbox group behavior (multiple selections)
    - undefined: no managed selection (individual toggles behavior)
- `selected` - array of selected button values

**Accessibility:**

- `label` - accessible label for the group (sets aria-label)

</details>

<details>
<summary>Slots</summary>

- Default slot - the `sp-action-button` elements that make up the group

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<!-- Default slot for sp-action-button or sp-action-menu elements -->
<slot role="presentation"></slot>
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<div class="spectrum-ActionGroup spectrum-ActionGroup--sizeM">
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<div class="spectrum-ActionGroup spectrum-ActionGroup--sizeM">
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
    <button
        class="spectrum-ActionButton spectrum-ActionButton--sizeM spectrum-ActionGroup-item"
    >
        ...
    </button>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

#### Sizes

| CSS selector                    | SWC attribute  | Status      |
| ------------------------------- | -------------- | ----------- |
| `.spectrum-ActionGroup`         | Base component | Implemented |
| `.spectrum-ActionGroup--sizeXS` | `size="xs"`    | Implemented |
| `.spectrum-ActionGroup--sizeS`  | `size="s"`     | Implemented |
| `.spectrum-ActionGroup--sizeM`  | `size="m"`     | Implemented |
| `.spectrum-ActionGroup--sizeL`  | `size="l"`     | Implemented |
| `.spectrum-ActionGroup--sizeXL` | `size="xl"`    | Implemented |

#### Layout variants

| CSS selector                       | SWC attribute | Status      |
| ---------------------------------- | ------------- | ----------- |
| `.spectrum-ActionGroup--vertical`  | `vertical`    | Implemented |
| `.spectrum-ActionGroup--compact`   | `compact`     | Implemented |
| `.spectrum-ActionGroup--justified` | `justified`   | Implemented |

#### Child elements

| CSS selector                                                                                                            | SWC equivalent                         | Status      |
| ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ----------- |
| `.spectrum-ActionGroup .spectrum-ActionGroup-item`                                                                      | Default slot / `::slotted(*)`          | Implemented |
| `.spectrum-ActionGroup .spectrum-ActionGroup-item:focus-visible`                                                        | Browser focus-visible on slotted items | Implemented |
| `.spectrum-ActionGroup--justified .spectrum-ActionGroup-item`                                                           | Slotted buttons when `justified`       | Implemented |
| `.spectrum-ActionGroup:not(.spectrum-ActionGroup--vertical, .spectrum-ActionGroup--compact) .spectrum-ActionGroup-item` | Slotted buttons in regular mode        | Implemented |

**Note:** In CSS templates, `.spectrum-ActionGroup-item` is applied as a class to each child action button. In SWC, the group uses `::slotted(*)` to style slotted action buttons without adding an additional class.

#### Compact mode

| CSS selector                                                                                                               | SWC attribute                    | Status      |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet)`                                                         | `compact` (when not `quiet`)     | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item`                              | Slotted buttons in compact mode  | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item + .spectrum-ActionGroup-item` | Adjacent buttons in compact mode | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item .spectrum-ActionButton-label` | Button labels in compact mode    | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item.is-selected`                  | Selected button in compact mode  | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:first-child`                  | First button in compact mode     | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:last-child`                   | Last button in compact mode      | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:hover`                        | Hover state in compact mode      | Implemented |
| `.spectrum-ActionGroup--compact:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:focus-visible`                | Focus state in compact mode      | Implemented |

#### Compact + vertical mode

| CSS selector                                                                                                                                              | SWC attribute                             | Status      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------- |
| `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet)`                                                         | `compact` + `vertical` (when not `quiet`) | Implemented |
| `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item`                              | Slotted buttons in vertical compact mode  | Implemented |
| `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item + .spectrum-ActionGroup-item` | Adjacent buttons in vertical compact mode | Implemented |
| `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:first-child`                  | First button in vertical compact mode     | Implemented |
| `.spectrum-ActionGroup--compact.spectrum-ActionGroup--vertical:not(.spectrum-ActionGroup--quiet) .spectrum-ActionGroup-item:last-child`                   | Last button in vertical compact mode      | Implemented |

#### WC-only attributes

| SWC attribute                           | CSS equivalent | Notes                                                      |
| --------------------------------------- | -------------- | ---------------------------------------------------------- |
| `quiet` (propagates to children)        | N/A            | In CSS, `--quiet` class on container affects child styling |
| `emphasized` (propagates to children)   | N/A            | Propagates to child action buttons                         |
| `static-color` (propagates to children) | N/A            | Propagates to child action buttons                         |
| `selects`                               | N/A            | Manages single/multiple selection with automatic ARIA      |
| `selected`                              | N/A            | Tracks selected button values                              |
| `label`                                 | N/A            | Sets aria-label on the group                               |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**
None. All CSS selectors have corresponding web component implementations.

### CSS Spectrum 2 changes

**No structural changes:**
The Action Group template is identical between the main branch (legacy) and spectrum-two branch (Spectrum 2). Both branches use the same DOM structure with:

- A `div` wrapper with `spectrum-ActionGroup` class
- Size classes applied via `--size{size}` modifier pattern
- Layout modifiers for vertical, compact, and justified layouts
- Child action buttons with `spectrum-ActionGroup-item` class

All spacing, border radius, and layout changes are handled through CSS custom properties without requiring DOM structure changes.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/2453)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-action-group--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/actionbuttongroup--docs)
