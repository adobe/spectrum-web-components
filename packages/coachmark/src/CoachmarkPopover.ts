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
    html,
    PropertyValueMap,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    openOverlay,
    type OverlayOptions,
    type Placement,
} from '@spectrum-web-components/overlay';
import {
    property,
    queryAssignedElements,
} from '@spectrum-web-components/base/src/decorators.js';
import { when } from '@spectrum-web-components/base/src/directives.js';

import styles from './coachmark-popover.css.js';
import type { CoachmarkPopoverContent } from './CoachmarkPopoverContent.js';

/**
 * @element sp-coachmark-popover
 */
export class CoachmarkPopover extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @queryAssignedElements()
    defaultSlot?: HTMLElement[];

    @queryAssignedElements({ slot: 'coachmark' })
    coachmarkSlot?: HTMLElement[];

    private get target(): HTMLElement | undefined {
        const [target] = this.defaultSlot ?? [];
        return target;
    }

    private get content(): CoachmarkPopoverContent | undefined {
        const [content] = this.coachmarkSlot ?? [];
        return content as CoachmarkPopoverContent;
    }

    private get overlayOptions(): OverlayOptions {
        return {
            offset: this.offset,
            placement: this.placement,
            receivesFocus: 'auto',
        };
    }

    private openStatePromise = Promise.resolve();
    private openStateResolver?: () => void;
    private closeCoachmarkFunction?: () => void;

    private async manageOpen(): Promise<void> {
        this.openStatePromise = new Promise(
            (res) => (this.openStateResolver = res)
        );
        if (this.open) {
            await this.openOverlay();
        } else {
            await this.closeOverlay();
        }
        this.openStateResolver?.();
    }

    private async closeOverlay(): Promise<void> {
        return new Promise(async (res) => {
            this.open = false;
            if (this.closeCoachmarkFunction) {
                this.addEventListener(
                    'sp-closed',
                    () => {
                        res();
                    },
                    { once: true }
                );
                this.closeCoachmarkFunction();
                this.closeCoachmarkFunction = undefined;
            } else {
                res();
            }
            this.dispatchEvent(
                new Event('sp-coachmark-closed', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
        });
    }

    private overlaidContent?: CoachmarkPopoverContent;

    private openOverlay(): Promise<void> {
        return new Promise(async (res) => {
            if (!this.content || !this.target || this.closeCoachmarkFunction) {
                this.open = false;
                res();
                return;
            }
            this.overlaidContent = this.content;
            this.overlaidContent.addEventListener('close', (event: Event) => {
                event.stopPropagation();
                this.closeOverlay();
            });
            this.addEventListener(
                'sp-opened',
                () => {
                    res();
                },
                { once: true }
            );
            this.closeCoachmarkFunction = await openOverlay(
                this.target,
                'custom',
                this.overlaidContent,
                this.overlayOptions
            );
            this.dispatchEvent(
                new Event('sp-coachmark-opened', {
                    bubbles: true,
                    cancelable: true,
                    composed: true,
                })
            );
        });
    }

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.openStatePromise;
        return complete;
    }

    public override disconnectedCallback(): void {
        this.closeOverlay();
        super.disconnectedCallback();
    }

    protected override updated(
        changedProperties: PropertyValueMap<this>
    ): void {
        super.updated(changedProperties);

        if (changedProperties.has('open')) {
            this.manageOpen();
        }
    }

    override render(): TemplateResult {
        return html`
            <div id="target">
                <slot></slot>
                ${when(
                    this.open,
                    () => html`
                        <div id="coachmark-wrapper">
                            <slot name="pulse">
                                <sp-coachmark></sp-coachmark>
                            </slot>
                        </div>
                    `
                )}
            </div>
            <slot name="coachmark"></slot>
        `;
    }
}
