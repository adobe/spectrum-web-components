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

import { Chevron75Icon } from '@adobe/spectrum-wc/icon/elements/index.js';
import {
  focusgroupNavigationActiveChange,
  type FocusgroupNavigationActiveChangeDetail,
  FocusgroupNavigationController,
} from '@adobe/spectrum-wc-core/controllers/index.js';
import { SpectrumElement } from '@adobe/spectrum-wc-core/element/index.js';
import {
  deepContains,
  getActiveElement,
} from '@adobe/spectrum-wc-core/utils/index.js';

import '@adobe/spectrum-wc/components/icon/swc-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import styles from './prompt-field.css';

export interface PromptFieldSubmitDetail {
  value: string;
}

export type PromptFieldMode = 'default' | 'loading' | 'disabled';

/**
 * Prompt entry surface for conversational AI flows.
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
 * @slot artifact - Optional attachment preview(s). Use one `swc-upload-artifact` type per session (cards only, or media only).
 * @slot legal - Legal disclaimer content. Required in product implementations; provide Legal-approved copy.
 * @fires swc-prompt-field-input - Dispatched after the textarea value is internally updated.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-submit - Dispatched when send is triggered.
 * Detail: `{ value: string }`
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested in loading mode.
 * @fires swc-prompt-field-upload-click - Dispatched when upload affordance is activated.
 * Consumers should handle file picker flow externally.
 */
export class PromptField extends SpectrumElement {
  private readonly labelId = uniqueId('swc-prompt-field-label');

  /** Visual mode for the prompt field action/interaction state. */
  @property({ type: String, reflect: true })
  public mode: PromptFieldMode = 'default';

  /** Accessible label shown above the textarea. */
  @property({ type: String })
  public label = 'Prompt';

  /** Optional accessible label override for the textarea. */
  @property({ type: String, attribute: 'accessible-label' })
  public accessibleLabel = '';

  /** Accessible label for the send action button. */
  @property({ type: String, attribute: 'send-label' })
  public sendLabel = 'Send';

  /** Accessible label for the stop action button in loading mode. */
  @property({ type: String, attribute: 'stop-label' })
  public stopLabel = 'Stop generating';

  /** Accessible label for the upload button. */
  @property({ type: String, attribute: 'upload-label' })
  public uploadLabel = 'Add attachment';

  /** Accessible label for the previous-artifact scroll button. */
  @property({ type: String, attribute: 'artifact-scroll-prev-label' })
  public artifactScrollPrevLabel = 'Show previous attachments';

  /** Accessible label for the next-artifact scroll button. */
  @property({ type: String, attribute: 'artifact-scroll-next-label' })
  public artifactScrollNextLabel = 'Show more attachments';

  /** Accessible name for the uploaded-artifacts strip landmark. */
  @property({ type: String, attribute: 'artifact-strip-label' })
  public artifactStripLabel = 'Uploaded assets strip';

  /** Placeholder text shown inside the textarea. */
  @property({ type: String })
  public placeholder =
    'Ready to get started? Ask a question, share an idea, or add a task.';

  /** The current textarea value; internally updated and externally mirrorable. */
  @property({ type: String })
  public value = '';

  /** Minimum visible textarea rows before growth. */
  @property({ type: Number, attribute: 'min-rows' })
  public minRows = 1;

  /** Maximum visible textarea rows before internal scrolling. */
  @property({ type: Number, attribute: 'max-rows' })
  public maxRows = 4;

  @queryAssignedElements({ slot: 'artifact', flatten: true })
  private _assignedArtifactElements!: HTMLElement[];

  @query('.swc-PromptField-artifacts-scroll')
  private _artifactScrollEl?: HTMLDivElement;

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

  /** Next textarea focus follows pointerdown on the textarea (click/touch). */
  private _textareaFocusFromPointer = false;

  /** Outer card ring: Tab / non-pointer focus only (see prompt-field.css). */
  @state()
  private _promptBoxKeyboardFocusRing = false;

  @state()
  private _artifactScrollOverflow = false;

  @state()
  private _artifactCanScrollPrev = false;

  @state()
  private _artifactCanScrollNext = false;

  private _artifactScrollObserver?: ResizeObserver;

  @state()
  private _artifactScrollFromButtons = false;

  @state()
  private _artifactScrollbarInteracting = false;

  private _artifactScrollButtonResetTimer?: number;

  /**
   * Roving tabindex + arrow-key focus movement across artifact tiles. The
   * first (or last-active, via `memory`) tile always carries `tabindex="0"`,
   * so it is Tab's first stop into the strip with no separate entry step;
   * Arrow Left/Right move that roving stop one tile at a time. Chevron
   * buttons separately page by a full set, unrelated to this controller.
   */
  private readonly _artifactNavigation = new FocusgroupNavigationController(
    this,
    {
      direction: 'horizontal',
      wrap: false,
      memory: true,
      getItems: () => this._assignedArtifactElements ?? [],
      onActiveItemChange: () => this.requestUpdate(),
    }
  );

  /** Set in `willUpdate` when a chevron about to disappear currently has focus; consumed in `updated`. */
  private _pendingArtifactFocusRedirect: 'first' | 'last' | null = null;

  private _artifactScrollbarInteractTimer?: number;

  private _artifactScrollbarThumbDragOffset = 0;

  private _artifactScrollbarDragCleanup?: () => void;

  private _pendingArtifactDismiss?: { artifact: HTMLElement; index: number };

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(
      focusgroupNavigationActiveChange,
      this._handleArtifactActiveChange as EventListener
    );
  }

  public override disconnectedCallback(): void {
    this.removeEventListener(
      focusgroupNavigationActiveChange,
      this._handleArtifactActiveChange as EventListener
    );
    this._artifactScrollObserver?.disconnect();
    this._artifactScrollObserver = undefined;
    if (this._artifactScrollButtonResetTimer !== undefined) {
      window.clearTimeout(this._artifactScrollButtonResetTimer);
    }
    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
    }
    this._artifactScrollbarDragCleanup?.();
    super.disconnectedCallback();
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    this._captureArtifactChevronFocusRedirect(changed);
  }

  protected override updated(): void {
    this._warnIfMissingLegalContent();
    this._applyArtifactChevronFocusRedirect();

    if ((this._assignedArtifactElements?.length ?? 0) < 2) {
      this._artifactScrollObserver?.disconnect();
      return;
    }

    requestAnimationFrame(() => {
      this._observeArtifactScrollViewport();
    });
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

  private _handleTextareaPointerDown(event: PointerEvent): void {
    const textarea = event.currentTarget as HTMLTextAreaElement;
    if (textarea.matches(':focus')) {
      this._promptBoxKeyboardFocusRing = false;
      return;
    }

    this._textareaFocusFromPointer = true;
  }

  private _handleTextareaFocusIn(): void {
    const showRing = !this._textareaFocusFromPointer;
    this._textareaFocusFromPointer = false;
    this._promptBoxKeyboardFocusRing = showRing;
  }

  private _handleTextareaFocusOut(): void {
    this._promptBoxKeyboardFocusRing = false;
    this._textareaFocusFromPointer = false;
  }

  private _handleTextareaKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Enter' || event.shiftKey || event.isComposing) {
      return;
    }

    event.preventDefault();
    if (this._isLoading || this._isDisabled) {
      return;
    }
    this._handleSendClick();
  }

  private _handleSendClick(): void {
    if (!this._isPopulated || this._isDisabled) {
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

  private _handleArtifactSlotChange(): void {
    this._warnIfMixedArtifactTypes();
    this._artifactNavigation.refresh();
    // A single artifact has no row wrapper or roving-tabindex controller
    // (that only manages 2+ tiles), so it must carry its own tabindex
    // directly; ponytail: reachable via Tab, not yet wired into arrow-key
    // navigation. For 2+ tiles, `refresh()` above already owns every tile's
    // tabindex.
    const artifacts = this._assignedArtifactElements ?? [];
    if (artifacts.length === 1) {
      artifacts[0].tabIndex = 0;
    }
    const dismissedArtifact = this._pendingArtifactDismiss;
    const dismissedArtifactWasRemoved =
      dismissedArtifact !== undefined &&
      !(this._assignedArtifactElements ?? []).includes(
        dismissedArtifact.artifact
      );
    if (dismissedArtifactWasRemoved) {
      this._pendingArtifactDismiss = undefined;
      this._restoreArtifactFocusAfterDismiss(dismissedArtifact.index);
    }
    this.requestUpdate();
    void this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this._observeArtifactScrollViewport();
        this._updateArtifactScrollState();
      });
    });
  }

  private _handleArtifactDismiss(event: Event): void {
    const active = getActiveElement();
    const artifact = event
      .composedPath()
      .find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          (this._assignedArtifactElements ?? []).includes(node)
      );
    if (!artifact || !active || !deepContains(artifact, active)) {
      return;
    }

    this._pendingArtifactDismiss = {
      artifact,
      index: (this._assignedArtifactElements ?? []).indexOf(artifact),
    };
  }

  private _restoreArtifactFocusAfterDismiss(index: number): void {
    const artifacts = this._assignedArtifactElements ?? [];
    if (artifacts.length === 0) {
      this.shadowRoot
        ?.querySelector<HTMLTextAreaElement>('.swc-PromptField-textarea')
        ?.focus();
      return;
    }

    const target = artifacts[Math.min(index, artifacts.length - 1)];
    if (artifacts.length === 1) {
      target.tabIndex = 0;
      target.focus();
      return;
    }

    this._artifactNavigation.refresh();
    this._focusArtifact(target);
  }

  private _handleArtifactScroll(): void {
    this._updateArtifactScrollState();
    this.requestUpdate();
  }

  private _getArtifactScrollbarThumbStyle(): Record<string, string> {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return { width: '0px', insetInlineStart: '0px' };
    }

    const { scrollWidth, clientWidth, scrollLeft } = scrollEl;
    const tolerance = 1;
    if (scrollWidth <= clientWidth + tolerance) {
      return { width: '0px', insetInlineStart: '0px' };
    }

    const thumbWidth = Math.max((clientWidth / scrollWidth) * clientWidth, 24);
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const maxThumbOffset = Math.max(0, clientWidth - thumbWidth);
    const thumbOffset =
      maxScroll > 0 ? (scrollLeft / maxScroll) * maxThumbOffset : 0;

    return {
      width: `${thumbWidth}px`,
      insetInlineStart: `${thumbOffset}px`,
    };
  }

  private _setArtifactScrollFromThumbOffset(
    thumbOffset: number,
    trackWidth: number
  ): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return;
    }

    const thumbWidth = Math.max(
      (scrollEl.clientWidth / scrollEl.scrollWidth) * scrollEl.clientWidth,
      24
    );
    const maxThumbOffset = Math.max(0, trackWidth - thumbWidth);
    const clampedOffset = Math.max(0, Math.min(maxThumbOffset, thumbOffset));
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const ratio = maxThumbOffset > 0 ? clampedOffset / maxThumbOffset : 0;

    scrollEl.scrollLeft = ratio * maxScroll;
    this._updateArtifactScrollState();
    this.requestUpdate();
  }

  private _showArtifactScrollbarFromInteraction(): void {
    if (this._artifactScrollFromButtons) {
      return;
    }

    this._artifactScrollbarInteracting = true;

    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
    }

    this._artifactScrollbarInteractTimer = window.setTimeout(() => {
      this._artifactScrollbarInteracting = false;
      this._artifactScrollbarInteractTimer = undefined;
      this.requestUpdate();
    }, 1000);
  }

  private _prefersReducedMotion(): boolean {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private _artifactScrollBehavior(): ScrollBehavior {
    return this._prefersReducedMotion() ? 'auto' : 'smooth';
  }

  private _focusArtifact(el: HTMLElement): void {
    this._artifactNavigation.setActiveItem(el);
    el.scrollIntoView({
      behavior: this._artifactScrollBehavior(),
      block: 'nearest',
      inline: 'nearest',
    });
    el.focus();
  }

  /** Reacts to `swc-focusgroup-navigation-active-change` from `_artifactNavigation`. */
  private _handleArtifactActiveChange = (
    event: CustomEvent<FocusgroupNavigationActiveChangeDetail>
  ): void => {
    const { activeElement, source } = event.detail;
    if (!activeElement || (source !== 'keyboard' && source !== 'focus')) {
      return;
    }
    activeElement.scrollIntoView({
      behavior: this._artifactScrollBehavior(),
      block: 'nearest',
      inline: 'nearest',
    });
  };

  private _handleArtifactRowKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    this._handleArtifactTabKey(event);
  }

  private _handleArtifactTabKey(event: KeyboardEvent): void {
    const active = getActiveElement();
    if (!active) {
      return;
    }

    const artifacts = this._assignedArtifactElements ?? [];
    const nextButton = this.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-PromptField-artifacts-scroll-next'
    );
    const prevButton = this.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-PromptField-artifacts-scroll-prev'
    );

    // From the active tile: Tab reveals its Close button. Shift+Tab is left
    // to native default, which (roving tabindex leaves every other tile at
    // -1) exits the group entirely regardless of which tile is active.
    if (artifacts.includes(active as HTMLElement)) {
      if (event.shiftKey) {
        return;
      }
      const dismiss = this._artifactDismissButton(active as HTMLElement);
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
      artifacts.includes(root.host as HTMLElement) &&
      active.classList.contains('swc-UploadArtifact-dismiss')
    ) {
      const tile = root.host as HTMLElement;
      if (event.shiftKey) {
        event.preventDefault();
        tile.focus();
        return;
      }
      if (nextButton) {
        event.preventDefault();
        nextButton.focus();
      }
      return;
    }

    // From the Next chevron: Shift+Tab moves backward into the roving
    // controller's current active tile (updated by `_scrollArtifactsByPage`
    // after paging, so this lands in the newly displayed set rather than
    // wherever focus was before the page turned) — its Close button when
    // visible, mirroring the forward tile -> Close -> Next chain in reverse,
    // otherwise the tile itself.
    if (active === nextButton && event.shiftKey) {
      const activeTile = this._artifactNavigation.getActiveItem();
      if (activeTile) {
        event.preventDefault();
        (this._artifactDismissButton(activeTile) ?? activeTile).focus();
      }
      return;
    }

    // From the Prev chevron: plain Tab moves forward into the roving
    // controller's current active tile, for the same reason as above.
    if (active === prevButton && !event.shiftKey) {
      const activeTile = this._artifactNavigation.getActiveItem();
      if (activeTile) {
        event.preventDefault();
        activeTile.focus();
      }
    }
  }

  /** `tile`'s Close button, or `null` when absent or not currently shown. */
  private _artifactDismissButton(tile: HTMLElement): HTMLButtonElement | null {
    const dismiss = tile.shadowRoot?.querySelector<HTMLButtonElement>(
      '.swc-UploadArtifact-dismiss'
    );
    return dismiss && !dismiss.hidden ? dismiss : null;
  }

  /**
   * A single artifact has no row wrapper or roving-tabindex controller (see
   * `_handleArtifactRowKeydown`/`_handleArtifactTabKey`), so Tab from the
   * tile would otherwise fall through to the next default tab stop (the
   * textarea) and skip its Close button entirely.
   */
  private _handleSingleArtifactKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') {
      return;
    }

    const tile = (this._assignedArtifactElements ?? [])[0];
    if (!tile) {
      return;
    }

    const active = getActiveElement();
    if (active === tile) {
      if (event.shiftKey) {
        return;
      }
      const dismiss = tile.shadowRoot?.querySelector<HTMLButtonElement>(
        '.swc-UploadArtifact-dismiss'
      );
      if (dismiss && !dismiss.hidden) {
        event.preventDefault();
        dismiss.focus();
      }
      return;
    }

    if (!event.shiftKey || !active) {
      return;
    }
    const root = active.getRootNode();
    if (
      root instanceof ShadowRoot &&
      root.host === tile &&
      active.classList.contains('swc-UploadArtifact-dismiss')
    ) {
      event.preventDefault();
      tile.focus();
    }
  }

  private _captureArtifactChevronFocusRedirect(
    changed: PropertyValues<this>
  ): void {
    const active = getActiveElement();

    if (
      changed.has('_artifactCanScrollPrev') &&
      changed.get('_artifactCanScrollPrev') === true &&
      !this._artifactCanScrollPrev
    ) {
      const prevButton = this.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-scroll-prev'
      );
      if (active === prevButton) {
        this._pendingArtifactFocusRedirect = 'first';
      }
    }

    if (
      changed.has('_artifactCanScrollNext') &&
      changed.get('_artifactCanScrollNext') === true &&
      !this._artifactCanScrollNext
    ) {
      const nextButton = this.shadowRoot?.querySelector(
        '.swc-PromptField-artifacts-scroll-next'
      );
      if (active === nextButton) {
        this._pendingArtifactFocusRedirect = 'last';
      }
    }
  }

  private _applyArtifactChevronFocusRedirect(): void {
    if (!this._pendingArtifactFocusRedirect) {
      return;
    }

    const artifacts = this._assignedArtifactElements ?? [];
    const target =
      this._pendingArtifactFocusRedirect === 'first'
        ? artifacts[0]
        : artifacts[artifacts.length - 1];
    this._pendingArtifactFocusRedirect = null;
    if (target) {
      this._focusArtifact(target);
    }
  }

  private _handleArtifactWheel(event: WheelEvent): void {
    if (Math.abs(event.deltaX) > 0 || Math.abs(event.deltaY) > 0) {
      this._showArtifactScrollbarFromInteraction();
      this.requestUpdate();
    }
  }

  private _handleArtifactScrollbarLanePointerDown(event: PointerEvent): void {
    if (this._artifactScrollFromButtons) {
      return;
    }

    const lane = event.currentTarget as HTMLElement;
    const laneRect = lane.getBoundingClientRect();
    const thumbStyle = this._getArtifactScrollbarThumbStyle();
    const thumbWidth = Number.parseFloat(thumbStyle.width) || 0;
    const clickOffset = event.clientX - laneRect.left - thumbWidth / 2;

    this._setArtifactScrollFromThumbOffset(clickOffset, laneRect.width);
    this._showArtifactScrollbarFromInteraction();
  }

  private _handleArtifactScrollbarThumbPointerDown(event: PointerEvent): void {
    event.stopPropagation();

    if (this._artifactScrollFromButtons) {
      return;
    }

    const thumb = event.currentTarget as HTMLElement;
    const lane = thumb.parentElement;
    if (!lane) {
      return;
    }

    const thumbRect = thumb.getBoundingClientRect();
    this._artifactScrollbarThumbDragOffset = event.clientX - thumbRect.left;
    this._showArtifactScrollbarFromInteraction();

    const onPointerMove = (moveEvent: PointerEvent): void => {
      const laneRect = lane.getBoundingClientRect();
      const thumbOffset =
        moveEvent.clientX -
        laneRect.left -
        this._artifactScrollbarThumbDragOffset;
      this._setArtifactScrollFromThumbOffset(thumbOffset, laneRect.width);
      this._showArtifactScrollbarFromInteraction();
    };

    let onPointerUp: (() => void) | undefined;
    const cleanup = (): void => {
      window.removeEventListener('pointermove', onPointerMove);
      if (onPointerUp) {
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);
      }
      if (this._artifactScrollbarDragCleanup === cleanup) {
        this._artifactScrollbarDragCleanup = undefined;
      }
    };

    onPointerUp = (): void => cleanup();

    this._artifactScrollbarDragCleanup?.();
    this._artifactScrollbarDragCleanup = cleanup;
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
  }

  private _markArtifactScrollFromButtons(): void {
    const scrollEl = this._artifactScrollEl;
    this._artifactScrollFromButtons = true;
    this._artifactScrollbarInteracting = false;

    if (this._artifactScrollbarInteractTimer !== undefined) {
      window.clearTimeout(this._artifactScrollbarInteractTimer);
      this._artifactScrollbarInteractTimer = undefined;
    }

    if (this._artifactScrollButtonResetTimer !== undefined) {
      window.clearTimeout(this._artifactScrollButtonResetTimer);
    }

    const reset = (): void => {
      this._artifactScrollFromButtons = false;
      this._artifactScrollButtonResetTimer = undefined;
      scrollEl?.removeEventListener('scrollend', reset);
      this.requestUpdate();
    };

    scrollEl?.addEventListener('scrollend', reset, { once: true });
    this._artifactScrollButtonResetTimer = window.setTimeout(reset, 600);
  }

  private _observeArtifactScrollViewport(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      this._artifactScrollObserver?.disconnect();
      return;
    }

    if (!this._artifactScrollObserver) {
      this._artifactScrollObserver = new ResizeObserver(() => {
        this._updateArtifactScrollState();
      });
    }

    this._artifactScrollObserver.disconnect();
    this._artifactScrollObserver.observe(scrollEl);
    for (const element of this._assignedArtifactElements ?? []) {
      this._artifactScrollObserver.observe(element);
    }
    this._updateArtifactScrollState();
  }

  private _getArtifactScrollOffset(child: HTMLElement): number {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return 0;
    }

    return (
      child.getBoundingClientRect().left -
      scrollEl.getBoundingClientRect().left +
      scrollEl.scrollLeft
    );
  }

  private _getArtifactTileWidth(child: HTMLElement): number {
    return child.getBoundingClientRect().width || child.offsetWidth;
  }

  private _getVisibleArtifactRange(): { first: number; last: number } {
    const scrollEl = this._artifactScrollEl;
    const children = this._assignedArtifactElements ?? [];
    if (!scrollEl || !children.length) {
      return { first: 0, last: 0 };
    }

    const scrollLeft = scrollEl.scrollLeft;
    const viewportRight = scrollLeft + scrollEl.clientWidth;
    const tolerance = 1;
    let first = -1;
    let last = -1;

    for (let i = 0; i < children.length; i += 1) {
      const offset = this._getArtifactScrollOffset(children[i]);
      const right = offset + this._getArtifactTileWidth(children[i]);
      if (
        right > scrollLeft + tolerance &&
        offset < viewportRight - tolerance
      ) {
        if (first === -1) {
          first = i;
        }
        last = i;
      }
    }

    return {
      first: first === -1 ? 0 : first,
      last: last === -1 ? children.length - 1 : last,
    };
  }

  private _getArtifactMaxScroll(scrollEl: HTMLDivElement): number {
    return Math.max(0, scrollEl.scrollWidth - scrollEl.clientWidth);
  }

  private _getArtifactTileVisibleFraction(
    child: HTMLElement,
    scrollEl: HTMLDivElement
  ): number {
    const tileWidth = this._getArtifactTileWidth(child);
    if (!tileWidth) {
      return 0;
    }

    const offset = this._getArtifactScrollOffset(child);
    const right = offset + tileWidth;
    const scrollLeft = scrollEl.scrollLeft;
    const viewportRight = scrollLeft + scrollEl.clientWidth;
    const visibleWidth =
      Math.min(right, viewportRight) - Math.max(offset, scrollLeft);

    return Math.max(0, visibleWidth) / tileWidth;
  }

  private _scrollArtifactsByPage(direction: -1 | 1): void {
    const scrollEl = this._artifactScrollEl;
    const children = this._assignedArtifactElements ?? [];
    if (!scrollEl || children.length < 2) {
      return;
    }

    const tolerance = 1;
    const maxScroll = this._getArtifactMaxScroll(scrollEl);
    const { first, last } = this._getVisibleArtifactRange();

    if (direction === 1) {
      if (scrollEl.scrollLeft >= maxScroll - tolerance) {
        return;
      }

      this._markArtifactScrollFromButtons();

      if (last >= children.length - 1) {
        // Land on the exact numeric maxScroll rather than a geometry-based
        // scrollIntoView alignment: aligning the last tile's end edge can
        // land a subpixel short of maxScroll (unlike aligning to the first
        // tile's start, which is trivially exact at 0), leaving the next
        // chevron stuck visible since it compares against this same maxScroll.
        scrollEl.scrollTo({
          left: maxScroll,
          behavior: 'auto',
        });
        // Points the roving tab stop at the now-visible last tile, without
        // moving focus off the Next button, so Shift+Tab from Next lands in
        // the newly displayed set rather than wherever focus was left before
        // paging.
        this._artifactNavigation.setActiveItem(children[children.length - 1]);
        return;
      }

      // last < children.length - 1 here (the "already at the end" case
      // returned above), so an ambiguous edge tile (< 50% visible) is
      // carried over as the next page's anchor; otherwise page fully.
      const lastVisibleFraction = this._getArtifactTileVisibleFraction(
        children[last],
        scrollEl
      );
      const nextStart =
        lastVisibleFraction >= 0.5 ? children[last + 1] : children[last];

      nextStart.scrollIntoView({
        behavior: this._artifactScrollBehavior(),
        block: 'nearest',
        inline: 'start',
      });
      // See the comment on the exact-maxScroll branch above.
      this._artifactNavigation.setActiveItem(nextStart);
      return;
    }

    if (first <= 0 && scrollEl.scrollLeft <= tolerance) {
      return;
    }

    this._markArtifactScrollFromButtons();

    if (first <= 0) {
      children[0].scrollIntoView({
        behavior: this._artifactScrollBehavior(),
        block: 'nearest',
        inline: 'start',
      });
      // Points the roving tab stop at the now-visible first tile, without
      // moving focus off the Prev button, so Tab from Prev lands in the
      // newly displayed set rather than wherever focus was left before
      // paging.
      this._artifactNavigation.setActiveItem(children[0]);
      return;
    }

    const firstVisibleFraction = this._getArtifactTileVisibleFraction(
      children[first],
      scrollEl
    );
    const prevEnd =
      firstVisibleFraction >= 0.5 ? children[first - 1] : children[first];

    prevEnd.scrollIntoView({
      behavior: this._artifactScrollBehavior(),
      block: 'nearest',
      inline: 'end',
    });
    // See the comment on the "first <= 0" branch above.
    this._artifactNavigation.setActiveItem(prevEnd);
  }

  private _updateArtifactScrollState(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      this._artifactScrollOverflow = false;
      this._artifactCanScrollPrev = false;
      this._artifactCanScrollNext = false;
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
    const tolerance = 1;
    const overflow = scrollWidth > clientWidth + tolerance;
    const maxScroll = this._getArtifactMaxScroll(scrollEl);

    this._artifactScrollOverflow = overflow;
    this._artifactCanScrollPrev = overflow && scrollLeft > tolerance;
    this._artifactCanScrollNext =
      overflow && scrollLeft < maxScroll - tolerance;
  }

  private _warnedMixedArtifactTypes = false;

  private _warnedMissingLegalContent = false;

  private _warnIfMixedArtifactTypes(): void {
    if (!window.__swc?.DEBUG) {
      return;
    }

    const elements = this._assignedArtifactElements ?? [];
    const types = new Set(
      elements
        .map((element) => element.getAttribute('type'))
        .filter(
          (type): type is 'card' | 'media' =>
            type === 'card' || type === 'media'
        )
    );

    if (types.size <= 1) {
      this._warnedMixedArtifactTypes = false;
      return;
    }

    if (this._warnedMixedArtifactTypes) {
      return;
    }

    this._warnedMixedArtifactTypes = true;
    window.__swc.warn(
      this,
      'The artifact slot contains both card and media upload artifacts. Use one layout type per composer session (all card or all media). When uploads mix images and documents, normalize to media tiles with thumbnails and optional badges.',
      'https://opensource.adobe.com/spectrum-web-components/patterns/conversational-ai/prompt-field/'
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
      'https://opensource.adobe.com/spectrum-web-components/patterns/conversational-ai/prompt-field/'
    );
  }

  private get _isPopulated(): boolean {
    return (
      this.value.trim().length > 0 ||
      (this._assignedArtifactElements?.length ?? 0) > 0
    );
  }

  private get _normalizedMinRows(): number {
    return Math.max(1, Math.floor(this.minRows || 1));
  }

  private get _normalizedMaxRows(): number {
    return Math.max(
      this._normalizedMinRows,
      Math.floor(this.maxRows || this._normalizedMinRows)
    );
  }

  private get _isLoading(): boolean {
    return this.mode === 'loading';
  }

  private get _isDisabled(): boolean {
    return this.mode === 'disabled';
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

  private _renderArtifact(): TemplateResult {
    const artifactCount = this._assignedArtifactElements?.length ?? 0;

    if (artifactCount === 0) {
      return html`
        <div class="swc-PromptField-artifacts" hidden>
          <slot
            name="artifact"
            @slotchange=${this._handleArtifactSlotChange}
          ></slot>
        </div>
      `;
    }

    if (artifactCount === 1) {
      return html`
        <div
          class="swc-PromptField-artifacts swc-PromptField-artifacts--single"
          @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
          @keydown=${this._handleSingleArtifactKeydown}
        >
          <slot
            name="artifact"
            @slotchange=${this._handleArtifactSlotChange}
          ></slot>
        </div>
      `;
    }

    return html`
      <div
        class="swc-PromptField-artifacts swc-PromptField-artifacts--multiple"
        @swc-upload-artifact-dismiss=${this._handleArtifactDismiss}
      >
        <div
          class="swc-PromptField-artifacts-row"
          @keydown=${this._handleArtifactRowKeydown}
        >
          ${this._artifactScrollOverflow && this._artifactCanScrollPrev
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-prev"
                  aria-label=${this.artifactScrollPrevLabel}
                  @click=${() => this._scrollArtifactsByPage(-1)}
                >
                  <swc-icon size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </button>
              `
            : nothing}
          <div
            class="swc-PromptField-artifacts-viewport"
            role="region"
            aria-label=${this.artifactStripLabel}
          >
            <div
              class=${classMap({
                'swc-PromptField-artifacts-scroll': true,
                'is-artifact-scroll-from-buttons':
                  this._artifactScrollFromButtons,
              })}
              tabindex="-1"
              @scroll=${this._handleArtifactScroll}
              @wheel=${this._handleArtifactWheel}
              @touchstart=${this._showArtifactScrollbarFromInteraction}
            >
              <div class="swc-PromptField-artifacts-tiles">
                <slot
                  name="artifact"
                  @slotchange=${this._handleArtifactSlotChange}
                ></slot>
              </div>
            </div>
            ${this._artifactScrollOverflow
              ? html`
                  <div
                    class=${classMap({
                      'swc-PromptField-artifacts-scrollbar-lane': true,
                      'is-artifact-scrollbar-interacting':
                        this._artifactScrollbarInteracting &&
                        !this._artifactScrollFromButtons,
                    })}
                    @pointerdown=${this._handleArtifactScrollbarLanePointerDown}
                  >
                    <div
                      class="swc-PromptField-artifacts-scrollbar-thumb"
                      style=${styleMap(this._getArtifactScrollbarThumbStyle())}
                      @pointerdown=${this
                        ._handleArtifactScrollbarThumbPointerDown}
                    ></div>
                  </div>
                `
              : nothing}
            ${this._artifactCanScrollPrev
              ? html`
                  <div
                    class="swc-PromptField-artifacts-fade swc-PromptField-artifacts-fade--start"
                    aria-hidden="true"
                  ></div>
                `
              : nothing}
            ${this._artifactCanScrollNext
              ? html`
                  <div
                    class="swc-PromptField-artifacts-fade swc-PromptField-artifacts-fade--end"
                    aria-hidden="true"
                  ></div>
                `
              : nothing}
          </div>
          ${this._artifactScrollOverflow && this._artifactCanScrollNext
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-next"
                  aria-label=${this.artifactScrollNextLabel}
                  @click=${() => this._scrollArtifactsByPage(1)}
                >
                  <swc-icon size="s" aria-hidden="true">
                    ${Chevron75Icon()}
                  </swc-icon>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  private _renderSendButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-send"
        ?disabled=${!this._isPopulated || this._isDisabled}
        aria-label=${this.sendLabel}
        @click=${this._handleSendClick}
      >
        <swc-icon aria-hidden="true">${ChevronUpIcon()}</swc-icon>
      </button>
    `;
  }

  private _renderStopButton(): TemplateResult {
    return html`
      <button
        class="swc-PromptField-stop"
        aria-label=${this.stopLabel}
        @click=${this._handleStopClick}
      >
        <swc-icon aria-hidden="true">${StopIcon()}</swc-icon>
      </button>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this._isLoading;
    const hasArtifacts = (this._assignedArtifactElements?.length ?? 0) > 0;

    return html`
      <div class="swc-PromptField">
        <div
          class="swc-PromptField-box${this._promptBoxKeyboardFocusRing
            ? ' swc-PromptField-box--keyboard-focus'
            : ''}"
        >
          <div
            class="swc-PromptField-input-area${hasArtifacts
              ? ' has-artifact'
              : ''}"
          >
            ${this._renderArtifact()}
            <div class="swc-PromptField-text-area">
              <span id=${this.labelId} class="swc-PromptField-label">
                ${this.label}
              </span>
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
                ?disabled=${this._isDisabled}
                rows=${this._normalizedMinRows}
                style=${styleMap({
                  '--swc-prompt-field-textarea-min-rows': String(
                    this._normalizedMinRows
                  ),
                  '--swc-prompt-field-textarea-max-rows': String(
                    this._normalizedMaxRows
                  ),
                })}
                @input=${this._handleInput}
                @keydown=${this._handleTextareaKeydown}
                @pointerdown=${this._handleTextareaPointerDown}
                @focusin=${this._handleTextareaFocusIn}
                @focusout=${this._handleTextareaFocusOut}
              ></textarea>
            </div>
          </div>

          <div class="swc-PromptField-action-bar">
            <div class="swc-PromptField-leading-actions">
              <button
                class="swc-PromptField-upload"
                aria-label=${this.uploadLabel}
                ?disabled=${this._isDisabled}
                @click=${this._handleUploadClick}
              >
                <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
              </button>
            </div>

            ${showStop ? this._renderStopButton() : this._renderSendButton()}
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
