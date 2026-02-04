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

import '@spectrum-web-components/color-field/sp-color-field.js';
import '@spectrum-web-components/help-text/sp-help-text.js';

export interface Properties {
    quiet?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    viewColor?: boolean;
    value?: string;
    label?: string;
    size?: 's' | 'm' | 'l' | 'xl';
}

export const ColorFieldMarkup = ({
    label = 'Color Field',
    slottedLabel = '',
    quiet = false,
    size = 'm',
    readonly = false,
    disabled = false,
    viewColor = false,
    value = '',
    helpText = '',
    sideAligned = '',
} = {}): TemplateResult => {
    return html`
        <sp-color-field
            label=${label}
            size=${size}
            value=${value}
            side-aligned=${ifDefined(
                sideAligned === 'start' || sideAligned === 'end'
                    ? sideAligned
                    : undefined
            )}
            ?view-color=${viewColor}
            ?quiet=${quiet}
            ?readonly=${readonly}
            ?disabled=${disabled}
        >
            ${slottedLabel}
            ${helpText === ''
                ? html``
                : html`
                      <sp-help-text slot="help-text">${helpText}</sp-help-text>
                  `}
        </sp-color-field>
    `;
};

export const Template = ColorFieldMarkup;
