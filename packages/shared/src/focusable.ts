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
    SpectrumElement,
    property,
    CSSResultArray,
    PropertyValues,
} from '@spectrum-web-components/base';
import focusableStyles from './focusable.css.js';

import { FocusVisiblePolyfillMixin } from './focus-visible.js';

type DisableableElement = HTMLElement & { disabled?: boolean };

/**
 * Focusable base class handles tabindex setting into shadowed elements automatically.
 *
 * This implementation is based heavily on the aybolit delegate-focus-mixin at
 * https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js
 */
export class Focusable extends FocusVisiblePolyfillMixin(SpectrumElement) {
    public static get styles(): CSSResultArray {
        return [focusableStyles];
    }
    /**
     * Disable this control. It will not receive focus or events
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * When this control is rendered, focus it automatically
     */
    @property({ type: Boolean })
    public autofocus = false;

    /**
     * The tab index to apply to this control. See general documentation about
     * the tabindex HTML property
     */
    @property({ type: Number, reflect: true })
    public tabIndex = 0;

    protected isShiftTabbing = false;
    private newTabindex?: number = 0;
    private oldTabindex = 0;

    public get focusElement(): DisableableElement {
        throw new Error('Must implement focusElement getter!');
    }

    public focus(): void {
        if (this.disabled) {
            return;
        }

        this.focusElement.focus();
    }

    public blur(): void {
        this.focusElement.blur();
    }

    public click(): void {
        this.focusElement.click();
    }

    protected manageAutoFocus(): void {
        if (this.autofocus) {
            /* Trick :focus-visible polyfill into thinking keyboard based focus */
            this.dispatchEvent(
                new KeyboardEvent('keydown', {
                    code: 'Tab',
                })
            );
            this.focus();
        }
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.manageAutoFocus();
        this.manageFocusIn();
        this.manageShiftTab();
    }

    protected manageFocusIn(): void {
        this.addEventListener('focusin', (event) => {
            // only throw focus when `focusin` occurs directly on the `:host()`
            if (event.composedPath()[0] === this) {
                this.handleFocus();
            }
            // when focus has been thrown do not reapply `focusout` listeners
            if (event.relatedTarget === this) {
                return;
            }
            let doTimeout = true;
            const innerHandler = (event: FocusEvent): void => {
                if (
                    event.relatedTarget &&
                    this.shadowRoot &&
                    this.shadowRoot.contains(event.relatedTarget as Node)
                ) {
                    return;
                }
                setTimeout(() => {
                    // Typically this would be done via `clearTimeout()`.
                    // However, there are moment when the asyncrony of native
                    // DOM events causes the `outerHandler` to run before the
                    // value returned from `setTimeout` can be cached, which
                    // prevents the following call to be prevented. In ALL
                    // cases the `outerHandler` will run before the callback
                    // for the `setTimeout` which leads to the use of this
                    // technique instead.
                    if (doTimeout) {
                        this.focus();
                    }
                });
            };
            const outerHandler = (): void => {
                doTimeout = false;
                this.focusElement.removeEventListener('focusout', innerHandler);
                this.removeEventListener('focusout', outerHandler);
            };
            this.focusElement.addEventListener('focusout', innerHandler);
            this.addEventListener('focusout', outerHandler);
        });
    }

    protected manageShiftTab(): void {
        this.addEventListener('keydown', (event) => {
            if (
                !event.defaultPrevented &&
                event.shiftKey &&
                event.code === 'Tab'
            ) {
                this.isShiftTabbing = true;
                HTMLElement.prototype.focus.apply(this);
                setTimeout(() => (this.isShiftTabbing = false), 0);
            }
        });
    }

    protected update(changedProperties: Map<string, boolean>): void {
        if (changedProperties.has('disabled')) {
            this.handleDisabledChanged(
                this.disabled,
                changedProperties.get('disabled') as boolean
            );
        }

        if (changedProperties.has('tabIndex')) {
            // save value of tabindex, as it can be overridden to
            // undefined in case if the element is disabled
            this.newTabindex = this.tabIndex;
            this.handleTabIndexChanged(this.tabIndex);
        }

        super.update(changedProperties);
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('disabled')) {
            this.focusElement.disabled = this.disabled;
            if (this.disabled) {
                this.blur();
            }
        }

        if (
            changedProperties.has('tabIndex') &&
            this.newTabindex !== undefined
        ) {
            this.focusElement.tabIndex = this.newTabindex;
            this.newTabindex = undefined;
        }
    }

    private handleFocus(): void {
        if (this.isShiftTabbing) {
            return;
        }

        this.focusElement.focus();
    }

    private handleDisabledChanged(
        disabled: boolean,
        oldDisabled: boolean
    ): void {
        if (disabled) {
            this.oldTabindex = this.tabIndex;
            this.tabIndex = -1;
            this.setAttribute('aria-disabled', 'true');
        } else if (oldDisabled) {
            this.tabIndex = this.oldTabindex;
            this.removeAttribute('aria-disabled');
        }
    }

    private handleTabIndexChanged(tabindex: number): void {
        if (this.disabled && tabindex) {
            if (this.tabIndex !== -1) {
                this.oldTabindex = this.tabIndex;
            }
            this.tabIndex = -1;
        }
    }
}
