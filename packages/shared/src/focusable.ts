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
    PropertyValues,
} from '@spectrum-web-components/base';

import { FocusVisiblePolyfillMixin } from './focus-visible.js';

type DisableableElement = HTMLElement & { disabled?: boolean };

/**
 * Focusable base class handles tabindex setting into shadowed elements automatically.
 *
 * This implementation is based heavily on the aybolit delegate-focus-mixin at
 * https://github.com/web-padawan/aybolit/blob/master/packages/core/src/mixins/delegate-focus-mixin.js
 */
export class Focusable extends FocusVisiblePolyfillMixin(SpectrumElement) {
    /**
     * Disable this control. It will not receive focus or events
     */
    @property({ type: Boolean, reflect: true })
    public disabled = false;

    /**
     * When this control is rendered, focus it automatically
     * @private
     */
    @property({ type: Boolean })
    public autofocus = false;

    /**
     * The tab index to apply to this control. See general documentation about
     * the tabindex HTML property
     *
     * @private
     */
    @property({ type: Number })
    public get tabIndex(): number {
        if (this.focusElement === this) {
            const tabindex = this.hasAttribute('tabindex')
                ? Number(this.getAttribute('tabindex'))
                : NaN;
            return !isNaN(tabindex) ? tabindex : -1;
        }
        const tabIndexAttribute = parseFloat(
            this.hasAttribute('tabindex')
                ? (this.getAttribute('tabindex') as string) || '0'
                : '0'
        );
        // When `disabled` tabindex is -1.
        // When host tabindex -1, use that as the cache.
        if (this.disabled || tabIndexAttribute < 0) {
            return -1;
        }
        // When `focusElement` isn't available yet,
        // use host tabindex as the cache.
        if (!this.focusElement) {
            return tabIndexAttribute;
        }
        // All other times, use the tabindex of `focusElement`
        // as the cache for this value.
        return this.focusElement.tabIndex;
    }
    public set tabIndex(tabIndex: number) {
        // Flipping `manipulatingTabindex` to true before a change
        // allows for that change NOT to effect the cached value of tabindex
        if (this.manipulatingTabindex) {
            this.manipulatingTabindex = false;
            return;
        }
        if (this.focusElement === this) {
            if (tabIndex !== this.tabIndex) {
                this._tabIndex = tabIndex;
                const tabindex = this.disabled ? '-1' : '' + tabIndex;
                this.setAttribute('tabindex', tabindex);
            }
            return;
        }
        if (tabIndex === -1) {
            this.addEventListener(
                'pointerdown',
                this.onPointerdownManagementOfTabIndex
            );
        } else {
            // All code paths are about to address the host tabindex without side effect.
            this.manipulatingTabindex = true;
            this.removeEventListener(
                'pointerdown',
                this.onPointerdownManagementOfTabIndex
            );
        }
        if (tabIndex === -1 || this.disabled) {
            // Do not cange the tabindex of `focusElement` as it is the "old" value cache.
            // Make element NOT focusable.
            this.setAttribute('tabindex', '-1');
            this.removeAttribute('focusable');
            if (tabIndex !== -1) {
                // Cache all NON-`-1` values on the `focusElement`.
                this.manageFocusElementTabindex(tabIndex);
            }
            return;
        }
        this.setAttribute('focusable', '');
        if (this.hasAttribute('tabindex')) {
            this.removeAttribute('tabindex');
        } else {
            // You can't remove an attribute that isn't there,
            // manually end the `manipulatingTabindex` guard.
            this.manipulatingTabindex = false;
        }
        this.manageFocusElementTabindex(tabIndex);
    }
    private _tabIndex = 0;

    private onPointerdownManagementOfTabIndex(): void {
        if (this.tabIndex === -1) {
            this.tabIndex = 0;
            this.focus();
        }
    }

    private async manageFocusElementTabindex(tabIndex: number): Promise<void> {
        if (!this.focusElement) {
            // allow setting these values to be async when needed.
            await this.updateComplete;
        }
        if (tabIndex === null) {
            this.focusElement.removeAttribute('tabindex');
        } else {
            this.focusElement.tabIndex = tabIndex;
        }
    }

    private manipulatingTabindex = false;

    /**
     * @private
     */
    public get focusElement(): DisableableElement {
        throw new Error('Must implement focusElement getter!');
    }

    public focus(): void {
        if (this.disabled || !this.focusElement) {
            return;
        }

        if (this.focusElement !== this) {
            this.focusElement.focus();
        } else {
            HTMLElement.prototype.focus.apply(this);
        }
    }

    public blur(): void {
        if (this.focusElement !== this) {
            this.focusElement.blur();
        } else {
            HTMLElement.prototype.blur.apply(this);
        }
    }

    public click(): void {
        if (this.disabled) {
            return;
        }

        if (this.focusElement !== this) {
            this.focusElement.click();
        } else {
            HTMLElement.prototype.click.apply(this);
        }
    }

    protected manageAutoFocus(): void {
        if (this.autofocus) {
            /**
             * Trick :focus-visible polyfill into thinking keyboard based focus
             *
             * @private
             **/
            this.dispatchEvent(
                new KeyboardEvent('keydown', {
                    code: 'Tab',
                })
            );
            this.focusElement.focus();
        }
    }

    protected firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        this.manageAutoFocus();
        if (
            !this.hasAttribute('tabindex') ||
            this.getAttribute('tabindex') !== '-1'
        ) {
            this.setAttribute('focusable', '');
        }
    }

    protected update(changedProperties: Map<string, boolean>): void {
        if (changedProperties.has('disabled')) {
            this.handleDisabledChanged(
                this.disabled,
                changedProperties.get('disabled') as boolean
            );
        }

        super.update(changedProperties);
    }

    protected updated(changedProperties: PropertyValues): void {
        super.updated(changedProperties);

        if (changedProperties.has('disabled') && this.disabled) {
            this.blur();
        }
    }

    private async handleDisabledChanged(
        disabled: boolean,
        oldDisabled: boolean
    ): Promise<void> {
        const canSetDisabled = (): boolean =>
            this.focusElement !== this &&
            typeof this.focusElement.disabled !== 'undefined';
        if (disabled) {
            this.manipulatingTabindex = true;
            this.setAttribute('tabindex', '-1');
            await this.updateComplete;
            if (canSetDisabled()) {
                this.focusElement.disabled = true;
            } else {
                this.setAttribute('aria-disabled', 'true');
            }
        } else if (oldDisabled) {
            this.manipulatingTabindex = true;
            if (this.focusElement === this) {
                this.setAttribute('tabindex', '' + this._tabIndex);
            } else {
                this.removeAttribute('tabindex');
            }
            await this.updateComplete;
            if (canSetDisabled()) {
                this.focusElement.disabled = false;
            } else {
                this.removeAttribute('aria-disabled');
            }
        }
    }
}
