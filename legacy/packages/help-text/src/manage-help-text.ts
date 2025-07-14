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

import { ReactiveElement, TemplateResult } from '@spectrum-web-components/base';
import { HelpTextManager } from './HelpTextManager.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface HelpTextElementInterface {
    renderHelpText(negative?: boolean): TemplateResult;
    helpTextId: string;
}

export function ManageHelpText<T extends Constructor<ReactiveElement>>(
    constructor: T,
    { mode }: { mode: 'internal' | 'external' } = { mode: 'internal' }
): T & Constructor<HelpTextElementInterface> {
    class HelpTextElement extends constructor {
        helpTextManager = new HelpTextManager(this, { mode });
        get helpTextId(): string {
            return this.helpTextManager.id;
        }
        renderHelpText(negative?: boolean): TemplateResult {
            return this.helpTextManager.render(negative);
        }
    }
    return HelpTextElement;
}
