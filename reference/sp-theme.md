# sp-theme

## Attributes

| Name     | Type                                             | Default | Description                                                                                                                                                                               |
| -------- | ------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`  | `"lightest" | "light" | "dark" | "darkest" | ""` | -       | The Spectrum color stops to apply to content scoped by this `sp-theme` element. A value is required.                                                                                      |
| `scale`  | `"medium" | "large" | ""`                        | -       | The Spectrum platform scale to apply to content scoped by this `sp-theme` element. A value is required.                                                                                   |
| `lang`   | `string`                                         | `""`    | The language of the content scoped to this `sp-theme` element, see: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang" target="_blank">MDN reference</a>. |
| `system` | `"spectrum" | "express"`                         | -       | The Spectrum system that is applied to the content scoped to this `sp-theme` element. A value is required.                                                                                |

## Slots

| Name        | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| `(default)` | Content on which to apply the CSS Custom Properties defined by the current theme configuration |
