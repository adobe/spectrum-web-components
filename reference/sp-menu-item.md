# sp-menu-item

An sp-menu is used for creating a menu list.

```js
import '@spectrum-web-components/menu/sp-menu-item.js';
// <sp-menu-item></sp-menu-item>
```

## Attributes

| Name             | Type                                                                                                                                                                                                                                | Default | Description                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `active`         | `boolean`                                                                                                                                                                                                                           | `false` | whether the menu item is active or has an active descendant                                                    |
| `focused`        | `boolean`                                                                                                                                                                                                                           | `false` | whether the menu item has keyboard focus                                                                       |
| `selected`       | `boolean`                                                                                                                                                                                                                           | `false` | whether the menu item is selected                                                                              |
| `value`          | `string`                                                                                                                                                                                                                            | -       | value of the menu item which is used for selection                                                             |
| `has-submenu`    | `boolean`                                                                                                                                                                                                                           | `false` | whether the menu item has a submenu                                                                            |
| `no-wrap`        | `boolean`                                                                                                                                                                                                                           | `false` | whether menu item text content should not wrap                                                                 |
| `open`           | `boolean`                                                                                                                                                                                                                           | `false` | whether submenu is open                                                                                        |
| `download`       | `string | undefined`                                                                                                                                                                                                                | -       | Causes the browser to treat the linked URL as a download.                                                      |
| `label`          | `string | undefined`                                                                                                                                                                                                                | -       | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered. |
| `href`           | `string | undefined`                                                                                                                                                                                                                | -       | The URL that the hyperlink points to.                                                                          |
| `target`         | `'_blank' | '_parent' | '_self' | '_top' | undefined`                                                                                                                                                                               | -       | Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).        |
| `referrerpolicy` | `| 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url' | undefined` | -       | How much of the referrer to send when following the link.                                                      |
| `rel`            | `string | undefined`                                                                                                                                                                                                                | -       | The relationship of the linked URL as space-separated link types.                                              |
| `disabled`       | `boolean`                                                                                                                                                                                                                           | `false` | Disable this control. It will not receive focus or events                                                      |
| `autofocus`      | `boolean`                                                                                                                                                                                                                           | `false` | When this control is rendered, focus it automatically                                                          |
| `tabIndex`       | `number`                                                                                                                                                                                                                            | -       | The tab index to apply to this control. See general documentation about the tabindex HTML property             |

## Slots

| Name          | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `(default)`   | text content to display within the Menu Item                                     |
| `description` | description to be placed below the label of the Menu Item                        |
| `icon`        | icon element to be placed at the start of the Menu Item                          |
| `value`       | content placed at the end of the Menu Item like values, keyboard shortcuts, etc. |
| `submenu`     | content placed in a submenu                                                      |

## Events

| Name                 | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `focus`              |                                                                        |
| `blur`               |                                                                        |
| `undefined`          |                                                                        |
| `sp-menu-item-added` | announces the item has been added so a parent menu can take ownerships |
| `keydown`            | Trick :focus-visible polyfill into thinking keyboard based focus       |
