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
import { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';

import { SlotPresenceController } from '../controllers/slot-presence-controller/index.js';
import {
  renderFieldHelpText,
  type RenderFieldHelpTextResult,
} from '../directives/render-help-text/index.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

const DESCRIPTION_SLOT_SELECTOR = '[slot="description"]';
const ERROR_TEXT_SLOT_SELECTOR = '[slot="error-text"]';

/**
 * An element carrying the ARIA element-reflection properties `HelpTextMixin`
 * writes the resolved description/error-message relationships onto (for
 * example, the `<input>` inside a text field's own shadow root).
 */
type DescribedByTarget = Element & {
  ariaDescribedByElements: Element[] | null;
  ariaErrorMessageElements: Element[] | null;
};

/** The API {@link HelpTextMixin} adds to its host. */
export interface HelpTextInterface {
  accessibleDescribedby?: string;
  readonly hasDescriptionSlotContent: boolean;
  readonly hasErrorTextSlotContent: boolean;

  /**
   * @internal
   *
   * The element `HelpTextMixin` wires the resolved description/error-message
   * ARIA relationships onto. Defaults to `null`; a rendering subclass
   * overrides this to return its real role element (e.g. the `<input>`).
   */
  readonly roleElement: Element | null;
  /** Renders the description/error-text markup for the current state. */
  renderHelpText(): RenderFieldHelpTextResult;
}

/**
 * A mixin that adds description/error-text rendering and accessible
 * description wiring to a host: the reactive `accessible-describedby`
 * property, light-DOM `description`/`error-text` slot presence tracking (via
 * `SlotPresenceController`), and `renderHelpText()` — which renders the
 * shared help-text markup via the `renderFieldHelpText` directive.
 *
 * Unlike accessible-name sources (see `LabellingMixin`), description sources
 * combine rather than override one another: when both a slotted `description`
 * and an external `accessibleDescribedby` are set, {@link roleElement}'s
 * `ariaDescribedByElements` lists the in-shadow description first, then the
 * resolved external elements. The error message, by contrast, is always
 * same-root (there is no external error-text source): {@link roleElement}'s
 * `ariaErrorMessageElements` points at the in-shadow error-text element only
 * while the host reads as `invalid`, read structurally so hosts that don't
 * declare `invalid` at all simply never surface an error message.
 *
 * Because the role element a text-like field describes is created by the
 * host's own render (e.g. the `<input>`), this mixin never assumes the role
 * element's shape: hosts applying `HelpTextMixin` before their own render
 * layer exists (for example, a core base class) override {@link roleElement}
 * once the real element is available.
 *
 * @example
 * ```typescript
 * class MyField extends HelpTextMixin(SpectrumElement) {
 *   override get roleElement() {
 *     return this.renderRoot.querySelector('input');
 *   }
 *
 *   render() {
 *     return html`
 *       <input />
 *       ${this.renderHelpText()}
 *     `;
 *   }
 * }
 * ```
 */
export function HelpTextMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<HelpTextInterface> {
  class HelpTextElement extends constructor implements HelpTextInterface {
    /**
     * Observes the light-DOM `description` and `error-text` slots so the
     * shadow-DOM containers and slots can be fully conditional.
     */
    private readonly _helpTextSlotPresence = new SlotPresenceController(this, [
      DESCRIPTION_SLOT_SELECTOR,
      ERROR_TEXT_SLOT_SELECTOR,
    ]);

    /**
     * Space-separated element `id`s, resolved against the host's root node,
     * that describe the role element. Combines with a slotted `description`
     * rather than overriding it: the in-shadow description, when present,
     * comes first in the resulting `ariaDescribedByElements`.
     */
    @property({ attribute: 'accessible-describedby' })
    public accessibleDescribedby?: string;

    /** @internal */
    private _descriptionElement: Element | undefined;

    /** @internal */
    private _errorTextElement: Element | undefined;

    /**
     * @internal
     */
    public get hasDescriptionSlotContent(): boolean {
      return this._helpTextSlotPresence.getPresence(DESCRIPTION_SLOT_SELECTOR);
    }

    /**
     * @internal
     */
    public get hasErrorTextSlotContent(): boolean {
      return this._helpTextSlotPresence.getPresence(ERROR_TEXT_SLOT_SELECTOR);
    }

    /**
     * @internal
     */
    public get roleElement(): Element | null {
      return null;
    }

    /**
     * @internal
     *
     * Reads `invalid` via a structural (not generic-constrained) check so
     * this mixin stays composable on hosts that don't declare `invalid` at
     * all — they simply never show an error message.
     */
    private get _isInvalid(): boolean {
      return (
        'invalid' in this &&
        Boolean((this as unknown as { invalid?: boolean }).invalid)
      );
    }

    /**
     * @internal
     *
     * Resolves `accessibleDescribedby`'s space-separated `id`s against the
     * host's root node. `id`s that don't resolve to an element are dropped
     * silently.
     */
    private get _resolvedDescribedbyElements(): Element[] {
      if (!this.accessibleDescribedby) {
        return [];
      }
      const root = this.getRootNode() as Document | ShadowRoot;
      return this.accessibleDescribedby
        .split(/\s+/)
        .filter(Boolean)
        .map((id) => root.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);
    }

    public renderHelpText(): RenderFieldHelpTextResult {
      return renderFieldHelpText({
        hasDescriptionSlotContent: this.hasDescriptionSlotContent,
        hasErrorTextSlotContent: this.hasErrorTextSlotContent,
        invalid: this._isInvalid,
        onDescriptionElement: (element) => {
          this._descriptionElement = element;
        },
        onErrorTextElement: (element) => {
          this._errorTextElement = element;
        },
      });
    }

    protected override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      this._syncHelpText();
    }

    private _syncHelpText(): void {
      const target = this.roleElement as DescribedByTarget | null;
      if (!target) {
        return;
      }
      const describedBy = [
        ...(this._descriptionElement ? [this._descriptionElement] : []),
        ...this._resolvedDescribedbyElements,
      ];
      target.ariaDescribedByElements =
        describedBy.length > 0 ? describedBy : null;

      const showError = this._isInvalid && this.hasErrorTextSlotContent;
      target.ariaErrorMessageElements =
        showError && this._errorTextElement ? [this._errorTextElement] : null;
    }
  }
  return HelpTextElement as unknown as T & Constructor<HelpTextInterface>;
}
