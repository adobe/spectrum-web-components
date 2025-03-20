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

import { Buttons, ButtonsVertical } from './button-group.stories.js';

export default {
    title: 'Button Group/Sizes',
    component: 'sp-button-group',
    tags: ['!dev'],
};

export const s = {
    ...Buttons,
    args: { size: 's' },
};

export const m = {
    ...Buttons,
    args: { size: 'm' },
};

export const l = {
    ...Buttons,
    args: { size: 'l' },
};

export const XL = {
    ...Buttons,
    args: { size: 'XL' },
};

export const verticalS = {
    ...ButtonsVertical,
    args: { size: 's' },
};

export const verticalM = {
    ...ButtonsVertical,
    args: { size: 'm' },
};

export const verticalL = {
    ...ButtonsVertical,
    args: { size: 'l' },
};

export const verticalXL = {
    ...ButtonsVertical,
    args: { size: 'XL' },
};
