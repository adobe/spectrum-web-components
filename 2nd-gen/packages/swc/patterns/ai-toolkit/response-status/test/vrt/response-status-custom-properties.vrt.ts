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

import '../../swc-response-status.js';

import type { CustomPropertyCase } from '../../../../../.storybook/helpers/index.js';
import {
  coveredCustomProperties,
  customPropertyRows,
  theme,
  verifyCustomPropertyCoverage,
  vrtParameters,
} from '../../../../../.storybook/helpers/index.js';
import customElementsManifest from '../../../../../dist/custom-elements.json';

// Metadata

const meta: Meta = {
  title: 'AI Toolkit/Response status/Response status VRT',
  component: 'swc-response-status',
  tags: ['dev'],
};

export default meta;

// swc-response-status and swc-response-status-step are two separate
// custom-elements-manifest declarations, each with its own `cssProperties`
// list (one property each). Copy this two-declaration pattern (with the
// module/declaration names and covered-properties list swapped) when a
// future unit needs the same shape.

// ─────────────────────────────────────────
//    swc-response-status CUSTOM PROPERTIES
// ─────────────────────────────────────────

type ResponseStatusPropertyCase =
  CustomPropertyCase<'--swc-response-status-label-max-lines'>;

const RESPONSE_STATUS_PROPERTY_CASES: readonly ResponseStatusPropertyCase[] = [
  { property: '--swc-response-status-label-max-lines', value: '1' },
];

// A label long enough to wrap past 2 lines at rest, so the override to a
// 1-line cap visibly ellipses a full line earlier than the reference.
// `status="complete"` (a static checkmark, not the active pixel-loader
// animation) keeps the snapshot deterministic without needing to pause
// anything: the label wrap cap applies identically regardless of status.
const modResponseStatusProperty = (
  _case: ResponseStatusPropertyCase,
  style?: string
) => html`
  <swc-response-status
    status="complete"
    style="max-inline-size: 240px; ${style ?? ''}"
  >
    <span slot="label">
      Reviewing quarterly filings, press releases, and internal notes across
      every linked repository to compile a complete answer
    </span>
  </swc-response-status>
`;

const coveredResponseStatusProperties = coveredCustomProperties(
  RESPONSE_STATUS_PROPERTY_CASES
);

// ──────────────────────────────────────────────
//    swc-response-status-step CUSTOM PROPERTIES
// ──────────────────────────────────────────────

type ResponseStatusStepPropertyCase =
  CustomPropertyCase<'--swc-response-status-step-detail-max-block-size'>;

const RESPONSE_STATUS_STEP_PROPERTY_CASES: readonly ResponseStatusStepPropertyCase[] =
  [
    {
      property: '--swc-response-status-step-detail-max-block-size',
      value: '40px',
    },
  ];

// A description long enough to overflow even the default 120px cap, so the
// override to a much shorter 40px cap visibly clips more of it.
const modResponseStatusStepProperty = (
  _case: ResponseStatusStepPropertyCase,
  style?: string
) => html`
  <swc-response-status status="complete" style="max-inline-size: 240px;">
    <span slot="label">Thought for 9 seconds</span>
    <swc-response-status-step status="complete" open style=${style ?? nothing}>
      <span slot="label">Looked through documentation</span>
      <span slot="description">
        Scanned 12 internal knowledge base articles matching the query context,
        extracted key sections, and cross-referenced each finding against the
        quarterly figures before compiling this summary.
      </span>
    </swc-response-status-step>
  </swc-response-status>
`;

const coveredResponseStatusStepProperties = coveredCustomProperties(
  RESPONSE_STATUS_STEP_PROPERTY_CASES
);

// ────────────────────
//    PLAY FUNCTION
// ────────────────────

const modPropertiesContent = () => html`
  ${customPropertyRows(
    RESPONSE_STATUS_PROPERTY_CASES,
    modResponseStatusProperty
  )}
  ${customPropertyRows(
    RESPONSE_STATUS_STEP_PROPERTY_CASES,
    modResponseStatusStepProperty
  )}
`;

const verifyCoverage = async () => {
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath: 'patterns/ai-toolkit/response-status/ResponseStatus.ts',
    declarationName: 'ResponseStatus',
    coveredProperties: coveredResponseStatusProperties,
  });
  await verifyCustomPropertyCoverage({
    customElementsManifest,
    modulePath:
      'patterns/ai-toolkit/response-status/response-status-step/ResponseStatusStep.ts',
    declarationName: 'ResponseStatusStep',
    coveredProperties: coveredResponseStatusStepProperties,
  });
};

// VRT stories

export const CustomProperties: Story = {
  render: () => theme(modPropertiesContent(), 'light', 'ltr'),
  parameters: vrtParameters,
  play: verifyCoverage,
};
