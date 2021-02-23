## Description

An `<sp-popover>` is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface. This component does not implement the actual overlay behavior and interactions. This is handled by the [`Overlay`](overlay) system.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/popover?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/popover)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/popover?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/popover)

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
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover dialog open style="--spectrum-popover-dialog-min-width: 0;">
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

## Variants

### Default with no tip

Default popover with no tip and no placement. Popovers will fill up the space of they're containing
element by default. The default popover has no padding by default

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
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

Popovers with padding, ideal for dialogs.

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover dialog open style="--spectrum-popover-dialog-min-width: 0;">
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

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        dialog
        placement="bottom"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
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

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        dialog
        placement="top"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
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

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        dialog
        placement="left"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
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

```html
<div
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
        max-width: 100%;
    "
>
    <sp-popover
        dialog
        placement="right"
        tip
        open
        style="--spectrum-popover-dialog-min-width: 0;"
    >
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
