/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import {
  CSSResultArray,
  ElementSize,
  html,
  PropertyValues,
  SizedMixin,
  SpectrumElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import {
  property,
  queryAssignedElements,
} from '@spectrum-web-components/base/src/decorators.js';
import { RovingTabindexController } from '@spectrum-web-components/reactive-controllers/src/RovingTabindex.js';
import { MutationController } from '@lit-labs/observers/mutation-controller.js';
import styles from './swatch-group.css.js';
import type {
  Swatch,
  SwatchBorder,
  SwatchRounding,
  SwatchShape,
} from './Swatch.js';

export type SwatchGroupSizes = Exclude<ElementSize, 'xxs' | 'xl' | 'xxl'>;
export type SwatchSelects = 'single' | 'multiple' | undefined;

/**
 * This component represents a group of swatches.
 *
 * @element sp-swatch-group
 *
 * @slot - Swatch elements to manage as a group
 *
 * @fires change - Dispatched when the selected swatch changes
 */
export class SwatchGroup extends SizedMixin(SpectrumElement, {
  validSizes: ['xs', 's', 'm', 'l'],
  noDefaultSize: true,
}) {
  /**
   * Returns the styles to be applied to the component.
   */
  public static override get styles(): CSSResultArray {
    return [styles];
  }

  /**
   * The border style of the swatch.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   *
   * The border style can be set to `light` or `none`.
   */
  @property({ reflect: true })
  public border: SwatchBorder;

  /**
   * The density of the swatch group.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   *
   * The density can be set to `compact` or `spacious` which will adjust the gap between swatches.
   */
  @property({ reflect: true })
  public density: 'compact' | 'spacious' | undefined;

  /**
   * The rounding of the swatch.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   *
   * The rounding can be set to `none` or `full`.
   */
  @property({ reflect: true })
  public rounding: SwatchRounding;

  /**
   * The selected swatches in the group.
   */
  @property({ type: Array })
  public get selected(): string[] {
    return this._selected;
  }

  public set selected(selected: string[]) {
    if (selected === this.selected) return;

    const oldSelected = this.selected;

    this._selected = selected;
    this.requestUpdate('selected', oldSelected);
  }

  // Specifically surface `_selected` internally so that change can be made to this value internally
  // without triggering the update lifecycle directly.
  private _selected: string[] = [];

  /**
   * The selection mode of the swatch group.
   *
   * The selection mode can be set to `single` or `multiple`.
   */
  @property()
  public selects: SwatchSelects;

  // Internal set to manage selected values.
  private selectedSet = new Set<string>();

  /**
   * The shape of the swatch.
   *
   * This property is reflected as an attribute, meaning changes to the property
   * will be mirrored in the corresponding HTML attribute.
   *
   * The shape can be set to `rectangle`.
   */
  @property({ reflect: true })
  public shape: SwatchShape;

  /**
   * The list of swatch elements assigned to the slot.
   */
  @queryAssignedElements({ flatten: true })
  public swatches!: Swatch[];

  constructor() {
    super();

    // Initialize a MutationController to observe changes in attributes, child elements, and subtree
    new MutationController(this, {
      config: {
        attributes: true,
        childList: true,
        subtree: true,
      },
      callback: () => {
        this.manageChange();
      },
    });
  }

  /**
   * Initializes a RovingTabindexController to manage focus within the swatch group.
   */
  rovingTabindexController = new RovingTabindexController<Swatch>(this, {
    focusInIndex: (elements: Swatch[]) => {
      let firstEnabledIndex = -1;
      const firstSelectedIndex = elements.findIndex((el, index) => {
        if (!elements[firstEnabledIndex] && !el.disabled) {
          firstEnabledIndex = index;
        }

        return el.selected && !el.disabled;
      });

      return elements[firstSelectedIndex]
        ? firstSelectedIndex
        : firstEnabledIndex;
    },
    elements: () => this.swatches,
    isFocusableElement: (el: Swatch) => !el.disabled,
  });

  /**
   * Sets focus on the swatch group.
   * Uses the RovingTabindexController to manage focus within the group.
   */
  public override focus(options?: FocusOptions): void {
    this.rovingTabindexController.focus(options);
  }

  /**
   * Handles the change event for the swatch group.
   * Manages the selected state of swatches based on the selection mode.
   */
  protected handleChange(event: Event & { target: Swatch }): void {
    event.stopPropagation();
    const oldSelected = this.selected;

    // Prevent default if no selection mode is set
    if (!this.selects) {
      event.preventDefault();

      return;
    }

    if (this.selects === 'single') {
      const { target } = event;

      target.tabIndex = 0;
      target.selected = true;

      // If the target is already selected, return early
      if (this.selectedSet.has(target.value)) {
        return;
      }

      // Clear the selected set and add the new selection
      this.selectedSet.clear();
      this.selectedSet.add(target.value);

      // Deselect all other swatches
      this.rovingTabindexController.elements.forEach((child) => {
        if (child === target) return;

        child.selected = false;
      });
    } else if (this.selects === 'multiple') {
      const { target } = event;

      // Add or remove the target from the selected set based on its state
      if (target.selected) {
        this.selectedSet.add(target.value);
      } else {
        this.selectedSet.delete(target.value);
      }
    }

    // Update the selected property
    this._selected = [...this.selectedSet];

    // Dispatch a change event and revert selection if the event is prevented
    const applyDefault = this.dispatchEvent(
      new Event('change', {
        cancelable: true,
        bubbles: true,
      })
    );

    if (!applyDefault) {
      this._selected = oldSelected;
      event.preventDefault();
    }
  }

  /**
   * Manages changes in the swatch group.
   * Updates the selected state of swatches based on changes in the DOM.
   */
  private manageChange = async (): Promise<void> => {
    const presentSet = new Set();

    this.selectedSet = new Set(this.selected);

    // Wait for all swatches to complete updating
    await Promise.all(this.swatches.map((swatch) => swatch.updateComplete));

    // Add swatch values to the present set and update the selected set
    this.swatches.forEach((swatch) => {
      presentSet.add(swatch.value);

      if (swatch.selected) {
        this.selectedSet.add(swatch.value);
      }
    });

    // Remove values from the selected set that are not present in the swatches
    this.selectedSet.forEach((value) => {
      if (!presentSet.has(value)) {
        this.selectedSet.delete(value);
      }
    });

    // Update the selected property
    this._selected = [...this.selectedSet];

    // Clear the element cache in the RovingTabindexController
    this.rovingTabindexController.clearElementCache();
  };

  /**
   * Gets the actions to be applied to each swatch based on property changes.
   * Updates swatch properties such as border, rounding, shape, size, and selects.
   */
  private getPassthroughSwatchActions(
    changes: PropertyValues
  ): ((swatch: Swatch) => void)[] {
    const targetValues: {
      border?: SwatchBorder;
      rounding?: SwatchRounding;
      shape?: SwatchShape;
      size?: SwatchGroupSizes;
      selects?: SwatchSelects;
    } = {};

    if (
      changes.has('selects') &&
      (this.selects || typeof changes.get('selects') !== 'undefined')
    ) {
      targetValues.selects = this.selects;
    }

    if (
      changes.has('border') &&
      (this.border || typeof changes.get('border') !== 'undefined')
    ) {
      targetValues.border = this.border;
    }

    if (
      changes.has('rounding') &&
      (this.rounding || typeof changes.get('rounding') !== 'undefined')
    ) {
      targetValues.rounding = this.rounding;
    }

    if (
      changes.has('size') &&
      (this.size !== 'm' || typeof changes.get('size') !== 'undefined')
    ) {
      targetValues.size = this.size as SwatchGroupSizes;
    }

    if (
      changes.has('shape') &&
      (this.shape || typeof changes.get('shape') !== 'undefined')
    ) {
      targetValues.shape = this.shape;
    }

    const passThroughSwatchActions: ((swatch: Swatch) => void)[] = [];

    // Apply the target values to each swatch
    if (Object.keys(targetValues).length) {
      passThroughSwatchActions.push((swatch) => {
        if (window.__swc.DEBUG) {
          if (
            'selects' in targetValues &&
            targetValues.selects !== 'multiple' &&
            swatch.mixedValue
          ) {
            window.__swc.warn(
              this,
              `<sp-swatch> elements can only leverage the "mixed-value" attribute when their <sp-swatch-group> parent element is also leveraging "selects="multiple""`,
              'https://opensource.adobe.com/spectrum-web-components/components/swatch-group/#multiple',
              {
                type: 'accessibility',
              }
            );
          }
        }

        if ('border' in targetValues) swatch.border = targetValues.border;

        if ('rounding' in targetValues) swatch.rounding = targetValues.rounding;

        if ('shape' in targetValues) swatch.shape = targetValues.shape;

        if ('size' in targetValues)
          swatch.size = targetValues.size as SwatchGroupSizes;
      });
    }

    return passThroughSwatchActions;
  }

  /**
   * Gets the actions to be applied to each swatch based on the selection mode.
   * Updates swatch roles such as radio, checkbox, or button.
   */
  private getSelectionSwatchActions(
    changes: PropertyValues
  ): ((swatch: Swatch) => void)[] {
    const selectionSwatchActions: ((swatch: Swatch) => void)[] = [];

    if (!changes.has('selects')) return selectionSwatchActions;

    // Set the role attribute based on the selection mode
    if (this.selects) {
      this.setAttribute(
        'role',
        this.selects === 'single' ? 'radiogroup' : 'group'
      );
    } else {
      this.removeAttribute('role');
    }

    const swatchRoles = {
      single: 'radio',
      multiple: 'checkbox',
    };
    const swatchRole = this.selects ? swatchRoles[this.selects] : 'button';

    // Apply the role to each swatch
    selectionSwatchActions.push((swatch) => {
      swatch.setAttribute('role', swatchRole);
    });

    return selectionSwatchActions;
  }

  protected override render(): TemplateResult {
    return html`
      <slot
        @change="${this.handleChange}"
        @slotchange="${this.manageChange}"
      ></slot>
    `;
  }

  /**
   * Called before the element updates.
   * Manages changes in the swatch group and updates swatch properties based on property changes.
   */
  protected override willUpdate(changes: PropertyValues<this>): void {
    const swatchActions = [
      ...this.getPassthroughSwatchActions(changes),
      ...this.getSelectionSwatchActions(changes),
    ];

    // Create Swatch actions that build state to be applied later.
    let nextSelected = new Set(this.selected);
    const currentValues = new Set();

    if (changes.has('selected')) {
      swatchActions.push((swatch) => {
        currentValues.add(swatch.value);

        if (
          nextSelected.has(swatch.value) ||
          (!this.hasUpdated && swatch.selected)
        ) {
          swatch.selected = true;
        } else {
          swatch.selected = false;
        }
      });
    }

    const doActions = (): void => {
      nextSelected = new Set(this.selected);

      // Do Swatch actions to each Swatch in the collection.
      this.swatches.forEach((swatch) => {
        swatchActions.forEach((action) => {
          action(swatch);
        });
      });

      // Apply state built in actions back to the Swatch Group
      if (changes.has('selected')) {
        this._selected = [...nextSelected.values()].filter((selectedValue) =>
          currentValues.has(selectedValue)
        );
      }
    };

    if (this.hasUpdated) {
      // Do actions immediately when the element has already updated.
      doActions();
    } else {
      // On first update wait for a `slotchange` event, which is not currently managed
      // by the element lifecycle before allowing Swatch actions to be commited.
      this.shadowRoot.addEventListener(
        'slotchange',
        () => {
          requestAnimationFrame(doActions);
        },
        { once: true }
      );
    }
  }
}
