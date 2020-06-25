## Description

An `<sp-avatar>` is a great way to feature a visual representation of a user.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/avatar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/avatar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/avatar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/avatar)

```
yarn add @spectrum-web-components/avatar
```

Import the side effectful registration of `<sp-avatar>` via:

```
import '@spectrum-web-components/avatar/sp-avatar.js';
```

When looking to leverage the `Avatar` base class as a type and/or for extension purposes, do so via:

```
import { Avatar } from '@spectrum-web-components/avatar';
```

## Example

```html
<sp-avatar label="Dog the User" src="https://placedog.net/500/500"></sp-avatar>
```

## Accessibility

The `label` attribute of the `<sp-avatar>` will be passed into the `<img>` element as the `alt` tag for use in defining a textual representation of the image displayed.
