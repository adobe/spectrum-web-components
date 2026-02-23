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
  ReactiveController,
  TemplateResult,
} from '@spectrum-web-components/base';
import { AbstractOverlay } from '@spectrum-web-components/overlay/src/AbstractOverlay.js';

import { ExpandableElement } from './Picker.js';

/**
 * Enum representing the interaction strategy types.
 */
export enum InteractionTypes {
  'desktop',
  'mobile',
}

/** CSS class applied to Safari to manage focus ring visibility. */
export const SAFARI_FOCUS_RING_CLASS = 'remove-focus-ring-safari-hack';

/**
 * Base controller class for managing host element interactions.
 * Handles overlay state, toggle prevention, and focus management.
 * Extended by DesktopController and MobileController for device-specific behavior.
 */
export class InteractionController implements ReactiveController {
  /** AbortController for cleaning up event listeners. */
  abortController!: AbortController;

  /**
   * Controls whether the next toggle action should be prevented.
   * - `'no'`: Allow toggle
   * - `'maybe'`: May prevent based on additional conditions
   * - `'yes'`: Prevent the next toggle
   */
  public preventNextToggle: 'no' | 'maybe' | 'yes' = 'no';

  /** Tracks the open state at the time of pointerdown for toggle logic. */
  public pointerdownState = false;

  /** Tracks the target of an active Enter keydown to prevent double-activation. */
  public enterKeydownOn: EventTarget | null = null;

  /** The rendered overlay container template. */
  public container!: TemplateResult;

  /**
   * Indicates whether the host element is actively in the process of opening.
   * Always returns false in the base class; may be overridden in subclasses.
   */
  get activelyOpening(): boolean {
    return false;
  }

  private _open = false;

  /**
   * Whether the host element overlay is currently open.
   */
  public get open(): boolean {
    return this._open;
  }

  /**
   * Sets the open state and synchronizes with the host element.
   * Also initializes the overlay reference if not already set.
   */
  public set open(open: boolean) {
    if (this._open === open) {
      return;
    }
    this._open = open;

    this.host.open = open;

    if (!this.overlay && this.host.overlayElement) {
      this.overlay = this.host.overlayElement;
    }
  }

  private _overlay!: AbstractOverlay;

  /**
   * Reference to the overlay element managing the host element's dropdown.
   */
  public get overlay(): AbstractOverlay {
    return this._overlay;
  }

  /**
   * Sets the overlay reference and initializes overlay configuration.
   */
  public set overlay(overlay: AbstractOverlay | undefined) {
    if (!overlay) {
      return;
    }
    if (this.overlay === overlay) {
      return;
    }
    this._overlay = overlay;
    this.initOverlay();
  }

  /** The interaction type (desktop or mobile) for this controller. */
  type!: InteractionTypes;

  /**
   * Creates an interaction controller for the given host element.
   *
   * @param target - The trigger button element
   * @param host - The host element this controller manages
   */
  constructor(
    public target: HTMLElement,
    public host: ExpandableElement
  ) {
    this.target = target;
    this.host = host;
    this.host.addController(this);
    this.init();
  }

  /**
   * Releases any description resources.
   * Override in subclasses if cleanup is needed.
   */
  releaseDescription(): void {}

  /**
   * Initializes the overlay with appropriate configuration.
   * Sets up event listeners, type, placement, and focus behavior.
   */
  initOverlay(): void {
    if (this.overlay) {
      // Note: beforetoggle is handled via template binding in the host element
      this.overlay.type =
        this.host.isMobile.matches && !this.host.forcePopover
          ? 'modal'
          : 'auto';
      this.overlay.triggerElement = this.host as HTMLElement;
      this.overlay.placement =
        this.host.isMobile.matches && !this.host.forcePopover
          ? undefined
          : this.host.placement;
      // We should not be applying open is set programmatically via the host element's open.property.
      // Focus should only be applied if a user action causes the menu to open. Otherwise,
      // we could be pulling focus from a user when an host element with an open menu loads.
      this.overlay.receivesFocus = 'false';
      this.overlay.willPreventClose =
        this.preventNextToggle !== 'no' && this.open;
      this.overlay.addEventListener(
        'slottable-request',
        this.host.handleSlottableRequest
      );
    }
  }

  /**
   * Handles pointerdown events on the trigger button.
   * Override in subclasses for device-specific behavior.
   *
   * @param _event - The pointer event
   */
  public handlePointerdown(_event: PointerEvent): void {}

  /**
   * Handles focus events on the trigger button.
   * Prevents reopening the menu when focus returns from the menu itself.
   *
   * @param event - The focus event
   */
  public handleButtonFocus(event: FocusEvent): void {
    // When focus comes from a pointer event, and the related target is the Menu,
    // we don't want to reopen the Menu.
    if (
      this.preventNextToggle === 'maybe' &&
      event.relatedTarget === this.host.optionsMenu
    ) {
      this.preventNextToggle = 'yes';
    }
    if (this.preventNextToggle === 'no') {
      this.host.close();
    }
  }

  /**
   * Handles activation events (click, Enter, Space) on the trigger.
   * Override in subclasses for device-specific behavior.
   *
   * @param _event - The activation event
   */
  public handleActivate(_event: Event): void {}

  /**
   * Initializes event listeners for the controller.
   * Override in subclasses to bind device-specific events.
   */
  /* c8 ignore next 3 */
  init(): void {}

  /**
   * Cleans up the controller by releasing resources and aborting event listeners.
   */
  abort(): void {
    this.releaseDescription();
    this.abortController?.abort();
  }

  /**
   * Lifecycle callback when the host element is connected to the DOM.
   * Initializes event listeners.
   */
  hostConnected(): void {
    this.init();
  }

  /**
   * Lifecycle callback when the host element is disconnected from the DOM.
   * Cleans up event listeners.
   */
  hostDisconnected(): void {
    this.abortController?.abort();
  }

  /**
   * Lifecycle callback after the host element updates.
   * Ensures overlay reference is set and updates willPreventClose state.
   */
  public hostUpdated(): void {
    if (!this.overlay && this.host.overlayElement) {
      this.overlay = this.host.overlayElement;
    }

    if (this.overlay && this.host.dependencyManager.loaded) {
      this.overlay.willPreventClose = this.preventNextToggle !== 'no';
    }
  }
}
