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
import { PropertyValues, SpectrumElement } from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';

import { FocusVisiblePolyfillMixin } from './focus-visible.js';

type DisableableElement = HTMLElement & { disabled?: boolean };

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

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
    public override autofocus = false;

    /**
     * The tab index to apply to this control. See general documentation about
     * the tabindex HTML property
     *
     * @private
     */
    @property({ type: Number })
    public override get tabIndex(): number {
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
        // return this.focusElement.tabIndex;
        return this._tabIndex;
    }
    public override set tabIndex(tabIndex: number) {
        // Flipping `manipulatingTabindex` to true before a change
        // allows for that change NOT to effect the cached value of tabindex
        if (this.manipulatingTabindex) {
            this.manipulatingTabindex = false;
            return;
        }

        if (this.focusElement === this) {
            if (this.disabled) {
                this._tabIndex = tabIndex;
            } else if (tabIndex !== this._tabIndex) {
                this._tabIndex = tabIndex;
                const tabindex = '' + tabIndex;
                this.manipulatingTabindex = true;
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
            this.manipulatingTabindex = true;
            this.setAttribute('tabindex', '-1');
            this.removeAttribute('focusable');

            if (this.selfManageFocusElement) {
                return;
            }

            if (tabIndex !== -1) {
                this._tabIndex = tabIndex;
                this.manageFocusElementTabindex(tabIndex);
            } else {
                this.focusElement?.removeAttribute('tabindex');
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

        this._tabIndex = tabIndex;
        this.manageFocusElementTabindex(tabIndex);
    }
    private _tabIndex = 0;

    private onPointerdownManagementOfTabIndex(): void {
        if (this.tabIndex === -1) {
            setTimeout(() => {
                // Ensure this happens _after_ WebKit attempts to focus the :host.
                this.tabIndex = 0;
                this.focus({ preventScroll: true });
                this.tabIndex = -1;
            });
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
            if (this.focusElement !== this) {
                this.focusElement.tabIndex = tabIndex;
            }
        }
    }

    private manipulatingTabindex = false;

    /**
     * @private
     */
    public get focusElement(): DisableableElement {
        throw new Error('Must implement focusElement getter!');
    }

    /**
     * @public
     * @returns {boolean} whether the component should manage its focusElement tab-index or not
     * Needed for action-menu to be supported in action-group in an accessible way
     */
    public get selfManageFocusElement(): boolean {
        return false;
    }

    public override focus(options?: FocusOptions): void {
        if (this.disabled || !this.focusElement) {
            return;
        }

        if (this.focusElement !== this) {
            this.focusElement.focus(options);
        } else {
            HTMLElement.prototype.focus.apply(this, [options]);
        }
    }

    public override blur(): void {
        const focusElement = this.focusElement || this;
        if (focusElement !== this) {
            focusElement.blur();
        } else {
            HTMLElement.prototype.blur.apply(this);
        }
    }

    public override click(): void {
        if (this.disabled) {
            return;
        }

        const focusElement = this.focusElement || this;
        if (focusElement !== this) {
            focusElement.click();
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

    protected override firstUpdated(changes: PropertyValues): void {
        super.firstUpdated(changes);
        if (
            !this.hasAttribute('tabindex') ||
            this.getAttribute('tabindex') !== '-1'
        ) {
            this.setAttribute('focusable', '');
        }
    }

    protected override update(changedProperties: PropertyValues): void {
        if (changedProperties.has('disabled')) {
            this.handleDisabledChanged(
                this.disabled,
                changedProperties.get('disabled') as boolean
            );
        }

        super.update(changedProperties);
    }

    protected override updated(changedProperties: PropertyValues): void {
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

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.autofocusReady;
        return complete;
    }

    private autofocusReady = Promise.resolve();

    public override connectedCallback(): void {
        super.connectedCallback();
        if (this.autofocus) {
            this.autofocusReady = new Promise(async (res) => {
                // If at connect time the [autofocus] content is placed within
                // content that needs to be "hidden" by default, it would need to wait
                // two rAFs for animations to be triggered on that content in
                // order for the [autofocus] to become "visisble" and have its
                // focus() capabilities enabled.
                //
                // Await this with `getUpdateComplete` so that the element cannot
                // become "ready" until `manageFocus` has occured.
                await nextFrame();
                await nextFrame();
                res();
            });
            this.updateComplete.then(() => {
                this.manageAutoFocus();
            });
        }
    }
}
