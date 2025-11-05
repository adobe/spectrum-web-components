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

import {
    CSSResultArray,
    html,
    nothing,
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
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-asterisk100.js';
import asteriskIconStyles from '@spectrum-web-components/icon/src/spectrum-icon-asterisk.css.js';
import {
    conditionAttributeWithId,
    conditionAttributeWithoutId,
} from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import {
    ElementResolutionController,
    elementResolverUpdatedSymbol,
} from '@spectrum-web-components/reactive-controllers/src/ElementResolution.js';

import styles from './field-label.css.js';

type AcceptsFocusVisisble = HTMLElement & { forceFocusVisible?(): void };
type Labelable = Focusable & {
    applyFocusElementLabel?: (
        appliedLabel: string,
        labelElement?: FieldLabel
    ) => void;
};

/**
 * @element sp-field-label
 *
 * @slot - text content of the label
 */
export class FieldLabel extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    public static override get styles(): CSSResultArray {
        return [styles, asteriskIconStyles];
    }

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

    private target?: Labelable;

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

    private resolvedElement = new ElementResolutionController(this);

    private applyTargetLabel(target?: Labelable): void {
        // Apply new target when provided
        this.target = target || this.target;
        if (this.target) {
            // When target is available add or remove label information
            // depending on the value of `apply`.
            const applyLabel = this.target.applyFocusElementLabel;
            const focusable = this.target.focusElement || this.target;
            const targetParent = focusable.getRootNode() as HTMLElement;
            if (typeof applyLabel !== 'undefined') {
                applyLabel(this.labelText, this);
            } else if (targetParent === (this.getRootNode() as HTMLElement)) {
                const conditionAttribute = target
                    ? conditionAttributeWithId
                    : conditionAttributeWithoutId;
                conditionAttribute(focusable, 'aria-labelledby', [this.id]);
            } else {
                if (target) {
                    focusable.setAttribute('aria-label', this.labelText);
                } else {
                    focusable.removeAttribute('aria-label');
                }
            }
        }
    }

    private async manageTarget(): Promise<void> {
        this.applyTargetLabel();
        const target = this.resolvedElement.element as Focusable;
        if (!target) {
            this.target = target;
            return;
        }
        if (target.localName.search('-') > 0) {
            await customElements.whenDefined(target.localName);
        }
        if (typeof target.updateComplete !== 'undefined') {
            await target.updateComplete;
        }
        this.applyTargetLabel(target);
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
                <slot></slot>
                ${this.required
                    ? html`
                          <span>
                              &nbsp;
                              <sp-icon-asterisk100
                                  class="required-icon spectrum-UIIcon-Asterisk100"
                              ></sp-icon-asterisk100>
                          </span>
                      `
                    : nothing}
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
                `${this.tagName.toLowerCase()}-${randomID()}`
            );
        }
        if (changes.has('for')) {
            this.resolvedElement.selector = this.for ? `#${this.for}` : '';
        }
        if (changes.has('id') || changes.has(elementResolverUpdatedSymbol)) {
            this.manageTarget();
        }
    }
}
