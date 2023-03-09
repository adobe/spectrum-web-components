## Description

An `<sp-coachmark-popover>` element can be used to add a coachmark popover to an element with a coachmark.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Z611FV1zeF0CLBLVHNFY/src/index.ts)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coachmark-popover>` and `<sp-coachmark-popover-content>` via:

```
import '@spectrum-web-components/coachmark/sp-coachmark-popover.js';
import '@spectrum-web-components/coachmark/sp-coachmark-popover-content.js';
```

When looking to leverage the `CoachmarkPopover` or `CoachmarkPopoverContent` base class as a type and/or for extension purposes, do so via:

```
import { CoachmarkPopover } from '@spectrum-web-components/coachmark';
import { CoachmarkPopoverContent } from '@spectrum-web-components/coachmark';
```

## Standard

```html
<sp-coachmark-popover open>
    <sp-button>Hello world</sp-button>
    <sp-coachmark-popover-content
        slot="coachmark"
        primary-cta="Got it!"
        secondary-cta="Skip"
        step="1 of 3"
        heading="Learn about the world"
        content="The world has some explaining to do!"
    ></sp-coachmark-popover-content>
</sp-coachmark-popover>
```

## Events

An `<sp-coachmark-popover>` element will dispatch `sp-coachmark-opened` and `sp-coachmark-closed` events when it is opened or closed.
