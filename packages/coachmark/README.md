## Description

Coachmark is the way to show temporary messages that educate users through new or unfamiliar product experiences. They can be chained into a sequence to form a tour..

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Z611FV1zeF0CLBLVHNFY/src/index.ts)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coachmark-trigger>` via:

```
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';

```

When looking to leverage the `CoachmarkTrigger` base class as a type and/or for extension purposes, do so via:

```
import { CoachmarkTrigger, CoachIndicator } from '@spectrum-web-components/coachmark';
```

## Example

```js
const item = {
    placement: 'right-start',
    heading: 'Tooltip with 16:9 image',
    content:
        'This is a Rich Tooltip with nothing but text in it. Kind of lonely in here.',
    src: 'https://picsum.photos/200/300',
    mediaType: 'image',
    currentStep: 2,
    totalSteps: 8,
    triggerInteraction: 'click',
};
```

```html-live
<sp-coachmark-trigger placement="right" triggerInteraction='click' .item=${item} open=${open}>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark-trigger>
```

<script type="module">
        const item = {
            placement: 'right-start',
            heading: 'Tooltip with 16:9 image',
            content:
                'This is a Rich Tooltip with nothing but text in it. Kind of lonely in here.',
            src: 'https://picsum.photos/id/237/200/300',
            mediaType: 'image',
            currentStep: 2,
            totalSteps: 8,
            triggerInteraction: 'click',
    };
    const initCoachMark = () => {
        const coachmark = document.querySelector('sp-coachmark-trigger');
        coachmark.item = item
        return coachmark
    };
    customElements.whenDefined('sp-coachmark-trigger').then(() => {
        initCoachMark();
    });
</script>
