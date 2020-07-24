## Description

`sp-splitbutton` delivers a

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/splitbutton?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/splitbutton)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/splitbutton?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/splitbutton)

```
npm install @spectrum-web-components/splitbutton

# or

yarn add @spectrum-web-components/splitbutton
```

## CTA Split Button

```html
<sp-splitbutton>
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
<sp-splitbutton left>
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
```

## Primary Split Button

```html
<sp-splitbutton variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
<sp-splitbutton left variant="primary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
```

## Secondary Split Button

```html
<sp-splitbutton variant="secondary">
    Split Button
    <sp-popover slot="more" open>
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
<sp-splitbutton left>
    Split Button
    <sp-popover slot="more" open variant="secondary">
        <sp-menu>
            <sp-menu-item>Option 1</sp-menu-item>
            <sp-menu-item>Option Extended</sp-menu-item>
        </sp-menu>
    </sp-popover>
</sp-splitbutton>
```
