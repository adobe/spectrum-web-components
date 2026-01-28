# Link migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Base component:**

- `.spectrum-Link`

**Variants:**

- `.spectrum-Link--inline`
- `.spectrum-Link--quiet`
- `.spectrum-Link--secondary`
- `.spectrum-Link--staticBlack`
- `.spectrum-Link--staticWhite`

**States:**

- `.spectrum-Link:active`
- `.spectrum-Link:focus-visible`
- `.spectrum-Link:hover`
- `.spectrum-Link--quiet:hover`

**Language-specific:**

- `.spectrum-Link:lang(ja)`
- `.spectrum-Link:lang(ko)`
- `.spectrum-Link:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-link-animation-duration`
- `--mod-link-inline-font-weight`
- `--mod-link-line-height-cjk`
- `--mod-link-text-color`
- `--mod-link-text-color-active`
- `--mod-link-text-color-black`
- `--mod-link-text-color-focus`
- `--mod-link-text-color-hover`
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

**From LikeAnchor mixin:**

- `download` - String attribute
- `label` - String attribute (aria-label)
- `href` - String attribute
- `target` - Values: `_blank`, `_parent`, `_self`, `_top`
- `referrerpolicy` - Values: `no-referrer`, `no-referrer-when-downgrade`, `origin`, `origin-when-cross-origin`, `same-origin`, `strict-origin`, `strict-origin-when-cross-origin`, `unsafe-url`
- `rel` - String attribute

**From Focusable mixin:**

- `autofocus` - Boolean attribute
- `disabled` - Boolean attribute
- `tabIndex` - Number attribute

</details>

<details>
<summary>Slots</summary>

- Default slot - Link text content

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
         spectrum-Link--quiet
         spectrum-Link--[variant]
         spectrum-Link--static[StaticColor]"
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
         spectrum-Link--quiet
         spectrum-Link--inline
         spectrum-Link--[variant]
         spectrum-Link--static[StaticColor]"
    id="[id]"
    href="[url]"
>
    [text]
</a>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

```html
<a
    class="spectrum-Link
         spectrum-Link--quiet
         spectrum-Link--inline
         spectrum-Link--[variant]
         spectrum-Link--static[StaticColor]
         is-hover
         is-active
         is-focus-visible
         is-visited"
    id="[id]"
    href="[url]"
>
    [text]
</a>
```

**Key changes:**

- New modifier: `spectrum-Link--inline` class added for inline link styling

</details>

### CSS => SWC mapping

| CSS selector                                                                    | Attribute or slot         | Status              |
| ------------------------------------------------------------------------------- | ------------------------- | ------------------- |
| `.spectrum-Link`                                                                | `:host`                   | Implemented         |
| `.spectrum-Link--inline`                                                        |                           | Missing from WC     |
| `.spectrum-Link--quiet`                                                         | `quiet`                   | Implemented         |
| `.spectrum-Link--secondary`                                                     | `variant="secondary"`     | Implemented         |
| `.spectrum-Link--staticBlack`                                                   | `static-color="black"`    | Implemented         |
| `.spectrum-Link--staticWhite`                                                   | `static-color="white"`    | Implemented         |
| `.spectrum-Link:hover`                                                          | CSS `:hover`              | Implemented via CSS |
| `.spectrum-Link:active`                                                         | CSS `:active`             | Implemented via CSS |
| `.spectrum-Link:focus-visible`                                                  | CSS `:focus`              | Implemented via CSS |
| `.spectrum-Link--quiet:hover`                                                   | CSS `:hover`              | Implemented via CSS |
| `.spectrum-Link:lang(ja)`, `.spectrum-Link:lang(ko)`, `.spectrum-Link:lang(zh)` | Language-specific styling | Implemented         |
| (text content)                                                                  | Default slot              | Implemented         |

## Summary of changes

### CSS => SWC implementation gaps

**Missing from WC:**

- `.spectrum-Link--inline` - New modifier for inline link styling

The `inline` modifier was added in Spectrum 2 to support inline links within paragraphs that have different styling requirements than standalone links (specifically for text decoration and font-weight behavior). This is now the default variant in S2, with the previous default becoming the standalone variant.

### CSS Spectrum 2 changes

**No structural changes to core Link component:**

- The base `<a>` element structure remains identical between main and spectrum-two branches
- All existing CSS classes and modifiers from main branch are preserved in spectrum-two

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3570)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-link--docs)
- [React](https://react-spectrum.adobe.com/Link)
