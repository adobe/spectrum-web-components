## Overview

`<sp-icon>` renders an icon to the page. By default the `name` attribute will pair with separately registered icon sets to deliver the icons. When not present, `<sp-icon>` will subsequently check for its `src` attribute which could populate the icon via an image, and then fallback to any slotted content for an element based icon.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/icon?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/icon)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/icon?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/icon)

```
yarn add @spectrum-web-components/icon
```

Import the side effectful registration of `<sp-icon>` via:

```
import '@spectrum-web-components/icon/sp-icon.js';
```

When looking to leverage the `Icon` base class as a type and/or for extension purposes, do so via:

```
import { Icon } from '@spectrum-web-components/icon';
```

### Example

Names of the icons on this page are provided by the [`<sp-icons-medium>` icon set](components/icons). Learn how to create your own via [`sp-iconset`](components/iconset).

```html
<sp-icons-medium></sp-icons-medium>
<sp-icon name="ui:Arrow100"></sp-icon>
```

### Options

#### Sizes

Icons are available in various sizes in Spectrum ranging from `s` to `xxl`. By default an `sp-icon` without a `size` attribute will appear as if it were `size="m"`. We can specify the size via `size` attribute.

```html
<sp-icon size="s" name="ui:Arrow100"></sp-icon>
<sp-icon size="m" name="ui:Arrow100"></sp-icon>
<sp-icon size="l" name="ui:Arrow100"></sp-icon>
<sp-icon size="xl" name="ui:Arrow100"></sp-icon>
<sp-icon size="xxl" name="ui:Arrow100"></sp-icon>
```

#### Icon colors

Icons apply their color as `currentColor`, so change the `color` property of the element for customization.

```html
<sp-icon name="ui:Arrow100" style="color: red;"></sp-icon>
```

#### Image icon

An image icon can be supplied via the `src` attribute. Remember that you cannot style the contents of an image via CSS, so use graphics that are appropriate for your application's design requirements.

```html
<sp-icon
    label="Previous"
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yOTU3Ljk5NSAtNTUzMC4wMzIgNiAxMCI+PGRlZnM+PHN0eWxlPi5he2ZpbGw6bm9uZTtzdHJva2U6IzE0NzNlNjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PHBhdGggY2xhc3M9ImEiIGQ9Ik0yNTEuMywzMzNsNC00LTQtNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI3MDEuNjk1IC01MTk2LjAzMikgcm90YXRlKDE4MCkiLz48L3N2Zz4="
></sp-icon>
```

#### HTML/SVG Element icon

Icons can also be supplied via HTML elements and are applied via the default `<slot>`.

```html
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
```

### Accessibility

If no meaning is lost by visually hiding an icon, it is considered decorative. Decorative icons should not have a label and should be hidden from assistive technology. `aria-hidden` is set to true by default for icons.

If an icon does add meaning, a label is required. Use the `label` attribute to set the label's text as the `aria-label` of the icon and remove the `aria-hidden` attribute.

```html
<sp-icon name="ui:Arrow100" label="Arrow pointing to the right"></sp-icon>
```
