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

import { ComboboxOption } from '@spectrum-web-components/combobox';
import '@spectrum-web-components/combobox/sp-combobox.js';
import { isOverlayOpen } from '../../overlay/stories/index.js';

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
    const options: ComboboxOption[] = [
        { id: 'thing1', value: 'Abc Thing 1' },
        { id: 'thing1a', value: 'Bde Thing 2' },
        { id: 'thing1b', value: 'Bef Thing 3' },
        { id: 'thing4', value: 'Efg Thing 4' },
        { id: 'athing1', value: 'Abc Thing 1' },
        { id: 'athing1a', value: 'Bde Thing 2' },
        { id: 'athing1b', value: 'Bef Thing 3' },
        { id: 'athing4', value: 'Efg Thing 4' },
    ];
    return html`
        <sp-field-label size=${size} for="combobox-1">Things</sp-field-label>
        <sp-combobox
            id="combobox-1"
            .options=${options}
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
