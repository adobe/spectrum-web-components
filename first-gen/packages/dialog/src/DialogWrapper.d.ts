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
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/underlay/sp-underlay.js';
import '@spectrum-web-components/dialog/sp-dialog.js';
import { Dialog } from './Dialog.js';
import { DialogBase } from './DialogBase.js';
/**
 * @element sp-dialog-wrapper
 *
 * @slot - content for the dialog
 * @fires secondary - Announces that the "secondary" button has been clicked.
 * @fires cancel - Announces that the "cancel" button has been clicked.
 * @fires confirm - Announces that the "confirm" button has been clicked.
 * @fires close - Announces that the dialog has been closed.
 */
export declare class DialogWrapper extends DialogBase {
    static get styles(): CSSResultArray;
    error: boolean;
    cancelLabel: string;
    confirmLabel: string;
    dismissLabel: string;
    footer: string;
    hero: string;
    heroLabel: string;
    noDivider: boolean;
    size?: 's' | 'm' | 'l';
    secondaryLabel: string;
    headline: string;
    headlineVisibility: 'none' | undefined;
    protected get dialog(): Dialog;
    private clickSecondary;
    private clickCancel;
    private clickConfirm;
    protected renderDialog(): TemplateResult;
}
