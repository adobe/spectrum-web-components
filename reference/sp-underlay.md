# sp-underlay

An sp-underlay provides a visual layer between overlay content and the rest of your application.

```js
import '@spectrum-web-components/underlay/sp-underlay.js';
// <sp-underlay></sp-underlay>
```

## Attributes

| Name   | Type      | Default | Description |
| ------ | --------- | ------- | ----------- |
| `open` | `boolean` | `false` |             |

## Events

| Name    | Description                                                                                                      |
| ------- | ---------------------------------------------------------------------------------------------------------------- |
| `close` | When the underlay is "clicked" and the consuming pattern should chose whether to close based on that interaction |
