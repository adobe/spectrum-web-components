/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import { expect, nextFrame } from '@open-wc/testing';

async function usedHeapMB(): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.gc();
    await nextFrame();
    await nextFrame();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return performance.memory.usedJSHeapSize / (1024 * 1024);
}

async function isUsedHeapContained(dom: string): Promise<boolean> {
    const iterations = 100;
    let active = false;

    const el = document.createElement('div');
    document.body.append(el);

    async function toggle(
        forced: boolean | undefined = undefined
    ): Promise<void> {
        active = forced != null ? forced : !active;
        el.innerHTML = active ? dom : '';
        await nextFrame();
        await nextFrame();
    }

    // "shake things out" to get a good first reading
    for (let i = 0; i < 5; i++) {
        await toggle();
    }
    await toggle(false);
    const beforeMB = await usedHeapMB();

    for (let i = 0; i < iterations; i++) {
        await toggle();
    }
    await toggle(false);
    await nextFrame();
    await nextFrame();
    const afterMB = await usedHeapMB();
    el.remove();
    // Tests are allowed to gain 10% of their initially used heap and still be "contained".
    return afterMB - beforeMB < beforeMB * 0.1;
}

describe('Menu', () => {
    describe('memory leak (#3164)', () => {
        it('Menu releases references when added/removed', async function () {
            if (!window.gc || !('memory' in performance)) this.skip();

            this.timeout(10000);

            expect(
                await isUsedHeapContained(`
                <sp-menu>
                    <sp-menu-item value="item-1">
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item value="item-2">
                        Select inverse
                    </sp-menu-item>
                    <sp-menu-item value="item-3">
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">
                        Save selection
                    </sp-menu-item>
                    <sp-menu-item value="item-6" disabled>
                        Make work path
                    </sp-menu-item>
                    <sp-menu-item value="item-1">
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item value="item-2">
                        Select inverse
                    </sp-menu-item>
                    <sp-menu-item value="item-3">
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">
                        Save selection
                    </sp-menu-item>
                    <sp-menu-item value="item-6" disabled>
                        Make work path
                    </sp-menu-item>
                    <sp-menu-item value="item-1">
                        Deselect
                    </sp-menu-item>
                    <sp-menu-item value="item-2">
                        Select inverse
                    </sp-menu-item>
                    <sp-menu-item value="item-3">
                        Feather...
                    </sp-menu-item>
                    <sp-menu-item value="item-4">
                        Select and mask...
                    </sp-menu-item>
                    <sp-menu-item value="item-5">
                        Save selection
                    </sp-menu-item>
                    <sp-menu-item value="item-6" disabled>
                        Make work path
                    </sp-menu-item>
                </sp-menu>
            `)
            ).to.be.true;
        });
        it('Menu Group releases references when added/removed', async function () {
            if (!window.gc || !('memory' in performance)) this.skip();

            this.timeout(10000);

            expect(
                await isUsedHeapContained(`
                <sp-menu selects="multiple">
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Action 1</sp-menu-item>
                        <sp-menu-item>Action 2</sp-menu-item>
                        <sp-menu-item>Action 3</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Save</sp-menu-item>
                        <sp-menu-item disabled>Download</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Action 1</sp-menu-item>
                        <sp-menu-item>Action 2</sp-menu-item>
                        <sp-menu-item>Action 3</sp-menu-item>
                    </sp-menu-group>
                    <sp-menu-divider></sp-menu-divider>
                    <sp-menu-group selects="inherit">
                        <span slot="header">Section Heading</span>
                        <sp-menu-item>Save</sp-menu-item>
                        <sp-menu-item disabled>Download</sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            `)
            ).to.be.true;
        });
    });
});
