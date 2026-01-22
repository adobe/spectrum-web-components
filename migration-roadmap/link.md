# Link migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Link`
- `.spectrum-Link--quiet`
- `.spectrum-Link--quiet:hover`
- `.spectrum-Link--secondary`
- `.spectrum-Link--staticBlack`
- `.spectrum-Link--staticWhite`
- `.spectrum-Link:active`
- `.spectrum-Link:focus-visible`
- `.spectrum-Link:hover`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-link-animation-duration`
- `--mod-link-text-color`
- `--mod-link-text-color-active`
- `--mod-link-text-color-black`
- `--mod-link-text-color-focus`
- `--mod-link-text-color-hover`
- `--mod-link-text-color-primary-active`
- `--mod-link-text-color-primary-default`
- `--mod-link-text-color-primary-focus`
- `--mod-link-text-color-primary-hover`
- `--mod-link-text-color-secondary-active`
- `--mod-link-text-color-secondary-default`
- `--mod-link-text-color-secondary-focus`
- `--mod-link-text-color-secondary-hover`
- `--mod-link-text-color-white`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `variant` - Values: `secondary`
- `static-color` - Values: `black`, `white`
- `quiet` - Boolean attribute
- `download` - String attribute (from LikeAnchor mixin)
- `label` - String attribute (from LikeAnchor mixin, aria-label)
- `href` - String attribute (from LikeAnchor mixin)
- `target` - Values: `_blank`, `_parent`, `_self`, `_top` (from LikeAnchor mixin)
- `referrerpolicy` - Values: `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `same-origin`, `strict-origin`, `strict-origin-when-cross-origin`, `unsafe-url` (from LikeAnchor mixin)
- `rel` - String attribute (from LikeAnchor mixin)

</details>

<details>
<summary>Slots</summary>

- Default slot (no name) - Link text content

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<a
    id="anchor"
    href="[href value]"
    download="[download value]"
    target="[target value]"
    aria-label="[label value]"
    tabindex="[tabindex value]"
    referrerpolicy="[referrerpolicy value]"
    rel="[rel value]"
>
    <slot></slot>
</a>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<a
    class="spectrum-Link
         spectrum-Link--quiet (if isQuiet)
         spectrum-Link--[variant] (if variant)
         spectrum-Link--static[StaticColor] (if staticColor)
         is-hover (if isHovered)
         is-active (if isActive)
         is-focus-visible (if isFocused)
         is-visited (if isVisited)"
    id="[id]"
    href="[url]"
>
    [text]
</a>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<a
    class="spectrum-Link
         spectrum-Link--quiet (if isQuiet)
         spectrum-Link--inline (if isInline)
         spectrum-Link--[variant] (if variant)
         spectrum-Link--static[StaticColor] (if staticColor)
         is-hover (if isHovered)
         is-active (if isActive)
         is-focus-visible (if isFocused)
         is-visited (if isVisited)"
    id="[id]"
    href="[url]"
>
    [text]
</a>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```diff
 <a
   class="spectrum-Link
          spectrum-Link--quiet (if isQuiet)
+         spectrum-Link--inline (if isInline)
          spectrum-Link--[variant] (if variant)
          spectrum-Link--static[StaticColor] (if staticColor)
          is-hover (if isHovered)
          is-active (if isActive)
          is-focus-visible (if isFocused)
          is-visited (if isVisited)"
   id="[id]"
   href="[url]"
 >
   [text]
 </a>
```

**Key changes:**

- New modifier: `spectrum-Link--inline` class added for inline link styling
- The `TemplateWithFillerText` wrapper changed from `<div>` to `<p>` for better semantic HTML

</details>

### CSS => SWC mapping

| CSS selector                   | Attribute or slot               | Status          |
| ------------------------------ | ------------------------------- | --------------- |
| `.spectrum-Link`               | Base component                  | Implemented     |
| `.spectrum-Link--quiet`        | `quiet`                         | Implemented     |
| `.spectrum-Link--secondary`    | `variant="secondary"`           | Implemented     |
| `.spectrum-Link--staticBlack`  | `static-color="black"`          | Implemented     |
| `.spectrum-Link--staticWhite`  | `static-color="white"`          | Implemented     |
| `.spectrum-Link:hover`         | Hover state (automatic)         | Implemented     |
| `.spectrum-Link:active`        | Active state (automatic)        | Implemented     |
| `.spectrum-Link:focus-visible` | Focus visible state (automatic) | Implemented     |
| `.spectrum-Link--quiet:hover`  | Hover state with quiet variant  | Implemented     |
| `.spectrum-Link--inline`       |                                 | Missing from WC |
| (text content)                 | Default slot                    | Implemented     |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-Link--inline` - New modifier for inline link styling

The `inline` modifier was added in Spectrum 2 to support inline links within paragraphs that have different styling requirements than standalone links (specifically for text decoration behavior).

### CSS Spectrum 2 changes

**New feature in Spectrum 2:**

- Added `isInline` parameter and corresponding `spectrum-Link--inline` class modifier for inline link styling within text content

**Wrapper element change:**

- The `TemplateWithFillerText` example changed from using a `<div>` wrapper to a `<p>` (paragraph) wrapper, which better represents the semantic use case for inline links

**No structural changes to core Link component:**

- The base `<a>` element structure remains identical between main and spectrum-two branches
- All existing CSS classes and modifiers from main branch are preserved in spectrum-two

## Resources

- [CSS migration]()
- [Spectrum 2 preview]()
- [React]()
