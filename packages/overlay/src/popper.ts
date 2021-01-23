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

// Bundle only what we want from popper
// See: https://popper.js.org/docs#popper-lite-tree-shaking

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../local.d.ts" />
import type { Placement } from '@popperjs/core/dist/esm/enums.js';
import arrow from '@popperjs/core/dist/esm/modifiers/arrow.js';
import flip from '@popperjs/core/dist/esm/modifiers/flip.js';
import offset from '@popperjs/core/dist/esm/modifiers/offset.js';
import preventOverflow from '@popperjs/core/dist/esm/modifiers/preventOverflow.js';
import {
    defaultModifiers,
    popperGenerator,
} from '@popperjs/core/dist/esm/popper-lite.js';
import type { Instance } from '@popperjs/core/dist/esm/types.js';
import maxSize from 'popper-max-size-modifier';
import { applyMaxSize } from './apply-max-size.js';

export const createPopper = popperGenerator({
    defaultModifiers: [
        ...defaultModifiers,
        flip,
        preventOverflow,
        arrow,
        offset,
    ],
});

export type { Instance, Placement };
export { maxSize, applyMaxSize };
