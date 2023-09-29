## Description

An `<sp-coachmark-trigger>` element can be used to bring added attention to specific parts of your page.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)
[![Try it on webcomponents.dev](https://img.shields.io/badge/Try%20it%20on-webcomponents.dev-green?style=for-the-badge)](https://webcomponents.dev/edit/collection/fO75441E1Q5ZlI0e9pgq/Z611FV1zeF0CLBLVHNFY/src/index.ts)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coachmark-trigger>` and `<sp-coach-indicator>`via:

```
import '@spectrum-web-components/coachmark/sp-coachmark-trigger.js';
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';

```

When looking to leverage the `CoachmarkTrigger` or `CoachIndicator` base class as a type and/or for extension purposes, do so via:

```
import { CoachmarkTrigger, CoachIndicator } from '@spectrum-web-components/coachmark';
```

## Standard CoachIndicator

```html
<sp-coach-indicator></sp-coach-indicator>
<sp-coach-indicator variant="dark"></sp-coach-indicator>
<sp-coach-indicator variant="light"></sp-coach-indicator>
```

## Quiet CoachIndicator

```html
<sp-coach-indicator quiet></sp-coach-indicator>
<sp-coach-indicator quiet variant="dark"></sp-coach-indicator>
<sp-coach-indicator quiet variant="light"></sp-coach-indicator>
```

## Example

```html
<sp-coachmark-trigger></sp-coachmark-trigger>
```
