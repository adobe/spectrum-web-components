## Description

`sp-button-group` delivers a set of buttons in horizontal or vertical orientation while ensuring the appropriate spacing between those buttons.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/button-group?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/button-group)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/button-group?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/button-group)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Zjc3o94DWuBkT4ve3dny/src/index.ts)

```
yarn add @spectrum-web-components/button-group
```

Import the side effectful registration of `<sp-button-group>` via:

```
import '@spectrum-web-components/button-group/sp-button-group.js';
```

When looking to leverage the `ButtonGroup` base class as a type and/or for extension purposes, do so via:

```
import { ButtonGroup } from '@spectrum-web-components/button-group';
```

## Horizontal

```html
<sp-button-group>
    <sp-button>Button 1</sp-button>
    <sp-button>Longer Button 2</sp-button>
    <sp-button>Short 3</sp-button>
</sp-button-group>
```

## Vertical

```html
<sp-button-group vertical>
    <sp-button>Button 1</sp-button>
    <sp-button>Longer Button 2</sp-button>
    <sp-button>Short 3</sp-button>
</sp-button-group>
```
