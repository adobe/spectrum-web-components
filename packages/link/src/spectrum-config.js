// @ts-check
/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    builder,
    converterFor,
} from '../../../tasks/process-spectrum-utils.js';

const converter = converterFor('spectrum-Link');

/**
 * @returns {import('../../../tasks/spectrum-css-converter').ComplexSelectorConversion}
 */
const includeAnchor = (className, attribute, value) => ({
    find: [
        /** @type {import('lightningcss').SelectorComponent} */ (
            builder.class(className)
        ),
    ],
    replace: [
        {
            replace: /** @type {import('lightningcss').SelectorComponent} */ ({
                type: 'pseudo-class',
                kind: 'host',
                selectors: [builder.attribute(attribute, value)],
            }),
        },
        {
            replace: builder.combinator('descendant'),
        },
        {
            replace: builder.element('a'),
        },
    ],
});

/**
 *
 * @param {string} pseudo
 * @param {string} className
 * @param {string} attribute
 * @param {string} value
 * @returns {import('../../../tasks/spectrum-css-converter').ComplexSelectorConversion}
 */
const includeAnchorWithPseudoClass = (pseudo, className, attribute, value) => {
    const component = includeAnchor(className, attribute, value);
    const pseudoComponent =
        /** @type {import('lightningcss').SelectorComponent} */ (
            builder.pseudoClass(pseudo)
        );
    component.find.push(pseudoComponent);
    component.replace.push({
        replace: pseudoComponent,
    });
    return component;
};

/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/link',
            outPackage: 'link',
            fileName: 'link',
            hoistCustomPropertiesFrom: 'spectrum-Link',
            components: [
                {
                    find: [
                        builder.class('spectrum-Link'),
                        builder.pseudoClass('active'),
                    ],
                    replace: [],
                },
                {
                    find: [
                        builder.class('spectrum-Link'),
                        builder.pseudoClass('hover'),
                    ],
                    replace: [
                        {
                            replace: builder.element('a'),
                        },
                        {
                            replace: builder.pseudoClass('hover'),
                        },
                    ],
                },
                includeAnchor('spectrum-Link--quiet', 'quiet'),
                includeAnchorWithPseudoClass(
                    'hover',
                    'spectrum-Link--quiet',
                    'quiet'
                ),
                includeAnchor(
                    'spectrum-Link--secondary',
                    'variant',
                    'secondary'
                ),
                includeAnchorWithPseudoClass(
                    'hover',
                    'spectrum-Link--secondary',
                    'variant',
                    'secondary'
                ),
                includeAnchorWithPseudoClass(
                    'active',
                    'spectrum-Link--secondary',
                    'variant',
                    'secondary'
                ),
                includeAnchorWithPseudoClass(
                    'focus',
                    'spectrum-Link--secondary',
                    'variant',
                    'secondary'
                ),
                includeAnchor('spectrum-Link--staticWhite', 'static', 'white'),
                includeAnchorWithPseudoClass(
                    'hover',
                    'spectrum-Link--staticWhite',
                    'static',
                    'white'
                ),
                includeAnchorWithPseudoClass(
                    'active',
                    'spectrum-Link--staticWhite',
                    'static',
                    'white'
                ),
                includeAnchorWithPseudoClass(
                    'focus',
                    'spectrum-Link--staticWhite',
                    'static',
                    'white'
                ),
                includeAnchor('spectrum-Link--staticBlack', 'static', 'black'),
                includeAnchorWithPseudoClass(
                    'hover',
                    'spectrum-Link--staticBlack',
                    'static',
                    'black'
                ),
                includeAnchorWithPseudoClass(
                    'active',
                    'spectrum-Link--staticBlack',
                    'static',
                    'black'
                ),
                includeAnchorWithPseudoClass(
                    'focus',
                    'spectrum-Link--staticBlack',
                    'static',
                    'black'
                ),
                {
                    find: builder.class('spectrum-Link'),
                    replace: builder.element('a'),
                },
                converter.classToAttribute('spectrum-Link--quiet'),
                converter.classToAttribute(
                    'spectrum-Link--overBackground',
                    'over-background'
                ),
            ],
        },
    ],
};

export default config;
