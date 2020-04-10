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
    style="
        color: var(--spectrum-global-color-gray-800);
        height: 200px;
        position: relative;
        width: 320px;
    "
>
    <sp-popover dialog open>
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
    "
>
    <sp-popover variant="default" open style="max-width: 320px">
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
    "
>
    <sp-popover dialog open>
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
    "
>
    <sp-popover dialog placement="bottom" tip open>
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
    "
>
    <sp-popover dialog placement="top" tip open>
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
    "
>
    <sp-popover dialog placement="left" tip open>
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
    "
>
    <sp-popover dialog placement="right" tip open>
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
