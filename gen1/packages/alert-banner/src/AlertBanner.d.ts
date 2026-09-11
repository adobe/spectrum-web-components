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
import { CSSResultArray, TemplateResult } from '@spectrum-web-components/base';
import '@spectrum-web-components/button/sp-close-button.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-info.js';
import { AlertBannerBase } from './AlertBanner.base.js';
import type { AlertBannerVariants } from './AlertBanner.types.js';
export type { AlertBannerVariants };
/**
 * @element sp-alert-banner
 *
 * @slot - The alert banner text context
 * @slot action - Slot for the button element that surfaces the contextual action a user can take
 *
 * @fires close - Announces the alert banner has been closed
 */
export declare class AlertBanner extends AlertBannerBase {
    static get styles(): CSSResultArray;
    protected renderIcon(variant: string): TemplateResult;
    protected render(): TemplateResult;
}
