---
layout: guide.njk
title: 'Spectrum Config: Spectrum Web Components'
displayName: Spectrum Config
slug: spectrum-config
---

# Specification for spectrum-config.js files

The following is an annotated example that serves to document the format
of the spectrum-config.js file. A higher-level explanation may be found
[here](/guides/adding-component).

## Annotated Sample

```javascript
module.exports = {
    // This is the name that the component has in spectrum-css. If you look
    // in node_modules/@adobe/spectrum-css/dist/components, what is the name
    // of the directory that contains the CSS for the component that you are
    // implementing
    spectrum: 'button',
    // A list of the components that we would like to generate CSS for. We can
    // generate CSS for multiple related components (e.g button and action button)
    components: [
        {
            // The basename for this component. This will control the naming of the
            // generated CSS file
            name: 'button',
            // Information about the main CSS class for this component. This is the
            // name of the CSS class in the spectrum-css file that relates to this
            // component (e.g. .spectrum-Button). You can optionally provide a
            // shadowSelector which will allow you to map the rules to an element
            // in your shadow DOM. The default selector for the CSS rules is :host.
            // If you are mapping to the default host: selector then you can
            // simply say "host: '.spectrum-Button'"
            host: {
                // The selector from spectrum-css for the root of the component
                selector: '.spectrum-Button',
                // The selector in the shadow DOM to map to (defaults to :host)
                shadowSelector: '#button',
            },
            // For components that can receive focus, this is the element in the
            // shadow DOM that should receive focus
            focus: '#button',
            // These are the options for the component that are set using attributes
            // on the web component (e.g. quiet in <sp-button quiet>Click me</sp-button>)
            attributes: [
                // Attributes may have a boolean type. In that case, if the attribute
                // is present, the option is true
                {
                    // Type of the attribute
                    type: 'boolean',
                    // The selector whos rules should come into effect when the
                    // option is true
                    selector: '.spectrum-Button--quiet',
                },
                {
                    type: 'boolean',
                    // An example of mapping a pseudo attribute to an attribute
                    // on the web component
                    selector: ':disabled',
                },
                // Attributes may also be of type enum. In that case, there is
                // usually a list of CSS classes in spectrum-css, of which only
                // one should be present at a time.
                {
                    type: 'enum',
                    // For enums, we need to provide a name here for the attribute
                    // as it is defined in the implementation of the component
                    name: 'variant',
                    // This is a list of possible values for the attribute. If
                    // the option is of the form ".spectrum-Button--cta" where
                    // ".spectrum-Button" is the root CSS class, then we can extract
                    // the enum value name automatically
                    values: [
                        // This related the enum value <sp-button variant="cta">
                        '.spectrum-Button--cta',
                        '.spectrum-Button--primary',
                        '.spectrum-Button--secondary',
                        // If for some reason, we need to override the enum
                        // values name, we can provide an object with the
                        // selector and name explicitly
                        {
                            name: 'negative',
                            selector: '.spectrum-Button--warning',
                        },
                        '.spectrum-Button--overBackground',
                        '.spectrum-Button--secondary',
                    ],
                },
            ],
            // This is a list of all of the spectrum-css class names that we
            // wish to map to ids in the shadow DOM.
            ids: [
                // If the class name follows the patter of starting with the
                // root class, then we can extract the id automatically. In this
                // case it would be #label
                '.spectrum-Button-label',
                // We can also explicitly provide the selector and the name
                {
                    selector: '.spectrum-Button-label',
                    name: 'label'
                }
            ],
            // We can provide a list of classes that we wish to map. It is
            // preferred to use ids when possible. There are some cases
            // where it is necessary to use a set CSS rules on multiple
            // components in the shadow DOM. In that case, you should map
            // the spectrum-css class to a shorter name
            classes: [
                {
                    // Classname in the original spectrum-css
                    selector: '.spectrum-Slider-track',
                    // New name to use. This will create the class .track
                    name: 'track',
                },
            ],
            // A list of slots on our web component that we wish to apply
            // spectrum-css rules to
            slots: [
                {
                    // The name of the slot (e.g. <slot name="icon">)
                    name: 'icon',
                    // The spectrum-css selector who's rules we wish to apply
                    selector: '.spectrum-Icon',
                },
            ],
            // Regular expressions for rules that we wish to exclude from our
            // processing. There are rules that do not make sense in a web
            // component, and it is good form to keep our CSS as small as
            // possible
            exclude: [/\.is-disabled/],
        },
        {
            // A second component specification in the same file
            name: 'action-button',
            host: {
                selector: '.spectrum-ActionButton',
                shadowSelector: '#button',
            },
            ...
        }
    ],
};
```
