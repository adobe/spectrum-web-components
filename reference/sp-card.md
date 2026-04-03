# sp-card

An sp-card represents a rectangular card that contains a variety of text and image layouts.

```js
import '@spectrum-web-components/card/sp-card.js';
// <sp-card></sp-card>
```

## Attributes

| Name             | Type                                                                                                                                                                                                                                | Default      | Description                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- |
| `asset`          | `'file' | 'folder' | undefined`                                                                                                                                                                                                     | -            |                                                                                                                |
| `variant`        | `'standard' | 'gallery' | 'quiet'`                                                                                                                                                                                                  | `'standard'` |                                                                                                                |
| `selected`       | `boolean`                                                                                                                                                                                                                           | -            |                                                                                                                |
| `heading`        | `string`                                                                                                                                                                                                                            | `''`         |                                                                                                                |
| `horizontal`     | `boolean`                                                                                                                                                                                                                           | `false`      |                                                                                                                |
| `focused`        | `boolean`                                                                                                                                                                                                                           | `false`      |                                                                                                                |
| `toggles`        | `boolean`                                                                                                                                                                                                                           | `false`      | Indicates whether the card can be toggled between selected and unselected states.                              |
| `value`          | `string`                                                                                                                                                                                                                            | `''`         |                                                                                                                |
| `subheading`     | `string`                                                                                                                                                                                                                            | `''`         |                                                                                                                |
| `download`       | `string | undefined`                                                                                                                                                                                                                | -            | Causes the browser to treat the linked URL as a download.                                                      |
| `label`          | `string | undefined`                                                                                                                                                                                                                | -            | An accessible label that describes the component. It will be applied to aria-label, but not visually rendered. |
| `href`           | `string | undefined`                                                                                                                                                                                                                | -            | The URL that the hyperlink points to.                                                                          |
| `target`         | `'_blank' | '_parent' | '_self' | '_top' | undefined`                                                                                                                                                                               | -            | Where to display the linked URL, as the name for a browsing context (a tab, window, or &lt;iframe&gt;).        |
| `referrerpolicy` | `| 'no-referrer'
      | 'no-referrer-when-downgrade'
      | 'origin'
      | 'origin-when-cross-origin'
      | 'same-origin'
      | 'strict-origin'
      | 'strict-origin-when-cross-origin'
      | 'unsafe-url' | undefined` | -            | How much of the referrer to send when following the link.                                                      |
| `rel`            | `string | undefined`                                                                                                                                                                                                                | -            | The relationship of the linked URL as space-separated link types.                                              |

## Slots

| Name          | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| `preview`     | This is the preview image for Gallery Cards                                    |
| `cover-photo` | This is the cover photo for Default and Quiet Cards                            |
| `heading`     | HTML content to be listed as the heading                                       |
| `subheading`  | HTML content to be listed as the subheading                                    |
| `description` | A description of the card                                                      |
| `actions`     | an `sp-action-menu` element outlining actions to take on the represened object |
| `footer`      | Footer text                                                                    |

## Events

| Name     | Description                                             |
| -------- | ------------------------------------------------------- |
| `click`  |                                                         |
| `change` | Announces a change in the `selected` property of a card |
