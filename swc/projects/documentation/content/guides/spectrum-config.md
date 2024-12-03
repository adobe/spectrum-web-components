---
layout: guide.njk
title: 'Spectrum Config: Spectrum Web Components'
displayName: Spectrum Config
slug: spectrum-config
---

# Specification for spectrum-config.js files

The "Spectrum config" for a package outlines how source CSS provided by [Spectrum CSS](https://opensource.adobe.com/spectrum-css) is converted to support the specifics of the Spectrum Web Component context. Specifically, this configuration allows for certain selectors to be converted to `:host()` or `::slotted()` values as needed in a custom element with shadow DOM, but more generally the process can be used to simplify class names, converted class names and pseudo-classes into other values, and mangle more complex selectors in ways only possible when working with style encapsulation. This process leverages [Lightning CSS](https://lightningcss.dev/) and will `find` one or more [Selector Components](https://github.com/parcel-bundler/lightningcss/blob/master/node/ast.d.ts#L6031) and `replace` them with the provided Selector Component(s). Some system wide helpers are provided via `builder` (to more easily construct individual Selector Components, sans boilerplate) and `converterFor` (to leverage the idea that most packages are focused on a single selector scope). Local to any specific package, additional helpers for building out these JSON objects can be found or built as needed.

The following is an annotated example that serves to document the format
of the `spectrum-config.js` file. A higher-level explanation may be found
[here](/guides/adding-component).

## Annotated Sample

```javascript
// @ts-check
import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

// Prepopulate a converter with the base class name of the package in question.
const converter = converterFor('spectrum-Button');

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            // The Spectrum CSS package from which to source the styles for conversion
            inPackage: '@spectrum-css/button',
            // The directory to place the new styles into.
            // String values assume a directory _within_ the `packages` directory, but an array
            // (e.g. ['tools', 'styles']) can be provided for packages in alternate repo locations
            outPackage: 'button',
            // The postfix of the built CSS files, e.g. `spectrum-${fileName}.css`
            fileName: 'button',
            // Any Selector Components that should cause a Selector to be excluded from the output CSS.
            excludeByComponents: [builder.element('a')],
            // Selector Component conversions to be made.
            components: [
                /**
                 *  Replaces the class name provided to `converterFor` with
                 *  the `:host` Selector Component.
                 *  {
                 *      find: {
                 *          type: 'class',
                 *          name: 'spectrum-Button',
                 *      },
                 *      replace: {
                 *          type: 'pseudo-class',
                 *          kind: 'host',
                 *      }
                 *  }
                 */
                converter.classToHost(),
                /**
                 *  Replaces the class name with an attribute as provided in
                 *  the second argument or derived from the base class name
                 *  saved within the converter.
                 *  {
                 *      find: {
                 *          type: 'class',
                 *          name: 'spectrum-Button--quiet',
                 *      },
                 *      replace: {
                 *          type: 'attribute',
                 *          name: 'quiet',
                 *      }
                 *  }
                 */
                converter.classToAttribute('spectrum-Button--quiet'),
                /**
                 *  {
                 *      find: {
                 *          type: 'class',
                 *          name: 'is-focused',
                 *      },
                 *      replace: {
                 *          type: 'attribute',
                 *          name: 'focused',
                 *      }
                 *  }
                 */
                converter.classToAttribute('is-focused', 'focused'),
                /**
                 *  Replaces a pseudo-class Selector Component with an attribute.
                 *  {
                 *      find: {
                 *          type: 'pseudo-class',
                 *          kind: 'disabled',
                 *      },
                 *      replace: {
                 *          type: 'attribute',
                 *          name: 'disabled',
                 *      }
                 *  }
                 */
                converter.pseudoToAttribute('disabled', 'disabled'),
                /**
                 *  Enumerates a list of related class names to attributes
                 *  {
                 *      find: {
                 *          type: 'classs',
                 *          name: 'spectrum-Button--sizeS',
                 *      },
                 *      replace: {
                 *          type: 'attribute',
                 *          name: 'size',
                 *          operation: {
                 *              operator: 'equals',
                 *              value: 's',
                 *          }
                 *      }
                 *  },
                 *  ...
                 *  {
                 *      find: {
                 *          type: 'classs',
                 *          name: 'spectrum-Button--sizeXL',
                 *      },
                 *      replace: {
                 *          type: 'attribute',
                 *          name: 'size',
                 *          operation: {
                 *              operator: 'equals',
                 *              value: 'xl',
                 *          }
                 *      }
                 *  },
                 */
                ...converter.enumerateAttributes(
                    [
                        ['spectrum-Button--sizeS', 's'],
                        ['spectrum-Button--sizeM', 'm'],
                        ['spectrum-Button--sizeL', 'l'],
                        ['spectrum-Button--sizeXL', 'xl'],
                    ],
                    'size'
                ),
                /**
                 *  Replaces a class Selector Component with an id.
                 *  {
                 *      find: {
                 *          type: 'class',
                 *          name: 'spectrum-Button-label',
                 *      },
                 *      replace: {
                 *          type: 'id',
                 *          name: 'label',
                 *      }
                 *  }
                 */
                converter.classToId('spectrum-Button-label'),
                /**
                 *  Replaces a class Selector Component with a `::slotted()` psudo-class.
                 *  {
                 *      find: {
                 *          type: 'class',
                 *          name: 'spectrum-Icon',
                 *      },
                 *      replace: {
                 *          type: 'pseudo-class',
                 *          name: 'slotted',
                 *          selector: [
                 *              {
                 *                  type: 'attribute',
                 *                  name: 'slot',
                 *                  operation: {
                 *                      operator: 'equal',
                 *                      value: 'icon',
                 *                  }
                 *              }
                 *          ],
                 *      }
                 *  }
                 */
                converter.classToSlotted('spectrum-Icon', 'icon'),
                /**
                 * When `find` and `replace` are provided arrays of Selector Components
                 * the values will be converted when the components are found in the provided
                 * order, e.g.:
                 *
                 *      [dir="ltr"] .spectrum-Icon + .spectrum-Button-label => :host([dir="ltr"]) [name="icon"] + #label
                 *
                 * When `exactSelector` is true, the conversion will only happen when there are
                 * no other components in the selector.
                 *
                 *      ✔️ .spectrum-Icon + .spectrum-Button-label => [name="icon"] + #label
                 *      ❌ [dir="ltr"] .spectrum-Icon + .spectrum-Button-label => :host([dir="ltr"]) .spectrum-Item + .spectrum-Button-label
                 *
                 * The arrays in `find` and `replace` do not need to be symetrical. When they
                 * are not, you can collapse or expand the difference with the `collapseSelector`
                 * and `expandSelector` booleans. Otherwise, when the `replace` array is longer, replacement
                 * will eat into any remaining Selector Components, and when the `replace` is shorter, matches
                 * Selector Components may remain in the larger Selector.
                 */
                {
                    find: [
                        builder.class('spectrum-Icon'),
                        builder.combinator('+'),
                        builder.class('spectrum-Button-label'),
                    ],
                    replace: [
                        {
                            replace: builder.attribute('name', 'icon', 'equal'),
                            hoist: false,
                        },
                        builder.combinator('+'),
                        builder.id('label'),
                    ],
                },
                /**
                 * By default attribute Selector Components are hoisted into the `:host()`
                 * selector. This can be avoided or made true of other components with the
                 * `hoist` boolean.
                 */
                {
                    hoist: false,
                    find: builder.pseudoClass('empty'),
                    replace: builder.attribute('hidden'),
                },
            ],
        },
    ],
};
```
