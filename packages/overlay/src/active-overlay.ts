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

import { createPopper, Instance } from './popper';
import {
    Placement,
    OverlayOpenDetail,
    TriggerInteractions,
} from './overlay-types.js';
import { Scale, Color } from '@spectrum-web-components/theme';
import {
    html,
    LitElement,
    TemplateResult,
    CSSResultArray,
    property,
    PropertyValues,
} from 'lit-element';
import styles from './active-overlay.css.js';

export interface PositionResult {
    arrowOffsetLeft: number;
    arrowOffsetTop: number;
    maxHeight: number;
    placement: string;
    positionLeft: number;
    positionTop: number;
}

type OverlayStateType = 'idle' | 'active' | 'visible' | 'hiding';
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
                idle: 'idle',
            },
        },
    },
};

const stateTransition = (
    state?: OverlayStateType,
    event?: string
): OverlayStateType => {
    if (!state) return stateMachine.initial;
    /* istanbul ignore if */
    if (!event) return state;
    return stateMachine.states[state].on[event] || state;
};

export class ActiveOverlay extends LitElement {
    public overlayContent?: HTMLElement;
    public overlayContentTip?: HTMLElement;
    public trigger?: HTMLElement;

    private placeholder?: Comment;
    private popper?: Instance;
    private originalSlot: string | null = null;

    @property()
    public _state = stateTransition();
    public get state(): OverlayStateType {
        return this._state;
    }
    public set state(state) {
        const nextState = stateTransition(this.state, state);
        if (nextState === this.state) {
            return;
        }
        this._state = nextState;
        if (this.state === 'idle') {
            this.removeAttribute('state');
        } else {
            this.setAttribute('state', this.state);
        }
    }

    @property({ reflect: true, type: Boolean })
    public animating = false;

    @property({ reflect: true })
    public placement?: Placement;
    @property({ attribute: false })
    public color?: Color;
    @property({ attribute: false })
    public scale?: Scale;

    private originalPlacement?: Placement;

    /**
     * @prop Used by the popper library to indicate where the overlay was
     *       actually rendered. Popper may switch which side an overlay
     *       is rendered on to fit it on the screen
     */
    @property({ attribute: 'data-popper-placement' })
    public dataPopperPlacement?: Placement;

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

    public firstUpdated(changedProperties: PropertyValues): void {
        super.firstUpdated(changedProperties);

        /* istanbul ignore if */
        if (!this.overlayContent) return;

        this.stealOverlayContent(this.overlayContent);

        /* istanbul ignore if */
        if (!this.overlayContent || !this.trigger || !this.shadowRoot) return;

        /* istanbul ignore else */
        if (this.placement && this.placement !== 'none') {
            this.popper = createPopper(this.trigger, this, {
                placement: this.placement,
                modifiers: [
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

        this.updateOverlayPosition().then(() =>
            this.applyContentAnimation('spOverlayFadeIn')
        );
    }

    private updateOverlayPopperPlacement(): void {
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
    }

    public dispose(): void {
        this.state = 'idle';

        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
        }

        if (this.popper) {
            this.popper.destroy();
            this.popper = undefined;
        }

        this.returnOverlayContent();
    }

    private stealOverlayContent(element: HTMLElement): void {
        /* istanbul ignore if */
        if (this.placeholder || !element) return;
        /* istanbul ignore else */
        if (!this.placeholder) {
            this.placeholder = document.createComment(
                'placeholder for ' + element.nodeName
            );
        }

        /* istanbul ignore else */
        if (element.parentElement) {
            element.parentElement.replaceChild(this.placeholder, element);
        }

        this.overlayContent = element;
        this.originalSlot = this.overlayContent.getAttribute('slot');
        this.overlayContent.setAttribute('slot', 'overlay');
        this.appendChild(this.overlayContent);

        this.originalPlacement = this.overlayContent.getAttribute(
            'placement'
        ) as Placement;
    }

    private returnOverlayContent(): void {
        /* istanbul ignore if */
        if (!this.overlayContent) return;

        if (this.originalSlot) {
            this.overlayContent.setAttribute('slot', this.originalSlot);
            delete this.originalSlot;
        } else {
            this.overlayContent.removeAttribute('slot');
        }

        /* istanbul ignore else */
        if (this.placeholder && this.placeholder.parentElement) {
            this.placeholder.parentElement.replaceChild(
                this.overlayContent,
                this.placeholder
            );
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
        if (animated) {
            this.state = 'hiding';
            await this.applyContentAnimation('spOverlayFadeOut');
        }
        this.state = 'idle';
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

    public connectedCallback(): void {
        super.connectedCallback();
        this.schedulePositionUpdate();
    }

    public applyContentAnimation(
        animation: ContentAnimation
    ): Promise<boolean> {
        return new Promise((resolve, reject): void => {
            /* istanbul ignore if */
            if (!this.shadowRoot) {
                reject();
                return;
            }

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
        import('@spectrum-web-components/theme');
        const color = this.color as Color;
        const scale = this.scale as Scale;
        return html`
            <sp-theme .color=${color} .scale=${scale}>
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

        /* istanbul ignore else */
        if (details.content) {
            overlay.open(details);
        }

        return overlay;
    }
}
