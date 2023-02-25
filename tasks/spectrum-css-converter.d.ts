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
    emphasize?: boolean;
    hoist?: boolean;
    replace: SelectorComponent;
};

type ComplexSelectorConversion = {
    find: SelectorComponent[];
    collapseSelector?: boolean;
    exactSelector?: boolean;
    expandSelector?: boolean;
    replace: ('take' | ReplacementComponent)[];
};

type SelectorConversion = ReplacementComponent & {
    find: SelectorComponent;
};

type SelectorComponentWithRegex = SelectorComponent & {
    regex?: RegExp;
};

type Conversion = {
    allowThemeRules?: boolean;
    components: (SelectorConversion | ComplexSelectorConversion)[];
    excludeByExactComponentSeries?: SelectorComponentWithRegex[][];
    excludeByComponents?: SelectorComponentWithRegex[];
    fileName: string;
    hoistCustomPropertiesFrom?: string;
    inPackage: string;
    outPackage: string | string[];
    requireComponentPresence?: SelectorComponentWithRegex[];
};

export type SpectrumCSSConverter = {
    conversions: Conversion[];
};
