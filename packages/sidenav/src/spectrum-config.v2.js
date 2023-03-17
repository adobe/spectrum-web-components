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

const converter = converterFor('spectrum-Sidenav');
/**
 * @type { import('../../../tasks/spectrum-css-converter').SpectrumCSSConverter }
 */
const config = {
    conversions: [
        {
            inPackage: '@spectrum-css/sidenav',
            outPackage: 'sidenav',
            fileName: 'sidenav',
            components: [
                converter.classToHost('spectrum-SideNav'),
                converter.classToAttribute(
                    'spectrum-SideNav--multiLevel',
                    'multilevel'
                ),
            ],
            excludeByComponents: [
                builder.class('spectrum-SideNav-item'),
                builder.class('spectrum-SideNav-itemLink'),
                builder.class('spectrum-SideNav-heading'),
            ],
        },
        {
            inPackage: '@spectrum-css/sidenav',
            outPackage: 'sidenav',
            fileName: 'sidenav-item',
            components: [
                converter.classToHost('spectrum-SideNav-item'),
                converter.classToAttribute('is-selected', 'selected'),
                converter.classToAttribute('is-disabled', 'disabled'),
                converter.classToId('spectrum-SideNav-itemLink', 'item-link'),
                converter.classToId('spectrum-SideNav', 'list'),
                converter.classToSlotted('spectrum-SideNav-itemIcon', 'icon'),
                {
                    // prevents hoisting .focus-ring to :host as :focus-visible
                    find: [builder.class('focus-ring')],
                    replace: [
                        {
                            replace: builder.pseudoClass('focus-visible'),
                        },
                    ],
                },
            ],
            excludeByComponents: [
                builder.class('spectrum-SideNav--multiLevel'),
            ],
            excludeByExactComponentSeries: [
                [builder.class('spectrum-SideNav-heading')],
            ],
        },
        {
            inPackage: '@spectrum-css/sidenav',
            outPackage: 'sidenav',
            fileName: 'sidenav-heading',
            components: [
                converter.classToId('spectrum-SideNav-heading', 'heading'),
                converter.classToId('spectrum-SideNav-heading', 'heading'),
                converter.classToId('spectrum-SideNav', 'list'),
            ],
            excludeByComponents: [
                builder.class('spectrum-SideNav-item'),
                builder.class('spectrum-SideNav-itemLink'),
                builder.class('spectrum-SideNav--multiLevel'),
            ],
        },
    ],
};

export default config;
