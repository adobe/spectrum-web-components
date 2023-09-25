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
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';
```

When looking to leverage the `Coachmark` or `CoachIndicator` base class as a type and/or for extension purposes, do so via:

```
import { Coachmark, CoachIndicator } from '@spectrum-web-components/coachmark';
```

## Standard CoachIndicator

```html
<sp-coach-indicator></sp-coach-indicator>
<sp-coach-indicator variant="dark"></sp-coach-indicator>
<sp-coach-indicator variant="light"></sp-coach-indicator>
```

## Quiet CoachIndicator

```html
<sp-coach-indicator quiet></sp-coach-indicator>
<sp-coach-indicator quiet variant="dark"></sp-coach-indicator>
<sp-coach-indicator quiet variant="light"></sp-coach-indicator>
```

## Default

```html
<div style="position: relative;height: 230px;">
    <sp-coach-indicator></sp-coach-indicator>
    <sp-popover open style="--mod-popover-content-area-spacing-vertical:0">
        <sp-coachmark currentStep="1" totalSteps="8">
            <div slot="title">Try playing with a pixel brush</div>
            Pixel brushes use pixels to create brush strokes, just like in other
            design and drawing tools. Start drawing, and zoom in to see the
            pixels in each stroke.
            <sp-action-menu placement="bottom-end" quiet slot="actions">
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    </sp-popover>
</div>
```

## With media

```html
<div style="position:relative; height:450px;">
    <sp-coach-indicator></sp-coach-indicator>
    <sp-popover open style="--mod-popover-content-area-spacing-vertical:0">
        <sp-coachmark currentStep="1" totalSteps="8">
            <div slot="title">Try playing with a pixel brush</div>
            Pixel brushes use pixels to create brush strokes, just like in other
            design and drawing tools. Start drawing, and zoom in to see the
            pixels in each stroke.
            <img
                slot="cover-photo"
                src="https://picsum.photos/id/18/200/300"
                alt="Demo"
            />
            <sp-action-menu placement="bottom-end" quiet slot="actions">
                <sp-menu-item>Skip tour</sp-menu-item>
                <sp-menu-item>Restart tour</sp-menu-item>
            </sp-action-menu>
        </sp-coachmark>
    </sp-popover>
</div>
```
