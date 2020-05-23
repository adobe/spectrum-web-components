---
layout: guide.njk
title: 'Adding a New Component: Spectrum Web Components'
displayName: Adding a New Component
slug: adding-component
---

# Adding a New Component

This guide explains how to contribute the implementation of a Spectrum control
to [spectrum-web-components](https://github.com/adobe/spectrum-web-components).

The components in spectrum-web-components are based on the CSS definitions in
[spectrum-css](https://github.com/adobe/spectrum-css). Typically, component
implementations contain very little code. The CSS from the `spectrum-css`
project typically specifies all of the presentation details.

## What is a web component?

According to [webcomponents.org](https://www.webcomponents.org/introduction),
web components are:

> ... a set of web platform APIs that allow you to create new custom, reusable,
> encapsulated HTML tags to use in web pages and web apps. Custom components and
> widgets build on the Web Component standards, will work across modern
> browsers, and can be used with any JavaScript library or framework that works
> with HTML.

In order to add a new component to this library, you will need to develop a
working knowledge of the following technologies:

-   [Spectrum CSS](https://github.com/adobe/spectrum-css): A CSS implementation of the Spectrum design language
-   [Web Components](https://developers.google.com/web/fundamentals/web-components/customelements): Standards based method for adding new HTML tags to a browser
-   [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom): The part of the Web Component spec that allows for encapsulation of component styles and child nodes
-   [lit-element](https://lit-element.polymer-project.org/guide): A simple base class for creating fast, lightweight web components
-   [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties): CSS variables that can be used throughout a document
-   [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html): A typesafe variant of JavaScript

## Setting up the styling

The most complicated part of implementing a Spectrum web component is getting
the styles set up correctly. The [shadow
DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) is
the heart of a web component. It isolates the component from the styles and DOM
of the containing page. While this offers many benefits, it also means that we
must structure our CSS very differently.

The CSS from the [spectrum-css](https://github.com/adobe/spectrum-css) project
is intended to be installed globally on a web page. Using it in the context of a
web component requires that we modify it. To facilitate that, this project comes
with a [config-driven processor](https://github.com/adobe/spectrum-web-components/blob/master/scripts/process-spectrum-postcss-plugin.js) that can transform the Spectrum CSS into a format
that can be consumed in a web component.

The first step is to create a directory and a `spectrum-config.js` file for your
new component. This config file contains information about the structure of
the web component in relation to the Spectrum CSS classes.

Below is a fragment of the [`spectrum-config.js` file for `sp-button`](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js).

```javascript
module.exports = {
    spectrum: 'button',
    components: [
        {
            name: 'button',
            host: {
                selector: '.spectrum-Button',
                shadowSelector: '#button',
            },
            focus: '#button',
            attributes: [
                {
                    type: 'boolean',
                    selector: '.spectrum-Button--quiet',
                },
                {
                    type: 'boolean',
                    selector: ':disabled',
                },
                {
                    type: 'enum',
                    name: 'variant',
                    values: [
                        '.spectrum-Button--cta',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        {
                            name: 'negative',
                            selector: '.spectrum-Button--warning',
                        },
                        '.spectrum-Button--overBackground',
                        '.spectrum-Button--secondary',
                    ],
                },
            ],
            ids: ['.spectrum-Button-label'],
            slots: [
                {
                    name: 'icon',
                    selector: '.spectrum-Icon',
                },
            ],
            exclude: [/\.is-disabled/],
        },
    ],
};
```

If we wanted to create a button component using this config file, the steps would be as
follows:

1. Make the directory [`src/components/button`](https://github.com/adobe/spectrum-web-components/tree/master/src/button)
2. In that new directory, create a [`spectrum-config.js`](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js)
   file with the above contents
3. Run the command `npm run process-spectrum` to create the [CSS file](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css)

When you do the above, the [config-driven processor](https://github.com/adobe/spectrum-web-components/blob/master/scripts/process-spectrum-postcss-plugin.js)
will look in the [`spectrum-css`](https://github.com/adobe/spectrum-css) project
for the [matching CSS file](https://unpkg.com/@adobe/spectrum-css@2.13.0/dist/components/button/index-vars.css).
It will parse that file and restructure the CSS as per the configuration
instructions.

## Structure of a Spectrum Web Component

If you look at an `sp-button` in the Chrome developer tools, you will see a DOM
structure that looks like this.

<style>
    .flip {
        display: inline-block;
        transform: scale(-1, 1);
    }
</style>
<pre>
<div class='markup'>
&#x25BC;&lt;sp-button tabindex="0" variant="cta"&gt;
    &#x25BC; #shadow-root (open)
        &#x25BC; &lt;button id="button" tabindex="0"&gt;
            &#x25BC; &lt;div id="label&gt;
                &#x25BC; &lt;slot&gt;
                    <div class='flip'>&crarr;</div> #text
                &lt;/slot&gt;
            &lt;/div&gt;
        &lt;/button&gt;
    &#34;Click Me&#34;
&lt;/sp-button&gt;
</div>
</pre>

If anything here looks unfamiliar, it is probably a good time to do some reading
about [web components](https://developers.google.com/web/fundamentals/web-components/customelements).

You can compare this markup with the [reference markup in the `spectrum-css` documentation](http://opensource.adobe.com/spectrum-css/2.13.0/docs/#button---cta)

### Host Class Mapping

We need to determine what the main CSS class is for our component in the
original `spectrum-css`. In the case of `sp-button`, we can see that the
top-level class is `.Spectrum-Button`. We then need to determine where we want
that CSS to be applied. In many cases, you will want that CSS to be applied to
the actual web component via the `:host` selector. That is the default behaviour
of the conversion script. In this case, we wanted to preserve all of the default
behaviour of the `button` element in HTML. So, we want the main CSS to be
applied to our `<button>` instead. If you look at the [`host` definition in
`spectrum-config.js`](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L18-L21)
you can see that we have supplied a `shadowSelector` option. That tells the
script to move all of the CSS for `.Spectrum-Button` to the `#button` element in
the shadow DOM.

```javascript
    host: {
        selector: '.spectrum-Button',
        shadowSelector: '#button',
    },
```

### Shadow DOM Structure

The next step is to fill out the remaining structure of the shadow DOM portion
of the component. Note that, in the shadow DOM, we are using ids instead of long
class names. We can do that because the namespace of each instance of our web
component has it's own DOM scope. So, there can never be an id name collision.

Typically, you will reference the [sample code from the
`spectrum-css`](http://opensource.adobe.com/spectrum-css/2.13.0/docs/#checkbox)
documentation and [recreate that structure in the shadow DOM of your
component](https://github.com/adobe/spectrum-web-components/blob/master/src/checkbox/checkbox.ts#L30-L48).

In the case of `sp-checkbox`, we turn this sample DOM code:

```markup
<label class="spectrum-Checkbox">
  <input type="checkbox" class="spectrum-Checkbox-input" id="checkbox-0">
  <span class="spectrum-Checkbox-box">
    <svg class="spectrum-Icon spectrum-UIIcon-CheckmarkSmall spectrum-Checkbox-checkmark" focusable="false" aria-hidden="true">
      <use xlink:href="#spectrum-css-icon-CheckmarkSmall" />
    </svg>
    <svg class="spectrum-Icon spectrum-UIIcon-DashSmall spectrum-Checkbox-partialCheckmark" focusable="false" aria-hidden="true">
      <use xlink:href="#spectrum-css-icon-DashSmall" />
    </svg>
  </span>
  <span class="spectrum-Checkbox-label">Checkbox</span>
</label>
```

into this code in our component's render method (actually implementation is
slightly different):

```javascript
return html`
        <label id="root">
            <input
                id="input"
                type="checkbox"
                ?checked=${this.checked}
                @change=${this.handleChange}
            <span id="box">
                <sp-icon
                    id="checkmark"
                    size="s"
                    name="ui:CheckmarkSmall"
                    aria-hidden="true"
                ></sp-icon>
                <sp-icon
                    id="partialCheckmark"
                    size="s"
                    name="ui:DashSmall"
                    aria-hidden="true"
                ></sp-icon>
            </span>
            <span id="label"><slot></slot></span>
        </label>
    `;
```

You will notice that many of the `spectrum-css` classes are mapped to ids in the
web component. For example, `.spectrum-Checkbox-input` and
`.spectrum-Checkbox-box` become `#input` and `#box`. Those transformations are
described in the [`ids` section of the `spectrum-config.js`
file](https://github.com/adobe/spectrum-web-components/blob/master/src/checkbox/spectrum-config.js#L43-L64).

```javascript
    ids: [
        {
            selector: '.spectrum-Checkbox-input',
            name: 'input',
        },
        {
            selector: '.spectrum-Checkbox-box',
            name: 'box',
        },
        {
            selector: '.spectrum-Checkbox-checkmark',
            name: 'checkmark',
        },
        {
            selector: '.spectrum-Checkbox-partialCheckmark',
            name: 'partialCheckmark',
        },
        {
            selector: '.spectrum-Checkbox-label',
            name: 'label',
        },
    ],
```

### Properties and Attributes

Most of our controls have options that affect how they are rendered. For
example, Spectrum supports a number of different kinds of buttons (e.g primary,
secondary or call-to-action). `spectrum-css` supports these visual styles using
CSS classes. In web components, we typically support these options using
attributes/properties on the component. For example, here is a call-to-action
style button.

```html
<sp-button variant="cta">CTA</sp-button>
```

We could conditionally add CSS classes to the elements of the shadow DOM during
rendering, but it is much easier to just let the attributes on the DOM node
drive the styling directly. In order to facilitate that, the
[`spectrum-config.js` file lets you specify how to map the various
`spectrum-css` classes to CSS that is based on the attributes on the `:host` of
the web
component](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L23-L47).

```javascript
    attributes: [
        {
            type: 'boolean',
            selector: '.spectrum-Button--quiet',
        },
        {
            type: 'boolean',
            selector: ':disabled',
        },
        {
            type: 'enum',
            name: 'variant',
            values: [
                '.spectrum-Button--cta',
                '.spectrum-Button--primary',
                '.spectrum-Button--secondary',
                {
                    name: 'negative',
                    selector: '.spectrum-Button--warning',
                },
                '.spectrum-Button--overBackground',
                '.spectrum-Button--secondary',
            ],
        },
    ],
```

We support two different kinds of attributes, booleans and enums. Booleans are
turned on or off by the presence or absence of the attribute. Enum attributes
must be set to one of the allowed values. The [CSS generated will reference the
attributes on the `host:` element
directly](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css#L204-L212).

### Class to Class Mapping

In some cases, you will need to retain the `spectrum-css` classes as classes. An
example of that is when you need to apply CSS rules to multiple items in the
shadow DOM. In that case, we simply map class names to shorter classnames. There
is an [example of remapping classes in the slider
component](https://github.com/adobe/spectrum-web-components/blob/master/src/slider/spectrum-config.js#L91-L96).

```javascript
    classes: [
        {
            selector: '.spectrum-Slider-track',
            name: 'track',
        },
    ],
```

### Slots

[Slot tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) are
how we host our child content (light DOM) in our component's shadow DOM. The
`spectrum-css` for a component sometimes contains rules for laying out the child
content. There is a [`slots`
section](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-config.js#L49-L54)
in the `spectrum-config.js` file for mapping those rules to the slotted content.

```javascript
    slots: [
        {
            name: 'icon',
            selector: '.spectrum-Icon',
        },
    ],
```

The above section tells our CSS processor to map CSS for the `.spectrum-Icon`
class to the content that is being hosted in the [slot with the name
`icon`](https://github.com/adobe/spectrum-web-components/blob/master/src/button/spectrum-button.css#L148-L158).

## Coding the Component

All of the `spectrum-web-components` are written using the
[lit-element](https://lit-element.polymer-project.org/guide) framework and
[Typescript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html).
Your best bet is to look at [similar
components](https://github.com/adobe/spectrum-web-components/tree/master/src)
and match the style.

We have a working specification for the APIs for each of the Spectrum components.
If you file an issue for the component that you want to implement, we can provide
the necessary specifications for it.

### Documenting the component

Each component should have a page in the documentation system. The pages are
written in [Markdown](https://www.markdownguide.org/cheat-sheet). See one of
the [existing pages](https://github.com/adobe/spectrum-web-components/blob/master/documentation/components/button.md) for an example.

To run the local documentation server, use the command:

    npm run docs:start

The documentation automatically extracts the properties and attributes from the
source code. You should document your component using the [appropriate jsdoc
tags](https://github.com/runem/web-component-analyzer#-how-to-document-your-components-using-jsdoc).
See
[button.ts](https://github.com/adobe/spectrum-web-components/blob/master/src/button/button.ts)
for an example.

### Working with Storybook

We use [Storybook](https://storybook.js.org/) for developing our components.
This gives us a rapid way to test our components in various configurations. The
best way to start is to copy [one of the existing
stories](https://github.com/adobe/spectrum-web-components/blob/master/stories/button.stories.ts).

To run Storybook, use the command:

    npm run storybook
