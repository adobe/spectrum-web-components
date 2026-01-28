# Avatar migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Root class**: `.spectrum-Avatar`

**Elements**:

- `.spectrum-Avatar-image`
- `.spectrum-Avatar-link`

**States**:

- `.spectrum-Avatar.is-disabled`
- `.spectrum-Avatar.is-focused:not(.is-disabled):after`
- `.spectrum-Avatar:not(.is-disabled) .spectrum-Avatar-link:focus-visible:after`

**Variants**:

- `.spectrum-Avatar--size50`
- `.spectrum-Avatar--size75`
- `.spectrum-Avatar--size100`
- `.spectrum-Avatar--size200`
- `.spectrum-Avatar--size300`
- `.spectrum-Avatar--size400`
- `.spectrum-Avatar--size500`
- `.spectrum-Avatar--size600`
- `.spectrum-Avatar--size700`
- `.spectrum-Avatar--size800`
- `.spectrum-Avatar--size900`
- `.spectrum-Avatar--size1000`
- `.spectrum-Avatar--size1100`
- `.spectrum-Avatar--size1200`
- `.spectrum-Avatar--size1300`
- `.spectrum-Avatar--size1400`
- `.spectrum-Avatar--size1500`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers *deprecated*</summary>

- `--mod-avatar-block-size`
- `--mod-avatar-border-radius`
- `--mod-avatar-color-opacity`
- `--mod-avatar-color-opacity-disabled`
- `--mod-avatar-focus-indicator-color`
- `--mod-avatar-focus-indicator-gap`
- `--mod-avatar-focus-indicator-thickness`
- `--mod-avatar-inline-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `src` (string) - Source URL for the avatar image
- `size` (number) - Size of the avatar (50, 75, 100, 200, 300, 400, 500, 600, 700)
- `href` (string) - Link URL when avatar is clickable
- `label` (string) - Alt text for the avatar image
- `disabled` (boolean) - Whether the avatar is disabled

Note that other link-related attributes are available on the base `LikeAnchor` class, such as `download`, `href`, `referrerpolicy`, `rel`, `target`, and `type` but are not necessarily applicable to the avatar component and so not listed out explicitly here.

</details>

<details>
<summary>Slots</summary>

None found for this component.

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<!-- With link -->
<a id="link" class="link" href="[href]">
    <img class="image" alt="[label]" src="[src]" />
</a>

<!-- Without link -->
<img class="image" alt="[label]" src="[src]" />
```

</details>

<details>
<summary>Legacy (CSS main branch)</summary>

```html
<!-- With link -->
<div class="spectrum-Avatar spectrum-Avatar--size700 is-disabled is-focused">
    <a class="spectrum-Avatar-link" href="#">
        <img
            class="spectrum-Avatar-image"
            data-chromatic="ignore"
            src="[image]"
            alt="[altText]"
        />
    </a>
</div>

<!-- Without link -->
<div class="spectrum-Avatar spectrum-Avatar--size700 is-disabled is-focused">
    <img
        class="spectrum-Avatar-image"
        data-chromatic="ignore"
        src="[image]"
        alt="[altText]"
    />
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch)</summary>

```html
<!-- With link -->
<div class="spectrum-Avatar spectrum-Avatar--size700 is-disabled is-focused">
    <a class="spectrum-Avatar-link" href="#">
        <img
            class="spectrum-Avatar-image"
            data-chromatic="ignore"
            src="[image]"
            alt="[altText]"
        />
    </a>
</div>

<!-- Without link -->
<div class="spectrum-Avatar spectrum-Avatar--size700 is-disabled is-focused">
    <img
        class="spectrum-Avatar-image"
        data-chromatic="ignore"
        src="[image]"
        alt="[altText]"
    />
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

| CSS selector                 | Attribute or slot    | Status                                   |
| ---------------------------- | -------------------- | ---------------------------------------- |
| `.spectrum-Avatar--size50`   | `size="50"`          | Implemented                              |
| `.spectrum-Avatar--size75`   | `size="75"`          | Implemented                              |
| `.spectrum-Avatar--size100`  | `size="100"`         | Implemented                              |
| `.spectrum-Avatar--size200`  | `size="200"`         | Implemented                              |
| `.spectrum-Avatar--size300`  | `size="300"`         | Implemented                              |
| `.spectrum-Avatar--size400`  | `size="400"`         | Implemented                              |
| `.spectrum-Avatar--size500`  | `size="500"`         | Implemented                              |
| `.spectrum-Avatar--size600`  | `size="600"`         | Implemented                              |
| `.spectrum-Avatar--size700`  | `size="700"`         | Implemented                              |
| `.spectrum-Avatar-image`     | `src` attribute      | Implemented                              |
| `.spectrum-Avatar-link`      | `href` attribute     | Implemented                              |
| `.is-focused`                | Focus state          | Implemented                              |
| `.is-disabled`               | `disabled` attribute | Implemented                              |
| `.spectrum-Avatar--size800`  | `size="800"`         | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size900`  | `size="900"`         | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1000` | `size="1000"`        | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1100` | `size="1100"`        | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1200` | `size="1200"`        | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1300` | `size="1300"`        | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1400` | `size="1400"`        | Missing from WC (new size in Spectrum 2) |
| `.spectrum-Avatar--size1500` | `size="1500"`        | Missing from WC (new size in Spectrum 2) |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**

- Larger size variants (800, 900, 1000, 1100, 1200, 1300, 1400, 1500)

**Web Component features missing from CSS:**
None found for this component.

### CSS Spectrum 2 changes

No significant structural changes between CSS main and spectrum-two branches. The templates are identical, indicating that the avatar component structure remains consistent across Spectrum 2 migration.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3355)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-avatar--docs)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/avatar--docs)
