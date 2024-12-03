## Description

Extend either the `Iconset` or `IconsetSVG` exports of this package to supply your application with a custom icon set to power the use of `<sp-icon>` elements throughout. Give your new icon set a custom name, and you'll be ready to supply them as `<sp-icon name="custom-icons:icon">` across your application.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/iconset?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/iconset)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/iconset?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/iconset)

```
yarn add @spectrum-web-components/iconset
```

```ts
import { TemplateResult } from 'lit-element';
import { IconsetSVG } from '@spectrum-web-components/iconset/src/iconset-svg.js';

import { CustomIconSet } from 'your-icon-set.js';

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

### Deprecated

Iconsets have been deprecated and will be removed from the project in an upcoming version. Using a technique that ensures only the icons actually leveraged in your application are present in your build, like UI Icons (../icons-ui/) or Workflow Icons (../icons-workflow/), will ensure smaller bundles and higher performance for you visitor. For non-Spectrum icons, you can still slot SVG and image content into an [`sp-icon` element](../icon/) or sanitize the SVG to a template literal so that it can be returned from the `render()` method in an extension of `IconBase` to create your own named icon element.
