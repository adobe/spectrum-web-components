import { html, LitElement, property, query } from 'lit-element';

import uuid from 'uuid';

import { defineCustomElements } from '@crisp/spectrum-web-components';

import overlayTriggerStyles from './overlay-trigger.css.js';

import Positioner from './positioner';

export interface IPopoverOpenDetail {
    content: HTMLElement;
    delay: number;
    id: string;
    mask: boolean;
    offset: number;
    placement: string;
    trigger: HTMLElement;
}

interface IPopoverConfig {
    elementProp: string;
    idProp: string;
    mask: boolean;
}

const clickConfig = {
    elementProp: 'clickContent',
    idProp: 'clickId',
    mask: true,
};

const hoverConfig = {
    elementProp: 'hoverContent',
    idProp: 'hoverId',
    mask: false,
};

export type IPopoverCloseDetail = string;

export class OverlayTrigger extends LitElement {
    public static is = 'overlay-trigger';

    public static get styles() {
        return [overlayTriggerStyles];
    }

    @property({ reflect: true })
    public placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @query('#trigger')
    private trigger: HTMLElement;

    @property()
    private clickContent?: HTMLElement;

    @property()
    private hoverContent?: HTMLElement;

    private _delay = 0;

    public constructor() {
        super();

        this.clickId = uuid.v4();
        this.hoverId = uuid.v4();
    }

    public onPopoverOpen(ev: Event, interaction: string): void {
        const isClick = interaction === 'click';
        const config = (isClick ? clickConfig : hoverConfig) as IPopoverConfig;
        const popoverElement = this[config.elementProp];

        if (popoverElement) {
            const popoverOpenDetail = {
                content: popoverElement,
                delay: popoverElement.getAttribute('delay') || 0,
                id: this[config.idProp],
                mask: config.mask,
                offset: this.offset,
                placement: this.placement,
                trigger: this.trigger,
            };

            const popoverOpenEvent = new CustomEvent('popover-open', {
                bubbles: true,
                composed: true,
                detail: popoverOpenDetail,
            });

            this.dispatchEvent(popoverOpenEvent);
        }
    }

    public onPopoverClose(ev: Event): void {
        const popoverCloseDetail = this.hoverId;

        const popoverCloseEvent = new CustomEvent('popover-close', {
            bubbles: true,
            composed: true,
            detail: popoverCloseDetail,
        });

        this.dispatchEvent(popoverCloseEvent);
    }

    public onTriggerClick(ev: Event): void {
        if (this.clickContent) {
            this.onPopoverOpen(ev, 'click');
        }
    }

    public onTriggerMouseOver(ev: Event): void {
        if (this.hoverContent) {
            this.onPopoverOpen(ev, 'hover');
        }
    }

    public onTriggerMouseLeave(ev: Event): void {
        if (this.hoverContent) {
            this.onPopoverClose(ev);
        }
    }

    protected render() {
        return html`
            <div
                id="trigger"
                @click=${this.onTriggerClick}
                @mouseenter=${this.onTriggerMouseOver}
                @mouseleave=${this.onTriggerMouseLeave}
            >
                <slot name="button"></slot>
            </div>
            <slot
                @slotchange=${this.onClickSlotChange}
                name="click-content"
                id="click-content"
            ></slot>
            <slot
                @slotchange=${this.onHoverSlotChange}
                name="hover-content"
                id="hover-content"
            ></slot>
        `;
    }

    private onClickSlotChange(ev: Event): void {
        const content = this.extractSlotContent(ev.target);

        if (content) {
            this.clickContent = content;
        }
    }

    private onHoverSlotChange(ev: Event): void {
        const content = this.extractSlotContent(ev.target);

        if (content) {
            this.hoverContent = content;
        }
    }

    private extractSlotContent(slot: HTMLSlotElement): HTMLElement | null {
        const nodes = slot.assignedNodes();

        if (nodes.length) {
            return nodes[0];
        }

        return null;
    }
}
