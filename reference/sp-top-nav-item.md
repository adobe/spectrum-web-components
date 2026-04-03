# sp-top-nav-item

sp-top-nav delivers site navigation, particularly for when that navigation will change the majority of the page's content and/or the page's URL when selected.

```js
import '@spectrum-web-components/top-nav/sp-top-nav-item.js';
// <sp-top-nav-item></sp-top-nav-item>
```

## Attributes

| Name             | Type                                                                                                                                                                                                                                | Default | Description                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| `selected`       | `boolean`                                                                                                                                                                                                                           | `false` |                                                                                                                |
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

| Name        | Description                    |
| ----------- | ------------------------------ |
| `(default)` | text label of the Top Nav Item |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |
