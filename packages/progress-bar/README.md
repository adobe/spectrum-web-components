## Description

An `<sp-progress-bar>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent determinate or indeterminate progress.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/progress-bar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/progress-bar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/progress-bar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/progress-bar)

```
yarn add @spectrum-web-components/progress-bar
```

Import the side effectful registration of `<sp-progress-bar>` via:

```
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
```

When looking to leverage the `ProgressBar` base class as a type and/or for extension purposes, do so via:

```
import { ProgressBar } from '@spectrum-web-components/progress-bar';
```

## Sizes

<sp-tabs selected="m">
    <sp-tab value="s">Small</sp-tab>
    <sp-tab value="m">Medium</sp-tab>
    <sp-tab value="l">Large</sp-tab>
    <sp-tab value="xl">Extra Large</sp-tab>
</sp-tabs>

<div class="tabs--s">

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="s"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</div>

<div class="tabs--m">

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="m"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</div>

<div class="tabs--l">

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="l"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</div>

<div class="tabs--xl">

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="xl"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</div>

## Variants

### Over background

When a progress bar needs to be placed on top of a colored background, use the over background progres bar as signified by `[over-background]`. This progress bar uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around; background-color: var(--spectrum-alias-background-color-modal-overlay);"
>
    <sp-progress-bar progress="7" over-background></sp-progress-bar>
</div>
```

### Indeterminate

A progress bar can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar indeterminate></sp-progress-bar>
</div>
```

### Side Label

A progress bar can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `[side-label]` attribute to define where this content should appear.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        side-label
        indeterminate
        label="Label Beside"
    ></sp-progress-bar>
</div>
```
