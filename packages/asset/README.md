## Description

Use an `<sp-asset>` element to visually represent a file, folder or image in your application. File and folder representations will center themselves horizontally and vertically in the space provided to the element. Images will be contained to the element, growing to the element's full height while centering itself within the width provided.

### Installation

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/asset?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/asset)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/asset?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/asset)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/CdMbDDjxdnvVyMlGrrJj/src/index.ts)

```
yarn add @spectrum-web-components/asset
```

Import the side effectful registration of `<sp-asset>` via:

```
import '@spectrum-web-components/asset/sp-asset.js';
```

When looking to leverage the `Asset` base class as a type and/or for extension purposes, do so via:

```
import { Asset } from '@spectrum-web-components/asset';
```

## Example

```html
<sp-asset style="height: 128px">
    <img src="https://place.dog/500/500" alt="Demo Image" />
</sp-asset>
```

### File

```html
<div class="flex">
    <sp-asset variant="file"></sp-asset>
    <sp-asset variant="file" label="Named File Asset"></sp-asset>
</div>
```

### Folder

```html
<div class="flex">
    <sp-asset variant="folder"></sp-asset>
    <sp-asset variant="folder" label="Named Folder Asset"></sp-asset>
</div>
```
