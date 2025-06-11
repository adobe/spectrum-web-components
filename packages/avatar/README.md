## Description

An `<sp-avatar>` is a great way to feature a visual representation of a user.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/avatar?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/avatar)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/avatar?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/avatar)
[![Try it on Stackblitz](https://img.shields.io/badge/Try%20it%20on-Stackblitz-blue?style=for-the-badge)](https://stackblitz.com/edit/vitejs-vite-swzc3ix8)

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

## Sizes

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

## Accessibility

The Avatar component is designed to be accessible by default. To ensure proper accessibility:

1. Provide a `label` attribute when the avatar represents a user or has meaningful content:

```html
<sp-avatar
    label="Shantanu Narayen"
    src="https://picsum.photos/500/500"
></sp-avatar>
```

2. Use the `isdecorative` attribute when the avatar is purely decorative and should be hidden from screen readers:

```html
<sp-avatar isdecorative src="https://picsum.photos/500/500"></sp-avatar>
```

3. If neither `label` nor `isdecorative` is provided, a warning will be logged to the console to help developers identify accessibility issues.

### Accessibility Features

- When a `label` is provided, it is used as the `alt` text for the image
- When `isdecorative` is true, the avatar is hidden from screen readers using `aria-hidden="true"`
- The component maintains focus management for keyboard navigation
- Color contrast meets WCAG 2.1 Level AA requirements

### Accessibility Best Practices

- Always provide a `label` for avatars that represent users or have meaningful content
- Use `isdecorative` for purely decorative avatars
- Avoid using avatars without either a `label` or `isdecorative` attribute
- Ensure the avatar image has sufficient contrast with its background
- When using avatars in interactive contexts (e.g., as buttons), ensure they have appropriate ARIA roles and labels

### Best Practices

- Always provide a meaningful `label`
