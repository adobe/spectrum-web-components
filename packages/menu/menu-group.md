## Overview

An `<sp-menu-group>` will gather a collection of `<sp-menu-item>` elements into a group as part of the content delivered in an `<sp-menu>` element. Supplying content to the `header` slot will allow it label the group both visually and for screen readers. Like `<sp-menu>`, an `<sp-menu-group>` element can maintain a selection as outlined by the value or absence of its `selects` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@iliad-ui/menu?style=for-the-badge)](https://www.npmjs.com/package/@iliad-ui/menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@iliad-ui/menu?style=for-the-badge)](https://bundlephobia.com/result?p=@iliad-ui/menu)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/FikFeTXNsYhxAVmCz2f4/src/index.ts)

```
yarn add @iliad-ui/menu
```

Import the side effectful registration of `<sp-menu-group>` as follows:

```
import '@iliad-ui/menu/sp-menu-group.js';
```

When looking to leverage the `MenuGroup` base class as a type and/or for extension purposes, do so via:

```
import { MenuGroup } from '@iliad-ui/menu';
```

## Example

An `<sp-menu-group>` can be used to organize `<sp-menu-item>`s in an `<sp-memu>` in to collections with a shared header. Use an element addressed to the `slot="header` to pass the content of that header.

<!-- prettier-ignore -->
```html
<p>
    Your favorite park in New York is: <span id="group-1-value"></span>
    <br><br>
    Your favorite park in San Fransisco is: <span id="group-2-value"></span>
</p>
<sp-popover open style="position: relative">
    <sp-menu
        label="What are your favorite parks?"
        style="width: 200px"
        onchange="this.parentElement
                    .previousElementSibling
                    .querySelector(`#${arguments[0].target.id}-value`)
                    .textContent = arguments[0].target.value">
        <sp-menu-group
            id="group-1"
            selects="single"
        >
            <span slot="header">New York</span>
            <sp-menu-item>
                Central Park
            </sp-menu-item>
            <sp-menu-item>
                Flushing Meadows Corona Park
            </sp-menu-item>
            <sp-menu-item>
                Prospect Park
            </sp-menu-item>
        </sp-menu-group>
        <sp-menu-group
            id="group-2"
            selects="single"
        >
            <span slot="header">San Fransisco</span>
            <sp-menu-item>
                Golden Gate Park
            </sp-menu-item>
            <sp-menu-item>
                John McLaren Park
            </sp-menu-item>
            <sp-menu-item>
                Lake Merced Park
            </sp-menu-item>
        </sp-menu-group>
    </sp-menu>
</sp-popover>
```
