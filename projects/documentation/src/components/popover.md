---
layout: layout.njk
title: 'Popover: Spectrum Web Components'
---
## Description

An **sp-popover** is used to display transient content (menus, options, additional actions etc.) and appears when clicking/tapping on a source (tools, buttons, etc.) It stands out via its visual style (stroke and drop shadow) and floats on top of the rest of the interface. This component does not implement the actual overlay behavior and interactions. This is handled in the `Overlay Root` and `Overlay Trigger`.

### Installation

```
npm install @spectrum-web-components/popover

# or

yarn add @spectrum-web-components/popover
```

## Example

```html
<div
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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
    style="color: var(--spectrum-global-color-gray-800); width: 320px; height: 200px"
>
    <sp-popover variant="default" open style="max-width: 320px">
        <div style="font-size: 14px; padding: 10px">
            <div
                style="padding-bottom: 30px; font-size: 18px; font-weight: 700"
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
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" placement="bottom" tip open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" placement="top" tip open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" placement="left" tip open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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
    style="color: var(--spectrum-global-color-gray-800); position: relative; width: 320px; height: 200px"
>
    <sp-popover variant="dialog" placement="right" tip open>
        <div style="padding-bottom: 30px; font-size: 18px; font-weight: 700">
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

