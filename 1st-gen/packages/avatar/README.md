## Overview

An `<sp-avatar>` is a thumbnail representation of an entity, such as a user or an organization. Avatars can have a defined image, which is usually uploaded by a user.

[View the design documentation for this component.](https://spectrum.adobe.com/page/avatar/)

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/avatar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/avatar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/avatar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/avatar)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-swzc3ix8)

```zsh
yarn add @spectrum-web-components/avatar
```

Import the side effectful registration of `<sp-avatar>` via:

```js
import '@spectrum-web-components/avatar/sp-avatar.js';
```

When looking to leverage the `Avatar` base class as a type and/or for extension purposes, do so via:

```js
import { Avatar } from '@spectrum-web-components/avatar';
```

### Options

#### Sizes

Avatar sizes scale exponentially, based on the Spectrum type scale. These range from `size-50` to `size-700`. An avatar can also be customized to fit appropriately for your context. The default size is `size-100`.

<sp-tabs selected="100" auto label="Size Attribute Options">
<sp-tab value="50">50</sp-tab>
<sp-tab-panel value="50">

```html demo
<sp-avatar
    size="50"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="75">75</sp-tab>
<sp-tab-panel value="75">

```html demo
<sp-avatar
    size="75"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="100">100</sp-tab>
<sp-tab-panel value="100">

```html demo
<sp-avatar
    size="100"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="200">200</sp-tab>
<sp-tab-panel value="200">

```html demo
<sp-avatar
    size="200"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="300">300</sp-tab>
<sp-tab-panel value="300">

```html demo
<sp-avatar
    size="300"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="400">400</sp-tab>
<sp-tab-panel value="400">

```html demo
<sp-avatar
    size="400"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="500">500</sp-tab>
<sp-tab-panel value="500">

```html demo
<sp-avatar
    size="500"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="600">600</sp-tab>
<sp-tab-panel value="600">

```html demo
<sp-avatar
    size="600"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
<sp-tab value="700">700</sp-tab>
<sp-tab-panel value="700">

```html demo
<sp-avatar
    size="700"
    label="Demo User"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

</sp-tab-panel>
</sp-tabs>

### States

#### Generic avatars

Use branded generic avatars when a user has not set their avatar image. These images are designed to be abstracted from all genders, locales, and cultures.

#### Disabled

An avatar in a disabled state shows that an avatar exists, but is not available or a user is not active in that circumstance. This can be used to maintain layout continuity and communicate that an avatar may become available or active later.

### Accessibility

The `label` attribute of the `<sp-avatar>` will be passed into the `<img>` element as the `alt` tag for use in defining a textual representation of the image displayed.
