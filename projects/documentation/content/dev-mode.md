---
layout: dev-mode.njk
title: 'Dev mode: Spectrum Web Components'
displayName: Dev mode
slug: dev-mode
---

# Dev mode

Spectrum Web Components aims to support developers in making high quality applications by taking into account features of our components--accessibility, connectivity, interactivity, etc.--that would otherwise distract. While many of these capabilities can exist wholey at runtime in their encapsulated custom element delivery, some require development time considerations to ensure they are surfaced correctly. Code checks can be costly and require KBs of Javascript that aren't needed in production. With this in mind, we package these extended capbilities into a dev mode. With the dev mode activated, you can be assured that your consumption of Spectrum Web Components is adhering to best practices for accessibility, API-usage, code deprecation, performance, and more.

## Activation

Dev mode can be accessed via the `development` [export condition](https://nodejs.org/api/packages.html#conditional-exports). Each tooling pipeline allows for this condition to be applied in its own way. With [Rollup](https://rollupjs.org/guide/en/), for example, use the [`nodeResolve()` plugin](https://www.npmjs.com/package/@rollup/plugin-node-resolve) to make choices about what export conditions to follow, like so:

```js
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    // ...
    plugins: [
        nodeResolve({
            // Add this line for development config, omit for production config
            exportConditions: ['development'],
        }),
    ],
};
```

Assuming you're already consuming Spectrum Web Components perfectly, you'll be greeted with the following message to announce that dev mode has been activated:

```
Spectrum Web Components is in dev mode. Not recommended for production!

https://opensource.adobe.com/spectrum-web-components/dev-mode/
{
    warningData: { localName: 'base', type: 'default', level: 'default' }
}
```

## Configuration

You can customize the messages that you receive by turning off warnings that you no longer believe apply, or allowing warnings to be published verbosely. This can be done by element "localName", warning "type", warning "level" or with the `verbose` property on the `window.__swc` object. To configure this, apply a value for `window.__swc` in your JS at any point that you'd like to control future warning messages. The following is an example of doing this before you import any of the rest of your application:

```js
<script>
window.__swc = {
    ignoreWarningTypes: { api: true },
    ignoreWarningLevels: { deprecation: true },
    ignoreWarningLocalNames: { 'sp-button': true },
    verbose: true
}
</script>

<script
    src="./path/to/app.js"
    type="module"
></script>
```

The above code turn warnings off for `sp-button`, `api`s, and `deprecation`s while receiving `verbose` messages outside of those.

The config is typed as follows:

```ts
type ElementLocalName = string;

type WarningType = 'default' | 'accessibility' | 'api';

type WarningLevel = 'default' | 'low' | 'medium' | 'high' | 'deprecation';

type SWCWarningData = {
    localName: string;
    type: WarningType;
    level: WarningLevel;
};

type BrandedSWCWarningID = `${ElementLocalName}:${WarningType}:${WarningLevel}`;

interface Window {
    __swc: {
        ignoreWarningTypes: Record<WarningType, boolean>;
        ignoreWarningLevels: Record<WarningLevel, boolean>;
        ignoreWarningLocalNames: Record<ElementLocalName, boolean>;
        verbose?: boolean;
    };
}
```

## Future

While there are currently only a handful of warnings that will be published from the library in this way, look for usage of this feature to expand in the coming months and years. As you consume Spectrum Web Components, if you find concepts or features that you feel could be clarified or enhanced by dev mode, please [join the discussion](https://github.com/adobe/spectrum-web-components/discussions/2308) and support us in making the library as productive for you as possible.

Dev mode should not be delivered to your users in production. This is why it has been added as an opt-in feature of the Spectrum Web Components library. With this in mind, there is the possibility that breaking changes to the dev mode API could occur outside of breaking changes in semver for the library or its packages. To avoid potential breaks affecting your code, do NOT leverage the API beyond the `ignoreWarningTypes`, `ignoreWarningLevels`, `ignoreWarningLocalNames`, and `verbose` properties on the `__swc` object listed above.
