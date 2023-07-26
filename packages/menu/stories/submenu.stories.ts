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

import { html, TemplateResult } from '@spectrum-web-components/base';

import '@spectrum-web-components/action-menu/sp-action-menu.js';
import '@spectrum-web-components/menu/sp-menu.js';
import '@spectrum-web-components/menu/sp-menu-item.js';
import '@spectrum-web-components/menu/sp-menu-divider.js';
import '@spectrum-web-components/menu/sp-menu-group.js';
import { Overlay, VirtualTrigger } from '@spectrum-web-components/overlay';
import '@spectrum-web-components/popover/sp-popover.js';
import '@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js';
import type { ActionMenu } from '@spectrum-web-components/action-menu';
import type { Menu, MenuItem } from '@spectrum-web-components/menu';

export default {
    component: 'sp-menu',
    title: 'Menu/Submenu',
};

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

class SubmenuReady extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    menu!: ActionMenu;
    submenu!: MenuItem;
    submenuChild!: MenuItem;

    async setup(): Promise<void> {
        await nextFrame();

        this.menu = document.querySelector(`sp-action-menu`) as ActionMenu;
        this.menu.addEventListener('sp-opened', this.handleMenuOpened);
        this.menu.open = true;
    }

    handleMenuOpened = async (event: Event): Promise<void> => {
        this.menu.removeEventListener('sp-opened', this.handleMenuOpened);
        await nextFrame();
        await (event.target as ActionMenu).updateComplete;

        this.submenu = document.querySelector('#submenu-item-1') as MenuItem;
        if (!this.submenu) {
            return;
        }

        this.submenu.addEventListener('sp-opened', this.handleSubmenuOpened);
        this.submenu.click();
    };

    handleSubmenuOpened = async (event: Event): Promise<void> => {
        this.submenu.removeEventListener('sp-opened', this.handleSubmenuOpened);
        await nextFrame();
        await (event.target as MenuItem).updateComplete;

        this.submenuChild = document.querySelector(
            '#submenu-item-2'
        ) as MenuItem;
        if (!this.submenuChild) {
            return;
        }
        this.submenuChild.addEventListener(
            'sp-opened',
            this.handleSubmenuChildOpened
        );
        this.submenuChild.click();
    };

    handleSubmenuChildOpened = async (event: Event): Promise<void> => {
        this.submenuChild.removeEventListener(
            'sp-opened',
            this.handleSubmenuChildOpened
        );
        await nextFrame();
        await (event.target as MenuItem).updateComplete;

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }
}

customElements.define('submenu-ready', SubmenuReady);

const submenuDecorator = (story: () => TemplateResult): TemplateResult => {
    return html`
        ${story()}
        <submenu-ready></submenu-ready>
    `;
};

export const submenu = (): TemplateResult => {
    const getValueEls = (): {
        root: HTMLElement;
        first: HTMLElement;
        second: HTMLElement;
    } => {
        return {
            root: document.querySelector('#root-value') as HTMLElement,
            first: document.querySelector('#first-value') as HTMLElement,
            second: document.querySelector('#second-value') as HTMLElement,
        };
    };
    const clearValues = (): void => {
        const valueEls = getValueEls();
        valueEls.root.textContent = '';
        valueEls.first.textContent = '';
        valueEls.second.textContent = '';
    };
    const handleRootChange = (event: Event & { target: ActionMenu }): void => {
        const valueEls = getValueEls();
        valueEls.root.textContent = event.target.value;
    };
    const handleFirstDescendantChange = (
        event: Event & { target: Menu }
    ): void => {
        const valueEls = getValueEls();
        valueEls.first.textContent = event.target.selected[0] || '';
    };
    const handleSecondDescendantChange = (
        event: Event & { target: Menu }
    ): void => {
        const valueEls = getValueEls();
        valueEls.second.textContent = event.target.selected[0] || '';
    };
    return html`
        <sp-action-menu @change=${handleRootChange} @sp-opened=${clearValues}>
            <sp-icon-show-menu slot="icon"></sp-icon-show-menu>
            <sp-menu-group
                @change=${() => console.log('group change')}
                role="none"
            >
                <span slot="header">New York</span>
                <sp-menu-item>Bronx</sp-menu-item>
                <sp-menu-item id="submenu-item-1">
                    Brooklyn
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item id="submenu-item-2">
                            Ft. Greene
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>S. Oxford St</sp-menu-item>
                                <sp-menu-item>S. Portland Ave</sp-menu-item>
                                <sp-menu-item>S. Elliot Pl</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item disabled>Park Slope</sp-menu-item>
                        <sp-menu-item>Williamsburg</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
                <sp-menu-item>
                    Manhattan
                    <sp-menu
                        slot="submenu"
                        @change=${handleFirstDescendantChange}
                    >
                        <sp-menu-item disabled>SoHo</sp-menu-item>
                        <sp-menu-item>
                            Union Square
                            <sp-menu
                                slot="submenu"
                                @change=${handleSecondDescendantChange}
                            >
                                <sp-menu-item>14th St</sp-menu-item>
                                <sp-menu-item>Broadway</sp-menu-item>
                                <sp-menu-item>Park Ave</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>Upper East Side</sp-menu-item>
                    </sp-menu>
                </sp-menu-item>
            </sp-menu-group>
        </sp-action-menu>
        <div>
            Root value:
            <span id="root-value"></span>
            <br />
            First descendant value:
            <span id="first-value"></span>
            <br />
            Second descendant value:
            <span id="second-value"></span>
            <br />
        </div>
    `;
};

submenu.decorators = [submenuDecorator];

export const contextMenu = (): TemplateResult => {
    const contextmenu = async (event: PointerEvent): Promise<void> => {
        event.preventDefault();
        const virtualTrigger = new VirtualTrigger(event.clientX, event.clientY);
        const overlay = document.querySelector('sp-overlay') as Overlay;
        clearValues();
        overlay.triggerElement = virtualTrigger;
        overlay.willPreventClose = true;
        overlay.type = 'auto';
        overlay.placement = 'right-start';
        overlay.open = true;
    };
    const getValueEls = (): { root: HTMLElement; first: HTMLElement } => {
        return {
            root: document.querySelector('#root-value') as HTMLElement,
            first: document.querySelector('#first-value') as HTMLElement,
        };
    };
    const clearValues = (): void => {
        const valueEls = getValueEls();
        valueEls.root.textContent = '';
        valueEls.first.textContent = '';
    };
    const handleRootChange = (event: Event & { target: ActionMenu }): void => {
        const valueEls = getValueEls();
        valueEls.root.textContent = event.target.value;
        event.target.parentElement?.dispatchEvent(
            new Event('close', { bubbles: true })
        );
    };
    const handleFirstDescendantChange = (
        event: Event & { target: Menu }
    ): void => {
        const valueEls = getValueEls();
        valueEls.first.textContent = event.target.selected[0] || '';
    };
    return html`
        <style>
            .app-root {
                position: absolute;
                inset: 0;
            }
            active-overlay::part(theme) {
                --swc-menu-width: 200px;
            }
        </style>
        <div class="app-root" @contextmenu=${contextmenu}>
            <div>
                Root value:
                <span id="root-value"></span>
                <br />
                First descendant value:
                <span id="first-value"></span>
                <br />
            </div>
        </div>
        <sp-overlay>
            <sp-popover
                style="max-width: 33vw;"
                @click=${(event: Event) =>
                    event.target?.dispatchEvent(
                        new Event('close', { bubbles: true })
                    )}
            >
                <sp-menu @change=${handleRootChange}>
                    <sp-menu-group>
                        <span slot="header">Options</span>
                        <sp-menu-item>
                            Copy
                            <span slot="value">⌘​S</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Paste
                            <span slot="value">⌘​P</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Cut
                            <span slot="value">⌘​X</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Select layer
                            <sp-menu
                                slot="submenu"
                                selects="single"
                                @change=${handleFirstDescendantChange}
                            >
                                <sp-menu-item selected>Ellipse 1</sp-menu-item>
                                <sp-menu-item>Rectangle</sp-menu-item>
                            </sp-menu>
                        </sp-menu-item>
                        <sp-menu-item>
                            Group
                            <span slot="value">⌘​G</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Unlock
                            <span slot="value">⌘​L</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Bring to front
                            <span slot="value">⇧​⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Bring forward
                            <span slot="value">⌘​​]</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send backward
                            <span slot="value">⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-item>
                            Send to back
                            <span slot="value">⇧​⌘​​[</span>
                        </sp-menu-item>
                        <sp-menu-divider></sp-menu-divider>
                        <sp-menu-item>
                            Delete
                            <span slot="value">DEL</span>
                        </sp-menu-item>
                    </sp-menu-group>
                </sp-menu>
            </sp-popover>
        </sp-overlay>
    `;
};
