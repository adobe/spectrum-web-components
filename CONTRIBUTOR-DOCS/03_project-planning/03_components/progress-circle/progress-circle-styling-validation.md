<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Progress Circle / Progress circle styling validation

<!-- Document title (editable) -->

# Progress circle styling validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [CSS custom properties (consumer overrides)](#css-custom-properties-consumer-overrides)
    - [Track color — `--swc-progress-circle-track-border-color`](#track-color----swc-progress-circle-track-border-color)
    - [Fill (indicator) color — `--swc-progress-circle-fill-border-color`](#fill-indicator-color----swc-progress-circle-fill-border-color)
- [Size-specific tokens](#size-specific-tokens)
- [Forced colors](#forced-colors)

</details>

<!-- Document content (editable) -->

Figma reference: [S2 - Web Desktop scale, Progress circle (M) 13120:362](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=13120-362&m=dev)

## CSS custom properties (consumer overrides)

### Track color — `--swc-progress-circle-track-border-color`

| Condition       | Token                        |
| --------------- | ---------------------------- |
| Default         | `track-color`                |
| `static-color="white"` | `static-white-track-color`  |
| `static-color="black"` | `static-black-track-color`  |

### Fill (indicator) color — `--swc-progress-circle-fill-border-color`

| Condition       | Token                              |
| --------------- | ---------------------------------- |
| Default         | `accent-content-color-default`     |
| `static-color="white"` | `static-white-track-indicator-color` |
| `static-color="black"` | `static-black-track-indicator-color` |

> **Note:** `static-color="black"` is new in S2. S1 only supported `static-color="white"`.

## Size-specific tokens

| Property    | Token hook                          | `s`                            | `m` (default)                   | `l`                            |
| ----------- | ----------------------------------- | ------------------------------ | ------------------------------- | ------------------------------ |
| Size        | `--swc-progress-circle-size`        | `progress-circle-size-small`   | `progress-circle-size-medium`   | `progress-circle-size-large`   |
| Stroke width | `--swc-progress-circle-thickness`  | `progress-circle-thickness-small` | `progress-circle-thickness-medium` | `progress-circle-thickness-large` |

> **Note:** Progress circle supports only three sizes (S, M, L). There is no `xl` size, unlike Badge and Status Light.

## Forced colors

The `@media (forced-colors: active)` block overrides both fill and track colors using system color keywords and nested `prefers-color-scheme` queries.

| Property                                 | Value                         | Condition                                  |
| ---------------------------------------- | ----------------------------- | ------------------------------------------ |
| `--swc-progress-circle-fill-border-color` | `Highlight`                  | All forced-colors contexts                 |
| `--swc-progress-circle-track-border-color` | `token("static-white-track-color")` | `forced-colors` + `prefers-color-scheme: dark` |
| `--swc-progress-circle-track-border-color` | `token("static-black-track-color")` | `forced-colors` + `prefers-color-scheme: light` |

> **⚠️ Bug:** The forced-colors block currently sets `--swc-progress-circle-track-color: Canvas` (line 109 of `progress-circle.css`). This property name does not exist in the component — the correct exposed property is `--swc-progress-circle-track-border-color`. The `Canvas` system color override has no effect as written. The nested `prefers-color-scheme` rules below it do correctly target `--swc-progress-circle-track-border-color` and will apply. The standalone `--swc-progress-circle-track-color: Canvas` line should be removed or corrected.
