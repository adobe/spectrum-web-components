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
    LitElement,
    html,
    css,
    property,
    TemplateResult,
    CSSResult,
    CSSResultArray,
    query,
} from '@spectrum-web-components/base';

import { Overlay, Placement } from '../';
import { RadioGroup } from '@spectrum-web-components/radio';
import '@spectrum-web-components/button/sp-button.js';
import { Button } from '@spectrum-web-components/button';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/radio/sp-radio.js';
import '@spectrum-web-components/radio/sp-radio-group.js';
import '@spectrum-web-components/overlay/overlay-trigger.js';

// Prevent infinite recursion in browser
const MAX_DEPTH = 7;

class OverlayTargetIcon extends LitElement {
    static get styles(): CSSResult {
        return css`
            :host {
                position: absolute;
                display: block;
                color: var(--spectrum-global-color-magenta-700);
                width: 64px;
                height: 64px;
            }
        `;
    }

    public render(): TemplateResult {
        return html`
            <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="bullseye"
                class="svg-inline--fa fa-bullseye fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
            >
                <path
                    fill="currentColor"
                    d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm0 432c-101.69 0-184-82.29-184-184 0-101.69 82.29-184 184-184 101.69 0 184 82.29 184 184 0 101.69-82.29 184-184 184zm0-312c-70.69 0-128 57.31-128 128s57.31 128 128 128 128-57.31 128-128-57.31-128-128-128zm0 192c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z"
                ></path>
            </svg>
        `;
    }
}
customElements.define('overlay-target-icon', OverlayTargetIcon);

class OverlayDrag extends LitElement {
    @property({ type: Number })
    private top = 100;
    @property({ type: Number })
    private left = 100;

    private targetElement: HTMLElement | undefined | null;

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }

            ::slotted(*) {
                display: block;
                width: 100%;
                height: 100%;
            }
        `;
    }

    private onSlotChange(event: Event & { target: HTMLSlotElement }): void {
        const slot = event.target as HTMLSlotElement;
        this.targetElement = undefined;

        const nodes = slot.assignedNodes();
        const slotElement = nodes.find(
            (node) => node instanceof HTMLElement
        ) as HTMLElement;
        if (!slotElement) return;

        this.targetElement = slotElement.querySelector(
            '[slot="trigger"]'
        ) as HTMLElement;
        if (!this.targetElement) return;

        this.targetElement.addEventListener('mousedown', (event) =>
            this.onMouseDown(event)
        );

        this.resetTargetPosition();
    }

    private onMouseDown(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const parent = target.parentElement;
        if (!parent) return;

        const max = {
            x: parent.offsetWidth - target.offsetWidth,
            y: parent.offsetHeight - target.offsetHeight,
        };
        const dragStart = {
            x: event.clientX,
            y: event.clientY,
        };
        const originalPos = {
            x: this.left,
            y: this.top,
        };

        const onMouseMove = (event: MouseEvent): void => {
            const dragDelta = {
                x: event.clientX - dragStart.x,
                y: event.clientY - dragStart.y,
            };
            const newPosition = {
                x: dragDelta.x + originalPos.x,
                y: dragDelta.y + originalPos.y,
            };
            this.left = Math.min(Math.max(newPosition.x, 0), max.x);
            this.top = Math.min(Math.max(newPosition.y, 0), max.y);
            Overlay.update();
        };

        const onMouseUp = (): void => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    public resetTargetPosition(): void {
        if (!this.targetElement) return;
        const target = this.targetElement as HTMLElement;
        const parent = target.parentElement;
        if (!parent) return;

        this.left = (parent.offsetWidth - target.offsetWidth) / 2;
        this.top = (parent.offsetHeight - target.offsetHeight) / 2;
    }

    public updated(): void {
        if (this.targetElement) {
            this.targetElement.style.transform = `translate(${this.left}px, ${this.top}px)`;
        }
    }

    public render(): TemplateResult {
        return html`
            <slot @slotchange=${this.onSlotChange}></slot>
        `;
    }
}
customElements.define('overlay-drag', OverlayDrag);

class RecursivePopover extends LitElement {
    @property({ type: String })
    private placement: Placement;

    @property({ type: Number })
    private depth = 0;

    @query('[slot="trigger"]')
    private trigger!: Button;

    protected isShiftTabbing = false;

    public shadowRoot!: ShadowRoot;

    public static get styles(): CSSResultArray {
        return [
            css`
                :host {
                    display: block;
                    text-align: center;
                }

                overlay-trigger {
                    display: inline-flex;
                    margin-top: 11px;
                }
            `,
        ];
    }

    public constructor() {
        super();
        this.placement = 'right';
        this.depth = 0;
        this.addEventListener('keydown', (event: KeyboardEvent) => {
            const { code } = event;
            if (code === 'Enter') {
                this.trigger.click();
            }
        });
        this.addEventListener('focusin', this.handleFocusin);
    }

    private handleFocusin(): void {
        console.log('focusin');
        this.focus();
    }

    public focus(): void {
        console.log('focus');
        if (this.shadowRoot.activeElement !== null) {
            return;
        }
        const firstFocusable = this.shadowRoot.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as LitElement;
        if (firstFocusable) {
            if (firstFocusable.updateComplete) {
                firstFocusable.updateComplete.then(() =>
                    firstFocusable.focus()
                );
            } else {
                firstFocusable.focus();
            }
            return;
        }
        super.focus();
    }

    public onRadioChange(event: Event): void {
        const target = event.target as RadioGroup;
        this.placement = target.selected as Placement;
    }

    private captureEnter(event: KeyboardEvent): void {
        const { code } = event;
        if (code === 'Enter') {
            event.stopPropagation();
        }
    }

    public render(): TemplateResult {
        return html`
            <sp-radio-group
                @change=${this.onRadioChange}
                selected="${this.placement}"
                name="group-example"
            >
                <sp-radio value="top">
                    Top
                </sp-radio>
                <sp-radio value="right">
                    Right
                </sp-radio>
                <sp-radio value="bottom">
                    Bottom
                </sp-radio>
                <sp-radio value="left">
                    Left
                </sp-radio>
            </sp-radio-group>
            <overlay-trigger placement="${this.placement}" type="modal">
                <sp-button
                    slot="trigger"
                    variant="cta"
                    @keydown=${this.captureEnter}
                >
                    Open Popover
                </sp-button>
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
                                  tabindex=""
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
