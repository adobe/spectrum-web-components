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
  accessibleLabel: string;
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
   * Renders the visible label for the given role-element `id`. Pass `null`
   * when the role element has no stable `id` yet.
   */
  renderLabel(forId: string | null): RenderFieldLabelResult;
}

/**
 * A mixin that adds visible-label rendering and accessible-name wiring to a
 * host: the reactive `accessible-label` / `accessible-labelledby` properties,
 * light-DOM `label` slot presence tracking (via `SlotPresenceController`), the
 * "no accessible name" dev warning, and `renderLabel()` — which renders the
 * shared label markup via the `renderFieldLabel` directive.
 *
 * Three accessible-name sources are supported, in precedence order (highest
 * first): `accessibleLabelledby` (resolved against the host's root node and
 * written to {@link roleElement}'s `ariaLabelledByElements`), `accessibleLabel`
 * (written to {@link roleElement}'s `aria-label` attribute), and a slotted
 * visible label (rendered as a real, same-root `<label for>`). Only the
 * highest-precedence source that is actually set is wired; a lower-precedence
 * slotted label still renders visually (as a plain, non-`for` `<span>`) so it
 * isn't hidden, just excluded from the accessible-name computation.
 *
 * Because the role element a text-like field names is created by the host's
 * own render (e.g. the `<input>`), this mixin never assumes the role element's
 * shape: hosts applying `LabellingMixin` before their own render layer exists
 * (for example, a core base class) override {@link roleElement} once the real
 * element is available.
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
     * The currently active accessible-name source, in precedence order.
     */
    private get _activeNameSource(): 'labelledby' | 'label' | 'slot' | 'none' {
      if (this._resolvedLabelledbyElements.length > 0) {
        return 'labelledby';
      }
      if (this.accessibleLabel) {
        return 'label';
      }
      if (this.hasLabelSlotContent) {
        return 'slot';
      }
      return 'none';
    }

    public renderLabel(forId: string | null): RenderFieldLabelResult {
      return renderFieldLabel({
        hasLabelSlotContent: this.hasLabelSlotContent,
        forId: this._activeNameSource === 'slot' ? forId : null,
      });
    }

    protected override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      this._syncLabelling();
      // The accessible name can come from a property or the label slot
      // (tracked by a slot controller that requests an update without
      // surfacing a changed property), so re-check on every dev render and
      // let the warning dedup handle repeats rather than gating on one
      // property.
      if (isDebug()) {
        this._warnMissingAccessibleName();
      }
    }

    private _syncLabelling(): void {
      const target = this.roleElement as LabelledByTarget | null;
      if (!target) {
        return;
      }
      const source = this._activeNameSource;
      target.ariaLabelledByElements =
        source === 'labelledby' ? this._resolvedLabelledbyElements : null;
      if (source === 'label') {
        target.setAttribute('aria-label', this.accessibleLabel);
      } else {
        target.removeAttribute('aria-label');
      }
    }

    private _warnMissingAccessibleName(): void {
      // Early return when a name is present so the message is not built on
      // every in-named render.
      if (this._activeNameSource !== 'none') {
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
  }
  return LabellingElement as unknown as T & Constructor<LabellingInterface>;
}
