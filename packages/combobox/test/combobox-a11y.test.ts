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

import {
    elementUpdated,
    expect,
    html,
    nextFrame,
    oneEvent,
} from '@open-wc/testing';

import '@spectrum-web-components/combobox/sp-combobox.js';
import { Combobox } from '@spectrum-web-components/combobox';
import { fixture } from '../../../test/testing-helpers.js';
import { findDescribedNode } from '../../../test/testing-helpers-a11y.js';
import {
    a11ySnapshot,
    findAccessibilityNode,
    sendKeys,
} from '@web/test-runner-commands';
import { comboboxFixture, isWebKit } from './helpers.js';
import {
    withFieldLabel,
    withHelpText,
    withTooltip,
} from '../stories/combobox.stories.js';
import { MenuItem } from '@spectrum-web-components/menu';

describe('Combobox accessibility', () => {
    it('renders accessibly with `label` attribute', async () => {
        const el = await comboboxFixture();
        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('renders accessibly with <sp-field-label>', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${withFieldLabel()}</div>
        `);
        const el = test.querySelector('sp-combobox') as unknown as Combobox;

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('renders accessibly with <sp-help-text>', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${withHelpText()}</div>
        `);
        const el = test.querySelector('sp-combobox') as unknown as Combobox;

        await elementUpdated(el);

        await expect(el).to.be.accessible();
    });
    it('manages its "name" value with <sp-field-label>', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${withFieldLabel()}</div>
        `);
        const el = test.querySelector('sp-combobox') as unknown as Combobox;
        const name = 'Pick something';
        const webkitName = 'Pick something Banana';
        type NamedNode = { name: string; role: string; value?: string };

        await elementUpdated(el);

        let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };

        let a11yNode = findAccessibilityNode<NamedNode>(
            snapshot,
            (node) =>
                node.name === name && !node.value && node.role === 'combobox'
        );
        // by default, is there a combobox that has `name` as the label?
        expect(a11yNode, '`name` is the label text').to.not.be.null;

        el.value = 'Banana';
        await elementUpdated(el);

        snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };
        // gating it this way is the only way I could get ALL the tests to pass on all browsers
        if (isWebKit) {
            a11yNode = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.name === webkitName &&
                    node.value === 'Banana' &&
                    node.role === 'combobox'
            );
            expect(a11yNode, '`name` is null on WebKit').to.not.be.null;
        } else {
            a11yNode = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.name === name &&
                    node.value === 'Banana' &&
                    node.role === 'combobox'
            );
            expect(
                a11yNode,
                '`name` is the the selected item text plus the label text'
            ).to.not.be.null;
        }
    });
    it('manages its "name" value in the accessibility tree', async () => {
        const el = await comboboxFixture();

        const name = 'Combobox';
        const webkitName = 'Combobox Banana';
        type NamedNode = { name: string; role: string; value?: string };

        await elementUpdated(el);

        let snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };

        let a11yNode = findAccessibilityNode<NamedNode>(
            snapshot,
            (node) =>
                node.name === name && !node.value && node.role === 'combobox'
        );
        // by default, is there a combobox that has `name` as the label?
        expect(a11yNode, '`name` is the label text').to.not.be.null;

        el.value = 'Banana';
        await elementUpdated(el);

        snapshot = (await a11ySnapshot({})) as unknown as NamedNode & {
            children: NamedNode[];
        };
        // gating it this way is the only way I could get ALL the tests to pass on all browsers
        if (isWebKit) {
            a11yNode = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.name === webkitName &&
                    node.value === 'Banana' &&
                    node.role === 'combobox'
            );
            expect(a11yNode, '`name` is null on WebKit').to.not.be.null;
        } else {
            a11yNode = findAccessibilityNode<NamedNode>(
                snapshot,
                (node) =>
                    node.name === name &&
                    node.value === 'Banana' &&
                    node.role === 'combobox'
            );
            expect(
                a11yNode,
                '`name` is the the selected item text plus the label text'
            ).to.not.be.null;
        }
    });
    it('manages its "description" value with slotted <sp-tooltip>', async () => {
        const test = await fixture<HTMLDivElement>(html`
            <div>${withTooltip()}</div>
        `);
        const el = test.querySelector('sp-combobox') as unknown as Combobox;
        const tooltipText = 'This combobox has a tooltip.';

        await elementUpdated(el);
        await findDescribedNode(el.label, tooltipText);
    });
    it('renders open', async () => {
        const el = await comboboxFixture();

        const opened = oneEvent(el, 'sp-opened');
        el.open = true;
        await opened;

        await elementUpdated(el);
        await expect(el).to.be.accessible();
    });
    it('manages aria-activedescendant', async () => {
        // a11ySnapshot does not track the aria-activedescendant, hence querySelecting
        const el = await comboboxFixture();
        await elementUpdated(el);

        expect(el.activeDescendant).to.be.undefined;

        el.focus();
        await elementUpdated(el);

        await sendKeys({
            press: 'ArrowDown',
        });
        await elementUpdated(el);

        expect(el.activeDescendant).to.not.be.undefined;
        expect(el.activeDescendant.value).to.equal('apple');

        // aria-activedescendant should keep the combobox focused even when navigating the menu
        const activeDescendant = el.shadowRoot.querySelector(
            '#apple'
        ) as MenuItem;

        await elementUpdated(activeDescendant);
        // Menu Item association with a Menu happens outside of the update lifecycle
        await nextFrame();
        await nextFrame();

        expect(activeDescendant.focused).to.be.true;
        expect(el.focused).to.be.true;
        await expect(el).to.be.accessible();
    });
    it('manages aria-selected', async () => {
        const el = await comboboxFixture();

        await elementUpdated(el);

        type SelectedNode = { selected?: boolean };
        let snapshot = (await a11ySnapshot({})) as unknown as SelectedNode & {
            children: SelectedNode[];
        };

        expect(
            findAccessibilityNode<SelectedNode>(
                snapshot,
                (node) => !!node.selected
            )
        ).to.be.null;

        const opened = oneEvent(el, 'sp-opened');
        el.click();
        await opened;
        await elementUpdated(el);
        expect(el.open).to.be.true;

        el.focus();
        await elementUpdated(el);

        await sendKeys({
            press: 'ArrowDown',
        });
        await elementUpdated(el);

        expect(el.activeDescendant.value).to.equal('apple');
        snapshot = (await a11ySnapshot({})) as unknown as SelectedNode & {
            children: SelectedNode[];
        };
        expect(
            findAccessibilityNode<SelectedNode>(
                snapshot,
                (node) => !!node.selected
            ),
            JSON.stringify(snapshot, null, '  ')
        ).to.not.be.null;
    });
    it('manages aria-expanded', async () => {
        const el = await comboboxFixture();

        await elementUpdated(el);

        type ExpandedNode = { expanded?: boolean };
        let snapshot = (await a11ySnapshot({})) as unknown as ExpandedNode & {
            children: ExpandedNode[];
        };

        expect(
            findAccessibilityNode<ExpandedNode>(
                snapshot,
                (node) => !!node.expanded
            )
        ).to.be.null;

        el.click();
        await elementUpdated(el);
        expect(el.open).to.be.true;

        snapshot = (await a11ySnapshot({})) as unknown as ExpandedNode & {
            children: ExpandedNode[];
        };
        expect(
            findAccessibilityNode<ExpandedNode>(
                snapshot,
                (node) => !!node.expanded
            )
        ).to.not.be.null;
    });
    it('loads with list closed', async () => {
        const el = await comboboxFixture();

        await elementUpdated(el);

        expect(el.open).to.be.false;
    });
});
