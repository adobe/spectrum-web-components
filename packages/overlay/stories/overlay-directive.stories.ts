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
import { html, TemplateResult } from '@spectrum-web-components/base';
import {
    OverlayContentTypes,
    Placement,
    TriggerInteractions,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/action-button/sp-action-button.js';
import '@spectrum-web-components/action-group/sp-action-group.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-open-in.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';
import { trigger } from '@spectrum-web-components/overlay/src/overlay-trigger-directive.js';

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/slider/sp-slider.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';
import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '../../../projects/story-decorator/src/types.js';

import './overlay-story-components.js';
import { tooltip } from '@spectrum-web-components/tooltip/src/tooltip-directive.js';

const storyStyles = html`
    <style>
        html,
        body,
        #root,
        #root-inner,
        sp-story-decorator {
            height: 100%;
            margin: 0;
        }

        sp-story-decorator::part(container) {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }

        overlay-trigger {
            flex: none;
        }

        #styled-div {
            background-color: var(--styled-div-background-color, blue);
            color: white;
            padding: 4px 10px;
            margin-bottom: 10px;
        }

        #inner-trigger {
            display: inline-block;
        }
    </style>
`;

export default {
    title: 'Overlay Directive',
    argTypes: {
        offset: { control: 'number' },
        placement: {
            control: {
                type: 'inline-radio',
                options: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                    'left',
                    'left-start',
                    'left-end',
                    'right',
                    'right-start',
                    'right-end',
                    'auto',
                    'auto-start',
                    'auto-end',
                    'none',
                ],
            },
        },
        type: {
            control: {
                type: 'inline-radio',
                options: ['modal', 'replace', 'inline'],
            },
        },
        colorStop: {
            control: {
                type: 'inline-radio',
                options: ['light', 'dark'],
            },
        },
    },
    args: {
        placement: 'bottom',
        offset: 0,
        colorStop: 'light',
    },
};

interface Properties {
    placement: Placement;
    offset: number;
    open?: OverlayContentTypes;
    type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;
}

const template = ({ placement, offset, open }: Properties): TemplateResult => {
    return html`
        ${storyStyles}
        <sp-button
            variant="primary"
            ${tooltip('Click to open a popover.')}
            ${trigger(
                html`
                    <sp-popover placement="${placement}" tip>
                        <sp-dialog no-divider>
                            <div class="options-popover-content">
                                <sp-slider
                                    value="5"
                                    step="0.5"
                                    min="0"
                                    max="20"
                                    label="Awesomeness"
                                ></sp-slider>
                                <div id="styled-div">
                                    The background of this div should be blue
                                </div>
                                <sp-button
                                    ${tooltip('Click to open another popover.')}
                                    ${trigger(
                                        html`
                                            <sp-popover
                                                placement="bottom"
                                                tip
                                                open
                                            >
                                                <sp-dialog size="s" no-divider>
                                                    <div
                                                        class="options-popover-content"
                                                    >
                                                        Another Popover
                                                    </div>
                                                </sp-dialog>
                                            </sp-popover>
                                        `,
                                        {
                                            placement: 'bottom',
                                            triggerOn: 'click',
                                        }
                                    )}
                                >
                                    Press Me
                                </sp-button>
                            </div>
                        </sp-dialog>
                    </sp-popover>
                `,
                {
                    placement,
                    triggerOn: open,
                    offset,
                }
            )}
        >
            Show Popover
        </sp-button>
    `;
};

export const Default = (args: Properties): TemplateResult => template(args);
