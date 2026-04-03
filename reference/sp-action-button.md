# sp-action-button

An sp-action-button represents an action a user can take.

```js
import '@spectrum-web-components/action-button/sp-action-button.js';
// <sp-action-button></sp-action-button>
```

## Attributes

| Name              | Type                                                                                                                                                                                                                                | Default    | Description                                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `emphasized`      | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                                                     |
| `hold-affordance` | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                                                     |
| `quiet`           | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                                                     |
| `role`            | `string`                                                                                                                                                                                                                            | `'button'` |                                                                                                                                                     |
| `selected`        | `boolean`                                                                                                                                                                                                                           | `false`    | Whether an Action Button with `role='button'` should also be `aria-pressed='true'`                                                                  |
| `toggles`         | `boolean`                                                                                                                                                                                                                           | `false`    | Whether to automatically manage the `selected` attribute on interaction and whether `aria-pressed="false"` should be used when `selected === false` |
| `static-color`    | `'white' | 'black' | undefined`                                                                                                                                                                                                     | -          | The static color variant to use for the action button.                                                                                              |
| `value`           | `string`                                                                                                                                                                                                                            | -          |                                                                                                                                                     |
| `download`        | `string | undefined`                                                                                                                                                                                                                | -          | Causes the browser to treat the linked URL as a download.                                                                                           |
| `label`           | `string | undefined`                                                                                                                                                                                                                | -          | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered.                                      |
| `href`            | `string | undefined`                                                                                                                                                                                                                | -          | The URL that the hyperlink points to.                                                                                                               |
| `target`          | `'_blank' | '_parent' | '_self' | '_top' | undefined`                                                                                                                                                                               | -          | Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).                                             |
| `referrerpolicy`  | `| 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url' | undefined` | -          | How much of the referrer to send when following the link.                                                                                           |
| `rel`             | `string | undefined`                                                                                                                                                                                                                | -          | The relationship of the linked URL as space-separated link types.                                                                                   |
| `active`          | `boolean`                                                                                                                                                                                                                           | `false`    |                                                                                                                                                     |
| `type`            | `'button' | 'submit' | 'reset'`                                                                                                                                                                                                     | `'button'` | The default behavior of the button. Possible values are: `button` (default), `submit`, and `reset`.                                                 |
| `disabled`        | `boolean`                                                                                                                                                                                                                           | `false`    | Disable this control. It will not receive focus or events                                                                                           |
| `autofocus`       | `boolean`                                                                                                                                                                                                                           | `false`    | When this control is rendered, focus it automatically                                                                                               |
| `tabIndex`        | `number`                                                                                                                                                                                                                            | -          | The tab index to apply to this control. See general documentation about the tabindex HTML property                                                  |

## Slots

| Name        | Description                       |
| ----------- | --------------------------------- |
| `(default)` | text label of the Action Button   |
| `icon`      | The icon to use for Action Button |

## Events

| Name        | Description                                                                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `longpress` | Synthesizes a "longpress" interaction that signifies a `pointerdown` event that is >=300ms or a keyboard event where code is `Space` or code is `ArrowDown` while `altKey===true`. |
| `change`    | Announces a change in the `selected` property of an action button                                                                                                                  |
| `keydown`   | Trick :focus-visible polyfill into thinking keyboard based focus                                                                                                                   |
