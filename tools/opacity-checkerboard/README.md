## Description

The `opacity-checkerboard` class is used to highlight opacity. Leverage these styles in your component as outlined below to unify you application's visuals with those delivered by various Spectrum Web Components.

## Usage

Import the styles from `opacity-checkerboard` css

```
import opacityCheckeryBoardStyles from '@spectrum-web-components/tools/opacity-checkerboard/src/opacity-checkerboard.css.js';
```

Add it to your component's styles array

```js
public static override get styles(): CSSResultArray {
    return [...styles, opacityCheckeryBoardStyles];
}
```

Use the `opacity-checkerboard` class in `render()` method

```
<div style="inline-size: 100px; block-size: 100px;">
    <div class="opacity-checkerboard"></div>
</div>
```
