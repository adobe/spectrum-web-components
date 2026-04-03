# sp-tabs

The sp-tabs displays a list of sp-tab element children as role="tablist".

```js
import '@spectrum-web-components/tabs/sp-tabs.js';
// <sp-tabs></sp-tabs>
```

## Attributes

| Name               | Type                                           | Default        | Description                                                                                                                                                                                         |
| ------------------ | ---------------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`             | `boolean`                                      | `false`        | Whether to activate a tab on keyboard focus or not. By default a tab is activated via a "click" interaction. This is specifically intended for when tab content cannot be displayed instantly, e.g. |
| `compact`          | `boolean`                                      | `false`        | The tab items are displayed closer together.                                                                                                                                                        |
| `direction`        | `'vertical' | 'vertical-right' | 'horizontal'` | `'horizontal'` |                                                                                                                                                                                                     |
| `emphasized`       | `boolean`                                      | `false`        |                                                                                                                                                                                                     |
| `label`            | `string`                                       | `''`           |                                                                                                                                                                                                     |
| `enableTabsScroll` | `boolean`                                      | `false`        |                                                                                                                                                                                                     |
| `quiet`            | `boolean`                                      | `false`        | The tab list is displayed without a border.                                                                                                                                                         |
| `selected`         | `string`                                       | `''`           |                                                                                                                                                                                                     |
| `disabled`         | `boolean`                                      | `false`        | Disable this control. It will not receive focus or events                                                                                                                                           |
| `autofocus`        | `boolean`                                      | `false`        | When this control is rendered, focus it automatically                                                                                                                                               |
| `tabIndex`         | `number`                                       | -              | The tab index to apply to this control. See general documentation about the tabindex HTML property                                                                                                  |

## Slots

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| `(default)` | Tab elements to manage as a group                     |
| `tab-panel` | Tab Panel elements related to the listed Tab elements |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `change`  | The selected Tab child has changed.                              |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |
