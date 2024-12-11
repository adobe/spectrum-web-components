## Description

The `opacity-checkerboard` class is used to highlight opacity. Leverage these styles in your component as outlined below to unify you application's visuals with those delivered by various Spectrum Web Components.

## Usage

Import the styles from the `opacity-checkerboard` CSS:

```
import opacityCheckerBoardStyles from '@spectrum-web-components/opacity-checkerboard/src/opacity-checkerboard.css.js';
```

Add it to your component's styles array before your component's styles. The order that you include the styles in makes a difference, because selectors within opacity checkerboard may have the same
specificity as those within your component.

```js
public static override get styles(): CSSResultArray {
    return [opacityCheckerBoardStyles, styles];
}
```

Use the `opacity-checkerboard` class in your component's `render()` method:

```html-live demo
<div
    class="opacity-checkerboard"
    style="inline-size: 100px; block-size: 100px;"
></div>
```
