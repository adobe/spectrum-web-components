## Overview

An `<sp-menu-group>` will gather a collection of `<sp-menu-item>` elements into a group as part of the content delivered in an `<sp-menu>` element.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/menu)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/FikFeTXNsYhxAVmCz2f4/src/index.ts)

```
yarn add @spectrum-web-components/menu
```

Import the side effectful registration of `<sp-menu-group>` as follows:

```
import '@spectrum-web-components/menu/sp-menu-group.js';
```

When looking to leverage the `MenuGroup` base class as a type and/or for extension purposes, do so via:

```
import { MenuGroup } from '@spectrum-web-components/menu';
```

## Example

An `<sp-menu-group>` can be used to organize `<sp-menu-item>`s in an `<sp-memu>` in to collections with a shared header. Use an element addressed to the `slot="header` to pass the content of that header.

<!-- prettier-ignore -->
```html
<sp-popover open style="position: relative">
    <sp-menu>
        <sp-menu-group>
            <span slot="header">New York</span>
            <sp-menu-item>
                Central Park
            </sp-menu-item>
            <sp-menu-item>
                Prospect Park
            </sp-menu-item>
        </sp-menu-group>
        <sp-menu-group>
            <span slot="header">San Fransisco</span>
            <sp-menu-item>
                Golden Gate Park
            </sp-menu-item>
            <sp-menu-item>
                Lake Merced Park
            </sp-menu-item>
        </sp-menu-group>
    </sp-menu>
</sp-popover>
```
