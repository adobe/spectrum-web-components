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

import {
    arrow,
    computePosition,
    flip,
    offset,
    Placement,
    shift,
    size,
} from '@floating-ui/dom';
import type { VirtualTrigger } from './VirtualTrigger.js';
import { topLayerOverTransforms } from './topLayerOverTransforms.js';

type OverlayOptions = {
    abortPromise?: Promise<boolean>;
    delayed?: boolean;
    offset?: number | [number, number]; // supporting multi-axis
    placement: Placement;
    notImmediatelyClosable?: boolean; // rename or place behind other API options
    receivesFocus?: 'auto';
    root?: HTMLElement;
    trigger: HTMLElement | VirtualTrigger;
    type?: 'modal' | 'page' | 'hint' | 'auto' | 'manual';
};

type OverlayData = {
    initialHeight?: number;
    isConstrained?: boolean;
    elements?: HTMLElement[];
    tipElement?: HTMLElement;
};

function roundByDPR(num?: number): number {
    if (typeof num === 'undefined') return 0;
    const dpr = window.devicePixelRatio || 1;
    return Math.round(num * dpr) / dpr || -10000;
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

export const updateOverlayPosition = async (
    target: HTMLElement,
    options: OverlayOptions,
    overlayData: OverlayData
): Promise<void> => {
    await (document.fonts ? document.fonts.ready : Promise.resolve());

    const flipMiddleware = !(options.trigger instanceof HTMLElement)
        ? flip({
              padding: REQUIRED_DISTANCE_TO_EDGE,
              fallbackPlacements: getFallbackPlacements(options.placement),
          })
        : flip({
              padding: REQUIRED_DISTANCE_TO_EDGE,
          });

    const mainAxis = Array.isArray(options?.offset)
        ? options?.offset[0]
        : options?.offset || 0;
    const crossAxis = Array.isArray(options?.offset)
        ? options?.offset[1] || 0
        : 0;

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
                overlayData.initialHeight =
                    !overlayData.isConstrained /* && !this.virtualTrigger */
                        ? actualHeight
                        : overlayData.initialHeight || actualHeight;
                overlayData.isConstrained =
                    actualHeight < overlayData.initialHeight ||
                    maxHeight <= actualHeight;
                const appliedHeight = overlayData.isConstrained
                    ? `${maxHeight}px`
                    : '';
                Object.assign(target.style, {
                    maxWidth: `${Math.floor(availableWidth)}px`,
                    maxHeight: appliedHeight,
                    height: appliedHeight,
                });
            },
        }),
        ...(overlayData.tipElement
            ? [arrow({ element: overlayData.tipElement })]
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
        transform: `translate(${roundByDPR(x)}px, ${roundByDPR(y)}px)`,
    });

    if (placement !== target.getAttribute('actual-placement')) {
        target.setAttribute('actual-placement', placement);
        overlayData.elements?.forEach((element) => {
            element.setAttribute('placement', placement);
        });
    }

    if (overlayData.tipElement && middlewareData.arrow) {
        const { x: arrowX, y: arrowY } = middlewareData.arrow;

        Object.assign(overlayData.tipElement.style, {
            top:
                placement.startsWith('right') || placement.startsWith('left')
                    ? '0px'
                    : '',
            left:
                placement.startsWith('bottom') || placement.startsWith('top')
                    ? '0px'
                    : '',
            transform: `translate(${roundByDPR(arrowX)}px, ${roundByDPR(
                arrowY
            )}px)`,
        });
    }
};
