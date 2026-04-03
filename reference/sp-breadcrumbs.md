# sp-breadcrumbs

An sp-breadcrumbs shows hierarchy and navigational context for a user's location within an app.

```js
import '@spectrum-web-components/breadcrumbs/sp-breadcrumbs.js';
// <sp-breadcrumbs></sp-breadcrumbs>
```

## Attributes

| Name                | Type      | Default        | Description                                                         |
| ------------------- | --------- | -------------- | ------------------------------------------------------------------- |
| `max-visible-items` | `number`  | `4`            | Override the maximum number of visible items                        |
| `label`             | `string`  | `''`           | Accessible name for the Breadcrumbs component                       |
| `menu-label`        | `string`  | `'More items'` | Change the default label of the action menu                         |
| `compact`           | `boolean` | `false`        | compact option is useful for reducing the height of the breadcrumbs |

## Slots

| Name        | Description                                |
| ----------- | ------------------------------------------ |
| `icon`      | change the default icon of the action menu |
| `root`      | Breadcrumb item to always display          |
| `(default)` | Breadcrumb items                           |

## Events

| Name     | Description                            |
| -------- | -------------------------------------- |
| `change` | Announces the selected breadcrumb item |
