## Description

`@spectrum-web-components/bundle` is a master dependency that allows a project to import any and all of the Spectrum Web Components. While it is a great approach to prototyping, the fact that is versions all of the Spectrum Web Components packages collectively means that depending on it can leave you with a lot of package updates to manage at any one version change. For a more predictable upgrade process we suggest that you depend upon individual packages directly, but hope you find this bundle productive when initially trying to get into the act of developing with Spectrum Web Components!

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/bundle?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/bundle)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/bundle?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/bundle)

```
yarn add @spectrum-web-components/bundle
```

Import the side effectful registrations of the bundled components:

```
import '@spectrum-web-components/bundle/elements.js';
```

When looking to leverage their base classes as a type and/or for extension purposes, do so via something like the following for the `ActionButton` base class:

```
import { ActionButton } from '@spectrum-web-components/bundle';
```

### Icons

While this bundle directly re-exports the majority of functionality as they would be exported from their own packages, icon packages that export template literals are handled a little different. Due to the large number of exports that they feature, each of these packages are namespaced when included in the bundle.

#### UI

`@spectrum-web-components/icons-ui` is renamed to `UIIcons` when leveraging the bundle. This means that you can use workflow icons in your demonstration code by importing them from `@spectrum-web-components/bundle/icons.js` like the following:

```
import { UIIcons } from '@spectrum-web-components/bundle/icons.js';

console.log(UIIcons.AsteriskIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```

#### Workflow

`@spectrum-web-components/icons-workflow` is namespaced to `WorkflowIcons` when leveraging the bundle. This means that you can use workflow icons in your demonstration code by importing them from `@spectrum-web-components/bundle/icons.js` like the following:

```
import { IconsWorkflow } from '@spectrum-web-components/bundle/icons.js';

console.log(IconsWorkflow.CircleIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```
