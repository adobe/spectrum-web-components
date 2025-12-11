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

import { querySelectorDeep } from 'query-selector-shadow-dom';
import {
    computeAccessibleDescription,
    computeAccessibleName,
} from 'dom-accessibility-api';
import { elementRoles } from 'aria-query';

type RoleAnnouncementFn = () => string;

interface ElementRoleKey {
    name: string;
    attributes?: Array<{ name: string; value?: string }>;
}

/**
 * Dispatch text change event to the addon panel
 */
function dispatchTextChanged(text: string): void {
    const customEvent = new CustomEvent('screen-reader-text-changed', {
        detail: { text },
    });
    window.dispatchEvent(customEvent);
}

/**
 * Get the implicit ARIA role for an element using aria-query
 */
function getImplicitRole(element: Element): string | null {
    if (!element || !element.tagName) {
        return null;
    }

    const tagName = element.tagName.toLowerCase();

    // Check aria-query's elementRoles map
    // elementRoles is a Map where keys are objects like { name: 'button' }
    for (const [key, roleSet] of elementRoles) {
        const roleKey = key as ElementRoleKey;
        if (roleKey.name === tagName) {
            // Check if attributes match (for elements like input with type)
            if (roleKey.attributes) {
                const matches = roleKey.attributes.every((attr) => {
                    if (attr.name === 'type') {
                        return element.getAttribute('type') === attr.value;
                    }
                    return (
                        element.hasAttribute(attr.name) ===
                        (attr.value !== undefined)
                    );
                });
                if (matches && roleSet.size > 0) {
                    return Array.from(roleSet)[0] as string;
                }
            } else if (roleSet.size > 0) {
                return Array.from(roleSet)[0] as string;
            }
        }
    }

    return null;
}

/**
 * Screen Reader class that simulates screen reader behavior
 * Uses dom-accessibility-api for W3C-compliant accessible name computation
 */
export default class ScreenReader {
    isRunning = false;
    voiceEnabled = false;
    textEnabled = false;
    private storyDocument: Document | null = null;
    private lastAnnouncedElement: Element | null = null;

    // Bound handlers for proper cleanup
    private handleFocusIn: (event: FocusEvent) => void;
    private handleKeyDown: (event: KeyboardEvent) => void;
    private handleMutation: (mutations: MutationRecord[]) => void;

    private mutationObserver: MutationObserver | null = null;
    private liveRegionObserver: MutationObserver | null = null;

    constructor() {
        this.handleFocusIn = this.onFocusIn.bind(this);
        this.handleKeyDown = this.onKeyDown.bind(this);
        this.handleMutation = this.onMutation.bind(this);
    }

    /**
     * Compute the accessible role for an element
     * Priority: explicit role > implicit role from aria-query > fallback mapping
     */
    computeRole(element: Element | null): string {
        if (!element) {
            return 'element';
        }

        // 1. Check explicit ARIA role
        const explicitRole = element.getAttribute('role');
        if (explicitRole) {
            return explicitRole;
        }

        // 2. Try to get implicit role from aria-query
        const implicitRole = getImplicitRole(element);
        if (implicitRole) {
            return implicitRole;
        }

        // 3. Fallback mapping for common elements
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const fallbackMappings: Record<string, string> = {
            a: element.hasAttribute('href') ? 'link' : 'generic',
            button: 'button',
            input: this.getInputRole(element as HTMLInputElement),
            select: 'combobox',
            textarea: 'textbox',
            h1: 'heading',
            h2: 'heading',
            h3: 'heading',
            h4: 'heading',
            h5: 'heading',
            h6: 'heading',
            p: 'paragraph',
            img: 'img',
            nav: 'navigation',
            main: 'main',
            aside: 'complementary',
            header: 'banner',
            footer: 'contentinfo',
            li: 'listitem',
            ul: 'list',
            ol: 'list',
            table: 'table',
            details: 'group',
            summary: 'button',
            label: 'generic',
            section:
                element.hasAttribute('aria-label') ||
                element.hasAttribute('aria-labelledby')
                    ? 'region'
                    : 'generic',
            article: 'article',
            form: 'form',
            dialog: 'dialog',
        };

        return fallbackMappings[tagName] || 'generic';
    }

    /**
     * Get role for input elements based on type
     */
    getInputRole(element: HTMLInputElement): string {
        const type = (element.getAttribute('type') || 'text').toLowerCase();
        const inputRoles: Record<string, string> = {
            checkbox: 'checkbox',
            radio: 'radio',
            button: 'button',
            submit: 'button',
            reset: 'button',
            image: 'button',
            range: 'slider',
            search: 'searchbox',
            email: 'textbox',
            tel: 'textbox',
            url: 'textbox',
            number: 'spinbutton',
            password: 'textbox',
            text: 'textbox',
        };
        return inputRoles[type] || 'textbox';
    }

    /**
     * Get accessible name using dom-accessibility-api (W3C AccName spec)
     */
    getAccessibleName(element: Element | null): string {
        if (!element) {
            return '';
        }

        try {
            return computeAccessibleName(element, {
                // Compute name even for elements that normally wouldn't have one
                computedStyleSupportsPseudoElements: true,
            });
        } catch {
            // Fallback for Shadow DOM elements that might not work with the library
            if (element.getAttribute('aria-label')) {
                return element.getAttribute('aria-label') || '';
            }
            if ((element as Element & { shadowRoot: ShadowRoot }).shadowRoot) {
                const slot = (
                    element as Element & { shadowRoot: ShadowRoot }
                ).shadowRoot.querySelector('slot');
                if (slot) {
                    const nodes = (slot as HTMLSlotElement).assignedNodes({
                        flatten: true,
                    });
                    return nodes
                        .map((n) => n.textContent || '')
                        .join('')
                        .trim();
                }
            }
            return (element.textContent || '').trim();
        }
    }

    /**
     * Get accessible description using dom-accessibility-api
     */
    getAccessibleDescription(element: Element | null): string {
        if (!element) {
            return '';
        }

        try {
            return computeAccessibleDescription(element);
        } catch {
            return '';
        }
    }

    /**
     * Generate announcement for an element based on its role and state
     */
    announceElement(element: Element | null): void {
        if (!element || element === this.lastAnnouncedElement) {
            return;
        }

        this.lastAnnouncedElement = element;

        const role = this.computeRole(element);
        const name = this.getAccessibleName(element);
        const description = this.getAccessibleDescription(element);

        // Build the announcement based on role
        let announcement = this.buildRoleAnnouncement(element, role, name);

        // Add description if available
        if (description) {
            announcement += ` ${description}`;
        }

        if (announcement) {
            this.say(announcement);
        }
    }

    /**
     * Build announcement string based on role
     */
    buildRoleAnnouncement(
        element: Element,
        role: string,
        name: string
    ): string {
        const announcements: Record<string, RoleAnnouncementFn> = {
            link: () => {
                const visited = element.matches(':visited') ? 'visited ' : '';
                return `${visited}Link, ${name || 'unlabeled'}. Press Enter to follow.`;
            },
            button: () => {
                const pressed = element.getAttribute('aria-pressed');
                const expanded = element.getAttribute('aria-expanded');
                let state = '';
                if (pressed === 'true') {
                    state = ', pressed';
                } else if (pressed === 'false') {
                    state = ', not pressed';
                }
                if (expanded === 'true') {
                    state += ', expanded';
                } else if (expanded === 'false') {
                    state += ', collapsed';
                }
                return `Button, ${name || 'unlabeled'}${state}. Press Space or Enter to activate.`;
            },
            checkbox: () => {
                const inputElement = element as HTMLInputElement;
                const checked =
                    inputElement.checked ||
                    element.getAttribute('aria-checked') === 'true';
                const mixed = element.getAttribute('aria-checked') === 'mixed';
                const state = mixed
                    ? 'partially checked'
                    : checked
                      ? 'checked'
                      : 'not checked';
                return `Checkbox, ${name || 'unlabeled'}, ${state}. Press Space to toggle.`;
            },
            radio: () => {
                const inputElement = element as HTMLInputElement;
                const checked =
                    inputElement.checked ||
                    element.getAttribute('aria-checked') === 'true';
                return `Radio button, ${name || 'unlabeled'}, ${checked ? 'selected' : 'not selected'}.`;
            },
            switch: () => {
                const inputElement = element as HTMLInputElement;
                const checked =
                    element.getAttribute('aria-checked') === 'true' ||
                    inputElement.checked;
                return `Switch, ${name || 'unlabeled'}, ${checked ? 'on' : 'off'}. Press Space to toggle.`;
            },
            textbox: () => {
                const inputElement = element as HTMLInputElement;
                const value = inputElement.value || '';
                const required =
                    element.hasAttribute('required') ||
                    element.getAttribute('aria-required') === 'true';
                const invalid = element.getAttribute('aria-invalid') === 'true';
                const readonly =
                    element.hasAttribute('readonly') ||
                    element.getAttribute('aria-readonly') === 'true';
                let state = '';
                if (required) {
                    state += ', required';
                }
                if (invalid) {
                    state += ', invalid entry';
                }
                if (readonly) {
                    state += ', read only';
                }
                return `Text field, ${name || 'unlabeled'}${state}. ${value ? `Contains: ${value}` : 'Empty.'}`;
            },
            searchbox: () => {
                const inputElement = element as HTMLInputElement;
                const value = inputElement.value || '';
                return `Search field, ${name || 'unlabeled'}. ${value ? `Contains: ${value}` : 'Empty.'}`;
            },
            combobox: () => {
                const expanded =
                    element.getAttribute('aria-expanded') === 'true';
                const selectElement = element as HTMLSelectElement;
                const value =
                    (element as HTMLInputElement).value ||
                    selectElement.options?.[selectElement.selectedIndex]
                        ?.text ||
                    '';
                return `Combo box, ${name || 'unlabeled'}, ${expanded ? 'expanded' : 'collapsed'}. ${value ? `Selected: ${value}` : ''} Press Space to open.`;
            },
            listbox: () => {
                const expanded = element.getAttribute('aria-expanded');
                let state = '';
                if (expanded === 'true') {
                    state = ', expanded';
                } else if (expanded === 'false') {
                    state = ', collapsed';
                }
                return `List box, ${name || 'unlabeled'}${state}.`;
            },
            slider: () => {
                const inputElement = element as HTMLInputElement;
                const value =
                    inputElement.value ||
                    element.getAttribute('aria-valuenow') ||
                    '';
                const min =
                    inputElement.min ||
                    element.getAttribute('aria-valuemin') ||
                    '0';
                const max =
                    inputElement.max ||
                    element.getAttribute('aria-valuemax') ||
                    '100';
                const valueText =
                    element.getAttribute('aria-valuetext') || value;
                return `Slider, ${name || 'unlabeled'}. Value: ${valueText}. Range: ${min} to ${max}.`;
            },
            spinbutton: () => {
                const inputElement = element as HTMLInputElement;
                const value =
                    inputElement.value ||
                    element.getAttribute('aria-valuenow') ||
                    '';
                return `Spin button, ${name || 'unlabeled'}. Value: ${value}. Use arrow keys to adjust.`;
            },
            heading: () => {
                const level =
                    element.getAttribute('aria-level') ||
                    (element.tagName
                        ? element.tagName.match(/h(\d)/i)?.[1]
                        : null) ||
                    '2';
                return `Heading level ${level}, ${name}`;
            },
            img: () => {
                if (!name && element.getAttribute('alt') === '') {
                    return ''; // Decorative image, don't announce
                }
                return `Image, ${name || 'no description'}`;
            },
            figure: () => `Figure, ${name || ''}`,
            listitem: () => {
                const list = element.closest('ol, ul, [role="list"]');
                const items = list
                    ? list.querySelectorAll('li, [role="listitem"]')
                    : [];
                const index = Array.from(items).indexOf(element) + 1;
                const total = items.length;
                return `${name}. List item ${index} of ${total}.`;
            },
            option: () => {
                const optionElement = element as HTMLOptionElement;
                const selected =
                    element.getAttribute('aria-selected') === 'true' ||
                    optionElement.selected;
                const list = element.closest('[role="listbox"], select');
                const options = list
                    ? list.querySelectorAll('[role="option"], option')
                    : [];
                const index = Array.from(options).indexOf(element) + 1;
                return `${name}${selected ? ', selected' : ''}. Option ${index} of ${options.length}.`;
            },
            menuitem: () => `Menu item, ${name}`,
            menuitemcheckbox: () => {
                const checked = element.getAttribute('aria-checked') === 'true';
                return `Menu item checkbox, ${name}, ${checked ? 'checked' : 'not checked'}`;
            },
            menuitemradio: () => {
                const checked = element.getAttribute('aria-checked') === 'true';
                return `Menu item radio, ${name}, ${checked ? 'selected' : 'not selected'}`;
            },
            tab: () => {
                const selected =
                    element.getAttribute('aria-selected') === 'true';
                const tablist = element.closest('[role="tablist"]');
                const tabs = tablist
                    ? tablist.querySelectorAll('[role="tab"]')
                    : [];
                const index = Array.from(tabs).indexOf(element) + 1;
                return `Tab, ${name}${selected ? ', selected' : ''}. ${index} of ${tabs.length}.`;
            },
            tabpanel: () => `Tab panel, ${name}`,
            navigation: () => `Navigation${name ? `, ${name}` : ''}`,
            main: () => `Main content${name ? `, ${name}` : ''}`,
            banner: () => `Banner${name ? `, ${name}` : ''}`,
            contentinfo: () => `Content info${name ? `, ${name}` : ''}`,
            complementary: () => `Complementary${name ? `, ${name}` : ''}`,
            region: () => `Region, ${name}`,
            article: () => `Article${name ? `, ${name}` : ''}`,
            form: () => `Form${name ? `, ${name}` : ''}`,
            search: () => `Search${name ? `, ${name}` : ''}`,
            dialog: () => {
                const modal = element.getAttribute('aria-modal') === 'true';
                return `${modal ? 'Modal ' : ''}Dialog, ${name || 'unlabeled'}`;
            },
            alertdialog: () => `Alert dialog, ${name || 'unlabeled'}`,
            alert: () => `Alert: ${name}`,
            status: () => `Status: ${name}`,
            log: () => `Log: ${name}`,
            marquee: () => `Marquee: ${name}`,
            timer: () => `Timer: ${name}`,
            progressbar: () => {
                const value = element.getAttribute('aria-valuenow');
                const valueText = element.getAttribute('aria-valuetext');
                if (valueText) {
                    return `Progress bar, ${name}. ${valueText}`;
                }
                if (value) {
                    return `Progress bar, ${name}. ${value} percent`;
                }
                return `Progress bar, ${name}. Loading...`;
            },
            meter: () => {
                const meterElement = element as HTMLMeterElement;
                const value =
                    element.getAttribute('aria-valuenow') || meterElement.value;
                return `Meter, ${name}. Value: ${value}`;
            },
            tooltip: () => `Tooltip: ${name}`,
            tree: () => `Tree, ${name}`,
            treeitem: () => {
                const expanded = element.getAttribute('aria-expanded');
                const selected =
                    element.getAttribute('aria-selected') === 'true';
                let state = selected ? ', selected' : '';
                if (expanded === 'true') {
                    state += ', expanded';
                } else if (expanded === 'false') {
                    state += ', collapsed';
                }
                return `Tree item, ${name}${state}`;
            },
            grid: () => `Grid, ${name}`,
            gridcell: () => name,
            row: () => {
                const index = element.getAttribute('aria-rowindex');
                return index ? `Row ${index}, ${name}` : name;
            },
            rowheader: () => `Row header, ${name}`,
            columnheader: () => `Column header, ${name}`,
            cell: () => name,
            table: () => {
                const rows =
                    element.querySelectorAll('tr, [role="row"]').length;
                const cols =
                    element.querySelector('tr, [role="row"]')?.children
                        .length || 0;
                return `Table, ${name || 'unlabeled'}. ${rows} rows, ${cols} columns.`;
            },
            list: () => {
                const items = element.querySelectorAll(
                    'li, [role="listitem"]'
                ).length;
                return `List${name ? `, ${name}` : ''}. ${items} items.`;
            },
            menu: () => `Menu, ${name}`,
            menubar: () => `Menu bar, ${name}`,
            toolbar: () => `Toolbar, ${name}`,
            group: () => (name ? `Group, ${name}` : ''),
            separator: () => 'Separator',
            generic: () => name || '',
        };

        const announceFn = announcements[role];
        return announceFn ? announceFn() : name || `${role}`;
    }

    /**
     * Add visual focus indicator styles to the document
     */
    addStyles(): void {
        if (!this.storyDocument || !this.storyDocument.head) {
            return;
        }

        this.removeStyles();

        const styleElement = this.storyDocument.createElement('style');
        styleElement.id = 'screen-reader-addon-styles';
        styleElement.textContent = `
      [data-sr-current] {
        outline: 3px solid #005fcc !important;
        outline-offset: 2px !important;
      }
    `;
        this.storyDocument.head.appendChild(styleElement);
    }

    /**
     * Remove visual focus indicator styles
     */
    removeStyles(): void {
        if (!this.storyDocument) {
            return;
        }
        const styles = this.storyDocument.getElementById(
            'screen-reader-addon-styles'
        );
        if (styles) {
            styles.remove();
        }
    }

    /**
     * Speak/display the announcement
     */
    say(speech: string): void {
        if (!speech) {
            return;
        }

        if (this.voiceEnabled) {
            const utterance = new SpeechSynthesisUtterance(speech);
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }

        if (this.textEnabled) {
            dispatchTextChanged(speech);
        }
    }

    /**
     * Update visual focus indicator
     */
    updateFocusIndicator(element: Element | null): void {
        if (!element) {
            return;
        }

        // Remove previous focus indicator
        const prev = querySelectorDeep(
            '[data-sr-current]',
            this.storyDocument as Document
        );
        if (prev) {
            prev.removeAttribute('data-sr-current');
        }

        // Add focus indicator to current element
        if (element.setAttribute) {
            element.setAttribute('data-sr-current', 'true');
        }
    }

    /**
     * Find the deeply focused element, traversing into shadow DOMs
     */
    getDeepActiveElement(
        root: Document | ShadowRoot = this.storyDocument as Document
    ): Element | null {
        let active = root.activeElement;

        // Keep traversing into shadow roots to find the actual focused element
        while (active && active.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }

        return active;
    }

    /**
     * Handle focus changes - main way we track navigation
     *
     * Real screen readers announce the actual focused element (often inside shadow DOM).
     * We traverse into shadow DOM to find the real focused element, just like browsers do.
     */
    private onFocusIn(event: FocusEvent): void {
        if (!this.isRunning) {
            return;
        }

        const target = event.target as Element | null;
        if (!target) {
            return;
        }

        // Find the actual focused element (may be deep inside shadow DOM)
        const deepActive = this.getDeepActiveElement();

        // Use the deep active element if it has a name, otherwise use the event target
        const deepName = deepActive ? this.getAccessibleName(deepActive) : '';
        const deepRole = deepActive ? this.computeRole(deepActive) : 'generic';

        // Prefer the deep element if it has a meaningful name and role
        const elementToAnnounce =
            deepName && deepRole !== 'generic' ? deepActive : target;

        this.updateFocusIndicator(elementToAnnounce);
        this.announceElement(elementToAnnounce);
    }

    /**
     * Handle keyboard events for additional navigation feedback
     */
    private onKeyDown(event: KeyboardEvent): void {
        if (!this.isRunning) {
            return;
        }

        // After arrow key navigation, check if aria-activedescendant changed
        if (
            ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(
                event.key
            ) !== -1
        ) {
            setTimeout(() => {
                this.checkActiveDescendant(event.target as Element);
            }, 10);
        }
    }

    /**
     * Check for aria-activedescendant changes (used by menus, listboxes, etc.)
     */
    checkActiveDescendant(element: Element | null): void {
        if (!element) {
            return;
        }

        const activeId = element.getAttribute('aria-activedescendant');
        if (activeId && this.storyDocument) {
            const activeElement = this.storyDocument.getElementById(activeId);
            if (activeElement) {
                this.updateFocusIndicator(activeElement);
                this.announceElement(activeElement);
                return;
            }
        }

        // Also check shadow DOM for the active element
        const elementWithShadow = element as Element & {
            shadowRoot?: ShadowRoot;
        };
        if (elementWithShadow.shadowRoot) {
            const activeInShadow = elementWithShadow.shadowRoot.querySelector(
                '[aria-selected="true"], [aria-current="true"], :focus'
            );
            if (activeInShadow) {
                this.updateFocusIndicator(activeInShadow);
                this.announceElement(activeInShadow);
            }
        }
    }

    /**
     * Watch for DOM mutations to catch dynamic changes
     */
    private onMutation(mutations: MutationRecord[]): void {
        if (!this.isRunning) {
            return;
        }

        const watchedAttrs = [
            'aria-selected',
            'aria-checked',
            'aria-expanded',
            'aria-activedescendant',
            'aria-pressed',
            'aria-invalid',
        ];

        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                const target = mutation.target as Element;

                if (
                    mutation.attributeName &&
                    watchedAttrs.indexOf(mutation.attributeName) !== -1
                ) {
                    if (mutation.attributeName === 'aria-activedescendant') {
                        this.checkActiveDescendant(target);
                    } else if (
                        target.getAttribute(mutation.attributeName) ===
                            'true' &&
                        mutation.attributeName === 'aria-selected'
                    ) {
                        this.updateFocusIndicator(target);
                        this.announceElement(target);
                    }
                }
            }
        });
    }

    /**
     * Watch for live region updates (aria-live)
     */
    private onLiveRegionMutation(mutations: MutationRecord[]): void {
        if (!this.isRunning) {
            return;
        }

        mutations.forEach((mutation) => {
            const target = mutation.target as Element;

            // Check if this is inside a live region
            const liveRegion = (
                target.closest ? target : (target.parentElement as Element)
            )?.closest(
                '[aria-live], [role="alert"], [role="status"], [role="log"]'
            );
            if (!liveRegion) {
                return;
            }

            const politeness =
                liveRegion.getAttribute('aria-live') ||
                (liveRegion.getAttribute('role') === 'alert'
                    ? 'assertive'
                    : 'polite');

            // Get the new content
            let announcement = '';
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.textContent) {
                        announcement += node.textContent.trim() + ' ';
                    }
                });
            } else if (mutation.type === 'characterData') {
                announcement = target.textContent || '';
            }

            if (announcement.trim()) {
                // For assertive, interrupt current speech
                if (politeness === 'assertive') {
                    speechSynthesis.cancel();
                }
                this.say(announcement.trim());
            }
        });
    }

    /**
     * Set up mutation observer for aria attribute changes
     */
    setupMutationObserver(): void {
        if (!this.storyDocument || !this.storyDocument.body) {
            return;
        }

        this.mutationObserver = new MutationObserver(this.handleMutation);
        this.mutationObserver.observe(this.storyDocument.body, {
            attributes: true,
            subtree: true,
            attributeFilter: [
                'aria-selected',
                'aria-checked',
                'aria-expanded',
                'aria-activedescendant',
                'aria-pressed',
                'aria-invalid',
            ],
        });
    }

    /**
     * Set up observer for live regions
     */
    setupLiveRegionObserver(): void {
        if (!this.storyDocument || !this.storyDocument.body) {
            return;
        }

        this.liveRegionObserver = new MutationObserver(
            this.onLiveRegionMutation.bind(this)
        );
        this.liveRegionObserver.observe(this.storyDocument.body, {
            childList: true,
            subtree: true,
            characterData: true,
        });
    }

    /**
     * Start the screen reader
     */
    start(iframe?: HTMLIFrameElement | null): void {
        let targetIframe = iframe;
        if (!targetIframe) {
            targetIframe =
                (document.getElementById(
                    'storybook-preview-iframe'
                ) as HTMLIFrameElement) ||
                (document.querySelector(
                    'iframe[data-is-storybook="true"]'
                ) as HTMLIFrameElement) ||
                (document.querySelector('iframe') as HTMLIFrameElement);
        }

        if (
            !targetIframe ||
            !targetIframe.contentWindow ||
            !targetIframe.contentWindow.document ||
            !targetIframe.contentWindow.document.body
        ) {
            // eslint-disable-next-line no-console
            console.warn('[Screen Reader] Waiting for iframe...');
            setTimeout(() => {
                this.start(targetIframe);
            }, 200);
            return;
        }

        // Stop any existing instance first
        this.stop();

        this.storyDocument = targetIframe.contentWindow.document;

        // Wait for document to be ready
        if (this.storyDocument.readyState === 'loading') {
            this.storyDocument.addEventListener('DOMContentLoaded', () => {
                this.start(targetIframe);
            });
            return;
        }

        this.addStyles();

        // Listen for focus changes
        this.storyDocument.addEventListener(
            'focusin',
            this.handleFocusIn as EventListener,
            true
        );
        this.storyDocument.addEventListener(
            'keydown',
            this.handleKeyDown as EventListener,
            true
        );

        // Set up mutation observers
        this.setupMutationObserver();
        this.setupLiveRegionObserver();

        this.isRunning = true;
        this.lastAnnouncedElement = null;

        this.say('Screen reader enabled. Use Tab or arrow keys to navigate.');

        // Announce current focus if any
        const currentFocus = this.storyDocument.activeElement;
        if (currentFocus && currentFocus !== this.storyDocument.body) {
            this.updateFocusIndicator(currentFocus);
            this.announceElement(currentFocus);
        }
    }

    /**
     * Stop the screen reader
     */
    stop(): void {
        if (!this.isRunning && !this.storyDocument) {
            return;
        }

        // Clean up event listeners
        if (this.storyDocument) {
            this.storyDocument.removeEventListener(
                'focusin',
                this.handleFocusIn as EventListener,
                true
            );
            this.storyDocument.removeEventListener(
                'keydown',
                this.handleKeyDown as EventListener,
                true
            );
        }

        // Clean up mutation observers
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
            this.mutationObserver = null;
        }

        if (this.liveRegionObserver) {
            this.liveRegionObserver.disconnect();
            this.liveRegionObserver = null;
        }

        // Remove focus indicator
        if (this.storyDocument) {
            const current = querySelectorDeep(
                '[data-sr-current]',
                this.storyDocument
            );
            if (current) {
                current.removeAttribute('data-sr-current');
            }
            this.removeStyles();
        }

        this.isRunning = false;
        this.lastAnnouncedElement = null;

        if (this.voiceEnabled || this.textEnabled) {
            this.say('Screen reader disabled');
        }
    }
}
