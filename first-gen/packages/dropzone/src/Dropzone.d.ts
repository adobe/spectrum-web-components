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
import { CSSResultArray, SpectrumElement, TemplateResult } from '@spectrum-web-components/base';
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
export declare class Dropzone extends SpectrumElement {
    static get styles(): CSSResultArray;
    /**
     * Controls the feedback (typically visual) the user is given during a drag and drop operation
     * @attr
     * @type {'copy' | 'move' | 'link' | 'none'}
     */
    get dropEffect(): DropEffects;
    set dropEffect(value: DropEffects);
    private _dropEffect;
    /**
     * Indicates that files are currently being dragged over the dropzone.
     */
    isDragged: boolean;
    /**
     * Set this property to indicate that the component is in a filled state.
     */
    isFilled: boolean;
    private debouncedDragLeave;
    connectedCallback(): void;
    disconnectedCallback(): void;
    onDragOver(event: DragEvent): void;
    onDragLeave(event: DragEvent): void;
    onDrop(event: DragEvent): void;
    protected render(): TemplateResult;
    protected clearDebouncedDragLeave(): void;
}
declare global {
    interface GlobalEventHandlersEventMap {
        'sp-dropzone:should-accept': CustomEvent<DragEvent>;
        'sp-dropzone:dragover': CustomEvent<DragEvent>;
        'sp-dropzone:dragleave': CustomEvent<DragEvent>;
        'sp-dropzone:drop': CustomEvent<DragEvent>;
    }
}
