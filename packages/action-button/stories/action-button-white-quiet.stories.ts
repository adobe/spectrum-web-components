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
import { TemplateResult } from '@spectrum-web-components/base';
import { makeOverBackground } from '../../button/stories/index.js';
import type { Properties } from './index.js';
import { renderButtons } from './index.js';

export default {
    component: 'sp-action-button',
    title: 'Action Button/Static White Quiet',
    decorators: [makeOverBackground()],
};

const variant = 'white';
const quiet = true;

export const s = (args: Properties): TemplateResult => renderButtons(args);
s.args = {
    size: 's',
    quiet,
    variant,
};

export const m = (args: Properties): TemplateResult => renderButtons(args);
m.args = {
    size: 'm',
    quiet,
    variant,
};

export const l = (args: Properties): TemplateResult => renderButtons(args);
l.args = {
    size: 'l',
    quiet,
    variant,
};

export const XL = (args: Properties): TemplateResult => renderButtons(args);
XL.args = {
    size: 'xl',
    quiet,
    variant,
};
