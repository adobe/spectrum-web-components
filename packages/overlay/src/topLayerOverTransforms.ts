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
import { getContainingBlock, getWindow } from '@floating-ui/utils/dom';

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
        } catch (error) {}
        topLayerIsFloating = onTopLayer;
        if (!onTopLayer) {
            const dialogAncestorQueryEvent = new Event(
                'floating-ui-dialog-test',
                { composed: true, bubbles: true }
            );
            floating.addEventListener(
                'floating-ui-dialog-test',
                (event: Event) => {
                    (event.composedPath() as unknown as Element[]).forEach(
                        (el) => {
                            if (el === floating || el.localName !== 'dialog')
                                return;
                            try {
                                onTopLayer = onTopLayer || el.matches(':modal');
                                if (onTopLayer) {
                                    // console.log(el);
                                }
                                // eslint-disable-next-line no-empty
                            } catch (error) {}
                        }
                    );
                },
                { once: true }
            );
            floating.dispatchEvent(dialogAncestorQueryEvent);
        }
        let overTransforms = false;
        const containingBlock = getContainingBlock(reference as Element);
        if (
            containingBlock !== null &&
            getWindow(containingBlock) !==
                (containingBlock as unknown as Window)
        ) {
            overTransforms = true;
        }

        if (onTopLayer && overTransforms && containingBlock) {
            const rect = containingBlock.getBoundingClientRect();
            diffCoords.x = rect.x;
            diffCoords.y = rect.y;
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
