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
import { property } from 'lit/decorators.js';
import { addons, type Channel } from '@storybook/manager-api';
import { STORY_CHANGED } from '@storybook/core-events';

// Import Spectrum Web Components
import '@spectrum-web-components/switch/sp-switch.js';
import '@spectrum-web-components/theme/sp-theme.js';
import '@spectrum-web-components/theme/src/spectrum-two/themes-core-tokens.js';

import ScreenReader from '../screen-reader/screenReader.js';

interface ScreenReaderTextEvent extends CustomEvent {
    detail: {
        text: string;
    };
}

export class ScreenReaderPanel extends LitElement {
    @property({ type: Boolean })
    voice = false;

    @property({ type: Boolean })
    text = false;

    @property({ type: Boolean })
    isActive = false;

    @property({ type: String })
    screenReaderText = '';

    private screenReader: ScreenReader | null = null;
    private channel: Channel | null = null;

    static override styles = css`
        :host {
            display: block;
            padding: 16px;
            font-family:
                -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                sans-serif;
        }

        .toggle-row {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            gap: 8px;
        }

        .toggle-label {
            font-size: 14px;
            color: var(--spectrum-global-color-gray-800, #4b4b4b);
        }

        .text-output {
            font-size: 14px;
            border-radius: 6px;
            border: 1px solid var(--spectrum-global-color-gray-300, #e0e0e0);
            padding: 12px;
            margin-top: 12px;
            background: var(--spectrum-global-color-gray-100, #f5f5f5);
            min-height: 60px;
            max-height: 200px;
            overflow-y: auto;
        }

        .status-text {
            font-size: 12px;
            color: var(--spectrum-global-color-gray-600, #6e6e6e);
            margin: 12px 0 0 0;
            font-style: italic;
        }

        .placeholder {
            color: var(--spectrum-global-color-gray-500, #959595);
        }
    `;

    constructor() {
        super();
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleStoryChange = this.handleStoryChange.bind(this);
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
            <sp-theme scale="medium" color="light" system="spectrum-two">
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
                          <div class="text-output">
                              ${this.screenReaderText ||
                              html`
                                  <span class="placeholder">
                                      Navigate to hear announcements...
                                  </span>
                              `}
                          </div>
                      `
                    : ''}
                ${this.isActive
                    ? html`
                          <p class="status-text">
                              Use Tab or arrow keys to navigate. Focus changes
                              will be announced.
                          </p>
                      `
                    : ''}
            </sp-theme>
        `;
    }
}

customElements.define('screen-reader-panel', ScreenReaderPanel);
