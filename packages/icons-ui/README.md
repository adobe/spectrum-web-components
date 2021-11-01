## Description

Deliver [Spectrum UI Icons](https://spectrum.adobe.com/page/icons/) as either:

-   Registered custom elements (`<sp-icon-arrow75>`)
-   Unregistered class definitions (`IconArrow75`)
-   Functions with customizable template tags to be used across various frameworks (`Arrow75Icon()`)

Search a full list of icons to [find an icon](#find-an-icon) for your project or find technical information about [extended use cases](#extended-use-cases), like consuming this package in various UI frameworks below.

Remember to consult Spectrum's [Iconography Guidelines](https://spectrum.adobe.com/page/iconography/) when planning how to leverage these icons in the visual delivery of your application.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/icons-ui?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/icons-ui)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/icons-ui?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/icons-ui)

```
yarn add @spectrum-web-components/icons-ui
```

Import the side effectful registration of a single element (e.g. `<sp-icon-arrow75>`) via:

```
import '@spectrum-web-components/icons-ui/icons/sp-icon-arrow75.js';
```

Leverage a single icon base class (e.g. `IconArrow75`) as a type, or for extension purposes, do so, via:

```
import { IconArrow75 } from '@spectrum-web-components/icons-ui/src/elements/IconArrow75.js';
```

### Find an icon

Search the available Spectrum Workflow icons below.

<p class="for-github">Complete search experience available at: <a href="https://opensource.adobe.com/spectrum-web-components/components/icons-ui/">https://opensource.adobe.com/spectrum-web-components/components/icons-ui/</a>.</p>

<icons-demo class="icon-search" package="icons-ui" size="xxl"></icons-demo>

<script type="module">
const search = document.querySelector('.icon-search');
const options = {
  rootMargin: '20px'
}
const callback = async (entries, observer) => {
    if (entries[0].intersectionRatio === 0) return;
    import('@spectrum-web-components/iconset/stories/icons-demo.js');
    import('@spectrum-web-components/icons-ui/stories/icon-manifest.js').then(({iconManifest}) => {
        search.icons = iconManifest;
    });
    observer.disconnect();
}
const observer = new IntersectionObserver(callback, options);
observer.observe(search);
</script>

### Alternative usage

You can import raw icons (e.g. `Arrow75Icon()`) via:

```js
import { Arrow75Icon } from '@spectrum-web-components/icons-ui/src/icons/Arrow75.js';
```

`@spectrum-web-components/icons-ui` exports _all_ icons. If your build process [tree-shakes](https://rollupjs.org/guide/en/#tree-shaking) dependencies, you can import from it directly:

```js
import { Arrow75Icon } from '@spectrum-web-components/icons-ui';
```

These icon literals are prepared with the `html` template tag from `lit-html`, the default value of an icon export will be as follows:

```js
import { LitElement, html } from 'lit-element';
import '@spectrum-web-components/icon';
import { Arrow75Icon } from '@spectrum-web-components/icons-ui';

class ElementWithIcon extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-icon>
                ${Arrow75Icon()}
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
import { Arrow75Icon } from '@spectrum-web-components/icons-ui';

console.log(Arrow75Icon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

When working in the context of other frameworks, it is possible to import the icons with a generic template tag as follows:

```js
import { Arrow75Icon } from '@spectrum-web-components/icons-ui/src/icons.js';

console.log(Arrow75Icon());

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
    <path
      d="M9.26 4.406L6.528 1.672A.84.84 0 005.34 2.859L6.64 4.16H1.396a.84.84 0 000 1.68H6.64l-1.301 1.3a.84.84 0 001.188 1.188l2.734-2.734a.84.84 0 000-1.188z"
    />
</svg>
***/
```

What's more, if you're already working with a specific parser in your project, you can assign it as the one to use when delivering the icons in order to be sure that the SVG content is delivered as parsed content to your final template. The means if you were working with Preact via the `htm` tag as bound to the provided hyperscript function:

```js
import {
    Arrow75Icon,
    setCustomTemplateLiteralTag,
} from '@spectrum-web-components/icons-ui/src/icons.js';
import htm from 'htm';
import { h } from 'preact';

const hPreact = htm.bind(h);

setCustomTemplateLiteralTag(hPreact);

console.log(Arrow75Icon());

/***
VNode {nodeName: "svg", children: Array[1], attributes: Object, key: undefined, constructor: Object}
***/
```

In this way the icons exported by `@spectrum-web-components/icons-ui` can be leveraged in projects powered by the the likes of hyperHTML, lighterhtml, lit-html, Preact, React, Vanilla JS, Vue.js, and more!
