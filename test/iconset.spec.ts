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

import { fixture, nextFrame } from '@open-wc/testing';
import { Icon } from '../lib/icon';
import { defineCustomElements } from '../lib/define';
import * as MediumIcons from '../lib/icons/icons-medium';
import { html } from 'lit-element';
import { chai } from '@bundled-es-modules/chai';
const expect = chai.expect;

defineCustomElements(...Object.values(MediumIcons));

describe('Iconset', () => {
    after(() => {
        const sets = [...document.querySelectorAll('sp-icons-medium')];
        sets.map((set) => set.remove());
    });

    it('renders after adding and removing a second iconset', async () => {
        let icons = document.createElement('sp-icons-medium');
        document.body.append(icons);

        let icons2 = document.createElement('sp-icons-medium');
        document.body.append(icons2);

        icons2.remove();

        await nextFrame();

        const el = await fixture<Icon>(
            html`
                <sp-icon size="xxs" name="ui:CheckmarkMedium"></sp-icon>
            `
        );

        await nextFrame();

        const svg = el.shadowRoot!.querySelector('[role="img"]');
        expect(svg).to.not.be.null;
    });

    it('can be after `<sp-icon/>` in the DOM order', async () => {
        const el = await fixture<Icon>(
            html`
                <div>
                    <sp-icon size="xxs" name="ui:CheckmarkMedium"></sp-icon>
                    <sp-icons-medium></sp-icons-medium>
                </div>
            `
        );

        const icon = el.querySelector('sp-icon');
        const svg = icon!.shadowRoot!.querySelector('[role="img"]');
        expect(svg).to.not.be.null;
    });
});

describe('Iconset order', () => {});
