## Description

Deliver [Spectrum Workflow Icons](https://spectrum.adobe.com/page/icons/) as either:

-   Registered custom elements (`<sp-icon-abc>`)
-   Unregistered class definitions (`IconAbc`)
-   Functions with customizable template tags to be used across various frameworks (`AbcIcon()`)

Search a full list of icons to [find an icon](#find-an-icon) for your project or find technical information about [extended use cases](#extended-use-cases), like consuming this package in various UI frameworks below.

When planning how to leverage these icons in the visual delivery of your application, remember to consult Spectrum's [Iconography Guidelines](https://spectrum.adobe.com/page/iconography/).

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/icons-workflow?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/icons-workflow)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/icons-workflow?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/icons-workflow)

```
yarn add @spectrum-web-components/icons-workflow
```

Import the side effectful registration of a single element (e.g. `<sp-icon-abc>`) via:

```
import '@spectrum-web-components/icons-workflow/icons/sp-icon-abc.js';
```

Leverage a single icon base class (e.g. `IconAbc`) as a type, or for extension purposes, do so, via:

```
import { IconAbc } from '@spectrum-web-components/icons-workflow/src/elements/IconAbc.js';
```

### Find an icon

Search the available Spectrum Workflow icons below.

<p class="for-github">Complete search experience available at: <a href="https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/">https://opensource.adobe.com/spectrum-web-components/components/icons-workflow/</a>.</p>

<icons-demo class="icon-search" package="icons-workflow" size="xxl"></icons-demo>

<script type="module">
const search = document.querySelector('.icon-search');
const options = {
  rootMargin: '20px'
}
const callback = async (entries, observer) => {
    if (entries[0].intersectionRatio === 0) return;
    import('@spectrum-web-components/iconset/stories/icons-demo.js');
    import('@spectrum-web-components/icons-workflow/stories/icon-manifest.js').then(({iconManifest}) => {
        search.icons = iconManifest;
    });
    observer.disconnect();
}
const observer = new IntersectionObserver(callback, options);
observer.observe(search);
</script>

### Alternative usage

You can import raw icons (e.g. `AbcIcon()`) via:

```js
import { AbcIcon } from '@spectrum-web-components/icons-workflow/src/icons/ABC.js';
```

`@spectrum-web-components/icons-workflow` exports _all_ icons. If your build process [tree-shakes](https://rollupjs.org/guide/en/#tree-shaking) dependencies, you can import from it directly:

```js
import { AbcIcon } from '@spectrum-web-components/icons-workflow';
```

These icon literals are prepared with the `html` template tag from `lit-html`, the default value of an icon export will be as follows:

```js
import { LitElement, html } from 'lit-element';
import '@spectrum-web-components/icon';
import { AbcIcon } from '@spectrum-web-components/icons-workflow';

class ElementWithIcon extends LitElement {
    protected render(): TemplateResult {
        return html`
            <sp-icon>
                ${AbcIcon()}
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
import { AbcIcon } from '@spectrum-web-components/icons-workflow';

console.log(AbcIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

When working in the context of other frameworks, it is possible to import the icons with a generic template tag as follows:

```js
import { AbcIcon } from '@spectrum-web-components/icons-workflow/src/icons.js';

console.log(AbcIcon());

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
      d="M4.936 20.484l-1.1 3.322a.235.235 0 01-.259.194H.988c-.172 0-.216-.086-.172-.237 1.143-3.236 2.976-8.543 4.335-12.275a3.813 3.813 0 00.216-1.337.136.136 0 01.151-.151h3.473a.162.162 0 01.173.108c1.575 4.336 3.3 9.276 4.9 13.676.064.151.021.216-.13.216h-2.85a.193.193 0 01-.216-.151L9.66 20.484zm4.055-2.459C8.56 16.558 7.7 14.1 7.265 12.545h-.021c-.324 1.467-1.1 3.732-1.661 5.48z"
    />
    <path
      d="M14.045 10.257c0-.15.022-.193.129-.214.943-.022 2.743-.043 4.565-.043 4.436 0 5.379 1.95 5.379 3.686a3.1 3.1 0 01-2.036 3v.043a3.309 3.309 0 012.572 3.236c0 2.658-2.294 4.029-6.194 4.029-1.65.022-3.386-.021-4.265-.043a.17.17 0 01-.15-.193zm2.979 5.379h1.865c1.714 0 2.25-.707 2.25-1.628 0-1.158-.772-1.629-2.422-1.629-.836 0-1.5.021-1.693.043zm0 5.937c.236 0 .729.042 1.608.042 1.8 0 2.871-.471 2.871-1.8 0-1.114-.686-1.757-2.593-1.757h-1.886zM32.752 10a7.959 7.959 0 012.946.439c.1.063.126.1.126.251v2.21c0 .189-.1.189-.188.147a7.061 7.061 0 00-2.779-.523 4.175 4.175 0 00-4.535 4.43c0 3.427 2.466 4.388 4.514 4.388a8.49 8.49 0 002.925-.5c.1-.042.167 0 .167.125v2.152c0 .147-.021.23-.167.293a8.621 8.621 0 01-3.448.588c-3.74 0-7.041-2.069-7.041-6.958 0-3.991 2.928-7.042 7.48-7.042z"
    />
</svg>
***/
```

What's more, if you're already working with a specific parser in your project, you can assign it as the one to use when delivering the icons in order to be sure that the SVG content is delivered as parsed content to your final template. The means if you were working with Preact via the `htm` tag as bound to the provided hyperscript function:

```js
import {
    AbcIcon,
    setCustomTemplateLiteralTag,
} from '@spectrum-web-components/icons-workflow/src/icons.js';
import htm from 'htm';
import { h } from 'preact';

const hPreact = htm.bind(h);

setCustomTemplateLiteralTag(hPreact);

console.log(AbcIcon());

/***
VNode {nodeName: "svg", children: Array[1], attributes: Object, key: undefined, constructor: Object}
***/
```

In this way the icons exported by `@spectrum-web-components/icons-workflow` can be leveraged in projects powered by the the likes of hyperHTML, lighterhtml, lit-html, Preact, React, Vanilla JS, Vue.js, and more!
