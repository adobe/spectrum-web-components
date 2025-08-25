/**
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import {
    detectOverflow,
    MiddlewareArguments,
    MiddlewareReturn,
} from '@floating-ui/dom';

export const fullSize = (options: { padding: number } = { padding: 0 }) => ({
    name: 'fullSize',
    async fn(middlewareArguments: MiddlewareArguments): Promise<
        MiddlewareReturn & {
            data: { availableWidth: number; availableHeight: number };
        }
    > {
        const overflow = await detectOverflow(middlewareArguments, options);
        let availableHeight =
            -overflow.top -
            overflow.bottom +
            middlewareArguments.rects.floating.height;
        let availableWidth =
            -overflow.left -
            overflow.right +
            middlewareArguments.rects.floating.width;
        if (middlewareArguments.placement.startsWith('bottom')) {
            availableHeight -= middlewareArguments.rects.reference.height;
            availableHeight -= middlewareArguments.rects.reference.y;
            availableHeight -=
                middlewareArguments.middlewareData.offset?.y || 0;
            availableHeight += options.padding;
        } else if (middlewareArguments.placement.startsWith('top')) {
            availableHeight = middlewareArguments.rects.reference.y;
            availableHeight -=
                middlewareArguments.middlewareData.offset?.y || 0;
            availableHeight += options.padding;
        } else if (middlewareArguments.placement.startsWith('right')) {
            availableWidth -= middlewareArguments.rects.reference.width;
            availableWidth -= middlewareArguments.rects.reference.x;
            availableWidth -= middlewareArguments.middlewareData.offset?.x || 0;
            availableWidth += options.padding;
        } else if (middlewareArguments.placement.startsWith('left')) {
            availableWidth = middlewareArguments.rects.reference.x;
            availableWidth -= middlewareArguments.middlewareData.offset?.x || 0;
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
