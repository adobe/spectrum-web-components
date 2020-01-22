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

import {
    Placement,
    OverlayOpenDetail,
    TriggerInteractions,
} from './overlay.js';
import calculatePosition, { PositionResult } from './calculate-position.js';
import { Scale, Color } from '@spectrum-web-components/theme';
import {
    html,
    LitElement,
    TemplateResult,
    CSSResultArray,
    property,
} from 'lit-element';
import styles from './active-overlay.css.js';

interface CalculatePositionOptions {
    containerPadding: number;
    crossOffset: number;
    flip: boolean;
    offset: number;
    placement: string;
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

const defaultOptions: CalculatePositionOptions = {
    containerPadding: 10,
    crossOffset: 0,
    flip: true,
    offset: 0,
    placement: 'left',
};

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
    private root?: HTMLElement;

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
    public scale?: Scale;

    private get hasTheme(): boolean {
        return !!this.color || !!this.scale;
    }

    public offset = 6;
    private position?: PositionResult;
    public interaction: TriggerInteractions = 'hover';
    private positionAnimationFrame = 0;

    private timeout?: number;
    private hiddenDeferred?: Deferred<void>;

    public static get styles(): CSSResultArray {
        return [styles];
    }

    private open(openEvent: CustomEvent<OverlayOpenDetail>): void {
        this.extractEventDetail(openEvent);
        this.stealOverlayContent(openEvent.detail.content);

        /* istanbul ignore if */
        if (!this.overlayContent) return;

        this.state = 'active';

        this.timeout = window.setTimeout(() => {
            this.state = 'visible';
            delete this.timeout;
        }, openEvent.detail.delay);

        this.hiddenDeferred = new Deferred<void>();
        this.addEventListener('animationend', this.onAnimationEnd);
        this.hiddenDeferred.promise.then(() => {
            this.removeEventListener('animationend', this.onAnimationEnd);
        });
    }

    private extractEventDetail(event: CustomEvent<OverlayOpenDetail>): void {
        this.overlayContent = event.detail.content;
        this.trigger = event.detail.trigger;
        this.placement = event.detail.placement;
        this.offset = event.detail.offset;
        this.interaction = event.detail.interaction;
        this.color = event.detail.theme.color;
        this.scale = event.detail.theme.scale;
    }

    public dispose(): void {
        this.state = 'idle';

        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
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

    private get hasSlotenOverlayContent(): boolean {
        return !!(
            this.overlayContent && this.overlayContent.parentElement === this
        );
    }

    public updateOverlayPosition(): void {
        if (
            !this.trigger ||
            !this.overlayContent ||
            !this.hasSlotenOverlayContent ||
            !this.root ||
            !this.isConnected
        ) {
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
            this.root,
            positionOptions.containerPadding,
            positionOptions.flip,
            this.root,
            positionOptions.offset,
            positionOptions.crossOffset
        );

        this.style.setProperty('left', `${this.position.positionLeft}px`);
        this.style.setProperty('top', `${this.position.positionTop}px`);
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
        const scale = this.scale as Scale;
        return html`
            <sp-theme .color=${color} .scale=${scale}>
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

    public static create(
        openEvent: CustomEvent<OverlayOpenDetail>,
        root: HTMLElement
    ): ActiveOverlay {
        const overlay = new ActiveOverlay();

        /* istanbul ignore else */
        if (openEvent.detail.content) {
            overlay.root = root;
            overlay.open(openEvent);
        }

        return overlay;
    }
}
