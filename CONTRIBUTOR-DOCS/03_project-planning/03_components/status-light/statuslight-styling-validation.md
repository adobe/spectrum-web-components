<!-- Generated breadcrumbs - DO NOT EDIT -->

[CONTRIBUTOR-DOCS](../../../README.md) / [Project planning](../../README.md) / [Components](../README.md) / Status Light / Status light styling validation

<!-- Document title (editable) -->

# Status light styling validation

<!-- Generated TOC - DO NOT EDIT -->

<details open>
<summary><strong>In this doc</strong></summary>

- [CSS custom properties (consumer overrides)](#css-custom-properties-consumer-overrides)
    - [Dot color — `--swc-statuslight-dot-color`](#dot-color----swc-statuslight-dot-color)
    - [Label color — `--swc-statuslight-content-color`](#label-color----swc-statuslight-content-color)
- [Size-specific tokens](#size-specific-tokens)
- [Typography tokens](#typography-tokens)

</details>

<!-- Document content (editable) -->

Figma reference: [S2 - Web Desktop scale, Status light 36797:954](https://www.figma.com/design/Mngz9H7WZLbrCvGQf3GnsY/S2---Web--Desktop-scale-?node-id=36797-954&m=dev)

Token spec reference: [S2 Token specs, Status light 10725:497](https://www.figma.com/design/eoZHKJH9a3LJkHYCGt60Vb/S2-Token-specs?node-id=10725-497&m=dev)

## CSS custom properties (consumer overrides)

### Dot color — `--swc-statuslight-dot-color`

#### Semantic variants

| Variant    | Token                      |
| ---------- | -------------------------- |
| `info`     | `informative-visual-color` |
| `neutral`  | `neutral-visual-color`     |
| `positive` | `positive-visual-color`    |
| `notice`   | `notice-visual-color`      |
| `negative` | `negative-visual-color`    |

> **Note:** The `accent` variant has been removed for S2.

#### Non-semantic variants

| Variant      | Token                    | New in S2 |
| ------------ | ------------------------ | --------- |
| `celery`     | `celery-visual-color`    |           |
| `chartreuse` | `chartreuse-visual-color`|           |
| `cyan`       | `cyan-visual-color`      |           |
| `fuchsia`    | `fuchsia-visual-color`   |           |
| `indigo`     | `indigo-visual-color`    |           |
| `magenta`    | `magenta-visual-color`   |           |
| `purple`     | `purple-visual-color`    |           |
| `seafoam`    | `seafoam-visual-color`   |           |
| `yellow`     | `yellow-visual-color`    |           |
| `pink`       | `pink-visual-color`      | ✓         |
| `turquoise`  | `turquoise-visual-color` | ✓         |
| `cinnamon`   | `cinnamon-visual-color`  | ✓         |
| `brown`      | `brown-visual-color`     | ✓         |
| `silver`     | `silver-visual-color`    | ✓         |

> **Note:** The five new S2 color tokens resolve as follows: `pink-800` (light) / `pink-900` (dark), and the same pattern for `turquoise`, `cinnamon`, `brown`, and `silver`.

### Label color — `--swc-statuslight-content-color`

| Condition              | Token                          |
| ---------------------- | ------------------------------ |
| `variant="neutral"`    | `gray-600`                     |
| All other variants     | `neutral-content-color-default`|

## Size-specific tokens

| Property             | Token hook                         | `s`                               | `m` (default)                      | `l`                                | `xl`                                  |
| -------------------- | ---------------------------------- | --------------------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------- |
| Component height     | `--swc-statuslight-height`         | `component-height-75`             | `component-height-100`             | `component-height-200`             | `component-height-300`                |
| Dot size             | `--swc-statuslight-dot-size`       | `status-light-dot-size-small`     | `status-light-dot-size-medium`     | `status-light-dot-size-large`      | `status-light-dot-size-extra-large`   |
| Dot-to-label gap     | `--swc-statuslight-text-to-visual` | `status-light-text-to-visual-75`  | `status-light-text-to-visual-100`  | `status-light-text-to-visual-200`  | `status-light-text-to-visual-300`     |
| Top edge to dot      | `--swc-statuslight-top-to-dot`     | `status-light-top-to-dot-small`   | `status-light-top-to-dot-medium`   | `status-light-top-to-dot-large`    | `status-light-top-to-dot-extra-large` |
| Block padding ⚠️     | `--swc-statuslight-padding-block`  | `component-padding-vertical-75`   | `component-padding-vertical-100`   | `component-padding-vertical-200`   | `component-padding-vertical-300`      |
| Font size            | `--swc-statuslight-font-size`      | `font-size-75`                    | `font-size-100`                    | `font-size-200`                    | `font-size-300`                       |
| Line height          | `--swc-statuslight-line-height`    |  `line-height-font-size-75`       | `line-height-font-size-100`        | `line-height-font-size-200`        | `line-height-font-size-300`           | 

> **Note:** The `status-light-text-to-visual-*` tokens are new in S2. In S1, the component referenced the global `text-to-visual-*` tokens directly.

> **Note:** The spec page in S2 Token specs contains a typo listing the XL dot size token as `status-light-dot-extra-large`. The correct token name — confirmed in the Component level token changes frame and used in the CSS — is `status-light-dot-size-extra-large`.

> **Note:** Figma's S2 Token specs file lists separate `component-top-to-text-*` and `component-bottom-to-text-*` tokens. The CSS intentionally uses `component-padding-vertical-*` via a single `padding-block` shorthand, reflecting more recent design decisions in the S2 Web Desktop scale file. The Desktop scale file takes precedence over the token spec file when they differ.

## Typography tokens

These apply across all sizes unless noted.

| Property    | Token                                                    |
| ----------- | -------------------------------------------------------- |
| Font family | `default-font-family`                                    |
| Font weight | `regular-font-weight`                                    |
| Font style  | `default-font-style`                                     |

> **Note:** The neutral variant uses `default-font-style` (not italics). This is a change from S1.
