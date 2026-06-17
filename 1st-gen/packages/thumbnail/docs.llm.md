---
component: thumbnail
tag: sp-thumbnail
package: '@spectrum-web-components/thumbnail'
source: 1st-gen/packages/thumbnail/README.md
generated: 2026-06-17T10:46:50.651Z
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `sp-thumbnail` can be used in a variety of locations as a way to display a preview of an image, layer, or effect.

### Usage

```zsh
yarn add @spectrum-web-components/thumbnail
```

Import the side effectful registration of `<sp-thumbnail>` via:

```js
import '@spectrum-web-components/thumbnail/sp-thumbnail.js';
```

When looking to leverage the `Thumbnail` base class as a type and/or for extension purposes, do so via:

```js
import { Thumbnail } from '@spectrum-web-components/thumbnail';
```

### Options

#### Sizes

```html
<sp-thumbnail size="50">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="75">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="100">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="200">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="300">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="400">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="500">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="600">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="700">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="800">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="900">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

```html
<sp-thumbnail size="1000">
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

#### Representing non-square content

By default, an `sp-thumbnail` will ensure that the entirety of the content that it respresents is visible by letterboxing that content with a checkerboard background when its aspect ratio is not square.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
  <sp-thumbnail>
    <img src="https://picsum.photos/300/400" alt="Demo Image" />
  </sp-thumbnail>

  <sp-thumbnail>
    <img src="https://picsum.photos/500/100" alt="Demo Image" />
  </sp-thumbnail>
</div>
```

The `background` attribute takes a string value of the CSS "background" property in order to customize the letterboxing.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
  <sp-thumbnail background="red">
    <img src="https://picsum.photos/300/400" alt="Demo Image" />
  </sp-thumbnail>

  <sp-thumbnail background="#00ff00">
    <img src="https://picsum.photos/500/100" alt="Demo Image" />
  </sp-thumbnail>
</div>
```

The `cover` attribute will cause the content to fill the space provided by the `sp-thumbnail` element:

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
  <sp-thumbnail cover>
    <img src="https://picsum.photos/300/400" alt="Demo Image" />
  </sp-thumbnail>

  <sp-thumbnail cover>
    <img src="https://picsum.photos/500/100" alt="Demo Image" />
  </sp-thumbnail>
</div>
```

#### Layer and Layer Selected

For when `sp-thumbail` is used in layer management (such as the Compact or Detail Layers panels). The thumbnail is given a thick blue border to indicate its selection when used in layer management.

```html
<div style="display: flex; gap: var(--spectrum-spacing-100);">
  <sp-thumbnail layer>
    <img src="https://picsum.photos/400/400" alt="Demo Image" />
  </sp-thumbnail>

  <sp-thumbnail layer selected>
    <img src="https://picsum.photos/500/100" alt="Demo Image" />
  </sp-thumbnail>
</div>
```

### States

#### Focused

When `focused` the `sp-thumbnail` element will be displayed as follows:

```html
<sp-thumbnail focused>
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

#### Disabled

Thumbnail should only be displayed as disabled if the entire component is also disabled.
When `disabled` the `sp-thumbnail` element will be displayed as follows:

```html
<sp-thumbnail disabled>
  <img src="https://picsum.photos/100/100" alt="Demo Image" />
</sp-thumbnail>
```

### Accessibility

`alt` attributes must be set on the `img` element inside of the `sp-thumbnail` element.
