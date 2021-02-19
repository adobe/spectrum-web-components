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

import { fixture, elementUpdated, expect, html } from '@open-wc/testing';

import '../sp-split-view.js';
import { SplitView } from '..';
import {
    arrowDownEvent,
    arrowLeftEvent,
    arrowRightEvent,
    arrowUpEvent,
    endEvent,
    homeEvent,
    pageDownEvent,
    pageUpEvent,
    shiftTabEvent,
} from '../../../test/testing-helpers.js';
import { spy } from 'sinon';

describe('SplitView', () => {
    it('loads default (horizontal) split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view primary-size="100">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        await expect(el).to.be.accessible();
        expect(el.splitterPos || 0).to.equal(100);
        expect(el.resizable).to.be.false;
        expect(el.collapsible).to.be.false;
        const gripper = el.shadowRoot.querySelector(
            '#gripper'
        ) as HTMLDivElement;
        // expect(gripper).not.to.be.accessible();
        expect(gripper).to.be.null;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        expect(getComputedStyle(splitter).cursor).to.equal('auto');
    });

    it('loads horizontal [resizable] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view resizable primary-size="100px">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        await expect(el).to.be.accessible();
        expect(el.splitterPos || 0).to.equal(100);

        const gripper = el.shadowRoot.querySelector(
            '#gripper'
        ) as HTMLDivElement;
        expect(gripper).to.be.accessible();
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        expect(getComputedStyle(splitter).cursor).to.equal('ew-resize');
    });

    it('loads [vertical] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    primary-size="75%"
                    style="height: 400px"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        await expect(el).to.be.accessible();
        expect(el.splitterPos || 0).to.equal(300);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        expect(getComputedStyle(splitter).cursor).to.equal('auto');
    });

    it('loads [vertical] [resizable] split-view accessibly', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view vertical resizable style="height: 400px">
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        await expect(el).to.be.accessible();
        expect(el.splitterPos || 0).to.equal(200);

        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        expect(getComputedStyle(splitter).cursor).to.equal('ns-resize');
    });

    it('set all panel values', async () => {
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    primary-max="300"
                    secondary-min="50"
                    style=${`height: 500px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        expect(el.resizable).to.be.true;
        expect(el.primaryMin).to.equal(50);
        expect(el.primaryMax).to.equal(300);
        expect(el.secondaryMin).to.equal(50);
        expect(el.secondaryMax).to.equal(3840);
        expect(el.minPos).to.equal(
            Math.max(el.primaryMin, splitTotalWidth - el.secondaryMax)
        );
        expect(el.maxPos).to.equal(
            Math.min(
                el.primaryMax,
                Math.min(
                    splitTotalWidth - el.secondaryMin,
                    splitTotalWidth - el.splitterSize
                )
            )
        );
    });

    it('use auto height in primary pane', async () => {
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-size="auto"
                    style=${`height: 500px; width: ${splitTotalWidth}px;`}
                >
                    <div>
                        First panel Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                    </div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        expect(el.resizable).to.be.true;
        expect(el.primarySize).to.equal('auto');
        expect(el.splitterPos || 0).to.equal(398);
    });

    it('resizes when pointer moves and resizable is enabled [ltr]', async () => {
        let pointerId = -1;
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        let pos = el.splitterPos || 0;
        expect(el.splitterPos || 0).to.equal(200);

        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        pos -= 10;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        expect(Math.round(el.splitterPos || 0)).to.equal(
            pos - el.getBoundingClientRect().left
        );

        // don't collapse to start
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(el.primaryMin);
        expect(getComputedStyle(splitter).cursor).to.equal('e-resize');

        // don't collapse to end
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: splitTotalWidth,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.secondaryMin);
        expect(getComputedStyle(splitter).cursor).to.equal('w-resize');

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        // don't change anything when triggering mouseevent with right button click
        splitter.dispatchEvent(new MouseEvent('pointerdown', { button: 2 }));
        await elementUpdated(el);
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.secondaryMin);
    });

    it('resizes when pointer moves and resizable is enabled [rtl]', async () => {
        let pointerId = -1;
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="40"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                    dir="rtl"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);

        let pos = el.splitterPos || 0;
        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        pos = el.getBoundingClientRect().right - 100;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        expect(Math.round(el.splitterPos || 0)).to.equal(
            el.getBoundingClientRect().right - pos
        );

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 0,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.secondaryMin);
        expect(getComputedStyle(splitter).cursor).to.equal('e-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().right,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(el.primaryMin);
        expect(getComputedStyle(splitter).cursor).to.equal('w-resize');
    });

    it('resizes to start pos when pointer moves in horizontal splitview', async () => {
        let pointerId = -1;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    secondary-min="50"
                    style="height: 200px; width: 400px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: -10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedStart).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('e-resize');
    });

    it('resizes to end pos when pointer moves in horizontal splitview', async () => {
        let pointerId = -1;
        const splitTotalWidth = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        expect(el.primaryMin).to.equal(50);
        expect(el.resizable).to.be.true;

        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: splitTotalWidth + 10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedEnd).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('w-resize');
    });

    it('resizes to start pos when pointer moves in [vertical] splitview', async () => {
        let pointerId = -1;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    primary-min="0"
                    secondary-min="50"
                    style="height: 400px; width: 200px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: 0,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedStart).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('s-resize');
    });

    it('resizes to end pos when pointer moves in [vertical] splitview', async () => {
        let pointerId = -1;
        const splitTotalHeight = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    primary-min="50"
                    style=${`height: ${splitTotalHeight}px; width: 200px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        expect(el.primaryMin).to.equal(50);
        expect(el.resizable).to.be.true;

        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: splitTotalHeight + 10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(
            splitTotalHeight - el.splitterSize
        );

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedEnd).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('n-resize');
    });

    it('resizes and collapses when pointer moves in horizontal splitview', async () => {
        let pointerId = -1;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style="height: 200px; width: 400px;"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.collapsible).to.be.true;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: 40,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(50);
        expect(el.isCollapsedStart).to.be.false;
        expect(getComputedStyle(splitter).cursor).to.equal('ew-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: -10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        expect(el.isCollapsedStart).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('e-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().right - 10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(350);
        expect(el.isCollapsedEnd).to.be.false;
        expect(getComputedStyle(splitter).cursor).to.equal('ew-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: el.getBoundingClientRect().right,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(400 - el.splitterSize);

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedEnd).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('w-resize');
    });

    it('resizes and collapses when pointer moves in [vertical] splitview', async () => {
        let pointerId = -1;
        const splitTotalHeight = 400;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: ${splitTotalHeight}px; width: 200px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: 40,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(50);
        expect(el.isCollapsedStart).to.be.false;
        expect(getComputedStyle(splitter).cursor).to.equal('ns-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: -10,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        expect(el.isCollapsedStart).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('s-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: splitTotalHeight - 40,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalHeight - 50);
        expect(el.isCollapsedEnd).to.be.false;
        expect(getComputedStyle(splitter).cursor).to.equal('ns-resize');

        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientY: splitTotalHeight + 50,
            })
        );
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(
            splitTotalHeight - el.splitterSize
        );

        splitter.dispatchEvent(new PointerEvent('pointerup'));
        await elementUpdated(el);
        expect(el.isCollapsedEnd).to.be.true;
        expect(getComputedStyle(splitter).cursor).to.equal('n-resize');
    });

    it('handles focus and keyboard inputs and resizes accordingly for horizontal splitviews [ltr]', async () => {
        const splitTotalWidth = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;

        const pos = el.splitterPos || 0;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;

        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos - 10);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos + 10);

        splitter.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(pageUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos + 50);

        splitter.dispatchEvent(pageDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(50);

        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(50);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - 50);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - 50);

        splitter.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);
        const outsideFocused = document.activeElement as HTMLElement;
        expect(typeof outsideFocused).not.to.equal(splitter);
    });

    it('handles focus and keyboard inputs and resizes accordingly for horizontal splitviews [rtl]', async () => {
        const splitTotalWidth = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                    dir="rtl"
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;

        const pos = el.splitterPos || 0;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;

        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos + 10);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos + 10);

        splitter.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(pageUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos + 50);

        splitter.dispatchEvent(pageDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);

        splitter.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);
        const outsideFocused = document.activeElement as HTMLElement;
        expect(typeof outsideFocused).not.to.equal(splitter);
    });

    it('handles keyboard inputs and resizes accordingly for [vertical] splitviews', async () => {
        const splitTotalHeight = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    vertical
                    resizable
                    style=${`width: 200px; height: ${splitTotalHeight}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        expect(el.resizable).to.be.true;

        const pos = el.splitterPos || 0;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;

        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos - 10);

        splitter.dispatchEvent(arrowRightEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(arrowUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos - 10);

        splitter.dispatchEvent(arrowDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(pageUpEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos - 50);

        splitter.dispatchEvent(pageDownEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(
            splitTotalHeight - el.splitterSize
        );

        splitter.dispatchEvent(shiftTabEvent);
        await elementUpdated(el);
        const outsideFocused = document.activeElement as HTMLElement;
        expect(typeof outsideFocused).not.to.equal(splitter);
    });

    it('handles focus and keyboard inputs and resizes accordingly for collapsible horizontal splitviews', async () => {
        const splitTotalWidth = 500;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    collapsible
                    primary-min="50"
                    secondary-min="50"
                    style=${`height: 200px; width: ${splitTotalWidth}px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;

        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;

        splitter.dispatchEvent(homeEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(0);

        splitter.dispatchEvent(endEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(splitTotalWidth - el.splitterSize);
    });

    it('does not resize when not resizable', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view>
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        expect(el.resizable).to.be.false;

        const pos = el.splitterPos || 0;
        const splitter = el.shadowRoot
            ? (el.shadowRoot.querySelector('#splitter') as HTMLDivElement)
            : (el as SplitView);
        splitter.dispatchEvent(new PointerEvent('pointerdown'));
        await elementUpdated(el);
        //Send keyboard events to resize
        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos);
    });

    it('renders no splitter if only one panel is provided', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view style="width: 400px">
                    <div id="primary" style="width: 200px">First panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.false;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        expect(splitter).to.be.null;

        const slot = el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        expect(slot).to.exist;

        expect(slot.assignedElements().length).to.equal(1);

        const elPrim = slot.assignedElements()[0] as HTMLDivElement;
        expect(getComputedStyle(elPrim).width).to.equal('200px');
    });

    it('renders only 2 out of 3 panels', async () => {
        const el = await fixture<SplitView>(
            html`
                <sp-split-view>
                    <div>First panel</div>
                    <div>Second panel</div>
                    <div id="testPanel">Third (invisible) panel</div>
                </sp-split-view>
            `
        );
        await elementUpdated(el);
        const testPanel = el.shadowRoot.querySelector(
            '#testPanel'
        ) as HTMLDivElement;
        expect(testPanel).to.be.null;
    });

    it('keeps the splitter pos when removing and re-adding a panel', async () => {
        let pointerId = -1;
        const el = await fixture<SplitView>(
            html`
                <sp-split-view resizable style="width: 400px">
                    <div id="primary">First panel</div>
                    <div id="secondary">Second panel</div>
                </sp-split-view>
            `
        );

        await elementUpdated(el);
        expect(el.resizable).to.be.true;
        let splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;
        splitter.setPointerCapture = (id: number) => (pointerId = id);
        splitter.releasePointerCapture = (id: number) => (pointerId = id);
        let pos = el.splitterPos || 0;
        expect(pos).to.equal(200);

        splitter.dispatchEvent(
            new PointerEvent('pointerdown', { pointerId: 1 })
        );
        await elementUpdated(el);
        expect(pointerId).to.equal(1);

        pos -= 10;
        el.dispatchEvent(
            new PointerEvent('pointermove', {
                clientX: pos,
            })
        );
        await elementUpdated(el);
        expect(Math.round(el.splitterPos || 0)).to.equal(
            pos - el.getBoundingClientRect().left
        );

        // Remove second panel
        const secPanel = el.lastElementChild?.cloneNode(true);
        expect(secPanel).not.to.be.null;

        el.lastElementChild?.remove();
        await elementUpdated(el);
        let slot = el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        expect(slot).to.exist;
        expect(slot.assignedElements().length).to.equal(1);

        splitter = el.shadowRoot.querySelector('#splitter') as HTMLDivElement;
        expect(splitter).to.be.null;

        if (secPanel) {
            // Re-add second panel
            el.appendChild(secPanel);
            await elementUpdated(el);
            expect(Math.round(el.splitterPos || 0)).to.equal(
                pos - el.getBoundingClientRect().left
            );
            slot = el.shadowRoot.querySelector('slot') as HTMLSlotElement;
            expect(slot).to.exist;

            expect(slot.assignedElements().length).to.equal(2);

            splitter = el.shadowRoot.querySelector(
                '#splitter'
            ) as HTMLDivElement;
            expect(splitter).to.be.accessible;
        }
    });

    it('announces when splitterPos moves', async () => {
        const changeSpy = spy();
        const el = await fixture<SplitView>(
            html`
                <sp-split-view
                    resizable
                    style=${`height: 200px; width: 500px;`}
                >
                    <div>First panel</div>
                    <div>Second panel</div>
                </sp-split-view>
            `
        );
        el.addEventListener('change', changeSpy);
        await elementUpdated(el);
        expect(el.resizable).to.be.true;

        const pos = el.splitterPos || 0;
        const splitter = el.shadowRoot.querySelector(
            '#splitter'
        ) as HTMLDivElement;

        splitter.dispatchEvent(arrowLeftEvent);
        await elementUpdated(el);
        expect(el.splitterPos || 0).to.equal(pos - 10);
        expect(changeSpy.callCount).to.equal(1);
    });
});
