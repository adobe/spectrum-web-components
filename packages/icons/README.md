## Overview

The `<sp-icons-medium>` and `<sp-icons-large>` elements included in this package supply your application with the Spectrum CSS medium and large icons for use in the `<sp-icon>` element. Include at least one of these elements in a project that makes use of icons in these sets. You can also include these sets in the scope of any element that leverages them, as they will be deduplicated to ensure all of your components can deliver the icons included therein.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/icons?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/icons)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/icons?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/icons)

```
yarn add @spectrum-web-components/icons
```

Import the side effectful registration of `<sp-icons-medium>` or `<sp-icons-large>` via:

```
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '@spectrum-web-components/icons/sp-icons-large.js';
```

When looking to leverage the `IconsMedium` or `IconsLarge` base classes as a type and/or for extension purposes, do so via:

```
import { IconsMedium, IconsLarge } from '@spectrum-web-components/icons';
```

### Accessibility

Review the accessibility guidelines for the [icon](../icon#accessibility-guidelines).
