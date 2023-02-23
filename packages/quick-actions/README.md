## Description

`<sp-quick-actions>` allow users to perform contextual actions when hovering or focusing on a specific component. They're shortcuts meant to make workflows more efficient. Spectrum guidelines suggest a `<sp-quick-action>` element feature only text buttons OR only icon buttons, and never both.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/quick-actions?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/quick-actions)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/quick-actions?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/quick-actions)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/pDSD7CSeA3B5hTdX8cvB/src/index.ts)

```
yarn add @spectrum-web-components/quick-actions
```

Import the side effectful registration of `<sp-quick-actions>` via:

```
import '@spectrum-web-components/quick-actions/sp-quick-actions.js';
```

When looking to leverage the `QuickActions` base class as a type and/or for extension purposes, do so via:

```
import { QuickActions } from '@spectrum-web-components/quick-actions';
```

## Example

```html
<div
    style="padding: 2em; background-color: var(--spectrum-transparent-black-300);"
>
    <sp-quick-actions opened>
        <sp-action-button quiet label="Info">
            <sp-icon-info slot="icon"></sp-icon-info>
        </sp-action-button>
        <sp-action-button quiet label="Magnify">
            <sp-icon-magnify slot="icon"></sp-icon-magnify>
        </sp-action-button>
        <sp-action-button quiet label="Star">
            <sp-icon-star slot="icon"></sp-icon-star>
        </sp-action-button>
    </sp-quick-actions>
</div>
```

### Text Only

When the buttons have text only, be sure to include the `text-only` attribute to ensure correct layout of your actions.

```html
<div
    style="padding: 2em; background-color: var(--spectrum-transparent-black-300);"
>
    <sp-quick-actions opened text-only>
        <sp-action-button quiet>Edit</sp-action-button>
        <sp-action-button quiet>Copy</sp-action-button>
        <sp-action-button quiet>Delete</sp-action-button>
    </sp-quick-actions>
</div>
```
