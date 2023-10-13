## Description

`sp-coachmark` is a temporary message that educates users through new or unfamiliar product experiences. They can be chained into a sequence to form a tour.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Z611FV1zeF0CLBLVHNFY/src/index.ts)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coachmark-popover>` & `<sp-coachmark>` via:

```
import '@spectrum-web-components/coachmark/sp-coachmark-popover.js';
import '@spectrum-web-components/coachmark/sp-coachmark.js';

```

When looking to leverage the `Coachmark` base class as a type and/or for extension purposes, do so via:

```
import { CoachmarkPopover, Coachmark } from '@spectrum-web-components/coachmark';
```

## Example

### Default

Coach marks are in a tour when the primary action of one coach mark will lead to the display of another. When in a tour, a coach mark should have “Previous” and “Next” buttons as well as a step counter. When not in a tour, a coach mark should not have “Previous” and “Next” buttons nor a step counter.

Coach marks in a tour should always have a step counter to display progress and show how many steps are left. A coach mark can have more ways to move through a tour, such as “Skip tour” or “Restart tour” actions that are always placed within the more actions menu.

```html
<sp-coachmark placement="right" open>
    <sp-coachmark-popover
        open
        currentstep="2"
        totalsteps="8"
        primary-cta="Next"
        secondary-cta="Previous"
    >
        <div slot="title">Coachmark with Text Only</div>
        <div slot="content">
            This is a Coachmark with nothing but text in it. Kind of lonely in
            here.
        </div>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### with More Actions

All coach marks can include a more actions button. This appears on the top right of the coach mark. When the more actions button is in the down/touch state, the more actions menu is shown. The more actions menu should only include ways to interact with the tour as a whole, such as “Skip tour” and “Restart tour.”

```html
<sp-coachmark placement="right" open>
    <sp-coachmark-popover
        open
        currentstep="2"
        totalsteps="8"
        primary-cta="Next"
        secondary-cta="Previous"
    >
        <div slot="title">Coachmark with Text Only</div>
        <div slot="content">
            This is a Coachmark with nothing but text in it. Kind of lonely in
            here.
        </div>
        <sp-action-menu placement="bottom-end" quiet slot="actions">
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### single

The primary action should be brief and consistent. Use "OK" for a single coach mark. This Coachmark is not in a tour. So steps and actions buttons will not be there.

```html
<sp-coachmark placement="right" open>
    <sp-coachmark-popover open primary-cta="Ok">
        <div slot="title">A single coachmark</div>
        <div slot="content">
            This is a Coachmark with nothing but text in it. Kind of lonely in
            here.
        </div>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### trigger open coachmark on click

The primary action should be brief and consistent. Use "OK" for a single coach mark. This Coachmark is not in a tour. So steps and actions buttons will not be there.

```html
<sp-coachmark placement="right" triggerInteraction="click">
    <sp-coachmark-popover primary-cta="Ok">
        <div slot="title">A single coachmark</div>
        <div slot="content">
            This is a Coachmark with nothing but text in it. Kind of lonely in
            here.
        </div>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### User Action Dependent

Coach marks in a tour can be dependent on a user taking an action. When coach marks are action dependent, the “next step” button should be removed since the next step will be triggered by an action. This ensures that a user can learn by taking an action, rather than just reading about it. Unless the tour is skipped, restarted, or moved back to the previous step, this will persist until the user takes a corresponding action. For example, if a coach mark is educating a user about a shared library, it will persist until the user opens the Library panel.

```html
<sp-coachmark placement="right" open>
    <sp-coachmark-popover
        open
        currentstep="2"
        totalsteps="8"
        primary-cta="Asset added"
        secondary-cta="Previous"
    >
        <div slot="title">Coachmark with user action</div>
        <div slot="content">
            This is a Coachmark with nothing but text in it. Kind of lonely in
            here.
        </div>
        <sp-action-menu placement="bottom-end" quiet slot="actions">
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### with Media

Coach marks can contain images or videos that relate to their content, such as demonstrations of gestures, the feature being used, or illustrations.

```html
<sp-coachmark placement="right" open>
    <sp-coachmark-popover
        currentstep="2"
        totalsteps="8"
        open
        primary-cta="Next"
        secondary-cta="Previous"
        src="https://picsum.photos/id/237/200/300"
        media-type="image"
    >
        <div slot="title">Coachmark with 16:9 image</div>
        <div slot="content">This is a Coachmark with some description</div>
        <sp-action-menu placement="bottom-end" quiet slot="actions">
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

### with Keyboard Shortcut

A coach marks can contain a keyboard shortcut that relates to its content, such as a tool or action that can be used. When the more action buttons is present, the keyboard shortcut is placed under the title.

```html
<sp-coachmark placement="right" open id="coachmark-keys">
    <sp-coachmark-popover
        open
        currentstep="2"
        totalsteps="8"
        primary-cta="Next"
        secondary-cta="Previous"
    >
        <div slot="title">Coachmark with Keyboard Shortcut</div>
        <div slot="content">This is a Coachmark with some description</div>
        <sp-action-menu placement="bottom-end" quiet slot="actions">
            <sp-menu-item>Skip tour</sp-menu-item>
            <sp-menu-item>Restart tour</sp-menu-item>
        </sp-action-menu>
    </sp-coachmark-popover>
    <sp-coach-indicator slot="trigger"></sp-coach-indicator>
</sp-coachmark>
```

<script type="module">
    const initCoachMark = () => {
        const coachmark = document.querySelector('#coachmark-keys');
        coachmark.renderItem = () => {
            const coachmarkPopover = document.querySelector('sp-coachmark-popover');
            coachmarkPopover.modifierKeys = ['⇧ Shift', '⌘']
            return coachmarkPopover
        }
    };
    customElements.whenDefined('sp-coachmark#coachmark-keys').then(() => {
        initCoachMark();
    });
</script>
