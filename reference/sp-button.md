# sp-button

An sp-button represents an action a user can take.

```js
import '@spectrum-web-components/button/sp-button.js';
// <sp-button></sp-button>
```

## Attributes

| Name             | Type                                                                                                                                                                                                                                | Default     | Description                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `pending-label`  | `string`                                                                                                                                                                                                                            | `'Pending'` |                                                                                                                |
| `pending`        | `boolean`                                                                                                                                                                                                                           | `false`     |                                                                                                                |
| `variant`        | `ButtonVariants`                                                                                                                                                                                                                    | -           | The visual variant to apply to this button.                                                                    |
| `static-color`   | `'black' | 'white' | undefined`                                                                                                                                                                                                     | -           | The static color variant to use for this button.                                                               |
| `treatment`      | `ButtonTreatments`                                                                                                                                                                                                                  | `'fill'`    | The visual treatment to apply to this button.                                                                  |
| `quiet`          | `boolean`                                                                                                                                                                                                                           | -           | Style this button to be less obvious                                                                           |
| `no-wrap`        | `boolean`                                                                                                                                                                                                                           | `false`     | Disables text wrapping within the button component's label.                                                    |
| `download`       | `string | undefined`                                                                                                                                                                                                                | -           | Causes the browser to treat the linked URL as a download.                                                      |
| `label`          | `string | undefined`                                                                                                                                                                                                                | -           | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered. |
| `href`           | `string | undefined`                                                                                                                                                                                                                | -           | The URL that the hyperlink points to.                                                                          |
| `target`         | `'_blank' | '_parent' | '_self' | '_top' | undefined`                                                                                                                                                                               | -           | Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).        |
| `referrerpolicy` | `| 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url' | undefined` | -           | How much of the referrer to send when following the link.                                                      |
| `rel`            | `string | undefined`                                                                                                                                                                                                                | -           | The relationship of the linked URL as space-separated link types.                                              |
| `active`         | `boolean`                                                                                                                                                                                                                           | `false`     |                                                                                                                |
| `type`           | `'button' | 'submit' | 'reset'`                                                                                                                                                                                                     | `'button'`  | The default behavior of the button. Possible values are: `button` (default), `submit`, and `reset`.            |
| `disabled`       | `boolean`                                                                                                                                                                                                                           | `false`     | Disable this control. It will not receive focus or events                                                      |
| `autofocus`      | `boolean`                                                                                                                                                                                                                           | `false`     | When this control is rendered, focus it automatically                                                          |
| `tabIndex`       | `number`                                                                                                                                                                                                                            | -           | The tab index to apply to this control. See general documentation about the tabindex HTML property             |

## Slots

| Name        | Description                |
| ----------- | -------------------------- |
| `(default)` | text label of the Button   |
| `icon`      | The icon to use for Button |

## Events

| Name      | Description                                                      |
| --------- | ---------------------------------------------------------------- |
| `keydown` | Trick :focus-visible polyfill into thinking keyboard based focus |
