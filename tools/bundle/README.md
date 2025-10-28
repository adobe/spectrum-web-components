## Overview

`@spectrum-web-components/bundle` is a master dependency that allows a project to import any and all of the Spectrum Web Components. While it is a great approach to prototyping, the fact that it versions all of the Spectrum Web Components packages collectively means that depending on it can leave you with a lot of package updates to manage at any one version change. For a more predictable upgrade process we suggest that you depend upon individual packages directly, but hope you find this bundle productive when initially trying to get into the act of developing with Spectrum Web Components.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/bundle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/bundle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/bundle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/bundle)

```bash
yarn add @spectrum-web-components/bundle
```

Import the side effectful registrations of the bundled components:

```javascript
import '@spectrum-web-components/bundle/elements.js';
```

When looking to leverage their base classes as a type and/or for extension purposes, do so via something like the following for the `ActionButton` base class:

```javascript
import { ActionButton } from '@spectrum-web-components/bundle';
```

### Anatomy

The bundle consists of several key parts:

- All Spectrum Web Component element registrations
- Base classes for all components available for type checking and extension
- Namespaced icon exports for UI and workflow icons

### Options

#### Component Registration

Import all component registrations at once for rapid prototyping:

```javascript
import '@spectrum-web-components/bundle/elements.js';
```

This registers all available Spectrum Web Components for use in your application.

#### Type Imports

Import individual component classes for type checking and extension purposes:

```javascript
import { ActionButton } from '@spectrum-web-components/bundle';
import { Button } from '@spectrum-web-components/bundle';
import { Tooltip } from '@spectrum-web-components/bundle';
```

### Behaviors

#### Icon Handling

While this bundle directly re-exports the majority of functionality as they would be exported from their own packages, icon packages that export template literals are handled differently. Due to the large number of exports that they feature, each of these packages is namespaced when included in the bundle.

##### UI Icons

`@spectrum-web-components/icons-ui` is renamed to `UIIcons` when leveraging the bundle. This means that you can use UI icons in your code by importing them from `@spectrum-web-components/bundle/icons.js`:

```javascript
import { UIIcons } from '@spectrum-web-components/bundle/icons.js';

console.log(UIIcons.AsteriskIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

##### Workflow Icons

`@spectrum-web-components/icons-workflow` is namespaced to `IconsWorkflow` when leveraging the bundle. This means that you can use workflow icons in your code by importing them from `@spectrum-web-components/bundle/icons.js`:

```javascript
import { IconsWorkflow } from '@spectrum-web-components/bundle/icons.js';

console.log(IconsWorkflow.CircleIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

#### Version Management

The bundle versions all Spectrum Web Components packages collectively. This means:

- A single version bump updates all components simultaneously
- You may receive updates for components you're not actively using
- For production applications, consider depending on individual packages for more granular control

### Accessibility

All components included in the bundle follow WCAG accessibility guidelines. Each component maintains its own accessibility features as documented in their individual package documentation. Refer to the specific component documentation pages for detailed accessibility information.
