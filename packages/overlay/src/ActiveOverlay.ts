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
    ifDefined,
    property,
    PropertyValues,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { reparentChildren } from '@spectrum-web-components/shared';
import { Color, Scale } from '@spectrum-web-components/theme';
import styles from './active-overlay.css.js';
import {
    OverlayOpenDetail,
    Placement,
    TriggerInteractions,
    OverlayOpenCloseDetail,
} from './overlay-types.js';
import { applyMaxSize, createPopper, Instance, maxSize } from './popper.js';
import { VirtualTrigger } from './VirtualTrigger.js';

export interface PositionResult {
    arrowOffsetLeft: number;
    arrowOffsetTop: number;
    maxHeight: number;
    placement: string;
    positionLeft: number;
    positionTop: number;
}

declare global {
    interface Document {
        fonts?: {
            ready: Promise<void>;
        };
    }
}

type OverlayStateType =
    | 'idle'
    | 'active'
    | 'visible'
    | 'hiding'
    | 'dispose'
    | 'disposed';
type ContentAnimation = 'spOverlayFadeIn' | 'spOverlayFadeOut';

const stateMachine: {
    initial: OverlayStateType;
    states: {
        [stateName: string]: {
            on: {
                [transitionName: string]: OverlayStateType;
            };
        };
    };
} = {
    initial: 'idle',
    states: {
        idle: {
            on: {
                active: 'active',
            },
        },
        active: {
            on: {
                visible: 'visible',
                hiding: 'hiding',
                idle: 'idle',
            },
        },
        visible: {
            on: {
                hiding: 'hiding',
                idle: 'idle',
            },
        },
        hiding: {
            on: {
                dispose: 'dispose',
            },
        },
        dispose: {
            on: {
                disposed: 'disposed',
            },
        },
        disposed: {
            on: {},
        },
    },
};

const stateTransition = (
    state?: OverlayStateType,
    event?: string
): OverlayStateType => {
    if (!state) return stateMachine.initial;
    /* c8 ignore next */
    if (!event) return state;
    return stateMachine.states[state].on[event] || state;
};

export class ActiveOverlay extends SpectrumElement {
    public overlayContent!: HTMLElement;
    public overlayContentTip?: HTMLElement;
    public trigger!: HTMLElement;
    public virtualTrigger?: VirtualTrigger;

    private popper?: Instance;

    @property()
    public _state = stateTransition();
    public get state(): OverlayStateType {
        return this._state;
    }
    public set state(state: OverlayStateType) {
        const nextState = stateTransition(this.state, state);
        if (nextState === this.state) {
            return;
        }
        this._state = nextState;
        if (
            this.state === 'active' ||
            this.state === 'visible' ||
            this.state === 'hiding'
        ) {
            this.setAttribute('state', this.state);
        } else {
            this.removeAttribute('state');
        }
    }

    @property({ reflect: true, type: Boolean })
    public animating = false;

    @property({ reflect: true })
    public placement?: Placement;
    @property({ attribute: false })
    public theme: {
        color?: Color;
        scale?: Scale;
        lang?: string;
    } = {};
    @property({ attribute: false })
    public receivesFocus?: 'auto';

    public tabbingAway = false;
    private originalPlacement?: Placement;
    private restoreContent?: () => Element[];

    /**
     * @prop Used by the popper library to indicate where the overlay was
     *       actually rendered. Popper may switch which side an overlay
     *       is rendered on to fit it on the screen
     */
    @property({ attribute: 'data-popper-placement' })
    public dataPopperPlacement?: Placement;

    public focus(): void {
        const firstFocusable = this.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [focusable]'
        ) as HTMLElement;
        if (firstFocusable) {
            firstFocusable.focus();
            /* c8 ignore next 3 */
        } else {
            super.focus();
        }
        this.removeAttribute('tabindex');
    }

    private get hasTheme(): boolean {
        return !!this.theme.color || !!this.theme.scale || !!this.theme.lang;
    }

    public offset = 6;
    public interaction: TriggerInteractions = 'hover';
    private positionAnimationFrame = 0;

    private timeout?: number;

    public static get styles(): CSSResultArray {
        return [styles];
    }

    public constructor() {
        super();
        this.stealOverlayContentPromise = new Promise(
            (res) => (this.stealOverlayContentResolver = res)
        );
    }

    private _modalRoot?: ActiveOverlay;

    public get hasModalRoot(): boolean {
        return !!this._modalRoot;
    }

    public feature(): void {
        this.tabIndex = -1;
        const parentOverlay = this.trigger.closest('active-overlay');
        const parentIsModal = parentOverlay && parentOverlay.slot === 'open';
        // If an overlay it triggered from within a "modal" overlay, it needs to continue
        // to act like one to get treated correctly in regards to tab trapping.
        if (this.interaction === 'modal' || parentIsModal || this._modalRoot) {
            this.slot = 'open';
            // If this isn't a modal root, walk up the overlays to the next modal root
            // and "feature" each on of the intervening overlays.
            if (this._modalRoot) {
                parentOverlay?.feature();
            }
        }
    }

    public obscure(
        nextOverlayInteraction: TriggerInteractions
    ): ActiveOverlay | undefined {
        if (this.slot && nextOverlayInteraction === 'modal') {
            this.removeAttribute('slot');
            // Obscure upto and including the next modal root.
            if (this.interaction !== 'modal') {
                const parentOverlay = this.trigger.closest('active-overlay');
                this._modalRoot = parentOverlay?.obscure(
                    nextOverlayInteraction
                );
                return this._modalRoot;
            }
            return this;
        }
        return undefined;
    }

    public firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        /* c8 ignore next */
        if (!this.overlayContent) return;

        this.stealOverlayContent(this.overlayContent);

        /* c8 ignore next */
        if (!this.overlayContent || !this.trigger) return;

        if (this.placement && this.placement !== 'none') {
            this.popper = createPopper(
                this.virtualTrigger || this.trigger,
                this,
                {
                    placement: this.placement,
                    modifiers: [
                        maxSize,
                        applyMaxSize,
                        {
                            name: 'arrow',
                            options: {
                                element: this.overlayContentTip,
                            },
                        },
                        {
                            name: 'offset',
                            options: {
                                offset: [0, this.offset],
                            },
                        },
                    ],
                }
            );
        }

        this.state = 'active';

        document.addEventListener('sp-update-overlays', () => {
            this.updateOverlayPosition();
            this.state = 'visible';
        });

        this.feature();
        this.updateOverlayPosition()
            .then(() => this.applyContentAnimation('spOverlayFadeIn'))
            .then(() => {
                if (this.receivesFocus) {
                    this.focus();
                }
                this.trigger.dispatchEvent(
                    new CustomEvent<OverlayOpenCloseDetail>('sp-opened', {
                        bubbles: true,
                        composed: true,
                        cancelable: true,
                        detail: {
                            interaction: this.interaction,
                        },
                    })
                );
            });
    }

    private updateOverlayPopperPlacement(): void {
        /* c8 ignore next */
        if (!this.overlayContent) return;

        if (this.dataPopperPlacement) {
            // Copy this attribute to the actual overlay node so that it can use
            // the attribute for styling shadow DOM elements based on the side
            // that popper has chosen for it
            this.overlayContent.setAttribute(
                'placement',
                this.dataPopperPlacement
            );
        } else if (this.originalPlacement) {
            this.overlayContent.setAttribute(
                'placement',
                this.originalPlacement
            );
        } else {
            this.overlayContent.removeAttribute('placement');
        }
    }

    public updated(changedProperties: PropertyValues): void {
        if (changedProperties.has('dataPopperPlacement')) {
            this.updateOverlayPopperPlacement();
        }
    }

    private open(openDetail: OverlayOpenDetail): void {
        this.extractDetail(openDetail);
    }

    private extractDetail(detail: OverlayOpenDetail): void {
        this.overlayContent = detail.content;
        this.overlayContentTip = detail.contentTip;
        this.trigger = detail.trigger;
        this.virtualTrigger = detail.virtualTrigger;
        this.placement = detail.placement;
        this.offset = detail.offset;
        this.interaction = detail.interaction;
        this.theme = detail.theme;
        this.receivesFocus = detail.receivesFocus;
    }

    public dispose(): void {
        /* c8 ignore next */
        if (this.state !== 'dispose') return;

        /* c8 ignore next 4 */
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }

        if (this.popper) {
            this.popper.destroy();
            this.popper = undefined;
        }
        this.trigger.removeEventListener(
            'keydown',
            this.handleInlineTriggerKeydown
        );

        this.returnOverlayContent();
        this.state = 'disposed';

        if (this.willNotifyClosed) {
            this.overlayContent.dispatchEvent(new Event('sp-overlay-closed'));
            this.willNotifyClosed = false;
        }
    }

    private stealOverlayContent(element: HTMLElement): void {
        this.originalPlacement = element.getAttribute('placement') as Placement;
        this.restoreContent = reparentChildren([element], this, (el) => {
            const slotName = el.slot;
            el.removeAttribute('slot');
            return (el) => {
                el.slot = slotName;
            };
        });
        this.stealOverlayContentResolver();
    }

    private willNotifyClosed = false;

    private returnOverlayContent(): void {
        /* c8 ignore next */
        if (!this.restoreContent) return;

        const [element] = this.restoreContent();
        this.restoreContent = undefined;
        this.willNotifyClosed = true;

        if (this.originalPlacement) {
            element.setAttribute('placement', this.originalPlacement);
            delete this.originalPlacement;
        }
    }

    public async updateOverlayPosition(): Promise<void> {
        await (document.fonts ? document.fonts.ready : Promise.resolve());
        if (this.popper) {
            await this.popper.update();
        }
    }

    public async hide(animated = true): Promise<void> {
        this.state = 'hiding';
        if (animated) {
            await this.applyContentAnimation('spOverlayFadeOut');
        }
        this.state = 'dispose';
    }

    private schedulePositionUpdate(): void {
        // Edge needs a little time to update the DOM before computing the layout
        cancelAnimationFrame(this.positionAnimationFrame);
        this.positionAnimationFrame = requestAnimationFrame(() =>
            this.updateOverlayPosition()
        );
    }

    private onSlotChange(): void {
        this.schedulePositionUpdate();
    }

    public handleInlineTriggerKeydown = (event: KeyboardEvent): void => {
        const { code, shiftKey } = event;
        /* c8 ignore next */
        if (code !== 'Tab') return;
        if (shiftKey) {
            this.tabbingAway = true;
            this.dispatchEvent(new Event('close'));
            return;
        }

        event.stopPropagation();
        event.preventDefault();
        this.focus();
    };

    public connectedCallback(): void {
        super.connectedCallback();
        this.schedulePositionUpdate();
    }

    public applyContentAnimation(
        animation: ContentAnimation
    ): Promise<boolean> {
        return new Promise((resolve): void => {
            const contents = this.shadowRoot.querySelector(
                '#contents'
            ) as HTMLElement;
            const doneHandler = (event: AnimationEvent): void => {
                if (animation !== event.animationName) return;
                contents.removeEventListener('animationend', doneHandler);
                contents.removeEventListener('animationcancel', doneHandler);
                this.animating = false;
                resolve(event.type === 'animationcancel');
            };
            contents.addEventListener('animationend', doneHandler);
            contents.addEventListener('animationcancel', doneHandler);

            contents.style.animationName = animation;
            this.animating = true;
        });
    }

    public renderTheme(content: TemplateResult): TemplateResult {
        const { color, scale, lang } = this.theme;
        return html`
            <sp-theme
                color=${ifDefined(color)}
                scale=${ifDefined(scale)}
                lang=${ifDefined(lang)}
                part="theme"
            >
                ${content}
            </sp-theme>
        `;
    }

    public render(): TemplateResult {
        const content = html`
            <div id="contents">
                <slot @slotchange=${this.onSlotChange}></slot>
            </div>
        `;
        return this.hasTheme ? this.renderTheme(content) : content;
    }

    public static create(details: OverlayOpenDetail): ActiveOverlay {
        const overlay = new ActiveOverlay();

        if (details.content) {
            overlay.open(details);
        }

        return overlay;
    }

    private stealOverlayContentPromise = Promise.resolve();
    private stealOverlayContentResolver!: () => void;

    protected async getUpdateComplete(): Promise<boolean> {
        await super.getUpdateComplete();
        await this.stealOverlayContentPromise;
        return true;
    }
}
