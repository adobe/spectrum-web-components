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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { query } from '@spectrum-web-components/base/src/decorators.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';
import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import {
    FocusVisiblePolyfillMixin,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';

import styles from './alert-dialog.css.js';

let appliedIds = 0;

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
            const id = idBase + `-${appliedIds++}`;
            el.id = id;
            ids.push(id);
        }
    });
    return ids;
}

/**
 * @element sp-alert-dialog-base
 *
 * @slot heading - Acts as the heading of the dialog. This should be an actual heading tag `<h1-6 />`
 * @slot - Content not addressed to a specific slot will be interpreted as the main content of the dialog
 * @slot button - Button elements addressed to this slot may be placed below the content when not delivered in a fullscreen mode
 */
export class AlertDialogBase extends FocusVisiblePolyfillMixin(
    ObserveSlotPresence(SpectrumElement, ['[slot="button"]'])
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @query('.content')
    private contentElement!: HTMLDivElement;

    protected get hasButtons(): boolean {
        return this.getSlotContentPresence('[slot="button"]');
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
                ${this.renderHeading()}
                <sp-divider size="m" class="divider"></sp-divider>
                ${this.renderContent()} ${this.renderButtons()}
            </div>
        `;
    }

    public shouldManageTabOrderForScrolling = (): void => {
        const { offsetHeight, scrollHeight } = this.contentElement;
        if (offsetHeight < scrollHeight) {
            this.contentElement.tabIndex = 0;
        } else {
            this.contentElement.removeAttribute('tabindex');
        }
    };

    protected override shouldUpdate(changes: PropertyValues): boolean {
        return super.shouldUpdate(changes);
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'dialog');
    }

    static instanceCount = 0;
    private labelledbyId = `sp-dialog-label-${AlertDialogBase.instanceCount++}`;
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

    private describedbyId = `sp-dialog-description-${AlertDialogBase.instanceCount++}`;

    protected onContentSlotChange({
        target,
    }: Event & { target: HTMLSlotElement }): void {
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

    public override connectedCallback(): void {
        super.connectedCallback();
        this.tabIndex = 0;
        window.addEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
    }

    public override disconnectedCallback(): void {
        window.removeEventListener(
            'resize',
            this.shouldManageTabOrderForScrolling
        );
        super.disconnectedCallback();
    }
}
