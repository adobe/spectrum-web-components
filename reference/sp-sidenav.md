# sp-sidenav

Side navigation allows users to locate information and features within the UI.

```js
import '@spectrum-web-components/sidenav/sp-sidenav.js';
// <sp-sidenav></sp-sidenav>
```

## Attributes

| Name               | Type                             | Default     | Description                                                                                                                                      |
| ------------------ | -------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `manage-tab-index` | `boolean`                        | `false`     |                                                                                                                                                  |
| `value`            | `string | undefined`             | `undefined` |                                                                                                                                                  |
| `variant`          | `'multilevel' | undefined`       | `undefined` | The multilevel variant will have multiple layers of hierarchical navigation items.                                                               |
| `label`            | `string | undefined | undefined` | `undefined` | An accessible label that describes the component, so that the side navigation can be distinguished from other navigation by screen reader users. |
| `disabled`         | `boolean`                        | `false`     | Disable this control. It will not receive focus or events                                                                                        |
| `autofocus`        | `boolean`                        | `false`     | When this control is rendered, focus it automatically                                                                                            |
| `tabIndex`         | `number`                         | -           | The tab index to apply to this control. See general documentation about the tabindex HTML property                                               |

## Slots

| Name        | Description                  |
| ----------- | ---------------------------- |
| `(default)` | the Sidenav Items to display |

## Events

| Name      | Description                                                                                                                       |
| --------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `change`  | Announces a change in the `value` property of the navigation element. This change can be "canceled" via `event.preventDefault()`. |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus                                                                  |
