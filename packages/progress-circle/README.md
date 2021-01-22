## Description

An `<sp-progress-circle>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent determinate or indeterminate progress.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/progress-circle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/progress-circle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/progress-circle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/progress-circle)

```
yarn add @spectrum-web-components/progress-circle
```

Import the side effectful registration of `<sp-progress-circle>` via:

```
import '@spectrum-web-components/progress-circle/sp-progress-circle.js';
```

When looking to leverage the `ProgressCircle` base class as a type and/or for extension purposes, do so via:

```
import { ProgressCircle } from '@spectrum-web-components/progress-circle';
```

## Variants

### Default

An `<sp-progress-circle>` is used to visually show the progression of a system operation such as downloading, uploading, processing, etc.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-progress-circle progress="71" size="small"></sp-progress-circle>
    <sp-progress-circle progress="22"></sp-progress-circle>
    <sp-progress-circle progress="86" size="large"></sp-progress-circle>
</div>
```

### Over background

When a loader needs to be placed on top of a colored background, use the over background loader as signified by `[over-background]`. This loader uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;  background-color: rgba(0,0,0,0.4);"
>
    <sp-progress-circle
        progress="42"
        over-background
        size="small"
    ></sp-progress-circle>
    <sp-progress-circle progress="7" over-background></sp-progress-circle>
    <sp-progress-circle
        progress="68"
        over-background
        size="large"
    ></sp-progress-circle>
</div>
```

### Indeterminate

A progress circle can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-progress-circle indeterminate size="small"></sp-progress-circle>
    <sp-progress-circle indeterminate></sp-progress-circle>
    <sp-progress-circle indeterminate size="large"></sp-progress-circle>
</div>
```

### Size

Progress Circles come in 3 sizes: small (`[size="small"]`), medium (default), or large (`[size="large"]`). These are available to fit various contexts. For example, the small loader can be used in place of an icon or in tight spaces, while the large one can be used for full-page loading.
