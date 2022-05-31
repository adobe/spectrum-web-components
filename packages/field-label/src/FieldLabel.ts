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
    PropertyValues,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import type { Focusable } from '@spectrum-web-components/shared';
import '@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js';
import asteriskIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-asterisk.css.js';

import styles from './field-label.css.js';

type AcceptsFocusVisisble = HTMLElement & { forceFocusVisible?(): void };

/**
 * @element sp-field-label
 *
 * @slot - text content of the label
 */
export class FieldLabel extends SizedMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [styles, asteriskIconStyles];
    }

    /**
     * @private
     */
    static instanceCount = 0;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: String })
    public override id = '';

    @property({ type: String })
    public for = '';

    @property({ type: Boolean, reflect: true })
    public required = false;

    @query('slot')
    public slotEl!: HTMLSlotElement;

    @property({ type: String, reflect: true, attribute: 'side-aligned' })
    public sideAligned?: 'start' | 'end';

    private target?: HTMLElement;

    private handleClick(event: Event): void {
        if (!this.target || this.disabled || event.defaultPrevented) return;
        this.target.focus();
        const parent = this.getRootNode() as ShadowRoot;
        const target = this.target as AcceptsFocusVisisble;
        const targetParent = target.getRootNode() as ShadowRoot;
        const targetHost = targetParent.host as AcceptsFocusVisisble;
        if (targetParent === parent && target.forceFocusVisible) {
            target.forceFocusVisible();
        } else if (targetHost && targetHost.forceFocusVisible) {
            targetHost.forceFocusVisible();
        }
    }

    private async manageFor(): Promise<void> {
        if (!this.for) {
            return;
        }
        const parent = this.getRootNode() as HTMLElement;
        const target = parent.querySelector(`#${this.for}`) as Focusable;
        if (!target) {
            return;
        }
        if (target.localName.search('-') > 0) {
            await customElements.whenDefined(target.localName);
        }
        if (typeof target.updateComplete !== 'undefined') {
            await target.updateComplete;
        }
        this.target = target.focusElement || target;
        if (this.target) {
            const targetParent = this.target.getRootNode() as HTMLElement;
            if (targetParent === parent) {
                this.target.setAttribute('aria-labelledby', this.id);
            } else {
                this.target.setAttribute('aria-label', this.labelText);
            }
        }
        return Promise.resolve();
    }

    private get labelText(): string {
        const assignedNodes = this.slotEl.assignedNodes({ flatten: true });
        if (!assignedNodes.length) {
            return '';
        }
        const labelText = assignedNodes.map((node) =>
            (node.textContent || /* c8 ignore next */ '').trim()
        );
        return labelText.join(' ');
    }

    protected override render(): TemplateResult {
        return html`
            <label>
                <slot @slotchange=${this.manageFor}></slot>
                ${this.required
                    ? html`
                          <sp-icon-asterisk100
                              class="required-icon spectrum-UIIcon-Asterisk100"
                          ></sp-icon-asterisk100>
                      `
                    : html``}
            </label>
        `;
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.addEventListener('click', this.handleClick);
    }

    protected override willUpdate(changes: PropertyValues): void {
        if (!this.hasAttribute('id')) {
            this.setAttribute(
                'id',
                `${this.tagName.toLowerCase()}-${FieldLabel.instanceCount++}`
            );
        }
        if (changes.has('for') || changes.has('id')) {
            this.manageFor();
        }
    }
}
