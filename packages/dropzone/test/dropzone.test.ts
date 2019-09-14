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
import '../';
import { Dropzone } from '../';
import { illustration } from './test-svg';
import { fixture, html, expect, elementUpdated } from '@open-wc/testing';
import { waitForPredicate } from '../../../test/testing-helpers';

describe('Dropzone', () => {
    it('loads', async () => {
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone id="dropzone">
                    <sp-illustrated-message heading="Drag and Drop Your File">
                        ${illustration}
                    </sp-illustrated-message>

                    <div style="color: grey">
                        <div>
                            <label for="file-input">
                                <sp-link>Select a File</sp-link>
                                from your computer
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                style="display: none"
                            />
                        </div>
                        <div>
                            or
                            <sp-link
                                href="http://stock.adobe.com"
                                target="blank"
                            >
                                Search Adobe Stock
                            </sp-link>
                        </div>
                    </div>
                </sp-dropzone>
            `
        );
        expect(el).to.not.equal(undefined);
        if (!el.shadowRoot) throw new Error('No shadowRoot');
        const slot = el.shadowRoot.querySelector('slot') as HTMLSlotElement;
        expect(slot).to.not.equal(undefined);
        return true;
    });
    it('manages `dropEffects`', async () => {
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone id="dropzone"></sp-dropzone>
            `
        );

        await elementUpdated(el);

        expect(el.dropEffect).to.equal('copy');

        el.dropEffect = 'move';

        await elementUpdated(el);

        expect(el.dropEffect).to.equal('move');
    });
    it('manages `dragover` events', async () => {
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone id="dropzone"></sp-dropzone>
            `
        );

        await elementUpdated(el);

        expect(el.isDragged).to.be.false;

        el.dispatchEvent(new DragEvent('dragover'));

        expect(el.isDragged).to.be.false;

        el.dispatchEvent(
            new DragEvent('dragover', {
                dataTransfer: new DataTransfer(),
            })
        );

        expect(el.isDragged).to.be.true;
    });
    it('allows `dragover` events to be canceled', async () => {
        const canceledDrag = (e: DragEvent): void => e.preventDefault();
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone
                    id="dropzone"
                    @sp-dropzone:should-accept=${canceledDrag}
                ></sp-dropzone>
            `
        );

        await elementUpdated(el);

        expect(el.isDragged).to.be.false;

        el.dispatchEvent(
            new DragEvent('dragover', {
                dataTransfer: new DataTransfer(),
            })
        );

        expect(el.isDragged).to.be.false;
    });
    it('manages `dragleave` events', async () => {
        let dragLeft = false;
        const onDragLeave = (): void => {
            dragLeft = true;
        };
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone
                    id="dropzone"
                    @sp-dropzone:dragleave=${onDragLeave}
                ></sp-dropzone>
            `
        );

        await elementUpdated(el);

        expect(dragLeft).to.be.false;

        el.dispatchEvent(new DragEvent('dragleave'));
        el.dispatchEvent(new DragEvent('dragleave'));

        await waitForPredicate(() => (dragLeft = true));

        expect(dragLeft).to.be.true;
    });

    it('manages `dragleave` events', async () => {
        let dropped = false;
        const onDrop = (): void => {
            dropped = true;
        };
        const el = await fixture<Dropzone>(
            html`
                <sp-dropzone
                    id="dropzone"
                    @sp-dropzone:drop=${onDrop}
                ></sp-dropzone>
            `
        );

        await elementUpdated(el);

        expect(dropped).to.be.false;

        el.dispatchEvent(new DragEvent('drop'));

        expect(dropped).to.be.true;
    });
});
