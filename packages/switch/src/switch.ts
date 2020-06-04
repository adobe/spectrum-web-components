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

import {
    CSSResultArray,
    TemplateResult,
    html,
    PropertyValues,
    property,
    query,
} from 'lit-element';

import { State } from 'haunted';
import { useToggleState } from '@react-stately/toggle';
import { useSwitch } from '@react-aria/switch';
import { CheckboxBase } from '@react-types/checkbox';

import { spread } from '@open-wc/lit-helpers';
import { Focusable } from '@spectrum-web-components/shared/lib/focusable.js';

import switchStyles from './switch.css.js';
import legacyStyles from './switch-legacy.css.js';

// this function is a quick hack to translate react event and attribute names
// to the same form used by lit-element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fixSpreadNaming(inputProps: Record<string, any>): void {
    // hack event naming
    for (const [key, value] of Object.entries(inputProps)) {
        if (key.startsWith('on')) {
            delete inputProps[key];
            // hack around native event problem with react-aria (to be fixed for preact support?)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputProps[`@${key.slice(2).toLowerCase()}`] = (event: any) => {
                event.nativeEvent = event;
                if (value) {
                    value(event);
                }
            };
        } else if (typeof value === 'boolean') {
            delete inputProps[key];
            inputProps[`?${key}`] = value;
        }
    }
}

const defer = Promise.resolve().then.bind(Promise.resolve());

export class Switch extends Focusable implements CheckboxBase {
    @property({ attribute: false })
    public defaultSelected?: boolean;

    @property({ type: Boolean, reflect: true, attribute: 'checked' })
    public isSelected?: boolean;

    // react-stately will expect 'on' handlers for each state change
    // this is where we apply changes to local state, and dispatch events
    public onChange = (isSelected: boolean): void => {
        const changeEvent = new CustomEvent('change', {
            bubbles: true,
            cancelable: true,
        });
        const apply = this.dispatchEvent(changeEvent);
        if (apply) {
            this.isSelected = isSelected;
        }
    };

    @property({ reflect: true })
    public value?: string;

    @property({ reflect: true })
    public name?: string;

    // haunted specific: changes to lit-element, could be included in base class
    private hauntedState = new State(() => this.requestUpdate(), this);

    protected update(changedProperties: Map<string, boolean>): void {
        this.hauntedState.run(() => super.update(changedProperties));
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);
        this.hauntedState.runLayoutEffects();
        defer(() => this.hauntedState.runEffects());
    }

    public disconnectedCallback(): void {
        this.hauntedState.teardown();
        super.disconnectedCallback();
    }
    // end haunted specific

    // had to bring this up from checkbox base since we're not basing off that class here
    @query('#input')
    protected inputElement!: HTMLInputElement;

    public get focusElement(): HTMLElement {
        return this.inputElement;
    }

    public static get styles(): CSSResultArray {
        /* istanbul ignore if */
        if (window.hasOwnProperty('ShadyDOM')) {
            // Override some styles if we are using the web component polyfill
            return [switchStyles, legacyStyles];
        }
        return [switchStyles];
    }

    protected render(): TemplateResult {
        // use the state from react-stately, this manages isSelected state
        const state = useToggleState(this);
        // use the hook from react-aria, this gives us event bindings and aria
        // attributes to use in our DOM rendering
        const { inputProps } = useSwitch(this, state, this);
        // we have to hack the spread naming to be compatible with lit-html
        fixSpreadNaming(inputProps);
        // we also want to apply some of these attributes to our host (the aria ones)
        for (const [key, value] of Object.entries(inputProps)) {
            if (key.startsWith('aria-')) {
                if (value) {
                    this.setAttribute(key, value as any);
                } else {
                    this.removeAttribute(key);
                }
            }
        }
        // can now just spread the events and aria attributes onto the input box
        return html`
            <input id="input" type="checkbox" ...=${spread(inputProps)} />
            <span id="switch"></span>
            <label id="label" for="input">
                <slot></slot>
            </label>
        `;
    }
}
