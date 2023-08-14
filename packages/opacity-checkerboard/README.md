## Description

This package is part of the [Spectrum CSS project](https://github.com/adobe/spectrum-css).

Opacity checkerboard is intended to be used within other components, including:

ColorHandle, ColorSlider, Swatch and Thumbnail

## Usage

Import the styles from `opacity-checkerboard` css

```
import opacityCheckeryBoardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';

```

Add it to your component's styles array

```js
    public static override get styles(): CSSResultArray {
        return [...styles, opacityCheckeryBoardStyles];
    }

```

Use the `OpacityCheckerboard` class in `render()` method

```
<div style="inline-size: 100px; block-size: 100px;">
    <div class="OpacityCheckerboard"></div>
</div>
```
