## Description

An `<sp-avatar>` is a great way to feature a visual representation of a user.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@lliad-ui/avatar?style=for-the-badge)](https://www.npmjs.com/package/@lliad-ui/avatar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@lliad-ui/avatar?style=for-the-badge)](https://bundlephobia.com/result?p=@lliad-ui/avatar)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/i3gAnjAfQVC43ypsIyw8/src/index.ts)

```
yarn add @lliad-ui/avatar
```

Import the side effectful registration of `<sp-avatar>` via:

```
import '@lliad-ui/avatar/sp-avatar.js';
```

When looking to leverage the `Avatar` base class as a type and/or for extension purposes, do so via:

```
import { Avatar } from '@lliad-ui/avatar';
```

## Example

```html
<sp-avatar label="Dog the User" src="https://place.dog/500/500"></sp-avatar>
```

## Accessibility

The `label` attribute of the `<sp-avatar>` will be passed into the `<img>` element as the `alt` tag for use in defining a textual representation of the image displayed.
