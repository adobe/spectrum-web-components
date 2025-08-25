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
import { html, TemplateResult } from '@spectrum-web-components/base';

import {
    args,
    argTypes,
    chevronDown,
    chevronUp,
    StoryArgs,
    Template,
} from './index.js';

export default {
    title: 'Infield Button/Sizes',
    component: 'sp-infield-button',
    argTypes,
    args,
};

export const s = (args: StoryArgs): TemplateResult => Template(args);
s.args = {
    size: 's',
};
export const m = (args: StoryArgs): TemplateResult => Template(args);
m.args = {
    size: 'm',
};
export const l = (args: StoryArgs): TemplateResult => Template(args);
l.args = {
    size: 'l',
};
export const XL = (args: StoryArgs): TemplateResult => Template(args);
XL.args = {
    size: 'xl',
};

export const stackedS = (): TemplateResult => html`
    ${Template({
        block: 'start',
        content: chevronUp,
        size: 's',
        label: 'Increase',
    })}
    ${Template({
        block: 'end',
        content: chevronDown,
        size: 's',
        label: 'Decrease',
    })}
`;
export const stackedM = (): TemplateResult => html`
    ${Template({
        block: 'start',
        content: chevronUp,
        size: 'm',
        label: 'Increase',
    })}
    ${Template({
        block: 'end',
        content: chevronDown,
        size: 'm',
        label: 'Decrease',
    })}
`;
export const stackedL = (): TemplateResult => html`
    ${Template({
        block: 'start',
        content: chevronUp,
        size: 'l',
        label: 'Increase',
    })}
    ${Template({
        block: 'end',
        content: chevronDown,
        size: 'l',
        label: 'Decrease',
    })}
`;
export const stackedXL = (): TemplateResult => html`
    ${Template({
        block: 'start',
        content: chevronUp,
        size: 'xl',
        label: 'Increase',
    })}
    ${Template({
        block: 'end',
        content: chevronDown,
        size: 'xl',
        label: 'Decrease',
    })}
`;
