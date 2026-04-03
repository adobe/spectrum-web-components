# sp-infield-button

```js
import '@spectrum-web-components/infield-button/sp-infield-button.js';
// <sp-infield-button></sp-infield-button>
```

## Attributes

| Name             | Type                                                                                                                                                                                                                                | Default    | Description                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------- |
| `block`          | `'start' | 'end'`                                                                                                                                                                                                                   | -          | Whether to style the button as if it is at the start or end of a vertical stack                                |
| `inline`         | `'start' | 'end'`                                                                                                                                                                                                                   | -          | Whether to style the button as if it is at the start or end of a horizontal group                              |
| `quiet`          | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                |
| `download`       | `string | undefined`                                                                                                                                                                                                                | -          | Causes the browser to treat the linked URL as a download.                                                      |
| `label`          | `string | undefined`                                                                                                                                                                                                                | -          | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered. |
| `href`           | `string | undefined`                                                                                                                                                                                                                | -          | The URL that the hyperlink points to.                                                                          |
| `target`         | `'_blank' | '_parent' | '_self' | '_top' | undefined`                                                                                                                                                                               | -          | Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).        |
| `referrerpolicy` | `| 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url' | undefined` | -          | How much of the referrer to send when following the link.                                                      |
| `rel`            | `string | undefined`                                                                                                                                                                                                                | -          | The relationship of the linked URL as space-separated link types.                                              |
| `active`         | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                |
| `type`           | `'button' | 'submit' | 'reset'`                                                                                                                                                                                                     | `'button'` | The default behavior of the button. Possible values are: `button` (default), `submit`, and `reset`.            |
| `disabled`       | `boolean`                                                                                                                                                                                                                           | `false`    | Disable this control. It will not receive focus or events                                                      |
| `autofocus`      | `boolean`                                                                                                                                                                                                                           | `false`    | When this control is rendered, focus it automatically                                                          |
| `tabIndex`       | `number`                                                                                                                                                                                                                            | -          | The tab index to apply to this control. See general documentation about the tabindex HTML property             |

## Slots

| Name        | Description                                           |
| ----------- | ----------------------------------------------------- |
| `(default)` | text content to be displayed in the Button element    |
| `icon`      | icon element(s) to display at the start of the button |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |
