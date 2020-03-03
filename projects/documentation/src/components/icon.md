---
layout: layout.njk
title: 'Icon: Spectrum Web Components'
---
## Description

`<sp-icon>` renders an icon to the page. By default the `name` attribute will pair with separately registered icon sets to deliver the icons. When not present, `<sp-icon>` will subsequently check for its `src` attribute which could populate the icon via an image, and then fallback to any slotted content for an element based icon.

### Installation

```
npm install @spectrum-web-components/icon

# or

yarn add @spectrum-web-components/icon
```

## Example

Names icons on this page are provided by the [`<sp-icons-medium>` icon set](/components/icons). Learn how to create your own via [`sp-iconset`](/components/iconset).

```html
<sp-icons-medium></sp-icons-medium>
<sp-icon name="ui:Magnifier"></sp-icon>
```

## Variants

Icons are available in various sizes in Spectrum ranging from `xxs` to `xxl`, `m` being the default. We can specify the size via `size` attribute.

### Size variants

```html
<sp-icon size="xxs" name="ui:Magnifier"></sp-icon>
<sp-icon size="xs" name="ui:Magnifier"></sp-icon>
<sp-icon size="s" name="ui:Magnifier"></sp-icon>
<sp-icon size="m" name="ui:Magnifier"></sp-icon>
<sp-icon size="l" name="ui:Magnifier"></sp-icon>
<sp-icon size="xl" name="ui:Magnifier"></sp-icon>
<sp-icon size="xxl" name="ui:Magnifier"></sp-icon>
```

## Color icon

Icons apply their color as `currentColor` so change the `color` property of the element for customization.

```html
<sp-icon name="ui:Magnifier" style="color: red;"></sp-icon>
```

## Image icon

An image icon can be supplied via the `src` attribute. Remember that you cannot style the contents of an image via CSS, so use graphics that are appropriately prepared for including in your applications design requirements.

```html
<sp-icon
    size="xxs"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="xs"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="s"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="m"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="l"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="xl"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
<sp-icon
    size="xxl"
    src="https://spectrum.corp.adobe.com/static/icons/workflow_22/Smock_FullScreen_22_N.svg"
></sp-icon>
```

## Element icon

Icons can also be supplied as HTML elements to be applied via the default `<slot>`.

```html
<sp-icon size="xxs">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        role="img"
        fill="currentColor"
        height="18"
        width="18"
        aria-hidden="true"
    >
        <path
            d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
        ></path>
    </svg>
</sp-icon>
<sp-icon>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        role="img"
        fill="currentColor"
        height="18"
        width="18"
        aria-hidden="true"
    >
        <path
            d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
        ></path>
    </svg>
</sp-icon>
<sp-icon size="xxl">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 22 22"
        role="img"
        fill="currentColor"
        height="18"
        width="18"
        aria-hidden="true"
    >
        <path
            d="M19.75,10.04h-15l5.97-5.97a.483.483,0,0,0,0-.7l-.35-.36a.513.513,0,0,0-.71,0L2.24,10.44a.513.513,0,0,0,0,.71l7.39,7.84a.513.513,0,0,0,.71,0l.35-.35a.513.513,0,0,0,0-.71L4.76,11.5H19.75a.25.25,0,0,0,.25-.25v-.96A.25.25,0,0,0,19.75,10.04Z"
        ></path>
    </svg>
</sp-icon>
```

## Accessibility

`aria-hidden` is set to true by default for Icons. The `label` attribute suppresses this and adds the label text as the aria-label of the icon.

```html
<sp-icon name="ui:Magnifier" label="Magnify"></sp-icon>
```

