<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Badge / Badge Styling Validation

<!-- Document title (editable) -->

# Badge Styling Validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [CSS Custom Properties (Consumer Overrides)](#css-custom-properties-consumer-overrides)
    - [Background color — `--swc-badge-background-color`](#background-color----swc-badge-background-color)
    - [Label and icon color — `--swc-badge-label-icon-color`](#label-and-icon-color----swc-badge-label-icon-color)
    - [Size-specific tokens](#size-specific-tokens)

</details>

<!-- Document content (editable) -->

Figma reference: [S2 - Web Desktop scale, Badge (S) component set 36806:6700](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=36806-6700&m=dev)

## CSS Custom Properties (Consumer Overrides)

### Background color — `--swc-badge-background-color`

#### Bold fill style (default)


| Variant       | Token                                      |
| ------------- | ------------------------------------------ |
| `accent`      | `accent-background-color-default`          |
| `informative` | `informative-background-color-default`     |
| `neutral`     | `neutral-subdued-background-color-default` |
| `positive`    | `positive-background-color-default`        |
| `notice`      | `notice-background-color-default`          |
| `negative`    | `negative-background-color-default`        |
| `gray`        | `gray-background-color-default`            |
| `red`         | `red-background-color-default`             |
| `orange`      | `orange-background-color-default`          |
| `yellow`      | `yellow-background-color-default`          |
| `chartreuse`  | `chartreuse-background-color-default`      |
| `celery`      | `celery-background-color-default`          |
| `green`       | `green-background-color-default`           |
| `seafoam`     | `seafoam-background-color-default`         |
| `cyan`        | `cyan-background-color-default`            |
| `blue`        | `blue-background-color-default`            |
| `indigo`      | `indigo-background-color-default`          |
| `purple`      | `purple-background-color-default`          |
| `fuchsia`     | `fuchsia-background-color-default`         |
| `magenta`     | `magenta-background-color-default`         |
| `pink`        | `pink-background-color-default`            |
| `turquoise`   | `turquoise-background-color-default`       |
| `brown`       | `brown-background-color-default`           |
| `cinnamon`    | `cinnamon-background-color-default`        |
| `silver`      | `silver-background-color-default`          |


#### Subtle fill style (`subtle` attribute)


| Variant       | Token                                         |
| ------------- | --------------------------------------------- |
| `accent`      | `accent-subtle-background-color-default`      |
| `informative` | `informative-subtle-background-color-default` |
| `neutral`     | `neutral-subtle-background-color-default`     |
| `positive`    | `positive-subtle-background-color-default`    |
| `notice`      | `notice-subtle-background-color-default`      |
| `negative`    | `negative-subtle-background-color-default`    |
| `gray`        | `gray-subtle-background-color-default`        |
| `red`         | `red-subtle-background-color-default`         |
| `orange`      | `orange-subtle-background-color-default`      |
| `yellow`      | `yellow-subtle-background-color-default`      |
| `chartreuse`  | `chartreuse-subtle-background-color-default`  |
| `celery`      | `celery-subtle-background-color-default`      |
| `green`       | `green-subtle-background-color-default`       |
| `seafoam`     | `seafoam-subtle-background-color-default`     |
| `cyan`        | `cyan-subtle-background-color-default`        |
| `blue`        | `blue-subtle-background-color-default`        |
| `indigo`      | `indigo-subtle-background-color-default`      |
| `purple`      | `purple-subtle-background-color-default`      |
| `fuchsia`     | `fuchsia-subtle-background-color-default`     |
| `magenta`     | `magenta-subtle-background-color-default`     |
| `pink`        | `pink-subtle-background-color-default`        |
| `turquoise`   | `turquoise-subtle-background-color-default`   |
| `brown`       | `brown-subtle-background-color-default`       |
| `cinnamon`    | `cinnamon-subtle-background-color-default`    |
| `silver`      | `silver-subtle-background-color-default`      |


#### Outline style (`outline` attribute, semantic variants only)


| Variant       | Background token           | Border color token         |
| ------------- | -------------------------- | -------------------------- |
| `accent`      | `background-layer-2-color` | `accent-visual-color`      |
| `informative` | `background-layer-2-color` | `informative-visual-color` |
| `neutral`     | `background-layer-2-color` | `neutral-visual-color`     |
| `positive`    | `background-layer-2-color` | `positive-visual-color`    |
| `notice`      | `background-layer-2-color` | `notice-visual-color`      |
| `negative`    | `background-layer-2-color` | `negative-visual-color`    |


### Label and icon color — `--swc-badge-label-icon-color`


| Condition                                                        | Token       |
| ---------------------------------------------------------------- | ----------- |
| Bold fill — most variants                                        | `white`     |
| Bold fill — `notice`, `yellow`, `chartreuse`, `celery`, `orange` | `black`     |
| Subtle fill — all variants                                       | `gray-1000` |
| Outline — all semantic variants                                  | `gray-1000` |


### Size-specific tokens


| Size | `--swc-badge-height`   | `--swc-badge-corner-radius`             | `--swc-badge-gap`    | `--swc-badge-padding-inline` | `--swc-badge-with-icon-padding-inline` | `--swc-badge-font-size` | `--swc-badge-icon-size`  |  `--swc-badge-line-height`    |
| ---- | ---------------------- | --------------------------------------- | -------------------- | ---------------------------- | -------------------------------------- | ----------------------- | ------------------------ |  ---------------------------  |
| `s`  | `component-height-75`  | `corner-radius-medium-size-small`       | `text-to-visual-75`  | `component-edge-to-text-75`  | `component-edge-to-visual-75`          | `font-size-75`          | `workflow-icon-size-75`  |  `line-height-font-size-75`   |
| `m`  | `component-height-100` | `corner-radius-medium-size-medium`      | `text-to-visual-100` | `component-edge-to-text-100` | `component-edge-to-visual-100`         | `font-size-100`         | `workflow-icon-size-100` |  `line-height-font-size-100`  |
| `l`  | `component-height-200` | `corner-radius-medium-size-large`       | `text-to-visual-200` | `component-edge-to-text-200` | `component-edge-to-visual-200`         | `font-size-200`         | `workflow-icon-size-200` |  `line-height-font-size-200`  |
| `xl` | `component-height-300` | `corner-radius-medium-size-extra-large` | `text-to-visual-300` | `component-edge-to-text-300` | `component-edge-to-visual-300`         | `font-size-300`         | `workflow-icon-size-300` |  `line-height-font-size-300`  |
