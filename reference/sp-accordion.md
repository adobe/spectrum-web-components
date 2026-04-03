# sp-accordion

The sp-accordion element contains a list of items that can be expanded or collapsed to reveal additional content or information associated with each item.

```js
import '@spectrum-web-components/accordion/sp-accordion.js';
// <sp-accordion></sp-accordion>
```

## Attributes

| Name             | Type                                 | Default | Description                                                                  |
| ---------------- | ------------------------------------ | ------- | ---------------------------------------------------------------------------- |
| `allow-multiple` | `boolean`                            | `false` | Allows multiple accordion items to be opened at the same time                |
| `density`        | `'compact' | 'spacious' | undefined` | -       | Sets the spacing between the content to borders of an accordion item         |
| `level`          | `number`                             | `3`     | The heading level (2-6) to use for all accordion item titles. Defaults to 3. |

## Slots

| Name        | Description                                |
| ----------- | ------------------------------------------ |
| `(default)` | The sp-accordion-item children to display. |
