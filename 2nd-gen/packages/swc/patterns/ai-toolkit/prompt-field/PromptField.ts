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

import {
  CSSResultArray,
  html,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import {
  property,
  query,
  queryAssignedElements,
  state,
} from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ResizeController } from '@lit-labs/observers/resize-controller.js';

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import {
  DragAndDropController,
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
  FocusgroupNavigationController,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  deepContains,
  focusableSelector,
  getActiveElement,
  isFocusVisibleInTree,
} from '@adobe/spectrum-wc-core/utils/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';
import '@adobe/spectrum-wc/components/action-button/swc-action-button.js';
import '../pixel-loader/swc-pixel-loader.js';

import { uniqueId } from '../../../utils/id.js';
import type {
  PixelLoaderIconName,
  PixelLoaderPresetName,
} from '../pixel-loader/index.js';
import { PIXEL_LOADER_PRESET_NAMES } from '../pixel-loader/index.js';
import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import visuallyHiddenStyles from '../../../stylesheets/_lit-styles/visually-hidden.css';
import styles from './prompt-field.css';

export interface PromptFieldSubmitDetail {
  value: string;
}

// Matches the pixel-loader's own `icon` default.
const DEFAULT_LOADER_ICON: PixelLoaderIconName = 'aiLogo';

const isFileDrag = (event: DragEvent): boolean => {
  const dataTransfer = event.dataTransfer;
  return Boolean(
    dataTransfer?.types.includes('Files') || dataTransfer?.files.length
  );
};

// Native CSS textarea auto-sizing; when true, the JS fallback is skipped.
const SUPPORTS_FIELD_SIZING =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('field-sizing', 'content');

/**
 * Prompt entry surface for AI flows.
 *
 * Uncontrolled with mirror pattern: the component updates its own draft state first,
 * then emits events so consumers can mirror or override that state.
 *
 * @element swc-prompt-field
 *
 * @example
 * <swc-prompt-field label="Prompt">
 *   <div slot="legal">Responses are generated using AI and may be inaccurate.</div>
 * </swc-prompt-field>
 *
 * @slot attachment - Optional attachment preview(s). Use one `swc-upload-attachment` type per session (cards only, or media only).
 * @slot legal - Legal disclaimer content. Required in product implementations; provide Legal-approved copy.
 * @fires swc-prompt-field-input - Dispatched after the textarea value is internally updated.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-submit - Dispatched when send is triggered.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested while generating.
 * @fires swc-prompt-field-upload-click - Dispatched when upload affordance is activated.
 * Consumers should handle file picker flow externally.
 * @fires swc-prompt-field-drop - Dispatched when files are dropped anywhere on the field.
 * Detail: `{ files: File[] }`. Consumers should build and slot `swc-upload-attachment`
 * elements from `files` externally, same as the upload-click flow.
 *
 * @cssprop --swc-prompt-field-brand-color - Brand hue driving the AI treatment's ring, wash, and glow colors. Defaults to a fuchsia OKLCH value; only the hue is meaningfully used, lightness/chroma come from each layer's own derived values.
 * @since 2.0.0-beta.3
 */
export class PromptField extends SpectrumElement {
  private readonly labelId = uniqueId('swc-prompt-field-label');

  /** Disables the textarea and all actions. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Shows the stop button in place of send while a response is generating. */
  @property({ type: Boolean, reflect: true })
  public generating = false;

  /**
   * Starts as a single-line layout with send/stop inline instead of the default
   * layout with a separate action bar; the textarea still wraps and grows with
   * content either way.
   *
   * @internal
   */
  @property({ type: Boolean, reflect: true })
  public collapsed = false;

  /** Visual intensity of the AI brand treatment. */
  @property({ type: String, reflect: true })
  public variant: 'subtle' | 'balanced' | 'prominent' = 'balanced';

  /** Status loader artwork: a single icon name (static), or a preset name (`cc`, `dc`, `exp`, `analyze`, `mega`) that cycles a themed sequence. Routed to the loader's icon/preset in `_renderStatusIcon`. */
  @property({ type: String, reflect: true })
  public loader: PixelLoaderIconName | PixelLoaderPresetName = 'aiLogo';

  /** Accessible name for the textarea; visually hidden. */
  @property({ type: String })
  public label = 'Prompt';

  /** Optional accessible label override for the textarea. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /** Accessible label for the send action button. */
  @property({ type: String, attribute: 'send-label' })
  public sendLabel = 'Send';

  /** Accessible label for the stop action button while generating. */
  @property({ type: String, attribute: 'stop-label' })
  public stopLabel = 'Stop generating';

  /** Accessible label for the upload button. */
  @property({ type: String, attribute: 'upload-label' })
  public uploadLabel = 'Add attachment';

  /** Accessible label for the previous-attachment scroll button. */
  @property({ type: String, attribute: 'attachment-scroll-prev-label' })
  public attachmentScrollPrevLabel = 'Show previous attachments';

  /** Accessible label for the next-attachment scroll button. */
  @property({ type: String, attribute: 'attachment-scroll-next-label' })
  public attachmentScrollNextLabel = 'Show more attachments';

  /** Accessible name for the uploaded-attachments strip landmark. */
  @property({ type: String, attribute: 'attachment-strip-label' })
  public attachmentStripLabel = 'Uploaded assets strip';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder =
    'Ready to get started? Ask a question, share an idea, or add a task.';

  /** The current textarea value; internally updated and externally mirrorable. */
  @property({ type: String })
  public value = '';

  /** Minimum visible textarea rows before growth; unset relies on the natural single-line height. */
  @property({ type: Number, attribute: 'min-rows' })
  public minRows?: number;

  /** Maximum visible textarea rows before internal scrolling; unset relies on max-block-size alone. */
  @property({ type: Number, attribute: 'max-rows' })
  public maxRows?: number;

  @queryAssignedElements({ slot: 'attachment', flatten: true })
  private _assignedAttachmentElements!: HTMLElement[];

  @query('.swc-PromptField-attachments-scroll')
  private _attachmentScrollEl?: HTMLDivElement;

  @query('.swc-PromptField-textarea')
  private _textarea?: HTMLTextAreaElement;

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

  @state()
  private _attachmentScrollOverflow = false;

  @state()
  private _attachmentCanScrollPrev = false;

  @state()
  private _attachmentCanScrollNext = false;

  // `scrollend` support isn't a reliable gate on its own: browsers that
  // report support (feature-detected via `'onscrollend' in window`) can
  // still skip firing it for particular scroll triggers (observed on both
  // this project's WebKit and Firefox test runners). So this always races
  // a poll against the real event instead of trusting either alone —
  // bumped on every `scroll` tick, on a real `scrollend`, and on
  // disconnect, so a stale poll (superseded by a newer scroll, a real
  // `scrollend` winning first, or the host going away) is a no-op instead
  // of firing late.
  private _attachmentScrollFallbackGeneration = 0;

  // Observed targets accumulate across slot changes (dismissed tiles are
  // never explicitly unobserved); the browser drops a target's callbacks
  // once it leaves the DOM, so this is a bounded, harmless handful of
  // stale references for a chat composer's tile count, not an unbounded
  // leak. Revisit with explicit unobserve() bookkeeping if this is ever
  // reused somewhere with much larger, longer-lived tile counts.
  private readonly _attachmentScrollObserver = new ResizeController(this, {
    target: null,
    callback: () => {
      this._updateAttachmentScrollState();
    },
  });

  /**
   * Roving tabindex + arrow-key focus movement across attachment tiles. The
   * first (or last-active, via `memory`) tile always carries `tabindex="0"`,
   * so it is Tab's first stop into the strip with no separate entry step;
   * Arrow Left/Right move that roving stop one tile at a time. Chevron
   * buttons separately page by the scroll viewport, unrelated to this
   * controller.
   */
  private readonly _attachmentNavigation = new FocusgroupNavigationController(
    this,
    {
      direction: 'horizontal',
      wrap: false,
      memory: true,
      getItems: () => this._assignedAttachmentElements ?? [],
    }
  );

  private _pendingAttachmentDismiss?: {
    attachment: HTMLElement;
    index: number;
  };

  // Attachment tiles present at drop time; diffed on the next slotchange to find the new one(s) to focus.
  private _pendingAttachmentDropFocus?: HTMLElement[];

  /** Whether a file is currently being dragged over the field. Drives the same visual as the textarea's own focus ring. */
  @state()
  private _dragged = false;

  constructor() {
    super();
    // Accepts file drags anywhere on the host and hands dropped files off via `swc-prompt-field-drop`.
    new DragAndDropController(this, {
      isDragged: () => this._dragged,
      shouldAccept: (event) => !this.disabled && isFileDrag(event),
      onDragEnter: () => {
        this._dragged = true;
      },
      onDragLeave: () => {
        this._dragged = false;
      },
      onDrop: (event) => {
        this._dragged = false;
        if (this.disabled) {
          return;
        }
        const files = Array.from(event.dataTransfer?.files ?? []);
        if (files.length === 0) {
          return;
        }
        if (this.shadowRoot?.activeElement !== this._textarea) {
          this._pendingAttachmentDropFocus = [
            ...(this._assignedAttachmentElements ?? []),
          ];
        }
        this.dispatchEvent(
          new CustomEvent('swc-prompt-field-drop', {
            bubbles: true,
            composed: true,
            detail: { files },
          })
        );
      },
    });
  }

  public static override get styles(): CSSResultArray {
    return [styles, visuallyHiddenStyles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this._handleAttachmentActiveChange as EventListener
    );
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this._handleAttachmentActiveChange as EventListener
    );
    this._attachmentScrollFallbackGeneration++;
    super.disconnectedCallback();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    this._warnIfMissingLegalContent();
    if (changedProperties.has('value')) {
      this._autosizeTextarea();
    }
  }

  // Fallback for browsers without field-sizing: content, which is not yet
  // widely supported. Grows the textarea to fit content, up to the CSS
  // max-block-size clamp (past which overflow-y scrolls). Gated to value
  // changes so unrelated re-renders don't force a layout reflow.
  private _autosizeTextarea(): void {
    if (SUPPORTS_FIELD_SIZING) {
      return;
    }
    const textarea = this._textarea;
    if (!textarea) {
      return;
    }
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  private _handleInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-input', {
        bubbles: true,
        composed: true,
        detail: { value: this.value },
      })
    );
  }

  private _handleTextareaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
      return;
    }

    event.preventDefault();
    if (this.generating || this.disabled) {
      return;
    }
    this._handleSendClick();
  }

  /** Focuses the textarea when a pointerdown doesn't land on a focusable descendant. */
  private _handlePromptSurfacePointerDown(event: PointerEvent): void {
    if (this.disabled) {
      return;
    }
    const box = event.currentTarget as HTMLElement;
    let target = event.target as Element | null;
    while (target && target !== box && !this._isFocusableOrSlotted(target)) {
      target = target.parentElement;
    }
    if (target === box) {
      event.preventDefault();
      this._textarea?.focus();
    }
  }

  private _isFocusableOrSlotted(element: Element): boolean {
    return element.matches(`${focusableSelector}, slot`);
  }

  private _handleSendClick(): void {
    if (!this._isPopulated || this.disabled) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent<PromptFieldSubmitDetail>('swc-prompt-field-submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this.value,
        },
      })
    );
  }

  private _handleStopClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-stop', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handleUploadClick(): void {
    this.dispatchEvent(
      new CustomEvent('swc-prompt-field-upload-click', {
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  private _handleAttachmentSlotChange(): void {
    this._warnIfMixedAttachmentTypes();
    this._attachmentNavigation.refresh();
    // A single attachment has no row wrapper or roving-tabindex controller
    // (that only manages 2+ tiles), so it must carry its own tabindex
    // directly; ponytail: reachable via Tab, not yet wired into arrow-key
    // navigation. For 2+ tiles, `refresh()` above already owns every tile's
    // tabindex.
    const attachments = this._assignedAttachmentElements ?? [];
    if (attachments.length === 1) {
      attachments[0].tabIndex = 0;
    }
    const dismissedAttachment = this._pendingAttachmentDismiss;
    const dismissedAttachmentWasRemoved =
      dismissedAttachment !== undefined &&
      !(this._assignedAttachmentElements ?? []).includes(
        dismissedAttachment.attachment
      );
    if (dismissedAttachmentWasRemoved) {
      this._pendingAttachmentDismiss = undefined;
      this._restoreAttachmentFocusAfterDismiss(dismissedAttachment.index);
    }
    const attachmentsBeforeDrop = this._pendingAttachmentDropFocus;
    if (attachmentsBeforeDrop) {
      this._pendingAttachmentDropFocus = undefined;
      const droppedAttachment = attachments.find(
        (attachment) => !attachmentsBeforeDrop.includes(attachment)
      );
      if (droppedAttachment) {
        this._prepareAttachmentDropTarget(droppedAttachment);
      }
    }
    this.requestUpdate();
    void this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this._observeAttachmentScrollViewport();
        this._updateAttachmentScrollState();
      });
    });
  }

  private _handleAttachmentDismiss(event: Event): void {
    const active = getActiveElement();
    const attachment = event
      .composedPath()
      .find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          (this._assignedAttachmentElements ?? []).includes(node)
      );
    if (!attachment || !active || !deepContains(attachment, active)) {
      return;
    }

    this._pendingAttachmentDismiss = {
      attachment,
      index: (this._assignedAttachmentElements ?? []).indexOf(attachment),
    };
  }

  private _restoreAttachmentFocusAfterDismiss(index: number): void {
    const attachments = this._assignedAttachmentElements ?? [];
    if (attachments.length === 0) {
      this.shadowRoot
        ?.querySelector<HTMLTextAreaElement>('.swc-PromptField-textarea')
        ?.focus();
      return;
    }

    const target = attachments[Math.min(index, attachments.length - 1)];
    if (attachments.length === 1) {
      target.tabIndex = 0;
      target.focus();
      return;
    }

    this._attachmentNavigation.refresh();
    this._focusAttachment(target);
  }

  // Restarts a poll on every `scroll` tick that settles once `scrollLeft`
  // holds steady for a few frames — racing the real `scrollend` listener
  // below, not gated behind feature detection (see
  // `_attachmentScrollFallbackGeneration`'s doc for why). A fixed setTimeout
  // delay would race against a real scroll's own frame cadence instead
  // (fire early mid-gesture, or late enough to feel unresponsive); polling
  // for actual stability can't.
  private _handleAttachmentScroll(): void {
    const scrollEl = this._attachmentScrollEl;
    if (!scrollEl) {
      return;
    }

    const generation = ++this._attachmentScrollFallbackGeneration;
    let lastScrollLeft = scrollEl.scrollLeft;
    let stableFrames = 0;
    const poll = (): void => {
      if (generation !== this._attachmentScrollFallbackGeneration) {
        return;
      }
      if (scrollEl.scrollLeft !== lastScrollLeft) {
        lastScrollLeft = scrollEl.scrollLeft;
        stableFrames = 0;
      } else if (++stableFrames < 3) {
        // not yet settled
      } else {
        this._handleAttachmentScrollEnd();
        return;
      }
      requestAnimationFrame(poll);
    };
    requestAnimationFrame(poll);
  }

  /**
   * `scrollend`, not `scroll`: paging/scrollbar-drag animate over several
   * frames, and `scroll` fires on every one of them. Reacting mid-gesture
   * can lock in a tile that's only transiently passing through the
   * visible region as active, or flip the chevrons' aria-disabled state
   * back and forth for no reason a user would ever see settled.
   *
   * Also reachable from `_handleAttachmentScroll`'s poll, which is why this
   * bumps the generation counter itself: whichever of the two (a real
   * `scrollend`, or the poll settling) happens first wins, and that
   * invalidates the other so it can't also fire.
   */
  private _handleAttachmentScrollEnd(): void {
    this._attachmentScrollFallbackGeneration++;
    this._updateAttachmentScrollState();
    void this.updateComplete.then(() =>
      this._syncAttachmentActiveItemToVisible()
    );
  }

  /**
   * `memory` keeps the roving tab stop on whichever tile was last active,
   * with no awareness of scroll position. Left alone, Tab from a chevron
   * (or back into the strip generally) can land on a tile that's no longer
   * visible, having scrolled out from under it. Re-point the roving stop
   * at a currently visible tile whenever the strip scrolls, so Tab always
   * lands somewhere the user can see.
   */
  private _syncAttachmentActiveItemToVisible(): void {
    const scrollEl = this._attachmentScrollEl;
    const attachments = this._assignedAttachmentElements ?? [];
    if (!scrollEl || attachments.length < 2) {
      return;
    }

    const { left, right } = this._attachmentVisibleBounds(scrollEl);
    const active = this._attachmentNavigation.getActiveItem();
    if (active && this._isAttachmentVisible(active, left, right)) {
      return;
    }

    this._attachmentNavigation.setActiveItem(
      this._findAttachmentAtOrPastBoundary(this._isRtl() ? right : left)
    );
  }

  /**
   * The scroll viewport's own bounds, clear of the chevron overlays on
   * both sides. Reads the same `scroll-padding-inline` the
   * `has-scroll-prev`/`has-scroll-next` CSS rules set (prompt-field.css)
   * as the single source of truth for how much clearance a visible
   * chevron needs, instead of duplicating that math here.
   */
  private _attachmentVisibleBounds(scrollEl: HTMLElement): {
    left: number;
    right: number;
  } {
    const scrollRect = scrollEl.getBoundingClientRect();
    const scrollStyle = getComputedStyle(scrollEl);
    return {
      left: scrollRect.left + (parseFloat(scrollStyle.scrollPaddingLeft) || 0),
      right:
        scrollRect.right - (parseFloat(scrollStyle.scrollPaddingRight) || 0),
    };
  }

  private _isAttachmentVisible(
    attachment: HTMLElement,
    visibleLeft: number,
    visibleRight: number
  ): boolean {
    const rect = attachment.getBoundingClientRect();
    const tolerance = 1;
    return (
      rect.left >= visibleLeft - tolerance &&
      rect.right <= visibleRight + tolerance
    );
  }

  private _focusAttachment(el: HTMLElement): void {
    this._attachmentNavigation.setActiveItem(el);
    el.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
    el.focus();
  }

  // Always makes the dropped tile the roving-tabindex entry point (so a later Tab into the strip lands there); only steals focus now if already in a keyboard session.
  private _prepareAttachmentDropTarget(el: HTMLElement): void {
    this._attachmentNavigation.setActiveItem(el);
    if (isFocusVisibleInTree()) {
      el.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
      el.focus();
    }
  }

  /** Reacts to `swc-focusgroup-navigation-active-change` from `_attachmentNavigation`. */
  private _handleAttachmentActiveChange = (
    event: CustomEvent<FocusgroupNavigationActiveChangeDetail>
  ): void => {
    const { activeElement, source } = event.detail;
    if (!activeElement || (source !== 'keyboard' && source !== 'focus')) {
      return;
    }
    activeElement.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  };

  private _handleAttachmentRowKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    this._handleAttachmentTabKey(event);
  }

  // swc-action-button delegates focus to its internal button, so the deep
  // active element is that button; map it back to the action-button host the
  // strip's Tab logic compares against (dismiss/chevron).
  private _delegatedFocusHost(active: Element): Element {
    const root = active.getRootNode();
    return root instanceof ShadowRoot &&
      root.host.localName === 'swc-action-button'
      ? root.host
      : active;
  }

  private _handleAttachmentTabKey(event: KeyboardEvent): void {
    const activeElement = getActiveElement();
    if (!activeElement) {
      return;
    }
    const active = this._delegatedFocusHost(activeElement);

    const attachments = this._assignedAttachmentElements ?? [];
    const nextButton = this.shadowRoot?.querySelector<HTMLElement>(
      '.swc-PromptField-attachments-scroll-next'
    );
    const prevButton = this.shadowRoot?.querySelector<HTMLElement>(
      '.swc-PromptField-attachments-scroll-prev'
    );

    // From the active tile: Tab reveals its Close button. Shift+Tab is left
    // to native default, which (roving tabindex leaves every other tile at
    // -1) exits the group entirely regardless of which tile is active.
    if (attachments.includes(active as HTMLElement)) {
      if (event.shiftKey) {
        return;
      }
      const dismiss = this._attachmentDismissButton(active as HTMLElement);
      if (dismiss) {
        event.preventDefault();
        dismiss.focus();
      }
      return;
    }

    // From a tile's Close button: Tab moves to the Next chevron (if
    // rendered); Shift+Tab returns to the tile.
    const root = active.getRootNode();
    if (
      root instanceof ShadowRoot &&
      attachments.includes(root.host as HTMLElement) &&
      active.classList.contains('swc-UploadAttachment-dismiss')
    ) {
      const tile = root.host as HTMLElement;
      if (event.shiftKey) {
        event.preventDefault();
        tile.focus();
        return;
      }
      if (nextButton && this._attachmentCanScrollNext) {
        event.preventDefault();
        nextButton.focus();
      }
      return;
    }

    // From the Next chevron: Shift+Tab moves backward into the roving
    // controller's current active tile (updated by `_scrollAttachmentsByPage`
    // after paging, so this lands in the newly displayed set rather than
    // wherever focus was before the page turned) — its Close button when
    // visible, mirroring the forward tile -> Close -> Next chain in reverse,
    // otherwise the tile itself.
    if (active === nextButton && event.shiftKey) {
      const activeTile = this._attachmentNavigation.getActiveItem();
      if (activeTile) {
        event.preventDefault();
        (this._attachmentDismissButton(activeTile) ?? activeTile).focus();
      }
      return;
    }

    // From the Prev chevron: plain Tab moves forward into the roving
    // controller's current active tile, for the same reason as above.
    if (active === prevButton && !event.shiftKey) {
      const activeTile = this._attachmentNavigation.getActiveItem();
      if (activeTile) {
        event.preventDefault();
        activeTile.focus();
      }
    }
  }

  /** `tile`'s Close button, or `null` when absent or not currently shown. */
  private _attachmentDismissButton(
    tile: HTMLElement
  ): HTMLButtonElement | null {
    const dismiss = tile.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-UploadAttachment-dismiss'
    );
    return dismiss && !dismiss.hidden ? dismiss : null;
  }

  /**
   * A single attachment has no row wrapper or roving-tabindex controller (see
   * `_handleAttachmentRowKeydown`/`_handleAttachmentTabKey`), so Tab from the
   * tile would otherwise fall through to the next default tab stop (the
   * textarea) and skip its Close button entirely.
   */
  private _handleSingleAttachmentKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const tile = (this._assignedAttachmentElements ?? [])[0];
    if (!tile) {
      return;
    }

    const activeElement = getActiveElement();
    if (!activeElement) {
      return;
    }
    const active = this._delegatedFocusHost(activeElement);
    if (active === tile) {
      if (event.shiftKey) {
        return;
      }
      const dismiss = tile.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadAttachment-dismiss'
      );
      if (dismiss && !dismiss.hidden) {
        event.preventDefault();
        dismiss.focus();
      }
      return;
    }

    if (!event.shiftKey) {
      return;
    }
    const root = active.getRootNode();
    if (
      root instanceof ShadowRoot &&
      root.host === tile &&
      active.classList.contains('swc-UploadAttachment-dismiss')
    ) {
      event.preventDefault();
      tile.focus();
    }
  }

  private _observeAttachmentScrollViewport(): void {
    const scrollEl = this._attachmentScrollEl;
    if (!scrollEl) {
      return;
    }

    this._attachmentScrollObserver.observe(scrollEl);
    for (const element of this._assignedAttachmentElements ?? []) {
      this._attachmentScrollObserver.observe(element);
    }
    this._updateAttachmentScrollState();
  }

  private _isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  /**
   * First attachment whose leading (reading-direction-start) edge is at or
   * past the physical viewport x-coordinate `boundary`. Falls back to the
   * last attachment if none qualify. Shared by `_scrollAttachmentsByPage`
   * (`boundary` is where the next/previous page will start) and
   * `_syncAttachmentActiveItemToVisible` (`boundary` is the visible
   * window's own start edge) so both "find the first attachment at a given
   * point" needs go through one RTL-aware comparison instead of two.
   */
  private _findAttachmentAtOrPastBoundary(boundary: number): HTMLElement {
    const children = this._assignedAttachmentElements ?? [];
    const rtl = this._isRtl();
    const tolerance = 1;
    return (
      children.find((child) =>
        rtl
          ? child.getBoundingClientRect().right <= boundary + tolerance
          : child.getBoundingClientRect().left >= boundary - tolerance
      ) ?? children[children.length - 1]!
    );
  }

  private _scrollAttachmentsByPage(direction: -1 | 1): void {
    const scrollEl = this._attachmentScrollEl;
    const children = this._assignedAttachmentElements ?? [];
    if (!scrollEl || children.length < 2) {
      return;
    }

    // Scroll the page-start tile into view: snap-aligned, clamps at the edge.
    const scrollRect = scrollEl.getBoundingClientRect();
    const pageStart = this._isRtl()
      ? scrollRect.right - direction * scrollEl.clientWidth
      : scrollRect.left + direction * scrollEl.clientWidth;
    const target = this._findAttachmentAtOrPastBoundary(pageStart);
    this._attachmentNavigation.setActiveItem(target);
    target.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  // aria-disabled, not disabled: a chevron the user just activated stays
  // focused instead of being blurred by the browser's own disabled-element
  // handling. That leaves it keyboard-activatable in the brief window
  // before its aria-disabled state actually updates, hence these guards.
  private _handleAttachmentScrollPrev(): void {
    if (!this._attachmentCanScrollPrev) {
      return;
    }
    this._scrollAttachmentsByPage(-1);
  }

  private _handleAttachmentScrollNext(): void {
    if (!this._attachmentCanScrollNext) {
      return;
    }
    this._scrollAttachmentsByPage(1);
  }

  private _updateAttachmentScrollState(): void {
    const focusedChevron = this._focusedChevronDirection();
    const scrollEl = this._attachmentScrollEl;
    if (!scrollEl) {
      this._attachmentScrollOverflow = false;
      this._attachmentCanScrollPrev = false;
      this._attachmentCanScrollNext = false;
      this._redirectFocusFromDisabledChevron(focusedChevron);
      return;
    }

    const { scrollWidth, clientWidth } = scrollEl;
    const tolerance = 1;
    const overflow = scrollWidth > clientWidth + tolerance;
    const children = this._assignedAttachmentElements ?? [];
    const firstAttachment = children[0];
    const lastAttachment = children[children.length - 1];

    this._attachmentScrollOverflow = overflow;
    if (!overflow || !firstAttachment || !lastAttachment) {
      this._attachmentCanScrollPrev = false;
      this._attachmentCanScrollNext = false;
      this._redirectFocusFromDisabledChevron(focusedChevron);
      return;
    }

    const scrollRect = scrollEl.getBoundingClientRect();
    const firstRect = firstAttachment.getBoundingClientRect();
    const lastRect = lastAttachment.getBoundingClientRect();
    const rtl = this._isRtl();

    this._attachmentCanScrollPrev = rtl
      ? firstRect.right > scrollRect.right + tolerance
      : firstRect.left < scrollRect.left - tolerance;
    this._attachmentCanScrollNext = rtl
      ? lastRect.left < scrollRect.left - tolerance
      : lastRect.right > scrollRect.right + tolerance;
    this._redirectFocusFromDisabledChevron(focusedChevron);
  }

  /** 'prev'/'next' when a scroll chevron currently holds focus, else null. */
  private _focusedChevronDirection(): 'prev' | 'next' | null {
    const active = getActiveElement();
    if (!active) {
      return null;
    }
    const host = this._delegatedFocusHost(active);
    if (host.classList.contains('swc-PromptField-attachments-scroll-prev')) {
      return 'prev';
    }
    if (host.classList.contains('swc-PromptField-attachments-scroll-next')) {
      return 'next';
    }
    return null;
  }

  // A chevron the user is on can lose its scroll direction (or unrender) as the
  // strip settles; move focus to the active tile so it isn't stranded on the
  // now-hidden control.
  private _redirectFocusFromDisabledChevron(
    direction: 'prev' | 'next' | null
  ): void {
    if (!direction) {
      return;
    }
    const canStillScroll =
      direction === 'prev'
        ? this._attachmentCanScrollPrev
        : this._attachmentCanScrollNext;
    if (canStillScroll) {
      return;
    }
    const tile =
      this._attachmentNavigation.getActiveItem() ??
      this._assignedAttachmentElements?.[0];
    tile?.focus();
  }

  private _warnedMixedAttachmentTypes = false;

  private _warnedMissingLegalContent = false;

  private _warnIfMixedAttachmentTypes(): void {
    if (!window.__swc?.DEBUG) {
      return;
    }

    const elements = this._assignedAttachmentElements ?? [];
    const types = new Set(
      elements
        .map((element) => element.getAttribute('type'))
        .filter(
          (type): type is 'card' | 'media' =>
            type === 'card' || type === 'media'
        )
    );

    if (types.size <= 1) {
      this._warnedMixedAttachmentTypes = false;
      return;
    }

    if (this._warnedMixedAttachmentTypes) {
      return;
    }

    this._warnedMixedAttachmentTypes = true;
    window.__swc.warn(
      this,
      'The attachment slot contains both card and media upload attachments. Use one layout type per composer session (all card or all media). When uploads mix images and documents, normalize to media tiles with thumbnails and optional badges.',
      'https://opensource.adobe.com/spectrum-web-components/patterns/ai-toolkit/prompt-field/'
    );
  }

  private _warnIfMissingLegalContent(): void {
    if (!window.__swc?.DEBUG) {
      return;
    }

    const elements = this._assignedLegalElements ?? [];

    if (elements.length > 0) {
      this._warnedMissingLegalContent = false;
      return;
    }

    if (this._warnedMissingLegalContent) {
      return;
    }

    this._warnedMissingLegalContent = true;
    window.__swc.warn(
      this,
      'The legal slot is empty. Product implementations must provide Legal-approved disclaimer content via the legal slot.',
      'https://opensource.adobe.com/spectrum-web-components/patterns/ai-toolkit/prompt-field/'
    );
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      (this._assignedAttachmentElements?.length ?? 0) > 0
    );
  }

  private get _normalizedMinRows(): number {
    return this.minRows ? Math.max(1, Math.floor(this.minRows)) : 1;
  }

  private get _normalizedMaxRows(): number | undefined {
    return this.maxRows
      ? Math.max(this._normalizedMinRows, Math.floor(this.maxRows))
      : undefined;
  }

  private _handleLegalSlotChange(): void {
    this._warnIfMissingLegalContent();
    this.requestUpdate();
  }

  private _renderLegalFooter(): TemplateResult | null {
    if ((this._assignedLegalElements?.length ?? 0) === 0) {
      return html`
        <slot
          name="legal"
          hidden
          @slotchange=${this._handleLegalSlotChange}
        ></slot>
      `;
    }
    return html`
      <div class="swc-PromptField-footer">
        <slot name="legal" @slotchange=${this._handleLegalSlotChange}></slot>
      </div>
    `;
  }

  private _renderAttachment(): TemplateResult {
    const attachmentCount = this._assignedAttachmentElements?.length ?? 0;

    if (attachmentCount === 0) {
      return html`
        <div class="swc-PromptField-attachments" hidden>
          <slot
            name="attachment"
            @slotchange=${this._handleAttachmentSlotChange}
          ></slot>
        </div>
      `;
    }

    if (attachmentCount === 1) {
      return html`
        <div
          class="swc-PromptField-attachments swc-PromptField-attachments--single"
          @swc-upload-attachment-dismiss=${this._handleAttachmentDismiss}
          @keydown=${this._handleSingleAttachmentKeydown}
        >
          <slot
            name="attachment"
            @slotchange=${this._handleAttachmentSlotChange}
          ></slot>
        </div>
      `;
    }

    return html`
      <div
        class="swc-PromptField-attachments swc-PromptField-attachments--multiple"
        @swc-upload-attachment-dismiss=${this._handleAttachmentDismiss}
      >
        <div
          class="swc-PromptField-attachments-row"
          @keydown=${this._handleAttachmentRowKeydown}
        >
          ${this._attachmentScrollOverflow
            ? html`
                <swc-action-button
                  class="swc-PromptField-attachments-scroll-prev"
                  accessible-label=${this.attachmentScrollPrevLabel}
                  aria-disabled=${!this._attachmentCanScrollPrev}
                  tabindex=${this._attachmentCanScrollPrev ? nothing : -1}
                  @click=${this._handleAttachmentScrollPrev}
                >
                  <swc-icon slot="icon" size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </swc-action-button>
              `
            : nothing}
          <div
            class="swc-PromptField-attachments-viewport"
            role="region"
            aria-label=${this.attachmentStripLabel}
          >
            <div
              class=${classMap({
                'swc-PromptField-attachments-scroll': true,
                'has-scroll-prev': this._attachmentCanScrollPrev,
                'has-scroll-next': this._attachmentCanScrollNext,
              })}
              tabindex="-1"
              @scroll=${this._handleAttachmentScroll}
              @scrollend=${this._handleAttachmentScrollEnd}
            >
              <div class="swc-PromptField-attachments-tiles">
                <slot
                  name="attachment"
                  @slotchange=${this._handleAttachmentSlotChange}
                ></slot>
              </div>
            </div>
          </div>
          ${this._attachmentScrollOverflow
            ? html`
                <swc-action-button
                  class="swc-PromptField-attachments-scroll-next"
                  accessible-label=${this.attachmentScrollNextLabel}
                  aria-disabled=${!this._attachmentCanScrollNext}
                  tabindex=${this._attachmentCanScrollNext ? nothing : -1}
                  @click=${this._handleAttachmentScrollNext}
                >
                  <swc-icon slot="icon" size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </swc-action-button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderSendButton(): TemplateResult {
    return html`
      <swc-action-button
        class="swc-PromptField-send"
        ?disabled=${!this._isPopulated || this.disabled}
        accessible-label=${this.sendLabel}
        @click=${this._handleSendClick}
      >
        <swc-icon slot="icon" aria-hidden="true">${ChevronUpIcon()}</swc-icon>
      </swc-action-button>
    `;
  }

  private _renderStopButton(): TemplateResult {
    return html`
      <swc-action-button
        class="swc-PromptField-stop"
        accessible-label=${this.stopLabel}
        @click=${this._handleStopClick}
      >
        <swc-icon slot="icon" aria-hidden="true">${StopIcon()}</swc-icon>
      </swc-action-button>
    `;
  }

  /** Status pixel-loader: paused on a settled frame while idle, animating while generating. */
  private _renderStatusIcon(): TemplateResult {
    // One `loader` value routes to the pixel-loader's icon or preset; the name
    // sets are disjoint, so preset membership disambiguates. Typed against the
    // loader so the inlined union can never pass an invalid value.
    const isPreset = (PIXEL_LOADER_PRESET_NAMES as readonly string[]).includes(
      this.loader
    );
    const preset = isPreset
      ? (this.loader as PixelLoaderPresetName)
      : undefined;
    // Keep a valid icon even in preset mode; removing the attribute lands as `null` and trips the loader's dev validation.
    const icon = isPreset
      ? DEFAULT_LOADER_ICON
      : (this.loader as PixelLoaderIconName);
    return html`
      <span class="swc-PromptField-status-icon" aria-hidden="true">
        <swc-pixel-loader
          icon=${icon}
          preset=${ifDefined(preset)}
          ?paused=${!this.generating}
        ></swc-pixel-loader>
      </span>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this.generating;
    const hasAttachments = (this._assignedAttachmentElements?.length ?? 0) > 0;

    return html`
      <div class="swc-PromptField">
        <div
          class=${classMap({
            'swc-PromptField-outer-border': true,
            dragged: this._dragged,
          })}
        >
          <div
            class="swc-PromptField-box"
            @pointerdown=${this._handlePromptSurfacePointerDown}
          >
            <span class="swc-PromptField-gloss"></span>
            <div
              class="swc-PromptField-input-area${hasAttachments
                ? ' has-attachment'
                : ''}"
            >
              ${this._renderAttachment()}
              <span
                id=${this.labelId}
                class="swc-PromptField-label swc-VisuallyHidden"
              >
                ${this.label}
              </span>
              <div class="swc-PromptField-controls">
                <div class="swc-PromptField-text-group">
                  ${this._renderStatusIcon()}
                  <textarea
                    class="swc-PromptField-textarea"
                    .value=${this.value}
                    placeholder=${this.placeholder}
                    aria-labelledby=${this.labelId}
                    aria-label=${ifDefined(
                      this.accessibleLabel.trim().length > 0
                        ? this.accessibleLabel.trim()
                        : undefined
                    )}
                    aria-placeholder=${ifDefined(this.placeholder || undefined)}
                    ?disabled=${this.disabled}
                    rows=${this._normalizedMinRows}
                    style=${styleMap({
                      '--swc-prompt-field-textarea-min-rows': String(
                        this._normalizedMinRows
                      ),
                      '--swc-prompt-field-textarea-max-rows':
                        this._normalizedMaxRows !== undefined
                          ? String(this._normalizedMaxRows)
                          : undefined,
                    })}
                    @input=${this._handleInput}
                    @keydown=${this._handleTextareaKeydown}
                  ></textarea>
                </div>
                <div
                  class="swc-PromptField-leading-actions"
                  aria-hidden=${ifDefined(this.collapsed ? 'true' : undefined)}
                  .inert=${this.collapsed}
                >
                  <div class="swc-PromptField-leading-actions-row">
                    <swc-action-button
                      quiet
                      class="swc-PromptField-upload"
                      accessible-label=${this.uploadLabel}
                      ?disabled=${this.disabled}
                      @click=${this._handleUploadClick}
                    >
                      <swc-icon slot="icon" aria-hidden="true">
                        ${PlusIcon()}
                      </swc-icon>
                    </swc-action-button>
                  </div>
                </div>
                ${showStop
                  ? this._renderStopButton()
                  : this._renderSendButton()}
              </div>
            </div>
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
