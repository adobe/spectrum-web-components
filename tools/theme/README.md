## Description

`sp-theme` applies a Spectrum theme by using CSS custom properties to set default sizes & colors for all of the components in its scope. The Spectrum design system provides four color themes (`lightest`, `light`, `dark`, and `darkest`) and two different scales (`medium` and `large`) to support desktop & mobile UI.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/theme?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/theme)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/theme?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/theme)

```
yarn add @spectrum-web-components/theme
```

#### Quick start

```
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
```

The above import statements do two things: the first will get you started using the `<sp-theme>` wrapper element, and the second includes all four (4) color options (`lightest`, `light`, `dark`, and `darkest`) and both (2) scale options (`medium` and `large`) for the Spectrum Classic theme. Having all of these options available together is the easiest way to get a handle on the theming possibilities offered by the package and empowers you to prototype and test various deliveries of your application. However, reserving the download and parse time for all of the variants may not be required for all applications. See the "Advanced usage" section below for instructions on tuning the performance of an application that leverages this package.

Below are more ways to import the different scale and color options individually, in case you didn't want to import all of them as we did above. You'll use these statements in combination with the side effectful registration import statement `import '@spectrum-web-components/theme/sp-theme.js'`.

The various Classic themes can be imported en masse, as in the example above:

```
import '@spectrum-web-components/theme/src/themes.js';
```

The various Spectrum Express themes can also be imported en masse:

```
import '@spectrum-web-components/theme/src/express/themes.js';
```

Or you can import the themes and scales individually:

```
import '@spectrum-web-components/theme/theme-darkest.js';
import '@spectrum-web-components/theme/theme-dark.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/theme-lightest.js';
import '@spectrum-web-components/theme/scale-medium.js';
import '@spectrum-web-components/theme/scale-large.js';
import '@spectrum-web-components/theme/express/theme-darkest.js';
import '@spectrum-web-components/theme/express/theme-dark.js';
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/theme-lightest.js';
import '@spectrum-web-components/theme/express/scale-medium.js';
import '@spectrum-web-components/theme/express/scale-large.js';
```

When looking to leverage the `Theme` base class as a type and/or for extension purposes, do so via:

```
import { Theme } from '@spectrum-web-components/theme';
```

## What it's doing

Visually, all Spectrum Web Components are an expression of the design tokens specified by Spectrum, Adobe's design system. On the web, these tokens are made available as CSS Custom Properties. Using `sp-theme` as a parent element for your components ensures that those CSS Custom Properties can be leveraged by the elements within your application. This ensures consistent delivery of not only the color and scale you've specified in your particular instance, but for _all_ the other color, scale, and content direction specifications across Spectrum.

Additionally, the `sp-theme` element manages the content direction applied to the elements in its DOM scope. By default, an `sp-theme` element resolves its initial content direction from the value specified by its first `sp-theme` or `document` ancestor; otherwise, it uses the value `dir="ltr"` if a content direction isn't present in those elements. When a value for `dir` is manually supplied to `sp-theme`, the default value is overridden. In all cases, though, `sp-theme` manages the `dir` value of its `SpectrumElement` descendents, unless another `sp-theme` element is placed into its scope and overrides that management.

To make the above concepts a little more concrete, take a look at the table below. Try selecting another `color` in the picker, and notice how that changes the values of the colors. The token names for the variables persist, but the RGB values under the hood change! Considering that `sp-theme` also manages all the other theme and size options, `sp-theme` reveals itself to be a pretty powerful component.

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

When you're ready to look into more advanced usage of the components and themes in your application, there are vanilla CSS implementations of these tokens available in the `@spectrum-web-components/styles` package.

## Example

An `<sp-theme>` element expects a value for each of its `color` and `scale` attributes to be provided on the element. While not required, you can also use the `theme` attribute to specify whether the theme you're using is Spectrum Classic (the default) or Spectrum Express.

```html
<sp-theme
    theme="spectrum"
    color="light"
    scale="medium"
    style="background-color: var(--spectrum-gray-100)"
>
    <sp-button onclick="spAlert(this, 'Themed <sp-button> clicked!')">
        Click me!
    </sp-button>
</sp-theme>
```

## Advanced usage

Once you've moved beyond the prototype phase of an application, it is likely that you will only use one combination of `color` and `scale` in your application, and even if not, you'll likely benefit from lazily loading the variants you don't leverage by default. For single combination applications, or to power a _default_ theme, the following imports can be used to ensure only the code your application requires is loaded:

### Classic

```js
/**
 * Power a site using
 *
 * <sp-theme
 *      theme="classic"
 *      color="darkest"
 *      scale="large"
 * >
 **/
import '@spectrum-web-components/theme/theme-darkest.js';
import '@spectrum-web-components/theme/scale-large.js';

import '@spectrum-web-components/theme/sp-theme.js';
```

### Express

```js
/**
 * Power a site using
 *
 * <sp-theme
 *      theme="express"
 *      color="light"
 *      scale="medium"
 * >
 **/
import '@spectrum-web-components/theme/express/theme-light.js';
import '@spectrum-web-components/theme/express/scale-medium.js';

import '@spectrum-web-components/theme/sp-theme.js';
```

When subsequent theme variants are needed, you can ensure those are lazily loaded by leveraging dynamic imports via something like:

```js
const themeElement = document.querySelector('sp-theme');

const updateTheme = async (color, scale) => {
    Promise.all([
        import(`@spectrum-web-components/theme/theme-${color}.js`),
        import(`@spectrum-web-components/theme/scale-${scale}.js`),
    ]).then(() => {
        themeElement.color = color;
        themeElement.scale = scale;
    });
};

updateTheme('light', 'medium');
```

When bundling your application, be sure to consult the documentation of your bundler for the correct way to ensure proper packaging of the programatic dependency graph that this will create.

## Light theme

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 3em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme theme="express" color="light" scale="medium">
    <hzn-app-stuff></hzn-app-stuff>
</sp-theme>

<express-app>
    <hzn-app-stuff></hzn-app-stuff>
</express-app>
```

## Dark theme

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 3em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme theme="express" color="dark" scale="large">
    <hzn-app-stuff></hzn-app-stuff>
</sp-theme>

<express-app>
    <hzn-app-stuff></hzn-app-stuff>
</express-app>
```

## Large scale

The large scale of `<sp-theme>` will switch to using Spectrum's larger mobile [Platform Scale](https://spectrum.adobe.com/page/platform-scale/)

```html demo
<style type="text/css">
    #example {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="darkest" scale="large">
    <div id="example">
        <div>
            <sp-slider
                value="5"
                step="1"
                min="1"
                max="11"
                label="Volume"
                id="volume-slider"
            ></sp-slider>
        </div>
        <div><sp-switch>Overdrive</sp-switch></div>
        <sp-button-group id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="accent">Continue</sp-button>
        </sp-button-group>
    </div>
</sp-theme>
```

## Embedding themes

There are a few cases where it is necessary to embed one theme within another.
For example, if you have an application that is using a dark theme with a left to right text direction that is
previewing or editing content that will be displayed in a light theme with a right to left text direction.

```html
<style type="text/css">
    #outer {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }

    #inner {
        margin-top: 2em;
        padding: 1em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="dark" dir="ltr">
    <div id="outer">
        <div>
            <sp-slider
                value="5"
                step="1"
                min="1"
                max="11"
                label="Volume"
                id="volume-slider"
            ></sp-slider>
        </div>
        <div><sp-switch>Overdrive</sp-switch></div>
        <sp-button-group id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="accent">Continue</sp-button>
        </sp-button-group>
        <sp-theme color="light" dir="rtl">
            <div id="inner">
                <div>
                    <sp-slider
                        value="5"
                        step="1"
                        min="1"
                        max="11"
                        label="Volume"
                        id="volume-slider"
                    ></sp-slider>
                </div>
                <div><sp-switch>Overdrive</sp-switch></div>
                <sp-button-group id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="accent">Continue</sp-button>
                </sp-button-group>
            </div>
        </sp-theme>
    </div>
</sp-theme>
```

## Language Context

The `<sp-theme>` element provides a language context for its descendents in the DOM. Descendents can resolve this context by dispatching an `sp-language-context` DOM event and supplying a `callback(lang: string) => void` method in the `detail` entry of the Custom Event. These callbacks will be reactively envoked when the `lang` attribute on the `<sp-theme>` element is updated. This way, you can control the resolved language in [`<sp-number-field>`](../components/number-field), [`<sp-slider>`](./components/slider), and other elements in one centralized place.
