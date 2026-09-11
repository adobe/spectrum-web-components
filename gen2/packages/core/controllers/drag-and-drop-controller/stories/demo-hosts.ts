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

import { css, html, LitElement, type TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { DragAndDropController } from '../index.js';

declare global {
  interface HTMLElementTagNameMap {
    'demo-drag-and-drop-host': DemoDragAndDropHost;
  }
}

/** @internal Storybook-only host demonstrating the drag-and-drop controller. */
@customElement('demo-drag-and-drop-host')
export class DemoDragAndDropHost extends LitElement {
  static override styles = css`
    :host {
      display: block;
      max-inline-size: 440px;
      font: inherit;
    }

    .dropzone {
      display: grid;
      gap: 8px;
      padding: 24px;
      border: 2px dashed var(--spectrum-gray-500, #909090);
      border-radius: 12px;
      color: var(--spectrum-gray-800, #4b4b4b);
      text-align: center;
    }

    :host([dragged]) .dropzone {
      border-color: var(--spectrum-blue-900, #1473e6);
      background: var(--spectrum-blue-100, #e5f2ff);
    }

    .hint,
    .status {
      color: var(--spectrum-gray-700, #6d6d6d);
      font-size: 14px;
    }

    .payload {
      margin-block-start: 8px;
      color: var(--spectrum-blue-900, #1473e6);
      cursor: grab;
      text-decoration: underline;
    }
  `;

  @property({ type: Boolean, reflect: true })
  public dragged = false;

  @property({ type: Boolean, attribute: 'accept-files' })
  public acceptFiles = true;

  @state() private _status = '';

  constructor() {
    super();
    new DragAndDropController(this, {
      isDragged: () => this.dragged,
      shouldAccept: (event) =>
        !this.acceptFiles ||
        event.dataTransfer?.types.includes('Files') === true,
      onDragEnter: () => {
        this.dragged = true;
      },
      onDragLeave: () => {
        this.dragged = false;
      },
      onDrop: (event) => {
        const count = event.dataTransfer?.files.length ?? 0;
        this.dragged = false;
        this._status = `${count} file${count === 1 ? '' : 's'} dropped`;
      },
    });
  }

  private _handleTextDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', 'This is not a file');
  }

  protected override render(): TemplateResult {
    return html`
      <div class="dropzone" role="region" aria-label="File drop zone">
        <strong>
          ${this.dragged ? 'Release to drop' : 'Drop a file here'}
        </strong>
        <span class="hint">File payloads are accepted.</span>
        ${this._status
          ? html`
              <output class="status">${this._status}</output>
            `
          : ''}
      </div>
      <div
        class="payload"
        draggable="true"
        @dragstart=${this._handleTextDragStart}
      >
        Drag this text to test a rejected payload
      </div>
    `;
  }
}
