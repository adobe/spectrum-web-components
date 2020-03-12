## Description

An **sp-theme** sets the rendering theme for all child components.
The Spectrum design system supports four color themes and two different
scales. `spectrum-web-components` currently supports three of the four
color themes (dark, light and lightest) and one one of the scales (medium).

### Installation

```
npm install @spectrum-web-components/theme

# or

yarn add @spectrum-web-components/theme
```

## Quick start

The default import of this packages `import '@spectrum-web-components/themes';` will get you started using the `<sp-theme>` wrapper element, and includes all four (4) color options (`lightest`, `light`, `dark`, and `darkest`) and both (2) scale options (`medium` and `large`). Having all of these options available together is the easiest way to get a handle on the theming possibilities offered by the package and empower you to prototype and test various deliveries of your application. However, reserving the download and parse time for all of the variants may not be required for all applications. See "Advanced usage" below for instructions on tuning the performance of an application that leverages this package.

## Advanced usage

Once you've moved beyond the prototype phases of an application, it is likely that you will only use one combinatin of `color` and `scale` in your application, and even when you don't you will likely benefit from lazily loading variants that you don't leverage by default. For single combination applications or to power a _default_ theme, the following imports can be used to ensure only the code your application requires is loaded:

```js
// Power a site using <sp-theme color="darkest" scale="large">
import '@spectrum-web-components/theme/lib/theme-darkest.js';
import '@spectrum-web-components/theme/lib/scale-large.js';

import '@spectrum-web-components/theme/lib/theme.js';
```

When subsequent theme variants are needed you can ensure those are lazily loaded by leveraging dynamic imports via something like the following:

```js
const themeElement = document.querySelector('sp-theme');

const updateTheme = async (color, scale) => {
    Promise.all([
        import(`@spectrum-web-components/theme/lib/theme-${color}.js`),
        import(`@spectrum-web-components/theme/lib/scale-${scale}.js`),
    ]).then(() => {
        themeElement.color = color;
        themeElement.scale = scale;
    });
};

updateTheme('light', 'medium');
```

When bundling your application, be sure to consult the documentation of your bundler for the correct way to ensure proper packaging of the sort of programattic dependancy graph that this will create.

## Light theme

```html demo
<style type="text/css">
    #example {
        width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="light">
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
    </div>
</sp-theme>
```

## Dark theme

```html demo
<style type="text/css">
    #example {
        width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="dark">
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
    </div>
</sp-theme>
```

## Embedding themes

There are a few cases where it is necessary to embed one theme within another.
For example, if you have an application that is using a dark theme that is
previewing or editing content that will be displayed in a light theme.

```html
<style type="text/css">
    #outer {
        width: 500px;
        padding: 3em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #inner {
        margin-top: 2em;
        padding: 2em;
        background-color: var(--spectrum-global-color-gray-100);
        color: var(--spectrum-global-color-gray-800);
    }

    #buttons {
        margin-top: 2em;
    }
</style>
<sp-theme color="dark">
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
        <div id="buttons">
            <sp-button variant="primary">Cancel</sp-button>
            <sp-button variant="cta">Continue</sp-button>
        </div>
        <sp-theme color="light">
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
                <div id="buttons">
                    <sp-button variant="primary">Cancel</sp-button>
                    <sp-button variant="cta">Continue</sp-button>
                </div>
            </div>
        </sp-theme>
    </div>
</sp-theme>
```
