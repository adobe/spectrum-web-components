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
// import calculatePosition, { PositionResult } from './calculate-position.js';
import { Size, Color } from '@spectrum-web-components/theme';
import {
    html,
    LitElement,
    TemplateResult,
    CSSResultArray,
    property,
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

class Deferred<T> {
    private resolveFn?: (value: T) => void;

    public promise: Promise<T> = new Promise(
        (resolve: (value: T) => void) => (this.resolveFn = resolve)
    );

    public resolve(value: T): void {
        /* istanbul ignore else */
        if (this.resolveFn) {
            this.resolveFn(value);
        }
    }
}

const FadeOutAnimation = 'spOverlayFadeOut';

type OverlayStateType = 'idle' | 'active' | 'visible' | 'hiding';

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
    public trigger?: HTMLElement;

    private placeholder?: Comment;
    private popper?: Instance;

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

    @property({ reflect: true })
    public placement: Placement = 'bottom';
    @property({ attribute: false })
    public color?: Color;
    @property({ attribute: false })
    public size?: Size;

    private get hasTheme(): boolean {
        return !!this.color || !!this.size;
    }

    public offset = 6;
    public interaction: TriggerInteractions = 'hover';
    private positionAnimationFrame = 0;

    private timeout?: number;
    private hiddenDeferred?: Deferred<void>;

    public static get styles(): CSSResultArray {
        return [styles];
    }

    private open(openDetail: OverlayOpenDetail): void {
        this.extractDetail(openDetail);
        this.stealOverlayContent(openDetail.content);

        /* istanbul ignore if */
        if (!this.overlayContent || !this.trigger) return;

        this.popper = createPopper(this.trigger, this.overlayContent, {
            placement: this.placement,
        });

        this.state = 'active';

        this.timeout = window.setTimeout(() => {
            this.state = 'visible';
            delete this.timeout;
        }, openDetail.delay);

        this.hiddenDeferred = new Deferred<void>();
        this.addEventListener('animationend', this.onAnimationEnd);
        this.hiddenDeferred.promise.then(() => {
            this.removeEventListener('animationend', this.onAnimationEnd);
        });
    }

    private extractDetail(detail: OverlayOpenDetail): void {
        this.overlayContent = detail.content;
        this.trigger = detail.trigger;
        this.placement = detail.placement;
        this.offset = detail.offset;
        this.interaction = detail.interaction;
        this.color = detail.theme.color;
        this.size = detail.theme.size;
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
        this.overlayContent.setAttribute('slot', 'overlay');
        this.appendChild(this.overlayContent);
    }

    private returnOverlayContent(): void {
        /* istanbul ignore if */
        if (!this.overlayContent) return;

        this.overlayContent.removeAttribute('slot');

        /* istanbul ignore else */
        if (this.placeholder && this.placeholder.parentElement) {
            this.placeholder.parentElement.replaceChild(
                this.overlayContent,
                this.placeholder
            );
        }
        delete this.placeholder;
    }

    public updateOverlayPosition(): void {
        if (this.popper) {
            this.popper.update();
        }
    }

    public async hide(): Promise<void> {
        this.state = 'hiding';
        /* istanbul ignore else */
        if (this.hiddenDeferred) {
            return this.hiddenDeferred.promise;
        }
    }

    private onAnimationEnd = (event: AnimationEvent): void => {
        if (this.hiddenDeferred && event.animationName === FadeOutAnimation) {
            this.hiddenDeferred.resolve();
        }
    };

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

    public renderTheme(content: TemplateResult): TemplateResult {
        import('@spectrum-web-components/theme');
        const color = this.color as Color;
        const size = this.size as Size;
        return html`
            <sp-theme .color=${color} .size=${size}>
                ${content}
            </sp-theme>
        `;
    }

    public render(): TemplateResult {
        const content = html`
            <slot @slotchange=${this.onSlotChange} name="overlay"></slot>
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
