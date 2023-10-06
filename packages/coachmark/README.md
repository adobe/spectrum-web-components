## Description

`sp-coachmark` are temporary messages that educate users through new or unfamiliar product experiences. They can be chained into a sequence to form a tour.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Z611FV1zeF0CLBLVHNFY/src/index.ts)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coachmark>` via:

```
import '@spectrum-web-components/coachmark/sp-coachmark.js';

```

When looking to leverage the `Coachmark` base class as a type and/or for extension purposes, do so via:

```
import { Coachmark } from '@spectrum-web-components/coachmark';
```

## Example

### Default

```html
<sp-coachmark
    currentstep="2"
    totalsteps="8"
    open
    primary-cta="Next"
    secondary-cta="Previous"
>
    <div slot="title">A thing is about to happen</div>
    <div slot="content">
        This is a Rich Tooltip with nothing but text in it. Kind of lonely in
        here.
    </div>
</sp-coachmark>
```

### with Media

```html
<sp-coachmark
    currentstep="2"
    totalsteps="8"
    open
    primary-cta="Next"
    secondary-cta="Previous"
>
    <div slot="title">Tooltip with 16:9 image</div>
    <div slot="content">
        This is a Rich Tooltip with nothing but text in it. Kind of lonely in
        here.
    </div>
    <img
        class="image"
        loading="lazy"
        slot="asset"
        src="https://picsum.photos/id/237/200/300"
    />
</sp-coachmark>
```
