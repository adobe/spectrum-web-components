## Overview

A `<sp-dropzone>` is an area on the screen into which an object can be dragged and dropped to accomplish a task. For example, a drop zone might be used in an upload workflow to enable the user to drop a file from their operating system into the drop zone, which is a more efficient and intuitive action than utilizing the standard "Choose File" dialog.

Drop zones should be used with an [illustrated message](/components/illustrated-message) component as a child if the drop zone is empty, otherwise the existing content should be passed as a child.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dropzone?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dropzone)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dropzone?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dropzone)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-q5adfsfk)

```zsh
yarn add @spectrum-web-components/dropzone
```

Import the side effectful registration of `<sp-dropzone>` via:

```js
import '@spectrum-web-components/dropzone/sp-dropzone.js';
```

When looking to leverage the `Dropzone` base class as a type and/or for extension purposes, do so via:

```js
import { Dropzone } from '@spectrum-web-components/dropzone';
```

### Anatomy

The `<sp-dropzone>` element consists of several key parts:

- An [illustrated message](/components/illustrated-message) child component that includes a heading, illustration and an optional body area.
- An optional action area that can be used to provide additional context to the heading, including a single button or links to prompt the user to take action.

### Examples

<sp-tabs selected="with-links" auto label="Dropzone examples">
<sp-tab value="with-links">Call to action with links</sp-tab>
<sp-tab-panel value="with-links">

```html
<sp-dropzone id="dropzone-1" style="width: 400px;">
    <sp-illustrated-message heading="Drag and drop your file">
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

    <div>
        <label for="file-input">
            <sp-link
                href="javascript:;"
                onclick="this.parentElement.nextElementSibling.click()"
            >
                Select a File
            </sp-link>
            from your computer
        </label>
        <input type="file" id="file-input" style="display: none" />
    </div>
    <div>
        or
        <sp-link href="http://stock.adobe.com" target="blank">
            Search Adobe Stock
        </sp-link>
    </div>
</sp-dropzone>
```

</sp-tab-panel>
<sp-tab value="with-button">Call to action with button</sp-tab>
<sp-tab-panel value="with-button">

```html
<sp-dropzone id="dropzone-1" style="width: 400px;">
    <sp-illustrated-message
        heading="Drag and drop your file"
        description="Or browse files on your computer"
    >
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

    <sp-button variant="accent">Browse files</sp-button>
</sp-dropzone>
```

</sp-tab-panel>
</sp-tabs>

### States

<sp-tabs selected="dragged" auto label="Dropzone states">
<sp-tab value="dragged">Dragged</sp-tab>
<sp-tab-panel value="dragged">

When a file is dragged over the `<sp-dropzone>` element, it will display with the `dragged` attribute, as follows:

```html
<sp-dropzone id="dropzone" dragged style="width: 400px;">
    <sp-illustrated-message heading="Drag and drop your file">
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

    <div>
        <label for="file-input">
            <sp-link
                href="javascript:;"
                onclick="this.parentElement.nextElementSibling.click()"
            >
                Select a File
            </sp-link>
            from your computer
        </label>
        <input type="file" id="file-input" style="display: none" />
    </div>
    <div>
        or
        <sp-link href="http://stock.adobe.com" target="blank">
            Search Adobe Stock
        </sp-link>
    </div>
</sp-dropzone>
```

</sp-tab-panel>
<sp-tab value="filled">Filled</sp-tab>
<sp-tab-panel value="filled">

When the `<sp-dropzone>` is in a filled state, set the `filled` attribute, as follows:

```html-live

<sp-action-button draggable="true" style="margin-block-end: 16px;">
    Drag me
</sp-action-button>
<sp-dropzone tabindex="0" id="dropzone" drop-effect="copy">
    <sp-illustrated-message style="--mod-illustrated-message-display: flex;" heading="Drag and drop your file" id="message">
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
    <div>
        <label for="file-input">
            <sp-link
                href="javascript:;"
                onclick="this.parentElement.nextElementSibling.click()"
            >
                Select a File
            </sp-link>
            from your computer
        </label>
        <input type="file" id="file-input" style="display: none" />
    </div>
    <div>
        or
        <sp-link href="http://stock.adobe.com" target="blank">
            Search Adobe Stock
        </sp-link>
    </div>
</sp-dropzone>

<script type="module">
    customElements.whenDefined('sp-dropzone').then(() => {
        const dropzone = document.getElementById('dropzone');
        const message = document.getElementById('message');
        const fileInput = document.getElementById('file-input');
        let input;
        let beingDraggedOver = false;

        const updateMessage = () => {
            message.heading = input !== undefined
                ? (beingDraggedOver ? 'Drop here to replace!' : 'You dropped something!')
                : 'Drag and drop your file';
        };

        const handleDropOrChange = () => {
            input = 'mock-file';
            dropzone.setAttribute("filled", true);
            beingDraggedOver = false;
            updateMessage();
        };

        dropzone.addEventListener('dragover', (event) => {
            event.preventDefault();
            beingDraggedOver = true;
            updateMessage();
        });

        dropzone.addEventListener('dragleave', () => {
            beingDraggedOver = false;
            updateMessage();
        });

        dropzone.addEventListener('drop', (event) => {
            event.preventDefault();
            handleDropOrChange();
        });

        fileInput.addEventListener('change', handleDropOrChange);
    });
</script>

```

<script type="module">
    customElements.whenDefined('sp-dropzone').then(() => {
        const dropzone = document.getElementById('dropzone');
        const message = document.getElementById('message');
        const fileInput = document.getElementById('file-input');
        let input;
        let beingDraggedOver = false;

        const updateMessage = () => {
            message.heading = input !== undefined
                ? (beingDraggedOver ? 'Drop here to replace!' : 'You dropped something!')
                : 'Drag and drop your file';
        };

        const handleDropOrChange = () => {
            input = 'mock-file';
            dropzone.setAttribute("filled", true);
            beingDraggedOver = false;
            updateMessage();
        };

        dropzone.addEventListener('dragover', (event) => {
            event.preventDefault();
            beingDraggedOver = true;
            updateMessage();
        });

        dropzone.addEventListener('dragleave', () => {
            beingDraggedOver = false;
            updateMessage();
        });

        dropzone.addEventListener('drop', (event) => {
            event.preventDefault();
            handleDropOrChange();
        });

        fileInput.addEventListener('change', handleDropOrChange);
    });
</script>

</sp-tab-panel>
</sp-tabs>

### Accessibility

When actions, e.g. copy/paste, can be enacted directly on the `<sp-dropzone>` element itself, be sure to supply a `tabindex` so that keyboard users can find this interaction in the tab order. For screen readers, be sure to announce what the actions are, how to complete them, and when they are completed by supplying the appropriate `role` and `aria-label` attributes.

#### Include a label

A button is required to have either a visible text label or a `label` attribute on either the `<sp-button>` itself
or on an `<sp-icon*>` element child.

#### Keyboard navigation

- `Tab`: Moves focus into the dropzone only when button or link is present.
- `Enter` or `Space`: Activates the button or link.
