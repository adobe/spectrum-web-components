## Overview

`<sp-sidenav-heading>` elements will create visible structure by grouping their child `<sp-sidenav-item>` children under a non-interactive heading.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/sidenav?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/sidenav)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/sidenav?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/sidenav)

```bash
yarn add @spectrum-web-components/sidenav
```

Import the side effectful registration of `<sp-sidenav-heading>` via:

```js
import '@spectrum-web-components/sidenav/sp-sidenav-heading.js';
```

When looking to leverage the `SidenavHeading` base classes as a type and/or for extension purposes, do so via:

```js
import { SidenavHeading } from '@spectrum-web-components/sidenav';
```

### Options

```html
<sp-sidenav>
    <sp-sidenav-heading label="Docs heading"></sp-sidenav-heading>
    <sp-sidenav-item
        value="Docs"
        label="Docs"
        href="/components/sidenav"
    ></sp-sidenav-item>
</sp-sidenav>
```

#### Multi-level `<sp-sidenav>` with headings

```html
<sp-sidenav variant="multilevel">
    <sp-sidenav-heading label="Styles"></sp-sidenav-heading>
    <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
    <sp-sidenav-item value="Grid" label="Grid" expanded>
        <sp-sidenav-item value="Layout" label="Layout"></sp-sidenav-item>
        <sp-sidenav-item
            value="Responsive"
            label="Responsive"
        ></sp-sidenav-item>
    </sp-sidenav-item>
    <sp-sidenav-item value="Typography" label="Typography"></sp-sidenav-item>
</sp-sidenav>
```

### Accessibility
