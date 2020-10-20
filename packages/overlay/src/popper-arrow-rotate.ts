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

import { ModifierArguments, Modifier } from '@popperjs/core/lib/types';

// Spectrum elements that have arrows (tips) use a transform to rotate them.
// Popper overwrites those values, so we have to put them back

function computeArrowRotateStylesFn(
    ref: ModifierArguments<Record<string, unknown>>
): undefined {
    /* c8 ignore next */
    if (!ref.state.styles || !ref.state.styles.arrow) return;

    let scaleType!: string;
    let scale!: number;
    switch (ref.state.placement) {
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
            scaleType = 'scaleY';
            scale = -1;
            break;
        case 'top':
        case 'top-start':
        case 'top-end':
            break;
        case 'left':
        case 'left-start':
        case 'left-end':
            break;
        case 'right':
        case 'right-start':
        case 'right-end':
            scaleType = 'scaleX';
            scale = -1;
            break;
        // Should never go to default as all possible placement values are listed above.
        // Don't alter the arrow in the case that it ever did as we don't know what changes to apply.
        /* c8 ignore next 2 */
        default:
            return;
    }

    if (!!scaleType && !!scale) {
        ref.state.styles.arrow.transform += ` ${scaleType}(${scale})`;
    }
    // Manage Spectrum CSS usage of negative left margin for centering.
    ref.state.styles.arrow.marginLeft = '0';
    // Manage Spectrum CSS usage of negative top margin for centering.
    ref.state.styles.arrow.marginTop = '0';

    return;
}

export const computeArrowRotateStyles: Modifier<
    'computeArrowRotateStyles',
    Record<string, unknown>
> = {
    name: 'computeArrowRotateStyles',
    enabled: true,
    phase: 'beforeWrite',
    requiresIfExists: ['arrow'],
    fn: computeArrowRotateStylesFn,
    data: {},
};
