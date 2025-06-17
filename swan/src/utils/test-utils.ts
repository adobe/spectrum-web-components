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
import { ElementPart, html, Part, TemplateResult } from 'lit';
import { nothing } from 'lit/html.js';
import { AsyncDirective, directive } from 'lit/async-directive.js';
import { Overlay } from '@spectrum-web-components/overlay';

type EventListenerWithOptions = EventListenerOrEventListenerObject &
    Partial<AddEventListenerOptions>;

/**
 * Usage:
 *    import { html, render } from 'lit-html';
 *    import { spread } from '@open-wc/lit-helpers';
 *
 *    render(
 *      html`
 *        <div
 *          ${spread({
 *            'my-attribute': 'foo',
 *            '?my-boolean-attribute': true,
 *            '.myProperty': { foo: 'bar' },
 *            '@my-event': () => console.log('my-event fired'),
 *          })}
 *        ></div>
 *      `,
 *      document.body,
 *    );
 *
 * @TODO: replace this with a lit-native directive once one is released: https://github.com/lit/lit/pull/1960
 */
class SpreadDirective extends AsyncDirective {
    host!: EventTarget | object | Element;
    element!: Element;
    prevData: { [key: string]: unknown } = {};

    render(_spreadData: { [key: string]: unknown }) {
        return nothing;
    }
    override update(part: Part, [spreadData]: Parameters<this['render']>) {
        if (this.element !== (part as ElementPart).element) {
            this.element = (part as ElementPart).element;
        }
        this.host = part.options?.host || this.element;
        this.apply(spreadData);
        this.groom(spreadData);
        this.prevData = spreadData;
    }

    apply(data: { [key: string]: unknown }) {
        if (!data) return;
        const { prevData, element } = this;
        for (const key in data) {
            const value = data[key];
            if (value === prevData[key]) {
                continue;
            }
            const name = key.slice(1);
            switch (key[0]) {
                case '@': // event listener
                    const prevHandler = prevData[key];
                    if (prevHandler) {
                        element.removeEventListener(
                            name,
                            this,
                            value as EventListenerWithOptions
                        );
                    }
                    element.addEventListener(
                        name,
                        this,
                        value as EventListenerWithOptions
                    );
                    break;
                case '.': // property
                    // @ts-ignore
                    element[name] = value;
                    break;
                case '?': // boolean attribute
                    if (value) {
                        element.setAttribute(name, '');
                    } else {
                        element.removeAttribute(name);
                    }
                    break;
                default:
                    // standard attribute
                    if (value != null) {
                        element.setAttribute(key, String(value));
                    } else {
                        element.removeAttribute(key);
                    }
                    break;
            }
        }
    }

    groom(data: { [key: string]: unknown }) {
        const { prevData, element } = this;
        if (!prevData) return;
        for (const key in prevData) {
            if (!data || !(key in data)) {
                switch (key[0]) {
                    case '@': // event listener
                        const value = prevData[key];
                        element.removeEventListener(
                            key.slice(1),
                            this,
                            value as EventListenerWithOptions
                        );
                        break;
                    case '.': // property
                        // @ts-ignore
                        element[key.slice(1)] = undefined;
                        break;
                    case '?': // boolean attribute
                        element.removeAttribute(key.slice(1));
                        break;
                    default:
                        // standard attribute
                        element.removeAttribute(key);
                        break;
                }
            }
        }
    }

    handleEvent(event: Event) {
        const value: Function | EventListenerObject = this.prevData[
            `@${event.type}`
        ] as Function | EventListenerObject;
        if (typeof value === 'function') {
            (value as Function).call(this.host, event);
        } else {
            (value as EventListenerObject).handleEvent(event);
        }
    }

    override disconnected() {
        const { prevData, element } = this;
        for (const key in prevData) {
            if (key[0] !== '@') continue;
            // event listener
            const value = prevData[key];
            element.removeEventListener(
                key.slice(1),
                this,
                value as EventListenerWithOptions
            );
        }
    }

    override reconnected() {
        const { prevData, element } = this;
        for (const key in prevData) {
            if (key[0] !== '@') continue;
            // event listener
            const value = prevData[key];
            element.addEventListener(
                key.slice(1),
                this,
                value as EventListenerWithOptions
            );
        }
    }
}

export const spread = directive(SpreadDirective);

class SpreadPropsDirective extends AsyncDirective {
    host!: EventTarget | object | Element;
    element!: Element;
    prevData: { [key: string]: unknown } = {};

    render(_spreadData: { [key: string]: unknown }) {
        return nothing;
    }
    override update(part: Part, [spreadData]: Parameters<this['render']>) {
        if (this.element !== (part as ElementPart).element) {
            this.element = (part as ElementPart).element;
        }
        this.host = part.options?.host || this.element;
        this.apply(spreadData);
        this.groom(spreadData);
        this.prevData = spreadData;
    }

    apply(data: { [key: string]: unknown }) {
        if (!data) return;
        const { prevData, element } = this;
        for (const key in data) {
            const value = data[key];
            if (value === prevData[key]) {
                continue;
            }
            // @ts-ignore
            element[key] = value;
        }
    }

    groom(data: { [key: string]: unknown }) {
        const { prevData, element } = this;
        if (!prevData) return;
        for (const key in prevData) {
            if (!data || !(key in data)) {
                // @ts-ignore
                element[key] = undefined;
            }
        }
    }
}

export const spreadProps = directive(SpreadPropsDirective);

class AreIconsPresent extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        await nextFrame();
        // First, wait for the overlay to open
        document.addEventListener('sp-opened', this.handleOpened);
    }

    private overlayTimeout: ReturnType<typeof setTimeout> | null = null;

    private sendFocus = async (): Promise<void> => {
        const selectedItem = document
            .querySelector('[focusable]')
            ?.querySelector('[selected]') as HTMLElement & {
            focused?: boolean;
        };

        if (selectedItem) {
            selectedItem.focus();
            selectedItem.focused = true;

            // scroll the selected item into view with block start alignment to ensure consistent behavior in VRTs
            await nextFrame();
            selectedItem.scrollIntoView({ block: 'start' });
            await nextFrame();
        }
    };

    handleOpened = async (event: Event): Promise<void> => {
        // Clear the timeout since overlay opened
        if (this.overlayTimeout) {
            clearTimeout(this.overlayTimeout);
            this.overlayTimeout = null;
        }

        const overlay = event.target as Overlay;
        const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];

        await Promise.all(actions);
        // Focus happens _after_ `sp-opened` by at least two frames.
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        this.checkIcons();
    };

    private checkIcons = async (): Promise<void> => {
        const icons = [...document.querySelectorAll('sp-icon')];

        // there is an icon inside the picker also
        const picker = document.querySelector('sp-picker');
        if (picker) {
            const pickerIcon = picker.querySelector('sp-icon');
            if (pickerIcon) {
                icons.push(pickerIcon);
            }
        }

        // Create an array of promises for each icon to load
        const iconLoadPromises = Array.from(icons).map((icon) => {
            return new Promise<void>((resolve) => {
                // First check if the icon has an updateComplete promise we can use
                if (
                    'updateComplete' in icon &&
                    typeof icon.updateComplete?.then === 'function'
                ) {
                    icon.updateComplete.then(() => {
                        resolve();
                    });
                    return;
                }

                // Check if the icon has a src attribute
                const src = icon.getAttribute('src');
                if (!src) {
                    // No src, check if it has an internal img element
                    const imgElement = icon.querySelector('img');
                    if (imgElement) {
                        if (imgElement.complete) {
                            // Image is already loaded
                            resolve();
                        } else {
                            // Wait for the image to load
                            imgElement.addEventListener(
                                'load',
                                () => {
                                    resolve();
                                },
                                { once: true }
                            );
                            imgElement.addEventListener(
                                'error',
                                () => {
                                    console.warn(`Failed to load icon image`);
                                    resolve();
                                },
                                { once: true }
                            );
                        }
                        return;
                    }

                    // No src and no img element, resolve immediately
                    resolve();
                    return;
                }

                // For icons with src attribute, check if there's an internal img element first
                const imgElement = icon.querySelector('img');
                if (imgElement) {
                    if (imgElement.complete) {
                        // Image is already loaded
                        resolve();
                    } else {
                        // Wait for the image to load
                        imgElement.addEventListener(
                            'load',
                            () => {
                                resolve();
                            },
                            { once: true }
                        );
                        imgElement.addEventListener(
                            'error',
                            () => {
                                console.warn(
                                    `Failed to load icon image: ${src}`
                                );
                                resolve();
                            },
                            { once: true }
                        );
                    }
                    return;
                }

                // Fallback to creating a new Image instance
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => {
                    console.warn(`Failed to load icon: ${src}`);
                    resolve();
                };
                img.src = src;
            });
        });

        // Wait for all icons to load
        await Promise.all(iconLoadPromises);
        await nextFrame();

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }

    // remove event listeners in disconnectCallback
    disconnectedCallback(): void {
        document.removeEventListener('sp-opened', this.handleOpened);
    }
}

customElements.define('are-icons-present', AreIconsPresent);

function nextFrame(): Promise<void> {
    return new Promise((res) => requestAnimationFrame(() => res()));
}

class IsOverlayOpen extends HTMLElement {
    ready!: (value: boolean | PromiseLike<boolean>) => void;

    constructor() {
        super();
        this.readyPromise = new Promise((res) => {
            this.ready = res;
            this.setup();
        });
    }

    async setup(): Promise<void> {
        await nextFrame();
        document.addEventListener('sp-opened', this.handleOpened);
    }

    private sendFocus = async (): Promise<void> => {
        const selectedItem = document
            .querySelector('[focusable]')
            ?.querySelector('[selected]') as HTMLElement & {
            focused?: boolean;
        };

        if (selectedItem) {
            selectedItem.focus();
            selectedItem.focused = true;

            // scroll the selected item into view with block start alignment to ensure consistent behavior in VRTs
            await nextFrame();
            selectedItem.scrollIntoView({ block: 'start' });
            await nextFrame();
        }
    };

    handleOpened = async (event: Event): Promise<void> => {
        const overlay = event.target as Overlay;
        const actions = [nextFrame(), overlay.updateComplete, this.sendFocus()];

        await Promise.all(actions);
        // Focus happens _after_ `sp-opened` by at least two frames.
        await nextFrame();
        await nextFrame();
        await nextFrame();
        await nextFrame();

        this.ready(true);
    };

    private readyPromise: Promise<boolean> = Promise.resolve(false);

    get updateComplete(): Promise<boolean> {
        return this.readyPromise;
    }

    // remove event listeners in disconnectCallback
    disconnectedCallback(): void {
        document.removeEventListener('sp-opened', this.handleOpened);
    }
}

customElements.define('is-overlay-open', IsOverlayOpen);

export const isOverlayOpen = (story: () => TemplateResult): TemplateResult => {
    return html`
        ${story()}
        <is-overlay-open></is-overlay-open>
    `;
};
export const areIconsPresent = (
    story: () => TemplateResult
): TemplateResult => {
    return html`
        ${story()}
        <are-icons-present></are-icons-present>
    `;
};
