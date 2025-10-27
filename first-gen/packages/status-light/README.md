## Overview

An `<sp-status-light>` is a great way to convey semantic meaning, such as statuses and categories. It provides visual indicators through colored dots accompanied by descriptive text.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/status-light?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/status-light)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/status-light?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/status-light)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-y2kz1rkx)

```
yarn add @spectrum-web-components/status-light
```

Import the side effectful registration of `<sp-status-light>` via:

```
import '@spectrum-web-components/status-light/sp-status-light.js';
```

When looking to leverage the `StatusLight` base class as a type and/or for extension purposes, do so via:

```
import { StatusLight } from '@spectrum-web-components/status-light';
```

### Anatomy

A status light consists of a colored dot indicator and a required text label. The dot's color represents the status or category, while the text provides additional context.

```html
<sp-status-light variant="positive">approved</sp-status-light>
```

### Options

#### Sizes

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html
<sp-status-light size="s" variant="positive">approved</sp-status-light>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html
<sp-status-light size="m" variant="positive">approved</sp-status-light>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html
<sp-status-light size="l" variant="positive">approved</sp-status-light>
```

</sp-tab-panel>
<sp-tab value="xl">Extra Large</sp-tab>
<sp-tab-panel value="xl">

```html
<sp-status-light size="xl" variant="positive">approved</sp-status-light>
```

</sp-tab-panel>
</sp-tabs>

#### Variants

Status lights come in various semantic and non-semantic variants to convey different meanings. The `variant` attribute controls the main variant of the status light, with `neutral` being the default.

<sp-tabs selected="semantic" auto label="Variants">
<sp-tab value="semantic">Semantic</sp-tab>
<sp-tab-panel value="semantic">

```html
<sp-status-light variant="neutral">use for default state</sp-status-light>
<sp-status-light variant="positive">
    use for success or approval
</sp-status-light>
<sp-status-light variant="negative">use for error or rejection</sp-status-light>
<sp-status-light variant="notice">
    use for warning or attention needed
</sp-status-light>
<sp-status-light variant="info">
    use for information or neutral state
</sp-status-light>
```

</sp-tab-panel>
<sp-tab value="non-semantic">Non-semantic</sp-tab>
<sp-tab-panel value="non-semantic">

```html
<sp-status-light variant="yellow">yellow status</sp-status-light>
<sp-status-light variant="fuchsia">fuchsia status</sp-status-light>
<sp-status-light variant="indigo">indigo status</sp-status-light>
<sp-status-light variant="seafoam">seafoam status</sp-status-light>
<sp-status-light variant="chartreuse">chartreuse status</sp-status-light>
<sp-status-light variant="magenta">magenta status</sp-status-light>
<sp-status-light variant="celery">celery status</sp-status-light>
<sp-status-light variant="purple">purple status</sp-status-light>
<sp-status-light variant="cyan">cyan status</sp-status-light>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Disabled

A status light in a disabled state shows that a status exists, but is not available in that circumstance. This can be used to maintain layout continuity and communicate that a status may become available later.

```html
<sp-status-light variant="positive" disabled>disabled</sp-status-light>
```

### Accessibility

The status light component implements several accessibility features:

- **ARIA Support**: When disabled, the component automatically sets `aria-disabled="true"`.
- **Color Meaning**: Colors are used in combination with text labels to ensure that status information is not conveyed through color alone.

#### Best Practices

- Use semantic variants (`positive`, `negative`, `notice`, `info`, `neutral`) when the status has specific meaning
- Include a clear, descriptive text label that explains the status
- Consider the disabled state for statuses that exist but are temporarily unavailable
- Ensure sufficient color contrast between the status light and its background
