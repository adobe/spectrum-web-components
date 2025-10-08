# Thumbnail migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

**Root class**: `.spectrum-Thumbnail`

**Elements**:

- `.spectrum-Thumbnail:before`
- `.spectrum-Thumbnail-image`
- `.spectrum-Thumbnail-image-wrapper`
- `.spectrum-Thumbnail-layer`
- `.spectrum-Thumbnail-layer:before`
- `.spectrum-Thumbnail-layer-inner`
- `.spectrum-Thumbnail-background`

**States**:

- `.is-disabled`, `:disabled`
- `.is-focused`, `:focus-visible`
- `.is-selected` (attached to `.spectrum-Thumbnail-layer`, not to the root element)

**Variants**:

- **Size**:
    - `.spectrum-Thumbnail--size50`
    - `.spectrum-Thumbnail--size75`
    - `.spectrum-Thumbnail--size100`
    - `.spectrum-Thumbnail--size200`
    - `.spectrum-Thumbnail--size300`
    - `.spectrum-Thumbnail--size400`
    - `.spectrum-Thumbnail--size500`
    - `.spectrum-Thumbnail--size600`
    - `.spectrum-Thumbnail--size700`
    - `.spectrum-Thumbnail--size800`
    - `.spectrum-Thumbnail--size900`
    - `.spectrum-Thumbnail--size1000`

- **Image cover**:
    - `.spectrum-Thumbnail--cover`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-opacity-checkerboard-size`

</details>

<details>
<summary>Modifiers *deprecated*</summary>

- `--mod-thumbnail-border-color`
- `--mod-thumbnail-border-color-selected`
- `--mod-thumbnail-border-radius`
- `--mod-thumbnail-border-width`
- `--mod-thumbnail-border-width-selected`
- `--mod-thumbnail-color-opacity-disabled`
- `--mod-thumbnail-focus-indicator-color`
- `--mod-thumbnail-focus-indicator-gap`
- `--mod-thumbnail-focus-indicator-thickness`
- `--mod-thumbnail-layer-border-color-inner`
- `--mod-thumbnail-layer-border-color-outer`
- `--mod-thumbnail-layer-border-width-inner`
- `--mod-thumbnail-layer-border-width-outer`
- `--mod-thumbnail-size`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `background` (string) - Background color or gradient for the thumbnail
- `cover` (boolean) - Whether the image should cover the entire thumbnail
- `layer` (boolean) - Whether the thumbnail is in layer mode
- `size` (string) - Size of the thumbnail (50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000)
- `disabled` (boolean) - Whether the thumbnail is disabled
- `selected` (boolean) - Whether the thumbnail is selected (used for layer variant)

</details>

<details>
<summary>Slots</summary>

- Default slot - Image element to present in the thumbnail

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components</summary>

```html
<!-- With background -->
<div class="opacity-checkerboard background" style="background: [background]">
    <div class="image-wrapper">
        <slot></slot>
    </div>
</div>

<!-- With layer -->
<div class="opacity-checkerboard layer-inner">
    <slot></slot>
</div>

<!-- Default -->
<div class="opacity-checkerboard image-wrapper">
    <slot></slot>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<!-- Layer variant -->
<div
    class="spectrum-Thumbnail spectrum-Thumbnail--cover spectrum-Thumbnail-layer is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div class="spectrum-Thumbnail-layer-inner">
        <div class="spectrum-Thumbnail-image-wrapper">
            <img
                class="spectrum-Thumbnail-image"
                src="[imageURL]"
                alt="[altText]"
            />
        </div>
    </div>
</div>

<!-- With background -->
<div
    class="spectrum-Thumbnail is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div
        class="spectrum-Thumbnail-background"
        style="background-color: [backgroundColor]"
    ></div>
    <div class="spectrum-Thumbnail-image-wrapper">
        <img
            class="spectrum-Thumbnail-image"
            src="[imageURL]"
            alt="[altText]"
        />
    </div>
</div>

<!-- Default -->
<div
    class="spectrum-Thumbnail spectrum-Thumbnail--cover is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div class="spectrum-Thumbnail-image-wrapper spectrum-OpacityCheckerboard">
        <img
            class="spectrum-Thumbnail-image"
            src="[imageURL]"
            alt="[altText]"
        />
    </div>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- Layer variant -->
<div
    class="spectrum-Thumbnail spectrum-Thumbnail--cover spectrum-Thumbnail-layer is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div class="spectrum-Thumbnail-layer-inner spectrum-OpacityCheckerboard">
        <div class="spectrum-Thumbnail-image-wrapper">
            <img
                class="spectrum-Thumbnail-image"
                src="[imageURL]"
                alt="[altText]"
            />
        </div>
    </div>
</div>

<!-- With background -->
<div
    class="spectrum-Thumbnail is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div
        class="spectrum-Thumbnail-background"
        style="background-color: [backgroundColor]"
    ></div>
    <div class="spectrum-Thumbnail-image-wrapper">
        <img
            class="spectrum-Thumbnail-image"
            src="[imageURL]"
            alt="[altText]"
        />
    </div>
</div>

<!-- Default -->
<div
    class="spectrum-Thumbnail spectrum-Thumbnail--cover is-selected is-disabled is-focused spectrum-Thumbnail--size500"
>
    <div class="spectrum-Thumbnail-image-wrapper spectrum-OpacityCheckerboard">
        <img
            class="spectrum-Thumbnail-image"
            src="[imageURL]"
            alt="[altText]"
        />
    </div>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

No significant structural changes.

</details>

### CSS => SWC mapping

| CSS selector                        | Attribute or slot      | Status      |
| ----------------------------------- | ---------------------- | ----------- |
| `.spectrum-Thumbnail--size50`       | `size="50"`            | Implemented |
| `.spectrum-Thumbnail--size75`       | `size="75"`            | Implemented |
| `.spectrum-Thumbnail--size100`      | `size="100"`           | Implemented |
| `.spectrum-Thumbnail--size200`      | `size="200"`           | Implemented |
| `.spectrum-Thumbnail--size300`      | `size="300"`           | Implemented |
| `.spectrum-Thumbnail--size400`      | `size="400"`           | Implemented |
| `.spectrum-Thumbnail--size500`      | `size="500"`           | Implemented |
| `.spectrum-Thumbnail--size600`      | `size="600"`           | Implemented |
| `.spectrum-Thumbnail--size700`      | `size="700"`           | Implemented |
| `.spectrum-Thumbnail--size800`      | `size="800"`           | Implemented |
| `.spectrum-Thumbnail--size900`      | `size="900"`           | Implemented |
| `.spectrum-Thumbnail--size1000`     | `size="1000"`          | Implemented |
| `.spectrum-Thumbnail--cover`        | `cover` attribute      | Implemented |
| `.spectrum-Thumbnail-layer`         | `layer` attribute      | Implemented |
| `.spectrum-Thumbnail-background`    | `background` attribute | Implemented |
| `.spectrum-Thumbnail-image`         | Default slot           | Implemented |
| `.spectrum-Thumbnail-image-wrapper` | Internal wrapper       | Implemented |
| `.spectrum-Thumbnail-layer-inner`   | Internal wrapper       | Implemented |
| `.is-disabled`                      | `disabled` attribute   | Implemented |
| `.is-focused`                       | Focus state            | Implemented |
| `.is-selected`                      | `selected` attribute   | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

**CSS features missing from Web Component:**
None found for this component.

**Web Component features missing from CSS:**
None found for this component.

### CSS Spectrum 2 changes

No significant structural changes between CSS main and spectrum-two branches. The templates are identical, indicating that the thumbnail component structure remains consistent across Spectrum 2 migration.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3367)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-thumbnail--docs)
- React (no thumbnail component in React Spectrum)
