## Overview

`<sp-coachmark>` is a temporary message that educates users through new or unfamiliar product experiences. They can be chained into a sequence to form a tour.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-bjc5l3pv)

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

### Anatomy

The coachmark consists of several key parts:

- A title (via `slot="title"`)
- Content (via `slot="content"`)
- Optional action menu (via `slot="actions"`)
- Optional media content (via `slot="asset"` or `src` attribute)
- Navigation controls (via `primary-cta` and `secondary-cta` attributes)
- Tour progress indicators (via `current-step` and `total-steps` attributes)
- Optional keyboard shortcuts (via `modifierKeys` and `shortcutKey` properties)

Here's a complete example showing the anatomy:

```html
<sp-coachmark
    current-step="2"
    total-steps="8"
    open
    primary-cta="Next"
    secondary-cta="Previous"
>
    <!-- Title -->
    <div slot="title">Welcome to the Tour</div>

    <!-- Main content -->
    <div slot="content">
        This coachmark demonstrates the various parts that make up the
        component.
    </div>

    <!-- Media content -->
    <img
        slot="asset"
        src="https://picsum.photos/id/237/200/300"
        alt="Feature demonstration"
    />

    <!-- Action menu -->
    <sp-action-menu
        slot="actions"
        label="More Actions"
        placement="bottom-end"
        quiet
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
```

### Options

<sp-tabs selected="navigation" auto label="Coachmark Options">
<sp-tab value="navigation">Navigation</sp-tab>
<sp-tab-panel value="navigation">

The `primary-cta` and `secondary-cta` attributes are used to display navigation buttons.

```html
<sp-coachmark
    id="coachmark-navigation"
    open
    primary-cta="Next"
    secondary-cta="Previous"
>
    <div slot="title">Coachmark with navigation</div>
    <div slot="content">
        This coachmark demonstrates the navigation buttons.
    </div>
    <!-- Action menu -->
    <sp-action-menu
        slot="actions"
        label="More Actions"
        placement="bottom-end"
        quiet
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
```

</sp-tab-panel>
<sp-tab value="progress-indicator">Progress Indicator</sp-tab>
<sp-tab-panel value="progress-indicator">

The `current-step` and `total-steps` attributes are used to display a progress indicator.

```html
<sp-coachmark
    id="coachmark-progress"
    open
    current-step="2"
    total-steps="8"
    primary-cta="Next"
    secondary-cta="Previous"
>
    <div slot="title">Coachmark with progress indicator</div>
    <div slot="content">
        This coachmark demonstrates the progress indicator.
    </div>
    <!-- Action menu -->
    <sp-action-menu
        slot="actions"
        label="More Actions"
        placement="bottom-end"
        quiet
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
```

</sp-tab-panel>
<sp-tab value="keyboard">Keyboard Shortcuts</sp-tab>
<sp-tab-panel value="keyboard">

The `shortcut-key` is the primary key used to trigger an interaction and are typically an alphanumeric value (and thus will be rendered as an uppercase character).

```html-live
<sp-coachmark
    open
    current-step="2"
    total-steps="8"
    primary-cta="Next"
    secondary-cta="Previous"
    shortcut-key="⌘"
>
    <div slot="title">Shortcut Key</div>
    <div slot="content">This coachmark demonstrates the shortcut key.</div>

    <!-- Action menu -->
    <sp-action-menu
        slot="actions"
        label="More Actions"
        placement="bottom-end"
        quiet
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
```

</sp-tab-panel>
<sp-tab value="modifier-keys">Modifier Keys</sp-tab>
<sp-tab-panel value="modifier-keys">

The `modifierKeys` is an array of modifier keys used to trigger an interaction. This is not an attribute, but a property so we need to set it via JavaScript.

```html-live
<sp-coachmark
    open
    current-step="2"
    total-steps="8"
    primary-cta="Next"
    secondary-cta="Previous"
    id="coachmark-keys"
>
    <div slot="title">Coachmark with modifier keys</div>
    <div slot="content">This coachmark demonstrates the modifier keys.</div>
    <!-- Action menu -->
    <sp-action-menu
        slot="actions"
        label="More Actions"
        placement="bottom-end"
        quiet
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
<script type="module">
    const initCoachMark = () => {
        const coachmark = document.querySelector('#coachmark-keys');
        const modifierKeys = ['⇧ Shift', '⌘'];
        coachmark.modifierKeys = modifierKeys;
    };
    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-coachmark').then(() => {
            initCoachMark();
        });
    });
</script>
```

<script type="module">
    const initCoachMark = () => {
        const coachmark = document.querySelector('#coachmark-keys');
        const modifierKeys = ['⇧ Shift', '⌘'];
        const content = {
            title: 'I am a Coachmark with keys',
            description: 'This is a Coachmark with nothing but text in it.',
        };
        coachmark.content = content;
        coachmark.modifierKeys = modifierKeys;
    };
    customElements.whenDefined('code-example').then(() => {
        customElements.whenDefined('sp-coachmark').then(() => {
            initCoachMark();
        });
    });
</script>

</sp-tab-panel>
</sp-tabs>

### Behaviours

User action-dependent coachmarks are designed to guide users based on their interactions within your application. In such cases, there is no "Next Step" button, as the coachmark progresses when the user takes a specific action. This allows users to learn by doing, rather than simply reading instructions. The coachmark remains until the user performs the required action or takes an alternative route in the tour, such as skipping, restarting, or moving back to a previous step.

Inside the `<sp-coachmark>`, add the content and instructions for the coachmark in the `<sp-coachmark>`. You can also define primary and secondary CTA buttons for user interaction.

```html
<sp-coachmark
    id="coachmark-action"
    open
    current-step="2"
    total-steps="8"
    primary-cta="Asset added"
    secondary-cta="Previous"
>
    <div slot="title">Coachmark with user action</div>
    <div slot="content">
        This coachmark waits for the user to complete a specific action.
    </div>
    <sp-action-menu
        label="More Actions"
        placement="bottom-end"
        quiet
        slot="actions"
    >
        <sp-menu-item>Skip tour</sp-menu-item>
        <sp-menu-item>Restart tour</sp-menu-item>
    </sp-action-menu>
</sp-coachmark>
```

### Accessibility

Coachmarks should be designed with accessibility in mind:

- Always provide clear, concise title and content text
- Use descriptive labels for navigation buttons
- Ensure keyboard navigation works for multi-step tours
- Make sure images have appropriate alt text
- Consider focus management during tour progression

For users that rely on screen readers, coachmarks announce their presence and content appropriately. The component manages focus to ensure users can navigate through the tour using only a keyboard.
