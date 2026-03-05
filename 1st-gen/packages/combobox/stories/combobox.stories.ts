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
  html,
  LitElement,
  TemplateResult,
} from '@spectrum-web-components/base';
import { query, state } from '@spectrum-web-components/base/src/decorators.js';
import { defineElement } from '@spectrum-web-components/base/src/define-element.js';
import { live } from '@spectrum-web-components/base/src/directives.js';

import '@spectrum-web-components/combobox/sp-combobox.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import '@spectrum-web-components/help-text/sp-help-text.js';
import '@spectrum-web-components/tooltip/sp-tooltip.js';
import '@spectrum-web-components/menu/sp-menu-item.js';

import { spreadProps } from '../../../test/lit-helpers.js';
import { Combobox, ComboboxOption } from '../src/Combobox.js';
import { argTypes } from './args.js';
import { countries, fruits, StoryArgs } from './index.js';
import { Template } from './template.js';

export default {
  title: 'Combobox',
  component: 'sp-combobox',
  args: {
    open: false,
    disabled: false,
    invalid: false,
    pending: false,
    readonly: false,
    quiet: false,
  },
  argTypes,
};

export const Default = (args: StoryArgs): TemplateResult => Template(args);

export const disabled = (args: StoryArgs): TemplateResult => Template(args);
disabled.args = {
  disabled: true,
  value: 'Azerbaijan',
};

export const invalid = (args: StoryArgs): TemplateResult => Template(args);
invalid.args = {
  invalid: true,
};

export const pending = (args: StoryArgs): TemplateResult => Template(args);
pending.args = {
  pending: true,
};

export const quiet = (args: StoryArgs): TemplateResult => Template(args);
quiet.args = {
  quiet: true,
};

export const readonly = (args: StoryArgs): TemplateResult => Template(args);
readonly.args = {
  readonly: true,
  value: 'Solomon Islands',
};

export const hasDisabledItems = (args: StoryArgs): TemplateResult => {
  // let's create a new array from countries and set the disabled property to true if the value is in args.disabledItems
  const countriesWithDisabledItems = countries.map((country) => ({
    ...country,
    disabled: args.disabledItems?.includes(country.itemText),
  }));

  return html`
    <sp-combobox
      side-aligned="start"
      style="--mod-textfield-grid-template-columns-side-label: minmax(12ch, 1fr) minmax(12ch, 2fr);"
    >
      <span slot="field-label">Some fruits are disabled (light DOM)</span>
      ${fruits.map(
        (fruit) => html`
          <sp-menu-item
            id=${fruit.value}
            value=${fruit.value}
            ?disabled=${args.disabledItems?.includes(fruit.value)}
          >
            ${fruit.itemText}
          </sp-menu-item>
        `
      )}
    </sp-combobox>
    <sp-combobox
      side-aligned="start"
      .options=${countriesWithDisabledItems}
      .value=${args.value || ''}
      style="--mod-textfield-grid-template-columns-side-label: minmax(12ch, 1fr) minmax(12ch, 2fr);"
    >
      <span slot="field-label">Some countries are disabled (shadow DOM)</span>
    </sp-combobox>
  `;
};
hasDisabledItems.args = {
  disabledItems: [
    'banana',
    'lemon',
    'pear',
    'Albania',
    'Azerbaijan',
    'Solomon Islands',
  ],
};
hasDisabledItems.swc_vrt = {
  skip: true,
};

export const listAutocomplete = (args: StoryArgs): TemplateResult =>
  Template(args);
listAutocomplete.args = {
  autocomplete: 'list',
};

export const noAutocomplete = (): TemplateResult => {
  return html`
    <sp-combobox
      .options=${fruits}
      side-aligned="start"
    >
      <span slot="field-label">Fruit</span>
    </sp-combobox>
    <sp-combobox
      .options=${countries}
      side-aligned="start"
    >
      <span slot="field-label">Countries</span>
    </sp-combobox>
  `;
};

/**
 * Standalone sp-field-label: three patterns to compare visually.
 * 1) Sibling – sp-field-label outside combobox; use combobox `label` for a11y.
 * 2) Slotted sp-field-label – in the field-label slot.
 * 3) Slotted native <label> – tests that ::slotted(label) gets the same styles.
 * Use controls (size, disabled, etc.) to verify all three stay in sync.
 */
export const withStandaloneFieldLabel = (args: StoryArgs): TemplateResult => {
  return html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p
          style="margin: 0 0 0.5rem 0; font-size: 12px; color: var(--spectrum-gray-600);"
        >
          Sibling: sp-field-label outside combobox
        </p>
        <sp-field-label size=${args.size ?? 'm'} ?disabled=${args.disabled}>
          Where do you live?
        </sp-field-label>
        <sp-combobox
          label="Where do you live?"
          .options=${countries}
          .value=${args.value ?? ''}
          style="min-width: 80px; width: 200px;"
          ${spreadProps(args)}
        ></sp-combobox>
      </div>
      <div>
        <p
          style="margin: 0 0 0.5rem 0; font-size: 12px; color: var(--spectrum-gray-600);"
        >
          Slotted: native &lt;label&gt; in field-label slot
        </p>
        <sp-combobox
          .options=${countries}
          .value=${args.value ?? ''}
          style="min-width: 80px; width: 200px;"
          ${spreadProps(args)}
        >
          <label slot="field-label">Where do you live?</label>
        </sp-combobox>
      </div>
    </div>
  `;
};

/**
 * Same as With standalone field label but with side-aligned="start" for comparison.
 */
export const withStandaloneFieldLabelSideAligned = (
  args: StoryArgs
): TemplateResult => {
  return html`
    <div style="display: flex; flex-direction: column; gap: 2rem;">
      <div>
        <p
          style="margin: 0 0 0.5rem 0; font-size: 12px; color: var(--spectrum-gray-600);"
        >
          Sibling: sp-field-label outside combobox (side-aligned)
        </p>
        <div
          style="display: flex; align-items: flex-start; gap: var(--spectrum-spacing-200, 8px);"
        >
          <sp-field-label size=${args.size ?? 'm'} ?disabled=${args.disabled}>
            Where do you live?
          </sp-field-label>
          <sp-combobox
            label="Where do you live?"
            .options=${countries}
            .value=${args.value ?? ''}
            style="min-width: 80px; width: 200px;"
            ${spreadProps(args)}
          ></sp-combobox>
        </div>
      </div>
      <div>
        <p
          style="margin: 0 0 0.5rem 0; font-size: 12px; color: var(--spectrum-gray-600);"
        >
        Slotted: native &lt;label&gt; in field-label slot (side-aligned)
        </p>
        <sp-combobox
          side-aligned="start"
          .options=${countries}
          .value=${args.value ?? ''}
          style="min-width: 80px; width: 308px;"
          ${spreadProps(args)}
        >
        <label slot="field-label">Where do you live?</label>
        </sp-combobox>
      </div>
    </div>
  `;
};

export const lightDOM = (): TemplateResult => {
  return html`
    <sp-combobox
      style="min-width: 80px;"
      side-aligned="start"
    >
      <span slot="field-label">Fruit</span>
      ${fruits.map(
        (fruit) => html`
          <sp-menu-item id=${fruit.value} value=${fruit.value}>
            ${fruit.itemText}
          </sp-menu-item>
        `
      )}
    </sp-combobox>
    <sp-combobox
      side-aligned="start"
      style="min-width: 80px;"
    >
      <span slot="field-label">Countries</span>
      ${countries.map(
        (country) => html`
          <sp-menu-item id=${country.value} value=${country.value}>
            ${country.itemText}
          </sp-menu-item>
        `
      )}
    </sp-combobox>
  `;
};

export const withTooltip = (): TemplateResult => {
  return html`
    <sp-combobox
      label="Combobox with tooltip"
      style="min-width: 80px;width:100px;"
    >
      ${countries.map(
        (option) => html`
          <sp-menu-item id=${option.value} value=${option.value}>
            ${option.itemText}
          </sp-menu-item>
        `
      )}
      <sp-tooltip slot="tooltip" self-managed placement="right" open>
        This combobox has a tooltip.
      </sp-tooltip>
    </sp-combobox>
  `;
};

export const withFieldLabel = (): TemplateResult => {
  return html`
    <sp-combobox .options=${fruits}>
      <span slot="field-label">Pick a fruit</span>
    </sp-combobox>
  `;
};

export const withLabelAttribute = (): TemplateResult => {
  return html`
    <sp-combobox label="Pick a fruit" .options=${fruits}></sp-combobox>
  `;
};

export const withHelpText = (): TemplateResult => {
  return html`
    <sp-combobox label="Pick a fruit" .options=${fruits}>
      <sp-help-text slot="help-text">
        These are fruits found in the game "Animal Crossing: New Leaf".
      </sp-help-text>
    </sp-combobox>
  `;
};

class ControlledCombo extends LitElement {
  static ages: ComboboxOption[] = Array.from({ length: 76 - 55 }, (_, n) => {
    const age = `${n + 55}`;
    return { value: age, itemText: age };
  });

  @state()
  private value = {
    raw: '',
    validated: `${ControlledCombo.ages[0].itemText}`,
  };

  @query('#age')
  private combobox!: Combobox;

  override render(): TemplateResult {
    return html`
      <sp-combobox
        .options=${ControlledCombo.ages}
        .value=${live(this.value.validated)}
        @change=${this.onChange}
      >
        <span slot="field-label">
          Retirement age (try entering a non-number)
        </span>
      </sp-combobox>
    `;
  }

  private onChange(): void {
    this.value = {
      raw: this.combobox.value,
      validated: this.combobox.value.replace(/\D/g, '') || '55',
    };
  }
}
defineElement('controlled-combo', ControlledCombo);

export const controlled = (): TemplateResult => {
  return html`
    <controlled-combo></controlled-combo>
  `;
};
controlled.swc_vrt = {
  skip: true,
};

controlled.parameters = {
  // Disables Chromatic's snapshotting on a global level
  chromatic: { disableSnapshot: true },
};
