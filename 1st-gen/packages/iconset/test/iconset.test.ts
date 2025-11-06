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

import { waitForPredicate } from '../../../test/testing-helpers.js';
import '@spectrum-web-components/icons/sp-icons-medium.js';
import '@spectrum-web-components/icon/sp-icon.js';
import { IconsMedium } from '@spectrum-web-components/icons';
import { Icon } from '@spectrum-web-components/icon';
import { IconsetRegistry } from '@spectrum-web-components/iconset/src/iconset-registry.js';
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { stub } from 'sinon';

describe('Iconset', () => {
    after(() => {
        const sets = [...document.querySelectorAll('sp-icons-medium')];
        sets.map((set) => set.remove());
    });
    it('warns in Dev Mode of deprecation', async () => {
        const consoleWarnStub = stub(console, 'warn');
        const el = document.createElement('sp-icons-medium');
        document.body.append(el);

        await elementUpdated(el);

        expect(consoleWarnStub.called).to.be.true;
        const spyCall = consoleWarnStub.getCall(0);
        expect(
            spyCall.args.at(0).includes('deprecated'),
            'confirm deprecation message'
        ).to.be.true;
        expect(spyCall.args.at(-1), 'confirm `data` shape').to.deep.equal({
            data: {
                localName: 'sp-icons-medium',
                type: 'api',
                level: 'deprecation',
            },
        });
        consoleWarnStub.restore();
    });

    it('will re-register with new name', async () => {
        const icons = document.createElement('sp-icons-medium');
        document.body.append(icons);
        icons.name = 'first-name';

        const registry = IconsetRegistry.getInstance();

        expect(registry.getIconset('first-name')).to.not.be.undefined;
        expect(registry.getIconset('')).to.be.undefined;
        expect(registry.getIconset('second-name')).to.be.undefined;
        expect(registry.getIconset('ui')).to.be.undefined;

        icons.name = '';

        expect(registry.getIconset('first-name')).to.be.undefined;
        expect(registry.getIconset('')).to.be.undefined;
        expect(registry.getIconset('second-name')).to.be.undefined;
        expect(registry.getIconset('ui')).to.be.undefined;

        icons.name = 'second-name';

        expect(registry.getIconset('first-name')).to.be.undefined;
        expect(registry.getIconset('')).to.be.undefined;
        expect(registry.getIconset('second-name')).to.not.be.undefined;
        expect(registry.getIconset('ui')).to.be.undefined;
    });
    it('will not re-register on (dis)connect without a name', async () => {
        const icons = document.createElement('sp-icons-medium');
        document.body.append(icons);

        const registry = IconsetRegistry.getInstance();

        expect(registry.getIconset('ui')).to.not.be.undefined;

        icons.name = '';

        expect(registry.getIconset('ui')).to.be.undefined;

        icons.remove();

        document.body.append(icons);

        expect(registry.getIconset('ui')).to.be.undefined;
    });
    it('renders after adding and removing a second iconset of same name', async () => {
        const icons = document.createElement('sp-icons-medium');
        document.body.append(icons);

        const icons2 = document.createElement('sp-icons-medium');
        document.body.append(icons2);

        icons2.remove();

        window.dispatchEvent(
            new CustomEvent('sp-iconset-removed', {
                detail: { name: 'Other Set' },
            })
        );

        const el = await fixture<Icon>(html`
            <sp-icon name="ui:Chevron200"></sp-icon>
        `);

        let svg = el.shadowRoot
            ? el.shadowRoot.querySelector('[role="img"]')
            : null;

        function getSVG(): boolean {
            svg = el.shadowRoot
                ? el.shadowRoot.querySelector('[role="img"]')
                : null;

            return svg !== null;
        }

        await waitForPredicate(getSVG);

        expect(svg).to.not.be.null;
    });

    it('can be after `<sp-icon/>` in the DOM order', async () => {
        const el = await fixture<HTMLDivElement>(html`
            <div>
                <sp-icon name="ui:Chevron200"></sp-icon>
                <sp-icons-medium></sp-icons-medium>
            </div>
        `);

        const icon = el.querySelector('sp-icon') as Icon;
        const iconSet = el.querySelector('sp-icons-medium') as IconsMedium;

        await elementUpdated(iconSet);
        await elementUpdated(icon);

        const svg = icon.shadowRoot
            ? icon.shadowRoot.querySelector('[role="img"]')
            : null;
        expect(svg).to.not.be.null;
    });
});
