/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import type { ReactiveController, ReactiveElement } from 'lit';
import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    Placement,
    shift,
    size,
} from '@floating-ui/dom';
import type { VirtualTrigger } from './VirtualTrigger.js';
import { topLayerOverTransforms } from './topLayerOverTransforms.js';
import type { OpenableElement } from './overlay-types.js';
import type { Overlay } from './Overlay.js';

type OverlayOptionsV1 = {
    abortPromise?: Promise<boolean>;
    delayed?: boolean;
    offset?: number | [number, number]; // supporting multi-axis
    placement: Placement;
    notImmediatelyClosable?: boolean; // rename or place behind other API options
    receivesFocus?: 'auto';
    root?: HTMLElement;
    tipPadding?: number;
    trigger: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};

function roundByDPR(num?: number): number {
    if (typeof num === 'undefined') return 0;
    const dpr = window.devicePixelRatio || 1;
    return Math.round(num * dpr) / dpr ?? -10000;
}

// See: https://spectrum.adobe.com/page/popover/#Container-padding
const REQUIRED_DISTANCE_TO_EDGE = 8;
// See: https://github.com/adobe/spectrum-web-components/issues/910
const MIN_OVERLAY_HEIGHT = 100;

const getFallbackPlacements = (placement: Placement): Placement[] => {
    const fallbacks: Record<Placement, Placement[]> = {
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

export const placementUpdatedSymbol = Symbol('placement updated');

export class PlacementController implements ReactiveController {
    private cleanup?: () => void;

    initialHeight?: number;

    isConstrained?: boolean;

    private host!: ReactiveElement & { elements: OpenableElement[] };

    private options!: OverlayOptionsV1;

    private originalPlacements = new WeakMap<HTMLElement, Placement>();

    private target!: HTMLElement;

    constructor(host: ReactiveElement & { elements: OpenableElement[] }) {
        this.host = host;
        // Add the controller after the MutationObserver has been created in preparation
        // for the `hostConnected`/`hostDisconnected` callbacks to be run.
        this.host.addController(this);
    }

    public async placeOverlay(
        target: HTMLElement = this.target,
        options: OverlayOptionsV1 = this.options
    ): Promise<void> {
        this.target = target;
        this.options = options;
        if (!target || !options) return;

        const cleanup = autoUpdate(
            options.trigger,
            target,
            this.updatePlacement,
            {
                elementResize: false,
            }
        );
        this.cleanup = () => {
            this.host.elements?.forEach((element) => {
                element.addEventListener(
                    'sp-closed',
                    () => {
                        const placement = this.originalPlacements.get(element);
                        if (placement) {
                            element.setAttribute('placement', placement);
                        }
                        this.originalPlacements.delete(element);
                    },
                    { once: true }
                );
            });
            cleanup();
        };
    }

    updatePlacement = (): void => {
        if (this.options.type !== 'modal' && this.cleanup) {
            this.target.dispatchEvent(new Event('close', { bubbles: true }));
            return;
        }
        this.computePlacement();
    };

    async computePlacement(): Promise<void> {
        const { options, target } = this;

        await (document.fonts ? document.fonts.ready : Promise.resolve());

        const flipMiddleware = !(options.trigger instanceof HTMLElement)
            ? flip({
                  padding: REQUIRED_DISTANCE_TO_EDGE,
                  fallbackPlacements: getFallbackPlacements(options.placement),
              })
            : flip();

        const [mainAxis = 0, crossAxis = 0] = Array.isArray(options?.offset)
            ? options.offset
            : [options.offset, 0];

        const tipElement = this.host.elements.find(
            (el) => el.tipElement
        )?.tipElement;

        const middleware = [
            offset({
                mainAxis,
                crossAxis,
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
                    this.initialHeight = !this.isConstrained // && !this.virtualTrigger
                        ? actualHeight
                        : this.initialHeight || actualHeight;
                    this.isConstrained =
                        actualHeight < this.initialHeight ||
                        maxHeight <= actualHeight;
                    const appliedHeight = this.isConstrained
                        ? `${maxHeight}px`
                        : '';
                    Object.assign(target.style, {
                        maxWidth: `${Math.floor(availableWidth)}px`,
                        maxHeight: appliedHeight,
                        height: appliedHeight,
                    });
                },
            }),
            ...(tipElement
                ? [
                      arrow({
                          element: tipElement,
                          padding:
                              options.tipPadding || REQUIRED_DISTANCE_TO_EDGE,
                      }),
                  ]
                : []),
            topLayerOverTransforms(),
        ];
        const { x, y, placement, middlewareData } = await computePosition(
            options.trigger,
            target,
            {
                placement: options.placement,
                middleware,
                strategy: 'fixed',
            }
        );
        Object.assign(target.style, {
            top: '0px',
            left: '0px',
            translate: `${roundByDPR(x)}px ${roundByDPR(y)}px`,
        });

        target.setAttribute('actual-placement', placement);
        this.host.elements?.forEach((element) => {
            this.originalPlacements.set(
                element,
                element.getAttribute('placement') as Placement
            );
            element.setAttribute('placement', placement);
        });

        if (tipElement && middlewareData.arrow) {
            const { x: arrowX, y: arrowY } = middlewareData.arrow;

            Object.assign(tipElement.style, {
                top:
                    placement.startsWith('right') ||
                    placement.startsWith('left')
                        ? '0px'
                        : '',
                left:
                    placement.startsWith('bottom') ||
                    placement.startsWith('top')
                        ? '0px'
                        : '',
                translate: `${roundByDPR(arrowX)}px ${roundByDPR(arrowY)}px`,
            });
        }
    }

    public resetOverlayPosition = (): void => {
        if (!this.target || !this.options) return;

        this.target.style.removeProperty('max-height');
        this.target.style.removeProperty('height');
        this.initialHeight = undefined;
        this.isConstrained = false;
        // force paint
        this.host.offsetHeight;
        this.computePlacement();
    };

    hostConnected(): void {
        document.addEventListener(
            'sp-update-overlays',
            this.resetOverlayPosition
        );
    }

    hostUpdated(): void {
        if (!(this.host as Overlay).open) {
            this.cleanup?.();
            this.cleanup = undefined;
        }
    }

    hostDisconnected(): void {
        this.cleanup?.();
        this.cleanup = undefined;
        document.removeEventListener(
            'sp-update-overlays',
            this.resetOverlayPosition
        );
    }
}
