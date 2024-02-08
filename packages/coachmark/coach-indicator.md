## Description

`<sp-coach-indicator>` show the connection between an object and its explanation in a touring mode — for example, the source of <sp-coachmark> in an onboarding tour.

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

## Variants

<sp-tabs selected="standard" auto label="Variant Options">
<sp-tab value="standard">Standard</sp-tab>
<sp-tab-panel value="standard">

```html
<sp-coach-indicator></sp-coach-indicator>
<sp-coach-indicator variant="dark"></sp-coach-indicator>
<sp-coach-indicator variant="light"></sp-coach-indicator>
```

</sp-tab-panel>
<sp-tab value="quiet">Quiet</sp-tab>
<sp-tab-panel value="quiet">

```html
<sp-coach-indicator quiet></sp-coach-indicator>
<sp-coach-indicator quiet variant="dark"></sp-coach-indicator>
<sp-coach-indicator quiet variant="light"></sp-coach-indicator>
```

</sp-tab-panel>
</sp-tabs>
