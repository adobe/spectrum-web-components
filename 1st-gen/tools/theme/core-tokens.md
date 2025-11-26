## Description

By default, Spectrum Web Component themes support both the Spectrum Vars and Spectrum Core Tokens design token collections. This allowed for the conversion between the older Spectrum Vars ecosystem to the Core Tokens ecosystem over time. At this time, all non-deprecated SWC packages have been updated to the Core Tokens ecosystem and we are beginning the process of deprecating the Spectrum Vars values as well. The `*-core-tokens.js` files outlined below will allow you to begin migrating and building features with the eventual removal of these values in mind.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/theme?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/theme)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/theme?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/theme)

```
yarn add @spectrum-web-components/theme
```

Import the side effectful registration of `<sp-theme>` via:

```js
import '@spectrum-web-components/theme/sp-theme.js';
```

The various theme files within the Spectrum system can be imported as follows:

```js
import '@spectrum-web-components/theme/src/themes-core-tokens.js';
```

If you leverage the Express system, the same files in that context can be imported from:

```js
import '@spectrum-web-components/theme/src/express/themes-core-tokens.js';
```

### Targeted imports

You can import specific color and scale data individually:

```js
import '@spectrum-web-components/theme/theme-darkest-core-tokens.js';
import '@spectrum-web-components/theme/theme-dark-core-tokens.js';
import '@spectrum-web-components/theme/theme-light-core-tokens.js';
import '@spectrum-web-components/theme/theme-lightest-core-tokens.js';
import '@spectrum-web-components/theme/scale-medium-core-tokens.js';
import '@spectrum-web-components/theme/scale-large-core-tokens.js';
import '@spectrum-web-components/theme/express/theme-darkest-core-tokens.js';
import '@spectrum-web-components/theme/express/theme-dark-core-tokens.js';
import '@spectrum-web-components/theme/express/theme-light-core-tokens.js';
import '@spectrum-web-components/theme/express/theme-lightest-core-tokens.js';
import '@spectrum-web-components/theme/express/scale-medium-core-tokens.js';
import '@spectrum-web-components/theme/express/scale-large-core-tokens.js';
```

## Migrating from Spectrum Vars usage

When moving to leverage Core Tokens in your application you will find that there is not always a direct descendent of the Spectrum Vars that you may have leveraged in the past. Color tokens, in particular, have a new system where their values can be converted to a rough approximation of what may have been available with Spectrum Vars. In other cases, like `--spectrum-global-dimension-size-*` values, there is no direct parallel and their migration is more complex.

### Color tokens

While using non-semantic colors is not a suggested pattern, in cases where you have already leveraged these, you can _generally_ convert `--spectrum-global-color-*` custom properties directly to `--spectrum-*` custom properties. Not all color families found in the Spectrum Vars are present in Core Tokens and in most cases, the scale of individual colors in a family will have changed. A conversion from a removed custom property to a Core Token might look as follows:

```diff
- border-color: var(--spectrum-global-color-seafoam-600);
+ border-color: var(--spectrum-seafoam-900);
```

You can learn more about the available color values available as Core Tokens below:

<custom-vars-viewer id="color-tokens"></custom-vars-viewer>

<script type="module">
    const varsViewer = document.querySelector('custom-vars-viewer');
    const options = {
        rootMargin: '20px'
    }
    const callback = async (entries, observer) => {
        if (entries[0].intersectionRatio === 0) return;
        import('@spectrum-web-components/custom-vars-viewer/custom-vars-viewer.js').then(() => {
            const queryThemeEvent = new CustomEvent('sp-track-theme', {
                bubbles: true,
                composed: true,
                detail: {
                    callback: (color) => {
                        varsViewer.themeColor = color.startsWith('light')
                            ? 'light'
                            : color;
                    },
                },
                cancelable: true,
            });
            varsViewer.dispatchEvent(queryThemeEvent);
        });
        observer.disconnect();
    }

    const observer = new IntersectionObserver(callback, options);
    observer.observe(varsViewer);
</script>

### Size tokens

Values outlining size values (e.g. `--spectrum-global-dimension-size-*`) do not have direct corollaries in Core Tokens. This can specifically affect the way that content intended for delivery across both the `medium` and `large` "scale" are handled. To support migration in this area the `--swc-scale-factor` custom property has been added to support calculating the difference between delivery in these two contexts. In that way, migration of these values might look as follows:

```diff
- padding: var(--spectrum-global-dimension-size-175) var(--spectrum-global-dimension-size-250);
+ padding: calc(var(--swc-scale-factor) * 14px) calc(var(--swc-scale-factor) * 20px);
```

In this case, the custom property `--spectrum-global-dimension-size-175` represented the value `14px` and `--spectrum-global-dimension-size-250` represented `20px` in the `medium` scale of Spectrum Var. In both cases, calculating a new value by multiplying those pixel values by the `--swc-scale-factor` custom property allows for each value to be delivered in a manner similar to how it had been previously.

**NOTICE**: at the `large` scale, the `--swc-scale-factor` custom property has a fractional value. This means that depending on the value you are calculating from you may achieve a non-whole number. In these cases, the conversion will not be 100% the same as the value previously available with Spectrum Vars and can in some cases have unexpected effects on pixel precision delivery of text content.
