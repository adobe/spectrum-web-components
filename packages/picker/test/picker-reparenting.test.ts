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

import '@spectrum-web-components/picker/sp-picker.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import { Picker } from '@spectrum-web-components/picker';
import { MenuItem } from '@spectrum-web-components/menu';
import { expect, fixture, html, nextFrame, oneEvent } from '@open-wc/testing';

import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/themes.js';

const fixtureElements = async (): Promise<{
    picker: Picker;
    before: HTMLDivElement;
    after: HTMLDivElement;
}> => {
    const test = await fixture(html`
        <sp-theme color="light" scale="medium">
            <div id="before">
                <sp-picker
                    id="picker"
                    label="I would like to use Spectrum Web Components"
                >
                    <sp-menu-item value="0">Immediately</sp-menu-item>
                    <sp-menu-item value="1">
                        I'm already using them
                    </sp-menu-item>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-item value="2">Soon</sp-menu-item>
                    <sp-menu-item value="3">
                        As part of my next project
                    </sp-menu-item>
                    <sp-menu-item value="4">In the future</sp-menu-item>
                </sp-picker>
            </div>
            <div id="after"></div>
        </sp-theme>
    `);
    const picker = test.querySelector('sp-picker') as Picker;
    return {
        picker,
        before: test.querySelector('#before') as HTMLDivElement,
        after: test.querySelector('#after') as HTMLDivElement,
    };
};

describe('Reparented Picker', () => {
    it('maintains a `dir` attribute', async () => {
        const { picker, before, after } = await fixtureElements();

        expect(picker.dir).to.equal('ltr');
        expect(picker.getAttribute('dir')).to.equal('ltr');

        after.append(picker);
        await nextFrame();

        expect(picker.dir).to.equal('ltr');
        expect(picker.getAttribute('dir')).to.equal('ltr');

        before.append(picker);
        await nextFrame();

        expect(picker.dir).to.equal('ltr');
        expect(picker.getAttribute('dir')).to.equal('ltr');
    });
    it('maintains `value`', async () => {
        const { picker, before, after } = await fixtureElements();

        expect(picker.value).to.equal('');

        const item2 = picker.querySelector('[value="2"]') as MenuItem;
        const item3 = picker.querySelector('[value="3"]') as MenuItem;
        let opened = oneEvent(picker, 'sp-opened');
        picker.click();
        await opened;
        expect(picker.open).to.be.true;
        expect(picker.value).to.equal('');
        let closed = oneEvent(picker, 'sp-closed');
        item2.click();
        await closed;

        expect(picker.value).to.equal('2');
        expect(picker.open).to.be.false;

        after.append(picker);
        opened = oneEvent(picker, 'sp-opened');
        picker.click();
        await opened;
        expect(picker.open).to.be.true;
        expect(picker.value).to.equal('2');
        closed = oneEvent(picker, 'sp-closed');
        item3.click();
        await closed;

        expect(picker.value).to.equal('3');
        expect(picker.open).to.be.false;

        opened = oneEvent(picker, 'sp-opened');
        picker.click();
        await opened;
        expect(picker.open).to.be.true;
        expect(picker.value).to.equal('3');
        closed = oneEvent(picker, 'sp-closed');
        before.append(picker);
        await closed;

        expect(picker.optionsMenu.value).to.equal('3');
        expect(picker.value).to.equal('3');
    });
});
