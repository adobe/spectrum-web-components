# sp-action-group

```js
import '@spectrum-web-components/action-group/sp-action-group.js';
// <sp-action-group></sp-action-group>
```

## Attributes

| Name           | Type                                | Default | Description |
| -------------- | ----------------------------------- | ------- | ----------- |
| `compact`      | `boolean`                           | `false` |             |
| `emphasized`   | `boolean`                           | `false` |             |
| `justified`    | `boolean`                           | `false` |             |
| `label`        | `string`                            | `''`    |             |
| `quiet`        | `boolean`                           | `false` |             |
| `selects`      | `undefined | 'single' | 'multiple'` | -       |             |
| `static-color` | `'white' | 'black' | undefined`     | -       |             |
| `vertical`     | `boolean`                           | `false` |             |
| `selected`     | `string[]`                          | -       |             |

## Slots

| Name        | Description                                          |
| ----------- | ---------------------------------------------------- |
| `(default)` | the sp-action-button elements that make up the group |

## Events

| Name     | Description                                             |
| -------- | ------------------------------------------------------- |
| `change` | Announces that selection state has been changed by user |
