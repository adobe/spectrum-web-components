# sp-illustrated-message

An sp-illustrated-message displays an outline illustration and a message, usually in an empty state or on an error page.

```js
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
// <sp-illustrated-message></sp-illustrated-message>
```

## Attributes

| Name          | Type     | Default | Description |
| ------------- | -------- | ------- | ----------- |
| `heading`     | `string` | `''`    |             |
| `description` | `string` | `''`    |             |

## Slots

| Name          | Description                              |
| ------------- | ---------------------------------------- |
| `(default)`   | The SVG that represents the illustration |
| `heading`     | Headline for the message                 |
| `description` | Description text for the illustration    |
