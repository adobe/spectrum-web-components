## Description

An `<sp-link>` allow users to navigate to a different location. They can be presented in-line inside a paragraph or as a standalone text.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/link?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/link)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/link?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/link)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/SKjuIJdhxi5YaT3BNgxT/src/index.ts)

```
yarn add @spectrum-web-components/link
```

Import the side effectful registration of `<sp-link>` via:

```
import '@spectrum-web-components/link/sp-link.js';
```

When looking to leverage the `Link` base class as a type and/or for extension purposes, do so via:

```
import { Link } from '@spectrum-web-components/link';
```

## Example

<!-- prettier-ignore -->
```html
This is an <sp-link href="#">example link</sp-link>.
```

## Variants

### Standard links

Standard links are blue and should be used to call attention to the link or for when the blue color won’t feel too overwhelming in the experience.

<!-- prettier-ignore -->
```html
This is a <sp-link href="#">standard link</sp-link>.
```

### Secondary links

The secondary variant is the same color as the paragraph text inline of which it appears. Its subdued appearance is optimal for when the primary variant is too overwhelming, such as in blocks of text with several references linked throughout.

<!-- prettier-ignore -->
```html
This is a <sp-link href="#" variant="secondary">secondary link</sp-link>.
```

### Static colored links

When a link needs to be placed on top of a colored background or a visual it may be appropriate to ship it with a static color, regardless of the theme settings with which it is delivered. Leverage the `static` attribute with its `white` or `black` values to ensure the delivery is the same in all contexts.

<sp-tabs selected="white" auto label="Static Attribute Options">
<sp-tab value="white">White</sp-tab>
<sp-tab-panel value="white">

```html
<div
    style="background-color: #0f797d; padding: 15px 20px; display: inline-block;"
>
    <p style="color: rgb(240, 240, 240);">
        This
        <sp-link static="white" href="#">link</sp-link>
        is over a background.
    </p>
</div>
```

</sp-tab-panel>
<sp-tab value="black">Black</sp-tab>
<sp-tab-panel value="black">

```html
<div
    style="background-color: rgb(181, 209, 211); padding: 15px 20px; display: inline-block;"
>
    <p style="color: rgb(15, 15, 15);">
        This
        <sp-link static="black" href="#">link</sp-link>
        is over a background.
    </p>
</div>
```

</sp-tab-panel>
</sp-tabs>

### Quiet links

All links can have a quiet style, which means they don’t have an underline. This style should only be used when the placement and context of the link is explicit enough that a visible underline isn’t necessary. Quiet links are less accessible, so they should not be used for links that are essential to the experience. These are commonly used in website footers, where there are several lists of links that are shortcuts to other pages.

<!-- prettier-ignore -->
```html
<p>This is a <sp-link quiet href="#">quiet standard link</sp-link>.</p>
<p>This is a <sp-link quiet variant="secondary" href="#">quiet secondary link</sp-link>.</p>
<div
    style="background-color: #0f797d; padding: 15px 20px; display: inline-block;"
>
    <p style="color: rgb(240, 240, 240);">
        This is a
        <sp-link static="white" quiet href="#">quiet link</sp-link>
        over a background.
    </p>
</div>
```

### Download attribute

The download attribute on an `<a>` tag prompts a user to download a link as opposed to navigating to it. This attribute has been carried forward to `<sp-link>` to function the same.

While it functions this way without assigning a value, actually assigning the value allows custom naming of the download link in accordance
with standard `<a>` [rules](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) defined by the browser.

<!-- prettier-ignore -->
```html
This is a <sp-link download="myfile.txt" href="#">download link</sp-link>.
```
