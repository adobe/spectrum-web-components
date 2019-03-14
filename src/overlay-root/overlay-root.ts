/*
Copyright 2018 Adobe. All rights reserved.
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
    query,
    TemplateResult,
    CSSResultArray,
} from 'lit-element';

import overlayStyles from './overlay-root.css.js';

import { PopoverCloseDetail, PopoverOpenDetail } from '../overlay-trigger';

import Positioner from './positioner';
import { PositionResult } from './calculate-position';

export class OverlayRoot extends LitElement {
    public static is = 'overlay-root';

    public static get styles(): CSSResultArray {
        return [overlayStyles];
    }

    @property({ type: Boolean, reflect: true })
    public visible = false;

    @property({ reflect: true })
    public placement: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property()
    private interaction: 'hover' | 'click' = 'hover';

    @property({ type: Boolean, reflect: true })
    private active = false;

    @property()
    private position?: PositionResult;

    @property()
    private positioner?: Positioner;

    @property()
    private trigger?: HTMLElement;

    @property()
    private overlayContent?: HTMLElement;

    @query('#content')
    private content?: HTMLElement;

    public onMaskClick(ev: Event): void {
        const secondClick = this.detectSecondClick(ev);

        if (this.active) {
            if (this.interaction === 'click' && secondClick) {
                //Prevent second clicks from reopening the overlay
                ev.stopPropagation();
            }

            this.removeOverlay();

            const clickOutEvent = new CustomEvent('overlay-click-out', {
                bubbles: true,
                composed: true,
                detail: ev,
            });
            this.dispatchEvent(clickOutEvent);
            this.active = false;
            this.visible = false;
        }
    }

    public onPopoverOpen(ev: CustomEvent<PopoverOpenDetail>): void {
        if (!this.active) {
            this.active = true;
            this.removeOverlay();
            this.extractEventDetail(ev);
            if (this.overlayContent) {
                this.overlayContent.setAttribute('slot', 'overlay');
                this.appendChild(this.overlayContent);
            }

            window.setTimeout(() => {
                this.visible = true;
                this.updateOverlayPosition();
            }, ev.detail.delay);
        }
    }

    public onPopoverClose(ev: CustomEvent<PopoverCloseDetail>): void {
        if (ev.detail === this.overlayContent) {
            this.removeOverlay();
            this.active = false;
            this.visible = false;
        }
    }

    protected render(): TemplateResult {
        return html`
            <slot
                @popover-open=${this.onPopoverOpen}
                @popover-close=${this.onPopoverClose}
                id="content"
            ></slot>
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

    protected firstUpdated(): void {
        if (this.content) {
            this.content.addEventListener(
                'click',
                (ev: Event) => this.onMaskClick(ev),
                true
            );
        }
    }

    private detectSecondClick(ev: Event): boolean {
        const target = ev.target as HTMLElement;

        if (this.trigger && this.trigger.childNodes) {
            //Check if event target is a child of the current trigger
            const triggerChildren = Array.from(this.trigger.childNodes);
            return triggerChildren.includes(target);
        }
        return false;
    }

    private removeOverlay(): void {
        if (this.overlayContent && this.overlayContent.parentNode) {
            this.overlayContent.parentNode.removeChild(this.overlayContent);
        }
    }

    private extractEventDetail(ev: CustomEvent<PopoverOpenDetail>): void {
        this.overlayContent = ev.detail.content;
        this.trigger = ev.target as HTMLElement;
        this.placement = ev.detail.placement;
        this.offset = ev.detail.offset;
        this.interaction = ev.detail.interaction;
    }

    private updateOverlayPosition(): void {
        if (this.trigger && this.overlayContent) {
            this.positioner = new Positioner(
                this.trigger,
                this.overlayContent,
                this
            );

            this.position = this.positioner.updatePosition({
                containerPadding: 0,
                crossOffset: 0,
                flip: false,
                offset: this.offset,
                placement: this.placement,
            }) as PositionResult;
        }
    }

    private get overlayStyles(): string {
        if (this.position) {
            return `top: ${this.position.positionTop}px; left: ${
                this.position.positionLeft
            }px`;
        }

        return '';
    }
}
