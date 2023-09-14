## Description

An `<sp-coachmark>` element can be used to bring added attention to specific parts of your page.

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

## Default

```html
<sp-popover open style="position: relative">
    <sp-coachmark heading="Card Heading">
        Switch to the zoom tool then click and drag in the canvas to move your
        camera forward and backward.
        <sp-action-menu slot="actions" placement="bottom-end" quiet>
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
        <sp-button
            slot="button-previous"
            variant="secondary"
            treatment="outline"
        >
            Previous
        </sp-button>
        <sp-button slot="button-next" variant="primary" treatment="outline">
            Next
        </sp-button>
    </sp-coachmark>
</sp-popover>
```

## With media

```html
<sp-popover open style="position: relative">
    <sp-coachmark heading="Card Heading">
        Switch to the zoom tool then click and drag in the canvas to move your
        camera forward and backward.
        <img
            slot="cover-photo"
            src="https://picsum.photos/200/300"
            alt="Demo Image"
        />
        <sp-action-menu slot="actions" placement="bottom-end" quiet>
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
        <sp-button
            slot="button-previous"
            variant="secondary"
            treatment="outline"
        >
            Previous
        </sp-button>
        <sp-button slot="button-next" variant="primary" treatment="outline">
            Next
        </sp-button>
    </sp-coachmark>
</sp-popover>
```
