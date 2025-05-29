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

import {
    CSSResultArray,
    html,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import dropzoneStyles from './dropzone.css.js';

export type DropzoneEventDetail = DragEvent;

export type DropEffects = 'copy' | 'move' | 'link' | 'none';

/**
 * @element sp-dropzone
 *
 * @slot - The default slot on an `sp-dropzone` is a great place to place upload instructions
 * built with an `sp-illustrated-message` or other information, possibly even built from data
 * provided by the upload, to support users successfully interacting with the drag and drop
 * based features of your application
 *
 * @fires sp-dropzone-should-accept - A cancellable event that confirms whether or not
 * a file dropped on the UI should be accepted.
 * @fires sp-dropzone-dragover - Announces when files have been dragged over the UI, but not yet dropped.
 * @fires sp-dropzone-dragleave - Announces when dragged files have been moved out of the UI without having been dropped.
 * @fires sp-dropzone-drop - Announces when dragged files have been dropped on the UI.
 */
export class Dropzone extends SpectrumElement {
    public static override get styles(): CSSResultArray {
        return [dropzoneStyles];
    }

    /**
     * Controls the feedback (typically visual) the user is given during a drag and drop operation
     * @attr
     * @type {'copy' | 'move' | 'link' | 'none'}
     */
    public get dropEffect(): DropEffects {
        return this._dropEffect;
    }
    public set dropEffect(value: DropEffects) {
        if (['copy', 'move', 'link', 'none'].includes(value)) {
            this._dropEffect = value;
        }
    }
    private _dropEffect: DropEffects = 'copy';

    /**
     * Indicates that files are currently being dragged over the dropzone.
     */
    @property({ type: Boolean, reflect: true, attribute: 'dragged' })
    public isDragged = false;

    /**
     * Set this property to indicate that the component is in a filled state.
     */
    @property({ type: Boolean, attribute: 'filled' })
    public isFilled = false;

    private debouncedDragLeave: number | null = null;

    public override connectedCallback(): void {
        super.connectedCallback();

        this.addEventListener('drop', this.onDrop);
        this.addEventListener('dragover', this.onDragOver);
        this.addEventListener('dragleave', this.onDragLeave);
    }

    public override disconnectedCallback(): void {
        super.disconnectedCallback();

        this.removeEventListener('drop', this.onDrop);
        this.removeEventListener('dragover', this.onDragOver);
        this.removeEventListener('dragleave', this.onDragLeave);
    }

    public onDragOver(event: DragEvent): void {
        const shouldAcceptEvent = new CustomEvent('sp-dropzone-should-accept', {
            bubbles: true,
            cancelable: true,
            composed: true,
            detail: event,
        });
        const shouldAccept = this.dispatchEvent(shouldAcceptEvent);
        if (!event.dataTransfer) {
            return;
        }
        if (!shouldAccept) {
            event.dataTransfer.dropEffect = 'none';
            return;
        }

        event.preventDefault();

        this.clearDebouncedDragLeave();

        this.isDragged = true;

        event.dataTransfer.dropEffect = this.dropEffect;
        const dragOverEvent = new CustomEvent('sp-dropzone-dragover', {
            bubbles: true,
            composed: true,
            detail: event,
        });
        this.dispatchEvent(dragOverEvent);
    }

    public onDragLeave(event: DragEvent): void {
        this.clearDebouncedDragLeave();

        this.debouncedDragLeave = window.setTimeout(() => {
            this.isDragged = false;

            const dragLeave = new CustomEvent('sp-dropzone-dragleave', {
                bubbles: true,
                composed: true,
                detail: event,
            });
            this.dispatchEvent(dragLeave);
        }, 100);
    }

    public onDrop(event: DragEvent): void {
        event.preventDefault();

        this.clearDebouncedDragLeave();

        this.isDragged = false;
        const dropEvent = new CustomEvent('sp-dropzone-drop', {
            bubbles: true,
            composed: true,
            detail: event,
        });
        this.dispatchEvent(dropEvent);
    }

    protected override render(): TemplateResult {
        return html`
            <slot></slot>
        `;
    }

    protected clearDebouncedDragLeave(): void {
        if (this.debouncedDragLeave) {
            clearTimeout(this.debouncedDragLeave);
            this.debouncedDragLeave = null;
        }
    }
}

declare global {
    interface GlobalEventHandlersEventMap {
        'sp-dropzone:should-accept': CustomEvent<DragEvent>;
        'sp-dropzone:dragover': CustomEvent<DragEvent>;
        'sp-dropzone:dragleave': CustomEvent<DragEvent>;
        'sp-dropzone:drop': CustomEvent<DragEvent>;
    }
}
