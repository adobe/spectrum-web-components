/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { fixture, nextFrame, elementUpdated } from '@open-wc/testing-helpers';
import { Icon } from '../src/icon';
import { defineCustomElements } from '../src/define';
import * as MediumIcons from '../src/icons/icons-medium';
import { html } from 'lit-element';

defineCustomElements(...Object.values(MediumIcons));

describe('Iconset', () => {
    before(() => {
        let icons = document.createElement('sp-icons-medium');
        document.body.append(icons);
    });

    it('renders after adding and removing a second iconset', async () => {
        let icons2 = document.createElement('sp-icons-medium');
        document.body.append(icons2);

        icons2.remove();

        await nextFrame();

        const el = await fixture<Icon>(
            html`
                <sp-icon size="xxs" name="ui:CheckmarkMedium"></sp-icon>
            `
        );

        await elementUpdated(el);

        const svg = el.shadowRoot!.querySelector('[role="img"]');
        expect(svg).to.not.be.null;
    });
});
