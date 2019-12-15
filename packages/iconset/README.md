## Overview

Extend either the `Iconset` or `IconsetSVG` exports of this package to supply your application with a custom icon set to power the use of `<sp-icon>` elements throughout. Give your new icon set a custom name, and you'll be ready to supply them as `<sp-icon name="custom-icons:icon'>` across your application.

### Installation

```
npm install @spectrum-web-components/iconset

# or

yarn add @spectrum-web-components/iconset
```

### Example

```ts
import { TemplateResult } from 'lit-element';

import { CustomIconSet } from 'your-icon-set.js';

import iconsSVG from './icons-large.svg.js';

export class IconsLarge extends IconsetSVG {
    public constructor() {
        super();
        this.name = 'custom-icons'; // default iconset name for these icons
    }

    protected renderDefaultContent(): TemplateResult {
        return CustomIconSet;
    }
}
```
