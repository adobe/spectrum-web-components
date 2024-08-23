/*
Copyright 2024 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

// import our stylesheets
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/theme-light.js';
import '@spectrum-web-components/theme/scale-medium.js';

// import the components we'll use in this page
import '@spectrum-web-components/button/sp-button.js';

import '@spectrum-web-components/checkbox/sp-checkbox.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/link/sp-link.js';
import '@spectrum-web-components/icon/sp-icon.js';

// import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import createPermutations from './utils/permutations.ts';

import { TemplateResult } from '@spectrum-web-components/base';

interface SpButtonProps {
    iconSlot?: string | TemplateResult;
    defaultSlot?: string | TemplateResult;
    active?: boolean;
    disabled?: boolean;
    download?: string;
    href?: string;
    label?: string;
    pending?: boolean;
    pendingLabel?: string;
    quiet?: boolean;
    static?: 'black' | 'white';
    treatment?: 'fill' | 'outline';
    variant?: 'accent' | 'primary' | 'secondary' | 'negative';
}

const buttonPermutations = createPermutations<SpButtonProps>([
    {
        variant: ['accent', 'primary', 'secondary', 'negative'],
        treatment: ['fill', 'outline'],
        label: ['Button'],
        defaultSlot: ['Button'],
        iconSlot: [
            undefined,
            html`
                <svg slot="icon" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="32"></circle>
                </svg>
            `,
        ],
    },
    {
        static: ['black', 'white'],
        variant: ['primary'],
        treatment: ['fill', 'outline'],
        label: ['Button'],
        defaultSlot: ['Button'],
        iconSlot: [
            undefined,
            html`
                <svg slot="icon" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="32"></circle>
                </svg>
            `,
        ],
    },
    {
        variant: ['primary'],
        defaultSlot: ['Pending Button'],
        pending: [true],
        pendingLabel: ['Loading...'],
    },
]);

@customElement('button-permutations')
class ButtonPermutations extends LitElement {
    static styles = css`
        .container {
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 12px;
        }

        .props {
            font-family: monospace;
            font-size: 12px;
            background-color: #f5f5f5;
            padding: 8px;
            border-radius: 4px;
            margin-bottom: 4px;
            white-space: pre-wrap; /* Ensure that line breaks and spaces are preserved */
        }
    `;
    render() {
        return html`
            <div class="container">
                ${buttonPermutations.map((props) => {
                    const propsString = JSON.stringify(props, null, 2);
                    return html`
                        <div class="props">${propsString}</div>
                        <sp-button
                            ?active=${props.active}
                            ?disabled=${props.disabled}
                            download=${props.download ?? ''}
                            href=${props.href ?? ''}
                            label=${props.label ?? ''}
                            ?pending=${props.pending}
                            pending-label=${props.pendingLabel ?? ''}
                            ?quiet=${props.quiet}
                            treatment=${props.treatment ?? 'fill'}
                            variant=${props.variant ?? 'primary'}
                        >
                            ${props.iconSlot} ${props.defaultSlot}
                        </sp-button>
                    `;
                })}
            </div>
        `;
    }
}
