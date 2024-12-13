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
    detectOverflow,
    MiddlewareReturn,
    MiddlewareState,
} from '@floating-ui/dom';

/**
 * A plugin that sets the size of an element to full size based on available space.
 *
 * @property {number} padding - The padding to be applied to the element.
 */
export const fullSize = (
    options: { padding: number } = { padding: 0 }
): {
    name: string;
    fn: (middlewareState: MiddlewareState) => Promise<
        MiddlewareReturn & {
            data: { availableWidth: number; availableHeight: number };
        }
    >;
} => ({
    name: 'fullSize',
    async fn(middlewareState: MiddlewareState): Promise<
        MiddlewareReturn & {
            data: { availableWidth: number; availableHeight: number };
        }
    > {
        const overflow = await detectOverflow(middlewareState, options);
        let availableHeight =
            -overflow.top -
            overflow.bottom +
            middlewareState.rects.floating.height;
        let availableWidth =
            -overflow.left -
            overflow.right +
            middlewareState.rects.floating.width;

        // Adjust available height and width based on the placement of the floating element
        if (middlewareState.placement.startsWith('bottom')) {
            availableHeight -= middlewareState.rects.reference.height;
            availableHeight -= middlewareState.rects.reference.y;
            availableHeight -= middlewareState.middlewareData.offset?.y || 0;
            availableHeight += options.padding;
        } else if (middlewareState.placement.startsWith('top')) {
            availableHeight = middlewareState.rects.reference.y;
            availableHeight -= middlewareState.middlewareData.offset?.y || 0;
            availableHeight += options.padding;
        } else if (middlewareState.placement.startsWith('right')) {
            availableWidth -= middlewareState.rects.reference.width;
            availableWidth -= middlewareState.rects.reference.x;
            availableWidth -= middlewareState.middlewareData.offset?.x || 0;
            availableWidth += options.padding;
        } else if (middlewareState.placement.startsWith('left')) {
            availableWidth = middlewareState.rects.reference.x;
            availableWidth -= middlewareState.middlewareData.offset?.x || 0;
            availableWidth += options.padding;
        }

        return {
            data: {
                availableWidth,
                availableHeight,
            },
        };
    },
});
