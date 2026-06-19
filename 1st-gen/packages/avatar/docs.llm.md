---
component: avatar
tag: sp-avatar
package: '@spectrum-web-components/avatar'
source: 1st-gen/packages/avatar/README.md
generator: scripts/generate-llm-docs.mjs
---

## Overview

An `<sp-avatar>` is a thumbnail representation of an entity, such as a user or an organization. Avatars can have a defined image, which is usually uploaded by a user.

[View the design documentation for this component.](https://spectrum.adobe.com/page/avatar/)

### Usage

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

```html
<sp-avatar
  size="50"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="75"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="100"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="200"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="300"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="400"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="500"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="600"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
html
<sp-avatar
  size="700"
  label="Demo User"
  src="https://picsum.photos/500/500"
></sp-avatar>
```

### States

#### Generic avatars

Use branded generic avatars when a user has not set their avatar image. These images are designed to be abstracted from all genders, locales, and cultures.

#### Disabled

An avatar in a disabled state shows that an avatar exists, but is not available or a user is not active in that circumstance. This can be used to maintain layout continuity and communicate that an avatar may become available or active later.

### Accessibility

The `<sp-avatar>` component requires proper accessibility attributes to ensure screen readers can appropriately handle the avatar image.

#### Labeled avatars

The `label` attribute of the `<sp-avatar>` will be passed into the `<img>` element as the `alt` attribute for use in defining a textual representation of the image displayed. This is the recommended approach for avatars that convey meaningful information.

```html
<sp-avatar label="John Doe" src="https://picsum.photos/500/500"></sp-avatar>
```

#### Decorative avatars

When an avatar is purely decorative and does not convey meaningful information, use the `is-decorative` attribute to mark it as decorative. This will hide the avatar from screen readers with `alt=""` and `aria-hidden="true"`.

```html
<sp-avatar is-decorative src="https://picsum.photos/500/500"></sp-avatar>
```

#### Linked avatars

When an avatar has an `href` attribute, it becomes a link and requires an accessible name. Provide a `label` attribute to give the link meaningful text for screen readers.

```html
<sp-avatar
  label="View John Doe's profile"
  src="https://picsum.photos/500/500"
  href="https://adobe.com"
></sp-avatar>
```

**Note**: Decorative avatars should typically not be interactive links. If you need a decorative avatar with a link, you must provide a `label` attribute for accessibility compliance.
