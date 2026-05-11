/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
import { elementUpdated, expect, fixture, html } from '@open-wc/testing';

import { Dropzone } from '@spectrum-web-components/dropzone';

import '@spectrum-web-components/dropzone/sp-dropzone.js';

import { waitForPredicate } from '../../../test/testing-helpers.js';
import { illustration } from './test-svg.js';

describe('Dropzone', () => {
  it('loads', async () => {
    const el = await fixture<Dropzone>(html`
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
            <input type="file" id="file-input" style="display: none" />
          </div>
          <div>
            or
            <sp-link href="http://stock.adobe.com" target="_blank">
              Search Adobe Stock
            </sp-link>
          </div>
        </div>
      </sp-dropzone>
    `);
    expect(el).to.not.equal(undefined);
    if (!el.shadowRoot) {
      throw new Error('No shadowRoot');
    }
    const slot = el.shadowRoot.querySelector('slot') as HTMLSlotElement;
    expect(slot).to.not.equal(undefined);
    return true;
  });
  it('manages `dropEffects`', async () => {
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(el.dropEffect).to.equal('copy');

    el.dropEffect = 'move';

    await elementUpdated(el);

    expect(el.dropEffect).to.equal('move');
  });
  it('manages `dragover` events', async () => {
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(el.isDragged).to.be.false;

    el.dispatchEvent(new DragEvent('dragover'));

    expect(el.isDragged).to.be.false;

    let dataTransfer: DataTransfer | boolean = false;

    /**
     * @todo Another try/catch weird pattern here...
     */
    try {
      // Safari doesn't like this...
      dataTransfer = new DataTransfer();
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {}
    if (dataTransfer) {
      const dragOverEvent = new DragEvent('dragover', {
        dataTransfer,
      });

      el.dispatchEvent(dragOverEvent);

      expect(el.isDragged).to.be.true;
      // We should be able to make the following test here:
      // expect(dataTransfer.dropEffect).to.equal(el.dropEffect);
      // However, Chrome doesn't like it in the context of a test...
    }
  });
  it('allows `dragover` events to be canceled', async () => {
    const canceledDrag = (event: DragEvent): void => {
      event.preventDefault();
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${canceledDrag}
      ></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(el.isDragged).to.be.false;

    let dataTransfer: DataTransfer | boolean = false;

    /**
     * @todo Another try/catch weird pattern here...
     */
    try {
      // Safari doesn't like this...
      dataTransfer = new DataTransfer();
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {}
    if (dataTransfer) {
      const dragOverEvent = new DragEvent('dragover', {
        dataTransfer,
      });

      el.dispatchEvent(dragOverEvent);

      expect(el.isDragged).to.be.false;
      expect(dataTransfer.dropEffect).to.not.equal(el.dropEffect);
      expect(dataTransfer.dropEffect).to.equal('none');
    }
  });
  it('always prevents default on `dragover` for cross-platform drop support', async () => {
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone"></sp-dropzone>
    `);

    await elementUpdated(el);

    const dragOverWithoutTransfer = new DragEvent('dragover', {
      cancelable: true,
    });
    el.dispatchEvent(dragOverWithoutTransfer);

    expect(
      dragOverWithoutTransfer.defaultPrevented,
      'dragover is prevented even without dataTransfer'
    ).to.be.true;

    let dataTransfer: DataTransfer | boolean = false;
    try {
      dataTransfer = new DataTransfer();
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {}
    if (dataTransfer) {
      const dragOverWithTransfer = new DragEvent('dragover', {
        cancelable: true,
        dataTransfer,
      });
      el.dispatchEvent(dragOverWithTransfer);

      expect(
        dragOverWithTransfer.defaultPrevented,
        'dragover is prevented with dataTransfer'
      ).to.be.true;
    }
  });
  it('prevents default on `dragover` even when `should-accept` is canceled', async () => {
    const rejectDrag = (event: Event): void => {
      event.preventDefault();
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${rejectDrag}
      ></sp-dropzone>
    `);

    await elementUpdated(el);

    let dataTransfer: DataTransfer | boolean = false;
    try {
      dataTransfer = new DataTransfer();
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {}
    if (dataTransfer) {
      const dragOverEvent = new DragEvent('dragover', {
        cancelable: true,
        dataTransfer,
      });
      el.dispatchEvent(dragOverEvent);

      expect(
        dragOverEvent.defaultPrevented,
        'dragover is still prevented so the browser allows the drop gesture'
      ).to.be.true;
      expect(dataTransfer.dropEffect).to.equal('none');
    }
  });
  it('manages `dragleave` events via debounce', async () => {
    let dragLeftCount = 0;
    const onDragLeave = (): void => {
      dragLeftCount += 1;
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-dragleave=${onDragLeave}
      ></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(dragLeftCount).to.equal(0);

    el.dispatchEvent(new DragEvent('dragleave'));
    el.dispatchEvent(new DragEvent('dragleave'));

    await waitForPredicate(() => dragLeftCount === 1);

    expect(dragLeftCount).to.equal(1);
  });
  it('ignores `dragleave` when moving between children', async () => {
    let dragLeftCount = 0;
    const onDragLeave = (): void => {
      dragLeftCount += 1;
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone" @sp-dropzone-dragleave=${onDragLeave}>
        <div id="child-a">A</div>
        <div id="child-b">B</div>
      </sp-dropzone>
    `);

    await elementUpdated(el);

    el.isDragged = true;

    const childB = el.querySelector('#child-b') as HTMLElement;
    const internalLeave = new DragEvent('dragleave', {
      bubbles: true,
      relatedTarget: childB,
    });
    el.dispatchEvent(internalLeave);

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(
      dragLeftCount,
      'dragleave is suppressed when relatedTarget is an internal child'
    ).to.equal(0);
    expect(el.isDragged).to.be.true;
  });
  it('fires `sp-dropzone-drop` on drop', async () => {
    let dropped = false;
    const onDrop = (): void => {
      dropped = true;
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone" @sp-dropzone-drop=${onDrop}></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(dropped).to.be.false;

    el.isDragged = true;
    el.dispatchEvent(new DragEvent('drop'));

    expect(dropped).to.be.true;
  });
  it('does not fire `sp-dropzone-drop` when `should-accept` is cancelled', async () => {
    let dropped = false;
    const rejectDrag = (event: Event): void => {
      event.preventDefault();
    };
    const onDrop = (): void => {
      dropped = true;
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-should-accept=${rejectDrag}
        @sp-dropzone-drop=${onDrop}
      ></sp-dropzone>
    `);

    await elementUpdated(el);

    let dataTransfer: DataTransfer | boolean = false;
    try {
      dataTransfer = new DataTransfer();
      // eslint-disable-next-line no-empty, @typescript-eslint/no-unused-vars
    } catch (error) {}
    if (dataTransfer) {
      el.dispatchEvent(new DragEvent('dragover', { dataTransfer }));
      expect(el.isDragged).to.be.false;

      el.dispatchEvent(new DragEvent('drop'));
      expect(dropped, 'sp-dropzone-drop should not fire for rejected drags').to
        .be.false;
    }
  });
  it('clears pending dragleave timeout on disconnect', async () => {
    let dragLeftCount = 0;
    const onDragLeave = (): void => {
      dragLeftCount += 1;
    };
    const el = await fixture<Dropzone>(html`
      <sp-dropzone
        id="dropzone"
        @sp-dropzone-dragleave=${onDragLeave}
      ></sp-dropzone>
    `);

    await elementUpdated(el);

    el.dispatchEvent(new DragEvent('dragleave'));
    el.remove();

    await new Promise((resolve) => setTimeout(resolve, 150));

    expect(
      dragLeftCount,
      'dragleave callback does not fire after disconnect'
    ).to.equal(0);
  });
  it('sets `filled` attribute', async () => {
    const el = await fixture<Dropzone>(html`
      <sp-dropzone id="dropzone" filled></sp-dropzone>
    `);

    await elementUpdated(el);

    expect(el.isFilled).to.be.true;
    expect(el.hasAttribute('filled')).to.be.true;
  });
});
