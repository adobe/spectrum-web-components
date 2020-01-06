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
import { html, select, boolean, text } from '@open-wc/demoing-storybook';
import { TemplateResult } from 'lit-html';

import '../';
import { toastVariants } from '../';

const toast = ({
    variant = '',
    disappearing = false,
    open = true,
    content = '',
}): TemplateResult => html`
    <sp-toast variant=${variant} ?disappearing=${disappearing} ?open=${open}>
        ${content}
        <sp-button slot="action" variant="overBackground" quiet>Undo</sp-button>
    </sp-toast>
`;

export default {
    component: 'sp-toast',
    title: 'Toast',
};

export const Default = (): TemplateResult => {
    const content = text('Content', 'This is a toast message.', 'Component');
    const variants = ['', ...toastVariants];
    const variant = select('Variant', variants, variants[0], 'Component');
    const disappearing = boolean('Disappearing', false, 'Component');
    const open = boolean('Open', true, 'Component');
    return toast({ variant, disappearing, open, content });
};

const variantDemo = (variant): TemplateResult => {
    const content = text('Content', 'This is a toast message.', 'Component');
    const disappearing = boolean('Disappearing', false, 'Component');
    const open = boolean('Open', true, 'Component');
    return toast({ variant, disappearing, open, content });
};

export const Positive = (): TemplateResult => variantDemo('positive');

export const Negative = (): TemplateResult => variantDemo('negative');

export const Info = (): TemplateResult => variantDemo('info');
