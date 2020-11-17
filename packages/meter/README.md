## Description

An `<sp-meter>` is a visual representation of a quantity or achievement. The meter's progress is determined by user actions, rather than system actions.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/meter?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/meter)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/meter?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/meter)

```
yarn add @spectrum-web-components/meter
```

Import the side-effectful registration of `<sp-meter>` via:

```
import '@spectrum-web-components/meter/sp-meter.js';
```

When looking to leverage the `Meter` base class as a type and/or for extension purposes, do so via:

```
import { Meter } from '@spectrum-web-components/meter';
```

## Examples

### Default

```html
<sp-meter progress="71">Tasks Completed</sp-meter>
```

### Over Background

When a loader needs to be placed on top of a colored background, use the over background loader as signified by `[over-background]`. This loader uses a white opaque color no matter the background. Make sure the background offers enough contrast for the loader to be legible.

```html
<div
    style="width: var(--spectrum-global-dimension-size-3000); height: var(--spectrum-global-dimension-size-2000); display: flex; flex-direction: column; align-items: center; justify-content: space-around; background-color: var(--spectrum-alias-background-color-modal-overlay);"
>
    <sp-meter progress="42" over-background>Tasks Completed</sp-meter>
</div>
```

### Side Label

A meter can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `[side-label]` attribute to define where this content should appear.

```html
<sp-meter side-label>Side Label</sp-meter>
```
