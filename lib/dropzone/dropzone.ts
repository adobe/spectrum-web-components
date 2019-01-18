/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { html, LitElement, property } from 'lit-element';

// @ts-ignore - css generated at build time

import dropzoneStyles from './dropzone.css.js';

export type DropzoneEventDetail = DragEvent;

export class Dropzone extends LitElement {
    public static readonly is = 'spectrum-dropzone';

    public static get styles() {
        return [dropzoneStyles];
    }

    public get dropEffect() {
        return this._dropEffect;
    }
    public set dropEffect(value: string) {
        if (['copy', 'move', 'link', 'none'].includes(value)) {
            this._dropEffect = value;
        }
    }

    @property({ type: Boolean, reflect: true, attribute: 'is-dragged' })
    public isDragged = false;

    private _dropEffect = 'copy';

    private debouncedDragLeave: number | null = null;

    public onDragOver(ev: DragEvent) {
        const shouldAcceptEvent = new CustomEvent<DropzoneEventDetail>(
            'dropzone-should-accept',
            {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: ev,
            }
        );
        // dispatch event returns true if preventDefault() is not called
        const shouldAccept = this.dispatchEvent(shouldAcceptEvent);
        if (!ev.dataTransfer) {
            return;
        }
        if (!shouldAccept) {
            ev.dataTransfer.dropEffect = 'none';
            return;
        }

        ev.preventDefault();

        this.clearDebouncedDragLeave();

        this.isDragged = true;

        ev.dataTransfer.dropEffect = this.dropEffect;
        const dragOverEvent = new CustomEvent<DropzoneEventDetail>(
            'dropzone-dragover',
            {
                bubbles: true,
                composed: true,
                detail: ev,
            }
        );
        this.dispatchEvent(dragOverEvent);
    }

    public onDragLeave(ev: DragEvent) {
        this.clearDebouncedDragLeave();

        this.debouncedDragLeave = setTimeout(() => {
            if (this.isDragged) {
                this.isDragged = false;
            }

            const dragLeave = new CustomEvent<DropzoneEventDetail>(
                'dropzone-dragleave',
                {
                    bubbles: true,
                    composed: true,
                    detail: ev,
                }
            );
            this.dispatchEvent(dragLeave);
        }, 100);
    }

    public onDrop(ev: DragEvent) {
        ev.preventDefault();

        this.clearDebouncedDragLeave();

        if (this.isDragged) {
            this.isDragged = false;
        }
        const dropEvent = new CustomEvent<DropzoneEventDetail>(
            'dropzone-drop',
            {
                bubbles: true,
                composed: true,
                detail: ev,
            }
        );
        this.dispatchEvent(dropEvent);
    }

    protected render() {
        return html`
            <div
                id="container"
                @drop="${this.onDrop}"
                @dragover="${this.onDragOver}"
                @dragleave="${this.onDragLeave}"
            >
                <slot></slot>
            </div>
        `;
    }

    protected clearDebouncedDragLeave() {
        if (this.debouncedDragLeave) {
            clearTimeout(this.debouncedDragLeave);
            this.debouncedDragLeave = null;
        }
    }
}
