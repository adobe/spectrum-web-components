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

/**
 * An element carrying the ARIA element-reflection properties `LabellingMixin`
 * writes the resolved accessible name onto (for example, the `<input>` inside
 * a text field's own shadow root).
 */
type LabelledByTarget = Element & {
  ariaLabelledByElements: Element[] | null;
};

/** The API {@link LabellingMixin} adds to its host. */
export interface LabellingInterface {
  accessibleLabel?: string;
  accessibleLabelledby?: string;
  readonly hasLabelSlotContent: boolean;

  /**
   * @internal
   *
   * The element `LabellingMixin` wires the resolved accessible-name ARIA
   * relationship onto. Defaults to `null`; a rendering subclass overrides this
   * to return its real role element (e.g. the `<input>`).
   */
  readonly roleElement: Element | null;

  /**
   * Renders the visible label as a `<label for>` targeting the role-element `id`.
   */
  renderLabel(forId: string): RenderFieldLabelResult;
}

/**
 * Adds visible-label rendering and accessible-name wiring to a host: the
 * `accessible-label` / `accessible-labelledby` properties, `label` slot
 * tracking, `renderLabel()`, and dev-mode warnings for a missing or
 * conflicting name.
 *
 * The name sources are wired independently; the browser ranks them
 * `accessible-labelledby` over `accessible-label` over a slotted `<label>`, so
 * a visible label keeps native click-to-focus even when a programmatic name
 * wins what is announced. Setting both programmatic sources warns. See the MDX
 * page for the full precedence and WCAG 2.5.3 (Label in Name) guidance.
 *
 * The host renders its own role element (e.g. the `<input>`), so a rendering
 * subclass overrides {@link roleElement} to return it.
 *
 * @example
 * ```typescript
 * class MyField extends LabellingMixin(SpectrumElement) {
 *   override get roleElement() {
 *     return this.renderRoot.querySelector('input');
 *   }
 *
 *   render() {
 *     return html`
 *       ${this.renderLabel('my-field-input')}
 *       <input id="my-field-input" />
 *     `;
 *   }
 * }
 * ```
 */
export function LabellingMixin<T extends Constructor<ReactiveElement>>(
  constructor: T
): T & Constructor<LabellingInterface> {
  class LabellingElement extends constructor implements LabellingInterface {
    /**
     * Observes the light-DOM `label` slot so the shadow-DOM label element can
     * be fully conditional.
     */
    private readonly _labelSlotPresence = new SlotPresenceController(
      this,
      LABEL_SLOT_SELECTOR
    );

    /**
     * Accessible name for the role element, applied as `aria-label`. Lowest
     * precedence after `accessibleLabelledby`; use when there is no visible
     * label slotted and no external labelling element to reference.
     */
    @property({ type: String, attribute: 'accessible-label' })
    public accessibleLabel = '';

    /**
     * Space-separated element `id`s, resolved against the host's root node,
     * that provide the role element's accessible name. Highest precedence:
     * overrides both `accessibleLabel` and a slotted label.
     */
    @property({ attribute: 'accessible-labelledby' })
    public accessibleLabelledby?: string;

    /**
     * @internal
     */
    public get hasLabelSlotContent(): boolean {
      return this._labelSlotPresence.isPresent;
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
     * Documentation URL used in the missing-accessible-name DEBUG warning.
     * Derived from the custom element tag name so each concrete component
     * gets an accurate link with no per-subclass override needed.
     */
    protected get docsHref(): string {
      const name = this.localName.replace(/^swc-/, '');
      return `https://spectrum-web-components.adobe.com/?path=/docs/components-${name}--docs`;
    }

    /**
     * @internal
     *
     * Resolves `accessibleLabelledby`'s space-separated `id`s against the
     * host's root node. `id`s that don't resolve to an element are dropped
     * silently; the caller falls back to a lower-precedence source.
     */
    private get _resolvedLabelledbyElements(): Element[] {
      if (!this.accessibleLabelledby) {
        return [];
      }
      const root = this.getRootNode() as Document | ShadowRoot;
      return this.accessibleLabelledby
        .split(/\s+/)
        .filter(Boolean)
        .map((id) => root.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);
    }

    /**
     * @internal
     *
     * Whether any accessible-name source is set: a resolved
     * `accessibleLabelledby`, `accessibleLabel`, or a slotted `label`.
     */
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
        this._warnLabelConflict();
      }
    }

    private _syncLabelling(): void {
      const target = this.roleElement as LabelledByTarget | null;
      if (!target) {
        return;
      }
      // Wire each source independently; the browser ranks labelledby over
      // aria-label over <label for>. The else branch clears a stale value, it
      // does not enforce precedence.
      const refs = this._resolvedLabelledbyElements;
      target.ariaLabelledByElements = refs.length > 0 ? refs : null;
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

    /**
     * @internal
     *
     * Warns when both `accessibleLabelledby` and `accessibleLabel` are set:
     * two competing programmatic names. Per the accessible-name computation,
     * `accessibleLabelledby` is used and `accessibleLabel` is silently ignored.
     * A visible slotted label paired with either one is the recommended
     * WCAG 2.5.3 (Label in Name) pattern and does not warn.
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
