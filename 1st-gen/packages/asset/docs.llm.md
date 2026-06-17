---
component: asset
tag: sp-asset
package: '@spectrum-web-components/asset'
source: 1st-gen/packages/asset/README.md
generated: 2026-06-17T10:49:38.838Z
generator: scripts/generate-llm-docs.mjs
---

## Description

Use an `<sp-asset>` element to visually represent a file, folder or image in your application. File and folder representations will center themselves horizontally and vertically in the space provided to the element. Images will be contained to the element, growing to the element's full height while centering itself within the width provided.

### Installation

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
  <img src="https://picsum.photos/500/500" alt="Demo Image" />
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
