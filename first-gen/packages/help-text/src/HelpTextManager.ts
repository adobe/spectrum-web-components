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
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import type { HelpText } from './HelpText';

export class HelpTextManager {
    private conditionId?: () => void;
    private host!: HTMLElement;
    public id!: string;
    private mode: 'internal' | 'external' = 'internal';
    private previousTabindex?: -1 | 0 | undefined;
    private helpTextElement!: Element;
    private get isInternal(): boolean {
        return this.mode === 'internal';
    }

    constructor(
        host: HTMLElement,
        { mode }: { mode: 'internal' | 'external' } = { mode: 'internal' }
    ) {
        this.host = host;
        this.id = `sp-help-text-${randomID()}`;
        this.mode = mode;
    }

    public render(negative?: boolean): TemplateResult {
        // `pass-through-help-text-${this.instanceCount}` makes the slot effectively unreachable from
        // the outside allowing the `help-text` slot to be preferred while `negative === false`.
        return html`
            <div
                id=${ifDefined(this.isInternal ? this.id : undefined)}
                aria-live="assertive"
            >
                <slot
                    name=${negative
                        ? 'negative-help-text'
                        : `pass-through-help-text-${randomID()}`}
                    @slotchange=${this.handleSlotchange}
                >
                    <slot name="help-text"></slot>
                </slot>
            </div>
        `;
    }

    private addId(): void {
        const id = this.helpTextElement ? this.helpTextElement.id : this.id;
        this.conditionId = conditionAttributeWithId(
            this.host,
            'aria-describedby',
            id
        );
        if (this.host.hasAttribute('tabindex')) {
            this.previousTabindex = parseFloat(
                this.host.getAttribute('tabindex') as string
            ) as -1 | 0;
        }
        this.host.tabIndex = 0;
    }

    private removeId(): void {
        if (this.conditionId) {
            this.conditionId();
            delete this.conditionId;
        }
        if (this.helpTextElement) return;
        if (this.previousTabindex) {
            this.host.tabIndex = this.previousTabindex;
        } else {
            this.host.removeAttribute('tabindex');
        }
    }

    private handleSlotchange = ({
        target,
    }: Event & { target: HTMLSlotElement }): void => {
        this.handleHelpText(target);
        this.handleNegativeHelpText(target);
    };

    private handleHelpText(target: HTMLSlotElement): void {
        if (this.isInternal) return;

        if (this.helpTextElement && this.helpTextElement.id === this.id) {
            this.helpTextElement.removeAttribute('id');
        }
        this.removeId();
        const assignedElements = target.assignedElements();
        const nextHelpTextElement = assignedElements[0];
        this.helpTextElement = nextHelpTextElement;
        if (nextHelpTextElement) {
            if (!nextHelpTextElement.id) {
                nextHelpTextElement.id = this.id;
            }
            this.addId();
        }
    }

    private handleNegativeHelpText(target: HTMLSlotElement): void {
        if (target.name !== 'negative-help-text') return;

        const assignedElements = target.assignedElements();
        assignedElements.forEach(
            (el) => ((el as unknown as HelpText).variant = 'negative')
        );
    }
}
