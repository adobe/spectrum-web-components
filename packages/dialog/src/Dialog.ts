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
    nothing,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { classMap } from '@spectrum-web-components/base/src/directives.js';
import { conditionAttributeWithId } from '@spectrum-web-components/base/src/condition-attribute-with-id.js';

import '@spectrum-web-components/divider/sp-divider.js';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import {
    FocusVisiblePolyfillMixin,
    ObserveSlotPresence,
} from '@spectrum-web-components/shared';

import styles from './dialog.css.js';
import type { CloseButton } from '@spectrum-web-components/button';

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
 * @element sp-dialog
 *
 * @slot hero - Accepts a hero image to display at the top of the dialog
 * @slot heading - Acts as the heading of the dialog. This should be an actual heading tag `<h1-6 />`
 * @slot - Content not addressed to a specific slot will be interpreted as the main content of the dialog
 * @slot footer - Content addressed to the `footer` will be placed below the main content and to the side of any `[slot='button']` content
 * @slot button - Button elements addressed to this slot may be placed below the content when not delivered in a fullscreen mode
 * @fires close - Announces that the dialog has been closed.
 */
export class Dialog extends FocusVisiblePolyfillMixin(
    ObserveSlotPresence(SpectrumElement, [
        '[slot="hero"]',
        '[slot="footer"]',
        '[slot="button"]',
    ])
) {
    public static override get styles(): CSSResultArray {
        return [styles];
    }

    @query('.close-button')
    closeButton?: CloseButton;

    @query('.content')
    private contentElement!: HTMLDivElement;

    @property({ type: Boolean, reflect: true })
    public error = false;

    @property({ type: Boolean, reflect: true })
    public dismissable = false;

    protected get hasFooter(): boolean {
        return this.getSlotContentPresence('[slot="footer"]');
    }

    protected get hasButtons(): boolean {
        return this.getSlotContentPresence('[slot="button"]');
    }

    protected get hasHero(): boolean {
        return this.getSlotContentPresence('[slot="hero"]');
    }

    @property({ type: Boolean, reflect: true, attribute: 'no-divider' })
    public noDivider = false;

    @property({ type: String, reflect: true })
    public mode?: 'fullscreen' | 'fullscreenTakeover';

    @property({ type: String, reflect: true })
    public size?: 's' | 'm' | 'l';

    public close(): void {
        this.dispatchEvent(
            new Event('close', {
                bubbles: true,
                composed: true,
                cancelable: true,
            })
        );
    }

    protected renderHero(): TemplateResult {
        return html`
            <slot name="hero"></slot>
        `;
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

    protected renderFooter(): TemplateResult {
        return html`
            <div class="footer">
                <slot name="footer"></slot>
            </div>
        `;
    }

    protected renderButtons(): TemplateResult {
        const classes = {
            'button-group': true,
            'button-group--noFooter': !this.hasFooter,
        };
        return html`
            <sp-button-group class=${classMap(classes)}>
                <slot name="button"></slot>
            </sp-button-group>
        `;
    }

    protected renderDismiss(): TemplateResult {
        return html`
            <sp-close-button
                class="close-button"
                label="Close"
                quiet
                size="m"
                @click=${this.close}
            ></sp-close-button>
        `;
    }

    protected override render(): TemplateResult {
        return html`
            <div class="grid">
                ${this.renderHero()} ${this.renderHeading()}
                ${this.error
                    ? html`
                          <sp-icon-alert class="type-icon"></sp-icon-alert>
                      `
                    : nothing}
                ${this.noDivider
                    ? nothing
                    : html`
                          <sp-divider size="m" class="divider"></sp-divider>
                      `}
                ${this.renderContent()}
                ${this.hasFooter ? this.renderFooter() : nothing}
                ${this.hasButtons ? this.renderButtons() : nothing}
                ${this.dismissable ? this.renderDismiss() : nothing}
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
        if (changes.has('mode') && !!this.mode) {
            this.dismissable = false;
        }
        if (changes.has('dismissable') && this.dismissable) {
            this.dismissable = !this.mode;
        }
        return super.shouldUpdate(changes);
    }

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.setAttribute('role', 'dialog');
    }

    static instanceCount = 0;
    private labelledbyId = `sp-dialog-label-${Dialog.instanceCount++}`;
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

    private describedbyId = `sp-dialog-description-${Dialog.instanceCount++}`;

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
