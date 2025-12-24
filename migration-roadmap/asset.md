# Asset migration roadmap

Note: This component has no S2 design spec, and therefore the CSS _has not_ been migrated to S2.

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-Asset`
- `.spectrum-Asset-file`
- `.spectrum-Asset-fileBackground`
- `.spectrum-Asset-fileOutline`
- `.spectrum-Asset-folder`
- `.spectrum-Asset-folderBackground`
- `.spectrum-Asset-folderOutline`
- `.spectrum-Asset-image`

</details>

<details>
<summary>Passthroughs</summary>

None found for this component.

</details>

<details>
<summary>Modifiers</summary>

- `--mod-asset-file-background-color`
- `--mod-asset-folder-background-color`
- `--mod-asset-icon-margin`
- `--mod-asset-icon-max-width`
- `--mod-asset-icon-min-width`
- `--mod-asset-icon-outline-color`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `variant` (file, folder)
- `label` (string)

</details>

<details>
<summary>Slots</summary>

- Default slot (for custom content when variant is not file or folder)

</details>

## Comparison

### DOM structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<!-- File variant -->
<sp-asset variant="file" label="Document.pdf">
    <svg
        class="file"
        role="img"
        viewBox="0 0 128 128"
        aria-label="Document.pdf"
    >
        <path
            class="fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
</sp-asset>

<!-- Folder variant -->
<sp-asset variant="folder" label="My Folder">
    <svg class="folder" role="img" viewBox="0 0 32 32" aria-label="My Folder">
        <path
            class="folderBackground"
            d="M3,29.5c-1.4,0-2.5-1.1-2.5-2.5V5c0-1.4,1.1-2.5,2.5-2.5h10.1c0.5,0,1,0.2,1.4,0.6l3.1,3.1c0.2,0.2,0.4,0.3,0.7,0.3H29c1.4,0,2.5,1.1,2.5,2.5v18c0,1.4-1.1,2.5-2.5,2.5H3z"
        ></path>
        <path
            class="folderOutline"
            d="M29,6H18.3c-0.1,0-0.2,0-0.4-0.2l-3.1-3.1C14.4,2.3,13.8,2,13.1,2H3C1.3,2,0,3.3,0,5v22c0,1.6,1.3,3,3,3h26c1.7,0,3-1.4,3-3V9C32,7.3,30.7,6,29,6z M31,27c0,1.1-0.9,2-2,2H3c-1.1,0-2-0.9-2-2V7h28c1.1,0,2,0.9,2,2V27z"
        ></path>
    </svg>
</sp-asset>

<!-- Custom content variant -->
<sp-asset>
    <slot>Custom content</slot>
</sp-asset>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-Asset" id="asset-123">
    <svg viewBox="0 0 128 128" class="spectrum-Asset-file" width="10">
        <path
            class="spectrum-Asset-fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="spectrum-Asset-fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<div class="spectrum-Asset" id="asset-123">
    <svg viewBox="0 0 128 128" class="spectrum-Asset-file" width="10">
        <path
            class="spectrum-Asset-fileBackground"
            d="M24,126c-5.5,0-10-4.5-10-10V12c0-5.5,4.5-10,10-10h61.5c2.1,0,4.1,0.8,5.6,2.3l20.5,20.4c1.5,1.5,2.4,3.5,2.4,5.7V116c0,5.5-4.5,10-10,10H24z"
        ></path>
        <path
            class="spectrum-Asset-fileOutline"
            d="M113.1,23.3L92.6,2.9C90.7,1,88.2,0,85.5,0H24c-6.6,0-12,5.4-12,12v104c0,6.6,5.4,12,12,12h80c6.6,0,12-5.4,12-12V30.4C116,27.8,114.9,25.2,113.1,23.3z M90,6l20.1,20H92c-1.1,0-2-0.9-2-2V6z M112,116c0,4.4-3.6,8-8,8H24c-4.4,0-8-3.6-8-8V12c0-4.4,3.6-8,8-8h61.5c0.2,0,0.3,0,0.5,0v20c0,3.3,2.7,6,6,6h20c0,0.1,0,0.3,0,0.4V116z"
        ></path>
    </svg>
</div>
```

</details>

<details>
<summary>Diff: Legacy (CSS main) → Spectrum 2 (CSS spectrum-two)</summary>

**No differences found between main and spectrum-two branches.**

</details>

### CSS => SWC mapping

#### Non-variant selectors

| CSS selector             | Attribute or slot             | Status           |
| ------------------------ | ----------------------------- | ---------------- |
| `.spectrum-Asset`        | `:host`                       | Implemented      |
| `.spectrum-Asset-file`   | `variant='file'`, `.file`     | Implemented      |
| `.spectrum-Asset-folder` | `variant='folder'`, `.folder` | Implemented      |
| `.spectrum-Asset-image`  | default `<slot>` content      | Implemented      |
|                          | `label`                       | Missing from CSS |

#### Variant-specific selectors

These CSS selectors correspond to the class names used in the SVG path elements within the Asset component's `file()` and `folder()` template functions.

| CSS selector                       | Attribute or slot   | Status      |
| ---------------------------------- | ------------------- | ----------- |
| `.spectrum-Asset-fileBackground`   | `.fileBackground`   | Implemented |
| `.spectrum-Asset-fileOutline`      | `.fileOutline`      | Implemented |
| `.spectrum-Asset-folderBackground` | `.folderBackground` | Implemented |
| `.spectrum-Asset-folderOutline`    | `.folderOutline`    | Implemented |

## Summary of changes

### CSS => SWC implementation gaps

The asset component has a relatively straightforward mapping between CSS and web components. There do not appear to be any significant differences from CSS that we might consider bringing into 2nd gen web components.

**Implementation differences:**

- **Variant system**: Web component uses a `variant` attribute (file, folder) to determine which SVG to render, while CSS uses preset parameters in templates
- **Image support**: CSS uses a dedicated `image` parameter that renders `<img class="spectrum-Asset-image">`, while web component uses the default slot for custom content including images

### CSS Spectrum 2 changes

No differences found between the legacy (CSS main) and Spectrum 2 (CSS spectrum-two) branches, as no component migration has been done.

## Resources

- [CSS Storybook](https://opensource.adobe.com/spectrum-css/?path=/docs/components-asset--docs)
