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
import type { Middleware, MiddlewareState } from '@floating-ui/dom';
import {
    getContainingBlock,
    getWindow,
    isContainingBlock,
} from '@floating-ui/utils/dom';
import { VirtualTrigger } from './VirtualTrigger.js';

export const topLayerOverTransforms = (): Middleware => ({
    name: 'topLayer',
    async fn(middlewareArguments: MiddlewareState) {
        const {
            x,
            y,
            elements: { reference, floating },
        } = middlewareArguments;
        let onTopLayer = false;
        let topLayerIsFloating = false;
        let withinReference = false;
        const diffCoords = {
            x: 0,
            y: 0,
        };
        try {
            onTopLayer = onTopLayer || floating.matches(':popover-open');
            // eslint-disable-next-line no-empty
        } catch (error) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':open');
            // eslint-disable-next-line no-empty
        } catch (error) {}
        try {
            onTopLayer = onTopLayer || floating.matches(':modal');
            // eslint-disable-next-line no-empty
            /* c8 ignore next 3 */
        } catch (error) {}
        topLayerIsFloating = onTopLayer;
        const dialogAncestorQueryEvent = new Event('floating-ui-dialog-test', {
            composed: true,
            bubbles: true,
        });
        floating.addEventListener(
            'floating-ui-dialog-test',
            (event: Event) => {
                (event.composedPath() as unknown as Element[]).forEach((el) => {
                    withinReference = withinReference || el === reference;
                    if (el === floating || el.localName !== 'dialog') return;
                    try {
                        onTopLayer = onTopLayer || el.matches(':modal');
                        // eslint-disable-next-line no-empty
                        /* c8 ignore next */
                    } catch (error) {}
                });
            },
            { once: true }
        );
        floating.dispatchEvent(dialogAncestorQueryEvent);
        let overTransforms = false;
        if (!(reference instanceof VirtualTrigger)) {
            const root = (withinReference ? reference : floating) as Element;
            const containingBlock = isContainingBlock(root)
                ? root
                : getContainingBlock(root);
            let css: CSSStyleDeclaration | Record<string, string> = {};
            if (
                containingBlock !== null &&
                getWindow(containingBlock) !==
                    (containingBlock as unknown as Window)
            ) {
                css = getComputedStyle(containingBlock);
                // The overlay is "over transforms" when the containing block uses specific CSS...
                overTransforms =
                    // the `transform` property
                    css.transform !== 'none' ||
                    // the `translate` property
                    css.translate !== 'none' ||
                    // the `backdropFilter` property
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (css.backdropFilter
                        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          css.backdropFilter !== 'none'
                        : false) ||
                    // the `filter` property for anything other than "none"
                    (css.filter ? css.filter !== 'none' : false) ||
                    // the `transform` property "will-change"
                    css.willChange.search('transform') > -1 ||
                    // the `transform` property "will-change"
                    css.willChange.search('translate') > -1 ||
                    // a value of "paint", "layout", "strict", or "content" for `contain`
                    ['paint', 'layout', 'strict', 'content'].some((value) =>
                        (css.contain || '').includes(value)
                    );
            }

            if (onTopLayer && overTransforms && containingBlock) {
                const rect = containingBlock.getBoundingClientRect();
                // Margins are not included in the bounding client rect and need to be handled separately.
                const { marginInlineStart = '0', marginBlockStart = '0' } = css;
                diffCoords.x = rect.x + parseFloat(marginInlineStart);
                diffCoords.y = rect.y + parseFloat(marginBlockStart);
            }
        }

        if (onTopLayer && topLayerIsFloating) {
            return {
                x: x + diffCoords.x,
                y: y + diffCoords.y,
                data: diffCoords,
            };
        }

        if (onTopLayer) {
            return {
                x,
                y,
                data: diffCoords,
            };
        }

        return {
            x: x - diffCoords.x,
            y: y - diffCoords.y,
            data: diffCoords,
        };
    },
});
