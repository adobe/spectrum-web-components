/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { storiesOf } from '@storybook/polymer';
import { number, radios } from '@storybook/addon-knobs';
import { html, LitElement, css, property } from 'lit-element';

import { Placement } from '../src/overlay-root/overlay';
import { RadioChangeDetail } from '../src/radio/radio';
import '../src/overlay-root';
import '../src/overlay-trigger';
import '../src/button';
import '../src/popover';
import '../src/slider';
import '../src/radio';
import '../src/radio-group';

// Prevent infinite recursion in browser
const MAX_DEPTH = 7;

class RecursivePopover extends LitElement {
    @property({ type: String })
    private placement: Placement;

    @property({ type: Number })
    private depth: number = 0;

    static get styles() {
        return css`
            :host {
                text-align: center;
            }

            sp-button {
                margin-top: 11px;
            }
        `;
    }

    constructor() {
        super();
        this.placement = 'right';
        this.depth = 0;
    }

    onRadioChange(event: CustomEvent<RadioChangeDetail>) {
        this.placement = event.detail.value as Placement;
    }

    render() {
        return html`
            <sp-radio-group selected="${this.placement}" name="group-example">
                <sp-radio @sp-radio:change=${this.onRadioChange} value="top">
                    Top
                </sp-radio>
                <sp-radio @sp-radio:change=${this.onRadioChange} value="right">
                    Right
                </sp-radio>
                <sp-radio @sp-radio:change=${this.onRadioChange} value="bottom">
                    Bottom
                </sp-radio>
                <sp-radio @sp-radio:change=${this.onRadioChange} value="left">
                    Left
                </sp-radio>
            </sp-radio-group>
            <overlay-trigger placement="${this.placement}">
                <sp-button slot="trigger" variant="cta">Open Popover</sp-button>
                <sp-popover
                    dialog
                    slot="click-content"
                    direction="${this.placement}"
                    tip
                    open
                >
                    ${this.depth < MAX_DEPTH
                        ? html`
                              <recursive-popover
                                  position="${this.placement}"
                                  depth="${this.depth + 1}"
                              ></recursive-popover>
                          `
                        : html`
                              <div>Maximum Depth</div>
                          `}
                </sp-popover>
            </overlay-trigger>
        `;
    }
}
customElements.define('recursive-popover', RecursivePopover);

storiesOf('Overlay Root', module)
    .add('Default', () => {
        const positionOptions = {
            top: 'top',
            bottom: 'bottom',
            left: 'left',
            right: 'right',
        };
        const placement = radios(
            'Type',
            positionOptions,
            positionOptions.bottom
        ) as Placement;
        const offset = number('Offset', 6);

        return html`
            <style>
                html,
                body,
                #root,
                #root-inner {
                    height: 100%;
                    margin: 0;
                }

                overlay-root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                overlay-trigger {
                    flex: none;
                }

                #styled-div {
                    background-color: blue;
                    color: white;
                    padding: 4px 10px;
                    margin-bottom: 10px;
                }

                .tooltip {
                    background-color: rgb(200, 200, 200);
                    padding: 4px 7px;
                }

                #inner-trigger {
                    display: inline-block;
                }
            </style>
            <overlay-root>
                <overlay-trigger
                    id="trigger"
                    placement="${placement}"
                    offset="${offset}"
                >
                    <sp-button variant="primary" slot="trigger">
                        Show Popover
                    </sp-button>
                    <sp-popover
                        dialog
                        slot="click-content"
                        direction="${placement}"
                        tip
                        open
                    >
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
                            <overlay-trigger
                                id="inner-trigger"
                                placement="bottom"
                            >
                                <sp-button slot="trigger">Press Me</sp-button>
                                <sp-popover
                                    dialog
                                    slot="click-content"
                                    direction="bottom"
                                    tip
                                    open
                                >
                                    <div class="options-popover-content">
                                        Another Popover
                                    </div>
                                </sp-popover>

                                <div
                                    slot="hover-content"
                                    class="tooltip"
                                    delay="100"
                                >
                                    Tooltip
                                </div>
                            </overlay-trigger>
                        </div>
                    </sp-popover>
                    <div slot="hover-content" class="tooltip" delay="100">
                        Tooltip
                    </div>
                </overlay-trigger>
            </overlay-root>
        `;
    })
    .add('Deep Nesting', () => {
        return html`
            <style>
                html,
                body,
                #root,
                #root-inner {
                    height: 100%;
                    margin: 0;
                }

                overlay-root {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                overlay-trigger {
                    flex: none;
                }

                #styled-div {
                    background-color: blue;
                    color: white;
                    padding: 4px 10px;
                    margin-bottom: 10px;
                }

                .tooltip {
                    background-color: rgb(200, 200, 200);
                    padding: 4px 7px;
                }

                #inner-trigger {
                    display: inline-block;
                }
            </style>
            <overlay-root>
                <recursive-popover></recursive-popover>
            </overlay-root>
        `;
    });
