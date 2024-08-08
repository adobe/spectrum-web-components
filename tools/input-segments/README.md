## Description

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/input-segments?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/input-segments)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/input-segments?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/input-segments)

```
yarn add @spectrum-web-components/input-segments
```

`InputSegments` cannot be used directly as a component, as there is no `<sp-input-segments>` component. The only way to use `InputSegments` is by extending a class:

```js
import { InputSegments } from '@spectrum-web-components/input-segments';

export class MyInput extends InputSegments {
    ...
}
```

## To-do list

-   Include/review ARIA attributes for editable segments
-   Move `handle` functions call to a cache so that it doesn't cycle on the binding in each render pass
-   Define/revise list of locales and include them in the VRT process to ensure long-term delivery
-   Complete documentation
-   Add/Review unit tests
