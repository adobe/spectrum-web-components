## Overview

`<sp-sidenav-heading>` elements will create visible structure by grouping their child `<sp-sidenav-item>` children under a non-interactive heading. Headings are used at the first level of navigation, and should not be used in any subsequent navigation level.

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

### Anatomy

- **Label**: text content of the heading
- **Default slot**: children `<sp-sidenav-item>` elements will be categorized under the heading element

### Options

<sp-tabs selected="single-level" auto label="Side nav heading options">
<sp-tab value="single-level">Single-level with headings</sp-tab>
<sp-tab-panel value="single-level">

Use a single level side navigation with headings when needing to group navigation items into categories. Headings are not interactive.

```html
<sp-sidenav>
    <sp-sidenav-heading label="Docs heading">
        <sp-sidenav-item
            value="new-docs"
            label="New docs"
            href="/components/sidenav"
        ></sp-sidenav-item>
        <sp-sidenav-item
            value="old-docs"
            label="Old docs"
            href="/components/sidenav"
        ></sp-sidenav-item>
    </sp-sidenav-heading>
</sp-sidenav>
```

</sp-tab-panel>
<sp-tab value="multi-level">Multi-level with headings</sp-tab>
<sp-tab-panel value="multi-level">

In multi-level side navigation, headings can only be used at the first level of navigation. Do not nest headings within second or third level side nav items.

```html
<sp-sidenav variant="multilevel">
    <sp-sidenav-heading label="Styles">
        <sp-sidenav-item value="Color" label="Color"></sp-sidenav-item>
        <sp-sidenav-item value="Grid" label="Grid"></sp-sidenav-item>
        <sp-sidenav-heading label="Heading styles">
            <sp-sidenav-item value="Typography" label="Typography" expanded>
                <sp-sidenav-item
                    value="Display"
                    label="Display headings"
                ></sp-sidenav-item>
                <sp-sidenav-item value="H1" label="H1"></sp-sidenav-item>
                <sp-sidenav-item value="H2" label="H2"></sp-sidenav-item>
            </sp-sidenav-item>
        </sp-sidenav-heading>

        <sp-sidenav-heading label="Font styles">
            <sp-sidenav-item value="Body" label="Body copy"></sp-sidenav-item>
            <sp-sidenav-item value="Details" label="Details"></sp-sidenav-item>
            <sp-sidenav-item value="Code" label="Code"></sp-sidenav-item>
        </sp-sidenav-heading>
    </sp-sidenav-heading>
</sp-sidenav>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

Although `<sp-sidenav-heading>` elements are non-interactive, they do offer accessibility features:

- Uses `<h2>` elements for heading text to provide proper document outline
- Automatically sets `role="listitem"` on the heading component itself
- Creates a nested `role="list"` container for grouped navigation items
- `aria-labelledby` is set to the `id` of rendered `<h2>` tag on nested list items to associate the list with the heading
