/*
Copyright 2020 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { ReactiveElement, TemplateResult } from '@spectrum-web-components/base';
import { HelpTextManager } from './HelpTextManager.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface HelpTextElementInterface {
    /**
     * Render the help text.
     *
     * @param negative - Whether the help text should be rendered in a negative style.
     * @returns The rendered help text as a TemplateResult.
     */
    renderHelpText(negative?: boolean): TemplateResult;

    /**
     * The ID of the help text.
     */
    helpTextId: string;
}

/**
 * A mixin function to manage help text for a ReactiveElement.
 *
 * @param constructor - The constructor of the ReactiveElement.
 * @param options - Options for managing the help text.
 * @param options.mode - The mode of the help text, either 'internal' or 'external'.
 * @returns A constructor that extends the ReactiveElement with help text management.
 */
export function ManageHelpText<T extends Constructor<ReactiveElement>>(
    constructor: T,
    { mode }: { mode: 'internal' | 'external' } = { mode: 'internal' }
): T & Constructor<HelpTextElementInterface> {
    class HelpTextElement extends constructor {
        helpTextManager = new HelpTextManager(this, { mode });

        /**
         * Get the ID of the help text.
         *
         * @returns The unique identifier for the help text element.
         */
        get helpTextId(): string {
            return this.helpTextManager.id;
        }

        /**
         * Initiate manager to render the help text.
         *
         * @param negative - Whether the help text should be rendered in a negative style.
         * @returns The rendered help text as a TemplateResult.
         */
        renderHelpText(negative?: boolean): TemplateResult {
            return this.helpTextManager.render(negative);
        }
    }

    return HelpTextElement;
}
