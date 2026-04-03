# sp-accordion-item

The sp-accordion element contains a list of items that can be expanded or collapsed to reveal additional content or information associated with each item.

```js
import '@spectrum-web-components/accordion/sp-accordion-item.js';
// <sp-accordion-item></sp-accordion-item>
```

## Attributes

| Name        | Type      | Default | Description                                                                                                                          |
| ----------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `open`      | `boolean` | `false` |                                                                                                                                      |
| `label`     | `string`  | `''`    |                                                                                                                                      |
| `disabled`  | `boolean` | `false` | Disable this control. It will not receive focus or events                                                                            |
| `level`     | `number`  | `3`     | The heading level (2-6) to use for the accordion item title. This property is set by the parent sp-accordion element. Defaults to 3. |
| `autofocus` | `boolean` | `false` | When this control is rendered, focus it automatically                                                                                |
| `tabIndex`  | `number`  | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property                                   |

## Slots

| Name        | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| `(default)` | The content of the item that is hidden when the item is not open |

## Events

| Name                       | Description                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `sp-accordion-item-toggle` | Announce that an accordion item has been toggled while allowing the event to be cancelled. |
| `keydown`                  | Trick :focus-visible polyfill into thinking keyboard based focus                           |
