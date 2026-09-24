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
import { componentDocsHref, isDebug, warnIf } from '../utils/index.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

const DESCRIPTION_SLOT_SELECTOR = '[slot="description"]';
const ERROR_TEXT_SLOT_SELECTOR = '[slot="error-text"]';

/** An element carrying the `ariaDescribedByElements` reflection property the resolved description is written onto (e.g. the field's `<input>`). */
type DescribedByTarget = Element & {
  ariaDescribedByElements: Element[] | null;
};

/** The API {@link HelpTextMixin} adds to its host. */
export interface HelpTextInterface {
  accessibleDescribedby?: string;
  readonly hasDescriptionSlotContent: boolean;
  readonly hasErrorTextSlotContent: boolean;

  /**
   * @internal Element the resolved description is wired onto. Defaults to
   * `null`; a rendering subclass overrides it to return the real role element.
   */
  readonly roleElement: Element | null;

  /**
   * @internal Host `ElementInternals` for a control with no inner role element
   * (e.g. a radio group); the description wires onto it instead of
   * {@link roleElement}. Defaults to `null`; a consumer overrides it.
   */
  readonly describedByInternals: ElementInternals | null;

  /** Renders the description/error-text markup for the current state. */
  renderHelpText(): RenderFieldHelpTextResult;
}

/**
 * Adds description/error-text rendering and accessible-description wiring to a
 * host: the `accessible-describedby` property, `description`/`error-text` slot
 * tracking, `renderHelpText()`, and a dev-mode warning for unresolved
 * `accessible-describedby` id references.
 *
 * A rendering subclass overrides {@link roleElement} to return the element the
 * description is wired onto (usually the rendered `<input>`). While `invalid`,
 * the error message replaces the description in both the rendered output and
 * `aria-describedby`.
 */
export function HelpTextMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<HelpTextInterface> {
  class HelpTextElement extends constructor implements HelpTextInterface {
    /** Tracks the `description`/`error-text` slots so the shadow containers stay conditional. */
    private readonly _helpTextSlotPresence = new SlotPresenceController(this, [
      DESCRIPTION_SLOT_SELECTOR,
      ERROR_TEXT_SLOT_SELECTOR,
    ]);

    /**
     * Space-separated element `id`s, resolved against the host's root node,
     * that describe the role element. Combines with (does not override) a
     * slotted `description`.
     */
    @property({ attribute: 'accessible-describedby' })
    public accessibleDescribedby?: string;

    /** @internal */
    private _descriptionElement: Element | undefined;

    /** @internal */
    private _errorTextElement: Element | undefined;

    /**
     * @internal Stable `ref` callbacks so Lit does not detach/reattach the
     * refs on every render (a fresh arrow each render would).
     */
    private readonly _captureDescriptionElement = (
      element: Element | undefined
    ): void => {
      this._descriptionElement = element;
    };

    /** @internal */
    private readonly _captureErrorTextElement = (
      element: Element | undefined
    ): void => {
      this._errorTextElement = element;
    };

    /** @internal */
    public get hasDescriptionSlotContent(): boolean {
      return this._helpTextSlotPresence.getPresence(DESCRIPTION_SLOT_SELECTOR);
    }

    /** @internal */
    public get hasErrorTextSlotContent(): boolean {
      return this._helpTextSlotPresence.getPresence(ERROR_TEXT_SLOT_SELECTOR);
    }

    /** @internal */
    public get roleElement(): Element | null {
      return null;
    }

    /** @internal */
    public get describedByInternals(): ElementInternals | null {
      return null;
    }

    /** @internal Docs URL for dev warnings, derived from the tag name. */
    protected get docsHref(): string {
      return componentDocsHref(this.localName);
    }

    /**
     * @internal Reads `invalid` structurally so the mixin composes on hosts
     * that don't declare it (they simply never show an error).
     */
    private get _isInvalid(): boolean {
      return (
        'invalid' in this &&
        Boolean((this as unknown as { invalid?: boolean }).invalid)
      );
    }

    /** @internal The `id` tokens listed in `accessibleDescribedby`. */
    private get _describedbyIds(): string[] {
      return (this.accessibleDescribedby ?? '').split(/\s+/).filter(Boolean);
    }

    /** @internal Resolves `accessibleDescribedby` ids against the host's root; unresolved ids are dropped (and warned in dev). */
    private get _resolvedDescribedbyElements(): Element[] {
      if (!this.accessibleDescribedby) {
        return [];
      }
      const root = this.getRootNode() as Document | ShadowRoot;
      return this._describedbyIds
        .map((id) => root.getElementById?.(id) ?? null)
        .filter((element): element is HTMLElement => element !== null);
    }

    public renderHelpText(): RenderFieldHelpTextResult {
      return renderFieldHelpText({
        hasDescriptionSlotContent: this.hasDescriptionSlotContent,
        hasErrorTextSlotContent: this.hasErrorTextSlotContent,
        invalid: this._isInvalid,
        onDescriptionElement: this._captureDescriptionElement,
        onErrorTextElement: this._captureErrorTextElement,
      });
    }

    protected override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      this._syncHelpText();
      if (isDebug()) {
        this._warnUnresolvedDescribedby();
      }
    }

    /**
     * @internal Warns when `accessibleDescribedby` references an `id` that
     * resolves to no element (a silent failure otherwise).
     */
    private _warnUnresolvedDescribedby(): void {
      const root = this.getRootNode() as Document | ShadowRoot;
      const unresolved = this._describedbyIds.filter(
        (id) => !(root.getElementById?.(id) ?? null)
      );
      if (unresolved.length === 0) {
        return;
      }
      const ids = unresolved.map((id) => `"${id}"`).join(', ');
      warnIf(
        this,
        true,
        `<${this.localName}> "accessible-describedby" references ${
          unresolved.length === 1 ? 'an id that does' : 'ids that do'
        } not resolve to an element: ${ids}.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            "reference elements that share the field's root (document or shadow root), and",
            'ensure they exist before the field renders (ids are resolved once per render).',
          ],
        }
      );
    }

    private _syncHelpText(): void {
      // Mirror the rendered elements: the directive shows either the
      // description or the error (never both), so this references what's shown.
      const describedBy = [
        ...(this._descriptionElement ? [this._descriptionElement] : []),
        ...(this._errorTextElement ? [this._errorTextElement] : []),
        ...this._resolvedDescribedbyElements,
      ];
      const nextRefs = describedBy.length > 0 ? describedBy : null;

      // A group host with no inner role element (e.g. a radio group) describes
      // the host itself via ElementInternals.
      const internals = this.describedByInternals;
      if (internals) {
        internals.ariaDescribedByElements = nextRefs;
        return;
      }

      const target = this.roleElement as DescribedByTarget | null;
      if (!target) {
        return;
      }
      target.ariaDescribedByElements = nextRefs;
    }
  }
  return HelpTextElement as unknown as T & Constructor<HelpTextInterface>;
}
