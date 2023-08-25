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
import { html, nothing, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/icon/sp-icon.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';

export const ActionMenuMarkup = ({
    ariaLabel = 'More Actions',
    changeHandler = (() => undefined) as (event: Event) => void,
    disabled = false,
    open = false,
    quiet = false,
    visibleLabel = '',
    customIcon = '' as string | TemplateResult,
    size = 'm' as 'm' | 's' | 'l' | 'xl' | 'xxl',
    selects = '' as 'single',
    selected = false,
    tooltipDescription = '',
    tooltipPlacement = 'bottom',
} = {}): TemplateResult => {
    return html`
        <sp-action-menu
            label=${ariaLabel}
            ?disabled=${disabled}
            ?open=${open}
            ?quiet=${quiet}
            size=${size}
            @change="${changeHandler}"
            .selects=${selects ? selects : undefined}
            value=${selected ? 'Select Inverse' : ''}
        >
            ${customIcon ? customIcon : nothing}
            ${visibleLabel
                ? html`
                      <span slot="label">${visibleLabel}</span>
                  `
                : nothing}
            <sp-menu-item>Deselect</sp-menu-item>
            <sp-menu-item ?selected=${selected}>Select Inverse</sp-menu-item>
            <sp-menu-item>Feather...</sp-menu-item>
            <sp-menu-item>Select and Mask...</sp-menu-item>
            <sp-menu-divider></sp-menu-divider>
            <sp-menu-item>Save Selection</sp-menu-item>
            <sp-menu-item disabled>Make Work Path</sp-menu-item>
            ${tooltipDescription
                ? html`
                      <sp-tooltip
                          slot="tooltip"
                          self-managed
                          placement=${tooltipPlacement}
                      >
                          ${tooltipDescription}
                      </sp-tooltip>
                  `
                : html``}
        </sp-action-menu>
    `;
};
