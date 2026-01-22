# TagGroup migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-TagGroup`
- `.spectrum-TagGroup-item`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-tag-group-item-margin-block`
- `--mod-tag-group-item-margin-inline`

</details>

### SWC

**Note**: In Spectrum Web Components, this component is named `<sp-tags>` (not `<sp-taggroup>`).

<details>
<summary>Attributes</summary>

None found for this component. The `<sp-tags>` component is a simple container that manages keyboard navigation and focus for its child `<sp-tag>` elements.

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
<sp-tags role="list">
    <slot></slot>
    <!-- Slotted sp-tag elements -->
</sp-tags>
```

**Internal behavior:**

- Uses `RovingTabindexController` for keyboard navigation
- Manages focus between tag elements
- Applies `role="list"` for accessibility
- Individual tags have `role="listitem"`

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div
    class="spectrum-TagGroup"
    style="[customStyles]"
    role="list"
    aria-label="[ariaLabel]"
>
    <!-- Multiple Tag components with class="spectrum-TagGroup-item" -->
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div
    class="spectrum-TagGroup"
    style="[customStyles]"
    role="list"
    aria-label="[ariaLabel]"
>
    <!-- Multiple Tag components with class="spectrum-TagGroup-item" -->
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
    <div class="spectrum-Tag spectrum-TagGroup-item" ...>...</div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**Note**: The TagGroup templates are identical between main and spectrum-two branches. No structural changes were made to this component in Spectrum 2.

</details>

### CSS => SWC mapping

| CSS selector              | Attribute or slot                              | Status           |
| ------------------------- | ---------------------------------------------- | ---------------- |
| `.spectrum-TagGroup`      | Base component (`<sp-tags>`)                   | Implemented      |
| `.spectrum-TagGroup-item` | Individual tags (applied via CSS in templates) | Missing from WC  |
| Default slot              |                                                | Implemented      |
| Keyboard navigation       | RovingTabindexController                       | Missing from CSS |
| Focus management          | Internal controller                            | Missing from CSS |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-TagGroup-item` class - In CSS templates, each tag within a group receives this additional class. The Web Components implementation doesn't apply this class to slotted tags.

**Missing from CSS:**

- Keyboard navigation behavior - The `<sp-tags>` component uses `RovingTabindexController` to manage focus and keyboard navigation between tags
- Focus management - Automatic focus handling when navigating with arrow keys

**Implementation differences:**

- **CSS approach**: Uses a wrapper `<div>` with class `spectrum-TagGroup` that contains multiple tag elements, each with the `spectrum-TagGroup-item` class
- **WC approach**: Uses a custom element `<sp-tags>` that acts as a slot container with built-in keyboard navigation and focus management

### CSS Spectrum 2 changes

**No changes in Spectrum 2:**

- The TagGroup component structure is identical between main and spectrum-two branches
- All CSS classes remain the same
- No new features or modifications were introduced

**Maintained features:**

- Simple container structure with `role="list"`
- Spacing modifiers for tag items
- Support for custom styles and aria-label

**Component simplicity:**

- TagGroup is one of the simplest Spectrum components
- It primarily provides consistent spacing between tags and semantic structure
- Most functionality resides in the individual Tag components

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
