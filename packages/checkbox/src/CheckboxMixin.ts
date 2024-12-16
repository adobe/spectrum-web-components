/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
    html,
    ReactiveElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
} from '@spectrum-web-components/base/src/decorators.js';
import { ifDefined } from '@spectrum-web-components/base/src/directives.js';

type Constructor<T = Record<string, unknown>> = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new (...args: any[]): T;
    prototype: T;
};

export interface CheckboxElement {
    checked: boolean;
    handleChange(): void;
    inputElement: HTMLInputElement;
    name?: string;
    readonly?: boolean;
}

/**
 * A mixin function that adds checkbox functionality to a given class.
 *
 * @template T - The type of the class to be extended.
 *
 * @param constructor - The class to be extended.
 * @returns - The extended class with checkbox functionality.
 *
 * @fires change - Dispatched when the checkbox is changed.
 */
export function CheckboxMixin<T extends Constructor<ReactiveElement>>(
    constructor: T
): T & Constructor<CheckboxElement> {
    /**
     * A mixin class that extends a base class to add checkbox functionality.
     *
     * @template T - The type of the base class.
     * @function handleChange - Handles the change event for the checkbox input element.
     * @function render - Renders the checkbox input element.
     */
    class MixedElement extends constructor {
        /**
         * Indicates whether the checkbox is checked.
         *
         * @public
         */
        @property({ type: Boolean, reflect: true })
        public checked = false;

        /**
         * The name attribute of the checkbox input element.
         *
         * @public
         */
        @property({ type: String, reflect: true })
        public name: string | undefined;

        /**
         * Indicates whether the checkbox is readonly.
         *
         * @public
         */
        @property({ type: Boolean, reflect: true })
        public readonly = false;

        /**
         * The checkbox input element.
         */
        @query('#input')
        inputElement!: HTMLInputElement;

        /**
         * Handles the change event for the checkbox input element.
         * If the checkbox is readonly, it prevents the change.
         * Otherwise, it updates the checked property and dispatches a change event.
         */
        public handleChange(): void {
            if (this.readonly) {
                this.inputElement.checked = this.checked;

                return;
            }

            this.checked = this.inputElement.checked;

            const changeEvent = new CustomEvent('change', {
                bubbles: true,
                cancelable: true,
                composed: true,
            });
            const applyDefault = this.dispatchEvent(changeEvent);

            if (!applyDefault) {
                this.checked = !this.inputElement.checked;
                this.inputElement.checked = this.checked;
            }
        }

        /**
         * Renders the checkbox input element.
         *
         * @returns - The rendered template.
         */
        protected render(): TemplateResult {
            return html`
                <input
                    id="input"
                    name=${ifDefined(this.name || undefined)}
                    type="checkbox"
                    .checked=${this.checked}
                    ?disabled=${this.readonly}
                    @change=${this.handleChange}
                />
            `;
        }
    }

    return MixedElement;
}
