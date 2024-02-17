/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    CSSResultArray,
    PropertyValues,
    SizedMixin,
    SpectrumElement,
} from '@spectrum-web-components/base';

import stylesDefault from './spectrum-menu-divider.min.css' with { type: 'css' };
import stylesOveride from './menu-divider.min.css' with { type: 'css' };
import dividerStylesDefault from '@spectrum-web-components/divider/src/spectrum-divider.min.css' with { type: 'css' };
import dividerStylesOveride from '@spectrum-web-components/divider/src/divider.min.css' with { type: 'css' };

/**
 * @element sp-menu-divider
 */
export class MenuDivider extends SizedMixin(SpectrumElement, {
    validSizes: ['s', 'm', 'l'],
}) {
    public static override get styles(): CSSResultArray {
        return [
            dividerStylesDefault,
            dividerStylesOveride,
            stylesDefault,
            stylesOveride,
        ];
    }

    protected override firstUpdated(changed: PropertyValues<this>): void {
        super.firstUpdated(changed);
        this.setAttribute('role', 'separator');
    }
}
