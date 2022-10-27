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
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import { reparentChildren } from '@spectrum-web-components/shared/src/reparent-children.js';
import { firstFocusableIn } from '@spectrum-web-components/shared/src/first-focusable-in.js';
import type {
    Color,
    Scale,
    ThemeVariant,
} from '@spectrum-web-components/theme/src/Theme.js';
import styles from './active-overlay.css.js';
import { parentOverlayOf } from './overlay-utils.js';
import {
    OverlayOpenCloseDetail,
    OverlayOpenDetail,
    Placement,
    TriggerInteractions,
} from './overlay-types.js';
import type { VirtualTrigger } from './VirtualTrigger.js';
import {
    arrow,
    computePosition,
    flip,
    Placement as FloatingUIPlacement,
    offset,
    shift,
    size,
} from '@floating-ui/dom';

export interface PositionResult {
    arrowOffsetLeft: number;
    arrowOffsetTop: number;
    maxHeight: number;
    placement: string;
    positionLeft: number;
    positionTop: number;
}

type OverlayStateType = 'idle' | 'active' | 'hiding' | 'dispose' | 'disposed';
type ContentAnimation = 'sp-overlay-fade-in' | 'sp-overlay-fade-out';

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

const getFallbackPlacements = (
    placement: FloatingUIPlacement
): FloatingUIPlacement[] => {
    const fallbacks: Record<FloatingUIPlacement, FloatingUIPlacement[]> = {
        left: ['right', 'bottom', 'top'],
        'left-start': ['right-start', 'bottom', 'top'],
        'left-end': ['right-end', 'bottom', 'top'],
        right: ['left', 'bottom', 'top'],
        'right-start': ['left-start', 'bottom', 'top'],
        'right-end': ['left-end', 'bottom', 'top'],
        top: ['bottom', 'left', 'right'],
        'top-start': ['bottom-start', 'left', 'right'],
        'top-end': ['bottom-end', 'left', 'right'],
        bottom: ['top', 'left', 'right'],
        'bottom-start': ['top-start', 'left', 'right'],
        'bottom-end': ['top-end', 'left', 'right'],
    };
    return fallbacks[placement] ?? [placement];
};

/**
 * @element active-overlay
 *
 * @slot - content to display in the overlay
 */
export class ActiveOverlay extends SpectrumElement {
    public overlayContent!: HTMLElement;
    public overlayContentTip?: HTMLElement;
    public trigger!: HTMLElement;
    public root?: HTMLElement;
    public virtualTrigger?: VirtualTrigger;

    protected childrenReady!: Promise<unknown[]>;

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
        if (this.state === 'active' || this.state === 'hiding') {
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
        theme?: ThemeVariant;
    } = {};
    @property({ attribute: false })
    public receivesFocus?: 'auto';

    public tabbingAway = false;
    private originalPlacement?: Placement;
    private restoreContent?: () => Element[];

    public override async focus(): Promise<void> {
        const firstFocusable = firstFocusableIn(this);
        if (firstFocusable) {
            if ((firstFocusable as SpectrumElement).updateComplete) {
                await firstFocusable.updateComplete;
            }
            const activeElement = (this.getRootNode() as Document)
                .activeElement;
            if (activeElement === this || !this.contains(activeElement)) {
                firstFocusable.focus();
            }
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
    public skidding = 0;
    public interaction: TriggerInteractions = 'hover';
    private positionAnimationFrame = 0;

    private timeout?: number;

    public static override get styles(): CSSResultArray {
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
        // eslint-disable-next-line spectrum-web-components/document-active-element
        if (!this.contains(document.activeElement)) {
            this.tabIndex = -1;
        }
        const parentOverlay = parentOverlayOf(this.trigger);
        const parentIsModal = parentOverlay && parentOverlay.slot === 'open';
        if (parentIsModal) {
            this._modalRoot = parentOverlay._modalRoot || parentOverlay;
        }
        // If an overlay it triggered from within a "modal" overlay, it needs to continue
        // to act like one to get treated correctly in regards to tab trapping.
        if (this.interaction === 'modal' || this._modalRoot) {
            this.slot = 'open';
            if (this.interaction === 'modal') {
                this.setAttribute('aria-modal', 'true');
            }
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
            this.removeAttribute('aria-modal');
            // Obscure upto and including the next modal root.
            if (this.interaction !== 'modal') {
                const parentOverlay = parentOverlayOf(this.trigger);
                this._modalRoot = parentOverlay?.obscure(
                    nextOverlayInteraction
                );
                return this._modalRoot;
            }
            return this;
        }
        return undefined;
    }

    public override async willUpdate(): Promise<void> {
        if (this.hasUpdated) return;

        /* c8 ignore next */
        if (!this.overlayContent || !this.trigger) return;

        this.stealOverlayContent(
            this.overlayContent as HTMLElement & { placement: Placement }
        );

        this.state = 'active';

        // force paint
        // this prevents a timing issue that can show up in tests as
        // 'Error: Timeout: Wait for decorator to become ready...'
        this.offsetWidth;

        this.feature();
        if (this.placement === 'none') {
            this.style.setProperty(
                '--swc-visual-viewport-height',
                `${window.innerHeight}px`
            );
        } else if (this.placement) {
            await this.updateOverlayPosition();
            document.addEventListener(
                'sp-update-overlays',
                this.updateOverlayPosition
            );
            window.addEventListener('scroll', this.updateOverlayPosition);
        }
        const actions: Promise<unknown>[] = [];
        if (this.placement && this.placement !== 'none') {
            actions.push(this.applyContentAnimation('sp-overlay-fade-in'));
        }
        if (
            typeof (this.overlayContent as SpectrumElement).updateComplete !==
            'undefined'
        ) {
            actions.push(
                (this.overlayContent as SpectrumElement).updateComplete
            );
        }
        this.childrenReady = Promise.all(actions);
    }

    public async openCallback(
        lifecycleCallback: () => Promise<void> | void
    ): Promise<void> {
        await this.updateComplete;
        if (this.receivesFocus) {
            await this.focus();
        }

        await lifecycleCallback();

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
        this.skidding = detail.skidding || 0;
        this.interaction = detail.interaction;
        this.theme = detail.theme;
        this.receivesFocus = detail.receivesFocus;
        this.root = detail.root;
    }

    public dispose(): void {
        /* c8 ignore next */
        if (this.state !== 'dispose') return;

        /* c8 ignore next 4 */
        if (this.timeout) {
            clearTimeout(this.timeout);
            delete this.timeout;
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

    private stealOverlayContent(
        element: HTMLElement & { placement: Placement }
    ): void {
        this.originalPlacement = element.getAttribute('placement') as Placement;
        this.restoreContent = reparentChildren([element], this, {
            position: 'beforeend',
            prepareCallback: (el) => {
                const slotName = el.slot;
                const placement = el.placement;
                el.removeAttribute('slot');
                return (el) => {
                    el.slot = slotName;
                    el.placement = placement;
                };
            },
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

    private initialHeight!: number;
    private isConstrained = false;

    public updateOverlayPosition = async (): Promise<void> => {
        if (!this.placement || this.placement === 'none') {
            return;
        }
        await (document.fonts ? document.fonts.ready : Promise.resolve());

        function roundByDPR(num: number): number {
            const dpr = window.devicePixelRatio || 1;
            return Math.round(num * dpr) / dpr || -10000;
        }

        // See: https://spectrum.adobe.com/page/popover/#Container-padding
        const REQUIRED_DISTANCE_TO_EDGE = 8;
        // See: https://github.com/adobe/spectrum-web-components/issues/910
        const MIN_OVERLAY_HEIGHT = 100;

        const flipMiddleware = this.virtualTrigger
            ? flip({
                  padding: REQUIRED_DISTANCE_TO_EDGE,
                  fallbackPlacements: getFallbackPlacements(this.placement),
              })
            : flip({
                  padding: REQUIRED_DISTANCE_TO_EDGE,
              });

        const middleware = [
            offset({
                mainAxis: this.offset,
                crossAxis: this.skidding,
            }),
            shift({ padding: REQUIRED_DISTANCE_TO_EDGE }),
            flipMiddleware,
            size({
                padding: REQUIRED_DISTANCE_TO_EDGE,
                apply: ({
                    availableWidth,
                    availableHeight,
                    rects: { floating },
                }) => {
                    const maxHeight = Math.max(
                        MIN_OVERLAY_HEIGHT,
                        Math.floor(availableHeight)
                    );
                    const actualHeight = floating.height;
                    this.initialHeight =
                        !this.isConstrained && !this.virtualTrigger
                            ? actualHeight
                            : this.initialHeight || actualHeight;
                    this.isConstrained =
                        actualHeight < this.initialHeight ||
                        maxHeight <= actualHeight;
                    const appliedHeight = this.isConstrained
                        ? `${maxHeight}px`
                        : '';
                    Object.assign(this.style, {
                        maxWidth: `${Math.floor(availableWidth)}px`,
                        maxHeight: appliedHeight,
                        height: appliedHeight,
                    });
                },
            }),
        ];
        if (this.overlayContentTip) {
            middleware.push(arrow({ element: this.overlayContentTip }));
        }
        const { x, y, placement, middlewareData } = await computePosition(
            this.virtualTrigger || this.trigger,
            this,
            {
                placement: this.placement,
                middleware,
            }
        );

        Object.assign(this.style, {
            top: '0px',
            left: '0px',
            transform: `translate(${roundByDPR(x)}px, ${roundByDPR(y)}px)`,
        });

        if (placement !== this.getAttribute('actual-placement')) {
            this.setAttribute('actual-placement', placement);
            this.overlayContent.setAttribute('placement', placement);
        }

        if (this.overlayContentTip && middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(this.overlayContentTip.style, {
                left: arrowX != null ? `${roundByDPR(arrowX)}px` : '',
                top: arrowY != null ? `${roundByDPR(arrowY)}px` : '',
                right: '',
                bottom: '',
            });
        }
    };

    public async hide(animated = true): Promise<void> {
        this.state = 'hiding';
        if (animated) {
            await this.applyContentAnimation('sp-overlay-fade-out');
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

    public applyContentAnimation(
        animation: ContentAnimation
    ): Promise<boolean> {
        if (this.placement === 'none') {
            return Promise.resolve(true);
        }
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
        const { color, scale, lang, theme } = this.theme;
        return html`
            <sp-theme
                theme=${ifDefined(theme)}
                color=${ifDefined(color)}
                scale=${ifDefined(scale)}
                lang=${ifDefined(lang)}
                part="theme"
            >
                ${content}
            </sp-theme>
        `;
    }

    public override render(): TemplateResult {
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

    protected override async getUpdateComplete(): Promise<boolean> {
        const actions: Promise<unknown>[] = [
            super.getUpdateComplete(),
            this.stealOverlayContentPromise,
        ];
        if (this.childrenReady) {
            actions.push(this.childrenReady);
        }
        const [complete] = await Promise.all(actions);
        return complete as boolean;
    }

    override disconnectedCallback(): void {
        document.removeEventListener(
            'sp-update-overlays',
            this.updateOverlayPosition
        );
        window.removeEventListener('scroll', this.updateOverlayPosition);
        super.disconnectedCallback();
    }
}
