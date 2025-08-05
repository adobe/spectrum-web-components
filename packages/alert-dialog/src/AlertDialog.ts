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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/divider/sp-divider.js';
import { FocusVisiblePolyfillMixin } from '@spectrum-web-components/shared/src/focus-visible.js';
import { randomID } from '@spectrum-web-components/shared/src/random-id.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';
import alertStyles from './alert-dialog.css.js';

export type AlertDialogVariants =
    | 'confirmation'
    | 'information'
    | 'warning'
    | 'error'
    | 'destructive'
    | 'secondary'
    | '';

export const alertDialogVariants: AlertDialogVariants[] = [
    'confirmation',
    'information',
    'warning',
    'error',
    'destructive',
    'secondary',
];

function gatherAppliedIdsFromSlottedChildren(
    slot: HTMLSlotElement,
    idBase: string
): string[] {
    const assignedElements = slot.assignedElements();
    const ids: string[] = [];
    assignedElements.forEach((el) => {
        if (el.id) {
            ids.push(el.id);
        } else {
            const id = idBase + `-${randomID()}`;
            el.id = id;
            ids.push(id);
        }
    });
    return ids;
}
export class AlertDialog extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static override get styles(): CSSResultArray {
        return [alertStyles];
    }

    @query('.content')
    private contentElement!: HTMLDivElement;

    private resizeController = new ResizeController(this, {
        callback: () => {
            this.shouldManageTabOrderForScrolling();
        },
    });

    public _variant: AlertDialogVariants = '';

    @property({ type: String, reflect: true })
    public set variant(variant: AlertDialogVariants) {
        if (variant === this.variant) {
            return;
        }
        const oldValue = this.variant;
        if (alertDialogVariants.includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
        } else {
            this.removeAttribute('variant');
            this._variant = '';
        }
        this.requestUpdate('variant', oldValue);
    }

    public get variant(): AlertDialogVariants {
        return this._variant;
    }

    protected renderIcon(): TemplateResult {
        switch (this.variant) {
            case 'warning':
            case 'error':
                return html`
                    <sp-icon-alert class="icon"></sp-icon-alert>
                `;

            default:
                return html``;
        }
    }

    protected renderHeading(): TemplateResult {
        return html`
            <slot name="heading" @slotchange=${this.onHeadingSlotchange}></slot>
        `;
    }

    protected renderContent(): TemplateResult {
        return html`
            <div class="content">
                <slot @slotchange=${this.onContentSlotChange}></slot>
            </div>
        `;
    }

    static instanceCount = 0;
    private labelledbyId = `sp-dialog-label-${AlertDialog.instanceCount++}`;
    private conditionLabelledby?: () => void;
    private conditionDescribedby?: () => void;

    private onHeadingSlotchange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        if (this.conditionLabelledby) {
            this.conditionLabelledby();
            delete this.conditionLabelledby;
        }
        const ids = gatherAppliedIdsFromSlottedChildren(
            target,
            this.labelledbyId
        );
        if (ids.length) {
            this.conditionLabelledby = conditionAttributeWithId(
                this,
                'aria-labelledby',
                ids
            );
        }
    }

    public shouldManageTabOrderForScrolling = (): void => {
        if (!this.contentElement) return;

        const { offsetHeight, scrollHeight } = this.contentElement;
        if (offsetHeight < scrollHeight) {
            this.contentElement.tabIndex = 0;
        } else {
            this.contentElement.removeAttribute('tabindex');
        }
    };

    private describedbyId = `sp-dialog-description-${AlertDialog.instanceCount++}`;

    protected onContentSlotChange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
        requestAnimationFrame(() => {
            // Can happen more than once. Take this.contentElement out
            // of the observer before adding it again.
            this.resizeController.unobserve(this.contentElement);
            this.resizeController.observe(this.contentElement);
        });
        if (this.conditionDescribedby) {
            this.conditionDescribedby();
            delete this.conditionDescribedby;
        }
        const ids = gatherAppliedIdsFromSlottedChildren(
            target,
            this.describedbyId
        );
        if (ids.length && ids.length < 4) {
            this.conditionDescribedby = conditionAttributeWithId(
                this,
                'aria-describedby',
                ids
            );
        } else if (!ids.length) {
            const idProvided = !!this.id;
            if (!idProvided) this.id = this.describedbyId;
            const conditionDescribedby = conditionAttributeWithId(
                this,
                'aria-describedby',
                this.id
            );
            this.conditionDescribedby = () => {
                conditionDescribedby();
                if (!idProvided) {
                    this.removeAttribute('id');
                }
            };
        }
    }

    protected renderButtons(): TemplateResult {
        return html`
            <sp-button-group class="button-group">
                <slot name="button"></slot>
            </sp-button-group>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <div class="grid">
                <div class="header">
                    ${this.renderHeading()} ${this.renderIcon()}
                </div>
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `;
    }
}
