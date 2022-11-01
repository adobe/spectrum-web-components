## Description

An `<sp-popover>` is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface. This component does not implement the actual overlay behavior and interactions. This is handled by the [`Overlay`](../overlay) system.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/popover?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/popover)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/popover?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/popover)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/omhKPPsfFwPuzf4Lz1Bt/src/index.ts)

```
yarn add @spectrum-web-components/popover
```

Import the side effectful registration of `<sp-popover>` via:

```
import '@spectrum-web-components/popover/sp-popover.js';
```

When looking to leverage the `Popover` base class as a type and/or for extension purposes, do so via:

```
import { Popover } from '@spectrum-web-components/popover';
```

## Example

```html
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover open style="--spectrum-popover-dialog-min-width: 0;">
        <sp-dialog>
            <h3 slot="heading">Popover title</h3>
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </sp-dialog>
    </sp-popover>
</div>
```

## Variants

### Default with no tip

Default popover with no tip and no placement. Popovers will fill up the space of they're containing
element by default. The default popover has no padding by default

```html
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        variant="default"
        open
        style="max-width: 320px; --spectrum-popover-dialog-min-width: 0;"
    >
        <div style="font-size: 14px; padding: 10px">
            <div
                style="
                font-size: 18px;
                font-weight: 700;
                padding-bottom: 30px;
            "
            >
                Popover title
            </div>
            <div style="font-size: 14px">
                Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly
                caramels. Icing soufflé chupa chups donut cheesecake. Jelly-o
                chocolate cake sweet roll cake danish candy biscuit halvah
            </div>
        </div>
    </sp-popover>
</div>
```

### Dialog popovers

To apply a managed about of padding within your `<sp-popover>` you may choose to wrap you slotted content with an `<sp-dialog>` element, as seen below:

```html
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover open style="--spectrum-popover-dialog-min-width: 0;">
        <div
            style="
            font-size: 18px;
            font-weight: 700;
            padding-bottom: 30px;
        "
        >
            Popover title
        </div>
        <div style="font-size: 14px">
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </div>
    </sp-popover>
</div>
```

### Popover with tip

The `placement` attribute can be used to customize from where the `<sp-popover>` points to content to which it is related. `placement="top"` will point down to the related content from the top, etc.

<sp-tabs selected="top" auto label="Popover tip placements">
<sp-tab value="top">Top</sp-tab>
<sp-tab-panel value="top">

```html demo
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        placement="top"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
        <sp-dialog>
            <h3 slot="heading">Popover title</h3>
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </sp-dialog>
    </sp-popover>
</div>
```

</sp-tab-panel>
<sp-tab value="right">Right</sp-tab>
<sp-tab-panel value="right">

```html demo
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        placement="right"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
        <sp-dialog>
            <h3 slot="heading">Popover title</h3>
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </sp-dialog>
    </sp-popover>
</div>
```

</sp-tab-panel>
<sp-tab value="bottom">Bottom</sp-tab>
<sp-tab-panel value="bottom">

```html demo
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        placement="bottom"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
        <sp-dialog>
            <h3 slot="heading">Popover title</h3>
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </sp-dialog>
    </sp-popover>
</div>
```

</sp-tab-panel>
<sp-tab value="left">Left</sp-tab>
<sp-tab-panel value="left">

```html demo
<div
    style="
        color: var(--spectrum-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        placement="left"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
        <sp-dialog>
            <h3 slot="heading">Popover title</h3>
            Cupcake ipsum dolor sit amet jelly beans. Chocolate jelly caramels.
            Icing soufflé chupa chups donut cheesecake. Jelly-o chocolate cake
            sweet roll cake danish candy biscuit halvah
        </sp-dialog>
    </sp-popover>
</div>
```

</sp-tab-panel>
</sp-tabs>
