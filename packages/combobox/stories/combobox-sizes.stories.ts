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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/combobox/sp-combobox.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import { fruits } from './index.js';

export default {
    title: 'Combobox/Sizes',
    component: 'sp-combobox',
};

type StoryArgs = {
    onChange: (val: string) => void;
    open: false;
};

const combobox = ({
    open,
    size,
}: {
    open: boolean;
    size: 's' | 'm' | 'l' | 'xl';
}): TemplateResult => {
    return html`
        <sp-field-label size=${size} for="combobox-1">Things</sp-field-label>
        <sp-combobox
            autocomplete="list"
            id="combobox-1"
            .options=${fruits}
            ?open=${open}
            size=${size}
        ></sp-combobox>
    `;
};

export const s = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, size: 's' });

export const sOpen = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, open: true, size: 's' });
sOpen.decorators = [isOverlayOpen];

export const m = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, size: 'm' });

export const mOpen = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, open: true, size: 'm' });
mOpen.decorators = [isOverlayOpen];

export const l = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, size: 'l' });

export const lOpen = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, open: true, size: 'l' });
lOpen.decorators = [isOverlayOpen];

export const xL = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, size: 'xl' });

export const XLOpen = (args: StoryArgs): TemplateResult =>
    combobox({ ...args, open: true, size: 'xl' });
XLOpen.decorators = [isOverlayOpen];
