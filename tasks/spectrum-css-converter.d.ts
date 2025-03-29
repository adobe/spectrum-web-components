// @ts-check
/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { Selector, SelectorComponent } from 'lightningcss';

export type HostSelectorComponent = SelectorComponent & {
    kind: 'host';
    selectors?: Selector | null;
    type: 'pseudo-class';
};

type ReplacementComponent = {
    /**
     * Emphasize the specificity of this Selector Component by using it twice
     * in the final Selector
     */
    emphasize?: boolean;
    /**
     * Whether to apply this Selector Component to `:host(...)`. Attribute Selector
     * Components are hoised by default
     */
    hoist?: boolean;
    replace: SelectorComponent;
};

export type ComplexSelectorConversion = {
    find: SelectorComponent[];
    /**
     * Remove Selector Components from the final selector so that it matches the
     * length of the `replace` listing
     */
    collapseSelector?: boolean;
    /**
     * Only convert the Selector when all of the Selector Components are matched
     */
    exactSelector?: boolean;
    /**
     * Add Selector Components to the final selector so that it matches the
     * length of the `replace` listing
     */
    expandSelector?: boolean;
    replace: ('take' | ReplacementComponent)[];
};

export type SelectorConversion = ReplacementComponent & {
    find: SelectorComponent;
};

type SelectorComponentWithRegex = SelectorComponent & {
    /**
     * A RegExp can be provided to help match a larger sampling of Component Selectors
     */
    regex?: RegExp;
};

export type Conversion = {
    components: (SelectorConversion | ComplexSelectorConversion)[];
    /**
     * Selectors exactly matching the array of Selector Components present will be excluded
     */
    excludeByWholeSelector?: SelectorComponentWithRegex[][];
    /**
     * Selectors containing an included Selector Component will be excluded
     */
    excludeByComponents?: SelectorComponentWithRegex[];
    fileName: string;
    /**
     * When a Rule only contains CSS Custom Property definitions and matches this selector, move
     * the Rule to point to `:host`
     */
    hoistCustomPropertiesFrom?: string;
    /**
     * Selectors exactly matching the array of Selector Components present will be included
     */
    includeByWholeSelector?: SelectorComponentWithRegex[][];
    inPackage: string;
    outPackage: string | string[];
    /**
     * Exclude Selectors that do not feature the Selector Components included herein
     */
    requireComponentPresence?: SelectorComponentWithRegex[];
};

export type SpectrumCSSConverter = {
    conversions: Conversion[];
};
