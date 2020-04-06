## Description

`@spectrum-web-components/bundle` is a master dependancy that allows a project to import any and all of the the Spectrum Web Components. While it is a great approach to prototyping, the fact that is versions all of the Spectrum Web Components packages collectively means that depending on it can leave you with a lot of package udpates to manage at any one version change. For a more predicatable upgrade process we suggest that you depend upon individual packages directly, but hope you find this bundle productive when initially trying to get into the act of developing with Spectrum Web Components!

### Installation

```
npm install @spectrum-web-components/bundle

# or

yarn add @spectrum-web-components/bundle
```

### Icons - Workflow

While this bundle directly re-exports the majority of functionality as they would be exported from their own packages, `@spectrum-web-components/icons-workflow` is renamed to `IconsWorkflow` when leveraging the bundle. This means that you can use workflow icons in your demonstration code by importing them from `@spectrum-web-components/bundle` like the following:

```
import { IconsWorkflow } from '@spectrum-web-components/bundle';

console.log(IconsWorkflow.CircleIcon());

/***
TemplateResult {strings: Array[1], values: Array[0], type: "html", processor: DefaultTemplateProcessor, constructor: Object}
***/
```
