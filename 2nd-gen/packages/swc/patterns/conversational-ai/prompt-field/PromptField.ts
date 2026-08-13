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
import '../../../components/ui-icons/swc-ui-icon.js';

import { uniqueId } from '../../../utils/id.js';
import { ChevronUpIcon, PlusIcon, StopIcon } from '../utils/icons/index.js';

import visuallyHiddenStyles from '../../../stylesheets/_lit-styles/visually-hidden.css';
import styles from './prompt-field.css';

export interface PromptFieldSubmitDetail {
  value: string;
}

// Native CSS textarea auto-sizing; when true, the JS fallback is skipped.
const SUPPORTS_FIELD_SIZING =
  typeof CSS !== 'undefined' &&
  typeof CSS.supports === 'function' &&
  CSS.supports('field-sizing', 'content');

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
 * @fires swc-prompt-field-stop - Dispatched when stop generation is requested while generating.
 * @fires swc-prompt-field-upload-click - Dispatched when upload affordance is activated.
 * Consumers should handle file picker flow externally.
 */
export class PromptField extends SpectrumElement {
  private readonly labelId = uniqueId('swc-prompt-field-label');

  /** Disables the textarea and all actions. */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /** Shows the stop button in place of send while a response is generating. */
  @property({ type: Boolean, reflect: true })
  public generating = false;

  /** Starts as a single-line layout with send/stop inline instead of the default layout with a separate action bar; the textarea still wraps and grows with content either way. */
  @property({ type: Boolean, reflect: true })
  public collapsed = false;

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

  /** Minimum visible textarea rows before growth; unset relies on the natural single-line height. */
  @property({ type: Number, attribute: 'min-rows' })
  public minRows?: number;

  /** Maximum visible textarea rows before internal scrolling; unset relies on max-block-size alone. */
  @property({ type: Number, attribute: 'max-rows' })
  public maxRows?: number;

  @queryAssignedElements({ slot: 'artifact', flatten: true })
  private _assignedArtifactElements!: HTMLElement[];

  @query('.swc-PromptField-artifacts-scroll')
  private _artifactScrollEl?: HTMLDivElement;

  @query('.swc-PromptField-textarea')
  private _textarea?: HTMLTextAreaElement;

  @queryAssignedElements({ slot: 'legal', flatten: true })
  private _assignedLegalElements!: HTMLElement[];

  @state()
  private _artifactScrollOverflow = false;

  @state()
  private _artifactCanScrollPrev = false;

  @state()
  private _artifactCanScrollNext = false;

  // `scrollend` support isn't a reliable gate on its own: browsers that
  // report support (feature-detected via `'onscrollend' in window`) can
  // still skip firing it for particular scroll triggers (observed on both
  // this project's WebKit and Firefox test runners). So this always races
  // a poll against the real event instead of trusting either alone —
  // bumped on every `scroll` tick, on a real `scrollend`, and on
  // disconnect, so a stale poll (superseded by a newer scroll, a real
  // `scrollend` winning first, or the host going away) is a no-op instead
  // of firing late.
  private _artifactScrollFallbackGeneration = 0;

  // Observed targets accumulate across slot changes (dismissed tiles are
  // never explicitly unobserved); the browser drops a target's callbacks
  // once it leaves the DOM, so this is a bounded, harmless handful of
  // stale references for a chat composer's tile count, not an unbounded
  // leak. Revisit with explicit unobserve() bookkeeping if this is ever
  // reused somewhere with much larger, longer-lived tile counts.
  private readonly _artifactScrollObserver = new ResizeController(this, {
    target: null,
    callback: () => {
      this._updateArtifactScrollState();
    },
  });

  /**
   * Roving tabindex + arrow-key focus movement across artifact tiles. The
   * first (or last-active, via `memory`) tile always carries `tabindex="0"`,
   * so it is Tab's first stop into the strip with no separate entry step;
   * Arrow Left/Right move that roving stop one tile at a time. Chevron
   * buttons separately page by the scroll viewport, unrelated to this
   * controller.
   */
  private readonly _artifactNavigation = new FocusgroupNavigationController(
    this,
    {
      direction: 'horizontal',
      wrap: false,
      memory: true,
      getItems: () => this._assignedArtifactElements ?? [],
    }
  );

  private _pendingArtifactDismiss?: { artifact: HTMLElement; index: number };

  public static override get styles(): CSSResultArray {
    return [styles, visuallyHiddenStyles];
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
    this._artifactScrollFallbackGeneration++;
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

  // Restarts a poll on every `scroll` tick that settles once `scrollLeft`
  // holds steady for a few frames — racing the real `scrollend` listener
  // below, not gated behind feature detection (see
  // `_artifactScrollFallbackGeneration`'s doc for why). A fixed setTimeout
  // delay would race against a real scroll's own frame cadence instead
  // (fire early mid-gesture, or late enough to feel unresponsive); polling
  // for actual stability can't.
  private _handleArtifactScroll(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return;
    }

    const generation = ++this._artifactScrollFallbackGeneration;
    let lastScrollLeft = scrollEl.scrollLeft;
    let stableFrames = 0;
    const poll = (): void => {
      if (generation !== this._artifactScrollFallbackGeneration) {
        return;
      }
      if (scrollEl.scrollLeft !== lastScrollLeft) {
        lastScrollLeft = scrollEl.scrollLeft;
        stableFrames = 0;
      } else if (++stableFrames < 3) {
        // not yet settled
      } else {
        this._handleArtifactScrollEnd();
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
   * Also reachable from `_handleArtifactScroll`'s poll, which is why this
   * bumps the generation counter itself: whichever of the two (a real
   * `scrollend`, or the poll settling) happens first wins, and that
   * invalidates the other so it can't also fire.
   */
  private _handleArtifactScrollEnd(): void {
    this._artifactScrollFallbackGeneration++;
    this._updateArtifactScrollState();
    void this.updateComplete.then(() =>
      this._syncArtifactActiveItemToVisible()
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
  private _syncArtifactActiveItemToVisible(): void {
    const scrollEl = this._artifactScrollEl;
    const artifacts = this._assignedArtifactElements ?? [];
    if (!scrollEl || artifacts.length < 2) {
      return;
    }

    const { left, right } = this._artifactVisibleBounds(scrollEl);
    const active = this._artifactNavigation.getActiveItem();
    if (active && this._isArtifactVisible(active, left, right)) {
      return;
    }

    this._artifactNavigation.setActiveItem(
      this._findArtifactAtOrPastBoundary(this._isRtl() ? right : left)
    );
  }

  /**
   * The scroll viewport's own bounds, clear of the chevron overlays on
   * both sides. Reads the same `scroll-padding-inline` the
   * `has-scroll-prev`/`has-scroll-next` CSS rules set (prompt-field.css)
   * as the single source of truth for how much clearance a visible
   * chevron needs, instead of duplicating that math here.
   */
  private _artifactVisibleBounds(scrollEl: HTMLElement): {
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

  private _isArtifactVisible(
    artifact: HTMLElement,
    visibleLeft: number,
    visibleRight: number
  ): boolean {
    const rect = artifact.getBoundingClientRect();
    const tolerance = 1;
    return (
      rect.left >= visibleLeft - tolerance &&
      rect.right <= visibleRight + tolerance
    );
  }

  private _focusArtifact(el: HTMLElement): void {
    this._artifactNavigation.setActiveItem(el);
    el.scrollIntoView({
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
      if (nextButton && this._artifactCanScrollNext) {
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

  private _observeArtifactScrollViewport(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      return;
    }

    this._artifactScrollObserver.observe(scrollEl);
    for (const element of this._assignedArtifactElements ?? []) {
      this._artifactScrollObserver.observe(element);
    }
    this._updateArtifactScrollState();
  }

  private _isRtl(): boolean {
    return getComputedStyle(this).direction === 'rtl';
  }

  /**
   * First artifact whose leading (reading-direction-start) edge is at or
   * past the physical viewport x-coordinate `boundary`. Falls back to the
   * last artifact if none qualify. Shared by `_scrollArtifactsByPage`
   * (`boundary` is where the next/previous page will start) and
   * `_syncArtifactActiveItemToVisible` (`boundary` is the visible
   * window's own start edge) so both "find the first artifact at a given
   * point" needs go through one RTL-aware comparison instead of two.
   */
  private _findArtifactAtOrPastBoundary(boundary: number): HTMLElement {
    const children = this._assignedArtifactElements ?? [];
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

  private _scrollArtifactsByPage(direction: -1 | 1): void {
    const scrollEl = this._artifactScrollEl;
    const children = this._assignedArtifactElements ?? [];
    if (!scrollEl || children.length < 2) {
      return;
    }

    // Scroll the page-start tile into view: snap-aligned, clamps at the edge.
    const scrollRect = scrollEl.getBoundingClientRect();
    const pageStart = this._isRtl()
      ? scrollRect.right - direction * scrollEl.clientWidth
      : scrollRect.left + direction * scrollEl.clientWidth;
    const target = this._findArtifactAtOrPastBoundary(pageStart);
    this._artifactNavigation.setActiveItem(target);
    target.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  // aria-disabled, not disabled: a chevron the user just activated stays
  // focused instead of being blurred by the browser's own disabled-element
  // handling. That leaves it keyboard-activatable in the brief window
  // before its aria-disabled state actually updates, hence these guards.
  private _handleArtifactScrollPrev(): void {
    if (!this._artifactCanScrollPrev) {
      return;
    }
    this._scrollArtifactsByPage(-1);
  }

  private _handleArtifactScrollNext(): void {
    if (!this._artifactCanScrollNext) {
      return;
    }
    this._scrollArtifactsByPage(1);
  }

  private _updateArtifactScrollState(): void {
    const scrollEl = this._artifactScrollEl;
    if (!scrollEl) {
      this._artifactScrollOverflow = false;
      this._artifactCanScrollPrev = false;
      this._artifactCanScrollNext = false;
      return;
    }

    const { scrollWidth, clientWidth } = scrollEl;
    const tolerance = 1;
    const overflow = scrollWidth > clientWidth + tolerance;
    const children = this._assignedArtifactElements ?? [];
    const firstArtifact = children[0];
    const lastArtifact = children[children.length - 1];

    this._artifactScrollOverflow = overflow;
    if (!overflow || !firstArtifact || !lastArtifact) {
      this._artifactCanScrollPrev = false;
      this._artifactCanScrollNext = false;
      return;
    }

    const scrollRect = scrollEl.getBoundingClientRect();
    const firstRect = firstArtifact.getBoundingClientRect();
    const lastRect = lastArtifact.getBoundingClientRect();
    const rtl = this._isRtl();

    this._artifactCanScrollPrev = rtl
      ? firstRect.right > scrollRect.right + tolerance
      : firstRect.left < scrollRect.left - tolerance;
    this._artifactCanScrollNext = rtl
      ? lastRect.left < scrollRect.left - tolerance
      : lastRect.right > scrollRect.right + tolerance;
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
          ${this._artifactScrollOverflow
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-prev"
                  aria-label=${this.artifactScrollPrevLabel}
                  aria-disabled=${!this._artifactCanScrollPrev}
                  tabindex=${this._artifactCanScrollPrev ? nothing : -1}
                  @click=${this._handleArtifactScrollPrev}
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
                'has-scroll-prev': this._artifactCanScrollPrev,
                'has-scroll-next': this._artifactCanScrollNext,
              })}
              tabindex="-1"
              @scroll=${this._handleArtifactScroll}
              @scrollend=${this._handleArtifactScrollEnd}
            >
              <div class="swc-PromptField-artifacts-tiles">
                <slot
                  name="artifact"
                  @slotchange=${this._handleArtifactSlotChange}
                ></slot>
              </div>
            </div>
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
          ${this._artifactScrollOverflow
            ? html`
                <button
                  type="button"
                  class="swc-PromptField-artifacts-scroll-next"
                  aria-label=${this.artifactScrollNextLabel}
                  aria-disabled=${!this._artifactCanScrollNext}
                  tabindex=${this._artifactCanScrollNext ? nothing : -1}
                  @click=${this._handleArtifactScrollNext}
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
        ?disabled=${!this._isPopulated || this.disabled}
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

  /** Placeholder for the future pixel-loader idle/generating indicator. */
  private _renderStatusIcon(): TemplateResult {
    return html`
      <span class="swc-PromptField-status-icon" aria-hidden="true">
        <swc-ui-icon icon="asterisk" size="xl"></swc-ui-icon>
      </span>
    `;
  }

  protected override render(): TemplateResult {
    const showStop = this.generating;
    const hasArtifacts = (this._assignedArtifactElements?.length ?? 0) > 0;

    return html`
      <div class="swc-PromptField">
        <div class="swc-PromptField-box">
          <div
            class="swc-PromptField-input-area${hasArtifacts
              ? ' has-artifact'
              : ''}"
          >
            ${this._renderArtifact()}
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
                  <button
                    class="swc-PromptField-upload"
                    aria-label=${this.uploadLabel}
                    ?disabled=${this.disabled}
                    @click=${this._handleUploadClick}
                  >
                    <swc-icon aria-hidden="true">${PlusIcon()}</swc-icon>
                  </button>
                </div>
              </div>
              ${showStop ? this._renderStopButton() : this._renderSendButton()}
            </div>
          </div>
        </div>
        ${this._renderLegalFooter()}
      </div>
    `;
  }
}
