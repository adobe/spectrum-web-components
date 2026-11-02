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

import { CSSResultArray, html, PropertyValues, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';

import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';

import styles from './user-message.css';

export type UserMessageType = 'copy' | 'card' | 'media';

/**
 * User-authored conversation bubble for AI Toolkit pattern exploration.
 * Default slot content is rendered only when `type="copy"` and ignored when
 * `type="card"` or `type="media"`.
 *
 * @element swc-user-message
 * @slot - Message copy content when `type="copy"`.
 * @slot thumbnail - Document cards when `type="card"` or image previews when `type="media"`.
 * @since 2.0.0-beta.3
 */
export class UserMessage extends SpectrumElement {
  /**
   * Visual content type for the user message bubble.
   */
  @property({ type: String, reflect: true })
  public type: UserMessageType = 'copy';

  @state()
  private hasMultipleThumbnails = false;

  @state()
  private hasGalleryOverflow = false;

  @state()
  private galleryInlineSize?: number;

  private galleryParent?: HTMLElement;

  private galleryResizeFrame?: number;

  private readonly galleryResizeController = new ResizeController(this, {
    target: null,
    callback: () => this.scheduleGalleryLayout(),
  });

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.galleryResizeFrame !== undefined) {
      cancelAnimationFrame(this.galleryResizeFrame);
      this.galleryResizeFrame = undefined;
    }
  }

  protected override updated(changed: PropertyValues<this>): void {
    super.updated(changed);
    if (this.type !== 'copy' && changed.has('type')) {
      this.scheduleGalleryLayout();
    }
  }

  protected override render(): TemplateResult {
    if (this.type !== 'copy') {
      const isCardGallery = this.type === 'card';
      return html`
        <div
          class="swc-UserMessage-galleryContainer"
          style=${styleMap({
            'inline-size':
              this.galleryInlineSize === undefined
                ? undefined
                : `${this.galleryInlineSize}px`,
          })}
        >
          <div
            class=${classMap({
              'swc-UserMessage-galleryViewport': true,
              'swc-UserMessage-galleryViewport--overflow':
                this.hasGalleryOverflow,
            })}
            role=${ifDefined(this.hasGalleryOverflow ? 'group' : undefined)}
            aria-label=${ifDefined(
              this.hasGalleryOverflow
                ? isCardGallery
                  ? 'Uploaded documents'
                  : 'Uploaded images'
                : undefined
            )}
            tabindex=${ifDefined(this.hasGalleryOverflow ? '0' : undefined)}
          >
            <slot
              name="thumbnail"
              class=${classMap({
                'swc-UserMessage-gallery': true,
                'swc-UserMessage-gallery--multiple':
                  this.hasMultipleThumbnails && !isCardGallery,
                'swc-UserMessage-gallery--card': isCardGallery,
              })}
              @slotchange=${this.handleGallerySlotChange}
            ></slot>
          </div>
        </div>
      `;
    }

    return html`
      <slot></slot>
    `;
  }

  private scheduleGalleryLayout(): void {
    if (this.galleryResizeFrame === undefined) {
      this.galleryResizeFrame = requestAnimationFrame(() => {
        this.galleryResizeFrame = undefined;
        if (this.isConnected) {
          this.measureGalleryLayout();
        }
      });
    }
  }

  private handleGallerySlotChange(event: Event): void {
    const slot = event.currentTarget as HTMLSlotElement;
    this.hasMultipleThumbnails =
      slot.assignedElements({ flatten: true }).length > 1;
    this.galleryResizeController.observe(this);
    this.measureGalleryLayout();
  }

  private measureGalleryLayout(): void {
    const viewport = this.shadowRoot?.querySelector<HTMLElement>(
      '.swc-UserMessage-galleryViewport'
    );
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="thumbnail"]'
    );
    const parent = this.assignedSlot ?? this.parentElement;
    if (viewport && slot && parent) {
      if (parent !== this.galleryParent) {
        if (this.galleryParent) {
          this.galleryResizeController.unobserve(this.galleryParent);
        }
        this.galleryParent = parent;
        this.galleryResizeController.observe(parent);
      }

      const parentStyle = getComputedStyle(parent);
      const hostStyle = getComputedStyle(this);
      const slotStyle = getComputedStyle(slot);
      const available = Math.max(
        0,
        parent.clientWidth -
          parseFloat(parentStyle.paddingInlineStart) -
          parseFloat(parentStyle.paddingInlineEnd) -
          parseFloat(hostStyle.paddingInlineStart) -
          parseFloat(hostStyle.paddingInlineEnd) -
          parseFloat(hostStyle.borderInlineStartWidth) -
          parseFloat(hostStyle.borderInlineEndWidth)
      );
      const thumbnailSize = parseFloat(
        slotStyle.getPropertyValue('--_swc-user-message-gallery-thumbnail-size')
      );
      const gap = parseFloat(slotStyle.columnGap);
      const scrollbar = viewport.offsetWidth - viewport.clientWidth;
      const count = slot.assignedElements({ flatten: true }).length;
      const isCardGallery = this.type === 'card';
      const columns = Math.min(
        count,
        isCardGallery ? 2 : count,
        Math.max(
          !isCardGallery && count > 1 ? 2 : 1,
          Math.floor((available - scrollbar + gap) / (thumbnailSize + gap))
        )
      );
      this.galleryInlineSize = Math.min(
        available,
        columns * thumbnailSize + Math.max(0, columns - 1) * gap + scrollbar
      );
    }
    this.hasGalleryOverflow = Boolean(
      viewport && viewport.scrollHeight - viewport.clientHeight > 1
    );
  }
}
