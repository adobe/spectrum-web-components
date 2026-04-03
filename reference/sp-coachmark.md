# sp-coachmark

sp-coachmark is a temporary message that educates users through new or unfamiliar product experiences.

```js
import '@spectrum-web-components/coachmark/sp-coachmark.js';
// <sp-coachmark></sp-coachmark>
```

## Attributes

| Name            | Type                                                                                                                                                      | Default   | Description                            |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------- |
| `item`          | `CoachmarkItem | undefined`                                                                                                                               | -         |                                        |
| `placement`     | `"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"` | `'right'` |                                        |
| `shortcut-key`  | `string | undefined`                                                                                                                                      | -         |                                        |
| `modifierKeys`  | `string[] | undefined`                                                                                                                                    | `[]`      |                                        |
| `src`           | `string | undefined`                                                                                                                                      | -         |                                        |
| `media-type`    | `MediaType | undefined`                                                                                                                                   | -         |                                        |
| `has-asset`     | `boolean`                                                                                                                                                 | `false`   |                                        |
| `asset`         | `'file' | 'folder' | undefined`                                                                                                                           | -         |                                        |
| `current-step`  | `number | undefined`                                                                                                                                      | -         |                                        |
| `total-steps`   | `number | undefined`                                                                                                                                      | -         |                                        |
| `primary-cta`   | `string | undefined`                                                                                                                                      | -         |                                        |
| `secondary-cta` | `string | undefined`                                                                                                                                      | -         |                                        |
| `open`          | `boolean`                                                                                                                                                 | `false`   | Whether the popover is visible or not. |
| `tip`           | `boolean`                                                                                                                                                 | `false`   |                                        |

## Slots

| Name          | Description                                                                      |
| ------------- | -------------------------------------------------------------------------------- |
| `cover-photo` | This is the cover photo for Default and Quiet Coachmark                          |
| `heading`     | HTML content to be listed as the heading                                         |
| `description` | A description of the card                                                        |
| `actions`     | an `sp-action-menu` element outlining actions to take on the represened object   |
| `step-count`  | Override the default pagination delivery with your own internationalized content |
| `(default)`   | content to display within the Popover                                            |

## Events

| Name        | Description                                             |
| ----------- | ------------------------------------------------------- |
| `primary`   | Announces that the "primary" button has been clicked.   |
| `secondary` | Announces that the "secondary" button has been clicked. |
