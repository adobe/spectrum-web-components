## Description

[Spectrum Workflow Icons](https://spectrum.adobe.com/page/icons/) delivered in a flexible template tag so that they can be leveraged across various frameworks. The default export of this package pre-applies the `html` template tag from `lit-html` for ease of use in the Spectrum Web Components library. Please remember to consult Spectrum's [Iconography Guidelines](https://spectrum.adobe.com/page/iconography/) when planning how to leverage these icons in the visual delivery of your application. For technical information on using these iconos in projects powered by various javascript frameworks, check out the "Extended use cases" sectino below.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/icons-workflow?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/icons-workflow)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/icons-workflow?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/icons-workflow)

```
yarn add @spectrum-web-components/icons-workflow
```

With the default exports of the packages prepared with the `html` template tag from `lit-html`, the default value of an icon export will be as follows:

```js
import { LitElement, html } from 'lit-element';
import '@spectrum-web-components/icon';
import { CircleIcon } from '@spectrum-web-components/icons-workflow';

class ElementWithIcon extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-icon>
                ${CircleIcon()}
            </sp-icon>
        `
    }
}

customElements.define('element-with-icon', ElementWithIcon);
```

Every icons can be customized via the following options:

```js
{
    width: 24, // number outlining the width to deliver the SVG element with
    height: 24, // number outlining the height to delivery the SVG element with
    hidden: false, // boolean representing whether to apply the `aria-hidden` attribute
    title: 'Icon title', // string of the title to deliver the icon with
}
```

### Extended use cases

The default exports of this package are pre-wrapped via `setCustomTemplateLiteralTag` in the `html` template tag from `lit-html`, and work liek the following::

```js
import { CircleIcon } from '@spectrum-web-components/icons-workflow';

console.log(CircleIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

When working in the context of other frameworks, it is possible to import the icons with a generic template tag as follows:

```js
import { CircleIcon } from '@spectrum-web-components/icons-workflow/lib/icons.js';

console.log(CircleIcon());

/***
<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 36 36"
    role="img"
    fill="currentColor"
    height="24"
    width="24"
    aria-hidden="false"
    aria-label="Circle"
>
    <circle cx="18" cy="18" r="16"></circle>
</svg>
***/
```

What's more, if you're already working with a specific parser in your project, you can assign it as the one to use when delivering the icons in order to be sure that the SVG content is delivered as parsed content to your final template. The means if you were working with Preact via the `htm` tag as bound to the provided hyperscript function:

```js
import {
    CircleIcon,
    setCustomTemplateLiteralTag,
} from '@spectrum-web-components/icons-workflow/lib/icons.js';
import htm from 'htm';
import { h } from 'preact';

const hPreact = htm.bind(h);

setCustomTemplateLiteralTag(hPreact);

console.log(CircleIcon());

/***
VNode {nodeName: "svg", children: Array[1], attributes: Object, key: undefined, constructor: Object}
***/
```

In this way the icons exported by `@spectrum-web-components/icons-workflow` can be leveraged in projects powered by the the likes of hyperHTML, lighterhtml, lit-html, Preact, React, Vanilla JS, Vue.js, and more!
