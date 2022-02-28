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
import {
    makeOverBackground,
    renderButtonSet,
    renderIconSizeOverridden,
    renderLink,
    renderLinkWithTarget,
    renderMinWidthButton,
    renderWithIcon,
} from './index.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-help.js';
import type { Properties } from './index.js';
import { args, argTypes } from './index.js';

const variant = 'white';
const treatment = 'fill';

export default {
    component: 'sp-button',
    title: 'Button/White/Fill',
    decorators: [makeOverBackground()],
    args: {
        ...args,
        variant,
        treatment,
    },
    argTypes,
};

export const Default = (props: Properties): TemplateResult =>
    renderButtonSet(props);

export const withIcon = (props: Properties): TemplateResult =>
    renderWithIcon(props);

export const iconSizeOverridden = (): TemplateResult =>
    renderIconSizeOverridden(variant, treatment);

export const minWidthButton = (props: Properties): TemplateResult =>
    renderMinWidthButton(props);

minWidthButton.story = {
    name: 'min-width',
};

export const link = (props: Properties): TemplateResult => renderLink(props);

link.story = {
    name: 'href',
};

export const linkWithTarget = (props: Properties): TemplateResult =>
    renderLinkWithTarget(props);

linkWithTarget.story = {
    name: 'href with target="_blank"',
};
