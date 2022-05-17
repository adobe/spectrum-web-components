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
import {
    property,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import type { LongpressEvent } from '@spectrum-web-components/action-button';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';
import {
    isAndroid,
    isIOS,
} from '@spectrum-web-components/shared/src/platform.js';

import {
    OverlayOpenCloseDetail,
    OverlayOptions,
    Placement,
    TriggerInteractions,
} from './overlay-types';
import { openOverlay } from './loader.js';
import overlayTriggerStyles from './overlay-trigger.css.js';

export type OverlayContentTypes = 'click' | 'hover' | 'longpress';

type closeOverlay =
    | 'closeClickOverlay'
    | 'closeHoverOverlay'
    | 'closeLongpressOverlay';

export const LONGPRESS_INSTRUCTIONS = {
    touch: 'Double tap and long press for additional options',
    keyboard: 'Press Space or Alt+Down Arrow for additional options',
    mouse: 'Click and hold for additional options',
};
/**
 * @element overlay-trigger
 *
 * @slot trigger - The content that will trigger the various overlays
 * @slot hover-content - The content that will be displayed on hover
 * @slot click-content - The content that will be displayed on click
 * @slot longpress-content - The content that will be displayed on click
 *
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class OverlayTrigger extends SpectrumElement {
    private closeClickOverlay?: Promise<() => void>;
    private closeLongpressOverlay?: Promise<() => void>;
    private closeHoverOverlay?: Promise<() => void>;

    public static get styles(): CSSResultArray {
        return [overlayTriggerStyles];
    }

    /**
     * @type {"auto" | "auto-start" | "auto-end" | "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "none"}
     * @attr
     */
    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property()
    public type?: Extract<TriggerInteractions, 'inline' | 'modal' | 'replace'>;

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ reflect: true })
    public open?: OverlayContentTypes;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @state()
    public hasLongpressContent = false;

    private longpressDescriptor?: HTMLElement;
    private clickContent?: HTMLElement;
    private longpressContent?: HTMLElement;
    private hoverContent?: HTMLElement;
    private targetContent?: HTMLElement;

    private _longpressId = `longpress-describedby-descriptor`;

    private handleClose(event?: CustomEvent<OverlayOpenCloseDetail>): void {
        if (
            event &&
            event.detail.interaction !== this.open &&
            event.detail.interaction !== this.type
        ) {
            return;
        }
        this.removeAttribute('open');
    }

    protected render(): TemplateResult {
        // Keyboard event availability documented in README.md
        /* eslint-disable lit-a11y/click-events-have-key-events */
        return html`
            <slot
                id="trigger"
                @click=${this.onTrigger}
                @longpress=${this.onTrigger}
                @mouseenter=${this.onTrigger}
                @mouseleave=${this.onTrigger}
                @focusin=${this.onTrigger}
                @focusout=${this.onTrigger}
                @sp-closed=${this.handleClose}
                @slotchange=${this.onTargetSlotChange}
                name="trigger"
            ></slot>
            <div id="overlay-content">
                <slot
                    @slotchange=${this.onClickSlotChange}
                    name="click-content"
                ></slot>
                <slot
                    @slotchange=${this.onLongpressSlotChange}
                    name="longpress-content"
                ></slot>
                <slot
                    @slotchange=${this.onHoverSlotChange}
                    name="hover-content"
                ></slot>
                <slot name=${this._longpressId}></slot>
            </div>
        `;
        /* eslint-enable lit-a11y/click-events-have-key-events */
    }

    protected updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (this.disabled && changes.has('disabled')) {
            this.closeAllOverlays();
            return;
        }
        if (changes.has('open')) {
            this.manageOpen();
        }
        if (changes.has('hasLongpressContent')) {
            this.manageLongpressDescriptor();
        }
    }

    protected manageLongpressDescriptor(): void {
        const trigger = this.querySelector(
            '[slot="trigger"]'
        ) as SpectrumElement;
        const ariaDescribedby = trigger.getAttribute('aria-describedby');
        let descriptors = ariaDescribedby ? ariaDescribedby.split(/\s+/) : [];

        if (this.hasLongpressContent) {
            if (!this.longpressDescriptor) {
                this.longpressDescriptor = document.createElement(
                    'div'
                ) as HTMLElement;

                this.longpressDescriptor.id = this._longpressId;
                this.longpressDescriptor.slot = this._longpressId;
            }
            const messageType = isIOS() || isAndroid() ? 'touch' : 'keyboard';
            this.longpressDescriptor.textContent =
                LONGPRESS_INSTRUCTIONS[messageType];
            this.appendChild(this.longpressDescriptor);
            descriptors.push(this._longpressId);
        } else {
            if (this.longpressDescriptor) this.longpressDescriptor.remove();
            descriptors = descriptors.filter(
                (descriptor) => descriptor !== this._longpressId
            );
        }
        if (descriptors.length) {
            trigger.setAttribute('aria-describedby', descriptors.join(' '));
        } else {
            trigger.removeAttribute('aria-describedby');
        }
    }

    private closeAllOverlays(): void {
        if (this.abortOverlay) this.abortOverlay(true);
        (
            [
                'closeClickOverlay',
                'closeHoverOverlay',
                'closeLongpressOverlay',
            ] as closeOverlay[]
        ).forEach(async (name) => {
            const canClose = this[name] as Promise<() => void>;
            if (canClose == null) return;
            delete this[name];
            (await canClose)();
        });
    }

    private manageOpen(): void {
        const openHandlers: Record<OverlayContentTypes | 'none', () => void> = {
            click: () => this.onTriggerClick(),
            hover: () => this.onTriggerMouseEnter(),
            longpress: () => this.onTriggerLongpress(),
            none: () => this.closeAllOverlays(),
        };
        openHandlers[this.open ?? 'none']();
    }

    private async openOverlay(
        target: HTMLElement,
        interaction: TriggerInteractions,
        content: HTMLElement,
        options: OverlayOptions
    ): Promise<() => void> {
        this.openStatePromise = new Promise(
            (res) => (this.openStateResolver = res)
        );
        this.addEventListener(
            'sp-opened',
            () => {
                this.openStateResolver();
            },
            { once: true }
        );
        return OverlayTrigger.openOverlay(
            target,
            interaction,
            content,
            options
        );
    }

    public static openOverlay = async (
        target: HTMLElement,
        interaction: TriggerInteractions,
        content: HTMLElement,
        options: OverlayOptions
    ): Promise<() => void> => {
        return openOverlay(target, interaction, content, options);
    };

    private get overlayOptions(): OverlayOptions {
        return {
            offset: this.offset,
            placement: this.placement,
            receivesFocus:
                !this.type || this.type === 'inline' || this.open === 'hover'
                    ? undefined
                    : 'auto',
        };
    }

    private onTrigger(event: CustomEvent<LongpressEvent>): void {
        if (this.disabled) return;

        switch (event.type) {
            case 'mouseenter':
            case 'focusin':
                if (!this.open && this.hoverContent) {
                    this.open = 'hover';
                }
                return;
            case 'mouseleave':
            case 'focusout':
                if (this.open === 'hover') {
                    this.handleClose();
                }
                return;
            case 'click':
                if (this.clickContent) {
                    this.open = event.type;
                } else if (this.closeHoverOverlay) {
                    event.preventDefault();
                }
                return;
            case 'longpress':
                if (this.longpressContent) {
                    this._longpressEvent = event;
                    this.open = event.type;
                }
                return;
        }
    }

    private prepareToFocusOverlayContent(overlayContent: HTMLElement): void {
        if (this.type !== 'modal') {
            return;
        }
        const firstFocusable = firstFocusableIn(overlayContent);
        if (!firstFocusable) {
            overlayContent.tabIndex = 0;
        }
    }

    public async onTriggerClick(): Promise<void> {
        if (
            !this.targetContent ||
            !this.clickContent ||
            this.closeClickOverlay
        ) {
            return;
        }
        const { targetContent, clickContent } = this;
        this.closeAllOverlays();
        this.prepareToFocusOverlayContent(clickContent);
        this.closeClickOverlay = this.openOverlay(
            targetContent,
            this.type ? this.type : 'click',
            clickContent,
            this.overlayOptions
        );
    }

    private _longpressEvent?: CustomEvent<LongpressEvent>;

    private async onTriggerLongpress(): Promise<void> {
        if (
            !this.targetContent ||
            !this.longpressContent ||
            this.closeLongpressOverlay
        ) {
            return;
        }
        const { targetContent, longpressContent } = this;
        this.closeAllOverlays();
        this.prepareToFocusOverlayContent(longpressContent);
        const notImmediatelyClosable =
            this._longpressEvent?.detail?.source !== 'keyboard';
        this.closeLongpressOverlay = this.openOverlay(
            targetContent,
            this.type ? this.type : 'longpress',
            longpressContent,
            {
                ...this.overlayOptions,
                receivesFocus: 'auto',
                notImmediatelyClosable,
            }
        );
        this._longpressEvent = undefined;
    }

    private abortOverlay: (cancelled: boolean) => void = () => {
        return;
    };

    public async onTriggerMouseEnter(): Promise<void> {
        if (
            !this.targetContent ||
            !this.hoverContent ||
            this.closeHoverOverlay
        ) {
            return;
        }
        const abortPromise: Promise<boolean> = new Promise((res) => {
            this.abortOverlay = res;
        });
        const { targetContent, hoverContent } = this;
        this.closeHoverOverlay = this.openOverlay(
            targetContent,
            'hover',
            hoverContent,
            {
                abortPromise,
                ...this.overlayOptions,
            }
        );
    }

    private onClickSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.clickContent = this.extractSlotContentFromEvent(event);
        this.manageOpen();
    }

    private onLongpressSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.longpressContent = this.extractSlotContentFromEvent(event);
        this.hasLongpressContent =
            !!this.longpressContent || !!this.closeLongpressOverlay;
        this.manageOpen();
    }

    private onHoverSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.hoverContent = this.extractSlotContentFromEvent(event);
        this.manageOpen();
    }

    private onTargetSlotChange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.targetContent = this.extractSlotContentFromEvent(event);
    }

    private extractSlotContentFromEvent(event: Event): HTMLElement | undefined {
        const slot = event.target as HTMLSlotElement;
        const nodes = slot.assignedNodes({ flatten: true });
        return nodes.find((node) => node instanceof HTMLElement) as HTMLElement;
    }

    private openStatePromise = Promise.resolve();
    private openStateResolver!: () => void;

    protected async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.openStatePromise;
        return complete;
    }

    public disconnectedCallback(): void {
        this.closeAllOverlays();
        super.disconnectedCallback();
    }
}
