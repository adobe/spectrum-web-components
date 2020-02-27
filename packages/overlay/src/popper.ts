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

// Bundle only what we want from popper
// See: https://popper.js.org/docs#popper-lite-tree-shaking

import {
    popperGenerator,
    defaultModifiers,
} from '@popperjs/core/lib/popper-lite';
import { Instance } from '@popperjs/core/lib/types';
import { Placement } from '@popperjs/core/lib/enums';

import flip from '@popperjs/core/lib/modifiers/flip';
import preventOverflow from '@popperjs/core/lib/modifiers/preventOverflow';
import arrow from '@popperjs/core/lib/modifiers/arrow';
import offset from '@popperjs/core/lib/modifiers/offset';
import { computeArrowRotateStyles } from './popper-arrow-rotate';

export const createPopper = popperGenerator({
    defaultModifiers: [
        ...defaultModifiers,
        flip,
        preventOverflow,
        arrow,
        offset,
        computeArrowRotateStyles,
    ],
});

export { Instance, Placement };
