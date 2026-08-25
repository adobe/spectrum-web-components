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

import { html, LitElement } from 'lit';
import { expect, waitFor } from '@storybook/test';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import { getComponent } from '../../../../swc/utils/test-utils.js';
import { DragAndDropController } from '../index.js';

class DragAndDropTestHost extends LitElement {
  public dragged = false;
  public enters = 0;
  public leaves = 0;
  public drops = 0;

  constructor() {
    super();
    new DragAndDropController(this, {
      isDragged: () => this.dragged,
      onDragEnter: () => {
        this.dragged = true;
        this.enters += 1;
      },
      onDragLeave: () => {
        this.dragged = false;
        this.leaves += 1;
      },
      onDrop: () => {
        this.dragged = false;
        this.drops += 1;
      },
      shouldAccept: (event) =>
        Boolean(
          event.dataTransfer?.types.includes('Files') ||
          event.dataTransfer?.files.length
        ),
    });
  }

  protected override render() {
    return html`
      <div></div>
    `;
  }
}

customElements.define('test-drag-and-drop-host', DragAndDropTestHost);

const makeFileDataTransfer = (): DataTransfer => {
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(
    new File(['hello'], 'hello.txt', { type: 'text/plain' })
  );
  return dataTransfer;
};

const makeDragEvent = (type: string, dataTransfer: DataTransfer): DragEvent =>
  new DragEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    dataTransfer,
  });

const fixture = () => html`
  <test-drag-and-drop-host></test-drag-and-drop-host>
`;

export default {
  title: 'Controllers/Drag and drop controller/Tests',
  parameters: { docs: { disable: true, page: null } },
  tags: ['!autodocs', 'dev'],
} as Meta;

export const AcceptsFileDrags: Story = {
  render: fixture,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DragAndDropTestHost>(
      canvasElement,
      'test-drag-and-drop-host'
    );
    const event = makeDragEvent('dragover', makeFileDataTransfer());

    await step('accepts a file drag once per hover session', () => {
      host.dispatchEvent(event);
      host.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));

      expect(event.defaultPrevented).toBe(true);
      expect(host.dragged).toBe(true);
      expect(host.enters).toBe(1);
    });

    await step('handles a drop and clears the host state', () => {
      host.dispatchEvent(makeDragEvent('drop', makeFileDataTransfer()));

      expect(host.drops).toBe(1);
      expect(host.dragged).toBe(false);
    });
  },
};

export const RejectsUnacceptedDrags: Story = {
  render: fixture,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DragAndDropTestHost>(
      canvasElement,
      'test-drag-and-drop-host'
    );
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', 'not a file');
    const event = makeDragEvent('dragover', dataTransfer);

    await step('rejects a non-file drag with a not-allowed cursor', () => {
      host.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(event.dataTransfer?.dropEffect).toBe('none');
      expect(host.dragged).toBe(false);
      expect(host.enters).toBe(0);
    });
  },
};

export const DebouncesDragLeave: Story = {
  render: fixture,
  play: async ({ canvasElement, step }) => {
    const host = await getComponent<DragAndDropTestHost>(
      canvasElement,
      'test-drag-and-drop-host'
    );
    host.dispatchEvent(makeDragEvent('dragover', makeFileDataTransfer()));

    await step('clears the state after leaving the host', async () => {
      host.dispatchEvent(makeDragEvent('dragleave', makeFileDataTransfer()));

      await waitFor(() => expect(host.leaves).toBe(1));
      expect(host.dragged).toBe(false);
    });
  },
};
