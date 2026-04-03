# sp-top-nav

sp-top-nav delivers site navigation, particularly for when that navigation will change the majority of the page's content and/or the page's URL when selected.

```js
import '@spectrum-web-components/top-nav/sp-top-nav.js';
// <sp-top-nav></sp-top-nav>
```

## Attributes

| Name                      | Type                 | Default            | Description                                                                                                                                                                                 |
| ------------------------- | -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compact`                 | `boolean`            | -                  | The collection of tabs take up less space                                                                                                                                                   |
| `label`                   | `string`             | `''`               |                                                                                                                                                                                             |
| `ignore-url-parts`        | `string`             | `''`               | A space separated list of part of the URL to ignore when matching for the "selected" Top Nav Item. Currently supported values are `hash` and `search`, which will remove the `#hash` and `? |
| `selectionIndicatorStyle` |                      | `noSelectionStyle` |                                                                                                                                                                                             |
| `quiet`                   | `boolean`            | `false`            | The Top Nav is displayed without a border.                                                                                                                                                  |
| `selected`                | `string | undefined` | -                  |                                                                                                                                                                                             |

## Slots

| Name        | Description                     |
| ----------- | ------------------------------- |
| `(default)` | Nav Items to display as a group |
