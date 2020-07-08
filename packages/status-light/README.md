## Description

An `<sp-status-light>` is a great way to convey semantic meaning, such as statuses and categories.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/status-light?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/status-light)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/status-light?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/status-light)

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

## Example

```html
<sp-status-light variant="positive">approved</sp-status-light>
```

### Variants

There are many variants to choose from in Spectrum. The `variant`
attribute controls the main variant of the status light, and `neutral` being the default. Following are the supported variants:

-   positive
-   negative
-   notice
-   info
-   neutral
-   yellow
-   fuchsia
-   indigo
-   seafoam
-   chartreuse
-   magenta
-   celery
-   purple

### Disabled

```html
<sp-status-light variant="positive" disabled>disabled</sp-status-light>
```
