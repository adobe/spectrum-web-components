## Overview

An `<sp-progress-circle>` shows the progression of a system operation such as downloading, uploading, processing, etc. in a visual way. It can represent both determinate and indeterminate progress, helping users understand the status of ongoing operations.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/progress-circle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/progress-circle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/progress-circle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/progress-circle)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-xx1plot6)

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

### Anatomy

A progress circle consists of several key parts:

- A label (via `slot="label"`)
- A progress value (via `progress` attribute)
- An optional indeterminate state (via `indeterminate` attribute)

```html
<sp-progress-circle
    label="Download progress"
    progress="75"
></sp-progress-circle>
```

### Options

#### Sizes

Progress circles come in three sizes to fit various contexts:

<sp-tabs selected="m" auto label="Size Attribute Options">
<sp-tab value="s">Small</sp-tab>
<sp-tab-panel value="s">

```html demo
<sp-progress-circle
    size="s"
    label="Small progress indicator"
    progress="42"
></sp-progress-circle>
```

</sp-tab-panel>
<sp-tab value="m">Medium</sp-tab>
<sp-tab-panel value="m">

```html demo
<sp-progress-circle
    label="Medium progress indicator"
    progress="67"
></sp-progress-circle>
```

</sp-tab-panel>
<sp-tab value="l">Large</sp-tab>
<sp-tab-panel value="l">

```html demo
<sp-progress-circle
    size="l"
    label="Large progress indicator"
    progress="89"
></sp-progress-circle>
```

</sp-tab-panel>
</sp-tabs>

#### Static Colors

When displaying over images or colored backgrounds, use the `static-color` attribute for better contrast:

```html demo
<div style="background-color: rgb(15, 15, 15); padding: 20px;">
    <sp-progress-circle
        label="Progress on dark background"
        progress="50"
        static-color="white"
    ></sp-progress-circle>
</div>
```

#### Indeterminate Progress

Use indeterminate progress when the duration cannot be calculated:

```html demo
<sp-progress-circle label="Loading content" indeterminate></sp-progress-circle>
```

### Accessibility

The `<sp-progress-circle>` element implements several accessibility features:

1. **ARIA Role**: Automatically sets `role="progressbar"` for proper semantic meaning
2. **Labeling**:
    - Uses the `label` attribute value as `aria-label`
    - When determinate, adds `aria-valuenow` with the current progress
    - Includes `aria-valuemin="0"` and `aria-valuemax="100"` for the progress range
3. **Status Communication**:
    - Screen readers announce progress updates
    - Indeterminate state is properly conveyed to assistive technologies

#### Best Practices

- Always provide a descriptive `label` that explains what the progress represents
- Use determinate progress when possible to give users a clear sense of completion
- For determinate progress, ensure the `progress` value accurately reflects the actual progress
- Consider using size="l" for primary loading states to improve visibility
- Ensure sufficient color contrast when using `static-color="white"`

```html
<!-- Example with good accessibility -->
<sp-progress-circle
    label="Downloading report.pdf - 24 MB of 50 MB"
    progress="48"
></sp-progress-circle>

<!-- For unknown duration operations -->
<sp-progress-circle
    label="Connecting to server"
    indeterminate
></sp-progress-circle>
```
