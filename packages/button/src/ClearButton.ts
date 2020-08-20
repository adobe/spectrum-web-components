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
    TemplateResult,
    html,
    property,
} from '@spectrum-web-components/base';
import { ButtonBase } from './ButtonBase.js';
import buttonStyles from './clear-button.css.js';
import { CrossLargeIcon } from '@spectrum-web-components/icons-ui';
import crossMediumStyles from '@spectrum-web-components/icon/src/spectrum-icon-cross-medium.css.js';

export class ClearButton extends ButtonBase {
    public static get styles(): CSSResultArray {
        return [...super.styles, buttonStyles, crossMediumStyles];
    }

    /**
     * The visual variant to apply to this button.
     */
    @property({ reflect: true })
    public variant: 'overBackground' | '' = '';

    protected get buttonContent(): TemplateResult[] {
        return [
            html`
                <sp-icon slot="icon" class="icon cross-medium" size="s">
                    ${CrossLargeIcon({ hidden: true })}
                </sp-icon>
            `,
        ];
    }
}
