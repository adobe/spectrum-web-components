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
  html,
  nothing,
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import { property } from '@spectrum-web-components/base/src/decorators.js';
import '@spectrum-web-components/button/sp-clear-button.js';
import styles from './tag.css.js';

/**
 * The `Tag` component is a custom web component that represents a tag element.
 *
 * @element sp-tag
 *
 * @slot - Text content for labeling the tag.
 * @slot avatar - An avatar element to display within the tag.
 * @slot icon - An icon element to display within the tag.
 *
 * @fires delete - Dispatched when the tag is deleted.
 */
export class Tag extends SizedMixin(SpectrumElement, {
  validSizes: ['s', 'm', 'l'],
  noDefaultSize: true,
}) {
  /**
   * Returns the styles to be applied to the component.
\
   */
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * Indicates whether the tag is deletable.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ type: Boolean, reflect: true })
  public deletable = false;

  /**
   * Indicates whether the tag is disabled.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Indicates whether the tag is readonly.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   */
  @property({ type: Boolean, reflect: true })
  public readonly = false;

  constructor() {
    super();
    // Add event listener for focusin event to handle focus-related interactions.
    this.addEventListener('focusin', this.handleFocusin);
  }

  /**
   * Handles the focusin event.
   *
   * Adds event listeners for focusout and keydown events when the tag gains focus.
   */
  private handleFocusin = (): void => {
    this.addEventListener('focusout', this.handleFocusout);
    this.addEventListener('keydown', this.handleKeydown);
  };

  /**
   * Handles the focusout event.
   *
   * Removes event listeners for keydown and focusout events when the tag loses focus.
   */
  private handleFocusout = (): void => {
    this.removeEventListener('keydown', this.handleKeydown);
    this.removeEventListener('focusout', this.handleFocusout);
  };

  /**
   * Handles the keydown event.
   *
   * Deletes the tag if the Backspace, Space, or Delete key is pressed and the tag is deletable and not disabled.
   */
  private handleKeydown = (event: KeyboardEvent): void => {
    if (!this.deletable || this.disabled) {
      return;
    }

    const { code } = event;

    switch (code) {
      case 'Backspace':
      case 'Space':
      case 'Delete':
        this.delete();
      default:
        return;
    }
  };

  /**
   * Deletes the tag element.
   *
   * Dispatches a 'delete' event and removes the tag if the event is not canceled.
   */
  private delete(): void {
    if (this.readonly) {
      return;
    }

    const applyDefault = this.dispatchEvent(
      new Event('delete', {
        bubbles: true,
        cancelable: true,
        composed: true,
      })
    );

    if (!applyDefault) {
      return;
    }

    this.remove();
  }

  /**
   * Renders the content of the tag component.
   *
   * This method returns a template result containing the avatar, icon, label, and clear button (if deletable).
   */
  protected override render(): TemplateResult {
    return html`
      <slot name="avatar"></slot>
      <slot name="icon"></slot>
      <span class="label"><slot></slot></span>
      ${this.deletable
        ? html`
            <sp-clear-button
              class="clear-button"
              ?disabled="${this.disabled}"
              label="Remove"
              size="s"
              tabindex="-1"
              @click="${this.delete}"
            ></sp-clear-button>
          `
        : nothing}
    `;
  }

  /**
   * Lifecycle method called after the component's DOM has been rendered for the first time.
   *
   * Sets the role attribute to 'listitem' and tabindex to '0' if the tag is deletable.
   */
  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);

    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }

    if (this.deletable) {
      this.setAttribute('tabindex', '0');
    }
  }

  /**
   * Lifecycle method called when the component updates.
   *
   * Sets or removes the 'aria-disabled' attribute based on the 'disabled' property.
   */
  protected override updated(changes: PropertyValues): void {
    super.updated(changes);

    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }
}
