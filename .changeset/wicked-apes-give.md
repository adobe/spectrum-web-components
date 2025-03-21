---
'@spectrum-web-components/opacity-checkerboard': patch
---

Minor custom property use refactor; instead of mapping custom properties directly to their use, this update hoists those definitions to the top of the file making them consistent with other component structures.

```css
:host {
    --spectrum-opacity-checkerboard-dark: var(
        --spectrum-opacity-checkerboard-square-dark
    );
    --spectrum-opacity-checkerboard-light: var(
        --spectrum-opacity-checkerboard-square-light
    );
    --spectrum-opacity-checkerboard-size: var(
        --spectrum-opacity-checkerboard-square-size
    );
    --spectrum-opacity-checkerboard-position: left top;
}
```
