## Overview

`sp-dialog` displays important information that users need to acknowledge. They appear over the interface and block further interactions. When used directly the `sp-dialog` element surfaces a `slot` based API for deep customization of the content to be included in the overlay.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/dialog?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/dialog)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/dialog?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/dialog)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/RSDikStPmUPSioVpCsYb/src/index.ts)

```bash
yarn add @spectrum-web-components/dialog
```

Import the side effectful registration of `<sp-dialog>` via:

```ts
import '@spectrum-web-components/dialog/sp-dialog.js';
```

When looking to leverage the `Dialog` base class as a type and/or for extension purposes, do so via:

```ts
import { Dialog } from '@spectrum-web-components/dialog';
```
