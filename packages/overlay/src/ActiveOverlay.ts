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
import { Color, Scale } from '@spectrum-web-components/theme';
import styles from './active-overlay.css.js';
import {
    OverlayOpenDetail,
    Placement,
    TriggerInteractions,
} from './overlay-types.js';
import { applyMaxSize, createPopper, Instance, maxSize } from './popper.js';

export interface PositionResult {
    arrowOffsetLeft: number;
    arrowOffsetTop: number;
    maxHeight: number;
    placement: string;
    positionLeft: number;
    positionTop: number;
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
    public returnFocusElement?: HTMLSpanElement;

    private placeholder?: Comment;
    private popper?: Instance;
    private originalSlot?: string;

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
    public color?: Color;
    @property({ attribute: false })
    public receivesFocus?: 'auto';
    @property({ attribute: false })
    public scale?: Scale;

    public tabbingAway = false;
    private originalPlacement?: Placement;

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
            this.removeAttribute('tabindex');
            /* c8 ignore next 3 */
        } else {
            super.focus();
        }
    }

    private get hasTheme(): boolean {
        return !!this.color || !!this.scale;
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

    public feature(): void {
        this.tabIndex = 0;
        if (this.interaction === 'modal') {
            this.slot = 'open';
        }
    }

    public obscure(): void {
        if (this.interaction === 'modal') {
            this.removeAttribute('slot');
        }
    }

    public firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        /* c8 ignore next */
        if (!this.overlayContent) return;

        this.stealOverlayContent(this.overlayContent);

        /* c8 ignore next */
        if (!this.overlayContent || !this.trigger) return;

        if (this.placement && this.placement !== 'none') {
            this.popper = createPopper(this.trigger, this, {
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
            });
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
        this.placement = detail.placement;
        this.offset = detail.offset;
        this.interaction = detail.interaction;
        this.color = detail.theme.color;
        this.scale = detail.theme.scale;
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

        if (this.returnFocusElement) {
            this.returnFocusElement.remove();
            this.trigger.removeEventListener(
                'keydown',
                this.handleInlineTriggerKeydown
            );
        }

        this.returnOverlayContent();
        this.state = 'disposed';

        if (this.willNotifyClosed) {
            this.overlayContent.dispatchEvent(new Event('sp-overlay-closed'));
            this.willNotifyClosed = false;
        }
    }

    private stealOverlayContent(element: HTMLElement): void {
        /* c8 ignore next */
        if (this.placeholder || !element) return;
        if (!this.placeholder) {
            this.placeholder = document.createComment(
                'placeholder for ' + element.nodeName
            );
        }

        const parentElement = element.parentElement || element.getRootNode();

        if (parentElement) {
            parentElement.replaceChild(this.placeholder, element);
        }

        this.overlayContent = element;
        this.originalSlot =
            this.overlayContent.getAttribute('slot') || undefined;
        this.overlayContent.setAttribute('slot', 'overlay');
        this.appendChild(this.overlayContent);

        this.originalPlacement = this.overlayContent.getAttribute(
            'placement'
        ) as Placement;

        this.stealOverlayContentResolver();
    }

    private willNotifyClosed = false;

    private returnOverlayContent(): void {
        /* c8 ignore next */
        if (!this.overlayContent) return;

        if (this.originalSlot) {
            this.overlayContent.setAttribute('slot', this.originalSlot);
            delete this.originalSlot;
        } else {
            this.overlayContent.removeAttribute('slot');
        }

        if (this.placeholder) {
            const parentElement =
                this.placeholder.parentElement ||
                this.placeholder.getRootNode();
            if (parentElement) {
                parentElement.replaceChild(
                    this.overlayContent,
                    this.placeholder
                );
                this.willNotifyClosed = true;
            }
        }

        if (this.originalPlacement) {
            this.overlayContent.setAttribute(
                'placement',
                this.originalPlacement
            );
            delete this.originalPlacement;
        }

        delete this.placeholder;
    }

    public async updateOverlayPosition(): Promise<void> {
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
        const { color, scale } = this;
        return html`
            <sp-theme color=${ifDefined(color)} scale=${ifDefined(scale)}>
                ${content}
            </sp-theme>
        `;
    }

    public render(): TemplateResult {
        const content = html`
            <div id="contents">
                <slot @slotchange=${this.onSlotChange} name="overlay"></slot>
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

    protected async _getUpdateComplete(): Promise<void> {
        await super._getUpdateComplete();
        await this.stealOverlayContentPromise;
    }
}
