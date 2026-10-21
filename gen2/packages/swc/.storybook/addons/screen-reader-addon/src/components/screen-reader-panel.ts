/**
 * Copyright 2026 Adobe. All rights reserved.
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
import { STORY_CHANGED } from '@storybook/core-events';
import { addons } from '@storybook/manager-api';

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
    themeColor: { type: String, attribute: 'color', reflect: true },
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
  private restartTimeout: ReturnType<typeof setTimeout> | null = null;

  static override styles = css`
    :host {
      display: block;
      padding: 16px;

      /* Token fallbacks keep the panel usable in the 1st-gen Storybook
         manager, which does not load the gen2 token stylesheet. */
      color-scheme: light;
      --panel-text-color: var(--swc-neutral-content-color-default, #292929);
      --panel-muted-color: var(
        --swc-neutral-subdued-content-color-default,
        #505050
      );
      --panel-border-color: var(--swc-gray-400, #c6c6c6);
      --panel-surface-color: var(--swc-gray-25, #fff);
      --panel-track-color: var(--swc-gray-500, #8f8f8f);
      --panel-accent-color: var(--swc-accent-background-color-default, #2680eb);
      --panel-focus-color: var(--swc-focus-indicator-color, #1473e6);
      --panel-handle-color: var(--swc-gray-25, #fff);
      --panel-corner-radius: var(--swc-corner-radius-100, 4px);

      color: var(--panel-text-color);
      font-size: 13px;
    }

    :host([color='dark']) {
      color-scheme: dark;
      --panel-text-color: var(--swc-neutral-content-color-default, #dbdbdb);
      --panel-muted-color: var(
        --swc-neutral-subdued-content-color-default,
        #afafaf
      );
      --panel-border-color: var(--swc-gray-400, #444);
      --panel-surface-color: var(--swc-gray-25, #111);
      --panel-track-color: var(--swc-gray-500, #6d6d6d);
      --panel-accent-color: var(--swc-accent-background-color-default, #378ef0);
      --panel-focus-color: var(--swc-focus-indicator-color, #378ef0);
      --panel-handle-color: var(--swc-gray-25, #111);
    }

    .toggle-row {
      margin-bottom: 12px;
    }

    .switch {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
    }

    .switch input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
    }

    .switch-track {
      position: relative;
      flex: none;
      inline-size: 26px;
      block-size: 14px;
      border-radius: 7px;
      background-color: var(--panel-track-color);
      transition:
        background-color 130ms ease-in-out,
        box-shadow 130ms ease-in-out;
    }

    .switch-track::after {
      content: '';
      position: absolute;
      inset-block-start: 2px;
      inset-inline-start: 2px;
      inline-size: 10px;
      block-size: 10px;
      border-radius: 50%;
      background-color: var(--panel-handle-color);
      transition: inset-inline-start 130ms ease-in-out;
    }

    .switch input:checked + .switch-track {
      background-color: var(--panel-accent-color);
    }

    .switch input:checked + .switch-track::after {
      inset-inline-start: 14px;
    }

    .switch input:focus-visible + .switch-track {
      box-shadow:
        0 0 0 2px var(--panel-surface-color),
        0 0 0 4px var(--panel-focus-color);
    }

    .output-section {
      margin-top: 16px;
    }

    .field-label {
      display: block;
      margin-bottom: 4px;
      color: var(--panel-muted-color);
      font-size: 12px;
    }

    textarea {
      box-sizing: border-box;
      width: 100%;
      min-height: 32px;
      padding: 6px 8px;
      border: 1px solid var(--panel-border-color);
      border-radius: var(--panel-corner-radius);
      background-color: var(--panel-surface-color);
      color: var(--panel-text-color);
      font-family: inherit;
      font-size: inherit;
      resize: vertical;
    }

    textarea:focus-visible {
      outline: 2px solid var(--panel-focus-color);
      outline-offset: -1px;
    }

    .help-text {
      display: block;
      margin-top: 12px;
      color: var(--panel-muted-color);
      font-size: 12px;
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
    // This works for both explicit themes (1st-gen) and auto themes (gen2)
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

    // Listen for system theme changes (for auto-theme Storybooks like gen2)
    this.themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
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
      this.isActive = false;

      // Clear any pending restart timeout
      if (this.restartTimeout) {
        clearTimeout(this.restartTimeout);
        this.restartTimeout = null;
      }

      // Wait for new story to load, then restart
      this.restartTimeout = setTimeout(() => {
        this.restartTimeout = null;
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
    // Clear any pending restart timeout to prevent duplicate instances
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

    const iframe = this.findStorybookIframe();

    if (!iframe) {
      console.error('[Screen Reader Addon] Cannot find preview iframe');
      return;
    }

    // Stop existing instance if any (shouldn't happen, but be safe)
    if (this.screenReader) {
      this.screenReader.stop();
    }

    this.screenReader = new ScreenReader();
    this.screenReader.voiceEnabled = this.voice;
    this.screenReader.textEnabled = this.text;
    this.screenReader.start(iframe);

    this.isActive = true;
  }

  private stopScreenReader(): void {
    if (this.restartTimeout) {
      clearTimeout(this.restartTimeout);
      this.restartTimeout = null;
    }

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
      <div class="toggle-row">
        <label class="switch">
          <input
            type="checkbox"
            .checked=${this.voice}
            @change=${this.handleVoiceToggle}
          />
          <span class="switch-track" aria-hidden="true"></span>
          <span>Voice Reader</span>
        </label>
      </div>

      <div class="toggle-row">
        <label class="switch">
          <input
            type="checkbox"
            .checked=${this.text}
            @change=${this.handleTextToggle}
          />
          <span class="switch-track" aria-hidden="true"></span>
          <span>Text Reader</span>
        </label>
      </div>

      ${this.text
        ? html`
            <div class="output-section">
              <label class="field-label" for="screen-reader-output">
                Screen reader output
              </label>
              <textarea
                id="screen-reader-output"
                readonly
                rows="1"
                placeholder="Navigate to hear announcements..."
                .value=${this.screenReaderText}
              ></textarea>
            </div>
          `
        : ''}
      ${this.isActive
        ? html`
            <span class="help-text">
              Use Tab or arrow keys to navigate. Focus changes will be
              announced.
            </span>
          `
        : ''}
    `;
  }
}

customElements.define('screen-reader-panel', ScreenReaderPanel);
