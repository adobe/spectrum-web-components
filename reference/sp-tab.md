# sp-tab

The sp-tabs displays a list of sp-tab element children as role="tablist".

```js
import '@spectrum-web-components/tabs/sp-tab.js';
// <sp-tab></sp-tab>
```

## Attributes

| Name       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| `disabled` | `boolean` | `false` |             |
| `label`    | `string`  | `''`    |             |
| `selected` | `boolean` | `false` |             |
| `vertical` | `boolean` | `false` |             |
| `value`    | `string`  | `''`    |             |

## Slots

| Name        | Description                                    |
| ----------- | ---------------------------------------------- |
| `(default)` | text label of the Tab                          |
| `icon`      | The icon that appears on the left of the label |
