import {
    html,
    LitElement,
    property,
    query,
    TemplateResult,
    CSSResultArray,
} from 'lit-element';

import overlayStyles from './overlay-root.css.js';

import { IPopoverCloseDetail, IPopoverOpenDetail } from '../overlay-trigger';

import Positioner from './positioner';

export class OverlayRoot extends LitElement {
    public static is = 'overlay-root';

    public static get styles(): CSSResultArray {
        return [overlayStyles];
    }

    @property({ type: Boolean, reflect: true })
    public visible = false;

    @property({ reflect: true })
    public placement = 'bottom';

    @property({ type: Number, reflect: true })
    public offset = 6;

    @property({ type: Boolean })
    private active = false;

    @property()
    private overlayContent?: HTMLElement;

    private _overlayId: string = '';

    @query('#overlay')
    private overlay: HTMLElement;

    @query('#content')
    private content: HTMLElement;

    public onMaskClick(ev: Event): void {
        if (this.active) {
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

    public onPopoverOpen(ev: CustomEvent<IPopoverOpenDetail>): void {
        if (!this.active) {
            this.active = true;
            this.extractEventDetail(ev);
            this.overlayContent.setAttribute('open', true);

            window.setTimeout(() => {
                this.visible = true;
                this.updateOverlayPosition();
            }, ev.detail.delay);
        }
    }

    public onPopoverClose(ev: CustomEvent<IPopoverCloseDetail>): void {
        if (ev.detail === this.overlayId) {
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
                <div>${this.overlayContent}</div>
                <div
                    id="mask"
                    ?visiblez=${this.maskVisible}
                    @clickz=${this.onMaskClick}
                ></div>
            </div>
        `;
    }

    private firstUpdated(): void {
        this.content.addEventListener(
            'click',
            (ev: Event) => this.onMaskClick(ev),
            true
        );
    }

    private extractEventDetail(ev: CustomEvent<IPopoverOpenDetail>): void {
        this.overlayContent = ev.detail.content;
        this.trigger = ev.detail.trigger;
        this.maskVisible = ev.detail.mask;
        this.overlayId = ev.detail.id;
        this.placement = ev.detail.placement;
        this.offset = ev.detail.offset;
    }

    private updateOverlayPosition(): void {
        this.positioner = new Positioner(
            this.trigger,
            this.overlayContent,
            this
        );

        this.position = this.positioner.updatePosition({
            crossOffset: 0,
            flip: false,
            offset: this.offset,
            placement: this.placement,
        });
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
