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
import { isDebug, warnIf } from '../utils/index.js';

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
 * description is wired onto (usually the rendered `<input>`). Source combining
 * and the invalid-gated error fold into `aria-describedby` live in the MDX page.
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

    /** @internal Docs URL for dev warnings, derived from the tag name. */
    protected get docsHref(): string {
      const name = this.localName.replace(/^swc-/, '');
      return `https://spectrum-web-components.adobe.com/?path=/docs/components-${name}--docs`;
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
      const target = this.roleElement as DescribedByTarget | null;
      if (!target) {
        return;
      }
      const showError = this._isInvalid && this.hasErrorTextSlotContent;
      const describedBy = [
        ...(this._descriptionElement ? [this._descriptionElement] : []),
        ...(showError && this._errorTextElement
          ? [this._errorTextElement]
          : []),
        ...this._resolvedDescribedbyElements,
      ];
      target.ariaDescribedByElements =
        describedBy.length > 0 ? describedBy : null;
    }
  }
  return HelpTextElement as unknown as T & Constructor<HelpTextInterface>;
}
