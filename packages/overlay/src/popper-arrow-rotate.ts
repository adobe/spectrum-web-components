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

function computeArrowRotateStylesFn(ref: ModifierArguments<{}>): undefined {
    if (!ref.state.styles || !ref.state.styles.arrow) return;

    let rotation: number;
    switch (ref.state.placement) {
        case 'bottom':
        case 'bottom-start':
        case 'bottom-end':
            rotation = 180;
            break;
        case 'top':
        case 'top-start':
        case 'top-end':
            return;
        case 'left':
        case 'left-start':
        case 'left-end':
            rotation = 270;
            break;
        case 'right':
        case 'right-start':
        case 'right-end':
            rotation = 90;
            break;
        default:
            return;
    }

    ref.state.styles.arrow.transform += ` rotate(${rotation}deg)`;
    // Manage Spectrum CSS usage of negative left margin for centering.
    ref.state.styles.arrow.marginLeft = '0';

    return;
}

export const computeArrowRotateStyles: Modifier<{}> = {
    name: 'computeArrowRotateStyles',
    enabled: true,
    phase: 'beforeWrite',
    requiresIfExists: ['arrow'],
    fn: computeArrowRotateStylesFn,
    data: {},
};
