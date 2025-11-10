## Overview

`<sp-theme>` provides Spectrum design tokens (CSS custom properties) to everything in its DOM scope. Components inside a theme use these tokens to render correctly. The element itself does not visually “apply” styles to your app; it exposes the tokens so your components (and any of your CSS) can consume them.

Spectrum offers multiple variants:

- **System**: `spectrum`, `express`, `spectrum-two`
- **Color**: `light`, `dark` (legacy: `lightest`, `darkest` – deprecated)
- **Scale**: `medium`, `large`

By default, `<sp-theme>` uses the `spectrum` system, `light` color, and `medium` scale.

### How sp-theme works

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

When you're ready to look into more advanced usage of the components and themes in your application, there are vanilla CSS implementations of these tokens available in the [`@spectrum-web-components/styles`](https://opensource.adobe.com/spectrum-web-components/tools/styles/) package.

### Usage

[![See it on NPM!](https://img.shields.io/npm/v/@spectrum-web-components/theme?style=for-the-badge)](https://www.npmjs.com/package/@spectrum-web-components/theme)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/@spectrum-web-components/theme?style=for-the-badge)](https://bundlephobia.com/result?p=@spectrum-web-components/theme)

```bash
yarn add @spectrum-web-components/theme
```

Register the element and load the theme fragments you intend to use:

```js
// Registers the <sp-theme> custom element
import '@spectrum-web-components/theme/sp-theme.js';

// Load the specific variants you will use (recommended)
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';
// Optionally choose a different system
// import '@spectrum-web-components/theme/express/theme-light.js';
// import '@spectrum-web-components/theme/express/scale-medium.js';
```

If you’re prototyping and want everything available:

```js
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js'; // spectrum
import '@spectrum-web-components/theme/src/express/themes.js'; // express
import '@spectrum-web-components/theme/src/spectrum-two/themes.js'; // spectrum-two
```

### Examples

#### Light color, medium scale

```html
<style type="text/css">
    #outer {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }
</style>
<sp-theme system="spectrum" color="light" scale="medium">
    <div id="outer">
        <sp-field-label for="email">Email</sp-field-label>
        <sp-textfield
            id="email"
            type="email"
            placeholder="you@example.com"
        ></sp-textfield>
        <sp-help-text>We’ll only use this to send a receipt.</sp-help-text>
        <sp-button-group style="margin-top: var(--spectrum-spacing-400)">
            <sp-button variant="primary">Submit</sp-button>
            <sp-button variant="secondary">Cancel</sp-button>
        </sp-button-group>
    </div>
</sp-theme>
```

#### Dark color, large scale

The large scale of `<sp-theme>` will switch to using Spectrum's larger mobile Platform Scale.

```html
<style type="text/css">
    #outer {
        max-width: 500px;
        padding: 1em;
        background-color: var(--spectrum-gray-100);
        color: var(--spectrum-gray-800);
    }
</style>
<sp-theme system="spectrum" color="dark" scale="large">
    <div id="outer">
        <sp-field-label for="volume">Volume</sp-field-label>
        <sp-slider id="volume" value="50"></sp-slider>
        <sp-switch>Overdrive</sp-switch>
    </div>
</sp-theme>
```

#### Embedded color systems and directional content

There are a few cases where it is necessary to embed one theme within another. For example, if you have an application that is using a dark color system with a left to right text direction that is previewing or editing content that will be displayed in a light color system with a right to left text direction.

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

### Advanced usage

#### Lazy loading themes

Load only what you need by importing the specific fragments, then lazy-load others as your user changes theme settings.

```js
const themeEl = document.querySelector('sp-theme');

async function updateTheme(system, color, scale) {
    const systemBase = system === 'spectrum' ? '' : `${system}/`;
    await Promise.all([
        import(`@spectrum-web-components/theme/${systemBase}theme-${color}.js`),
        import(`@spectrum-web-components/theme/${systemBase}scale-${scale}.js`),
    ]);
    themeEl.system = system;
    themeEl.color = color;
    themeEl.scale = scale;
}

updateTheme('spectrum', 'light', 'medium');
```

When bundling your application, be sure to consult the documentation of your bundler for the correct way to ensure proper packaging of the programatic dependency graph that this will create.

#### Language context

Descendants can request the current language by dispatching `sp-language-context` with a callback. The callback is re-invoked when the theme’s `lang` changes. This way, you can control the resolved language in `<sp-number-field>`, `<sp-slider>`, and other elements in one centralized place.

```ts
// in a descendant component
this.dispatchEvent(
    new CustomEvent('sp-language-context', {
        bubbles: true,
        composed: true,
        detail: {
            callback: (lang, unsubscribe) => {
                this.lang = lang; // use the language value
                // call unsubscribe() when you no longer need updates
            },
        },
    })
);
```

### Accessibility

- **Color and contrast**: Ensure sufficient contrast for any backgrounds you apply when consuming tokens (WCAG 2.1 AA). Components themselves meet Spectrum guidance when themed correctly.
- **Language**: Set `lang` on `<sp-theme>` to inform number/date formatting and other locale-aware components.
- **Directionality**: Use `dir` to deliver correct LTR/RTL behavior; embedded themes allow mixing contexts.
