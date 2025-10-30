## Overview

An `<sp-illustrated-message>` displays an outline illustration and a message, usually in an empty state or on an error page. It is also used inside a [DropZone](/components/dropzone).

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/illustrated-message?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/illustrated-message)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/illustrated-message?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/illustrated-message)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-qrvmdaws)

```zsh
yarn add @spectrum-web-components/illustrated-message
```

Import the side effectful registration of `<sp-illustrated-message>` via:

```js
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
```

When looking to leverage the `IllustratedMessage` base class as a type and/or for extension purposes, do so via:

```js
import { IllustratedMessage } from '@spectrum-web-components/illustrated-message';
```

### Anatomy

An illustrated message consists of the following parts:

- An **outline illustration** that supports the messaging. The illustrated message accepts an `<svg>` into its default slot. This SVG is displayed as an illustration above the heading and description.
- A required **heading** that appears in bold below the illustration, using a few words to convey what a user needs to do or know about.
- An optional **body area** that elaborates on the heading and offers more information about how to complete the interaction, including buttons or links to show the user what to do next.

### Examples

<sp-tabs selected="call-to-action-with-link" auto label="Illustrated message examples">
<sp-tab value="call-to-action-with-link">Call to action with link</sp-tab>
<sp-tab-panel value="call-to-action-with-link">

```html
<sp-illustrated-message heading="Drag and Drop Your File">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        width="200"
        height="100"
    >
        <defs>
            <style>
                .cls-1,
                .cls-2 {
                    fill: none;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                }
                .cls-1 {
                    stroke-width: 3px;
                }
                .cls-2 {
                    stroke-width: 2px;
                }
            </style>
        </defs>
        <path
            class="cls-1"
            d="M110.53,85.66,100.26,95.89a1.09,1.09,0,0,1-1.52,0L88.47,85.66"
        ></path>
        <line class="cls-1" x1="99.5" y1="95.5" x2="99.5" y2="58.5"></line>
        <path class="cls-1" d="M105.5,73.5h19a2,2,0,0,0,2-2v-43"></path>
        <path
            class="cls-1"
            d="M126.5,22.5h-19a2,2,0,0,1-2-2V1.5h-31a2,2,0,0,0-2,2v68a2,2,0,0,0,2,2h19"
        ></path>
        <line class="cls-1" x1="105.5" y1="1.5" x2="126.5" y2="22.5"></line>
        <path
            class="cls-2"
            d="M47.93,50.49a5,5,0,1,0-4.83-5A4.93,4.93,0,0,0,47.93,50.49Z"
        ></path>
        <path
            class="cls-2"
            d="M36.6,65.93,42.05,60A2.06,2.06,0,0,1,45,60l12.68,13.2"
        ></path>
        <path
            class="cls-2"
            d="M3.14,73.23,22.42,53.76a1.65,1.65,0,0,1,2.38,0l19.05,19.7"
        ></path>
        <path
            class="cls-1"
            d="M139.5,36.5H196A1.49,1.49,0,0,1,197.5,38V72A1.49,1.49,0,0,1,196,73.5H141A1.49,1.49,0,0,1,139.5,72V32A1.49,1.49,0,0,1,141,30.5H154a2.43,2.43,0,0,1,1.67.66l6,5.66"
        ></path>
        <rect
            class="cls-1"
            x="1.5"
            y="34.5"
            width="58"
            height="39"
            rx="2"
            ry="2"
        ></rect>
    </svg>
    <p slot="description">
        <sp-link href="#">Select a file</sp-link>
        from your computer.
    </p>
</sp-illustrated-message>
```

</sp-tab-panel>
<sp-tab value="call-to-action-with-buttons">Call to action with buttons</sp-tab>
<sp-tab-panel value="call-to-action-with-buttons">

```html
<sp-illustrated-message heading="Error 404: Page not found">
    <div slot="description">
        <p>
            This page isn't available. Try checking the URL or visit a different
            page.
        </p>
        <sp-button-group style="--mod-buttongroup-justify-content: center;">
            <sp-button treatment="outline" variant="primary">Back</sp-button>
            <sp-button treatment="fill" variant="primary">Refresh</sp-button>
        </sp-button-group>
    </div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 103"
        width="150"
        height="103"
    >
        <path
            d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
        ></path>
    </svg>
</sp-illustrated-message>
```

</sp-tab-panel>
<sp-tab value="informative">Informative</sp-tab>
<sp-tab-panel value="informative">

```html
<sp-illustrated-message
    heading="Error 404: Page not found"
    description="This page isn't available. Try checking the URL or visit a different page."
>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 103"
        width="150"
        height="103"
        viewBox="0 0 150 103"
    >
        <path
            d="M133.7,8.5h-118c-1.9,0-3.5,1.6-3.5,3.5v27c0,0.8,0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5V23.5h119V92c0,0.3-0.2,0.5-0.5,0.5h-118c-0.3,0-0.5-0.2-0.5-0.5V69c0-0.8-0.7-1.5-1.5-1.5s-1.5,0.7-1.5,1.5v23c0,1.9,1.6,3.5,3.5,3.5h118c1.9,0,3.5-1.6,3.5-3.5V12C137.2,10.1,135.6,8.5,133.7,8.5z M15.2,21.5V12c0-0.3,0.2-0.5,0.5-0.5h118c0.3,0,0.5,0.2,0.5,0.5v9.5H15.2z M32.6,16.5c0,0.6-0.4,1-1,1h-10c-0.6,0-1-0.4-1-1s0.4-1,1-1h10C32.2,15.5,32.6,15.9,32.6,16.5z M13.6,56.1l-8.6,8.5C4.8,65,4.4,65.1,4,65.1c-0.4,0-0.8-0.1-1.1-0.4c-0.6-0.6-0.6-1.5,0-2.1l8.6-8.5l-8.6-8.5c-0.6-0.6-0.6-1.5,0-2.1c0.6-0.6,1.5-0.6,2.1,0l8.6,8.5l8.6-8.5c0.6-0.6,1.5-0.6,2.1,0c0.6,0.6,0.6,1.5,0,2.1L15.8,54l8.6,8.5c0.6,0.6,0.6,1.5,0,2.1c-0.3,0.3-0.7,0.4-1.1,0.4c-0.4,0-0.8-0.1-1.1-0.4L13.6,56.1z"
        ></path>
    </svg>
</sp-illustrated-message>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

The `<sp-illustrated-message>` component provides a semantic structure for displaying illustrated content with proper heading hierarchy. However, there are several considerations to keep in mind for accessibility:

- **Always include a clear, standalone heading.** All illustrated messages must include a heading or title. This heading communicates the result of why the UI is appearing in the way that it is. If included, the description elaborates on the heading and offers more information.
- **Ensure that text and image work together.** The illustration within an illustrated message adds value to the language that it’s paired with, and vice versa. An illustration’s meaning should be readily clear, contextual, and relevant to the overall message described in the text.
- **Provide actionable solutions.** Offer an actionable solution when possible by using [links](/components/link) or [buttons](/components/button).
- **Make error codes meaningful and contextual.** If an illustrated message is for an error state, use the heading to summarize the error. Only include an error code or other technical information if it’s useful and relevant for the user. Put the error code either at the beginning of the heading using a colon, or at the end of the message using parentheses; don’t hide it in the middle of the heading or bury it in the description.
