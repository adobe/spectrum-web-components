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
    html,
    SpectrumElement,
    CSSResultArray,
    TemplateResult,
    property,
    PropertyValues,
} from '@spectrum-web-components/base';
import type { Focusable } from '@spectrum-web-components/shared';
import { AsteriskIcon } from '@spectrum-web-components/icons-ui';
import '@spectrum-web-components/icon/sp-icon.js';
import asterickIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-asterick.css.js';

import styles from './field-label.css.js';

/**
 * @element sp-field-label
 */
export class FieldLabel extends SpectrumElement {
    public static get styles(): CSSResultArray {
        return [styles, asterickIconStyles];
    }

    static instanceCount = 0;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: String })
    public id = '';

    @property({ type: String })
    public for = '';

    @property({ type: Boolean, reflect: true })
    public required = false;

    @property({ type: String, reflect: true, attribute: 'side-aligned' })
    public sideAligned?: 'start' | 'end';

    private target?: HTMLElement;

    private handleClick(): void {
        if (!this.target || this.disabled) return;
        this.target.focus();
    }

    private async manageFor(): Promise<void> {
        if (!this.for) {
            return;
        }
        const parent = this.getRootNode() as HTMLElement;
        const target = parent.querySelector(`#${this.for}`) as Focusable;
        if (typeof target.updateComplete !== 'undefined') {
            await target.updateComplete;
        }
        this.target = target.focusElement || target;
        if (this.target) {
            const targetParent = this.target.getRootNode() as HTMLElement;
            if (targetParent.isSameNode(parent)) {
                this.target.setAttribute('aria-labelledby', this.id);
            } else {
                this.target.setAttribute(
                    'aria-label',
                    (this.textContent || /* c8 ignore next */ '').trim()
                );
            }
        }
    }

    protected render(): TemplateResult {
        return html`
            <label>
                <slot></slot>
                ${this.required
                    ? html`
                          <sp-icon class="requiredIcon asterick">
                              ${AsteriskIcon({ hidden: true })}
                          </sp-icon>
                      `
                    : html``}
            </label>
        `;
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (!this.hasAttribute('id')) {
            this.setAttribute(
                'id',
                `${this.tagName.toLowerCase()}-${FieldLabel.instanceCount++}`
            );
        }
        this.addEventListener('click', this.handleClick);
    }

    protected updated(changes: PropertyValues): void {
        super.updated(changes);
        if (changes.has('for') || changes.has('id')) {
            this.manageFor();
        }
    }
}
