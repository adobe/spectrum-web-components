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
    html,
    LitElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
import { state } from '@spectrum-web-components/base/src/decorators.js';

import '@spectrum-web-components/dropzone/sp-dropzone.js';
import '@spectrum-web-components/action-button/sp-action-button.js';
import { illustration } from '../test/test-svg';
import '@spectrum-web-components/illustrated-message/sp-illustrated-message.js';
import '@spectrum-web-components/link/sp-link.js';

export default {
    component: 'sp-dropzone',
    title: 'Dropzone',
    args: {
        isDragged: false,
        isFilled: false,
    },
    argTypes: {
        isDragged: {
            name: 'isDragged',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
        isFilled: {
            name: 'isFilled',
            type: { name: 'boolean', required: false },
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            control: {
                type: 'boolean',
            },
        },
    },
};

type StoryArgs = {
    isDragged?: boolean;
    isFilled?: boolean;
};

export const Default = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};

export const Dragged = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone" tabindex="0" ?dragged=${args.isDragged}>
            <sp-illustrated-message heading="Drag and Drop Your File">
                ${illustration}
            </sp-illustrated-message>
            <div>
                <label for="file-input">
                    <sp-link
                        href="javascript:;"
                        onclick="this.parentElement.nextElementSibling.click()"
                    >
                        Select a File
                    </sp-link>
                    from your computer
                </label>
                <input type="file" id="file-input" style="display: none" />
            </div>
            <div>
                or
                <sp-link href="http://stock.adobe.com" target="blank">
                    Search Adobe Stock
                </sp-link>
            </div>
        </sp-dropzone>
    `;
};
Dragged.args = {
    isDragged: true,
};

export const Filled = (args: StoryArgs): TemplateResult => {
    return html`
        <sp-dropzone id="dropzone" ?filled=${args.isFilled}>
            Filled dropzone
        </sp-dropzone>
    `;
};
Filled.args = {
    isFilled: true,
};

class ControlledDropzone extends LitElement {
    @state()
    private beingDraggedOver: boolean = false;

    @state()
    private input?: string = undefined;

    override render(): TemplateResult {
        return html`
            <span>
                <sp-action-button
                    draggable="true"
                    style="margin-block-end: 16px;"
                >
                    Drag me
                </sp-action-button>
                <sp-dropzone
                    tabindex="0"
                    id="dropzone"
                    drop-effect="copy"
                    ?filled=${this.input !== undefined}
                    @sp-dropzone-drop=${this.onChange}
                    @sp-dropzone-dragover=${this.onDragOver}
                    @sp-dropzone-dragleave=${this.onDragLeave}
                >
                    <sp-illustrated-message
                        style="--mod-illustrated-message-display: flex;"
                        heading=${this.input !== undefined
                            ? this.beingDraggedOver
                                ? 'Drop here to replace!'
                                : 'You dropped something!'
                            : 'Drag and drop your file'}
                    >
                        ${illustration}
                    </sp-illustrated-message>
                    <div>
                        <label for="file-input">
                            <sp-link
                                href="javascript:;"
                                onclick="this.parentElement.nextElementSibling.click()"
                            >
                                Select a File
                            </sp-link>
                            from your computer
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            style="display: none"
                            @change=${this.onChange}
                        />
                    </div>
                </sp-dropzone>
            </span>
        `;
    }

    private onChange(): void {
        this.input = 'mock-file';
        this.beingDraggedOver = false;
    }

    private onDragOver(): void {
        this.beingDraggedOver = true;
    }

    private onDragLeave(): void {
        this.beingDraggedOver = false;
    }
}
defineElement('controlled-dropzone', ControlledDropzone);

export const Controlled = (): TemplateResult => {
    return html`
        <controlled-dropzone></controlled-dropzone>
    `;
};
