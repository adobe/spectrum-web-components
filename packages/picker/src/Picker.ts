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
    DefaultElementSize,
    html,
    nothing,
    PropertyValues,
    SizedMixin,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    classMap,
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';

import pickerStyles from './picker.css.js';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';

import { Focusable } from '@spectrum-web-components/shared/src/focusable.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import '@spectrum-web-components/menu/sp-menu.js';
import type {
    Menu,
    MenuItem,
    MenuItemChildren,
} from '@spectrum-web-components/menu';
import '@spectrum-web-components/tray/sp-tray.js';
import '@spectrum-web-components/popover/sp-popover.js';
import { Placement } from '@spectrum-web-components/overlay';
import {
    IS_MOBILE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import type { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

export class PickerBase extends SizedMixin(Focusable) {
    protected isMobile = new MatchMediaController(this, IS_MOBILE);

    @state()
    appliedLabel?: string;

    @query('#button')
    public button!: HTMLButtonElement;

    private deprecatedMenu: Menu | null = null;

    @property({ type: Boolean, reflect: true })
    public override disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: String, reflect: true })
    public icons?: 'only' | 'none';

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    public selects: undefined | 'single' = 'single';

    protected get menuItems(): MenuItem[] {
        return this.optionsMenu.childItems;
    }

    @query('sp-menu')
    protected optionsMenu!: Menu;

    @query('sp-overlay')
    protected overlayElement!: Overlay;

    /**
     * @type {"top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end"}
     * @attr
     */

    @property()
    public placement: Placement = 'bottom-start';

    @property({ type: Boolean, reflect: true })
    public quiet = false;

    @property({ type: String })
    public value = '';

    @property({ attribute: false })
    public get selectedItem(): MenuItem | undefined {
        return this._selectedItem;
    }

    public set selectedItem(selectedItem: MenuItem | undefined) {
        this.selectedItemContent = selectedItem
            ? selectedItem.itemChildren
            : undefined;

        if (selectedItem === this.selectedItem) return;
        const oldSelectedItem = this.selectedItem;
        this._selectedItem = selectedItem;
        this.requestUpdate('selectedItem', oldSelectedItem);
    }

    _selectedItem?: MenuItem;

    protected listRole: 'listbox' | 'menu' = 'listbox';
    protected itemRole = 'option';

    public override get focusElement(): HTMLElement {
        if (this.open) {
            return this.optionsMenu;
        }
        return this.button;
    }

    public forceFocusVisible(): void {
        this.focused = true;
    }

    public handleButtonBlur(): void {
        this.focused = false;
    }

    protected handleButtonClick(): void {
        if (this.enterKeydownOn && this.enterKeydownOn !== this.button) {
            return;
        }
        this.toggle();
    }

    public override focus(options?: FocusOptions): void {
        super.focus(options);

        if (!this.disabled && this.focusElement) {
            this.focused = this.hasVisibleFocusInTree();
        }
    }

    public handleHelperFocus(): void {
        // set focused to true here instead of handleButtonFocus so clicks don't flash a focus outline
        this.focused = true;
        this.button.focus();
    }

    public handleChange(event: Event): void {
        const target = event.target as Menu;
        const [selected] = target.selectedItems;
        event.stopPropagation();
        if (event.cancelable) {
            this.setValueFromItem(selected, event);
        } else {
            // Non-cancelable "change" events announce a selection with no value
            // change that should close the Picker element.
            this.open = false;
        }
    }

    protected handleKeydown = (event: KeyboardEvent): void => {
        this.focused = true;
        if (event.code !== 'ArrowDown' && event.code !== 'ArrowUp') {
            return;
        }
        event.preventDefault();
        this.toggle(true);
    };

    protected async setValueFromItem(
        item: MenuItem,
        menuChangeEvent?: Event
    ): Promise<void> {
        // should always close when "setting" a value.
        this.open = false;
        const oldSelectedItem = this.selectedItem;
        const oldValue = this.value;

        // Set a value.
        this.selectedItem = item;
        this.value = item.value;
        await this.updateComplete;
        const applyDefault = this.dispatchEvent(
            new Event('change', {
                bubbles: true,
                // Allow it to be prevented.
                cancelable: true,
                composed: true,
            })
        );
        if (!applyDefault && this.selects) {
            if (menuChangeEvent) {
                menuChangeEvent.preventDefault();
            }
            this.setMenuItemSelected(this.selectedItem as MenuItem, false);
            if (oldSelectedItem) {
                this.setMenuItemSelected(oldSelectedItem, true);
            }
            this.selectedItem = oldSelectedItem;
            this.value = oldValue;
            this.open = true;
            return;
        } else if (!this.selects) {
            // Unset the value if not carrying a selection
            this.selectedItem = oldSelectedItem;
            this.value = oldValue;
            return;
        }
        if (oldSelectedItem) {
            this.setMenuItemSelected(oldSelectedItem, false);
        }
        this.setMenuItemSelected(item, !!this.selects);
    }

    protected setMenuItemSelected(item: MenuItem, value: boolean): void {
        // matches null | undefined
        if (this.selects == null) return;
        item.selected = value;
    }

    public toggle(target?: boolean): void {
        if (this.readonly) {
            return;
        }
        this.open = typeof target !== 'undefined' ? target : !this.open;
    }

    public close(): void {
        if (this.readonly) {
            return;
        }
        this.open = false;
    }

    protected get containerStyles(): StyleInfo {
        // @todo: test in mobile
        /* c8 ignore next 5 */
        if (this.isMobile.matches) {
            return {
                '--swc-menu-width': '100%',
            };
        }
        return {};
    }

    @property({ attribute: false })
    protected get selectedItemContent(): MenuItemChildren {
        return this._selectedItemContent || { icon: [], content: [] };
    }

    protected set selectedItemContent(
        selectedItemContent: MenuItemChildren | undefined
    ) {
        if (selectedItemContent === this.selectedItemContent) return;

        const oldContent = this.selectedItemContent;
        this._selectedItemContent = selectedItemContent;
        this.requestUpdate('selectedItemContent', oldContent);
    }

    _selectedItemContent?: MenuItemChildren;

    protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
        if (this.value && this.selectedItem) {
            return content;
        }
        return html`
            <slot name="label">
                <span
                    aria-hidden=${ifDefined(
                        this.appliedLabel ? undefined : 'true'
                    )}
                >
                    ${this.label}
                </span>
            </slot>
        `;
    }

    protected get buttonContent(): TemplateResult[] {
        const labelClasses = {
            'visually-hidden': this.icons === 'only' && !!this.value,
            placeholder: !this.value,
        };
        const appliedLabel = this.appliedLabel || this.label;
        return [
            html`
                <span id="icon" ?hidden=${this.icons === 'none'}>
                    ${this.selectedItemContent.icon}
                </span>
                <span id="label" class=${classMap(labelClasses)}>
                    ${this.renderLabelContent(this.selectedItemContent.content)}
                </span>
                ${this.value && this.selectedItem
                    ? html`
                          <span
                              aria-hidden="true"
                              class="visually-hidden"
                              id="applied-label"
                          >
                              ${appliedLabel}
                              <slot name="label"></slot>
                          </span>
                      `
                    : html`
                          <span hidden id="applied-label">${appliedLabel}</span>
                      `}
                ${this.invalid
                    ? html`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `
                    : nothing}
                <sp-icon-chevron100
                    class="picker ${chevronClass[
                        this.size as DefaultElementSize
                    ]}"
                ></sp-icon-chevron100>
            `,
        ];
    }

    applyFocusElementLabel = (value?: string): void => {
        this.appliedLabel = value;
    };

    protected renderOverlay(menu: TemplateResult): TemplateResult {
        import('@spectrum-web-components/overlay/sp-overlay.js');
        return html`
            <sp-overlay
                .triggerElement=${this as HTMLElement}
                .offset=${0}
                ?open=${this.open}
                .placement=${this.placement}
                type="auto"
                .receivesFocus=${'true'}
                @beforetoggle=${(
                    event: Event & {
                        target: Overlay;
                        newState: 'open' | 'closed';
                    }
                ) => {
                    if (event.composedPath()[0] !== event.target) {
                        return;
                    }
                    if (event.newState === 'closed') {
                        this.open = false;
                    }
                    if (!this.open) {
                        this.optionsMenu.updateSelectedItemIndex();
                        this.optionsMenu.closeDescendentOverlays();
                    }
                }}
            >
                ${this.renderContainer(menu)}
            </sp-overlay>
        `;
    }

    // a helper to throw focus to the button is needed because Safari
    // won't include buttons in the tab order even with tabindex="0"
    protected override render(): TemplateResult {
        return html`
            <span
                id="focus-helper"
                tabindex="${this.focused || this.open ? '-1' : '0'}"
                @focus=${this.handleHelperFocus}
            ></span>
            <button
                aria-haspopup="true"
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-labelledby="icon label applied-label"
                id="button"
                class="button"
                @blur=${this.handleButtonBlur}
                @click=${this.handleButtonClick}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                ?disabled=${this.disabled}
                tabindex="-1"
            >
                ${this.buttonContent}
            </button>
            ${this.renderMenu}
        `;
    }

    protected override update(changes: PropertyValues<this>): void {
        if (this.selects) {
            // Always force `selects` to "single" when set.
            // TODO: Add support functionally and visually for "multiple"
            this.selects = 'single';
        }
        if (changes.has('disabled') && this.disabled) {
            this.open = false;
        }
        if (changes.has('value')) {
            // MenuItems update a frame late for <slot> management,
            // await the same here.
            this.shouldScheduleManageSelection();
        }
        // Maybe it's finally time to remove this support?
        if (!this.hasUpdated) {
            this.deprecatedMenu = this.querySelector(':scope > sp-menu');
            this.deprecatedMenu?.toggleAttribute('ignore', true);
            this.deprecatedMenu?.setAttribute('selects', 'inherit');
        }
        if (window.__swc.DEBUG) {
            if (!this.hasUpdated && this.querySelector(':scope > sp-menu')) {
                const { localName } = this;
                window.__swc.warn(
                    this,
                    `You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes',
                    { level: 'deprecation' }
                );
            }
        }
        super.update(changes);
    }

    protected bindButtonKeydownListener(): void {
        this.button.addEventListener('keydown', this.handleKeydown);
    }

    protected override firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        this.bindButtonKeydownListener();
    }

    protected get dismissHelper(): TemplateResult {
        return html`
            <div class="visually-hidden">
                <button
                    tabindex="-1"
                    aria-label="Dismiss"
                    @click=${this.close}
                ></button>
            </div>
        `;
    }

    protected renderContainer(menu: TemplateResult): TemplateResult {
        const accessibleMenu = html`
            ${this.dismissHelper} ${menu} ${this.dismissHelper}
        `;
        // @todo: test in mobile
        /* c8 ignore next 11 */
        if (this.isMobile.matches) {
            return html`
                <sp-tray
                    id="popover"
                    role="presentation"
                    style=${styleMap(this.containerStyles)}
                >
                    ${accessibleMenu}
                </sp-tray>
            `;
        }
        return html`
            <sp-popover
                id="popover"
                role="presentation"
                style=${styleMap(this.containerStyles)}
                placement=${this.placement}
            >
                ${accessibleMenu}
            </sp-popover>
        `;
    }

    protected hasOpened = false;

    protected get renderMenu(): TemplateResult {
        const menu = html`
            <sp-menu
                tabindex=${ifDefined(!this.open ? -1 : undefined)}
                aria-labelledby="applied-label"
                id="menu"
                role=${this.listRole}
                @change=${this.handleChange}
                .selects=${this.selects}
                .selected=${this.value ? [this.value] : []}
                @sp-menu-item-added-or-updated=${this.shouldManageSelection}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
            >
                <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
            </sp-menu>
        `;
        this.hasOpened = this.hasOpened || this.open || !!this.deprecatedMenu;
        if (this.hasOpened) {
            return this.renderOverlay(menu);
        }
        return menu;
    }

    private willManageSelection = false;

    protected shouldScheduleManageSelection(event?: Event): void {
        if (
            !this.willManageSelection &&
            (!event ||
                ((event.target as HTMLElement).getRootNode() as ShadowRoot)
                    .host === this)
        ) {
            this.willManageSelection = true;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.manageSelection();
                });
            });
        }
    }

    protected shouldManageSelection(): void {
        if (this.willManageSelection) {
            return;
        }
        this.willManageSelection = true;
        this.manageSelection();
    }

    protected async manageSelection(): Promise<void> {
        if (this.selects == null) return;

        this.selectionPromise = new Promise(
            (res) => (this.selectionResolver = res)
        );
        let selectedItem: MenuItem | undefined;
        await this.optionsMenu.updateComplete;
        if (this.recentlyConnected) {
            // Work around for attach timing differences in Safari and Firefox.
            // Remove when refactoring to Menu passthrough wrapper.
            await new Promise((res) => requestAnimationFrame(() => res(true)));
            this.recentlyConnected = false;
        }
        this.menuItems.forEach((item) => {
            if (this.value === item.value && !item.disabled) {
                selectedItem = item;
            } else {
                item.selected = false;
            }
        });
        if (selectedItem) {
            selectedItem.selected = !!this.selects;
            this.selectedItem = selectedItem;
        } else {
            this.value = '';
            this.selectedItem = undefined;
        }
        if (this.open) {
            await this.optionsMenu.updateComplete;
            this.optionsMenu.updateSelectedItemIndex();
        }
        this.selectionResolver();
        this.willManageSelection = false;
    }

    private selectionPromise = Promise.resolve();
    private selectionResolver!: () => void;

    protected override async getUpdateComplete(): Promise<boolean> {
        const complete = (await super.getUpdateComplete()) as boolean;
        await this.selectionPromise;
        if (this.overlayElement) {
            await this.overlayElement.updateComplete;
        }
        return complete;
    }

    private recentlyConnected = false;

    private enterKeydownOn: EventTarget | null = null;

    protected handleEnterKeydown = (event: KeyboardEvent): void => {
        if (event.code !== 'Enter') {
            return;
        }

        if (this.enterKeydownOn) {
            event.preventDefault();
            return;
        } else {
            this.addEventListener(
                'keyup',
                (keyupEvent: KeyboardEvent) => {
                    if (keyupEvent.code !== 'Enter') {
                        return;
                    }
                    this.enterKeydownOn = null;
                },
                { once: true }
            );
        }
        this.enterKeydownOn = this.enterKeydownOn || event.target;
    };

    public override connectedCallback(): void {
        super.connectedCallback();
        this.recentlyConnected = this.hasUpdated;
    }

    public override disconnectedCallback(): void {
        this.close();

        super.disconnectedCallback();
    }
}

/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 * @fires sp-closed - Announces that the overlay has been closed
 */
export class Picker extends PickerBase {
    public static override get styles(): CSSResultArray {
        return [pickerStyles, chevronStyles];
    }

    protected override get containerStyles(): StyleInfo {
        const styles = super.containerStyles;
        if (!this.quiet) {
            styles['min-width'] = `${this.offsetWidth}px`;
        }
        return styles;
    }

    protected override handleKeydown = (event: KeyboardEvent): void => {
        const { code } = event;
        this.focused = true;
        if (code === 'ArrowUp' || code === 'ArrowDown') {
            this.toggle(true);
            return;
        }
        if (!code.startsWith('Arrow') || this.readonly) {
            return;
        }
        event.preventDefault();
        if (code === 'ArrowUp' || code === 'ArrowDown') {
            this.toggle(true);
            return;
        }
        const selectedIndex = this.selectedItem
            ? this.menuItems.indexOf(this.selectedItem)
            : -1;
        // use a positive offset to find the first non-disabled item when no selection is available.
        const nextOffset = !this.value || code === 'ArrowRight' ? 1 : -1;
        let nextIndex = selectedIndex + nextOffset;
        while (
            this.menuItems[nextIndex] &&
            this.menuItems[nextIndex].disabled
        ) {
            nextIndex += nextOffset;
        }
        if (!this.menuItems[nextIndex] || this.menuItems[nextIndex].disabled) {
            return;
        }
        if (!this.value || nextIndex !== selectedIndex) {
            this.setValueFromItem(this.menuItems[nextIndex]);
        }
    };
}
