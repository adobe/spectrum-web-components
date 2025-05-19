## Overview

An `<sp-meter>` is a visual representation of a quantity or achievement. The meter's progress is determined by user actions, rather than system actions.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/meter?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/meter)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/meter?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/meter)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/NqxNiDV1LXR9zxzocoRh/src/index.ts)

```bash
yarn add @spectrum-web-components/meter
```

Import the side-effectful registration of `<sp-meter>` via:

```javascript
import '@spectrum-web-components/meter/sp-meter.js';
```

When looking to leverage the `Meter` base class as a type and/or for extension purposes, do so via:

```javascript
import { Meter } from '@spectrum-web-components/meter';
```

### Anatomy

The meter consists of several key parts:

- A label that describes what is being measured
- A progress track showing the total possible range
- A fill bar indicating the current progress
- A percentage value showing the numeric progress

```html
<sp-meter progress="71">Tasks Completed</sp-meter>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-meter size="s" progress="71">Tasks Completed</sp-meter>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-meter size="m" progress="71">Tasks Completed</sp-meter>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-meter size="l" progress="71">Tasks Completed</sp-meter>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-meter size="xl" progress="71">Tasks Completed</sp-meter>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

The meter supports several variants to convey different semantic meanings:

<sp-tabs selected="informative" auto label="Variant Options">
<sp-tab value="informative">Informative</sp-tab>
<sp-tab-panel value="informative">

By default, the informative variant can be used to represent a neutral or non-semantic value, such as the number of tutorials completed.

```html
<sp-meter progress="50">Storage Space</sp-meter>
```

</sp-tab-panel>
<sp-tab value="positive">Positive</sp-tab>
<sp-tab-panel value="positive">

The positive variant can be used to represent a positive semantic value, such as when there's a lot of space remaining.
Use value `variant="positive"` to define a positive variant.

```html
<sp-meter variant="positive" progress="50">Storage Space</sp-meter>
```

</sp-tab-panel>
<sp-tab value="notice">Notice</sp-tab>
<sp-tab-panel value="notice">

The notice variant can be used to warn users about a situation that may need to be addressed soon, such as when space remaining is becoming limited.
Use value `variant="notice"` to define a notice variant.

```html
<sp-meter variant="notice" progress="73">Storage Space</sp-meter>
```

</sp-tab-panel>
<sp-tab value="negative">Negative</sp-tab>
<sp-tab-panel value="negative">

The negative variant can be used to warn users about a critical situation that needs their urgent attention, such as when space remaining is becoming very limited.
Use value `variant="negative"` to define a negative variant.

```html
<sp-meter variant="negative" progress="92">Storage Space</sp-meter>
```

</sp-tab-panel>
</sp-tabs>

#### Label Position

A meter can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `side-label` attribute to define where this content should appear.

```html
<sp-meter side-label>Side Label</sp-meter>
```

### Behaviors

The meter updates its visual representation based on the `progress` attribute, which accepts values from 0 to 100. The progress is displayed both visually through the fill bar and numerically as a percentage.

```html
<sp-meter progress="50">Half Complete</sp-meter>
```

### Accessibility

The `<sp-meter>` element is rendered with `role="meter progressbar"` to ensure proper semantics for assistive technologies. It includes several accessibility features:

#### Labels and ARIA

- The meter requires a label, which can be provided either through the default slot or the `label` attribute
- The current progress value is exposed via `aria-valuenow`
- The label is associated with the meter through `aria-label`

```html
<sp-meter progress="71" label="Download Progress">Download Progress</sp-meter>
```

#### Color and Contrast

The meter's variants provide semantic meaning through both color and ARIA attributes, ensuring that information is not conveyed through color alone. The progress track and fill maintain sufficient contrast for visibility.
