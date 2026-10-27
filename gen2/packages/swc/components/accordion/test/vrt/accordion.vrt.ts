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

import { html, nothing } from 'lit';
import type { Meta, StoryObj as Story } from '@storybook/web-components';

import {
  ACCORDION_DENSITIES,
  ACCORDION_VALID_SIZES,
} from '@adobe/spectrum-wc-core/components/accordion';

import '@adobe/spectrum-wc/components/accordion/swc-accordion.js';
import '@adobe/spectrum-wc/components/accordion/swc-accordion-item.js';
import '@adobe/spectrum-wc/components/button/swc-button.js';

import type { ForcedPseudoState } from '../../../../.storybook/helpers/index.js';
import {
  FORCED_STATES,
  forcedColorsVrtParameters,
  forcePseudoStates,
  row,
  SIZE_LABELS,
  theme,
  vrtParameters,
} from '../../../../.storybook/helpers/index.js';

// Metadata

const meta: Meta = {
  title: 'Accordion/Accordion VRT',
  component: 'swc-accordion',
  tags: ['dev'],
};

export default meta;

// Helpers

const densityLabels = {
  compact: 'Compact',
  regular: 'Regular',
  spacious: 'Spacious',
} as const satisfies Record<(typeof ACCORDION_DENSITIES)[number], string>;

type ItemCase = {
  label: string;
  open?: boolean;
  disabled?: boolean;
  actions?: unknown;
  forceState?: ForcedPseudoState;
  lang?: string;
};

// swc-accordion-item's own custom properties get dedicated coverage in
// accordion-custom-properties.vrt.ts, so panel content here is kept minimal
// and identical across cases.
const renderItem = ({
  label,
  open = false,
  disabled = false,
  actions,
  forceState,
  lang,
}: ItemCase) => html`
  <swc-accordion-item
    ?open=${open}
    ?disabled=${disabled}
    data-force-state=${forceState ?? nothing}
    lang=${lang ?? nothing}
  >
    <span slot="label">${label}</span>
    ${actions ?? nothing}
    <p>Supporting panel content.</p>
  </swc-accordion-item>
`;

type AccordionCase = {
  size?: (typeof ACCORDION_VALID_SIZES)[number];
  density?: (typeof ACCORDION_DENSITIES)[number];
  quiet?: boolean;
  disabled?: boolean;
  allowMultiple?: boolean;
  items: unknown;
};

// A fixed width keeps every row's accordions a comparable, compact size
// regardless of how much label/content text a given case renders.
const renderAccordion = ({
  size,
  density,
  quiet = false,
  disabled = false,
  allowMultiple = false,
  items,
}: AccordionCase) => html`
  <swc-accordion
    size=${size ?? nothing}
    density=${density ?? nothing}
    ?quiet=${quiet}
    ?disabled=${disabled}
    ?allow-multiple=${allowMultiple}
    style="max-inline-size: 280px;"
  >
    ${items}
  </swc-accordion>
`;

const actionsButton = (label: string) => html`
  <swc-button
    slot="actions"
    variant="secondary"
    fill-style="outline"
    size="s"
    accessible-label=${label}
  >
    Edit
  </swc-button>
`;

const forceAccordionItemStates = forcePseudoStates(
  'swc-accordion-item[data-force-state]',
  '.swc-AccordionItem-header'
);

// Every size and density (each with one open, one closed item), quiet vs.
// default (with a forced-hover item, since quiet's rounded header corner is
// otherwise invisible at rest — the header background it's drawn on only
// appears on hover/focus; the missing divider is already visible on the
// plain open/closed items above it, since that's a plain border color with
// no hover gating), collapsed/expanded/disabled item states plus a
// fully-disabled accordion (folded into one "States" row), a mixed disabled +
// allow-multiple example, two simultaneously open items under allow-multiple,
// the actions slot, forced hover/focus-visible/active on the header (each
// crossed with both a collapsed and an open item, so a forced state's
// interaction with the rotated chevron is covered too), label wrapping, and
// CJK label rendering. `level` (heading level) is intentionally not covered —
// it only changes the wrapping tag under a `font: inherit` reset, with no
// visual difference to capture.
const permutationContent = () => html`
  ${row(
    ACCORDION_VALID_SIZES.map((size) =>
      renderAccordion({
        size,
        items: html`
          ${renderItem({ label: `${SIZE_LABELS[size]} · open`, open: true })}
          ${renderItem({ label: `${SIZE_LABELS[size]} · closed` })}
        `,
      })
    ),
    'Sizes'
  )}
  ${row(
    ACCORDION_DENSITIES.map((density) =>
      renderAccordion({
        density,
        items: html`
          ${renderItem({
            label: `${densityLabels[density]} · open`,
            open: true,
          })}
          ${renderItem({ label: `${densityLabels[density]} · closed` })}
        `,
      })
    ),
    'Density'
  )}
  ${row(
    [
      renderAccordion({
        items: html`
          ${renderItem({ label: 'Default · open', open: true })}
          ${renderItem({ label: 'Default · hover', forceState: 'hover' })}
        `,
      }),
      renderAccordion({
        quiet: true,
        items: html`
          ${renderItem({ label: 'Quiet · open', open: true })}
          ${renderItem({ label: 'Quiet · hover', forceState: 'hover' })}
        `,
      }),
    ],
    'Quiet'
  )}
  ${row(
    [
      renderAccordion({
        items: html`
          ${renderItem({ label: 'Collapsed' })}
          ${renderItem({ label: 'Expanded', open: true })}
          ${renderItem({ label: 'Disabled', disabled: true })}
        `,
      }),
      renderAccordion({
        disabled: true,
        items: html`
          ${renderItem({
            label: 'Disabled accordion · expanded',
            open: true,
          })}
          ${renderItem({ label: 'Disabled accordion · collapsed' })}
        `,
      }),
    ],
    'States'
  )}
  ${row(
    [
      renderAccordion({
        allowMultiple: true,
        items: html`
          ${renderItem({ label: 'Expanded', open: true })}
          ${renderItem({ label: 'Collapsed' })}
          ${renderItem({ label: 'Disabled', disabled: true })}
        `,
      }),
    ],
    'Mixed disabled + allow multiple'
  )}
  ${row(
    [
      renderAccordion({
        allowMultiple: true,
        items: html`
          ${renderItem({ label: 'First open', open: true })}
          ${renderItem({ label: 'Second open', open: true })}
          ${renderItem({ label: 'Collapsed' })}
        `,
      }),
    ],
    'Allow multiple: two open'
  )}
  ${row(
    [
      renderAccordion({
        items: html`
          ${renderItem({
            label: 'Personal information',
            open: true,
            actions: actionsButton('Edit personal information'),
          })}
          ${renderItem({
            label: 'Billing address',
            actions: actionsButton('Edit billing address'),
          })}
        `,
      }),
    ],
    'Actions slot'
  )}
  ${FORCED_STATES.map((state) =>
    row(
      [
        renderAccordion({
          items: html`
            ${renderItem({
              label: `${state} · collapsed`,
              forceState: state,
            })}
            ${renderItem({
              label: `${state} · expanded`,
              open: true,
              forceState: state,
            })}
          `,
        }),
      ],
      state
    )
  )}
  ${row(
    [
      renderAccordion({
        items: renderItem({
          label:
            'A heading label long enough to wrap onto multiple lines within the accordion',
          open: true,
        }),
      }),
    ],
    'Wrapping'
  )}
  ${row(
    [
      renderAccordion({
        items: renderItem({
          label: '承認ワークフローを開始するセクション',
          lang: 'ja',
          open: true,
        }),
      }),
      renderAccordion({
        items: renderItem({
          label: '승인 워크플로 시작 섹션',
          lang: 'ko',
          open: true,
        }),
      }),
      renderAccordion({
        items: renderItem({
          label: '启动审批工作流部分',
          lang: 'zh',
          open: true,
        }),
      }),
    ],
    'CJK language'
  )}
`;

// VRT stories

// Rendered once in light/ltr and once in dark/rtl (that combination covers
// both axes, including the chevron's RTL mirroring on already-open/closed
// items above), all still in a single story so it costs one snapshot.
export const Permutations: Story = {
  render: () => html`
    ${theme(permutationContent(), 'light', 'ltr')}
    ${theme(permutationContent(), 'dark', 'rtl')}
  `,
  parameters: vrtParameters,
  play: forceAccordionItemStates,
};

// `forced-colors` replaces the whole page palette, so it can't be scoped to a
// subtree the way theme()'s light/dark split is, and needs its own snapshot
// rather than folding into Permutations.
export const ForcedColors: Story = {
  render: () => theme(permutationContent(), 'light', 'ltr'),
  parameters: forcedColorsVrtParameters,
  play: forceAccordionItemStates,
};
