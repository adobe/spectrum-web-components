## Overview

An `<sp-progress-bar>` is used to visually show the progression of a system operation such as downloading, uploading, processing, etc. By default, progress bars have a blue fill that shows the progress.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/progress-bar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/progress-bar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/progress-bar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/progress-bar)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-evntgrmn)

```zsh
yarn add @spectrum-web-components/progress-bar
```

Import the side effectful registration of `<sp-progress-bar>` via:

```ts
import '@spectrum-web-components/progress-bar/sp-progress-bar.js';
```

When looking to leverage the `ProgressBar` base class as a type and/or for extension purposes, do so via:

```ts
import { ProgressBar } from '@spectrum-web-components/progress-bar';
```

### Anatomy

Progress bars have the following parts:

- **Label:** Progress bars should have a label that gives context about the operation being performed. Use an ellipsis at the end of the label text to communicate that the process is in progress.
- **Value label:** Progress bars can have a value label that gives detailed information about the progress. This value label works alongside the label and should not be displayed if the label itself is not displayed. The value label is always placed above the track. Use the `progress` attribute to set the value label.

```html
<sp-progress-bar
        label="Generating images..."
        progress="58"
    ></sp-progress-bar>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="s"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="m"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="l"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        size="xl"
        label="Loaded a little"
        progress="22"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
</sp-tabs>


#### Variants

<sp-tabs selected="static-white" auto label="Variants">
<sp-tab value="static-white">Static white</sp-tab>
<sp-tab-panel value="static-white">

When a progress bar needs to be placed on top of a colored background, use the static white progress bar as signified by `[static-color="white"]`. This progress bar uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around; background-color: var(--spectrum-seafoam-900);"
>
    <sp-progress-bar
        label="Loaded a large amount"
        progress="77"
        static-color="white"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
<sp-tab value="indeterminate">Indeterminate</sp-tab>
<sp-tab-panel value="indeterminate">

A progress bar can be either determinate or indeterminate as signified by `[indeterminate]`. By default, loaders are determinate. Use a determinate loader when progress can be calculated against a specific goal (e.g., downloading a file of a known size). Use an indeterminate loader when progress is happening but the time or effort to completion can’t be determined (e.g., attempting to reconnect to a server).

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        aria-label="Loaded an unclear amount"
        indeterminate
    ></sp-progress-bar>
</div>
```

The above `sp-progress-bar` also leverages the `aria-label` attribute in place of the `label` attribute in ensure that the element is labelled correctly without that label appearing visibly in the UI.

</sp-tab-panel>
<sp-tab value="side-label">Side label</sp-tab>
<sp-tab-panel value="side-label">

A progress bar can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `[side-label]` attribute to define where this content should appear.

```html
<div
    style="width: 240px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: space-around;"
>
    <sp-progress-bar
        side-label
        label="Label Beside"
        progress="23"
    ></sp-progress-bar>
</div>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

An `sp-progress-bar` element will register itself as a `role="progressbar"` element in the accessibility tree. Any value applied to the `label` attribute will be used both to visibly label the element and to set the `aria-label` attribute on the host.

#### Include a label

Progress bars should have a label that gives context about the operation being performed. Use an ellipsis at the end of the label text to communicate that the process is in progress. 

 In rare cases where a visible label is not desired, context is sufficient and an accessibility expert has reviewed the design, be sure to include an `aria-label` attribute or an `aria-labelledby` attribute to manually to ensure that the `sp-progress-bar` correctly fulfills its responsibilities to visitors of your site of all abilities.
