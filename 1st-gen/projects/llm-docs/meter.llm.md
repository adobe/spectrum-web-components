---
component: meter
tag: sp-meter
package: '@spectrum-web-components/meter'
source: 1st-gen/packages/meter/README.md
generated: 2026-06-17T10:49:38.838Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-meter>` is a visual representation of a quantity or achievement. The meter's progress is determined by user actions, rather than system actions.

### Usage

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

#### Label

The label is the text that describes what is being measured. It can be provided either through the default slot or the `label` attribute.

```html
<sp-meter progress="15">Course Progress</sp-meter>
<br />
<sp-meter progress="15" label="Course Progress"></sp-meter>
```

### Options

#### Sizes

```html
<sp-meter size="s" progress="25">Tasks Completed</sp-meter>
html
<sp-meter size="m" progress="25">Tasks Completed</sp-meter>
html
<sp-meter size="l" progress="25">Tasks Completed</sp-meter>
html
<sp-meter size="xl" progress="25">Tasks Completed</sp-meter>
```

#### Variants

The meter supports several variants to convey different semantic meanings:

By default, the informative variant can be used to represent a neutral or non-semantic value, such as the number of tutorials completed.

```html
<sp-meter progress="50">Storage Space</sp-meter>
```

The positive variant can be used to represent a positive semantic value, such as when there's a lot of space remaining.
Use value `variant="positive"` to define a positive variant.

```html
<sp-meter variant="positive" progress="50">Storage Space</sp-meter>
```

The notice variant can be used to warn users about a situation that may need to be addressed soon, such as when space remaining is becoming limited.
Use value `variant="notice"` to define a notice variant.

```html
<sp-meter variant="notice" progress="73">Storage Space</sp-meter>
```

The negative variant can be used to warn users about a critical situation that needs their urgent attention, such as when space remaining is becoming very limited.
Use value `variant="negative"` to define a negative variant.

```html
<sp-meter variant="negative" progress="92">Storage Space</sp-meter>
```

#### Label Position

A meter can be delivered with its labeling displayed above its visual indicator or to either side. Use the boolean `side-label` attribute to define where this content should appear.

```html
<sp-meter side-label progress="68">Side Label</sp-meter>
```

### Accessibility

The `<sp-meter>` element is rendered with `role="meter progressbar"` to ensure proper semantics for assistive technologies. The current progress value is set as a percentager via the `progress` attribute and is exposed to assistive technology via `aria-valuenow`.

```html
<sp-meter progress="71" label="Download Progress">Download Progress</sp-meter>
```

#### Include a label

A meter is required to have either a visible text label or a `label` attribute.

#### Don't override color

The meter's variants provide semantic meaning through both color and ARIA attributes, ensuring that information is not conveyed through color alone. The progress track and fill maintain sufficient contrast for visibility.
