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
import { ElementPart, TemplateResult } from '@spectrum-web-components/base';
import { AsyncDirective } from '@spectrum-web-components/base/src/async-directive.js';
import { SlottableRequestEvent } from './slottable-request-event.js';
export declare class SlottableRequestDirective extends AsyncDirective {
    protected template: () => TemplateResult;
    protected target: HTMLElement;
    private renderBefore;
    protected listenerHost: HTMLElement;
    protected listeners: AbortController;
    render(_template: () => TemplateResult): unknown;
    update(part: ElementPart, [template]: Parameters<this['render']>): void;
    handleSlottableRequest(event: SlottableRequestEvent): void;
    init(): void;
    disconnected(): void;
    reconnected(): void;
}
export declare const slottableRequest: (_template: () => TemplateResult) => import("lit-html/directive.js").DirectiveResult<typeof SlottableRequestDirective>;
