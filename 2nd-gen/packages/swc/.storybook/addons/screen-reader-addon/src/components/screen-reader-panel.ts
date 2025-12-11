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

import { css, html, LitElement } from 'lit';
import { addons } from '@storybook/manager-api';
import { STORY_CHANGED } from '@storybook/core-events';

// Import Spectrum Web Components
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/spectrum-two/themes-core-tokens.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import ScreenReader from '../screen-reader/screenReader.js';

interface ScreenReaderTextEvent extends CustomEvent {
    detail: {
        text: string;
    };
}

export class ScreenReaderPanel extends LitElement {
    // Using static properties instead of decorators for compatibility
    // with Storybook's internal esbuild (no decorator compilation needed)
    static override properties = {
        voice: { type: Boolean },
        text: { type: Boolean },
        isActive: { type: Boolean },
        screenReaderText: { type: String },
        themeColor: { type: String },
    };

    // Use 'declare' to avoid class field definition overriding Lit's reactive properties
    declare voice: boolean;
    declare text: boolean;
    declare isActive: boolean;
    declare screenReaderText: string;
    declare themeColor: 'light' | 'dark';

    private screenReader: ScreenReader | null = null;
    private channel: ReturnType<typeof addons.getChannel> | null = null;
    private themeMediaQuery: MediaQueryList | null = null;

    static override styles = css`
        :host {
            display: block;
            padding: 16px;
        }

        .toggle-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
        }

        .output-section {
            margin-top: 16px;
        }

        sp-textfield {
            width: 100%;
        }

        sp-help-text {
            margin-top: 12px;
        }
    `;

    constructor() {
        super();
        // Initialize reactive properties
        this.voice = false;
        this.text = false;
        this.isActive = false;
        this.screenReaderText = '';
        this.themeColor = this.detectTheme();
        // Bind event handlers
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleStoryChange = this.handleStoryChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    private detectTheme(): 'light' | 'dark' {
        // Detect theme by checking Storybook's actual background color
        // This works for both explicit themes (1st-gen) and auto themes (2nd-gen)
        const body = document.body;
        const computedStyle = getComputedStyle(body);
        const bgColor = computedStyle.backgroundColor;

        // Parse RGB values
        const rgbMatch = bgColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const [, r, g, b] = rgbMatch.map(Number);
            // Calculate relative luminance
            const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

            // If background is dark (luminance < 0.5), use dark theme
            return luminance < 0.5 ? 'dark' : 'light';
        }

        // Fallback to system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    }

    private handleThemeChange(): void {
        this.themeColor = this.detectTheme();
    }

    override connectedCallback(): void {
        super.connectedCallback();

        // Listen for text changes from the screen reader
        window.addEventListener(
            'screen-reader-text-changed',
            this.handleTextChange as EventListener
        );

        // Listen for story changes via Storybook API
        this.channel = addons.getChannel();
        this.channel.on(STORY_CHANGED, this.handleStoryChange);

        // Listen for system theme changes (for auto-theme Storybooks like 2nd-gen)
        this.themeMediaQuery = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        this.themeMediaQuery.addEventListener('change', this.handleThemeChange);
    }

    override disconnectedCallback(): void {
        super.disconnectedCallback();

        window.removeEventListener(
            'screen-reader-text-changed',
            this.handleTextChange as EventListener
        );

        if (this.channel) {
            this.channel.off(STORY_CHANGED, this.handleStoryChange);
        }

        if (this.themeMediaQuery) {
            this.themeMediaQuery.removeEventListener(
                'change',
                this.handleThemeChange
            );
        }

        this.stopScreenReader();
    }

    private handleTextChange(event: ScreenReaderTextEvent): void {
        this.screenReaderText = event.detail.text;
    }

    private handleStoryChange(): void {
        if (this.isActive && this.screenReader) {
            this.screenReader.stop();
            this.screenReader = null;

            // Wait for new story to load, then restart
            setTimeout(() => {
                if (this.voice || this.text) {
                    this.startScreenReader();
                }
            }, 500);
        }
    }

    private handleVoiceToggle(event: Event): void {
        this.voice = (event.target as HTMLInputElement).checked;
        this.updateScreenReader();
    }

    private handleTextToggle(event: Event): void {
        this.text = (event.target as HTMLInputElement).checked;
        this.updateScreenReader();
    }

    private findStorybookIframe(): HTMLIFrameElement | null {
        return (
            (document.getElementById(
                'storybook-preview-iframe'
            ) as HTMLIFrameElement) ||
            (document.querySelector(
                'iframe[data-is-storybook="true"]'
            ) as HTMLIFrameElement) ||
            (document.querySelector(
                'iframe[title*="storybook"]'
            ) as HTMLIFrameElement) ||
            (document.querySelector('iframe') as HTMLIFrameElement)
        );
    }

    private startScreenReader(): void {
        const iframe = this.findStorybookIframe();

        if (!iframe) {
            // eslint-disable-next-line no-console
            console.error('[Screen Reader Addon] Cannot find preview iframe');
            return;
        }

        this.screenReader = new ScreenReader();
        this.screenReader.voiceEnabled = this.voice;
        this.screenReader.textEnabled = this.text;
        this.screenReader.start(iframe);

        this.isActive = true;
    }

    private stopScreenReader(): void {
        if (this.screenReader) {
            this.screenReader.stop();
            this.screenReader = null;
        }
        this.isActive = false;
        this.screenReaderText = '';
    }

    private updateScreenReader(): void {
        const shouldBeActive = this.voice || this.text;

        if (shouldBeActive && !this.isActive) {
            this.startScreenReader();
        } else if (!shouldBeActive && this.isActive) {
            this.stopScreenReader();
        } else if (shouldBeActive && this.screenReader) {
            this.screenReader.voiceEnabled = this.voice;
            this.screenReader.textEnabled = this.text;
        }
    }

    override render() {
        return html`
            <sp-theme
                scale="medium"
                color=${this.themeColor}
                system="spectrum-two"
            >
                <div class="toggle-row">
                    <sp-switch
                        ?checked=${this.voice}
                        @change=${this.handleVoiceToggle}
                    >
                        Voice Reader
                    </sp-switch>
                </div>

                <div class="toggle-row">
                    <sp-switch
                        ?checked=${this.text}
                        @change=${this.handleTextToggle}
                    >
                        Text Reader
                    </sp-switch>
                </div>

                ${this.text
                    ? html`
                          <div class="output-section">
                              <sp-field-label for="screen-reader-output">
                                  Screen reader output
                              </sp-field-label>
                              <sp-textfield
                                  id="screen-reader-output"
                                  multiline
                                  readonly
                                  rows="1"
                                  placeholder="Navigate to hear announcements..."
                                  .value=${this.screenReaderText}
                              ></sp-textfield>
                          </div>
                      `
                    : ''}
                ${this.isActive
                    ? html`
                          <sp-help-text>
                              Use Tab or arrow keys to navigate. Focus changes
                              will be announced.
                          </sp-help-text>
                      `
                    : ''}
            </sp-theme>
        `;
    }
}

customElements.define('screen-reader-panel', ScreenReaderPanel);
