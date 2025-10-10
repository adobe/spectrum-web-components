## Overview

An `<sp-link>` allows users to navigate to a different location. They can be presented in-line inside a paragraph or as a standalone text.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/link?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/link)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/link?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/link)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-jp2cck3i)

```bash
yarn add @spectrum-web-components/link
```

Import the side effectful registration of `<sp-link>` via:

```js
import '@spectrum-web-components/link/sp-link.js';
```

When looking to leverage the `Link` base class as a type and/or for extension purposes, do so via:

```js
import { Link } from '@spectrum-web-components/link';
```

### Variants

<sp-tabs selected="primary" auto label="Variant Options">
<sp-tab value="primary">Primary</sp-tab>
<sp-tab-panel value="primary">

Primary links are blue and should be used to call attention to the link or for when the blue color won’t feel too overwhelming in the experience.

<!-- prettier-ignore -->
```html
This is a <sp-link href="#">primary link</sp-link>.
```

</sp-tab-panel>
<sp-tab value="secondary">Secondary</sp-tab>
<sp-tab-panel value="secondary">

The secondary variant is the same color as the paragraph text inline of which it appears. Its subdued appearance is optimal for when the primary variant is too overwhelming, such as in blocks of text with several references linked throughout.

<!-- prettier-ignore -->
```html
This is a <sp-link href="#" variant="secondary">secondary link</sp-link>.
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

All links can have a quiet style, which means they don’t have an underline. This style should only be used when the placement and context of the link is explicit enough that a visible underline isn’t necessary.
Quiet links are less accessible because users may not recognise them as links. Use only when context and placement make their purpose unmistakable, and avoid using quiet links for critical navigation.

<!-- prettier-ignore -->
```html
<p>This is a <sp-link quiet href="#">quiet primary link</sp-link>.</p>
<p>This is a <sp-link quiet variant="secondary" href="#">quiet secondary link</sp-link>.</p>
<div
    style="background-color: var(--spectrum-docs-static-white-background-color); padding: 15px 20px; display: inline-block;"
>
    <p style="color: var(--spectrum-white);">
        This is a
        <sp-link static-color="white" quiet href="#">quiet link</sp-link>
        over a background.
    </p>
</div>
```

</sp-tab-panel>
</sp-tabs>

#### Static colored links

When a link needs to be placed on top of a colored background or a visual it may be appropriate to ship it with a static color, regardless of the theme settings with which it is delivered. Leverage the `static-color` attribute with its `white` or `black` values to ensure the delivery is the same in all contexts.

<sp-tabs selected="white" auto label="Static Attribute Options">
<sp-tab value="white">White</sp-tab>
<sp-tab-panel value="white">

```html
<div
    style="background-color: var(--spectrum-docs-static-white-background-color); padding: 15px 20px; display: inline-block;"
>
    <p style="color: var(--spectrum-white);">
        This
        <sp-link static-color="white" href="#">link</sp-link>
        is over a background.
    </p>
</div>
```

</sp-tab-panel>
<sp-tab value="black">Black</sp-tab>
<sp-tab-panel value="black">

```html
<div
    style="background-color: var(--spectrum-docs-static-black-background-color); padding: 15px 20px; display: inline-block;"
>
    <p style="color: var(--spectrum-black);">
        This
        <sp-link static-color="black" href="#">link</sp-link>
        is over a background.
    </p>
</div>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Disabled links

Disabled links are blue, unfocusable, unclickable and should not propagate any events.

<!-- prettier-ignore -->
```html
This is a <sp-link disabled href="#">disabled link</sp-link>.
```

### Download attribute

The download attribute on an `<a>` tag prompts a user to download a link as opposed to navigating to it. This attribute has been carried forward to `<sp-link>` to function the same.

While it functions this way without assigning a value, actually assigning the value allows custom naming of the download link in accordance
with standard `<a>` [rules](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) defined by the browser.

<!-- prettier-ignore -->
```html
This is a <sp-link download="myfile.txt" href="#">download link</sp-link>.
```

### Accessibility

#### Best Practices

- Use links in body copy and not in titles. For a larger call to action, consider using a [button](/components/button/) instead.
- Identify the target of each link directly in the link text to communicate context and set clear expectations about where the link will go.
- Be mindful of link placement and language, and create experiences that are inclusive of users navigating with screen readers, who may navigate links without their surrounding language.
- It’s more accessible and inclusive to write link text as unique descriptions of the navigational target or function.
- Implement skip links to improve navigation for keyboard and screen reader users when necessary, especially when the page has many sections and lengthy scroll.
- For links that open in a new tab, add `target="_blank"`, `rel="noopener noreferrer"` and a UI icon to the link.
- Add `aria-label` or `aria-labelledby` to links for screen readers who need additional context. Links can be more concise to lessen visible noise, but adding these attributes can help make the purpose of the link more clear.
- Ensure strong color contrast between the link and its background. For users with low vision,consider using 7:1 ratio for critical links and 21:1 ratio for severe vision impairments.

#### Keyboard Interaction

- `Tab`: Move focus to the next focusable element.
- `Enter`: Activate the link.
- `Shift + F10` (Optional): Open the context menu for the link.
