## Description

The `SpectrumElement` base class as created by mixing `SpectrumMixin` onto `LitElement` adopts `dir` values from the `document` at connection time with a fallback to `lrt`. In a TypeScript context, it also enforces the presence of `this.shadowRoot` on extending components.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/base?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/base)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/base?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/base)

```
yarn add @spectrum-web-components/base
```

When looking to leverage the `SpectrumElement` base class as a type and/or for extension purposes, do so via:

```
import { SpectrumElement } from '@spectrum-web-components/base';

export MyElement extends SpectrumElement {}

```

Similarly the `SpectrumMixin` class factory mixin is available via:

```
import { SpectrumMixin } from '@spectrum-web-components/base';

export MyElement extends SpectrumMixin(HTMLElement) {}
```

### Features

#### `dir` management

With powerful CSS selectors like `:host(:dir(rtl))` and `:host-content([dir=rtl])` not yet enjoying cross-browser support, reliably delivering content in both "left to right" and "right to left" while relying on Shadow DOM means certain trade offs need to be made. While every custom element build from `SpectrumMixin` could have its `dir` attribute applied to manage this, doing so is not only a pain for apply, it's a pain to maintain over time. To support the flexibility to devlier content in both of these directions, elements built from `SpectrumMixin` will observe the `dir` attribute of either the `document` or a containing `sp-theme`. This will allow your sites and applications to manage content direction in a single place while also opening the possibility of having multiple content directions on the same page by scoping those content sections with `sp-theme` elements.

#### `isLTR`

While CSS offers many powerful solutions for styling content in various directions, sometimes JS functionality depends on the specific of that direction. Elements built from `SpectrumMixin` have the `this.isLTR` getter that will resolve to `true` when `dir === 'ltr'`.

#### public shadowRoot!: ShadowRoot;

Elements built from `SpectrumMixin` assume that you will be using shadow DOM in the resulting custom element. To simplify TypeScript usage the presence of `this.shadowRoot` is asserted as non-null so that you have direct access to it without extended type checking.
