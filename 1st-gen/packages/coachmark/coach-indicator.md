## Overview

`<sp-coach-indicator>` shows the connection between an object and its explanation in a touring mode — for example, the source of a coachmark in an onboarding tour.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/coachmark?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/coachmark)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/coachmark?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/coachmark)

```
yarn add @spectrum-web-components/coachmark
```

Import the side effectful registration of `<sp-coach-indicator>` via:

```
import '@spectrum-web-components/coachmark/sp-coach-indicator.js';
```

When looking to leverage the `CoachIndicator` base class as a type and/or for extension purposes, do so via:

```
import { CoachIndicator } from '@spectrum-web-components/coachmark';
```

### Anatomy

A coach indicator consists of a single animated visual indicator.

```html
<sp-coach-indicator></sp-coach-indicator>
```

### Options

#### Static Colors

Coach indicators support different static color options to ensure visibility against different backgrounds:

<sp-tabs selected="standard" auto label="Static Color Options">
<sp-tab value="standard">Standard</sp-tab>
<sp-tab-panel value="standard">

```html
<sp-coach-indicator></sp-coach-indicator>
<sp-coach-indicator static-color="dark"></sp-coach-indicator>
<sp-coach-indicator static-color="light"></sp-coach-indicator>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html
<sp-coach-indicator quiet></sp-coach-indicator>
<sp-coach-indicator quiet static-color="dark"></sp-coach-indicator>
<sp-coach-indicator quiet static-color="light"></sp-coach-indicator>
```

</sp-tab-panel>
</sp-tabs>

### Accessibility

Coach indicators are typically paired with coachmarks to create accessible user onboarding experiences. When using coach indicators:

- Ensure they are clearly visible against their background
- Use appropriate static colors based on the background color
- Pair them with descriptive coachmarks that explain the indicated UI element
