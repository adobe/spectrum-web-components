<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Divider / Divider Styling Validation

<!-- Document title (editable) -->

# Divider Styling Validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [CSS Custom Properties (Consumer Overrides)](#css-custom-properties-consumer-overrides)
    - [Thickness — `--swc-divider-thickness`](#thickness----swc-divider-thickness)
    - [Background color — `--swc-divider-background-color`](#background-color----swc-divider-background-color)
- [Minimum dimensions](#minimum-dimensions)

</details>

<!-- Document content (editable) -->

Figma reference: [S2 - Web Desktop scale, Divider component set 13642:351](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13642-351&m=dev)

## CSS Custom Properties (Consumer Overrides)

### Thickness — `--swc-divider-thickness`

Overrides the divider line thickness. Internally aliased to `--_swc-divider-thickness`, which also drives `border-radius` so the line cap stays rounded.


| Size          | Token                      |
| ------------- | -------------------------- |
| `s`           | `divider-thickness-small`  |
| `m` (default) | `divider-thickness-medium` |
| `l`           | `divider-thickness-large`  |


### Background color — `--swc-divider-background-color`


| Condition                               | Token                   |
| --------------------------------------- | ----------------------- |
| Default (`s`, `m`)                      | `gray-200`              |
| `size="l"` (default)                    | `gray-800`              |
| `static-color="white"` (`s`, `m`)       | `transparent-white-200` |
| `static-color="white"` + `size="l"`     | `transparent-white-800` |
| `static-color="black"` (`s`, `m`)       | `transparent-black-200` |
| `static-color="black"` + `size="l"`     | `transparent-black-800` |
| Forced colors (`forced-colors: active`) | `CanvasText`            |


## Minimum dimensions

These are not exposed as custom properties — they are set directly from tokens.


| Property          | Selector                                   | Token                              |
| ----------------- | ------------------------------------------ | ---------------------------------- |
| `min-inline-size` | `.swc-Divider:not(.swc-Divider--vertical)` | `divider-horizontal-minimum-width` |
| `min-block-size`  | `.swc-Divider--vertical`                   | `divider-vertical-minimum-height`  |
