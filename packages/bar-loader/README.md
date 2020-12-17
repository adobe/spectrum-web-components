## Description

An `<sp-bar-loader>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent determinate or indeterminate progress.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/bar-loader?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/bar-loader)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/bar-loader?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/bar-loader)

```
yarn add @spectrum-web-components/bar-loader
```

Import the side effectful registration of `<sp-bar-loader>` via:

```
import '@spectrum-web-components/bar-loader/sp-bar-loader.js';
```

When looking to leverage the `BarLoader` base class as a type and/or for extension purposes, do so via:

```
import { BarLoader } from '@spectrum-web-components/bar-loader';
```

## Variants

### Default

An `<sp-bar-loader>` is used to visually show the progression of a system operation such as downloading, uploading, processing, etc.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-bar-loader label="Loaded a little" progress="22"></sp-bar-loader>
</div>
```

### Over background

When a loader needs to be placed on top of a colored background, use the over background loader as signified by `[over-background]`. This loader uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around; background-color: var(--spectrum-alias-background-color-modal-overlay);"
>
    <sp-bar-loader progress="7" over-background></sp-bar-loader>
</div>
```

### Indeterminate

A bar loader can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-bar-loader indeterminate></sp-bar-loader>
</div>
```

### Side Label

A bar loader can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `[side-label]` attribute to define where this content should appear.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-bar-loader
        side-label
        indeterminate
        label="Label Beside"
    ></sp-bar-loader>
</div>
```
