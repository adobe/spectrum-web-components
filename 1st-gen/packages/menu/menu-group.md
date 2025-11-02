## Overview

An `<sp-menu-group>` will gather a collection of [`<sp-menu-item>`](../menu-item) elements into a group as part of the content delivered in an [`<sp-menu>`](../menu) element. Supplying content to the `header` slot will allow it label the group both visually and for screen readers. Like `<sp-menu>`, an `<sp-menu-group>` element can maintain a selection as outlined by the value or absence of its `selects` attribute.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/menu?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/menu)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/menu?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/menu)

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

### Anatomy

An `<sp-menu-group>` can be used to organize `<sp-menu-item>` elements in an `<sp-memu>` into collections with a shared header. Use an element addressed to the `slot="header"` to pass in the content of that header.

<!-- prettier-ignore -->
```html demo
<sp-menu label="What are your favorite parks?">
        <sp-menu-group>
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
        <sp-menu-group>
            <span slot="header">San Francisco</span>
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

### Behavior

#### Selection

The `<sp-menu-group>` element can be instructed to maintain a selection via the `selects` attribute. Depending on the chosen algorithm, the `<sp-menu-group>` element will hold a `value` property and manage the `selected` state of its `<sp-menu-item>` descendants.

- When `selects` is set to `single`, the `<sp-menu-group>` element will maintain one selected item after an initial selection is made.
- When `selects` is set to `multiple`, the `<sp-menu-group>` element will maintain zero or more selected items.
- When `selects` is set to `inherit`, the `<sp-menu-group>` element will allow its `<sp-menu-item>` children to participate in the selection of its nearest `<sp-menu>` ancestor.

<sp-tabs selected="selects-single" auto label="Selects attribute">
<sp-tab value="selects-single">Single</sp-tab>
<sp-tab-panel value="selects-single">

<!-- prettier-ignore -->
```html demo
<p>
    Your favorite park in New York is: <span id="single-group-1-value"></span>
    <br><br>
    Your favorite park in San Francisco is: <span id="single-group-2-value"></span>
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
            id="single-group-1"
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
            id="single-group-2"
            selects="single"
        >
            <span slot="header">San Francisco</span>
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

</sp-tab-panel>
<sp-tab value="selects-multiple">Multiple</sp-tab>
<sp-tab-panel value="selects-multiple">

<!-- prettier-ignore -->
```html demo
<p>
    Your favorite parks in New York are: <span id="multiple-group-1-value"></span>
    <br><br>
    Your favorite parks in San Francisco are: <span id="multiple-group-2-value"></span>
</p>
<sp-popover open style="position: relative">
    <sp-menu
        label="What are your favorite parks?"
        style="width: 200px"
        onchange="this.parentElement
                    .previousElementSibling
                    .querySelector(`#${arguments[0].target.id}-value`)
                    .textContent = arguments[0].target.value.replace(/,/g,', ')">
        <sp-menu-group
            id="multiple-group-1"
            selects="multiple"
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
            id="multiple-group-2"
            selects="multiple"
        >
            <span slot="header">San Francisco</span>
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

</sp-tab-panel>
<sp-tab value="selects-inherit">Inherit</sp-tab>
<sp-tab-panel value="selects-inherit">

<!-- prettier-ignore -->
```html demo
<p>
    Your favorite park is: <span id="inherit-group-value"></span>
</p>
<sp-popover open style="position: relative">
    <sp-menu
        id="inherit-group"
        label="What are your favorite parks?"
        style="width: 200px"
        selects="single"
        onchange="this.parentElement
                    .previousElementSibling
                    .querySelector(`#${arguments[0].target.id}-value`)
                    .textContent = arguments[0].target.value">
        <sp-menu-group
            id="inherit-group-1"
            selects="inherit"
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
            id="inherit-group-2"
            selects="inherit"
        >
            <span slot="header">San Francisco</span>
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

</sp-tab-panel>
</sp-tabs>

### Accessibility

Review the accessibility guidelines for the [menu-item](../menu-item#accessibility-guidelines) children and the guidelines for the parent [menu](../menu#accessibility-guidelines).
