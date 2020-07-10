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
