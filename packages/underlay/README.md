## Description

An `<sp-underlay>` is used primarily in concert with elements similar to `<sp-dialog>` that lay over the rest of your page to deliver a blocking layer between those two contexts. See this element in action as part of the [`<sp-dialog-wrapper>` element](components/dialog-wrapper).

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/underlay?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/underlay)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/underlay?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/underlay)

```
yarn add @spectrum-web-components/underlay
```

Import the side effectful registration of `<sp-underlay>` via:

```
import '@spectrum-web-components/underlay/sp-underlay.js';
```

When looking to leverage the `Underlay` base class as a type and/or for extension purposes, do so via:

```
import { Underlay } from '@spectrum-web-components/underlay';
```
