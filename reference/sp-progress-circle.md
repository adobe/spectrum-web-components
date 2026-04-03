# sp-progress-circle

An sp-progress-circle shows the progression of a system operation such as downloading, uploading, processing, etc.

```js
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
// <sp-progress-circle></sp-progress-circle>
```

## Attributes

| Name            | Type                                      | Default | Description                                                                                                                                                       |
| --------------- | ----------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `static-color`  | `ProgressCircleStaticColorS1 | undefined` | -       | Static color variant for use on different backgrounds. When set to 'white', the component uses white styling for images with a dark tinted background.            |
| `size`          | `ElementSize`                             | -       | The size of the progress circle.                                                                                                                                  |
| `indeterminate` | `boolean`                                 | `false` | Whether the progress circle shows indeterminate progress (loading state). When true, displays an animated loading indicator instead of a specific progress value. |
| `label`         | `string`                                  | `''`    | Accessible label for the progress circle. Used to provide context about what is loading or progressing.                                                           |
| `progress`      | `number`                                  | `0`     | Progress value from 0 to 100. Only relevant when indeterminate is false.                                                                                          |

## Slots

| Name        | Description                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `(default)` | Accessible label for the progress circle. Used to provide context about what is loading or progressing. |
