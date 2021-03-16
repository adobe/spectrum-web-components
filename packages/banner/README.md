## Description

An `<sp-banner>` is an additional label an existing component may have. Banners cannot be interacted with. Banners in Spectrum have three variations for different uses as well as the ability to place it overlaid in the top-right corner of a container.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/banner?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/banner)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/banner?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/banner)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/qsv9Ztje6fUhANFmk8EA/src/index.ts)

```
yarn add @spectrum-web-components/banner
```

Import the side effectful registration of `<sp-banner>` via:

```
import '@spectrum-web-components/banner/sp-banner.js';
```

When looking to leverage the `Banner` base class as a type and/or for extension purposes, do so via:

```
import { Banner } from '@spectrum-web-components/banner';
```

## Example

```html
<sp-banner>
    <div slot="header">Header text</div>
    <div slot="content">Content of the banner</div>
</sp-banner>
```

## Variants

### Info banners

Banners intended for providing information. This is the default banner variant.

```html
<sp-banner type="info">
    <div slot="header">This is an info banner</div>
    <div slot="content">Description here</div>
</sp-banner>
```

### Error banners

Banners intended to indicate an error as occurred, with a brief description of the issue. More severe than a warning banner.

```html
<sp-banner type="error">
    <div slot="header">This is an error banner</div>
    <div slot="content">Something bad happened</div>
</sp-banner>
```

## Corner placement

In addition to the variant, banners can be placed in the top-right corner of its container by giving them a corner prop. Note that the position of the containing element needs to be either relative or absolute

```html
<div
    style="width: 300px; max-width: 75%; height: 100px; background-color: #ba598b; position: relative;"
>
    <sp-banner corner>
        <div slot="header">This banner is in a corner</div>
        <div slot="content">Neat!</div>
    </sp-banner>
</div>
```

## Accessibility

A Banner does not have a default semantic role communicated to assistive technology, but it does accept id, role and other aria- props that can be added to to improve accessibility depending on context.
