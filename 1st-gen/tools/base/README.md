## Description

The `SpectrumElement` base class as created by mixing `SpectrumMixin` onto `LitElement` provides text direction support via the CSS `:dir()` pseudo-class, which automatically inherits directionality from the DOM hierarchy. In a TypeScript context, it also enforces the presence of `this.shadowRoot` on extending components.

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

Elements built from `SpectrumMixin` leverage the CSS `:dir()` pseudo-class to handle text direction. This modern approach automatically inherits directionality from the DOM hierarchy without requiring explicit `dir` attributes on individual components. The `:dir()` pseudo-class is well-supported across modern browsers and provides a performant, declarative way to manage both "left to right" (LTR) and "right to left" (RTL) content.

To manage content direction in your application, set the `dir` attribute on `document.documentElement` or on an `sp-theme` element. Components will automatically inherit the direction and apply appropriate RTL/LTR styles using CSS selectors like `:host(:dir(rtl))` and `:dir(rtl)`. This allows you to manage content direction in a single place while also enabling multiple content directions on the same page by scoping those content sections with `sp-theme` elements.

When JavaScript access to the direction value is needed, components can use the `dir` getter which returns `getComputedStyle(this).direction` (defaulting to `'ltr'` if not set).

#### public shadowRoot!: ShadowRoot;

Elements built from `SpectrumMixin` assume that you will be using shadow DOM in the resulting custom element. To simplify TypeScript usage the presence of `this.shadowRoot` is asserted as non-null so that you have direct access to it without extended type checking.
