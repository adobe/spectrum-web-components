## Description

An `<sp-circle-loader>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent determinate or indeterminate progress.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/circle-loader?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/circle-loader)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/circle-loader?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/circle-loader)

```
yarn add @spectrum-web-components/circle-loader
```

Import the side effectful registration of `<sp-circle-loader>` via:

```
import '@spectrum-web-components/circle-loader/sp-circle-loader.js';
```

When looking to leverage the `CircleLoader` base class as a type and/or for extension purposes, do so via:

```
import { CircleLoader } from '@spectrum-web-components/circle-loader';
```

## Variants

### Default

An `<sp-circle-loader>` is used to visually show the progression of a system operation such as downloading, uploading, processing, etc.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-circle-loader progress="71" size="small"></sp-circle-loader>
    <sp-circle-loader progress="22"></sp-circle-loader>
    <sp-circle-loader progress="86" size="large"></sp-circle-loader>
</div>
```

### Over background

When a loader needs to be placed on top of a colored background, use the over background loader as signified by `[over-background]`. This loader uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;  background-color: rgba(0,0,0,0.4);"
>
    <sp-circle-loader
        progress="42"
        over-background
        size="small"
    ></sp-circle-loader>
    <sp-circle-loader progress="7" over-background></sp-circle-loader>
    <sp-circle-loader
        progress="68"
        over-background
        size="large"
    ></sp-circle-loader>
</div>
```

### Indeterminate

A circle loader can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: 250px; height: 150px; display: flex; align-items: center; justify-content: space-around;"
>
    <sp-circle-loader indeterminate size="small"></sp-circle-loader>
    <sp-circle-loader indeterminate></sp-circle-loader>
    <sp-circle-loader indeterminate size="large"></sp-circle-loader>
</div>
```

### Size

Circle loaders come in 3 sizes: small (`[size="small"]`), medium (default), or large (`[size="large"]`). These are available to fit various contexts. For example, the small loader can be used in place of an icon or in tight spaces, while the large one can be used for full-page loading.
