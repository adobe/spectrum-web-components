/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

//TODO: Closing overlay should also have transition

import {
    html,
    LitElement,
    property,
    TemplateResult,
    CSSResultArray,
} from 'lit-element';

import overlayStyles from './overlay-root.css';

import calculatePosition, { PositionResult } from './calculate-position';
import { strictCustomEvent, StrictCustomEvent } from '../events';

export type TriggerInteractions = 'click' | 'hover';

export type Placement = 'top' | 'right' | 'bottom' | 'left';

export interface OverlayOpenDetail {
    content: HTMLElement;
    delay: number;
    offset: number;
    placement: Placement;
    trigger: HTMLElement;
    interaction: TriggerInteractions;
}

export interface OverlayCloseDetail {
    content: HTMLElement;
}

interface CalculatePositionOptions {
    containerPadding: number;
    crossOffset: number;
    flip: boolean;
    offset: number;
    placement: string;
}

const defaultOptions: CalculatePositionOptions = {
    containerPadding: 10,
    crossOffset: 0,
    flip: true,
    offset: 0,
    placement: 'left',
};

export class OverlayRoot extends LitElement {
    public static is = 'overlay-root';

    public static get styles(): CSSResultArray {
        return [overlayStyles];
    }

    @property({ type: Boolean, reflect: true })
    public visible = false;

    @property({ reflect: true })
    public placement: Placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property()
    private interaction: TriggerInteractions = 'hover';

    @property({ type: Boolean, reflect: true })
    private active = false;

    @property()
    private position?: PositionResult;

    @property()
    private trigger?: HTMLElement;

    @property()
    private overlayContent?: HTMLElement;

    private timeout?: number;

    public onMaskClick(ev: Event): void {
        const secondClick = this.detectSecondClick(ev);

        if (!this.active) {
            return;
        }

        if (this.interaction === 'click' && secondClick) {
            //Prevent second clicks from reopening the overlay
            ev.stopPropagation();
        }

        this.removeOverlay();

        const clickOutEvent = strictCustomEvent('sp-overlay:click-out', {
            bubbles: true,
            composed: true,
            detail: ev,
        });
        this.dispatchEvent(clickOutEvent);
        this.active = false;
        this.visible = false;
    }

    public onOverlayOpen(ev: StrictCustomEvent<'sp-overlay:open'>): void {
        if (this.active) {
            return;
        }
        this.active = true;
        this.removeOverlay();
        this.extractEventDetail(ev);
        if (this.overlayContent) {
            this.overlayContent.setAttribute('slot', 'overlay');
            this.appendChild(this.overlayContent);
        }

        this.timeout = window.setTimeout(() => {
            this.visible = true;
            this.updateOverlayPosition();
        }, ev.detail.delay);
    }

    public onOverlayClose(ev: StrictCustomEvent<'sp-overlay:close'>): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (ev.detail.content === this.overlayContent) {
            this.removeOverlay();
            this.active = false;
            this.visible = false;
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot></slot>
            <div
                id="overlay"
                ?active=${this.active}
                ?visible=${this.visible}
                style=${this.overlayStyles}
            >
                <slot name="overlay"></slot>
            </div>
        `;
    }

    private detectSecondClick(ev: Event): boolean {
        //TODO: event.composedPath is not supported in internet explorer or edge.
        // Consider using another implementation for the future

        const path = Array.from(ev.composedPath());

        if (path && path.length) {
            //Check if current active trigger is in the event path
            for (const eventTarget of path) {
                const element = eventTarget as HTMLElement;
                if (element === this.trigger) {
                    return true;
                }
            }
        }
        return false;
    }

    private removeOverlay(): void {
        if (this.overlayContent && this.overlayContent.parentNode) {
            this.overlayContent.parentNode.removeChild(this.overlayContent);
        }
    }

    private extractEventDetail(ev: CustomEvent<OverlayOpenDetail>): void {
        this.overlayContent = ev.detail.content;
        this.trigger = ev.detail.trigger;
        this.placement = ev.detail.placement;
        this.offset = ev.detail.offset;
        this.interaction = ev.detail.interaction;
    }

    private updateOverlayPosition(): void {
        if (!this.trigger || !this.overlayContent) {
            return;
        }

        const options: CalculatePositionOptions = {
            containerPadding: 0,
            crossOffset: 0,
            flip: false,
            offset: this.offset,
            placement: this.placement,
        };

        const positionOptions = { ...defaultOptions, ...options };

        this.position = calculatePosition(
            positionOptions.placement,
            this.overlayContent,
            this.trigger,
            this,
            positionOptions.containerPadding,
            positionOptions.flip,
            this,
            positionOptions.offset,
            positionOptions.crossOffset
        );
    }

    private get overlayStyles(): string {
        if (this.position) {
            return `top: ${this.position.positionTop}px; left: ${
                this.position.positionLeft
            }px`;
        }

        return '';
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.addEventListener('click', this.onMaskClick, true);
        this.addEventListener('sp-overlay:open', this
            .onOverlayOpen as EventListener);
        this.addEventListener('sp-overlay:close', this
            .onOverlayClose as EventListener);
    }

    public disconnectedCallback(): void {
        this.removeEventListener('click', this.onMaskClick, true);
        this.removeEventListener('sp-overlay:open', this
            .onOverlayOpen as EventListener);
        this.removeEventListener('sp-overlay:close', this
            .onOverlayClose as EventListener);
        super.disconnectedCallback();
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-overlay:click-out': CustomEvent<Event>;
        'sp-overlay:open': CustomEvent<OverlayOpenDetail>;
        'sp-overlay:close': CustomEvent<OverlayCloseDetail>;
    }
}
