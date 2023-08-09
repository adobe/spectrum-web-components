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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import type {
    Overlay,
    OverlayOpenCloseDetail,
    Placement,
} from '@spectrum-web-components/overlay';
import '@spectrum-web-components/overlay/sp-overlay.js';

import tooltipStyles from './tooltip.css.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { focusableSelector } from '@spectrum-web-components/shared/src/focusable-selectors.js';

class TooltipOpenable extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('sp-opened', this.redispatchEvent);
        this.addEventListener('sp-closed', this.redispatchEvent);
    }
    redispatchEvent(event: Event): void {
        event.stopPropagation();
        this.tooltip.dispatchEvent(
            new CustomEvent<OverlayOpenCloseDetail>(event.type, {
                bubbles: event.bubbles,
                composed: event.composed,
                detail: (event as CustomEvent<OverlayOpenCloseDetail>).detail,
            })
        );
    }
    get tooltip(): Tooltip {
        return (this.getRootNode() as ShadowRoot).host as Tooltip;
    }
    static get observedAttributes(): string[] {
        return ['open', 'placement'];
    }
    attributeChangedCallback(
        name: 'open' | 'placement',
        _oldValue: string,
        newValue: 'string'
    ): void {
        switch (name) {
            // API generally sets `open` as a property
            /* c8 ignore next 3 */
            case 'open':
                this.open = newValue !== null;
                break;
            case 'placement':
                this.placement = newValue as Placement;
                break;
        }
    }
    set open(open: boolean) {
        this._open = open;
        const { tooltip } = this;
        /* c8 ignore next 3 */
        if (!tooltip) {
            return;
        }
        tooltip.open = open;
    }
    get open(): boolean {
        return this._open;
    }
    private _open = false;
    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"}
     * @attr
     */
    set placement(placement: Placement) {
        this._placement = placement;
        const { tooltip } = this;
        if (!tooltip) {
            return;
        }
        tooltip.placement = placement;
    }
    /* c8 ignore next 3 */
    get placement(): Placement {
        return this._placement;
    }
    private _placement: Placement = 'top';
    get tipElement(): HTMLElement {
        return this.tooltip.tipElement;
    }
}

if (!customElements.get('sp-tooltip-openable')) {
    customElements.define('sp-tooltip-openable', TooltipOpenable);
}

/**
 * @element sp-tooltip
 *
 * @slot icon - the icon element appearing at the start of the label
 * @slot - the text label of the Tooltip
 */
export class Tooltip extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [tooltipStyles];
    }

    /**
     * Automatically bind to the parent element of the assigned `slot` or the parent element of the `sp-tooltip`.
     * Without this, you must provide your own `overlay-trigger`.
     */
    @property({ type: Boolean, attribute: 'self-managed' })
    public selfManaged = false;

    @property({ type: Number })
    public offset = 0;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @query('sp-overlay')
    public overlayElement?: Overlay;

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"}
     * @attr
     */
    @property({ reflect: true })
    public placement?: Placement;

    @query('#tip')
    public tipElement!: HTMLSpanElement;

    @property({ type: Number })
    public tipPadding?: number;

    /* Ensure that a '' value for `variant` removes the attribute instead of a blank value */
    private _variant = '';

    @property({ type: String })
    public get variant(): string {
        return this._variant;
    }
    public set variant(variant: string) {
        if (variant === this.variant) {
            return;
        }
        if (['info', 'positive', 'negative'].includes(variant)) {
            this.setAttribute('variant', variant);
            this._variant = variant;
            return;
        }
        this.removeAttribute('variant');
        this._variant = '';
    }

    private handleOpenOverlay = (): void => {
        this.open = true;
    };

    protected handleCloseOverlay = (): void => {
        this.open = false;
    };

    protected handleTransitionrun(event: TransitionEvent): void {
        this.dispatchEvent(
            new TransitionEvent('transitionrun', {
                bubbles: true,
                composed: true,
                propertyName: event.propertyName,
            })
        );
    }

    protected handleTransitionend(event: TransitionEvent): void {
        this.dispatchEvent(
            new TransitionEvent('transitionend', {
                bubbles: true,
                composed: true,
                propertyName: event.propertyName,
            })
        );
    }

    private get triggerElement(): HTMLElement {
        // Resolve the parent element of the assigned slot (if one exists) or of the Tooltip.
        let start: HTMLElement = this.assignedSlot || this;
        let root = start.getRootNode();
        if (window.__swc.DEBUG) {
            if (root === document) {
                window.__swc.warn(
                    this,
                    `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                    {
                        level: 'high',
                    }
                );
                return root as HTMLElement;
            }
        }
        let triggerElement = (start.parentElement ||
            (root as ShadowRoot).host ||
            root) as HTMLElement;
        while (!triggerElement?.matches?.(focusableSelector)) {
            start =
                triggerElement.assignedSlot || (triggerElement as HTMLElement);
            root = start.getRootNode();
            /* c8 ignore next 13 */
            if (window.__swc.DEBUG) {
                if (root === document) {
                    window.__swc.warn(
                        this,
                        `Self managed <${this.localName}> elements walk up the composed tree to acquire a trigger element. No trigger element was found before the document.`,
                        'https://opensource.adobe.com/spectrum-web-components/components/tooltip#self-managed-overlays',
                        {
                            level: 'high',
                        }
                    );
                    return root as HTMLElement;
                }
            }
            triggerElement = (start.parentElement ||
                (root as ShadowRoot).host ||
                root) as HTMLElement;
        }
        return triggerElement;
    }

    override render(): TemplateResult {
        const tooltip = html`
            <sp-tooltip-openable
                id="tooltip"
                placement=${ifDefined(this.placement)}
                @transitionrun=${this.handleTransitionrun}
                @transitionend=${this.handleTransitionend}
            >
                <slot name="icon"></slot>
                <span id="label"><slot></slot></span>
                <span id="tip"></span>
            </sp-tooltip-openable>
        `;
        if (this.selfManaged) {
            return html`
                <sp-overlay
                    ?open=${this.open}
                    offset=${this.offset}
                    .placement=${this.placement}
                    type="hint"
                    .tipPadding=${this.tipPadding}
                    .triggerInteraction=${'hover'}
                    @sp-opened=${this.handleOpenOverlay}
                    @sp-closed=${this.handleCloseOverlay}
                >
                    ${tooltip}
                </sp-overlay>
            `;
        } else {
            return tooltip;
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();

        this.updateComplete.then(() => {
            if (!this.selfManaged) {
                return;
            }
            const overlayElement = this.overlayElement;
            if (overlayElement) {
                const triggerElement = this.triggerElement;
                overlayElement.triggerElement = triggerElement;
            }
        });
    }
}
