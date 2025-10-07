# Illustrated message migration roadmap

## Component specifications

### CSS

<details>
<summary>CSS selectors</summary>

- `.spectrum-IllustratedMessage`

**Variants:**

- `.spectrum-IllustratedMessage--horizontal`
- `.spectrum-IllustratedMessage--sizeL`
- `.spectrum-IllustratedMessage--sizeS`

**Subcomponents:**

- `.spectrum-IllustratedMessage--horizontal .spectrum-IllustratedMessage-illustration`
- `.spectrum-IllustratedMessage-actions`
- `.spectrum-IllustratedMessage-content`
- `.spectrum-IllustratedMessage-description`
- `.spectrum-IllustratedMessage-heading`
- `.spectrum-IllustratedMessage-illustration`

**Internationalization:**

- `.spectrum-IllustratedMessage--sizeL:lang(ja)`
- `.spectrum-IllustratedMessage--sizeL:lang(ko)`
- `.spectrum-IllustratedMessage--sizeL:lang(zh)`
- `.spectrum-IllustratedMessage--sizeS:lang(ja)`
- `.spectrum-IllustratedMessage--sizeS:lang(ko)`
- `.spectrum-IllustratedMessage--sizeS:lang(zh)`
- `.spectrum-IllustratedMessage:lang(ja)`
- `.spectrum-IllustratedMessage:lang(ko)`
- `.spectrum-IllustratedMessage:lang(zh)`

</details>

<details>
<summary>Passthroughs</summary>

- `--mod-buttongroup-justify-content`

</details>

<details>
<summary>Modifiers</summary>

- `--mod-illustrated-message-description-color`
- `--mod-illustrated-message-description-font-family`
- `--mod-illustrated-message-description-font-size`
- `--mod-illustrated-message-description-font-style`
- `--mod-illustrated-message-description-font-weight`
- `--mod-illustrated-message-description-line-height`
- `--mod-illustrated-message-description-pointer-events`
- `--mod-illustrated-message-description-position`
- `--mod-illustrated-message-description-to-action`
- `--mod-illustrated-message-description-z-index`
- `--mod-illustrated-message-display`
- `--mod-illustrated-message-heading-to-description`
- `--mod-illustrated-message-horizontal-maximum-width`
- `--mod-illustrated-message-illustrated-inline-size`
- `--mod-illustrated-message-illustration-block-size`
- `--mod-illustrated-message-illustration-color`
- `--mod-illustrated-message-illustration-size`
- `--mod-illustrated-message-illustration-to-heading`
- `--mod-illustrated-message-pointer-events`
- `--mod-illustrated-message-title-color`
- `--mod-illustrated-message-title-font-family`
- `--mod-illustrated-message-title-font-size`
- `--mod-illustrated-message-title-font-style`
- `--mod-illustrated-message-title-font-weight`
- `--mod-illustrated-message-title-line-height`
- `--mod-illustrated-message-vertical-maximum-width`

</details>

### SWC

<details>
<summary>Attributes</summary>

- `heading` (String) - Title text for the message
- `description` (String) - Description text for the message

</details>

<details>
<summary>Slots</summary>

- Default slot - The SVG that represents the illustration
- Heading slot - Title text for the message
- Description slot - Description text for the message

</details>

## Comparison

### DOM Structure changes

<details>
<summary>Spectrum Web Components:</summary>

```html
<div id="illustration">
    <slot>
        <!-- illustration SVG -->
    </slot>
</div>
<h2
    id="heading"
    class="spectrum-Heading spectrum-Heading--sizeL spectrum-Heading--light"
>
    <slot name="heading">[heading]</slot>
</h2>
<div id="description" class="spectrum-Body spectrum-Body--sizeS">
    <slot name="description">[description]</slot>
</div>
```

</details>

<details>
<summary>Legacy (CSS main branch):</summary>

```html
<div class="spectrum-IllustratedMessage">
    <svg
        class="spectrum-IllustratedMessage-illustration"
        width="199"
        height="98"
        viewBox="0 0 199 97.7"
    >
        <!-- illustration SVG -->
    </svg>
    <h2
        class=" spectrum-Heading spectrum-Heading--sizeM spectrum-IllustratedMessage-heading "
    >
        Heading text
    </h2>
    <p
        size="s"
        class=" spectrum-Body spectrum-Body--sizeS spectrum-IllustratedMessage-description "
    >
        Description text and other content (like links)
    </p>
</div>
```

</details>

<details>
<summary>Spectrum 2 (CSS spectrum-two branch):</summary>

```html
<!-- t-shirt size classes and styles are new for S2 -->
<div class="spectrum-IllustratedMessage spectrum-IllustratedMessage--sizeL">
    <svg
        class="spectrum-IllustratedMessage-illustration"
        xmlns="http://www.w3.org/2000/svg"
        width="96"
        height="96"
        viewBox="0 0 160 160"
        preserveAspectRatio="xMinYMid slice"
    >
        <!-- illustration SVG -->
    </svg>
    <div class="spectrum-IllustratedMessage-content">
        <h2 class="spectrum-IllustratedMessage-heading">Heading text</h2>
        <p class="spectrum-IllustratedMessage-description">
            Description text and other content (like links)
        </p>
        <!-- optional button group -->
        <div class="spectrum-IllustratedMessage-actions spectrum-ButtonGroup">
            <button class="spectrum-Button--outline spectrum-Button--secondary">
                Remind me later
            </button>
            <button class="spectrum-Button--fill spectrum-Button--accent">
                Rate now
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
- <div class="spectrum-IllustratedMessage">
+ <div class="spectrum-IllustratedMessage spectrum-IllustratedMessage--sizeL">
-   <svg class="spectrum-IllustratedMessage-illustration" width="199" height="98" viewBox="0 0 199 97.7" >
+   <svg class="spectrum-IllustratedMessage-illustration" width="96" height="96" viewBox="0 0 160 160" preserveAspectRatio="xMinYMid slice">
      <!-- illustration SVG (SVG was updated!) -->
    </svg>
-   <h2 class=" spectrum-Heading spectrum-Heading--sizeM spectrum-IllustratedMessage-heading ">
-     Heading text
-   </h2>
-   <p size="s" class=" spectrum-Body spectrum-Body--sizeS spectrum-IllustratedMessage-description ">
-     Description text and other content (like links)
-   </p>
+   <div class="spectrum-IllustratedMessage-content">
+     <h2 class="spectrum-IllustratedMessage-heading">
+       Heading text
+     </h2>
+     <p class="spectrum-IllustratedMessage-description">
+       Description text and other content (like links)
+     </p>
+     <div class="spectrum-IllustratedMessage-actions spectrum-ButtonGroup">
+       <button class="spectrum-Button--outline spectrum-Button--secondary">Remind me later</button>
+       <button class="spectrum-Button--fill spectrum-Button--accent">Rate now</button>
+     </div>
+   </div>
  </div>
```

### Key Changes in HTML Structure

1. **Size class addition**: Added t-shirt sizing classes to the root element for explicit size control.

2. **Modernized SVG attributes**: Updated SVG with modern attributes including `xmlns`, updated dimensions (96x96), new viewBox (0 0 160 160), and `preserveAspectRatio` for better rendering.

3. **Content wrapper**: Added `.spectrum-IllustratedMessage-content` container to group text content and actions separate from the illustration.

4. **Typography simplification**: Removed Spectrum typography classes (`spectrum-Heading`, `spectrum-Body`) from heading and description elements, using semantic HTML with component-specific classes instead.

5. **Actions container**: Introduced `.spectrum-IllustratedMessage-actions` container with button group support for interactive elements.

6. **Horizontal orientation**: Added `.spectrum-IllustratedMessage--horizontal` modifier class that introduces the new horizontal layout variant.

</details>

### CSS => SWC mapping

| CSS selector                                | Attribute or slot            | Status                       |
| ------------------------------------------- | ---------------------------- | ---------------------------- |
| `.spectrum-IllustratedMessage`              | `:host`                      | Implemented                  |
| `.spectrum-IllustratedMessage--sizeS`       | `size="s"`                   | Missing from WC (new for S2) |
| `.spectrum-IllustratedMessage--sizeL`       | `size="l"`                   | Missing from WC (new for S2) |
| `.spectrum-IllustratedMessage--horizontal`  | Layout variant               | Missing from WC (new for S2) |
| `.spectrum-IllustratedMessage-illustration` | Default slot                 | Implemented                  |
| `.spectrum-IllustratedMessage-heading`      | `heading` attribute/slot     | Implemented                  |
| `.spectrum-IllustratedMessage-description`  | `description` attribute/slot | Implemented                  |
| `.spectrum-IllustratedMessage-content`      | Content container            | Missing from WC (new for S2) |
| `.spectrum-IllustratedMessage-actions`      | Actions container            | Missing from WC (new for S2) |

## Summary of changes

### CSS => SWC implementation gaps

- **Size variants**: The web component lacks support for `.spectrum-IllustratedMessage--sizeS` and `.spectrum-IllustratedMessage--sizeL` which provide different sizing options for various use cases. Sizes were introduced in Spectrum 2 designs.

- **Horizontal layout**: Missing support for `.spectrum-IllustratedMessage--horizontal` which enables horizontal layout with illustration and content side-by-side. This was new for Spectrum 2.

- **Content structure**: The web component lacks `.spectrum-IllustratedMessage-content` wrapper and `.spectrum-IllustratedMessage-actions` container, limiting complex layout capabilities. This wrapper sets the correct justification styles for the new button group in Spectrum 2.

- **Built-in actions**: No built-in support yet for button group, which were introduced in S2.

### CSS Spectrum 2 changes

- **Unified illustration design**: Upgraded the SVG illustration to something that better represents modern Spectrum design language.

- **Enhanced content structure**: Added `.spectrum-IllustratedMessage-content` wrapper to group text content separate from illustration, improving layout flexibility.

- **Actions integration**: Introduced `.spectrum-IllustratedMessage-actions` container with built-in button group support for common interactive scenarios. This element is optional.

- **Size system enhancement**: Expanded size variants.

- **Improved SVG handling**: Enhanced SVG illustration with better accessibility attributes and rendering optimization.

## Resources

- [CSS migration](https://github.com/adobe/spectrum-css/pull/3246)
- [Spectrum 2 preview](https://spectrumcss.z13.web.core.windows.net/pr-2352/index.html?path=/docs/components-illustrated-message--docs&args=isHorizontal:!true)
- [React](https://react-spectrum.adobe.com/s2/index.html?path=/docs/illustratedmessage--docs)
