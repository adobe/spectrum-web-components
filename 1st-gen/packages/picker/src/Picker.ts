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

import {
    CSSResultArray,
    DefaultElementSize,
    html,
    nothing,
    PropertyValues,
    render,
    SizedMixin,
    SpectrumElement,
    TemplateResult,
} from '@spectrum-web-components/base';
import {
    property,
    query,
    state,
} from '@spectrum-web-components/base/src/decorators.js';
import {
    classMap,
    ifDefined,
    StyleInfo,
    styleMap,
} from '@spectrum-web-components/base/src/directives.js';
import type { FieldLabel } from '@spectrum-web-components/field-label';
import chevronStyles from '@spectrum-web-components/icon/src/spectrum-icon-chevron.css.js';
import '@spectrum-web-components/icons-ui/icons/sp-icon-chevron100.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js';
import type {
    Menu,
    MenuItem,
    MenuItemChildren,
    MenuItemKeydownEvent,
} from '@spectrum-web-components/menu';
import '@spectrum-web-components/menu/sp-menu.js';
import { Placement } from '@spectrum-web-components/overlay';
import { Overlay } from '@spectrum-web-components/overlay/src/Overlay.js';
import type { SlottableRequestEvent } from '@spectrum-web-components/overlay/src/slottable-request-event.js';
import { DependencyManagerController } from '@spectrum-web-components/reactive-controllers/src/DependencyManger.js';
import {
    IS_MOBILE,
    IS_TOUCH_DEVICE,
    MatchMediaController,
} from '@spectrum-web-components/reactive-controllers/src/MatchMedia.js';
import type { Tooltip } from '@spectrum-web-components/tooltip';
import { DesktopController } from './DesktopController.js';
import { MobileController } from './MobileController.js';
import pickerStyles from './picker.css.js';
import { strategies } from './strategies.js';

const chevronClass = {
    s: 'spectrum-UIIcon-ChevronDown75',
    m: 'spectrum-UIIcon-ChevronDown100',
    l: 'spectrum-UIIcon-ChevronDown200',
    xl: 'spectrum-UIIcon-ChevronDown300',
};

export const DESCRIPTION_ID = 'option-picker';

/**
 * @element sp-picker
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
 * @slot - menu items to be listed in the Picker
 * @fires change - Announces that the `value` of the element has changed
 * @fires sp-opened - Announces that the overlay has been opened
 */
export class PickerBase extends SizedMixin(SpectrumElement, {
    noDefaultSize: true,
}) {
    static override shadowRootOptions = {
        ...SpectrumElement.shadowRootOptions,
        delegatesFocus: true,
    };

    public isMobile = new MatchMediaController(this, IS_MOBILE);

    public isTouchDevice = new MatchMediaController(this, IS_TOUCH_DEVICE);

    public strategy!: DesktopController | MobileController;

    @state()
    appliedLabel?: string;

    @query('#button')
    public button!: HTMLButtonElement;

    public dependencyManager = new DependencyManagerController(this);

    private deprecatedMenu: Menu | null = null;

    @property({ type: Boolean, reflect: true })
    public disabled = false;

    @property({ type: Boolean, reflect: true })
    public focused = false;

    @property({ type: String, reflect: true })
    public icons?: 'only' | 'none';

    @property({ type: Boolean, reflect: true })
    public invalid = false;

    /**
     * Forces the Picker to render as a popover on mobile instead of a tray.
     *
     * @memberof PickerBase
     */
    @property({ type: Boolean, reflect: true, attribute: 'force-popover' })
    public forcePopover = false;

    /** Whether the items are currently loading. */
    @property({ type: Boolean, reflect: true })
    public pending = false;

    /** Defines a string value that labels the Picker while it is in pending state. */
    @property({ type: String, attribute: 'pending-label' })
    public pendingLabel = 'Pending';

    @property()
    public label?: string;

    @property({ type: Boolean, reflect: true })
    public open = false;

    @property({ type: Boolean, reflect: true })
    public readonly = false;

    public selects: undefined | 'single' = 'single';

    @state()
    public labelAlignment?: 'inline';

    protected get menuItems(): MenuItem[] {
        return this.optionsMenu.childItems;
    }

    @query('sp-menu')
    public optionsMenu!: Menu;

    /**
     * @deprecated
     * */
    public get selfManageFocusElement(): boolean {
        return true;
    }

    @query('sp-overlay')
    public overlayElement!: Overlay;

    protected tooltipEl?: Tooltip;

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

    public get focusElement(): HTMLElement {
        if (this.open) {
            return this.optionsMenu;
        }
        return this.button;
    }

    public forceFocusVisible(): void {
        if (this.disabled) {
            return;
        }

        this.focused = true;
    }

    // handled by interaction controller, desktop or mobile; this is only called with a programmatic this.click()
    public override click(): void {
        this.toggle();
    }

    // pointer events handled by interaction controller, desktop or mobile; this is only called with a programmatic this.button.click()
    public handleButtonClick(): void {
        if (this.disabled) {
            return;
        }
        this.toggle();
    }

    public handleButtonBlur(): void {
        this.focused = false;
    }

    public override focus(options?: FocusOptions): void {
        this.focusElement?.focus(options);
    }
    /**
     * @deprecated - Use `focus` instead.
     */
    public handleHelperFocus(): void {
        // set focused to true here instead of handleButtonFocus so clicks don't flash a focus outline
        this.focused = true;
        this.button.focus();
    }

    public handleFocus(): void {
        if (!this.disabled && this.focusElement) {
            this.focused = this.hasVisibleFocusInTree();
        }
    }

    public handleChange(event: Event): void {
        if (this.strategy) {
            this.strategy.preventNextToggle = 'no';
        }
        const target = event.target as Menu;
        const [selected] = target.selectedItems;
        event.stopPropagation();
        if (event.cancelable) {
            this.setValueFromItem(selected, event);
        } else {
            // Non-cancelable "change" events announce a selection with no value
            // change that should close the Picker element.
            this.open = false;
            if (this.strategy) {
                this.strategy.open = false;
            }
        }
    }

    public handleButtonFocus(event: FocusEvent): void {
        this.strategy?.handleButtonFocus(event);
    }

    protected handleEscape = (
        event: MenuItemKeydownEvent | KeyboardEvent
    ): void => {
        if (event.key === 'Escape' && this.open) {
            event.stopPropagation();
            event.preventDefault();
            this.toggle(false);
        }
    };

    protected handleKeydown = (event: KeyboardEvent): void => {
        this.focused = true;
        if (
            !['ArrowUp', 'ArrowDown', 'Enter', ' ', 'Escape'].includes(
                event.key
            )
        ) {
            return;
        }
        if (event.key === 'Escape') {
            this.handleEscape(event);
            return;
        }
        event.stopPropagation();
        event.preventDefault();
        this.keyboardOpen();
    };

    protected async keyboardOpen(): Promise<void> {
        // if the menu is not open, we need to toggle it and wait for it to open to focus on the first selected item
        if (!this.open || !this.strategy.open) {
            this.addEventListener(
                'sp-opened',
                () => this.optionsMenu?.focusOnFirstSelectedItem(),
                {
                    once: true,
                }
            );
            this.toggle(true);
        } else {
            // if the menu is already open, we need to focus on the first selected item
            this.optionsMenu?.focusOnFirstSelectedItem();
        }
    }

    protected async setValueFromItem(
        item: MenuItem,
        menuChangeEvent?: Event
    ): Promise<void> {
        this.open = false;
        // should always close when "setting" a value
        const oldSelectedItem = this.selectedItem;
        const oldValue = this.value;

        // Set a value.
        this.selectedItem = item;
        this.value = item?.value ?? '';
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
            if (this.strategy) {
                this.strategy.open = true;
            }
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
        if (this.readonly || this.pending || this.disabled) {
            return;
        }
        const open = typeof target !== 'undefined' ? target : !this.open;

        this.open = open;
        if (this.strategy) {
            this.strategy.open = this.open;
        }
    }

    public close(): void {
        if (this.readonly) {
            return;
        }
        if (this.strategy) {
            this.open = false;
            this.strategy.open = false;
        }
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

    @state()
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

    protected handleTooltipSlotchange(
        event: Event & { target: HTMLSlotElement }
    ): void {
        this.tooltipEl = event.target.assignedElements()[0] as
            | Tooltip
            | undefined;

        // Set up trigger element for self-managed tooltips
        if (this.tooltipEl?.selfManaged) {
            // Wait for the tooltip to be fully initialized
            this.updateComplete.then(() => {
                if (this.tooltipEl?.overlayElement && this.button) {
                    this.tooltipEl.overlayElement.triggerElement = this.button;
                }
            });
        }
    }

    public handleSlottableRequest = (_event: SlottableRequestEvent): void => {};

    protected renderLabelContent(content: Node[]): TemplateResult | Node[] {
        if (this.value && this.selectedItem) {
            return content;
        }
        return html`
            <slot name="label" id="label">
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

    protected renderLoader(): TemplateResult {
        import(
            '@spectrum-web-components/progress-circle/sp-progress-circle.js'
        );
        return html`
            <sp-progress-circle
                size="s"
                indeterminate
                role="presentation"
                class="progress-circle"
            ></sp-progress-circle>
        `;
    }

    protected get buttonContent(): TemplateResult[] {
        const labelClasses = {
            'visually-hidden': this.icons === 'only' && !!this.value,
            placeholder: !this.value,
            label: true,
        };
        const appliedLabel = this.appliedLabel || this.label;
        return [
            html`
                <span id="icon" ?hidden=${this.icons === 'none'}>
                    ${this.selectedItemContent.icon}
                </span>
                <span
                    id=${ifDefined(
                        this.value && this.selectedItem ? 'label' : undefined
                    )}
                    class=${classMap(labelClasses)}
                >
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
                ${this.invalid && !this.pending
                    ? html`
                          <sp-icon-alert
                              class="validation-icon"
                          ></sp-icon-alert>
                      `
                    : nothing}
                ${this.pending
                    ? html`
                          ${this.renderLoader()}
                          <span
                              aria-hidden="true"
                              class="visually-hidden"
                              id="pending-label"
                          >
                              ${this.pendingLabel}
                          </span>
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

    applyFocusElementLabel = (
        value: string,
        labelElement: FieldLabel
    ): void => {
        this.appliedLabel = value;
        this.labelAlignment = labelElement.sideAligned ? 'inline' : undefined;
    };

    protected hasAccessibleLabel(): boolean {
        const slotContent =
            this.querySelector('[slot="label"]')?.textContent &&
            this.querySelector('[slot="label"]')?.textContent?.trim() !== '';
        const slotAlt =
            this.querySelector('[slot="label"]')?.getAttribute('alt')?.trim() &&
            this.querySelector('[slot="label"]')
                ?.getAttribute('alt')
                ?.trim() !== '';
        return (
            !!this.label ||
            !!this.getAttribute('aria-label') ||
            !!this.getAttribute('aria-labelledby') ||
            !!this.appliedLabel ||
            !!slotContent ||
            !!slotAlt
        );
    }

    protected warnNoLabel(): void {
        if (window.__swc?.DEBUG) {
            window.__swc.warn(
                this,
                `<${this.localName}> needs one of the following to be accessible:`,
                'https://opensource.adobe.com/spectrum-web-components/components/picker/#accessibility',
                {
                    type: 'accessibility',
                    issues: [
                        `an <sp-field-label> element with a \`for\` attribute referencing the \`id\` of the \`<${this.localName}>\`, or`,
                        'value supplied to the "label" attribute, which will be displayed visually as placeholder text, or',
                        'text content supplied in a <span> with slot="label", which will also be displayed visually as placeholder text.',
                    ],
                }
            );
        }
    }

    protected renderOverlay(menu: TemplateResult): TemplateResult {
        if (this.strategy?.overlay === undefined) {
            return menu;
        }
        const container = this.renderContainer(menu);
        render(container, this.strategy?.overlay as unknown as HTMLElement, {
            host: this,
        });
        return this.strategy?.overlay as unknown as TemplateResult;
    }

    protected get renderDescriptionSlot(): TemplateResult {
        return html`
            <div id=${DESCRIPTION_ID}>
                <slot name="description"></slot>
            </div>
        `;
    }
    // a helper to throw focus to the button is needed because Safari
    // won't include buttons in the tab order even with tabindex="0"
    protected override render(): TemplateResult {
        if (this.tooltipEl) {
            this.tooltipEl.disabled = this.open;
        }
        return html`
            <button
                aria-controls=${ifDefined(this.open ? 'menu' : undefined)}
                aria-describedby="tooltip ${DESCRIPTION_ID}"
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="true"
                aria-labelledby="icon label applied-label pending-label"
                id="button"
                class=${ifDefined(
                    this.labelAlignment
                        ? `label-${this.labelAlignment}`
                        : undefined
                )}
                @focus=${this.handleButtonFocus}
                @blur=${this.handleButtonBlur}
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                ?disabled=${this.disabled}
            >
                ${this.buttonContent}
            </button>
            <slot
                aria-hidden="true"
                name="tooltip"
                id="tooltip"
                @keydown=${this.handleKeydown}
                @slotchange=${this.handleTooltipSlotchange}
            ></slot>
            ${this.renderMenu} ${this.renderDescriptionSlot}
        `;
    }

    protected override willUpdate(changes: PropertyValues<this>): void {
        super.willUpdate(changes);
        if (changes.has('tabIndex') && !!this.tabIndex) {
            this.button.tabIndex = this.tabIndex;
            this.removeAttribute('tabindex');
        }
    }

    protected override update(changes: PropertyValues<this>): void {
        if (this.selects) {
            /**
             * Always force `selects` to "single" when set.
             *
             * @todo: Add support functionally and visually for "multiple"
             */
            this.selects = 'single';
        }
        if (changes.has('disabled') && this.disabled) {
            this.close();
        }
        if (changes.has('pending') && this.pending) {
            this.close();
        }
        if (changes.has('value')) {
            // MenuItems update a frame late for <slot> management,
            // await the same here.
            this.shouldScheduleManageSelection();
        }
        // Maybe it's finally time to remove this support?s
        if (!this.hasUpdated) {
            this.deprecatedMenu = this.querySelector(':scope > sp-menu');
            this.deprecatedMenu?.toggleAttribute('ignore', true);
            this.deprecatedMenu?.setAttribute('selects', 'inherit');
        }
        if (window.__swc?.DEBUG) {
            if (!this.hasUpdated && this.querySelector(':scope > sp-menu')) {
                const { localName } = this;
                window.__swc.warn(
                    this,
                    `You no longer need to provide an <sp-menu> child to ${localName}. Any styling or attributes on the <sp-menu> will be ignored.`,
                    'https://opensource.adobe.com/spectrum-web-components/components/picker/#sizes',
                    { level: 'deprecation' }
                );
            }
            this.updateComplete.then(async () => {
                // Attributes should be user supplied, making them available before first update.
                // However, `appliesLabel` is applied by external elements that must be update complete as well to be bound appropriately.
                await new Promise((res) => requestAnimationFrame(res));
                await new Promise((res) => requestAnimationFrame(res));
                if (!this.hasAccessibleLabel()) {
                    this.warnNoLabel();
                }
            });
        }
        super.update(changes);
    }

    protected bindButtonKeydownListener(): void {
        this.button.addEventListener('keydown', this.handleKeydown);
    }

    protected override updated(changes: PropertyValues<this>): void {
        super.updated(changes);
        if (changes.has('open')) {
            this.strategy.open = this.open;
        }
    }

    protected override firstUpdated(changes: PropertyValues<this>): void {
        super.firstUpdated(changes);
        this.bindButtonKeydownListener();
        this.bindEvents();
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
        if (this.isMobile.matches && !this.forcePopover) {
            this.dependencyManager.add('sp-tray');
            import('@spectrum-web-components/tray/sp-tray.js');
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
        this.dependencyManager.add('sp-popover');
        import('@spectrum-web-components/popover/sp-popover.js');
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

    protected hasRenderedOverlay = false;

    private onScroll(): void {
        this.dispatchEvent(
            new Event('scroll', {
                cancelable: true,
                composed: true,
            })
        );
    }

    protected get renderMenu(): TemplateResult {
        const menu = html`
            <sp-menu
                aria-labelledby="applied-label"
                @change=${this.handleChange}
                id="menu"
                @keydown=${{
                    handleEvent: this.handleEnterKeydown,
                    capture: true,
                }}
                @scroll=${this.onScroll}
                role=${this.listRole}
                .selects=${this.selects}
                .selected=${this.value ? [this.value] : []}
                .shouldSupportDragAndSelect=${!this.isTouchDevice.matches}
                size=${this.size}
                @sp-menu-item-keydown=${this.handleEscape}
                @sp-menu-item-added-or-updated=${this.shouldManageSelection}
            >
                <slot @slotchange=${this.shouldScheduleManageSelection}></slot>
            </sp-menu>
        `;
        this.hasRenderedOverlay =
            this.hasRenderedOverlay ||
            this.focused ||
            this.open ||
            !!this.deprecatedMenu;
        if (this.hasRenderedOverlay) {
            if (this.dependencyManager.loaded) {
                this.dependencyManager.add('sp-overlay');
            }
            return this.renderOverlay(menu);
        }
        return menu;
    }

    /**
     * whether a selection change is already scheduled
     */
    public willManageSelection = false;

    /**
     * when the value changes or the menu slot changes, manage the selection on the next frame, if not already scheduled
     * @param event
     */
    protected shouldScheduleManageSelection(event?: Event): void {
        if (
            !this.willManageSelection &&
            (!event ||
                ((event.target as HTMLElement).getRootNode() as ShadowRoot)
                    .host === this)
        ) {
            //s set a flag to manage selection on the next frame
            this.willManageSelection = true;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.manageSelection();
                });
            });
        }
    }

    /**
     * when an item is added or updated, manage the selection, if it's not already scheduled
     */
    protected shouldManageSelection(): void {
        if (this.willManageSelection) {
            return;
        }
        this.willManageSelection = true;
        this.manageSelection();
    }

    /**
     * updates menu selection based on value
     */
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
            // Only clear value when items exist with real values but none match.
            // Preserve value if items are pending (lazy loaded, async render, incomplete upgrade).
            const hasItemsWithValues = this.menuItems.some(
                (item) =>
                    item.value != null || item.getAttribute?.('value') != null
            );
            if (this.menuItems.length > 0 && hasItemsWithValues) {
                this.value = '';
                this.selectedItem = undefined;
            }
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
        // if (this.overlayElement) {
        //     await this.overlayElement.updateComplete;
        // }
        return complete;
    }

    private recentlyConnected = false;

    private enterKeydownOn: EventTarget | null = null;

    protected handleEnterKeydown = (event: KeyboardEvent): void => {
        if (event.key !== 'Enter') {
            return;
        }
        const target = event?.target as MenuItem;
        if (!target.open && target.hasSubmenu) {
            event.preventDefault();
            return;
        }

        if (this.enterKeydownOn) {
            event.preventDefault();
            return;
        }
        this.enterKeydownOn = event.target;
        this.addEventListener(
            'keyup',
            async (keyupEvent: KeyboardEvent) => {
                if (keyupEvent.key !== 'Enter') {
                    return;
                }
                this.enterKeydownOn = null;
            },
            { once: true }
        );
    };

    public bindEvents(): void {
        this.strategy?.abort();
        if (this.isMobile.matches) {
            this.strategy = new strategies['mobile'](this.button, this);
        } else {
            this.strategy = new strategies['desktop'](this.button, this);
        }
    }

    public override connectedCallback(): void {
        super.connectedCallback();
        this.updateComplete.then(() => {
            if (!this.tooltipEl?.selfManaged) {
                return;
            }
            const overlayElement = this.tooltipEl.overlayElement;
            if (overlayElement) {
                overlayElement.triggerElement = this.button;
            }
        });

        this.recentlyConnected = this.hasUpdated;
        this.addEventListener('focus', this.handleFocus);
    }

    public override disconnectedCallback(): void {
        this.close();
        this.strategy?.releaseDescription();
        super.disconnectedCallback();
    }
}

/**
 * @element sp-picker
 *
 * @slot label - The placeholder content for the Picker
 * @slot description - The description content for the Picker
 * @slot tooltip - Tooltip to to be applied to the the Picker Button
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
        const { key } = event;
        const handledKeys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'Enter',
            ' ',
            'Escape',
        ].includes(key);
        const openKeys = ['ArrowUp', 'ArrowDown', 'Enter', ' '].includes(key);
        const arrowKeys = [
            'ArrowUp',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ].includes(key);
        this.focused = true;
        if ('Escape' === key) {
            this.handleEscape(event);
            return;
        }
        if (!handledKeys || this.readonly || this.pending) {
            return;
        }
        if (openKeys) {
            this.keyboardOpen();
            event.preventDefault();
            if (arrowKeys) {
                event.stopPropagation();
            }
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const nextItem = this.optionsMenu?.getNeighboringFocusableElement(
            this.selectedItem,
            key === 'ArrowLeft'
        );
        if (!this.value || nextItem !== this.selectedItem) {
            // updates picker text but does not fire change event until action is completed
            if (nextItem) this.setValueFromItem(nextItem as MenuItem);
        }
    };
}
