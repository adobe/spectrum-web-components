/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { html, TemplateResult } from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import {
    ButtonTreatments,
    ButtonVariants,
} from '@spectrum-web-components/button/src/Button.js';

export interface Properties {
    staticColor?: 'white' | 'black';
    variant?: ButtonVariants;
    treatment?: ButtonTreatments;
    quiet?: boolean;
    pending?: boolean;
    content?: TemplateResult;
    disabled?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
    href?: string;
    target?: '_blank' | '_parent' | '_self' | '_top';
    noWrap?: boolean;
    iconOnly?: boolean;
    label?: string;
}

export const Template = ({
    disabled,
    pending,
    size,
    treatment,
    variant,
}: Properties): TemplateResult => html`
    <sp-button
        ?disabled=${disabled}
        ?pending=${pending}
        size=${ifDefined(size)}
        treatment=${ifDefined(treatment)}
        variant=${ifDefined(variant)}
    >
        Test Button
    </sp-button>
`;
