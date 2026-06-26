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

import { html, type TemplateResult } from 'lit';

import type { ResponseStatusStepStatus } from './response-status/response-status-step/ResponseStatusStep.js';

export type AgenticDemoFlowStepData = {
  label: string;
  detail: string;
};

/** Step labels and details for the canonical Storybook agentic flow demo. */
export const AGENTIC_DEMO_FLOW_STEPS: AgenticDemoFlowStepData[] = [
  {
    label: 'Looked through documentation',
    detail:
      'Scanned 12 internal knowledge base articles matching the query context and extracted key sections.',
  },
  {
    label: 'Searching web for: Carnival cruise trip packages Europe Asia',
    detail:
      'Found 8 relevant results across travel aggregators and official cruise line sites.',
  },
  {
    label: 'Searching repositories for Europe trips',
    detail:
      'Checked 3 internal repositories for previously compiled trip package data and pricing templates.',
  },
  {
    label: 'Compose response',
    detail:
      'Synthesizing findings into a structured comparison of available packages with pricing and availability.',
  },
];

/** Milliseconds from generation start (initiating). Tuned for Storybook demos. */
export const AGENTIC_DEMO_FLOW_TIMING = {
  processing: 1500,
  streamText: 2500,
  step1: 3500,
  step2: 5500,
  step3: 7000,
  expand: 7000,
  step4: 8500,
  collapse: 12000,
  complete: 13000,
  loopRestart: 16000,
} as const;

export const agenticDemoGreeting = (_prompt: string): string =>
  'Hello! How can I help you today?';

export const executionStepsLabelSlot = html`
  <span slot="reasoning-label">Execution steps</span>
`;

export const agenticDemoStep = (
  data: AgenticDemoFlowStepData,
  status: ResponseStatusStepStatus
): TemplateResult => html`
  <swc-response-status-step status=${status}>
    <span slot="label">${data.label}</span>
    ${data.detail}
  </swc-response-status-step>
`;
