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
  renderFieldLabel,
  type RenderFieldLabelResult,
} from '../directives/render-label/index.js';
import { isDebug, warnIf } from '../utils/index.js';

type Constructor<T = Record<string, unknown>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T;
  prototype: T;
};

const LABEL_SLOT_SELECTOR = '[slot="label"]';

/** An element carrying the `ariaLabelledByElements` reflection property the resolved accessible name is written onto (e.g. the field's `<input>`). */
type LabelledByTarget = Element & {
  ariaLabelledByElements: Element[] | null;
};

/** The API {@link LabellingMixin} adds to its host. */
export interface LabellingInterface {
  accessibleLabel?: string;
  accessibleLabelledby?: string;
  readonly hasLabelSlotContent: boolean;

  /**
   * @internal Element the resolved accessible name is wired onto. Defaults to
   * `null`; a rendering subclass overrides it to return the real role element.
   */
  readonly roleElement: Element | null;

  /**
   * @internal Host `ElementInternals` for a control with no inner role element
   * (e.g. a radio group); the name wires onto it instead of {@link roleElement}.
   * Defaults to `null`; a consumer overrides it.
   */
  readonly labelInternals: ElementInternals | null;

  /**
   * @internal The host's placeholder, exposed so the mixin can warn on a
   * placeholder-only name. Defaults to `undefined`; a host overrides it.
   */
  readonly placeholderText: string | undefined;

  /**
   * Renders the visible label as a `<label for>` targeting the role-element `id`.
   */
  renderLabel(forId: string): RenderFieldLabelResult;
}

/**
 * Adds visible-label rendering and accessible-name wiring to a host: the
 * `accessible-label` / `accessible-labelledby` properties, `label` slot
 * tracking, `renderLabel()`, and dev-mode name warnings.
 *
 * A rendering subclass overrides {@link roleElement} to return the element the
 * accessible name is wired onto (usually the rendered `<input>`). Name-source
 * precedence, the conflict warning, and a usage example live in the MDX page.
 */
export function LabellingMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<LabellingInterface> {
  class LabellingElement extends constructor implements LabellingInterface {
    /** Tracks the `label` slot so the shadow-DOM label element stays conditional. */
    private readonly _labelSlotPresence = new SlotPresenceController(
      this,
      LABEL_SLOT_SELECTOR
    );

    /**
     * Accessible name for the role element, applied as `aria-label`. Lowest
     * precedence; use when no visible label is slotted.
     */
    @property({ type: String, attribute: 'accessible-label' })
    public accessibleLabel = '';

    /**
     * Space-separated element `id`s, resolved against the host's root node,
     * that provide the role element's accessible name. Highest precedence.
     */
    @property({ attribute: 'accessible-labelledby' })
    public accessibleLabelledby?: string;

    /** @internal */
    public get hasLabelSlotContent(): boolean {
      return this._labelSlotPresence.isPresent;
    }

    /** @internal */
    public get roleElement(): Element | null {
      return null;
    }

    /** @internal */
    public get labelInternals(): ElementInternals | null {
      return null;
    }

    /** @internal */
    public get placeholderText(): string | undefined {
      return undefined;
    }

    /** @internal Docs URL for dev warnings, derived from the tag name. */
    protected get docsHref(): string {
      const name = this.localName.replace(/^swc-/, '');
      return `https://spectrum-web-components.adobe.com/?path=/docs/components-${name}--docs`;
    }

    /** @internal Resolves `accessibleLabelledby` ids against the host's root; unresolved ids are dropped (and warned in dev). */
    private get _resolvedLabelledbyElements(): Element[] {
      if (!this.accessibleLabelledby) {
        return [];
      }
      const root = this.getRootNode() as Document | ShadowRoot;
      return this._labelledbyIds
        .map((id) => root.getElementById?.(id) ?? null)
        .filter((element): element is HTMLElement => element !== null);
    }

    /** @internal The `id` tokens listed in `accessibleLabelledby`. */
    private get _labelledbyIds(): string[] {
      return (this.accessibleLabelledby ?? '').split(/\s+/).filter(Boolean);
    }

    /** @internal Whether any name source is set (resolved labelledby, `accessibleLabel`, or a slotted label). */
    private get _hasAccessibleName(): boolean {
      return (
        this._resolvedLabelledbyElements.length > 0 ||
        !!this.accessibleLabel ||
        this.hasLabelSlotContent
      );
    }

    public renderLabel(forId: string): RenderFieldLabelResult {
      return renderFieldLabel({
        hasLabelSlotContent: this.hasLabelSlotContent,
        forId,
      });
    }

    protected override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      this._syncLabelling();
      // Slot changes request an update without surfacing a changed property,
      // so re-check every render; the warning dedup handles repeats.
      if (isDebug()) {
        this._warnMissingAccessibleName();
        this._warnPlaceholderOnlyName();
        this._warnUnresolvedLabelledby();
        this._warnLabelConflict();
        this._warnHostAriaLabel();
      }
    }

    private _syncLabelling(): void {
      // Wire each source independently; the browser ranks labelledby over
      // aria-label over <label for>. Clearing a value does not enforce
      // precedence.
      const refs = this._resolvedLabelledbyElements;
      const nextRefs = refs.length > 0 ? refs : null;

      // A group host with no inner control names the host itself via
      // ElementInternals (no attribute to set).
      const internals = this.labelInternals;
      if (internals) {
        internals.ariaLabelledByElements = nextRefs;
        internals.ariaLabel = this.accessibleLabel || null;
        return;
      }

      const target = this.roleElement as LabelledByTarget | null;
      if (!target) {
        return;
      }
      target.ariaLabelledByElements = nextRefs;
      if (this.accessibleLabel) {
        target.setAttribute('aria-label', this.accessibleLabel);
      } else {
        target.removeAttribute('aria-label');
      }
    }

    private _warnMissingAccessibleName(): void {
      // Early return when a name is present so the message is not built on
      // every named render.
      if (this._hasAccessibleName) {
        return;
      }
      // A placeholder-only field gets the more specific placeholder warning.
      if (this.placeholderText) {
        return;
      }
      warnIf(
        this,
        true,
        `<${this.localName}> requires an accessible name.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            'add visible label content via the "label" named slot, or',
            'set the "accessible-label" attribute (or "accessibleLabel" property), or',
            'set "accessible-labelledby" (or "accessibleLabelledby") to reference an external label.',
          ],
        }
      );
    }

    /** @internal Warns when a field is named only by its `placeholder` (unreliable as an accessible name). */
    private _warnPlaceholderOnlyName(): void {
      if (this._hasAccessibleName || !this.placeholderText) {
        return;
      }
      warnIf(
        this,
        true,
        `<${this.localName}> is named only by its placeholder, which is not a reliable accessible name.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            'add visible label content via the "label" named slot, or',
            'set the "accessible-label" attribute (or "accessibleLabel" property), or',
            'set "accessible-labelledby" (or "accessibleLabelledby") to reference an external label.',
          ],
        }
      );
    }

    /**
     * @internal Warns when `aria-label`/`aria-labelledby` is set on the host,
     * which does not name the field. Skipped for internals-based hosts.
     */
    private _warnHostAriaLabel(): void {
      if (this.labelInternals) {
        return;
      }
      const attrs = ['aria-label', 'aria-labelledby'].filter((attr) =>
        this.hasAttribute(attr)
      );
      if (attrs.length === 0) {
        return;
      }
      const list = attrs.map((attr) => `"${attr}"`).join(' and ');
      warnIf(
        this,
        true,
        `<${this.localName}> ignores ${list} set on the host; the accessible name is applied to the field's role element, not the host.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            'use "accessible-label" (or "accessibleLabel") for a string name, or',
            'use "accessible-labelledby" (or "accessibleLabelledby") to reference elements.',
          ],
        }
      );
    }

    /**
     * @internal Warns when `accessibleLabelledby` references an `id` that
     * resolves to no element (a silent failure otherwise).
     */
    private _warnUnresolvedLabelledby(): void {
      const root = this.getRootNode() as Document | ShadowRoot;
      const unresolved = this._labelledbyIds.filter(
        (id) => !(root.getElementById?.(id) ?? null)
      );
      if (unresolved.length === 0) {
        return;
      }
      const ids = unresolved.map((id) => `"${id}"`).join(', ');
      warnIf(
        this,
        true,
        `<${this.localName}> "accessible-labelledby" references ${
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

    /**
     * @internal Warns when both `accessibleLabelledby` and `accessibleLabel`
     * are set (two competing programmatic names; `accessibleLabelledby` wins).
     */
    private _warnLabelConflict(): void {
      // Only two programmatic name sources conflict; a visible label never does.
      if (
        this._resolvedLabelledbyElements.length === 0 ||
        !this.accessibleLabel
      ) {
        return;
      }
      warnIf(
        this,
        true,
        `<${this.localName}> sets both "accessible-labelledby" and "accessible-label". Per the accessible-name computation, "accessible-labelledby" is used and "accessible-label" is ignored.`,
        this.docsHref,
        {
          type: 'accessibility',
          issues: [
            'set only one of "accessible-labelledby" or "accessible-label".',
          ],
        }
      );
    }
  }
  return LabellingElement as unknown as T & Constructor<LabellingInterface>;
}
